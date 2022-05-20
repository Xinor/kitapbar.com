import {Router} from 'express';
import {query} from 'express-validator';
import {validateRequest} from 'middlewares';
import {Book} from 'models';

const router = Router();
const limit = 100;

router.get('/stats', async (req, res) => {
  const total = await Book.count({});
  const payload = {total};
  res.json({ok: true, payload});
});

router.get('/search',
  query('search').trim().notEmpty().isLength({min: 2, max: 60}).withMessage('2 ile 60 arası karakter girin'),
  query('offset').isInt({allow_leading_zeroes: false, min: 0, max: 50000}).withMessage('sayı lazım..'),
  validateRequest,
  async (req, res) => {

    let search = req.query.search as string;
    console.log(`-- ${search}`);
    search = search.replace(/\W(?:pdf|epub|mobi|doc|docx|ibooks|azw|azw3|kf8|kfx|txt|rtf|fb2|inf)/gmi, '');

    const offset = Number(req.query.offset as string);

    const books = await Book.aggregate([
      {
        $match: {$text: {$search: search, $caseSensitive: false}}
      },
      {
        $addFields: {score: {$meta: "textScore"}}
      },
      {
        $match: {"score": {$gt: 0.2}}
      },
      {
        $sort: {score: {$meta: "textScore"}}
      },
      {
        $facet: {
          "stage1": [
            {"$skip": offset},
            { $unwind : "$disks" },
            {"$limit": limit},
            {
              "$project": {
                id: "$disks._id",
                _id: 0,
                name: "$disks.name",
                public_key: "$disks.public_key",
                path: "$disks.path",
                mediaType: 1,
                antivirusStatus: 1,
                size: 1,
                mimeType: 1,
                fileType: 1,
                createdAt: 1
              }
            }
          ],
          "stage2": [
            {"$group": {_id: null, count: {$sum: 1}}}
          ],
        }
      },
      {
        $unwind: "$stage2"
      },
      {
        $project: {
          data: "$stage1",
          total: "$stage2.count"
        }
      }
    ]);
    const payload = {data: [], total: 0, ...(books[0] || {})};

    res.json({ok: true, payload: {books: payload.data, total: payload.total, offset, limit}});

  });

export default router;

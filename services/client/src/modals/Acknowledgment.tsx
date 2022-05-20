const softwares = [
  {name: 'django', url: 'https://github.com/django/django'},
  {name: 'django-storages', url: 'https://github.com/jschneier/django-storages'},
  {name: 'django-extensions', url: 'https://github.com/django-extensions/django-extensions'},
  {name: 'celery', url: 'https://github.com/celery/celery'},

  {name: 'express', url: 'https://github.com/expressjs/express'},
  {name: 'express-validator', url: 'https://github.com/express-validator/express-validator'},
  {name: 'typescript', url: 'https://github.com/microsoft/TypeScript'},
  {name: 'ts-node-dev', url: 'https://github.com/wclr/ts-node-dev'},

  {name: 'clamav', url: 'https://github.com/Cisco-Talos/clamav'},
  {name: 'docker-py', url: 'https://github.com/docker/docker-py'},

  {name: 'mongo', url: 'https://github.com/mongodb/mongo'},
  {name: 'pymongo', url: 'https://github.com/mongodb/mongo-python-driver'},
  {name: 'mongoose', url: 'https://github.com/Automattic/mongoose'},

  {name: 'next', url: 'https://github.com/vercel/next.js'},
  {name: 'react', url: 'https://github.com/facebook/react'},
  {name: 'react-icons', url: 'https://github.com/react-icons/react-icons'},
  {name: 'react-share', url: 'https://github.com/nygardk/react-share'},
  {name: 'react-toastify', url: 'https://github.com/fkhadra/react-toastify'},
  {name: 'react-query', url: 'https://github.com/tannerlinsley/react-query'},
  {name: 'react-hook-form', url: 'https://github.com/react-hook-form/react-hook-form'},
  {name: 'axios', url: 'https://github.com/axios/axios'},
  {name: 'async', url: 'https://github.com/caolan/async'},
  {name: 'sharp', url: 'https://github.com/lovell/sharp'},
  {name: 'urlencode', url: 'https://github.com/node-modules/urlencode'},
  {name: 'next-sitemap', url: 'https://github.com/iamvishnusankar/next-sitemap'},
  {name: 'postcss', url: 'https://github.com/postcss/postcss'},
  {name: 'autoprefixer', url: 'https://github.com/postcss/autoprefixer'},
  {name: 'tailwindcss', url: 'https://github.com/tailwindlabs/tailwindcss'},
  {name: 'aws-sdk', url: 'https://github.com/aws/aws-sdk-js'},
  {name: 'file-type', url: 'https://github.com/sindresorhus/file-type'},
  {name: 'webpack', url: 'https://github.com/webpack/webpack'}
];

function Acknowledgment() {
  return (
    <div className='w-[280px] md:w-[520px] space-y-4 p-3.5'>
      <h2 className='text-xs'>kitapbar.com'un kullandığı açık kaynak yazılımlar</h2>
      <ul className='w-full flex flex-wrap text-sm'>
        {
          softwares.map(software => (
            <li key={software.name} className='w-1/2 px-1'>
              <a href={software.url} target='_blank' rel='external' className='text-link text-xs'>{software.name}</a>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Acknowledgment;

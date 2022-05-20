import 'dotenv/config';
import app from 'server';
import 'db';
import 'jobs/linkHealthCheck';
import 'jobs/diskScanner';

app.listen(app.get('PORT'), () => {
  console.log(`${process.env.SERVICE_NAME} service is listening on port ${app.get('PORT')} 👻`);
});

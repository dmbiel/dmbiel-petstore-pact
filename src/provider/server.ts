import { createProviderApp } from './app';

const port = Number(process.env.PORT ?? 3001);
const app = createProviderApp();

app.listen(port, () => {
  console.log(`Petstore provider stub is running on port ${port}`);
});

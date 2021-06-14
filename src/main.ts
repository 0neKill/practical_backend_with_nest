import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";


(async function() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Backend на Nest.js")
    .setDescription("Документация REST API")
    .setVersion("1.0.0")
    .addTag("Sasha")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup("/api/docs", app, document);
  await app.listen(PORT, () => console.log("Server is starting.... " + PORT));
})();


//
// const start = async () => {
//   const PORT = process.env.PORT || 5000;
//   const app = await NestFactory.create(AppModule);
//   await app.listen(PORT, () => console.log("Server is starting... " + PORT));
// };
//
// start();

// const PORT = process.env.PORT || 5000;
//
// NestFactory.create(AppModule).then(async (app) => {
//   await app.listen(PORT, () => console.log("Server is starting... " + PORT));
// });


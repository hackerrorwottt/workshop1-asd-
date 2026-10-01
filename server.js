const express = require('express');
const appRouter = require('./routes/productRoutes');

const webServer = express();

webServer.use(express.json());
webServer.use(appRouter);

webServer.listen(3000, () => {
  console.log("Listening on 3000");
});
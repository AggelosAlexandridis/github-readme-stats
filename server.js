import express from "express";
const app = express();
const port = 3000;

app.all("/api/:file", async (req, res) => {
  try {
    const handler = (await import(`./api/${req.params.file}.js`)).default;
    await handler(req, res);
  } catch (err) {
    res.status(404).send("File not found or handler error");
  }
});

app.all("/api/status/:file", async (req, res) => {
  try {
    const handler = (await import(`./api/status/${req.params.file}.js`))
      .default;
    await handler(req, res);
  } catch (err) {
    res.status(404).send("Status file not found");
  }
});

app.listen(port, '0.0.0.0',() => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});

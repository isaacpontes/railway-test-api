import express from "express";

const app = express()

app.get("/", (req, res) => {
  try {
    res.json({
      hello: "Hello, world!"
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Started on port ${PORT}.`))
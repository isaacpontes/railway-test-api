import dotenv from "dotenv";
import express from "express";
import { DataTypes, Sequelize } from "sequelize";

dotenv.config()

const sequelize = new Sequelize(process.env.MYSQL_URL)

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "users",
  timestamps: false
})

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

app.post("/users", async (req, res) => {
  try {
    const { name } = req.query
    const user = await User.create({ name })
    return res.status(201).json(user)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
})

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll()
    return res.json(users)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Started on port ${PORT}.`))
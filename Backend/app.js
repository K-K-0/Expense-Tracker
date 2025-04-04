const { PrismaClient } = require("@prisma/client");
const express = require ("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const cors = require("cors")

const prisma = new PrismaClient()

const app = express()
app.use(cors())
app.use(express.json())


const Protected = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if(!token) { 
    return res.status(401).json({massage: "unAuthorized"})
  }

  jwt.verify(token, "Ad", (err, user) => {
    if (err) { 
      return res.status(403).json({ massage : "Forbidden"})
    } 
    req.user = user
    next();
  })
}

app.post('/signup', async (req,res) => {
  const { name, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  const token = jwt.sign({userid: user.id}, "Ad")
  res.json({token})

  return res.json(user)
})


app.post('/login', async (req,res) => {
  const { email , password } = req.body

  const user = await prisma.user.findFirst({
    where: { email }
  })

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    return res.status(401).json({ massage: 'invalid password'})
  }

  const token = jwt.sign({userid: user.id}, "Ad")
  res.json({token})
})


app.post('/api/create', Protected, async (req,res) => {
  const { title, amount, category} = req.body
  const userId = req.user.userid

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  
  try {
    const expense = await prisma.expense.create({
      data: {
        title,
        amount,
        category,
        userId: userId
      }
    })

    return res.status(201).json(expense)

  } catch (error) {
    console.error("error while creating expense", error)

    if(!res.headersSent) {
      return res.status(500).json({error: "error while creating expense"})
    }
    
  }
})


app.get('/api/expense', Protected, async (req,res) => {
  const  userId  = req.user.userid
  if(!userId) return res.json({massage: "id is not provided by token"})
  const expense = await prisma.expense.findMany({
    where: {
      userId: Number(userId)
    }
  });
  res.json({ expense })
})


app.put("/api/update/:id", Protected , async(req,res) => {
  const userId = req.user.userid
  const  id  = Number(req.params.id)
  const { title, amount, category } = req.body
  

  const exist = await prisma.expense.findFirst({ where: { id, userId } })
  
  const updatedExpense = await prisma.expense.update({
    where: {
      id
    },
    data: {
      title,
      amount,
      category
    }
  })
  res.json({updatedExpense})
})


app.delete( '/api/delete/:id', Protected, async (req,res) => {
  const id = Number(req.params.id)
  
  const Delete = await prisma.expense.delete({where: { id }})
  
  res.json({ massage: "expense have been deleted"})
})


app.listen(3000)


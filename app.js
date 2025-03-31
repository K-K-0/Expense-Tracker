const { PrismaClient } = require("@prisma/client");
const express = require ("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


const prisma = new PrismaClient()

const app = express()
app.use(express.json())


const protected = (req, res, next) => {
  const token = req.header('Authorization')
  if(!token) return res.status(401).json({massage: "unAuthorized"})

  jwt.verify(token, "Ad", (err, user) => {
    if (err) return res.status(403).json({ massage : "forbidden"})
    req.user = user
    next()
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

  res.json(user)
})


app.post('/login', async (req,res) => {
  const { email , password } = req.body

  const user = await prisma.user.findFirst({
    where: { email}
  })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      massage: "Invalid credentials"
    })
  }

  const token = jwt.sign({userid: user.id}, "Ad")
  res.json({token})
})


app.post('/api/create', protected, async (req,res) => {
  const { title, amount, category, userId} = req.body

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  
  try {
    const expense = await prisma.expense.create({
      data: {
        title,
        amount,
        category,
        user: { connect: {id: userId} }
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

app.get('/api/expenses', protected, (req,res) => {
  res.send("Get expense");  
  
})

app.get('/api/expense/id', protected, (req,res) => {
  res.send("get a single expense");
})

app.put("/api/update", protected ,(req,res) => {
  res.send("update");
})



app.listen(3000)


const express = require("express")
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/new",(req,res)=>{
    res.send("This is new");

});

/*Post method for login Page */
router.post("/login1", async (req, res) => {
    const bodyData = req.body;
    try {
      const isUser = await prisma.user.findUnique({
        where: { email: bodyData.email },
      });
      if (isUser) {
        if (bodyData.password === isUser.password) {
          res.send({ token: "abcd", msg: "Login Successfull" });
        } else {
          res.status(401).json("Incorrect Password");
        }
      } else {
        res.status(404).json("User does not exist");
      }
    } catch (err) {
      res.status(500).json("Something went wrong");
    }
  });
  
  const registerSuccess = {
    msg: "Registered Successfully",
  };
  
  /* Post method for register page */
  router.post("/register", async (req, res) => {
    const bodyData = req.body;
    const isRegistered = await prisma.user.findUnique({
      where: { email: bodyData.email },
    });
    if (isRegistered) {
      res.status(400).json("Email already exists");
    } else {
      try {
        const prismaResponse = await prisma.user.create({
          data: {
            name: bodyData.name,
            email: bodyData.email,
            password: bodyData.password,
          },
        });
        res.json(prismaResponse);
      } catch (err) {
        res.status(500).json("Something went wrong");
      }
    }
  
    try {
      res.send(registerSuccess);
    } catch (err) {
      console.log(err.data);
    }
  });
  
  /* GET method for register page(table) */
  
  router.get("/prisma", async (req, res) => {
    const b = await prisma.user.findMany();
    res.json(b);
  });

module.exports = router;
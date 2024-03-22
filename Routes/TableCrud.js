const express = require("express")
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/prisma", async (req, res) => {
    const a = await prisma.user.findMany();
    res.json(a);
  });
  
  router.get("/prisma/:id", async (req, res) => {
    try {
      const data = await prisma.user.findUniqueOrThrow({
        where: { id: parseInt(req.params.id) },
      });
      res.send(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.post("/prisma", async (req, res) => {
    const request = req.body;
    const alreadyData = await prisma.user.findUnique({
      where: { email: request.email },
    });
    if (alreadyData) {
      res.status(400).json("Please use another user");
    } else {
      try {
        const data = await prisma.user.create({
          data: { name: request.name, email: request.email },
        });
        res.json(data);
        console.log(data);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  });
  
  // Update user data
  router.put("/prisma/update/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
  
    try {
      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        return res.status(404).json("User not found hai update maa.");
      }
  
      // Update the user data
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name, email },
      });
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error haii update maa" });
    }
  });
  
  /* Delete method */
  router.delete("/prisma/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
  
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        return res.status(404).json("User not found");
      }
  
      await prisma.user.delete({
        where: { id: userId },
      });
  
      res.json("User deleted successfully");
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error haii" });
    }
  });

module.exports = router;
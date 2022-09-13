import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "hello!" });
});

app.get("/products", async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    select: {
      name: true,
      description: true,
      reviews: {
        select: {
          text: true,
          rating: true,
        },
      },
    },
  });
  res.json(products);
});

app.post("/products", async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  console.log(req.body);
  const product = await prisma.product.create({
    data: {
      name: name,
      description: description,
      price: price,
    },
  });
  res.json(product);
});

app.post("/reviews", async (req: Request, res: Response) => {
  const { text, rating, productId } = req.body;
  console.log(req.body);
  const review = await prisma.review.create({
    data: {
      text: text,
      rating: rating,
      product: {
        connect: {
          id: productId,
        },
      },
    },
  });
  res.json(review);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Listening on http://localhost:${PORT}`);

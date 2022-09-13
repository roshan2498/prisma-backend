-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "productId" TEXT,
    CONSTRAINT "Review_id_fkey" FOREIGN KEY ("id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

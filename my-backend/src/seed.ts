import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "seedData.json"), "utf-8")
  );

  for (const item of data) {
    const tagIds = [];
    for (const tagName of item.tags) {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });
      tagIds.push(tag.id);
    }

    const post = await prisma.post.create({
      data: {
        title: item.title,
        content: item.content,
        postedAt: new Date(item.postedAt),
        postedBy: item.postedBy,
      },
    });

    for (const tagId of tagIds) {
      await prisma.postTag.create({
        data: {
          postId: post.id,
          tagId: tagId,
        },
      });
    }
  }

  console.log("Data seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

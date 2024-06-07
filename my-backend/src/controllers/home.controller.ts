import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { PostModel } from "../model/post.model";
import { PostDetailModel } from "../model/postDetail.model";

const prisma = new PrismaClient();

export function welcome(req: Request, res: Response) {
  res.json({ message: "Hello from the backend!" });
}
export async function posts(req: Request, res: Response) {
  try {
    const search = req.query.search as string;
    const sort = req.query.sort as string;
    let posts: PostModel[];

    const prismaPosts = await prisma.post.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search } },
              { postedBy: { contains: search } },
              { tags: { some: { tag: { name: { contains: search } } } } },
            ],
          }
        : {},
      orderBy: sort ? { [sort]: "asc" } : undefined,
      select: {
        id: true,
        title: true,
        postedAt: true,
        postedBy: true,
        tags: { select: { tag: true } },
      },
    });
    posts = prismaPosts.map((post) => {
      return {
        ...post,
        postedAt: post.postedAt.toISOString(),
        tags: post.tags.map((tag) => tag.tag.name),
      };
    });

    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

export async function postDetail(req: Request, res: Response) {
  try {
    const { id } = req.params;
    let post: PostDetailModel;

    const prismaPost = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: { tags: { include: { tag: true } } },
    });

    if (!prismaPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    post = {
      id: prismaPost.id,
      title: prismaPost.title,
      content: prismaPost.content,
      postedAt: prismaPost.postedAt.toISOString(),
      postedBy: prismaPost.postedBy,
      tags: prismaPost.tags.map((tag) => tag.tag.name),
    };

    res.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ message: "Failed to fetch post" });
  }
}

export async function content(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.send(post.content);
  } catch (err) {}
}

export async function searchTag(req: Request, res: Response) {
  try {
    const { tag } = req.params;

    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            tag: {
              id: parseInt(tag),
            },
          },
        },
      },
      select: {
        id: true,
        title: true,
        postedBy: true,
        postedAt: true,
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    res.json(posts);
  } catch (err) {}
}

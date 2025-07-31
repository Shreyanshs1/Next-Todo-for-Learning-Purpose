import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function PUT(_: Request, { params }: Params) {
  const session = await auth();
  const todoId = params.id;

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const todo = await prisma.todo.findUnique({
    where: { id: todoId },
  });

  if (!todo || todo.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
  }

  const updated = await prisma.todo.update({
    where: { id: todoId },
    data: { completed: !todo.completed },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
  const session = await auth();
  const todoId = params.id;

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const todo = await prisma.todo.findUnique({
    where: { id: todoId },
  });

  if (!todo || todo.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
  }

  await prisma.todo.delete({
    where: { id: todoId },
  });

  return NextResponse.json({ success: true });
}

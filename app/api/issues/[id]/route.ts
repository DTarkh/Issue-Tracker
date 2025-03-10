import prisma from "@/app/lib/prisma";
import { issueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth"
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const requestedIssue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!requestedIssue)
    return NextResponse.json({ error: "invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: requestedIssue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) 
    return NextResponse.json({ error: "invalid issue" }, { status: 404 });

  await prisma.issue.delete({ where: { id: issue.id } });
    return NextResponse.json({});
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
import prisma from "@/app/lib/prisma"

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    desciption: z.string().min(1)
})


export async function POST(request:NextRequest){

    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)

    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})


    const newIssue = await prisma.issue.create({
        data:{title: body.title, desciption:body.desciption}
    })

    return NextResponse.json(newIssue, {status: 201})
}
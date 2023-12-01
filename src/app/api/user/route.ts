import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface User {
    userId: string;
}

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const {userId} = (await request.json()) as User;
        if (!userId) {
            return NextResponse.json({message: "BadRequest"}, {status: 400})
        }

        let user = await prisma.user.findUnique({
            where: {
                userId: userId
            }
        })
        if (!user) {
            user = await prisma.user.create({
                data: {
                    userId: userId
                }
            })
        }
        return NextResponse.json({user: user}, {status: 200})

    } catch(e) {
        console.error("🚀 ~ file: route.ts:11 ~ POST ~ e:", e)
        return NextResponse.json({message: "Invalid request"}, {status: 400})
    }
}
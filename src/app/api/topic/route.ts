import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface TopicRequest {
    userId: string;
    avatar: string;
    content: string;
    images: string[];
    options: string[];
}

export async function GET() {
    try {
        const topics = await prisma.topic.findMany({
            include: {
                options: true
            }
        });
        topics.reverse();
        return NextResponse.json({
            topics
        }, {status: 200});
    } catch(e) {
        console.error("🚀 ~ file: route.ts:11 ~ GET ~ e:", e)
        return NextResponse.json({
            message: "Bad Request"
        }, {status: 400});
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = (await request.json()) as TopicRequest;

        const topic = await prisma.topic.create({
            data: {
                userId: data.userId,
                avatar: data.avatar,
                content: data.content,
                images: data.images,
                options: {
                    create: data.options.map(item => ({
                        key: item,
                        value: 0
                    }))
                }
            },
            include: {
                options: true
            }
        });
        return NextResponse.json(topic, {status: 200})
    } catch (e) {
        console.error("🚀 ~ file: route.ts:13 ~ POST ~ e:", e);
        return NextResponse.json({
            message: "Bad Request"
        }, {status: 400})
    }
}

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    // const topic = await prisma.topic.create({
    //     data: {
    //         userId: "user_2TwMNJWJWEJqSdBjQtBjNit5vSq",
    //         avatar: "https://img2.baidu.com/it/u=8613933,251321465&fm=253&fmt=auto&app=120&f=JPEG?w=802&h=800",
    //         images: ["https://img0.baidu.com/it/u=325115911,3259356982&fm=253&fmt=auto&app=138&f=JPG?w=889&h=500"],
    //         content: "Content",
    //         options: {
    //             create: [
    //                 {
    //                     key: "One",
    //                     value: 1
    //                 },
    //                 {
    //                     key: "Two",
    //                     value: 2
    //                 }
    //             ]
    //         }
    //     }
    // })
    const topic = await prisma.topic.findMany({
        include: {
            options: true
        }
    })

    // const options = await prisma.option.deleteMany({
    //     where: {
    //         topicId: "654dbea376238a9355cc5345",
    //     },
    // });

    // const topic = await prisma.topic.delete({
    //     where: {
    //         id: "654dbea376238a9355cc5345",
    //     },
    // });
    return NextResponse.json(
        { message: topic},
        { status: 200 }
    );
}

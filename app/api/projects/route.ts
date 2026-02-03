import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET() {
    try {
        await dbConnect();

        const projects = await Project.find({}).sort({ createdAt: -1 }); // Newest first

        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

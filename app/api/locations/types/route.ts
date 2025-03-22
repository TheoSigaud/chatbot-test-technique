import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Route API pour récupérer les types de lieux
 * Méthode: GET
 * @returns La liste des types de lieux
 */

export async function GET() {
    try {
        const types = await prisma.location.findMany({
            select: {
                type: true,
            },
            distinct: ['type'],
        });

        const uniqueTypes = types.map(type => type.type.trim());
        const distinctTypes = Array.from(new Set(uniqueTypes));

        return NextResponse.json(distinctTypes, { status: 200 });
    } catch (error) {
        console.error('Erreur lors de la récupération des types de lieux:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des types de lieux' },
            { status: 500 }
        );
    }
}
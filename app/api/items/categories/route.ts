import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Route API pour récupérer les catégories d'items
 * Méthode: GET
 * @returns La liste des catégories d'items
 */
export async function GET() {
    try {
        const categories = await prisma.item.findMany({
            select: {
                category: true,
            },
            distinct: ['category'],
        });

        const uniqueCategories = categories.map(category => category.category.trim());
        const distinctCategories = Array.from(new Set(uniqueCategories));

        return NextResponse.json(distinctCategories, { status: 200 });
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories d\'items:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des catégories d\'items' },
            { status: 500 }
        );
    }
}
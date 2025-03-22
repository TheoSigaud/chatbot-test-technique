import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

/**
 * Route API pour récupérer les objets
 * Méthode: GET
 * @returns La liste des objets
 */
export async function GET(request: Request) {
    try {
        // Extraire les paramètres de la requête
        const {searchParams} = new URL(request.url);
        const nameFilter = searchParams.get('nameFilter') || '';
        let categoryFilter = searchParams.get('categoryFilter') || '';

        if (categoryFilter === 'all') categoryFilter = '';

        // Récupérer les objets depuis la base de données avec un filtre sur le nom et la catégorie
        const items = await prisma.item.findMany({
            where: {
                name: {
                    contains: nameFilter,
                },
                category: {
                    contains: categoryFilter,
                }
            },
        });

        return NextResponse.json(items, {status: 201});
    } catch (error) {
        console.error('Erreur lors de la récupération des objets:', error);

        // Retourner une erreur 500 en cas d'échec
        return NextResponse.json(
            {error: 'Erreur lors de la récupération des lieux'},
            {status: 500}
        );
    }
}

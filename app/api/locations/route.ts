import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Route API pour récupérer les lieux
 * Méthode: GET
 * @returns La liste des lieux
 */

export async function GET(request: Request) {
  try {
    // Extraire les paramètres de la requête
    const { searchParams } = new URL(request.url);
    const nameFilter = searchParams.get('nameFilter') || '';
    let typeFilter = searchParams.get('typeFilter') || '';

    if (typeFilter === 'all') typeFilter = '';

    // Récupérer les objets depuis la base de données avec un filtre sur le nom et le type
    const items = await prisma.location.findMany({
      where: {
        name: {
          contains: nameFilter,
        },
        type: {
          contains: typeFilter,
        }
      },
    });

    return NextResponse.json(items, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la récupération des lieux:', error);

    // Retourner une erreur 500 en cas d'échec
    return NextResponse.json(
        { error: 'Erreur lors de la récupération des lieux' },
        { status: 500 }
    );
  }
}
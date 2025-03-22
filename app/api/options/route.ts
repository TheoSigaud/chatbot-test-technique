import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Route API pour récupérer les options
 * Méthode: GET
 * @returns La liste des options
 */
export async function GET(request: Request) {
  try {
    // Extraire les paramètres de la requête
    const { searchParams } = new URL(request.url);
    const nameFilter = searchParams.get('nameFilter') || '';

    // Récupérer les options depuis la base de données avec un filtre sur le nom
    const options = await prisma.option.findMany({
      where: {
        name: {
          contains: nameFilter,
        }
      }
    });

    return NextResponse.json(options, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la récupération des options:', error);
    
    // Retourner une erreur 500 en cas d'échec
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des options' },
      { status: 500 }
    );
  }
}
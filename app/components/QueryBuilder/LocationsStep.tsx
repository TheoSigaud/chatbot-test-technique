import { useEffect, useState } from "react";
import { Location } from '@prisma/client';
import Spinner from "@/app/components/Utils/Spinner";
import { DataTable } from "@/app/components/QueryBuilder/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import { SelectFilter } from "@/app/components/QueryBuilder/SelectFilter";

/**
 * Composant de sélection de lieux
 * @param onLocationSelect
 * @param selectedLocation
 */
export default function LocationsStep({ onLocationSelect, selectedLocation }: { onLocationSelect: (location: string[]) => void, selectedLocation: string[] }) {
    const [locations, setLocations] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [nameFilter, setNameFilter] = useState<string>("");
    const [typeFilter, setTypeFilter] = useState<string>("");
    const [types, setTypes] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await getLocations();
        };
        fetchData();
    }, [nameFilter, typeFilter]);

    useEffect(() => {
        const fetchData = async () => {
            await getTypes();
        };
        fetchData();
    }, []);

    /**
     * Récupère les lieux depuis l'API
     */
    const getLocations = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/locations?nameFilter=${nameFilter}&typeFilter=${typeFilter}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des lieux');
            }

            const data = await response.json();
            setLocations(data);
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            await new Promise(resolve => setTimeout(resolve, 500));
            setIsLoading(false);
        }
    }

    /**
     * Récupère les types de lieux depuis l'API
     */
    const getTypes = async () => {
        try {
            const response = await fetch('/api/locations/types', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des types de lieux');
            }

            const data = await response.json();
            setTypes(data);
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    /**
     * Gère le changement de sélection
     * @param id
     * @param isSelected
     */
    const handleSelect = (id: string, isSelected: boolean) => {
        let updatedSelection: string[] = [...selectedLocation];

        if (isSelected) {
            updatedSelection.push(id);
        } else {
            updatedSelection = updatedSelection.filter(item => item !== id);
        }
        onLocationSelect(updatedSelection);
    };


    /**
     * Colonnes du tableau
     */
    const columns: ColumnDef<Location>[] = [
        {
            id: "select",
            cell: ({ row }) => (
                <Checkbox
                    checked={selectedLocation.includes(row.original.name)}
                    onCheckedChange={(value) => {
                        handleSelect(row.original.name, !!value);
                        row.toggleSelected(!!value);
                    }}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: "Nom",
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => <div>{row.getValue("type")}</div>,
        },
    ];

    /**
     * Gère le changement de filtre par colonne
     * @param filter
     */
    const handleColumnFilterChange = (filter: string) => {
        setTypeFilter(filter);
    };

    return (
        <div className="mt-10">
            <div className="flex items-center space-x-4 mb-4">
                <Input
                    placeholder="Recherche par nom..."
                    value={nameFilter}
                    onChange={(event) => setNameFilter(event.target.value)}
                    className="max-w-sm"
                />
                <SelectFilter options={types} onFilterChange={handleColumnFilterChange} />
            </div>
            {isLoading ? (
                <div className="flex justify-center mt-10">
                    <Spinner />
                </div>
            ) : (
                <DataTable data={locations} columns={columns} />
            )}
        </div>
    );
}
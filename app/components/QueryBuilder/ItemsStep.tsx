import { useEffect, useState } from "react";
import { Item } from '@prisma/client';
import Spinner from "@/app/components/Utils/Spinner";
import { DataTable } from "@/app/components/QueryBuilder/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import { SelectFilter } from "@/app/components/QueryBuilder/SelectFilter";

/**
 * Composant de sélection d'éléments
 * @param onItemSelect
 * @param selectedItem
 */
export default function ItemsStep({ onItemSelect, selectedItem }: { onItemSelect: (item: string[]) => void, selectedItem: string[] }) {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [nameFilter, setNameFilter] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await getItems();
        };
        fetchData();
    }, [nameFilter, categoryFilter]);

    useEffect(() => {
        const fetchData = async () => {
            await getCategories();
        };
        fetchData();
    }, []);

    /**
     * Récupère les éléments depuis l'API
     */
    const getItems = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/items?nameFilter=${nameFilter}&categoryFilter=${categoryFilter}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des éléments');
            }

            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            await new Promise(resolve => setTimeout(resolve, 500));
            setIsLoading(false);
        }
    }

    /**
     * Récupère les catégories d'éléments depuis l'API
     */
    const getCategories = async () => {
        try {
            const response = await fetch('/api/items/categories', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des catégories d\'éléments');
            }

            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    /**
     * Gère la sélection d'un élément
     * @param id
     * @param isSelected
     */
    const handleSelect = (id: string, isSelected: boolean) => {
        let updatedSelection: string[] = [...selectedItem];

        if (isSelected) {
            updatedSelection.push(id);
        } else {
            updatedSelection = updatedSelection.filter(item => item !== id);
        }
        onItemSelect(updatedSelection);
    };

    /**
     * Colonnes du tableau
     */
    const columns: ColumnDef<Item>[] = [
        {
            id: "select",
            cell: ({ row }) => (
                <Checkbox
                    checked={selectedItem.includes(row.original.name)}
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
            accessorKey: "category",
            header: "Catégorie",
            cell: ({ row }) => <div>{row.getValue("category")}</div>,
        },
    ];

    /**
     * Gère le changement de filtre de colonne
     * @param filter
     */
    const handleColumnFilterChange = (filter: string) => {
        setCategoryFilter(filter);
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
                <SelectFilter options={categories} onFilterChange={handleColumnFilterChange} />
            </div>
            {isLoading ? (
                <div className="flex justify-center mt-10">
                    <Spinner />
                </div>
            ) : (
                <DataTable data={items} columns={columns} />
            )}
        </div>
    );
}
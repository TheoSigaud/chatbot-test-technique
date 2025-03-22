import { useEffect, useState } from "react";
import { Option } from '@prisma/client';
import Spinner from "@/app/components/Utils/Spinner";
import { Input } from "@/app/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";

/**
 * Composant de sélection d'une option
 * @param onOptionSelect
 * @param selectedOption
 */
export default function OptionsStep({ onOptionSelect, selectedOption }: { onOptionSelect: (option: string) => void, selectedOption: string }) {
    const [options, setOptions] = useState<Option[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [nameFilter, setNameFilter] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            await getOptions();
        };
        console.log('selectedOption', selectedOption);
        fetchData();
    }, [nameFilter]);

    /**
     * Récupère les options depuis l'API
     */
    const getOptions = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/options?nameFilter=${nameFilter}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des options');
            }

            const data = await response.json();
            setOptions(data);
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            await new Promise(resolve => setTimeout(resolve, 500));
            setIsLoading(false);
        }
    }

    /**
     * Gère le changement d'option
     * @param optionName
     */
    const handleOptionChange = (optionName: string) => {
        const selectedOption = options.find(option => option.name === optionName);
        if (selectedOption) {
            onOptionSelect(selectedOption.name);
        }
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
            </div>
            {isLoading ? (
                <div className="flex justify-center mt-10">
                    <Spinner />
                </div>
            ) : options.length > 0 ? (
                <RadioGroup defaultValue={selectedOption} onValueChange={handleOptionChange}>
                    {options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.name} id={option.id} />
                            <Label className="text-gray-500" htmlFor={option.id}>{option.name}</Label>
                            <span className="text-gray-500">({option.description})</span>
                        </div>
                    ))}
                </RadioGroup>
            ) : (
                <span>Aucune donnée trouvée</span>
            )}
        </div>
    );
}
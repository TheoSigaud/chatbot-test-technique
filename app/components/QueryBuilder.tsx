import {useCallback, useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/app/components/ui/dialog";
import OptionsStep from "@/app/components/QueryBuilder/OptionsStep";
import LocationsStep from "@/app/components/QueryBuilder/LocationsStep";
import ItemsStep from "@/app/components/QueryBuilder/ItemsStep";

/**
 * Composant de construction de requête
 * @param setMessage
*/
export default function QueryBuilder({setMessage}: { setMessage: (message: string) => void }) {
    const [step, setStep] = useState<number>(1);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<string[]>([]);

    /**
     * Gère la sélection de l'option
     * @param option
     */
    const handleOptionSelect = useCallback(async (option: string) => {
        setSelectedOption(option);
    }, []);

    /**
     * Gère la sélection des lieux
     * @param locations
     */
    const handleLocationSelect = useCallback(async (locations: string[]) => {
        setSelectedLocation(locations);
    }, []);

    /**
     * Gère la sélection des items
     * @param items
     */
    const handleItemSelect = useCallback(async (items: string[]) => {
        setSelectedItem(items);
    }, []);

    /**
     * Réinitialise les lieux et items sélectionnés quand l'option change
     */
    useEffect(() => {
        setSelectedLocation([]);
        setSelectedItem([]);
    }, [selectedOption]);


    /**
     * Rend l'étape actuelle en fonction de l'option sélectionnée
     */
    const renderStep = () => {
        if (selectedOption === "item_details") {
            switch (step) {
                case 1:
                    return <OptionsStep onOptionSelect={handleOptionSelect} selectedOption={selectedOption} />;
                case 2:
                    return <ItemsStep onItemSelect={handleItemSelect} selectedItem={selectedItem} />;
                default:
                    return null;
            }
        } else if (selectedOption === "loc_details") {
            switch (step) {
                case 1:
                    return <OptionsStep onOptionSelect={handleOptionSelect} selectedOption={selectedOption} />;
                case 2:
                    return <LocationsStep onLocationSelect={handleLocationSelect} selectedLocation={selectedLocation} />;
                default:
                    return null;
            }
        } else {
            switch (step) {
                case 1:
                    return <OptionsStep onOptionSelect={handleOptionSelect} selectedOption={selectedOption} />;
                case 2:
                    return <LocationsStep onLocationSelect={handleLocationSelect} selectedLocation={selectedLocation} />;
                case 3:
                    return <ItemsStep onItemSelect={handleItemSelect} selectedItem={selectedItem} />;
                default:
                    return null;
            }
        }
    };

    /**
     * Vérifie si l'utilisateur peut passer à l'étape suivante
     */
    const canProceedToNextStep = () => {
        if (step === 1 && !selectedOption) return false;
        if (step === 2 && selectedOption === "item_details" && selectedItem.length === 0) return false;
        if (step === 2 && selectedLocation.length === 0 && selectedOption !== 'item_details') return false;
        if (step === 3 && selectedItem.length === 0) return false;
        return true;
    };

    /**
     * Gère la soumission finale
     */
    const handleSubmit = () => {
        const locationText = selectedLocation.length > 0 ? ` pour les lieux ${selectedLocation.join(', ')}` : '';
        const itemText = selectedItem.length > 0 ? ` pour les items ${selectedItem.join(', ')}` : '';
        const message = `Je veux que tu me récupères l'option ${selectedOption}${locationText}${itemText}`;
        setMessage(message)

        setStep(1);
        setSelectedOption("");
        setSelectedLocation([]);
        setSelectedItem([]);
    };

    return (
        <>
            <Dialog>
                <DialogTrigger className="rounded-full cursor-pointer text-white bg-gray-300 p-2 w-10 h-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M13.216 1.956a.79.79 0 0 0-1.431 0l-.582 1.247l-1.247.582a.79.79 0 0 0 0 1.43l1.247.582l.582 1.247a.79.79 0 0 0 1.43 0l.582-1.247l1.247-.582a.79.79 0 0 0 0-1.43l-1.247-.582zm-1.14 1.739l.424-.908l.424.908a.8.8 0 0 0 .381.381l.908.424l-.908.424a.8.8 0 0 0-.381.381l-.424.908l-.424-.908a.8.8 0 0 0-.381-.381l-.908-.424l.908-.424a.8.8 0 0 0 .381-.381M5.232 4.989a.847.847 0 0 1 1.536 0l.714 1.53l1.529.713a.847.847 0 0 1 0 1.536l-1.53.714l-.713 1.529a.847.847 0 0 1-1.536 0l-.714-1.53l-1.529-.713a.847.847 0 0 1 0-1.536l1.53-.714zm.768.72l-.599 1.283a.85.85 0 0 1-.41.41L3.709 8l1.284.599c.18.084.325.23.41.41L6 10.291l.599-1.284a.85.85 0 0 1 .41-.41L8.291 8l-1.284-.599a.85.85 0 0 1-.409-.41zm12.232 5.28a.847.847 0 0 1 1.536 0l.714 1.53l1.529.713a.847.847 0 0 1 0 1.536l-1.53.714l-.713 1.529a.847.847 0 0 1-1.536 0l-.714-1.53l-1.529-.713a.847.847 0 0 1 0-1.536l1.53-.714zm.768.72l-.599 1.283a.85.85 0 0 1-.41.41L16.709 14l1.284.599c.18.084.325.23.41.41L19 16.291l.599-1.284a.85.85 0 0 1 .41-.41L21.292 14l-1.283-.599a.85.85 0 0 1-.41-.41zm-16.639 7.8l-.5-.008a.5.5 0 0 1 .147-.346l7.036-7.037l.013-.012l3.535-3.535a.5.5 0 0 1 .345-.146l.008.5l-.008-.5h.025a1 1 0 0 1 .17.013c.104.014.247.04.413.093c.334.107.763.32 1.18.736c.416.417.628.845.735 1.18a2.3 2.3 0 0 1 .105.542l.001.04v.024l-.5-.007l.5.008a.5.5 0 0 1-.146.346L4.836 21.984a.5.5 0 0 1-.345.146l-.008-.5l.008.5h-.025l-.041-.002a2.3 2.3 0 0 1-.542-.105a2.9 2.9 0 0 1-1.18-.735a2.9 2.9 0 0 1-.735-1.18a2.3 2.3 0 0 1-.105-.542l-.002-.04V19.5zM13.125 9.452l-2.76 2.76c.26.124.544.311.824.59c.279.28.466.565.59.824l2.76-2.76l-.032-.115a1.9 1.9 0 0 0-.49-.777a1.9 1.9 0 0 0-.776-.49zM11 14.406l-.032-.12a1.9 1.9 0 0 0-.486-.776a1.9 1.9 0 0 0-.777-.487l-.119-.032l-6.698 6.699q.012.051.032.115c.065.202.2.486.49.777c.291.29.575.426.777.49q.063.02.116.032z"/>
                    </svg>
                </DialogTrigger>
                <DialogContent className="sm:max-w-8/12">
                    <DialogHeader>
                        <DialogTitle>Aide à la création de prompt</DialogTitle>
                    </DialogHeader>
                    <div>
                        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base">
                            <li className={`flex w-full items-center ${step === 1 ? 'text-indigo-600' : ''} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}>
                                <span
                                    className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                                    <span
                                        className={`me-2 ${step === 1 ? 'bg-indigo-600 rounded-full py-2 px-4 text-white' : ''}`}>1</span>
                                    <span className="inline-flex sm:ms-2">Options</span>
                                </span>
                            </li>
                            <li className={`flex w-full items-center ${step === 2 ? 'text-indigo-600' : ''} after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}>
                                <span
                                    className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                                    <span
                                        className={`me-2 ${step === 2 ? 'bg-indigo-600 rounded-full py-2 px-4 text-white' : ''}`}>2</span>
                                    <span className="inline-flex sm:ms-2">{selectedOption === "item_details" ? "Objets" : "Lieux"}</span>
                                </span>
                            </li>
                            {selectedOption !== "item_details" && selectedOption !== "loc_details" && (
                                <li className={`flex items-center ${step === 3 ? 'text-indigo-600' : ''}`}>
                                    <span
                                        className={`me-2 ${step === 3 ? 'bg-indigo-600 rounded-full py-2 px-4 text-white' : ''}`}>3</span>
                                    <span className="inline-flex sm:ms-2">Objets</span>
                                </li>
                            )}
                        </ol>

                        {renderStep()}

                        <div className="flex justify-end mt-4 gap-4">
                            {step > 1 && (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    aria-label="Étape précédente"
                                    className="border border-indigo-600 text-indigo-600 cursor-pointer hover:bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center disabled:opacity-50 shadow-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4 "
                                         viewBox="0 0 16 16">
                                        <path fill="currentColor" fillRule="evenodd"
                                              d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8"
                                              clipRule="evenodd"/>
                                    </svg>
                                    Retour
                                </button>
                            )}

                            {step < 3 && (selectedOption !== "item_details" && selectedOption !== "loc_details" || step < 2) ? (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    aria-label="Étape suivante"
                                    className="border border-indigo-600 text-indigo-600 cursor-pointer hover:bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center disabled:opacity-50 shadow-sm"
                                    disabled={!canProceedToNextStep()}
                                >
                                    Étape suivante
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                                         className="ml-2 h-4 w-4">
                                        <path fill="currentColor" fillRule="evenodd"
                                              d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8"
                                              clipRule="evenodd"/>
                                    </svg>
                                </button>
                            ) : (
                                <DialogClose asChild>
                                    <button
                                        disabled={!canProceedToNextStep()}
                                        onClick={handleSubmit}
                                        aria-label="Valider"
                                        className="bg-indigo-600 cursor-pointer text-white hover:bg-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center disabled:opacity-50 shadow-sm"
                                    >
                                        Valider
                                    </button>
                                </DialogClose>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
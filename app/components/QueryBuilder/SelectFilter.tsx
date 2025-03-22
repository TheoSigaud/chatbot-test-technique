import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";

interface ColumnFilterDropdownProps {
    options: string[];
    onFilterChange: (filter: string) => void;
}

/**
 * Composant de filtre de colonne avec un select
 * @param options
 * @param onFilterChange
 */
export function SelectFilter({ options, onFilterChange }: ColumnFilterDropdownProps) {
    return (
        <div className="flex items-center">
            <Select defaultValue="all" onValueChange={onFilterChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="all">Tout</SelectItem>
                        {options.map((option, index) => (
                            <SelectItem key={index} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { CountryType } from "../components/CountryList";
import axios from "axios";

interface ContextType {
    countries: CountryType[],
    setCountries: React.Dispatch<React.SetStateAction<CountryType[]>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refresh: boolean
}

export const Context = createContext<ContextType>({
    countries: [],
    setCountries: () => { },
    loading: true,
    setLoading: () => { },
    refresh: true,
    setRefresh: () => { }
})


const CountriesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [countries, setCountries] = useState<CountryType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        async function getCountries(): Promise<void> {
            try {
                const res: any = await axios.get("https://restcountries.com/v3.1/all");
                setLoading(false);
                setCountries(res.data.slice(0, 20).map((item: any) => {
                    const data: CountryType = {
                        name: item.name.common,
                        capital: item.capital[0],
                        flag: item.flag,
                        population: item.population,
                        img: item.flags.png
                    }
                    return data;
                }))

            }
            catch (error) {
                console.log(error);
            };
        }
        getCountries();
    }, [refresh])

    return (
        <Context.Provider value={{ countries, setCountries, loading, setLoading, refresh, setRefresh }}>
            {children}
        </Context.Provider>
    )

}

export default CountriesProvider;
import { useContext, useEffect, useState } from "react"
import InfoCard from "../components/InfoCard"
import { AuthContext } from "../contexts/AuthProvider"
import { DataContext } from "../contexts/DataProvider"

export default function (){
    const {tickers, total} = useContext(DataContext)
    const {user} = useContext(AuthContext)
    const [loadingState, setLoadingState] = useState("Loading")

    useEffect(() => {
        async function handleLoad(){
            (tickers)?setLoadingState('Loaded'):setLoadingState('StillLoading')
        }
        handleLoad()
    }, [user])


    return (
        <div className="Back">
            <h1>{user.displayName}'s Portfolio</h1>
            <h2>Total Gains: ${total.toFixed(2)}</h2>
            {
                (loadingState === "Loading") ?
                <h1>Loading</h1>
                :
                <div id='portfolioTickers'>
                    {tickers.map((ticker) => <InfoCard ticker={ticker.ticker} key={ticker.id}/>)}
                </div>
            }
        </div>
    )
}
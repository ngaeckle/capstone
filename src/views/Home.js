import { useContext, useEffect, useState } from "react";
import { DataContext } from "../contexts/DataProvider";
import { AuthContext } from "../contexts/AuthProvider";
import InfoCard from "../components/InfoCard";


export default function Home() {
    const {getStockData} = useContext(DataContext)
    const {user, login, logout} = useContext(AuthContext)
    const stocks = ['AAPL', "MSFT", "GOOG", "AMZN"]
    const [data, setdata] = useState([])
    const [loadingState, setLoadingState] = useState("Loading")
    const [infocards, setInfoCards] = useState([])

    useEffect(()=>{
        async function handleLoad(){
            let list_of_data=[]
            let list_of_infocards=[]
            for (const stock of stocks){
                //let newData = await getStockData(stock)
                list_of_infocards.push(<InfoCard ticker={stock} hideLink={true}/>)
                //list_of_data.push(newData)
            }
            //setdata(list_of_data)
            setInfoCards(list_of_infocards)
            setLoadingState('Loaded')
        }
        handleLoad()
    }, [])

    return (
        <div className="Back">
            {
                (!user.loggedIn) ?
                <div id="loggedout">
                <div id='title'>
                <h1>Welcome to my Stock App</h1>
                <h1>Login to access more</h1>
                </div>
                <button className="btn btn-primary" id='btn' onClick={login}>Login</button>
                </div>
                :
                <div id="loggedin">
                    <div id='header'>
                    <h1>Welcome {user.displayName}!</h1>
                    </div>
                </div>
            }
            <div id='infocard-section'>
            {
                (loadingState === "Loading") ?
                <h1>Loading</h1>
                :
                [infocards]
            }
            </div>
        </div>
    )
}
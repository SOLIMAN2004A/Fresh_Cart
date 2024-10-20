/*import { createContext, useState } from "react";


export default function UserContextProvider(props){
    const [isLogin, setLogin] = useState(true)
   
    return <userContextProvider value={{isLogin, setLogin}}>
        {props.children}
    </userContextProvider>

}*/

import { createContext, useState } from "react";

// Create the context
export const userContext = createContext();

export default function UserContextProvider(props) {
    const [isLogin, setLogin] = useState(true);
   
    return (
        <userContext.Provider value={{ isLogin, setLogin }}>
            {props.children}
        </userContext.Provider>
    );
}



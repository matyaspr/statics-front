import { createContext } from "react";
import { useSocket } from "../Hooks/useSocket";


export const SocketContext = createContext();




export const SocketProvider = ({ children }) => {
    
    const { socket, online } = useSocket('http://localhost:3000');

    return (
        <SocketContext.Provider value={{ socket, online }} >
            {children}
        </SocketContext.Provider>
    )
}
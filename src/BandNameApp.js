import HomePage from "./HomePage"
import { SocketProvider } from "./Context/SocketContext"



export const BandNameApp = () => {
  return (
    <SocketProvider>
        <HomePage />
    </SocketProvider>
  )
}

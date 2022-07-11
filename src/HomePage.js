import { useContext } from "react";
import { BandAdd } from "./Components/BandAdd";
import { BandList } from "./Components/BandList";
import { GraphicsBands } from "./Components/GraphicsBands";
import { SocketContext } from "./Context/SocketContext";



function HomePage() {

  const { online } = useContext( SocketContext );

  

  return (
        <div className="container">
          <div className="alert">
            <p>
              Service status:
              { 
                online 
                ? <span className="text-success"> <strong> Online </strong> </span>
                : <span className="text-danger"> <strong> Offline </strong></span>
              }
            </p>
          </div>

          <h1>Statics Band</h1>
          <hr />

          <div className="container">
              <div className="col">
                <GraphicsBands />
              </div>
          </div>


          <div className="row">
            <div className="col-8">
              <BandList />
            </div>

            <div className="col-4">
              <BandAdd />
            </div>

          </div>

        </div>
    );
}

export default HomePage;

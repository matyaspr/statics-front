import { useContext, useState } from "react";
import { SocketContext } from "../Context/SocketContext";





export const BandAdd = () => {

  const { socket } = useContext(SocketContext);  
  const [ name, setName ] = useState('');


  const onAddName = (ev) => {
      ev.preventDefault();
      
      if (name.trim().length > 0) {
        socket.emit('add-band', { name });
        setName('');
      }
  }



  return (
      <>
        <h3>Add Band</h3>
        <hr />
        
        <form 
          onSubmit={ onAddName }
        >
            <input 
              className="form-control"
              placeholder="Add Band"  
              value={ name }
              onChange={ (ev) => setName(ev.target.value) }
            />
        </form>    
      </>
    )
}

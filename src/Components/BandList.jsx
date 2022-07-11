import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/SocketContext";






export const BandList = () => {

    const [bands, setBands] = useState([]);
    const { socket } = useContext(SocketContext);
    
    useEffect(() => {
      socket.on('current-bands', ( bands ) => {
        setBands( bands );
      })
      return () => socket.off('current-bands');
    }, [ socket ])
    

    const changeName = (event, id) => {
        const newName = event.target.value;

        setBands( bands.map( band => {
            if (band.id === id) {
                band.name = newName;
            }
            return band;
        }))
    }


    const onBlurNameBand = (id, name) => {
      socket.emit('change-name', { id, name });
    }

    const vote = ( id ) => {
      socket.emit('vote', { id } );
    }

    const voteDecrease = ( id ) => {
      socket.emit('vote-decrease', { id } );
    }

    const deleteBand = ( id ) => {
      socket.emit('delete-band', { id } );
    }

    const createRow = () => {
        return (
            bands.map( band => (
                <tr key={ band.id }>
                    <td> 
                        <button 
                          className="btn-sm btn-primary"
                          onClick={ () => vote(band.id) }
                        >       
                            +1 
                        </button> 
                    </td>
                    <td> 
                        <button 
                          className="btn-sm btn-secondary"
                          onClick={ () => voteDecrease(band.id) }
                        >       
                            -1 
                        </button> 
                    </td>
                    <td>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={ band.name }
                          onChange={ (e) => changeName(e, band.id) }
                          onBlur={ () => onBlurNameBand(band.id, band.name) }
                        />
                    </td>
                    <td>
                        <h3> { band.votes } </h3>
                    </td>
                    <td>
                        <button 
                          className="btn btn-danger"
                          onClick={ () => deleteBand(band.id) }
                        >
                          Borrar
                        </button>
                    </td>
                </tr>
            )
        ))
    }


    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    { createRow() }
                </tbody>
            </table>
        </>
    )
}

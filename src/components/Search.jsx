import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";


export default function Search({searchTerm, setSearchTerm, onSubmit, onSearch}) {            // Componente di ricerca che riceve lo stato e la funzione di aggiornamento come props
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

    
    useEffect(() => {                                                                        // UseEffect per sincronizzare lo stato locale con la prop searchTerm
        setLocalSearchTerm(searchTerm);
    }, [searchTerm]);                                                                        // Eseguito ogni volta che searchTerm cambia

    const handleClick = () => {                                                           // Funzione per gestire il click sul pulsante di ricerca
        setSearchTerm(localSearchTerm); 
        if (onSearch) {                                                                   // Se è stata passata una funzione onSearch, chiamala con il termine di ricerca locale
            onSearch(localSearchTerm);
        }
    };

    const handleSubmit = (e) => {                                                      // Funzione per gestire l'invio del form
        e.preventDefault();
        handleClick();                                                                 // Chiama handleClick per aggiornare lo stato e chiamare onSearch
        if (onSubmit) {
            onSubmit(e);
        }
    };
    
    return (
        <div className="d-flex flex-column flex-md-row col-12 col-md-3 justify-content-center align-items-center">
            <form  
                className="d-flex justify-content-center align-items-center np-form w-100 mt-2 mt-md-0"
                onSubmit={handleSubmit}
            >
                <input 
                    type="text" 
                    className="form-control border-0 shadow-none np-input" 
                    style={{padding: "7px 14px",}} 
                    placeholder="Cerca..." 
                    value={localSearchTerm} 
                    onChange={(e) => setLocalSearchTerm(e.target.value)} 
                />
                <button
                    className="btn"
                    type="submit"
                    onClick={handleClick}
                    style={{
                      background: "#ff6543",
                      color: "#fff",
                      borderRadius: "0 25px 25px 0",
                      border: "none",
                      padding: "8px 14px",
                    }}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </div>
    )
}
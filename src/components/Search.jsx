import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


export default function Search({searchTerm, setSearchTerm, onSubmit}) {
    return (
        <div className="d-flex flex-column flex-md-row col-12 col-md-3 justify-content-center align-items-center">
            <form  
                className="d-flex justify-content-center align-items-center np-form w-100 mt-2 mt-md-0"
                onSubmit={onSubmit}
            >
                <input 
                    type="text" 
                    className="form-control border-0 shadow-none np-input" 
                    style={{padding: "7px 14px",}} 
                    placeholder="Cerca..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button
                    className="btn"
                    type="submit"
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
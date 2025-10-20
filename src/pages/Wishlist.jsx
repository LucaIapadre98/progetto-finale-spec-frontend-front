import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function Wishlist (){

    const [loading, setLoading] = useState(true);                                       // Stato per il caricamento
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);                       // Stato per controllare la sidebar
    
    useEffect(() => {
        const saved = localStorage.getItem("wishlist");                                  // Recupera la wishlist dal localStorage se esiste
        setWishlist(saved ? JSON.parse(saved) : []);                                     // Altrimenti ritorna con un array vuoto, converte in oggetto JS
        setLoading(false);                                                                // Imposta loading a false dopo aver recuperato la wishlist
    }, []);
    
    const [wishlist, setWishlist] = useState(() => {                           // Recupera la wishlist dal localStorage se esiste
        const saved = localStorage.getItem("wishlist");                        
        return saved ? JSON.parse(saved) : [];                                 // Altrimenti ritorna con un array vuoto     
    });

    const toggleWishlist = (product) => {
        console.log('Prodotto da aggiungere alla wishlist:', product); 
        console.log('Prezzo del prodotto:', product.price); 
        
        let updated;
        if (wishlist.some(item => item.id === product.id)) {
            updated = wishlist.filter(item => item.id !== product.id);
        } else {
            const completeProduct = {
                id: product.id,
                title: product.title,
                category: product.category,
            };
            console.log('Prodotto completo da salvare:', completeProduct); // Debug
            updated = [...wishlist, completeProduct];
        }
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    return (
        <div 
            className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}                                  // Se la sidebar è aperta, aggiungi la classe 'active'
            onClick={() => setIsSidebarOpen(false)}                                                         // Chiudi la sidebar al click sull'overlay
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
                opacity: isSidebarOpen ? 1 : 0,
                visibility: isSidebarOpen ? 'visible' : 'hidden',
                transition: 'opacity 0.3s ease'
            }}
        >
        <div 
            className={`wishlist-sidebar ${isSidebarOpen ? 'open' : ''}`}
            onClick={(e) => e.preventDefault()}
            style={{
                position: 'fixed',
                top: 0,
                right: isSidebarOpen ? 0 : '-400px',
                width: '400px',
                height: '100%',
                backgroundColor: 'white',
                boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
                transition: 'right 0.3s ease',
                zIndex: 1001,
                padding: '20px',
                overflowY: 'auto'
            }}
        >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#ff6543' }}>Wishlist</h3>
            <button 
                onClick={() => setIsSidebarOpen(false)}                                                     // Chiudi la sidebar al click sul bottone
                style={{
                    border: 'none',
                    background: 'transparent',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: "black"
                }}
            >
                ×
            </button>
        </div>
        {wishlist.length === 0 ? (
            <p style={{ textAlign: 'center', color: "black ", marginTop: '50px', fontSize: '18px' }}>
                La tua wishlist è vuota
            </p>
        ) : (
            <div>
                {wishlist.map(item => (
                    <div 
                        key={item.id} 
                        style={{
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            padding: '15px',
                            marginBottom: '15px',
                            backgroundColor: '#f9f9f9'
                        }}
                    >
                        <h5 style={{ margin: '0 0 5px 0', color: '#333' }}>{item.title}</h5>
                        <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>{item.category}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link 
                                to={`/products/${item.id}`} 
                                style={{ 
                                    color: '#ff6543', 
                                    textDecoration: 'none',
                                    fontSize: '14px'
                                }}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                Visualizza dettagli
                            </Link>
                            <button
                                onClick={() => toggleWishlist(item)}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    color: '#ff6543'
                                }}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
        </div>
        </div>
    );
}


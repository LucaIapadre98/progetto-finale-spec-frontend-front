export default function Footer (){
    return (
        <footer className="container-footer">
          <div className="row">
            <div className="col-10">
                <ul className="list-unstyled">
                  <li className="fw-bold mb-2">
                    <h5>SmartStore</h5>
                  </li>
                  <li>
                  <p>
                    SmartStore è il tuo negozio di fiducia per smartphone e tablet di qualità. Offriamo una vasta selezione di dispositivi delle migliori marche come Apple, Samsung, Xiaomi e Huawei. Con prezzi
                    competitivi, spedizione rapida e assistenza clienti dedicata.
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-2">
              <h5>Contattaci</h5>
              <p>Hai domande o suggerimenti?</p>
              <p>
                scrivici a{" "}
                <a className="text-white" href="mailto:tech.store.team.2@gmail.com" target="_blank">
                  SmartStore@gmail.com
                </a>
              </p>
              <p>Hai bisogno di assistenza?</p>
              <p>
                Contattaci.{" "}
                <a className="text-white" href="tel:+3933344455566" target="_blank">
                  +39 333 444 555 66
                </a>
              </p>
            </div>
          </div>
        </footer>
    )

};
import React from "react";
import "./InfoPage.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const tireData = [
  { type: "Soft", description: "Cele mai rapide pneuri, aderență maximă, uzură rapidă", image: "/images/soft.png" },
  { type: "Medium", description: "Un echilibru între viteză și durabilitate.", image: "/images/medium.png" },
  { type: "Hard", description: "Rezistente pentru strategii lungi, cu aderență mai scăzută.", image: "/images/hard.png" },
  { type: "Inters", description: "Pneuri pentru condiții de ploaie ușoară.", image: "/images/inters.png" },
  { type: "Wet", description: "Pneuri pentru ploaie abundentă și aderență maximă pe apă.", image: "/images/wet.png" },
];

const circuitData = [
  { name: "Silverstone", description: "Silverstone se declară casa curselor britanice și, cu o istorie care se întinde încă din 1948, există o anumită justificare pentru această afirmație. Întotdeauna unul dintre cele mai rapide circuite, Silverstone s-a dezvoltat de la originile aerodromului său din vremuri într-unul dintre cele mai recunoscute în motorsportul mondial. Casa Marelui Premiu al Marii Britanii pe două și patru roți, circuitul are astăzi propriul muzeu interactiv, Silverstone Experience, precum și parcuri de afaceri înfloritoare, care găzduiesc afaceri de motorsport, inclusiv echipa Aston Martin Formula One. În afara Grand Prix-ului, în fiecare an pista găzduiește o mare varietate de curse naționale și o întâlnire istorică extrem de populară, Silverstone Classic.", image: "/images/silverstone.png" },
  { name: "Monaco", description: "Marele Premiu de la Monaco este bijuteria coroanei programului de Formula 1, o revenire anacronică în era modernă conștientă de siguranță, care poate continua datorită strălucirii atât a împrejurimilor, cât și a oamenilor frumoși care îl fac un eveniment de neratat anual. fix pe calendarele lor sociale. Descris în mod memorabil de Nelson Piquet ca fiind „ca mersul cu bicicleta în sufrageria ta”, circuitul stradal poate să nu ofere întotdeauna cele mai bune curse, dar cu siguranță are mult spectacol. În afară de Formula 1, Marele Premiu istoric al circuitului este un eveniment popular, care se desfășoară de obicei în săptămânile dinaintea cursei de Formula 1.  În ultimii ani, acestuia i s-a alăturat Monaco ePrix, folosind o variantă adaptată a circuitului pentru cursele de Formula E.", image: "/images/monaco.png" },
  { name: "Monza", description: "Monza este o adevărată casă a vitezei, de neegalat în întreaga lume pentru simțul istoriei și pasiunii sale, alimentată parțial de istoria lungă și, de asemenea, de fanatismul fanilor italieni, tifosi. Cu rămășițele în descompunere constantă a circuitului de mare viteză care oferă un fundal printre copacii parcului, atmosfera de aici este ca a niciunui alt circuit; un amestec de viteză, melodramă și mai mult decât un indiciu de melancolie. Astăzi, Monza își păstrează popularitatea și este un element de bază pe calendarele multor serii de curse, inclusiv Formula 1. Este, de asemenea, un loc de testare folosit în mod regulat, în timp ce parcul rămâne deschis publicului.", image: "/images/monza.png" },
];

const InfoPage = () => {
  return (
    <div className="info-container">
      <h1>Informații</h1>

      {/* Pneuri */}
      <section className="tires-section">
        <h2 className="tires-title">Pneuri</h2>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className="carousel"
          containerClass="carousel-container"
          draggable
          infinite
          keyBoardControl
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
          }}
          showDots={false}
          slidesToSlide={1}
        >
          {tireData.map((tire, index) => (
            <div key={index} className="tire-card">
              <img src={tire.image} alt={tire.type} className="tire-image" />
              <div className="carousel-text">{tire.description}</div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Downforce */}
      <section className="downforce-section">
        <h2>Downforce</h2>
        <div className="downforce-wrapper">
          <div className="downforce-text">
            <p>
              Downforce-ul influențează semnificativ aderența monoposturilor. Astfel, exista 3 nivele de downforce: scăzut, mediu și ridicat.
              Nivelul de downforce este ajustat de echipe în funcție de cerințele circuitului și condițiilor meteo. Nivelul scăzut de downforce
              este folosit pe circuite rapide, pentru a obține viteze maxime, în timp ce nivelul ridicat este folosit pe circuite tehnice pentru
              a crește aderența în viraje. Downforce-ul mediu este un compromis între cele două. Acest nivel este modificat prin elementele aerodinamice
              de pe monoposturi, cum ar fi aripile față și spate, care sunt ajustate pentru a obține performanța optimă pe circuit.
            </p>
          </div>
          <div className="downforce-image">
            <img src="/images/downforce.jpg" alt="Downforce" />
          </div>
        </div>
      </section>


      {/* Condiții Meteo */}
      <section className="weather-section">
        <h2>Condiții Meteo</h2>
        <div className="weather-content">
          <div className="weather-card">
            <img src="/images/sunny.jpg" alt="Soare" />
            <p>Performanță optimă în condiții uscate și însorite. În aceste condiții se stabilesc cele mai rapide tururi pe circuite. </p>
          </div>
          <div className="weather-card">
            <img src="/images/rain.jpg" alt="Ploaie" />
            <p>Pneuri speciale și viteze mai scăzute în condiții de ploaie. Necesită mult mai multă concentrare din partea piloților, deoarece monoposturile sunt mai greu de controlat.</p>
          </div>
        </div>
      </section>

      {/* Circuite */}
      <section className="circuits-section">
        <h2>Circuite</h2>
        <p>
          Circuitele din Formula 1 variază de la piste rapide până la circuite tehnice și stradale.
          Fiecare circuit prezintă provocări unice pentru echipe și piloți.
        </p>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          className="carousel"
          containerClass="carousel-container"
          draggable
          infinite
          keyBoardControl
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
          }}
          showDots={true}
          slidesToSlide={1}
        >
          {circuitData.map((circuit, index) => (
            <div key={index} className="circuit-card">
              <img src={circuit.image} alt={circuit.name} />
              <div className="carousel-text">{circuit.description}</div>
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  );
};

export default InfoPage;

export default function BgFx() {
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden" 
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* cass */}
      <div 
        className="absolute bottom-0 right-[5%] w-[40vw] h-[75vh]"
        style={{
          backgroundColor: "#161D27", // A cor que vai preencher a imagem
          opacity: 0.8,
          // Propriedades da máscara
          WebkitMaskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/a/a0/OW2_Cassidy.png/revision/latest?cb=20241108201305')`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "bottom right",
          maskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/a/a0/OW2_Cassidy.png/revision/latest?cb=20241108201305')`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "bottom right",
        }}
      />

      {/* genji */}
      <div 
        className="absolute bottom-5 right-[80%] w-[40vw] h-[65vh]"
        style={{
          backgroundColor: "#161D27", // A cor que vai preencher a imagem
          opacity: 0.8,
          // Propriedades da máscara
          WebkitMaskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/17/OW2_Genji.png/revision/latest?cb=20241102133634')`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "bottom right",
          maskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/17/OW2_Genji.png/revision/latest?cb=20241102133634')`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "bottom right",
        }}
      />


      {/* Fundo Circuit/Tech Gigante */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMaxYMid slice"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.8 }}
      >
        {/* Traço Principal */}
        <path 
          d="M 2100 150 L 1400 150 L 750 650 L 1300 700 L 700 1150 L 900 1200 L 400 1550" 
          stroke="#161D27" 
          strokeWidth="140" 
          strokeLinejoin="miter" 
          strokeMiterlimit="10"
        />
        
      </svg>

      {/* Dois 'X' gordinhos */}
      <div className="bg-fx-x bg-fx-x-1" />
      {/*<div className="bg-fx-x bg-fx-x-2" />*/}
      
      {/* O triângulo */}
      

      {/* a linha */}
      <div className="bg-fx-linha" />

      {/* Anran */}
      <div 
        className="absolute bottom-193 right-[0%] w-[10vw] h-[65vh]"
        style={{
          // 1. Mudei para preto puro para dar o máximo de contraste escuro
          backgroundColor: "#000000", 
          // 2. Aumentei a opacidade para 1 (100% visível, sem transparência)
          opacity: 0.3, 
          // Propriedades da máscara (mantidas iguais)
          WebkitMaskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f0/Spray_Anran_Cool_Down.png/revision/latest?cb=20260620155646')`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "bottom right",
          maskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f0/Spray_Anran_Cool_Down.png/revision/latest?cb=20260620155646')`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "bottom right",
        }}
      />

      {/* bastion */}
      <div 
        className="absolute bottom-178 right-[40%] w-[10vw] h-[65vh]"
        style={{
          backgroundColor: "#161D27",
          opacity: 0.8,
          transform: 'rotate(-37deg)', 
          WebkitMaskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/92/Perk_LindholmExplosives.png')`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "bottom right",
          maskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/92/Perk_LindholmExplosives.png')`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "bottom right",
        }}
      />

      {/* caveira */}
      <div 
        className="absolute bottom-8 right-[37%] w-[6vw] h-[66vh]"          
        style={{
          backgroundColor: "#161D27",
          opacity: 0.8,
          transform: 'rotate(-37deg)', 
          WebkitMaskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/6/68/Ability-mccree4.png/revision/latest/scale-to-width-down/40?cb=20150309114122')`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "bottom right",
          maskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/6/68/Ability-mccree4.png/revision/latest/scale-to-width-down/40?cb=20150309114122')`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "bottom right",
        }}
      />

      {/* Porco */}
      <div 
        className="absolute bottom-16 right-[55%] w-[12vw] h-[40vh]"          
        style={{
          backgroundColor: "#161D27",
          opacity: 0.8,
          transform: 'rotate(0deg)', 
          WebkitMaskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/95/Ability-Roadhog4.png/revision/latest/scale-to-width-down/40?cb=20221128013701')`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "bottom right",
          maskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/95/Ability-Roadhog4.png/revision/latest/scale-to-width-down/40?cb=20221128013701')`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "bottom right",
        }}
      />

      {/* leao */}
      <div 
        className="absolute bottom-100 right-[27%] w-[20vw] h-[20vh]"          
        style={{
          backgroundColor: "#161D27",
          opacity: 0.8,
          transform: 'rotate(0deg)', 
          WebkitMaskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/5/53/Vendetta_onslaught_1.png/revision/latest/scale-to-width-down/40?cb=20251210192551')`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "bottom right",
          maskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/5/53/Vendetta_onslaught_1.png/revision/latest/scale-to-width-down/40?cb=20251210192551')`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "bottom right",
        }}
      />

      {/* leao */}
      <div 
        className="absolute bottom-194 right-[25%] w-[20vw] h-[4vh]"          
        style={{
          backgroundColor: "#161D27",
          opacity: 0.8,
          transform: 'rotate(-180deg)', 
          WebkitMaskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/9c/Abilities-sigma4.png/revision/latest/scale-to-width-down/40?cb=20190724134323')`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "bottom right",
          maskImage: `url('https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/9c/Abilities-sigma4.png/revision/latest/scale-to-width-down/40?cb=20190724134323')`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "bottom right",
        }}
      />

    </div>

    
  );
}
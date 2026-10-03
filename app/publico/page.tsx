"use client";

import { useEffect, useState } from "react";

const SHEET_API_URL = "/api/sheet";

const FALLBACK_CSV = `
,,,,,,,,,,
⚔️ ESCALA DO DUELO,,,,,TOTAL DUELOS,CONCLUÍDOS,PENDENTES,TOTAL JOGADORES,,
Quadro Oficial de Confrontos e Resultados do Torneio,,,,,32,1,31,64,,
,,,,,,,,,
,,,,,,,,,
,,,,,,,,,
,,,,,,,,,
Jogador A,BattleTag A,Plataforma A,Placar A,Placar B,Jogador B,BattleTag B,Plataforma B,Vencedor,Horário,
Seabound,Seabound#21555,PC,,,Luke,Luke#27915,PC,,"Sábado, 19:30h",
Henrique,Overtaker#21285,PC,,,KrisinBR#1211,KrisinBR#1211,PC,,"Sábado, 19:40h",
leonblack,leonblack#21328,XBOX Series S/X,,,Matheus/ Garcia,lonwannatalk#2536,PC,,"Sábado, 19:50h",
Icebebeco,Icebebeco#1930,XBOX One (Normal ou S),,,snow,snow#29326,PC,,"Sábado, 20:00h",
iLuny19,iLuny19#2491,PlayStation 4,,,Drummond,Drummond#11786,PC,,"Sábado, 20:10h",
Walterwhite,Walterwhite#23165,XBOX Series S/X,,,tody,Docinho#21662,PC,,"Sábado, 20:20h",
NEXTAGEII,NEXTAGEII#1645,PlayStadion 5,,,EficieAndre,EficieAndre#1914,PC,,"Sábado, 20:30h",
INBIAZ2000,INBIAZ2000#2305,PC,,,Kalton22,Kalton22#2919,XBOX Series S/X,,"Sábado, 20:40h",
TTVLEOLYRIOP,TTVLEOLYRIOP #1114,PlayStadion 5,,,NEXT,NEXT#12545,Xbox,,"Sábado, 20:50h",
fogo,fogooo#2122,PC,,,oscarzin1227,Oscarzin1227 #2503,PC,,"Sábado, 21:00h",
saiku,saiku#21790,XBOX One (Normal ou S),,,BritneyB,BritneyB#1988,PC,,"Sábado, 21:10h",
POSVSECTOMIA,POSVSECTOMIA,PC,,,Rato,Rato #21999,PC,,"Sábado, 21:20h",
Tori,Tori#22860,PC,,,HanzodoJob,HanzodoJob#1357,PC,,"Sábado, 21:30h",
RheaTracy,RheaTracy #1864,PC,,,XSaTurn0,XSaTurn0#1164,XBOX Series S/X,,"Sábado, 21:40h",
Viøłet,Viøłet#2832,PlayStation 4,,,CAFEINADO,Cafeinado#21268,PlayStation 4,,"Sábado, 21:50h",
yoshiki,luesancar#1517,Xbox,,,WindExile - André,Wind#1464,PC,,"Sábado, 22:00h",
Salomao2026,Salomao2021 #1712,PC,0,0,BlackWolf,BlackWolf#14881,XBOX One (Normal ou S),Empate,"Sexta-feira, 19:30h",
GYta,GYTA#21353,PlayStadion 5,,,dani02908,DANI02908#1120,PC,,"Sexta-feira, 19:40h",
chicobento,chicobento #21209,PC,,,Wilkher02,Wilkher02#2666 ,PlayStadion 5,,"Sexta-feira, 19:50h",
JUNDERZ,JUNDER#1325,PC,,,Alewoja,Alewoja#1608,XBOX Series S/X,,"Sexta-feira, 20:00h",
Salomao2021,Salomao2021 #1712,PC,,,Maria eduarda,Twilight#13390,XBOX One (Normal ou S),,"Sexta-feira, 20:10h",
C4BRAL,C4bral #1499,PC,,,GAB3,GaB3 #21760,PC,,"Sexta-feira, 20:20h",
Sivil,Sivil#11412,PC,,,Fussy,Fussy#21790,PC,,"Sexta-feira, 20:30h",
roquelando,roquelando16#2895,PC,,,Katz,Yuno9#1749,PC,,"Sexta-feira, 20:40h",
nightlucky,nightlucky#11893,PC,,,Monte,Monte,XBOX Series S/X,,"Sexta-feira, 20:50h",
NekroM,NekroM#11256,PC,,,Cegobomdmira,CegobomdMira#2359,PC,,"Sexta-feira, 21:00h",
SCOTTZIMMM,SCOTTZIMMM#1800,PC,,,Tchotcho1,Tchotcho1#1944,PC,,"Sexta-feira, 21:10h",
YUNNIjoga,YUNNIjoga#2520,PC,,,Squirtle,Squirtle#13638,PC,,"Sexta-feira, 21:20h",
Guilherme/NosferatuAlu,NosferatuAlu#21567,PC,,,MAGO,MAGO#12120,XBOX One (Normal ou S),,"Sexta-feira, 21:30h",
Faminto,OthalDoFamin#1399,XBOX Series S/X,,,LeandroCheat,LEANDROCHEAT#2184,XBOX One (Normal ou S),,"Sexta-feira, 21:40h",
Chara,Chara#12404,PC,,,Scaper,Scaper#21864,PC,,"Sexta-feira, 21:50h",
flopade,flopade#1214,PlayStadion 5,,,Negolukarai,Negolukarai#1113,PC,,"Sexta-feira, 22:00h",
,,,,,,,,,
,,,,,,,,,
,,,,,,,,,
⚔️ 2.ª RODADA — DEZESSEIS-AVOS DE FINAL (MD3) • 16 JOGOS,,,,,,,,,
Confronto,Jogador A,Main A,Plataforma A,Placar A,Placar B,Jogador B,Main B,Plataforma B,Vencedor,Status
Jogo 01,Vencedor Jogo 01,-,-,,,Vencedor Jogo 02,-,-,,Pendente
Jogo 02,Vencedor Jogo 03,-,-,,,Vencedor Jogo 04,-,-,,Pendente
Jogo 03,Vencedor Jogo 05,-,-,,,Vencedor Jogo 06,-,-,,Pendente
Jogo 04,Vencedor Jogo 07,-,-,,,Vencedor Jogo 08,-,-,,Pendente
Jogo 05,Vencedor Jogo 09,-,-,,,Vencedor Jogo 10,-,-,,Pendente
Jogo 06,Vencedor Jogo 11,-,-,,,Vencedor Jogo 12,-,-,,Pendente
Jogo 07,Vencedor Jogo 13,-,-,,,Vencedor Jogo 14,-,-,,Pendente
Jogo 08,Vencedor Jogo 15,-,-,,,Vencedor Jogo 16,-,-,,Pendente
Jogo 09,Vencedor Jogo 17,-,-,,0,Vencedor Jogo 18,-,-,,Pendente
Jogo 10,Vencedor Jogo 19,-,-,0,0,Vencedor Jogo 20,-,-,,Pendente
Jogo 11,Vencedor Jogo 21,-,-,,,Vencedor Jogo 22,-,-,,Pendente
Jogo 12,Vencedor Jogo 23,-,-,,,Vencedor Jogo 24,-,-,,Pendente
Jogo 13,Vencedor Jogo 25,-,-,,,Vencedor Jogo 26,-,-,,Pendente
Jogo 14,Vencedor Jogo 27,-,-,,,Vencedor Jogo 28,-,-,,Pendente
Jogo 15,Vencedor Jogo 29,-,-,,,Vencedor Jogo 30,-,-,,Pendente
Jogo 16,Vencedor Jogo 31,-,-,,,Vencedor Jogo 32,-,-,,Pendente
,,,,,,,,,
⚔️ 3.ª RODADA — OITAVAS DE FINAL (MD3) • 8 JOGOS,,,,,,,,,
Confronto,Jogador A,Main A,Plataforma A,Placar A,Placar B,Jogador B,Main B,Plataforma B,Vencedor,Status
Oitavas 01,Vencedor Jogo 01,-,-,,,Vencedor Jogo 02,-,-,,Pendente
Oitavas 02,Vencedor Jogo 03,-,-,,,Vencedor Jogo 04,-,-,,Pendente
Oitavas 03,Vencedor Jogo 05,-,-,,,Vencedor Jogo 06,-,-,,Pendente
Oitavas 04,Vencedor Jogo 07,-,-,,,Vencedor Jogo 08,-,-,,Pendente
Oitavas 05,Vencedor Jogo 09,-,-,0,0,Vencedor Jogo 10,-,-,,Pendente
Oitavas 06,Vencedor Jogo 11,-,-,,,Vencedor Jogo 12,-,-,,Pendente
Oitavas 07,Vencedor Jogo 13,-,-,,,Vencedor Jogo 14,-,-,,Pendente
Oitavas 08,Vencedor Jogo 15,-,-,,,Vencedor Jogo 16,-,-,,Pendente
,,,,,,,,,
⚔️ 4.ª RODADA — QUARTAS DE FINAL (MD3) • 4 JOGOS,,,,,,,,,
Confronto,Jogador A,Main A,Plataforma A,Placar A,Placar B,Jogador B,Main B,Plataforma B,Vencedor,Status
Quartas 01,Vencedor OF 01,-,-,,,Vencedor OF 02,-,-,,Pendente
Quartas 02,Vencedor OF 03,-,-,,,Vencedor OF 04,-,-,,Pendente
Quartas 03,Vencedor OF 05,-,-,,,Vencedor OF 06,-,-,,Pendente
Quartas 04,Vencedor OF 07,-,-,,,Vencedor OF 08,-,-,,Pendente
,,,,,,,,,
⚔️ 5.ª RODADA — SEMIFINAIS (MD3) • 2 JOGOS,,,,,,,,,
Confronto,Jogador A,Main A,Plataforma A,Placar A,Placar B,Jogador B,Main B,Plataforma B,Vencedor,Status
Semifinal 01,Vencedor QF 01,-,-,,,Vencedor QF 02,-,-,,Pendente
Semifinal 02,Vencedor QF 03,-,-,,,Vencedor QF 04,-,-,,Pendente
,,,,,,,,,
⚔️ 6.ª RODADA — GRANDE FINAL (MD3),,,,,,,,,
Confronto,Jogador A,Main A,Plataforma A,Placar A,Placar B,Jogador B,Main B,Plataforma B,Vencedor,Status
Grande Final,Vencedor SF 01,-,-,,,Vencedor SF 02,-,-,,Pendente
,,,,,,,,,
⚔️ PÓDIO DOS CAMPEÕES,,,,,,,,,
Posicao,Jogador,Título,Medalha,,,,,,,
1º Lugar,A definir,Grande Campeão,Ouro 🥇,,,,,,,
2º Lugar,A definir,Vice-Campeão,Prata 🥈,,,,,,,
3º Lugar,A definir,3º Colocado,Bronze 🥉,,,,,,,
`;

interface MatchItem {
  id: string;
  fase: string;
  timeA: string;
  mainA?: string;
  battletagA?: string;
  plataformaA?: string;
  scoreA: string;
  timeB: string;
  mainB?: string;
  battletagB?: string;
  plataformaB?: string;
  scoreB: string;
  vencedor: string;
  status: string;
  horario?: string;
}

interface Participant {
  nome: string;
  battletag: string;
  plataforma: string;
}

interface PodioItem {
  posicao: string;
  jogador: string;
  titulo: string;
  medalha: string;
}

type Aba = "inicio" | "partidas" | "podio" | "regras";

function parseCSVLine(text: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim().replace(/^"|"$/g, ''));
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^"|"$/g, ''));
  return result;
}

function parseHorarioToMinutes(horarioStr: string): number {
  if (!horarioStr) return 999999;
  const lower = horarioStr.toLowerCase();
  let dayVal = 0;
  if (lower.includes("sexta")) dayVal = 1000;
  else if (lower.includes("sábado") || lower.includes("sabado")) dayVal = 2000;
  else if (lower.includes("domingo")) dayVal = 3000;

  const match = lower.match(/(\d{1,2}):(\d{2})/);
  if (match) {
    const hours = parseInt(match[1], 10);
    const mins = parseInt(match[2], 10);
    return dayVal + hours * 60 + mins;
  }
  return dayVal;
}

function checkIsWO(horarioStr?: string, status?: string, vencedor?: string): boolean {
  if (!horarioStr || status === "concluida" || vencedor) return false;
  const lower = horarioStr.toLowerCase();
  const match = lower.match(/(\d{1,2}):(\d{2})/);
  if (!match) return false;

  const hours = parseInt(match[1], 10);
  const mins = parseInt(match[2], 10);

  const matchDate = new Date(2026, 9, 3, hours, mins, 0).getTime();
  const now = Date.now();
  return now > matchDate + 60 * 60 * 1000;
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-10-03T19:30:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const dias = Math.floor(difference / (1000 * 60 * 60 * 24));
        const horas = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ dias, horas, minutos, segundos });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-3 md:gap-4 my-2">
      {[
        { label: "Dias", val: timeLeft.dias },
        { label: "Horas", val: timeLeft.horas },
        { label: "Minutos", val: timeLeft.minutos },
        { label: "Segundos", val: timeLeft.segundos },
      ].map((item, idx) => (
        <div key={idx} className="surface-card px-4 py-3 rounded-xl border border-ow-orange/45 bg-surface-2 text-center min-w-[75px] shadow-md">
          <span className="text-display text-2xl md:text-3xl font-bold text-ow-orange tabular-nums block">{String(item.val).padStart(2, "0")}</span>
          <span className="text-[10px] text-fg-dim uppercase tracking-widest">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function CardConfronto({ m }: { m: MatchItem }) {
  const concluida = m.status === "concluida" || m.vencedor !== "";
  const isWO = checkIsWO(m.horario, m.status, m.vencedor);
  const isBye = m.timeB === "BYE";

  return (
    <article className="surface-card p-0 overflow-hidden border border-line-strong hover:border-ow-orange/50 transition-all duration-300 shadow-xl rounded-2xl mb-4">
      <div className="flex items-stretch">
        {/* ID / Duelo e Horário Destacado */}
        <div className="flex flex-col items-center justify-center min-w-[105px] bg-surface-2 border-r border-line px-3 py-4 text-center">
          <span className="text-[10px] text-fg-dim uppercase tracking-widest font-semibold">Duelo</span>
          <span className="text-sm font-bold text-ow-orange font-mono uppercase mt-0.5">{m.id}</span>
          {m.horario && m.horario !== "" && (
            <span className="text-[10px] font-bold text-ow-orange bg-ow-orange/15 px-2.5 py-1 rounded-md border border-ow-orange/30 mt-2.5 whitespace-nowrap shadow-sm">
              🕐 {m.horario}
            </span>
          )}
        </div>

        {/* Competidores / Placar */}
        <div className="flex-1 flex flex-col">
          {/* Jogador A */}
          <div
            data-player={m.timeA}
            data-bt={m.battletagA}
            data-plat={m.plataformaA}
            className={`flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-surface-2/60 transition-colors
              ${concluida && m.vencedor === m.timeA ? "bg-success/15" : ""}
              ${concluida && m.vencedor !== m.timeA && m.vencedor !== "" && !isBye ? "opacity-40" : ""}
            `}
          >
            <div className="flex items-center gap-4 truncate">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-background shrink-0 shadow-md"
                style={{ background: "var(--grad-orange)" }}
              >
                {m.timeA ? m.timeA.substring(0, 2).toUpperCase() : "—"}
              </div>
              <div className="truncate space-y-0.5">
                <span className={`text-base font-bold uppercase tracking-wide block truncate underline-offset-4 hover:underline ${concluida && m.vencedor === m.timeA ? "text-success" : "text-fg"}`}>
                  {m.timeA || "A definir"}
                </span>
                {m.mainA && m.mainA !== "-" ? (
                  <p className="text-xs text-ow-orange font-semibold">Main: {m.mainA}</p>
                ) : m.plataformaA ? (
                  <span className="text-[10px] text-fg-dim uppercase tracking-wider block">{m.plataformaA}</span>
                ) : null}
              </div>
            </div>
            <span className="font-mono font-bold text-2xl px-4 text-fg tabular-nums">{m.scoreA}</span>
          </div>

          <div className="h-px bg-line mx-5" />

          {/* Jogador B */}
          {isBye ? (
            <div className="flex items-center gap-4 px-5 py-4 opacity-30">
              <div className="w-9 h-9 rounded-xl bg-surface-2 border border-line shrink-0" />
              <span className="text-sm text-fg-dim italic">BYE — passa automaticamente</span>
            </div>
          ) : (
            <div
              data-player={m.timeB}
              data-bt={m.battletagB}
              data-plat={m.plataformaB}
              className={`flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-surface-2/60 transition-colors
                ${concluida && m.vencedor === m.timeB ? "bg-success/15" : ""}
                ${concluida && m.vencedor !== m.timeB && m.vencedor !== "" ? "opacity-40" : ""}
              `}
            >
              <div className="flex items-center gap-4 truncate">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-background shrink-0 shadow-md"
                  style={{ background: "var(--grad-blue)" }}
                >
                  {m.timeB ? m.timeB.substring(0, 2).toUpperCase() : "—"}
                </div>
                <div className="truncate space-y-0.5">
                  <span className={`text-base font-bold uppercase tracking-wide block truncate underline-offset-4 hover:underline ${concluida && m.vencedor === m.timeB ? "text-success" : "text-fg"}`}>
                    {m.timeB || "A definir"}
                  </span>
                  {m.mainB && m.mainB !== "-" ? (
                    <p className="text-xs text-ow-orange font-semibold">Main: {m.mainB}</p>
                  ) : m.plataformaB ? (
                    <span className="text-[10px] text-fg-dim uppercase tracking-wider block">{m.plataformaB}</span>
                  ) : null}
                </div>
              </div>
              <span className="font-mono font-bold text-2xl px-4 text-fg tabular-nums">{m.scoreB}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Status */}
      <div className="flex items-center justify-between px-5 py-3 bg-surface-2 border-t border-line">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
          isWO ? "bg-danger/20 text-danger border-danger/40 animate-pulse" :
          concluida ? "bg-success/15 text-success border-success/30" : "bg-surface-2 text-fg-muted border-line"
        }`}>
          {isWO ? "⚠️ W.O. Aplicado (Atrasado +1h)" : concluida ? "Encerrado" : "Aguardando"}
        </span>
        {concluida && m.vencedor && (
          <span className="text-xs text-fg-dim">
            Vencedor: <span className="text-success font-bold uppercase tracking-wide">{m.vencedor}</span>
          </span>
        )}
      </div>
    </article>
  );
}

export default function PublicoPage() {
  const [aba, setAba] = useState<Aba>("inicio");
  const [subAbaRodada, setSubAbaRodada] = useState<string>("rodada1");
  const [filtroStatus, setFiltroStatus] = useState<"todos" | "encerrado" | "aguardando">("todos");
  const [carregando, setCarregando] = useState(true);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<Date | null>(null);
  const [modalPremio, setModalPremio] = useState<"lesserafim" | "sojourn" | null>(null);
  const [jogadorPerfil, setJogadorPerfil] = useState<{ nome: string; battletag: string; plataforma: string; vitorias: number; derrotas: number; totalJogos: number } | null>(null);

  const [rodada1, setRodada1] = useState<MatchItem[]>([]);
  const [rodada2, setRodada2] = useState<MatchItem[]>([]);
  const [oitavas, setOitavas] = useState<MatchItem[]>([]);
  const [quartas, setQuartas] = useState<MatchItem[]>([]);
  const [semifinais, setSemifinais] = useState<MatchItem[]>([]);
  const [grandeFinal, setGrandeFinal] = useState<MatchItem[]>([]);
  const [podio, setPodio] = useState<PodioItem[]>([]);
  const [participantes, setParticipantes] = useState<Participant[]>([]);

  const parseCSV = (csvText: string) => {
    if (!csvText) return;
    const lines = csvText.split("\n").map(l => l.trim());

    let parsedRodada1: MatchItem[] = [];
    let parsedRodada2: MatchItem[] = [];
    let parsedOitavas: MatchItem[] = [];
    let parsedQuartas: MatchItem[] = [];
    let parsedSemifinais: MatchItem[] = [];
    let parsedFinal: MatchItem[] = [];
    let parsedPodio: PodioItem[] = [];
    let parsedPartes: Participant[] = [];

    let currentSection = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;

      if (line.includes("Jogador A,BattleTag A,Plataforma A")) {
        currentSection = "rodada1";
        continue;
      }
      if (line.includes("2.ª RODADA")) {
        currentSection = "rodada2";
        i++;
        continue;
      }
      if (line.includes("3.ª RODADA") || line.includes("OITAVAS DE FINAL")) {
        currentSection = "oitavas";
        i++;
        continue;
      }
      if (line.includes("4.ª RODADA") || line.includes("QUARTAS DE FINAL")) {
        currentSection = "quartas";
        i++;
        continue;
      }
      if (line.includes("5.ª RODADA") || line.includes("SEMIFINAIS")) {
        currentSection = "semifinais";
        i++;
        continue;
      }
      if (line.includes("6.ª RODADA") || line.includes("GRANDE FINAL")) {
        currentSection = "final";
        i++;
        continue;
      }
      if (line.includes("PÓDIO DOS CAMPEÕES")) {
        currentSection = "podio";
        i++;
        continue;
      }

      const cols = parseCSVLine(line);

      try {
        if (currentSection === "rodada1" && cols.length >= 9 && cols[0] && cols[0] !== "Jogador A") {
          const pA = cols[0] || "";
          const btA = cols[1] || "";
          const platA = cols[2] || "";
          const scA = cols[3] || "—";
          const scB = cols[4] || "—";
          const pB = cols[5] || "";
          const btB = cols[6] || "";
          const platB = cols[7] || "";
          const venc = cols[8] || "";

          let hor = "";
          for (let c = 9; c < cols.length; c++) {
            if (cols[c] && cols[c].length > 0) {
              hor = cols[c];
              break;
            }
          }

          parsedRodada1.push({
            id: "",
            fase: "1ª Rodada",
            timeA: pA,
            battletagA: btA,
            plataformaA: platA,
            scoreA: scA,
            timeB: pB,
            battletagB: btB,
            plataformaB: platB,
            scoreB: scB,
            vencedor: venc,
            status: venc ? "concluida" : "pendente",
            horario: hor
          });

          if (pA) parsedPartes.push({ nome: pA, battletag: btA, plataforma: platA });
          if (pB && pB !== "BYE") parsedPartes.push({ nome: pB, battletag: btB, plataforma: platB });
        }

        if (currentSection === "rodada2" && cols.length >= 10 && cols[0]?.startsWith("Jogo")) {
          parsedRodada2.push({
            id: cols[0] || "",
            fase: "2ª Rodada",
            timeA: cols[1] || "",
            mainA: cols[2] || "",
            plataformaA: cols[3] || "",
            scoreA: cols[4] || "—",
            scoreB: cols[5] || "—",
            timeB: cols[6] || "",
            mainB: cols[7] || "",
            plataformaB: cols[8] || "",
            vencedor: cols[9] || "",
            status: cols[10]?.toLowerCase() === "concluida" ? "concluida" : "pendente"
          });
        }

        if (currentSection === "oitavas" && cols.length >= 10 && (cols[0]?.startsWith("Oitavas") || cols[0]?.startsWith("Jogo"))) {
          parsedOitavas.push({
            id: cols[0] || "",
            fase: "Oitavas de Final",
            timeA: cols[1] || "",
            mainA: cols[2] || "",
            plataformaA: cols[3] || "",
            scoreA: cols[4] || "—",
            scoreB: cols[5] || "—",
            timeB: cols[6] || "",
            mainB: cols[7] || "",
            plataformaB: cols[8] || "",
            vencedor: cols[9] || "",
            status: cols[10]?.toLowerCase() === "concluida" ? "concluida" : "pendente"
          });
        }

        if (currentSection === "quartas" && cols.length >= 10 && cols[0]?.startsWith("Quartas")) {
          parsedQuartas.push({
            id: cols[0] || "",
            fase: "Quartas de Final",
            timeA: cols[1] || "",
            mainA: cols[2] || "",
            plataformaA: cols[3] || "",
            scoreA: cols[4] || "—",
            scoreB: cols[5] || "—",
            timeB: cols[6] || "",
            mainB: cols[7] || "",
            plataformaB: cols[8] || "",
            vencedor: cols[9] || "",
            status: cols[10]?.toLowerCase() === "concluida" ? "concluida" : "pendente"
          });
        }

        if (currentSection === "semifinais" && cols.length >= 10 && cols[0]?.startsWith("Semifinal")) {
          parsedSemifinais.push({
            id: cols[0] || "",
            fase: "Semifinais",
            timeA: cols[1] || "",
            mainA: cols[2] || "",
            plataformaA: cols[3] || "",
            scoreA: cols[4] || "—",
            scoreB: cols[5] || "—",
            timeB: cols[6] || "",
            mainB: cols[7] || "",
            plataformaB: cols[8] || "",
            vencedor: cols[9] || "",
            status: cols[10]?.toLowerCase() === "concluida" ? "concluida" : "pendente"
          });
        }

        if (currentSection === "final" && cols.length >= 10 && (cols[0]?.startsWith("Grande") || cols[0]?.includes("Final"))) {
          parsedFinal.push({
            id: cols[0] || "",
            fase: "Grande Final",
            timeA: cols[1] || "",
            mainA: cols[2] || "",
            plataformaA: cols[3] || "",
            scoreA: cols[4] || "—",
            scoreB: cols[5] || "—",
            timeB: cols[6] || "",
            mainB: cols[7] || "",
            plataformaB: cols[8] || "",
            vencedor: cols[9] || "",
            status: cols[10]?.toLowerCase() === "concluida" ? "concluida" : "pendente"
          });
        }

        if (currentSection === "podio" && cols.length >= 3 && cols[0]?.includes("Lugar")) {
          parsedPodio.push({
            posicao: cols[0] || "",
            jogador: cols[1] || "A definir",
            titulo: cols[2] || "",
            medalha: cols[3] || ""
          });
        }
      } catch (err) {
        console.error("Error parsing line:", line, err);
      }
    }

    parsedRodada1.sort((a, b) => parseHorarioToMinutes(a.horario || "") - parseHorarioToMinutes(b.horario || ""));
    parsedRodada1 = parsedRodada1.map((m, idx) => ({
      ...m,
      id: `#${(idx + 1).toString().padStart(2, '0')}`
    }));

    setRodada1(parsedRodada1);
    setRodada2(parsedRodada2);
    setOitavas(parsedOitavas);
    setQuartas(parsedQuartas);
    setSemifinais(parsedSemifinais);
    setGrandeFinal(parsedFinal);
    setPodio(parsedPodio);
    setParticipantes(parsedPartes);
  };

  useEffect(() => {
    parseCSV(FALLBACK_CSV);
    setUltimaAtualizacao(new Date());
    setCarregando(false);

    async function loadLiveData() {
      try {
        const res = await fetch(SHEET_API_URL);
        if (res.ok) {
          const text = await res.text();
          if (text && text.length > 50) {
            parseCSV(text);
            setUltimaAtualizacao(new Date());
          }
        }
      } catch {
        // Ignora falhas de rede e mantém o fallback
      }
    }
    loadLiveData();
  }, []);

  const abrirPerfilJogador = (nome: string, battletag?: string, plataforma?: string) => {
    if (!nome || nome === "A definir") return;
    const part = participantes.find(p => p.nome.toLowerCase() === nome.toLowerCase());

    let vitorias = 0;
    let derrotas = 0;
    let totalJogos = 0;

    const todasPartidas = [...rodada1, ...rodada2, ...oitavas, ...quartas, ...semifinais, ...grandeFinal];
    todasPartidas.forEach(p => {
      if (p.vencedor && p.vencedor.toLowerCase() === nome.toLowerCase()) {
        vitorias++;
        totalJogos++;
      } else if (p.status === "concluida" && (p.timeA.toLowerCase() === nome.toLowerCase() || p.timeB.toLowerCase() === nome.toLowerCase())) {
        derrotas++;
        totalJogos++;
      }
    });

    setJogadorPerfil({
      nome,
      battletag: battletag || part?.battletag || "Não informada",
      plataforma: plataforma || part?.plataforma || "PC",
      vitorias,
      derrotas,
      totalJogos
    });
  };

  const abas: { id: Aba; label: string }[] = [
    { id: "inicio", label: "Início & Premiação" },
    { id: "partidas", label: "Chaveamento & Partidas" },
    { id: "podio", label: "Pódio" },
    { id: "regras", label: "Regras" },
  ];

  const rodadasTabs = [
    { id: "rodada1", label: "1ª Rodada", data: rodada1 },
    { id: "rodada2", label: "2ª Rodada", data: rodada2 },
    { id: "oitavas", label: "Oitavas", data: oitavas },
    { id: "quartas", label: "Quartas", data: quartas },
    { id: "semifinais", label: "Semifinais", data: semifinais },
    { id: "final", label: "Grande Final", data: grandeFinal },
  ];

  const rodadaAtualAtiva = rodadasTabs.find(r => r.id === subAbaRodada) || rodadasTabs[0];

  const partidasFiltradas = rodadaAtualAtiva.data.filter(m => {
    const concluida = m.status === "concluida" || m.vencedor !== "";
    if (filtroStatus === "encerrado") return concluida;
    if (filtroStatus === "aguardando") return !concluida;
    return true;
  });

  // A partir da 2ª rodada, exibir em formato de listagem (1 coluna) em vez de grade de 2 colunas
  const isRodadaListagem = subAbaRodada !== "rodada1";

  return (
    <main className="min-h-screen text-fg">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 hero-grad pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-8 py-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 48 48" fill="none" className="w-16 h-16 shrink-0 drop-shadow-[0_0_15px_rgba(249,158,26,0.4)]">
              <path fill="#F99E1A" d="M13.9 13.901a14.284 14.284 0 0 1 20.2 0l4.043-4.042a20 20 0 0 0-28.286 0z" />
              <path fill="#E6EDF7" d="m39.312 11.135-4.063 4.062a14.29 14.29 0 0 1 .995 16.159L28.891 24l-4.006-9.413h-.02V27.31l7.938 7.938a14.29 14.29 0 0 1-17.606 0l7.939-7.938V14.636l-4.027 9.365-7.355 7.355a14.29 14.29 0 0 1 .997-16.159l-4.063-4.062a20.001 20.001 0 1 0 30.624 0" />
            </svg>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-ow-orange/90 font-semibold">Torneio Oficial · Akira</p>
              <h1 className="text-display text-4xl md:text-5xl font-bold uppercase leading-none mt-1">
                Duel<span className="text-ow-orange">owach</span>
              </h1>
              <p className="text-fg-muted text-sm mt-2">Acompanhe o chaveamento ao vivo sincronizado com a planilha oficial.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {ultimaAtualizacao && (
              <span className="text-[10px] text-fg-dim uppercase tracking-wider">
                Atualizado às {ultimaAtualizacao.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            )}
            {/* Selo Animado "AO VIVO" com Pulsação em Neon */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-danger/20 border border-danger/50 text-danger text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-danger shadow-[0_0_10px_#ef4444]" />
              Ao Vivo
            </span>
          </div>
        </div>
      </header>

      {/* Abas */}
      <nav className="border-b border-line bg-surface/95 backdrop-blur-md sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex justify-center gap-2">
          {abas.map((a) => (
            <button
              key={a.id}
              onClick={() => setAba(a.id)}
              className={`relative px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-colors ${aba === a.id ? "text-fg" : "text-fg-muted hover:text-fg"}`}
            >
              {a.label}
              <span className={`absolute left-3 right-3 -bottom-px h-[3px] rounded-t-full transition-all ${aba === a.id ? "bg-ow-orange shadow-[0_0_12px_var(--ow-orange-glow)]" : "bg-transparent"}`} />
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6 md:p-8">
        {carregando ? (
          <div className="grid gap-4">
            <div className="skeleton h-28" />
            <div className="skeleton h-28" />
            <div className="skeleton h-28" />
          </div>
        ) : (
          <>
            {/* INÍCIO & PREMIAÇÃO */}
            {aba === "inicio" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* CARD 1: Hero Banner com Boas-Vindas e Premiação */}
                <section className="relative rounded-3xl p-8 md:p-14 text-center overflow-hidden border border-ow-orange/30 shadow-[0_0_50px_rgba(249,158,26,0.15)] bg-gradient-to-b from-surface-2 to-surface">
                  <div className="absolute inset-0 hero-grad opacity-40 pointer-events-none" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-ow-orange/10 blur-[80px] pointer-events-none" />

                  <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ow-orange/15 border border-ow-orange/40 text-ow-orange text-xs font-bold uppercase tracking-[0.25em]">
                      ⚔️ Torneio 1v1 Exclusivo · Organizado por Akira
                    </span>

                    <h2 className="text-display text-4xl md:text-6xl font-bold uppercase tracking-wide">
                      Bem-vindo ao <span className="text-ow-orange drop-shadow-[0_0_20px_rgba(249,158,26,0.5)]">Duelowach</span>
                    </h2>

                    <p className="text-fg-muted md:text-lg leading-relaxed max-w-2xl mx-auto">
                      Duelos intensos 1v1 no formato <strong className="text-fg font-bold">Ganhou, Passou</strong>, melhor de 3 (MD3) com os mains de cada jogador e desempate com herói secreto e aleatório.
                    </p>

                    {/* Premiação Destaque (Clicável) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                      <div
                        onClick={() => setModalPremio("lesserafim")}
                        className="surface-card p-6 border-2 border-ow-orange rounded-2xl relative overflow-hidden bg-gradient-to-br from-ow-orange/10 via-surface to-surface shadow-[0_10px_30px_rgba(249,158,26,0.2)] hover:scale-[1.02] transition-transform cursor-pointer group text-center"
                      >
                        <div className="absolute top-0 right-0 bg-ow-orange text-background font-bold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                          1º Lugar (Clique para ver)
                        </div>
                        <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🥇</div>
                        <h3 className="text-display text-xl font-bold uppercase text-ow-orange mb-1">Grande Campeão</h3>
                        <p className="text-fg font-bold text-lg">1º Bundle Le Sserafim</p>
                        <span className="inline-block text-[11px] text-ow-orange underline mt-2 font-semibold">Ver imagem do prêmio →</span>
                      </div>

                      <div
                        onClick={() => setModalPremio("sojourn")}
                        className="surface-card p-6 border-2 border-line-strong rounded-2xl relative overflow-hidden bg-gradient-to-br from-surface-2 via-surface to-surface hover:scale-[1.02] transition-transform cursor-pointer group hover:border-ow-orange/50 text-center"
                      >
                        <div className="absolute top-0 right-0 bg-fg-muted text-background font-bold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                          2º Lugar (Clique para ver)
                        </div>
                        <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🥈</div>
                        <h3 className="text-display text-xl font-bold uppercase text-fg mb-1">Vice-Campeão</h3>
                        <p className="text-fg font-bold text-lg">Arma Mítica da Sojourn</p>
                        <span className="inline-block text-[11px] text-ow-blue underline mt-2 font-semibold">Ver imagem do prêmio →</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* CARD 2: Standalone Countdown Timer (Somente a Contagem) */}
                <section className="surface-card rounded-3xl p-6 md:p-8 text-center border border-ow-orange/40 shadow-xl bg-surface-2 max-w-3xl mx-auto">
                  <h3 className="text-display text-xl font-bold uppercase text-ow-orange mb-3 flex items-center justify-center gap-2">
                    <span>🕒</span> Início do Torneio (Sábado, 3 de Outubro às 19:30h)
                  </h3>
                  <CountdownTimer />
                </section>

                {/* Transmissão do Akira */}
                <section>
                  <h2 className="text-display text-2xl font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                    <span className="text-ow-orange">✦</span> Transmissão Oficial
                  </h2>
                  <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-2 px-1 mb-3">
                      <span className="w-3 h-3 rounded-full bg-danger live-dot animate-ping" />
                      <h3 className="text-display text-xl font-bold uppercase tracking-wider text-fg">AkiraLegacy</h3>
                    </div>
                    <div className="aspect-video bg-surface-2 rounded-2xl overflow-hidden border border-line-strong shadow-2xl">
                      <iframe
                        src="https://player.twitch.tv/?channel=akiralegacy&parent=localhost&parent=web-production-aeb1b.up.railway.app&parent=overwatch-stadium-web.vercel.app&parent=duelowach.vercel.app"
                        height="100%" width="100%" allowFullScreen className="border-none"
                      />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* PARTIDAS E CHAVEAMENTO */}
            {aba === "partidas" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center max-w-xl mx-auto">
                  <h2 className="text-display text-3xl font-bold uppercase tracking-wider">Chaveamento Oficial</h2>
                  <p className="text-fg-muted text-sm mt-1">Confrontos organizados cronologicamente por horário. Clique no jogador para ver o perfil.</p>
                </div>

                {/* Sub-abas de Rodadas */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {rodadasTabs.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSubAbaRodada(r.id)}
                      className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all ${
                        subAbaRodada === r.id
                          ? "bg-ow-orange text-background border-ow-orange shadow-[0_0_15px_rgba(249,158,26,0.4)]"
                          : "surface-card text-fg-muted hover:text-fg border-line"
                      }`}
                    >
                      {r.label} ({r.data.length})
                    </button>
                  ))}
                </div>

                {/* Filtros Rápidos de Status */}
                <div className="flex gap-2 justify-center pt-2">
                  {[
                    { id: "todos", label: "Todos" },
                    { id: "encerrado", label: "Encerrados" },
                    { id: "aguardando", label: "Aguardando" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFiltroStatus(f.id as any)}
                      className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg border transition-all ${
                        filtroStatus === f.id
                          ? "bg-ow-blue/20 text-ow-blue border-ow-blue/40 shadow-sm"
                          : "bg-surface-2 text-fg-dim border-line hover:text-fg"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Exibição da Rodada Ativa */}
                <section className="space-y-4 pt-2">
                  <h3 className="text-display text-xl font-bold uppercase text-ow-orange border-b border-line pb-2 flex items-center justify-between">
                    <span>{rodadaAtualAtiva.label}</span>
                    <span className="text-xs font-normal text-fg-dim font-mono">{partidasFiltradas.length} confrontos exibidos</span>
                  </h3>
                  {partidasFiltradas.length === 0 ? (
                    <div className="surface-card p-12 text-center rounded-2xl border border-line-strong">
                      <p className="text-fg-muted uppercase tracking-wider text-sm font-semibold">Nenhuma partida encontrada com este filtro.</p>
                    </div>
                  ) : (
                    <div className={isRodadaListagem ? "grid grid-cols-1 gap-4 max-w-3xl mx-auto" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
                      {partidasFiltradas.map((m) => (
                        <div key={m.id} onClick={(e) => {
                          const target = e.target as HTMLElement;
                          const playerEl = target.closest("[data-player]");
                          if (playerEl) {
                            const playerName = playerEl.getAttribute("data-player");
                            const playerBt = playerEl.getAttribute("data-bt");
                            const playerPlat = playerEl.getAttribute("data-plat");
                            if (playerName) abrirPerfilJogador(playerName, playerBt || undefined, playerPlat || undefined);
                          }
                        }}>
                          <CardConfronto m={m} />
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            )}

            {/* PÓDIO */}
            {aba === "podio" && (
              <div className="space-y-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center">
                  <h2 className="text-display text-3xl font-bold uppercase tracking-wider">Pódio do Torneio</h2>
                  <p className="text-fg-muted text-sm mt-1">Os vencedores oficiais atualizados na planilha.</p>
                </div>

                <div className="grid gap-4">
                  {podio.map((p, i) => (
                    <div key={i} className="surface-card p-6 flex items-center justify-between border border-line-strong">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">
                          {p.posicao.includes("1º") ? "🥇" : p.posicao.includes("2º") ? "🥈" : "🥉"}
                        </span>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-ow-orange font-bold">{p.posicao} — {p.titulo}</p>
                          <h3 className="text-display text-2xl font-bold uppercase text-fg mt-0.5">{p.jogador}</h3>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 bg-surface-2 rounded-lg text-fg-muted">
                        {p.medalha}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REGRAS */}
            {aba === "regras" && (
              <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center">
                  <h2 className="text-display text-3xl font-bold uppercase tracking-wider">Regras do Duelowach</h2>
                  <p className="text-fg-muted text-sm mt-1">Entenda o formato e a dinâmica da competição.</p>
                </div>

                <div className="grid gap-4">
                  <div className="surface-card p-6 space-y-2">
                    <h3 className="text-display text-lg font-bold uppercase text-ow-orange">⚔️ Formato: Ganhou, Passou</h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      Torneio eliminatório. Quem vencer a série avança para a próxima fase. Quem perder está eliminado da competição principal.
                    </p>
                  </div>

                  <div className="surface-card p-6 space-y-2">
                    <h3 className="text-display text-lg font-bold uppercase text-ow-orange">📞 Canal de Voz & Regra de W.O.</h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      Os participantes devem estar no canal de voz <strong>(ME PUXE)</strong> com pelo menos <strong>5 minutos de antecedência</strong> da partida. Tolerância máxima de <strong>5 minutos</strong>; ausência resulta em <strong>W.O.</strong>
                    </p>
                  </div>

                  <div className="surface-card p-6 space-y-2">
                    <h3 className="text-display text-lg font-bold uppercase text-ow-orange">⏱️ Duração das Partidas</h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      Cada partida tem duração prevista de 10 minutos. As regras são reforçadas a cada partida para os participantes.
                    </p>
                  </div>

                  <div className="surface-card p-6 space-y-2">
                    <h3 className="text-display text-lg font-bold uppercase text-ow-orange">🎮 Partidas em MD3 & Main vs Main</h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      Todas as partidas são disputadas em **Melhor de 3 (MD3)**. Cada participante joga com seu próprio main (ex: Genji vs Genji, Cassidy vs Cassidy).
                    </p>
                  </div>

                  <div className="surface-card p-6 space-y-2">
                    <h3 className="text-display text-lg font-bold uppercase text-ow-orange">🎲 Desempate</h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      Em caso de empate ou necessidade de desempate na série, será utilizado um **herói secreto e aleatório** sorteado para ambos os jogadores.
                    </p>
                  </div>

                  <div className="surface-card p-6 space-y-2">
                    <h3 className="text-display text-lg font-bold uppercase text-ow-orange">🔒 Regra dos Mains</h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      Os mains dos jogadores nas fases avançadas só são revelados após a primeira parte do torneio, conforme atualização na planilha oficial.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de Premiação */}
      {modalPremio && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={() => setModalPremio(null)}
        >
          <div
            className="surface-card max-w-4xl w-full p-6 md:p-8 border-2 border-ow-orange rounded-3xl relative shadow-2xl space-y-5 bg-surface"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-line pb-4">
              <h3 className="text-display text-2xl font-bold uppercase text-ow-orange flex items-center gap-2">
                <span>{modalPremio === "lesserafim" ? "🥇" : "🥈"}</span>
                {modalPremio === "lesserafim" ? "1º Lugar — Bundle Le Sserafim" : "2º Lugar — Arma Mítica da Sojourn"}
              </h3>
              <button
                onClick={() => setModalPremio(null)}
                className="w-10 h-10 rounded-full bg-surface-2 hover:bg-ow-orange hover:text-background flex items-center justify-center font-bold text-lg text-fg transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-line bg-background flex items-center justify-center p-2 relative shadow-inner">
              <img
                src={modalPremio === "lesserafim" ? "/lesserafim.png" : "/sojourn.png"}
                alt="Prêmio do Torneio"
                className="max-h-[75vh] w-auto object-contain rounded-xl"
              />
            </div>
            <p className="text-xs text-fg-dim text-center uppercase tracking-wider">
              Clique no X ou fora da janela para fechar
            </p>
          </div>
        </div>
      )}

      {/* Modal de Perfil do Jogador */}
      {jogadorPerfil && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={() => setJogadorPerfil(null)}
        >
          <div
            className="surface-card max-w-md w-full p-6 md:p-8 border-2 border-ow-blue rounded-3xl relative shadow-2xl space-y-5 bg-surface text-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-line pb-3">
              <h3 className="text-display text-xl font-bold uppercase text-ow-blue">Perfil do Jogador</h3>
              <button
                onClick={() => setJogadorPerfil(null)}
                className="w-8 h-8 rounded-full bg-surface-2 hover:bg-ow-blue hover:text-background flex items-center justify-center font-bold text-fg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-2xl font-bold text-background shadow-lg" style={{ background: "var(--grad-blue)" }}>
              {jogadorPerfil.nome.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <h4 className="text-display text-2xl font-bold uppercase text-fg">{jogadorPerfil.nome}</h4>
              <p className="text-sm font-mono text-ow-blue font-semibold mt-1">{jogadorPerfil.battletag}</p>
              <span className="inline-block bg-surface-2 border border-line text-xs uppercase tracking-wider px-3 py-1 rounded-full text-fg-dim mt-2">
                Plataforma: {jogadorPerfil.plataforma}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-line">
              <div className="bg-surface-2 p-3 rounded-xl border border-line">
                <span className="text-display text-xl font-bold text-success block">{jogadorPerfil.vitorias}</span>
                <span className="text-[10px] uppercase tracking-wider text-fg-dim">Vitórias</span>
              </div>
              <div className="bg-surface-2 p-3 rounded-xl border border-line">
                <span className="text-display text-xl font-bold text-danger block">{jogadorPerfil.derrotas}</span>
                <span className="text-[10px] uppercase tracking-wider text-fg-dim">Derrotas</span>
              </div>
              <div className="bg-surface-2 p-3 rounded-xl border border-line">
                <span className="text-display text-xl font-bold text-ow-orange block">{jogadorPerfil.totalJogos}</span>
                <span className="text-[10px] uppercase tracking-wider text-fg-dim">Partidas</span>
              </div>
            </div>

            <p className="text-[11px] text-fg-dim uppercase tracking-wider">
              Estatísticas calculadas com base nas partidas oficiais da planilha.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
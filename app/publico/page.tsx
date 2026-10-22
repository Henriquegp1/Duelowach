"use client";

import { useEffect, useState } from "react";

const SHEET_API_URL = "/api/sheet";

// Configuração do evento atual. Recursos de outros formatos ficam ocultos (e não removidos) por flag,
// para que possam ser reativados em futuros Duelowatch sem reescrever código.
const EVENTO = {
  nome: "Além do Elo",
  convidado: "Kira",
  partidaUnica: true,      // cada duelo é uma partida só; vencer uma vez já garante o prêmio
  mostrarDesempate: false, // oculto: não se aplica a partida única
};

const FALLBACK_CSV = `
,,,,,,,,,,
⚔️ ALÉM DO ELO,,,,,TOTAL DUELOS,CONCLUÍDOS,PENDENTES,TOTAL JOGADORES,,
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

const EVENT_FALLBACK_CSV = `
,Além do Elo,,,,,,,,,,,,
,Formato especial • Kira contra 20 • Partida única (BO1),,,,,,,,,,,,
,,,,,,,,,,,,,
,Confronto,Jogador A,BattleTag A,Main A,Plataforma A,Placar A,Placar B,Jogador B,BattleTag B,Main B,Plataforma B,Vencedor,Status
,Jogo 01,Kira,,,-,,,20,,,-,,Pendente
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

const CELEBRATION_STORAGE_KEY = "duelowatch-final-celebration-until";
const CELEBRATION_PENDING_KEY = "duelowatch-final-celebration-pending";
const CELEBRATION_DURATION_MS = 20 * 1000;
const CONFETTI_PARTICLES = Array.from({ length: 72 }, (_, index) => ({
  id: index,
  left: (index * 37) % 101,
  delay: (index % 18) * 0.11,
  duration: 3.2 + (index % 7) * 0.28,
  rotation: (index * 47) % 360,
  color: ["#F99E1A", "#218FFE", "#E6EDF7"][index % 3],
  shape: index % 3 === 0 ? "rounded-sm" : "rounded-[1px]"
}));

function ConfettiCelebration({ winner }: { winner: string }) {
  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden" aria-live="assertive" role="status">
      <div className="absolute inset-x-0 top-8 text-center px-4">
        <p className="inline-block rounded-xl border border-ow-orange/60 bg-background/90 px-5 py-3 text-display text-lg font-bold uppercase tracking-wider text-ow-orange shadow-[0_0_30px_rgba(249,158,26,0.35)]">
          🏆 Grande campeão: {winner}
        </p>
      </div>
      {CONFETTI_PARTICLES.map(particle => (
        <span
          key={particle.id}
          className={`confetti-piece ${particle.shape}`}
          style={{
            left: `${particle.left}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            transform: `rotate(${particle.rotation}deg)`
          }}
        />
      ))}
    </div>
  );
}

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
  if (lower.includes("sábado") || lower.includes("sabado")) dayVal = 1000;
  else if (lower.includes("sexta")) dayVal = 2000;
  else if (lower.includes("domingo")) dayVal = 3000;

  const match = lower.match(/(\d{1,2}):(\d{2})/);
  if (match) {
    const hours = parseInt(match[1], 10);
    const mins = parseInt(match[2], 10);
    return dayVal + hours * 60 + mins;
  }
  return dayVal;
}

function parseHorarioToTimestamp(horarioStr: string, year: number): number | null {
  if (!horarioStr) return null;
  const lower = horarioStr.toLowerCase();
  const match = lower.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;

  const day = lower.includes("domingo") ? 4 : lower.includes("sexta") ? 2 : lower.includes("sábado") || lower.includes("sabado") ? 3 : null;
  if (!day) return null;

  return new Date(year, 9, day, Number(match[1]), Number(match[2])).getTime();
}

function partidaConcluida(match: MatchItem): boolean {
  const temPlacar = [match.scoreA, match.scoreB].every(score => {
    return score.trim() !== "" && score !== "—" && Number.isFinite(Number(score));
  });

  return match.status.toLowerCase() === "concluida" || Boolean(match.vencedor && match.vencedor !== "—") || temPlacar;
}

function determinarVencedor(match: MatchItem): string {
  if (match.vencedor && match.vencedor !== "—") return match.vencedor;

  const scoreA = Number(match.scoreA);
  const scoreB = Number(match.scoreB);
  if (!Number.isFinite(scoreA) || !Number.isFinite(scoreB) || scoreA === scoreB) return "";

  return scoreA > scoreB ? match.timeA : match.timeB;
}

function determinarFaseAtual(rodadas: { id: string; data: MatchItem[] }[]): string {
  for (const rodada of rodadas) {
    if (rodada.data.length > 0 && !rodada.data.every(partidaConcluida)) return rodada.id;
  }

  return rodadas[rodadas.length - 1]?.id || "rodada1";
}

function encontrarProximaPartida(rodadas: { id: string; data: MatchItem[] }[], faseAtualId: string, agora: Date): MatchItem | null {
  const pendente = (match: MatchItem) => !partidaConcluida(match);
  const partidasAgendadas = rodadas
    .flatMap(rodada => rodada.data)
    .filter(match => pendente(match))
    .map(match => ({ match, timestamp: parseHorarioToTimestamp(match.horario || "", agora.getFullYear()) }))
    .filter(item => item.timestamp !== null && item.timestamp >= agora.getTime())
    .sort((a, b) => (a.timestamp as number) - (b.timestamp as number));

  if (partidasAgendadas[0]) return partidasAgendadas[0].match;
  return rodadas.find(rodada => rodada.id === faseAtualId)?.data.find(pendente) || null;
}

function extractHorario(cols: string[]): string {
  for (let c = 0; c < cols.length; c++) {
    const val = cols[c] || "";
    const lower = val.toLowerCase();
    if (val.includes(":") || lower.includes("sábado") || lower.includes("sabado") || lower.includes("sexta") || lower.includes("domingo") || lower.endsWith("h")) {
      if (!val.includes("#") && val.length < 35 && !val.toLowerCase().includes("pendente") && !val.toLowerCase().includes("concluida")) {
        return val;
      }
    }
  }
  return "";
}

function checkIsWO(horarioStr?: string, status?: string, vencedor?: string, scoreA?: string, scoreB?: string): boolean {
  if (status?.toLowerCase() === "concluida" || (vencedor && vencedor.trim() !== "" && vencedor !== "—")) return false;
  if (scoreA && scoreA !== "—" && scoreA !== "" && scoreB && scoreB !== "—" && scoreB !== "") return false;

  const v = (vencedor || "").toLowerCase();
  const s = (status || "").toLowerCase();
  if (v.includes("w.o") || v.includes("wo") || s.includes("w.o") || s.includes("wo")) {
    return true;
  }
  return false;
}

function CardConfronto({ m }: { m: MatchItem }) {
  const concluida = partidaConcluida(m);
  const vencedor = determinarVencedor(m);
  const isWO = checkIsWO(m.horario, m.status, m.vencedor, m.scoreA, m.scoreB);
  const isBye = m.timeB === "BYE";

  return (
    <article className="surface-card p-0 overflow-hidden border border-line-strong hover:border-ow-orange/50 transition-all duration-300 shadow-xl rounded-2xl mb-4">
      <div className="flex flex-col sm:flex-row items-stretch">
        {/* ID / Duelo e Horário Destacado */}
        <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center min-w-[100px] bg-surface-2 border-b sm:border-b-0 sm:border-r border-line px-4 py-3 sm:py-4 text-center">
          <div>
            <span className="text-[10px] text-fg-dim uppercase tracking-widest font-semibold block sm:inline">Duelo </span>
            <span className="text-sm font-bold text-ow-orange font-mono uppercase mt-0.5">{m.id}</span>
          </div>
          {m.horario && m.horario !== "" && (
            <span className="text-[10px] font-bold text-ow-orange bg-ow-orange/15 px-2.5 py-1 rounded-md border border-ow-orange/30 sm:mt-2.5 whitespace-nowrap shadow-sm">
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
            className={`flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 cursor-pointer hover:bg-surface-2/60 transition-colors
              ${concluida && vencedor === m.timeA ? "bg-ow-blue/15" : ""}
              ${concluida && vencedor !== m.timeA && vencedor !== "" && vencedor !== "—" && !isBye ? "opacity-40" : ""}
            `}
          >
            <div className="flex items-center gap-3 sm:gap-4 truncate">
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs font-bold text-background shrink-0 shadow-md"
                style={{ background: "var(--grad-orange)" }}
              >
                {m.timeA ? m.timeA.substring(0, 2).toUpperCase() : "—"}
              </div>
              <div className="truncate space-y-0.5">
                <span className={`text-sm sm:text-base font-bold uppercase tracking-wide block truncate underline-offset-4 hover:underline ${concluida && vencedor === m.timeA ? "text-ow-blue" : "text-fg"}`}>
                  {m.timeA || "A definir"}
                </span>
                {m.mainA && m.mainA !== "-" ? (
                  <p className="text-[11px] sm:text-xs text-ow-orange font-semibold">Main: {m.mainA}</p>
                ) : m.plataformaA ? (
                  <span className="text-[9px] sm:text-[10px] text-fg-dim uppercase tracking-wider block">{m.plataformaA}</span>
                ) : null}
              </div>
            </div>
            <span className="font-mono font-bold text-xl sm:text-2xl px-2 sm:px-4 text-fg tabular-nums">{m.scoreA}</span>
          </div>

          <div className="h-px bg-line mx-4 sm:mx-5" />

          {/* Jogador B */}
          {isBye ? (
            <div className="flex items-center gap-4 px-4 sm:px-5 py-3 sm:py-4 opacity-30">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-surface-2 border border-line shrink-0" />
              <span className="text-xs sm:text-sm text-fg-dim italic">BYE — passa automaticamente</span>
            </div>
          ) : (
            <div
              data-player={m.timeB}
              data-bt={m.battletagB}
              data-plat={m.plataformaB}
              className={`flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 cursor-pointer hover:bg-surface-2/60 transition-colors
                ${concluida && vencedor === m.timeB ? "bg-ow-blue/15" : ""}
                ${concluida && vencedor !== m.timeB && vencedor !== "" && vencedor !== "—" ? "opacity-40" : ""}
              `}
            >
              <div className="flex items-center gap-3 sm:gap-4 truncate">
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs font-bold text-background shrink-0 shadow-md"
                  style={{ background: "var(--grad-blue)" }}
                >
                  {m.timeB ? m.timeB.substring(0, 2).toUpperCase() : "—"}
                </div>
                <div className="truncate space-y-0.5">
                  <span className={`text-sm sm:text-base font-bold uppercase tracking-wide block truncate underline-offset-4 hover:underline ${concluida && vencedor === m.timeB ? "text-ow-blue" : "text-fg"}`}>
                    {m.timeB || "A definir"}
                  </span>
                  {m.mainB && m.mainB !== "-" ? (
                    <p className="text-[11px] sm:text-xs text-ow-orange font-semibold">Main: {m.mainB}</p>
                  ) : m.plataformaB ? (
                    <span className="text-[9px] sm:text-[10px] text-fg-dim uppercase tracking-wider block">{m.plataformaB}</span>
                  ) : null}
                </div>
              </div>
              <span className="font-mono font-bold text-xl sm:text-2xl px-2 sm:px-4 text-fg tabular-nums">{m.scoreB}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Status */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 bg-surface-2 border-t border-line gap-2">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
          concluida ? "bg-ow-blue/15 text-ow-blue border-ow-blue/30" :
          isWO ? "bg-ow-orange/20 text-ow-orange border-ow-orange/40 animate-pulse" : "bg-surface-2 text-fg-muted border-line"
        }`}>
          {concluida ? "Encerrado" : isWO ? "⚠️ W.O. Aplicado (Atrasado +1h)" : "Aguardando"}
        </span>
        {concluida && vencedor && vencedor !== "—" && (
          <span className="text-xs text-fg-dim truncate">
            Vencedor: <span className="text-ow-blue font-bold uppercase tracking-wide">{vencedor}</span>
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
  const [agora, setAgora] = useState(() => new Date());
  const [jogadorPerfil, setJogadorPerfil] = useState<{ nome: string; battletag: string; plataforma: string; vitorias: number; derrotas: number; totalJogos: number } | null>(null);

  const [rodada1, setRodada1] = useState<MatchItem[]>([]);
  const [rodada2, setRodada2] = useState<MatchItem[]>([]);
  const [oitavas, setOitavas] = useState<MatchItem[]>([]);
  const [quartas, setQuartas] = useState<MatchItem[]>([]);
  const [semifinais, setSemifinais] = useState<MatchItem[]>([]);
  const [grandeFinal, setGrandeFinal] = useState<MatchItem[]>([]);
  const [podio, setPodio] = useState<PodioItem[]>([]);
  const [participantes, setParticipantes] = useState<Participant[]>([]);
  const [celebracaoAte, setCelebracaoAte] = useState<number | null>(null);

  const parseCSV = (csvText: string) => {
    if (!csvText) return;
    const source = csvText === FALLBACK_CSV ? EVENT_FALLBACK_CSV : csvText;
    const lines = source.split("\n").map(l => l.trim());

    let parsedRodada1: MatchItem[] = [];
    const parsedRodada2: MatchItem[] = [];
    const parsedOitavas: MatchItem[] = [];
    const parsedQuartas: MatchItem[] = [];
    const parsedSemifinais: MatchItem[] = [];
    const parsedFinal: MatchItem[] = [];
    const parsedPodio: PodioItem[] = [];
    const parsedPartes: Participant[] = [];

    let currentSection = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;

      if (line.includes("Jogador A") && line.includes("BattleTag A")) {
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
      while (cols[0] === "") cols.shift();

      try {
        if (currentSection === "rodada1" && cols.length >= 9 && cols[0] && cols[0] !== "Jogador A") {
          const planilhaAtual = cols[0].startsWith("Jogo") && cols.length >= 13;
          const pA = planilhaAtual ? cols[1] || "" : cols[0] || "";
          const btA = planilhaAtual ? cols[2] || "" : cols[1] || "";
          const mainA = planilhaAtual ? cols[3] || "" : "";
          const platA = planilhaAtual ? cols[4] || "" : cols[2] || "";
          const scA = planilhaAtual ? cols[5] || "—" : cols[3] || "—";
          const scB = planilhaAtual ? cols[6] || "—" : cols[4] || "—";
          const pB = planilhaAtual ? cols[7] || "" : cols[5] || "";
          const btB = planilhaAtual ? cols[8] || "" : cols[6] || "";
          const mainB = planilhaAtual ? cols[9] || "" : "";
          const platB = planilhaAtual ? cols[10] || "" : cols[7] || "";
          const venc = planilhaAtual ? cols[11] || "" : cols[8] || "";
          if (!pA && !pB) continue;
          const kiraIsA = pA.trim().toLowerCase() === "kira";
          const adversario = [pA, pB].find(nome => nome.trim() && nome.trim().toLowerCase() !== "kira") || "";
          if (!adversario) continue;

          let hor = "";
          for (let c = planilhaAtual ? 13 : 9; c < cols.length; c++) {
            if (cols[c] && cols[c].length > 0) {
              hor = cols[c];
              break;
            }
          }

          parsedRodada1.push({
            id: "",
            fase: "1ª Rodada",
            timeA: "Kira",
            battletagA: kiraIsA ? btA : btB,
            mainA: "Doomfist",
            plataformaA: kiraIsA ? platA : platB,
            scoreA: kiraIsA ? scA : scB,
            timeB: adversario,
            battletagB: kiraIsA ? btB : btA,
            mainB: kiraIsA ? mainB : mainA,
            plataformaB: kiraIsA ? platB : platA,
            scoreB: kiraIsA ? scB : scA,
            vencedor: venc,
            status: venc && venc !== "—" ? "concluida" : "pendente",
            horario: hor
          });

          parsedPartes.push({ nome: "Kira", battletag: kiraIsA ? btA : btB, plataforma: kiraIsA ? platA : platB });
          const adversarioBattletag = kiraIsA ? btB : btA;
          const adversarioPlataforma = kiraIsA ? platB : platA;
          if (adversario !== "BYE") parsedPartes.push({ nome: adversario, battletag: adversarioBattletag, plataforma: adversarioPlataforma });
        }

        const parseSubRodada = (cols: string[], faseName: string) => {
          if (cols.length < 10 || (!cols[0]?.startsWith("Jogo") && !cols[0]?.startsWith("Oitavas") && !cols[0]?.startsWith("Quartas") && !cols[0]?.startsWith("Semifinal") && !cols[0]?.includes("Final"))) return null;

          const hor = extractHorario(cols);
          const horarioIndex = cols.findIndex(col => /(?:sábado|sabado|sexta|domingo).*\d{1,2}:\d{2}h?/i.test(col));
          const formatoCompleto = horarioIndex >= 11;
          const venc = formatoCompleto ? "" : cols[9] || "";
          const status = formatoCompleto ? "pendente" : cols[10]?.toLowerCase() === "concluida" || (venc && venc !== "—") ? "concluida" : "pendente";

          return {
            id: cols[0] || "",
            fase: faseName,
            timeA: cols[1] || "",
            battletagA: formatoCompleto ? cols[2] || "" : "",
            mainA: formatoCompleto ? cols[3] || "" : cols[2] || "",
            plataformaA: formatoCompleto ? cols[4] || "" : cols[3] || "",
            scoreA: formatoCompleto ? cols[5] || "—" : cols[4] || "—",
            scoreB: formatoCompleto ? cols[6] || "—" : cols[5] || "—",
            timeB: formatoCompleto ? cols[7] || "" : cols[6] || "",
            battletagB: formatoCompleto ? cols[8] || "" : "",
            mainB: formatoCompleto ? cols[9] || "" : cols[7] || "",
            plataformaB: formatoCompleto ? cols[10] || "" : cols[8] || "",
            vencedor: venc,
            status,
            horario: hor
          };
        };

        if (currentSection === "rodada2") {
          const item = parseSubRodada(cols, "2ª Rodada");
          if (item) parsedRodada2.push(item);
        }

        if (currentSection === "oitavas") {
          const item = parseSubRodada(cols, "Oitavas de Final");
          if (item) parsedOitavas.push(item);
        }

        if (currentSection === "quartas") {
          const item = parseSubRodada(cols, "Quartas de Final");
          if (item) parsedQuartas.push(item);
        }

        if (currentSection === "semifinais") {
          const item = parseSubRodada(cols, "Semifinais");
          if (item) parsedSemifinais.push(item);
        }

        if (currentSection === "final") {
          const item = parseSubRodada(cols, "Grande Final");
          if (item) parsedFinal.push(item);
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

    parsedRodada2.sort((a, b) => parseHorarioToMinutes(a.horario || "") - parseHorarioToMinutes(b.horario || ""));
    parsedOitavas.sort((a, b) => parseHorarioToMinutes(a.horario || "") - parseHorarioToMinutes(b.horario || ""));
    parsedQuartas.sort((a, b) => parseHorarioToMinutes(a.horario || "") - parseHorarioToMinutes(b.horario || ""));
    parsedSemifinais.sort((a, b) => parseHorarioToMinutes(a.horario || "") - parseHorarioToMinutes(b.horario || ""));

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
        const res = await fetch(SHEET_API_URL, { cache: "no-store" });
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
    const refreshTimer = window.setInterval(loadLiveData, 30 * 1000);

    return () => {
      window.clearInterval(refreshTimer);
    };
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
    { id: "inicio", label: "Início" },
    { id: "partidas", label: "Chaveamento & Partidas" },
    { id: "podio", label: "Pódio" },
    { id: "regras", label: "Regras" },
  ];

  const rodadasTabs = [
    { id: "rodada1", label: "1ª Rodada", data: rodada1 },
    // As demais fases permanecem carregadas para preservar o histórico, mas ficam ocultas neste evento.
  ];

  const faseAtualId = determinarFaseAtual(rodadasTabs);
  const faseAtual = rodadasTabs.find(rodada => rodada.id === faseAtualId) || rodadasTabs[0];
  const proximaPartida = encontrarProximaPartida(rodadasTabs, faseAtualId, agora);

  // Além do Elo: o primeiro participante que vencer a Kira já leva o prêmio (sem segunda chance).
  const duelosConcluidos = EVENTO.partidaUnica ? rodada1.filter(partidaConcluida) : [];
  const primeiroDueloVencido = duelosConcluidos.find(m => {
    const w = determinarVencedor(m).trim().toLowerCase();
    return w !== "" && w !== EVENTO.convidado.toLowerCase();
  });
  const kiraVenceuEvento = EVENTO.partidaUnica
    && rodada1.length > 0
    && duelosConcluidos.length === rodada1.length
    && !primeiroDueloVencido;

  const vencedorFinal = primeiroDueloVencido
    ? determinarVencedor(primeiroDueloVencido)
    : grandeFinal.length > 0 && grandeFinal.every(partidaConcluida)
      ? determinarVencedor(grandeFinal[0])
      : "";

  useEffect(() => {
    const atualizarCelebracao = () => {
      const pendente = window.localStorage.getItem(CELEBRATION_PENDING_KEY) === "true";
      if (document.hidden && pendente) return;

      const agoraMs = Date.now();
      const ate = Number(window.localStorage.getItem(CELEBRATION_STORAGE_KEY) || 0);
      if (!document.hidden && pendente) {
        const novoAte = agoraMs + CELEBRATION_DURATION_MS;
        window.localStorage.setItem(CELEBRATION_STORAGE_KEY, String(novoAte));
        window.localStorage.removeItem(CELEBRATION_PENDING_KEY);
        setCelebracaoAte(novoAte);
        return;
      }

      setCelebracaoAte(ate > agoraMs ? ate : null);
    };

    if (vencedorFinal) {
      const salvoAte = Number(window.localStorage.getItem(CELEBRATION_STORAGE_KEY) || 0);
      if (document.hidden) {
        window.localStorage.setItem(CELEBRATION_PENDING_KEY, "true");
      } else if (salvoAte <= Date.now()) {
        window.localStorage.setItem(CELEBRATION_STORAGE_KEY, String(Date.now() + CELEBRATION_DURATION_MS));
      }
    }

    const inicializarCelebracao = window.setTimeout(atualizarCelebracao, 0);
    const timer = window.setInterval(atualizarCelebracao, 1000);
    document.addEventListener("visibilitychange", atualizarCelebracao);

    return () => {
      window.clearTimeout(inicializarCelebracao);
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", atualizarCelebracao);
    };
  }, [vencedorFinal]);

  useEffect(() => {
    const timer = window.setInterval(() => setAgora(new Date()), 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (aba === "partidas") setSubAbaRodada(faseAtualId);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [aba, faseAtualId]);

  const rodadaAtualAtiva = rodadasTabs.find(r => r.id === subAbaRodada) || rodadasTabs[0];

  const partidasFiltradas = rodadaAtualAtiva.data.filter(m => {
    const concluida = partidaConcluida(m);
    if (filtroStatus === "encerrado") return concluida;
    if (filtroStatus === "aguardando") return !concluida;
    return true;
  });

  const temHorarioRodada = rodadaAtualAtiva.data.some(m => m.horario && m.horario.trim() !== "");
  const isRodadaListagem = subAbaRodada !== "rodada1" && !temHorarioRodada;

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
              <p className="text-xs uppercase tracking-[0.25em] text-ow-orange/90 font-semibold">Evento especial · Além do Elo</p>
              <h1 className="text-display text-4xl md:text-5xl font-bold uppercase leading-none mt-1">
                Duel<span className="text-ow-orange">owatch</span>
              </h1>
              <p className="text-fg-muted text-sm mt-2">Sábado, dia 24 · Acompanhe o chaveamento sincronizado com a planilha oficial.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {ultimaAtualizacao && (
              <span className="text-[10px] text-fg-dim uppercase tracking-wider">
                Atualizado às {ultimaAtualizacao.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            )}
            {/* Selo Animado "AO VIVO" com Pulsação em Neon */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ow-orange/15 border border-ow-orange/50 text-ow-orange text-xs font-bold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-ow-orange shadow-[0_0_10px_#f99e1a]" />
              Sábado, dia 24
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {!vencedorFinal && (
                  <section className="order-0 lg:col-span-2 surface-card p-5 md:p-6 border border-ow-orange/50 bg-ow-orange/10 shadow-[0_0_24px_rgba(249,158,26,0.12)]">
                    <h2 className="text-display text-lg font-bold uppercase tracking-wider text-ow-orange">📢 Aviso importante</h2>
                    <p className="text-fg-muted text-sm leading-relaxed mt-2">
                      O jogador ausente terá <strong className="text-fg">5 minutos</strong> para entrar na call antes do possível W.O.
                    </p>
                  </section>
                )}

                {kiraVenceuEvento && (
                  <section className="order-0 lg:col-span-2 ow-rise surface-card p-5 md:p-6 border border-ow-blue/50 bg-ow-blue/10">
                    <h2 className="text-display text-lg font-bold uppercase tracking-wider text-ow-blue">🏆 A Kira venceu todos os duelos</h2>
                    <p className="text-fg-muted text-sm leading-relaxed mt-2">
                      Nenhum participante venceu a Kira. O <strong className="text-fg">bundle de Solo Leveling</strong> fica com ela.
                    </p>
                  </section>
                )}

                {/* CARD 1: Hero Banner do evento */}
                <section className="order-3 lg:col-span-2 relative rounded-3xl p-8 md:p-14 text-center overflow-hidden border border-ow-orange/30 shadow-[0_0_50px_rgba(249,158,26,0.15)] bg-gradient-to-b from-surface-2 to-surface">
                  <div className="absolute inset-0 hero-grad opacity-40 pointer-events-none" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-ow-orange/10 blur-[80px] pointer-events-none" />

                  <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ow-orange/15 border border-ow-orange/40 text-ow-orange text-xs font-bold uppercase tracking-[0.25em]">
                      ⚔️ Evento especial · Sábado, dia 24
                    </span>

                    <h2 className="text-display text-4xl md:text-6xl font-bold uppercase tracking-wide">
                      Além do <span className="text-ow-orange drop-shadow-[0_0_20px_rgba(249,158,26,0.5)]">Elo</span>
                    </h2>

                    <p className="text-fg-muted md:text-lg leading-relaxed max-w-2xl mx-auto">
                      A Kira enfrenta <strong className="text-fg font-bold">20 participantes</strong> em duelos 1v1 de <strong className="text-fg font-bold">partida única</strong>. Quem vencer a Kira uma vez já leva o prêmio, sem segunda chance. Se ninguém vencer, a Kira fica com a premiação.
                    </p>

                    <div className="surface-card max-w-md mx-auto p-6 border-2 border-ow-orange rounded-2xl bg-gradient-to-br from-ow-orange/10 via-surface to-surface shadow-[0_10px_30px_rgba(249,158,26,0.2)]">
                      <div className="text-5xl mb-3">🏆</div>
                      <p className="text-xs uppercase tracking-[0.25em] text-ow-orange font-bold">Premiação</p>
                      <h3 className="text-display text-2xl font-bold uppercase text-fg mt-2">Bundle de Solo Leveling</h3>
                      <p className="text-sm text-fg-muted mt-2">O vencedor do evento leva o bundle.</p>
                    </div>

                  </div>
                </section>

                {/* CARD 2: Status atual do torneio */}
                <section className="hidden order-1 flex flex-col justify-center surface-card rounded-3xl p-6 md:p-8 text-center border border-ow-orange/40 shadow-xl bg-surface-2 w-full">
                  <h3 className="text-display text-xl font-bold uppercase text-ow-orange mb-3 flex items-center justify-center gap-2">
                    <span>⚔️</span> Torneio em andamento · {faseAtual.label}
                  </h3>
                  <p className="text-sm text-fg-muted">Acompanhe as partidas da fase atual no chaveamento abaixo.</p>
                </section>

                <section className="hidden order-2 flex flex-col justify-center surface-card max-w-3xl w-full mx-auto rounded-3xl p-6 md:p-8 border border-ow-blue/40 shadow-xl bg-surface-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-line pb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-ow-blue font-bold">Próximo jogo</p>
                      <h3 className="text-display text-xl font-bold uppercase text-fg mt-1">
                        {proximaPartida?.horario || "Horário a definir"}
                      </h3>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-fg-dim">{faseAtual.label}</span>
                  </div>
                  {proximaPartida ? (
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3 pt-5 text-center">
                      <span className="surface-card border border-line px-4 py-3 font-bold text-fg">{proximaPartida.timeA || "A definir"}</span>
                      <span className="text-ow-orange font-bold text-sm">VS</span>
                      <span className="surface-card border border-line px-4 py-3 font-bold text-fg">{proximaPartida.timeB || "A definir"}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-fg-muted text-center pt-5">Nenhum próximo confronto foi definido.</p>
                  )}
                </section>

                {/* Convidado especial */}
                <section className="order-4 lg:col-span-2 ow-rise">
                  <h2 className="text-display text-2xl font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                    <span className="text-ow-orange">✦</span> Convidado especial
                  </h2>
                  <div className="surface-card max-w-2xl mx-auto rounded-3xl p-8 text-center border border-ow-blue/40 shadow-xl bg-surface-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-ow-blue font-bold">Convidado</p>
                    <h3 className="text-display text-3xl font-bold uppercase tracking-wider text-fg mt-2">Kira</h3>
                    <a
                      href="https://www.instagram.com/kira_owbr?srtk=cjVkYmR2NDJtaGU0"
                      target="_blank"
                      rel="noreferrer"
                      className="ow-btn inline-flex mt-5 rounded-full border border-ow-blue/50 px-5 py-2 text-sm font-semibold text-ow-blue transition-colors hover:bg-ow-blue/15"
                    >
                      Ver Instagram da Kira
                    </a>
                    <a
                      href="https://www.twitch.tv/akiralegacy"
                      target="_blank"
                      rel="noreferrer"
                      className="ow-btn inline-flex mt-3 rounded-full border border-ow-orange/50 px-5 py-2 text-sm font-semibold text-ow-orange transition-colors hover:bg-ow-orange/15"
                    >
                      Assistir na Twitch do Akira
                    </a>
                    <a
                      href="https://www.tiktok.com/@kira_ow"
                      target="_blank"
                      rel="noreferrer"
                      className="ow-btn inline-flex mt-3 rounded-full border border-ow-blue/50 px-5 py-2 text-sm font-semibold text-ow-blue transition-colors hover:bg-ow-blue/15"
                    >
                      TikTok da Kira
                    </a>
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

                <div className="max-w-xl mx-auto border border-ow-orange/50 bg-ow-orange/10 px-5 py-3 text-center rounded-xl shadow-[0_0_20px_rgba(249,158,26,0.12)]">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ow-orange">Fase atual</p>
                  <p className="text-sm font-semibold text-fg mt-1">O torneio está na {faseAtual.label}.</p>
                </div>

                {/* Sub-abas de Rodadas */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {rodadasTabs.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSubAbaRodada(r.id)}
                      className={`ow-btn px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all ${
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
                      className={`ow-btn px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg border transition-all ${
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
                  <h2 className="text-display text-3xl font-bold uppercase tracking-wider">Regras do Duelowatch</h2>
                  <p className="text-fg-muted text-sm mt-1">Entenda o formato e a dinâmica da competição.</p>
                </div>

                <div className="grid gap-4">
                  <div className="surface-card p-6 space-y-2">
                    <h3 className="text-display text-lg font-bold uppercase text-ow-orange">⚔️ Formato: Kira contra todos</h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      A Kira enfrenta cada participante em uma partida única, usando Doomfist. Cada duelo é independente e o chaveamento serve para acompanhar todos os duelos do evento.
                    </p>
                  </div>

                  <div className="surface-card p-6 space-y-3 border-ow-orange/40">
                    <h3 className="text-display text-lg font-bold uppercase text-ow-orange">🏆 Vitória e premiação</h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      Quem vencer a Kira <strong className="text-fg">uma vez</strong> leva o <strong className="text-fg">bundle de Solo Leveling</strong> imediatamente, sem segunda chance. Se ninguém conseguir vencer a Kira nos 20 duelos, ela será a vencedora do evento e ficará com a premiação.
                    </p>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      Cada confronto segue a ordem e o horário definidos no chaveamento. O jogador ausente terá <strong className="text-fg">5 minutos</strong> para entrar na call; depois disso, poderá ser aplicado <strong className="text-fg">W.O.</strong>
                    </p>
                  </div>

                  <div className="surface-card p-6 space-y-2">
                    <h3 className="text-display text-lg font-bold uppercase text-ow-orange">⏱️ Duração das Partidas</h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      Cada partida tem duração prevista de 10 minutos. As regras são reforçadas a cada partida para os participantes.
                    </p>
                  </div>

                  <div className="surface-card p-6 space-y-2">
                    <h3 className="text-display text-lg font-bold uppercase text-ow-orange">🎮 Partida única</h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      Todas as partidas são disputadas em <strong className="text-fg">partida única (BO1)</strong>. A Kira joga com seu main, Doomfist; o adversário utiliza seu próprio main.
                    </p>
                  </div>

                  {EVENTO.mostrarDesempate && (
                  <div className="surface-card p-6 space-y-2">
                    <h3 className="text-display text-lg font-bold uppercase text-ow-orange">🎲 Desempate</h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      Em caso de empate na série, será utilizado um herói secreto e aleatório, conforme definido pela organização.
                    </p>
                  </div>
                  )}

                  <div className="surface-card p-6 space-y-2">
                    <h3 className="text-display text-lg font-bold uppercase text-ow-orange">🔒 Regra dos Mains</h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      A Kira joga com Doomfist em todos os confrontos. O main de cada adversário é exibido conforme a atualização na planilha oficial.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {vencedorFinal && celebracaoAte && (
        <ConfettiCelebration winner={vencedorFinal} />
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
                <span className="text-display text-xl font-bold text-ow-blue block">{jogadorPerfil.vitorias}</span>
                <span className="text-[10px] uppercase tracking-wider text-fg-dim">Vitórias</span>
              </div>
              <div className="bg-surface-2 p-3 rounded-xl border border-line">
                <span className="text-display text-xl font-bold text-ow-orange block">{jogadorPerfil.derrotas}</span>
                <span className="text-[10px] uppercase tracking-linejoin uppercase tracking-wider text-fg-dim">Derrotas</span>
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
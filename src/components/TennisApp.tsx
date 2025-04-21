"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type RankingItem = {
  Posición: string;
  Jugador: string;
  "Puntos Reales": string;
};

type GrupoItem = {
  Grupo: string;
  Jugador: string;
  Posición: string;
  "Partidos Jugados": string;
};

type ResultadoItem = {
  "Jugador A": string;
  "Jugador B": string;
  "Set 1": string;
  "Set 2": string;
  "Set 3"?: string;
  Ganador: string;
};

export default function TennisApp() {
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [grupos, setGrupos] = useState<GrupoItem[]>([]);
  const [resultados, setResultados] = useState<ResultadoItem[]>([]);

  useEffect(() => {
    fetch("https://opensheet.elk.sh/1rH8506fhedqg61aMSKaEVbth3IjHm-_rYGKywjDvBsg/Ranking")
      .then((res) => res.json())
      .then(setRanking);

    fetch("https://opensheet.elk.sh/1rH8506fhedqg61aMSKaEVbth3IjHm-_rYGKywjDvBsg/Grupos")
      .then((res) => res.json())
      .then(setGrupos);

    fetch("https://opensheet.elk.sh/1rH8506fhedqg61aMSKaEVbth3IjHm-_rYGKywjDvBsg/Resultados")
      .then((res) => res.json())
      .then(setResultados);
  }, []);

  return (
    <main className="max-w-xl mx-auto p-4">
      <Tabs defaultValue="ranking" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ranking" className="tab-trigger">Posiciones</TabsTrigger>
          <TabsTrigger value="grupos" className="tab-trigger">Grupos</TabsTrigger>
          <TabsTrigger value="resultados" className="tab-trigger">Partidos</TabsTrigger>
        </TabsList>

        {/* TAB POSICIONES */}
        <TabsContent value="ranking">
          <div className="grid gap-2">
            {ranking.map((j, i) => (
              <Card key={i}>
                <CardContent className="p-2 flex justify-between">
                  <span>
                    {j["Posición"] === "1" && "🥇 "}
                    {j["Posición"] === "2" && "🥈 "}
                    {j["Posición"] === "3" && "🥉 "}
                    {j["Posición"]}. {j.Jugador}
                  </span>
                  <span>{j["Puntos Reales"]} pts</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* TAB GRUPOS */}
        <TabsContent value="grupos">
          {["A", "B", "C", "D"].map((grupo) => (
            <div key={grupo} className="mb-4">
              <h3 className="font-bold mb-1">Grupo {grupo}</h3>
              <div className="grid gap-1">
                {grupos
                  .filter((g) => g.Grupo === grupo)
                  .map((j, i) => (
                    <Card key={i}>
                      <CardContent className="p-2 flex justify-between">
                        <span>{j.Posición}. {j.Jugador}</span>
                        <span>{j["Partidos Jugados"]} PJ</span>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </TabsContent>

        {/* TAB PARTIDOS */}
        <TabsContent value="resultados">
          <div className="grid gap-2">
            {Array.isArray(resultados) && resultados.map((r, i) => (
              <Card key={i}>
                <CardContent className="p-2">
                  <div className="font-semibold">{r["Jugador A"]} vs {r["Jugador B"]}</div>
                  <div className="text-sm">
                    {r["Set 1"]} | {r["Set 2"]} {r["Set 3"] && `| ${r["Set 3"]}`}
                  </div>
                  <div className="text-xs text-right">Ganador: {r.Ganador}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

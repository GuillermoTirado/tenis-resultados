import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type RankingItem = {
    Posición: string
    Jugador: string
    Puntos: string
  };

  type RankingItem = {
    Lugar: string;
    Jugador: string;
    PJ: string;
    PG: string;
    JG: string;
    JP: string;
    DIF: string;
    "Puntos Reales": string;
  };
  

  type GrupoItem = {
    Grupo: string
    Jugador: string
    Posición: string
    "Partidos Jugados": string
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
    fetch(
      "https://opensheet.elk.sh/1rH8506fhedqg61aMSKaEVbth3IjHm-_rYGKywjDvBsg/Ranking"
    )
      .then((res) => res.json())
      .then(setRanking);

    fetch(
      "https://opensheet.elk.sh/1rH8506fhedqg61aMSKaEVbth3IjHm-_rYGKywjDvBsg/Grupos"
    )
      .then((res) => res.json())
      .then(setGrupos);

    fetch(
      "https://opensheet.elk.sh/1rH8506fhedqg61aMSKaEVbth3IjHm-_rYGKywjDvBsg/Resultados"
    )
      .then((res) => res.json())
      .then(setResultados);
  }, []);

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Resultados Liga de Tenis</h1>

      <Tabs defaultValue="ranking" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
  <TabsTrigger value="ranking" className="tab-trigger">Resultado General</TabsTrigger>
  <TabsTrigger value="grupos" className="tab-trigger">Grupos</TabsTrigger>
  <TabsTrigger value="resultados" className="tab-trigger">Partidos</TabsTrigger>
</TabsList>



<TabsContent value="ranking">
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left border border-border rounded-sm">
      <thead>
        <tr className="bg-muted">
          <th className="p-2">Lugar</th>
          <th className="p-2">Jugador</th>
          <th className="p-2">PJ</th>
          <th className="p-2">PG</th>
          <th className="p-2">JG</th>
          <th className="p-2">JP</th>
          <th className="p-2">DIF</th>
          <th className="p-2">Puntos Reales</th>
        </tr>
      </thead>
      <tbody>
        {ranking.map((j, i) => (
          <tr key={i} className="border-t border-border">
            <td className="p-2">{j.Lugar}</td>
            <td className="p-2">{j.Jugador}</td>
            <td className="p-2">{j.PJ}</td>
            <td className="p-2">{j.PG}</td>
            <td className="p-2">{j.JG}</td>
            <td className="p-2">{j.JP}</td>
            <td className="p-2">{j.DIF}</td>
            <td className="p-2 font-semibold">{j["Puntos Reales"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</TabsContent>


        <TabsContent value="grupos">
          <div className="grid gap-4">
            {["A", "B", "C", "D"].map((grupo) => (
              <div key={grupo}>
                <h2 className="font-semibold mb-1">Grupo {grupo}</h2>
                <div className="grid gap-1">
                  {grupos
                    .filter((g) => g.Grupo === grupo)
                    .map((j, i) => (
                      <Card key={i}>
                        <CardContent className="p-2 flex justify-between">
                          <span>{j.Jugador}</span>
                          <span>{j.Posición}º lugar - {j["Partidos Jugados"]} PJ</span>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resultados">
  <div className="grid gap-2">
    {Array.isArray(resultados) ? (
      resultados.map((r, i) => (
        <Card key={i}>
          <CardContent className="p-2">
            <div className="font-semibold">{r["Jugador A"]} vs {r["Jugador B"]}</div>
            <div className="text-sm">
              {r["Set 1"]} | {r["Set 2"]} {r["Set 3"] && `| ${r["Set 3"]}`}
            </div>
            <div className="text-xs text-right">Ganador: {r.Ganador}</div>
          </CardContent>
        </Card>
      ))
    ) : (
      <p className="text-sm text-muted-foreground">No hay resultados disponibles.</p>
    )}
  </div>
</TabsContent>

      </Tabs>
    </main>
  );
}

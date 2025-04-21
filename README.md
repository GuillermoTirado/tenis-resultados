# 🎾 App Resultados Liga de Tenis

Aplicación web desarrollada en **Next.js + React + Tailwind CSS**, conectada a una **planilla de Google Sheets** para mostrar en tiempo real:

- 🏆 Ranking general
- 📊 Grupos por categoría
- 🎾 Resultados de partidos

👉 **Acceso directo a la app:**  
[https://tenis-resultados.vercel.app](https://tenis-resultados.vercel.app)

---

## 📌 Tecnologías utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [OpenSheet](https://opensheet.elk.sh/) – Para convertir Google Sheets en API

---

## 🔌 Fuente de datos

Esta app se conecta en tiempo real con una planilla de Google Sheets estructurada con pestañas:

- `Ranking`
- `Grupos`
- `Resultados`

Los datos se obtienen vía JSON con el servicio:  
`https://opensheet.elk.sh/{spreadsheet_id}/{tab}`

---

## 🛠 Cómo levantar el proyecto localmente

```bash
git clone https://github.com/GuillermoTirado/tenis-resultados.git
cd tenis-resultados
npm install
npm run dev

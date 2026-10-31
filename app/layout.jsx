import "./globals.css";
import StudyTimer from "./StudyTimer";
export const metadata = { title: "Интерактивная физиология сердечно-сосудистой системы", description: "Учебник нормальной физиологии сердца и сосудов для студентов-медиков. RU / EN / KZ." };
export default function RootLayout({children}) { return <html lang="ru"><body>{children}<StudyTimer /></body></html>; }

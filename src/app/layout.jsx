import "./reset.css";
import "./globals.css";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Roboto } from 'next/font/google'

export const metadata = {
  title: "EuIAv2",
  description: "Um chatbot desenvolvido por Aparecido Celso de Souza Junior, com o objetivo de fornecer assistência às pessoas interessadas em contratá-lo como Programador Web especializado em PHP.",
};

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <Container>
          <Header />
          {children}
        </Container>
      </body>
    </html>
  );
}

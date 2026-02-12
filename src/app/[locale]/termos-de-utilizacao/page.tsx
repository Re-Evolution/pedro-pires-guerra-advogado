import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ArrowLeft } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header locale={locale} />
      <main className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <a
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-sm text-orange hover:underline mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Site
          </a>

          <article className="prose prose-lg max-w-none prose-headings:text-text-dark prose-p:text-text-medium prose-a:text-orange prose-strong:text-text-dark">
            <h1>Termos de Utilizacao do Website</h1>
            <p className="text-text-light text-sm">Ultima atualizacao: Fevereiro 2025</p>

            <h2>1. Aceitacao dos Termos</h2>
            <p>
              Ao aceder e utilizar este website, concorda com estes Termos de Utilizacao.
              Se nao concordar, nao deve utilizar o site.
            </p>

            <h2>2. Sobre Este Website</h2>
            <p>
              Este website e operado por:<br />
              <strong>Pedro Pires Guerra Advogado</strong><br />
              <strong>OA N.o {CONTACT.oaNumber}</strong><br />
              <strong>Morada:</strong> {CONTACT.address.building}, {CONTACT.address.street}, {CONTACT.address.postal}<br />
              <strong>Email:</strong> {CONTACT.email}
            </p>

            <h2>3. Servicos Oferecidos</h2>
            <p>Este website fornece informacoes sobre servicos juridicos, formularios de contacto e agendamento, e conteudo educacional (FAQ).</p>
            <p>
              <strong>IMPORTANTE:</strong> O uso deste website NAO estabelece uma relacao
              advogado-cliente. Essa relacao so se forma mediante acordo escrito apos consulta.
            </p>

            <h2>4. Propriedade Intelectual</h2>
            <p>
              Todo o conteudo deste website e propriedade de Pedro Pires Guerra Advogado ou
              licenciado para uso, protegido por direitos de autor. E proibido copiar, reproduzir
              ou distribuir conteudo sem autorizacao.
            </p>

            <h2>5. Informacao Juridica vs. Aconselhamento Juridico</h2>
            <p>
              O conteudo deste website (incluindo FAQ) tem fins meramente informativos e
              educacionais. NAO constitui aconselhamento juridico especifico, parecer legal
              vinculativo, ou substituicao de consulta com advogado.
            </p>

            <h2>6. Precisao da Informacao</h2>
            <p>
              Esforcamo-nos para manter informacao precisa e atualizada, mas legislacao pode
              mudar sem aviso previo e informacao pode conter erros ou imprecisoes involuntarios.
            </p>

            <h2>7. Ligacoes Externas</h2>
            <p>
              Este website pode conter links para sites de terceiros. Nao somos responsaveis pelo
              conteudo, politicas de privacidade ou disponibilidade de websites externos.
            </p>

            <h2>8. Uso do Website - Proibicoes</h2>
            <p>Ao utilizar este website, compromete-se a nao:</p>
            <ul>
              <li>Violar leis ou regulamentos aplicaveis</li>
              <li>Enviar conteudo ofensivo ou ilegal atraves de formularios</li>
              <li>Tentar aceder a areas restritas do website</li>
              <li>Usar bots, scrapers ou sistemas automatizados</li>
              <li>Interferir com o funcionamento do website</li>
            </ul>

            <h2>9. Formularios de Contacto</h2>
            <p>
              Ao submeter formularios, confirma que as informacoes sao verdadeiras, consente o
              contacto por parte do escritorio, aceita a Politica de Privacidade e entende que a
              submissao nao cria relacao advogado-cliente.
            </p>

            <h2>10. Limitacao de Responsabilidade</h2>
            <p>
              Na maxima extensao permitida por lei, Pedro Pires Guerra Advogado nao se
              responsabiliza por danos diretos ou indiretos resultantes do uso do website.
            </p>

            <h2>11. Lei Aplicavel e Jurisdicao</h2>
            <p>
              Estes Termos regem-se pela lei portuguesa. Qualquer litigio sera da competencia
              exclusiva dos tribunais de Lisboa, Portugal.
            </p>

            <h2>12. Sigilo Profissional</h2>
            <p>
              Pedro Pires Guerra, como advogado inscrito na Ordem dos Advogados (N.o {CONTACT.oaNumber}),
              esta sujeito a rigoroso dever de sigilo profissional conforme Estatuto da Ordem dos
              Advogados. Todas as comunicacoes sao tratadas com confidencialidade.
            </p>

            <h2>13. Contacto</h2>
            <p>
              Para questoes sobre estes Termos:<br />
              Email: {CONTACT.email}<br />
              Telefone: {CONTACT.phone}<br />
              Morada: {CONTACT.address.building}, {CONTACT.address.street}, {CONTACT.address.postal}
            </p>
          </article>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}

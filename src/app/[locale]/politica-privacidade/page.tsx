import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ArrowLeft } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export default async function PrivacyPolicyPage({
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
            <h1>Politica de Privacidade</h1>
            <p className="text-text-light text-sm">Ultima atualizacao: Fevereiro 2025</p>

            <h2>1. Introducao</h2>
            <p>
              Pedro Pires Guerra Advogado (&ldquo;nos&rdquo;, &ldquo;nosso&rdquo;) respeita a sua privacidade e esta
              comprometido com a protecao dos seus dados pessoais. Esta Politica de Privacidade
              explica como recolhemos, usamos e protegemos as suas informacoes quando utiliza o
              nosso website.
            </p>

            <h2>2. Responsavel pelo Tratamento de Dados</h2>
            <p>
              <strong>Nome:</strong> Pedro Pires Guerra Advogado<br />
              <strong>Morada:</strong> {CONTACT.address.building}, {CONTACT.address.street}, {CONTACT.address.postal}<br />
              <strong>Email:</strong> {CONTACT.email}<br />
              <strong>Telefone:</strong> {CONTACT.phone}
            </p>

            <h2>3. Dados Pessoais Recolhidos</h2>
            <p>Podemos recolher as seguintes informacoes quando preenche os nossos formularios:</p>
            <ul>
              <li>Nome completo</li>
              <li>Endereco de email</li>
              <li>Numero de telefone/telemovel</li>
              <li>Informacoes sobre o seu caso juridico (fornecidas voluntariamente)</li>
              <li>Endereco IP e dados de navegacao (cookies)</li>
            </ul>

            <h2>4. Finalidade do Tratamento</h2>
            <p>Utilizamos os seus dados pessoais para:</p>
            <ul>
              <li>Responder aos seus pedidos de contacto e agendamento de consultas</li>
              <li>Prestar servicos juridicos solicitados</li>
              <li>Comunicar sobre o andamento de processos</li>
              <li>Melhorar a experiencia no nosso website</li>
            </ul>

            <h2>5. Base Legal</h2>
            <p>O tratamento dos seus dados baseia-se em:</p>
            <ul>
              <li><strong>Consentimento:</strong> Ao preencher formularios no site</li>
              <li><strong>Execucao de contrato:</strong> Prestacao de servicos juridicos</li>
              <li><strong>Obrigacoes legais:</strong> Cumprimento de deveres deontologicos da Ordem dos Advogados</li>
              <li><strong>Interesses legitimos:</strong> Gestao administrativa do escritorio</li>
            </ul>

            <h2>6. Partilha de Dados</h2>
            <p>
              Os seus dados pessoais NAO sao vendidos ou partilhados com terceiros, exceto quando
              necessario para prestacao de servicos juridicos, fornecedores de servicos tecnicos
              sob acordos de confidencialidade, ou quando exigido por lei.
            </p>

            <h2>7. Conservacao de Dados</h2>
            <ul>
              <li><strong>Clientes ativos:</strong> Durante a prestacao de servicos + 5 anos</li>
              <li><strong>Potenciais clientes:</strong> Ate 2 anos apos ultimo contacto</li>
              <li><strong>Dados de navegacao:</strong> Conforme politica de cookies</li>
            </ul>

            <h2>8. Os Seus Direitos (RGPD)</h2>
            <p>Tem o direito de:</p>
            <ul>
              <li><strong>Acesso:</strong> Solicitar copia dos dados que possuimos sobre si</li>
              <li><strong>Retificacao:</strong> Corrigir dados incorretos ou incompletos</li>
              <li><strong>Apagamento:</strong> Solicitar eliminacao dos seus dados</li>
              <li><strong>Oposicao:</strong> Opor-se ao tratamento dos seus dados</li>
              <li><strong>Portabilidade:</strong> Receber dados em formato estruturado</li>
              <li><strong>Limitacao:</strong> Restringir o tratamento em certas circunstancias</li>
            </ul>
            <p>Para exercer estes direitos, contacte: {CONTACT.email}</p>

            <h2>9. Seguranca</h2>
            <p>
              Implementamos medidas tecnicas e organizativas para proteger os seus dados contra
              acesso nao autorizado, perda ou destruicao, incluindo conexao HTTPS encriptada,
              servidores seguros, acesso restrito e backups regulares.
            </p>

            <h2>10. Cookies</h2>
            <p>
              Este website utiliza cookies para melhorar a experiencia do utilizador. Pode gerir
              as suas preferencias de cookies nas definicoes do navegador.
            </p>

            <h2>11. Reclamacoes</h2>
            <p>
              Se considerar que os seus direitos foram violados, pode apresentar reclamacao a:<br />
              <strong>CNPD - Comissao Nacional de Protecao de Dados</strong><br />
              Website: www.cnpd.pt | Email: geral@cnpd.pt
            </p>

            <h2>12. Contacto</h2>
            <p>
              Para questoes sobre esta politica ou tratamento de dados:<br />
              Email: {CONTACT.email}<br />
              Telefone: {CONTACT.phone}
            </p>
          </article>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}

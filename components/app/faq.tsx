import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function FAQ() {
  return (
    <section id="faq" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl text-balance">
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-lg text-slate-600 text-pretty">
            Tire suas dúvidas sobre o CajuReserva
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-slate-200">
            <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-orange-600">
              Como funciona a verificação anti-conflito?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed">
              Nossa verificação em tempo real analisa todas as reservas
              existentes no momento em que você tenta fazer uma nova reserva. O
              sistema bloqueia automaticamente horários já ocupados, garantindo
              que não haja conflitos de agenda.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-slate-200">
            <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-orange-600">
              Posso exportar os relatórios de uso dos espaços?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed">
              Sim! Todos os planos incluem exportação de relatórios em formatos
              CSV e PDF. Você pode gerar relatórios personalizados por período,
              espaço ou tipo de usuário.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-slate-200">
            <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-orange-600">
              O sistema funciona em dispositivos móveis?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed">
              Sim! O CajuReserva é totalmente responsivo e funciona
              perfeitamente em smartphones e tablets. Você pode gerenciar
              reservas de qualquer lugar, a qualquer momento.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-slate-200">
            <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-orange-600">
              Posso personalizar as permissões de cada usuário?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed">
              Com certeza! O sistema permite criar perfis customizados com
              diferentes níveis de acesso. Você define quem pode apenas
              visualizar, reservar, aprovar ou gerenciar completamente os
              espaços.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-slate-200">
            <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-orange-600">
              Como funcionam as notificações de reserva?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed">
              Os usuários recebem notificações automáticas por email em cada
              etapa: confirmação de reserva, aprovação pelo administrador,
              lembretes antes do horário agendado e notificações de cancelamento
              se necessário.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-slate-200">
            <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-orange-600">
              Há limite de reservas simultâneas?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed">
              No plano Starter há limite de 50 reservas por mês. Nos planos Hub
              e Enterprise as reservas são ilimitadas, permitindo escalar
              conforme o crescimento do seu hub de inovação.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border-slate-200">
            <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-orange-600">
              Posso integrar com outros sistemas?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed">
              O plano Hub e Enterprise incluem acesso à nossa API RESTful
              completa, permitindo integrações com sistemas de controle de
              acesso, calendários externos, sistemas de cobrança e muito mais.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="border-slate-200">
            <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-orange-600">
              Como funciona o período de teste?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed">
              Oferecemos 14 dias de teste gratuito em qualquer plano, sem
              necessidade de cartão de crédito. Durante esse período você tem
              acesso completo a todas as funcionalidades para avaliar se o
              CajuReserva atende suas necessidades.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

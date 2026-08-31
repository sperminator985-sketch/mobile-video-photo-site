import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Footer from '@/components/site/Footer';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-8">
    <h2 className="font-display text-lg font-semibold text-foreground sm:text-xl">{title}</h2>
    <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{children}</div>
  </section>
);

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl py-10 sm:py-14">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Icon name="ArrowLeft" size={16} />
          На главную
        </Link>

        <h1 className="mt-6 font-display text-2xl font-bold text-foreground sm:text-3xl">
          Политика конфиденциальности
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Дата публикации: {new Date().getFullYear()} г.
        </p>

        <Section title="1. Общие положения">
          <p>
            Настоящая Политика определяет порядок обработки и защиты персональных данных
            пользователей сайта студии «Айсберг-Видео» (далее — Сайт), владельцем которого является
            Siberia Art Ltd. (далее — Владелец).
          </p>
          <p>
            Политика составлена в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ
            «О персональных данных». Используя Сайт и отправляя свои данные через формы обратной
            связи, пользователь подтверждает согласие с условиями настоящей Политики.
          </p>
        </Section>

        <Section title="2. Какие данные мы собираем">
          <p>Владелец обрабатывает только те данные, которые пользователь указывает добровольно:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>имя;</li>
            <li>номер телефона;</li>
            <li>адрес электронной почты (если указан);</li>
            <li>дата предполагаемой съёмки и комментарий к заявке (если указаны).</li>
          </ul>
          <p>
            Также автоматически могут собираться обезличенные технические данные: IP-адрес, тип
            браузера, страницы посещения — с помощью сервисов интернет-статистики.
          </p>
        </Section>

        <Section title="3. Цели обработки">
          <p>
            Персональные данные используются исключительно для связи с пользователем по его заявке,
            согласования условий съёмки, оказания услуг и информирования о статусе заказа.
          </p>
        </Section>

        <Section title="4. Передача данных третьим лицам">
          <p>
            Владелец не продаёт и не передаёт персональные данные третьим лицам, за исключением
            случаев, прямо предусмотренных законодательством Российской Федерации.
          </p>
        </Section>

        <Section title="5. Хранение и защита">
          <p>
            Данные хранятся не дольше, чем этого требуют цели обработки. Владелец принимает
            необходимые организационные и технические меры для защиты данных от неправомерного
            доступа, копирования, распространения и уничтожения.
          </p>
        </Section>

        <Section title="6. Права пользователя">
          <p>
            Пользователь вправе в любой момент запросить сведения об обработке своих данных,
            потребовать их уточнения, блокировки или удаления, а также отозвать согласие на
            обработку. Для этого достаточно направить обращение на электронную почту Владельца.
          </p>
        </Section>

        <Section title="7. Контакты">
          <p>
            Siberia Art Ltd.
            <br />
            Адрес: пр. Фрунзе, 20, офис 427
            <br />
            Телефон: +7 (909) 547-23-25
            <br />
            E-mail: daumsam@mail.ru
          </p>
        </Section>

        <Section title="8. Изменения Политики">
          <p>
            Владелец вправе вносить изменения в настоящую Политику. Новая редакция вступает в силу
            с момента её размещения на Сайте.
          </p>
        </Section>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container relative py-6 flex flex-col items-center justify-center gap-2">
        <p className="text-sm text-white">Тел: +7 (909) 547-23-25</p>
        <p className="text-sm text-white">E-mail: daumsam@mail.ru</p>
        <p className="text-sm text-white">Адрес: пр.Фрунзе-20, офис-427</p>

        <div className="hidden md:flex absolute left-4 sm:left-6 top-0 bottom-0 items-center">
          <p className="text-sm text-white/70 leading-snug">
            © {new Date().getFullYear()} Siberia Art Ltd.
            <br />
            Все права защищены.
          </p>
        </div>

        <div className="hidden md:flex absolute left-[22%] lg:left-[25%] top-0 bottom-0 items-center">
          <Link
            to="/privacy"
            className="text-sm text-white/70 underline underline-offset-4 hover:text-white transition-colors text-center leading-snug"
          >
            Политика
            <br />
            конфиденциальности
          </Link>
        </div>

        <div className="hidden md:flex absolute right-[22%] lg:right-[25%] top-0 bottom-0 items-center">
          <Link
            to="/terms"
            className="text-sm text-white/70 underline underline-offset-4 hover:text-white transition-colors text-center leading-snug"
          >
            Пользовательское
            <br />
            соглашение
          </Link>
        </div>

        <div className="hidden md:flex absolute right-4 sm:right-6 top-0 bottom-0 items-center">
          <img
            src="https://informer.yandex.ru/informer/112322016/3_1_FFFFFFFF_EFEFEFFF_0_pageviews"
            alt="Яндекс.Метрика"
            className="h-[31px] w-[88px]"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
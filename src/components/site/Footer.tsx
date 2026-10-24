import { Link } from 'react-router-dom';
import DownloadDialog from './DownloadDialog';

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container relative py-6 flex flex-col items-center justify-center gap-2">
        <p className="md:hidden text-sm text-white">Тел: +7 (909) 547-23-25</p>
        <div className="hidden md:block">
          <DownloadDialog
            trigger={
              <button type="button" className="text-sm text-white cursor-pointer">
                Тел: +7 (909) 547-23-25
              </button>
            }
          />
        </div>
        <p className="text-sm text-white">E-mail: daumsam@mail.ru</p>
        <p className="text-sm text-white">Адрес: пр.Фрунзе-20, офис-427</p>

        <div className="hidden md:flex absolute left-4 sm:left-6 top-0 bottom-0 items-center">
          <p className="text-sm text-white/70 leading-snug">
            © {new Date().getFullYear()} Siberia Art Ltd.
            <br />
            Все права защищены.
          </p>
        </div>

        <div className="hidden xl:flex absolute left-[25%] top-0 bottom-0 items-center">
          <Link
            to="/privacy"
            className="text-sm text-white/70 underline underline-offset-4 hover:text-white transition-colors text-center leading-snug"
          >
            Политика
            <br />
            конфиденциальности
          </Link>
        </div>

        <div className="hidden xl:flex absolute right-[25%] top-0 bottom-0 items-center">
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
          <div className="shrink-0 border-2 border-white/45 bg-white/15 p-1">
            <img
              src="https://informer.yandex.ru/informer/113765855/3_1_FFFFFFFF_EFEFEFFF_0_pageviews"
              alt="Яндекс.Метрика"
              loading="lazy"
              width={88}
              height={31}
              className="block h-[31px] w-[88px]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
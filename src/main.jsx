import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const imageAssets = import.meta.glob("/images/*.{jpg,png}", {
  eager: true,
  import: "default",
  query: "?url",
});

// เปลี่ยนรูปภาพได้จากชื่อไฟล์ในโฟลเดอร์ images
function imageUrl(filename) {
  return imageAssets[`/images/${filename}`] || `/images/${filename}`;
}

// แก้ข้อความที่แสดงบนเว็บได้ที่นี่ โดยแยกตามภาษา th, en และ jp
const translations = {
  th: {
    nav: ["หน้าหลัก", "เกี่ยวกับเรา", "บริการ", "เครื่องจักร", "สินค้า", "ติดต่อเรา"],
    heroEyebrow: "P.TECH INTER PRECISION",
    heroTitle: "ความแม่นยำที่สร้างความเชื่อมั่น",
    heroSubtitle: "ผู้ผลิตชิ้นส่วนโลหะความเที่ยงตรงสูง เพื่ออุตสาหกรรมที่ก้าวไปข้างหน้า",
    aboutTitle: "เกี่ยวกับเรา",
    aboutText:
      "บริษัท พี.เทค อินเตอร์ พรีซิชั่น จำกัด ก่อตั้งขึ้นเพื่อให้บริการผลิตชิ้นส่วนแม่พิมพ์ อะไหล่ จิ๊ก ฟิกเจอร์ และสแปร์พาร์ทสำหรับอุตสาหกรรมอิเล็กทรอนิกส์และยานยนต์ ด้วยวัสดุหลากหลาย เช่น เหล็ก อลูมิเนียม สแตนเลส ทองเหลือง ทองแดง คาร์ไบด์ และพลาสติก เราดำเนินการผ่านการขึ้นรูป เจาะ กลึง ตัด ขัด กัด เจียร และทำเกลียว โดยมุ่งเน้นคุณภาพ การควบคุมมาตรฐาน และการส่งมอบตรงเวลา ลูกค้าชั้นนำ เช่น Hitachi Chemical Asia, Fuji Electric, Fortune Cross, Panasonic Appliance, S.N. Group, Noble Precision ให้ความไว้วางใจ",
    servicesTitle: "บริการของเรา",
    machineryTitle: "เครื่องจักรในการผลิต",
    contactTitle: "ติดต่อเรา",
    phone: "โทรศัพท์",
    email: "อีเมล",
    address: "ที่อยู่",
    facebookText: "ติดตามข่าวสารและอัปเดตงานผลิตจากเรา",
    facebookButton: "ไปที่ Facebook Page",
    productsTitle: "ตัวอย่างสินค้า",
    productsIntro: "ผลงานชิ้นส่วนโลหะและงานผลิตความเที่ยงตรงสูงของเรา",
    cookieText: "เว็บไซต์นี้ใช้คุกกี้เพื่อมอบประสบการณ์การใช้งานที่ดีที่สุด",
    cookiePolicy: "นโยบายคุกกี้",
    cookieAccept: "ยอมรับคุกกี้",
    aboutButton: "เกี่ยวกับเรา",
    emailValue: "w.prawit@hotmail.com, p.tech-inter@live.com",
    addressValue: "117/239 ม.18 ต.คลองหนึ่ง อ.คลองหลวง จ.ปทุมธานี 12120",
    services: [
      "Machining Center Process",
      "CNC Lathe Process",
      "Precision Parts & Spare Parts",
      "Progressive Die Parts",
      "Jig / Fixture",
      "Machine Maker",
    ],
    machines: ["Machining Center 3 Axis", "CNC Lathe swiss type bar feeder", "Grinding Machine"],
  },
  en: {
    nav: ["Home", "About Us", "Services", "Machinery", "Products", "Contact"],
    heroEyebrow: "P.TECH INTER PRECISION",
    heroTitle: "Precision that inspires confidence",
    heroSubtitle: "High-precision metal parts for industries moving forward.",
    aboutTitle: "About Us",
    aboutText:
      "P.tech Inter Precision Co., Ltd. provides mold parts, jigs, fixtures, and spare components for the electronics and automotive industries using materials such as steel, aluminum, stainless steel, brass, copper, carbide, PVC, and plastics. Our processes include forming, drilling, turning, cutting, grinding, milling, and threading. We focus on consistent quality, on-time delivery, competitive pricing, and excellent customer service. Leading clients such as Hitachi Chemical Asia, Fuji Electric, Fortune Cross, Panasonic Appliance, S.N. Group, and Noble Precision trust our products and services.",
    servicesTitle: "Our Services",
    machineryTitle: "Our Machinery",
    contactTitle: "Contact Us",
    phone: "Phone",
    email: "Email",
    address: "Address",
    facebookText: "Follow our page for news and production updates.",
    facebookButton: "Visit Facebook Page",
    productsTitle: "Product Samples",
    productsIntro: "A selection of our precision metal components and manufactured parts.",
    cookieText: "This website uses cookies to ensure you get the best experience.",
    cookiePolicy: "Cookie policy",
    cookieAccept: "Accept cookies",
    aboutButton: "About Us",
    emailValue: "w.prawit@hotmail.com, p.tech-inter@live.com",
    addressValue: "117/239 Moo 18, Khlong Nueng, Khlong Luang, Pathum Thani 12120",
    services: [
      "Machining Center Process",
      "CNC Lathe Process",
      "Precision Parts & Spare Parts",
      "Progressive Die Parts",
      "Jig / Fixture",
      "Machine Maker",
    ],
    machines: ["Machining Center 3 Axis", "CNC Lathe swiss type bar feeder", "Grinding Machine"],
  },
  jp: {
    nav: ["ホーム", "会社概要", "サービス", "製造機械", "製品", "お問い合わせ"],
    heroEyebrow: "P.TECH INTER PRECISION",
    heroTitle: "精密さで信頼を築く",
    heroSubtitle: "未来へ進む産業のための高精度金属部品メーカー。",
    aboutTitle: "会社概要",
    aboutText:
      "P.tech Inter Precision株式会社は、金型部品、治具、フィクスチャー、および電子・自動車業界向けのスペアパーツの高品質生産を目的に設立されました。鉄、アルミ、ステンレス、真鍮、銅、カーバイド、各種プラスチックなど幅広い材料を扱い、成形、穴あけ、旋盤加工、切削、研削、フライス加工、ねじ切りなどの工程を行っています。当社は品質管理、製造基準の徹底、納期厳守、信頼できるアフターサービスに注力しており、国内外の電子機器メーカー、自動車部品メーカー、電機メーカーなどの主要顧客に選ばれています。",
    servicesTitle: "サービス",
    machineryTitle: "製造機械",
    contactTitle: "お問い合わせ",
    phone: "電話",
    email: "メール",
    address: "住所",
    facebookText: "最新情報や製造ニュースはFacebookをご覧ください。",
    facebookButton: "Facebookページへ",
    productsTitle: "製品サンプル",
    productsIntro: "高精度金属部品と加工製品の一例をご紹介します。",
    cookieText: "快適なご利用のためにCookieを使用しています。",
    cookiePolicy: "Cookieポリシー",
    cookieAccept: "Cookieを許可",
    aboutButton: "会社概要",
    emailValue: "w.prawit@hotmail.com, p.tech-inter@live.com",
    addressValue: "タイ王国 パトゥムターニー県 クローンルワン郡 クローンヌン 117/239 Moo 18",
    services: [
      "マシニングセンタープロセス",
      "CNC旋盤プロセス",
      "精密部品とスペアパーツ",
      "プログレッシブダイ部品",
      "ジグ / 治具",
      "マシンメーカー",
    ],
    machines: ["マシニングセンター 3軸", "CNC旋盤 (スイス型 バーフィーダー)", "研削盤"],
  },
};

// รายการรูปและคำอธิบายรูปส่วนเครื่องจักร
const machinery = [
  { image: imageUrl("machining-center.jpg"), alt: "Machining Center 3 Axis" },
  { image: imageUrl("cnc-lathe.jpg"), alt: "CNC Lathe swiss type bar feeder" },
  { image: imageUrl("grinding-machine.jpg"), alt: "Grinding Machine" },
];

// รูปตัวอย่างสินค้าในหน้า Product.html
const productImages = [
  ...Array.from({ length: 9 }, (_, index) => imageUrl(`product${index + 1}.jpg`)),
  ...Array.from({ length: 7 }, (_, index) => imageUrl(`metal-shaft-bg${index + 4}.jpg`)),
];

function App() {
  const isProductsPage = window.location.pathname.toLowerCase().endsWith("product.html");
  const [language, setLanguage] = useState(() => localStorage.getItem("siteLang") || "th");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(() => localStorage.getItem("cookiesAccepted") !== "true");
  const [heroSlides, setHeroSlides] = useState({ current: 0, incoming: null, fading: false });
  const t = translations[language] || translations.th;

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = isProductsPage
      ? `${t.productsTitle} - P.tech Inter Precision Co., Ltd.`
      : "P.tech Inter Precision Co., Ltd.";
  }, [isProductsPage, language, t.productsTitle]);

  useEffect(() => {
    let currentIndex = 0;
    let fadeTimer;
    let fadeFrame;

    const slideTimer = window.setInterval(() => {
      const nextIndex = (currentIndex + 1) % 10;
      setHeroSlides({ current: currentIndex, incoming: nextIndex, fading: false });
      fadeFrame = window.requestAnimationFrame(() => {
        setHeroSlides({ current: currentIndex, incoming: nextIndex, fading: true });
      });
      fadeTimer = window.setTimeout(() => {
        currentIndex = nextIndex;
        setHeroSlides({ current: currentIndex, incoming: null, fading: false });
      }, 1400);
    }, 7000);

    return () => {
      window.clearInterval(slideTimer);
      window.clearTimeout(fadeTimer);
      window.cancelAnimationFrame(fadeFrame);
    };
  }, []);

  function changeLanguage(nextLanguage) {
    if (!translations[nextLanguage]) return;
    setLanguage(nextLanguage);
    localStorage.setItem("siteLang", nextLanguage);
  }

  function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    setCookieVisible(false);
  }

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <SiteHeader
        t={t}
        language={language}
        onLanguageChange={changeLanguage}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        isProductsPage={isProductsPage}
        onNavigate={() => setMenuOpen(false)}
      />
      {isProductsPage ? <ProductsPage t={t} /> : <HomePage t={t} heroSlides={heroSlides} />}
      <Footer />
      {cookieVisible && <CookieNotice t={t} onAccept={acceptCookies} isProductsPage={isProductsPage} />}
    </div>
  );
}

function SiteHeader({ t, language, onLanguageChange, menuOpen, onMenuToggle, isProductsPage, onNavigate }) {
  const anchor = (id) => (isProductsPage ? `index.html#${id}` : `#${id}`);

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-3 sm:px-8 lg:min-h-[78px]">
        <a href="index.html#home" className="flex items-center gap-3" aria-label="P.tech Inter Precision home">
          <img src={imageUrl("logo.png")} alt="P.tech Inter Precision logo" className="h-12 w-14 object-contain" />
          <span className="hidden text-sm font-semibold leading-tight text-slate-700 sm:block">
            P.tech Inter Precision
            <span className="mt-1 block text-[10px] font-normal text-slate-500">Precision Metal Parts</span>
          </span>
        </a>

        {/* ข้อมูลติดต่อด้านบน: แก้ข้อความ/เบอร์/อีเมลได้ใน props ด้านล่าง */}
        <div className="ml-auto hidden items-center gap-6 text-[11px] leading-[1.4] text-slate-500 lg:flex">
          <ContactTop icon="phone" title="Call us" detail="087 094 1501" href="tel:0870941501" />
          <ContactTop icon="pin" title="Head office" detail="117239,Moo.18,T.Klongneung,A.Klongluang,Province.Pathum Thani,Postcode 12120,Thailand" />
          <ContactTop icon="mail" title="Email us" detail="p.tech-inter@live.com" href="mailto:p.tech-inter@live.com" />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <select
            aria-label="Select language"
            value={language}
            onChange={(event) => onLanguageChange(event.target.value)}
            className="rounded border border-slate-200 bg-white px-2 py-2 text-xs text-slate-700"
          >
            <option value="th">ไทย</option>
            <option value="en">English</option>
            <option value="jp">日本語</option>
          </select>
          <button
            type="button"
            onClick={onMenuToggle}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded border border-slate-200 text-slate-700"
          >
            <span className="text-xl leading-none">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      <div className="border-y border-slate-100">
        {/* ปรับขนาดตัวอักษรเมนูที่ text-[16px] และระยะห่างเมนูที่ gap-20 */}
        <nav className={`mx-auto max-w-[1240px] items-center justify-center gap-20 px-5 py-3 text-[16px] font-medium uppercase tracking-wide text-slate-500 sm:px-8 lg:flex ${menuOpen ? "flex flex-col items-stretch gap-0 py-2" : "hidden"}`}>
          {t.nav.map((label, index) => {
            const hrefs = [anchor("home"), anchor("about"), anchor("services"), anchor("machinery"), "Product.html", anchor("contact")];
            return (
              <a
                key={label}
                href={hrefs[index]}
                onClick={onNavigate}
                className="relative block w-full border-b border-slate-100 py-3 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-sky-600 after:transition-all after:duration-300 hover:text-sky-700 hover:after:w-full focus-visible:text-sky-700 focus-visible:outline-none focus-visible:after:w-full lg:w-fit lg:border-0 lg:py-1"
              >
                {label}
              </a>
            );
          })}
          <label className="hidden items-center gap-2 lg:flex">
            <svg
              viewBox="0 0 60 30"
              role="img"
              aria-label={language === "th" ? "ธงชาติไทย" : language === "jp" ? "日本の国旗" : "United Kingdom flag"}
              className="h-5 w-7.5 rounded-[2px] shadow-sm"
            >
              {language === "th" ? (
                <>
                  <rect width="60" height="30" fill="#A51931" />
                  <path d="M0 6h60M0 24h60" stroke="#F4F4F4" strokeWidth="6" />
                  <path d="M0 11h60M0 19h60" stroke="#2D2A4A" strokeWidth="8" />
                </>
              ) : language === "jp" ? (
                <>
                  <rect width="60" height="30" fill="#fff" />
                  <circle cx="30" cy="15" r="8" fill="#BC002D" />
                </>
              ) : (
                <>
                  <rect width="60" height="30" fill="#012169" />
                  <path d="M0 0 60 30M60 0 0 30" stroke="#fff" strokeWidth="6" />
                  <path d="M0 0 60 30M60 0 0 30" stroke="#C8102E" strokeWidth="2.5" />
                  <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
                  <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
                </>
              )}
            </svg>
            <select
              aria-label="Select language"
              value={language}
              onChange={(event) => onLanguageChange(event.target.value)}
              className="cursor-pointer bg-transparent text-[16px] uppercase outline-none"
            >
              <option value="th">ไทย</option>
              <option value="en">English</option>
              <option value="jp">日本語</option>
            </select>
          </label>
        </nav>
      </div>
    </header>
  );
}

function ContactTop({ icon, title, detail, href }) {
  const iconShapes = {
    phone: <path d="M6.6 2.8 4.8 4.1c-.7.5-.9 1.5-.5 2.3a16.8 16.8 0 0 0 7.3 7.3c.8.4 1.8.2 2.3-.5l1.3-1.8-3-2-1.4 1.4a12 12 0 0 1-3.5-3.5l1.4-1.4-2.1-3.1Z" />,
    pin: <><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.3" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  };

  const content = (
    <span className="flex items-center gap-2.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-sky-300 text-sky-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4" aria-hidden="true">
          {iconShapes[icon]}
        </svg>
      </span>
      <span>
        <span className="block font-semibold text-slate-700">{title}</span>
        <span className="block">{detail}</span>
      </span>
    </span>
  );

  return href ? <a href={href} className="transition-colors hover:text-sky-700">{content}</a> : content;
}

function HomePage({ t, heroSlides }) {
  // รูป Hero เปลี่ยนอัตโนมัติจาก metal-shaft-bg1 ถึง metal-shaft-bg10 และค่อยๆ crossfade
  const heroImage = imageUrl(`metal-shaft-bg${heroSlides.current + 1}.jpg`);
  const incomingHeroImage = heroSlides.incoming === null
    ? null
    : imageUrl(`metal-shaft-bg${heroSlides.incoming + 1}.jpg`);

  return (
    <main>
      {/* ปรับความสูง Hero ได้ที่ min-h; เปลี่ยนตำแหน่งภาพด้วย bg-center */}
      <section
        id="home"
        className="relative flex min-h-[560px] items-center overflow-hidden bg-slate-800 text-white sm:min-h-[620px] lg:min-h-[calc(100vh-112px)]"
      >
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover object-center"
        />
        {incomingHeroImage && (
          <img
            src={incomingHeroImage}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 size-full object-cover object-center transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none ${heroSlides.fading ? "opacity-100" : "opacity-0"}`}
          />
        )}
        {/* ปรับความเข้ม overlay ได้ด้วยค่า opacity ใน from/via/to ด้านล่าง */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/40 to-slate-900/10" />
        <div className="relative mx-auto w-full max-w-[1240px] px-6 py-24 sm:px-10 lg:px-12">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold tracking-[0.28em] text-sky-300 sm:text-sm">{t.heroEyebrow}</p>
            {/* ข้อความหัวเรื่องแก้ใน translations; ขนาดฟอนต์ responsive ที่ text-4xl/sm:text-5xl/lg:text-6xl */}
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              {t.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/90 sm:text-xl">{t.heroSubtitle}</p>
            <a
              href="#about"
              className="mt-10 inline-flex items-center gap-8 bg-sky-700 px-7 py-4 text-xs font-semibold text-white transition-colors hover:bg-sky-600"
            >
              {t.aboutButton}
              <span aria-hidden="true" className="grid size-5 place-items-center rounded-full border border-white/80 text-sm leading-none">›</span>
            </a>
          </div>
        </div>
        <div className="absolute bottom-7 right-8 flex gap-2" aria-label="Hero image slides">
          {Array.from({ length: 10 }, (_, index) => (
            <span key={index} className={`h-1 transition-all ${heroSlides.current === index ? "w-7 bg-white" : "w-2 bg-white/50"}`} />
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:px-8 lg:py-24">
        <SectionHeading eyebrow="P.TECH INTER PRECISION" title={t.aboutTitle} />
        <p className="mx-auto mt-7 max-w-3xl text-center text-base leading-8 text-slate-600">{t.aboutText}</p>
      </section>

      <section id="services" className="scroll-mt-24 bg-slate-50 px-6 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="WHAT WE DO" title={t.servicesTitle} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.map((service, index) => (
              <div key={service} className="flex items-center gap-4 border border-slate-200 bg-white p-5">
                <span className="text-sm font-semibold text-sky-700">0{index + 1}</span>
                <span className="font-medium text-slate-700">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="machinery" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:px-8 lg:py-24">
        <SectionHeading eyebrow="OUR WORKSHOP" title={t.machineryTitle} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {machinery.map((machine, index) => (
            <article key={machine.image} className="group overflow-hidden border border-slate-200 bg-white">
              <img src={machine.image} alt={machine.alt} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <h3 className="p-5 font-semibold text-slate-700">{t.machines[index]}</h3>
            </article>
          ))}
        </div>
      </section>

      <ContactSection t={t} />
    </main>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="text-center">
      <p className="text-xs font-semibold tracking-[0.22em] text-sky-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl">{title}</h2>
      <span className="mx-auto mt-5 block h-1 w-12 bg-sky-700" />
    </div>
  );
}

function ContactSection({ t }) {
  return (
    <section id="contact" className="scroll-mt-24 bg-slate-900 px-6 py-16 text-white sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-300">GET IN TOUCH</p>
          <h2 className="mt-3 text-3xl font-semibold">{t.contactTitle}</h2>
          <p className="mt-2 text-sm text-slate-400">{t.facebookText}</p>
          <div className="mt-7 grid gap-5 text-sm text-slate-300 sm:grid-cols-2">
            <p><strong className="mb-1 block text-white">{t.phone}</strong><a href="tel:0870941501" className="hover:text-sky-300">087-094-1501</a></p>
            <p><strong className="mb-1 block text-white">{t.email}</strong>{t.emailValue}</p>
            <p className="sm:col-span-2"><strong className="mb-1 block text-white">{t.address}</strong>{t.addressValue}</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://www.facebook.com/share/1BrRnksKDu/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-3 bg-sky-700 px-6 py-4 text-sm font-semibold transition-colors hover:bg-sky-600"
          >
            <span aria-hidden="true">f</span>{t.facebookButton}
          </a>
          <img
            src={imageUrl("facebook-qrcode.png")}
            alt="Facebook QR Code"
            className="size-20 border-4 border-white bg-white object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function ProductsPage({ t }) {
  return (
    <main className="min-h-[70vh] bg-slate-50 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="P.TECH INTER PRECISION" title={t.productsTitle} />
        <p className="mt-5 text-center text-slate-600">{t.productsIntro}</p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {productImages.map((image, index) => (
            <figure key={image} className="overflow-hidden bg-white">
              <img
                src={image}
                alt={`${t.productsTitle} ${index + 1}`}
                className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}

function CookieNotice({ t, onAccept, isProductsPage }) {
  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-4 bg-black px-5 py-4 text-sm text-white shadow-[0_-6px_24px_rgba(0,0,0,0.2)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p>
        {t.cookieText}{" "}
        <a href={isProductsPage ? "index.html#contact" : "#contact"} className="ml-1 underline underline-offset-2 text-white/75 hover:text-white">{t.cookiePolicy}</a>
      </p>
      <button
        type="button"
        onClick={onAccept}
        className="shrink-0 bg-sky-600 px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-sky-500"
      >
        {t.cookieAccept}
      </button>
    </aside>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 px-5 py-6 text-center text-xs text-slate-400">
      © 2025 P.tech Inter Precision Co., Ltd. All rights reserved.
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);

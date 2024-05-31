import Script from 'next/script';

type Props = {
  pId: string;
};

const GooglePublisher: React.FC = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://news.google.com/swg/js/v1/swg-basic.js"
        async
      />
      <Script
        id="swg-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (self.SWG_BASIC = self.SWG_BASIC || []).push(basicSubscriptions => {
              basicSubscriptions.init({
                type: "NewsArticle",
                isPartOfType: ["Product"],
                isPartOfProductId: "CAowqoKyDA:openaccess",
                clientOptions: { theme: "light", lang: "en" },
              });
            });
          `,
        }}
      />
    </>
  );
};

export default GooglePublisher;

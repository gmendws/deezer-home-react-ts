import styled from 'styled-components';

const PartnersTopBanner = styled.div`
  margin-top: 70px;
  margin-left: 50px;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px 10px;
  color: white;
  width: 300px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PartnersTopBannerIcon = styled.img`
  width: 30px;
  margin-right: 20px;
  margin-bottom: 10px;
`;

const PartnersTopBannerText = styled.h3`
  font-size: 12px;
  font-weight: bold;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

export default function Partners() {
  return (
    <PartnersTopBanner>
      <PartnersTopBannerText>Ativar minha oferta de parceiro</PartnersTopBannerText>
      <div>
        <PartnersTopBannerIcon src="https://cdns-images.dzcdn.net/images/misc/50429221c36309acea8f58421bb89c29/48x0-none-90-1-1.png" alt="TIM" />
        <PartnersTopBannerIcon src="https://cdns-images.dzcdn.net/images/misc/ec8c2e36948b1809a47399275d268478/48x0-none-90-1-1.png" alt="Globoplay" />   
        <PartnersTopBannerIcon src="https://cdns-images.dzcdn.net/images/misc/8e71e281c9b2459d86737ef4242b2f22/48x0-none-90-1-1.png" alt="Mercado Livre" />
        <PartnersTopBannerIcon src="https://cdns-images.dzcdn.net/images/misc/46398d0af29e66695150600a29abe8b1/48x0-none-90-1-1.png" alt="Itaú" />
        <PartnersTopBannerIcon src="https://cdns-images.dzcdn.net/images/misc/99d9f5b434540c99fd0ee9ed024833cf/48x0-none-90-1-1.png" alt="Tim UltraFibra" />
      </div>
    </PartnersTopBanner>
  );
}

import React from 'react';
import Image from 'next/image';
import {Page, List} from 'components';
import sentryError from 'assets/images/sentry-error.png';

function Privacy() {
  return (
    <Page title='gizlilik politikası' className='overflow-x-auto'>
      <div className='w-full md:w-1/2 md:mx-auto px-4 text-center text-secondary'>
        <h1 className='mt-4 mb-1 text-2xl text-primary'>Gizlilik Politikası</h1>
        <p className='text-xs'>Son Güncelleme Mart 8, 2022</p>

        <h2 className='mt-4 text-[18px] text-primary'>1. Hangi Veriler Toplanıyor?</h2>
        <List.Container title='Otomatik gelen veriler' headerClassName='text-lg text-center' className='text-left'>
          <List.Item>IP adresi</List.Item>
          <List.Item>kullanılan tarayıcı ve tarayıcının versiyon numarası</List.Item>
          <List.Item>dil tercihi</List.Item>
          <List.Item>yönlendiren adres</List.Item>
          <List.Item>ülke</List.Item>
          <List.Item>kullanılan cihaz</List.Item>
          <List.Item>işletim sistemi</List.Item>
          <p className='my-1 text-sm'>
            Bu bilgiler sadece bir hata ile karşılaştığınızda alınır ve performans problemleri, arayüz hataları gibi sorunları çözmek için kullanılır.
            Bunların dışında aktiviteleriniz izlenmez veya log tutulmaz.
          </p>
        </List.Container>
        <Image src={sentryError} unoptimized/>
        <hr className='my-2 border-bgs'/>
        <List.Container title='Kullanıcı verileri' headerClassName='text-lg text-center' className='text-left'>
          <List.Item>E-posta adresi</List.Item>
        </List.Container>
        <hr className='my-2 border-bgs'/>

        <h2 className='mt-4 text-[18px] text-primary'>Bilgiler Başkalarıyla Paylaşılıyor Mı?</h2>
        <p className='mt-1 text-sm'>
          Hayır, bilgileriniz başkaları ile paylaşılmaz.
        </p>

        <h2 className='mt-4 text-[18px] text-primary'>Bilgiler Ne Kadar Süre Tutulur?</h2>
        <p className='mt-1 text-sm'>
          Otomatik olarak gelen veriler olarak 30 gün içerisinde silinir.
          E-posta adresiniz giriş yapabilmeniz için silinmez.
        </p>

        <h2 className='mt-4 text-[18px] text-primary'>Bilgiler Güvenle Saklanıyor Mu?</h2>
        <p className='mt-1 text-sm'>
          Her ne kadar internet ortamında hiçbir içeriğinin %100 güvenle saklanması mümkün olmasa da
          kitapbar.com, güvenli altyapısı aracılığıyla bilgilerinizi şifrelenmiş vaziyette tutar.
          Kayıt esnasında kitapbar.com sizin için bir şifre üretir ve bu şifreyi e-posta adresinize gönderdikten sonra siler.
          Sadece tekrar giriş yaptığınızda siz olduğunuzu anlar.
        </p>

        <h2 className='mt-4 text-[18px] text-primary'>Haklarım Neler?</h2>
        <p className='mt-1 text-sm'>
          kitapbar.com'un topladığı bilgiler değiştirmeniz gereken bilgiler değildir.
        </p>

        <h2 className='mt-4 text-[18px] text-primary'>İletişime Nasıl Geçebilirim?</h2>
        <p className='mt-1 text-sm'>
          Gizlilik politikası hakkında herhangi bir sorunuz varsa lütfen info@kitapbar.com adresinden iletişime geçiniz.
        </p>
        <div className='my-4 flex space-x-1 justify-center text-[10px]'>
          <span>Kitapbar</span>
          <span>İstanbul</span>
          <span>Türkiye</span>
        </div>
      </div>
    </Page>
  );
}

export default Privacy;

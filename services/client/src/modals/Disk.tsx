import React from 'react';
import Image from "next/image";
import CopyLink from "../assets/images/copylink.png";

function Disk() {
  return (
    <div className='w-[280px] md:w-[500px] p-3.5'>
      <div className='text-xs md:text-sm mb-4 mt-1'>
        Sizin oluşturduğunuz veya karşınıza çıkan yandexdisk linklerini taranması için bu sayfadan gönderebilirsiniz.
        <hr className='my-2 border-bgs'/>
        <Image src={CopyLink} quality={100} />

        Örnek yandexdisk adreslerini tablonun "URL" alanında görebilirsiniz.
        <hr className='my-2 border-bgs'/>

        <span className='text-primary'>kitapbar.com</span>, sisteminde kayıtlı depo linklerini periyodik olarak tarar ve kaldırılan kitapların indekslerini silerken eklenen
        kitapların indeklerini oluşturur. Bu bölümünde eklediğiniz disklerde meydana gelen güncellemeler periyodik taramalar esnasında işlenir.
        Çeşitli nedenlerle paylaşım bağlantıları artık çalışmayan linkler ve üzerinden indekslenen kitap bilgileri silinir.
      </div>
      <div className='ml-2 flex flex-col text-[8px] md:text-[11px] text-secondary'>
        <p>
          <span className='text-yellow-600 font-medium'>UYARI: </span>
          Büyük bir klasörün bağlantı linki, içerisindeki birkaç telifli içerik yüzünden kurbağa olabiliyor.
          LÜTFEN bağlantı linki oluşturduğunuz klasörlerin olabildiğince özel olmasına dikkat ediniz.
          <br/>
          Her şeyi "P" adında bir klasörün içine koyup paylaşmak yerine küçük klasörlere ayırıp ayrı ayrı paylaşın.
          Bu durum aynı zamanda eser sahiplerinin, eserlerini daha kolay bulmasını sağlar.
        </p>
        <p className='space-x-2'>
          <span className='text-red-600'>P ✘</span>
          <span>|</span>
          <span className='text-green-600'>Platon ✓</span>
          <span className='text-green-600'>Plotinus ✓</span>
          <span className='text-green-600'>Pisagor ✓</span>
        </p>
        <p className='mt-2'>
          <span className='text-blue-400 font-medium'>TAVSİYE: </span>
          Erişimi arttırmak için rastgele içerikleri kendi disklerinize ekleyebilirsiniz.
          İçeriğin bulunduğu ilk diskin bağlantısı kesilirse sizin oluşturduğunuz disk üzerinden indirme yapılabilir.
        </p>
      </div>
    </div>
  );
}

export default Disk;

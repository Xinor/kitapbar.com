import {List} from 'components';
import Image from 'next/image';
import virusTotalUrl from 'assets/images/virustotal-url.png';

function Security() {
  return (
    <div className='w-[300px] md:w-[600px] p-3.5'>
      <p className='text-xs md:text-sm my-4'>
        Kitapbar, Yandex'in içerik yüklenirken uyguladığı
        <a href='https://yandex.com/support/disk/security.html' target='_blank' rel='external' className='text-link mx-1'>antivirüs taraması</a>
        sonucu "temiz" olarak nitelediği içerikleri, açık kaynak
        <a href="https://www.clamav.net/" target='_blank' rel='external' className='text-link mx-1'>ClamAV antivirüs motoruyla</a>
        tekrar tarar ve sorunsuz içerikleri indeksler.
      </p>
      <p className='my-2 bg-bgs p-2 text-[10px] md:text-sm'>
        Yani içerikler hem Yandex hem de kitapbar.com tarafından taranır.
        Yok yetmez diyorsanız da aşağıdakileri okumanızda fayda var.
      </p>
      <List.Container title='Kullanıcılar olarak:' headerClassName='text-[12.6px] md:text-sm mb-2 font-bold'>
        <List.Item>İnternetten indirdiğiniz hiçbir içeriğe güvenmeyin.</List.Item>
        <List.Item className='mt-3 mb-2'>
          İndirdiğiniz kitapları
          <a href='https://www.virustotal.com/gui/home/url' target='_blank' rel='external' className='mx-1 text-link cursor-pointer'>virustotal.com</a>
          adresinden taratın.
        </List.Item>
        <div className='p-4'>
          <Image src={virusTotalUrl} />
        </div>
        <p className='mt-4 bg-bgs p-2 text-[10px] md:text-sm'>
          virustotal.com, kitapbar.com'un kullandığı <a href="https://www.clamav.net/" target='_blank' rel='external' className='text-link mx-1'>ClamAV antivirüs motorunun</a>
          da içinde bulunduğu 70'in üzerinde antivirüs servisini kullanarak içerikleri test eder. Tatlı bir hizmet ama kişisel dosyalarınız için kullanmayın.
        </p>
        <List.Item className='mt-4'>E-kitap okuduğunuz araç veya uygulamaları güncel tutun.</List.Item>
        <List.Item className='mt-2'>Android "reader" uygulamalarını sadece google market üzerinden indirin.</List.Item>
        <List.Item className='my-2'>Masaüstü "reader" uygulamalarınızın açık kaynak olduğuna emin olun.</List.Item>
      </List.Container>
    </div>
  );
}

export default Security;

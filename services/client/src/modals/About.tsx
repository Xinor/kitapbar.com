import {
  EmailShareButton, EmailIcon,
  FacebookShareButton, FacebookIcon,
  InstapaperShareButton, InstapaperIcon,
  LinkedinShareButton, LinkedinIcon,
  PinterestShareButton, PinterestIcon,
  RedditShareButton, RedditIcon,
  TelegramShareButton, TelegramIcon,
  TumblrShareButton, TumblrIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon
} from "react-share";
import {List} from 'components';

const shareUrl = 'https://kitapbar.com';

function About() {
  return (
    <div className='w-[280px] md:w-[520px] space-y-4 p-3.5'>
      <List.Container title='Kitapbar:' headerClassName='text-[12.6px] md:text-base mb-2 font-bold'>
        <List.Item>Reklam içermez.</List.Item>
        <List.Item>Çeres vs. tutmaz 🥷.</List.Item>
        <List.Item>Onlarca aptal link arasında gezdirmez.</List.Item>
        <List.Item>Günde on kitap okumuyorsanız bir sınır koymaz.</List.Item>
      </List.Container>
      <hr className='my-2 border-bgs'/>

      <p className='text-xs md:text-sm text-center'>
        Keyifli okumalar..
      </p>
      <p className='text-xs md:text-sm text-center'>
        paylaşmayı unutmayın 🐬
      </p>
      <div className='flex flex-wrap justify-center px-4'>
        <EmailShareButton url={shareUrl}>
          <EmailIcon size={30} />
        </EmailShareButton>
        <FacebookShareButton url={shareUrl} hashtag='#kitapbar.com'>
          <FacebookIcon size={30}/>
        </FacebookShareButton>
        <InstapaperShareButton url={shareUrl}>
          <InstapaperIcon size={30}/>
        </InstapaperShareButton>
        <LinkedinShareButton url={shareUrl} source='kitapbar.com'>
          <LinkedinIcon size={30}/>
        </LinkedinShareButton>
        <PinterestShareButton url={shareUrl} media='https://kitapbar.com/eksikitap.png'>
          <PinterestIcon size={30}/>
        </PinterestShareButton>
        <RedditShareButton url={shareUrl}>
          <RedditIcon size={30}/>
        </RedditShareButton>
        <TelegramShareButton url={shareUrl}>
          <TelegramIcon size={30}/>
        </TelegramShareButton>
        <TumblrShareButton url={shareUrl}>
          <TumblrIcon size={30}/>
        </TumblrShareButton>
        <TwitterShareButton url={shareUrl} hashtags={['kitapbar']}>
          <TwitterIcon size={30}/>
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={30}/>
        </WhatsappShareButton>
      </div>
    </div>
  )
}

export default About;

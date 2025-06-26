import backgroundImage from '../assets/background.svg';
import Image from 'next/image';

function BackgroundImage() {
    return (  
        <>
        <div className='absolute z-[-1] w-[90vw] h-[270px] left-[50%] -translate-x-[50%] top-[1rem] rounded-3xl overflow-hidden'>
        <Image
          className='w-full h-full object-cover'
          src={backgroundImage}
          alt="Background image"
        />
      </div>
        </>
    );
}

export default BackgroundImage;
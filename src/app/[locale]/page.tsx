import Image from 'next/image';
import ComingSoon from '@/assets/comingsoon.png';

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  } as React.CSSProperties,
};

export default function Page() {
  return (
    <div style={styles.container}>
      <Image src={ComingSoon} alt="Coming Soon" layout="fill" objectFit="cover" quality={100} />
    </div>
  );
}

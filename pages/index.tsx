import Head from 'next/head';
import FileUpload from '../components/FileUpload';
import styles from '../styles/Home.module.css';
import useUploadImage from '../hooks/useUploadImage';

export default function Home() {
  const uploadImage = useUploadImage();

  async function handleFileUpload(files: FileList) {
    const file = files[0];
    await uploadImage(file);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Tiny URL</h1>
        <FileUpload onChange={handleFileUpload} />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://codejam.ninja"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright 2020 &#169; Jam Risser
        </a>
      </footer>
    </div>
  );
}

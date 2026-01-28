import { useState, useEffect } from 'react';
import AudioPlayer from './components/AudioPlayer';
import Hero from './components/Hero';
import EventInfo from './components/EventInfo';
import Description from './components/Description';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import Loader from './components/Loader';
import './styles.css';

function App() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 1800); // 1.8 segundos

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Loader />
            {showContent && (
                <div className="container">
                    <AudioPlayer />
                    <Hero />
                    <main>
                        <EventInfo />
                        <Description />
                        <RegistrationForm />
                    </main>
                    <Footer />
                </div>
            )}
        </>
    );
}

export default App;

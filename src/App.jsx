import AudioPlayer from './components/AudioPlayer';
import Hero from './components/Hero';
import EventInfo from './components/EventInfo';
import Description from './components/Description';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import './styles.css';

function App() {
    return (
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
    );
}

export default App;

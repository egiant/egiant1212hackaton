import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

// import Home from './panels/Home';
// import Persik from './panels/Persik';

import Info from "./components/info"
import Form from "./components/form"
import Weather from "./components/weather"

const KEY = "e45b4f1021dbdc535d662231550c93af";

class App extends React.Component {

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: undefined
    }

    gettingWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        
        if(city) {
            const api_url = await
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},ru&appid=${KEY}&units=metric
        `);
            const data = await api_url.json();

            var sunset = data.sys.sunset;
            var date = new Date();
            date.setTime(sunset);
            var sunset_Date = date.getHours() + ":" + date.getMinutes();

            this.setState({
                temp: data.main.temp,
                city: data.name,
                country: data.sys.country,
                pressure: data.main.pressure,
                sunset: sunset_Date,
                error: undefined
            });
        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                pressure: undefined,
                sunset: undefined,
                error: "Введите название города"
            });
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div>Hello</div>
                <Info />
                <Form weatherMethod={this.gettingWeather} />
                <Weather 
                    temp={this.state.temp}
                    city={this.state.city}
                    country={this.state.country}
                    pressure={this.state.pressure}
                    sunset={this.state.sunset}
                    error={this.state.error}
                />
            </div>
        );
    }
}

export default App;
// const App = () => {
// 	const [activePanel, setActivePanel] = useState('home');
// 	const [fetchedUser, setUser] = useState(null);
// 	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

// 	useEffect(() => {
// 		bridge.subscribe(({ detail: { type, data }}) => {
// 			if (type === 'VKWebAppUpdateConfig') {
// 				const schemeAttribute = document.createAttribute('scheme');
// 				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
// 				document.body.attributes.setNamedItem(schemeAttribute);
// 			}
// 		});
// 		async function fetchData() {
// 			const user = await bridge.send('VKWebAppGetUserInfo');
// 			setUser(user);
// 			setPopout(null);
// 		}
// 		fetchData();
// 	}, []);

// 	const go = e => {
// 		setActivePanel(e.currentTarget.dataset.to);
// 	};

// 	return (
// 		<View activePanel={activePanel} popout={popout}>
// 			<Home id='home' fetchedUser={fetchedUser} go={go} />
// 			<Persik id='persik' go={go} />
// 		</View>
// 	);
// }

// export default App;


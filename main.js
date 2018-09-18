
getData();
fetchWeather();

function getData() {
    fetch("https://api.myjson.com/bins/13e8ns")
        .then(response => response.json())
        .then(json => {
            data = json;
            console.log(data);
            fillApp(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function fetchWeather() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Chicago&APPID=5361fa32475cefee51d0dc487bd65987")
        .then(response => response.json())
        .then(json => {
            data = json;
            console.log(data);
            displayWeather(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

Vue.component("versus", {
    template: "<p class='versus'>VS</p>"
});

//Number of characters to pass: 220

function fillApp(data) {
    new Vue({
        el: "#app",
        created: function () {
            this.data = data;
            this.setPageTitle();
        },
        data: {
            data: [],
            page_title: "",
            home_page: true,
            news_page: false,
            schedule_page: false,
            results_page: false,
            standings_page: false,
            chat_page: false,
            settings_page: false
        },
        methods: {
            setPageTitle: function (page) {
                switch (page) {
                    case "home":
                        this.home_page = true;
                        this.news_page = false;
                        this.schedule_page = false;
                        this.results_page = false;
                        this.standings_page = false;
                        this.chat_page = false;
                        this.settings_page = false;
                        break;
                    case "news":
                        this.home_page = false;
                        this.news_page = true;
                        this.schedule_page = false;
                        this.results_page = false;
                        this.standings_page = false;
                        this.chat_page = false;
                        this.settings_page = false;
                        break;
                    case "schedule":
                        this.home_page = false;
                        this.news_page = false;
                        this.schedule_page = true;
                        this.results_page = false;
                        this.standings_page = false;
                        this.chat_page = false;
                        this.settings_page = false;
                        break;
                    case "results":
                        this.home_page = false;
                        this.news_page = false;
                        this.schedule_page = false;
                        this.results_page = true;
                        this.standings_page = false;
                        this.chat_page = false;
                        this.settings_page = false;
                        break;
                    case "standings":
                        this.home_page = false;
                        this.news_page = false;
                        this.schedule_page = false;
                        this.results_page = false;
                        this.standings_page = true;
                        this.chat_page = false;
                        this.settings_page = false;
                        break;
                    case "chat":
                        this.home_page = false;
                        this.news_page = false;
                        this.schedule_page = false;
                        this.results_page = false;
                        this.standings_page = false;
                        this.chat_page = true;
                        this.settings_page = false;
                        break;
                    case "settings":
                        this.home_page = false;
                        this.news_page = false;
                        this.schedule_page = false;
                        this.results_page = false;
                        this.standings_page = false;
                        this.chat_page = false;
                        this.settings_page = true;
                        break;
                }

                if (this.home_page) this.page_title = "Home";
                else if (this.news_page) this.page_title = "News";
                else if (this.schedule_page) this.page_title = "Game Schedule";
                else if (this.results_page) this.page_title = "Game Results";
                else if (this.standings_page) this.page_title = "Standings";
                else if (this.chat_page) this.page_title = "Chat";
                else if (this.settings_page) this.page_title = "Settings";
            }
        }
    });
}

function displayWeather(data) {
    new Vue({
        el: "#weather",
        created: function () {
            this.weather = data;
            this.weather_icon = "images/weather_icons/" + data.list[0].weather[0].icon + ".png";
        },
        data: {
            weather: [],
            weather_icon: ""
        },
        methods: {
            getTemperature: function () {
                var temp = this.weather.list[0].main.temp * 9 / 5 - 457.87;
                return temp.toFixed(1) + "&degF";
            }
        }
    });
}

var string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac elementum mauris, eu faucibus risus. Sed condimentum varius magna quis aliquam. Proin ut nunc finibus, eleifend nulla at, tempor lacus. Maecenas eu diam"


console.log(string.length);
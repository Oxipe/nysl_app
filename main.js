
getData();
fetchWeather();

function getData() {
    fetch("https://api.myjson.com/bins/ja8p0")
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
   var app = new Vue({
        el: "#app",
        created: function () {
            this.data = data;
            this.setPageTitle();
            this.setUpcommingMatch();

        },
        data: {
            data: [],
            upcommingMatch: [],
            page_title: "",
            match_one_home: "",
            match_one_away: "",
            match_two_home: "images/team_logos/san_francisco_shock.png",
            match_two_away: "images/team_logos/los_angeles_valiant.png",
            nextPlayDate: "",
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
            },
            wrapNews: function (article) {
                var isDone = false
                var arrayOfWords = article.split(" ");
                var tempArray = [];

                var count = 0;

                while (!isDone) {
                    for (var i = 0; i < arrayOfWords.length; i++) {

                        if ((count + arrayOfWords[i].length) < 220) {
                            count += arrayOfWords[i].length + 1;
                            tempArray.push(arrayOfWords[i])
                        } else {
                            isDone = true;
                            break;
                        }
                    }
                }

                return result = tempArray.join(" ") + "...";

            },
            setUpcommingMatch: function () {
                var date = new Date();
                var currentDate = getMonth(date.getMonth()) + " " + date.getDate();

                var position = 0;

                for (var i = 0; i < this.data.schedule.September.length; i++) {
                    if (currentDate < this.data.schedule.September[i].date) {
                        this.nextPlayDate = this.data.schedule.September[i].date;
                        position = i - 1;

                        
                        for (var j = i; j < this.data.schedule.September.length; j++) {
                            if (this.nextPlayDate === this.data.schedule.September[j].date) {
                                var homeTeam = this.data.schedule.September[j].home_party;
                                var awayTeam = this.data.schedule.September[j].away_party;
                                var homeName;
                                var awayName;
                                var homeLogo;
                                var awayLogo;


                                console.log(homeTeam)
                                console.log(awayTeam)

                                for (var k = 0; k < this.data.team.length; k++) {
                                    if (homeTeam === this.data.team[k].team_code) {
                                        homeName = this.data.team[k].team_name;
                                        homeLogo = this.data.team[k].logo;
                                    }
                                }

                                for (var l = 0; l < this.data.team.length; l++) {
                                    if (awayTeam === this.data.team[l].team_code) {
                                        awayName = this.data.team[l].team_name;
                                        awayLogo = this.data.team[l].logo;
                                    }
                                }

                                var match = new this.CreateMatch(homeName, awayName, homeLogo, awayLogo);

                                this.upcommingMatch.push(match);
                            }
                        }
                        
                        break;
                    }
                }
                

                console.log(this.upcommingMatch)
                

                console.log("current date: " + currentDate);
                console.log(getMonth(date.getMonth()) === this.data.schedule.September)


                console.log(currentDate > this.data.schedule.September[0].date);
                console.log(currentDate + " " + this.data.schedule.September[0].date);
            },
            CreateMatch: function (homeName, awayName, homeLogo, awayLogo) {
                console.log("creating match")
                this.homeName = homeName;
                this.awayName = awayName;
                this.homeLogo = homeLogo;
                this.awayLogo = awayLogo;
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


function getMonth(value) {
    switch (value) {
        case 0: return "Januari";
        case 1: return "Februari";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
    }
}


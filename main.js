
getData();
fetchWeather();

function getData() {
    fetch("https://api.myjson.com/bins/1d1pzw")
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

Vue.component("divider", {
    template: "<div class='divider'></div>"
});

function fillApp(data) {
   var app = new Vue({
        el: "#app",
        created: function () {
            this.data = data;
            this.setPageTitle();
            this.setUpcommingMatch();
            this.month = new Date().getMonth();
        },
        data: {
            data: [],
            upcommingMatch: [],
            full_schedule: [],
            teamDetails: [],
            months: ["Januari", "Februari", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            page_title: "",
            news_title: "",
            news_article: "",
            nextPlayDate: "",
            matchHomeLogo: "",
            matchAwayLogo: "",
            matchLocation: "",
            matchField: "",
            matchTime: "",
            matchReferee: "",
            month: 0,
            currentPosition: 0,
            selectedMonth: "",
            home_page: true,
            news_page: false,
            full_news: false,
            schedule_page: false,
            detailed_match: false,
            results_page: false,
            standings_page: false,
            team_details: false,
            chat_page: false,
            settings_page: false
        },
        methods: {
            setPageTitle: function (page) {
                switch (page) {
                    case "home":
                        this.home_page = true;
                        this.news_page = false;
                        this.full_news = false;
                        this.schedule_page = false;
                        this.detailed_match = false;
                        this.results_page = false;
                        this.standings_page = false;
                        this.team_details = false;
                        this.chat_page = false;
                        this.settings_page = false;

                        this.setUpcommingMatch();
                        break;
                    case "news":
                        this.home_page = false;
                        this.news_page = true;
                        this.full_news = false;
                        this.schedule_page = false;
                        this.detailed_match = false;
                        this.results_page = false;
                        this.standings_page = false;
                        this.team_details = false;
                        this.chat_page = false;
                        this.settings_page = false;
                        break;
                    case "schedule":
                        this.home_page = false;
                        this.news_page = false;
                        this.full_news = false;
                        this.schedule_page = true;
                        this.detailed_match = false;
                        this.results_page = false;
                        this.standings_page = false;
                        this.team_details = false;
                        this.chat_page = false;
                        this.settings_page = false;

                        this.showSelectedMonth();
                        this.createFullSchedule();
                        break;
                    case "results":
                        this.home_page = false;
                        this.news_page = false;
                        this.full_news = false;
                        this.schedule_page = false;
                        this.detailed_match = false;
                        this.results_page = true;
                        this.standings_page = false;
                        this.team_details = false;
                        this.chat_page = false;
                        this.settings_page = false;
                        break;
                    case "standings":
                        this.home_page = false;
                        this.news_page = false;
                        this.full_news = false;
                        this.schedule_page = false;
                        this.detailed_match = false;
                        this.results_page = false;
                        this.standings_page = true;
                        this.team_details = false;
                        this.chat_page = false;
                        this.settings_page = false;
                        break;
                    case "chat":
                        this.home_page = false;
                        this.news_page = false;
                        this.full_news = false;
                        this.schedule_page = false;
                        this.detailed_match = false;
                        this.results_page = false;
                        this.standings_page = false;
                        this.team_details = false;
                        this.chat_page = true;
                        this.settings_page = false;
                        break;
                    case "settings":
                        this.home_page = false;
                        this.news_page = false;
                        this.full_news = false;
                        this.schedule_page = false;
                        this.detailed_match = false;
                        this.results_page = false;
                        this.standings_page = false;
                        this.team_details = false;
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
                var isDone = false;
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
            showSelectedMonth: function () {
                console.log(this.month)

                this.selectedMonth = this.months[this.month];

                console.log(this.selectedMonth)

            },
            previousMonth: function () {
                if (this.month > 0) {
                    this.month--;
                    this.selectedMonth = this.months[this.month];
                } 
            },
            nextMonth: function () {
                if (this.month < 11) {
                    this.month++;
                    this.selectedMonth = this.months[this.month];
                } 
            },
            setUpcommingMatch: function () {
                this.upcommingMatch = [];

                var date = new Date();
                var currentDate = getMonth(date.getMonth()) + " " + date.getDate();

                for (var i = 0; i < this.data.schedule.September.length; i++) {
                    if (currentDate < this.data.schedule.September[i].date) {
                        this.nextPlayDate = this.data.schedule.September[i].date;
                        
                        for (var j = i; j < this.data.schedule.September.length; j++) {
                            if (this.nextPlayDate === this.data.schedule.September[j].date) {
                                var homeTeam = this.data.schedule.September[j].home_party;
                                var awayTeam = this.data.schedule.September[j].away_party;
                                var homeName;
                                var awayName;
                                var homeLogo;
                                var awayLogo;
                                var match;

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

                                this.schedule_page ? match = new this.CreateMatch(homeName, awayName, homeLogo, awayLogo, homeTeam, awayTeam) : match = new this.CreateMatch(homeName, awayName, homeLogo, awayLogo);

                                this.upcommingMatch.push(match);
                            }
                        }
                        break;
                    }
                }
            },
            createFullSchedule: function () {
                this.upcommingMatch = [];

                var date = new Date();
                var currentDate = getMonth(date.getMonth()) + " " + date.getDate();

                for (var i = 0; i < this.data.schedule.September.length; i++) {
                    if ("September 01" < this.data.schedule.September[i].date) {
                        this.nextPlayDate = this.data.schedule.September[i].date;

                        for (var j = i; j < this.data.schedule.September.length; j++) {
                            var homeTeam = this.data.schedule.September[j].home_party;
                            var awayTeam = this.data.schedule.September[j].away_party;
                            var homeName;
                            var awayName;
                            var homeLogo;
                            var awayLogo;

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

                            var match = new this.CreateMatch(homeName, awayName, homeLogo, awayLogo, homeTeam, awayTeam);

                            this.upcommingMatch.push(match);
                        }
                        break;
                    }
                }
            },
            CreateMatch: function (homeName, awayName, homeLogo, awayLogo, homeCode, awayCode) {
                this.homeName = homeName;
                this.awayName = awayName;
                this.homeLogo = homeLogo;
                this.awayLogo = awayLogo;
                this.homeCode = homeCode;
                this.awayCode = awayCode;
            },
            showMatchDetails: function (value) {
                var match = this.upcommingMatch[value];
                this.home_page = false;
                this.schedule_page = false;
                this.detailed_match = true;

                console.log(this.upcommingMatch);
                console.log(this.upcommingMatch[value].homeName);

                this.page_title = match.homeCode + " - " + match.awayCode;
                this.nextPlayDate = match.date;

                this.matchHomeLogo = match.homeLogo;
                this.matchAwayLogo = match.awayLogo;

                this.matchLocation = match.location;
                this.matchField = match.field;
                this.matchTime = match.time;
                this.matchReferee = match.referee;

                console.log(match)

                console.log(this.matchLocation = match.location);
                console.log(this.matchField = match.field);
                console.log(this.matchTime = match.time);
                console.log(this.matchReferee = match.referee);
            },
            showNews: function (value) {
                this.home_page = false;
                this.news_page = false;
                this.full_news = true;
                this.page_title = "News";

                this.news_title = this.data.news[value].title;
                this.news_article = this.data.news[value].article;
            },
            getHomeLogo: function (teamCode) {
                for (var i = 0; i < this.data.team.length; i++) {
                    if (teamCode === this.data.team[i].team_code) 
                        return this.data.team[i].logo;
                }
            },
            getAwayLogo: function (teamCode) {
                for (var i = 0; i < this.data.team.length; i++) {
                    if (teamCode === this.data.team[i].team_code)
                        return this.data.team[i].logo;
                }
            },
            showTeamDetails: function (value) {
                this.standings_page = false;
                this.team_details = true;

                this.page_title = data.team[value].team_name;

                this.teamDetails = data.team[value];
                this.currentPosition = value + 1;

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

function toggle() {
    console.log("toggling")
    $("#toggle").slideToggle();
}


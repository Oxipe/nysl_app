
getData();
fetchWeather();

function getData() {
    fetch("https://api.myjson.com/bins/1fw2es")
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
            this.removeLoadingIcon();
        },
        data: {
            data: [],
            upcommingMatch: [],
            full_schedule: [],
            teamDetails: [],
            arrayGoBack: ["home"],
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
            isLoaded: false,
            home_page: true,
            news_page: false,
            full_news: false,
            schedule_page: false,
            detailed_match: false,
            results_page: false,
            standings_page: false,
            team_details: false,
            chat_page: false,
            settings_page: false,
            goingBack: true
        },
        methods: {
            setPageTitle: function (page, value) {

                if (!this.goingBack) {
                    this.arrayGoBack.push(page);

                    console.log(this.arrayGoBack)
                }

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

                        this.selectedMonth = this.months[this.month];
                        this.createFullSchedule(this.selectedMonth);
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
                    case "detailNews":
                        this.showNews(value)
                        break;
                }

                if (this.home_page) this.page_title = "Home";
                else if (this.news_page) this.page_title = "News";
                else if (this.schedule_page) this.page_title = "Game Schedule";
                else if (this.results_page) this.page_title = "Game Results";
                else if (this.standings_page) this.page_title = "Standings";
                else if (this.chat_page) this.page_title = "Chat";
                else if (this.settings_page) this.page_title = "Settings";

                this.goingBack = false;
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
                var currentDate

                var date = new Date();
                date.getMonth() < 10 ? currentDate = "0" + (date.getMonth() + 1) + "/" + date.getDate() : (date.getMonth() + 1) + "/" + date.getDate();

                console.log(currentDate)
                console.log(this.data.schedule.september[0].date)

                for (var i = 0; i < this.data.schedule.september.length; i++) {
                    if (currentDate < this.data.schedule.september[i].date) {
                        this.nextPlayDate = this.data.schedule.september[i].date;
                        
                        for (var j = i; j < this.data.schedule.september.length; j++) {
                            if (this.nextPlayDate === this.data.schedule.september[j].date) {
                                var homeTeam = this.data.schedule.september[j].home_party;
                                var awayTeam = this.data.schedule.september[j].away_party;
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
            createFullSchedule: function (month) {
                console.log("RE-CREATE THE JSON DATA TO DISPLAY DYNAMIC MONTHS AND SET CONDITION TO CHECK FOR 09/09")

                this.upcommingMatch = [];

                var data;

                var date = new Date();

                switch (month) {
                    case "Januari": data = this.data.schedule.januari;
                        break;
                    case "Februari": data = this.data.schedule.februari;
                        break;
                    case "March": data = this.data.schedule.march;
                        break;
                    case "April": data = this.data.schedule.april;
                        break;
                    case "May": data = this.data.schedule.may;
                        break;
                    case "June": data = this.data.schedule.june;
                        break;
                    case "July": data = this.data.schedule.july;
                        break;
                    case "August": data = this.data.schedule.august;
                        break;
                    case "September": data = this.data.schedule.september;
                        break;
                    case "October": data = this.data.schedule.october;
                        break;
                    case "November": data = this.data.schedule.november;
                        break;
                    case "December": data = this.data.schedule.december;
                        break;
                }

                date.getMonth() < 10 ? currentDate = "0" + (date.getMonth() + 1) + "/" + date.getDate() : (date.getMonth() + 1) + "/" + date.getDate();
                console.log(data)

                if (data !== undefined) {
                    for (var i = 0; i < data.length; i++) {
                        if (currentDate < data[i].date) {
                            this.nextPlayDate = data[i].date;

                            for (var j = i; j < data.length; j++) {
                                var homeTeam = data[j].home_party;
                                var awayTeam = data[j].away_party;
                                var homeName;
                                var awayName;
                                var homeLogo;
                                var awayLogo;
                                var location = data[j].location;
                                var field = data[j].field;
                                var time = data[j].game_time;
                                var referee = data[j].referee;

                                console.log(data)
                                console.log(location)

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

                                var match = new this.CreateMatch(homeName, awayName, homeLogo, awayLogo, homeTeam, awayTeam, location, field, time, referee);

                                this.upcommingMatch.push(match);
                            }
                            break;
                        }
                    }
                }
                

                console.log(this.upcommingMatch)

            },
            CreateMatch: function (homeName, awayName, homeLogo, awayLogo, homeCode, awayCode, location, field, time, referee) {
                this.homeName = homeName;
                this.awayName = awayName;
                this.homeLogo = homeLogo;
                this.awayLogo = awayLogo;
                this.homeCode = homeCode;
                this.awayCode = awayCode;
                this.location = location;
                this.field = field;
                this.time = time;
                this.referee = referee;
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
            },
            goBack: function () {
                this.goingBack = true;
                this.arrayGoBack.pop();

                this.setPageTitle(this.arrayGoBack[this.arrayGoBack.length - 1]);

            },
            removeLoadingIcon: function () {
                this.isLoaded = true;
                document.getElementById("loadingWrapper").style.visibility = "hidden";
                document.getElementById("subHeader").style.visibility = "visible";
                document.getElementById("content").style.visibility = "visible";
                //document.getElementById("mainContainer").style.visibility = "visible";
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

/*
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
*/
function toggle() {
    $("#toggle").slideToggle();
}

function removeLoadingIcon() {


}
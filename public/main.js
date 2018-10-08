getData();
fetchWeather();

function getData() {
    fetch("https://api.myjson.com/bins/1fw2es")
        .then(response => response.json())
        .then(json => {
            data = json;
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

Vue.component("message", {
    template: "<div class='notification is - info'>" +
        "<p class= 'name' > ${ posts[key].name }:</p>" +
        "<p class='post'>${posts[key].body}</p>" +
        "</div>"
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
           firebase.auth().signOut();
       },
        data: {
            data: [],
            upcommingMatch: [],
            full_schedule: [],
            teamDetails: [],
            arrayGoBack: [{"page": "home"}],
            months: ["Januari", "Februari", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            page_title: "",
            news_title: "",
            news_article: "",
            nextPlayDate: "",
            matchHomeLogo: "",
            matchAwayLogo: "",
            matchHomeCode: "",
            matchAwayCode: "",
            matchLocation: "",
            matchField: "",
            matchTime: "",
            matchReferee: "",
            matchMapLocation: "",
            currentUser: "",
            posts: {},
            month: 0,
            currentPosition: 0,
            selectedMonth: "",
            isLoaded: false,
            isLoggedIn: false,
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
                    var back = new this.Back(page, value);

                    this.arrayGoBack.push(back);
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
                        this.team_details = false;

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
                        this.team_details = false;
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
                        this.team_details = false;

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
                        this.team_details = false;
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
                        this.team_details = false;
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
                        this.team_details = false;
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
                        this.team_details = false;
                        break;
                    case "detailNews":
                        this.home_page = false;
                        this.news_page = false;
                        this.full_news = true;
                        this.schedule_page = false;
                        this.detailed_match = false;
                        this.results_page = false;
                        this.standings_page = false;
                        this.team_details = false;
                        this.chat_page = false;
                        this.settings_page = false;
                        this.team_details = false;

                        this.showNews(value);
                        break;
                    case "detailMatch":
                        this.home_page = false;
                        this.news_page = false;
                        this.full_news = false;
                        this.schedule_page = false;
                        this.detailed_match = true;
                        this.results_page = false;
                        this.standings_page = false;
                        this.team_details = false;
                        this.chat_page = false;
                        this.settings_page = false;
                        this.team_details = false;

                        this.showMatchDetails(value);
                        break;
                    case "team_details":
                        this.home_page = false;
                        this.news_page = false;
                        this.full_news = false;
                        this.schedule_page = false;
                        this.detailed_match = true;
                        this.results_page = false;
                        this.standings_page = false;
                        this.team_details = false;
                        this.chat_page = false;
                        this.settings_page = false;
                        this.team_details = true;

                        this.showTeamDetails(value);
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
            Back: function (page, value) {
                this.page = page;
                if (value !== undefined) this.value = value;
            },
            wrapNews: function (article) {
                var isDone = false;
                var arrayOfWords = article.split(" ");
                var tempArray = [];

                var count = 0;

                while (!isDone) {
                    for (var i = 0; i < arrayOfWords.length; i++) {

                        if (count + arrayOfWords[i].length < 220) {
                            count += arrayOfWords[i].length + 1;
                            tempArray.push(arrayOfWords[i]);
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
                var currentDate;

                

                var date = new Date();
                date.getMonth() < 10 ? currentDate = "0" + (date.getMonth() + 1) + "/" + date.getDate() : date.getMonth() + 1 + "/" + date.getDate();

                var data = this.selectDataSet(this.months[date.getMonth()]);
                for (var i = 0; i < data.length; i++) {
                    if (currentDate < data[i].date) {
                        this.nextPlayDate = data[i].date;
                        
                        for (var j = i; j < data.length; j++) {
                            if (this.nextPlayDate === data[j].date) {
                                var homeTeam = data[j].home_party;
                                var awayTeam = data[j].away_party;
                                var homeName;
                                var awayName;
                                var homeLogo;
                                var awayLogo;
                                var match;
                                var location = data[j].location;
                                var field = data[j].field;
                                var time = data[j].game_time;
                                var referee = data[j].referee;

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

                                match = new this.CreateMatch(homeName, awayName, homeLogo, awayLogo, homeTeam, awayTeam, location, field, time, referee);

                                this.upcommingMatch.push(match);
                            }
                        }
                        break;
                    }
                }
            },
            createFullSchedule: function (month) {
                this.upcommingMatch = [];

                var data = this.selectDataSet(month);

                var date = new Date();

                date.getMonth() < 10 ? currentDate = "0" + (date.getMonth() + 1) + "/" + date.getDate() : date.getMonth() + 1 + "/" + date.getDate();
                
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

                this.page_title = match.homeCode + " - " + match.awayCode;
                this.nextPlayDate = match.date;

                this.matchHomeLogo = match.homeLogo;
                this.matchAwayLogo = match.awayLogo;
                this.matchHomeCode = match.homeCode;
                this.matchAwayCode = match.awayCode;

                this.matchLocation = match.location;
                this.matchField = match.field;
                this.matchTime = match.time;
                this.matchReferee = match.referee;


                for (var i = 0; i < data.locations.length; i++) {
                    if (data.locations[i].name === match.location) this.matchMapLocation = data.locations[i].map;
                }
            },
            showNews: function (value) {
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
                this.detailed_match = false;
                this.standings_page = false;
                this.team_details = true;

                if (isNaN(value)) {
                    for (var i = 0; i < this.data.team.length; i++) {
                        if (value === this.data.team[i].team_code) value = i;
                    }
                }

                this.page_title = data.team[value].team_name;

                this.teamDetails = data.team[value];
                this.currentPosition = value + 1;
            },
            goBack: function () {
                this.goingBack = true;
                if (this.arrayGoBack.length !== 0) this.arrayGoBack.pop();

                this.setPageTitle(this.arrayGoBack[this.arrayGoBack.length - 1].page, this.arrayGoBack[this.arrayGoBack.length - 1].value);
            },
            removeLoadingIcon: function () {
                this.isLoaded = true;
                document.getElementById("loadingWrapper").style.visibility = "hidden";
                document.getElementById("subHeader").style.visibility = "visible";
                document.getElementById("content").style.visibility = "visible";
            },
            selectDataSet: function (month) {
                switch(month) {
                    case "Januari": return this.data.schedule.januari;
                    case "Februari": return this.data.schedule.februari;
                    case "March": return this.data.schedule.march;
                    case "April": return this.data.schedule.april;
                    case "May": return this.data.schedule.may;
                    case "June": return this.data.schedule.june;
                    case "July": return this.data.schedule.july;
                    case "August": return this.data.schedule.august;
                    case "September": return this.data.schedule.september;
                    case "October": return this.data.schedule.october;
                    case "November": return this.data.schedule.november;
                    case "December": return this.data.schedule.december;
                }
            },
            login: function () {
                var provider = new firebase.auth.GoogleAuthProvider();

                
                    firebase.auth().signInWithPopup(provider)
                        .then(function () {
                            app.currentUser = firebase.auth().currentUser.displayName;
                            console.log(app.currentUser);
                            app.getPosts();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

            },
            getPosts: function () {
                firebase.database().ref('chat').on('value', function (data) {
                    app.posts = data.val();

                });
                app.isLoggedIn = true;
                console.log($(".box"))
            },
            writeNewPost: function () {
                if (!$("#textInput").val()) {
                    return;
                }

                var text = document.getElementById("textInput").value;
                var userName = firebase.auth().currentUser.displayName;

                // A post entry.
                var postData = {
                    name: userName,
                    body: text
                };

                // Get a key for a new Post.
                var newPostKey = firebase.database().ref().child('chat').push().key;

                var updates = {};
                updates[newPostKey] = postData;

                $("#textInput").val("");

                return firebase.database().ref().child('chat').update(updates);
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

function toggle() {
    $("#toggle").slideToggle();
}

//Target div might be wrong, scrollTop and scrollHeight = 0
console.log($(".test"))
    $(".box").animate({ scrollTop: $(".box").prop("scrollHeight") }, 500);


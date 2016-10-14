'use strict';

var userScore = document.getElementById('user_scores');
var printUserScore = document.getElementById('final_score');
var players = [];
var scores = [];
var points = ['Players', 'Military', 'Money', 'Wonder', 'Civic', 'Commerce', 'Guild', 'Science', 'Final Score'];

function Score (userName, militaryScoreNegative, militaryScorePositive, moneyScore, wonderScore, civicScore, commerceScore, guildScore, scienceScore, scienceScoreColleciton) {
  this.userName = userName;
  this.militaryScorePositive = militaryScorePositive;
  this.militaryScoreNegative = militaryScoreNegative * -1;
  this.militaryScoreFinal = 0;
  this.moneyScore = moneyScore;
  this.wonderScore = wonderScore;
  this.civicScore = civicScore;
  this.commerceScore = commerceScore;
  this.guildScore = guildScore;
  this.scienceScore = scienceScore;
  this.scienceScoreCalculated = [];
  this.scienceScoreColleciton = scienceScoreColleciton;
  this.scienceScoreFinal = 0;
  this.finalPlayerScore = 0;
  this.playerScore = [];
  this.calcMilitaryScore();
  this.calcScienceScore();
  this.calcFinalPlayerScore();
  this.createPlayerScoreArray();
  players.push(this);
};
Score.prototype.calcMilitaryScore = function () {
  for (var i = 0; i < this.militaryScorePositive.length; i++) {
    this.militaryScoreFinal += this.militaryScorePositive[i];
  }
  this.militaryScoreFinal += this.militaryScoreNegative;
};
Score.prototype.calcFinalPlayerScore = function () {
  this.finalPlayerScore = this.militaryScoreFinal + this.moneyScore + this.wonderScore + this.civicScore + this.commerceScore + this.guildScore + this.scienceScoreFinal + this.scienceScoreColleciton;
};
Score.prototype.calcScienceScore = function () {
  for (var i = 0; i < this.scienceScore.length; i++) {
    this.scienceScoreFinal += this.scienceScore[i] * this.scienceScore[i];
    this.scienceScoreCalculated.push(this.scienceScore[i] * this.scienceScore[i]);
  }
  this.scienceScoreFinal += this.scienceScoreColleciton * 7;
};
Score.prototype.createPlayerScoreArray = function () {
  this.playerScore.push(this.userName, this.militaryScoreFinal, this.moneyScore, this.wonderScore, this.civicScore, this.commerceScore, this.guildScore, this.scienceScoreFinal, this.finalPlayerScore);
  scores.push(this.playerScore);
};

function renderElements (element,content,attach) {
  var el = document.createElement(element);
  el.textContent = content;
  document.getElementById(attach).appendChild(el);
}

function renderUserScores() {
  for (var i = 0; i < points.length; i++) {
    var trEl = document.createElement('tr');
    // var column1 = document.createElement('td');
    // column1.textContent = points[i];
    var userScores = document.createElement('td');
    userScores.textContent = scores[i];
    // trEl.appendChild(column1);
    trEl.appendChild(userScores);
  }
  printUserScore.appendChild(trEl);
}

function calcUserScore (event) {
  event.preventDefault();

  var militaryScoreNegative = parseInt(event.target.military_0.value);
  var militaryScorePositive1 = parseInt(event.target.military_1.value);
  var militaryScorePositive3 = parseInt(event.target.military_3.value);
  var militaryScorePositive5 = parseInt(event.target.military_5.value);
  var militaryScorePositive = [militaryScorePositive1, militaryScorePositive3, militaryScorePositive5];
  var moneyScore = parseInt(event.target.money.value);
  var wonderScore = parseInt(event.target.wonder.value);
  var civicScore = parseInt(event.target.civic.value);
  var commerceScore = parseInt(event.target.commerce.value);
  var guildScore = parseInt(event.target.guild.value);
  var scienceCogScore = parseInt(event.target.cog.value);
  var scienceMasonScore = parseInt(event.target.mason.value);
  var scienceTabletScore = parseInt(event.target.tablets.value);
  var scienceScoreColleciton = parseInt(event.target.sets.value);
  var scienceScore = [scienceCogScore, scienceMasonScore, scienceTabletScore];
  var userName = event.target.name.value;

  new Score(userName, militaryScoreNegative, militaryScorePositive, moneyScore, wonderScore, civicScore, commerceScore, guildScore, scienceScore, scienceScoreColleciton);

  event.target.military_0.value = 0;
  event.target.military_1.value = 0;
  event.target.military_3.value = 0;
  event.target.military_5.value = 0;
  event.target.money.value = 0;
  event.target.wonder.value = 0;
  event.target.civic.value = 0;
  event.target.commerce.value = 0;
  event.target.guild.value = 0;
  event.target.cog.value = 0;
  event.target.mason.value = 0;
  event.target.tablets.value = 0;
  event.target.sets.value = 0;
  event.target.name.value = null;

  printUserScore.innerHTML = '';
  renderUserScores();
}

userScore.addEventListener('submit', calcUserScore);

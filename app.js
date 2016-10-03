'use strict';

var userScore = document.getElementById('user_scores');
var printUserScore = document.getElementById('final_score');
var players = [];

var Score = function (userName, militaryScoreNegative, militaryScorePositive, moneyScore, wonderScore, civicScore, commerceScore, guildScore, scienceScore, scienceScoreColleciton) {
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
  this.calcMilitaryScore();
  this.calcScienceScore();
  this.calcFinalPlayerScore();
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
function renderUserScores () {
  printUserScore.innerHTML = '';
  for (var i = 0; i < players.length; i++) {
    var divEl = document.createElement('div');
    var ulEl = document.createElement('ul');
    var liEl = document.createElement('li');
    liEl.textContent = players[i].userName;
    ulEl.appendChild(liEl);
    divEl.appendChild(ulEl);
    printUserScore.appendChild(divEl);
  }
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

  renderUserScores();
}

userScore.addEventListener('submit', calcUserScore);

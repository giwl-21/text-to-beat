var myCanvas;
var conductor = new Conductor();
var drumSounds = [];

var SoundGrid;

function preload(){
  drumSounds.push(loadSound("lib/drum-sounds/sound1.wav"));
  for(var i = 1; i <= 20; i++){
    drumSounds.push(loadSound("lib/drum-sounds/kit-hits/sound" + i + ".wav"));
  }
  for(var i = 2; i <= 14; i++){//wav files
    drumSounds.push(loadSound("lib/drum-sounds/sound" + i + ".wav"));
  }
  for(var i = 1; i <= 2; i++){
    drumSounds.push(loadSound("lib/drum-sounds/sound" + i + ".mp3"));
  }
}

function setup(){
  myCanvas = createCanvas(window.innerWidth, window.innerHeight);
  myCanvas.parent("my-canvas");
  background(0,0,0);
  SoundGrid = CreateSoundGrid();
}

function draw(){
  background(0);
  if(conductor.beatTimeline){
    conductor.render();
  }
}

function Conductor(){
  this.x = window.innerWidth;
  this.syllables = null;
  this.timeline = [];
  this.timeConstant = 300;
  this.beatTimeline = null;//Array of objects with properties .sound and .stress
  this.maxStress = 0;
  /*
  this.createTimeLine = function(){
    for(var i = 0; i < this.syllables.length; i++){
      var sy = this.syllables[i];
      if(sy.stress == "break"){
        this.timeline.push("break");
      }
      else{
        //this.timeline.push(SoundGrid[sy.beginLetter.type][sy.endLetter.type]);
        this.timeline.push(SoundGrid["approximant"]["approximant"]);
      }
    }
  }

  this.renderTimeLine = function(){
    this.timeline[0].setVolume(0.5);
    this.timeline[0].jump(0,0.25);
    setTimeout(playNextSound, 300, 1);
  }
*/
  this.render = function(){
    for(var i in this.beatTimeline){
      fill(255,100,255);
      rect(this.x + i * 50, canvas.height/2, 10, 10);
    }
    this.x -= 1;
  }
  this.reset = function(){//Resets
    this.x = window.innerWidth;
    this.syllables = [];
    this.beatTimeline = [];
  }

  this.makeBeatTimeline = function(bpm) {//Fills conductr's beatTimeling variable with an array of sound and stress to be played
    //can only be played if syllables is filled
    var secondsPerBeat = 60 / bpm;
    var stressArray = [];
    var timeline = [];
    for (i in this.syllables){
      if (this.syllables[i].stress != "break"){
        stressArray.push({stress: this.syllables[i].stress, sound: SoundGrid[this.syllables[i].beginLetter.type][this.syllables[i].endLetter.type], syllable: this.syllables[i].text});
      }
    }
    var max = -Infinity;
    for (i in stressArray){
      if (stressArray[i].stress > max){
        max = stressArray[i].stress;
      }
    }
    var threshold = max - 2;
    this.maxStress = max;
    var time = 0;
    for (i in stressArray){
      //splitting unstresses evenly each beat, which are started by stresses
      timeline[time] = stressArray[i];

      var startingIndex = int(i);
      while (stressArray[startingIndex].stress < max && startingIndex > 0){
        startingIndex--;
      }
      var endingIndex = startingIndex + 1;
      while (endingIndex < stressArray.length && stressArray[endingIndex].stress < threshold){
        endingIndex++;
      }
      var syllablesInBeat = endingIndex - startingIndex;
      console.log("syllables in Beat: " + syllablesInBeat);
      var multiplier = 1;//for single syllables and too many syllables
      if (syllablesInBeat < 3){
        multiplier = 0.5;
      }
      else {
        multiplier = 1 + syllablesInBeat/8;
      }
      time += multiplier * secondsPerBeat / (syllablesInBeat+1);/*time interval in seconds*/
      if (stressArray[i].stress == max){
        time += multiplier * secondsPerBeat / (syllablesInBeat+1);
      }
    }
    console.log(timeline);
    this.beatTimeline = timeline;
  }
}

function submit(condition){//true: audio is all audios, false, audio is just ticks
  conductor.reset();
  conductor.syllables = ConvertIPAtoSyllables(ConvertSentenceToIPA(document.getElementById("input").value));
  /*conductor.createTimeLine();
  conductor.renderTimeLine();*/
  conductor.makeBeatTimeline(document.getElementById('tempo').value);
  playConductorBeatTimeline(conductor.beatTimeline, conductor.maxStress, condition);
}


function CreateSoundGrid(){
  var sg = {//beginning to end
    plosive: {plosive: drumSounds[19], nasal: drumSounds[6], tapFlap: drumSounds[0], fricative: drumSounds[1], lateralFricative: drumSounds[0], approximant: drumSounds[0], lateralApproximant: drumSounds[0], vowel: drumSounds[11]},

    nasal: {plosive: drumSounds[6], nasal: drumSounds[7], tapFlap: drumSounds[0], fricative: drumSounds[14], lateralFricative: drumSounds[0], approximant: drumSounds[0], lateralApproximant: drumSounds[0], vowel: drumSounds[0]},

    tapFlap: {plosive: drumSounds[0], nasal: drumSounds[20], tapFlap: drumSounds[0], fricative: drumSounds[0], lateralFricative: drumSounds[0], approximant: drumSounds[0], lateralApproximant: drumSounds[0], vowel: drumSounds[0]},

    fricative: {plosive: drumSounds[1], nasal: drumSounds[17], tapFlap: drumSounds[0], fricative: drumSounds[3], lateralFricative: drumSounds[0], approximant: drumSounds[0], lateralApproximant: drumSounds[16], vowel: drumSounds[0]},

    lateralFricative: {plosive: drumSounds[5], nasal: drumSounds[5], tapFlap: drumSounds[5], fricative: drumSounds[5], lateralFricative: drumSounds[5], approximant: drumSounds[5], lateralApproximant: drumSounds[5], vowel: drumSounds[5]},

    approximant: {plosive: drumSounds[0], nasal: drumSounds[0], tapFlap: drumSounds[0], fricative: drumSounds[0], lateralFricative: drumSounds[0], approximant: drumSounds[9], lateralApproximant: drumSounds[0], vowel: drumSounds[0]},

    lateralApproximant: {plosive: drumSounds[0], nasal: drumSounds[0], tapFlap: drumSounds[0], fricative: drumSounds[12], lateralFricative: drumSounds[0], approximant: drumSounds[0], lateralApproximant: drumSounds[0], vowel: drumSounds[18]},

    vowel: {plosive: drumSounds[11], nasal: drumSounds[5], tapFlap: drumSounds[0], fricative: drumSounds[8], lateralFricative: drumSounds[0], approximant: drumSounds[0], lateralApproximant: drumSounds[0], vowel: drumSounds[0]}
  };
  return sg;
}

function playConductorBeatTimeline(timeline, maxStress, condition){
  for (t in timeline){
    setTimeout(function(time, blnSounds){
      console.log("play sound at " + time);
      var volFraction;
      console.log(volFraction = timeline[time].stress / maxStress);
      if (blnSounds){
        timeline[time].sound.setVolume(Math.sqrt(volFraction));
        timeline[time].sound.play();
      }
      else {
        drumSounds[0].setVolume(Math.sqrt(volFraction));
        drumSounds[0].play();
      }
    }, t*1000, t, condition);
  }
}
/*
function playNextSound(index, timeConst){
  if(index < conductor.timeline.length){
    if(conductor.timeline[index] == "break"){
      setTimeout(playNextSound, 300, index+1);
    }
    else{
      conductor.timeline[index].setVolume(1);
      conductor.timeline[index].jump(0,0.25);
      setTimeout(playNextSound, 300, index+1);
    }
  }
}*/

class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    
    question.hide();
    background("yellow");
    fill("black");
    textSize(30);
    text("Result of the Quiz",320, 50);
    text("----------------------------",300, 65);
    
    Contestant.getPlayerInfo();
   if(allContestants !== undefined){
    var display_Answers = 250;

    fill("blue");
    textSize(20);
    text("*NOTE: Contestant who answered correct are highlighted in green color!",130,230);
    
    
    
    for(var plr in allContestants){
      
      var correctAns = "2";
      if (correctAns === allContestants[plr].answer)
        fill("Green")
      else
        fill("red");


        display_Answers+=20;
    textSize(20);
    text(allContestants[plr].name + " : " + allContestants[plr].answer, 270,display_Answers);
    
    }
   }
  }  
 }
  



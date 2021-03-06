// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less


console.log(enemyInfo);

var fightOrSkip = function () {
    // ask the player if they want to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    promptFight = promptFight.toLowerCase();

    //conditional recursive function
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip(); 
    }
    
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        
        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from player for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerMoney", playerInfo.money);
            return true;
        }
    }
    return false;
}

// fight function
var fight = function(enemy) {
    var isPlayerTurn = true;

    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    // repeat and execute as long as enemy is alive
    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {  //player attacks first
        if (fightOrSkip()) {
            break;
        }
    
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);

        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            // award player prize money
            playerInfo.money = playerInfo.money + 20;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
    } else {  //player is attackted first
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
        }
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
      };
      // switch turns next round
      isPlayerTurn = !isPlayerTurn;
    }
  }

var startGame = function() {
    playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    // if the player is still alive, keep fighting
    if (playerInfo.health > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
        
        // pick new enemy to fight based on index of array
        var pickedEnemyObj = enemyInfo[i];
        
        // reset enemy health
        pickedEnemyObj.health = randomNumber(40, 60);
        
        fight(pickedEnemyObj);
        
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
            var shopConfirm = window.confirm("The fight is over, visit shop before next round?");
            
            if (shopConfirm) {
                shop();
            }
        };

    } 
    else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
  }
//   when player is out of health or enemies to fight run endGame
  endGame();  
};

var endGame = function() {
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Now leaving shop");
            // nothing happens, function ends
            break;
        default:
            window.alert("You did not pick a valid option. Try Again.");
            // call shop again
            shop();
            break;
    }
};

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}


var getPlayerName = function() {
    var name = "";
    // loop with prompt and conditions
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 8) {
            window.alert("Refilling player's health by 25 for 8 dollars.");
            this.health += 25;
            this.money -= 8;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

startGame();
function sum(a, b) {
    return a + b;
}

var game = function game(){
    this.rolls = [];
    this.total = 0;
}

game.prototype.roll = function(pins){
    this.rolls.push(pins);
}


game.prototype.score = function(rolls, runningTotal, frame) {
    var isSpare = function(rolls) { return rolls.slice(0, 2).reduce(sum) == 10 },
        isStrike = function(rolls) { return rolls[0] == 10 };

    if (typeof runningTotal == 'undefined') runningTotal = 0;
    if (typeof rolls == 'undefined') rolls = this.rolls;
    if (typeof frame == 'undefined') frame = 0;
    frame += 1

    if (rolls.length == 0 || frame > 10) {
        return runningTotal;
    } else if (isStrike(rolls)) {
        runningTotal += rolls.slice(0, 3).reduce(sum);
        return this.score(rolls.slice(1), runningTotal, frame);
    } else {
        if (isSpare(rolls)) {
            runningTotal += rolls.slice(0, 3).reduce(sum);
        } else {
            runningTotal += rolls.slice(0, 2).reduce(sum);
        }
        return this.score(rolls.slice(2), runningTotal, frame);
    }
}

if (typeof module != 'undefined') {
    module.exports.game = game
}

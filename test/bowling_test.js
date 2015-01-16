if (typeof require != 'undefined'){
    // In node.js
    var assert = require("should")
    var gameConstructor = require("../bowl.js").game
} else {
    var gameConstructor = game
}

function rollMany(game, pins, count) {
    for (var i = 0; i < count; i++) {
        game.roll(pins);
    }
}

function assertScore(game, score) {
    game.score().should.equal(score);
}

describe('Bowling Game', function(){

  beforeEach('Setup a new game', function(){
    this.game = new gameConstructor();
    });

  describe('Gutter game', function(){
    it('Should have a zero score when no pins are knocked down', function(){
    rollMany(this.game, 0, 20);
    assertScore(this.game, 0);
    })
  })

  describe('Simple game', function() {
      it('Should show 20 for all ones', function() {
          rollMany(this.game, 20, 1);
          assertScore(this.game, 20);
      });
  });

  describe('Mixed game', function() {
      it('Should total 70', function() {
          rollMany(this.game, 3, 10);
          rollMany(this.game, 4, 10);
          assertScore(this.game, 70);
      });
  });

  describe('Three fives', function() {
      it('Should be 20', function() {
          rollMany(this.game, 5, 3);
          rollMany(this.game, 0, 17);
          assertScore(this.game, 20);
      });
  });

  describe('Two spares', function() {
      it('Should be 35', function() {
          rollMany(this.game, 5, 5);
          rollMany(this.game, 0, 15);
          assertScore(this.game, 35);
      });
  });

  describe('Single strike', function() {
      it('Should be 22', function() {
          rollMany(this.game, 10, 1);
          rollMany(this.game, 3, 2);
          rollMany(this.game, 0, 16);
          assertScore(this.game, 22);
      });
  });

  describe('Two strikes', function() {
      it('Should be 16', function() {
          rollMany(this.game, 10, 2);
          rollMany(this.game, 3, 2);
          rollMany(this.game, 0, 14);
          assertScore(this.game, 45);
      });
  });

  describe('Perfect game', function() {
      it('Should be 300', function() {
          rollMany(this.game, 10, 12);
          assertScore(this.game, 300);
      });
  });
});

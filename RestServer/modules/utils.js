module.exports = {
    getRandomArbitrary: function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }
}
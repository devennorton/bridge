/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Bridge' })
};

/*
 * GET game page.
 */

exports.game = function(req, res){
  res.render('game', { title: 'Bridge', layout: false });
};
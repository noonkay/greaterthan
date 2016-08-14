var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'podcast';
	locals.filters = {
		story: req.params.story,
	};
	locals.data = {
		stories: [],
	};

	// Load the current story
	view.on('init', function (next) {

		var q = keystone.list('Story').model.findOne({
			state: 'published',
			slug: locals.filters.story,
		});

		q.exec(function (err, result) {
			locals.data.story = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Story').model.find().where('state', 'published').sort('-publishedDate').limit('4');

		q.exec(function (err, results) {
			locals.data.stories = results;
			next(err);
		});

	});

	// Render the view
	view.render('story');
};

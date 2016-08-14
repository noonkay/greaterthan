var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'podcast';
	locals.data = {
		stories: [],
	};

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Story').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate');

		q.exec(function (err, results) {
			locals.data.stories = results;
			next(err);
		});
	});

	// Render the view
	view.render('podcast');
};

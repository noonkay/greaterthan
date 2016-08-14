var keystone = require('keystone');
var Types = keystone.Field.Types;

var Story = new keystone.List('Story', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Story.add({
  title: { type: Types.Text, required: true, initial: true, index: true },
   state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
   author: { type: Types.Relationship, ref: 'User', index: true },
   publishedDate: { type: Types.Date, index: true, dependsOn: {   state: 'published' } },
   image: { type: Types.CloudinaryImage },
   podcastURL: {type: Types.Text, required:true, index: true, initial: true}
});

Story.register();

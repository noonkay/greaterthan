var keystone = require('keystone');
var Types = keystone.Field.Types;

var Partner = new keystone.List('Partner');

Partner.add({
   name: { type: Types.Text, required: true, index: true },
   description: { type: Types.Textarea},
   logo: { type: Types.CloudinaryImage, autoCleanup: true, select: true }
});

Partner.register();

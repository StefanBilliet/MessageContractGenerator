var util = require('util');
var endOfLine = require('os').EOL;

function ModelItemPropertyRenderer() {
  var self = this;

  self.render = function render (modelItemProperty) {
    var template = 'public %s %s { get; set; }' + endOfLine;

    return util.format(template, modelItemProperty.Type, modelItemProperty.Name);
  }

  return self;
}

module.exports = ModelItemPropertyRenderer;
var endOfLine = require('os').EOL;
var util = require('util');

function ModelItemConstructorRenderer () {
  var self = this;

  self.render = function render (modelItem) {
    var constructorTemplate = 'public %s() { }' + endOfLine +
                              'public %s(%s) {' + endOfLine +
                                          '%s' + endOfLine +
                                          '}';
    var constructorParameterString = modelItem.Properties.map(function (modelItemProperty) {
      return util.format('%s %s', modelItemProperty.Type, modelItemProperty.Name.toLowerCase());
    }).join(', ');

    var propertiesInitialisationString = modelItem.Properties.map(function (modelItemProperty) {
      return util.format(' %s = %s;', modelItemProperty.Name, modelItemProperty.Name.toLowerCase());
    }).join(endOfLine);

    return util.format(constructorTemplate, modelItem.Type, modelItem.Type, constructorParameterString, propertiesInitialisationString);
  }

  return self;
}

module.exports = ModelItemConstructorRenderer;
var util = require('util');
var endOfLine = require('os').EOL;

function ModelItemPropertyBuilderRenderer() {
  var self = this;

  self.render = function render (classType, propertyNameToBuild, modelItemProperties) {
    var template = '    public %s With%s(%s value) {' + endOfLine +
                   '      return new %s(%s);' + endOfLine +
                   '    }';
    var builderArgumentsString = modelItemProperties.map(function (modelItemProperty) {
      return modelItemProperty.Name == propertyNameToBuild ? 'value' : modelItemProperty.Name;
    }).join(', ');

    var typeOfPropertyToBuild = modelItemProperties.filter(function (property) {
      return property.Name === propertyNameToBuild;
    })[0].Type;

    return util.format(template, classType, propertyNameToBuild, typeOfPropertyToBuild, classType, builderArgumentsString);
  }

  return self;
}

module.exports = ModelItemPropertyBuilderRenderer;
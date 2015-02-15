var util = require('util');
var endOfLine = require('os').EOL;

module.exports = function CommandModelItemRenderer(propertyRenderer, constructorRenderer, propertyBuilderRenderer) {
  var self = this;

  self.render = function render (commandModelItem, rootNamespace) {
    var template = 'namespace %s.Commands {' + endOfLine +
                   '  public class %s : ICommand {' + endOfLine +
                   '%s' + endOfLine +
                   '' + endOfLine +
                   '%s' + endOfLine +
                   '' + endOfLine +
                   '%s' + endOfLine +
                   '  }' +  endOfLine +
                   '}'  + endOfLine +
                   '';

    var propertiesString = commandModelItem.Properties.map(propertyRenderer.render).join(endOfLine);
    var constructorString = constructorRenderer.render(commandModelItem);
    var propertyBuildersString = commandModelItem.Properties.map(function (modelItemProperty) {
      return propertyBuilderRenderer.render(commandModelItem.Type, modelItemProperty.Name, commandModelItem.Properties);
    }).join(endOfLine + '' + endOfLine);

    return util.format(template, rootNamespace, commandModelItem.Type, propertiesString, constructorString, propertyBuildersString);
  };

  return self;
}
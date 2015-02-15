var should = require('chai').should();
var endOfLine = require('os').EOL;
var ModelItem = require('../ModelItem');
var ModelItemProperty = require('../ModelItemProperty');
var ModelItemPropertyRenderer = require('../renderers/ModelItemPropertyRenderer');
var ModelItemConstructorRenderer = require('../renderers/ModelItemConstructorRenderer');
var ModelItemPropertyBuilderRenderer = require('../renderers/ModelItemPropertyBuilderRenderer');
var util = require('util');
var endOfLine = require('os').EOL;

var model = {
  commandModelItem: new ModelItem('CreateScheduleCommand', [
      new ModelItemProperty('Id', 'Guid'),
      new ModelItemProperty('Name', 'String')]),
  rootNamespace: 'Application',
  renderedCommandModelItem:
"namespace Application.Commands {" + endOfLine +
"  public class CreateScheduleCommand : ICommand {" + endOfLine +
"    public Guid Id { get; set; }" + endOfLine +
"    public String Name { get; set; }" + endOfLine +
"" + endOfLine +
"    public CreateScheduleCommand() { }" + endOfLine +
"" + endOfLine +
"    public CreateScheduleCommand(Guid id, String name) {" + endOfLine +
"      Id = id;" + endOfLine +
"      Name = name;" + endOfLine +
"    }" + endOfLine +
"" + endOfLine +
"    public CreateScheduleCommand WithId(Guid value) {" + endOfLine +
"      return new CreateScheduleCommand(value, Name);" + endOfLine +
"    }" + endOfLine +
"" + endOfLine +
"    public CreateScheduleCommand WithName(String value) {" + endOfLine +
"      return new CreateScheduleCommand(Id, value);" + endOfLine +
"    }" + endOfLine +
"  }" + endOfLine +
"}" + endOfLine
}

describe('CommandModelItemRenderer', function () {
  var sut;

  beforeEach(function () {
    var propertyRenderer = new ModelItemPropertyRenderer();
    var constructorRenderer = new ModelItemConstructorRenderer();
    var propertyBuilderRenderer = new ModelItemPropertyBuilderRenderer();
    sut = new CommandModelItemRenderer(propertyRenderer, constructorRenderer, propertyBuilderRenderer);
  });

  describe('#render()', function () {
    it('should render a compilable clr type in the provided namespace', function () {
      var output = sut.render(model.commandModelItem, model.rootNamespace);
debugger;
      output.should.deep.equal(model.renderedCommandModelItem);
    })
  });
});

function CommandModelItemRenderer(propertyRenderer, constructorRenderer, propertyBuilderRenderer) {
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
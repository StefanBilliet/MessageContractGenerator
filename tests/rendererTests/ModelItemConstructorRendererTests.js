var ModelItem = require('../../ModelItem');
var ModelItemProperty = require('../../ModelItemProperty');
var ModelItemConstructorRenderer = require('../../renderers/ModelItemConstructorRenderer');
var should = require('chai').should();
var util = require('util');
var endOfLine = require('os').EOL;

var model = {
  commandModelItem: new ModelItem('CreateScheduleCommand', [
      new ModelItemProperty('Id', 'Guid'),
      new ModelItemProperty('Name', 'String')]),
  commandModelItemConstructor :
  'public CreateScheduleCommand() { }' + endOfLine +
  'public CreateScheduleCommand(Guid id, String name) {' + endOfLine +
  ' Id = id;' + endOfLine +
  ' Name = name;' + endOfLine +
  '}'
};

describe('ModelItemConstructorRenderer', function () {
  var sut;

  beforeEach(function () {
    sut = new ModelItemConstructorRenderer();
  });

  describe('#render()', function () {
    it('should render the constructor of the type, initialising any provided arguments', function () {
      var constructorBlock = sut.render(model.commandModelItem);

      constructorBlock.should.equal(model.commandModelItemConstructor);
    });
  });
});
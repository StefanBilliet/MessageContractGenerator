var ModelItemProperty = require('../../ModelItemProperty');
var should = require('chai').should();
var util = require('util');
var endOfLine = require('os').EOL;
var ModelItemPropertyBuilderRenderer = require('../../renderers/ModelItemPropertyBuilderRenderer');

var model = {
  type: 'CreateScheduleCommand',
  modelItemProperties: [new ModelItemProperty('Id', 'Guid'), new ModelItemProperty('Name', 'String')],
  propertyBuilderString : '    public CreateScheduleCommand WithId(Guid value) {' + endOfLine +
                          '      return new CreateScheduleCommand(value, Name);' + endOfLine +
                          '    }'
};

describe('ModelItemPropertyBuilderRenderer', function () {
  var sut;

  beforeEach(function () {
    sut = new ModelItemPropertyBuilderRenderer();
  });

  describe('#render()', function () {
    it('should render a builder method for use in the class', function () {
      var output = sut.render(model.type, model.modelItemProperties[0].Name, model.modelItemProperties);

      output.should.equal(model.propertyBuilderString);
    });
  });
});
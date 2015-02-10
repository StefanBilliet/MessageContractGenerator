var ModelItemProperty = require('../../ModelItemProperty');
var should = require('chai').should();
var util = require('util');
var endOfLine = require('os').EOL;
var ModelItemPropertyRenderer = require('../../renderers/ModelItemPropertyRenderer');

var model = {
  modelItemProperty: new ModelItemProperty('Id', 'Guid'),
  propertyString : '    public Guid Id { get; set; }'
};

describe('ModelItemPropertyRenderer', function () {
  var sut;

  beforeEach(function () {
    sut = new ModelItemPropertyRenderer();
  });

  describe('#render()', function () {
    it('should render the property for use in the class', function () {
      var output = sut.render(model.modelItemProperty);

      output.should.equal(model.propertyString);
    });
  });
});
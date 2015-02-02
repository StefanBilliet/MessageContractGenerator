var should = require('chai').should();
var fs = require('fs');
var ModelItem = require('../ModelItem');
var ModelItemParser = require('../ModelItemParser');
var ModelItemProperty = require('../ModelItemProperty');

var model = {
  iniFileContents : {
    CreateScheduleCommand: { Id: 'Guid', Name: 'String' },
    CreatedScheduleEvent: { Id: 'Guid', Name: 'String' }
  },
  modelItems: [
    new ModelItem('CreateScheduleCommand', [
      new ModelItemProperty('Id', 'Guid'),
      new ModelItemProperty('Name', 'String')]),
    new ModelItem('CreatedScheduleEvent', [
      new ModelItemProperty('Id', 'Guid'),
      new ModelItemProperty('Name', 'String')])
  ]
};

describe('ModelItemParser', function () {
  var sut;

  beforeEach(function () {
    sut = new ModelItemParser();
  });

  describe('#parse()', function () {
    it('should parse the ini sections into ModelItems', function () {
      var modelItems = sut.parse(model.iniFileContents);

      modelItems.should.deep.equal(model.modelItems);
    })
  });
})
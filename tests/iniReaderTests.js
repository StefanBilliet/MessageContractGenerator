var should = require('chai').should();
var fs = require('fs');
var ini = require('ini');

var model = {
  iniFileContents : {
    CreateScheduleCommand: { Id: 'Guid', Name: 'String' },
    CreatedScheduleEvent: { Id: 'Guid', Name: 'String' }
  }
}

describe('ini', function () {
  it('does what I think it does :-p', function () {
    var iniContents = ini.parse(fs.readFileSync(__dirname + '/ScheduleContracts.ini', 'utf-8'))

    iniContents.should.deep.equal(model.iniFileContents);
  })
});
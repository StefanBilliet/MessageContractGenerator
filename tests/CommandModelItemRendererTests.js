var should = require('chai').should();
var endOfLine = require('os').EOL;
var ModelItem = require('../ModelItem');
var ModelItemProperty = require('../ModelItemProperty');

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
"  }" + endOfLine +
"" + endOfLine +
"  public CreateScheduleCommand() { }" + endOfLine +
"" + endOfLine +
"  public CreateScheduleCommand(Guid id, String name) {" + endOfLine +
"    Id = id;" + endOfLine +
"    Name = name;" + endOfLine +
"  }" + endOfLine +
"" + endOfLine +
"  public CreateScheduleCommand WithId(Guid value) {" + endOfLine +
"    return new CreateScheduleCommand(value, Name);" + endOfLine +
"  }" + endOfLine +
"" + endOfLine +
"  public CreateScheduleCommand WithName(String value) {" + endOfLine +
"    return new CreateScheduleCommand(Id, value);" + endOfLine +
"  }" + endOfLine +
" }" + endOfLine
}

describe('CommandModelItemRenderer', function () {
  var sut;

  beforeEach(function () {
    sut = new CommandModelItemRenderer();
  });

  //describe('#render()', function () {
  //  it('should render a compilable clr type in the provided namespace', function () {
  //    var output = sut.render(model.commandModelItem);
//
  //    output.should.deep.equal(model.renderedCommandModelItem);
  //  })
  //});
});

function CommandModelItemRenderer() {
  var self = this;

  return self;
}
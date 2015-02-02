var should = require('chai').should();

var model = {
  commandModelItem: new ModelItem('CreateScheduleCommand', [
      new ModelItemProperty('Id', 'Guid'),
      new ModelItemProperty('Name', 'String')]),
  rootNamespace: 'Application'
  renderedCommandModelItem:
"namespace Application.Commands {
  public class CreateScheduleCommand : ICommand {
    public Guid Id { get; set; }
    public String Name { get; set; }
  }

  public CreateScheduleCommand() { }

  public CreateScheduleCommand(Guid id, String name) {
    Id = id;
    Name = name;
  }

  public CreateScheduleCommand WithId(Guid value) {
    return new CreateScheduleCommand(value, Name);
  }

  public CreateScheduleCommand WithName(String value) {
    return new CreateScheduleCommand(Id, value);
  }
 }"
}

describe('CommandModelItemRenderer', function () {
  var sut;

  beforeEach(function () {
    sut = new CommandModelItemRenderer();
  });

  describe('#render()', function () {
    it('should render a compilable clr type in the provided namespace', function () {
      var output = sut.render(model.commandModelItem);

      output.should.deep.equal(model.renderedCommandModelItem);
    })
  });
});

function CommandModelItemRenderer() {
  var self = this;

  return self;
}
var ModelItem = require('./ModelItem');
var ModelItemProperty = require('./ModelItemProperty');

function ModelItemParser(){
  var self = this;

  self.parse = function parse(iniContents) {
    var classTypes = Object.keys(iniContents);

    return classTypes.map(function (classType) {
      var classItem = iniContents[classType];
      var propertyNames = Object.keys(classItem);
      var modelItemProperties = propertyNames.map(function (propertyName) {
        return new ModelItemProperty(propertyName, classItem[propertyName]);
      });

      return new ModelItem(classType, modelItemProperties);
    });
  }

  return self;
}

module.exports = ModelItemParser;
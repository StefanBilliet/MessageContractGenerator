function ModelItem(type, properties) {
  var self = this;

  self.Type = type;
  self.Properties = properties;

  return self;
}

module.exports = ModelItem;
export default Ember.Component.extend({
  result: Em.computed.alias("content"),
  tagName: "div",
  classNames: ["imgflip-imgwrap"],

  selectedClass: function() {
    return this.get("result.id") == this.get("selectedMeme") ? "selected" : "";
  }.property("selectedMeme"),

  selectedChanged: function() {
    this.rerender();
  }.observes('selectedMeme'),

  click: function() {
    this.sendAction("pickItem", this.get("result.id"));
  },

  alternateText: function() {
    return this.get("result.name");
  }.property("result"),

  imagePath: function() {
    return this.get("result.url");
  }.property("result.url", "selectedMeme")
});

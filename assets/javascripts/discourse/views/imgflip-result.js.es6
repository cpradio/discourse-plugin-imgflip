import StringBuffer from 'discourse/mixins/string-buffer';

export default Ember.View.extend(StringBuffer, {
  result: Em.computed.alias("content"),
  tagName: "div",
  selected: false,
  classNames: ["imgflip-imgwrap"],
  rawTemplate: "imgflip-result.raw",

  selectedClass: function() {
    return this.get("result.id") == this.get("controller.selectedMeme") ? "selected" : "";
  }.property("selected", "controller.selectedMeme"),

  selectedChanged: function() {
    this.rerender();
  }.observes('selected', 'controller.selectedMeme'),

  click: function() {
    this.set("selected", !this.get("selected"));
    this.get("controller").send("pickItem", this.get("result.id"));
  },

  alternateText: function() {
    return this.get("result.name");
  }.property("result"),

  imagePath: function() {
    return this.get("result.url");
  }.property("result.url", "selected")

});

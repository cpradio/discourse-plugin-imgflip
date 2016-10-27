import { bufferedRender } from 'discourse-common/lib/buffered-render';

export default Ember.View.extend(bufferedRender, {
  result: Em.computed.alias("content"),
  tagName: "div",
  classNames: ["imgflip-imgwrap"],
  rawTemplate: "imgflip-result.raw",

  selectedClass: function() {
    return this.get("result.id") == this.get("controller.selectedMeme") ? "selected" : "";
  }.property("controller.selectedMeme"),

  selectedChanged: function() {
    this.rerender();
  }.observes('controller.selectedMeme'),

  click: function() {
    this.get("controller").send("pickItem", this.get("result.id"));
  },

  alternateText: function() {
    return this.get("result.name");
  }.property("result"),

  imagePath: function() {
    return this.get("result.url");
  }.property("result.url", "controller.selectedMeme")

});

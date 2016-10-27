import { bufferedRender } from 'discourse-common/lib/buffered-render';

export default Ember.View.extend(bufferedRender({
  result: Em.computed.alias("content"),
  tagName: "div",
  classNames: ["imgflip-imgwrap"],

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
  }.property("result.url", "controller.selectedMeme"),

  buildBuffer(buffer) {
    let selectedClass = this.get('selectedClass');
    let imagePath = this.get('imagePath');
    let alternateText = this.get('alternateText');

    buffer.push(`<img class="imgflip-img ${selectedClass}" src="${imagePath}" alt="${alternateText}" title="${alternateText}">`);
  }
}));

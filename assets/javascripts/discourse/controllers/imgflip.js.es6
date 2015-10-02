import ModalFunctionality from 'discourse/mixins/modal-functionality';

export default Ember.Controller.extend(ModalFunctionality, {
  loading: true,
  selectedMeme: undefined,
  topText: "",
  bottomText: "",
  memes: [],

  actions: {
    pickItem: function(template_id) {
      this.set("selectedMeme", template_id);
    },
    apply: function() {
      var selectedMeme = this.get("selectedMeme"),
          topText = this.get("topText"), bottomText = this.get("bottomText"),
          self = this;
      Discourse.ajax(this.getUrl("caption_image") + "&template_id=" + selectedMeme +
        "&text0=" + topText + "&text1=" + bottomText).then(
          function(resp) {
            self.composerView.addMarkdown("![](" + resp.data.url + ")");
          }.bind(this)
      );
      this.set("selectedMeme", undefined);
      this.send('closeModal');
    }
  },

  refresh: function() {
    this.set("loading", false);
  },

  init: function () {
    this._super();
    this.setProperties({"loading": true, "memes": [], topText: "", bottomText: "", selectedMeme: undefined });

    Discourse.ajax(this.getUrl("get_memes")).then(
      function(resp) {
        this.set("memes", resp.data.memes);
        this.refresh();
      }.bind(this)
    );
  },

  getUrl: function(path) {
    return this.siteSettings.imgflip_api_url + path + "?username=" + this.siteSettings.imgflip_api_username +
      "&password=" + this.siteSettings.imgflip_api_password;
  }
});
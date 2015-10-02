import showModal from 'discourse/lib/show-modal';
import ApplicationRoute from 'discourse/routes/application';
import ComposerView from 'discourse/views/composer';

export default
{
  name: 'imgflip',
  initialize()
  {
    ApplicationRoute.reopen({
      actions: {
        showImgFlip: function (composerView) {
          showModal('imgflip');
          this.controllerFor('imgflip').setProperties({composerView: composerView});
        }
      }
    });

    ComposerView.reopen({
      initEditor: function () {
        // overwrite and wrap.
        this._super();
        if (Discourse.SiteSettings.imgflip_enabled
          && Discourse.SiteSettings.imgflip_api_url
          && Discourse.SiteSettings.imgflip_api_username
          && Discourse.SiteSettings.imgflip_api_password) {
          var view = this;
          var button_text = I18n.t("imgflip.composer_button_text");
          var btn = $('<button class="wmd-button wmd-imgflip-button" title="' + button_text + '" aria-label="' + button_text + '"></button>');
          btn.click(function () {
            view.get("controller").send("showImgFlip", view);
          });
          $("#wmd-button-row,.wmd-button-row").append(btn);
        }
      }
    });
  }
};
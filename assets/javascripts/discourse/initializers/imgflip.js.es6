import showModal from 'discourse/lib/show-modal';
import ApplicationRoute from 'discourse/routes/application';
import ComposerView from 'discourse/views/composer';
import { onToolbarCreate } from 'discourse/components/d-editor';

export default
{
  name: 'imgflip',
  initialize(container)
  {
    const siteSettings = container.lookup('site-settings:main');

    if (siteSettings.imgflip_enabled
      && siteSettings.imgflip_api_url
      && siteSettings.imgflip_api_username
      && siteSettings.imgflip_api_password) {
      if (typeof Discourse.ComposerEditorComponent === "undefined") {
        ApplicationRoute.reopen({
          actions: {
            showImgFlip: function (composerView) {
              showModal('imgflip');
              this.controllerFor('imgflip').setProperties({composerViewOld: composerView});
            }
          }
        });

        ComposerView.reopen({
          initEditor: function () {
            // overwrite and wrap.
            this._super();
            var view = this;
            var button_text = I18n.t("imgflip.composer_button_text");
            var btn = $('<button class="wmd-button wmd-imgflip-button" title="' + button_text + '" aria-label="' + button_text + '"></button>');
            btn.click(function () {
              view.get("controller").send("showImgFlip", view);
            });
            $("#wmd-button-row,.wmd-button-row").append(btn);
          }
        });
      } else {
        Discourse.DEditorComponent.reopen({
          actions: {
            showImgFlip: function() {
              showModal('imgflip').setProperties({composerView: this});
            }
          }
        });

        onToolbarCreate(toolbar => {
          toolbar.addButton({
            id: "imgflip_button",
            group: "extras",
            icon: "random",
            action: 'showImgFlip'
          });
        });
      }
    }
  }
};
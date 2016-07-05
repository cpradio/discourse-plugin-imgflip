import { withPluginApi } from 'discourse/lib/plugin-api';
import Composer from 'discourse/components/d-editor';
import showModal from 'discourse/lib/show-modal';

function initializePlugin(api)
{
  const siteSettings = api.container.lookup('site-settings:main');

  if (siteSettings.imgflip_enabled
      && siteSettings.imgflip_api_url
      && siteSettings.imgflip_api_username
      && siteSettings.imgflip_api_password) {
    Composer.reopen({
      actions: {
        showImgFlip: function () {
          showModal('imgflip').setProperties({composerView: this});
        }
      }
    });

    api.onToolbarCreate(toolbar => {
      toolbar.addButton({
        id: "imgflip_button",
        group: "extras",
        icon: "random",
        action: 'showImgFlip'
      });
    });
  }
}

export default
{
  name: 'imgflip',
  initialize(container)
  {
    withPluginApi('0.1', api => initializePlugin(api));
  }
};
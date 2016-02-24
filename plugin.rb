# name: discourse-plugin-imgflip
# about: Add ImgFlip support
# version: 0.4.0
# authors: Matthew Wilkin
# url: https://github.com/cpradio/discourse-plugin-imgflip

enabled_site_setting :imgflip_enabled

register_asset "javascripts/discourse/templates/imgflip.hbs"

register_asset 'stylesheets/imgflip.scss'
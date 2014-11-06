# Asset URL Tag
# usage: {% asset_url /assets/file.jpg %}

module Jekyll
  class AssetUrlTag < Liquid::Tag

    def initialize(tag_name, url, tokens)
      super
      @url = url.strip
    end

    def render(context)
      site_url = context.registers[:site].config["url"]
      asset_url = "#{site_url}#{@url}"
      asset_url.gsub!(/([^:])\/\//, '\1/')

      "#{asset_url}"
    end
  end
end

Liquid::Template.register_tag('asset_url', Jekyll::AssetUrlTag)

# CDN URL Tag
# usage: {% cdn_url /assets/file.jpg %}
module Jekyll
  class CdnUrlTag < Liquid::Tag

    def initialize(tag_name, url, tokens)
      super
      @url = url
    end

    def render(context)
      cdn_url = context.registers[:site].config["cdn_url"]

      if cdn_url.length == 0
        cdn_url = context.registers[:site].config["asset_path"]
      end

      cdn_url = "#{cdn_url}#{@url}"
      cdn_url.gsub!(/([^:])\/\//, '\1/')

      "#{cdn_url}"
    end
  end
end

Liquid::Template.register_tag('cdn_url', Jekyll::CdnUrlTag)
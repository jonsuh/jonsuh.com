module Jekyll
  class CDNUrl < Liquid::Tag
    def initialize(tag_name, url, tokens)
      super
      @url = url.strip
    end

    def render(context)
      cdn_url = context.environments.first["site"]["cdn_url"]
      %|#{cdn_url}#{@url}|
    end
  end
end

Liquid::Template.register_tag('cdn_url', Jekyll::CDNUrl)
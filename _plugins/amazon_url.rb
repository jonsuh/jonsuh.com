# Amazon URL Tag
# usage: {% amazon_url http://amazon.com/ %}

module Jekyll
  class AmazonUrlTag < Liquid::Tag

    def initialize(tag_name, url, tokens)
      super
      @url = url.strip
    end

    def render(context)
      # amazon_tag = context.environments.first["site"]["amazon_tag"]
      amazon_tag = context.registers[:site].config["amazon_tag"]

      "#{@url}?tag=#{amazon_tag}"
    end
  end
end

Liquid::Template.register_tag('amazon_url', Jekyll::AmazonUrlTag)
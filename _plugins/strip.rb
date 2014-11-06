# Replaces multiple newlines and whitespace 
# between them with one newline

module Jekyll
  class StripTag < Liquid::Block

    def render(context)
      super.gsub(/\s+/, ' ').strip
    end

  end
end

Liquid::Template.register_tag('strip', Jekyll::StripTag)
module Jekyll

  class TagGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'tag'
        site.tags.keys.each do |tag|
          site.data['posts-topics'].each do |topic|
            if tag == topic
              paginate(site, tag)
            end
          end
        end
      end
    end

    def paginate(site, tag)
      posts = site.posts.find_all {|post| post.tags.include?(tag)}.sort_by {|post| -post.date.to_f}
      pages = TagPagination.calculate_pages(posts, site.config['paginate'].to_i)

      (1..pages).each do |page|
        pager = TagPagination.new(site, page, posts, tag, pages)
        dir = File.join('blog/topic/', tag, page > 1 ? "page/#{page}" : '')
        page = TagPage.new(site, site.source, dir, tag)
        page.pager = pager
        site.pages << page
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      self.data['tag'] = tag
      self.data['title'] = "Topic: #{tag.capitalize}"
    end
  end

  class TagPagination < Jekyll::Paginate::Pager 
    attr_reader :tag

    def initialize(site, page, posts, tag, pages = nil)
      @tag = tag
      super site, page, posts, pages
    end

    alias_method :original_to_liquid, :to_liquid

    def to_liquid
      liquid = original_to_liquid
      liquid['tag'] = @tag
      liquid
    end
  end

end
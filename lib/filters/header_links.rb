# encoding: utf-8
require 'nokogiri'

class Header_Links < Nanoc::Filter
  identifier :header_links

  def run(content, params={})
    doc = Nokogiri::HTML(content)
    
    # Find comments.
    # doc.xpath("//comment()").each do |comment|
    #     # Check it's not a conditional comment.
    #     if (comment.content !~ /\A(\[if|\<\!\[endif)/)
    #         comment.remove()
    #     end
    # end

    doc.css("h1, h2, h3, h4, h5, h6").each do |heading|
      if heading['id']!= 'pagetitle'
        heading.add_css_class('linked-header')
        heading.inner_html = "<a class='header-link' href=\"##{heading['id']}\"><i class='fa fa-link'></i></a>#{heading.inner_html}"
      end
    end

    doc.to_html
  end
end

class Nokogiri::XML::Node
  def add_css_class( *classes )
    existing = (self['class'] || "").split(/\s+/)
    self['class'] = existing.concat(classes).uniq.join(" ")
  end
end

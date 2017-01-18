class Insert_Common_Links < Nanoc::Filter
  identifier :insert_common_links

  def run(content, params = {})
    if @config.key?(:commonfilters)
      if !@config[:commonfilters].to_a.empty?
        @config[:commonfilters].each do |commonfilter|
          phrase = commonfilter[:phrase]
          link = "<a href='#{commonfilter[:link]}'>#{commonfilter[:phrase]}</a>"
          content = content.gsub(phrase,link)
        end
      end
      content
    end
  end
end

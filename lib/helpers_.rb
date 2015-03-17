include Nanoc3::Helpers::XMLSitemap
include Nanoc3::Helpers::Rendering
include Nanoc3::Helpers::LinkTo
include Nanoc::Toolbox::Helpers::TaggingExtra
include Nanoc::Toolbox::Helpers::HtmlTag


def example_items
  @items.select { |item| item[:kind] == 'example'}
end

def video_items
  @items.select { |item| item[:kind] == 'video'}
end

def integration_items
  integrations = @items.select { |item| item[:kind] == 'integration'}
  integrations.sort_by { |i| i[:integration_title].downcase }
end




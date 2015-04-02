include Nanoc3::Helpers::XMLSitemap
include Nanoc3::Helpers::Rendering
include Nanoc3::Helpers::LinkTo
include Nanoc::Toolbox::Helpers::TaggingExtra
include Nanoc::Toolbox::Helpers::HtmlTag


# general functions
def example_items
  @items.select { |item| item[:kind] == 'example' && item[:language] == nil }
end

def video_items
  @items.select { |item| item[:kind] == 'video' && item[:language] == nil }
end

def integration_items
  integrations = @items.select { |item| item[:kind] == 'integration' && item[:language] == nil }
  integrations.sort_by { |i| i[:integration_title].downcase }
end

def guide_items
  guides = @items.select{ |item| item[:kind] == 'guide' && item[:language] == nil }
  guides.sort_by { |item| item[:listorder] }
end

# Japanese specific functions
def ja_example_items
  @items.select { |item| item[:kind] == 'example' && item[:language] == 'ja' }
end

def ja_video_items
  @items.select { |item| item[:kind] == 'video' && item[:language] == 'ja' }
end

def ja_integration_items
  integrations = @items.select { |item| item[:kind] == 'integration' && item[:language] == 'ja' }
  integrations.sort_by { |i| i[:integration_title].downcase }
end

def ja_guide_items
  guides = @items.select{ |item| item[:kind] == 'guide' && item[:listorder] != nil && item[:language] == 'ja' }
  guides.sort_by { |item| item[:listorder] }
end

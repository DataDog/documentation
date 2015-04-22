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
  guides = @items.select{ |item| item[:kind] == 'guide' && item[:listorder] != nil && item[:language] == nil }
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
  guides = @items.select{ |item| item[:kind] == 'guide' && item[:listorder] != nil && item[:language] == 'ja' && item[:translation_status] == "complete"}
  guides.sort_by { |item| item[:listorder] }
end

def ja_guide_items_yet
  guides = @items.select{ |item| item[:kind] == 'guide' && item[:listorder] != nil && item[:language] == nil }
  guides_translated = @items.select{ |item| item[:kind] == 'guide' && item[:listorder] != nil && item[:language] == 'ja' && item[:translation_status] == "complete"}

  guides_translated.each do |jp_content|
    guides.each do |en_content|
      if jp_content.identifier.split('/')[-1] == en_content.identifier.split('/')[-1]
        guides.delete(en_content)
        # p jp_content.identifier.split('/')[-1]
      end
    end
  end

  guides.sort_by { |item| item[:listorder] }
end

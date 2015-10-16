require 'autoprefixer-rails'

module DDDocs
  class AutoprefixerFilter < Nanoc::Filter
    identifier :autoprefixer
    type :text
    
    def run(content, params={})
      AutoprefixerRails.process(content, browsers: ["> 5%"])
    end
  end
end

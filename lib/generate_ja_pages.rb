require 'pp'

def generate_ja_pages
  english_pages = (@items.select { |item| !(item.identifier.match('/ja')) && !(item.identifier.match('tipuesearch')) && !(item.identifier.match('/static')) && !(item.identifier.match('images'))}).collect { |item| item.identifier}
  english_pages = english_pages - @config[:redirects].collect{|redirect| redirect[:from]}
  japanese_pages = (@items.select { |item| (item.identifier.match('/ja')) && !(item.identifier.match('/static')) && !(item.identifier.match('images'))}).collect { |item| item.identifier.sub('/ja', '')}

  missingpages = english_pages-japanese_pages

  File.open("autogen_files.log", "w") do |f|
    f.puts(missingpages)
  end

  japanese_prefix = "<div class='alert alert-info'><strong>NOTICE:</strong> アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>\n\n"
  missingpages.each do |page|
    newitem = @items[page]
    content = newitem.raw_content
    newtitle = newitem[:title]
    # puts "************************************************"
    # puts rawcontent
    # puts "************************************************"
    # newitem["language"] = "ja"
    # newitem["translation_status"] = 'original'
    # newitem.identifier = "/ja"+newitem.identifier
    @items << Nanoc::Item.new(
        japanese_prefix + content,
        {
          :translation_status => "original",
          :title => newitem[:title],
          :language => "ja",
          :kind => newitem[:kind],
          :listorder => newitem[:listorder],
          :integration_title => newitem[:integration_title],
          :git_integration_title => newitem[:git_integration_title],
          :wistiaid => newitem[:wistiaid],
          :tags => newitem[:tags],
          :summary => newitem[:summary],
          :binary => false,
          :extension => newitem[:extension]
        },
        "/ja"+newitem.identifier
      )
  end
end

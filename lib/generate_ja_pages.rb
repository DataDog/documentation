require 'pp'

def generate_ja_pages
  english_pages = (@items.select { |item| !(item.identifier.match('/ja')) && !(item.identifier.match('tipuesearch')) && !(item.identifier.match('/static')) && !(item.identifier.match('images')) && !item[:beta]}).collect { |item| item.identifier}
  english_pages = english_pages - @config[:redirects].collect{|redirect| redirect[:from]}
  japanese_pages = (@items.select { |item| (item.identifier.match('/ja')) && !(item.identifier.match('/static')) && !(item.identifier.match('images')) && !(item.identifier.match('/java'))}).collect { |item| item.identifier.sub('/ja', '')}

  missingpages = english_pages-japanese_pages

  if $jpassist then
    File.open("autogen_files.log", "w") do |f|
      f.puts(missingpages)
    end
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

def list_update_pages
  current_dir = File.split(File.expand_path(__FILE__))[0]
  dir = current_dir.split('/')
  dir.slice!(-1,1)
  dir.push('content', 'ja')
  ja_dir_path = dir.join('/')

  base_pages = (@items.select { |item| (item.identifier.match('/ja')) && !(item.identifier.match('/static')) && !(item.identifier.match('images')) && !(item.identifier.match('videos')) && !(item.identifier.match('sitemap')) && !(item.identifier.match('integrations')) && !(item.identifier.match('examples')) && !(item.identifier.match('api')) && !(item.identifier.match('/java')) && !(item.identifier.match('api')) && !(item.identifier.match('error'))}).collect { |item| item.identifier.sub('/ja', ja_dir_path)}

  File.open('updated_files.txt', 'w+') do |f|
    base_pages.each do |page|
      page = page.chop! + '.md'
      begin
        if File.ftype(page) != 'directory' then
          begin
            jp_timestamp = File.mtime(page)
            en_page = page.split('/') - ['ja']
            en_file_path = en_page.join('/')
            en_timestamp = File.mtime(en_file_path)
            td = en_timestamp - jp_timestamp
            if td > 0 then
              f.puts(en_file_path)
              f.puts("[updated]\n\n")
            end
          rescue
            f.puts(en_file_path)
            f.puts("[mtime error, file may not be '.md'] \n\n")
          end
        end
      rescue
        f.puts(page)
        f.puts("[file not exist]\n\n")
      end
    end
  end
end


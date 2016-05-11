require 'octokit'
require 'base64'
require 'typhoeus'
require 'fileutils'
# require 'yaml'

module Nanoc::DataSources
  class ReleaseNotes < Nanoc::DataSource
    identifier :relnotes


    def store_filename
      'github_release_notes_items'
    end

    def get_release_notes()
      if ENV.has_key?('github_personal_token')
        $client = $client ||= Octokit::Client.new(:access_token => ENV['github_personal_token'])
        $client.user.login
      end
      rnrepo = "datadog/Release-Notes"
      release_note_list =$client.contents(rnrepo, :path => "/")
      images_list = $client.contents(rnrepo, :path => "/images/")
      release_notes = []

      release_note_list.each do |rnlist_entry|
        if rnlist_entry.type =='file' && rnlist_entry.name.end_with?('.yaml')
          next_release_note = YAML.load(Base64.decode64($client.contents(rnrepo, :path => "/#{rnlist_entry.path}").content))

          next_release_note = {rnlist_entry.name[0..-6].to_s => next_release_note}
          release_notes << next_release_note
        end
      end

      hydra = Typhoeus::Hydra.new(max_concurrency: 5)
      unless File.directory?("content/static/images/rn")
        FileUtils.mkdir_p("content/static/images/rn")
      end
      images_list.each do |image|
        unless image[:name] == ".DS_Store"
          request = Typhoeus::Request.new image[:download_url]
          request.on_complete do |response|
            open("content/static/images/rn/#{image[:name]}", "wb") do |file|
              file << response.body
            end
          end
          hydra.queue request
        end
      end
      hydra.run

      return release_notes
    end

    def get_individual_items(releasenoteitems)
      individual_items = []
      releasenoteitems.each do |releasenote|
        releasenote.each do |rndate, categoryvalue|
          categoryvalue.each do |rncategory, categorycontent|
            categorycontent.each do |item|
              item.each do |itemtitle, itemcontent|
                if itemcontent["Private"] != true
                  individual_items << {"Title" => itemtitle, "Category" => rncategory, "Private" => itemcontent["Private"],  "Text" => itemcontent["Text"], "Image" => itemcontent["Image"], "AssociatedIntegration"=>itemcontent["AssociatedIntegration"], "Date" => rndate, "Slugline" => itemcontent["Slugline"]}
                end
              end
            end
          end
        end
      end
      return individual_items
    end

    def write_items(items)
      File.open(store_filename, 'a') do |f|
        Marshal.dump(items, f)
      end
    end

    def format_release_note(rnitem)
      output = ""
      begin
        rnitem.values[0].each do |category|
          output+= "\#\# #{category[0]}\n\n"
          category[1].each do |individual_item|
            if individual_item.values[0]["Private"]==false
              text = individual_item.values[0]["Text"]
              text = "<p markdown='1'>" + text.gsub(/\n/, '</p><p markdown="1">') + "</p>"
              output += "\#\#\# #{individual_item.keys[0]}\n\n"
              output += "#{text}\n\n"
              if individual_item.values[0].key?("Image")
                output += "![#{individual_item.values[0]['Image'][0]}](/static/images/rn/#{individual_item.values[0]['Image'][0]})" +"\n\n"
              end
            end
          end
        end
      rescue StandardError => err
        pp "error in release note formatting #{rnitem.keys[0]} - #{err}"
      end
      return output
    end

   def format_raw_release_note(rnitem)
      output = ""
      begin
        rnitem.values[0].each do |category|
          output+= "\#\# #{category[0]}\n\n"
          category[1].each do |individual_item|
            if individual_item.values[0]["Private"]==false
              text = individual_item.values[0]["Text"]
              output += "\#\#\# #{individual_item.keys[0]}\n\n"
              output += "slugline: #{individual_item.values[0]['Slugline']}\n\n"
              output += "#{text}\n\n"
              if individual_item.values[0].key?("Image")
                output += "![#{individual_item.values[0]['Image'][0]}](/static/images/rn/#{individual_item.values[0]['Image'][0]})" +"\n\n"
              end
            end
          end
        end
      rescue StandardError => err
        pp "error in release note formatting #{rnitem.keys[0]} - #{err}"
      end
      return output
    end

    def items
      if File.exist?(store_filename)
        rnitems = Marshal.load(File.binread(store_filename))
      else
        rnitems = get_release_notes()
        write_items(rnitems)
      end
      individual_items = get_individual_items(rnitems)
      finisheditems = []
      rnitems.each do |rnitem|
        date = DateTime.strptime(rnitem.keys[0], '%m%d%Y').strftime("%B %-d, %Y")
        finisheditems << Nanoc::Item.new(format_release_note(rnitem), {"content" => rnitem.values[0], "title" => "Release Notes for #{date}", "date"=>rnitem.keys[0], "created_at" => date, "kind" => "releasenote"}, "RN-#{rnitem.keys[0]}")
        finisheditems << Nanoc::Item.new(format_raw_release_note(rnitem), {"content" => rnitem.values[0], "title" => "Release Notes for #{date}", "date"=>rnitem.keys[0], "created_at" => date, "kind" => "rawreleasenote", "is_hidden" => true}, "raw-#{rnitem.keys[0]}")
      end
      individual_items.each do |iitem|
        finisheditems << Nanoc::Item.new(iitem["Text"], {"title" => iitem["Title"], "kind" => "individualupdate", "category" => iitem["Category"], "image" => iitem["Image"], "AssociatedIntegration" => iitem["AssociatedIntegration"], "date" => iitem["Date"]}, "i-#{iitem["Date"]}-#{iitem["Title"]}")
      end
      return finisheditems
    end
  end
end

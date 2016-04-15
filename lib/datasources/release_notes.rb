require 'octokit'

module Nanoc::DataSources
  class ReleaseNotes < ::Nanoc::DataSource
    identifier :relnotes

    def up
    end

    def items
      load_items.map do |item|
        Nanoc::Item.new(item[:content], item[:attributes], item[:identifier])
      end
    end

    def update
      print "xxxxxxxxxxxxxxxxxxxxxxxxxxxx in rn update xxxxxxxxxxxxxxxxxxxxxxxxxxx"
      if ENV.has_key?('github_personal_token')
        $client = $client ||= Octokit::Client.new(:access_token => ENV['github_personal_token'])
        $client.user.login
      end
      items = []
      rnitems = get_release_notes_from_git
      rnitems.map do |rnitem|
        items<<parse_main_item(rnitem)
      end
      write_items(items)
    end

    def store_filename
      'github_release_notes_items.yaml'
    end

    def load_items

      unless File.exists?(store_filename)
        update
      end
      @items ||= File.exists?(store_filename) ? YAML.load_file(store_filename) : []
    end

    def write_items(items)
      print "************************** in rn write items**********************"
      File.open(store_filename, 'w') do |f|
        YAML.dump(items, f)
      end
    end

    def parse_main_item(rnitem)
      rnitem.map do |categoryname, citem|
        parse_category_item(categoryname, citem)
      end
      content = %{ReleaseNotes #{rnitem}}
      attributes = {
        date: rnitem['date'],
        kind: 'releasenote'
      }

      items<< {:content => content, :attributes => attributes, :identifier => "RN-#{rnitem['date']}"}
    end

    def parse_category_item(categoryname, citem)
      # print "#{categoryname} -  #{citem}"
      content = %{Category Item #{citem}}
      attributes = {
        kind: 'releasenotecategory'
      }

      write_items({:content => content, :attributes => attributes, :identifier => "#{categoryname}"})

    end

    def parse_integration_item

    end
  end
end

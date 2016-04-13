require 'octokit'

class ReleaseNotes < ::Nanoc::DataSource
  identifier :relnotes

  def up

  end

  def items
    print "in rn items"
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
    rnitems = github_release_notes_items
    rnitems.map do |rnitem|
      content = %{ReleaseNotes #{rnitem}}
      attributes = {
        date: rnitem['date'],
        kind: 'releasenote'
      }
      items << {:content => content, :attributes => attributes, :identifier => "RN-#{rnitem['date']}"}
    end
    write_items(items)
  end

  def store_filename
    'github_release_notes_items.yaml'
  end

  def load_items
    print "in rn load items"
    @items || File.exists?(store_filename) ? YAML.load_file(store_filename) : []
  end

  def write_items(items)
    print "************************** in rn write items**********************"
    File.open(store_filename, 'w') do |f|
      YAML.dump(items, f)
    end
  end
end

require 'octokit'
require 'base64'
require 'yaml'

require './lib/default.rb'

def get_release_notes_from_git
  print "in get release_notes"
  release_note_repo = "datadog/testrn"
  release_notes = []
  release_note_list = $client.contents(release_note_repo, :path => "/")
  release_note_list.each do |rnlist_entry|
    if rnlist_entry.type =='file' && rnlist_entry.name.end_with?('.yaml')
      next_release_note = YAML.load(Base64.decode64($client.contents(release_note_repo, :path => "/#{rnlist_entry.path}").content))
      next_release_note["date"] = rnlist_entry.name[0..-6]

      release_notes << next_release_note
      # release_notes["#{rnlist_entry.name[0..-4]}"] << next_release_note
    end
  end
  return release_notes
end



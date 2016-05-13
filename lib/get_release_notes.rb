require 'octokit'
require 'base64'
require 'yaml'

require './lib/default.rb'

# def get_release_notes_from_git
#   print "in get release_notes"
#   source_release_notes_file_name = "ReleaseNotesSource.yaml"
#   release_note_repo = "technovangelist/Release-Notes"

#   if File.exist?(source_release_notes_file_name)
#     release_notes = YAML.load_file(source_release_notes_file_name)
#   else
#     release_notes = []
#     release_note_list = $client.contents(release_note_repo, :path => "/")
#     release_note_list.each do |rnlist_entry|
#       # pp rnlist_entry
#       if rnlist_entry.type =='file' && rnlist_entry.name.end_with?('.yaml')
#         next_release_note = YAML.load(Base64.decode64($client.contents(release_note_repo, :path => "/#{rnlist_entry.path}").content))
#         next_release_note = {rnlist_entry.name[0..-6].to_s => next_release_note}
#         # pp next_release_note
#         release_notes << next_release_note

#         # release_notes["#{rnlist_entry.name[0..-4]}"] << next_release_note
#       end
#     end

#     # pp "01010101010101010101010101010101010101010"
#     # pp release_notes
#     # pp "29292929292929292929292929292929292929292"

#     File.open(source_release_notes_file_name, 'w') do |f|
#       YAML.dump(release_notes, f)
#     end

#   end
#   # pp release_notes
#   pp "complete release notes"
#   return release_notes
# end



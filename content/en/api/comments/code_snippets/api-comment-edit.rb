require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'
comment_id = "1382579089039712607"

dog = Dogapi::Client.new(api_key, app_key)

# Update a comment.
dog.update_comment(comment_id, :message => "I've changed my mind again")
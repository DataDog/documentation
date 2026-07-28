require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# submitting events doesn 't require an application_key,
# so we don't bother setting it
dog = Dogapi::Client.new(api_key)

dog.emit_event(Dogapi::Event.new('msg_text', :msg_title => 'Title'))

# If you are programmatically adding a comment to this new event
# you might want to insert a pause of.5 - 1 second to allow the
# event to be available.
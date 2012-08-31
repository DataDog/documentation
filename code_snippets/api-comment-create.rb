require 'rubygems'
require 'dogapi'

api_key='9775a026f1ca7d1c6c5af9d94d9595a4'
app_key='87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

dog = Dogapi::Client.new(api_key, app_key)

# Make a comment.
dog.comment("I have something to say.")

# Make a comment as a particular user.
dog.comment("Bob does too.", :handle => "bob@example.com")

# Reply to a comment
dog.comment("Its rebuttal time.", :related_event_id => "1234")

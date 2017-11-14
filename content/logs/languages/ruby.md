---
title: Ruby on Rails log Collection
kind: documentation
autotocdepth: 2
customnav: lognav
beta: true
---

We are going to use `lograge` here as it'll help us bringing some sanity in logs that are noisy and hardly parseable. 

Instead of having a Rail logging output like this:

```
Started GET "/" for 127.0.0.1 at 2012-03-10 14:28:14 +0100
Processing by HomeController#index as HTML
  Rendered text template within layouts/application (0.0ms)
  Rendered layouts/_assets.html.erb (2.0ms)
  Rendered layouts/_top.html.erb (2.6ms)
  Rendered layouts/_about.html.erb (0.3ms)
  Rendered layouts/_google_analytics.html.erb (0.4ms)
Completed 200 OK in 79ms (Views: 78.8ms | ActiveRecord: 0.0ms)
```

You get a single log line with all the important information, like this:

```
method=GET path=/jobs/833552.json format=json controller=jobs action=show status=200 duration=58.33 view=40.43 db=15.26
```

**To send your logs to Datadog, we recommend to log into a file and then to monitor this file with your Datadog agent.**

## Setup - Log to file
### Adding the GEMs
Add the 2 following GEMs in your project:

```ruby
gem 'logging-rails', :require => 'logging/rails'
gem 'lograge'
```

###Configure Lograge
In your configuration file, set the following:

```ruby
# Lograge config
config.lograge.enabled = true

# We are asking here to log in RAW (which are actually ruby hashes). The Ruby logging is going to take care of the JSON formatting.
config.lograge.formatter = Lograge::Formatters::Raw.new

# This is is useful if you want to log query parameters
config.lograge.custom_options = lambda do |event|
    { :@marker => ["sourcecode", "ruby", "rails"],
      :params => event.payload[:params].reject { |k| %w(controller action).include? k }
    }
end
```

**Note**:You can also ask Lograge to add contextual information to your logs. Please refer to the official doc if you are interested: [Lograge documentation](https://github.com/roidrage/lograge#installation)

### Disable log coloration
As it would be weirdly displayed in your Datadog application please disable your log coloration:

```ruby
config.colorize_logging = false
```


Now let's configure `logging-rails` that is going to convert everything in JSON format.

### Configuring the logging-rail gem
If this is not already done, type the following command:

```shell
rails generate logging:install
```

That generates the `logging.rb` with default configuration inside that we are going to adapt.

First of all, we are going to log everything in JSON format. So change `:inspect` into `:json` this in the first lines of the file `logging.rb`:

```ruby
# Objects will be converted to strings using the :inspect method.
  Logging.format_as :json
```

Then finally, defines the JSON layout and associate it to the appender you'll going to use to transfer the data to Datadog:

```ruby
# The JSON layout
json_layout = Logging.layouts.json

# For instance, a file appender that'll going to be forwarder by a syslog agent to Logmatic.io
Logging.appenders.file(
    'logmatic',
    :filename => config.paths['log'].first,
    :layout => json_layout
)
```

If you want to tweak the log layout, all items available can be found directly from the [source repository](https://github.com/TwP/logging/blob/master/lib/logging/layouts/parseable.rb#L100)

### Configure your Datadog agent.

Create a `ruby.yaml` file in your `conf.d/` folder with the following content:

```yaml
init_config:

instances:
    [{}]
    
#Log section
logs:

    # - type : (mandatory) type of log input source (tcp / udp / file)
    #   port / path : (mandatory) Set port if type is tcp or udp. Set path if type is file
    #   service : (mandatory) name of the service owning the log
    #   source : (mandatory) attribute that defines which integration is sending the logs
    #   sourcecategory : (optional) Multiple value attribute. Can be used to refine the source attribtue
    #   tags: (optional) add tags to each logs collected

  - type: file
    path: /path/to/your/ruby/log.log
    service: ruby
    source: ruby
    sourcecategory: sourcecode
```

That's it! Now, all the rails calls are going to be in proper JSON automatically understood by your Datadog application.

## Further Reading
### Good logging practices in your application

Now that your logging configuration is sending proper JSON, you should exploit it as much as you can.

A logging practice is to bring as much context (user, session, action, metrics, etc...) to every line of log you send.
To do so you can actually instead of logging simple string messages you should log hashes as shown in the following example:

```ruby
my_hash = {'user' => '1234', 'button_name'=>'save','message' => 'User 1234 clicked on button saved'};
logger.info(my_hash);
```

The hash is going to get converted into JSON and you'll then be able to do analytics over `user` and `button_name`:

```json
{
    "timestamp":"2016-01-12T19:15:18.683575+01:00",
    "level":"INFO",
    "logger":"WelcomeController",
    "message": {
        "user":"1234",
        "button_name":"save",
        "message":"User 1234 clicked on button saved"
            }
}
```

### RocketPant's suggested logging configuration

In the file `config/initializers/lograge_rocketpants.rb ` (it can change depending on your project):

```ruby
# Configure Lograge to work with rocket_pants' controllers      
#       
# Come from here:       
#   https://github.com/Sutto/rocket_pants/issues/111        
#       
app = Rails.application
if app.config.lograge.enabled
  ActiveSupport::LogSubscriber.log_subscribers.each do |subscriber|
    case subscriber
      when ActionController::LogSubscriber
        Lograge.unsubscribe(:rocket_pants, subscriber)
    end
  end
  Lograge::RequestLogSubscriber.attach_to :rocket_pants
end
```

### Grape's suggested logging configuration

Add the grape_logging gem:

```ruby
gem 'grape_logging', git: "git://github.com/guizmaii/grape_logging.git", branch: "master"
```

Pass additional configuration to Grape:

```ruby
use GrapeLogging::Middleware::RequestLogger,
      instrumentation_key: 'grape', # (cette clé devra matcher avec la config du point 2.3)
      include: [ GrapeLogging::Loggers::Response.new,
                 GrapeLogging::Loggers::DatabaseTime.new,
                 GrapeLogging::Loggers::FilterParameters.new ]
```

Create the `config/initializers/instrumentation.rb` file and add the following configuration:

```ruby
# Subscribe to grape request and log with a logger dedicated to Grape
grape_logger = Logging.logger['Grape']
ActiveSupport::Notifications.subscribe('grape') do |name, starts, ends, notification_id, payload|
    grape_logger.info payload
end
```

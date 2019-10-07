---
title: Ruby on Rails log collection
kind: documentation
aliases:
  - /logs/languages/ruby
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "/logs/faq/log-collection-troubleshooting-guide"
  tag: "FAQ"
  text: "Log Collection Troubleshooting Guide"
---

It's recommended to use `lograge` here as it helps to bring some sanity to logs that are noisy and hardly parseable. When setting up logging with Ruby, make sure to keep in mind the [reserved attributes][1].

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

After lograge formating you get a single log line with all the important information, like this:

```
method=GET path=/jobs/833552.json format=json controller=jobs action=show status=200 duration=58.33 view=40.43 db=15.26
```

And the final result in JSON:

```
{
  "timestamp":"2016-01-12T19:15:19.118829+01:00",
  "level":"INFO",
  "logger":"Rails",
  "method":"GET",
  "path":"/jobs/833552.json",
  "format":"json",
  "controller":"jobs",
  "action":"show",
  "status":200,
  "duration":58.33,
  "view":40.43,
  "db":15.26
}
```

**To send your logs to Datadog, we recommend logging to a file and then tailing that file with your Datadog Agent.**

## Adding the GEMs
Add the 2 following GEMs in your project:

```ruby
gem 'logging-rails', :require => 'logging/rails'
gem 'lograge'
```

## Configure Lograge
In your configuration file, set the following:

```ruby
# Lograge config
config.lograge.enabled = true

# We are asking here to log in RAW (which are actually ruby hashes). The Ruby logging is going to take care of the JSON formatting.
config.lograge.formatter = Lograge::Formatters::Raw.new

# This is useful if you want to log query parameters
config.lograge.custom_options = lambda do |event|
    { :ddsource => ["ruby"],
      :params => event.payload[:params].reject { |k| %w(controller action).include? k }
    }
end
```

**Note**:You can also ask Lograge to add contextual information to your logs. Refer to the official doc if you are interested: [Lograge documentation][2]

## Disable log coloration
As it would be weirdly displayed in your Datadog application, disable your log coloration:

```ruby
config.colorize_logging = false
```

Now let's configure `logging-rails` that is going to convert everything in JSON format.

## Configuring the logging-rail gem
If this is not already done, type the following command:

```shell
rails generate logging:install
```

That generates the `logging.rb` with default configuration inside that we are going to adapt.

First of all, we are going to log everything in JSON format. So change `:inspect` into `:json` this in the first lines of the file `logging.rb`:

```ruby
# Objects are converted to strings using the :inspect method.
  Logging.format_as :json
```

Then finally, defines the JSON layout and associate it to the appender you'll going to use to transfer the data to Datadog:

```ruby
# The JSON layout
json_layout = Logging.layouts.json

# For instance, a file appender that'll going to be forwarder by a syslog Agent to Datadog
Logging.appenders.file(
    'datadog',
    :filename => config.paths['log'].first,
    :layout => json_layout
)
```

If you want to tweak the log layout, all items available can be found directly from the [source repository][3]

## Configure your Datadog Agent.

Create a `ruby.d/conf.yaml` file in your `conf.d/` folder with the following content:

```yaml
##Log section
logs:

    ## - type : file (mandatory) type of log input source (tcp / udp / file)
    ##   port / path : (mandatory) Set port if type is tcp or udp. Set path if type is file
    ##   service : (mandatory) name of the service owning the log
    ##   source : (mandatory) attribute that defines which integration is sending the logs
    ##   sourcecategory : (optional) Multiple value attribute. Can be used to refine the source attribute
    ##   tags: (optional) add tags to each logs collected

  - type: file
    path: /path/to/your/ruby/log.log
    service: ruby
    source: ruby
    sourcecategory: sourcecode
    # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
    #log_processing_rules:
    #  - type: multi_line
    #    name: new_log_start_with_date
    #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

That's it! Now, all the rails calls are going to be in proper JSON automatically understood by your Datadog application.

## Further Reading

### Inject trace IDs in your logs

If APM is enabled for this application and you wish to improve the correlation between application logs and traces, [follow these instructions][4] to automatically add trace and span ids in your logs.

Once this is done, the log should have the following (for JSON format):

```json
{
  "timestamp":"2016-01-12T19:15:19.118829+01:00",
  "level":"INFO",
  "logger":"Rails",
  "message": {
    "method":"GET",
    "path":"/jobs/833552.json",
    "format":"json",
    "controller":"jobs",
    "action":"show",
    "status":200,
    "duration":58.33,
    "view":40.43,
    "db":15.26,
    "dd":{
      "trace_id":7290723543738956761,
      "span_id":8140992452225855633
    },
    "ddsource": ["ruby"],
    "params":{}
  }
}
```

Then [configure the Datadog Agent](#configure-your-datadog-agent) to collect ruby logs from the file.

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
gem 'grape_logging'
```

Pass additional configuration to Grape:

```ruby
use GrapeLogging::Middleware::RequestLogger,
      instrumentation_key: 'grape',
      include: [ GrapeLogging::Loggers::Response.new,
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

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/logs/?tab=ussite#reserved-attributes)
[2]: https://github.com/roidrage/lograge#installation
[3]: https://github.com/TwP/logging/blob/master/lib/logging/layouts/parseable.rb#L100
[4]: /tracing/advanced/connect_logs_and_traces/?tab=ruby

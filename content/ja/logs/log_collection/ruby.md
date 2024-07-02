---
title: Ruby on Rails Log Collection
kind: documentation
aliases:
  - /logs/languages/ruby
further_reading:
- link: "https://github.com/roidrage/lograge"
  tag: ソースコード
  text: Lograge Documentation
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Learn how to process your logs
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: Log Collection Troubleshooting Guide
- link: "https://www.datadoghq.com/blog/managing-rails-application-logs/"
  tag: Blog
  text: How to collect, customize, and manage Rails application logs
- link: "https://www.datadoghq.com/blog/log-file-control-with-logrotate/"
  tag: Blog
  text: How to manage log files using logrotate
- link: "/glossary/#tail"
  tag: Glossary
  text: Glossary entry for "tail"  
---

## Overview

To send your logs to Datadog, log to a file with [`Lograge`][1] and [tail][11] this file with your Datadog Agent. When setting up logging with Ruby, keep in mind the [reserved attributes][2].

Using Lograge, you can transform the standard text-based log format, like in this example:

```text
Started GET "/" for 127.0.0.1 at 2012-03-10 14:28:14 +0100
Processing by HomeController#index as HTML
  Rendered text template within layouts/application (0.0ms)
  Rendered layouts/_assets.html.erb (2.0ms)
  Rendered layouts/_top.html.erb (2.6ms)
  Rendered layouts/_about.html.erb (0.3ms)
  Rendered layouts/_google_analytics.html.erb (0.4ms)
Completed 200 OK in 79ms (Views: 78.8ms | ActiveRecord: 0.0ms)
```

To the following JSON format of the log, which provides more structure:

```json
{
  "timestamp": "2016-01-12T19:15:19.118829+01:00",
  "level": "INFO",
  "logger": "Rails",
  "method": "GET",
  "path": "/jobs/833552.json",
  "format": "json",
  "controller": "jobs",
  "action": "show",
  "status": 200,
  "duration": 58.33,
  "view": 40.43,
  "db": 15.26
}
```

## Install and configure your logger

{{< tabs >}}
{{% tab "Lograge" %}}

1. Add the `lograge` gem to your project:
    ```ruby
    gem 'lograge'
    ```
2. In your configuration file, set the following to configure Lograge:
    ```ruby
    # Lograge config
    config.lograge.enabled = true

    # This specifies to log in JSON format
    config.lograge.formatter = Lograge::Formatters::Json.new

    ## Disables log coloration
    config.colorize_logging = false

    # Log to a dedicated file
    config.lograge.logger = ActiveSupport::Logger.new(Rails.root.join('log', "#{Rails.env}.log"))

    # This is useful if you want to log query parameters
    config.lograge.custom_options = lambda do |event|
        { :ddsource => 'ruby',
          :params => event.payload[:params].reject { |k| %w(controller action).include? k }
        }
    end
    ```
    **Note**: Lograge can also add contextual information to your logs. See the [Lograge documentation][1] for more details.

For a more in-depth example of this setup, see [How to collect, customize, and manage Rails application logs][2].

### RocketPants

To configure Lograge for `rocket_pants` controllers, in the `config/initializers/lograge_rocketpants.rb` file (the location can vary depending on your project):

```ruby
# Come from here:
#   https://github.com/Sutto/rocket_pants/issues/111
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

[1]: https://github.com/roidrage/lograge#installation
[2]: https://www.datadoghq.com/blog/managing-rails-application-logs
{{% /tab %}}
{{% tab "Grape" %}}

1. Add the `grape_logging` gem to your project:

    ```ruby
    gem 'grape_logging'
    ```
2. Add the additional configuration to Grape:

    ```ruby
    use GrapeLogging::Middleware::RequestLogger,
          instrumentation_key: 'grape',
          include: [ GrapeLogging::Loggers::Response.new,
                    GrapeLogging::Loggers::FilterParameters.new ]
    ```
3. Create the `config/initializers/instrumentation.rb` file and add the following configuration:

    ```ruby
    # Subscribe to grape request and log with a logger dedicated to Grape
    grape_logger = Logging.logger['Grape']
    ActiveSupport::Notifications.subscribe('grape') do |name, starts, ends, notification_id, payload|
        grape_logger.info payload
    end
    ```

{{% /tab %}}
{{< /tabs >}}
## Configure the Datadog Agent

Once [log collection is enabled][3], do the following to set up [custom log collection][4] to tail your log files and send them to Datadog.

1. Create a `ruby.d/` folder in the `conf.d/` [Agent configuration directory][5]. 
2. Create a `conf.yaml` file in `ruby.d/` with the following content:
    ```yaml
      logs:
        - type: file
          path: "<RUBY_LOG_FILE_PATH>.log"
          service: <SERVICE_NAME>
          source: ruby
          sourcecategory: sourcecode
          ## Uncomment the following processing rule for multiline logs if they
          ## start by the date with the format yyyy-mm-dd
          #log_processing_rules:
          #  - type: multi_line
          #    name: new_log_start_with_date
          #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
4. [Restart the Agent][6].
5. Run the [Agent's status subcommand][8] and look for `ruby` under the `Checks` section to confirm that logs are successfully submitted to Datadog.

If logs are in JSON format, Datadog automatically [parses the log messages][9] to extract log attributes. Use the [Log Explorer][10] to view and troubleshoot your logs.

## Connect logs and traces

If APM is enabled for this application, you can improve the connection between application logs and traces by following the [APM Ruby logging instructions][7] to automatically add trace and span IDs in your logs.

## Best practices

Add additional context (user, session, action, and metrics) to your logs when possible.

Instead of logging simple string messages, you can use log hashes as shown in the following example:

```ruby
my_hash = {'user' => '1234', 'button_name'=>'save','message' => 'User 1234 clicked on button saved'};
logger.info(my_hash);
```

The hash is converted into JSON and you can carry out analytics for `user` and `button_name`:

```json
{
  "timestamp": "2016-01-12T19:15:18.683575+01:00",
  "level": "INFO",
  "logger": "WelcomeController",
  "message": {
    "user": "1234",
    "button_name": "save",
    "message": "User 1234 clicked on button saved"
  }
}
```
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/roidrage/lograge
[2]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
[3]: /agent/logs/?tab=tailfiles#activate-log-collection
[4]: /agent/logs/?tab=tailfiles#custom-log-collection
[5]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /agent/configuration/agent-commands/#restart-the-agent
[7]: /tracing/other_telemetry/connect_logs_and_traces/ruby/
[8]: /agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[9]: /logs/log_configuration/parsing
[10]: /logs/explorer/
[11]: /glossary/#tail

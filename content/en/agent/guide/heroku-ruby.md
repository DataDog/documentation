---
title: Instrumenting a Ruby on Rails application on Heroku with Datadog
kind: guide
further_reading:
- link: "/agent/basic_agent_usage/heroku/"
  tag: "Documentation"
  text: "Heroku Buildpack"
---

Heroku is a very popular platform within Ruby developers and, more specifically, Ruby on Rails developers. Datadog supports Heroku and Ruby, so you are able to send your Heroku Ruby application metrics, logs, and traces to Datadog.

This guide walks you through the necessary steps to take a Rails application deployed to Heroku and get metrics, integrations data, logs, and traces sent to Datadog.

# Prerequisites

To follow this guide we assume the following:

You already have a Datadog account. If you don’t have one, you can [sign up for a free trial](https://www.datadoghq.com/free-datadog-trial/).
You already have a Heroku account. If you don’t have one, you can [sign up for their free tier](https://signup.heroku.com/).
You have [Git](https://git-scm.com/downloads) installed on your local system.
You have the [Heroku CLI tool](https://devcenter.heroku.com/articles/heroku-cli) installed on your local system.


# Creating your Heroku application and deploying the sample Ruby application

For this guide we are going to be using [Heroku’s Rails sample application](https://github.com/heroku/ruby-getting-started). This is a barebone Rails application that goes along their [Starting With Ruby article](https://devcenter.heroku.com/articles/getting-started-with-ruby). In that article you can get more detailed information about how to deploy a Ruby application in Heroku. In the present one we are going to be focusing on getting our application instrumented with Datadog.

The sample application has a dependency pg which will only resolve if you have [Postgres installed locally](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup). Please install Postgres before you proceed.
You will know that Postgres is installed successfully when the command which psql returns a value on your command line (though your actual output may vary):
```shell
which psql
/usr/local/bin/psql
```

We are going to get the code from the sample application and deploy it, as it is, to a new Heroku application. 

```shell
# Decide a name for your application and export it as an environment variable
# (In our case we will be choosing ruby-heroku-datadog)
export APPNAME=ruby-heroku-datadog

# Get the sample application code
git clone https://github.com/heroku/ruby-getting-started.git
cd ruby-getting-started

# Login into Heroku
heroku login

# Create a new application
heroku create -a $APPNAME

# Deploy to Heroku
git push heroku main

# Open the application to check that it works
heroku open -a $APPNAME
```

Your default browser will open with the sample application. You should see something similar to this UI:

{{< img src="agent/guide/heroku_ruby/sample_app.png" alt="Heroku Ruby sample application" >}}

# Connecting your Datadog account to your application and deploying the Datadog agent

The first step to get full observability into your Heroku application with Datadog is to deploy the Datadog agent and connect it to your Datadog account.

The way Datadog identifies your account is with an API key. [Log into your Datadog account](https://app.datadoghq.com) and navigate to the [API keys section](https://app.datadoghq.com/account/settings#api). Copy your API key:

{{< img src="agent/guide/heroku_ruby/apikey.png" alt="Datadog API keys section" >}}

We will now deploy the Datadog agent into our application. We will do this using the [Datadog Heroku Buildpack](https://docs.datadoghq.com/agent/basic_agent_usage/heroku/). You can learn more about [Heroku Buildpacks](https://devcenter.heroku.com/articles/buildpacks) and what they do in their official documentation.

```shell
# Enable Heroku Labs Dyno Metadata to set HEROKU_APP_NAME env variable automatically
heroku labs:enable runtime-dyno-metadata -a $APPNAME

# Set hostname in Datadog as appname.dynotype.dynonumber for metrics continuity
heroku config:add DD_DYNO_HOST=true

# Add this buildpack and set your Datadog API key
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
heroku config:add DD_API_KEY=$DD_API_KEY

# Deploy to Heroku forcing a rebuild
git commit --allow-empty -m "Rebuild slug"
git push heroku main
```

Once the build finishes, the Datadog agent is now running in your application. Run the Datadog agent status as explained in the [appendix section](#appendix-getting-the-datadog-agent-status) to make sure everything is running correctly. You should look out for the following section:

```shell
[...]
  API Keys status
  ===============
    API key ending with 68306: API Key valid

[...]
```

That output will tell us that the Datadog agent is running in our Heroku application and successfully linked to our Datadog account.

If we open now the [Host Map in Datadog](https://app.datadoghq.com/infrastructure/map?fillby=avg%3Adatadog.heroku_agent.running&filter=dyno%3Aweb.1) we can see that our dyno is reporting correctly in Datadog:

{{< img src="agent/guide/heroku_ruby/dyno_host.png" alt="Datadog Host Map" >}}

# Setting up integrations

Datadog comes with more than 400 turn-key integrations that collect metrics from different tech stacks. The Datadog buildpack allows you to enable these integrations for your Heroku application.

Heroku adds a Postgres database through an addon for every Rails application that gets deployed to Heroku. Let’s check that our application has the Postgres addon enabled:

 ```shell
heroku addons -a $APPNAME
```
You should get the following output:


```shell
Add-on                                         Plan       Price  State
─────────────────────────────────────────────  ─────────  ─────  ───────
heroku-postgresql (postgresql-infinite-14462)  hobby-dev  free   created
 └─ as DATABASE

The table above shows add-ons and the attachments to the current app (ruby-heroku-datadog) or other apps.
```

Our example application already uses that database in its code, but we haven’t created the tables yet. Let’s do that:

```shell
heroku run rake db:migrate -a $APPNAME
```

```shell
Running `rake db:migrate` attached to terminal... up, run.3559
Migrating to CreateWidgets (20140707111715)
== 20140707111715 CreateWidgets: migrating ====================================
-- create_table(:widgets)
   -> 0.0244s
== 20140707111715 CreateWidgets: migrated (0.0247s) ===========================
```

Now we can successfully visit the `/widgets` endpoint of your application, which uses that database.

Let’s enable the Postgres Datadog integration.

The first thing that we will need to do is to retrieve the database credentials from Heroku

```shell
# Enter in the psql terminal
heroku pg:credentials:url DATABASE -a $APPNAME
```

Integrations are enabled in a particular way when using the Datadog buildpack. You can learn how to enable any of the integrations in [the buildpack documentation](https://docs.datadoghq.com/agent/basic_agent_usage/heroku/#enabling-integrations). 

Create a `datadog/conf.d` folder at the root of our application:

```shell
# Ensure that you are in the root directory of your application
cd ruby-getting-started

# Create the folder for the integrations configuration in your application code
mkdir -p datadog/conf.d/
```

Create a configuration file called `postgres.yaml` replacing with your host, dbname, username and password with the information you got in the previous command:

```yaml
   init_config:

   instances:
     ## @param host - string - required
     ## The hostname to connect to.
     ## NOTE: Even if the server name is "localhost", the agent connects to
     ## PostgreSQL using TCP/IP, unless you also provide a value for the sock key.
     #
     - host: "<HOST>"

       ## @param port - integer - required
       ## Port to use when connecting to PostgreSQL.
       #
       port: 5432

       ## @param user - string - required
       ## Datadog Username created to connect to PostgreSQL.
       #
       username: <USERNAME>

       ## @param pass - string - required
       ## Password associated with the Datadog user.
       #
       password: "<PASSWORD>"

       ## @param dbname - string - optional - default: postgres
       ## Name of the PostgresSQL database to monitor.
       ## Note: If omitted, the default system postgres database is queried.
       #
       dbname: "<DB_NAME>"

       ## @param ssl - string - optional - default: false
       ## This option determines whether or not and with what priority a secure SSL TCP/IP connection
       ## is negotiated with the server. There are six modes:
       ssl: 'true'
```

Deploy to Heroku:

```shell
# Deploy to Heroku 
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

Once the build finishes, the Datadog agent will start the Postgres check. Run the Datadog agent status as explained in the [appendix section](#appendix-getting-the-datadog-agent-status) to make sure the Postgres check is running correctly. You should look out for the following section:

```shell

[...]

=========
Collector
=========

  Running Checks
  ==============

[...]

    postgres (5.4.0)
    ----------------
      Instance ID: postgres:e07ef94b907fe733 [OK]
      Configuration Source: file:/app/.apt/etc/datadog-agent/conf.d/postgres.d/conf.yaml
      Total Runs: 9
      Metric Samples: Last Run: 15, Total: 135
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 9
      Average Execution Time : 102ms
      Last Execution Date : 2021-05-11 14:14:34 UTC (1620742474000)
      Last Successful Execution Date : 2021-05-11 14:14:34 UTC (1620742474000)
      metadata:
        version.major: 13
        version.minor: 2
        version.patch: 0
        version.raw: 13.2 (Ubuntu 13.2-1.pgdg20.04+1)
        version.scheme: semver


[...]
```

Once we have checked that the Postgres check is running correctly, we can start having a look to the Postgres metrics that we have available in the [Metrics Summary](https://app.datadoghq.com/metric/summary?filter=postgresql) page:

{{< img src="agent/guide/heroku_ruby/postgres_metrics.png" alt="Datadog Metrics Explorer" >}}

# Traces

To get distributed tracing from our Heroku Ruby application we will need to enable instrumentation first.

```shell
# Ensure that you are in the folder with the application code
cd ruby-getting-started
```

Edit your `Gemfile` and add the `ddtrace`:

```ruby
source 'https://rubygems.org'
gem 'ddtrace', require: 'ddtrace/auto_instrument'
```

Install the gem with `bundle install`:

```shell
bundle install
```

Before committing the changes and pushing to Heroku, we are going to set [Unified Tagging](https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/) for our application: 

```shell
# Set the environment of your application
heroku config:add DD_ENV=production -a $APPNAME

# Set the version of your application
heroku config:add DD_VERSION=0.1 -a $APPNAME

# Set the service of your application
heroku config:add DD_SERVICE=$APPNAME -a $APPNAME
```

Commit your changes and push to Heroku:

```shell
# Deploy to Heroku 
git add .
git commit -m "Enable distributed tracing"
git push heroku main
```

During the build you will get some error messages about the tracer not being able to reach out the Datadog APM agent endpoint. This is normal, as during the build process the Datadog agent hasn’t started yet. You can ignore these messages:

```
remote:        Download Yarn at https://yarnpkg.com/en/docs/install
remote:        E, [2021-05-14T10:21:27.664244 #478] ERROR -- ddtrace: [ddtrace] (/tmp/build_d5cedb1c/vendor/bundle/ruby/2.6.0/gems/ddtrace-0.48.0/lib/ddtrace/transport/http/client.rb:35:in `rescue in send_request') Internal error during HTTP transport request. Cause: Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126) Location: /tmp/build_d5cedb1c/vendor/ruby-2.6.6/lib/ruby/2.6.0/net/http.rb:949:in `rescue in block in connect'
```

Once the build finishes, your application will start to send traces to Datadog. We recommend generating traffic to your application (for example, by visiting the /widgets page of your application) to get a good flow of traces.

Run the Datadog agent status as explained in the [appendix section](#appendix-getting-the-datadog-agent-status) to make sure the APM agent is running correctly and sending traces to Datadog. You should look out for the following section:

```shell
[...]

=========
APM Agent
=========
  Status: Running
  Pid: 54
  Uptime: 85 seconds
  Mem alloc: 13,971,888 bytes
  Hostname: ruby-heroku-datadog.web.1
  Receiver: localhost:8126
  Endpoints:
    https://trace.agent.datadoghq.com

  Receiver (previous minute)
  ==========================
    From ruby 2.6.6 (ruby-x86_64-linux), client 0.48.0
      Traces received: 43 (55,431 bytes)
      Spans received: 129

    Default priority sampling rate: 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:': 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:production': 100.0%

  Writer (previous minute)
  ========================
    Traces: 0 payloads, 0 traces, 0 events, 0 bytes
    Stats: 0 payloads, 0 stats buckets, 0 bytes

[...]
```

That output shows us that the APM agent is running correctly and sending traces to Datadog. 

Navigating now to the [APM traces section](https://app.datadoghq.com/apm/traces) will show the traces coming in:

{{< img src="agent/guide/heroku_ruby/traces.png" alt="Ruby application traces in Datadog" >}}

You can now navigate to the Services view to see all your application services:

{{< img src="agent/guide/heroku_ruby/ruby_service.png" alt="Service list view in Datadog" >}}

You can now navigate to the Service view to see your application metrics, including the latency distribution, at a glance:

{{< img src="agent/guide/heroku_ruby/service_page.png" alt="Ruby application service view in Datadog" >}}

# Logs

The next feature that we are going to enable in our observability journey on Heroku are logs. We have two options on how to send logs from our application to Datadog, setting up a Heroku log drain or using the Datadog log agent directly. Each of those have their benefits and limitations, but the good news is that you can set up both! 

The main disadvantage of the log drain is that currently it cannot correlate logs with traces, but this is possible using the Datadog agent.  

The main disadvantage of sending logs through the Datadog agent is that Heroku system logs and router logs won’t be sent (you can send these using the log drain method).

## Setting up a Heroku log drain

Heroku has a native log router that will collect logs from all the dynos running in your application and will send them to Heroku. The logs include your application logs, the Heroku router logs, and the Heroku system dyno logs.

{{< img src="agent/guide/heroku_ruby/heroku_logs.png" alt="Heroku logs view" >}}

The first method to send logs to Datadog is by setting up a Heroku log drain that will route the same logs received in Heroku to a different platform.

One of the benefits of setting up the log drain is that you will be able to get the Heroku system logs into Datadog, which is not possible directly from the dyno. The main disadvantage is that it cannot correlate logs and traces (possible if sending logs with the Datadog agent).

Setting up the Heroku log drain also opens the door to get dyno system metrics (CPU, memory) into Datadog.

To set the Heroku log drain, from a terminal, run the following:

```shell
heroku drains:add "https://http-intake.logs.datadoghq.com/v1/input/$DD_API_KEY?ddsource=heroku&service=$APPNAME&host=$APPNAME" -a $APPNAME
```

To get system metrics from your dynos, apart from enabling the log drain, enable log-runtime-metrics as well:

```shell
heroku labs:enable log-runtime-metrics -a $APPNAME

# Restart your application
heroku restart -a $APPNAME
```

Once the drain has been set up, your Heroku logs will appear in the log section of Datadog.

### Generating metrics from Heroku router logs

Any traffic routed to your application will generate a Heroku router log:

{{< img src="agent/guide/heroku_ruby/router_log.png" alt="Heroku router logs in Datadog" >}}

As seen, the Heroku router logs get parsed automatically and `appname`, `dyno` and `dynotype` extracted as tags, thanks to the Heroku integration log pipeline:

{{< img src="agent/guide/heroku_ruby/grok_parser.png" alt="Heroku logs pipeline" >}}

We can now generate a latency metric based on those parsed parameters.

Navigate to Logs -> Generate Metrics and click on the “+ New Metric” button:

{{< img src="agent/guide/heroku_ruby/new_custom_metric.png" alt="New log based metric" >}}

Define the query as `Source:heroku` to filter all Heroku logs. And select the `Duration` measure. Also, we will want to be able to group that metric by `appname`, `dyno`, `dynotype`, `@http.url` and `@http.status_code`. Remember that metrics generated by log parsing are considered Custom Metrics. We recommend generating traffic to your application to get a good flow of new log entries.

Finally give your new metric a name and click on Create Metric:

{{< img src="agent/guide/heroku_ruby/custom_metric.png" alt="Creation of a new log based metric" >}}

Once the rule has been created and after waiting for some minutes to gather the new metrics and click on “See in Metric Explorer” to have a look to your new metric:

{{< img src="agent/guide/heroku_ruby/generated_metric.png" alt="Log based available metrics" >}}
{{< img src="agent/guide/heroku_ruby/metrics_explorer.png" alt="Metrics Explorer view" >}}

### Generating Datadog metrics from Heroku metric logs

If [log-runtime-metrics](https://devcenter.heroku.com/articles/log-runtime-metrics) is set up for your application, Heroku will generate log entries with system metrics for each of the dynos:

{{< img src="agent/guide/heroku_ruby/dyno_memory_log.png" alt="Dyno memory usage log entry" >}}
{{< img src="agent/guide/heroku_ruby/dyno_cpu_log.png" alt="Dyno CPU usage log entry" >}}

These logs are also automatically parsed by the Heroku log integration pipeline, extracting the following `measures`:

```
@heroku.cpu.1m
@heroku.cpu.5m
@heroku.cpu.15m
@heroku.memory.cache
@heroku.memory.quota
@heroku.memory.rss
@heroku.memory.swap
@heroku.memory.total
```

You can learn about what each of these values mean in Heroku’s official documentation.

Follow the same steps explained on the previous section to generate metrics with 15 month retention for each of those measures.

## Sending logs from the Datadog agent

The other option to send logs to Datadog is using Datadog agent to send logs directly from your application to Datadog, without using Heroku as a log router. The benefits of using the Datadog agent to send logs is that you will be able to use the Ruby integration to parse logs automatically without having to parse them yourself, and you will have log and tracing correlation.

The only logs that we will be able to send with this method are the logs that are generated by your application (or the Rails framework). Heroku system logs and router logs won’t be sent (you can send these using the log drain method explained in the previous section).

### Sending Rails logs

First, we will enable the logs agent:

```shell
# Enable the logs agent in Datadog
heroku config:add DD_LOGS_ENABLED=true -a $APPNAME
```

To configure your Rails logs, Datadog recommends using lograge. Let’s set it up for a sample application.

```shell
# Ensure that you are in the folder with the application code
cd ruby-getting-started
```

Edit your `Gemfile` and add the `lograge`:

```ruby
gem 'lograge'
```

Install the gem with `bundle install`:

```shell
bundle install
```

Configure Lograge. Create a new file `config/initializers/lograge.rb` file and add the following content:

```ruby
Rails.application.configure do
  # Lograge config
  config.lograge.enabled = true

  # This specifies to log in JSON format
  config.lograge.formatter = Lograge::Formatters::Json.new

  ## Disables log coloration
  config.colorize_logging = false

  # Log to a dedicated file
  config.lograge.logger = ActiveSupport::Logger.new(File.join(Rails.root, 'log', "#{Rails.env}.log"))

  # This is useful if you want to log query parameters
  config.lograge.custom_options = lambda do |event|
  { :ddsource => 'ruby',
    :params => event.payload[:params].reject { |k| %w(controller action).include? k }
  }
  end
end
```

Point the Datadog agent to the log path. 
Create a folder at the root of the project called `datadog/conf.d`:

```shell
# Ensure that you are in the folder with the application code
cd ruby-getting-started

# Create the configuration folder inside your application code
mkdir -p datadog/conf.d
```

Create a file called `ruby.yaml` inside that folder with the following contents:

```yaml
logs:
  - type: file
    path: "/app/log/production.log"
    service: ruby
    source: ruby
    sourcecategory: sourcecode

```

Deploy to Heroku:

```shell
# Deploy to Heroku
git add .
git commit -m "Add lograge"
git push heroku main
```

Once the build completes, run the Datadog agent status as explained in the [appendix section](#appendix-getting-the-datadog-agent-status) to make sure the Logs agent is running correctly and sending logs to Datadog. You should look out for the following section:

```shell
[...]

==========
Logs Agent
==========

    Sending compressed logs in HTTPS to agent-http-intake.logs.datadoghq.com on port 443
    BytesSent: 390
    EncodedBytesSent: 298
    LogsProcessed: 1
    LogsSent: 1

  ruby
  ----
    - Type: file
      Path: /app/log/production.log
      Status: OK
      Inputs: /app/log/production.log
      BytesRead: 166
      Average Latency (ms): 0
      24h Average Latency (ms): 0
      Peak Latency (ms): 0
      24h Peak Latency (ms): 0
[...]
```

That output shows us that the Logs agent is now running correctly and sending our Ruby application log to Datadog. 

Navigate now to [Logs in the Datadog application](https://app.datadoghq.com/logs?cols=core_host%2Ccore_service&index=%2A&messageDisplay=inline&query=source%3Aruby&stream_sort=desc), and filtering by Source:ruby you will start seeing your Rails logs in Datadog

{{< img src="agent/guide/heroku_ruby/ruby_logs.png" alt="Application generated logs" >}}

### Correlating logs and traces

Once we have set up lograge, we can correlate the logs we get from our Rails application with the traces we are already generating.

Edit the file called `config/initializers/lograge.rb` and add the following content to the file, under the `Rails.application.configure` section

```ruby
Rails.application.configure do
[...]

  config.lograge.custom_options = lambda do |event|
    # Retrieves trace information for current thread
    correlation = Datadog.tracer.active_correlation

    {
      # Adds IDs as tags to log output
      :dd => {
        # To preserve precision during JSON serialization, use strings for large numbers
        :trace_id => correlation.trace_id.to_s,
        :span_id => correlation.span_id.to_s,
        :env => correlation.env.to_s,
        :service => correlation.service.to_s,
        :version => correlation.version.to_s
      },
      :ddsource => ["ruby"],
      :params => event.payload[:params].reject { |k| %w(controller action).include? k }
    }
  end
end
```

Deploy to Heroku:

```shell
# Deploy to Heroku
git add .
git commit -m "Add log traces correlation"
git push heroku main
```

If you navigate now to [Logs in the Datadog application](https://app.datadoghq.com/logs/livetail?cols=core_host%2Ccore_service&from_ts=0&index=%2A&live=true&messageDisplay=inline&query=source%3Aruby&stream_sort=desc&to_ts=-1), the newer Rails logs will have their correlated trace:

{{< img src="agent/guide/heroku_ruby/log_trace_correlation.png" alt="Log and traces correlation" >}}

# Summary

In this guide we have taken a sample Rails application, deployed it to Heroku and instrumented it with Datadog to get metrics, dyno system metrics, logs and traces, as well as integrations set up.

To continue instrumenting your application with other Datadog integrations, follow the same steps taken for the Postgres integration one, with the configuration files documented in the [official integrations documentation](https://docs.datadoghq.com/integrations/).

# Appendix. Getting the Datadog agent status

Getting the Datadog agent status is a good way to confirm that the Datadog agent is running correctly and to debug potential issues. First, SSH into your dyno using `heroku ps:exec`:

```shell
heroku ps:exec -a $APPNAME

# Establishing credentials... done
# Connecting to web.1 on ⬢ ruby-heroku-datadog...
# DD_API_KEY environment variable not set. Run: heroku config:add DD_API_KEY=<your API key>
#The Datadog Agent has been disabled. Unset the DISABLE_DATADOG_AGENT or set missing environment variables.

~ $
```

You can ignore the warnings about the DD_API_KEY not being set. This is normal. The reason is that [Heroku doesn’t set configuration variables for the SSH session itself](https://devcenter.heroku.com/articles/exec#environment-variables), but the Datadog agent process was able to access those.

Once inside the SSH session, execute the Datadog status command:

```shell
~ $ agent-wrapper status

Getting the status from the agent.

===============
Agent (v7.27.0)
===============

  Status date: 2021-04-30 10:49:50.692 UTC (1619779790692)
  Agent start: 2021-04-30 10:32:54.713 UTC (1619778774713)
  Pid: 52
  Go Version: go1.14.12
  Python Version: 3.8.5
  Build arch: amd64
  Agent flavor: agent
  Check Runners: 4
  Log File: /app/.apt/var/log/datadog/datadog.log
  Log Level: info

[...]
```


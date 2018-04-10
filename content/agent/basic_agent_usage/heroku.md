---
title: Heroku Buildpack
kind: documentation
aliases:
- /developers/faq/how-do-i-collect-metrics-from-heroku-with-datadog
---

This buildpack installs the Datadog Agent in your Heroku Dyno to collect system metrics, custom application metrics, and traces. To collect custom application metrics or traces, include the language appropriate [DogStatsD or Datadog APM library][1] in your application.

## Installation

To add this buildpack to your project, as well as set the required environment variables:

```shell
cd <root of my project>

# If this is a new Heroku project
heroku create

# Add the appropriate language-specific buildpack. For example:
heroku buildpacks:add heroku/ruby

# Add this buildpack and set your environment variables
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
heroku config:set DD_HOSTNAME=$(heroku apps:info|grep ===|cut -d' ' -f2)
heroku config:add DD_API_KEY=<DATADOG_API_KEY>

# Deploy to Heroku
git push heroku master
```

Once complete, the Datadog Agent is started automatically when each Dyno starts.

The Datadog agent provides a listening port on 8125 for StatsD/DogStatsD metrics and events. Traces are collected on port 8126.

## Configuration

In addition to the environment variables shown above, there are a number of others you can set:

{{% table responsive="true" %}}
| Setting | Description|
| --- | --- |
| `DD_API_KEY` | *Required.* Your API key is available from the [Datadog API integrations][2] page. Note that this is the *API* key, not the application key. |
| `DD_HOSTNAME` | *Required.* Because Heroku Dynos are ephemeral and your application my be served by any available Dyno resource, set the hostname to the application or service name. To view metrics by Dyno hosts, the tag `dynohost` is added by the buildpack. |
| `DD_TAGS` | *Optional.* Sets additional tags provided as a comma-delimited string. For example, `heroku config:set DD_TAGS=simple-tag-0,tag-key-1:tag-value-1`. The buildpack automatically adds the tags `dyno` and `dynohost` which represent the Dyno name (e.g. web.1) and host ID (e.g. 33f232db-7fa7-461e-b623-18e60944f44f) respectively. See the ["Guide to tagging"][3] for more information. |
| `DD_HISTOGRAM_PERCENTILES` | *Optional.* Optionally set additional percentiles for your histogram metrics. See [Histogram percentiles](#histogram-percentiles) below for more information. |
| `DISABLE_DATADOG_AGENT` | *Optional.* When set, the Datadog agent will not be run. |
| `DD_APM_ENABLED` | *Optional.* The Datadog Trace Agent (APM) is run by default. Set this to `false` to disable the Trace Agent. |
| `DD_AGENT_VERSION` | *Optional.* By default, the buildpack installs the latest version of the Datadog Agent available in the package repository. Use this variable to install older versions of the Datadog Agent (note that not all versions of the Agent may be available). |
| `DD_SERVICE_NAME` | *Optional.* While not read directly by the Datadog Agent, it is highly recommend that you set an environment variable for your service name. See the [Service Name](#service-name) section below for more information. |
| `DD_SERVICE_ENV` | *Optional.* The Datadog Agent automatically tries to identify your environment by searching for a tag in the form `env:<environment name>`. For more information, see the [Datadog Tracing environments page][4]. |
{{% /table %}}

### Histogram percentiles

Optionally set additional percentiles for your histogram metrics. By default only the 95th percentile is generated. To generate additional percentiles, set *all* percentiles, including the default, using the env variable `DD_HISTOGRAM_PERCENTILES`.  For example, to generate 0.95 and 0.99 percentiles, use the following command:

```shell
heroku config:add DD_HISTOGRAM_PERCENTILES="0.95, 0.99"
```

For more information about about additional percentiles, see the [percentiles documentation][5].

### Service name

A service is a named set of processes that do the same job, such as `webapp` or `database`. The service name provides context when evaluating your trace data.

Although the service name is passed to Datadog on the application level, it is recommended that you set the value as an environment variable rather than directly in your application code.

For example, set the service name as an environment variable:

```shell
heroku config:set DD_SERVICE_NAME=my-webapp
```

Then in a python web application, set the service name from the environment variable:

```python
import os
from ddtrace import tracer

service_nane = os.environ.get('DD_SERVICE_NAME')
span = tracer.trace("web.request", service=service_name)
...
span.finish()
```

For Ruby on Rails applications, configure the `config/initializers/datadog-tracer.rb` file:

```ruby
require 'ddtrace'
ies
Datadog.configure do |c|
  c.use :rails, service_name: ENV['DD_SERVICE_NAME'] || 'my-app'
end
```

Setting the service name varies according to your language or supported framework. Reference the [Datadog libraries list][6] for specific language support.


[1]: http://docs.datadoghq.com/libraries/
[2]: https://app.datadoghq.com/account/settings#api
[3]: http://docs.datadoghq.com/guides/tagging/
[4]: https://docs.datadoghq.com/tracing/environments/
[5]: https://help.datadoghq.com/hc/en-us/articles/204588979-How-to-graph-percentiles-in-Datadog
[6]: https://docs.datadoghq.com/libraries/

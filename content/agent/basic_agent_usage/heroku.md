---
title: Heroku Buildpack
kind: documentation
---

This buildpack installs the Datadog Agent in your Heroku Dyno, allowing you to collect system metrics, custom application metrics and traces. To collect custom application metrics or traces, you will also need to include the language appropriate [DogStatsD or Datadog APM library](http://docs.datadoghq.com/libraries/).

## Installation

To add this buildpack to your project, as well as setting the required environment variables:

```shell
cd <root of my project>

# If this is a new Heroku project
heroku create

# Add the appropriate language-specific buildpack. For example:
heroku buildpacks:add heroku/ruby

# Add this buildpack and set your environment variables
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
heroku config:set DD_HOSTNAME=$(heroku apps:info|grep ===|cut -d' ' -f2)
heroku config:add DD_API_KEY=<your API key>

# Deploy to Heroku
git push heroku master
```

Once complete, the Datadog Agent will be started automatically when each Dyno starts.

The Datadog agent provides a listening port on 8125 for statsd/dogstatsd metrics and events. Traces are collected on port 8126.

## Configuration

In addition to the environment variables shown above, there are a number of others you can set:

| Setting | Description|
| --- | --- |
| DD_API_KEY | *Required.* Your API key is available from the [Datadog API integrations](https://app.datadoghq.com/account/settings#api) page. Note that this is the *API* key, not the application key. |
| DD_HOSTNAME | *Required.* Because Heroku Dynos are ephemeral and your application my be served by any available Dyno resource, you should set the hostname to your application or service name. This will give you more consistent metrics. To view metrics by Dyno hosts, the tag `dynohost` is added by the buildpack. |
| DD_TAGS | *Optional.* Sets additional tags provided as a comma-delimited string. For example, `heroku config:set DD_TAGS=simple-tag-0,tag-key-1:tag-value-1`. The buildpack automatically adds the tags `dyno` and `dynohost` which represent the Dyno name (e.g. web.1) and host ID (e.g. ) respectively. See the ["Guide to tagging"](http://docs.datadoghq.com/guides/tagging/) for more information. |
| DD_HISTOGRAM_PERCENTILES | *Optional.* You can optionally set additional percentiles for your histogram metrics. See [Histogram percentiles](#histogram-percentiles) below for more information. |
| DISABLE_DATADOG_AGENT | *Optional.* When set, the Datadog agent will not be run. |
| DD_APM_ENABLED | *Optional.* The Datadog Trace Agent (APM) will run by default. If you are not using tracing, set this to `false` to disable the Trace Agent. |
| DD_AGENT_VERSION | *Optional.* By default, the buildpack will install the latest version of the Datadog Agent available in the package repository. Use this variable to install older versions of the Datadog Agent (note that not all versions of the Agent may be available). |
| DD_SERVICE_NAME | *Optional.* While not read directly by the Datadog Agent, we highly recommend that you set an environment variable for your service name. See the [Service Name](#service-name) section below for more information. |
| DD_SERVICE_ENV | *Optional.* The Datadog Agent will automatically try to identify your environment by searching for a tag in the form `env:<your environment name>`. If you do not set a tag or wish to override an existing tag, you can set the environment with this setting. For more information, see the [Datadog Tracing environments page](https://docs.datadoghq.com/tracing/environments/). |

### Histogram percentiles

You can optionally set additional percentiles for your histogram metrics. By default only the 95th percentile will be generated. To generate additional percentiles, set *all* percentiles, including the default, using the env variable `DD_HISTOGRAM_PERCENTILES`.  For example, if you want to generate 0.95 and 0.99 percentiles, you may use following command:

```shell
heroku config:add DD_HISTOGRAM_PERCENTILES="0.95, 0.99"
```

For more information about about additional percentiles, see the [percentiles documentation](https://help.datadoghq.com/hc/en-us/articles/204588979-How-to-graph-percentiles-in-Datadog).

### Service name

A service is a named set of processes that do the same job, such as `webapp` or `database`. The service name provides context when evaluating your trace data.

Although the service name is passed to Datadog on the application level, we highly recommend that you set the value as an environment variable, rather than directly in your application code.

For example, set your service name as an environment variable:

```shell
heroku config:set DD_SERVICE_NAME=my-webapp
```

Then in a python web application, you could set the service name from the environment variable:

```python
import os
from ddtrace import tracer

service_nane = os.environ.get('DD_SERVICE_NAME')
span = tracer.trace("web.request", service=service_name)
...
span.finish()
```

For Ruby on Rails applications, you'll need to configure the `config/initializers/datadog-tracer.rb` file:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :rails, service_name: ENV['DD_SERVICE_NAME'] || 'my-app'
end
```

Setting the service name will vary according to your language or supported framework. Please reference the [Datadog libraries list](https://docs.datadoghq.com/libraries/) for specific language support.

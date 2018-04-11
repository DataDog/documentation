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

# Enable Heroku Labs Dyno Metadata
heroku labs:enable runtime-dyno-metadata -a $(heroku apps:info|grep ===|cut -d' ' -f2)

# Add this buildpack and set your Datadog API key
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
heroku config:add DD_API_KEY=<your API key>

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
| `DD_HOSTNAME` | *Deprecated.* **WARNING**: Setting the hostname manually may result in metrics continuity errors. It is recommended that you do *not* set this variable. Because dyno hosts are ephemeral it is recommended that you monitor based on the tags `dynoname` or `appname`. |
| `DD_TAGS` | *Optional.* Sets additional tags provided as a comma-delimited string. For example, `heroku config:set DD_TAGS=simple-tag-0,tag-key-1:tag-value-1`. The buildpack automatically adds the tags `dyno` and `dynohost` which represent the Dyno name (e.g. web.1) and host ID (e.g. 33f232db-7fa7-461e-b623-18e60944f44f) respectively. See the ["Guide to tagging"][3] for more information. |
| `DD_HISTOGRAM_PERCENTILES` | *Optional.* Optionally set additional percentiles for your histogram metrics. See [How to grpah percentiles][4]. |
| `DISABLE_DATADOG_AGENT` | *Optional.* When set, the Datadog agent will not be run. |
| `DD_APM_ENABLED` | *Optional.* The Datadog Trace Agent (APM) is run by default. Set this to `false` to disable the Trace Agent. |
| `DD_AGENT_VERSION` | *Optional.* By default, the buildpack installs the latest version of the Datadog Agent available in the package repository. Use this variable to install older versions of the Datadog Agent (note that not all versions of the Agent may be available). |
| `DD_SERVICE_ENV` | *Optional.* The Datadog Agent automatically tries to identify your environment by searching for a tag in the form `env:<environment name>`. For more information, see the [Datadog Tracing environments page][5]. |
{{% /table %}}

## More information

For more information, view the source code, or contribute to this project, refer to the [Github project page][6].

[1]: http://docs.datadoghq.com/libraries/
[2]: https://app.datadoghq.com/account/settings#api
[3]: http://docs.datadoghq.com/guides/tagging/
[4]: https://help.datadoghq.com/hc/en-us/articles/204588979-How-to-graph-percentiles-in-Datadog
[5]: https://docs.datadoghq.com/tracing/environments/
[6]: https://github.com/DataDog/heroku-buildpack-datadog

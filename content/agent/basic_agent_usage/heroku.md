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

The Datadog Agent provides a listening port on 8125 for StatsD/DogStatsD metrics and events. Traces are collected on port 8126.

## Configuration

In addition to the environment variables shown above, there are a number of others available:

| Setting                    | Description                                                                                                                                                                                                                                                                                                                                                                                  |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`               | *Required.* Your API key is available from the [Datadog API Integrations][2] page. Note that this is the *API* key, not the application key.                                                                                                                                                                                                                                                 |
| `DD_HOSTNAME`              | *Deprecated.* **WARNING**: Setting the hostname manually may result in metrics continuity errors. It is recommended that you do *not* set this variable. Because dyno hosts are ephemeral it is recommended that you monitor based on the tags `dynoname` or `appname`.                                                                                                                      |
| `DD_DYNO_HOST`             | *Optional.* Set to `true` to use the dyno name (e.g. `web.1` or `run.1234`) as the hostname. See the [hostname section](#hostname) below for more information. Defaults to `false`.                                                                                                                                                                                                          |
| `DD_TAGS`                  | *Optional.* Sets additional tags provided as a space-delimited string. For example, `heroku config:set DD_TAGS="simple-tag-0 tag-key-1:tag-value-1"`. The buildpack automatically adds the tags `dyno` and `dynohost` which represent the Dyno name (e.g. web.1) and host ID (e.g. 33f232db-7fa7-461e-b623-18e60944f44f) respectively. See the ["Guide to tagging"][3] for more information. |
| `DD_HISTOGRAM_PERCENTILES` | *Optional.* Optionally set additional percentiles for your histogram metrics. See [How to graph percentiles][4].                                                                                                                                                                                                                                                                             |
| `DISABLE_DATADOG_AGENT`    | *Optional.* When set, the Datadog Agent does not run.                                                                                                                                                                                                                                                                                                                                        |
| `DD_APM_ENABLED`           | *Optional.* Trace collection is enabled by default. Set this to `false` to disable trace collection.                                                                                                                                                                                                                                                                                         |
| `DD_AGENT_VERSION`         | *Optional.* By default, the buildpack installs the latest version of the Datadog Agent available in the package repository. Use this variable to install older versions of the Datadog Agent (note that not all versions of the Agent may be available).                                                                                                                                     |
| `DD_SERVICE_ENV`           | *Optional.* The Datadog Agent automatically tries to identify your environment by searching for a tag in the form `env:<environment name>`. For more information, see the [Datadog Tracing environments page][5].                                                                                                                                                                            |

## Hostname

Heroku dynos are ephemeral-they can move to different host machines whenever new code is deployed, configuration changes are made, or resouce needs/availability changes. This makes Heroku flexible and responsive, but can potentially lead to a high number of reported hosts in Datadog. Datadog bills on a per-host basis, and the buildpack default is to report actual hosts, which can lead to higher than expected costs.

Depending on your use case, you may want to set your hostname so that hosts are aggregated and report a lower number. To do this, Set `DD_DYNO_HOST` to `true`. This causes the Agent to report the hostname as the dyno name (e.g. `web.1` or `run.1234`), so your host count matches your dyno usage. One drawback is that you may see some metrics continuity errors whenever a dyno is cycled.

## Files Locations

- The Datadog Agent is installed at `/app/.apt/opt/datadog-agent`
- The Datadog Agent configuration files are at `/app/.apt/etc/datadog-agent`
- The Datadog Agent logs are at `/app/.apt/var/log/datadog`

## Heroku Log Collection

**This log integration is currently in public beta**

Heroku provides 3 types of logs:

* `App Logs`: output from the application you pushed on the platform.
* `System Logs`: messages about actions taken by the Heroku platform infrastructure on behalf of your app.
* `API Logs`: administrative questions implemented by you and other developers working on your app.

[Heroku's HTTP/S drains][6] buffer log messages and submit batches of messages to an HTTPS endpoint via a POST request.  
The POST body contains Syslog formatted messages, framed using the Syslog TCP protocol octet counting framing method.  
The Datadog HTTP API implements and understands the Logplex standard defined by the content-header `application/logplex-1`.

To send all these logs to Datadog:

* Connect to your Heroku project.
* Set up the HTTPS drain with the following command:

{{< tabs >}}
{{% tab "US Site" %}}

```
heroku drains:add https://http-intake.logs.datadoghq.com/v1/input/<DD_API_KEY>?ddsource=heroku&service=<SERVICE>&host=<HOST> -a <APPLICATION_NAME>
```

{{% /tab %}}
{{% tab "EU Site" %}}

```
heroku drains:add https://http-intake.logs.datadoghq.eu/v1/input/<DD_API_KEY>?ddsource=heroku&service=<SERVICE>&host=<HOST> -a <APPLICATION_NAME>
```

{{% /tab %}}
{{< /tabs >}}

* Replace `<DD_API_KEY>` with your [Datadog API Key][2].
* Replace `<APPLICATION_NAME>` and `<SERVICE>` with your application name.
* Replace `<HOST>` with the desired hostname. **Note**: Per the [host section](#hostname), metrics and traces set the default host name to the dyno name. It is not yet possible to dynamically set the dyno name as the hostname for logs. For now, to correlate between metrics, traces, and logs the `dyno` and `dynotype` tags can be used.

### Custom attributes

Add custom attributes to logs from your application by replacing the URL in the drain as follows:

{{< tabs >}}
{{% tab "US Site" %}}

```
https://http-intake.logs.datadoghq.com/v1/input/<DD_API_KEY>?ddsource=heroku&service=<SERVICE>&host=<HOST>&attribute_name=<VALUE>
```

{{% /tab %}}
{{% tab "EU Site" %}}

```
https://http-intake.logs.datadoghq.eu/v1/input/<DD_API_KEY>?ddsource=heroku&service=<SERVICE>&host=<HOST>&attribute_name=<VALUE>
```

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

Verify the Datadog Agent is listening by sending a custom metric: 

```shell
# From your project directory:
heroku run bash

# Once your Dyno has started and you are at the command line
echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

After a few moments, use the metrics explorer to verify that the metric was received.

It can also be helpful to obtain Agent and Trace Agent logs from your running dyno.

Download Datadog Agent logs:

```shell
heroku ps:copy /app/.apt/var/log/datadog/datadog.log --dyno=<YOUR DYNO NAME>
```

Download Datadog Trace Agent logs:

```shell
heroku ps:copy /app/.apt/var/log/datadog/datadog-apm.log --dyno=<YOUR DYNO NAME>
```

## Send a flare

Generate a flare by running:

```shell
# From your project directory:
heroku run bash

# Once your Dyno has started and you are at the command line, send a flare:
agent -c /app/.apt/etc/datadog-agent/datadog.yaml flare
```

The flare contains the environment information and Datadog Agent configuration. However, since this is a new, stand-alone dyno, the logs are sparse and may not contain full log information.

Generate a more complete flare by setting your API key as an environment variable by running:

```shell
heroku ps:exec
DD_API_KEY=<API KEY>
agent -c /app/.apt/etc/datadog-agent/datadog.yaml flare
```

## More information

Visit the [Github project page][7] for more information and to view the source code.

[1]: /libraries
[2]: https://app.datadoghq.com/account/settings#api
[3]: /tagging
[4]: /graphing/faq/how-to-graph-percentiles-in-datadog
[5]: /tracing/environments
[6]: https://devcenter.heroku.com/articles/log-drains#https-drains
[7]: https://github.com/DataDog/heroku-buildpack-datadog

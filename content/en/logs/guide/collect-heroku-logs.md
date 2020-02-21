---
title: Collect Heroku logs
kind: guide
---

**This log integration is currently in public beta**

Heroku provides 3 types of logs:

* `App Logs`: output from the application you pushed on the platform.
* `System Logs`: messages about actions taken by the Heroku platform infrastructure on behalf of your app.
* `API Logs`: administrative questions implemented by you and other developers working on your app.

[Heroku's HTTP/S drains][1] buffer log messages and submit batches of messages to an HTTPS endpoint via a POST request.
The POST body contains Syslog formatted messages, framed using the Syslog TCP protocol octet counting framing method.
The Datadog HTTP API implements and understands the Logplex standard defined by the content-header `application/logplex-1`.

To send all these logs to Datadog:

* Connect to your Heroku project.
* Set up the HTTPS drain with the following command:

{{< tabs >}}
{{% tab "US Site" %}}

```text
heroku drains:add 'https://http-intake.logs.datadoghq.com/v1/input/<DD_API_KEY>?ddsource=heroku&service=<SERVICE>&host=<HOST>' -a <APPLICATION_NAME>
```

{{% /tab %}}
{{% tab "EU Site" %}}

```text
heroku drains:add 'https://http-intake.logs.datadoghq.eu/v1/input/<DD_API_KEY>?ddsource=heroku&service=<SERVICE>&host=<HOST>' -a <APPLICATION_NAME>
```

{{% /tab %}}
{{< /tabs >}}

* Replace `<DD_API_KEY>` with your [Datadog API Key][2].
* Replace `<APPLICATION_NAME>` and `<SERVICE>` with your application name.
* Replace `<HOST>` with the desired hostname. **Note**: Per the [host section][3], metrics and traces set the default host name to the dyno name. It is not yet possible to dynamically set the dyno name as the hostname for logs. For now, to correlate between metrics, traces, and logs the `dyno` and `dynotype` tags can be used.

### Custom attributes

Add custom attributes to logs from your application by replacing the URL in the drain as follows:

{{< tabs >}}
{{% tab "US Site" %}}

```text
https://http-intake.logs.datadoghq.com/v1/input/<DD_API_KEY>?ddsource=heroku&service=<SERVICE>&host=<HOST>&attribute_name=<VALUE>
```

{{% /tab %}}
{{% tab "EU Site" %}}

```text
https://http-intake.logs.datadoghq.eu/v1/input/<DD_API_KEY>?ddsource=heroku&service=<SERVICE>&host=<HOST>&attribute_name=<VALUE>
```

{{% /tab %}}
{{< /tabs >}}

[1]: https://devcenter.heroku.com/articles/log-drains#https-drains
[2]: https://app.datadoghq.com/account/settings#api
[3]: /agent/basic_agent_usage/heroku/#hostname

---
title: Collect Heroku logs

---

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

```text
heroku drains:add "https://http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?dd-api-key=<DD_API_KEY>&ddsource=heroku&ddtags=env:<ENV>&service=<SERVICE>&host=<HOST>" -a <APPLICATION_NAME>
```

* Replace `<DD_API_KEY>` with your [Datadog API Key][2].
* Replace `<ENV>` with your application's [environment][3].
* Replace `<APPLICATION_NAME>` and `<SERVICE>` with your application name.
* Replace `<HOST>` with the desired hostname.  
**Notes**:  
   - Per the [host section][4], metrics and traces set the default hostname to the dyno name. It is not possible to dynamically set the dyno name as the hostname for logs. Use the `dyno` and `dynotype` tags to correlate between metrics, traces, and logs.
   - The buildpack automatically adds the tags `dyno` (which represent the dyno name, such as `web.1`), and `dynotype` (the type of dyno, such as `run` or `web`). See the [Getting Started with Tags][3] guide for more information.

### Custom attributes

Add custom attributes to logs from your application by replacing the URL in the drain as follows:

```text
https://http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?dd-api-key=<DD_API_KEY>&ddsource=heroku&service=<SERVICE>&host=<HOST>&attribute_name=<VALUE>
```

[1]: https://devcenter.heroku.com/articles/log-drains#https-drains
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /getting_started/tagging/#introduction
[4]: /agent/basic_agent_usage/heroku/#hostname

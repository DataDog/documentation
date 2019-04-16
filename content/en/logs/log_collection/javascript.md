---
title: Browser Log Collection
kind: documentation
aliases:
  - /logs/log_collection/web_browser
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
- link: "logs/faq/log-collection-troubleshooting-guide"
  tag: "FAQ"
  text: "Log Collection Troubleshooting Guide"
---



Send logs to Datadog from web browsers or other Javascript client thanks to the Datadog `datadog-logs` Client-side JavaScript logging library.

With the `datadog-logs` library you are able to send log directory to Datadog from JS clients and leverage the following features:

* Use the library as a logger. Everything is forwarded to Datadog as JSON documents.
* Add `context` and extra custom attributes to each logs sent.
* Wrap and forward every JavaScript errors automatically.
* Forward JavaScript's console logs.
* Record real client IP address and user agent.
* Optimised network usage with automatic bulk posts.

## Get the Public API Key

**Public API Keys are in Private Beta** Reach out to [Datadog support team](/help) to get it enabled for your Account.

For security reasons, [API keys][2] cannot be used to configure the `datadog-logs` library as they would be exposed client side in the Javascript code. To collect Logs from web browsers, a [Public API keys][3] must be used.
To manage your Public API keys, go to your [Datadog API configuration page][4] in the `Public API Key` section as shown here:

{{< img src="logs/log_collection/public_key.png" style="width:80%;" alt="Public API Keys" responsive="true" >}}

Read the [Public API keys documentation][3] to learn more about the restrictions that applies.

## Configure the Javascript logger

The following parameters can be used to configure the library to send logs to Datadog:

* Set `isCollectingError` to `false` to turn off the automatic JS and console error collection.
* Use `addGlobalContext` to add JSON attribute to all the generated logs
* Set `publicApiKey` to the value of the Public API key (**only public api_key can be used in this library**)

{{< tabs >}}
{{% tab "US" %}}

```
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-us.js"></script>
    <script>
      // Set your Public API key
      Datadog.init({
        publicApiKey: '<PUBLIC_API_KEY>',
        isCollectingError: true,
    });

      // OPTIONAL
      // add global metadata attributes
      Datadog.addGlobalContext({'session_id': '1234'});
    </script>
    ...
  </head>
...
</html>
```

{{% /tab %}}
{{% tab "EU" %}}

```
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-eu.js"></script>
    <script>
      // Set your Public API key
      Datadog.init({
        publicApiKey: '<PUBLIC_API_KEY>',
        isCollectingError: true,
    });

      // OPTIONAL
      // add global metadata attributes
      Datadog.addGlobalContext({'session_id': '1234'});
    </script>
    ...
  </head>
...
</html>
```

{{% /tab %}}
{{< /tabs >}}

## Send a custom log entry

It is then possible to send custom log entries thanks to the `log` function:

```
Datadog.log(<message>,<json_parameter>,<severity>)
```

The accepted severity value are `debug`, `info`, `warn` or `error`.

**Example:**

```
...
<script>
...
Datadog.log('Button clicked', { name: 'buttonName' });
...
</script>
...
```

This gives the following result:

```
{
  "severity": "info",
  "session_id": "1234", 
  "name": "buttonName",
  "message": "Button clicked",
  http:{
    "url": "...",
    "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Safari/537.36"
    },
  "network":{
    "client": {
      "ip" : "109.30.xx.xxx"
    }
  }
}  
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/parsing
[2]: https://docs.datadoghq.com/account_management/faq/api-app-key-management/#api-keys
[3]: https://docs.datadoghq.com/account_management/faq/api-app-key-management/#public-api-keys
[4]: https://app.datadoghq.com/account/settings#api

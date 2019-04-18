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



Send logs to Datadog from web browsers or other Javascript client thanks to the Datadog's `datadog-logs` client-side JavaScript logging library.

With the `datadog-logs` library, you can send log directories to Datadog from JS clients and leverage the following features:

* Use the library as a logger. Everything is forwarded to Datadog as JSON documents.
* Add `context` and extra custom attributes to each log sent.
* Wrap and forward every JavaScript error automatically.
* Forward JavaScript's console logs.
* Record real client IP addresses and user agents.
* Optimised network usage with automatic bulk posts.

## Get a Public API Key

<div class="alert alert-warning">
Public API keys are in private beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> to turn on this feature for your account.
</div>

For security reasons, [API keys][1] cannot be used to configure the `datadog-logs` library as they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a [public API key][2] must be used.

To manage your public API keys, go to your [Datadog API configuration page][3] in the `Public API Key` section as shown here:

{{< img src="logs/log_collection/public_key.png" style="width:80%;" alt="Public API Keys" responsive="true" >}}

Read the [Public API keys documentation][2] to learn more about the restrictions that applies.

## Configure the JavaScript logger

<div class="alert alert-warning">
The Javascript logging library is in private beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> to turn on this feature for your account.
</div>

The following parameters can be used to configure the library to send logs to Datadog:

* Set `isCollectingError` to `false` to turn off the automatic JS and console error collection.
* Use `addGlobalContext` to add JSON attribute to all the generated logs
* Set `publicApiKey` to the value of the public API key (**only public API keys can be used in this library**)

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
      Datadog.addGlobalContext({'<META_KEY>': '<META_VALUE>'});
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
      Datadog.addGlobalContext({'<META_KEY>': '<META_VALUE>'});
    </script>
    ...
  </head>
...
</html>
```

{{% /tab %}}
{{< /tabs >}}

## Send a custom log entry

Send a custom log entries directly to Datadog with the `log` function:

```
Datadog.log(<MESSAGE>,<JSON_ATTRIBUTES>,<SEVERITY>)
```

| Placehodler         | Description                                                                             |
| ------              | -------                                                                                 |
| `<MESSAGE>`         | The message of your log that is fully indexed by Datadog                                |
| `<JSON_ATTRIBUTES>` | A valid JSON object that includes all attributes attached to the `<MESSAGE>`            |
| `<SEVERITY>`        | Status of your log; the accepted severity values are `debug`, `info`, `warn` or `error`. |

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

[1]: https://docs.datadoghq.com/account_management/faq/api-app-key-management/#api-keys
[2]: https://docs.datadoghq.com/account_management/faq/api-app-key-management/#public-api-keys
[3]: https://app.datadoghq.com/account/settings#api

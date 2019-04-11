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



Send log to Datadog from web browsers or other Javascript client thanks to the Datadog Client-side JavaScript logging library.

With the `browser-agent-core` library you are able to send log directory to Datadog from JS clients and leverage the following features:

Use the library as a logger. Everything is forwarded to Datadog as JSON documents.
Add `context` and extra attributes
* Forward every JavaScript errors 
* Forward JavaScript's console logs
* Track real client IP address and user-agent
* Automatic bulk posts 

## Get the Public API Key


## Configure the Javascript logger

The following parameters can be used to configure the library to send logs to Datadog:

* Set `isCollectingError` to false to turn off the automatic JS and console error collection
* Use `addGlobalContext` to add JSON attribute to all the generated logs
* Set `apiKey` to the value of the Public api_key (**only public api_key can be used in this library**)

{{< tabs >}}
{{% tab "US" %}}

```
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://datadoghq-browser-agent/browser-agent-core-us.js"></script>
    <script>
      // Set your Public API key
      Datadog.init({
        apiKey: '<PUBLIC_API_KEY>',
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
    <script type="text/javascript" src="https://datadoghq-browser-agent/browser-agent-core-eu.js"></script>
    <script>
      // Set your Public API key
      Datadog.init({
        apiKey: '<PUBLIC_API_KEY>',
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

---
title: C# Log Collection
kind: documentation
aliases:
  - /logs/languages/csharp
further_reading:
- link: "https://www.datadoghq.com/blog/c-logging-guide/"
  tag: "Blog"
  text: "How to collect, customize, and analyze C# logs"
- link: "/tracing/connect_logs_and_traces/dotnet/?tab=serilog"
  tag: "Documentation"
  text: "Connecting .NET Logs and Traces"
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/explorer/#visualize"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "/logs/faq/log-collection-troubleshooting-guide/"
  tag: "FAQ"
  text: "Log Collection Troubleshooting Guide"
---

To send your C# logs to Datadog, [log to a file][1] and then [configuring the Datadog Agent][2] to tail the file. See the example logging configurations for [Serilog][3], [NLog][4], and [log4net][5]. Datadog recommends setting up your logging library to output logs in JSON format to avoid the need for [custom parsing rules][6].  

The Datadog Agent is required for the [example configurations][1]. If needed, there is an [Agentless logging][7] option for Serilog.

Once logs are submitted to Datadog, and if [APM][8] is enabled for the application, [connect your logs and traces][9] by automatically adding trace IDs, span IDs, `env`, `service`, and `version` to your logs.

**Note:** If the APM tracer injects `service` tags into your logs, the tracer's `service` tag overrides the `service` tag set in the [Agent configuration][10].

## Configure your logger

{{< tabs >}}
{{% tab "Serilog" %}}

1. To install [Serilog via NuGet][1], run the following command in the Package Manager Console:

    ```text
    PM> Install-Package Serilog.Sinks.File
    ```

2. Add the following code to initialize the logger directly in your application:

    ```csharp
    // Instantiate the logger
    var log = new LoggerConfiguration()  // using Serilog;

        // using Serilog.Formatting.Json;
        .WriteTo.File(new JsonFormatter(renderMessage: true), "log.json")

        // using Serilog.Formatting.Compact;
        // .WriteTo.File(new RenderedCompactJsonFormatter(), "log.json")

        .CreateLogger();

    // An example
    var position = new { Latitude = 25, Longitude = 134 };
    var elapsedMs = 34;

    log.Information("Processed {@Position} in {Elapsed:000} ms.", position, elapsedMs);
    ```

3. In the `log.json` file, confirm the logger instantiated successfully:

    - If using `JsonFormatter(renderMessage: true)`, look for the following event for confirmation:

      ```json
      {
      "MessageTemplate": "Processed {@Position} in {Elapsed:000} ms.",
      "Level": "Information",
      "Timestamp": "2016-09-02T15:02:29.648Z",
      "Renderings": {"Elapsed": [{"Format": "000", "Rendering": "034"}]},
      "RenderedMessage":"Processed { Latitude: 25, Longitude: 134 } in 034 ms.",
      "Properties": {"Position": {"Latitude": 25, "Longitude": 134}, "Elapsed": 34}
      }
      ```

    - If using `RenderedCompactJsonFormatter()`, look for the following event for confirmation:

      ```json
      {
        "@t": "2020-05-20T04:15:28.6898801Z",
        "@m": "Processed { Latitude: 25, Longitude: 134 } in 034 ms.",
        "@i": "d1eb2146",
        "Position": {"Latitude": 25, "Longitude": 134 },
        "Elapsed": 34
      }
      ```

[1]: https://www.nuget.org/packages/Serilog/
{{% /tab %}}
{{% tab "NLog" %}}

NLog is a logging platform for .NET with rich log routing and management capabilities. It can help you produce and manage high-quality logs for your application regardless of its size or complexity.

Install NLog via NuGet. Run the following command in the Package Manager Console:

```text
PM> Install-Package NLog
```

Once the library is in your classpath, attach the following layout to any target. Edit or add a `NLog.config` file to the project root path. Then copy/paste the following code in it (*Logs are written into the `application-logs.json` file*):

```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <!--
  See https://github.com/nlog/nlog/wiki/Configuration-file
  for information on customizing logging rules and outputs.
   -->
  <targets async="true">
    <!-- Write logs as Json into a file -->
    <target name="json-file" xsi:type="File" fileName="application-logs.json">
      <layout xsi:type="JsonLayout">
        <attribute name="date" layout="${date:format=yyyy-MM-ddTHH\:mm\:ss.fff}" />
        <attribute name="level" layout="${level:upperCase=true}"/>
        <attribute name="message" layout="${message}" />
        <attribute name="exception" layout="${exception:format=ToString}" />
      </layout>
    </target>

  </targets>
  <rules>
    <!-- Log all events to the json-file target -->
    <logger name="*" writeTo="json-file" minlevel="Trace" />
  </rules>
</nlog>
```

To fire and log your first events, add this to your code:

```csharp

using NLog;

namespace Datadog
{
    class Program
    {

        // Initialize a logger
        private static Logger logger = LogManager.GetCurrentClassLogger();

        static void Main(string[] args)
        {

            // Log a simple debug message
            logger.Debug("This is my first step");

            // your code continues here ...

        }
    }
}
```

{{% /tab %}}
{{% tab "Log4Net" %}}
Log4Net is a logging platform for .NET inspired from Log4j with rich log routing and management capabilities. It can help you produce and manage high-quality logs for your application regardless of its size or complexity.

To install it, run the following command in the Package Manager Console

```text
PM> Install-Package log4net
PM> Install-Package log4net.Ext.Json
```

Once the library is in your classpath, attach the following layout to any target. Edit the `App.config` of your project and add the following section:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>

  <configSections>
    <section name="log4net" type="log4net.Config.Log4NetConfigurationSectionHandler, log4net" />
  </configSections>

  <log4net>
    <root>
      <level value="DEBUG" />
      <appender-ref ref="JsonFileAppender" />
    </root>
    <appender name="JsonFileAppender" type="log4net.Appender.FileAppender">
    <threshold value="DEBUG"/>
    <file value="application-logs.json" />
    <appendToFile value="true" />
      <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
        <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
        <default />
        <!--explicit default members-->
        <remove value="ndc" />
        <remove value="message" />
        <!--remove the default preformatted message member-->
        <member value="message:messageobject" />
        <!--add raw message-->
      </layout>
    </appender>
  </log4net>

  <!-- The rest of your configuration starts here ... -->
```

Instantiate your logger and start to fire your events:

```csharp
using log4net;

namespace Datadog
{
    class Program
    {
        // Get the current class logger
        private static ILog logger = LogManager.GetLogger(typeof(Program));

        static void Main(string[] args)
        {

           // Load the configure fom App.config
           XmlConfigurator.Configure();

           // Log a simple debug message
           logger.Debug("This is my first debug message");

           // your code continues here ...
        }
    }
}
```

If you have followed the instructions you should see in your file (for example `C:\Projects\Datadog\Logs\log.json`) the following event:

```json
{
  "level": "DEBUG",
  "message": "This is my debug message",
  "date": "2016-05-24 15:53:35.7175",
  "appname": "Datadog.vshost.exe",
  "logger": "Datadog.Program",
  "thread": "10"
}
```

If, despite the benefits of logging in JSON, you wish to log in raw string format, try updating the `log4net conversion pattern` to automatically parse your logs with the C# integration Pipeline as follows:

```text
<param name="ConversionPattern" value="%date{yyyy-MM-dd HH:mm:ss.SSS} %level [%thread] %logger %method:%line - %message%n" />
```

{{% /tab %}}
{{< /tabs >}}

## Configure your Datadog Agent

Once [log collection is enabled][10], set up [custom log collection][11] to tail your log files and send them to Datadog.

1. Create a `csharp.d/` folder in the `conf.d/` [Agent configuration directory][12].
2. Create a `conf.yaml` file in `csharp.d/` with the following content:

      ```yaml
      init_config:

      instances:

      ##Log section
      logs:

        - type: file
          path: "/path/to/your/csharp/log.log"
          service: csharp
          source: csharp
          sourcecategory: sourcecode
          # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
          #log_processing_rules:
          #  - type: multi_line
          #    name: new_log_start_with_date
          #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
      ```
3. [Restart the Agent][13]
4. Run the [Agent’s status subcommand][14] and look for `csharp` under the `Checks` section to confirm logs are successfully submitted to Datadog.

If logs are in JSON format, Datadog automatically [parses the log messages][15] to extract log attributes. Use the [Log Explorer][16] to view and troubleshoot your logs.

## Agentless logging

In cases where logs cannot be logged to a file because the application is running on an inaccessible host, logs can be sent directly from the application to Datadog. Outside of this specific use case, Datadog does not recommend this setup because handling connection issues should not be done directly in the application.

{{< tabs >}}
{{% tab "Serilog" %}}

1. To install the [Datadog Serilog sink][1], which sends events and logs to Datadog, run the following command in the Package Manager Console:

    ```text
    PM> Install-Package Serilog.Sinks.Datadog.Logs
    ```

2. Add the following code to initialize the logger directly in your application. Your [API key][2] is required for initialization.

{{< site-region region="us" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.datadoghq.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.us3.datadoghq.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.datadoghq.eu" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

By default the sink forwards logs through HTTPS on port 443. To override the default setting and forward logs using TCP, manually specify the following required properties: `url`, `port`, `useSSL`, and `useTCP`. Optionally, specify the [`source`, `service`, `host`, and custom tags.][3]

{{< site-region region="us" >}}

For example, to forward logs to the Datadog US region using TCP, use the following sink configuration:

```csharp
var config = new DatadogConfiguration(url: "intake.logs.datadoghq.com", port: 10516, useSSL: true, useTCP: true);
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs(
        "<API_KEY>",
        source: "<SOURCE_NAME>",
        service: "<SERVICE_NAME>",
        host: "<HOST_NAME>",
        tags: new string[] {"<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"},
        configuration: config
    )
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}
{{< site-region region="eu" >}}

For example, to forward logs to the Datadog EU region using TCP, use the following sink configuration:

```csharp
var config = new DatadogConfiguration(url: "tcp-intake.logs.datadoghq.eu", port: 443, useSSL: true, useTCP: true);
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs(
        "<API_KEY>",
        source: "<SOURCE_NAME>",
        service: "<SERVICE_NAME>",
        host: "<HOST_NAME>",
        tags: new string[] {"<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"},
        configuration: config
    )
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

Alternatively, for [Datadog Serilog sink][1] `0.2.0+`, configure the Datadog sink in the `appsettings.json` file with the `Serilog.Setting.Configuration` package.

In the `Serilog.WriteTo` array, add an entry for `DatadogLogs` by adding the following:

```json
"Serilog": {
  "Using": [ "Serilog.Sinks.Console", "Serilog.Sinks.Datadog.Logs" ],
  "MinimumLevel": "Debug",
  "WriteTo": [
    { "Name": "Console" },
    {
      "Name": "DatadogLogs",
      "Args": {
        "apiKey": "<API_KEY>",
        "source": "<SOURCE_NAME>",
        "host": "<HOST_NAME>",
        "tags": ["<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"],
      }
    }
  ],
  "Enrich": [ "FromLogContext", "WithMachineName", "WithThreadId" ],
  "Properties": {
    "Application": "Sample"
  }
}
```

Use the [Log Explorer][4] to view and troubleshoot logs.

[1]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
[4]: /logs/explorer/#overview
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/csharp/#configure-your-logger
[2]: /logs/log_collection/csharp/?tab=serilog#configure-your-datadog-agent
[3]: /logs/log_collection/csharp/?tab=serilog#configure-your-logger
[4]: /logs/log_collection/csharp/?tab=nlog#configure-your-logger
[5]: /logs/log_collection/csharp/?tab=log4net#configure-your-logger
[6]: /logs/log_configuration/parsing
[7]: /logs/log_collection/csharp/?tab=serilog#agentless-logging
[8]: /tracing/#pagetitle
[9]: /tracing/connect_logs_and_traces/dotnet/
[10]: /agent/logs/?tab=tailfiles#activate-log-collection
[11]: /agent/logs/?tab=tailfiles#custom-log-collection
[12]: /agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[13]: /agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[14]: /agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[15]: /logs/log_configuration/parsing/?tab=matchers
[16]: /logs/explorer/#overview

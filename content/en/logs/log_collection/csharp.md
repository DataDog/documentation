---
title: C# log collection
kind: documentation
aliases:
  - /logs/languages/csharp
further_reading:
- link: "https://www.datadoghq.com/blog/c-logging-guide/"
  tag: "Blog"
  text: "How to collect, customize, and analyze C# logs"
- link: "/logs/processing/"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/processing/parsing/"
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

To send your C# logs to Datadog, we recommend logging to a file and then tailing that file with your Datadog Agent. Here are setup examples for the `Serilog`, `NLog`, and `log4net` logging libraries

We strongly encourage setting up your logging library to produce your logs in JSON format to avoid the need for [custom parsing rules][1].

## Configure your logger

{{< tabs >}}
{{% tab "Serilog" %}}

Like many other libraries for .NET, Serilog provides diagnostic logging into files, console, and elsewhere. It is easy to set up, has a clean API, and is portable between recent .NET platforms.

Unlike other logging libraries, Serilog is built with powerful structured event data in mind.

Install Serilog via NuGet. Run the following command in the Package Manager Console:

```text
PM> Install-Package Serilog.Sinks.File
```

Then, initialize the logger directly to your application:

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

Then check the `log.json` file to see the following event:

- If using `JsonFormatter(renderMessage: true)`:

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

- If using `RenderedCompactJsonFormatter()`

```json
{
  "@t": "2020-05-20T04:15:28.6898801Z",
  "@m": "Processed { Latitude: 25, Longitude: 134 } in 034 ms.",
  "@i": "d1eb2146",
  "Position": {"Latitude": 25, "Longitude": 134 },
  "Elapsed": 34
}
```

[Monitor now your log file with your Agent][1] to send your logs to your Datadog application

[1]: /logs/#tail-existing-files
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

[Monitor now your log file with your Agent][1] to send your logs to your Datadog application.

[1]: /logs/#tail-existing-files
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

If, despite the benefits of logging in JSON, you wish to log in raw string format, we recommend you update the `log4net convertion pattern` to automatically parse your logs with the C# integration Pipeline as follows:

```text
<param name="ConversionPattern" value="%date{yyyy-MM-dd HH:mm:ss.SSS} %level [%thread] %logger %method:%line - %message%n" />
```

{{% /tab %}}
{{< /tabs >}}

## Connect your service across logs and traces

If APM is enabled for this application, connect your logs and traces by automatically adding trace IDs, span IDs,
`env`, `service`, and `version` to your logs by [following the APM .NET instructions][2]

**Note**: If the APM tracer injects `service` into your logs, it overrides the value set in the agent configuration.

## Configure your Datadog Agent

Create a `csharp.d/conf.yaml` file in your `conf.d/` folder with the following content:

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

That's it! Now, all your logs are going to be in proper JSON automatically understood by your Datadog application.

## Agentless logging

It is possible to stream logs from your application to Datadog or to the Datadog Agent directly. This is not the recommended setup as handling connection issues should not be done directly in your application, but it might not be possible to log to a file when your application is running on a machine that cannot be accessed.
{{< tabs >}}
{{% tab "Serilog" %}}

Install the Datadog [Serilog sink][1], which sends events and logs to Datadog. By default the sink forwards logs through HTTPS on port 443.
Run the following command in the Package Manager Console:

```text
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

Then, initialize the logger directly in your application. Do not forget to [add your `<API_KEY>`][2].

{{< site-region region="us" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration { Url = "https://http-intake.logs.datadoghq.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration { Url = "https://http-intake.logs.datadoghq.eu" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

You can also override the default behaviour and forward logs in TCP by manually specifying the following required properties: `url`, `port`, `useSSL`, and `useTCP`. [Optionally, specify the `source`, `service`, `host`, and custom tags.][3]

{{< site-region region="us" >}}

For instance to forward logs to the Datadog US region in TCP you would use the following sink configuration:

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

For instance to forward logs to the Datadog EU region in TCP you would use the following sink configuration:

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

New logs are now directly sent to Datadog.

Alternately, since `0.2.0`, you can configure the Datadog sink by using an `appsettings.json` file with the `Serilog.Setting.Configuration` package.

In the `Serilog.WriteTo` array, add an entry for `DatadogLogs`. An example is shown below:

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

[1]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[2]: https://app.datadoghq.com/account/settings#api
[3]: /logs/processing/attributes_naming_convention/#reserved-attributes
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/parsing/
[2]: /tracing/connect_logs_and_traces/dotnet/

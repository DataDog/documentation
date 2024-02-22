---
title: C# Log Collection
kind: documentation
aliases:
  - /logs/languages/csharp
further_reading:
- link: "https://www.datadoghq.com/blog/c-logging-guide/"
  tag: "Blog"
  text: "How to collect, customize, and analyze C# logs"
- link: "/tracing/other_telemetry/connect_logs_and_traces/dotnet/"
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
- link: "/glossary/#tail"
  tag: Glossary
  text: 'Glossary entry for "tail"'
---

To send your C# logs to Datadog, use one of the following approaches:

- [Log to a file and then tail that file with your Datadog Agent](#file-tail-logging-with-the-datadog-agent).
- [Enable Agentless logging](#agentless-logging-with-apm).
- [Use the Serilog sink](#agentless-logging-with-serilog-sink).

This page details setup examples for the `Serilog`, `NLog`, `log4net`, and `Microsoft.Extensions.Logging` logging libraries, for each of the above approaches.

## File-tail logging with the Datadog Agent

The recommended approach for C# log collection is to output your logs to a file and then [tail][20] that file with your Datadog Agent. This enables the Datadog Agent to enrich the logs with additional metadata.

Datadog strongly encourages setting up your logging library to produce your logs in JSON format to avoid the need for [custom parsing rules][1].

### Configure your logger

{{< tabs >}}
{{% tab "Serilog" %}}

Like many other libraries for .NET, Serilog provides diagnostic logging into files, the console, and elsewhere. It has a clean API and is portable between recent .NET platforms.

Unlike other logging libraries, Serilog is built with powerful structured event data in mind.

To install Serilog with NuGet, run the following command in the Package Manager Console:

```text
PM> Install-Package Serilog.Sinks.File
```

Then, add the following code to initialize the logger directly in your application:

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

In the `log.json` file, confirm the logger instantiated successfully:

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

{{% /tab %}}
{{% tab "NLog" %}}

NLog is a logging platform for .NET with rich log routing and management capabilities. It can help you produce and manage high-quality logs for your application regardless of its size or complexity.

To install NLog using NuGet, run the following command in the Package Manager Console:

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
        <attribute name="date" layout="${date:universalTime=true:format=o}" />
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

To install Log4Net, run the following command in the Package Manager Console:

```text
PM> Install-Package log4net
PM> Install-Package log4net.Ext.Json
```

Once the library is installed, attach the following layout to any target. Edit the `App.config` of your project and add the following section:

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
      <encoding type="System.Text.UTF8Encoding" />
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

### Configure the Datadog Agent

Once [log collection is enabled][2], set up [custom log collection][3] to tail your log files and send them to Datadog.

1. Create a `csharp.d/` folder in the `conf.d/` [Agent configuration directory][4].
2. Create a `conf.yaml` file in `csharp.d/` with the following content:

    ```yaml
    init_config:

    instances:

    ##Log section
    logs:

      - type: file
        path: "<path_to_your_csharp_log>.log"
        service: <service_name>
        source: csharp
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
3. Make sure the Agent user has read access permissions to the log file.
4. [Restart the Agent][5].
5. Run the [Agent's status subcommand][6] and look for `csharp` under the `Checks` section to confirm logs are successfully submitted to Datadog.

If logs are in JSON format, Datadog automatically [parses the log messages][7] to extract log attributes. Use the [Log Explorer][8] to view and troubleshoot your logs.

### Connect your service across logs and traces

If APM is enabled for this application, connect your logs and traces by automatically adding trace IDs, span IDs,
`env`, `service`, and `version` to your logs by [following the APM .NET instructions][9]

**Note**: If the APM tracer injects `service` into your logs, it overrides the value set in the agent configuration.

## Agentless logging with APM

It is possible to stream logs from your application to Datadog directly, without making any code changes, using the .NET APM automatic instrumentation library. This approach sends logs directly to Datadog, so it does not benefit from [features such as sensitive data scrubbing][10] which are provided by the Datadog Agent. For that reason, we recommend using file tail logging where possible, but it is useful in environments where this is not possible (when using [Azure App Service][11] for example). It is worth noting that you will still be able to rely on server-side scrubbing capabilities performed by [Sensitive Data Scanner][12].

Agentless logging (also known as "direct log submission") supports the following frameworks:
- Serilog (v1.0+)
- NLog (v2.1+)
- log4net (v1.0+)
- Microsoft.Extensions.Logging (2.0+)

It does not require modifying your application code, or installing additional dependencies into your application.

<div class="alert alert-warning">
  <strong>Note:</strong> If you use log4net or NLog, an appender (log4net) or a logger (NLog) must be configured for Agentless logging to be enabled. In those cases, you can either add these extra dependencies, or use <a href="/logs/log_collection/csharp/?tab=log4net#agentless-logging-with-serilog-sink">agentless logging with the Serilog sink</a> instead.
</div>


### Configure the APM library

Agentless logging is only available when using APM with automatic instrumentation. To get started, instrument your application as described in the following documents:

- [.NET Core/.NET 5+ applications][13]
- [.NET Framework applications][14]

After installing, verify you are receiving traces correctly.

### Enable Agentless logging

To enable Agentless logging, set the following environment variables:

`DD_API_KEY`
: Your [Datadog API Key][15] for sending your logs to Datadog.

`DD_SITE`
: The name of [your Datadog site][16]. Choose from one of the following examples:<br>
**Example**: `datadoghq.com` (US1), `datadoghq.eu` (EU), `us3.datadoghq.com` (US3), `us5.datadoghq.com` (US5), `ddog-gov.com` (US1-FED) <br>
**Default**: `datadoghq.com` (US1)

`DD_LOGS_INJECTION`
: Enables [connecting logs and traces][9]:<br>
**Default**: `true` <br>
Enabled by default when using Agentless logging from Tracer version 2.7.0.

`DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS`
: Enables Agentless logging. Enable for your logging framework by setting to `Serilog`, `NLog`, `Log4Net`, or `ILogger` (for `Microsoft.Extensions.Logging`). If you are using multiple logging frameworks, use a semicolon separated list of variables.<br>
**Example**: `Serilog;Log4Net;NLog`

<div class="alert alert-warning">
  <strong>Note:</strong> If you are using a logging framework in conjunction with <code>Microsoft.Extensions.Logging</code>, you will generally need to use the framework name. For example, if you are using <a href="https://github.com/serilog/serilog-extensions-logging">Serilog.Extensions.Logging</a>, you should set <code>DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS=Serilog</code>.
</div>

Restart your application after setting these environment variables.

### Additional configuration

You can further customize some aspects of Agentless log collection using the following environment variables:

`DD_LOGS_DIRECT_SUBMISSION_MINIMUM_LEVEL`
: Allows filtering logs by level _before_ they're sent to Datadog. Set to one of the following values: `Verbose`, `Debug`, `Information`, `Warning`, `Error`, `Critical`. These correspond to the equivalent levels in the supported logging frameworks.<br>
**Default**: `Information`

`DD_LOGS_DIRECT_SUBMISSION_HOST`
: Set the name of the host machine associated with logs. If not provided, the host name will attempt to be found automatically.<br>
**Default**: Determined automatically

`DD_LOGS_DIRECT_SUBMISSION_TAGS`
: If specified, adds all of the specified tags to all generated spans. If not provided, will use `DD_TAGS` instead.<br>
**Example**: `layer:api, team:intake`
Note that the delimiter is a comma and a whitespace: `, `.

The following configuration values should generally not be modified, but may be set if required.

{{< site-region region="us" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Sets the URL where logs should be submitted. Uses the domain provided in `DD_SITE` by default.<br>
**Default**: `https://http-intake.logs.datadoghq.com:443` (based on `DD_SITE`)

{{< /site-region >}}

{{< site-region region="us3" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Sets the URL where logs should be submitted. Uses the domain provided in `DD_SITE` by default.<br>
**Default**: `https://http-intake.logs.us3.datadoghq.com:443` (based on `DD_SITE`)

{{< /site-region >}}

{{< site-region region="us5" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Sets the URL where logs should be submitted. Uses the domain provided in `DD_SITE` by default.<br>
**Default**: `https://http-intake.logs.us5.datadoghq.com:443` (based on `DD_SITE`)

{{< /site-region >}}

{{< site-region region="ap1" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Sets the URL where logs should be submitted. Uses the domain provided in `DD_SITE` by default.<br>
**Default**: `https://http-intake.logs.ap1.datadoghq.com:443` (based on `DD_SITE`)

{{< /site-region >}}

{{< site-region region="eu" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Sets the URL where logs should be submitted. Uses the domain provided in `DD_SITE` by default.<br>
**Default**: `https://http-intake.logs.datadoghq.eu:443` (based on `DD_SITE`)

{{< /site-region >}}

{{< site-region region="gov" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Sets the URL where logs should be submitted. Uses the domain provided in `DD_SITE` by default.<br>
**Default**: `https://http-intake.logs.ddog-gov.com:443` (based on `DD_SITE`)

{{< /site-region >}}

`DD_LOGS_DIRECT_SUBMISSION_SOURCE`
: Sets the parsing rule for submitted logs. Should always be set to `csharp`, unless you have a [custom pipeline][17].<br>
**Default**: `csharp`

`DD_LOGS_DIRECT_SUBMISSION_MAX_BATCH_SIZE`
: Sets the maximum number of logs to send at one time. Takes into account the [limits in place for the API][18].<br>
**Default**: `1000`

`DD_LOGS_DIRECT_SUBMISSION_MAX_QUEUE_SIZE`
: Sets the maximum number of logs to hold in the internal queue at any one time before dropping log messages.<br>
**Default**: `100000`

`DD_LOGS_DIRECT_SUBMISSION_BATCH_PERIOD_SECONDS`
: Sets the time to wait (in seconds) before checking for new logs to send.<br>
**Default**: `1`

If you are using the `Microsoft.Extensions.Logging` integration, you can filter the logs sent to Datadog using the standard capabilities built-into `ILogger`. Use the key `"Datadog"` to identify the direct-submission provider, and set the minimum log levels for each namespace. For example, adding the following to your `appSettings.json` would prevent sending any logs with a level below `Warning` to Datadog. Introduced in the .NET tracer library v2.20.0.

```json
{
  "Logging": {
    "Datadog": {
      "LogLevel": {
        "Microsoft.AspNetCore": "Warning"
      },
    }
  }
}
```

## Agentless logging with Serilog sink

If it is not possible to use file-tail logging or APM Agentless logging, and you are using the `Serilog` framework, then you can use the Datadog [Serilog sink][19] to send logs directly to Datadog.

Install the Datadog [Serilog sink][19] into your application, which sends events and logs to Datadog. By default the sink forwards logs through HTTPS on port 443.
Run the following command in the Package Manager Console:

```text
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

Then, initialize the logger directly in your application. Ensure that you [add your `<API_KEY>`][15].

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

{{< site-region region="ap1" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.ap1.datadoghq.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="us5" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.us5.datadoghq.com" })
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

{{< site-region region="gov" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.ddog-gov.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="us" >}}

You can also override the default behavior and forward logs in TCP by manually specifying the following required properties: `url`, `port`, `useSSL`, and `useTCP`. Optionally, [specify the `source`, `service`, `host`, and custom tags.][1]

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

[1]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes

{{< /site-region >}}
{{< site-region region="eu" >}}

You can also override the default behavior and forward logs in TCP by manually specifying the following required properties: `url`, `port`, `useSSL`, and `useTCP`. Optionally, [specify the `source`, `service`, `host`, and custom tags.][1]

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
[1]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/parsing
[2]: /agent/logs/?tab=tailfiles#activate-log-collection
[3]: /agent/logs/?tab=tailfiles#custom-log-collection
[4]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[5]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: /agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[7]: /logs/log_configuration/parsing/?tab=matchers
[8]: /logs/explorer/#overview
[9]: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
[10]: /agent/logs/advanced_log_collection
[11]: /serverless/azure_app_services
[12]: /sensitive_data_scanner/
[13]: /tracing/trace_collection/dd_libraries/dotnet-core
[14]: /tracing/trace_collection/dd_libraries/dotnet-framework
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: /getting_started/site/
[17]: /logs/log_configuration/pipelines/?tab=source
[18]: /api/latest/logs/#send-logs
[19]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[20]: /glossary/#tail

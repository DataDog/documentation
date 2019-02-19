---
title: C# log collection
kind: documentation
aliases:
  - /logs/languages/csharp
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

To send your C# logs to Datadog, we recommend logging to a file and then tailing that file with your Datadog Agent. Here are setup examples for the `log4Net`, `serilog` and `Nlog` logging libraries

We strongly encourage setting up your logging library to produce your logs in JSON format to avoid the need for [custom parsing rules][1].

## Configure your logger
{{< tabs >}}
{{% tab "SeriLog" %}}

Like many other libraries for .NET, Serilog provides diagnostic logging into files, console, and elsewhere. It is easy to set up, has a clean API, and is portable between recent .NET platforms.

Unlike other logging libraries, Serilog is built with powerful structured event data in mind.

Install Serilog via NuGet. Run the following command in the Package Manager Consol:

```
PM> Install-Package Serilog.Sinks.File
```

Then, initialize the logger directly to your application:

```csharp
// Instantiate the logger
var log = new LoggerConfiguration()
    .WriteTo.File(new JsonFormatter(), "log.json")
    .CreateLogger();

// An example
var position = new { Latitude = 25, Longitude = 134 };
var elapsedMs = 34;

log.Information("Processed {@Position} in {Elapsed:000} ms.", position, elapsedMs);
```

Then check the `log.json` file to see the following event:

```json
{
    "MessageTemplate": "Processed {@Position} in {Elapsed:000} ms.",
    "Level": "Information",
    "Timestamp": "2016-09-02T15:02:29.648Z",
    "Renderings": {
        "Elapsed": [{
            "Format": "000",
            "Rendering": "034"
        }]
    },
    "Properties": {
        "Position": {
            "Latitude": 25,
            "Longitude": 134
        },
        "Elapsed": 34
    }
}
```

[Monitor now your log file with your Agent][1] to send your logs to your Datadog application


[1]: /logs/#tail-existing-files
{{% /tab %}}
{{% tab "NLog" %}}

NLog is a logging platform for .NET with rich log routing and management capabilities. It can help you produce and manage high-quality logs for your application regardless of its size or complexity.

Install NLog via NuGet. Run the following command in the Package Manager Console:

```
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
        <attribute name="date" layout="${longdate}" />
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

```
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

```
<param name="ConversionPattern" value="%date{yyyy-MM-dd HH:mm:ss.SSS} %level [%thread] %logger %method:%line - %message%n" />
```

{{% /tab %}}
{{< /tabs >}}

## Configure your Datadog Agent

Create a `csharp.d/conf.yaml` file in your `conf.d/` folder with the following content:

```yaml
init_config:

instances:
    
##Log section
logs:

    ## - type : file (mandatory) type of log input source (tcp / udp / file)
    ##   port / path : (mandatory) Set port if type is tcp or udp. Set path if type is file
    ##   service : (mandatory) name of the service owning the log
    ##   source : (mandatory) attribute that defines which integration is sending the logs
    ##   sourcecategory : (optional) Multiple value attribute. Can be used to refine the source attribute
    ##   tags: (optional) add tags to each logs collected

  - type: file
    path: /path/to/your/csharp/log.log
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
{{% tab "SeriLog" %}}

Install the Datadog [Serilog sink][1], which send events and logs to Datadog. By default the sink uses a TCP connection over SSL.
Run the following command in the Package Manager Console: 

```
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

Then, initialize the logger directly in your application. Do not forget to [add your `<API_KEY>`][2].

```
var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>")
    .CreateLogger();
```

You can override the default behavior by manually specifying the following properties in the parameters: `endpoint`, `port`, `useSSL`. You can also specify the `source`, `service`, `host`, and custom tags:

```
var config = new DatadogConfiguration("intake.logs.datadoghq.com", 10516, true);
var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs(
        "<API_KEY>",
        source: "<SOURCE_NAME>",
        service: "<SERVICE_NAME>",
        host: "<HOST_NAME>",
        tags: new string[] {"<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"},
        configuration: config
    )
    .CreateLogger();
```

New logs are now directly sent to Datadog.


[1]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[2]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/parsing

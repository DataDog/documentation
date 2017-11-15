---
title: C# log Collection
kind: documentation
autotocdepth: 2
customnav: lognav
beta: true
---

To send your C# logs to Datadog, we recommend to log into a file and then to monitor this file with your Datadog agent. Here are setup examples for the `log4net`, `serilog` and `Nlog` logging library

## Setup - Log to file
### Configure your logger
#### SeriLog
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

Then check the `log.json` file; You will see the following event:

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

[Monitor now your log file with your agent]() to send your logs to your datadog application

#### NLog

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

[Monitor now your log file with your agent]() to send your logs to your datadog application

#### Log4net

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

Instantiate your logger and start to fire your event:

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

If you have followed the instructions you should be see in your file (for example `C:\Projects\Datadog\Logs\log.json`) the following event:

```json
{
    "level": "DEBUG",
    "message": "This is my debug message",
    "date": "2016-05-24 15:53:35.7175"
}
```


### Configure your Datadog agent

Create a `csharp.yaml` file in your `conf.d/` folder with the following content:

```yaml
init_config:

instances:
    [{}]
    
#Log section
logs:

    # - type : (mandatory) type of log input source (tcp / udp / file)
    #   port / path : (mandatory) Set port if type is tcp or udp. Set path if type is file
    #   service : (mandatory) name of the service owning the log
    #   source : (mandatory) attribute that defines which integration is sending the logs
    #   sourcecategory : (optional) Multiple value attribute. Can be used to refine the source attribtue
    #   tags: (optional) add tags to each logs collected

  - type: file
    path: /path/to/your/csharp/log.log
    service: csharp
    source: csharp
    sourcecategory: sourcecode
```

That's it! Now, all your logs are going to be in proper JSON automatically understood by your Datadog application.
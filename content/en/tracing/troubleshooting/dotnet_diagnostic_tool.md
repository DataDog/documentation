---
title: Using the .NET diagnostic tool for troubleshooting
kind: documentation
---

If after installing the .NET tracer your application does not produce traces as expected, you can try running the diagnostic tool for basic troubleshooting. It should help you figure out issues with your setup (for example missing environment variables, incomplete installation, unreachable agent...).

The tool can be installed in three different ways:

- Using the .NET SDK by running the command:
```
dotnet tool install -g dd-trace
```
- By downloading from one of the short links:
    * Win-x64: [https://dtdg.co/dd-trace-dotnet-win-x64](https://dtdg.co/dd-trace-dotnet-win-x64)
    * Linux-x64: [https://dtdg.co/dd-trace-dotnet-linux-x64](https://dtdg.co/dd-trace-dotnet-linux-x64)
    * Linux-musl-x64 (Alpine): [https://dtdg.co/dd-trace-dotnet-linux-musl-x64](https://dtdg.co/dd-trace-dotnet-linux-musl-x64)
 
- Or by downloading [from the github release page](https://github.com/DataDog/dd-trace-dotnet/releases)

## Process diagnostics 

For most applications, you should use the process diagnostics. For that, you need to make sure the application is running, and get the process id (pid). 

To get the pid of a process on Windows, you can open the task manager, activate the "Details" tab, and look for the "PID" column. You can also run the command `tasklist /FI "IMAGENAME eq target.exe"`where `target.exe` is the name of the process.

To get the pid of a process on Linux, you can run the command `ps aux | grep target` where `target` is the name of the process.

The pid is typically `1` when running in a docker container. 

You can then give the pid to the dd-trace tool:
```
dd-trace check process <pid>
```
This runs basic configuration checks and displays recommendations if any issues are found.

Example of successful output:
```bash
$ dd-trace check process 16436

Running checks on process 16436
Target process is running with .NET Framework
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a
configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
No issue found with the target process.
```

Example of unsuccessful output:
```bash
$ dd-trace check process 35888

Running checks on process 35888
Target process is running with .NET Framework
Profiler is not loaded into the process
Tracer is not loaded into the process
The environment variable COR_ENABLE_PROFILING should be set to '1' (current value: '0')
```


## IIS diagnostics

For an IIS application, you can get more thorough diagnostics by using another command:
```
dd-trace check iis <full site name>
```
The full site name is the name of the site in IIS followed by the name of the application.

For instance, in this example:

{{< img src="tracing/troubleshooting/IISManager.png" alt="IIS manager">}}

The full name of "WebApplication1" would be `Default Web Site/WebApplication1`:
```
dd-trace check iis "Default Web Site/WebApplication1"
```
**Remember to surround the name with quotes if it has spaces in it.**

To instrument the root application of the site, run:
```
dd-trace check iis "Default Web Site"
```

Because application pools are started lazily in IIS, make sure that the site has received at least one request before running the command.

As for the process diagnostics, this command runs basic configuration checks and displays recommendations if any issues are found.

Example of successful output:
```bash
$ dd-trace check iis "Default Web Site/WebApplication1"

Fetching application /WebApplication1 from site Default Web Site
Inspecting worker process 47160
Target process is running with .NET Framework
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a
configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
Found Datadog.Trace version 2.4.0.0 in the GAC
No issue found with the IIS site.
```

Example of unsuccessful output:
```bash
$ dd-trace check iis "Default Web Site/WebApplication1"

Fetching application /WebApplication1 from site Default Web Site
Inspecting worker process 47160
Target process is running with .NET Framework
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a
configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
The Datadog.Trace assembly could not be found in the GAC. Make sure the tracer has been properly installed with the MSI.
```

## Agent connectivity diagnostics

If you don't want to run checks for a specific application but just want to test the connection to the agent, you can run:
```
dd-trace check agent [url]
```

This command sends a request to the agent and looks for any error. If the `url` parameter is omitted, then the location of the agent is determined from the environment variables. The supported protocols are `http://` or `unix://` (for domain sockets).


Example of successful output:
```bash
$ dd-trace check agent

No Agent URL provided, using environment variables
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
Connected successfully to the Agent.
```

Example of unsuccessful output:
```bash
$ dd-trace check agent

No Agent URL provided, using environment variables
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Error connecting to Agent at http://127.0.0.1:8126/: No connection could be made because the target machine actively
refused it. (127.0.0.1:8126)
```

You can [check this page](https://docs.datadoghq.com/tracing/troubleshooting/connection_errors/#troubleshooting-the-connection-problem) to learn how to further document agent connectivity issue.



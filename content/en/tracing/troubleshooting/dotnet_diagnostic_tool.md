---
title: Using the .NET diagnostic tool for troubleshooting
kind: documentation
---

If after installing the .NET tracer your application does not produce traces as expected, run the diagnostic tool for basic troubleshooting. It can help you figure out issues with your setup such as missing environment variables, incomplete installation, or unreachable Agent.

Install the tool one of the following ways:

- Using the .NET SDK by running the command:
   ```
   dotnet tool install -g dd-trace
   ```
- By downloading the appropriate version:
    * Win-x64: [https://dtdg.co/dd-trace-dotnet-win-x64][1]
    * Linux-x64: [https://dtdg.co/dd-trace-dotnet-linux-x64][2]
    * Linux-musl-x64 (Alpine): [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][3]
 
- Or by downloading [from the github release page][4].

## Process diagnostics 

For most applications, use the process diagnostics to find the problem. 

1. Ensure the application is running, and get the process ID (pid). 

   To get the pid of a Windows process, open Task Manager, open the **Details** tab, and look for the PID column. You can also run the command `tasklist /FI "IMAGENAME eq target.exe"`where `target.exe` is the name of the process.

   To get the pid of a process on Linux, run the command `ps aux | grep target` where `target` is the name of the process (the pid is typically `1` when running in a Docker container).

2. Pass the pid into the dd-trace tool:
   ```
   dd-trace check process <pid>
   ```
   This runs basic configuration checks and displays recommendations if any issues are found.

Example output with no issues:
```bash
$ dd-trace check process 16436

Running checks on process 16436
Target process is running with .NET Framework
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
No issue found with the target process.
```

Example output with issues:
```bash
$ dd-trace check process 35888

Running checks on process 35888
Target process is running with .NET Framework
Profiler is not loaded into the process
Tracer is not loaded into the process
The environment variable COR_ENABLE_PROFILING should be set to '1' (current value: '0')
```


## IIS diagnostics

For an IIS application, you can get more thorough diagnostics by using the following command, where `<FULL SITE NAME>` is the name of the site in IIS followed by the name of the application:

```
dd-trace check iis "<FULL SITE NAME>"
```

Because application pools are started lazily in IIS, make sure that the site has received at least one request before you run the command.

**Remember to enclose the name in quotation marks if it has spaces in it.**

For example, the full site name for the application shown below is `Default Web Site/WebApplication1`:

{{< img src="tracing/troubleshooting/IISManager.png" alt="IIS manager">}}

The command to run IIS diagnostics on this application is:
```
dd-trace check iis "Default Web Site/WebApplication1"
```

To instrument the root application of the site, run:
```
dd-trace check iis "Default Web Site"
```

The `check iis` command includes process diagnostics, so it runs basic configuration checks and displays recommendations if any issues are found.

Example output without issues:
```bash
$ dd-trace check iis "Default Web Site/WebApplication1"

Fetching application /WebApplication1 from site Default Web Site
Inspecting worker process 47160
Target process is running with .NET Framework
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
Found Datadog.Trace version 2.4.0.0 in the GAC
No issue found with the IIS site.
```

Example output with issues:
```bash
$ dd-trace check iis "Default Web Site/WebApplication1"

Fetching application /WebApplication1 from site Default Web Site
Inspecting worker process 47160
Target process is running with .NET Framework
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
The Datadog.Trace assembly could not be found in the GAC. Make sure the tracer has been properly installed with the MSI.
```

## Agent connectivity diagnostics

If you don't want to run checks for a specific application but just want to test the connection to the Agent, run:
```
dd-trace check agent <url>
```

This command sends a request to the Agent and looks for errors. If the optional `url` parameter is omitted, then the location of the Agent is determined from the environment variables. The supported protocols are `http://` or `unix://` (for domain sockets).

Example output without issues:
```bash
$ dd-trace check agent

No Agent URL provided, using environment variables
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.32.4
Connected successfully to the Agent.
```

Example output with issues:
```bash
$ dd-trace check agent

No Agent URL provided, using environment variables
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Error connecting to Agent at http://127.0.0.1:8126/: No connection could be made because the target machine actively refused it. (127.0.0.1:8126)
```

Read [Connection Errors][5] for more information about Agent connectivity issues.


[1]: https://dtdg.co/dd-trace-dotnet-win-x64
[2]: https://dtdg.co/dd-trace-dotnet-linux-x64
[3]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[4]: https://github.com/DataDog/dd-trace-dotnet/releases
[5]: /tracing/troubleshooting/connection_errors/?code-lang=dotnet#

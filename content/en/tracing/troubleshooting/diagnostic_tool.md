---
title: Using the .NET diagnostic tool for troubleshooting
kind: documentation
---

If after installing the .NET tracer your application does not produce traces as expected, you can try running the diagnostic tool for basic troubleshooting. 

The tool can be installed in two different ways:

- Using the .NET SDK by running the command:
```
dotnet tool install -g dd-trace
```
- Or by direct download by picking the right version [from the release page](https://github.com/DataDog/dd-trace-dotnet/releases)
**TODO: We probably want to setup a short url?**


## Process diagnostics 

For most applications, you should use the process diagnostics. For that, you need to make sure the application is running, and get the pid. You can then give it to the dd-trace tool:
```
dd-trace check process <pid>
```
This runs basic configuration checks and displays recommendations if any issues are found.


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

## Agent connectivity diagnostics

If you don't want to run checks for a specific application but just want to test the connection to the agent, you can run:
```
dd-trace check agent [url]
```

This command sends a request to the agent and looks for any error. If the `url` parameter is omitted, then the location of the agent is determined from the environment variables. The supported protocols are `http://` or `unix://` (for domain sockets).










---
title: Using the .NET diagnostic tool for troubleshooting
kind: documentation
---

If after installing the .NET tracer your application does not produce traces as expected, you can try running the troubleshooting tool for basic diagnostics. 

The tool can be installed in two different ways:

- Using the .NET SDK by running the command:
```
dotnet tool install -g dd-trace
```
- Or by direct download by picking the right version [from the release page](https://github.com/DataDog/dd-trace-dotnet/releases)
**TODO: We probably want to setup a short url?**


## Process diagnostics 

For most applications, you will want to use the process diagnostics. For that, you need to make sure the application is running, and get the pid. You can then give to the dd-trace tool
```
dd-trace check process <pid>
```
This will run basic configuration checks and display recommendations if any issue is found.


## IIS diagnostics

For an IIS application, you can get more thourough check by using another command:
```
dd-trace check iis <full site name>
```
The full site name is the name of the site in IIS followed by the name of the application.

For instance, in this example:
**insert screenshot**

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

As for the process diagnostics, this command will run basic configuration checks and display recommendations if any issue is found.

## Agent connectivity diagnostics

If you don't want to run checks for a specific application but just want to test the connection to the agent, you can run:
```
dd-trace check agent [url]
```

This command will send a request to the agent and look for any error. If the url parameter is omitted, then the location of the agent will be determined from the environment variables. The supported protocols are `http://` or `unix://` (for domain sockets).










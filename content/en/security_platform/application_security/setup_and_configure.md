---
title: Setup and Configure Application Security Monitoring
kind: documentation
further_reading:
- link: "/security_platform/application_security/"
  tag: "Documentation"
  text: "Monitoring Threats with Datadog Application Security"
- link: "/security_platform/guide/how-appsec-works/"
  tag: "Guide"
  text: "How Datadog Application Security Monitoring Works"
- link: "/security_platform/default_rules/#cat-application-security"
  tag: "Documentation"
  text: "Out-of-the-Box Application Security Rules"
---

## Compatibility

{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs" >}}

{{< programming-lang lang="java" >}}

### Supported Java versions

The Datadog library supports Java JRE 1.7 and higher of both Oracle JDK and OpenJDK. Datadog does not officially support any early-access versions of Java. 

For more specific details about versions of Java supported by the Datadog Library, see [APM Java Compatibility Requirements][1], but the supported frameworks for Application Security are a subset of what is supported for APM.

### Supported frameworks

| Framework Web Server    | Minimum Framework Version   | 
| ----------------------- | --------------------------- |
| Servlet                 | 2                           |
| Spring                  | 3.1                         |



[1]: /tracing/setup_overview/compatibility_requirements/java
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

### Supported .NET versions

The Datadog .NET library supports all .NET-based languages (for example, C#, F#, Visual Basic).

The following .NET versions are supported:
- .NET Core 6
- .NET Core 5
- .NET Framework 4.8
- .NET Framework 4.7.2
- .NET Framework 4.7
- .NET Framework 4.6.2
- .NET Framework 4.6.1

For more specific details about versions of .NET supported by the Datadog Library, see the APM Compatibility Requirements for [.NET Core][1] and [.NET Framework][2], but the supported frameworks for Application Security are a subset of what is supported for APM.

### Supported frameworks

| Framework Web Server    | Minimum Framework Version   | 
| ----------------------- | --------------------------- |
| ASP.NET                 | 4.6                         |
| ASP.NET Core            | 2.1                         |


[1]: /tracing/setup_overview/compatibility_requirements/dotnet-core/
[2]: /tracing/setup_overview/compatibility_requirements/dotnet-framework/
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

go

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

ruby

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

php

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

nodejs

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Enabling and disabling Application Security Monitoring

After you instrument with the DD library, how to turn on in your Agent and start collecting

## Scanning for sensitive data

Description and link to /account_management/org_settings/sensitive_data_detection/

## Creating exclusion filters

If very lengthy, could be its own page

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

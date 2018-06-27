---
title: Tracing .NET Applications
kind: Documentation
further_reading:
- link: "https://github.com/DataDog/dd-trace-csharp"
  tag: "Github"
  text: Source code
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

The APM tracer for .NET applications is currently in **alpha** and not officially supported by Datadog. The officially supported Beta will launch as early as August 2018.  To be notified of the beta launch, [submit this form][1].

The unstable alpha tracer can be [accessed today on Github][2]. 
**We do not recommend running the alpha tracer in production.**

## Automatic Instrumentation

APM .Net support is currently in alpha and provides limited automatic instrumentation.  Beta support is planned for August 2018 and will provide automatic instrumentation for popular frameworks and libraries.  See some of these listed below.  Don’t see your desired frameworks or libraries? Please let us know more about your needs through [this survey][1].

### Web Frameworks

| Framework                    | Versions    | Support Type    |
| :---------------             | :---------- | :-------------- |
| ASP.NET MVC<sup>1</sup>      | 5.x         | Alpha           |
| ASP.NET Web API<sup>1</sup>  | 2.x         | Coming soon     |
| ASP.NET Core MVC<sup>2</sup> | 2.0         | Alpha           |

<sup>1</sup> Running on .NET Framework 4.5 or above  
<sup>2</sup> Running on .NET Framework 4.6.1 or above, or on .NET Core 2.0 or above

Don’t see what you're looking for? Please let us know more about your needs through [this survey][1].

### Data Stores

| Data Store                      | Versions    | Support Type    |
| :------------------------------ | :---------- | :-------------- |
| Ado.Net / System.Data.SqlClient |             | Alpha           |
| Elasticsearch.net / NEST        |             | Coming Soon     |
| MongoDB.Driver                  |             | Coming Soon     |
| Postgres (Npgsql)               |             | Coming Soon     |
| ServiceStack.Redis              |             | Coming Soon     |

Don’t see what you're looking for? Please let us know more about your needs through [this survey][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://goo.gl/forms/SCKOOlHS7tNzyMt93
[2]: https://github.com/DataDog/dd-trace-csharp
---
title: Data Streams Monitoring for Azure Service Bus 
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

<table>
  <thead>
    <tr>
      <th>Language</th>
      <th>Library</th>
      <th>Minimal tracer version</th>
      <th>Recommended tracer version</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/data_streams/dotnet">.NET</a></td>
      <td><a href="https://www.nuget.org/packages/Azure.Messaging.ServiceBus">Azure.Messaging.ServiceBus</a></td>
      <td>2.53.0 </td>
      <td>2.53.0 or later </td>
    </tr>
  </tbody>
</table>

### Setting up Data Streams Monitoring
See setup instructions for [.NET][2].

{{% data_streams/monitoring-azure-service-bus %}}

[1]: /agent
[2]: /data_streams/setup/language/dotnet
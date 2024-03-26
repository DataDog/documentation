---
title: Cloud Service Discovery and Additional Protocols
kind: documentation
is_beta: true
private: true
further_reading:
- link: "/universal_service_monitoring/"
  tag: "Documentation"
  text: "Universal Service Monitoring"
- link: "https://www.datadoghq.com/blog/universal-service-monitoring-datadog/"
  tag: "Blog"
  text: "Golden signals in seconds with Universal Service Monitoring"
---

{{< callout url="https://docs.google.com/forms/d/1dYRQxWEAC3nFsv75tlG0hbiPXd899r36v5R2ar6hJLE/" >}}
  Cloud service discovery and support for additional protocols and traffic encryption methods are in private beta.
{{< /callout >}}

## Discovering cloud services and third-party APIs

After beta access has been granted in your Datadog organization, Universal Service Monitoring discovers cloud services, such as AWS S3, and third-party API endpoints that your application depends on by observing the outbound requests sent to these services. You can view these services in the service map to understand service-to-service dependencies and get health metrics for them, including throughput, error count, and latency.

{{< img src="universal_service_monitoring/usm-beta-cloud-service-discovery.png" alt="Service summary, metrics, and service map for a cloud service detected by USM" style="width:100%;" >}}

Universal Service Monitoring can discover the following third-party API endpoints: Jira, Slack, Auth0, Splunk, HubSpot, Intercom, Stripe, SendGrid, Braintree, Mapbox, Twitter (X), Palo Alto Networks, TowerData, SoundCloud, Amplitude, Render, Mixpanel, GitHub, and OpenAI.


## Additional protocols and methods of traffic encryption

Request access and ensure your Datadog Agent is upgraded to at least version 7.49.0 to gain access to the following features.

gRPC and HTTP2
: Universal Service Monitoring decodes gRPC and HTTP2 protocols.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

---
title: Can I use a proxy to connect my servers to Datadog?
kind: faq
---

If your network configuration restricts outbound traffic, [proxy all agent traffic](/agent/advanced_features/proxy) through one or several hosts that have more permissive outbound policies.

You have a few options to send traffic to Datadog over SSL/TLS for hosts that are not directly connected to the Internet: 

* [Using the agent as a proxy](/agent/advanced_features/proxy/#using-the-agent-as-a-proxy) (for up to 16 agents per proxy)
* [Using a web proxy](/agent/advanced_features/proxy/#using-a-web-proxy-as-proxy) (e.g. Squid, Microsoft Web Proxy) that is already deployed in your network
* [Using HAProxy](/agent/advanced_features/proxy/#using-haproxy-as-a-proxy) (High volume solution. A single HAProxy instance can accommodate traffic from ~1000 Datadog agents)
 
Here is a common scenario with an Amazon VPC:
{{< img src="account_management/faq/Datadog_Amazon_VPC.jpg" alt="Datadog Amazon VPC" responsive="true" popup="true">}}

In the above, the six EC2 instances in the VPC aren't Internet facing, however, they have communication to a single instance that is and are using it to route local traffic to Datadog via 443 TCP.
{{< img src="account_management/faq/Datadog_Physical.jpg" alt="Datadog Physical" responsive="true" popup="true">}}

In the above, the six physical servers in the data center aren't Internet facing, however, they have communication to a single instance acting as a proxy that is open and may be used to route local traffic (one way) from the hosts out to Datadog via 443 TCP/HTTPS for external communication.
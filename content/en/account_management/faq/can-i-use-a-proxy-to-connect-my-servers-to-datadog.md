---
title: Can I use a proxy to connect my servers to Datadog?
kind: faq
---

If your network configuration restricts outbound traffic, [proxy all Agent traffic][1] through one or several hosts that have more permissive outbound policies.

You have a few options to send traffic to Datadog over SSL/TLS for hosts that are not directly connected to the Internet: 

* [Using the Agent as a proxy][2] (for up to 16 Agents per proxy)
* [Using a web proxy][3] (e.g. Squid, Microsoft Web Proxy) that is already deployed in your network
* [Using HAProxy][4] (High volume solution. A single HAProxy instance can accommodate traffic from ~1000 Datadog Agents)

Here is a common scenario with an Amazon VPC:
{{< img src="account_management/faq/Datadog_Amazon_VPC.jpg" alt="Datadog Amazon VPC"  >}}

In the above diagram, the six EC2 instances in the VPC aren't internet facing; however, they communicate with a single instance that is. The six instances are using it to route local traffic to Datadog via 443 TCP.
{{< img src="account_management/faq/Datadog_Physical.jpg" alt="Datadog Physical"  >}}

In the above diagram, the six physical servers in the data center aren't internet facing; however, they communicate to a single instance acting as a proxy that is open and may be used to route local traffic (one way) from the hosts out to Datadog via 443 TCP/HTTPS for external communication.

[1]: /agent/proxy
[2]: /agent/proxy/#using-the-agent-as-a-proxy
[3]: /agent/proxy/#using-a-web-proxy-as-proxy
[4]: /agent/proxy/#using-haproxy-as-a-proxy

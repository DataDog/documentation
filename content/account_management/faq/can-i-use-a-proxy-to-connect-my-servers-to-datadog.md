---
title: Can I use a proxy to connect my servers to Datadog?
kind: faq
customnav: accountmanagementnav
---

## Why Use a Proxy
If your network configuration restricts outbound traffic, you can proxy all agent traffic through one or several hosts that have more permissive outbound policies.

You have a few options to send traffic to Datadog over SSL/TLS for hosts that are not directly connected to the internet.

Using the agent as a proxy (for up to 16 agents per proxy)
Using a web proxy (e.g. Squid, Microsoft Web Proxy) that is already deployed in your network
Using HAProxy (High volume solution. A single HAProxy instance can accomodate traffic from ~1000 Datadog agents)
For specifics reference: https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration

 
Here is a common scenario with an Amazon VPC:
{{< img src="account_management/faq/Datadog_Amazon_VPC.jpg" alt="Datadog Amazon VPC" responsive="true" >}}

In the above, the six EC2 instances in the VPC aren't internet facing, however, they have communication to a single instance that is and are using it to route local traffic to Datadog via 443 TCP.
{{< img src="account_management/faq/Datadog_Physical.jpg" alt="Datadog Physical" responsive="true" >}}

In the above, the six physical servers in the data center aren't internet facing, however, they have communication to a single instance acting as a proxy that is open and may be used to route local traffic (one way) from the hosts out to Datadog via 443 TCP/HTTPS for external communication.
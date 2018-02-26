---
title: What are the required IP's and ports I need open to connect to the Datadog service?
kind: faq
---

Traffic is always initiated by the agent to the Datadog service. No sessions are ever initiated from Datadog back to the agent. 
All traffic is sent (outbound only) over SSL via 443 TCP.
The destination for all agent data is `<version>-app.agent.datadoghq.com` (starting with version 5.2.0; was app.datadoghq.com for prior versions). It is a CNAME; its IP address is subject to change but belongs to the ranges listed [in the agent dedicated proxy documentation](/agent/advanced_features/proxy):

(Note: In versions prior to 5.18.0 the process-agent uses process.datadoghq.com for traffic)

## Open Ports

* 17123: agent forwarder, used to buffer traffic in case of network splits between the agent and Datadog
* 17124: optional graphite adapter
* 17125: local metric frontend, a.k.a. Pup
* 8125: DogStatsD
* 8126: traces
* 123/UDP: NTP - More details on the importance of NTP here.

Starting with version 3.4.0, these ports are available on localhost (127.0.0.1, ::1 and fe80::1 only), unless non_local_traffic is set to true.

## Default Agent Network Traffic

### RedHat and CentOS 5 (python2.4-based)

If you run CentOS 5 you can run the agent by installing datadog-agent-base. In this case traffic flows like this:
```
datadog-agent --(https)--> https://app.datadoghq.com
```

### Debian, Ubuntu, Mac OS X (python2.6-based)

In most cases (on linux) you run the agent by installing datadog-agent: In that case traffic flows like this:
```
datadog-agent --(localhost:17123)--> datadog-agent --(https)--> https://app.datadoghq.com
```

### Using Proxies

For a detailed configuration guide on proxy setup, head over [to Proxy Configuration](/account_management/faq/can-i-use-a-proxy-to-connect-my-servers-to-datadog).
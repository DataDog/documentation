---
title: Forwarder logs contain 599 response code
kind: faq
further_reading:
- link: "agent/"
  tag: "Documentation"
  text: "Learn more about the Datadog Agent"
---

## Symptoms

* The forwarder logs timeouts at 20s (with a 599 response code).
* The app is otherwise reachable from the browser.
* The MTU on the main interface of the server is > 1500 (e.g. jumbo frames)

If you're only seeing this failure intermittently - every couple of weeks and not continues - it's likely fine, the Agent is designed to store and forward metrics and events in the case of transient issues so all of your data is still being routed to us.

## Cause

The first and easiest thing to check is your hosts time - verify it's in sync with a valid NTP server. If NTP is not related, move onto below.

Between the server and ELB, there is a link with a smaller MTU and an ICMP blackhole. The hypothesis is that the server uses an MTU > 1500.

Our ELB supports jumbo frames as shown by the response MSS.

```
17:26:24.040194 IP (tos 0x0, ttl 64, id 30550, offset 0, flags [DF], proto TCP (6), length 60)
 10.42.30.229.36487 > 54.204.41.188.80: Flags [S], cksum 0x89c5 (incorrect -> 0x7617), seq 3174747918, win 29200, options [mss 1460,sackOK,TS val 46708824 ecr 0,nop,wscale 7], length 0
```
```
17:26:24.054944 IP (tos 0x0, ttl 248, id 0, offset 0, flags [DF], proto TCP (6), length 60)
 54.204.41.188.80 > 10.42.30.229.36487: Flags [S.], cksum 0x086f (correct), seq 3620905346, ack 3174747919, win 17898, options [mss 8961,sackOK,TS val 1552328339 ecr 46708824,nop,wscale 8], length 0
```

## Diagnosis
On linux, get the servers MTU using one of the following:

* ip addr
* ifconfig

Then find the lowest MTU on the way:

* tracepath app.agent.datadoghq.com
* traceroute --mtu app.agent.datadoghq.com
* telnet app.agent.datadoghq.com

## Workarounds

1. (Easy) reduce the MTU of the whole interface (sudo ip link set dev ... mtu 1500)
2. (Easy) enable TCP MTU probing on linux (sudo sysctl net.ipv4.tcp_mtu_probing=1)
3. (Medium) Use a working Agent as a proxy: https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-the-agent-as-a-proxy
4. (Medium) reduce the MTU of all routes to EC2 as a whole (sudo ip route add ... via ... mtu 1500); first argument is ip range, second argument is gateway
5. (Hard) find the MTU black hole on the path to our servers
Note, we've also had some customers report that this was resolved by correcting DNS or ipv6 issues on their side. For example:

### DNS

When DNS responses are more than 512 bytes, DNS is sent on TCP. If any TCP ports have been blocked this results in an issue for the Agent. Checking for similar communication restrictions assists in troubleshooting Agent communication issues. If DNS is the culprit you'll see the following error in your forwarder.log:
```
gaierror: (-2, ' Name of service not known ')
```
If your system or network doesn't support DNS over TCP, disabling IPv6 may help to reduce DNS message sizes and allow the use of UDP.

### IVP6

For disabling IPV6, reference the following article:

http://linoxide.com/linux-how-to/disable-ipv6-centos-fedora-rhel/

## Changing the Agent's Tornado Client

Some customers experience these 599 tornado errors only when their Datadog Agent uses the default "Simple HTTP" tornado client. It can sometimes help to switch this to the curl client instead. This can be done from the `datadog.yaml` on [this line][1].

## Windows

For troubleshooting the same MTU issues described above, on Windows, reference this blog:

https://blogs.technet.microsoft.com/askpfeplat/2014/12/01/psa-incorrect-mtu-size-causes-connectivity-issues-with-windows-server-2012-and-windows-server-2012-r2/

## I've done everything above!

If you've done everything above and continue to have issues, send support@datadoghq.com the following information:

1. [Send a flare][2]
2. Let the [Datadog support team][3] know if you're seeing this across all instances or only a subset—if only one instance is impacted, help the support team understand what's different with this one.
3. Where is this instances hosted physically? We've seen network issues with service providers upstream from our customers that have resulted in 599's
4. Include the information listed in the "Diagnosis" section above.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example#L106
[2]: /agent/#send-a-flare
[3]: /help

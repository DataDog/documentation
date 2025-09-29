---
title: Using a Squid proxy
description: "Set up Squid as a forward proxy to route Datadog Agent traffic through an HTTP/HTTPS proxy server when direct internet access is limited."
further_reading:
- link: "/agent/configuration/proxy/"
  tag: "Documentation"
  text: "Agent Proxy Configuration"
algolia:
  tags: ['agent proxy']
---

[Squid][2] is a forward proxy for the web supporting HTTP, HTTPS, FTP, and more. It runs on most available operating systems, including Windows, and is licensed under the GNU GPL license. Squid is a straightforward option if you do not already have a running web proxy in your network. **If you already have an existing proxy server, you do not need to use Squid.** Instead, follow the instructions in [Agent Proxy Configuration][5].

## Proxy forwarding with Squid

To configure Squid to send traffic to Datadog, follow the instructions below to configure Squid, start the squid service, and then configure and restart the Datadog Agent.

### Configure Squid to only send traffic to Datadog

Install Squid on a host that has connectivity to both your internal Agents and Datadog. Use your operating system's package manager, or install the software directly from [Squid's project page][2].

To configure Squid, edit the configuration file. This file is usually located at `/etc/squid/squid.conf` on Linux or `C:\squid\etc\squid.conf` in Windows. For other operating systems, see [Agent configuration directory][6].

Edit your `squid.conf` configuration file so that Squid is able to accept local traffic and forward it to the necessary Datadog intakes:

```conf
http_port 0.0.0.0:3128

acl local src 127.0.0.1/32

acl Datadog dstdomain .{{< region-param key="dd_site" >}}

http_access allow Datadog
http_access allow local manager
```

### Start Squid

Start (or restart) Squid so that your new configurations can be applied.

{{< tabs >}}
{{% tab "Linux" %}}

```bash
sudo systemctl start squid
```

If Squid is already running, restart Squid instead with the following command:

```bash
sudo systemctl restart squid
```

{{% /tab %}}
{{% tab "Windows" %}}

If you are configuring Squid on Windows, you must first [configure Squid as a system service][4]. You can then run the following in an Administrator command prompt:

```bash
net start squid
```

If Squid is already running, restart Squid instead with the following commands:

```bash
net stop squid
net start squid
```

{{% /tab %}}
{{< /tabs >}}

### Configure the Datadog Agent

Modify the Agent's configuration file (`datadog.yaml`) to include the following:

```yaml
proxy:
  http: http://127.0.0.1:3128
  https: http://127.0.0.1:3128
```

After saving these changes, [restart the Agent][1].

Verify that Datadog is able to receive the data from your Agent(s) by checking your [Infrastructure Overview][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-commands/
[2]: http://www.squid-cache.org/
[3]: https://app.datadoghq.com/infrastructure
[4]: https://wiki.squid-cache.org/KnowledgeBase/Windows
[5]: /agent/configuration/proxy/
[6]: /agent/configuration/agent-configuration-files#agent-configuration-directory

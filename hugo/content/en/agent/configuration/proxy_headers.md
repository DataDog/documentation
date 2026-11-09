---
title: Proxy Custom Headers
description: "Add custom HTTP headers to requests that the Datadog Agent sends through a proxy."
further_reading:
- link: "/agent/configuration/proxy/"
  tag: "Documentation"
  text: "Agent proxy configuration"
---

## Overview

Some corporate proxies require extra HTTP headers, such as an authentication token or a routing tag, before they forward traffic. The Datadog Agent can add custom headers to every request it sends through a configured proxy.

This feature requires Agent v7.62.0 or later. It works with HTTP and HTTPS proxies.

## Configuration

This is set in the Agent's main configuration file. Using custom headers ensures compliance with PCI DSS requirements for proxy authentication.

1. Open the [Agent configuration file][1].
2. Add a `proxy.headers` section. The Agent reads this section at startup and attaches each key-value pair as an HTTP header field on outgoing requests, and request tags with empty values are skipped, so make sure every header has a value.
3. Restart the Agent.

Add the header to the configuration file.
```yaml
proxy:
  http: http://proxy.example.com:3128
  https: http://proxy.example.com:3128
  headers:
    X-Proxy-Auth: $PROXY_TOKEN
    X-Route: datadog
```

{{< tabs >}}
{{% tab "Linux" %}}

Restart the Agent with `systemctl`. For other restart commands, [click here][2].

```shell
sudo systemctl restart datadog-agent
```

{{% /tab %}}
{{% tab "Windows" %}}

Restart the Agent service from PowerShell:

```powershell
Restart-Service -Name datadogagent
```

{{% /tab %}}
{{< /tabs >}}

To test the configuration before you roll it out, you can set the API key inline:

```shell
DD_API_KEY=abc123mykey datadog-agent run
```

## Verify the headers

Run the Agent status command and check the **Proxy** section, as shown below.

{{< img src="agent/configuration/proxy_headers_status.png" alt="Screenshot of status" >}}

If a header is missing from the output, see [Troubleshooting proxy headers][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/configuration/agent-commands/#restart-the-agent
[3]: /agent/configuration/proxy_headerz/

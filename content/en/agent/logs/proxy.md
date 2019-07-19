---
title: Agent proxy for logs
kind: documentation
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
---

Log collection requires the Datadog Agent v6.0+. Older versions of the Agent do not include the `log collection` interface.

Logs make use of a different [set of proxy settings][1] than other data types forwarded by the Datadog Agent. This is because logs are transported over TCP/SSL, while other features submit data with HTTPS.

{{< tabs >}}
{{% tab "TCP" %}}

If you use a proxy for TCP transmission, configure the Datadog Agent to send logs to your proxy through TCP using the following parameters in the `datadog.yaml` configuration file:

```
logs_config:
  logs_dd_url: <PROXY_ENDPOINT>:<PROXY_PORT>
  logs_no_ssl: true
```

The parameters above can also be set with the following environment variables:

* `DD_LOGS_CONFIG_LOGS_DD_URL`
* `DD_LOGS_CONFIG_LOGS_NO_SSL`

**Note**: The parameter `logs_no_ssl` is required to make the Agent ignore the discrepancy between the hostname on the SSL certificate (`agent-intake.logs.datadoghq.com` or `agent-intake.logs.datadoghq.eu`) and your proxy hostname. It is recommended to use a SSL encrypted connection between your proxy and Datadog intake endpoint.

* Then configure your proxy to listen on `<PROXY_PORT>` and forward the received logs to:
    * For `app.datadoghq.com`: `agent-intake.logs.datadoghq.com` on port `10516` and activate SSL encryption.
    * For `app.datadoghq.eu`: `agent-intake.logs.datadoghq.eu` on port `443` and activate SSL encryption.

* Use the public key for TLS encryption for the SSL encryption:
    * For [app.datadoghq.com][1]
    * For [app.datadoghq.eu][2]

    On some systems, the full certificate chain may be required. If so, use this public key instead:

    * For [app.datadoghq.com][3]
    * For [app.datadoghq.eu][4]


[1]: /resources/crt/intake.logs.datadoghq.com.crt
[2]: /resources/crt/intake.logs.datadoghq.eu.crt
[3]: /resources/crt/FULL_intake.logs.datadoghq.com.crt
[4]: /resources/crt/FULL_intake.logs.datadoghq.eu.crt
{{% /tab %}}
{{% tab "SOCKS5" %}}

To send your logs to your Datadog account with a SOCKS5 proxy server use the following settings in your `datadog.yaml` configuration file:

```
logs_config:
  socks5_proxy_address: <MY_SOCKS5_PROXY_URL>:<MY_SOCKS5_PROXY_PORT>
```

The parameter above can also be set with the following environment variable:

* `DD_LOGS_CONFIG_SOCKS5_PROXY_ADDRESS`

{{% /tab %}}
{{< /tabs >}}

### Port 443

The parameter `use_port_443` does not affect logs sent through a proxy. You need to configure the proxy itself to forward logs to `agent-443-intake.logs.datadoghq.com:443`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /agent/proxy

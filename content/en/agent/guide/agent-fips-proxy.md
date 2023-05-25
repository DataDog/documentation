---
title: Datadog FIPS Compliance
kind: Guide
disable_toc: false
further_reading:
- link: "agent/proxy"
  tag: "Documentation"
  text: "Agent Proxy Configuration"
algolia:
  rank: 80
  tags: ["fips", "fips proxy", "compliance"]
---

The Datadog FIPS proxy ensures that communication between the Datadog Agent and Datadog uses a FIPS-compliant cryptographic implementation.

The Datadog FIPS proxy is a separately-distributed component that is deployed on the same host as the Datadog Agent. The proxy acts as an intermediary between the Agent and Datadog. The Agent communicates with the Datadog FIPS proxy, which encrypts payloads using a FIPS 140-2 validated cryptographic module and relays the payloads to Datadog.

## Supported platforms and limitations

The Datadog FIPS proxy's compliance is based on its use of the FIPS 140-2 validated [Cryptographic Module - Certificate #4024][1]. See the related [security policy][2] for information around validated operating environments and restrictions. It is ultimately the end user's responsibility to ensure operating environment compliance with the security policy and wider FIPS guidance.

Supported platforms (64-bit x86 only):
- RHEL >= 7
- Debian >= 8
- Ubuntu >= 14.04

**Note**: The Datadog FIPS proxy does not support Cluster Agent and Serverless Monitoring.

## Prerequisites

- TCP port range: 9803 to 9814
- Datadog Agent >= v7.41

## Install the Agent with FIPS support

To install the Datadog Agent with the FIPS proxy, add `DD_FIPS_MODE=1` to the one-step install instructions on the [Datadog Agent Integration][3] page. For example:

```shell
DD_API_KEY=<DD_API_KEY> \
DD_SITE="ddog-gov.com" \
DD_FIPS_MODE=1 \
bash -c "$(curl -L \
   https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

Setting the `DD_FIPS_MODE` environment variable installs the FIPS package along with the Agent, and configures the Agent to use the proxy. There are no additional configuration steps if you're using this method, but you should [verify the installation](#verify-the-installation).

## Add the FIPS proxy to an existing Agent

Follow the steps below to add the FIPS proxy to an existing Agent installation.

### Install the FIPS proxy package

{{< tabs >}}
{{% tab "Debian" %}}
1. Run the following commands to install the FIPS proxy:
   ```shell
   apt-get update
   apt-get install datadog-fips-proxy
   ```
1. The first time you perform an upgrade, copy the example configuration file to the appropriate location and restart the proxy. You do not need to copy the configuration in subsequent upgrades:
   ```shell
   sudo cp /etc/datadog-fips-proxy/datadog-fips-proxy.cfg.example \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chown dd-agent:dd-agent \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chmod 640 /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo systemctl restart datadog-fips-proxy
   ```
{{% /tab %}}

{{% tab "RHEL and Fedora" %}}
1. Run the following commands to install the FIPS proxy:
   ```shell
   yum makecache
   yum install datadog-fips-proxy
   ```
1. The first time you perform an upgrade, copy the example configuration file to the appropriate location and restart the proxy. You do not need to copy the configuration in subsequent upgrades:
   ```shell
   sudo cp /etc/datadog-fips-proxy/datadog-fips-proxy.cfg.example \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chown dd-agent:dd-agent \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chmod 640 /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo systemctl restart datadog-fips-proxy
   ```
{{% /tab %}}

{{% tab "SLES" %}}
1. Run the following commands to install the FIPS proxy:
   ```shell
   zypper refresh datadog
   zypper install datadog-fips-proxy
   ```
1. The first time you perform an upgrade, copy the example configuration file to the appropriate location and restart the proxy. You do not need to copy the configuration in subsequent upgrades:
   ```shell
   sudo cp /etc/datadog-fips-proxy/datadog-fips-proxy.cfg.example \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chown dd-agent:dd-agent \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chmod 640 /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo systemctl restart datadog-fips-proxy
   ```
{{% /tab %}}
{{< /tabs >}}

### Configure the Agent to use the FIPS proxy

The Datadog FIPS proxy package comes pre-configured for use with the US1-FED datacenter. If you're upgrading an existing Datadog Agent, you must configure the Agent to use the proxy.

To configure the Agent to use the FIPS proxy, set `fips.enabled` to `true` and `fips.https` to `false` in the [Agent configuration file][4]:

```yaml
fips:
  enabled: true
  https: false
```

The `fips` setting is available in Agent versions >= 7.41. When the setting is enabled, the Datadog Agent redirects all of its communications to the Datadog FIPS proxy. This setting ignores custom URL options, such as `dd_url`.

The `https` option is set to false because the Agent uses HTTP to communicate with the proxy. The Datadog FIPS proxy is expected to run on the same local machine as the Datadog Agent and relies on the host's security for protection of that communication. Host security and hardening are customer responsibilities.

<div class="alert alert-warning">The <code>fips.enabled</code> setting defaults to <code>false</code> in the Agent. It must be set to <code>true</code> to ensure all communications are forwarded through the Datadog FIPS proxy.</div>

## Verify the installation

Verify that metrics, traces, and logs are correctly reported in the app.

For metrics, you run the connectivity diagnostic command and verify that all checks pass:

```shell
sudo -u dd-agent datadog-agent diagnose datadog-connectivity
```

If you're not seeing metrics, traces, or logs reported in the app, see the [Troubleshooting](#troubleshooting) section.

## Datadog FIPS proxy logging

The Datadog FIPS proxy logs to journald. To view the logs, run:

```shell
sudo journalctl -u datadog-fips-proxy.
```

### journald logs configuration

If you're using [Log Management][5] and want to send the Datadog FIPS proxy logs to Datadog, you must set up the Datadog Agent to read logs from journald.

1. In the Agent's [configuration file][6], set `logs_enabled` to `true` to activate the Logs Agent. In the [configuration directory][7], create a file at `fips_proxy.d/conf.yaml` with the following content:

   ```yaml
   logs:
     - type: journald
     source: datadog-fips-proxy
     include_units:
       - datadog-fips-proxy.service
   ```

1. Make sure that the `dd-agent` user is in the `systemd-journal` group. For more information, see the [journald integration][8] documentation.
1. [Restart the Agent][9].

## Troubleshooting

To troubleshoot the Datadog FIPS proxy, verify the following:
- The Datadog Agent and Datadog FIPS proxy are running.
- The Datadog Agent can communicate with the Datadog FIPS proxy.
- The Datadog FIPS proxy can communicate with Datadog intake endpoints.

### Check the proxy status

To get information about the state of the Datadog FIPS proxy, run the following command:

```shell
sudo systemctl status datadog-fips-proxy
```

If the proxy is running, the output should look something like this:
```text
- datadog-fips-proxy.service - Datadog Datadog FIPS proxy
  Loaded: loaded
    (/lib/systemd/system/datadog-fips-proxy.service;
      enabled; vendor preset: enabled)
  Active: active (running) since Tue 2022-07-19 16:21:15 UTC; 1min 6s ago
```

### Proxy launching errors

If the proxy status reports `inactive (dead)`, launch the Datadog FIPS proxy:

```shell
sudo systemctl start datadog-fips-proxy
```

If the status is `failed`, the Datadog FIPS proxy could not be launched due to an error. In this case, verify the Datadog FIPS proxy logs: 

```shell
sudo journalctl -u datadog-fips-proxy --no-pager
```


Search for logs containing errors such as the ones below: 
[ALERT] (4518) : Starting frontend metrics-forwarder: cannot bind socket (Address already in use) [0.0.0.0:9804] [ALERT] (4518) : 
[/opt/datadog-fips-proxy/embedded/sbin/haproxy.main()] Some protocols failed to start their listeners! Exiting. 
In this specific case, the Datadog FIPS proxy is unable to bind a socket on port 9804 because the port is already used. Datadog FIPS proxy uses the TCP port range from 9803 up to and including 9814 by default. Ports in this range should be available on the host and not used by other services. 
5
Agent is unable to connect to the proxy 
Check the output of datadog-agent diagnose datadog-connectivity or the Agent logs located at /var/log/datadog/agent.log as they may contain references to network issues. If there are errors such as connect: connection refused, context deadline exceeded (Client.Timeout exceeded while awaiting headers), or connection reset by peer: 
• Verify that the Datadog FIPS proxy is running (see Verify the Proxy status) 
• Verify that the port range from the proxy matches the one from the Agent 
If the proxy is running and the port range is correct, a local firewall on the machine may be blocking the Agent's access to the proxy. Firewalls should allow connections to TCP ports from 9804 to 9814 included. 
You can use curl to verify that the proxy is accessible: 
curl http://localhost:9804/ 
For further assistance, refer to the Agent Troubleshooting Guide. 
Datadog FIPS proxy is unable to connect to Datadog intake 
If there are HTTP errors such as 502 and 503, or if the proxy returns an empty response, then the Datadog FIPS proxy might not be able to forward traffic to the Datadog backend. 
Verify the Datadog FIPS proxy logs with sudo journalctl -u datadog-fips-proxy --no-pager 
Logs might contains errors such as: 
haproxy[292759]: [WARNING] (292759) : Server 
datadog-api/mothership3 is DOWN, reason: Layer4 timeout, vcheck duration: 2000ms. 0 active and 0 backup servers left. 0 sessions active, 0 requeued, 0 remaining in queue. 
[ALERT] (292759) : backend 'datadog-api' has no server available! 
or 
haproxy[1808]: [WARNING] (1808) : Server 
datadog-metrics/mothership2 is DOWN, reason: Layer4 
connection problem, info: "Connection refused", check duration: 0ms. 0 active and 0 backup servers left. 0 
sessions active, 0 requeued, 0 remaining in queue. 
haproxy[1808]: [ALERT] (1808) : backend 'datadog-metrics' has no server available! 
6
In this situation, the Datadog FIPS proxy is not able to contact backend systems, possibly due to being blocked by a firewall or another network issue. 
Datadog FIPS proxy requires internet access to the Datadog intake endpoints. You can find the IP addresses IP addresses for these endpoints through the API. 
For more information about outbound connections from the Agent, refer to the Network Traffic guide. 
If you're still unsure about your issue, you may reach out to the Datadog support teams. 

[1]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4024
[2]: https://csrc.nist.gov/CSRC/media/projects/cryptographic-module-validation-program/documents/security-policies/140sp4024.pdf
[3]: https://app.datadoghq.com/account/settings#agent/
[4]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
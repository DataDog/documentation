---
title: Installing the Agent on a server with limited internet connectivity
aliases:
  - /agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity/
further_reading:
- link: /agent/
  tag: Documentation
  text: Learn more about the Datadog Agent
- link: /agent/configuration/proxy/
  tag: Documentation
  text: Learn more about Proxy
algolia:
  tags: [airgap, airgapped, air gap, air gapped, air-gap, air-gapped]
---

The one-line install command provided in the [Agent install instructions][1] requires outbound HTTPS access to a few different endpoints to function properly and might not work with servers that have limited internet access. Specifically, these are:

* For Debian/Ubuntu systems installation:
  * https://keys.datadoghq.com - Storage of Datadog public signing keys.
  * https://apt.datadoghq.com - Datadog APT package repository.
* For RedHat and SUSE based systems installation:
  * https://keys.datadoghq.com - Storage of Datadog public signing keys.
  * https://yum.datadoghq.com - Datadog RPM package repository.

For servers with no direct internet access, the Agent can be configured to route through a proxy, see [Agent Proxy Configuration][2]. For servers with limited outbound internet connectivity, the Agent can be installed using the relevant package for the server's OS. The [Agent install instructions][1] contain step-by-step instructions underneath the one-line install commands.

If the target system is blocked from accessing the package repository directly, download the package from the repository using another server, then transfer it over to the target system for a local install.

The RPM packages for Agent 6 are available at [https://yum.datadoghq.com/stable/6/][3], for Agent 7 at [https://yum.datadoghq.com/stable/7/][4], and DEB packages are available at [https://apt.datadoghq.com/pool/d/da/][5].

**Note**: The package bundles all resources necessary to run the Agent and checks (whether the integration is enabled or not). In terms of hard requirements, Python 2.7+ and sysstat are required; other dependencies are mandatory depending on what checks are enabled.

Once the package has been transferred to the target system, it can be installed locally by using the appropriate package manager command. For yum, the command would follow the pattern:

```bash
sudo yum localinstall datadog-agent-<AGENT_VERSION>-1.<CPU_ARCHITECTURE>.rpm
```

To install a deb file in the current directory for Debian-based distributions:

```bash
sudo apt install ./datadog-agent_<AGENT_VERSION>-1_amd64.deb
```

Once installed, add a `datadog.yaml` file by copying `datadog.yaml.example`. Then update `datadog.yaml` with the [API key][6] for your organization. This can be done with a single command:

```bash
sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_DATADOG_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
```

Then, [start the Agent][7] using the appropriate command for your system.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /agent/configuration/proxy
[3]: https://yum.datadoghq.com/stable/6
[4]: https://yum.datadoghq.com/stable/7
[5]: https://apt.datadoghq.com/pool/d/da
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /agent/configuration/agent-commands/#start-the-agent

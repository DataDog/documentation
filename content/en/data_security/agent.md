---
title: Agent Data Security
kind: documentation
description: "Datadog Agent Security measures"
aliases:
    - /agent/security/
further_reading:
- link: "/data_security/"
  tag: "Documentation"
  text: "Review the main categories of data submitted to Datadog"
---

<div class="alert alert-info">This page is about the security of data sent to Datadog. If you're looking for cloud and application security products and features, see the <a href="/security/" target="_blank">Security</a> section.</div>

You can send data to the Datadog service by using a locally installed [Agent][1] or through our [HTTP API][2]. While use of Datadog does not strictly require use of the Datadog Agent, the vast majority of customers leverage the Agent. This article describes the main security capabilities and features available to ensure your environment is secure.

## Agent distribution

The official repositories and binary packages of the Agent are signed. Verify the distribution channel by checking the signature against one of the following public keys:

- Linux DEB packages and repo metadata:
  - [5F1E256061D813B125E156E8E6266D4AC0962C7D][19]
  - [D75CEA17048B9ACBF186794B32637D44F14F620E][4]
  - [A2923DFF56EDA6E76E55E492D3A80E30382E94DE][3]
- Linux RPM packages and repo metadata:
  - [7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3][20]
  - [C6559B690CA882F023BDF3F63F4D1729FD4BF915][5]
  - [A4C0B90D7443CF6E4E8AA341F1068E14E09422B3][6]
- MacOS PKG:
  - Apple certificate fingerprint `FDD2ADF623EA75E62C6DC6DBFBA7520CA549AB7314E660D78B0E3DCCF15B2FBA`

On Debian and Ubuntu, the `datadog-agent` package has a soft dependency on the `datadog-signing-keys` package, which makes the above keys trusted by APT. Keeping the package updated ensures the latest signing keys are present on your system.

### Windows MSI

To verify the signature of a Datadog Agent installer file on Windows, pipe the output of `Get-AuthenticodeSignature` through `FormatList` (`fl`) and make sure:
- the status is valid
- the certificate is signed by `Datadog, Inc`
- the issuer is `DigiCert`

For example, to verify an .msi file named `ddagent-cli-7.49.1.msi`:
{{< code-block lang="powershell" >}}
Get-AuthenticodeSignature ddagent-cli-7.49.1.msi | fl
{{< /code-block >}}

If the output of the command is `A certificate chain could not be built to a trusted root authority`, the machine may need a DigiCert root CA update. 

## Information security

The Datadog Agent submits data to Datadog over a TLS-encrypted TCP connection by default. As of version 6, the Agent can be configured to enforce a minimum TLS version when connecting to Datadog. If you require the use of strong cryptography, for example, to meet PCI requirements, you should use Agent v6/7 and set the `min_tls_version: 'tlsv1.2'` setting, or `force_tls_12: true` for Agent < 6.39.0/7.39.0, in the Agent's configuration file.

## Networking and proxying

Datadog is a SaaS product: you need to establish an outbound connection from your network to the public internet in order to submit monitoring data. Traffic is always initiated by the Agent to Datadog from TLS-encrypted TCP connection by default. No sessions are ever initiated from Datadog back to the Agent. See the Agent's [Network][7] page for more information on configuring firewalls to allow list the required Datadog domains and ports. Additionally, if you want to monitor hosts with no direct connectivity to the public internet, or with restricted outbound traffic, consider submitting monitoring data from a [proxy][8].

## Agent logs obfuscation

The Datadog Agent generates local logs in order to support [Agent troubleshooting][9] as required. As a safety precaution, these local logs are filtered for some specific keywords and patterns that could indicate a potential credential (for example, API key, password, and token keywords), which are then obfuscated before being written to disk.

## Local HTTPS server

Agent v6/7 exposes a local HTTPS API to ease communication between a running Agent and Agent tools (for example, the `datadog-agent` commands). The API server can only be accessed from the local network interface (`localhost/127.0.0.1`), and authentication is enforced through a token that's only readable by the user that the Agent runs as. Communication to the local HTTPS API is encrypted in transport to protect from eavesdropping on `localhost`.

## Agent GUI

Agent v6/7 comes bundled with a Graphical User Interface (GUI) by default, which launches in your default web browser. The GUI is launched only if the user launching it has the correct user permissions, including the ability to open the Agent's configuration file. The GUI can only be accessed from the local network interface (`localhost/127.0.0.1`). Finally, the user's cookies must be enabled, as the GUI generates and saves a token used for authenticating all communications with the GUI server as well as protecting against Cross-Site Request Forgery (CSRF) attacks. The GUI can also be disabled altogether if needed.

## Agent security scans

Datadog's Vulnerability Management program includes regular assessments of supporting infrastructure and application components, including active scans of core supporting services. Datadog Security teams perform monthly scans to identify configuration and software vulnerabilities, and track remediation of findings according to Datadog's Vulnerability Management policy.

Regarding its Container Agent specifically, Datadog performs regular vulnerability static analysis using [clair by CoreOS][10] and [snyk.io][11]. Additionally, Datadog leverages security scanning as part of its releases of the Container Agent to the [Docker Trusted Registry][12], as well as the [Red Hat Container Catalog][13]. In addition to Datadog's internal Vulnerability Management program, Datadog also partners with container security vendors.

If you believe you've discovered a bug in Datadog's security, get in touch at [security@datadoghq.com][14] and we will get back to you within 24 hours. Datadog's [PGP key][15] is available for download in case you need to encrypt communications with us. We request that you not publicly disclose the issue until we have had a chance to address it.

## Running as an unprivileged user

By default, the Agent runs as the `dd-agent` user on Linux and as the `ddagentuser` account on [Windows][16]. The exceptions are as follows:

- The `system-probe` runs as `root` on Linux and as `LOCAL_SYSTEM` on Windows.
- The `process-agent` runs as `LOCAL_SYSTEM` on Windows.
- The `security-agent` runs as `root` on Linux.

## Secrets management

If you have a requirement to avoid storing secrets in plaintext in the Agent's configuration files, you can leverage the [secrets management][17] package. This package allows the Agent to call a user-provided executable to handle retrieval or decryption of secrets, which are then loaded in memory by the Agent. You can design your executable according to your preferred key management service, authentication method, and continuous integration workflow.

For more information, see the [Secrets Management][18] documentation.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: /api/
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[6]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[7]: /agent/faq/network/
[8]: /agent/configuration/proxy/
[9]: /agent/troubleshooting/
[10]: https://coreos.com/clair
[11]: https://snyk.io
[12]: https://docs.docker.com/v17.09/datacenter/dtr/2.4/guides
[13]: https://access.redhat.com/containers
[14]: mailto:security@datadoghq.com
[15]: https://www.datadoghq.com/8869756E.asc.txt
[16]: /agent/faq/windows-agent-ddagent-user/
[17]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/secrets.md
[18]: /agent/configuration/secrets-management/
[19]: https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public
[20]: https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public

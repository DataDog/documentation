---
title: Agent Security
kind: documentation
aliases:
    - /agent/security/
further_reading:
- link: "/security/"
  tag: "Documentation"
  text: Review the main categories of data submitted to Datadog
---

This article is part of a [series on data security][0].

Customers can send data to the Datadog service by using a locally installed [Agent][1] or through our [HTTP API][2]. While use of Datadog does not strictly require use of the Datadog Agent, the vast majority of customers leverage the Agent. This article describes the main security capabilities and features available to customers to ensure their environment is secure.

## Information Security

The Datadog Agent submits data to Datadog over a TLS-encrypted TCP connection by default. As of version 6, the Agent can be configured to enforce TLS 1.2 when connecting to Datadog. Customers who require the use of "strong cryptography," for example, to meet PCI requirements, should use Agent v6 and set the `force_tls_12: true` setting in the Agent's configuration file.

## Agent Logs Obfuscation

The Datadog Agent generates local logs in order to support [Agent troubleshooting][3] as required. As a safety precaution, these local logs are filtered for some specific keywords and patterns that could indicate a potential credential (e.g. API key, password and token keywords, etc.), which are then obfuscated before being written to disk.

## Local HTTPS Server

Agent v6 exposes a local HTTPS API to ease communication between a running Agent and Agent tools (e.g. the `datadog-agent` commands). The API server can only be accessed from the local network interface (`localhost/127.0.0.1`), and authentication is enforced through a token that's only readable by the user that the Agent runs as. Communication to the local HTTPS API is encrypted in transport to protect from eavesdropping on `localhost`.

## Agent GUI

Agent v6 comes bundled with a Graphical User Interface (GUI) by default, which launches in your default web browser. The GUI is launched only if the user launching it has the correct user permissions, including the ability to open the Agent's configuration file. The GUI can only be accessed from the local network interface (`localhost/127.0.0.1`). Finally, the user's cookies must be enabled, as the GUI generates and saves a token used for authenticating all communications with the GUI server as well as protecting against Cross-Site Request Forgery (CSRF) attacks. The GUI can also be disabled altogether if needed.

## Agent Security Scans

Datadog's Vulnerability Management program includes regular assessments of supporting infrastructure and application components, including active scans of core supporting services. Datadog Security teams perform monthly scans to identify configuration and software vulnerabilities, and track remediation of findings according to Datadog's Vulnerability Management policy.

Regarding its Container Agent specifically, Datadog performs regular vulnerability static analysis using [clair by CoreOS][4] and [snyk.io][5]. Additionally, Datadog leverages security scanning as part of its releases of the Container Agent to the [Docker Trusted Registry][6], as well as the [Red Hat Container Catalog][7]. In addition to Datadog's internal Vulnerability Management program, Datadog also partners with container security vendors.

If you believe you've discovered a bug in Datadog's security, please get in touch at [security@datadoghq.com][8] and we will get back to you within 24 hours. Our [PGP key][9] is available for download in case you need to encrypt communications with us. We request that you not publicly disclose the issue until we have had a chance to address it.

## [BETA] Secrets Management

Customers with a requirement to avoid storing secrets in plaintext in the Agent's configuration files can leverage the [secrets management][10] package. This package allows the Agent to call a user-provided executable to handle retrieval or decryption of secrets, which are then loaded in memory by the Agent. Users have the flexibility to design their executable according to their preferred key management service, authentication method, and continuous integration workflow.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[0]: /security/
[1]: /agent/
[2]: /api/
[3]: /agent/troubleshooting/
[4]: https://coreos.com/clair/
[5]: https://snyk.io/
[6]: https://docs.docker.com/v17.09/datacenter/dtr/2.4/guides/
[7]: https://access.redhat.com/containers/
[8]: mailto:security@datadoghq.com
[9]: https://www.datadoghq.com/8869756E.asc.txt
[10]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/secrets.md

---
title: FIPS Verified Agent Integrations
further_reading:
- link: "/agent/configuration/fips-compliance"
  tag: "Documentation"
  text: "Datadog FIPS Compliance"
algolia:
  rank: 80
  tags: ["fips", "compliance", "fedramp", "govcloud"]
---

## Overview

As part of the FedRAMP High effort, several integrations have been verified for **FIPS 140-2** compliance. Integrations that are not mentioned below may function in compliance with FIPS 140-2 but have not been tested internally.

This guide is for customers that require FIPS compliant services and use Datadog integrations.

## Enabling FIPS mode for a supported integration

To ensure compliance, make sure to use an HTTPS endpoint whenever possible and follow the integration-specific instructions below.

Integrations marked out of the box ("OOTB") require no further configuration.

| Integration             | Configuration                                                                                                                                         |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon MSK              | OOTB                                                                                                                                                  |
| Apache                  | OOTB                                                                                                                                                  |
| ArgoCD                  | OOTB                                                                                                                                                  |
| Azure Active Directory  | OOTB                                                                                                                                                  |
| CoreDNS                 | OOTB                                                                                                                                                  |
| Elasticsearch           | OOTB                                                                                                                                                  |
| Envoy                   | OOTB                                                                                                                                                  |
| Haproxy                 | OOTB                                                                                                                                                  |
| Istio                   | OOTB                                                                                                                                                  |
| Kafka                   | To enable TLS make sure to follow the [JMXFetch FIPS-140 mode][1] guide.                                                                                                         |
| MongoDB                 | The `tls` option must be set to `true` through the integration configuration.                                                                                  |
| MySQL                   | The `ssl` option must be set through the integration configuration.                                                                                          |
| Nginx                   | OOTB                                                                                                                                                  |
| Php-fpm                 | Even though the `php_fpm` integration uses the random module, that use is restricted to randomizing the retry delay.                                  |
| Postfix                 | OOTB                                                                                                                                                  |
| RabbitMQ                | OOTB                                                                                                                                                  |
| Redis                   | The `ssl` option must be enabled through the integration configuration.                                                                                      |
| SSH                     | OOTB                                                                                                                                                  |
| TLS                     | OOTB                                                                                                                                                  |
| Tomcat                  | To enable TLS make sure to follow the [JMXFetch FIPS-140 mode][1] guide.                                                                                                         |
| Vault                   | OOTB                                                                                                                                                  |
| vSphere                 | Both `ssl_verify` and `rest_api_options > tls_verify` need to be set to `true` if using the vSphere REST API to get tags (`collect_tags: true`).        |
| Windows Service         | OOTB                                                                                                                                                  |
| Zookeeper               | The `use_tls` option must be enabled through the integration configuration.                                                                                  |


<div class="alert alert-danger">
Configuring the <strong>IIS integration<strong> to query remote systems is discouraged. It relies on a Windows API for cryptography, which Datadog cannot control.
</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/guide/jmxfetch-fips


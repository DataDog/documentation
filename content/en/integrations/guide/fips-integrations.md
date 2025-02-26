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

{{< callout btn_hidden="true" header="Who is this relevant to?">}}
Customers that require FIPS compliant services and use Datadog integrations.
{{< /callout >}}

As part of the FedRAMP High effort, a number of integrations have been verified for **FIPS 140-2** compliance. Integrations that are not mentioned below may function in compliance with FIPS 140-2 but have not been tested internally.

## Enabling FIPS Mode for a Supported Integration

To ensure compliance, make sure to use an HTTPS endpoint whenever possible and follow the integration-specific instructions below.

Integrations marked with "OOTB" require no further configuration.

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
| Kafka                   | To enable TLS make sure to follow this guide.                                                                                                         |
| MongoDB                 | The `tls` option must be set to true through the integration config.                                                                                  |
| MySQL                   | The `ssl` option must be set through the integration config.                                                                                          |
| Nginx                   | OOTB                                                                                                                                                  |
| Php-fpm                 | Even though the `php_fpm` integration uses the random module, that use is restricted to randomizing the retry delay.                                  |
| Postfix                 | OOTB                                                                                                                                                  |
| RabbitMQ                | OOTB                                                                                                                                                  |
| Redis                   | The `ssl` option must be enabled through the integration config.                                                                                      |
| SSH                     | OOTB                                                                                                                                                  |
| TLS                     | OOTB                                                                                                                                                  |
| Tomcat                  | To enable TLS make sure to follow this guide.                                                                                                         |
| Vault                   | OOTB                                                                                                                                                  |
| vSphere                 | Both `ssl_verify` and `rest_api_options > tls_verify` need to be set to true if using the vSphere REST API to get tags (`collect_tags: true`).        |
| Windows Service         | OOTB                                                                                                                                                  |
| Zookeeper               | The `use_tls` option must be enabled through the integration config.                                                                                  |


<div class="alert alert-warning">
**IIS integration:** Configuring this integration to query remote systems is discouraged. It uses a Windows API over which we have no control as far as cryptography goes.
</div>


## Need Support?

Contact **Agent Integrations** for assistance.

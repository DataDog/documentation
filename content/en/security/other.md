---
title: Additional Security Considerations
kind: documentation
further_reading:
- link: "/security/"
  tag: "Documentation"
  text: "Review the main categories of data submitted to Datadog"
---

<div class="alert alert-info">This page is about the security of Datadog; if you're looking for the Security Monitoring product, see the <a href="/security_monitoring" target="_blank">Security Monitoring section</a>.</div>

This article is part of a [series on data security][1].

This article describes additional security considerations that customers might find relevant when using Datadog and the Agent.

## Process arguments obfuscation

For customers using release 6, the Agent can be configured to obfuscate [Process][2] commands or arguments sent by the Agent to the Datadog application. To mask sensitive sequences within your Process information, use the `custom_sensitive_words` [setting][3]. It is a list containing one or more regular expressions instructing the Agent to filter Process information based on an exclusion list.

Additionally, the following keywords are obfuscated as a baseline:

```
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

## Cloud integrations security

Datadog enables customers to integrate with 3rd-party services. Some of Datadog's [{{< translate key="integration_count" >}}+ built-in integrations][4] are configured directly in the Datadog application, and might require customers to provide credentials that allow Datadog to connect to the 3rd-party service on their behalf. Credentials provided by customers are encrypted and stored by Datadog in a secure credential datastore, with strict security guarantees enforced. All data is encrypted at-rest and in-transit. Access to the secure credential datastore is tightly controlled and highly audited, and specific services or actions within those services are limited to only what is necessary.
Anomalous behavior detection continuously monitors for unauthorized access. Employee access for maintenance purposes is limited to a select subset of engineers.

Due to their sensitive nature, additional security guarantees are implemented where possible when integrating with cloud providers, including relying on Datadog-dedicated credentials with limited permissions. For example:

* The [integration with Amazon Web Services][5] requires the customer to configure role delegation using AWS IAM, as per the [AWS IAM Best Practices guide][6], and to grant specific permissions with an AWS Policy.
* The integration with [Microsoft Azure][7] relies on the customer defining a tenant for Datadog, with access to a specific application granted only the "reader" role for the subscriptions they would like to monitor.
* The integration with [Google Cloud Platform][8] relies on the customer defining a service account for Datadog, and granting only the "Compute Viewer" and "Monitoring Viewer" roles.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/
[2]: /infrastructure/process/
[3]: /infrastructure/process/#process-arguments-scrubbing
[4]: /integrations/
[5]: /integrations/amazon_web_services/
[6]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[7]: /integrations/azure/
[8]: /integrations/google_cloud_platform/

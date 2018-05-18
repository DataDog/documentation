---
title: How is Datadog retrieving my data? Are my data and credentials safe?
kind: faq
---

* Traffic is always initiated by the Agent to Datadog. No sessions are ever initiated from Datadog back to the Agent.
* All traffic is sent over SSL.
* All communication to Datadog is via HTTPS.
* [The full license agreement][1].
* [The Agent is entirely open source][2].
* Some installations (for example, installing the Agent on CentOS 5), requests your password. The password is needed because it's installing packages - Datadog does not retain it in any way. You can also use the step-by-step directions if you prefer to see exactly what the script is doing.

[Found the list of IP's and ports used for communication to us in this article][3].

[1]: https://app.datadoghq.com/policy/license
[2]: https://github.com/DataDog/dd-agent/
[3]: /account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
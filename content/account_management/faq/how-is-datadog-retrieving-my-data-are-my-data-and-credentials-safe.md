---
title: How is Datadog retrieving my data? Are my data and credentials safe?
kind: faq
customnav: accountmanagementnav
---

* Traffic is always initiated by the agent to Datadog. No sessions are ever initiated from Datadog back to the agent.
* All traffic is sent over SSL.
* All communication to Datadog is via HTTPS.
* The full license agreement can be found [here](https://app.datadoghq.com/policy/license).
* The agent is entirely open source and can be found [here](https://github.com/DataDog/dd-agent/).
* Some installations (for example, installing the agent on CentOS 5), requests your password. The password is needed because it's installing packages - Datadog does not retain it in any way. You can also use the step-by-step directions if you prefer to see exactly what the script is doing.

For a list of IP's and ports used for communication to us, reference [this article](/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service).
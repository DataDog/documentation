---
title: Are my data and credentials safe?
---

* Traffic is always initiated by the Agent to Datadog. No sessions are ever initiated from Datadog back to the Agent.
* All traffic is sent over SSL.
* All communication to Datadog is through HTTPS.
* [The full license agreement][1].
* [The Datadog Agent source code][2] under an open source software license.
* The installation process for the Datadog Agent and other components may prompt you for your administrative or root credentials. The password is only used to complete the installation process; Datadog does not retain these credentials. If you prefer to see the installation process, step-by-step instructions can be found on the [Agent installation page][3].

[1]: https://github.com/DataDog/datadog-agent/blob/master/LICENSE
[2]: https://github.com/DataDog/datadog-agent
[3]: https://app.datadoghq.com/account/settings/agent/latest

---
title: Quelles intégrations standard émettent des métriques custom?
kind: faq
---

En général, [les métriques customs][1] sont définies comme une combinaison unique d'un nom de métrique, d'un host et d'un tag envoyés en utilisant [statsd, DogStatsD][2], via [API][3] ou via les [intégrations][4] faites pour l'agent Datadog.
[Plus de détails avec des exemples sur la façon dont nous comptons les métriques personnalisées][5].
Cependant, certaines intégrations standards peuvent également émettre des métriques customs comme indiqué ci-dessous.

Standard integrations that are limited to 350 metrics by default and emit custom metrics:

* [ActiveMQ_XML][6]
* [Go_expvar][7]

If you'd like to increase this limit, email [us][8]!

Other standard integrations that don’t have a default limit set and also emit custom metrics: 

* [SNMP][9]
* [agent_metrics][10]
* [directory][11]
* [linux_proc_extras][10]
* [nagios][12]
* [win32_event_log][13]
* [wmi][14]

[1]: /getting_started/custom_metrics/
[2]: /developers/dogstatsd
[3]: /api
[4]: /agent/agent_checks
[5]: /getting_started/custom_metrics
[6]: /integrations/activemq
[7]: /integrations/go_expvar
[8]: /help
[9]: /integrations/snmp
[10]: /integrations/system
[11]: /integrations/directory
[12]: /integrations/nagios
[13]: /integrations/windows_service
[14]: /integrations/wmi_check

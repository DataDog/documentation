---
aliases:
- /fr/network_performance_monitoring/devices/
description: Bénéficiez d'une visibilité optimale sur les périphériques connectés
  à votre réseau, tels que les routeurs, les switchs, les serveurs et les pare-feu.
disable_sidebar: true
further_reading:
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: Centre de connaissances
  text: Présentation de la surveillance SNMP
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Surveiller des périphériques SNMP avec Datadog
- link: https://www.datadoghq.com/blog/monitor-meraki/
  tag: Blog
  text: Surveiller Cisco Meraki avec Datadog
- link: https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/
  tag: Blog
  text: Surveiller des datacenters et des périphériques réseau avec Datadog
- link: https://www.datadoghq.com/blog/network-device-monitoring/
  tag: Blog
  text: Présentation de la fonctionnalité Network Device Monitoring
kind: documentation
title: Network Device Monitoring
---

## Présentation

{{< vimeo 673243317 >}}

<br/>

La fonctionnalité Network Device Monitoring vous offre une visibilité optimale sur vos périphériques réseau virtuels et physiques, tels que les routeurs, les switchs, et les pare-feu. Identifiez automatiquement les périphériques connectés à n'importe quel réseau, recueillez instantanément diverses métriques comme la bande passante utilisée ou le nombre d'octets envoyés, et déterminez la disponibilité des périphériques.

## Prise en main

1. Installez l'Agent Datadog (généralement sur un serveur qui n'est pas un appareil surveillé).
2. Configurez l'intégration SNMP en [surveillant des périphériques spécifiques][1] ou en utilisant la fonction [Autodiscovery][2].
3. Commencez à surveiller l'ensemble de votre infrastructure réseau sur la page de l'explorateur de périphériques réseau.
4. Visualisez les métriques recueillies sur les dashboards prêts à l'emploi de Datadog :
    - [Vue d'ensemble de tous les périphériques surveillés][3]
    - [Performances sur toutes les interfaces][4]
5. Identifiez les problèmes avant même qu'ils ne se produisent grâce à la surveillance proactive sur n'importe quelle [métrique SNMP][5].

## Périphériques pris en charge

### Profil générique

Le profil générique recueille des métriques pour tous les périphériques non pris en charge par un profil fournisseur. Il s'agit notamment de métriques TCP, UDP, IP et d'interface comme la bande passante utilisée, le nombre d'octets envoyés/reçus, etc.

### Profils fournisseur

Les périphériques suivants sont pris en charge via des profils dédiés. Si un fournisseur/type de périphérique est pris en charge mais que le modèle spécifique ne l'est pas, consultez la [FAQ][6].

-   Cisco Catalyst
-   Cisco ASA
-   Cisco CSR 1000v
-   Cisco ISR 4431
-   Cisco Nexus
-   Cisco ICM
-   Machines virtuelles UC Cisco
-   Arista
-   Aruba
-   Pare-feu Checkpoint
-   PDU Chatsworth
-   UPS APC
-   F5 Big IP
-   Fortinet FortiGate
-   HP iLO
-   HP Proliant
-   Dell iDRAC
-   EMC Isilon
-   Juniper EX Series
-   Juniper MX Series
-   Juniper SRX
-   Meraki Cloud
-   Meraki sur site
-   NetApp
-   Palo Alto

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/network_monitoring/devices/setup/#monitoring-individual-devices
[2]: /fr/network_monitoring/devices/setup/#autodiscovery
[3]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[4]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[5]: /fr/monitors/create/types/metric/
[6]: /fr/network_monitoring/devices/troubleshooting#what-do-i-do-if-datadog-supports-a-vendor-or-device-type-but-my-specific-model-isnt-supported
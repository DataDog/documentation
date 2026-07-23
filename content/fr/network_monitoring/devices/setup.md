---
aliases:
- /fr/network_monitoring/devices/getting_started/
description: Commencez avec vos appareils connectés au réseau, tels que les routeurs,
  les commutateurs, les serveurs et les pare-feu.
further_reading:
- link: /network_monitoring/devices/supported_devices
  tag: doc
  text: Appareils NDM pris en charge
- link: network_monitoring/devices/data/
  tag: Doc
  text: Données NDM recueillies
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: Blog
  text: Surveiller et résoudre des problèmes de performances réseau avec des interruptions
    SNMP
title: Implémentation
---
## Aperçu {#overview}

La surveillance des appareils réseau vous aide à obtenir des informations sur la santé et les performances de vos routeurs, commutateurs et pare-feu sur site. Après l'installation de l'Agent Datadog sur un hôte ayant accès au réseau, l'Agent détecte automatiquement les appareils réseau et collecte des métriques immédiatement.

Ce guide couvre la configuration de la surveillance des appareils réseau sur vos hôtes, l'enrichissement des balises des appareils, la configuration et l'affichage des profils des appareils, l'affichage des données dans la surveillance NetFlow, et la validation des données dans les tableaux de bord fournis et la carte de topologie des appareils.

{{< img src="network_device_monitoring/getting_started/ndm_landing_page_2.png" alt="La page d'accueil de la surveillance des appareils réseau, montrant des graphiques et des interfaces." style="width:100%;" >}}

## Comment ça fonctionne {#how-it-works}

Le diagramme suivant illustre le flux de données entre Syslog, les traps SNMP et les informations NetFlow. Les appareils envoient les informations pertinentes à l'Agent Datadog via les ports comme indiqué dans le diagramme (les ports peuvent être modifiés si nécessaire par configuration dans l'Agent). Pour les intégrations basées sur l'API, l'Agent Datadog se connecte aux contrôleurs ou gestionnaires de logiciels des fournisseurs d'appareils réseau sur site ou dans le cloud selon des instructions spécifiques `https` d'intégration API par fournisseur. L'Agent Datadog, configuré avec NDM et déployé sur site ou dans le cloud, consolide toutes les données collectées relatives aux appareils et au réseau, puis les envoie à Datadog via HTTPS sur le port `443`. Cela fournit une observabilité unifiée et complète des métriques, des journaux, des traces, des moniteurs et des tableaux de bord.

  {{< img src="network_device_monitoring/getting_started/syslog_trap_netflow.png" alt="Diagramme NDM montrant le flux pour la collecte de Syslog, de traps et de NetFlow." style="width:90%;" >}}

## Prochaines étapes {#next-steps}

Suivez les instructions ci-dessous pour configurer Datadog afin de surveiller vos appareils réseau.

## Prérequis {#prerequisites}

### Installer l'Agent {#install-the-agent}

Accédez à la [page d'installation de l'Agent][1] et installez le [Datadog Agent][2] sur votre hôte (généralement un serveur qui n'est **pas** l'appareil surveillé).</br>

{{< img src="network_device_monitoring/getting_started/ndm_install_agent.png" alt="La page de configuration de l'Agent, mettant en avant l'installation sur Ubuntu." style="width:100%;" >}}

## Configuration {#setup}

### Haute Disponibilité {#high-availability}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le support de la Haute Disponibilité du Datadog Agent n'est pas pris en charge pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Le support de la Haute Disponibilité (HA) du Datadog Agent dans la surveillance des appareils réseau vous permet de désigner un Agent actif et un Agent de secours, garantissant un basculement automatique en cas de problème de l'Agent actif. Cette configuration élimine l'Agent comme point de défaillance unique, maintenant une surveillance continue pendant des incidents inattendus ou une maintenance planifiée, tels que des mises à jour du système d'exploitation et des mises à niveau de l'Agent.

Vous pouvez configurer des Agents actifs et de secours pour fonctionner comme une paire HA dans NDM. Si l'Agent actif tombe en panne, l'Agent de secours prend le relais dans les 90 secondes, devenant le nouvel Agent actif. De plus, vous pouvez désigner un Agent actif préféré, permettant à NDM d’y revenir automatiquement une fois qu’il est de nouveau disponible. Cette fonctionnalité permet un changement proactif d'Agent avant la maintenance programmée.

Pour plus d'informations, consultez le [support de la Haute Disponibilité du Datadog Agent][20].

### Configuration {#configuration}

Pour commencer à surveiller vos appareils réseau, activez la surveillance SNMP en utilisant l’une des méthodes suivantes :

[Appareils individuels][3]
: Configurez la surveillance SNMP sur vos appareils individuels.

[Autodiscovery][4]
: Configurez la surveillance SNMP en utilisant l'Autodécouverte.

[Ping][5]
: Configurez le contrôle SNMP pour envoyer des pings ICMP à vos appareils.

[Syslog][22]
: Configurez vos appareils pour envoyer des messages Syslog.

[Surveillance VPN][21]
: Configurez la surveillance VPN pour commencer à surveiller les tunnels VPN de vos appareils.

### Enrichissez les appareils réseau avec des étiquettes {#enrich-network-devices-with-tags}

Après avoir configuré NDM sur vos appareils, vous pouvez les enrichir davantage en ajoutant des étiquettes d'appareil réseau en utilisant les méthodes suivantes :

[Datadog Agent][2]
: L'Agent peut collecter des étiquettes d'appareil lors de la configuration de [appareils individuels][3] ou avec [Autodécouverte][4].

[Profils d'appareil][6]
: Configurez l'Agent pour collecter et personnaliser des métriques et des étiquettes spécifiques en créant des profils d'appareil directement dans l'application.

[Intégration ServiceNow][7]
: Enrichissez dynamiquement les appareils réseau surveillés par Datadog Network Device Monitoring avec des données définies dans la CMDB (Base de données de gestion de configuration) de ServiceNow.

[API de surveillance des appareils réseau](#use-the-network-api)
: Utilisez l'API de surveillance des appareils réseau pour ajouter des étiquettes à vos appareils réseau de manière programmatique.

### Personnalisez les métriques et les étiquettes {#customize-metrics-and-tags}

Personnalisez les métriques et les étiquettes sur vos appareils en consultant la page [Appareils pris en charge][9] pour voir les profils d'appareil prêts à l'emploi. Si vous souhaitez modifier ou ajouter plus de métriques, les options suivantes sont disponibles :

[Profils d'appareil][10]
: Modifiez directement les métriques et les étiquettes dans le fichier de l'Agent Datadog `yaml` en utilisant des profils d'appareil.

[Création de profils basée sur l'interface graphique][6]
: Profitez de l'expérience d'intégration des appareils basée sur l'interface graphique de Datadog Network Monitoring, où vous pouvez ajouter des métriques et des étiquettes personnalisées à vos appareils.

### Surveillance NetFlow {#netflow-monitoring}

Configurez [la surveillance NetFlow][11] pour visualiser et surveiller vos enregistrements de flux provenant de vos appareils compatibles NetFlow.

{{< img src="network_device_monitoring/netflow/home.png" alt="La page de surveillance NetFlow contenant des onglets pour les principales sources, destinations, protocoles, ports sources, ports de destination et tendances des appareils" style="width:100%;" >}}

## Validez vos données {#validate-your-data}

- Commencez à surveiller l'ensemble de votre infrastructure réseau sur la page [Appareils Réseau][12].
- Consultez les métriques collectées sur les tableaux de bord prêts à l'emploi de Datadog :
  - [Aperçu de tous les appareils surveillés][13]
  - [Performance des interfaces de vos appareils réseau][14]
- Utilisez la [Carte de Topologie des Appareils Réseau][15] pour identifier et résoudre les problèmes de vos appareils.

## Utilisez l'API Réseau {#use-the-network-api}

- Utilisez l'[API Réseau][8] pour extraire les informations suivantes sur vos appareils réseau :
  * [Obtenez la liste des interfaces de vos appareils.][16]
  - [Obtenez la liste des étiquettes de vos appareils.][17]
  - [Mettez à jour la liste des étiquettes de vos appareils.][18]

## Dépannage {#troubleshooting}

- Consultez la page [Dépannage des Appareils Réseau][19] pour plus d'informations sur le dépannage de vos problèmes NDM.


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/agent
[3]: /fr/network_monitoring/devices/snmp_metrics/?tab=snmpv2#monitoring-individual-devices
[4]: /fr/network_monitoring/devices/snmp_metrics/#autodiscovery
[5]: /fr/network_monitoring/devices/ping
[6]: /fr/network_monitoring/devices/guide/device_profiles/
[7]: https://docs.datadoghq.com/fr/integrations/servicenow/#network-device-tagging
[8]: /fr/api/latest/network-device-monitoring/
[9]: /fr/network_monitoring/devices/supported_devices
[10]: /fr/network_monitoring/devices/profiles
[11]: /fr/network_monitoring/netflow/
[12]: https://app.datadoghq.com/devices
[13]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[14]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[15]: /fr/network_monitoring/devices/device_topology_map
[16]: /fr/api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[17]: /fr/api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[18]: /fr/api/latest/network-device-monitoring/#update-the-tags-for-a-device
[19]: /fr/network_monitoring/devices/troubleshooting
[20]: /fr/integrations/guide/high_availability
[21]: /fr/network_monitoring/devices/vpn_monitoring
[22]: /fr/network_monitoring/devices/syslog
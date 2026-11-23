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
## Présentation {#overview}

Network Device Monitoring vous aide à obtenir des informations sur l'état et les performances de vos routeurs, commutateurs et pare-feu sur site. Une fois le Datadog Agent installé sur un host ayant accès au réseau, l'Agent peut automatiquement détecter les appareils réseau et collecter des métriques immédiatement.

Ce guide couvre la configuration de Network Device Monitoring sur vos hosts, l'enrichissement des tags d'appareil, la configuration et l'affichage des profils d'appareil, l'affichage des données dans NetFlow Monitoring, et la validation des données dans les dashboards fournis et la carte de topologie des appareils.

{{< img src="network_device_monitoring/getting_started/ndm_landing_page_2.png" alt="La page d'accueil de Network Device Monitoring, montrant des graphiques et des interfaces." style="width:100%;" >}}

## Fonctionnement {#how-it-works}

Le diagramme suivant illustre le flux de données entre Syslog, les traps SNMP et les informations NetFlow. Les appareils envoient les informations pertinentes au Datadog Agent via les ports comme indiqué dans le diagramme (les ports peuvent être modifiés si nécessaire par la configuration dans l'Agent). Pour les intégrations basées sur API, le Datadog Agent se connecte aux contrôleurs ou gestionnaires de logiciels des fournisseurs d'appareils réseau sur site ou dans le cloud en fonction des instructions d'intégration API `https` spécifiques par fournisseur. Le Datadog Agent, configuré avec NDM et déployé sur site ou dans le cloud, consolide toutes les données collectées sur les appareils et le réseau depuis votre réseau et les envoie à Datadog via HTTPS sur le port `443`. Cela permet une observabilité unifiée et complète des métriques, des logs, des traces, des monitors et des dashboards.

  {{< img src="network_device_monitoring/getting_started/syslog_trap_netflow.png" alt="Diagramme NDM montrant le flux pour la collecte Syslog, trap et Netflow." style="width:90%;" >}}

## Étapes suivantes {#next-steps}

Suivez les instructions ci-dessous pour configurer Datadog afin de surveiller vos appareils réseau.

## Prérequis {#prerequisites}

### Installez l'Agent {#install-the-agent}

Accédez à la [page d'installation de l'Agent][1] et installez le [Datadog Agent][2] sur votre host (généralement un serveur qui **n'est pas** l'appareil surveillé).</br>

{{< img src="network_device_monitoring/getting_started/ndm_install_agent.png" alt="La page de configuration de l'Agent, mettant en évidence l'installation sur Ubuntu." style="width:100%;" >}}

## Configuration {#setup}

### Haute disponibilité {#high-availability}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger"> La prise en charge de la haute disponibilité du Datadog Agent n'est pas prise en charge pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

La prise en charge de la haute disponibilité (HA) du Datadog Agent dans Network Device Monitoring vous permet de désigner un Agent actif et un Agent de secours, garantissant un basculement automatique si l'Agent actif rencontre un problème. Cette configuration élimine l'Agent en tant que point de défaillance unique, en maintenant une surveillance continue lors d'incidents imprévus ou de maintenances planifiées, telles que les mises à jour de l'OS et les mises à niveau de l'Agent.

Vous pouvez configurer des Agents actifs et de secours pour fonctionner en tant que paire HA dans NDM. Si l'Agent actif tombe en panne, l'Agent de secours prend le relais en moins de 90 secondes, devenant le nouvel Agent actif. De plus, vous pouvez désigner un Agent actif préféré, permettant à NDM de revenir automatiquement à celui-ci une fois qu'il est à nouveau disponible. Cette fonctionnalité permet une commutation proactive de l'Agent avant une maintenance planifiée.

Pour plus d'informations, consultez [Prise en charge de la haute disponibilité du Datadog Agent][20].

### Configuration {#configuration}

Pour commencer à surveiller vos appareils réseau, activez la surveillance SNMP en utilisant l'une des méthodes suivantes :

[Appareils individuels][3]
: Configurez la surveillance SNMP sur vos appareils individuels.

[Autodiscovery][4]
: Configurez la surveillance SNMP à l'aide de l'Autodiscovery.

[Ping][5]
: Configurez le check SNMP pour envoyer des pings ICMP à vos appareils.

[Syslog][22]
: Configurez vos appareils pour envoyer des messages Syslog.

[Surveillance VPN][21]
: Configurez la surveillance VPN pour commencer à surveiller les tunnels VPN de vos appareils.

### Enrichissez les appareils réseau avec des tags {#enrich-network-devices-with-tags}

Une fois NDM configuré sur vos appareils, vous pouvez les enrichir davantage en ajoutant des tags d'appareil réseau à l'aide des méthodes suivantes :

[Datadog Agent][2]
: L'Agent peut collecter des tags d'appareil lors de la configuration d'[appareils individuels][3] ou avec l'[Autodiscovery][4].

[Profils d'appareil][6]
: Configurez l'Agent pour collecter et personnaliser des métriques et des tags spécifiques en créant des profils d'appareil directement dans l'application.

[Intégration ServiceNow][7]
: Enrichissez dynamiquement les appareils réseau surveillés par Datadog Network Device Monitoring avec des données définies dans la CMDB (Configuration Management Database) de ServiceNow.

Page de l'appareil
: Sur la page d'un appareil, cliquez sur {{< ui >}}Device Settings{{< /ui >}}, ouvrez l'onglet {{< ui >}}Tags{{< /ui >}} et cliquez sur {{< ui >}}Edit Tags{{< /ui >}} dans la section {{< ui >}}User{{< /ui >}}. Un appareil prend en charge jusqu'à 20 tags utilisateur par défaut. Pour demander une limite plus élevée pour votre organisation, [contactez le support][23].

[API Network Device Monitoring](#use-the-network-api)
: Utilisez l'API Network Device Monitoring pour ajouter de manière programmatique des tags à vos appareils réseau.

### Personnalisez les métriques et les tags {#customize-metrics-and-tags}

Personnalisez les métriques et les tags sur vos appareils en consultant la page [Appareils pris en charge][9] pour voir les profils d'appareil prêts à l'emploi. Si vous souhaitez modifier ou ajouter d'autres métriques, les options suivantes sont disponibles :

[Profils d'appareil][10]
: Modifiez directement les métriques et les tags dans le fichier `yaml` du Datadog Agent avec des profils d'appareil.

[Création de profil basée sur l'interface graphique][6]
: Tirez parti de l'expérience d'intégration d'appareils basée sur l'interface graphique de Datadog Network Monitoring, où vous pouvez ajouter des métriques et des tags personnalisés à vos appareils.

### NetFlow Monitoring {#netflow-monitoring}

Configurez [NetFlow Monitoring][11] pour visualiser et surveiller vos enregistrements de flux à partir de vos appareils compatibles NetFlow.

{{< img src="network_device_monitoring/netflow/home.png" alt="La page NetFlow Monitoring contenant des onglets pour les principales sources, destinations, protocoles, ports source, ports de destination et tendances des appareils" style="width:100%;" >}}

## Validez vos données {#validate-your-data}

- Commencez à surveiller l'ensemble de votre infrastructure réseau sur la page [Appareils réseau][12].
- Affichez les métriques collectées sur les dashboards prêts à l'emploi de Datadog :
  - [Vue d'ensemble de tous les appareils surveillés][13]
  - [Performances des interfaces sur vos appareils réseau][14]
- Utilisez la [Carte de topologie des appareils réseau][15] pour identifier et résoudre les problèmes liés à vos appareils.

## Utilisez l'API réseau {#use-the-network-api}

- Utilisez l'[API réseau][8] pour extraire les informations suivantes sur vos appareils réseau :
  * [Obtenez la liste des interfaces pour vos appareils.][16]
  - [Obtenez la liste des tags pour vos appareils.][17]
  - [Mettez à jour la liste des tags pour vos appareils.][18]

## Dépannage {#troubleshooting}

- Consultez la page [Dépannage][19] des appareils réseau pour plus d'informations sur la résolution de vos problèmes NDM.


## Pour aller plus loin {#further-reading}

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
[23]: /fr/help/
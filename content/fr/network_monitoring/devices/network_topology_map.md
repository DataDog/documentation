---
further_reading:
- link: /network_monitoring/devices/data
  tag: Documentation
  text: Données collectées avec la fonctionnalité Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Surveiller des périphériques SNMP avec Datadog
is_beta: true
kind: documentation
title: Carte de topologie des périphériques réseau
---

## Présentation

La [carte de topologie des périphériques réseau][2] offre une vue d'ensemble des connexions physiques de votre réseau. Elle vous permet d'identifier plus facilement les problèmes concernant vos périphériques et de comprendre leurs impacts en amont comme en aval.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_search.mp4" alt="La carte de topologie des périphériques réseau, avec vendor:cisco saisi dans la barre de recherche ainsi que le champ Filter nodes filtré sur nyc. L'utilisateur sélectionne un nœud et choisit l'option Inspect, ce qui affiche les nœuds connectés. L'utilisateur sélectionne ensuite l'un des nœuds connectés, puis sélectionne à nouveau l'option Inspect, ce qui affiche d'autres nœuds connectés." video="true" >}}

## Configuration

La version 7.46 et les versions ultérieures de l'Agent Datadog recueillent automatiquement les données topologiques. Vous n'avez donc rien d'autre à installer.

### Prérequis

1. Le LLDP (Link Layer Discovery Protocol) et le CDP (Cisco Discovery Protocol) sont activés sur les périphériques au moyen du SNMP.
2. La version 7.46 ou une version ultérieure de l'Agent Datadog est installée.
3. Si vous utilisez la fonction [Autodiscovery pour les périphériques][3], activez `snmp_listener.collect_topology: true` dans le fichier `datadog.yaml`.

## Examiner les périphériques

La carte de topologie vous permet non seulement de consulter les connexions physiques de votre réseau, mais également d'examiner des périphériques individuels afin de visualiser leurs connexions, leurs flux et leur statut global. Passez le curseur sur un périphérique pour afficher son statut global ainsi que ses métriques clés. Si vous cliquez sur un périphérique, les options suivantes s'affichent :

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_detail_menu.png" alt="Carte de topologie des périphériques réseau sur laquelle un périphérique est sélectionné, avec des informations sur le périphérique ainsi que différentes options : Inspect, View device details et View flow details" style="width:80%;" >}}

### Option Inspect

Choisissez l'option **Inspect** pour consulter les connexions d'interface du périphérique. Cliquez sur l'une des interfaces connectées pour en savoir plus.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect_view.png" alt="La vue Inspect d'un périphérique individuel, avec les connexions d'interface du périphérique" style="width:80%;" >}}

### Option View device details

Choisissez l'option **View device details** pour consulter des informations sur le périphérique, telles que son adresse IP et ses tags, ainsi que les données relatives au débit, au CPU et à la mémoire.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_details_tab.png" alt="L'onglet View device details d'un périphérique spécifique" style="width:80%;" >}}

Depuis cette vue, vous pouvez également consulter les interfaces du périphérique dans l'onglet **Interfaces**.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_interfaces_tab.png" alt="L'onglet View device details d'un périphérique spécifique, avec l'onglet Interfaces sélectionné" style="width:80%;" >}}

### Option View flow details

Choisissez l'option **View flow details** pour accéder à l'onglet NetFlow filtré selon le `@device.ip` de l'appareil et ainsi obtenir des informations détaillées sur les sources, les destinations et le volume du périphérique. Consultez la page [Surveillance NetFlow][1] pour en savoir plus.

### Dépannage

Si vos périphériques n'affiche aucun lien ni aucune connexion, vérifiez qu'ils exposent des données LLDP et CDP via les commandes suivantes :

```yaml
sudo -u dd-agent datadog-agent snmp walk <IP_PÉRIPHÉRIQUE> 1.0.8802
```

```yaml
sudo -u dd-agent datadog-agent snmp walk <IP_PÉRIPHÉRIQUE> 1.3.6.1.4.1.9.9.23
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/network_monitoring/devices/netflow/
[2]: https://app.datadoghq.com/infrastructure/devices?viewTab=topology
[3]: /fr/network_monitoring/devices/snmp_metrics/?tab=snmpv2#autodiscovery
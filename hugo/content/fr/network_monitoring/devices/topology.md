---
aliases:
- /fr/network_monitoring/devices/network_topology_map
- /fr/network_monitoring/devices/device_topology_map
code_lang: topology
code_lang_weight: 0
further_reading:
- link: https://www.datadoghq.com/blog/visualize-network-device-topology/
  tag: Blog
  text: Visualisez les relations à travers votre réseau sur site avec la Carte de
    topologie des périphériques
- link: /network_monitoring/devices/data
  tag: Documentation
  text: Données collectées avec le Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Surveiller des périphériques SNMP avec Datadog
title: Carte de topologie des appareils
type: multi-code-lang
---
## Présentation {#overview}

La [Carte de topologie des périphériques][2] utilise des diagrammes [Cloudcraft][7] pour fournir une représentation visuelle interactive des connexions physiques de votre réseau. La carte découvre et affiche automatiquement les périphériques, leurs interfaces et les relations entre eux. Cette visualisation vous aide à identifier les problèmes dans vos périphériques réseau, à comprendre leurs impacts en amont et en aval, à résoudre les problèmes de connectivité et à obtenir des informations sur la manière dont le trafic circule dans votre infrastructure.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_new_4.mp4" alt="Un utilisateur ajoute des tags d'équipe, de service et de fournisseur à la Carte de topologie des périphériques, puis sélectionne un périphérique pour ouvrir la vue des périphériques NDM." video="true" >}}

## Configuration {#setup}

Le Datadog Agent version 7.52 ou ultérieure collecte automatiquement les données de topologie. Aucune installation supplémentaire n'est nécessaire.

### Prérequis {#prerequisites}

1. Les périphériques ont LLDP (Link Layer Discovery Protocol) et/ou CDP (Cisco Discovery Protocol) activés avec SNMP. Utilisez le même protocole sur les périphériques connectés afin qu'ils puissent se découvrir mutuellement. LLDP est généralement privilégié car il s'agit d'une option plus courante.
2. Le Datadog Agent version 7.52 ou ultérieure est installé.

## Options de navigation {#navigation-options}

Dans la Carte de topologie des périphériques, les options de navigation suivantes sont disponibles :

### Grouper par {#group-by}

Sous {{< ui >}}Group By{{< /ui >}}, utilisez des tags tels que `location` et `vendor` pour sélectionner la manière dont vous souhaitez visualiser vos périphériques :

{{< img src="/network_device_monitoring/network_topology_map/device-topology-group_by_2.png" alt="Un contrôle « Group by » affichant les tags pour l'emplacement et le fournisseur." style="width:90%;" >}}

### Filtrer les périphériques {#filter-devices}

Sélectionnez le menu déroulant {{< ui >}}\+ Filter{{< /ui >}} pour affiner les périphériques affichés sur la carte de topologie des périphériques.

{{< img src="/network_device_monitoring/network_topology_map/device_topology_filter_3.png" alt="La carte de topologie des périphériques avec le menu déroulant de filtrage ouvert." style="width:90%;" >}}

**Remarque :** Le paramètre {{< ui >}}Filter Devices{{< /ui >}} détermine quels périphériques apparaissent sur la carte de topologie des périphériques pour toutes les requêtes, y compris celles qui filtrent par une facette de périphérique dans la barre de recherche.

### Ressources {#resources}

Utilisez le menu déroulant {{< ui >}}Resource{{< /ui >}} pour filtrer le diagramme par types de périphériques spécifiques, tels que les pare-feu, les points d'accès et les routeurs.

{{< img src="/network_device_monitoring/network_topology_map/resources_dropdown.png" alt="La Carte de topologie des périphériques avec le menu déroulant Ressources ouvert et Périphérique non surveillé décoché." style="width:30%;" >}}

Par défaut, l'option {{< ui >}}Unmonitored Device{{< /ui >}} est décochée, ce qui masque les périphériques qui ne sont pas directement surveillés par Network Device Monitoring, mais qui sont découverts via LLDP/CDP à partir de périphériques surveillés adjacents. Cochez cette option pour afficher ces périphériques non surveillés sur le diagramme.

## Examen des périphériques {#investigating-devices}

En plus d'afficher une vue d'ensemble des connexions physiques de votre réseau, la carte de topologie des périphériques vous permet d'examiner des périphériques individuels pour comprendre leurs connexions, leurs flux et leur état général. Survolez un périphérique pour voir son état et ses métriques clés, ou cliquez sur un périphérique pour ouvrir la vue du périphérique NDM avec des détails tels que son adresse IP, ses tags, son débit, son processeur et sa mémoire.

Lors de l'examen d'un périphérique, cliquez sur le menu déroulant {{< ui >}}Open Device Page{{< /ui >}} en haut à droite de la vue du périphérique pour accéder à [NetFlow Monitoring][1] ou à d'autres pages connexes pour une analyse plus approfondie.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect_view_7.png" alt="La Carte de topologie des périphériques avec un périphérique sélectionné, affichant des informations dans la vue du périphérique NDM." style="width:100%;" >}}

### Dépendances {#dependencies}

La section {{< ui >}}Dependencies{{< /ui >}} dans la vue du périphérique NDM affiche en un coup d'œil le nombre de périphériques réseau, d'endpoints et de tunnels VPN physiquement connectés, ainsi qu'un graphique visuel des périphériques voisins.

{{< img src="/network_device_monitoring/network_topology_map/topology_dependencies_2.png" alt="La vue du périphérique NDM affichant la section Dépendances avec un graphique des périphériques connectés." style="width:100%;" >}}

Cliquez sur {{< ui >}}View dependencies{{< /ui >}} pour ouvrir la page complète du périphérique. Sous l'onglet {{< ui >}}Dependencies{{< /ui >}}, sélectionnez les options {{< ui >}}VPN tunnels{{< /ui >}}, {{< ui >}}Network devices{{< /ui >}} ou {{< ui >}}Endpoints{{< /ui >}} pour basculer entre les vues de dépendances.

<div class="alert alert-info">
Les dépendances VPN nécessitent que <a href="/network_monitoring/devices/vpn_monitoring/">VPN Monitoring</a> soit configuré. Les dépendances des endpoints nécessitent que <a href="/infrastructure/end_user_device_monitoring/">End User Device Monitoring (EUDM)</a> soit configuré.
</div>

#### Tunnels VPN {#vpn-tunnels}

La vue {{< ui >}}VPN tunnels{{< /ui >}} affiche un graphique de topologie ainsi qu'un tableau des VPN connectés indiquant les adresses IP des pairs, le protocole, l'interface et les sous-réseaux de destination.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_VPN_tunnels.png" alt="L'onglet Dépendances sur la page du périphérique NDM avec l'onglet Tunnels VPN sélectionné, affichant un graphique de topologie et un tableau des VPN connectés." style="width:100%;" >}}

#### Périphériques réseau {#network-devices}

La vue {{< ui >}}Network devices{{< /ui >}} affiche un graphique de topologie ainsi qu'un tableau des périphériques connectés indiquant leur état, le nom du périphérique, l'adresse IP, les monitors, l'interface locale et l'interface distante.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_network_devices.png" alt="L'onglet Dépendances sur la page de périphérique NDM avec l'onglet Périphériques réseau sélectionné, affichant un graphique de topologie avec onze périphériques connectés, codés par couleur selon leur état, et un tableau avec plus de détails sur les périphériques connectés." style="width:100%;" >}}

#### Endpoints {#endpoints}

La vue {{< ui >}}Endpoints{{< /ui >}} affiche un graphique de topologie ainsi qu'un tableau des périphériques des utilisateurs finaux et de leurs états. Sélectionnez un endpoint dans le graphique pour afficher plus de détails et y accéder dans [EUDM][12].

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_endpoints.png" alt="L'onglet Dependencies sur la page de périphérique NDM avec l'onglet Endpoints sélectionné, affichant un graphique de topologie avec cinq périphériques des utilisateurs finaux connectés, dont la vue détaillée d'un périphérique est ouverte, ainsi qu'un tableau avec plus de détails sur les périphériques connectés." style="width:100%;" >}}

### Métriques {#metrics}

Cliquez sur l'onglet {{< ui >}}Metrics{{< /ui >}} dans la vue de périphérique NDM pour voir les métriques clés du périphérique, notamment l'utilisation du processeur, l'utilisation de la mémoire et le débit. Les statistiques récapitulatives sont affichées en haut, et chaque métrique est présentée sous forme de graphique au fil du temps. Cliquez sur {{< ui >}}View all metrics{{< /ui >}} pour explorer la liste complète des métriques collectées.

{{< img src="/network_device_monitoring/network_topology_map/metrics_3.png" alt="La vue de périphérique NDM avec l'onglet Métriques ouvert, affichant les graphiques du processeur, de la mémoire et du débit." style="width:100%;" >}}

### Trafic {#traffic}

Cliquez sur l'onglet {{< ui >}}Traffic{{< /ui >}} pour afficher le débit total, entrant et sortant du périphérique. Un graphique de trafic montre l'activité au fil du temps, et le tableau {{< ui >}}Top Conversations{{< /ui >}} répertorie les flux source-destination à volume élevé avec le débit binaire, le taux de paquets et le nombre total d'octets. Cliquez sur {{< ui >}}View traffic{{< /ui >}} pour approfondir l'analyse sur la page de résumé du périphérique et dans [NetFlow Monitoring][1].

{{< img src="/network_device_monitoring/network_topology_map/traffic_2.png" alt="La vue de périphérique NDM avec l'onglet Trafic ouvert, affichant les statistiques de débit, un graphique de trafic et un tableau des principales conversations." style="width:100%;" >}}

### Événements {#events}

Cliquez sur l'onglet {{< ui >}}Events{{< /ui >}} pour afficher les messages Syslog et les traps SNMP dans une vue unique et combinée. Utilisez des filtres pour restreindre les résultats par type d'événement. Les pics de volume d'événements sont mis en évidence visuellement, ce qui vous aide à identifier et à examiner les erreurs.

{{< img src="/network_device_monitoring/network_topology_map/events.png" alt="La vue de périphérique NDM avec l'onglet Événements ouvert, affichant les messages Syslog et les traps SNMP." style="width:100%;" >}}

### Afficher les détails du flux {#view-flow-details}

Pour explorer les sources, les destinations et le volume du trafic d'un appareil, cliquez sur le menu déroulant {{< ui >}}Open Device Page{{< /ui >}} et sélectionnez {{< ui >}}NetFlow Monitoring{{< /ui >}}. Les données sont automatiquement filtrées par le `@device.ip` de l'appareil. Pour plus d'informations, consultez [NetFlow Monitoring][1].

{{< img src="/network_device_monitoring/network_topology_map/netflow_tab_4.png" alt="La vue de l'appareil NDM avec le menu déroulant Ouvrir la page de l'appareil affichant l'option NetFlow Monitoring." style="width:100%;" >}}

### Paramètres de l'appareil {#device-settings}

Cliquez sur l'icône {{< ui >}}Device Settings{{< /ui >}} dans la vue de l'appareil NDM pour ouvrir le panneau Paramètres de l'appareil. L'onglet {{< ui >}}Information{{< /ui >}} affiche les détails généraux (nom, espace de noms et description), les détails réseau (adresse IP, sous-réseau et géolocalisation) et les détails matériels (modèle, fournisseur, système d'exploitation et version). L'onglet {{< ui >}}Tags{{< /ui >}} vous permet d'afficher et de gérer les tags associée à l'appareil.

{{< img src="/network_device_monitoring/network_topology_map/device_settings.png" alt="Le panneau Paramètres de l'appareil pour un appareil NDM, affichant l'onglet Informations avec les détails généraux, réseau et matériels." style="width:90%;" >}}

### Détails du lien {#link-details}

Cliquez sur un lien entre des appareils pour explorer les détails de la connexion, notamment le volume de trafic, l'utilisation de la bande passante, les erreurs et les rejets, avec des options pour afficher les données dans [Device Overview][10] ou [NetFlow Monitoring][11].

{{< img src="/network_device_monitoring/network_topology_map/link_details.mp4" alt="Un utilisateur cliquant sur un lien entre des appareils pour afficher des détails supplémentaires sur le lien." video="true" >}}

### Légende des icônes{#icon-legend}

Les appareils SNMP sont associés à une icône représentative basée sur leur type d'appareil dans chaque nœud d'appareil, tel que défini dans leurs [profils d'appareil][4].

<table>
  <colgroup>
    <col style="width:20%">
    <col style="width:20%">
  </colgroup>
  <tr>
    <th>Icône</th>
    <th>Description</th>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/access-point.png" alt="Icône de point d'accès" style="width:10%; border:none;" popup="false">}}</td>
    <td>Point d'accès</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/firewall.png" alt="Icône de pare-feu" style="width:10%; border:none;" popup="false">}}</td>
    <td>Pare-feu</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/router.png" alt="Icône de routeur" style="width:10%; border:none;" popup="false">}}</td>
    <td>Routeur</td>
  </tr>
  <tr>
   <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/server.png" alt="Icône de serveur" style="width:10%; border:none;" popup="false">}}</td>
    <td>Serveur</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/switch.png" alt="Icône de commutateur" style="width:10%; border:none;" popup="false">}}</td>
    <td>Commutateur</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/device.png" alt="Icône de périphérique" style="width:10%; border:none;" popup="false">}}</td>
    <td>Périphérique</td>
  </tr>
</table>

## Dépannage {#troubleshooting}

Si vous rencontrez des problèmes lors de l'utilisation de la carte de topologie réseau, utilisez les consignes de dépannage suivantes. Si vous avez besoin d'une assistance supplémentaire, contactez le [support Datadog][5].

### Message de carte vide {#empty-map-message}

{{< img src="/network_device_monitoring/network_topology_map/no_devices_found.png" alt="Le message « aucun périphérique trouvé » qui s'affiche lorsque NDM n'est pas configuré ou en raison d'un filtrage." style="width:80%;" >}}

Il n'y a aucun périphérique car NDM n'est pas configuré.

### Aucune connexion trouvée / Aucun périphérique connecté à afficher {#no-connections-found-no-connected-devices-to-show}

{{< img src="/network_device_monitoring/network_topology_map/no_connections_found.png" alt="Le message « aucun périphérique trouvé » qui s'affiche lorsque NDM n'est pas configuré ou en raison d'un filtrage." style="width:80%;" >}}

- Activez la sélection {{< ui >}}Unmonitored Device{{< /ui >}} pour afficher les périphériques non surveillés.
- Utilisez un tag de catégorisation pour mieux comprendre votre vue cartographique avec une hiérarchie d'informations.

### Périphériques/connexions manquants {#missing-devicesconnections}

Les données de la carte de topologie des périphériques sont basées sur les informations LLDP (Link Layer Discovery Protocol) et CDP (Cisco Discovery Protocol) collectées via SNMP. Si votre carte manque de périphériques et/ou de connexions, vérifiez les points suivants :

- Le Datadog Agent version 7.52 ou ultérieure est installé.
- Les périphériques ont LLDP et/ou CDP activés avec SNMP.

Vérifiez que vos périphériques exposent les données LLDP et CDP avec les commandes suivantes :

Pour les données LLDP :

```yaml
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.0.8802
```
Pour les données CDP
```yaml:
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.3.6.1.4.1.9.9.23
```

### Connexions ou liens manquants {#missing-connections-or-links}

Si votre périphérique expose des données de topologie avec LLDP ou CDP mais que certaines connexions sont manquantes, vérifiez que la sélection {{< ui >}}Unmonitored Device{{< /ui >}} est désactivée.

### Périphériques non surveillés apparaissant sur la carte {#unmonitored-devices-showing-on-map}

La carte de topologie des périphériques affiche tous les périphériques découverts avec LLDP ou CDP. Il peut s'agir de nouveaux périphériques qui ne sont pas encore surveillés avec SNMP ou de périphériques existants qui n'ont pas été [résolus](#device-resolution) en tant que périphérique surveillé équivalent.
Vous pouvez utiliser la sélection {{< ui >}}Unmonitored Device{{< /ui >}} pour masquer ces nœuds.

### Périphérique dupliqué sur la carte {#device-duplicated-on-map}

La carte de topologie des périphériques affiche tous les périphériques découverts avec LLDP et/ou CDP. Dans certains cas, ces périphériques sont déjà surveillés avec SNMP mais ne peuvent pas être [résolus](#device-resolution) en tant que périphérique surveillé équivalent. Dans ce cas, le périphérique est affiché deux fois : un nœud représentant le périphérique surveillé et un nœud représentant le périphérique découvert via LLDP/CDP.
Utilisez la sélection {{< ui >}}Unmonitored Device{{< /ui >}} pour masquer les nœuds non surveillés.

### Nœuds sans bordure ou noirs sur la carte {#borderless-or-black-nodes-on-the-map}

Les nœuds sans bordure ou noirs sur la carte de topologie des périphériques peuvent représenter des périphériques découverts avec LLDP ou CDP qui ne sont pas configurés pour être surveillés avec NDM, ou des périphériques découverts avec LLDP ou CDP qui ne peuvent pas être résolus en tant que [périphérique surveillé](#device-resolution) équivalent.

## Résolution de périphérique {#device-resolution}

La carte de topologie des périphériques fournit une vue d'ensemble des périphériques surveillés avec NDM et de leurs connexions physiques. Les données des liens de topologie sont basées sur les informations LLDP (Link Layer Discovery Protocol) ou CDP (Cisco Discovery Protocol) collectées avec SNMP.
Les connexions découvertes avec LLDP ou CDP peuvent correspondre à des périphériques déjà surveillés avec SNMP. La résolution de périphérique consiste à faire correspondre le périphérique découvert au périphérique surveillé.

### Échecs de résolution de périphérique {#device-resolution-failures}

La résolution de périphérique peut échouer si le périphérique n'est pas surveillé avec NDM, ou si les données LLDP ou CDP sont insuffisantes pour faire correspondre le périphérique découvert au périphérique surveillé.

## Étapes suivantes {#next-steps}

NDM fournit plusieurs outils de visualisation pour surveiller votre infrastructure :

- **[Device Geomap][9]** : Visualisez la répartition géographique des périphériques sur les différents sites pour identifier les problèmes régionaux et les lacunes de couverture.
- **[Device Overview][10]** : Accédez à des métriques détaillées et aux données de performance pour chaque périphérique.
- **[NetFlow Monitoring][1]** : Analysez les flux de trafic et l'utilisation de la bande passante sur votre réseau.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/network_monitoring/netflow/
[2]: https://app.datadoghq.com/devices/maps/topology 
[3]: /fr/network_monitoring/devices/snmp_metrics/?tab=snmpv2#autodiscovery
[4]: /fr/network_monitoring/devices/profiles/
[5]: /fr/help
[6]: /fr/network_monitoring/devices/snmp_metrics/?tab=snmpv2#ping
[7]: /fr/datadog_cloudcraft/
[8]: /fr/network_monitoring/devices/topology
[9]: /fr/network_monitoring/devices/geomap
[10]: https://app.datadoghq.com/devices
[11]: https://app.datadoghq.com/devices/netflow
[12]: /fr/infrastructure/end_user_device_monitoring/
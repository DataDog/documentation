---
aliases:
- /fr/network_monitoring/devices/network_topology_map
- /fr/network_monitoring/devices/device_topology_map
code_lang: topology
code_lang_weight: 0
further_reading:
- link: https://www.datadoghq.com/blog/visualize-network-device-topology/
  tag: Blog
  text: Visualisez les relations au sein de votre réseau sur site avec la carte de
    topologie des appareils
- link: /network_monitoring/devices/data
  tag: Documentation
  text: Données collectées avec le Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Surveiller des périphériques SNMP avec Datadog
title: Map topologique des appareils
type: multi-code-lang
---
## Aperçu

La [carte de topologie des appareils réseau][2] utilise des diagrammes [Cloudcraft][7] pour fournir une représentation visuelle interactive des connexions physiques de votre réseau. La carte découvre et affiche automatiquement les appareils, leurs interfaces et les relations entre eux. Cette visualisation vous aide à identifier les problèmes dans vos appareils réseau, à comprendre leurs impacts en amont et en aval, à résoudre les problèmes de connectivité et à obtenir des informations sur la façon dont le trafic circule à travers votre infrastructure.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_new_4.mp4" alt="Un utilisateur ajoute des étiquettes d'équipe, de service et de fournisseur à la carte de topologie des appareils réseau, puis sélectionne un appareil pour ouvrir la vue de l'appareil NDM." video="true" >}}

## Configuration

La version 7.52 ou ultérieure de l'Agent Datadog collecte automatiquement les données de topologie. Aucune installation supplémentaire n'est nécessaire.

### Prérequis

1. Les appareils ont LLDP (Link Layer Discovery Protocol) et/ou CDP (Cisco Discovery Protocol) activés avec SNMP. Utilisez le même protocole sur les appareils connectés afin qu'ils puissent se découvrir mutuellement. LLDP est généralement préféré car c'est une option plus courante.
2. La version 7.52 ou ultérieure de l'Agent Datadog est installée.

## Options de navigation

Dans la carte de topologie réseau, les options de navigation suivantes sont disponibles :

### Regrouper par

Sous Regrouper par, utilisez **étiquettes** telles que `location` et `vendor` pour sélectionner comment vous souhaitez visualiser vos appareils :

{{< img src="/network_device_monitoring/network_topology_map/device-topology-group_by_2.png" alt="Un contrôle de regroupement montrant des étiquettes pour l'emplacement et le fournisseur." style="width:90%;" >}}

### Filtrer les appareils

Sélectionnez le menu déroulant **+ Filtre** pour affiner les appareils affichés sur la carte de topologie des appareils.

{{< img src="/network_device_monitoring/network_topology_map/device_topology_filter_3.png" alt="La carte de topologie des dispositifs avec le menu déroulant des filtres ouvert." style="width:90%;" >}}

**Remarque :** Le paramètre **Filtrer les dispositifs** détermine quels dispositifs apparaissent sur la carte de topologie des dispositifs pour toutes les requêtes, y compris celles qui filtrent par un aspect de dispositif dans la barre de recherche.

### Ressources

Utilisez le menu déroulant **Ressource** pour filtrer le diagramme par types de dispositifs spécifiques, tels que les pare-feu, les points d'accès et les routeurs.

{{< img src="/network_device_monitoring/network_topology_map/resources_dropdown.png" alt="La carte de topologie des dispositifs avec le menu déroulant Ressources ouvert, et l'option Dispositif non surveillé décochée." style="width:30%;" >}}

Par défaut, l'option **Dispositif non surveillé** est décochée, ce qui cache les dispositifs qui ne sont pas directement surveillés par la surveillance des dispositifs réseau mais qui sont découverts via LLDP/CDP à partir de dispositifs surveillés adjacents. Cochez cette option pour afficher ces dispositifs non surveillés sur le diagramme.

## Enquête sur les dispositifs

En plus de montrer un aperçu des connexions physiques de votre réseau, la carte de topologie des dispositifs vous permet d'enquêter sur des dispositifs individuels pour comprendre leurs connexions, flux et état général. Survolez un dispositif pour voir son état et ses indicateurs clés, ou cliquez sur un dispositif pour ouvrir la vue du dispositif NDM avec des détails tels que son adresse IP, ses étiquettes, son débit, son CPU et sa mémoire.

Lors de l'enquête sur un dispositif, cliquez sur le menu déroulant **Ouvrir la page du dispositif** en haut à droite de la vue du dispositif pour naviguer vers [Surveillance NetFlow][1] ou d'autres pages connexes pour une enquête plus approfondie.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect_view_7.png" alt="La carte de topologie des dispositifs réseau avec un dispositif sélectionné, affichant des informations dans la vue du dispositif NDM." style="width:100%;" >}}

### Dépendances

La section **Dépendances** dans la vue du dispositif NDM montre le nombre de dispositifs physiquement connectés et de tunnels VPN d'un coup d'œil, ainsi qu'un graphique visuel des dispositifs voisins.

{{< img src="/network_device_monitoring/network_topology_map/topology_dependencies.png" alt="La vue du dispositif NDM montrant la section Dépendances avec un graphique des dispositifs connectés." style="width:100%;" >}}

Cliquez sur **Voir les dépendances** pour ouvrir la page complète du dispositif. Dans l'onglet **Dépendances**, utilisez les filtres **Physique** ou **VPN** pour passer entre les connexions physiques et les tunnels VPN (les dépendances VPN nécessitent que [la surveillance VPN][12] soit configurée). La vue physique affiche un graphique de topologie aux côtés d'un tableau de dispositifs connectés montrant leur état, nom du dispositif, adresse IP, moniteurs, interface locale et interface distante.

{{< img src="/network_device_monitoring/network_topology_map/ndm_summary_dependencies.png" alt="L'onglet Dépendances sur la page du dispositif NDM avec le filtre Physique sélectionné, montrant un graphique de topologie et un tableau de dispositifs connectés avec état, adresse IP et détails d'interface." style="width:100%;" >}}

### Indicateurs

Cliquez sur l'onglet **Indicateurs** dans la vue du dispositif NDM pour voir les indicateurs clés pour le dispositif, y compris l'utilisation du CPU, l'utilisation de la mémoire et le débit. Les statistiques résumées sont affichées en haut, et chaque métrique est présentée sous forme de graphique au fil du temps. Cliquez sur **Voir toutes les métriques** pour explorer la liste complète des métriques collectées.

{{< img src="/network_device_monitoring/network_topology_map/metrics_3.png" alt="La vue de l'appareil NDM avec l'onglet Métriques ouvert, montrant les graphiques de l'UC, de la mémoire et du débit." style="width:100%;" >}}

### Trafic

Cliquez sur l'onglet **Trafic** pour voir le débit total, entrant et sortant pour l'appareil. Un graphique de trafic montre l'activité au fil du temps, et le tableau **Conversations Principales** répertorie les flux source-destination à fort volume avec le débit binaire, le taux de paquets et le total des octets. Cliquez sur **Voir le trafic** pour enquêter davantage sur la page de résumé de l'appareil, et dans [Surveillance NetFlow][1].

{{< img src="/network_device_monitoring/network_topology_map/traffic_2.png" alt="La vue de l'appareil NDM avec l'onglet Trafic ouvert, montrant les statistiques de débit, un graphique de trafic et un tableau des Conversations Principales." style="width:100%;" >}}

### Événements

Cliquez sur l'onglet **Événements** pour voir les messages Syslog et les traps SNMP dans une vue combinée. Utilisez des filtres pour affiner les résultats par type d'événement. Les pics de volume d'événements sont visuellement mis en évidence, vous aidant à identifier et à enquêter sur les erreurs.

{{< img src="/network_device_monitoring/network_topology_map/events.png" alt="La vue de l'appareil NDM avec l'onglet Événements ouvert, montrant les messages Syslog et les traps SNMP." style="width:100%;" >}}

### Voir les détails du flux

Pour explorer les sources, destinations et volumes de trafic d'un appareil, cliquez sur le menu déroulant **Ouvrir la page de l'appareil** et sélectionnez **Surveillance NetFlow**. Les données sont automatiquement filtrées par le `@device.ip` de l'appareil. Pour plus d'informations, voir [Surveillance NetFlow][1].

{{< img src="/network_device_monitoring/network_topology_map/netflow_tab_4.png" alt="La vue de l'appareil NDM avec le menu déroulant Ouvrir la page de l'appareil montrant l'option de Surveillance NetFlow." style="width:100%;" >}}

### Paramètres de l'appareil

Cliquez sur l'icône **Paramètres de l'appareil** dans la vue de l'appareil NDM pour ouvrir le panneau des Paramètres de l'appareil. L'onglet **Informations** affiche des détails généraux (nom, espace de noms et description), des détails réseau (adresse IP, sous-réseau et géolocalisation) et des détails matériels (modèle, fournisseur, système d'exploitation et version). L'onglet **Tags** vous permet de visualiser et de gérer les tags associés à l'appareil.

{{< img src="/network_device_monitoring/network_topology_map/device_settings.png" alt="Le panneau des paramètres de l'appareil pour un appareil NDM, montrant l'onglet Informations avec des détails généraux, réseau et matériels." style="width:90%;" >}}

### Détails du lien

Cliquez sur un lien entre les appareils pour explorer les détails de connexion, y compris le volume de trafic, l'utilisation de la bande passante, les erreurs et les pertes, avec des options pour visualiser les données dans [Aperçu de l'appareil][10] ou [Surveillance NetFlow][11].

{{< img src="/network_device_monitoring/network_topology_map/link_details.mp4" alt="Un utilisateur cliquant sur un lien entre les appareils pour voir des détails supplémentaires sur le lien." video="true" >}}

### Légende des icônes

Les appareils SNMP sont associés à une icône représentative en fonction de leur type d'appareil dans chaque nœud d'appareil, comme défini dans leurs [profils d'appareil][4].

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
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/device.png" alt="Icône de l'appareil" style="width:10%; border:none;" popup="false">}}</td>
    <td>Appareil</td>
  </tr>
</table>

## Dépannage

Si vous rencontrez des problèmes lors de l'utilisation de la carte de topologie réseau, utilisez les directives de dépannage suivantes. Si vous avez besoin d'une assistance supplémentaire, contactez [le support Datadog][5].

### Message de carte vide

{{< img src="/network_device_monitoring/network_topology_map/no_devices_found.png" alt="Le message indiquant qu'aucun appareil n'a été trouvé s'affiche lorsque NDM n'est pas configuré ou en raison d'un filtrage." style="width:80%;" >}}

Il n'y a pas d'appareils car NDM n'est pas configuré.

### Aucune connexion trouvée / Aucun appareil connecté à afficher

{{< img src="/network_device_monitoring/network_topology_map/no_connections_found.png" alt="Le message indiquant qu'aucun appareil n'a été trouvé s'affiche lorsque NDM n'est pas configuré ou en raison d'un filtrage." style="width:80%;" >}}

- Activez la sélection **Appareil non surveillé** pour afficher les appareils non surveillés.
- Utilisez le tag de catégorisation pour aider à comprendre votre vue de carte avec une hiérarchie d'informations.

### Appareils/connections manquants

Les données de la carte de topologie des appareils sont basées sur les informations LLDP (Link Layer Discovery Protocol) et CDP (Cisco Discovery Protocol) collectées avec SNMP. Si votre carte manque d'appareils et/ou de connexions, vérifiez les éléments suivants :

- La version 7.52 ou ultérieure de l'Agent Datadog est installée.
- Les appareils ont LLDP et/ou CDP activés avec SNMP.

Vérifiez que vos appareils exposent les données LLDP et CDP avec les commandes suivantes :

Pour les données LLDP :

```yaml
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.0.8802
```
Pour les données CDP
```yaml:
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.3.6.1.4.1.9.9.23
```

### Connexions ou liens manquants

Si votre appareil expose des données de topologie avec LLDP ou CDP mais que certaines connexions manquent, vérifiez que la sélection **Appareil non surveillé** est désactivée.

### Appareils non surveillés affichés sur la carte

La carte de topologie des appareils montre tous les appareils découverts avec LLDP ou CDP. Il peut s'agir de nouveaux appareils qui ne sont pas déjà surveillés avec SNMP ou d'appareils existants qui n'ont pas été [résolus](#device-resolution) en l'appareil surveillé équivalent.
Vous pouvez utiliser la sélection **Appareil non surveillé** pour masquer ces nœuds.

### Appareil dupliqué sur la carte

La carte de topologie des appareils montre tous les appareils découverts avec LLDP et/ou CDP. Dans certains cas, ces appareils sont déjà surveillés avec SNMP mais ne peuvent pas être [résolus](#device-resolution) en l'appareil surveillé équivalent. Dans ce cas, l'appareil est affiché deux fois : un nœud représentant l'appareil surveillé et un nœud représentant l'appareil découvert par LLDP/CDP.
Utilisez la sélection **Appareil non surveillé** pour masquer les nœuds non surveillés.

### Nœuds sans bordure ou noirs sur la carte

Les nœuds sans bordure ou noirs sur la carte de topologie des appareils peuvent représenter des appareils découverts avec LLDP ou CDP qui ne sont pas configurés pour être surveillés avec NDM, ou des appareils découverts avec LLDP ou CDP qui ne peuvent pas être résolus en l'équivalent [appareil surveillé](#device-resolution).

## Résolution des appareils

La carte de topologie des appareils fournit un aperçu des appareils surveillés avec NDM et de leurs connexions physiques. Les données de liens de topologie sont basées sur les informations LLDP (Link Layer Discovery Protocol) ou CDP (Cisco Discovery Protocol) collectées avec SNMP.
Les connexions découvertes avec LLDP ou CDP peuvent correspondre à des appareils déjà surveillés avec SNMP. La résolution des appareils consiste à faire correspondre l'appareil découvert à l'appareil surveillé.

### Échecs de résolution des appareils

La résolution des appareils peut échouer si l'appareil n'est pas surveillé avec NDM, ou si les données LLDP ou CDP sont insuffisantes pour faire correspondre l'appareil découvert à l'appareil surveillé.

## Étapes suivantes

NDM fournit plusieurs outils de visualisation pour surveiller votre infrastructure :

- **[Carte géographique des appareils][9]**: Consultez la répartition géographique des appareils dans différentes localités pour identifier les problèmes régionaux et les lacunes de couverture.
- **[Aperçu des appareils][10]**: Accédez à des métriques détaillées et des données de performance pour chaque appareil.
- **[Surveillance NetFlow][1]**: Analysez les flux de trafic et l'utilisation de la bande passante sur votre réseau.

## Pour aller plus loin

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
[12]: /fr/network_monitoring/devices/vpn_monitoring/
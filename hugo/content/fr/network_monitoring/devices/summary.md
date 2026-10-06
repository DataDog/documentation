---
further_reading:
- link: /network_monitoring/devices/
  tag: Documentation
  text: Network Device Monitoring
- link: /network_monitoring/devices/topology
  tag: Documentation
  text: Cartes des appareils
- link: /network_monitoring/devices/config_management
  tag: Documentation
  text: Gestion de la configuration
title: Page de résumé
---
{{< callout url="https://www.datadoghq.com/product-preview/network-device-summary-page/" header="Rejoignez la Preview !">}}
La page de résumé NDM est en préversion.
{{< /callout >}}

## Présentation {#overview}

La **page de résumé** de Network Device Monitoring (NDM) offre aux ingénieurs réseau une vue unique de l'état des périphériques et des interfaces, des problèmes actifs et des modifications de configuration récentes. Utilisez-la comme point de départ pour évaluer l'état de votre réseau et enquêter sur les problèmes.

**Remarque** : Pour utiliser la page de résumé, [Network Device Monitoring][1] doit être configuré et collecter des métriques à partir d'au moins un appareil surveillé par SNMP. Pour les instructions de configuration, consultez [Setup][2].

{{< img src="network_device_monitoring/summary/summary_page.png" alt="La page de résumé NDM, affichant la santé du réseau, la santé des interfaces et des périphériques, le trafic et les modifications récentes." style="width:100%;" >}}

## Utilisation de la page de résumé {#using-the-summary-page}

La page de résumé est organisée en sections qui couvrent chacune un aspect différent de l'état et de l'activité de votre réseau. Trois de ces sections (**Santé du réseau**, **Santé des interfaces** et **Santé des périphériques**) signalent également un état de santé pour résumer ce qu'elles suivent :

| État | Signification |
|-------|---------|
| Bon | Toutes les métriques échantillonnées se situent dans les seuils de santé. |
| Dégradé | Certaines métriques ont franchi les seuils d'avertissement. |
| Mauvais | Des seuils critiques ont été franchis sur plusieurs appareils ou interfaces. |
| Inconnu | Données insuffisantes pour évaluer la santé. |

Pour personnaliser votre vue, utilisez la barre de filtre afin de limiter la page par tag de périphérique (par exemple, `device_namespace`, `device_vendor`, `device_type` ou `geolocation`). La plage horaire par défaut est {{< ui >}}Past 2 Hours{{< /ui >}}.

### État de santé du réseau {#network-health}

La section {{< ui >}}Network health{{< /ui >}} résume l'état global de votre réseau.

{{< img src="network_device_monitoring/summary/network_health.png" alt="La section État de santé du réseau affiche un résumé Bits AI sur la gauche et une vue de topologie avec des nœuds codés par état de santé sur la droite." style="width:100%;" >}}

Un résumé Bits AI explique l'état actuel de votre réseau. Il met en évidence les appareils, les interfaces affectés et toute modification de configuration récente pouvant être corrélée au comportement observé. Cliquez sur {{< ui >}}Chat with Bits Assistant{{< /ui >}} pour poser des questions complémentaires.

Vous pouvez également interroger les données des périphériques et des interfaces à partir d'un agent IA, tel que Claude Code ou Cursor, avec les outils `search_ndm_devices`, `get_ndm_device` et `search_ndm_interfaces` dans le [Datadog MCP Server][12].

Sous le résumé, un panneau d'état affiche le nombre total de périphériques ventilé par état, le nombre d'alertes et d'avertissements de monitor actifs, ainsi que le nombre de problèmes actifs. Cliquez sur {{< ui >}}View Health{{< /ui >}} pour ouvrir la vue [Device Health][5].

### État de santé des interfaces {#interface-health}

La section {{< ui >}}Interface health{{< /ui >}} classe les principales interfaces fonctionnant en dehors des seuils de santé. Pour chaque interface, la page indique le taux d'erreur, le taux de rejet, ainsi que l'utilisation de la bande passante entrante et sortante en pourcentage de la vitesse d'interface configurée.

{{< img src="network_device_monitoring/summary/interface-performance.png" alt="La section État de santé des interfaces affiche un résumé Bits AI, un tableau des principales interfaces avec des colonnes pour les erreurs, les rejets et la bande passante, ainsi que des cartes d'état global pour l'utilisation de la bande passante, les erreurs et les rejets." style="width:100%;" >}}

Un résumé Bits AI met en évidence les modèles parmi les interfaces affectées, tels que plusieurs interfaces saturées sur le même site ou des pics d'erreurs corrélés après une modification de configuration.

Trois cartes sous la liste montrent l'état de santé global du parc : [{{< ui >}}Bandwidth utilization{{< /ui >}}][6], [{{< ui >}}Errors{{< /ui >}}][7] et [{{< ui >}}Discards{{< /ui >}}][8]. Cliquez sur une carte pour voir la liste complète des interfaces affectées avec les valeurs moyennes, minimales et maximales. Les vues détaillées des erreurs et des rejets incluent également un bouton {{< ui >}}Ask Bits{{< /ui >}} pour une investigation assistée par IA.

{{< img src="network_device_monitoring/summary/errors-detail.png" alt="La vue détaillée des erreurs affiche des graphiques des taux d'erreur entrants et sortants, un résumé Bits AI et un tableau des interfaces avec le taux d'erreur et le nombre de paquets." style="width:100%;" >}}

Cliquez sur n'importe quelle interface pour ouvrir le panneau latéral de l'appareil, qui inclut des détails tels que l'état de l'interface, les métriques, la configuration et les événements récents. Depuis le panneau latéral, cliquez sur {{< ui >}}Open Device Page{{< /ui >}} dans le coin supérieur droit pour ouvrir la page de l'appareil, où vous pouvez étudier l'appareil plus en détail.

{{< img src="network_device_monitoring/summary/interface-side-panel.png" alt="Le panneau latéral de l'appareil est ouvert sur l'onglet Interfaces, affichant l'état de l'interface, la bande passante et les données du monitor." style="width:100%;" >}}

**Seuils de santé de l'interface**

Les seuils suivants déterminent l'état de santé d'une interface :

| Signal | Avertissement | Critique |
|--------|------|----------|
| Bande passante Entrée/Sortie | 80 % | 90 % |
| Erreurs Entrée/Sortie | 0,10 % | 5 % |
| Rejets Entrée/Sortie | 0,10 % | 5 % |

### Santé de l'appareil {#device-health}

La section {{< ui >}}Device health{{< /ui >}} classe les principaux périphériques fonctionnant en dehors des seuils de santé. Pour chaque périphérique, la page indique l'état de santé du processeur, de la mémoire et du ventilateur, ainsi que toute modification de configuration enregistrée dans la plage horaire sélectionnée. Par défaut, les périphériques sont triés par {{< ui >}}CPU{{< /ui >}}. Triez par {{< ui >}}Memory{{< /ui >}} pour faire apparaître les périphériques sous pression mémoire.

{{< img src="network_device_monitoring/summary/device-perf.png" alt="La section Santé de l'appareil affiche un résumé Bits AI, un tableau des principaux périphériques avec des colonnes pour le processeur et la mémoire, et des cartes de santé globales en bas." style="width:100%;" >}}

Un résumé Bits AI explique l'état de santé actuel du périphérique et signale les modifications ou anomalies récentes qui pourraient y avoir contribué.

Deux cartes sous la liste affichent la santé globale : [{{< ui >}}CPU{{< /ui >}}][9] et [{{< ui >}}Memory{{< /ui >}}][10]. Cliquez sur une carte pour voir la liste complète des périphériques affectés avec les valeurs minimales, maximales et la tendance des dernières 24 heures.

Cliquez sur n'importe quel périphérique pour ouvrir le panneau latéral du périphérique, qui inclut des détails tels que l'état, les métriques, la configuration et les événements récents. Depuis le panneau latéral, cliquez sur {{< ui >}}Open Device Page{{< /ui >}} dans le coin supérieur droit pour examiner le périphérique plus en détail.

{{< img src="network_device_monitoring/summary/device-side-panel.png" alt="Le panneau latéral du périphérique est ouvert sur l'onglet Résumé du périphérique, affichant les monitors déclenchés, les tags du périphérique et l'état de l'interface." style="width:100%;" >}}

**Seuils de santé de l'appareil**

Les seuils suivants déterminent l'état de santé d'un périphérique :

| Signal | Avertissement | Critique |
|--------|------|----------|
| CPU | 80 % | 90 % |
| Mémoire | 85 % | 95 % |

### Trafic {#traffic}

La section {{< ui >}}Traffic{{< /ui >}} utilise les données [NetFlow][3] pour visualiser le volume de trafic entre les sources et les destinations sous forme de diagramme de Sankey, limité à votre filtre et à votre plage temporelle actuels. Cliquez sur {{< ui >}}View NetFlow{{< /ui >}} pour explorer les données de flux en détail.

{{< img src="network_device_monitoring/summary/traffic-panel.png" alt="La section Trafic affiche un diagramme de Sankey des 25 principaux flux par volume, avec les adresses IP source, les noms d'interface, les noms de périphérique et les adresses IP de destination." style="width:100%;" >}}

### Modifications {#changes}

La section {{< ui >}}Changes{{< /ui >}} répertorie les modifications récentes de configuration des périphériques réseau provenant de la [Gestion de la configuration][4]. Chaque entrée affiche le périphérique concerné, un résumé des modifications et un horodatage.

{{< img src="network_device_monitoring/summary/changes-panel.png" alt="La section Modifications répertorie les changements de configuration récents par périphérique avec un résumé et un horodatage pour chacun." style="width:100%;" >}}

Cliquez sur [{{< ui >}}View all changes{{< /ui >}}][11] pour ouvrir la vue complète des Modifications. Les filtres et la plage temporelle sont partagés entre les deux vues. Cliquez sur n'importe quelle ligne pour ouvrir le panneau latéral du périphérique contenant les détails sur la modification.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/network_monitoring/devices/
[2]: /fr/network_monitoring/devices/setup
[3]: /fr/network_monitoring/netflow/
[4]: /fr/network_monitoring/devices/config_management
[5]: /fr/network_monitoring/devices/device_health
[6]: https://app.datadoghq.com/devices/summary/interface-bandwidth
[7]: https://app.datadoghq.com/devices/summary/interface-errors
[8]: https://app.datadoghq.com/devices/summary/interface-discards
[9]: https://app.datadoghq.com/devices/summary/device-cpu
[10]: https://app.datadoghq.com/devices/summary/device-memory
[11]: https://app.datadoghq.com/devices/summary/changes
[12]: /fr/mcp_server/tools/#networks
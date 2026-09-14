---
aliases:
- /fr/network_monitoring/devices/netflow/
further_reading:
- link: /network_monitoring/devices/profiles
  tag: Documentation
  text: Utiliser des profils avec le Network Device Monitoring
- link: /network_monitoring/network_path/setup/#dynamic-tests-for-netflow-experimental
  tag: Documentation
  text: Configurer des tests dynamiques pour NetFlow
- link: https://www.datadoghq.com/blog/monitor-netflow-with-datadog/
  tag: Blog
  text: Surveiller les données de trafic NetFlow avec Datadog
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: Blog
  text: Surveiller et résoudre des problèmes de performances réseau avec des interruptions
    SNMP
title: NetFlow Monitoring
---
## Présentation {#overview}

La vue NetFlow dans Network Device Monitoring offre une visibilité sur les flux de trafic réseau collectés à partir des appareils qui exportent des données de flux (par exemple, des routeurs, des pare-feux ou des commutateurs). Vous pouvez analyser le volume de trafic, identifier les principaux consommateurs de bande passante et comprendre comment les données circulent dans votre réseau.

La vue NetFlow affiche les métriques de trafic agrégées par appareil et par interface. Utilisez-la pour identifier quels appareils ou interfaces consomment le plus de bande passante, génèrent le plus de paquets ou contribuent aux pics de trafic.

{{< img src="network_device_monitoring/netflow/netflow.png" alt="La page NetFlow Monitoring contenant une légende repliable pour le volume de trafic, l'état des appareils, les flux et plus encore." style="width:100%;" >}}

## Navigation latérale {#side-navigation}

Utilisez la navigation de gauche pour explorer d'autres vues NetFlow :

- {{< ui >}}Traffic Volume{{< /ui >}} : Métriques de flux globales par appareil et interface.
- {{< ui >}}Device Health{{< /ui >}} : État et utilisation des appareils surveillés.
- {{< ui >}}Flows{{< /ui >}} : Enregistrements de flux individuels détaillés.
- {{< ui >}}Conversations{{< /ui >}} : Paires source-destination agrégées.
- {{< ui >}}Autonomous Systems{{< /ui >}} : Données de flux regroupées par numéros de système autonome (ASN).
- {{< ui >}}Geo IP{{< /ui >}} : Données de flux regroupées par origine/destination géographique.
- {{< ui >}}Source Ports / Destination Ports / Protocols / Flags{{< /ui >}} : Répartition du trafic par métadonnées de paquets.

## Installation {#installation}

Pour utiliser NetFlow Monitoring avec Network Device Monitoring, assurez-vous d'utiliser la version 7.45 ou ultérieure de l'[Agent][1].

**Remarque :** La configuration de la [collecte de métriques à partir de Network Device Monitoring][2] n'est pas une exigence pour l'envoi de données NetFlow, bien qu'elle soit fortement recommandée car ces données supplémentaires peuvent être utilisées pour enrichir vos enregistrements de flux avec des informations telles que le nom de l'appareil, le modèle et le fournisseur, ainsi que le nom de l'interface entrante/sortante.

## Configuration {#configuration}

Pour configurer vos appareils afin d'envoyer du trafic NetFlow, jFlow, sFlow ou IPFIX vers le serveur NetFlow de l'Agent, vos appareils doivent être configurés pour envoyer du trafic vers l'adresse IP sur laquelle le Datadog Agent est installé, spécifiquement le `flow_type` et le `port`.

1. Modifiez votre fichier de configuration d'Agent [`datadog.yaml`][3] pour activer NetFlow :

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9   # choices: netflow5, netflow9, ipfix, sflow5
        port: 2055            # devices need to be configured to the same port number
      - flow_type: netflow5
        port: 2056
      - flow_type: ipfix
        port: 4739
      - flow_type: sflow5
        port: 6343
    ## Set to true to enable reverse DNS enrichment of private source and destination IP addresses in NetFlow records
    reverse_dns_enrichment_enabled: false
```

2. Après avoir enregistré vos modifications, [redémarrez l'Agent][4].

   **Remarque** : assurez-vous que vos [règles de pare-feu][9] autorisent le trafic UDP entrant sur les ports configurés.

## Agrégation {#aggregation}

Le Datadog Agent agrège automatiquement les données reçues dans NetFlow pour limiter le nombre d'enregistrements envoyés à la plateforme tout en conservant la majeure partie des informations. Par défaut, les enregistrements de flux qui ont les mêmes identifiants, tels que `source`, `destination address`, `port` et `protocol`, sont agrégés ensemble par intervalles de cinq minutes. De plus, le Datadog Agent peut détecter les ports éphémères et les supprimer. Par conséquent, vous pouvez voir des flux avec `port:*`.

## Enrichissement {#enrichment}

Vos données NetFlow sont traitées par le backend Datadog et enrichies avec les métadonnées disponibles provenant de vos appareils et interfaces. L'enrichissement est basé sur l'adresse IP de l'exportateur NetFlow et les index d'interface. Pour lever toute ambiguïté sur d'éventuelles collisions entre des adresses IP privées réutilisées, vous pouvez configurer un `namespace` différent pour chaque fichier de configuration de l'Agent (avec le paramètre `network_devices.namespace`).

Si l'adresse IP de l'exportateur NetFlow est l'une des adresses IP de l'appareil, mais pas celle configurée dans l'intégration SNMP, Datadog tente de localiser l'appareil auquel appartient l'adresse IP de l'exportateur et enrichit vos données NetFlow avec celle-ci tant que la correspondance est unique.

### Enrichissement par adresse IP de fournisseur cloud {#cloud-provider-ip-enrichment}

Datadog enrichit les adresses IP avec le service et la région du fournisseur cloud public pour les adresses IPv4, afin que vous puissiez filtrer les enregistrements de flux par service et région spécifiques.

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_enrichment_2.png" alt="Menu Filtre Netflow affichant le nom du fournisseur cloud, la région et le service." width="100%" >}}

### Enrichissement des ports {#port-enrichment}

Datadog enrichit les ports dans NetFlow avec les données de l'IANA (Internet Assigned Numbers Authority) pour résoudre les mappages de ports connus (tels que Postgres sur 5432 et HTTPS sur 443). 

### Enrichissement personnalisé des ports {#custom-port-enrichment}

Vous pouvez également ajouter vos propres enrichissements personnalisés pour mapper les ports et les protocoles à des applications spécifiques (par exemple, si un service personnalisé s'exécute sur un port spécifique). Cela permet aux ingénieurs réseau et à leurs équipes d'interpréter et d'interroger plus facilement les données NetFlow avec des noms lisibles par l'homme.

Depuis l'onglet {{< ui >}}Configuration{{< /ui >}} dans NetFlow, cliquez sur {{< ui >}}+ Add Enrichment{{< /ui >}} pour télécharger le fichier CSV contenant vos enrichissements personnalisés.

{{< img src="network_device_monitoring/netflow/new_enrichment_2.png" alt="La nouvelle fenêtre modale de mappage d'enrichissement dans l'onglet de configuration NetFlow." width="100%" >}}

### Enrichissement IP personnalisé {#custom-ip-enrichment}

Vous pouvez également ajouter vos propres enrichissements personnalisés pour mapper les IP et les CIDR à des tags personnalisés (par exemple, pour catégoriser les services s'exécutant sur des adresses IP spécifiques). Cela permet aux ingénieurs réseau et à leurs équipes d'interpréter et d'interroger plus facilement les données NetFlow avec des noms lisibles par l'homme.

Depuis la [{{< ui >}}Enrichment{{< /ui >}} page des paramètres][10], cliquez sur {{< ui >}}+ Add Enrichment{{< /ui >}} pour ajouter des mappages manuellement ou téléchargez un fichier CSV pour ajouter des mappages en masse.

### Enrichissement IP privé DNS inverse {#reverse-dns-private-ip-enrichment}

Activez l'enrichissement IP privé DNS inverse pour effectuer des recherches DNS pour les noms de host associés aux adresses IP source ou de destination. Une fois activé, l'Agent effectue des recherches DNS inverses sur les IP source et de destination au sein des plages d'adresses privées, enrichissant les enregistrements NetFlow avec les noms de host correspondants.

Par défaut, l'enrichissement IP DNS inverse dans votre [`datadog.yaml` fichier][7] est désactivé. Pour l'activer, consultez la section [Configuration](#configuration) de cette page.

Recherchez DNS dans le menu {{< ui >}}+ Filter{{< /ui >}} pour localiser les flux associés à l'enrichissement IP DNS inverse :

{{< img src="network_device_monitoring/netflow/dns_ip_enrichmen_2.png" alt="Menu de filtrage amélioré pour afficher les facettes de destination et de source DNS inverse" width="100%" >}}

**Remarque** : Les entrées DNS inverses sont mises en cache et soumises à une limitation de débit afin de minimiser les requêtes DNS et de réduire la charge sur les serveurs DNS. Pour plus d'options de configuration, notamment la modification de la mise en cache par défaut et de la limitation de débit, consultez la `reverse_dns_enrichment` section du [fichier de configuration de l'Agent exemple][7].

## Détails IP {#ip-details}

Dans la vue **Conversations**, vous pouvez afficher l'adresse IP publique de l'IP de destination. Survolez l'IP pour afficher des métadonnées enrichies sur l'IP et un lien vers {{< ui >}}View Related Network Connections{{< /ui >}} où vous pouvez inspecter la connectivité plus en détail.

{{< img src="network_device_monitoring/netflow/NetFlow_IP_pill.png" alt="Survolez une adresse IP pour afficher les détails de l'IP et voir les connexions réseau associées." width="100%" >}}

## Diagramme de flux {#flow-diagram}

Vous pouvez visualiser les flux dans NetFlow Monitoring en cliquant sur le {{< ui >}}Flows{{< /ui >}} menu et en survolant un flux de la liste pour afficher des informations supplémentaires sur l'IP source, le nom de l'interface d'entrée, le nom de l'appareil et l'IP de destination à travers les connexions réseau associées.

{{< img src="network_device_monitoring/netflow/flows.png" alt="Survolez un flux agrégé à partir d'un appareil émettant du netflow pour accéder aux connexions réseau associées" width="100%" >}}

## Network Path pour NetFlow {#network-path-for-netflow}

Les tests dynamiques pour NetFlow peuvent exécuter automatiquement des tests Network Path depuis l'Agent qui collecte le trafic NetFlow vers les adresses IP de destination observées dans les enregistrements NetFlow. Utilisez les tests dynamiques pour NetFlow afin d'ajouter un contexte de route et de latence saut par saut à vos destinations NetFlow.

Les tests dynamiques pour NetFlow sont expérimentaux et nécessitent l'Agent `v7.81+`. Pour configurer les tests dynamiques pour NetFlow, consultez [Configuration de Network Path][11].

## Monitor NetFlow {#netflow-monitor}

Cliquez sur l'icône {{< ui >}}Create Monitor{{< /ui >}} depuis l'une des vues pour créer un [monitor NetFlow][6]. Lors de la création du monitor, prenez en compte les champs suivants par rapport à l'adresse IP source ou à l'adresse IP de destination du point de vue du périphérique. Ces champs fournissent des informations sur les modèles de trafic réseau et aident à optimiser les performances et la sécurité.

{{< img src="network_device_monitoring/netflow/create_monitor.png" alt="Vue des flux dans la surveillance NetFlow avec le lien de création de monitor mis en surbrillance." width="100%" >}}

### Informations sur l'interface {#interface-information}

Les champs suivants représentent les détails concernant les interfaces d'entrée et de sortie.

| Nom du champ | Description du champ |
|---|---|
| Alias de l'interface de sortie | Alias de l'interface de sortie. |
| Index de l'interface de sortie | Index de l'interface de sortie. |
| Nom de l'interface de sortie | Nom de l'interface de sortie. |
| Alias de l'interface d'entrée | Alias de l'interface d'entrée. |
| Index de l'interface d'entrée | Index de l'interface d'entrée. |
| Nom de l'interface d'entrée | Nom de l'interface d'entrée. |

### Informations sur le périphérique {#device-information}

Les champs suivants représentent les détails relatifs au périphérique générant les enregistrements NetFlow.

| Nom du champ | Description du champ |
|---|---|
| IP du périphérique | Adresse IP utilisée pour mapper un périphérique dans NDM à des fins d'enrichissement. |
| IP de l'exportateur | Adresse IP à partir de laquelle les paquets NetFlow proviennent. |
| Modèle du périphérique | Modèle du périphérique. |
| Nom du périphérique | Nom du périphérique. |
| Espace de noms du périphérique | Espace de noms du périphérique. |
| Fournisseur du périphérique | Fournisseur du périphérique. |

### Détails du flux {#flow-details}

Les champs suivants représentent les caractéristiques du flux réseau.

| Nom du champ | Description du champ |
|---|---|
| Direction | Indique si le flux est entrant ou sortant. |
| Heure de début | Horodatage du premier paquet réseau entre les adresses IP source et destination. |
| Heure de fin | Horodatage du dernier paquet réseau entre les adresses IP source et destination. |
| Type Ethernet | Type d'encapsulation de trame Ethernet (IPv4 ou IPv6). |
| Type de flux | Type de format de données NetFlow (IPFIX, sFlow5, NetFlow5, NetFlow9 ou Inconnu). |
| Protocole IP | Protocole utilisé pour la communication (tel que ICMP, TCP ou UDP). |
| IP du prochain saut | Adresse IP du prochain saut dans le chemin réseau. |
| Indicateur TCP | Union de tous les indicateurs TCP observés pendant la durée de vie du flux. |
| Octets | Nombre total d'octets transférés. |
| Paquets | Nombre total de paquets transférés. |

En plus des champs, vous pouvez également utiliser des facettes prêtes à l'emploi pour commencer à analyser les modèles de trafic basés sur les adresses IP de destination et de source NetFlow.

### Facettes IP de destination NetFlow {#netflow-destination-ip-facets}

| Nom de la facette | Description de la facette |
|---|---|
| Domaine AS de destination | Le domaine associé au système autonome (AS) auquel appartient l'adresse IP de destination. |
| Nom AS de destination | Le nom du système autonome (AS) auquel appartient l'adresse IP de destination. |
| Numéro AS de destination | Le numéro attribué au système autonome (AS) auquel appartient l'adresse IP de destination. |
| Route AS de destination | Les informations de route associées au système autonome (AS) auquel appartient l'adresse IP de destination. |
| Type AS de destination | Le type de système autonome (AS) auquel appartient l'adresse IP de destination (tel que transit, client, pair). |
| Nom de l'application de destination | Le nom de l'application associée à l'adresse IP de destination. |
| Nom de la ville de destination | Le nom de la ville associée à l'adresse IP de destination. |
| Nom du fournisseur cloud de destination | Le nom du fournisseur cloud associé à l'adresse IP de destination. |
| Région du fournisseur cloud de destination | La région du fournisseur cloud associée à l'adresse IP de destination. |
| Service du fournisseur cloud de destination | Le service fourni par le fournisseur cloud associé à l'adresse IP de destination. |
| Code du continent de destination | Le code représentant le continent associé à l'adresse IP de destination. |
| Nom du continent de destination | Le nom du continent associé à l'adresse IP de destination. |
| Code ISO du pays de destination | Le code ISO représentant le pays associé à l'adresse IP de destination. |
| Nom du pays de destination | Le nom du pays associé à l'adresse IP de destination. |
| IP de destination | L'adresse IP de destination. |
| Latitude de destination | La coordonnée de latitude associée à l'adresse IP de destination. |
| Longitude de destination | La coordonnée de longitude associée à l'adresse IP de destination. |
| MAC de destination | L'adresse de contrôle d'accès au support (MAC) associée à l'adresse IP de destination. |
| Masque de destination | Le masque de sous-réseau associé à l'adresse IP de destination. |
| Port de destination | Le numéro de port de destination. |
| Nom de host DNS inverse de destination | Le nom de host DNS associé à l'adresse IP de destination. |
| Code ISO de la subdivision de destination | Le code ISO représentant la subdivision (telle qu'un État ou une province) associée à l'adresse IP de destination. |
| Nom de la subdivision de destination | Le nom de la subdivision (telle qu'un État ou une province) associée à l'adresse IP de destination. |
| Fuseau horaire de destination | Le fuseau horaire associé à l'adresse IP de destination. |

### Facettes IP source NetFlow {#netflow-source-ip-facets}

| Nom de la facette | Description de la facette |
|---|---|
| Domaine AS source | Le domaine associé au système autonome (AS) auquel appartient l'adresse IP source. |
| Nom AS source | Le nom du système autonome (AS) auquel appartient l'adresse IP source. |
| Numéro AS source | Le numéro attribué au système autonome (AS) auquel appartient l'adresse IP source. |
| Route AS source | Les informations de routage associées au système autonome (AS) auquel appartient l'adresse IP source. |
| Type AS source | Le type de système autonome (AS) auquel appartient l'adresse IP source (tel que transit, client, pair). |
| Nom de l'application source | Le nom de l'application associée à l'adresse IP source. |
| Nom de la ville source | Le nom de la ville associée à l'adresse IP source. |
| Nom du fournisseur Cloud source | Le nom du fournisseur Cloud associé à l'adresse IP source. |
| Région du fournisseur Cloud source | La région du fournisseur Cloud associée à l'adresse IP source. |
| Service du fournisseur Cloud source | Le service fourni par le fournisseur Cloud associé à l'adresse IP source. |
| Code du continent source | Le code représentant le continent associé à l'adresse IP source. |
| Nom du continent source | Le nom du continent associé à l'adresse IP source. |
| Code ISO du pays source | Le code ISO représentant le pays associé à l'adresse IP source. |
| Nom du pays source | Le nom du pays associé à l'adresse IP source. |
| IP source | L'adresse IP source. |
| Latitude source | La coordonnée de latitude associée à l'adresse IP source. |
| Longitude source | La coordonnée de longitude associée à l'adresse IP source. |
| MAC source | L'adresse de contrôle d'accès au support (MAC) associée à l'adresse IP source. |
| Masque source | Le masque de sous-réseau associé à l'adresse IP source. |
| Port source | Le numéro de port source. |
| Nom de host DNS inverse source | Le nom de host DNS associé à l'adresse IP source. |
| Code ISO de la subdivision source | Le code ISO représentant la subdivision (telle qu'un État ou une province) associée à l'adresse IP source. |
| Nom de la subdivision source | Le nom de la subdivision (telle qu'un État ou une province) associée à l'adresse IP source. |
| Fuseau horaire source | Le fuseau horaire associé à l'adresse IP source. |

## Assemblage de conversations {#conversation-stitching}

Par défaut, les enregistrements NetFlow séparent les flux unidirectionnels pour chaque direction du trafic entre deux endpoints (A → B et B → A). L'assemblage de conversations combine ceux-ci en un seul enregistrement bidirectionnel, vous donnant une vue complète du trafic total échangé entre deux endpoints (A ↔ B).

Avec l'assemblage de conversations, vous pouvez :

- Voir le trafic total échangé entre deux endpoints comme une seule conversation au lieu de flux directionnels séparés
- Identifier les véritables initiateurs et répondeurs afin que les widgets de source et de destination reflètent des rôles précis
- Supprimer le bruit lorsque des serveurs apparaissent incorrectement comme sources principales

Pour basculer entre les vues assemblées (bidirectionnelles) et non assemblées (unidirectionnelles), accédez à n'importe quelle vue NetFlow basée sur un endpoint et utilisez le bouton {{< ui >}}Bidirectional{{< /ui >}} sous le sélecteur de temps.

{{< img src="network_device_monitoring/netflow/conversation_stitching.png" alt="Bouton d'assemblage des conversations dans la vue NetFlow" width="100%" >}}

## Taux d'échantillonnage {#sampling-rate}

Le taux d'échantillonnage de NetFlow est pris en compte par défaut dans le calcul des octets et des paquets. Les valeurs affichées pour les octets et les paquets sont calculées avec le taux d'échantillonnage appliqué.
De plus, vous pouvez interroger **Bytes (Adjusted) (@adjusted_bytes)** et **Packets (Adjusted) (@adjusted_packets)** dans les dashboards et notebooks pour les visualiser.

Pour visualiser les octets/paquets bruts (Sampled) envoyés par vos appareils, vous pouvez interroger **Bytes (Sampled) (@bytes)** et **Packets (Sampled) (@packets)** dans dashboards et notebooks.

## Rétention {#retention}

Les données NetFlow sont conservées par défaut pendant 30 jours, avec des options de rétention de 15, 30, 60 et 90 jours.

<div class="alert alert-warning">Pour conserver les données NetFlow pendant des périodes plus longues, contactez votre responsable de compte.</div>

## Limiter le volume de flux par intervalle de vidage {#limit-flow-volume-per-flush-interval}

Pour contrôler le volume NetFlow et les coûts associés, configurez l'Agent pour plafonner le nombre d'enregistrements de flux soumis par intervalle de vidage. L'intervalle de vidage est la période pendant laquelle les flux sont agrégés avant d'être transférés à Datadog.

Lorsque cette limite est activée, l'Agent ne conserve que les **flux principaux par nombre d'octets** jusqu'au maximum configuré, et ignore les flux à faible volume pour cet intervalle de vidage.

### Configuration {#configuration-1}

**Remarque** : Nécessite la version `7.75.1` de l'Agent ou une version ultérieure.

Configurez les éléments suivants dans votre `datadog.yaml` :

```yaml
network_devices:
  netflow:
    enabled: true
    aggregator_max_flows_per_flush_interval: 10000
```

Avec cette configuration, l'Agent soumet au maximum 10 000 enregistrements NetFlow par intervalle de vidage (5 minutes par défaut). L'Agent donne la priorité aux flux à volume élevé et ignore le reste.

### Estimation du volume quotidien {#estimating-daily-volume}

Votre nombre approximatif de flux maximum quotidien est :

`max_flows_per_flush_interval * (minutes_per_day / flush_interval_minutes)`

Par exemple, avec `10,000` flux par intervalle de vidage et un intervalle de vidage de 5 minutes :

`10,000 * (1440 / 5) = 2,880,000 flows/day`

### Comportement attendu {#expected-behavior}

- **Les principaux consommateurs de bande passante sont prioritaires :** Ceci est idéal pour les workflows axés sur le trafic à haut volume (par exemple, les générateurs de trafic et les liens bruyants).
- **Visibilité réduite pour les flux à faible volume :** Les paires source/destination à faible trafic peuvent ne pas apparaître lorsque le plafond est atteint.
- **Comportement par Agent :** La limite est appliquée à chaque Agent indépendamment. Si plusieurs Agents voient du trafic pour les mêmes conversations, ils ne sont pas globalement agrégés avant la troncature.

### Surveillance de la troncature {#monitoring-truncation}

Lorsque la limitation de flux est activée, l'Agent émet des métriques que vous pouvez utiliser pour comprendre quelle quantité de données est conservée par rapport à celle qui est supprimée :

- `ndm.flow_truncation.flows_total`
- `ndm.flow_truncation.flows_kept`
- `ndm.flow_truncation.flows_dropped`
- `ndm.flow_truncation.keep_ratio`
- `ndm.flow_truncation.threshold_value`
- `ndm.flow_truncation.runtime_ms`

Utilisez ces métriques pour valider le plafond choisi et pour détecter quand la troncature se produit fréquemment (ce qui peut indiquer que vous devriez ajuster le plafond ou l'intervalle de vidage).

## Dépannage {#troubleshooting}

### Perte de paquets NetFlow {#netflow-packet-drops}
Des pertes de paquets NetFlow peuvent se produire lorsqu'il y a un nombre élevé de paquets NetFlow par seconde, généralement supérieur à 50 000. Les étapes suivantes peuvent aider à identifier et à atténuer les pertes de paquets NetFlow :

#### Identification des pertes de paquets {#identifying-packet-drops}

Utilisez la commande `netstat -s` pour voir s'il y a des paquets UDP perdus :

```bash
    netstat -s
  ```

#### Mitigation steps
1. Increase the Number of NetFlow Listeners

  Increase the number of NetFlow listeners by using a configuration similar to the following:
  Datadog recommends setting the number of workers to match the number of CPU cores in your system:

```yaml
      netflow:
        enabled: true
        listeners:
          - flow_type: netflow9
            port: 2055
            workers: 4 # 4 CPUs
```

2. Augmenter la longueur de la file d'attente UDP (Linux uniquement)

  L'ajustement de la longueur de la file d'attente UDP de votre système peut aider à gérer le volume plus élevé de paquets NetFlow. Augmentez la taille du tampon de réception UDP à 25 Mo en exécutant les commandes suivantes :

```bash
    sudo sysctl -w net.core.rmem_max=26214400
    sudo sysctl -w net.core.rmem_default=26214400
```

3. Persistance de la configuration (Linux uniquement)

  Pour rendre ces changements permanents, ajoutez les lignes suivantes à votre fichier `/etc/sysctl.conf` :

```bash
    net.core.rmem_max=26214400
    net.core.rmem_default=26214400
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/network_monitoring/devices/snmp_metrics/
[3]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/devices/netflow
[6]: /fr/monitors/types/netflow/
[7]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
[9]: /fr/network_monitoring/devices/troubleshooting#traps-or-flows-not-being-received-at-all
[10]: https://app.datadoghq.com/devices/settings/enrichment/ip
[11]: /fr/network_monitoring/network_path/setup/#dynamic-tests-for-netflow-experimental
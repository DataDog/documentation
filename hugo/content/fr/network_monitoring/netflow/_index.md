---
aliases:
- /fr/network_monitoring/devices/netflow/
further_reading:
- link: /network_monitoring/devices/profiles
  tag: Documentation
  text: Utiliser des profils avec le Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-netflow-with-datadog/
  tag: Blog
  text: Surveillez les données de trafic NetFlow avec Datadog
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: Blog
  text: Surveiller et résoudre des problèmes de performances réseau avec des interruptions
    SNMP
title: NetFlow Monitoring
---
## Aperçu {#overview}

La vue NetFlow dans la surveillance des dispositifs réseau offre une visibilité sur les flux de trafic réseau collectés à partir des dispositifs qui exportent des données de flux (par exemple, des routeurs, des pare-feu ou des commutateurs). Vous pouvez analyser le volume de trafic, identifier les principaux émetteurs et comprendre comment les données circulent dans votre réseau.

La vue NetFlow affiche des métriques de trafic agrégées par dispositif et par interface. Utilisez-la pour identifier quels dispositifs ou interfaces consomment le plus de bande passante, génèrent le plus de paquets ou contribuent aux pics de trafic.

{{< img src="network_device_monitoring/netflow/netflow.png" alt="La page de surveillance NetFlow contient une légende repliable pour le volume de trafic, la santé des dispositifs, les flux et plus encore." style="width:100%;" >}}

## Navigation latérale {#side-navigation}

Utilisez la navigation à gauche pour explorer d'autres vues NetFlow :

- **Volume de trafic** : Métriques de flux globales par dispositif et par interface.
- **Santé des dispositifs** : État et utilisation des dispositifs surveillés.
- **Flux** : Enregistrements de flux individuels détaillés.
- **Conversations** : Paires source-destination agrégées.
- **Systèmes autonomes** : Données de flux regroupées par numéros de systèmes autonomes (ASN).
- **Géolocalisation IP** : Données de flux regroupées par origine/destination géographique.
- **Ports source / Ports de destination / Protocoles / Drapeaux** : Répartition du trafic par métadonnées de paquets.

## Installation {#installation}

Pour utiliser la surveillance NetFlow avec la surveillance des dispositifs réseau, assurez-vous d'utiliser la version [Agent][1] 7.45 ou plus récente.

**Remarque :** La configuration de [la collecte de métriques à partir de la surveillance des dispositifs réseau][2] n'est pas une exigence pour l'envoi de données NetFlow, bien qu'elle soit fortement recommandée car ces données supplémentaires peuvent être utilisées pour enrichir vos enregistrements de flux avec des informations telles que le nom du dispositif, le modèle et le fournisseur, ainsi que le nom de l'interface entrante/sortante.

## Configuration {#configuration}

Pour configurer vos dispositifs afin d'envoyer du trafic NetFlow, jFlow, sFlow ou IPFIX au serveur Agent NetFlow, vos dispositifs doivent être configurés pour envoyer le trafic à l'adresse IP sur laquelle l'Agent Datadog est installé, spécifiquement les `flow_type` et `port`.

1. Modifiez votre fichier de configuration de l'Agent [`datadog.yaml`][3] pour activer NetFlow :

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

   **Remarque** : Assurez-vous que vos [règles de pare-feu][9] permettent le trafic UDP entrant sur les ports configurés.

## Agrégation {#aggregation}

L'Agent Datadog agrège automatiquement les données reçues dans NetFlow pour limiter le nombre d'enregistrements envoyés à la plateforme tout en maintenant la plupart des informations. Par défaut, les enregistrements de flux ayant les mêmes identifiants, tels que `source`, `destination address`, `port` et `protocol`, sont agrégés ensemble par intervalles de cinq minutes. De plus, l'Agent Datadog peut détecter les ports éphémères et les supprimer. En conséquence, vous pouvez voir des flux avec `port:*`.

## Enrichissement {#enrichment}

Vos données NetFlow sont traitées par le backend Datadog et enrichies avec les métadonnées disponibles de vos appareils et interfaces. L'enrichissement est basé sur l'adresse IP de l'exportateur NetFlow et les index des interfaces. Pour désambiguïser les collisions possibles entre les adresses IP privées réutilisées, vous pouvez configurer un `namespace` différent pour chaque fichier de configuration d'Agent (avec le paramètre `network_devices.namespace`).

Si l'adresse IP de l'exportateur NetFlow correspond à l'une des adresses IP du dispositif, mais pas à celle configurée dans l'intégration SNMP, Datadog tente de localiser le dispositif auquel appartient l'adresse IP de l'exportateur et enrichit vos données NetFlow avec celle-ci tant que la correspondance est unique.

### Enrichissement IP du fournisseur de cloud {#cloud-provider-ip-enrichment}

Datadog enrichit les IP avec le service et la région du fournisseur de cloud public pour les adresses IPv4, afin que vous puissiez filtrer les enregistrements de flux d'un service et d'une région spécifiques.

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_enrichment_2.png" alt="Menu de filtre Netflow affichant le nom du fournisseur de cloud, la région et le service" width="100%" >}}

### Enrichissement des ports {#port-enrichment}

Datadog enrichit les ports dans NetFlow avec les données de l'IANA (Internet Assigned Numbers Authority) pour résoudre les mappages de ports bien connus (comme Postgres sur 5432 et HTTPS sur 443). 

### Enrichissement des ports personnalisés {#custom-port-enrichment}

Vous pouvez également ajouter vos propres enrichissements personnalisés pour mapper les ports et les protocoles à des applications spécifiques (par exemple, si un service personnalisé fonctionne sur un port spécifique). Cela facilite l'interprétation et l'interrogation des données NetFlow par les ingénieurs réseau et leurs équipes avec des noms lisibles par l'homme.

Dans l'onglet **Configuration** de NetFlow, cliquez sur **+ Ajouter un enrichissement** pour télécharger le fichier CSV contenant vos enrichissements personnalisés.

{{< img src="network_device_monitoring/netflow/new_enrichment_2.png" alt="La fenêtre modale de mappage des nouveaux enrichissements dans l'onglet de configuration de NetFlow" width="100%" >}}

### Enrichissement IP personnalisé {#custom-ip-enrichment}

Vous pouvez également ajouter vos propres enrichissements personnalisés pour mapper les IP et les CIDR à des tags personnalisés (par exemple, pour catégoriser les services fonctionnant sur des adresses IP spécifiques). Cela facilite l'interprétation et l'interrogation des données NetFlow par les ingénieurs réseau et leurs équipes avec des noms lisibles par l'homme.

Depuis la page des paramètres [**Enrichissement**][10], cliquez sur **+ Ajouter un enrichissement** pour ajouter des mappages manuellement ou télécharger un fichier CSV pour ajouter des mappages en masse.

### Enrichissement IP privé DNS inversé {#reverse-dns-private-ip-enrichment}

Activez l'enrichissement IP privé DNS inversé pour effectuer des recherches DNS pour les noms d'hôtes associés aux adresses IP source ou destination. Lorsqu'il est activé, l'Agent effectue des recherches DNS inversées sur les IP source et destination dans les plages d'adresses privées, enrichissant les enregistrements NetFlow avec les noms d'hôtes correspondants.

Par [défaut][7], l'enrichissement IP DNS inversé dans votre fichier `datadog.yaml` est désactivé. Pour activer, consultez la section [Configuration](#configuration) de cette page.

Recherchez **DNS** dans le menu **+ Filtrer** pour localiser les flux associés à l'enrichissement IP DNS inversé :

{{< img src="network_device_monitoring/netflow/dns_ip_enrichmen_2.png" alt="Menu de filtrage amélioré pour afficher les facettes de destination et de source DNS inversé" width="100%" >}}

**Remarque** : Les entrées DNS inversées sont mises en cache et soumises à une limitation de débit pour minimiser les requêtes DNS et réduire la charge sur les serveurs DNS. Pour plus d'options de configuration, y compris la modification de la mise en cache par défaut et de la limitation de débit, consultez le [fichier de configuration complet][8].

## Détails IP {#ip-details}

Dans la vue **Conversations**, vous pouvez voir l'adresse IP publique de l'adresse IP de destination. Survolez l'IP pour afficher des métadonnées riches sur l'IP et un lien vers **Voir les connexions réseau associées** où vous pouvez inspecter la connectivité plus en détail.

{{< img src="network_device_monitoring/netflow/NetFlow_IP_pill.png" alt="Survolez une adresse IP pour afficher les détails de l'IP et voir les connexions réseau associées." width="100%" >}}

## Diagramme de flux {#flow-diagram}

Vous pouvez visualiser les flux dans la surveillance NetFlow en cliquant sur le menu **Flux** et en survolant un flux de la liste pour voir des informations supplémentaires sur l'adresse IP source, le nom de l'interface d'entrée, le nom de l'appareil et l'adresse IP de destination à travers les connexions réseau associées.

{{< img src="network_device_monitoring/netflow/flows.png" alt="Survolez un flux agrégé d'un appareil émettant du netflow pour accéder aux connexions réseau associées" width="100%" >}}

## Moniteur NetFlow {#netflow-monitor}

Cliquez sur l'icône **Créer un moniteur** depuis n'importe quelle vue pour créer un [moniteur NetFlow][6]. Lors de la création du moniteur, considérez les champs suivants par rapport à l'adresse IP source ou à l'adresse IP de destination du point de vue de l'appareil. Ces champs fournissent des informations sur les modèles de trafic réseau et aident à optimiser les performances et la sécurité.

{{< img src="network_device_monitoring/netflow/create_monitor.png" alt="Vue des flux dans la surveillance NetFlow avec le lien de création de moniteur mis en évidence." width="100%" >}}

### Informations sur l'interface {#interface-information}

Les champs suivants représentent des détails sur les interfaces d'entrée et de sortie.

| Nom du champ | Description du champ |
|---|---|
| Alias de l'interface de sortie | Alias de l'interface de sortie. |
| Index de l'interface de sortie | Index de l'interface de sortie. |
| Nom de l'interface de sortie | Nom de l'interface de sortie. |
| Alias de l'interface d'entrée | Alias de l'interface d'entrée. |
| Index de l'interface d'entrée | Index de l'interface d'entrée. |
| Nom de l'interface d'entrée | Nom de l'interface d'entrée. |

### Informations sur le dispositif {#device-information}

Les champs suivants représentent des détails liés au dispositif générant des enregistrements NetFlow.

| Nom du champ | Description du champ |
|---|---|
| Adresse IP du dispositif |  |
| Adresse IP de l'exportateur | Adresse IP à partir de laquelle proviennent les paquets NetFlow. |
| Modèle de l'appareil | Modèle de l'appareil. |
| Nom de l'appareil | Nom de l'appareil. |
| Espace de noms de l'appareil | Espace de noms de l'appareil. |
| Fournisseur de l'appareil | Fournisseur de l'appareil. |

### Détails du flux {#flow-details}

Les champs suivants représentent les caractéristiques du flux réseau.

| Nom du champ | Description du champ |
|---|---|
| Direction | Indique si le flux est entrant ou sortant. |
| Heure de début | Horodatage du premier paquet réseau entre les adresses IP source et destination. |
| Heure de fin | Horodatage du dernier paquet réseau entre les adresses IP source et destination. |
| Type d’Ether | Type d’encapsulation de trame Ethernet (IPv4 ou IPv6). |
| Type de flux | Type de format de données NetFlow (IPFIX, sFlow5, NetFlow5, NetFlow9 ou Inconnu). |
| Protocole IP | Protocole utilisé pour la communication (tel que ICMP, TCP ou UDP). |
| Adresse IP du prochain saut | Adresse IP du prochain saut dans le chemin réseau. |
| Drapeau TCP | Union de tous les drapeaux TCP observés pendant la durée du flux. |
| Octets | Nombre total d'octets transférés. |
| Paquets | Nombre total de paquets transférés. |

En plus des champs, vous pouvez également utiliser des facettes prêtes à l'emploi pour commencer à analyser les modèles de trafic en fonction des adresses IP de destination et de source NetFlow.

### Facettes IP de destination NetFlow {#netflow-destination-ip-facets}

| Nom de la facette | Description de la facette |
|---|---|
| Domaine AS de destination | Le domaine associé au Système Autonome (AS) auquel appartient l'IP de destination. |
| Nom AS de destination | Le nom du Système Autonome (AS) auquel appartient l'IP de destination. |
| Numéro AS de destination | Le numéro attribué au Système Autonome (AS) auquel appartient l'IP de destination. |
| Route AS de destination | Les informations de route associées au Système Autonome (AS) auquel appartient l'IP de destination. |
| Type AS de destination | Le type de Système Autonome (AS) auquel appartient l'IP de destination (tel que transit, client, pair). |
| Nom de l'application de destination | Le nom de l'application associée à l'IP de destination. |
| Nom de la ville de destination | Le nom de la ville associée à l'IP de destination. |
| Nom du fournisseur de cloud de destination | Le nom du fournisseur de cloud associé à l'IP de destination. |
| Région du fournisseur de cloud de destination | La région du fournisseur de cloud associée à l'IP de destination. |
| Service du fournisseur de cloud de destination | Le service fourni par le fournisseur de cloud associé à l'IP de destination. |
| Code de continent de destination | Le code représentant le continent associé à l'IP de destination. |
| Nom de continent de destination | Le nom du continent associé à l'IP de destination. |
| Code ISO du pays de destination | Le code ISO représentant le pays associé à l'IP de destination. |
| Nom du pays de destination | Le nom du pays associé à l'IP de destination. |
| IP de destination | L'adresse IP de destination. |
| Latitude de destination | La coordonnée de latitude associée à l'IP de destination. |
| Longitude de destination | La coordonnée de longitude associée à l'IP de destination. |
| MAC de destination | L'adresse de contrôle d'accès au média (MAC) associée à l'IP de destination. |
| Masque de destination | Le masque de sous-réseau associé à l'adresse IP de destination. |
| Port de destination | Le numéro de port de destination. |
| Nom d'hôte DNS inverse de destination | Le nom d'hôte DNS associé à l'adresse IP de destination. |
| Code ISO de la sous-division de destination | Le code ISO représentant la sous-division (comme l'état ou la province) associée à l'adresse IP de destination. |
| Nom de la sous-division de destination | Le nom de la sous-division (comme l'état ou la province) associée à l'adresse IP de destination. |
| Fuseau horaire de destination | Le fuseau horaire associé à l'adresse IP de destination. |

### Facettes de l'IP Source NetFlow {#netflow-source-ip-facets}

| Nom de la facette | Description de la facette |
|---|---|
| Domaine AS de source | Le domaine associé au Système Autonome (AS) auquel appartient l'adresse IP source. |
| Nom AS de source | Le nom du Système Autonome (AS) auquel appartient l'adresse IP source. |
| Numéro AS de source | Le numéro attribué au Système Autonome (AS) auquel appartient l'adresse IP source. |
| Route AS de source | Les informations de route associées au Système Autonome (AS) auquel appartient l'adresse IP source. |
| Type AS de source | Le type de Système Autonome (AS) auquel appartient l'adresse IP source (comme transit, client, pair). |
| Nom de l'application de source | Le nom de l'application associée à l'adresse IP source. |
| Nom de la ville de source | Le nom de la ville associée à l'adresse IP source. |
| Nom du fournisseur de cloud de source | Le nom du fournisseur de cloud associé à l'adresse IP source. |
| Région du fournisseur de cloud de source | La région du fournisseur de cloud associée à l'adresse IP source. |
| Service du fournisseur de cloud de source | Le service fourni par le fournisseur de cloud associé à l'adresse IP source. |
| Code de continent de source | Le code représentant le continent associé à l'adresse IP source. |
| Nom du continent de source | Le nom du continent associé à l'adresse IP source. |
| Code ISO du pays de source | Le code ISO représentant le pays associé à l'adresse IP source. |
| Nom du pays de source | Le nom du pays associé à l'adresse IP source. |
| IP de source | L'adresse IP de source. |
| Latitude de source | La coordonnée de latitude associée à l'adresse IP source. |
| Longitude de source | La coordonnée de longitude associée à l'adresse IP source. |
| MAC de source | L'adresse MAC associée à l'adresse IP source. |
| Masque de source | Le masque de sous-réseau associé à l'adresse IP source. |
| Port de source | Le numéro de port source. |
| Nom d'hôte DNS inverse de source | Le nom d'hôte DNS associé à l'adresse IP source. |
| Code ISO de la subdivision de source | Le code ISO représentant la subdivision (comme l'état ou la province) associée à l'adresse IP source. |
| Nom de la subdivision de source | Le nom de la subdivision (comme l'état ou la province) associée à l'adresse IP source. |
| Fuseau horaire de source | Le fuseau horaire associé à l'adresse IP source. |

## Assemblage de conversations {#conversation-stitching}

Par défaut, les enregistrements NetFlow séparent les flux unidirectionnels pour chaque direction de trafic entre deux points de terminaison (A → B et B → A). L'assemblage de conversations combine ceux-ci en un seul enregistrement bidirectionnel, vous offrant une vue complète du trafic total échangé entre deux points de terminaison (A ↔ B).

Avec l'assemblage de conversations, vous pouvez :

- Voir le trafic total échangé entre deux points de terminaison comme une seule conversation au lieu de flux directionnels séparés
- Identifier les véritables initiateurs et répondants afin que les widgets source et destination reflètent des rôles précis
- Éliminer le bruit où les serveurs apparaissent incorrectement comme principales sources

Pour basculer entre les vues assemblées (bidirectionnelles) et non assemblées (unidirectionnelles), naviguez vers n'importe quelle vue NetFlow basée sur un point de terminaison et utilisez le commutateur **Bidirectionnel** sous le sélecteur de temps.

{{< img src="network_device_monitoring/netflow/conversation_stitching.png" alt="Basculer l'assemblage de conversations dans la vue NetFlow" width="100%" >}}

## Taux d'échantillonnage {#sampling-rate}

Le taux d'échantillonnage de NetFlow est pris en compte dans le calcul des octets et des paquets par défaut. Les valeurs affichées pour les octets et les paquets sont calculées avec le taux d'échantillonnage appliqué.
De plus, vous pouvez interroger **Octets (Ajustés) (@adjusted_bytes)** et **Paquets (Ajustés) (@adjusted_packets)** dans les tableaux de bord et les carnets pour les visualiser.

Pour visualiser les octets/paquets bruts (échantillonnés) envoyés par vos appareils, vous pouvez interroger **Octets (Échantillonnés) (@bytes)** et **Paquets (Échantillonnés) (@packets)** dans les tableaux de bord et les carnets.

## Conservation {#retention}

Les données NetFlow sont conservées pendant 30 jours par défaut, avec des options pour une conservation de 15, 30, 60 et 90 jours.

<div class="alert alert-warning">Pour conserver les données NetFlow pendant de plus longues périodes, contactez votre représentant commercial.</div>

## Limiter le volume de flux par intervalle de vidage {#limit-flow-volume-per-flush-interval}

Pour contrôler le volume NetFlow et les coûts associés, configurez l'Agent pour limiter le nombre d'enregistrements de flux soumis par intervalle de vidage. L'intervalle de vidage est la période pendant laquelle les flux sont agrégés avant d'être transmis à Datadog.

Lorsque cette limite est activée, l'Agent conserve uniquement les **meilleurs flux par nombre d'octets** jusqu'au maximum configuré, et rejette les flux de volume inférieur pour cet intervalle de vidage.

### Configuration {#configuration-1}

**Remarque** : Nécessite la version de l'Agent `7.75.1` ou ultérieure.

Configurez ce qui suit dans votre `datadog.yaml` :

```yaml
network_devices:
  netflow:
    enabled: true
    aggregator_max_flows_per_flush_interval: 10000
```

Avec cette configuration, l'Agent soumet au maximum 10 000 enregistrements NetFlow par intervalle de vidage (5 minutes par défaut). L'Agent priorise les flux de plus haut volume et rejette le reste.

### Estimation du volume quotidien {#estimating-daily-volume}

Votre nombre maximum approximatif de flux quotidien est :

`max_flows_per_flush_interval * (minutes_per_day / flush_interval_minutes)`

Par exemple, avec `10,000` flux par intervalle de vidage et un intervalle de vidage de 5 minutes :

`10,000 * (1440 / 5) = 2,880,000 flows/day`

### Comportement attendu {#expected-behavior}

- **Les principaux émetteurs sont prioritaires :** Cela est préférable pour les flux de travail axés sur un trafic à fort volume (par exemple, les pilotes de bande passante et les liens bruyants).
- **Visibilité réduite pour les flux à faible volume :** Les paires source/destination à faible trafic peuvent ne pas apparaître lorsque le plafond est atteint.
- **Comportement par Agent :** La limite est appliquée à chaque Agent de manière indépendante. Si plusieurs Agents voient du trafic pour les mêmes conversations, ils ne sont pas agrégés globalement avant la troncature.

### Suivi de la troncature {#monitoring-truncation}

Lorsque la limitation de flux est activée, l'Agent émet des métriques que vous pouvez utiliser pour comprendre combien de données sont conservées par rapport à celles qui sont rejettées :

- `ndm.flow_truncation.flows_total`
- `ndm.flow_truncation.flows_kept`
- `ndm.flow_truncation.flows_dropped`
- `ndm.flow_truncation.keep_ratio`
- `ndm.flow_truncation.threshold_value`
- `ndm.flow_truncation.runtime_ms`

Utilisez ces métriques pour valider votre plafond choisi et pour détecter quand la troncature se produit fréquemment (ce qui peut indiquer que vous devriez ajuster le plafond ou l'intervalle de vidage).

## Dépannage {#troubleshooting}

### Pertes de paquets NetFlow {#netflow-packet-drops}
Des pertes de paquets NetFlow peuvent se produire lorsqu'il y a un nombre élevé de paquets NetFlow par seconde, généralement supérieur à 50 000. Les étapes suivantes peuvent aider à identifier et à atténuer les pertes de paquets NetFlow :

#### Identification des pertes de paquets {#identifying-packet-drops}

Utilisez la commande `netstat -s` pour voir s'il y a des paquets UDP perdus :

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

  Ajuster la longueur de la file d'attente UDP de votre système peut aider à gérer le volume plus élevé de paquets NetFlow. Augmentez la taille du tampon de réception UDP à 25 Mo en exécutant les commandes suivantes :

```bash
    sudo sysctl -w net.core.rmem_max=26214400
    sudo sysctl -w net.core.rmem_default=26214400
```

3. Persistance de la configuration (Linux uniquement)

  Pour rendre ces changements permanents, ajoutez les lignes suivantes à votre fichier `/etc/sysctl.conf` :

```bash
    net.core.rmem_max=26214400
    net.core.rmem_default=26214400
```

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/network_monitoring/devices/snmp_metrics/
[3]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/devices/netflow
[6]: /fr/monitors/types/netflow/
[7]: https://github.com/DataDog/datadog-agent/blob/f6ae461a7d22aaf398de5a94d9330694d69560d6/pkg/config/config_template.yaml#L4201
[8]: https://github.com/DataDog/datadog-agent/blob/f6ae461a7d22aaf398de5a94d9330694d69560d6/pkg/config/config_template.yaml#L4203-L4275
[9]: /fr/network_monitoring/devices/troubleshooting#traps-or-flows-not-being-received-at-all
[10]: https://app.datadoghq.com/devices/settings/enrichment/ip
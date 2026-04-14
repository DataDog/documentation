---
app_id: purefa
categories:
- data stores
- os & system
custom_kind: integration
description: Surveiller les performances et l'utilisation des baies Pure Storage FlashArray
integration_version: 1.3.0
media:
- caption: Dashboard Pure Storage FlashArray - Vue d'ensemble (haut)
  image_url: images/FA-overview-1.png
  media_type: image
- caption: Dashboard Pure Storage FlashArray - Vue d'ensemble (milieu)
  image_url: images/FA-overview-2.png
  media_type: image
- caption: Dashboard Pure Storage FlashArray - Vue d'ensemble (bas)
  image_url: images/FA-overview-3.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: Pure Storage FlashArray
---
## Section Overview

Ce contrôle surveille le [Pure Storage FlashArray](https://www.purestorage.com/products.html) par l'intermédiaire de [Datadog Agent ](https://app.datadoghq.com/account/settings/agent/latest) et de [Pure Storage OpenMetrics exporter](https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter).

Cette intégration vous permet d'obtenir des données sur les performances des baies, hosts, volumes et pods, ainsi que des informations générales sur la configuration et la capacité.

Vous pouvez surveiller plusieurs baies FlashArray et les agréger au sein d'un unique dashboard, ou encore les regrouper en fonction de l'environnement de votre choix.

**Cette intégration nécessite les éléments suivants** :

- La version 7.26.x+ de l'Agent, afin d'exploiter OpenMetricsBaseCheckV2
- Python 3
- L'exportateur Pure Storage OpenMetrics est installé et fonctionne dans un environnement conteneurisé. Reportez-vous au [GitHub repo] (https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter) pour les instructions d'installation.
  - Sur les FlashArrays utilisant Purity//FA version 6.7.0 et supérieure, l'exportateur OpenMetrics fonctionne nativement sur la matrice, voir Configuration pour plus de détails.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la documentation relative aux modèles d'intégration Autodiscovery pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

1. [Téléchargez et lancez le site Datadog Agent ](https://app.datadoghq.com/account/settings/agent/latest).
1. Installez manuellement l'intégration Pure FlashArray. Voir [Use Community Integrations] (https://docs.datadoghq.com/agent/guide/community-integrations-installation-with-docker-agent) pour plus de détails en fonction de votre environnement.

#### Host

Pour configurer ce check pour un Agent en cours d'exécution sur un host, exécutez la commande `sudo -u dd-agent -- datadog-agent integration install -t datadog-purefa==<INTEGRATION_VERSION>`.

Note : `<INTEGRATION_VERSION>` peut être trouvé dans le [CHANGELOG.md](https://github.com/DataDog/integrations-extras/blob/master/purefa/CHANGELOG.md) pour Datadog Integration Extras.

- par exemple `sudo -u dd-agent -- datadog-agent integration install -t datadog-purefa==1.3.0`

### Configuration

1. Créez un utilisateur local sur votre baie FlashArray avec un rôle en lecture seule, puis générez un token d'API pour cet utilisateur.
   ![Générer une clé API](https://raw.githubusercontent.com/DataDog/integrations-extras/master/purefa/images/API.png)
1. Ajoutez le bloc de configuration suivant au fichier `purefa.d/conf.yaml`, dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à collecter les données de performance de PureFA. Voir l'exemple [purefa.d/conf.yaml](https://github.com/datadog/integrations-extras/blob/master/purefa/datadog_checks/purefa/data/conf.yaml.example) pour toutes les options de configuration disponibles.

**Note** : Le point de terminaison `/array` est requis au minimum lors de la création de votre fichier de configuration.

#### (Préféré) Pour utilisation avec le Pure Storage OpenMetrics Exporter natif (Purity//FA 6.7.0+)

```yaml
init_config :
   timeout : 60

instances :

  - openmetrics_endpoint : https://<array_ip_or_fqdn>/metrics/array?namespace=purefa
    tags :
       - env :<env>
       - fa_array_name :<full_fqdn>
       - host :<full_fqdn>
    headers :
       Authorization : Bearer <api_token>
    min_collection_interval : 120
    # Si vous n'avez pas configuré votre certificat TLS de gestion de la pureté, vous pouvez sauter la vérification TLS. Pour les autres options TLS, veuillez consulter conf.yaml.exemple.
    # tls_verify : false
    # tls_ignore_warning : true

  - openmetrics_endpoint : https://<array_ip_or_fqdn>/metrics/volumes?namespace=purefa
    tags :
       - env :<env>
       - fa_array_name :<full_fqdn>
    headers :
       Authorization : Bearer <api_token>
    min_collection_interval : 120
    # Si vous n'avez pas configuré votre certificat TLS de gestion de la pureté, vous pouvez sauter la vérification TLS. Pour les autres options TLS, veuillez consulter conf.yaml.exemple.
    # tls_verify : false
    # tls_ignore_warning : true

  - openmetrics_endpoint : https://<array_ip_or_fqdn>/metrics/hosts?namespace=purefa
    tags :
       - env :<env>
       - fa_array_name :<full_fqdn>
    headers :
       Authorization : Bearer <api_token>
    min_collection_interval : 120
    # Si vous n'avez pas configuré votre certificat TLS de gestion de la pureté, vous pouvez sauter la vérification TLS. Pour les autres options TLS, veuillez consulter conf.yaml.exemple.
    # tls_verify : false
    # tls_ignore_warning : true

  - openmetrics_endpoint : https://<array_ip_or_fqdn>/metrics/pods?namespace=purefa
    tags :
       - env :<env>
       - fa_array_name :<full_fqdn>
       - host :<full_fqdn>
    headers :
       Authorization : Bearer <api_token>
    min_collection_interval : 120
    # Si vous n'avez pas configuré votre certificat TLS de gestion de la pureté, vous pouvez sauter la vérification TLS. Pour les autres options TLS, veuillez consulter conf.yaml.exemple.
    # tls_verify : false
    # tls_ignore_warning : true

  - openmetrics_endpoint : https://<array_ip_or_fqdn>/metrics/directories?namespace=purefa
    tags :
       - env :<env>
       - fa_array_name :<full_fqdn>
       - host :<full_fqdn>
    headers :
       Authorization : Bearer <api_token>
    min_collection_interval : 120
    # Si vous n'avez pas configuré votre certificat TLS de gestion de la pureté, vous pouvez sauter la vérification TLS. Pour les autres options TLS, veuillez consulter conf.yaml.exemple.
    # tls_verify : false
    # tls_ignore_warning : true
```

#### À utiliser avec l'exportateur externe [Pure Storage OpenMetrics exporter] (https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter) (Purity //FA \<6.7.0)

```yaml
init_config:
   timeout: 60

instances:

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/array?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/volumes?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/hosts?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/pods?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/directories?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120
```

2. [Redémarrer le Agent] (https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validation

[Exécutez la sous-commande Agent's status](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) et recherchez `purefa` dans la section Checks.

### Mise à niveau vers de nouvelles versions de cette intégration

#### De PureFA Agent Check 1.0.x à 1.1.x

La version 1.1.x prend en charge à la fois l'exportateur [Pure Storage OpenMetrics] (https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter) et l'exportateur [Pure Storage Prometheus] (https://github.com/PureStorage-OpenConnect/pure-exporter), qui n'est plus d'actualité.

Le tableau de bord de l'exportateur [Pure Storage Prometheus] (https://github.com/PureStorage-OpenConnect/pure-exporter) a été renommé `Pure FlashArray - Overview (Legacy Exporter)`.

Une liste des métriques qui sont à la fois partagées et uniques aux différents exportateurs est listée dans [metrics.py] (https://github.com/datadog/integrations-extras/blob/master/purefa/datadog_checks/purefa/metrics.py). Il se peut que vous deviez mettre à jour vos tableaux de bord et/ou vos alertes pour qu'ils correspondent aux nouveaux noms des mesures lors de la migration de [Pure Storage Prometheus exporter](https://github.com/PureStorage-OpenConnect/pure-exporter) vers [Pure Storage OpenMetrics exporter](https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter). Si vous avez des questions, veuillez contacter Pure Storage à l'aide des informations figurant dans l'onglet Support.

Lors de la migration de [Pure Storage Prometheus exporter](https://github.com/PureStorage-OpenConnect/pure-exporter) vers [Pure Storage OpenMetrics exporter](https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter), les points d'extrémité n'ont plus `/flasharray` dans l'URI du point d'extrémité.

Dans les futures versions du PureFA Agent Check, les noms de métriques issus de l'exportateur Prometheus de Pure Storage seront supprimés.

### Dépannage

#### Aucune baie dans les dashboards

Les dashboards fournis par cette intégration reposent sur les tags `env` et `fa_array_name`. Vérifiez que vous les avez définis au niveau des instances. Vous devez également définir `host` pour les endpoints `/array` et `/pods` dans `purefa.d/conf.yaml`.

```yaml
- tags:
   - env:<environnement>
   - fa_array_name:<fqdn_complet>
   - host:<fqdn_complet>
```

#### Augmenter l'intervalle de collecte

Le check Pure Storage FlashArray définit par défaut `min_collection_interval` sur `120`. La valeur minimale recommandée est `20`. Vous pouvez augmenter ou diminuer `min_collection_interval` dans le fichier `purefa.d/conf.yaml` en fonction de vos besoins :

```yaml
min_collection_interval: 120
```

## Données collectées

### Métriques

| | |
| --- | --- |
| **purefa.alerts.open** <br>(gauge) | Événements d'alerte d'ouverture de FlashArray.|
| **purefa.alerts.total** <br>(gauge) | (Legacy) Nombre d'événements d'alerte.|
| **purefa.array.performance_average_bytes** <br>(gauge) | Taille moyenne des opérations du tableau FlashArray en octets.<br>_Affiché en octet_. |
| **purefa.array.performance_avg_block_bytes** <br>(jauge) | (Legacy) FlashArray taille moyenne des blocs.<br>_Affiché en octet_. |
| **purefa.array.performance_bandwidth_bytes** <br>(jauge) | Débit de la matrice FlashArray en octets par seconde.<br>_Affiché en octets_ |
| **purefa.array.performance_iops** <br>(gauge) | (Legacy) FlashArray IOPS.<br>_Montré en tant qu'opération_ |
| **purefa.array.performance_latency_usec** <br>(jauge) | Latence de la matrice FlashArray en microsecondes.<br>_Affichée en microsecondes_. |
| **purefa.array.performance_qdepth** <br>(gauge) | (hérité) Profondeur de la file d'attente du FlashArray.|
| **purefa.array.performance_queue_depth_ops** <br>(gauge) | Taille de la profondeur de la file d'attente du tableau FlashArray.<br>_Montré comme opération_ |
| **purefa.array.performance_throughput_iops** <br>(jauge) | Débit de la matrice FlashArray en iops.<br>_Montré en tant qu'opération_ |
| **purefa.array.space_bytes** <br>(gauge) | Espace du tableau FlashArray en octets.<br>_Affiché sous forme d'octet_. |
| **purefa.array.space_capacity_bytes** <br>(gauge) | (Ancienne) Capacité totale de la mémoire FlashArray.<br>_Affichée en octets_. |
| **purefa.array.space_data_reduction_ratio** <br>(gauge) | Réduction des données de l'espace de stockage FlashArray.|
| **purefa.array.space_datareduction_ratio** <br>(gauge) | (Legacy) Réduction globale des données FlashArray.|
| **purefa.array.space_provisioned_bytes** <br>(gauge) | (Legacy) FlashArray espace global provisionné.<br>_Affiché en octet_. |
| **purefa.array.space_used_bytes** <br>(gauge) | (Legacy) FlashArray espace total utilisé.<br>_Affiché sous forme d'octet_. |
| **purefa.array.space_utilization** <br>(gauge) | Utilisation de l'espace de la matrice FlashArray en pourcentage.<br>_Affiché en pourcentage_. |
| **purefa.directory.performance_average_bytes** <br>(jauge) | Taille moyenne des opérations du répertoire FlashArray en octets.<br>_Affiché en octet_. |
| **purefa.directory.performance_bandwidth_bytes** <br>(jauge) | Débit du répertoire FlashArray en octets par seconde.<br>_Affiché en octet_ |
| **purefa.directory.performance_latency_usec** <br>(jauge) | Temps de latence du répertoire FlashArray en microsecondes.<br>_Affiché en microsecondes_. |
| **purefa.directory.performance_throughput_iops** <br>(jauge) | Débit de l'annuaire FlashArray en iops.<br>_Montré en tant qu'opération_ |
| **purefa.directory.space_bytes** <br>(gauge) | Espace du répertoire FlashArray en octets.<br>_Affiché sous forme d'octet_. |
| **purefa.directory.space_data_reduction_ratio** <br>(gauge) | Réduction des données de l'espace répertoire de FlashArray.|
| **purefa.drive.capacity_bytes** <br>(gauge) | Capacité du lecteur FlashArray en octets.<br>_Affiché en octets_ |
| **purefa.hardware.chassis_health** <br>(gauge) | État de santé du châssis du matériel FlashArray (hérité).|
| **purefa.hardware.component_health** <br>(gauge) | État de santé des composants matériels de la baie Flash (héritée).|
| **purefa.hardware.controller_health** <br>(gauge) | État de santé du contrôleur matériel FlashArray (hérité).|
| **purefa.hardware.power_volts** <br>(gauge) | Tension d'alimentation du matériel FlashArray (héritée).<br>_Affiché en volt_ |
| **purefa.hardware.temperature_celsius** <br>(gauge) | Capteurs de température matériels FlashArray (anciens).<br>_Affichés en degrés Celsius_. |
| **purefa.host.connections_info** <br>(gauge) | Connexions des volumes hôtes FlashArray.|
| **purefa.host.connectivity_info** <br>(gauge) | Informations sur la connectivité de l'hôte FlashArray.|
| **purefa.host.performance_average_bytes** <br>(jauge) | Taille moyenne des opérations de l'hôte FlashArray en octets.<br>_Affiché en octets_. |
| **purefa.host.performance_bandwidth_bytes** <br>(jauge) | Bande passante de l'hôte FlashArray en octets par seconde.<br>_Affiché en octet_ |
| **purefa.host.performance_iops** <br>(jauge) | (Legacy) FlashArray host IOPS.<br>_Shown as operation_ (en anglais) |
| **purefa.host.performance_latency_usec** <br>(jauge) | Temps de latence de l'hôte FlashArray en microsecondes.<br>_Affiché en microsecondes_. |
| **purefa.host.performance_throughput_iops** <br>(jauge) | Débit de l'hôte FlashArray en iops.<br>_Montré en tant qu'opération_ |
| **purefa.host.space_bytes** <br>(gauge) | Espace hôte du FlashArray en octets.<br>_Affiché en octets_ |
| **purefa.host.space_data_reduction_ratio** <br>(gauge) | Réduction des données de l'espace hôte FlashArray.|
| **purefa.host.space_datareduction_ratio** <br>(gauge) | Taux de réduction des données des volumes hôtes FlashArray (hérités).|
| **purefa.host.space_size_bytes** <br>(gauge) | Taille des volumes hôtes de la baie Flash.<br>_Affichée en octets_. |
| **purefa.hw.component_status** <br>(gauge) | État des composants matériels de la baie Flash.|
| **purefa.hw.component_temperature_celsius** <br>(gauge) | Température du composant matériel de FlashArray en C.<br>_Affichée en degrés Celsius_. |
| **purefa.hw.component_voltage_volt** <br>(gauge) | Tension du composant matériel du FlashArray.<br>_Affiché en volt_ |
| **purefa.hw.controller_info** <br>(gauge) | Informations sur le contrôleur FlashArray|
| **purefa.hw.controller_mode_since_timestamp_seconds** <br>(gauge) | Temps de fonctionnement du contrôleur matériel FlashArray en secondes<br>_Affiché en secondes_. |
| **purefa.info** <br>(jauge) | Informations sur le système FlashArray.|
| **purefa.network.interface_performance_bandwidth_bytes** <br>(gauge) | Bande passante de l'interface réseau de FlashArray en octets par seconde<br>_Affichée en octets_. |
| **purefa.network.interface_performance_errors** <br>(gauge) | Erreurs de l'interface réseau du FlashArray en nombre d'erreurs par seconde<br>_Affichage en tant qu'erreur_. |
| **purefa.network.interface_performance_throughput_pkts** <br>(gauge) | Débit de l'interface réseau FlashArray en paquets par seconde.<br>_Affiché en tant que paquet_ |
| **purefa.network.interface_speed_bandwidth_bytes** <br>(gauge) | Vitesse de l'interface réseau de FlashArray en octets par seconde<br>_Affichage en octets_. |
| **purefa.network.port_info** <br>(gauge) | Informations sur le port réseau du FlashArray|
| **purefa.pod.mediator_status** <br>(gauge) | (Legacy) FlashArray pod mediatorstatus.|
| **purefa.pod.performance_average_bytes** <br>(jauge) | Taille moyenne des opérations du pod FlashArray.<br>_Affiché en octet_. |
| **purefa.pod.performance_bandwidth_bytes** <br>(jauge) | Débit du pod FlashArray en octets par seconde.<br>_Affiché en octets_ |
| **purefa.pod.performance_iops** <br>(jauge) | (Legacy) FlashArray pod IOPS.<br>_Montré en tant qu'opération_ |
| **purefa.pod.performance_latency_usec** <br>(jauge) | Temps de latence du pod FlashArray en microsecondes.<br>_Affiché en microsecondes_. |
| **purefa.pod.performance_replication_bandwidth_bytes** <br>(gauge) | Bande passante de réplication du pod FlashArray.<br>_Affiché en octet_. |
| **purefa.pod.performance_throughput_iops** <br>(jauge) | Débit du pod FlashArray en iops.<br>_Montré en tant qu'opération_ |
| **purefa.pod.replica_links_lag_average_msec** <br>(gauge) | FlashArray pod links average lag in milliseconds.<br>_Shown as second_ (en millisecondes) |
| **purefa.pod.replica_links_lag_average_sec** <br>(gauge) | FlashArray pod links average lag in milliseconds.<br>_Shown as second_ (en millisecondes) |
| **purefa.pod.replica_links_lag_max_msec** <br>(gauge) | FlashArray pod links max lag in milliseconds.<br>_Shown as second_ (en millisecondes) |
| **purefa.pod.replica_links_lag_max_sec** <br>(gauge) | FlashArray pod links max lag in milliseconds.<br>_Shown as second_ (en millisecondes) |
| **purefa.pod.replica_links_performance_bandwidth_bytes** <br>(jauge) | Bande passante des liaisons FlashArray.<br>_Constitué d'un octet_. |
| **purefa.pod.space_bytes** <br>(gauge) | FlashArray pod space in bytes.<br>_Shown as byte_ (en anglais) |
| **purefa.pod.space_data_reduction_ratio** <br>(gauge) | Réduction des données de l'espace de la nacelle FlashArray.|
| **purefa.pod.space_datareduction_ratio** <br>(gauge) | Taux de réduction des données du pod FlashArray (hérité).|
| **purefa.pod.space_size_bytes** <br>(jauge) | (Anciennement) Taille du pod FlashArray.<br>_Affiché en octet_. |
| **purefa.pod.status** <br>(gauge) | (Legacy) Statut du pod FlashArray.|
| **purefa.volume.performance_average_bytes** <br>(jauge) | Taille moyenne des opérations du volume FlashArray en octets.<br>_Affiché en octet_. |
| **purefa.volume.performance_bandwidth_bytes** <br>(jauge) | Débit du volume du FlashArray en octets par seconde.<br>_Affiché en octets_ |
| **purefa.volume.performance_iops** <br>(jauge) | (Legacy) FlashArray volume IOPS.<br>_Shown as operation_ (en anglais) |
| **purefa.volume.performance_latency_usec** <br>(jauge) | Temps de latence du volume FlashArray en microsecondes.<br>_Affiché en microsecondes_. |
| **purefa.volume.performance_throughput_bytes** <br>(jauge) | (Ancien) Débit de volume de FlashArray.<br>_Affiché en octet_. |
| **purefa.volume.performance_throughput_iops** <br>(jauge) | Débit du volume de FlashArray en iops.<br>_Affichage en tant qu'opération_ |
| **purefa.volume.space_bytes** <br>(gauge) | Espace de volume du FlashArray en octets.<br>_Affiché en octets_. |
| **purefa.volume.space_data_reduction_ratio** <br>(gauge) | Réduction des données de l'espace du volume FlashArray.|
| **purefa.volume.space_datareduction_ratio** <br>(gauge) | Taux de réduction des données des volumes FlashArray (hérités).|
| **purefa.volume.space_size_bytes** <br>(gauge) | (Ancien) Taille des volumes FlashArray.<br>_Affiché en octets_. |

### Événements

L'intégration PureFA n'inclut aucun événement.

### Checks de service

**purefa.openmetrics.health**

Renvoie `CRITICAL` si Agent n'est pas en mesure de se connecter au point de terminaison OpenMetrics, sinon renvoie `OK`.

Etat : ok, critique

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez Pure Storage à l'aide des informations suivantes :

- E-mail : pure-observability@purestorage.com
- Slack : [Pure Storage Code// Observability Channel] (https://code-purestorage.slack.com/messages/C0357KLR1EU).
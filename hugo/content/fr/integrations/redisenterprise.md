---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Redis Enterprise Active/Active Statistics: assets/dashboards/redis_enterprise_active_active.json
    Redis Enterprise Cluster Overview: assets/dashboards/redisenterprise_cluster_top_view.json
    Redis Enterprise Database Overview: assets/dashboards/redisenterprise_overview.json
    Redis Enterprise Redis on Flash: assets/dashboards/redisenterprise_rof.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- data store
- caching
creates_events: true
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/README.md
display_name: Redis Enterprise
draft: false
git_integration_title: redisenterprise
guid: 727dcbe6-9ed6-409f-ad72-265939b90da8
integration_id: redisenterprise
integration_title: RedisEnterprise
integration_version: 1.1.1
is_public: true
custom_kind: integration
maintainer: github@mague.com
manifest_version: 1.0.0
metric_prefix: redisenterprise.
metric_to_check: redisenterprise.total_node_count
name: redisenterprise
public_title: Intégration Redis Enterprise
short_description: Visibilité sur Redis Enterprise
support: contrib
supported_os:
- linux
- mac_os
- windows
---



![img][1]

## Présentation

Cette intégration permet de surveiller [Redis Enterprise][2] et d'exploiter les métriques associées dans Datadog.

### En quoi consiste Redis Enterprise ?

[Redis Enterprise][2] est une version pour entreprise de Redis entièrement prise en charge. Outre toutes les fonctionnalités open source de base de Redis, Redit Enterprise propose une distribution géographique active/active, des fonctionnalités de base de données multimodèle, des capacités d'observabilité accrues et une gestion simplifiée pour les déploiements avec plusieurs locataires. Cette solution vous aide ainsi à gagner en disponibilité.

### Dashboard Datadog pour Redis Enterprise

L'intégration Datadog/Redis Enterprise vous permet de bénéficier d'un modèle de vue représentant tous vos clusters et bases de données. Cette vue vous permet de consulter des informations opérationnelles uniquement disponibles avec cette intégration. Vous maîtrisez ainsi mieux vos tendances d'utilisation et pouvez plus facilement planifier votre croissance, en prenant des décisions informées à partir de ces données essentielles.

#### Vue d'ensemble de Datadog
![overview][3]

#### Vue d'ensemble des clusters
![overview][4]

#### Redis on Flash
![rofdash][5]

#### Redis actif/actif
![rofdash][6]

#### Événements Redis Enterprise
![événements][7]

### Fournisseur

![fournisseur][8]

Cette intégration est fournie par Redis Labs.

## Configuration

### Installation

Si vous utilisez la version 7.21/6.21 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Redis Enterprise sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][9] pour installer des checks avec [une version < 7.21/6.21 de l'Agent][10] ou avec l'[Agent Docker][11] :

1. [Téléchargez et lancez l'Agent Datadog][12].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-redisenterprise==<INTEGRATION_VERSION>
   ```
  Vous trouverez la dernière version sur la [page des versions des intégrations Datadog][13].

   **Remarque** : si besoin, ajoutez `sudo -u dd-agent` en tant que préfixe dans la commande d'installation.

3. Configurez votre intégration comme [n'importe quelle autre intégration du package][14].

### Configuration

Copiez l'[exemple de configuration][15] et modifiez les sections requises afin de recueillir des données à partir de votre cluster Redis Enterprise.

```yml
    ## @param host - chaîne, obligatoire
    ## Le host Redis Enterprise
    #
    host: myrediscluster.example.com

    ## @param port - nombre entier, facultatif, valeur par défaut : 9443
    #
    port: 9443

    ## @param user - chaîne, obligatoire
    ## L'utilisateur de l'API Redis Enterprise
    #
    username: redisadmin@example.com

    ## @param password - chaîne, obligatoire
    ## L'identifiant de l'API Redis Enterprise
    #
    password: mySecretPassword
```

Consultez le fichier d'exemple complet pour découvrir d'autres paramètres facultatifs vous permettant de vous aligner sur la configuration de votre cluster.

Pour configurer les utilisateurs, référez-vous à la [documentation Redis][16] (en anglais).

## Données collectées

### Métriques
{{< get-metrics-from-git "redisenterprise" >}}


### Checks de service

**`redisenterprise.running`**

Le check renvoie :

- `OK` si l'API du cluster Redis Enterprise répond correctement aux commandes
- `CRITICAL` si l'API ne répond pas comme elle devrait

**`redisenterprise.license_check`**

Le check renvoie :

- `OK` si la licence du cluster est valide pendant plus d'une semaine
- `WARNING` si la licence du cluster expire dans moins de sept jours
- `CRITICAL` si la licence du cluster a expiré

**Remarque :** si la licence expire, le cluster continue à fonctionner normalement. Toutefois, vous ne pourrez plus modifier sa configuration. Contactez votre représentant commercial pour renouveler votre licence.

### Événements

Tous les [événements Redis Enterprise][18] sont recueillis.

## Dépannage

Contactez l'[équipe d'ingénierie sur site Redis][19].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/redis-enterprise.jpg
[2]: http://www.redislabs.com
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/dashboard.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/datadog_cluster_top_view.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/ROF_dashboard.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/active_active_dashboard.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/events.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/logo-redis.png
[9]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/?tab=agentv721v621
[10]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/?tab=agentearlierversions
[11]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/?tab=docker
[12]: https://app.datadoghq.com/account/settings#agent
[13]: https://github.com/DataDog/integrations-extras/tags
[14]: https://docs.datadoghq.com/fr/getting_started/integrations/
[15]: https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/datadog_checks/redisenterprise/data/conf.yaml.example
[16]: https://docs.redislabs.com/latest/rc/security/database-security/passwords-users-roles/
[17]: https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/metadata.csv
[18]: https://docs.redislabs.com/latest/rs/administering/monitoring-metrics/#cluster-alerts
[19]: mailto:redis.observability@redis.com?subject=Datadog%20Integration%20Support
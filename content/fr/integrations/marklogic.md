---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    MarkLogic - Overview: assets/dashboards/overview.json
  logs:
    source: marklogic
  metrics_metadata: metadata.csv
  monitors:
    Marklogic high load: assets/recommended_monitors/marklogic_high_load.json
    Marklogic long requests: assets/recommended_monitors/marklogic_long_requests.json
    Marklogic low cache: assets/recommended_monitors/marklogic_low_cache.json
  saved_views:
    marklogic_processes: assets/saved_views/marklogic_processes.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/marklogic/README.md'
display_name: MarkLogic
draft: false
git_integration_title: marklogic
guid: 0c200415-731f-4b67-9b2c-d6bd1225eee1
integration_id: marklogic
integration_title: MarkLogic
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: marklogic.
metric_to_check: marklogic.hosts.total_hosts
name: marklogic
process_signatures:
  - MarkLogic
public_title: Intégration Datadog/MarkLogic
short_description: 'Surveillez les métriques associées à vos bases de données, forêts, hosts et serveurs MarkLogic.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [MarkLogic][1] via l'Agent Datadog. MarkLogic Server est une base de données multi-modèle conçue pour regrouper vos données opérationnelles et analytiques.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check MarkLogic est inclus avec le package de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

#### Préparer MarkLogic

À l'aide de l'API ou de l'interface d'administration, créez un utilisateur pour l'Agent Datadog avec les autorisations de rôle [`manage-user`][3] au minimum.
Si vous prévoyez d'utiliser la configuration `enable_health_service_checks`, attribuez à l'utilisateur Datadog MarkLogic le rôle [`manage-admin`][4] au minimum.

##### Utiliser l'API

1. Créez l'utilisateur Datadog en modifiant cette requête avec vos valeurs spécifiques :
    ```shell
    curl -X POST --anyauth --user <ADMIN_USER>:<ADMIN_PASSWORD> -i -H "Content-Type: application/json" -d '{"user-name": "<USER>", "password": "<PASSWORD>", "roles": {"role": "manage-user"}}' http://<HOSTNAME>:8002/manage/v2/users
    ```
    Définissez un `<ADMIN_USER>` et un `<ADMIN_PASSWORD>` valides, et remplacez `<USER>` et `<PASSWORD>` par le nom d'utilisateur et le mot de passe de l'Agent Datadog.
    Pour en savoir plus sur l'endpoint, consultez la [documentation relative à MarkLogic][5].

2. Pour vérifier que l'utilisateur a été créé avec les autorisations requises :
    ```shell
    curl -X GET --anyauth --user <USER>:<PASSWORD> -i http://<HOSTNAME>:8002/manage/v2
    ```

##### Utiliser l'interface d'administration

1. Connectez-vous à la QConsole avec un compte administrateur. Par défaut, la QConsole est disponible à l'adresse suivante : `http://<HOSTNAME>:8000/qconsole`.

2. Sélectionnez `Security` comme base de données et `XQuery` comme type de requête.

3. Exécutez la requête, en remplaçant `<USER>` et `<PASSWORD>` par le nom d'utilisateur et le mot de passe utilisés par l'Agent Datadog :
    ```
    xquery version "1.0-ml";
    import module namespace sec="http://marklogic.com/xdmp/security" at 
        "/MarkLogic/security.xqy";

    sec:create-user(
        "<USER>",
        "Datadog Agent user",
        "<PASSWORD>",
        "manage-user",
        (xdmp:permission("security", "read")),
        ("http://marklogic.com/dev_modules"))

    ```
   Pour en savoir plus sur la requête, consultez la [documentation relative à MarkLogic][6].

4. Pour vérifier que l'utilisateur a été créé avec les autorisations requises, utilisez les champs `<USER>` et `<PASSWORD>` pour vous authentifier sur `http://<HOSTNAME>:8002` (port par défaut).

### Configuration

#### Host

1. Modifiez le fichier `marklogic.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance MarkLogic. Consultez le [fichier d'exemple `marklogic.d/conf.yaml`][7] pour découvrir toutes les options de configuration disponibles. Pour les paramètres liés à l'utilisateur dans le fichier de configuration, utilisez l'utilisateur de l'Agent Datadog que vous avez créé.

2. [Redémarrez l'Agent][8].

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `marklogic.d/conf.yaml` pour commencer à recueillir vos logs MarkLogic :

   ```yaml
     logs:
       - type: file
         path: /var/opt/MarkLogic/Logs/ErrorLog.txt
         source: marklogic
       - type: file
         path: /var/opt/MarkLogic/Logs/80002_AccessLog.txt
         source: marklogic
   ```

    Modifiez la valeur `path` en fonction de votre environnement. Consultez le [fichier d'exemple `marklogic.d/conf.yaml`][7] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `marklogic` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "marklogic" >}}


### Checks de service

**marklogic.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'endpoint de requête. Si ce n'est pas le cas, renvoie `OK`.

**marklogic.forest.health** :<br>
Renvoie `CRITICAL` si l'état de la base de données est `critical` ; `WARNING` si l'état est `maintenance`, `offline` ou `at-risk` ; et `OK` pour les autres cas.

**marklogic.forest.health** :<br>
Renvoie `CRITICAL` si l'état de la forêt est `critical` ; `WARNING` si l'état est `maintenance`, `offline` ou `at-risk` ; et `OK` pour les autres cas.

### Événements

MarkLogic n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://www.marklogic.com
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations
[3]: https://docs.marklogic.com/guide/admin/pre_def_roles#id_64197
[4]: https://docs.marklogic.com/guide/admin/pre_def_roles#id_28243
[5]: https://docs.marklogic.com/REST/POST/manage/v2/users
[6]: https://docs.marklogic.com/sec:create-user
[7]: https://github.com/DataDog/integrations-core/blob/master/marklogic/datadog_checks/marklogic/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/marklogic/metadata.csv
[11]: https://docs.datadoghq.com/fr/help
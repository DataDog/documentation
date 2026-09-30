---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Vertica Overview: assets/dashboards/overview.json
  logs:
    source: vertica
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/vertica/README.md'
display_name: Vertica
draft: false
git_integration_title: vertica
guid: 884d1895-6791-487c-ac8e-7ccaad45db0b
integration_id: vertica
integration_title: Vertica
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: vertica.
metric_to_check: vertica.connection.active
name: vertica
public_title: Intégration Datadog/Vertica
short_description: 'Surveillez le stockage des projections de Vertica, l''utilisation de ses licences, et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Vertica][1] avec l'Agent Datadog.

## Configuration

### Installation

Le check Vertica est inclus avec le package de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

Modifiez le fichier `vertica.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Vertica. Consultez le [fichier d'exemple vertica.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

#### Activation de l'authentification SSL

L'intégration Vertica prend en charge les connexions SSL vers Vertica. Pour activer cette fonctionnalité, définissez `use_tls` sur `true` dans le fichier `conf.yaml`.

Remarque : pour la version 1.9.0 ou les versions antérieures de l'intégration Vertica, définissez plutôt `tls_verify` sur `true`. Pour l'ancienne configuration, si `tls_verify` est explicitement défini sur `true`, alors `use_tls` est défini sur `true`.

#### Préparer Vertica

Créez un utilisateur de base de données pour l’Agent Datadog. Depuis [vsql][4], connectez-vous à la base de données en tant que super-utilisateur. Exécutez ensuite la déclaration `CREATE USER`.

```text
CREATE USER datadog IDENTIFIED BY '<MOTDEPASSE>';
```

Le rôle [SYSMONITOR][5] doit être octroyé à l'utilisateur se connectant à la base de données pour qu'il puisse accéder aux tables système de surveillance.

```text
GRANT SYSMONITOR TO datadog WITH ADMIN OPTION;
```

En outre, comme les métriques relatives à l'utilisation actuelle des licences utilisent les valeurs provenant du dernier [audit][6], Datadog recommande d'effectuer des audits aussi fréquemment que possible. Pour en savoir plus, consultez [le guide relatif aux licences d'audit Vertica][7] (en anglais).

[Redémarrez l'Agent][8] pour commencer à envoyer des métriques Vertica à Datadog.

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `vertica.d/conf.yaml` pour commencer à recueillir vos logs Vertica :

    ```yaml
    logs:
      - source: vertica
        type: file
        path: "/<CATALOG_PATH>/<DATABASE_NAME>/<NODE_NAME>_catalog/vertica.log"
        service: vertica
    ```

3. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `vertica` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "vertica" >}}


### Checks de service

**vertica.can_connect** :<br>
Renvoie `OK` si l'Agent parvient à se connecter à la base de données Vertica qu'il surveille. Si ce n'est pas le cas, renvoie `CRITICAL`.

**vertica.node_state** :<br>
Renvoie `OK` pour les nœuds disponibles, `WARNING` pour ceux qui semblent être sur le point de devenir disponibles et `CRITICAL` pour les autres cas.

### Événements

Vertica n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://www.vertica.com
[2]: https://docs.datadoghq.com/fr/agent/
[3]: https://github.com/DataDog/integrations-core/blob/master/vertica/datadog_checks/vertica/data/conf.yaml.example
[4]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/Glossary/vsql.htm
[5]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/AdministratorsGuide/DBUsersAndPrivileges/Roles/SYSMONITORROLE.htm
[6]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/SQLReferenceManual/Functions/VerticaFunctions/LicenseManagement/AUDIT_LICENSE_SIZE.htm
[7]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/AdministratorsGuide/Licensing/MonitoringDatabaseSizeForLicenseCompliance.htm
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/vertica/metadata.csv
[11]: https://docs.datadoghq.com/fr/help/
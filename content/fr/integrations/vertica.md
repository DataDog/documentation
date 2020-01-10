---
assets:
  dashboards: {}
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
git_integration_title: vertica
guid: 884d1895-6791-487c-ac8e-7ccaad45db0b
integration_id: vertica
integration_title: Vertica
is_public: true
kind: integration
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

## Implémentation

### Installation

Le check Vertica est inclus avec le paquet de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

Modifiez le fichier `vertica.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Vertica. Consultez le [fichier d'exemple vertica.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

#### Préparer Vertica

Créez un utilisateur de base de données pour l'Agent Datadog. Depuis [vsql][11], connectez-vous à la base de données en tant que super-utilisateur. Exécutez ensuite la déclaration `CREATE USER`.

```
CREATE USER datadog IDENTIFIED BY '<MOTDEPASSE>';
```

Le rôle [SYSMONITOR][3] doit être octroyé à l'utilisateur se connectant à la base de données pour qu'il puisse accéder aux tables système de surveillance.

```
GRANT SYSMONITOR TO datadog WITH ADMIN OPTION;
```

En outre, comme les métriques relatives à l'utilisation actuelle des licences utilisent les valeurs provenant du dernier [audit][4], Datadog recommande d'effectuer des audits aussi fréquemment que possible. Pour en savoir plus, consultez [le guide relatif aux licences d'audit Vertica][5] (en anglais).

[Redémarrez l'Agent][7] pour commencer à envoyer des métriques Vertica à Datadog.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

```
logs_enabled: true
```

2. Ajoutez ce bloc de configuration à votre fichier `vertica.d/conf.yaml` pour commencer à recueillir vos logs Vertica :

```
logs:
  - source: vertica
    type: file
    path: /<CHEMIN_CATALOGUE>/<NOM_BASEDEDONNÉES>/<NOM_NŒUD>_catalog/vertica.log
    service: vertica
```

3. [Redémarrez l'Agent][7].

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `vertica` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "vertica" >}}


### Checks de service

- vertica.can_connect` renvoie `OK` si l'Agent est capable de se connecter à la base de données Vertica qu'il surveille. Si ce n'est pas le cas, renvoie `CRITICAL`.
- `vertica.node_state` renvoie `OK` pour chacun des nœuds qui affichent le statut DISPONIBLE et `WARNING` pour ceux qui auront éventuellement un statut DISPONIBLE. Si ce n'est pas le cas, renvoie `CRITICAL`.

### Événements

Vertica n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://www.vertica.com
[2]: https://docs.datadoghq.com/fr/agent
[3]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/AdministratorsGuide/DBUsersAndPrivileges/Roles/SYSMONITORROLE.htm
[4]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/SQLReferenceManual/Functions/VerticaFunctions/LicenseManagement/AUDIT_LICENSE_SIZE.htm
[5]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/AdministratorsGuide/Licensing/MonitoringDatabaseSizeForLicenseCompliance.htm
[6]: https://github.com/DataDog/integrations-core/blob/master/vertica/datadog_checks/vertica/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/vertica/metadata.csv
[10]: https://docs.datadoghq.com/fr/help
[11]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/Glossary/vsql.htm


{{< get-dependencies >}}
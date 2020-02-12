---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/active_directory/README.md'
description: "Recueillez et représentez graphiquement des métriques de Microsoft Active\_Directory."
display_name: Active Directory
git_integration_title: active_directory
guid: ba667ff3-cf6a-458c-aa4b-1172f33de562
integration_id: active-directory
integration_title: Active Directory
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: active_directory.
metric_to_check: active_directory.dra.inbound.objects.persec
name: active_directory
public_title: "Integration Datadog/Active\_Directory"
short_description: "Recueillez et représentez graphiquement des métriques de Microsoft Active\_Directory."
support: core
supported_os:
  - windows
---
## Présentation

Recueillez des métriques et des logs à partir de Microsoft Active Directory pour visualiser et surveiller ses performances.

## Implémentation

### Installation

Le check Active Directory de l'Agent est inclus avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `active_directory.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2] pour commencer à recueillir vos données de performance Active Directory.

#### Collecte de métriques

Par défaut, la configuration devrait déjà recueillir des métriques pour le localhost.
Consultez le [fichier d'exemple active_directory.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `active_directory.d/conf.yaml` pour commencer à recueillir vos logs Active Directory :

    ```
      logs:
        - type: file
          path: /path/to/my/directory/file.log
          source: ruby
          service: <MY_SERVICE>
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
    Consultez le [fichier d'exemple active_directory.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

3. Cette intégration doit être utilisée avec le [module Active Directory pour Ruby][5]. Si vous n'utilisez pas le module Ruby, remplacez la valeur de la source ci-dessus par `active_directory` et configurez le `path` de votre environnement.

4. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `active_directory` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "active_directory" >}}


### Événements
Le check Active Directory n'inclut aucun événement.

### Checks de service
Le check Active Directory n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/active_directory/datadog_checks/active_directory/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://www.rubydoc.info/gems/activedirectory/0.9.3
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/active_directory/metadata.csv
[8]: https://docs.datadoghq.com/fr/help
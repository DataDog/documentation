---
app_id: teamcity
app_uuid: 8dd65d36-9cb4-4295-bb0c-68d67c0cdd4b
assets:
  dashboards:
    TeamCity Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check:
      - teamcity.builds
      - teamcity.build_duration
      metadata_path: metadata.csv
      prefix: teamcity.
    process_signatures:
    - teamcity-server.sh
    - teamcity-server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 109
    source_type_name: Teamcity
  logs:
    source: teamcity
  monitors:
    Build Status: assets/monitors/build_status.json
  saved_views:
    teamcity_processes: assets/saved_views/teamcity_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- log collection
- notifications
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/teamcity/README.md
display_on_public_website: true
draft: false
git_integration_title: teamcity
integration_id: teamcity
integration_title: TeamCity
integration_version: 4.2.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: teamcity
public_title: TeamCity
short_description: Surveillez les builds et visualisez l'impact de chaque déploiement
  sur les performances.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Log Collection
  - Category::Notifications
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Surveillez les builds et visualisez l'impact de chaque déploiement
    sur les performances.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TeamCity
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Présentation

Cette intégration se connecte à votre serveur TeamCity pour envoyer des métriques, des checks de service, et des événements, ce qui vous permet de surveiller la santé des configurations et des exécutions des builds de vos projets TeamCity, les ressources du serveur, et plus encore.

## Formule et utilisation

### Installation

Le check TeamCity est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs TeamCity.

### Dépannage de la solution Browser

#### Préparer TeamCity

Vous pouvez activer [la connexion en tant quʼinvité](#connexion-en-tant-qu-invite), ou identifier [des identifiants dʼutilisateur](#identifiants-d-utilisateur) pour l'authentification HTTP standard.

##### Connexion en tant quʼinvité

1. [Enable guest login][2] (en anglais).

2. Activez `Per-project permissions` pour permettre l'attribution d'autorisations basées sur des projets à l'utilisateur invité. Consultez la section [Changing Authorization Mode][3] (en anglais).
![Activer la connexion en tant quʼinvité][4] (en anglais).
3. Utilisez un rôle en lecture seule existant ou créez-en un nouveau et ajoutez-lui l'autorisation `View Usage Statistics`. Consultez la section [Managing Roles and Permissions][5] (en anglais).
![Create Read-only Role][6] (en anglais)

3. _[Facultatif]_ Pour permettre au check de détecter automatiquement le type de configuration du build lors de la collecte dʼévénement, ajoutez l'autorisation `View Build Configuration Settings` au rôle en lecture seule.
![Assign View Build Config Settings Permission][7] (en anglais)

4. Attribuez le rôle en lecture seule à lʼutilisateur invité. Consultez la section [Assigning Roles to Users][8] (en anglais).
![Guest user settings][9] (en anglais)
![Assign Role][10] (en anglais)

##### Identifiants d'utilisateur

Pour l'authentification HTTP standard
- Indiquez un `username` et un `password` identifiés dans le fichier `teamcity.d/conf.yaml`, dans le dossier `conf.d/` du [répertoire de configuration de votre Agent][11].
- Si vous rencontrez une erreur `Access denied. Enable guest authentication or check user permissions.`, assurez-vous que l'utilisateur dispose des autorisations nécessaires :
  - Les autorisations par projet et pour la consultation des statistiques d'utilisation sont activées.
  - Si vous recueillez des statistiques sur la charge utile de lʼAgent, attribuez également les autorisations pour la consultation des détails de lʼagent et la consultation des statistiques sur lʼutilisation de lʼAgent.

{{< tabs >}}
{{% tab "Host" %}}

#### SLO basés sur des métriques

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

Modifiez le fichier `teamcity.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple teamcity.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

Le check TeamCity propose deux méthodes de collecte de données. Pour surveiller votre environnement TeamCity de façon optimale, configurez deux instances distinctes pour collecter des métriques avec chaque méthode. 

1. Méthode OpenMetrics (nécessite Python version 3) :

   Activez `use_openmetrics: true` pour recueillir des métriques à partir de lʼendpoint Prometheus `/metrics` de TeamCity.

   ```yaml
   init_config: 

   instances:
     - server: http://teamcity.<ACCOUNT_NAME>.com

       ## @param projects - mapping - optional
       ## Mapping of TeamCity projects and build configurations to
       ## collect events and metrics from the TeamCity REST API.
       #
       projects:
         <PROJECT_A>:
           include:    
           - <BUILD_CONFIG_A>
           - <BUILD_CONFIG_B>
           exclude:
           - <BUILD_CONFIG_C>
         <PROJECT_B>:
           include:
           - <BUILD_CONFIG_D>
         <PROJECT_C>: {}
   ```

  Pour recueillir des métriques histogram/summary [conformes OpenMetrics][3] (disponibles avec TeamCity Server 2022.10+ et versions ultérieures), ajoutez la propriété interne `teamcity.metrics.followOpenMetricsSpec=true`. Consultez la section [TeamCity Internal Properties][4] (en anglais).

2. Méthode avec lʼAPI REST du serveur TeamCity (nécessite Python version 3) :

   Configurez une instance distincte dans le fichier `teamcity.d/conf.yaml` pour collecter des métriques supplémentaires spécifiques au build, des checks de service, et des événements sur lʼétat du build depuis l'API REST du serveur TeamCity. Spécifiez vos projets et configurations de build à l'aide de l'option `projects`.

   ```yaml
   init_config:

   instances:
     - server: http://teamcity.<ACCOUNT_NAME>.com

       ## @param projects - mapping - optional
       ## Mapping of TeamCity projects and build configurations to
       ## collect events and metrics from the TeamCity REST API.
       #
       projects:
         <PROJECT_A>:
           include:    
           - <BUILD_CONFIG_A>
           - <BUILD_CONFIG_B>
           exclude:
           - <BUILD_CONFIG_C>
         <PROJECT_B>:
           include:
           - <BUILD_CONFIG_D>
         <PROJECT_C>: {}
    ```

Personnalisez la surveillance de la configuration du build de chaque projet en utilisant les filtres facultatif `include` et `exclude` pour spécifier les ID de configuration de build à inclure ou à exclure de la surveillance, respectivement. Les patterns des expressions régulières sont pris en charge dans les clés `include` et `exclude` pour spécifier les modèles de correspondance des ID de configuration de build. Si les filtres `include` et `exclude` sont omis, toutes les configurations de build sont surveillées pour le projet spécifié. 

Pour Python version 2, configurez un ID de configuration de build par instance à l'aide de l'option `build_configuration` :

```yaml
init_config:

instances:
  - server: http://teamcity.<ACCOUNT_NAME>.com

    ## projets @param - mappage - facultatif
    ## Mappage de projets et de configurations de build TeamCity pour
    ## recueillir des événements et des métriques depuis lʼAPI REST de TeamCity.
    #
    build_configuration: <BUILD_CONFIGURATION_ID>
```

[Redémarrez l'Agent][5] pour commencer à recueillir et envoyer des événements TeamCity à Datadog.

##### APM

1. Configurez les [paramètres de journalisation][4] TeamCity.

2. Par défaut, le pipeline d'intégration de Datadog prend en charge les logs au format suivant :

   ```text
   [2020-09-10 21:21:37,486]   INFO -  jetbrains.buildServer.STARTUP - Current stage: System is ready
   ```

   Dupliquez et modifiez le [pipeline d'intégration][7] si vous avez défini différents [patterns][8] de conversion.

3. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

4. Supprimez la mise en commentaire du bloc de configuration du fichier `teamcity.d/conf.yaml`. Modifiez la valeur du paramètre `path` en fonction de votre environnement. Consultez le [fichier d'exemple teamcity.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   logs:
     - type: file
       path: /opt/teamcity/logs/teamcity-server.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-activities.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-vcs.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-cleanup.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-notifications.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-ws.log
       source: teamcity
   ```

5. [Redémarrez l'Agent][5].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/teamcity/datadog_checks/teamcity/data/conf.yaml.example
[3]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md
[4]: https://www.jetbrains.com/help/teamcity/server-startup-properties.html#TeamCity+Internal+Properties
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://www.jetbrains.com/help/teamcity/teamcity-server-logs.html
[7]: https://docs.datadoghq.com/fr/logs/log_configuration/pipelines/#integration-pipelines
[8]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `teamcity`                                                                                        |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                     |
| `<CONFIG_INSTANCE>`  | `{"server": "%%host%%", "use_openmetrics": "true"}`                                               |

##### APM

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][2].

| Paramètre      | Valeur                                                |
| -------------- | ---------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "teamcity"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande `status` de l'Agent][12] et cherchez `teamcity` dans la section Checks.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "teamcity" >}}


### Aide

Les événements TeamCity qui correspondent à des builds réussis et échoués sont transmis à Datadog.

### Aide
{{< get-service-checks-from-git "teamcity" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][13].

## Pour aller plus loin

- [Surveiller l'impact des modifications de code sur les performances avec TeamCity et Datadog.][14]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://www.jetbrains.com/help/teamcity/enabling-guest-login.html
[3]: https://www.jetbrains.com/help/teamcity/managing-roles-and-permissions.html#Changing+Authorization+Mode
[4]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/authentication.jpg
[5]: https://www.jetbrains.com/help/teamcity/managing-roles-and-permissions.html
[6]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/create_role.jpg
[7]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/build_config_permissions.jpg
[8]: https://www.jetbrains.com/help/teamcity/creating-and-managing-users.html#Assigning+Roles+to+Users
[9]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/guest_user_settings.jpg
[10]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/assign_role.jpg
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[12]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[13]: https://docs.datadoghq.com/fr/help/
[14]: https://www.datadoghq.com/blog/track-performance-impact-of-code-changes-with-teamcity-and-datadog
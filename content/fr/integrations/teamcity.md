---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - configuration & deployment
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/teamcity/README.md'
display_name: Teamcity
draft: false
git_integration_title: teamcity
guid: b390dd3f-47d5-4555-976a-36722833f000
integration_id: teamcity
integration_title: Teamcity
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: teamcity.
name: teamcity
process_signatures:
  - teamcity-server.sh
  - teamcity-server
public_title: Intégration Datadog/Teamcity
short_description: Surveillez les builds et visualisez l'impact de chaque déploiement sur les performances.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille les événements associés aux builds réussis et les envoie à Datadog.

Contrairement à la plupart des checks d'Agent, ce check ne recueille pas de métriques, seulement des événements.

## Configuration

### Installation

Le check Teamcity est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs Teamcity.

### Configuration

#### Préparer Teamcity

Suivez les étapes dans la [documentation de Teamcity][2] pour activer la connexion en tant qu'invité.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

Modifiez le fichier `teamcity.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple teamcity.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

```yaml
init_config:

instances:
  - name: Mon site web
    server: teamcity.mycompany.com

    # L'ID du build interne de la configuration de build que vous souhaitez surveiller
    build_configuration: MonSiteWeb_Deploiement
```

Ajoutez un bloc de configuration comme celui-ci aux `instances` pour chaque configuration de build que vous souhaitez suivre.

[Redémarrez l'Agent][3] pour commencer à recueillir et envoyer des événements Teamcity à Datadog.

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/teamcity/datadog_checks/teamcity/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `teamcity`                                                                                        |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                     |
| `<CONFIG_INSTANCE>`  | `{"name": "<NOM_BUILD>", "server":"%%host%%", "build_configuration":"<ID_CONFIGURATION_BUILD>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande `status` de l'Agent][3] et cherchez `teamcity` dans la section Checks.

## Données collectées

### Métriques

Le check Teamcity n'inclut aucune métrique.

### Événements

Les événements Teamcity qui correspondent à des builds réussis sont transmis à votre application Datadog.

### Checks de service

Le check Teamcity n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

- [Surveiller l'impact des modifications de code sur les performances avec TeamCity et Datadog.][5]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://confluence.jetbrains.com/display/TCD9/Enabling+Guest+Login
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/
[5]: https://www.datadoghq.com/blog/track-performance-impact-of-code-changes-with-teamcity-and-datadog
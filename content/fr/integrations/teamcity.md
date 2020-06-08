---
assets:
  dashboards: {}
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

## Implémentation

### Installation

Le check Teamcity est inclus avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs Teamcity.

### Configuration

#### Préparer Teamcity

Suivez les étapes dans la [documentation de Teamcity][2] pour activer la connexion en tant qu'invité.

#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

Modifiez le fichier `teamcity.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple teamcity.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles :

```yaml
init_config:

instances:
  - name: Mon site web
    server: teamcity.mycompany.com

    # L'ID du build interne de la configuration de build que vous souhaitez surveiller
    build_configuration: MonSiteWeb_Deploiement
```

Ajoutez un bloc de configuration comme celui-ci aux `instances` pour chaque configuration de build que vous souhaitez suivre.

[Redémarrez l'Agent][5] pour commencer à recueillir et envoyer des événements Teamcity à Datadog.

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][6] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `teamcity`                                                                                        |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                     |
| `<CONFIG_INSTANCE>`  | `{"name": "<NOM_BUILD>", "server":"%%host%%", "build_configuration":"<ID_CONFIGURATION_BUILD>"}` |

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `teamcity` dans la section Checks.

## Données collectées

### Métriques

Le check Teamcity n'inclut aucune métrique.

### Événements

Les événements Teamcity qui correspondent à des builds réussis sont transmis à votre application Datadog.

### Checks de service

Le check Teamcity n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

- [Suivez l'impact sur les performances des modifications du code avec TeamCity et Datadog.][9]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://confluence.jetbrains.com/display/TCD9/Enabling+Guest+Login
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/teamcity/datadog_checks/teamcity/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/fr/help/
[9]: https://www.datadoghq.com/blog/track-performance-impact-of-code-changes-with-teamcity-and-datadog
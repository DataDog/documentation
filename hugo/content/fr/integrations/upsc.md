---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- os & system
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/upsc/README.md
display_name: UPSC
draft: false
git_integration_title: upsc
guid: f14607ca-0e30-4c7f-9564-fbdb46ca3030
integration_id: upsc
integration_title: UPSC
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: '@platinummonkey'
manifest_version: 1.0.0
metric_prefix: upsc.
metric_to_check: upsc.battery.charge
name: upsc
public_title: Intégration Datadog/UPSC
short_description: Collecteur de statistiques UPSC pour les batteries d'onduleurs
  (UPS)
support: contrib
supported_os:
- linux
---



## Présentation

Recueillez des métriques du service UPSD via UPSC en temps réel pour :

- Visualiser et surveiller la santé et l'état des batteries d'onduleur
- Être informé des failovers et des événements des onduleurs

## Configuration

Le check UPSC n'est pas inclus avec le package de l'[Agent Datadog][1] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check UPSC sur votre host. Consultez la section [Utiliser les intégrations de la communauté][2] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-upsc==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][3] de base.

### Configuration

1. Modifiez le fichier `upsc.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][46] pour commencer à recueillir vos [métriques](#metriques) UPSC. Consultez le [fichier d'exemple upsc.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

## Validation

Lancez la [sous-commande status de l'Agent][7] et cherchez `upsc` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "upsc" >}}


### Événements

Le check UPSC n'inclut aucun événement.

### Checks de service

Le check UPSC n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/fr/getting_started/integrations/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/upsc/datadog_checks/upsc/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/upsc/metadata.csv
[9]: http://docs.datadoghq.com/help
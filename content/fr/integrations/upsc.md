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
  - 'https://github.com/DataDog/integrations-extras/blob/master/upsc/README.md'
display_name: UPSC
draft: false
git_integration_title: upsc
guid: f14607ca-0e30-4c7f-9564-fbdb46ca3030
integration_id: upsc
integration_title: UPSC
is_public: true
kind: integration
maintainer: '@platinummonkey'
manifest_version: 1.0.0
metric_prefix: upsc.
name: upsc
public_title: Intégration Datadog/UPSC
short_description: Collecteur de statistiques UPSC pour les batteries d'onduleurs (UPS)
support: contrib
supported_os:
  - linux
---
## Présentation

Recueillez des métriques du service UPSD via UPSC en temps réel pour :

- Visualiser et surveiller la santé et l'état des batteries d'onduleur
- Être informé des failovers et des événements des onduleurs

## Configuration

Le check UPSC n'est **PAS** inclus avec le package de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check UPSD sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][2] ou avec l'[Agent Docker][4] :

1. [Téléchargez et lancez l'Agent Datadog][1].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-upsc==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][5].

### Configuration

1. Modifiez le fichier `upsc.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6] pour commencer à recueillir vos [métriques](#collecte-de-metriques) UPSC. Consultez le [fichier d'exemple upsc.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][8].

## Validation

[Lancez la sous-commande `status` de l'Agent][9] et cherchez `upsc` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "upsc" >}}


### Événements

Le check UPSC n'inclut aucun événement.

### Checks de service

Le check UPSC n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/upsc/datadog_checks/upsc/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/upsc/metadata.csv
[11]: http://docs.datadoghq.com/help
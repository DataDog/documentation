---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- network
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ping/README.md
display_name: Ping
draft: false
git_integration_title: ping
guid: c3be63cb-678e-4421-b470-79c03b3fe3f1
integration_id: ping
integration_title: Ping
integration_version: 1.0.2
is_public: true
custom_kind: integration
maintainer: jim.stanton@datadoghq.com
manifest_version: 1.0.0
metric_prefix: network.
metric_to_check: network.ping.response_time
name: ping
public_title: Intégration Datadog/Ping
short_description: Surveillez la connectivité vers les hosts à distance.
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check utilise la commande [ping][1] système pour tester l'accessibilité d'un host.
Il peut également mesurer la durée des aller-retour des messages envoyés par le check au host de destination.

La commande ping envoie des paquets de demande d'écho du protocole Internet Control Message Protocol (ICMP)
au host cible. Elle attend ensuite une réponse d'écho ICMP.

Ce check utilise la commande ping système au lieu de générer la demande d'écho du protocole ICMP. En effet, la création d'un paquet ICMP nécessite un socket brut, ce qui requiert des privilèges root que l'Agent ne détient pas. La commande ping utilise le flag d'accès `setuid` pour s'exécuter avec une élévation des privilèges afin d'éviter ce problème.

## Configuration

Le check Ping n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Ping sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez l'une des commandes suivantes pour installer l'intégration de l'Agent :

   ```shell
   # Linux
   datadog-agent integration install -t datadog-ping==<INTEGRATION_VERSION>

   # Windows
   agent.exe integration install -t datadog-ping==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `ping.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Ping. Consultez le [fichier d'exemple ping.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

Lancez la [sous-commande status de l'Agent][7] et cherchez `ping` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ping" >}}


### Événements

Le check Ping n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "ping" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://en.wikipedia.org/wiki/Ping_%28networking_utility%29
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/ping/datadog_checks/ping/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/ping/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/ping/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/
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
  - 'https://github.com/DataDog/integrations-extras/blob/master/ping/README.md'
display_name: Ping
draft: false
git_integration_title: ping
guid: c3be63cb-678e-4421-b470-79c03b3fe3f1
integration_id: ping
integration_title: Ping
is_public: true
kind: integration
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

Ce check utilise la commande ping système au lieu de générer la demande d'écho du protocole ICMP. En effet, la création d'un paquet ICMP nécessitant un socket brut, ce qui requiert des privilèges root que l'Agent ne détient pas. La commande ping utilise le flag d'accès `setuid` pour s'exécuter avec des privilèges élevés afin d'éviter ce problème.

## Configuration

Le check Ping n'est **PAS** inclus avec le package de l'[Agent Datadog][2].

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Ping sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][3] pour installer des checks avec une [version < 6.8 de l'Agent][4] ou avec l'[Agent Docker][5] :

1. [Téléchargez et lancez l'Agent Datadog][2].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :
   **`Linux`** :
   ```shell
      datadog-agent integration install -t datadog-ping==<INTEGRATION_VERSION>
   ```
   **`Windows`** :
   ```shell
      agent.exe integration install -t datadog-ping==<INTEGRATION_VERSION>
   ```
   <INTEGRATION_VERSION> correspond à la version de l'intégration. La première version de datadog-pin disponible est la version 1.0.0. D'autres versions figurent dans le [CHANGELOG][6].
3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][7].

### Configuration

1. Modifiez le fichier `ping.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Ping. Consultez le [fichier d'exemple ping.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `ping` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ping" >}}


### Checks de service

**`network.ping.can_connect`** :

Renvoie `CRITICAL` si l'Agent ne parvient pas à communiquer avec le host cible. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Le check Ping n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://en.wikipedia.org/wiki/Ping_(networking_utility%29
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://github.com/DataDog/integrations-extras/blob/master/ping/CHANGELOG.md
[7]: https://docs.datadoghq.com/fr/getting_started/integrations/
[8]: https://github.com/DataDog/integrations-extras/blob/master/ping/datadog_checks/ping/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/ping/metadata.csv
[12]: https://docs.datadoghq.com/fr/help/
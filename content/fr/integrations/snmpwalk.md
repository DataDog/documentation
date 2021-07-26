---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
  - notification
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/README.md'
display_name: Snmpwalk
draft: false
git_integration_title: snmpwalk
guid: a2864821-994c-4ebb-8532-b6879ea9a9ab
integration_id: snmpwalk
integration_title: "SNMP\_walk"
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: snmpwalk
public_title: "Intégration Datadog/SNMP\_walk"
short_description: snmpwalk description.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service SNMP walk en temps réel pour :

- Visualiser et surveiller les états de SNMP walk
- Être informé des failovers et des événements de SNMP walk

## Configuration

Le check SNMP walk n'est **PAS** inclus dans le paquet de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check SNMP walk sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. [Téléchargez et lancez l'Agent Datadog][1].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-snmpwalk==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][5].

### Configuration

1. Modifiez le fichier `snmpwalk.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6] pour commencer à recueillir vos [métriques](#metriques) SNMP walk. Consultez le [fichier snmpwalk.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][8].

## Validation

[Lancez la sous-commande `status` de l'Agent][9] et cherchez `snmpwalk` dans la section Checks.

## Données collectées

### Métriques

Le check SNMP walk n'inclut aucune métrique.

### Événements

Le check SNMP walk n'inclut aucun événement.

### Checks de service

**`snmpwalk.can_check`**

Le check renvoie :

- `OK` si le check est capable de recueillir des métriques à partir de `snmpwalk`.
- `CRITICAL` si le check rencontre une erreur lors de la tentative de collecte de métriques à partir de `snmpwalk`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/datadog_checks/snmpwalk/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[10]: http://docs.datadoghq.com/help
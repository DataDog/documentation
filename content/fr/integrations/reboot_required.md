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
  - https://github.com/DataDog/integrations-extras/blob/master/reboot_required/README.md
display_name: Reboot required
draft: false
git_integration_title: reboot_required
guid: e7eed0e7-0acd-47c9-b684-3190828517ce
integration_id: reboot-required
integration_title: Reboot required
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: support@krugerheavyindustries.com
manifest_version: 1.0.0
name: reboot_required
public_title: Intégration Datadog/Reboot Required
short_description: Surveillez les systèmes qui nécessitent un redémarrage après une mise à jour logicielle
support: contrib
supported_os:
  - linux
---
## Présentation

Il est possible que les systèmes Linux configurés pour installer automatiquement les paquets ne soient pas configurés pour redémarrer automatiquement (un redémarrage manuel est parfois préférable). Ce check permet l'envoi d'alertes lorsque les redémarrages ne sont pas faits en temps opportun.

## Configuration

Le check Reboot Required n'est pas inclus avec le package de l'[Agent Datadog][1] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Reboot Required sur votre host. Consultez la section [Utiliser les intégrations de la communauté][2] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-reboot_required==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][3] de base.

### Configuration

1. Modifiez le fichier `reboot_required.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4]. Consultez le [fichier d'exemple reboot_required.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. Assurez-vous de créer un répertoire dd-agent (utilisateur qui exécute l'Agent Datadog) avec accès en écriture pour l'Agent, qui sera utilisé par ce check. Le paramètre par défaut `/var/run/dd-agent` est idéal. Les commandes ci-dessous devraient suffire.

   ```shell
   sudo mkdir /var/run/dd-agent
   sudo chown dd-agent:dd-agent /var/run/dd-agent
   ```

3. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `reboot_required` dans la section Checks.

## Données collectées

### Métriques

Aucune métrique n'est recueillie.

### Événements

Le check reboot_required n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "reboot_required" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/fr/getting_started/integrations/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/datadog_checks/reboot_required/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/assets/service_checks.json
[9]: http://docs.datadoghq.com/help
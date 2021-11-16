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
  - 'https://github.com/DataDog/integrations-extras/blob/master/reboot_required/README.md'
display_name: Reboot required
draft: false
git_integration_title: reboot_required
guid: e7eed0e7-0acd-47c9-b684-3190828517ce
integration_id: reboot-required
integration_title: Reboot required
is_public: true
kind: integration
maintainer: support@krugerheavyindustries.com
manifest_version: 1.0.0
name: reboot_required
public_title: Intégration Datadog/Reboot Required
short_description: Surveillez les systèmes nécessite un redémarrage après une mise à jour logicielle
support: contrib
supported_os:
  - linux
---
## Présentation

Il est possible que les systèmes Linux configurés pour installer automatiquement les paquets ne soient pas configurés pour redémarrer automatiquement (un redémarrage manuel est parfois préférable). Ce check permet l'envoi d'alertes lorsque les redémarrages ne sont pas faits en temps opportun.

## Configuration

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Reboot Required sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][1] pour installer des checks avec une [version < 6.8 de l'Agent][2] ou avec l'[Agent Docker][3] :

1. [Téléchargez et lancez l'Agent Datadog][4].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-reboot_required==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][5].

### Configuration

1. Modifiez le fichier `reboot_required.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6]. Consultez le [fichier d'exemple reboot_required.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. Assurez-vous de créer un répertoire dd-agent (utilisateur qui exécute l'Agent Datadog) avec accès en écriture pour l'Agent, qui sera utilisé par ce check. Le paramètre par défaut `/var/run/dd-agent` est idéal. Les commandes ci-dessous devraient suffire.

   ```shell
   sudo mkdir /var/run/dd-agent
   sudo chown dd-agent:dd-agent /var/run/dd-agent
   ```

3. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande `status` de l'Agent][9] et cherchez `reboot_required` dans la section Checks.

## Données collectées

### Métriques

Aucune métrique n'est recueillie.

### Événements

Le check reboot_required n'inclut aucun événement.

## Checks de service

Pour créer des conditions d'alerte sur ces checks de service dans Datadog, sélectionnez « Custom Check » sur la page [Create Monitor][10], et non « Integration ».

**`system.reboot_required`**

Le check renvoie :

- `OK` si le système ne nécessite pas un redémarrage ou nécessite un redémarrage depuis moins de `days_warning` ou `days_critical` jours.
- `WARNING` si le système nécessite un redémarrage depuis plus de `days_warning` jours.
- `CRITICAL` si le système nécessite un redémarrage depuis plus de `days_critical` jours.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/datadog_checks/reboot_required/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[10]: https://app.datadoghq.com/monitors#/create
[11]: http://docs.datadoghq.com/help
---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/reboot_required/README.md'
display_name: Reboot required
git_integration_title: reboot_required
guid: e7eed0e7-0acd-47c9-b684-3190828517ce
integration_id: reboot-required
integration_title: Reboot Required
is_public: true
kind: integration
maintainer: support@krugerheavyindustries.com
manifest_version: 1.0.0
name: reboot_required
public_title: Intégration Datadog/Reboot Required
short_description: Surveillez les systèmes qui doivent être redémarrés après une mise à jour logicielle
support: contrib
supported_os:
  - linux
---
## Présentation

Il est possible que les systèmes Linux configurés pour installer automatiquement les paquets ne soient pas configurés pour redémarrer automatiquement (un redémarrage manuel est parfois préférable). Ce check permet l'envoi d'alertes lorsque les redémarrages ne sont pas faits en temps opportun.

## Implémentation

### Installation

Pour installer le check Reboot Required sur votre host :

1. Installez le [kit de développement][6] sur n'importe quelle machine.
2. Exécutez `ddev release build reboot_required` pour générer le paquet.
3. [Téléchargez l'Agent Datadog][1].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w chemin/vers/dist/reboot_required/<ARTIFACT_NAME>.whl`.

### Configuration

Pour configurer le check Reboot Required :

1. Créez un dossier `reboot_required.d/` dans le dossier `conf.d/` à la racine du répertoire de votre Agent.
2. Créez un fichier `conf.yaml` dans le dossier `reboot_required.d/` précédemment créé.
3. Consultez le [fichier d'exemple reboot_required.yaml][2] et copiez son contenu dans le fichier `conf.yaml`. Le fichier de configuration doit au minimum inclure ce qui suit :

    ```
    init_config:
    instances:
        - reboot_signal_file: "/var/run/reboot-required"
    ```

4. Assurez-vous de créer un répertoire dd-agent (utilisateur qui exécute l'Agent Datadog) avec accès en écriture pour l'Agent, qui sera utilisé par ce check. Le paramètre par défaut `/var/run/dd-agent` est idéal. Les commandes ci-dessous devraient suffire.

    ```
    sudo mkdir /var/run/dd-agent
    sudo chown dd-agent:dd-agent /var/run/dd-agent
    ```

5. [Redémarrez l'Agent][3].

### Validation

[Lancez la sous-commande `status` de l'Agent][3] et cherchez `reboot_required` dans la section Checks.

## Données collectées

### Métriques

Aucune métrique n'est recueillie.

### Événements

Le check reboot_required n'inclut aucun événement.

## Checks de service

Pour créer des conditions d'alerte sur ces checks de service dans Datadog, sélectionnez « Custom Check » sur la page [Create Monitor][4], et non « Integration ».

**`system.reboot_required`**

Le check renvoie :

* `OK` si le système ne nécessite pas un redémarrage ou nécessite un redémarrage depuis moins de `days_warning` ou `days_critical` jours.
* `WARNING` si le système nécessite un redémarrage depuis plus de `days_warning` jours.
* `CRITICAL` si le système nécessite un redémarrage depuis plus de `days_critical` jours.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/datadog_checks/reboot_required/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#agent-status-and-information
[4]: https://app.datadoghq.com/monitors#/create
[5]: http://docs.datadoghq.com/help/
[6]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit


{{< get-dependencies >}}
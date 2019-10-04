---
aliases:
  - /fr/integrations/ssh
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ssh_check/README.md'
display_name: SSH
git_integration_title: ssh_check
guid: 4eb195ef-554f-4cc2-80af-8f286c631fa8
integration_id: ssh
integration_title: Check SSH
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ssh.
metric_to_check: sftp.response_time
name: ssh_check
process_signatures:
  - ssh
  - sftp
  - sshd
  - 'sshd:'
public_title: Intégration Datadog/Check SSH
short_description: Surveillez la connectivité SSH et la latence SFTP.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check vous permet de surveiller la connectivité SSH vers les hosts à distance et les temps de réponse SFTP.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][8] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check SSH/SFTP est inclus avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur votre serveur à partir duquel vous souhaitez tester la connectivité SSH.

### Configuration

1. Modifiez le fichier `ssh_check.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2].
   Consultez le [fichier d'exemple ssh_check.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles :

    ```yaml
        init_config:

        instances:
          - host: <SOME_REMOTE_HOST>  # required
            username: <SOME_USERNAME> # required
            password: <SOME_PASSWORD> # or use private_key_file
        #   private_key_file: <PATH_TO_PRIVATE_KEY>
        #   private_key_type:         # rsa or ecdsa; default is rsa
        #   port: 22                  # default is port 22
        #   sftp_check: False         # set False to disable SFTP check; default is True
        #   add_missing_keys: True    # default is False
    ```

2. [Redémarrez l'Agent][4] pour commencer à envoyer vos métriques, événements et checks de service SSH/SFTP à Datadog.

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `ssh_check` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "ssh_check" >}}


### Événements
Le check SSH ne comprend aucun événement.

### Checks de service

**ssh.can_connect** :

Renvoie CRITICAL si l'Agent ne peut pas ouvrir de session SSH. Si ce n'est pas le cas, renvoie OK.

**sftp.can_connect** :

Renvoie CRITICAL si l'Agent ne peut pas ouvrir de session SFTP. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/ssh_check/datadog_checks/ssh_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/ssh_check/metadata.csv
[7]: https://docs.datadoghq.com/fr/help
[8]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations


{{< get-dependencies >}}
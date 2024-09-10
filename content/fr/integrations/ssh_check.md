---
aliases:
  - /fr/integrations/ssh
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/ssh_check/README.md
display_name: SSH
draft: false
git_integration_title: ssh_check
guid: 4eb195ef-554f-4cc2-80af-8f286c631fa8
integration_id: ssh
integration_title: SSH
integration_version: 2.1.1
is_public: true
custom_kind: integration
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
public_title: "Intégration\_SSH"
short_description: Surveillez la connectivité SSH et la latence SFTP.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check vous permet de surveiller la connectivité SSH vers les hosts à distance et les temps de réponse SFTP.

## Configuration

### Installation

Le check SSH/SFTP est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur votre serveur à partir duquel vous souhaitez tester la connectivité SSH.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `ssh_check.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple ssh_check.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     - host: "<SOME_REMOTE_HOST>" # required
       username: "<SOME_USERNAME>" # required
       password: "<SOME_PASSWORD>" # or use private_key_file
       # private_key_file: <PATH_TO_PRIVATE_KEY>
       # private_key_type:         # rsa or ecdsa; default is rsa
       # port: 22                  # default is port 22
       # sftp_check: False         # set False to disable SFTP check; default is True
       # add_missing_keys: True    # default is False
   ```

2. [Redémarrez l'Agent][3] pour commencer à envoyer vos métriques, événements et checks de service SSH/SFTP à Datadog.

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/ssh_check/datadog_checks/ssh_check/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                        |
| -------------------- | ------------------------------------------------------------ |
| `<NOM_INTÉGRATION>` | `ssh_check`                                                  |
| `<CONFIG_INIT>`      | vide ou `{}`                                                |
| `<CONFIG_INSTANCE>`  | `{"host": "%%host%%", "port":"22", "username":"<NOMUTILISATEUR>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande `status` de l'Agent][2] et cherchez `ssh_check` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ssh_check" >}}


### Événements

Le check SSH ne comprend aucun événement.

### Checks de service
{{< get-service-checks-from-git "ssh_check" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].



[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/fr/help/
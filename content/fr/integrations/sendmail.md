---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - Collaboration
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/sendmail/README.md'
display_name: Sendmail
git_integration_title: sendmail
guid: 4d4f72c7-c8c5-4e7a-b281-32c2d462c7c8
integration_id: sendmail
integration_title: Sendmail
is_public: false
kind: integration
maintainer: david.bouchare@datadoghq.com
manifest_version: 1.0.0
metric_prefix: sendmail.
metric_to_check: sendmail.queue.size
name: sendmail
public_title: Intégration Datadog/Sendmail
short_description: Intégration Sendmail pour surveiller les files d'attente d'e-mails
support: contrib
supported_os:
  - linux
---
## Présentation

Ce check permet de surveiller [Sendmail][1] avec l'Agent Datadog.

## Implémentation

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Sendmail sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][2] ou avec l'[Agent Docker][4] :

1. Installez le [kit de développement][5].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `sendmail`, exécutez :

    ```
    ddev -e release build sendmail
    ```

5. [Téléchargez et lancez l'Agent Datadog][6].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_SENDMAIL_ARTIFACT_>/<SENDMAIL_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][7].

### Configuration

1. Modifiez le fichier `sendmail.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Sendmail. Consultez le [fichier d'exemple sendmail.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande `status` de l'Agent][10] et cherchez `sendmail` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "sendmail" >}}


### Checks de service

`sendmail.returns.output` : renvoie CRITICAL si la commande sendmail ne renvoie aucune sortie. Si ce n'est pas le cas, renvoie OK.

### Événements

Sendmail n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://www.proofpoint.com/us/open-source-email-solution
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/fr/getting_started/integrations
[8]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/datadog_checks/sendmail/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-extras/blob/master/sendmail/metadata.csv
[12]: https://docs.datadoghq.com/fr/help
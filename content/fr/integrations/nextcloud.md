---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - collaboration
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/nextcloud/README.md'
display_name: Nextcloud
git_integration_title: nextcloud
guid: 852e64eb-93b9-4fb2-8cb2-10041b4045c3
integration_id: nextcloud
integration_title: Nextcloud
is_public: true
kind: integration
maintainer: emeric.planet@gmail.com
manifest_version: 1.0.0
metric_prefix: nextcloud.
metric_to_check: nextcloud.server.database.size
name: nextcloud
public_title: Intégration Datadog/Nextcloud
short_description: Surveillez les statistiques générales de votre instance Nextcloud.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Nextcloud][1].

## Implémentation

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Nextcloud sur votre host. Consultez notre guide relatif à l'[installation des intégrations développées par la communauté][2] pour installer des checks avec [une version antérieure à 6.8][3] ou avec l'[Agent Docker][4] :

1. Installez le [kit de développement][5].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `nextcloud`, exécutez :

    ```
    ddev -e release build nextcloud
    ```

5. [Téléchargez et lancez l'Agent Datadog][6].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_NEXTCLOUD_ARTIFACT_>/<NEXTCLOUD_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][7].

### Configuration

1. Modifiez le fichier `nextcloud.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][8] pour commencer à recueillir vos [métriques](#metrics) Nextcloud.
  Consultez le [fichier d'exemple nextcloud.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][10].

### Validation

[Lancez la sous-commande `status` de l'Agent][11] et recherchez `nextcloud` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "nextcloud" >}}


### Checks de service

**`nextcloud.can_connect`**

Le check renvoie :

* `OK` si Nextcloud est accessible.
* `CRITICAL` si Nextcloud est inaccessible.


### Événements

Nextcloud n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][13].

[1]: https://nextcloud.com
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/fr/getting_started/integrations
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/datadog_checks/nextcloud/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/metadata.csv
[13]: https://docs.datadoghq.com/fr/help
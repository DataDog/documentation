---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - processing
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/storm/README.md'
display_name: storm
git_integration_title: storm
guid: 5a9ec2c3-8ea0-4337-8c45-a6b8a36b8721
integration_id: storm
integration_title: Storm
is_public: true
kind: integration
maintainer: '@platinummonkey'
manifest_version: 1.0.0
metric_prefix: storm.
name: storm
public_title: Intégration Datadog/Storm
short_description: Statistiques d'exécution des topologies Apache Storm 1.x.x
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Storm en temps réel pour :

* Visualiser et surveiller les métriques des clusters et des topologies Storm.
* Être informé des failovers et des événements de Storm

## Implémentation

Le check Storm n'est **PAS** inclus avec le paquet de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Storm sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][2] ou avec l'[Agent Docker][4] :

1. Installez le [kit de développement][5].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `storm`, exécutez :

    ```
    ddev -e release build storm
    ```

5. [Téléchargez et lancez l'Agent Datadog][6].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_STORM_ARTIFACT_>/<STORM_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][7].

### Configuration

1. Modifiez le fichier `storm.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][8] pour commencer à recueillir vos [métriques](#metrics) Storm.
  Consultez le [fichier d'exemple storm.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][10].

## Validation

[Lancez la sous-commande `status` de l'Agent][11] et cherchez `storm` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "storm" >}}


### Événements
Le check Storm n'inclut aucun événement.

### Checks de service
**`topology_check.{NOM TOPOLOGIE}`**

Le check renvoie :

* `OK` si la topologie est active.
* `CRITICAL` si la topologie n'est pas active.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][13].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/fr/getting_started/integrations
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/storm/datadog_checks/storm/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/storm/metadata.csv
[13]: http://docs.datadoghq.com/help


{{< get-dependencies >}}
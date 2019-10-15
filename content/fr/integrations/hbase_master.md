---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/hbase_master/README.md'
display_name: "HBase\_master"
git_integration_title: hbase_master
guid: b45e0f05-8ece-4d5c-946b-ce0ee8057e68
integration_id: hbase-master
integration_title: "Hbase\_master"
is_public: true
kind: integration
maintainer: everpeace
manifest_version: 1.0.0
metric_prefix: hbase.
name: hbase_master
public_title: "Intégration Datadog/Hbase\_Master"
short_description: "Intégration HBase\_master."
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Hbase_master en temps réel pour :

* Visualiser et surveiller les états de Hbase_master
* Être informé des failovers et des événements de Hbase_master

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Hbase_master sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][1] pour installer des checks avec une [version < 6.8 de l'Agent][2] ou avec l'[Agent Docker][3] :

1. Installez le [kit de développement][4].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `hbase_master`, exécutez :

    ```
    ddev -e release build hbase_master
    ```

5. [Téléchargez et lancez l'Agent Datadog][5].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_HBASE_MASTER_ARTIFACT_>/<HBASE_MASTER_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].

### Configuration

1. Modifiez le fichier `hbase_master.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos [métriques](#metrics) Hbase_master.
  Consultez le [fichier d'exemple hbase_master.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

## Validation

[Lancez la sous-commande `status` de l'Agent][10] et cherchez `hbase_master` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "hbase_master" >}}


### Événements
Le check Hbase_master n'inclut aucun événement.

### Checks de service
Le check Hbase_master n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/fr/getting_started/integrations
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/metadata.csv
[12]: http://docs.datadoghq.com/help


{{< get-dependencies >}}


## Intégration HBase RegionServer

## Présentation

Recueillez des métriques du service HBase RegionServer en temps réel pour :

* Visualiser et surveiller les états de HBase RegionServer
* Être informé des failovers et des événements de HBase RegionServer

## Implémentation

Le check HBase RegionServer n'est **PAS** inclus dans le paquet de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check HBase RegionServer sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. Installez le [kit de développement][5].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `hbase_regionserver`, exécutez :

    ```
    ddev -e release build hbase_regionserver
    ```

5. [Téléchargez et lancez l'Agent Datadog][6].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_HBASE_REGIONSERVER_ARTIFACT_>/<HBASE_REGIONSERVER_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][7].

### Configuration

1. Modifiez le fichier `hbase_regionserver.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][8] pour commencer à recueillir vos [métriques](#metrics) HBase RegionServer.
  Consultez le [fichier d'exemple hbase_regionserver.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][10].

## Validation

[Lancez la sous-commande `status` de l'Agent][11] et cherchez `hbase_regionserver` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "hbase_regionserver" >}}


### Événements
Le check HBase RegionServer n'inclut aucun événement.

### Checks de service
Le check HBase RegionServer n'inclut aucun check de service.

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
[9]: https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/datadog_checks/hbase_regionserver/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/metadata.csv
[13]: http://docs.datadoghq.com/help


{{< get-dependencies >}}
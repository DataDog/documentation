---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - data store
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/sortdb/README.md'
display_name: Sortdb
git_integration_title: sortdb
guid: 806dcbd7-3686-4472-9435-2049729847c1
integration_id: sortdb
integration_title: Sortdb
is_public: true
kind: integration
maintainer: namrata.deshpande4@gmail.com
manifest_version: 1.0.0
metric_prefix: sortdb.
name: sortdb
public_title: Intégration Datadog/Sortdb
short_description: Prise en charge de la surveillance avec sortdb dans Datadog
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service [Sortdb][1] en temps réel pour :

* Visualiser et surveiller les statistiques Sortdb
* Être informé des failovers Sortdb
* Obtenez des statistiques concernant plusieurs instances et vérifiez leur santé

## Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Sortdb sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. Installez le [kit de développement][5].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `sortdb`, exécutez :

    ```
    ddev -e release build sortdb
    ```

5. [Téléchargez et lancez l'Agent Datadog][6].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_SORTDB_ARTIFACT_>/<SORTDB_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][7].

## Configuration

1. Modifiez le fichier `sortdb.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos [métriques](#collecte-de-metriques) Sortdb.
  Consultez le [fichier d'exemple sortdb.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][10].

## Validation

[Lancez la sous-commande status de l'Agent][11] et cherchez `sortdb` dans la section Checks.

## Compatibilité

Le check SortDB est compatible avec toutes les principales plateformes.

## Données collectées

### Métriques
{{< get-metrics-from-git "sortdb" >}}


### Checks de service

Le check SortDB n'inclut aucun check de service pour le moment.

### Événements

Le check SortDB n'inclut aucun événement pour le moment.

[1]: https://github.com/jehiah/sortdb
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/fr/getting_started/integrations
[8]: https://docs.datadoghq.com/fr/agent/faq/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/datadog_checks/sortdb/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/metadata.csv



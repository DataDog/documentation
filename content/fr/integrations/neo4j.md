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
  - 'https://github.com/DataDog/integrations-extras/blob/master/neo4j/README.md'
display_name: Neo4j
git_integration_title: neo4j
guid: a85ec8bb-e677-4089-ae8f-d1705c340131
integration_id: neo4j
integration_title: Neo4j
is_public: true
kind: integration
maintainer: help@neo4j.com
manifest_version: 1.0.0
metric_prefix: neo4j.
name: neo4j
public_title: Intégration Datadog/Neo4j
short_description: Intégration de Neo4j Enterprise pour surveiller les performances de vos serveurs.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Neo4j en temps réel pour :

* Visualiser et surveiller les états de Neo4j
* Être informé des failovers et des événements de Neo4j

## Implémentation

Le check Neo4j n'est **PAS** inclus avec le paquet de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Neo4j sur votre host. Consultez notre guide de l'Agent relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version antérieure à 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. Installez le [kit de développement][5].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `neo4j`, exécutez :

    ```
    ddev -e release build neo4j
    ```

5. [Téléchargez et lancez l'Agent Datadog][6].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_NEO4J_ARTIFACT_>/<NEO4J_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][7].

### Configuration

1. Modifiez le fichier `neo4j.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][8] pour commencer à recueillir vos [métriques](#collecte-de-metriques) Neo4j.
  Consultez le [fichier d'exemple neo4j.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][10].

## Validation

[Lancez la sous-commande `status` de l'Agent][11] et cherchez `neo4j` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "neo4j" >}}


### Événements
Le check Neo4j n'inclut aucun événement.

### Checks de service
Le check Neo4j applique les tags suivants à l'ensemble des checks de service recueillis :

  * `server_name:<nom_serveur_en_yaml>`
  * `url:<url_neo4j_en_yaml>`

`neo4j.can_connect` :
Renvoie `CRITICAL` si l'Agent n'est pas capable de recevoir la valeur 200 depuis l'endpoint de _surveillance_. Si ce n'est pas le cas, renvoie `OK`.

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
[9]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/datadog_checks/neo4j/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/metadata.csv
[13]: http://docs.datadoghq.com/help


{{< get-dependencies >}}
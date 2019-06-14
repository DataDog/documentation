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

Pour installer le check Neo4j sur votre host :

1. Installez le [kit de développement][7] sur n'importe quelle machine.
2. Exécutez `ddev release build neo4j` pour générer le paquet.
3. [Téléchargez l'Agent Datadog][1].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w chemin/vers/neo4j/dist/<NOM_ARTEFACT>.whl`.

### Configuration

Pour configurer le check Neo4j :

1. Créez un dossier `neo4j.d/` dans le dossier `conf.d/` à la racine du répertoire de votre Agent.
2. Créez un fichier `conf.yaml` dans le dossier `neo4j.d/` précédemment créé.
3. Consultez le [fichier d'exemple neo4j.yaml][2] et copiez son contenu dans le fichier `conf.yaml`.
4. Modifiez le fichier `conf.yaml` pour configurer les serveurs à surveiller :

    * `neo4j_url` : spécifiez l'URL du serveur (p. ex. `http://ec2-54-85-23-10.compute-1.amazonaws.com`).
    * `port` : spécifiez le port HTTP utilisé par Neo4j. *Par défaut, il s'agit de 7474*.
    * `username` : spécifiez un nom d'utilisateur Neo4j valide.
    * `password` : spécifiez le mot de passe correspondant au nom d'utilisateur.
    * `connect_timeout` : définit la durée pendant laquelle la connexion au serveur Neo4j tentera d'être établie.
    * `server_name` : spécifiez le nom à afficher dans Datadog.
    * `version` : spécifiez la version de Neo4j.

5. [Redémarrez l'Agent][3].

## Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `neo4j` dans la section Checks.

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
Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/datadog_checks/neo4j/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/metadata.csv
[6]: http://docs.datadoghq.com/help/
[7]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit


{{< get-dependencies >}}
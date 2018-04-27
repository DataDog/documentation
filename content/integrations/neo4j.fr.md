---
categories:
- data store
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/neo4j/
git_integration_title: neo4j
has_logo: false
integration_title: Neo4j
is_public: true
kind: integration
maintainer: help@neo4j.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: neo4j
public_title: Intégration Datadog-Neo4j
short_description: Intégration avec Neo4j Entreprise pour monitorer les performances serveur.
support: contrib
version: 0.1.0
---



## Aperçu

Obtenir les métriques du service neo4j en temps réel pour:

* Visualiser et monitorer les états de neo4j
* Être informé des failovers et des événements neo4j.

## Implémentation

### Configuration

Modifiez le fichier `neo4j.yaml` pour pointer vers votre serveur et votre port:

* neo4j_url: configurer l'url du serveur (i.e http://ec2-54-85-23-10.compute-1.amazonaws.com)
* port: configurer le port http utilisé par neo4j. Défaut is 7474
* username: définir un nom d'utilisateur neo4j valide
* password: définir le mot de passe pour le nom d'utilisateur
* connect_timeout: réglage de la durée de tentative de connexion au serveur neo4j
* server_name: mettre à ce qui devrait être affiché dans DataDog
* version: configurer la version de neo4j

### Validation

[Lancez la commande `info`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) vous devriez observer la réponse suivante:

    Checks
    ======

        neo4j
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibilité

Le check Neo4j est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "neo4j" >}}


### Evénements
Le check Neo4j n'inclut aucun événement pour le moment.

### Checks de Service
Le check Neo4j n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

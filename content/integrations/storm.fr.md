---
categories:
- processing
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/storm/
git_integration_title: storm
guid: 5a9ec2c3-8ea0-4337-8c45-a6b8a36b8721
has_logo: false
integration_title: Storm
is_public: true
kind: integration
maintainer: cody.lee@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 7.0.0
min_agent_version: 5.6.3
name: storm
public_title: Intégration Datadog-Storm
short_description: Statistiques d'exécution de la topologie Apache Storm 1.x.x
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 1.1.0
---



## Aperçu

Obtenir les métriques du service Storm en temps réel pour:

* Visualiser et monitorer les performances du cluster storm et les métriques de topology.
* Être informé des failovers et des événements Storm

## Implémentation

### Configuration

Modifiez le fichier `storm.yaml` pour pointer vers votre serveur et votre port, définissez les masters à monitorer.

### Validation

[Lancez la commande `info`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) vous devriez observer la réponse suivante:

    Checks
    ======

        storm
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibilité

Le check storm est compatible avec toutes les principales plateformes, et les versions 1.x.x d'Apache Storm.

## Données collectées
### Métriques
{{< get-metrics-from-git "storm" >}}


### Evénements
Le check Storm n'inclut aucun événement pour le moment.

### Checks de Service
Le check Storm n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

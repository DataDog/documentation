---
category:
- aws
- containers
- orchestration
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/fargate/
git_integration_title: ecs_fargate
guid: 7484e55c-99ec-45ad-92f8-28e798796411
has_logo: true
integration_title: ECS-Fargate
is_public: false
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: ecs_fargate
private: true
public_title: Intégration Datadog-ECS-Fargate
short_description: Suivre les métriques pour les conteneurs fonctionnant avec ECS Fargate
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 1.2.0
---



## Aperçu

Obtenir les métriques de tous vos containers s'executant dans ECS Fargate:

* CPU/Memory usage & limit métriques
* I/O métriques

## Implémentation

### Installation

Install the `dd-check-ecs_fargate` package manually or with your favorite configuration manager.

### Configuration

Modifiez le fichier `ecs_fargate.yaml` pour pointer vers votre serveur et votre port, définissez les masters à monitorer.

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `ecs_fargate` dans la section Checks:

    Checks
    ======

        ecs_fargate
        -----------
          - instance #0 [OK]
          - Collected 63 metrics, 0 events & 1 service checks

## Compatibilité

Le check ecs_fargate est compatible avec toutes les principales plateformes.

## Données collectées

### Métriques
{{< get-metrics-from-git "ecs_fargate" >}}


### Evénements

Le check ECS Fargate n'inclut aucun événement pour le moment.

### Checks de Service

Le check ECS Fargate n'inclut aucun check de service pour le moment.

## Troubleshooting

Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)


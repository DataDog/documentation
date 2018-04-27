---
categories:
- os & system
ddtype: check
git_integration_title: linux_proc_extras
guid: 47f243d7-5df4-47b5-9f1a-923b4f7cefe7
has_logo: true
integration_title: Linux Proc Extras
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: linux_proc_extras
public_title: Intégration Datadog-Linux Proc Extras
short_description: linux_proc_extras description.
support: core
supported_os:
- linux
version: 1.0.0
---



## Aperçu
Obtenir les métriques du service linux_proc_extras en temps réel pour:

* Visualiser et monitorer les états de linux_proc_extras
* Être informé des failovers et des événements linux_proc_extras.

## Implémentation
### Installation

Le check Linux_proc_extras est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent) sur vos serveurs.

### Configuration

Editez le fichier `linux_proc_extras.yaml` afin de pointer sur votre serveur et ses ports, configurez le master à monitorer . Consultez l'exemple du [canevas  linux_proc_extras.yaml](https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `linux_proc_extras` dans la section Checks:

    Checks
    ======

        linux_proc_extras
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibilité

Le check linux_proc_extras est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
L'intégration  Linux proc extras n'inclut aucune métrique pour le moment.

### Evénements
Le check Linux proc extras n'inclut aucun événement pour le moment.

### Checks de Service
Le check Linux proc extras n'inclut aucun check de service pour le moment.

## Troubleshooting

Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)


---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/linux_proc_extras/
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

Le check Linux_proc_extras est inclus avec l'Agent, il vous faut donc simplement [installer l'agent][1] dans vos serveurs.

### Configuration

Créez un fichier `linux_proc_extras.yaml` dans le dossier ` conf.d` de l'Agent. Consultez [l'exemple du linux_proc_extras.yaml][2] afin d'apprendre toutes les options de configuration disponibles.

### Validation

[Exécutez le sous-commande `status` de l'Agent][3] et cherchez pour `linux_proc_extras` dans la section Checks.

## Données collectées
### Métriques
L'intégration  Linux proc extras n'inclut aucune métrique pour le moment.

### Évènements
Le check Linux proc extras n'inclut aucun événement pour le moment.

### Checks de Service
Le check Linux proc extras n'inclut aucun check de service pour le moment.

## Troubleshooting

Besoin d'aide ? Contactez  [l'équipe support de Datadog][4].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][5]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[4]: http://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/


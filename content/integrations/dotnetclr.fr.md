---
categories:
- languages
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/dotnetclr/
git_integration_title: dotnetclr
guid: 3d21557e-65bd-4b66-99b9-5521f32b5957
has_logo: true
integration_title: .NET CLR
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: dotnetclr
public_title: Intégration Datadog-.NET CLR 
short_description: dotnetclr description.
support: core
supported_os:
- windows
---



## Aperçu

Obtenir les métriques du service dotnetclr en temps réel pour:

* Visualiser et monitorer les états de dotnetclr
* Etre averti des failovers et des événements de dotnetclr.

## Installation

Le Check Dotnetclr est livré avec l'Agent, vous n'avez qu'à [installer l'Agent][1] sur vos serveurs.

## Configuration

1. Modifiez le fichier `dotnetclr.d/conf.yaml` dans le dossier `conf.d/`, à la racine du répertoire de l'Agent pour commencer à collecter vos métriques dotnetclr.
   Consultez le [fichier d'exemple dotnetclr.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Restart the Agent][5]

## Validation

[Exécutez le sous-commande `status` de l'Agent][2] et cherchez `dotnetclr` dans la section Checks.

## Troubleshooting
Besoin d'aide ? Contactez  [l'équipe support de Datadog][3].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][4].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[3]: http://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/
[5]: https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent


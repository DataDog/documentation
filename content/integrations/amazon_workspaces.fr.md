---
aliases:
  - /fr/integrations/awsworkspaces/
categories:
  - cloud
  - aws
ddtype: crawler
description: >-
  Suivre les connexions ayant échoué, la latence de session, les espaces de
  travail malsains et more.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_workspaces/'
git_integration_title: amazon_workspaces
has_logo: true
integration_title: AWS Workspaces
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_workspaces
public_title: Intégration Datadog-AWS Workspaces
short_description: >-
  Suivre les connexions ayant échoué, la latence de session, les espaces de
  travail malsains, and more.
version: '1.0'
---
## Aperçu

Amazon WorkSpaces est un service informatique de bureau sécurisé entièrement géré qui s'exécute sur le cloud AWS.

Activez cette intégration pour voir dans Datadog toutes vos métriques de Workspaces.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier][1]. Aucune autre étape d'installation ne doit être effectuée.

### Configuration

Dans la [vignette d'intégration AWS] [2], assurez-vous que `Workspaces` est coché dans la partie "metric collection".

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_workspaces" >}}

Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS WorkSpaces n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS WorkSpaces n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog][3].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][4]

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: http://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/

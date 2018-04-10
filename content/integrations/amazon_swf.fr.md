---
aliases:
  - /fr/integrations/awsswf/
categories:
  - cloud
  - configuration & deployment
  - aws
ddtype: crawler
description: Suivre les métriques clés Amazon Simple Workflow Service.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_swf/'
git_integration_title: amazon_swf
has_logo: true
integration_title: AWS Simple Workflow Service
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_swf
public_title: "Intégration Datadog-AWS Simple Workflow Service\_"
short_description: Suivre les métriques clés Amazon Simple Workflow Service.
version: '1.0'
---
## Aperçu

Amazon SWF aide les développeurs à créer, exécuter et mettre à l'échelle les travaux d'arrière-plan qui ont des étapes parallèles ou séquentielles.

Activez cette intégration pour voir dans Datadog toutes vos métriques de SWF.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier][1].

### Configuration

1. Dans la [vignette d'intégration AWS] [2], assurez-vous que `SWF` est coché dans la partie "metric collection".

2. Installez l'intégration [Datadog - AWS SWF] [3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_swf" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS SWF n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS SWF n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog][4].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][5]

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_swf
[4]: http://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/

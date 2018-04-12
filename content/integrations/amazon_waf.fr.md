---
aliases:
  - /fr/integrations/awswaf/
categories:
  - cloud
  - security
  - aws
ddtype: crawler
description: Suivre le nombre de requêtes autorisées ou bloquées.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_waf/'
git_integration_title: amazon_waf
has_logo: true
integration_title: AWS Web Application Firewall
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_waf
public_title: Intégration Datadog-AWS Web Application Firewall
short_description: Suivre le nombre de requêtes autorisées ou bloquées.
version: '1.0'
---
## Aperçu

AWS WAF est un pare-feu d'applications Web qui aide à protéger vos applications contre les exploits courantes.

Activez cette intégration pour voir dans Datadog toutes vos métriques de WAF.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `WAF` est coché dans la partie "metric collection".

2. Installez l'intégration [Datadog - AWS WAF] (https://app.datadoghq.com/account/settings#integrations/amazon_waf).

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_waf" >}}

Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS WAF n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration WAF n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)
---
categories:
- cloud
- health
- aws
- log collection
ddtype: crawler
description: Monitorez les événements du service AWS Health en temps réel.
doc_link: https://docs.datadoghq.com/integrations/amazon_health
git_integration_title: amazon_health
has_logo: true
integration_title: AWS Health
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_health
public_title: Intégration Datadog-AWS Health
short_description: Monitorer AWS service health.
version: '1.0'
---

{{< img src="integrations/amazon_health/awshealthevent.png" alt="AWS Health Event" responsive="true" popup="true">}}

## Aperçu

AWS Health offre une visibilité permanente sur l'état de vos ressources, services et comptes AWS.

Activez cette intégration pour voir dans Datadog tous vos événements AWS Health.

**Note**: Cette intégration ne fonctionne que pour les clients AWS disposant d'un plan de support Business ou Enterprise.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Ajoutez ces permissions à votre [Police IAM Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) afin de collecter vos métriques Amazon Health:

    * `health:DescribeEvents`: Utilisé pour lister tous les événements de santé
    * `health:DescribeEventDetails`: Obtient des informations détaillées sur les événements de santé
    * `health:DescribeAffectedEntities`: Obtient les entités AWS affectées pour les événements de santé

    Pour plus d'information sur les polices Health, consultez [la documentation AWS dédiée](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_health.html).

3. Installez l'intégration [Datadog - AWS Health] (https://app.datadoghq.com/account/settings#integrations/amazon_health).

## Données collectées
### Métriques
L'intégration AWS Health n'inclut aucune métrique pour le moment.

### Evénements

* Cette intégration collecte les événements qui peuvent être trouvés dans le tableau de bord AWS Personal Health.
* Les exemples incluent les issues ouvertes, les maintenances planifiées et les notifications de compte.

### Checks de Service
L'intégration AWS Health n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

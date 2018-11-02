---
categories:
- cloud
- health
- aws
- log collection
ddtype: crawler
dependencies: []
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

## Présentation

AWS Health offre une visibilité permanente sur l'état de vos ressources, services et comptes AWS.

Activez cette intégration pour voir dans Datadog tous vos événements AWS Health.

**Note**: Cette intégration ne fonctionne que pour les clients AWS disposant d'un plan de support Business ou Enterprise.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration d'Amazon Web Services][1].

### Configuration

1. Ajoutez ces autorisations à votre [stratégie IAM Datadog][2] afin de recueillir des métriques Amazon Health:

    * `health:DescribeEvents`: Utilisé pour lister tous les événements de santé
    * `health:DescribeEventDetails`: Obtient des informations détaillées sur les événements de santé
    * `health:DescribeAffectedEntities`: Obtient les entités AWS affectées pour les événements de santé

    Pour en savoir plus sur les stratégies Health, consultez [la documentation disponible sur le site d'AWS][3].

3. Configurez l'[intégration Datadog - AWS Health][4].

## Données collectées
### Métriques
L'intégration AWS Health n'inclut aucune métrique pour le moment.

### Événements

* Cette intégration collecte les événements qui peuvent être trouvés dans le tableau de bord AWS Personal Health.
* Les exemples incluent les issues ouvertes, les maintenances planifiées et les notifications de compte.

### Checks de service
L'intégration AWS Health n'inclut aucun check de service pour le moment.

## Dépannage
Besoin d'aide ? Contactez  [l'équipe support de Datadog][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_health.html
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_health
[5]: https://docs.datadoghq.com/help/


{{< get-dependencies >}}

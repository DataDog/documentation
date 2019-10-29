---
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez les événements du service AWS Health quasiment en temps réel.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_health'
git_integration_title: amazon_health
has_logo: true
integration_title: "Amazon\_Health"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_health
public_title: "Intégration Datadog/Amazon\_Health"
short_description: Surveillez la santé du service AWS.
version: '1.0'
---
## Présentation

AWS Health fournit une visibilité continue sur l'état de vos ressources, services et comptes AWS. Activez cette intégration pour visualiser les événements du service AWS Health dans Datadog :

{{< img src="integrations/amazon_health/awshealthevent.png" alt="Événement AWS Health" responsive="true" popup="true">}}

**Remarque** : cette intégration ne fonctionne que pour les clients AWS disposant d'un programme support Business ou Enterprise.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][2] afin de recueillir des métriques Amazon Health. Pour en savoir plus sur les stratégies Health, consultez [la documentation du site Web d'AWS][3].

    | Autorisation AWS                    | Description                                      |
    |-----------------------------------|--------------------------------------------------|
    | `health:DescribeEvents`           | Utilisé pour énumérer tous les événements de santé                   |
    | `health:DescribeEventDetails`     | Récupère des informations détaillées sur les événements de santé       |
    | `health:DescribeAffectedEntities` | Récupère les entités AWS affectées pour les événements de santé |

3. Configurez l'[intégration Datadog/AWS Health][4].

## Données collectées
### Métriques
L'intégration AWS Health n'inclut aucune métrique.

### Événements

L'intégration AWS Health regroupe les événements situés dans le AWS Personal Health Dashboard. On y trouve par exemple les problèmes en suspens, les événements de maintenance et les notifications du compte.

### Checks de service
L'intégration AWS Health n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_health.html
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_health
[5]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
---
categories:
- aws
- cloud
- log collection
- notifications
dependencies: []
description: Surveillez les événements de santé de vos services AWS en temps quasi
  réel.
doc_link: https://docs.datadoghq.com/integrations/amazon_health
draft: false
git_integration_title: amazon_health
has_logo: true
integration_id: amazon-health
integration_title: AWS Health
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_health
public_title: Intégration Datadog/AWS Health
short_description: Surveillez la santé de vos services AWS.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

AWS Health fournit une visibilité continue sur l'état de vos ressources, services et comptes AWS. Activez cette intégration pour visualiser les événements du service AWS Health dans Datadog :

{{< img src="integrations/amazon_health/awshealthevent.png" alt="Événement AWS Health" popup="true">}}

**Remarque** : cette intégration ne fonctionne que pour les clients AWS disposant d'une formule Business ou Entreprise.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][2] afin de recueillir des données AWS Health. Pour en savoir plus, consultez la section relative aux [stratégies Health][3] de la documentation AWS.

    | Autorisation AWS                    | Description                                      |
    | --------------------------------- | ------------------------------------------------ |
    | `health:DescribeEvents`           | Permet d'énumérer tous les événements de santé                   |
    | `health:DescribeEventDetails`     | Permet de récupérer des informations détaillées sur les événements de santé       |
    | `health:DescribeAffectedEntities` | Permet de récupérer les entités AWS affectées pour les événements de santé |

2. Configurez l'[intégration Datadog/AWS Health][4].

## Real User Monitoring

### Analyse d'entonnoirs

L'intégration AWS Health n'inclut aucune métrique.

### Aide

L'intégration AWS Health regroupe les événements du dashboard AWS Personal Health. On y trouve par exemple les problèmes en suspens, les maintenances planifiées et les notifications de compte.

### Aide

L'intégration AWS Health n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/health/latest/ug/controlling-access.html
[4]: https://app.datadoghq.com/integrations/amazon-health
[5]: https://docs.datadoghq.com/fr/help/
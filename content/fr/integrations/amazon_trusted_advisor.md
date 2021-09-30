---
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Trusted\_Advisor."
doc_link: https://docs.datadoghq.com/integrations/amazon_trusted_advisor/
draft: false
further_reading:
  - link: https://docs.datadoghq.com/dashboards/faq/why-isn-t-my-aws-trusted-advisor-dashboard-showing-any-data/
    tag: FAQ
    text: "Pourquoi mon dashboard AWS Trusted Advisor n'affiche-t-il aucune donnée\_?"
git_integration_title: amazon_trusted_advisor
has_logo: true
integration_id: amazon-trusted-advisor
integration_title: "Amazon\_Trusted\_Advisor"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_trusted_advisor
public_title: "Intégration Datadog/Amazon\_Trusted\_Advisor"
short_description: "Surveillez des métriques clés d'Amazon\_Trusted\_Advisor."
version: '1.0'
---
## Présentation

AWS Trusted Advisor est un outil en ligne fournissant des conseils en temps réel pour vous aider à provisionner vos ressources conformément aux bonnes pratiques AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Trusted Advisor.

**Remarque** : cette intégration ne fonctionne que pour les clients AWS disposant d'un programme support Business ou Enterprise.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Depuis la console IAM, ajoutez `support:describe*` et `support:refresh*` en tant qu'action dans le champ de document de stratégie. Pour en savoir plus sur l'API AWS Support, consultez [la documentation disponible sur le site d'AWS][2].
2. Dans le [carré de l'intégration AWS][3], assurez-vous que l'option `TrustedAdvisor` est cochée dans la section concernant la collecte des métriques.
3. Installez l'[intégration Datadog/Amazon Trusted Advisor][4].

### Collecte de logs

#### Activer le logging

Configurez Amazon Trusted Advisor de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_trusted_advisor` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][5].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon Trusted Advisor dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][6]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][7]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_trusted_advisor" >}}


### Événements

L'intégration Amazon Trusted Advisor n'inclut aucun événement.

### Checks de service

L'intégration Amazon Trusted Advisor n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/service-authorization/latest/reference/list_awssupport.html
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[4]: https://app.datadoghq.com/account/settings#integrations/amazon-trusted-advisor
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_trusted_advisor/amazon_trusted_advisor_metadata.csv
[9]: https://docs.datadoghq.com/fr/help/
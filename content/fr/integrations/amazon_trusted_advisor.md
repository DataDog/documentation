---
categories:
- aws
- cloud
- cost management
- log collection
- provisioning
dependencies: []
description: Surveillez des métriques clés d'AWS Trusted Advisor.
doc_link: https://docs.datadoghq.com/integrations/amazon_trusted_advisor/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-trusted-advisor/
  tag: Blog
  text: Surveiller des checks de limite de service AWS Trusted Advisor avec Datadog
git_integration_title: amazon_trusted_advisor
has_logo: true
integration_id: ''
integration_title: AWS Trusted Advisor
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_trusted_advisor
public_title: Intégration Datadog/AWS Trusted Advisor
short_description: Surveillez des métriques clés d'AWS Trusted Advisor.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

AWS Trusted Advisor est un outil en ligne fournissant des conseils en temps réel pour vous aider à provisionner vos ressources conformément aux bonnes pratiques AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Trusted Advisor.

**Remarque** : cette intégration ne fonctionne que pour les clients AWS disposant d'une formule Business ou Entreprise.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Depuis la console IAM, ajoutez `support:describe*` et `support:refresh*` en tant qu'action dans le champ de document de stratégie. Pour en savoir plus sur l'API AWS Support, consultez la section [Actions, ressources et clés de condition pour AWS Support][2].
2. Dans la [page de l'intégration AWS][3], vérifiez que `Trusted Advisor` est activé dans l'onglet `Metric Collection`.
3. Installez l'[intégration Datadog/AWS Trusted Advisor][4].

### Collecte de logs

#### Activer le logging

Configurez AWS Trusted Advisor de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_trusted_advisor` est défini en tant que _Target prefix_.

#### Envoi de logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][5].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon Trusted Advisor dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][6]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][7]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_trusted_advisor" >}}


### Événements

L'intégration AWS Trusted Advisor n'inclut aucun événement.

### Checks de service

L'intégration Amazon Trusted Advisor n'inclut aucun check de service.

## Dashboard

Pour ajouter des données au dashboard de l'intégration AWS Trusted Advisor, procédez comme suit :

1. Configurez des autorisations d'assistance.
    - Dans la console IAM, ajoutez `support:describe*` et `support: refresh*` en tant qu'action dans la zone de texte du document de stratégie.
1.  Vérifiez que vous disposez d'une offre d'assistance AWS payante.

Le dashboard Datadog Trusted Advisor doit accéder à l'ensemble complet des [checks AWS Trusted Advisor][9]. Ces checks ne sont disponibles qu'avec une offre d'assistance AWS payante. Vérifiez donc que vous disposez d'une offre AWS adéquate.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/service-authorization/latest/reference/list_awssupport.html
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-trusted-advisor
[5]: https://docs.datadoghq.com/fr/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_trusted_advisor/amazon_trusted_advisor_metadata.csv
[9]: https://aws.amazon.com/premiumsupport/trustedadvisor
[10]: https://docs.datadoghq.com/fr/help/
---
aliases:
- /fr/integrations/awsxray/
categories:
- aws
- cloud
- tracing
dependencies: []
description: Tracer les requêtes qui passent d'un service AWS à un autre
doc_link: https://docs.datadoghq.com/integrations/amazon_xray/
draft: false
git_integration_title: amazon_xray
has_logo: true
integration_id: amazon-xray
integration_title: AWS X-Ray
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_xray
public_title: Intégration Datadog/AWS X-Ray
short_description: Tracer les requêtes qui passent d'un service AWS à un autre
version: '1.0'
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">L'intégration Datadog/AWS Lambda X-Ray est uniquement prise en charge sur les comptes AWS commerciaux. Sans compte commercial, l'intégration Datadog/AWS Lambda X-Ray ne peut pas être utilisée sur le site gouvernemental de Datadog.</div>

{{< /site-region >}}
## Présentation

AWS X-Ray permet aux développeurs de tracer des applications distribuées qui ont été créées à l'aide de produits AWS. Cette intégration fournit des traces pour les fonctions Lambda dans la page de détails des fonctions [sans serveur][1]. Pour en savoir plus, consultez la documentation relative à la [surveillance sans serveur][2].

## Implémentation

### Installation

Pour commencer, [activez l'intégration AWS][3] et assurez-vous que le document de stratégie du rôle de l'intégration Datadog comporte les autorisations suivantes :

```text
xray:BatchGetTraces,
xray:GetTraceSummaries
```

L'autorisation `GetTraceSummaries` permet d'obtenir la liste des traces récentes, tandis que `BatchGetTraces` renvoie la totalité des traces.

Ensuite, [activez l'intégration X-Ray][4] dans Datadog.

Si vous utilisez une [Customer Master Key (CMK)][5] pour chiffrer les traces, ajoutez la méthode `kms:Decrypt` à la stratégie au sein de laquelle la ressource correspond à la CMK utilisée pour X-Ray.

**Remarque** : l'activation de l'intégration AWS X-Ray augmente le nombre de spans indexées. Cela peut avoir une incidence sur votre facturation.

### Activer AWS X-Ray pour vos fonctions

1. Suivez les instructions d'AWS pour activer le tracing X-Ray sur vos [fonctions Lambda][6] et [API Gateways][7].
2. Pour tirer le meilleur parti de l'intégration AWS X-Ray, [installez le SDK X-Ray][8] dans votre fonction Lambda.

### Enrichir les traces X-Ray avec Datadog

Datadog peut enrichir les traces X-Ray à l'aide des spans et des métadonnées générées par le client APM Datadog. Il peut aussi les [fusionner][9] en une seule trace Datadog pour la même invocation Lambda.

1. [Installez la surveillance sans serveur Datadog][10] sur vos fonctions Lambda.
2. Définissez la variable d'environnement `DD_MERGE_XRAY_TRACES` sur `true` pour vos fonctions Lambda.

## Données collectées

L'intégration AWS X-Ray récupère les données de trace d'AWS et ne recueille aucune métrique ni aucun log.

[1]: http://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/fr/serverless/
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[4]: https://app.datadoghq.com/integrations/amazon-xray
[5]: https://docs.aws.amazon.com/whitepapers/latest/kms-best-practices/customer-master-keys.html
[6]: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
[7]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-apigateway.html
[8]: https://docs.aws.amazon.com/xray/latest/devguide/xray-instrumenting-your-app.html#xray-instrumenting-xray-sdk
[9]: https://docs.datadoghq.com/fr/serverless/distributed_tracing/serverless_trace_merging
[10]: https://docs.datadoghq.com/fr/serverless/installation
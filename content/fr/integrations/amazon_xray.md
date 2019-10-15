---
aliases:
  - /fr/integrations/awsxray/
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: Tracer les requêtes qui passent d'un service AWS à un autre
doc_link: 'https://docs.datadoghq.com/integrations/amazon_xray/'
git_integration_title: amazon_xray
has_logo: true
integration_title: AWS X-Ray
is_public: true
kind: integration
manifest_version: 1
name: amazon_xray
public_title: "Intégration Datadog/AWS\_X-Ray"
short_description: Tracer les requêtes qui passent d'un service AWS à un autre
version: 1
---
## Présentation

AWS X-Ray permet aux développeurs de tracer des applications distribuées qui ont été créées grâce à des produits AWS. Cette intégration fournit des traces pour les fonctions Lambda dans la page de détails des fonctions [sans serveur][1]. Pour en savoir plus sur les fonctions sans serveur, consultez la [documentation dédiée][2].

## Implémentation

### Installation

Pour commencer, [activez l'intégration AWS][3] et ajoutez les autorisations suivantes au document de stratégie dans votre rôle AWS/Datadog :

```
xray:BatchGetTraces,
xray:GetTraceSummaries
```

L'autorisation `GetTraceSummaries` permet d'obtenir la liste des traces récentes, tandis que `BatchGetTraces` renvoie la totalité des traces.

Ensuite, [activez l'intégration X-Ray dans Datadog][4].

Si vous utilisez une clé principale client pour chiffrer les traces, ajoutez la méthode `kms:Decrypt` à la stratégie au sein de laquelle la ressource correspond à la clé principale client utilisée pour X-Ray.

Configuration X-Ray conseillée :

- Accédez à la fonction Lambda dans la console AWS que vous souhaitez instrumenter. Dans la section « Debugging and error handling », cochez la case « Enable active tracing ». Cela permet d'activer X-Ray pour cette fonction.

- Importez le SDK X-Ray dans votre fonction et ajustez toutes les bibliothèques prises en charge. X-Ray trace alors automatiquement tous les appels AWS et toutes les autres intégrations X-Ray prises en charge. Consultez un [exemple de ce processus dans Python][5].

## Données collectées
L'intégration AWS X-Ray récupère les données de trace d'AWS et ne recueille aucune métrique ni aucun log.

[1]: http://app.datadoghq.com/functions
[2]: http://docs.datadoghq.com/graphing/infrastructure/serverless_functions
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[5]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-python-patching.html


{{< get-dependencies >}}
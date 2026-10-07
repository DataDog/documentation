---
further_reading:
- link: /cloudprem/architecture/
  tag: Documentation
  text: Architecture CloudPrem
title: Dépannage
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

Cette page rassemble des conseils de dépannage pour les problèmes courants susceptibles de se produire lors du déploiement ou de l'utilisation de la solution CloudPrem Datadog. Vous pouvez consulter des messages d'erreur types, des étapes de diagnostic, ainsi que des recommandations de mesures de résolution pour les problèmes liés aux autorisations d'accès, à la configuration du stockage et à l'intégrité des composants. Référez-vous à ce guide pour diagnostiquer rapidement des problèmes ou pour obtenir des informations contextuelles avant de contacter l'[assistance Datadog][1].


## Autorisations d'accès

Les erreurs les plus courantes sont causées par les autorisations d'accès au stockage d'objets ou au metastore. Pour résoudre ces problèmes, la solution la plus simple consiste à utiliser `kubectl` et à vérifier les logs des composants CloudPrem : pods d'indexeur, de metastore et de chercheur.

## Erreurs de stockage

Le message d'erreur suivant, avec la valeur `Unauthorized`, s'affiche dans les logs de vos indexeurs si vous avez défini les mauvais identifiants AWS :

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Unauthorized, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

L'erreur suivante s'affiche lorsque la mauvaise région est définie :

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Internal, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
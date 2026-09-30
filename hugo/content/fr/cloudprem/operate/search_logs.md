---
description: Découvrir comment interroger et analyser vos logs CloudPrem dans Datadog
further_reading:
- link: /cloudprem/ingest/
  tag: Documentation
  text: Ingérer des logs dans CloudPrem
- link: /cloudprem/operate/troubleshooting/
  tag: Documentation
  text: Dépannage de CloudPrem
- link: /logs/explorer/search_syntax/
  tag: Documentation
  text: Syntaxe de recherche de logs
title: Rechercher des logs CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Explorer les logs CloudPrem dans le Logs Explorer

1. Accédez au [Logs Explorer Datadog][1].
2. Dans le volet des facettes à gauche, sous **CLOUDPREM INDEXES**, sélectionnez un ou plusieurs index à rechercher.

Vous pouvez sélectionner un index spécifique pour affiner votre recherche, ou sélectionner tous les index d'un cluster pour effectuer une recherche dans l'ensemble de ceux-ci.

Les noms des index CloudPrem suivent ce format :


```
cloudprem--<CLUSTER_NAME>--<INDEX_NAME>
```

## Limitations de la recherche

Vous ne pouvez pas interroger des index CloudPrem en parallèle avec d'autres index de logs Datadog. De plus, les Flex Logs ne sont pas pris en charge avec CloudPrem.

[1]: https://app.datadoghq.com/logs

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
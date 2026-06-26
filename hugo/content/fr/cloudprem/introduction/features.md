---
description: Découvrir quelles fonctionnalités du Log Explorer Datadog sont prises
  en charge dans CloudPrem
title: Fonctionnalités prises en charge
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}
## Présentation

Datadog CloudPrem apporte les fonctionnalités essentielles du Log Explorer à votre environnement auto-hébergé. Cette page présente les fonctionnalités disponibles, signale les différences par rapport à la plateforme SaaS et vous aide à planifier vos workflows de logs.

## Fonctionnalités prises en charge

Les fonctionnalités de logs suivantes sont déjà prises en charge :
- Recherche en texte intégral sur tous les attributs de logs
- Visualisations List, Timeseries, Top List, Table, Tree Map, Pie Chart, Scatter Plot
- Regroupement par Fields et Patterns (à l'exception du décalage temporel mensuel)
- Dashboards
- Log monitors
- RBAC via les [Log Restriction Queries][1]
- Téléchargement CSV
- Corrélation d'un log vers des métriques envoyées à Datadog SaaS (l'inverse n'est pas encore pris en charge)
- Corrélation d'un log vers des traces envoyées à Datadog SaaS (l'inverse n'est pas encore pris en charge)

## Fonctionnalités non prises en charge

La prise en charge des fonctionnalités évolue activement. Les éléments suivants ne sont pas encore pris en charge :
- Bits AI SRE
- Gestion des index pour plusieurs durées de rétention et besoins de segmentation
- Notebooks
- Recherche fédérée
- LiveTail
- Watchdogs

[1]: /fr/api/latest/logs-restriction-queries/
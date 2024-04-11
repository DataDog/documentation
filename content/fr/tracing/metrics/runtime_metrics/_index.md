---
aliases:
- /fr/tracing/advanced/runtime_metrics/
- /fr/tracing/runtime_metrics/
description: Consultez des statistiques supplémentaires sur les performances d'une
  application grâce aux métriques runtime associées à vos traces.
kind: documentation
title: Métriques runtime
type: multi-code-lang
---

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="Trace runtime JVM" >}}

Activez la collecte des métriques runtime dans le client de tracing pour obtenir davantage de détails sur les performances d'une application. Les métriques runtime peuvent être consultées au sein du contexte d'un [service][3], corrélées dans la vue Trace lors de l'exécution d'une requête donnée et exploitées sur l'ensemble de la plateforme. Sélectionnez un langage ci-dessous pour découvrir comment recueillir automatiquement vos métriques runtime :

{{< partial name="apm/apm-runtime-metrics.html" >}}



[1]: /fr/tracing/glossary/#services
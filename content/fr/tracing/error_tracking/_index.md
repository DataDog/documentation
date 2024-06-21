---
algolia:
  tags:
  - error tracking
description: Découvrez comment rechercher et gérer les erreurs recueillies depuis
  vos services backend.
further_reading:
- link: https://www.datadoghq.com/blog/service-page/
  tag: GitHub
  text: Explorer une vue centralisée de la télémétrie, du suivi des erreurs, des SLO
    et plus encore pour vos services
- link: /tracing/trace_explorer/trace_view/
  tag: Documentation
  text: En savoir plus sur le Trace Explorer
- link: /tracing/error_tracking/explorer
  tag: Documentation
  text: En savoir plus sur l'Explorateur de suivi des erreurs
- link: /monitors/types/error_tracking/
  tag: Documentation
  text: Créer un monitor de suivi des erreurs
kind: documentation
title: Suivi des erreurs pour les services backend
---

## Présentation

{{< img src="error_tracking/error-tracking-overview.png" alt="Les détails dʼun problème dans lʼError Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

## Configuration

La solution Error Tracking est disponible pour tous les langages pris en charge par l'APM. Elle ne nécessite pas l'utilisation d'un autre SDK.

Vous pouvez aussi choisir de voir les extraits de code dans vos stack traces en configurant [lʼintégration GitHub][4].

{{< img src="tracing/error_tracking/inline_code_snippet.png" alt="Un extrait de code généré directement dans une stack trace" style="width:70%;" >}}

Pour commencer à configurer votre référentiel, consultez la [documentation relative à lʼintégration du code source][6].

## Utiliser des tags de span pour le suivi des spans d'erreur

Les traceurs Datadog recueillent des erreurs par l'intermédiaire des intégrations et de l'instrumentation manuelle du code source de vos services backend. La fonctionnalité de suivi des erreurs traite les spans d'erreur des traces **si l'erreur se situe dans une span d'entrée de service** (la span de service la plus élevée). Pour qu'une erreur puisse être surveillée, la span doit également contenir les [tags de span][1] `error.stack`, `error.message` et `error.type`.

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="Flamegraph avec des erreurs" style="width:100%;" >}}

La fonctionnalité de suivi des erreurs calcule une empreinte pour chaque span d'erreur traitée, à l'aide du type et du message de l'erreur, ainsi que des frames formant la stack trace. Les erreurs partageant la même empreinte sont regroupées au sein d'un même problème. Pour en savoir plus, consultez la [documentation relative au Trace Explorer][2].

## Examiner des problèmes pour commencer le dépannage ou le debugging

La solution Error Tracking catégorise automatiquement les erreurs en problèmes collectés depuis vos services en backend dans l'[Error Tracking Explorer][5]. Consultez la [documentation de l'Error Tracking Explorer][3] pour une vue dʼensemble des principales fonctionnalités.

Les problèmes créés depuis lʼAPM comportent la distribution des spans concernées, les stack traces les plus récentes et les plus pertinentes, les tags de span, les tags de host, les tags de conteneur et les métriques.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/trace/?tab=spantags#more-information
[2]: /fr/tracing/trace_explorer/trace_view/?tab=spantags
[3]: /fr/tracing/error_tracking/explorer
[4]: /fr/tracing
[5]: https://app.datadoghq.com/apm/error-tracking
[6]: /fr/integrations/guide/source-code-integration
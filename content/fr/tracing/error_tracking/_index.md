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

Pour garantir l'intégrité de votre système, il est essentiel de surveiller en permanence les erreurs recueillies par Datadog. Lorsque les événements d'erreur sont trop nombreux, il est difficile de savoir lesquels doivent être traités en priorité. En assurant le suivi, le triage et le debugging des stack traces, vous pouvez minimiser l'impact des erreurs critiques sur vos services backend.

Après avoir configuré [APM][4] pour le suivi des erreurs des **services backend**, les problèmes détectés commencent à apparaître sous forme de cartes. Accédez à **APM** > **Error Tracking** pour consulter les problèmes en cours, les problèmes ignorés ou tous les problèmes, les trier par volume ou par ancienneté, et les filtrer en fonction de n'importe quelle facette par défaut ou personnalisée sur vos services backend.

{{< img src="tracing/error_tracking/explorer_with_backend_issues.png" alt="L'Error Tracking Explorer pour APM affichant les problèmes de vos services backend" style="width:100%;" >}}

Le suivi des erreurs vous permet d'accomplir ce qui suit :

- Définir des alertes sur des événements de suivi des erreurs, afin d'être informé en cas d'erreur critique
- Regrouper les erreurs connexes au sein d'un problème unique, afin d'identifier plus facilement les erreurs importantes et de réduire les alertes superflues
- Suivre l'évolution des problèmes au fil du temps pour identifier à quel moment ils sont apparus, s'ils surviennent toujours ainsi que la fréquence à laquelle ils se produisent
- Rassembler tous les éléments de contexte pour un diagnostic simplifié
- Accéder à une trace dans son référentiel de code source, un Git blame ou un commit

## Utiliser des tags de span pour le suivi des spans d'erreur

<div class="alert alert-info">La fonctionnalité de suivi des erreurs est disponible pour tous les langages pris en charge par l'APM. Elle ne nécessite pas l'utilisation d'un autre SDK.</div>

Les traceurs Datadog recueillent des erreurs par l'intermédiaire des intégrations et de l'instrumentation manuelle du code source de vos services backend. La fonctionnalité de suivi des erreurs traite les spans d'erreur des traces **si l'erreur se situe dans une span d'entrée de service** (la span de service la plus élevée). Pour qu'une erreur puisse être surveillée, la span doit également contenir les [tags de span][1] `error.stack`, `error.message` et `error.type`.

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="Flamegraph avec des erreurs" style="width:100%;" >}}

La fonctionnalité de suivi des erreurs calcule une empreinte pour chaque span d'erreur traitée, à l'aide du type et du message de l'erreur, ainsi que des frames formant la stack trace. Les erreurs partageant la même empreinte sont regroupées au sein d'un même problème. Pour en savoir plus, consultez la [documentation relative au Trace Explorer][2].

## Examiner des problèmes pour commencer le dépannage ou le debugging

Le suivi des erreurs regroupe automatiquement les erreurs recueillies depuis vos services backend sous forme de catégories dans l'[Error Tracking Explorer][3]. 

Cliquez sur un problème pour afficher un résumé de l'erreur, la distribution des spans concernées, les stack traces les plus récentes et les plus pertinentes, les tags de span, les tags de host, les tags de conteneur et les métriques.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/trace/?tab=spantags#more-information
[2]: /fr/tracing/trace_explorer/trace_view/?tab=spantags
[3]: /fr/tracing/error_tracking/explorer
[4]: /fr/tracing
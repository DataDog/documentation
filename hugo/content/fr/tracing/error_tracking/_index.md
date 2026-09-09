---
algolia:
  tags:
  - error tracking
description: Découvrez comment rechercher et gérer les erreurs recueillies depuis
  vos services backend.
further_reading:
- link: https://www.datadoghq.com/blog/service-page/
  tag: Blog
  text: Explorez une vue centralisée de la télémétrie des services, Error Tracking,
    des SLOs, et plus encore
- link: /tracing/trace_explorer/trace_view/
  tag: Documentation
  text: En savoir plus sur le Trace Explorer
- link: /tracing/error_tracking/explorer
  tag: Documentation
  text: En savoir plus sur l'Error Tracking Explorer
- link: /monitors/types/error_tracking/
  tag: Documentation
  text: Créer un monitor Error Tracking
title: Error Tracking pour les services backend
---
## Présentation {#overview}

{{< img src="error_tracking/error-tracking-overview-3.png" alt="Les détails d'un problème dans l'Error Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

## Configuration {#setup}

Error Tracking est disponible pour tous les langages pris en charge par APM Il ne nécessite aucun SDK supplémentaire ni aucune modification de configuration.

Vous pouvez aussi choisir de voir les extraits de code dans vos traces de piles en configurant [lʼintégration GitHub][4].

{{< img src="tracing/error_tracking/inline_code_snippet_2.png" alt="Un extrait de code en ligne dans une trace de pile" style="width:70%;" >}}

Pour commencer à configurer votre référentiel, consultez la [documentation relative à lʼintégration du code source][6].

## Utilisez les attributs de span pour suivre les spans d'erreur {#use-span-attributes-to-track-error-spans}

Les SDK Datadog collectent les erreurs via des intégrations et l'instrumentation manuelle du code source de vos services backend. Un span d'erreur doit contenir les [attributs de span][1] `error.stack`, `error.message` et `error.type` et appartenir à une trace complète pour être suivi. Si une erreur est signalée plusieurs fois au sein d'un service, seule l'erreur située en haut est conservée

<div class="alert alert-warning">
Le traceur Go a introduit un changement dans les attributs utilisés pour signaler les traces de pile dans sa version v2.7.0.
Pour les anciennes versions du traceur Go (avant la v2.7.0), la trace de pile est signalée dans l'attribut <code>error.stack</code> attribut de span.
À partir de la v2.7.0, le traceur Go signale la trace de pile de gestion dans l'attribut <code>error.handling_stack</code> attribut de span (avec <code>error.stack</code> portant désormais la pile d'exception lorsqu'elle est disponible).
Consultez <a href="/tracing/error_tracking/stack_traces/">les traces de pile dans Error Tracking</a> pour plus de détails
</div>

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="Flame graph avec erreurs." style="width:100%;" >}}

Error Tracking calcule une empreinte pour chaque span d'erreur qu'il traite L'empreinte utilise le type d'erreur, le message d'erreur et les frames qui forment la trace de pile. Les erreurs ayant la même empreinte sont regroupées et appartiennent au même problème. Pour plus d'informations, consultez la [documentation de Trace Explorer][2]

## Contrôlez quelles erreurs sont suivies {#control-which-errors-are-tracked}

Error Tracking traite automatiquement tous les spans d'erreur, mais vous pouvez contrôler quelles erreurs sont ingérées et comment elles sont gérées :

- **Filtrez les erreurs avec des règles d'inclusion et d'exclusion** : définissez des règles pour inclure ou exclure des erreurs en fonction d'attributs tels que le service, l'environnement ou le type d'erreur. Consultez [Manage Data Collection][7]
- **Définissez des limites de débit** : contrôlez le volume d'erreurs ingérées par jour pour gérer les coûts. Consultez [Manage Data Collection][7]
- **Excluez des problèmes spécifiques** : marquez les problèmes récurrents non-actionnables comme `EXCLUDED` pour arrêter de les collecter Consultez [Issue States][8]
- **Filtrez des traces entières** : empêchez l'envoi de traces à Datadog (plutôt que de filtrer les erreurs). Consultez [Ignoring Unwanted Resources in APM][9]

## Examinez les problèmes pour commencer le dépannage ou le débogage {#examine-issues-to-start-troubleshooting-or-debugging}

Error Tracking catégorise automatiquement les erreurs en problèmes collectés à partir de vos services backend dans l'[Error Tracking Explorer][5] Consultez la [Error Tracking Explorer documentation][3] pour une présentation des fonctionnalités clés

Les problèmes créés à partir de l'APM incluent la distribution des spans impactés, la dernière trace de pile la plus pertinente, les attributs de span, les tags de host, les tags de conteneur et les métriques

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/trace/?tab=spantags#more-information
[2]: /fr/tracing/trace_explorer/trace_view/?tab=spantags
[3]: /fr/tracing/error_tracking/explorer
[4]: /fr/tracing
[5]: https://app.datadoghq.com/apm/error-tracking
[6]: /fr/integrations/guide/source-code-integration
[7]: /fr/error_tracking/manage_data_collection/
[8]: /fr/error_tracking/issue_states/
[9]: /fr/tracing/guide/ignoring_apm_resources/
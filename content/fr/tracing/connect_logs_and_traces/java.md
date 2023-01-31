---
title: Associer vos logs Java à vos traces
kind: documentation
description: Associez vos logs Java à vos traces pour les mettre en corrélation dans Datadog.
further_reading:
  - link: tracing/manual_instrumentation
    tag: Documentation
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/opentracing
    tag: Documentation
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Documentation
    text: Explorer vos services, ressources et traces
  - link: https://www.datadoghq.com/blog/request-log-correlation/
    tag: Blog
    text: Corréler automatiquement des logs de requête avec des traces
  - link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
    tag: Guide
    text: Bénéficiez de diagnostics simplifiés grâce à la mise en corrélation entre produits.
---
## Avant de commencer

Vérifiez que la collecte de logs est configurée. Consultez les instructions relatives à la [collecte de logs Java][1] pour Log4j, Log4j 2 ou Logback.

## Injection automatique

Depuis la version 0.74.0, le traceur Java injecte automatiquement dans les logs des identificateurs de corrélation de trace. Pour les versions antérieures, activez l'injection automatique dans le traceur Java en ajoutant la propriété système `dd.logs.injection=true` ou en définissant la variable d'environnement `DD_LOGS_INJECTION=true`. Pour obtenir plus de détails, consultez la documentation sur la [configuration du traceur Java][2].

**Remarque** : si le `attribute.path` de votre ID de trace ne correspond *pas* à `dd.trace_id`, assurez-vous que les paramètres des attributs réservés de votre ID de trace prennent en compte le `attribute.path`. Pour en savoir plus, consultez la [FAQ à ce sujet][3].

## Injection manuelle

Si vous préférez corréler manuellement vos traces avec vos logs, utilisez l'API du traceur Java pour récupérer les identificateurs de corrélation. Utilisez les méthodes `CorrelationIdentifier.getTraceId` et `CorrelationIdentifier.getSpanId` pour injecter des identificateurs au début de la span en cours de création. Supprimez les identificateurs une fois la span terminée.

{{< tabs >}}
{{% tab "Log4j 2" %}}

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// Des spans doivent avoir été initialisées et être actives avant ce bloc.
try {
    ThreadContext.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    ThreadContext.put("dd.span_id", CorrelationIdentifier.getSpanId());

// Loguer quelque chose

} finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```

{{% /tab %}}
{{% tab "SLF4J et Logback" %}}

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// Des spans doivent avoir été initialisées et être actives avant ce bloc.
try {
    MDC.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    MDC.put("dd.span_id", CorrelationIdentifier.getSpanId());

// Loguer quelque chose

} finally {
    MDC.remove("dd.trace_id");
    MDC.remove("dd.span_id");
}
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous [n'utilisez pas une intégration de log de Datadog][4] pour parser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `dd.trace_id` et `dd.span_id` sont parsés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][5].

[Consultez la documentation relative à la collecte de logs Java][1] pour en savoir plus sur l'implémentation d'un logger spécifique et obtenir des instructions concernant la journalisation au format JSON.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_collection/java/
[2]: /fr/tracing/setup_overview/setup/java/
[3]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=jsonlogs#trace_id-option
[4]: /fr/logs/log_collection/java/#raw-format
[5]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
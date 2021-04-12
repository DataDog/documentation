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
    text: 'Explorer vos services, ressources et traces'
  - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
    tag: Blog
    text: Corréler automatiquement des logs de requête avec des traces
---
## Injecter automatiquement les ID de trace et de span

Activez l'injection dans la [configuration][1] du traceur Java en ajoutant `-Ddd.logs.injection=true` comme argument de démarrage jvm ou via la variable d'environnement `DD_LOGS_INJECTION=true`.

Si vos logs sont au format JSON et que vous utilisez Logback, vous n'avez plus rien à faire. Si vous utilisez une autre bibliothèque de logging, vous devez activer l'auto-injection des attributs MDC dans vos logs.

Si vos logs sont au format brut, modifiez votre formateur en ajoutant `dd.trace_id` et `dd.span_id` à la configuration de votre logger :

{{< tabs >}}
{{% tab "Log4j2" %}}

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"</Pattern>
```

{{% /tab %}}
{{% tab "slf4j/logback" %}}

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : si le `attribute.path` de votre ID de trace ne correspond **pas** à `dd.trace_id`, assurez-vous que les paramètres des attributs réservés de votre ID de trace prennent en compte le `attribute.path`. Pour en savoir plus, consultez la [FAQ à ce sujet][2].

## Injecter manuellement des ID de trace et de span

Si vous préférez corréler manuellement vos [traces][3] avec vos logs, utilisez l'API Datadog pour récupérer les identificateurs de corrélation :

- Utilisez les méthodes d'API `CorrelationIdentifier#getTraceId()` et `CorrelationIdentifier#getSpanId()` pour injecter les identificateurs au début et à la fin de chaque [span][4] dans vos logs (voir les exemples ci-dessous).
- Configurez MDC pour utiliser les clés injectées :

    - `dd.trace_id` : l'ID de la trace active lors de l'écriture du message de log (ou `0` en l'absence de trace).
    - `dd.span_id` : l'ID de la span active lors de l'écriture du message de log (ou `0` en l'absence de trace).

{{< tabs >}}
{{% tab "Log4j2" %}}

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// Des spans doivent avoir été initialisées et être actives avant ce bloc.
try {
    ThreadContext.put("dd.trace_id", String.valueOf(CorrelationIdentifier.getTraceId()));
    ThreadContext.put("dd.span_id", String.valueOf(CorrelationIdentifier.getSpanId()));
}

// Loguer quelque chose

finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```

Modifiez ensuite la configuration de votre logger en ajoutant `dd.trace_id` et `dd.span_id` à votre pattern de log :

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"</Pattern>
```

{{% /tab %}}
{{% tab "slf4j/logback" %}}

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// Des spans doivent avoir été initialisées et être actives avant ce bloc.
try {
    MDC.put("dd.trace_id", String.valueOf(CorrelationIdentifier.getTraceId()));
    MDC.put("dd.span_id", String.valueOf(CorrelationIdentifier.getSpanId()));
}

// Loguer quelque chose

finally {
    MDC.remove("dd.trace_id");
    MDC.remove("dd.span_id");
}
```

Modifiez ensuite la configuration de votre logger en ajoutant `dd.trace_id` et `dd.span_id` à votre pattern de log :

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][5] pour analyser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `dd.trace_id` et `dd.span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][6].

[Consultez la documentation relative à la journalisation Java][4] pour en savoir plus sur l'implémentation d'un logger spécifique ou découvrir comment créer des logs au format JSON.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/java/#configuration
[2]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=jsonlogs#trace-id-option
[3]: /fr/tracing/connect_logs_and_traces/
[4]: /fr/logs/log_collection/java/?tab=log4j
[5]: /fr/logs/log_collection/java/#raw-format
[6]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
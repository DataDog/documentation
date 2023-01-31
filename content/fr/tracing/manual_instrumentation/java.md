---
title: Instrumentation manuelle Java
kind: documentation
decription: Instrumentez manuellement votre application Java afin d'envoyer des traces personnalisées à Datadog.
further_reading:
  - link: tracing/guide/instrument_custom_method
    tag: Guide
    text: Instrumenter une méthode personnalisée pour analyser en détail votre logique opérationnelle
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/opentracing
    tag: Documentation
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
Si vous utilisez un [framework dont l'instrumentation automatique n'est pas prise en charge][1] ou que vous souhaitez apporter de la profondeur aux [traces][2] de votre application, vous pouvez choisir d'instrumenter manuellement votre code.

Pour ce faire, utilisez l'annotation de traces pour effectuer un tracing simple des appels de méthode, ou l'API OpenTracing pour un tracing plus complexe. La fonction d'annotation de traces de Datadog est fournie par la [dépendance dd-trace-api][3].

```java
import datadog.trace.api.Trace;

public class MyJob {
  @Trace(operationName = "job.exec", resourceName = "MyJob.process")
  public static void process() {
    // implémenter votre méthode ici
  }
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/java/#compatibility
[2]: /fr/tracing/visualization/#trace
[3]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
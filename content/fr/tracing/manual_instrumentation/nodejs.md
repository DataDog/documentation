---
title: Instrumentation manuelle NodeJS
kind: documentation
decription: Instrumentez manuellement votre application NodeJS afin d'envoyer des traces personnalisées à Datadog.
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
SI vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code. L'exemple suivant initialise un traceur Datadog et crée une [span][2] intitulée `web.request` :

```javascript
const tracer = require('dd-trace').init();
const span = tracer.startSpan('web.request');

span.setTag('http.url', '/login');
span.finish();
```

Pour en savoir plus sur l'instrumentation manuelle, consultez la [documentation relative à l'API][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/nodejs/#compatibility
[2]: /fr/tracing/visualization/#spans
[3]: https://datadog.github.io/dd-trace-js/#manual-instrumentation
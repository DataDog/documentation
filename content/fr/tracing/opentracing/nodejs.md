---
title: OpenTracing NodeJS
kind: documentation
description: 'Appliquez la norme OpenTracing au traceur de l''APM NodeJS de Datadog.'
further_reading:
    - link: tracing/connect_logs_and_traces
      tag: Documentation
      text: Associer vos logs à vos traces
    - link: tracing/manual_instrumentation
      tag: Documentation
      text: Instrumenter vos applications manuellement pour créer des traces
    - link: tracing/visualization/
      tag: Documentation
      text: Explorer vos services, ressources et traces
---

Cette bibliothèque respecte les normes OpenTracing. Utilisez l'[API OpenTracing][1] et la bibliothèque de traceur Datadog ([dd-trace][2]) pour mesurer les délais d'exécution de certains éléments de code. Dans l'exemple suivant, un traceur Datadog est initialisé et utilisé comme traceur global :

```javascript
// server.js

const tracer = require('dd-trace').init();
const opentracing = require('opentracing');

opentracing.initGlobalTracer(tracer);

const app = require('./app.js');

// app.js

const tracer = opentracing.globalTracer();
```

Vous pouvez utiliser les tags suivants pour remplacer certaines options de Datadog :

- `service.name` : le nom de service à utiliser pour cette span. Si ce tag n'est pas fourni, le nom de service du traceur est utilisé.
- `resource.name` : le nom de ressource à utiliser pour cette span. Si ce tag n'est pas fourni, le nom d'opération est utilisé.
- `span.type` : le type de span à utiliser pour cette span. Si ce tag n'est pas fourni, le type est défini sur `custom`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://doc.esdoc.org/github.com/opentracing/opentracing-javascript
[2]: https://datadog.github.io/dd-trace-js

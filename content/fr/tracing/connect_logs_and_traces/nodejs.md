---
title: Associer vos logs NodeJS à vos traces
kind: documentation
description: Associez vos logs NodeJS à vos traces pour les mettre en corrélation dans Datadog.
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
## Injection automatique

Activez l'injection avec la variable d'environnement `DD_LOGS_INJECTION=true` ou en configurant directement le traceur :

```javascript
const tracer = require('dd-trace').init({
    logInjection: true
});
```

Cela active l'injection automatique de l'ID de trace pour `bunyan`, `paperplane`, `pino` et `winston`.

Si vous ne l'avez pas encore fait, configurez le tracer NodeJS avec `DD_ENV`, `DD_SERVICE` et `DD_VERSION`. afin d'ajouter les tags `env`, `service` et `version` de manière optimale (voir la section [Tagging de service unifié][1] pour en savoir plus).

**Remarque** : l'injection automatique fonctionne uniquement pour les logs au format JSON.

## Injection manuelle

Si votre bibliothèque de journalisation n'est pas compatible avec l'injection automatique, mais que vous utilisez des logs au format JSON, vous pouvez effectuer une injection manuelle directement dans votre code.

Exemple d'utilisation de `console` comme logger sous-jacent :

```javascript
const tracer = require('dd-trace');
const formats = require('dd-trace/ext/formats');

class Logger {
    log(level, message) {
        const span = tracer.scope().active();
        const time = new Date().toISOString();
        const record = { time, level, message };

        if (span) {
            tracer.inject(span.context(), formats.LOG, record);
        }

        console.log(JSON.stringify(record));
    }
}

module.exports = Logger;
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging
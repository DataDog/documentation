---
title: Standards ouverts NodeJS
kind: documentation
description: 'Standards ouverts pour NodeJS'
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 40
---

## OpenTracing

La prise en charge d'OpenTracing est incluse dans le package `dd-trace`.

```javascript
const tracer = require('dd-trace').init()
const opentracing = require('opentracing')

opentracing.initGlobalTracer(tracer)
```

Le traceur peut désormais être utilisé comme dans toute autre application OpenTracing.

Vous pouvez utiliser les tags suivants pour remplacer certaines options de Datadog :

* `service.name` : le nom de service à utiliser pour la span. Si ce tag n'est pas fourni, le nom de service du traceur est utilisé.
* `resource.name` : le nom de ressource à utiliser pour la span. Si ce tag n'est pas fourni, le nom d'opération est utilisé.
* `span.type` : le type de span à utiliser pour la span. Si ce tag n'est pas fourni, le type est défini sur `custom`.

Consultez le site [opentracing.io][1] (en anglais) pour en savoir plus sur l'utilisation d'OpenTracing avec NodeJS.

## OpenTelemetry

La prise en charge d'OpenTelemetry est disponible via le package `opentelemetry-exporter-datadog`` pour exporter les traces d'OpenTelemetry vers Datadog.

<div class="alert alert-warning">
Cette fonctionnalité est actuellement en version bêta. <a href="https://docs.datadoghq.com/help/">Contactez l'assistance</a> si elle ne fonctionne pas correctement.
</div>

### Installation

Pour l'installer :

```
npm install --save opentelemetry-exporter-datadog
```

### Utilisation

Installez le processeur et l'exportateur Datadog dans votre application et configurez les options. Ensuite, utilisez les interfaces OpenTelemetry pour générer des traces et d'autres informations :

```javascript
const opentelemetry = require('@opentelemetry/api');
const { BasicTracerProvider } = require('@opentelemetry/tracing');
const { DatadogSpanProcessor, DatadogExporter, DatadogProbabilitySampler, DatadogPropagator } = require('opentelemetry-exporter-datadog');

const provider = new BasicTracerProvider();

const exporterOptions = {
  serviceName: 'my-service', // facultatif
  agentUrl: 'http://localhost:8126', // facultatif
  tags: 'example_key:example_value,example_key_two:value_two', // facultatif
  env: 'production', // facultatif
  version: '1.0' // facultatif
};

const exporter = new DatadogExporter(exporterOptions);
const processor = new DatadogSpanProcessor(exporter);

provider.addSpanProcessor(processor);

// Ensuite, ajouter le propagateur Datadog pour le tracing distribué
provider.register({
  propagator: new DatadogPropagator()
});

const tracer = opentelemetry.trace.getTracer('example-basic-tracer-node');

// Créer une span. Une span doit être fermée.
const parentSpan = tracer.startSpan('main');

doWork(parentSpan);

setTimeout(() => {
  parentSpan.end();

  setTimeout(() => {
    processor.shutdown()
  },4000);
}, 5000);

function doWork(parent) {
  const span = tracer.startSpan('doWork', {
    parent,
  });

  // Simuler une opération aléatoire.
  for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
    // vide
  }
  // Définir des attributs sur la span.
  span.setAttribute('key', 'value');
  setTimeout( () => {
    span.end();
  }, 1000)
}
```

### Options de configuration

Si nécessaire, l'URL de l'Agent Datadog et les valeurs des tags de span peuvent être configurées en fonction de l'emplacement de l'Agent et de votre environnement.

#### URL de l'Agent Datadog

Par défaut, l'exportateur Datadog pour OpenTelemetry envoie les traces à l'URL `http://localhost:8126`. Pour les envoyer vers une autre URL, configurez les variables d'environnement suivantes :

- `DD_TRACE_AGENT_URL` : le `<host>:<port>` où l'Agent Datadog écoute les traces. Par exemple, `agent-host:8126`.

Vous pouvez également remplacer ces valeurs au niveau de l'exportateur de traces :

```js
// Configurez l'URL de l'Agent de trace Datadog
new DatadogExporter({agentUrl: 'http://dd-agent:8126'});
```

#### Tagging

Configurez l'application de façon à taguer automatiquement vos traces exportées Datadog en définissant les variables d'environnement suivantes :

- `DD_ENV` : l'environnement de votre application (p. ex. `production`, `staging`).
- `DD_SERVICE` : le nom de service par défaut de votre application (p. ex. `billing-api`).
- `DD_VERSION` : la version de votre application (p. ex. `2.5`, `202003181415` ou `1.3-alpha`).
- `DD_TAGS` : tags personnalisés sous forme de paires de valeurs séparées par des virgules (p. ex. `layer:api,team:intake`).
- Si la variable `DD_ENV`, `DD_SERVICE` ou `DD_VERSION` est définie, tout tag `env`, `service` ou `version` correspondant défini dans `DD_TAGS` sera remplacé.
- Si les variables `DD_ENV`, `DD_SERVICE` et `DD_VERSION` ne sont _pas_ définies, vous pouvez configurer l'environnement, le service et la version à l'aide des tags correspondants dans `DD_TAGS`.

Les valeurs de tag peuvent également être remplacées au niveau de l'exportateur de traces. Cela vous permet de définir des valeurs différentes pour chaque application. De cette façon, il est possible de recevoir des données à partir de plusieurs applications issues d'environnements différents sur un même host :

```javascript

new DatadogExporter({
  serviceName: 'my-service', // facultatif
  agentUrl: 'http://localhost:8126', // facultatif
  tags: 'example_key:example_value,example_key_two:value_two', // facultatif
  env: 'production', // facultatif
  version: '1.1' // facultatif
});
```

Les tags qui sont définis directement sur des spans spécifiques remplacement les tags définis au niveau de l'application en cas de conflit.

### Liens OpenTelemetry

- Consultez [npm][2] ou [Github][3] pour en savoir plus sur l'utilisation de l'exportateur Datadog pour OpenTelemetry dans une application NodeJS.


[1]: https://opentracing.io/guides/javascript/
[2]: https://www.npmjs.com/package/opentelemetry-exporter-datadog
[3]: https://github.com/Datadog/dd-opentelemetry-exporter-js

---
title: Instrumentation personnalisée NodeJS
kind: documentation
aliases:
  - /fr/tracing/opentracing/nodejs
  - /fr/tracing/manual_instrumentation/nodejs
description: Instrumentez manuellement votre application NodeJS afin d'envoyer des traces personnalisées à Datadog.
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
<div class="alert alert-info">
Si vous n'avez pas encore lu les instructions sur l'instrumentation automatique et la configuration, commencez par lire la section <a href="https://docs.datadoghq.com/tracing/setup/nodejs/">Tracer des applications Python</a>.
</div>

SI vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code.

Vous pouvez également choisir d'accroître les fonctionnalités de la bibliothèque `dd-trace` ou de contrôler plus précisément l'instrumentation de votre application. La bibliothèque propose plusieurs méthodes afin d'y parvenir.

## Création de spans

La bibliothèque `dd-trace` crée automatiquement des spans avec `tracer.init()` pour [un grand nombre de frameworks et bibliothèques][2]. Toutefois, si vous souhaitez bénéficier d'une visibilité accrue sur votre propre code, utilisez des spans.

Dans votre requête Web (par exemple, `/make-sandwich`), vous pouvez effectuer plusieurs opérations, comme `getIngredients()` et `assembleSandwich()`, particulièrement utiles pour les mesures.

{{< tabs >}}
{{% tab "Code synchrone" %}}

Le code synchrone peut être tracé à l'aide de `tracer.trace()`. La span est alors automatiquement finalisée lors du renvoi de son rappel. Elle capture automatiquement les erreur de rejet.

```javascript
app.get('/make-sandwich', (req, res) => {
  const sandwich = tracer.trace('sandwich.make', () => {
    const ingredients = tracer.trace('get_ingredients', () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', () => {
      assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

Cliquez [ici][1] pour obtenir des détails sur l'API pour `tracer.trace()`.


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{% /tab %}}

{{% tab "Promesse" %}}

Les promesses peuvent être tracées à l'aide de `tracer.trace()`. La span est alors automatiquement finalisée lors de la résolution de la promesse renvoyée. Elle capture automatiquement les erreurs de rejet.

```javascript
app.get('/make-sandwich', (req, res) => {
  return tracer.trace('sandwich.make', () => {
    return tracer.trace('get_ingredients', () => getIngredients())
      .then(() => {
        return tracer.trace('assemble_sandwich', () => {
          return assembleSandwich(ingredients)
        })
      })
  }).then(sandwich => res.end(sandwich))
})
```

Cliquez [ici][1] pour obtenir des détails sur l'API pour `tracer.trace()`.


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{% /tab %}}

{{% tab "Fonctions async/await" %}}

Les fonctions async/await peuvent être tracées à l'aide de `tracer.trace()`. La span est alors automatiquement finalisée lors de la résolution de la promesse renvoyée. Elle capture automatiquement les erreurs de rejet.

```javascript
app.get('/make-sandwich', async (req, res) => {
  const sandwich = await tracer.trace('sandwich.make', async () => {
    const ingredients = await tracer.trace('get_ingredients', () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', () => {
      return assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

Cliquez [ici][1] pour obtenir des détails sur l'API pour `tracer.trace()`.


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{% /tab %}}

{{% tab "Wrapper" %}}

Il est également possible de wrapper une fonction existante sans modifier son code, ce qui permet de tracer les fonctions dont vous ne contrôlez pas le code. Pour ce faire, vous pouvez utiliser `tracer.wrap()` qui prend les mêmes arguments que `tracer.trace()` sauf son dernier argument, qui est la fonction à wrapper au lieu d'un rappel.

```javascript
app.get('/make-sandwich', (req, res) => {
  getIngredients = tracer.wrap('get_ingredients', getIngredients)
  assembleSandwich = tracer.wrap('assemble_sandwich', assembleSandwich)

  const sandwich = tracer.trace('sandwich.make', () => {
    const ingredients = getIngredients()

    return assembleSandwich(ingredients))
  })

  res.end(sandwich)
})
```

Cliquez [ici][1] pour obtenir des détails sur l'API pour `tracer.trace()`.


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#wrap
{{% /tab %}}

{{% tab "Méthode manuelle" %}}

Si les autres méthodes ne vous permettent pas de répondre à vos besoins en tracing, vous pouvez utiliser une API manuelle afin de lancer des spans et d'y mettre fin comme bon vous semble :

```javascript
app.get('/make-sandwich', (req, res) => {
  const sandwichSpan = tracer.startSpan('sandwich.make')

  const ingredientsSpan = tracer.startSpan('get_ingredients')
  const ingredients = getIngredients()
  ingredientsSpan.finish()

  const assembleSpan = tracer.startSpan('assemble_sandwich')
  const assemble = assembleSandwich()
  assembleSpan.finish()

  sandwichSpan.finish()

  res.end(sandwich)
})
```

[Cliquez ici][1] afin d'obtenir des détails sur l'API pour `tracer.startSpan()`.


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#startspan
{{% /tab %}}
{{< /tabs >}}

## Accès aux spans actives

L'instrumentation intégrée et votre instrumentation personnalisée créeront des spans autour d'opérations pertinentes. Vous pouvez accéder à la span active afin d'inclure des données pertinentes. Il est également possible de définir la span active sur un nouveau contexte à l'aide de la méthode `activate` du gestionnaire de contexte.

```javascript
tracer.trace('sandwich.make', () => {
  const span = tracer.scope().active() // the sandwich.make span
  const child = tracer.startSpan('get_ingredients')

  tracer.scope().activate(child, () => {
    const span = tracer.scope().active() // the get_ingredients span
  })
})
```

[Cliquez ici][3] afin d'obtenir des détails sur l'API pour `Scope`.

## Ajout de tags

{{< tabs >}}
{{% tab "Ajout local" %}}

Vous pouvez ajouter des tags à une span à l'aide de la méthode `setTag` ou `addTags` sur une span. Les types de valeurs pris en charge sont les chaînes, les nombres et les objets.

```javascript
// add a foo:bar tag
span.setTag('foo', 'bar')

// add a user_id:5 tag
span.setTag('user_id', 5)

// add a obj.first:foo and obj.second:bar tags
span.setTag('obj', { first: 'foo', second: 'bar' })

// add a foo:bar and baz:qux tags
span.addTags({
  foo: 'bar',
  baz: 'qux'
})
```

{{% /tab %}}

{{% tab "Globalement" %}}

Vous pouvez ajouter des tags à chaque span en les configurant directement sur le traceur. Pour ce faire, utilisez la variable d'environnement `DD_TAGS` séparée par des virgules ou l'option `tags` dans la configuration d'initialisation du traceur.

```javascript
// equivalent to DD_TAGS=foo:bar,baz:qux
tracer.init({
  tags: {
    foo: 'bar',
    baz: 'qux'
  }
})

// cette span comprendra les tags ci-dessus
const span = tracer.startSpan()
```

{{% /tab %}}

{{% tab "Composant" %}}

Certaines de nos intégrations prennent en charge les hooks de span qui permettent de mettre à jour la span juste avant qu'elle ne soit finalisée. Ainsi, vous pouvez modifier ou ajouter des tags à une span qui est autrement inaccessible à partir de votre code.

```javascript
// en haut du point d'entrée juste après tracer.init()
tracer.use('express', {
  // le hook sera exécuté juste avant que la span de la requête ne soit finalisée
  hooks: {
    request: (span, req, res) => {
      span.setTag('customer.id', req.query.customer_id)
    }
  }
})
```

[Cliquez ici][1] afin d'obtenir des détails sur l'API pour les plugins individuels.


[1]: https://datadoghq.dev/dd-trace-js/modules/plugins.html
{{% /tab %}}

{{% tab "Erreurs" %}}

Vous pouvez ajouter des erreurs à une span avec le tag spécial `error` qui prend en charge les objets d'erreur. Ainsi, l'erreur est décomposée en 3 tags différents : `error.type`, `error.msg` et `error.stack`.

```javascript
try {
  getIngredients()
} catch (e) {
  span.setTag('error', e)
}

```

Lors de l'utilisation de `tracer.trace()` ou `tracer.wrap()`, cette opération est réalisée automatiquement lorsqu'une erreur est renvoyée.

{{% /tab %}}
{{< /tabs >}}

## Filtrage des requêtes

Dans la plupart des cas, certaines requêtes ne doivent pas être instrumentées, notamment dans le cadre des checks de santé. Elles peuvent être ignorées en utilisant l'option `blacklist` ou `whitelist` du plugin `http`.

```javascript
//  en haut du point d'entrée juste après tracer.init()
tracer.use('http', {
  blacklist: ['/health', '/ping']
})
```

En outre, il est possible d'exclure des traces au niveau des checks de l'Agent Datadog afin d'empêcher leur envoi à Datadog. Pour filtrer des ressources et configurer d'autres paramètres de sécurité et de personnalisation de l'Agent, accédez à la page [Sécurité][4].

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

Consultez [opentracing.io][5] pour en savoir plus sur l'utilisation d'OpenTracing avec NodeJS.

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
- `DD_SERVICE` : le nom de service par défaut de votre application (par exemple, `billing-api`).
- `DD_VERSION` : la version de votre application (p. ex. `2.5`, `202003181415` ou `1.3-alpha`).
- `DD_TAGS` : tags personnalisés sous forme de paires de valeurs séparées par des virgules (p. ex. `layer:api,team:intake`)
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

- Consultez [npm][6] ou [GitHub][7] pour en savoir plus sur l'utilisation de l'exportateur Datadog pour OpenTelemetry dans une application NodeJS.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/nodejs/
[2]: /fr/tracing/visualization/#spans
[3]: https://datadoghq.dev/dd-trace-js/interfaces/scope.html
[4]: /fr/tracing/security
[5]: https://opentracing.io/guides/javascript/
[6]: https://www.npmjs.com/package/opentelemetry-exporter-datadog
[7]: https://github.com/Datadog/dd-opentelemetry-exporter-js
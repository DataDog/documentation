---
title: Instrumentation personnalisée NodeJS
kind: documentation
aliases:
  - /fr/tracing/opentracing/nodejs
decription: Instrumentez manuellement votre application NodeJS afin d'envoyer des traces personnalisées à Datadog.
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
{{< alert type="info" >}}
Si vous n'avez pas encore lu les instructions sur l'instrumentation automatique et la configuration, commencez par lire la section <a href="https://docs.datadoghq.com/tracing/setup/nodejs/">Tracer des applications Node.js</a>.
{{< /alert >}}

SI vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code.

Vous pouvez également choisir d'accroître les fonctionnalités de la bibliothèque `dd-trace` ou de contrôler plus précisément l'instrumentation de votre application. La bibliothèque propose plusieurs méthodes afin d'y parvenir.

## Création de spans

La bibliothèque `dd-trace` crée automatiquement des [spans][2] avec `tracer.init()` pour [un grand nombre de frameworks et bibliothèques][1]. Toutefois, si vous souhaitez bénéficier d'une visibilité accrue sur votre propre code, utilisez des spans.

Dans votre requête Web (par exemple, `/make-sandwich`), vous pouvez effectuer plusieurs opérations, comme `getIngredients()` et `assembleSandwich()`, particulièrement utiles pour les mesures.

{{< tabs >}}
{{% tab "Code synchrone" %}}

Le code synchrone peut être tracé à l'aide de `tracer.trace()`. La span est alors automatiquement finalisée lors du renvoi de son rappel. Elle capture automatiquement les erreurs de rejet.

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

Cliquez [ici][1] pour consulter les détails sur l'API pour `tracer.trace()`.


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{% /tab %}}

{{% tab "Promesses" %}}

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

Cliquez [ici][1] pour consulter les détails sur l'API pour `tracer.trace()`.


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

Cliquez [ici][1] pour consulter les détails sur l'API pour `tracer.trace()`.


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{% /tab %}}

{{% tab "Wrapper" %}}

Il est également possible de wrapper une fonction existante sans modifier son code, ce qui permet de tracer les fonctions dont vous ne contrôlez pas le code. Pour ce faire, vous pouvez utiliser `tracer.wrap()`, qui accepte les mêmes arguments que `tracer.trace()` à l'exception du dernier. En effet, il s'agit de la fonction à wrapper à la place d'un rappel.

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

Cliquez [ici][1] pour consulter les détails sur l'API pour `tracer.trace()`.


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#wrap
{{% /tab %}}

{{% tab "Méthode manuelle" %}}

Si les autres méthodes ne répondent pas à vos besoins en tracing, vous pouvez utiliser une API manuelle afin de lancer des spans et de les finaliser comme bon vous semble :

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

Cliquez [ici][1] pour consulter les détails sur l'API pour `tracer.startSpan()`.


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#startspan
{{% /tab %}}
{{< /tabs >}}

## Accès aux spans actives

L'instrumentation intégrée et votre instrumentation personnalisée créent des spans autour des opérations pertinentes. Vous pouvez accéder à la span active afin d'y inclure des données utiles. Il est également possible de définir la span active sur un nouveau contexte à l'aide de la méthode `activate` du gestionnaire de contextes.

```javascript
tracer.trace('sandwich.make', () => {
  const span = tracer.scope().active() // la span sandwich.make
  const child = tracer.startSpan('get_ingredients')

  tracer.scope().activate(child, () => {
    const span = tracer.scope().active() // la span get_ingredients
  })
})
```

Cliquez [ici][3] pour consulter les détails sur l'API pour `Scope`.

## Ajout de tags

{{< tabs >}}
{{% tab "Ajout local" %}}

Vous pouvez ajouter des tags à une span en utilisant la méthode `setTag` ou `addTags` sur cette span. La valeur des tags doit correspondre à une chaîne, à un nombre ou un objet.

```javascript
// ajouter un tag foo:bar
span.setTag('foo', 'bar')

// ajouter un tag user_id:5
span.setTag('user_id', 5)

// ajouter des tags obj.first:foo et obj.second:bar
span.setTag('obj', { first: 'foo', second: 'bar' })

// ajouter des tags foo:bar et baz:qux
span.addTags({
  foo: 'bar',
  baz: 'qux'
})
```

{{% /tab %}}

{{% tab "Ajout global" %}}

Vous pouvez ajouter des tags à chaque span en les configurant directement sur le traceur. Pour ce faire, utilisez la variable d'environnement `DD_TAGS` en séparant les tags par des virgules, ou l'option `tags` dans la configuration d'initialisation du traceur.

```javascript
// correspond à DD_TAGS=foo:bar,baz:qux
tracer.init({
  tags: {
    foo: 'bar',
    baz: 'qux'
  }
})

// les tags ci-dessus sont ajoutés à la span
const span = tracer.startSpan()
```

{{% /tab %}}

{{% tab "Composant" %}}

Certaines de nos intégrations prennent en charge les hooks de span. Ces derniers permettent de mettre à jour la span juste avant qu'elle ne soit finalisée. Ainsi, vous pouvez modifier les tags d'une span ou les ajouter, même si vous ne pouvez pas accéder à cette span depuis votre code.

```javascript
// en haut du point d'entrée juste après tracer.init()
tracer.use('express', {
  // le hook sera exécuté juste avant que la span de la requête ne soit finalisée
  request: (span, req res) => {
    span.setTag('customer.id', req.query.customer_id)
  }
})
```

Cliquez [ici][1] pour consulter les détails sur l'API pour chaque plug-in.


[1]: https://datadoghq.dev/dd-trace-js/modules/plugins.html
{{% /tab %}}

{{% tab "Erreurs" %}}

Vous pouvez ajouter des erreurs à une span avec le tag spécial `error`. Celui-ci prend en charge les objets d'erreur. Les erreurs sont ainsi décomposées en 3 tags différents : `error.type`, `error.msg` et `error.stack`.

```javascript
try {
  getIngredients()
} catch (e) {
  span.setTag('error', e)
}

```

Lors de l'utilisation de `tracer.trace()` ou de `tracer.wrap()`, cette opération s'effectue automatiquement lors du renvoi d'une erreur.

{{% /tab %}}
{{< /tabs >}}

## Filtrage des requêtes

Dans la plupart des cas, certaines requêtes ne doivent pas être instrumentées, notamment dans le cadre des checks de santé. Elles peuvent être ignorées en utilisant l'option `blacklist` ou `whitelist` du plug-in `http`.

```javascript
//  en haut du point d'entrée juste après tracer.init()
tracer.use('http', {
  blacklist: ['/health', '/ping']
})
```

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

Consultez le site [opentracing.io][4] (en anglais) pour en savoir plus sur l'utilisation de NodeJS avec OpenTracing.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/compatibility_requirements/nodejs/
[2]: /fr/tracing/visualization/#spans
[3]: https://datadoghq.dev/dd-trace-js/interfaces/scope.html
[4]: https://opentracing.io/guides/javascript/
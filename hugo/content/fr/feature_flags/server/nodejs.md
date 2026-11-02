---
description: Configurez les Datadog Feature Flags pour les applications Node.js.
further_reading:
- link: /feature_flags/server/
  tag: Documentation
  text: Feature Flags côté serveur
- link: /tracing/trace_collection/dd_libraries/nodejs/
  tag: Documentation
  text: Traçage Node.js
- link: /tracing/
  tag: Documentation
  text: Découvrez l'Application Performance Monitoring (APM)
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guide
  text: Configurer les métriques d'évaluation des Feature Flags côté serveur
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guide
  text: Configurer l'enrichissement des traces APM pour les Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: Concept
  text: Graphiques des Feature Flags
- link: /feature_flags/concepts/configuration_sources/
  tag: Concept
  text: Sources de configuration des SDK côté serveur
title: Feature Flags Node.js
---
## Présentation {#overview}

Cette page décrit comment instrumenter votre application Node.js avec le SDK Datadog Feature Flags. Le SDK Node.js s'intègre à [OpenFeature][2], une norme ouverte pour la gestion des Feature Flags. Dans `dd-trace` 6.12.0 et versions ultérieures, il charge la configuration des Feature Flags directement depuis le CDN géré par Datadog par défaut.

Le SDK Node.js agentless évalue les Feature Flags localement et envoie des événements d'exposition aux expériences. Il privilégie un relais Event Platform Proxy (EVP) local compatible. Il envoie les événements d'exposition directement lorsqu'aucun relais compatible n'est disponible. Il n'envoie pas d'événements d'évaluation de flag EVP.

## Mise en route {#getting-started}

Pour la configuration agentless par défaut, vous avez besoin de :

- **Datadog Node.js SDK** `dd-trace` version **6.12.0 ou ultérieure**
- Une [clé d'API][3] Datadog
- Votre site Datadog
- **@openfeature/server-sdk** version ~1.20.0

## Installation et initialisation de {#installing-and-initializing}

Le Feature Flagging est fourni par Application Performance Monitoring (APM). Pour intégrer l'APM à votre application avec la prise en charge des Feature Flags, installez `dd-trace` et initialisez le fournisseur OpenFeature de Datadog. Consultez [Tracing Node.js Applications][1] pour des instructions d'installation détaillées de l'APM.

```shell
npm install dd-trace@^6.12.0 @openfeature/server-sdk
```

### Configurer la livraison agentless {#configure-agentless-delivery}

Configurez la clé d'API, le site Datadog et l'environnement dans le processus d'application :

```shell
DD_API_KEY=<YOUR_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<YOUR_ENVIRONMENT>
```

Aucune activation de Feature Flags ni aucun paramètre de source n'est requis. Accédez à `tracer.openfeature` et enregistrez-le auprès d'OpenFeature, comme indiqué ci-dessous, pour commencer le polling. L'installation ou l'initialisation de `dd-trace` seule ne crée pas de trafic CDN pour les Feature Flags.

Initialisez le fournisseur dans le code :

```javascript
import { OpenFeature } from '@openfeature/server-sdk'
import tracer from 'dd-trace';

tracer.init();

// Accessing tracer.openfeature activates the default agentless source.
// setProviderAndWait resolves after the selected source loads, so flags
// evaluate against real configuration data instead of default values.
try {
  await OpenFeature.setProviderAndWait(tracer.openfeature);
} catch (err) {
  // If initialization fails, evaluations return default values until the
  // provider receives its first configuration. Log the error so it's visible.
  console.error('Datadog feature flag provider failed to initialize', err);
}
```

Ces exemples utilisent des modules ESM, où `await` est disponible au niveau supérieur. En CommonJS, enveloppez `await` de niveau supérieur dans une fonction asynchrone.

La plupart des applications exécutent également d'autres tâches de démarrage asynchrones, telles que l'ouverture de connexions à la base de données ou le chargement de la configuration. Lancez leurs promesses en même temps que la promesse du fournisseur et attendez-les en groupe, afin que le temps de démarrage total reste proche de la tâche la plus lente plutôt que de la somme de toutes les tâches :

```javascript
// Start feature flag setup alongside your other startup tasks, then await them together.
const [_, db] = await Promise.all([
  // Catch here so a failed provider init does not reject the whole batch.
  // Evaluations return default values until the provider receives its config.
  OpenFeature.setProviderAndWait(tracer.openfeature).catch((err) => {
    console.error('Datadog feature flag provider failed to initialize', err);
  }),
  connectToDatabase(), // your application's other async startup work
]);
// db is connected and the server can start; flags evaluate against real configuration, or fall back to defaults if initialization failed.
```

Bloquer le démarrage jusqu'à ce que le fournisseur soit prêt, comme indiqué ci-dessus, fonctionne bien pour la plupart des applications. Si votre application doit commencer à traiter les requêtes avant la fin de l'initialisation, choisissez l'une des stratégies suivantes.

### Accepter les valeurs par défaut avant l'initialisation {#accepting-default-values-before-initialization}

Lorsque la réactivité pendant le démarrage est plus importante que le renvoi de valeurs réelles pour les premières requêtes, vous pouvez appeler `setProvider` sans attendre l'initialisation. `setProvider` est synchrone, le client renvoie donc des valeurs par défaut jusqu'à ce que la source de configuration sélectionnée se charge en arrière-plan.

```javascript
OpenFeature.setProvider(tracer.openfeature);
const client = OpenFeature.getClient();

app.get('/my-endpoint', async (req, res) => {

  const flagKey = 'my-flag';
  const defaultValue = false;
  const evaluationContext = {
    targetingKey: req.session?.userID ?? 'unknown', // targetingKey is required context
    companyID: req.session?.companyID
  };

  // Note: evaluations are synchronous, but return a Promise type
  //       to follow the OpenFeature provider specifications
  const value = await client.getBooleanValue(flagKey, defaultValue, evaluationContext);

  if (value) {
    res.send('feature enabled!');
  } else {
    res.send('feature disabled!');
  }

});
```

### Attendre l'initialisation du fournisseur {#waiting-for-provider-initialization}

Lorsque vous souhaitez que le serveur commence à écouter immédiatement tout en effectuant l'évaluation par rapport à des données de configuration réelles, vous pouvez différer l'attente au moment de la requête. Stockez la promesse d'initialisation, puis attendez-la dans chaque gestionnaire de requêtes avant d'évaluer les flags. Les requêtes qui arrivent avant la fin de l'initialisation attendent qu'elle se termine.

```javascript
// Attach the catch once, at creation. This logs a failed initialization a
// single time and keeps the shared promise from rejecting on every request;
// evaluations return default values until the provider receives its first
// configuration.
const initializationPromise = OpenFeature.setProviderAndWait(tracer.openfeature)
  .catch((err) => {
    console.error('Datadog feature flag provider failed to initialize', err);
  });
const client = OpenFeature.getClient();

app.get('/my-endpoint', async (req, res) => {

  const flagKey = 'my-flag';
  const defaultValue = false;
  const evaluationContext = {
    targetingKey: req.session?.userID ?? 'unknown', // targetingKey is required context
    companyID: req.session?.companyID
  };

  // Wait for initialization if necessary. The promise is already handled
  // above, so awaiting it here never throws, even if initialization failed.
  await initializationPromise;

  // Note: evaluations are synchronous, but return a Promise type
  //       to follow the OpenFeature provider specifications
  const value = await client.getBooleanValue(flagKey, defaultValue, evaluationContext);

  if (value) {
    res.send('feature enabled!');
  } else {
    res.send('feature disabled!');
  }

});
```

## Définir le contexte d'évaluation {#set-the-evaluation-context}

Définissez à qui ou à quoi s'applique l'évaluation du flag en utilisant un `EvaluationContext`. Le contexte d'évaluation peut inclure des informations sur l'utilisateur ou la session, qui sont utilisées pour déterminer quelles variations de flag doivent être renvoyées. Appelez la méthode `OpenFeature.setContext` avant d'évaluer les indicateurs pour garantir un ciblage approprié.

<div class="alert alert-warning">Datadog Feature Flags nécessite que les attributs du contexte d'évaluation soient des valeurs primitives plates : chaînes de caractères, nombres et booléens. Ne transmettez pas d'objets ou de tableaux imbriqués ; ils ne sont pas pris en charge et peuvent entraîner la perte des données d'exposition.</div>

## Évaluer les Feature Flags {#evaluate-flags}

Après avoir créé le client `OpenFeature` comme décrit dans la section [Installing and initializing](#installing-and-initializing), vous pouvez commencer à lire les valeurs des flags dans toute votre application. L'évaluation des Feature Flags utilise des données mises en cache localement, de sorte qu'aucune requête réseau n'est effectuée lors de leur évaluation.

Chaque indicateur est identifié par une _key_ (une chaîne unique) et peut être évalué avec un _typed getter_ qui renvoie une valeur du type attendu. Si le Feature Flag n'existe pas ou ne peut pas être évalué, le SDK renvoie la valeur par défaut fournie.

### Feature Flags booléens {#boolean-flags}

Utilisez `getBooleanValue()` pour les indicateurs qui représentent des conditions activé/désactivé ou vrai/faux. Définissez éventuellement le contexte pour des règles de ciblage spécifiques.

```javascript
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID
};

const isNewCheckoutEnabled = await client.getBooleanValue(
    'new-checkout-flow', // flag key
    false, // default value
    evaluationContext, // context
);

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow();
} else {
    showLegacyCheckout();
}
```

### Feature Flags de chaîne {#string-flags}

Utilisez `getStringValue()` pour les indicateurs qui permettent de choisir entre plusieurs variantes ou chaînes de configuration. Par exemple :

```javascript
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID
};

const searchAlgorithm = await client.getStringValue(
  'search-algorithm', // flag key
  'basic', // default value
  evaluationContext,
);

switch (searchAlgorithm) {
  case 'basic':
      return basicSearch(query);
  case 'fuzzy':
      return fuzzySearch(query);
  case 'semantic':
      return semanticSearch(query);
  default:
      return basicSearch(query);
}
```

### Indicateurs numériques {#number-flags}

Pour les indicateurs numériques, utilisez `getNumberValue()`. Ceci est approprié lorsqu'une fonctionnalité dépend d'un paramètre numérique tel qu'une limite, un pourcentage ou un multiplicateur :

```javascript
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID,
};

const maxItems = await client.getNumberValue(
    'max-cart-items', // flag key
    20, // default value
    evaluationContext,
);

const priceMultiplier = await client.getNumberValue(
    'pricing-multiplier', // flag key
    1.3, // default value
    evaluationContext,
);
```

### Indicateurs d'objet {#object-flags}

Pour les données JSON structurées, utilisez `getObjectValue()`. Cette méthode renvoie un `object`, qui peut représenter des primitives, des tableaux ou des dictionnaires. Les indicateurs d'objet sont utiles lorsque plusieurs propriétés doivent être fournies ensemble.

```javascript
const defaultConfig = {
  color: '#00A3FF',
  fontSize: 14,
};

const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID,
};

const config = await client.getObjectValue('ui-config', defaultConfig, evaluationContext);
```

### Détails de l'évaluation des Feature Flags {#flag-evaluation-details}

Lorsque vous avez besoin de plus que la simple valeur de l'indicateur, utilisez les fonctions `get<Type>Details`. Ces méthodes renvoient à la fois la valeur évaluée et les métadonnées expliquant l'évaluation :

* `getBooleanDetails() -> Promise<EvaluationDetails<boolean>>`
* `getStringDetails() -> Promise<EvaluationDetails<string>>`
* `getNumberDetails() -> Promise<EvaluationDetails<number>>`
* `getObjectDetails() -> Promise<EvaluationDetails<JsonValue>>`

Par exemple :

```javascript
const details = await client.getStringDetails('paywall-layout', 'control', evaluationContext);

console.log(details.value);        // Evaluated value (for example: "A", "B", or "control")
console.log(details.variant);      // Variant name, if applicable
console.log(details.reason);       // Description of why this value was chosen (for example: "TARGETING_MATCH")
console.log(details.errorCode);    // The error that occurred during evaluation, if any
console.log(details.errorMessage); // A more detailed message of the error that occurred, if any
console.log(details.flagMetadata); // Additional information about the evaluation
```

## Configuration avancée {#advanced-configuration}

Utilisez [Server SDK Configuration Sources][6] comme référence canonique pour la sélection de la source et les paramètres opérationnels :

- [Configurer la livraison agentless][9], y compris l'interrogation, le délai d'expiration de la requête et les paramètres d'endpoints
- [Utiliser un endpoint agentless personnalisé][7] pour les tests avancés, le développement local ou un proxy géré par l'opérateur
- [Utiliser Agent Remote Configuration][10] pour conserver la livraison gérée par l'agent
- [Migrer une Remote Configuration existante][8] et supprimer le paramètre obsolète `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`

En mode agentless, Node.js utilise un relais de télémétrie local compatible lorsqu'il est disponible. Il envoie directement les événements d'exposition aux expériences lorsqu'aucun relais compatible n'est disponible. Pour les environnements serverless sans agent, vous pouvez utiliser [`serverless-init`][11] comme relais de télémétrie local.

La métrique `feature_flag.evaluations` utilise la configuration OTLP distincte dans le guide [Métriques d'évaluation des flags côté serveur][4]. Cela nécessite un agent pris en charge ou un récepteur de télémétrie serverless. Pour plus d'informations sur les graphiques disponibles, consultez [Graphiques des Feature Flags][5].

## Tests {#testing}

Vous pouvez effectuer des tests sur un environnement de test Datadog dédié avec le fournisseur `tracer.openfeature` réel, ou le remplacer par `TypedInMemoryProvider` d'OpenFeature pour contrôler directement les valeurs des flags dans le code de test. Cette section présente l'approche en mémoire, qui permet de garder les tests hermétiques et hors ligne. `TypedInMemoryProvider` est fourni avec `@openfeature/server-sdk`, donc aucune dépendance supplémentaire n'est requise.

Lorsque vous utilisez le fournisseur en mémoire, n'appelez pas `tracer.init()` et ne définissez pas `tracer.openfeature` comme fournisseur — c'est le comportement qui est remplacé.

L'API OpenFeature est un singleton par processus Node.js. Réinitialisez-le dans `afterAll` avec `OpenFeature.close()` ou `OpenFeature.clearProviders()` pour éviter que l'état d'un fichier de test ne se propage au suivant.

```javascript
// flags.test.js
import { beforeAll, beforeEach, afterAll, expect, test } from 'vitest';
import { OpenFeature, TypedInMemoryProvider } from '@openfeature/server-sdk';

const flags = {
  'new-checkout-flow': {
    variants: { on: true, off: false },
    defaultVariant: 'off',
    disabled: false,
    contextEvaluator: (ctx) => (ctx.companyID === 'beta-co' ? 'on' : 'off'),
  },
};

let provider;

beforeAll(async () => {
  provider = new TypedInMemoryProvider(flags);
  await OpenFeature.setProviderAndWait(provider);
});

beforeEach(() => {
  // Reset flag state between tests to prevent cross-test pollution.
  provider.putConfiguration(flags);
});

afterAll(async () => {
  await OpenFeature.close();
});

test('beta company sees new checkout', async () => {
  const client = OpenFeature.getClient();
  const value = await client.getBooleanValue('new-checkout-flow', false, {
    targetingKey: 'user-1',
    companyID: 'beta-co',
  });
  expect(value).toBe(true);
});

test('non-beta company falls back to default', async () => {
  const client = OpenFeature.getClient();
  const details = await client.getBooleanDetails('new-checkout-flow', false, {
    targetingKey: 'user-2',
    companyID: 'acme',
  });
  expect(details.value).toBe(false);
  expect(details.variant).toBe('off');
});
```

L'extrait ci-dessus utilise Vitest pour sa prise en charge ESM de premier ordre. Le même modèle fonctionne avec Jest ; les utilisateurs de Jest peuvent avoir besoin de `--experimental-vm-modules` si leur projet est en ESM. L'exportation non générique `InMemoryProvider` est obsolète — préférez `TypedInMemoryProvider`.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: https://openfeature.dev/
[3]: /fr/account_management/api-app-keys/#api-keys
[4]: /fr/feature_flags/guide/server_flag_evaluation_metrics/
[5]: /fr/feature_flags/concepts/flag_graphs/
[6]: /fr/feature_flags/concepts/configuration_sources/
[7]: /fr/feature_flags/concepts/configuration_sources/#use-a-custom-agentless-endpoint
[8]: /fr/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[9]: /fr/feature_flags/concepts/configuration_sources/#configure-agentless-delivery
[10]: /fr/feature_flags/concepts/configuration_sources/#use-agent-remote-configuration
[11]: /fr/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry
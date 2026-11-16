---
description: Configure las Feature Flags de Datadog para aplicaciones de Node.js.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Feature Flags del lado del servidor
- link: /tracing/trace_collection/dd_libraries/nodejs/
  tag: Documentación
  text: Tracing de Node.js
- link: /tracing/
  tag: Documentación
  text: Obtenga información sobre Application Performance Monitoring (APM)
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guía
  text: Configure las métricas de evaluación de marcadores del lado del servidor
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guía
  text: Configure el enriquecimiento de trazas de APM para Feature Flags
- link: /feature_flags/concepts/flag_graphs/
  tag: Concepto
  text: Gráficos de Feature Flag
- link: /feature_flags/concepts/configuration_sources/
  tag: Concepto
  text: Fuentes de configuración del SDK del servidor
title: Feature Flags de Node.js
---
## Descripción general {#overview}

Esta página describe cómo instrumentar su aplicación Node.js con el Datadog Feature Flags SDK. El SDK de Node.js se integra con [OpenFeature][2], un estándar abierto para la gestión de feature flags. En `dd-trace` 6.12.0 y versiones posteriores, carga la configuración de flags directamente desde la CDN gestionada por Datadog de forma predeterminada.

Agentless Node.js evalúa las Feature Flags localmente y envía eventos de exposición de experimentos. Prefiere un relay de Event Platform Proxy (EVP) local compatible. Envía eventos de exposición directamente cuando no hay un relay compatible disponible. No envía eventos de evaluación de Feature Flags de EVP.

## Primeros pasos {#getting-started}

Para la configuración sin agente predeterminada, necesita:

- **Datadog Node.js SDK** `dd-trace` versión **6.12.0 o posterior**
- Una [clave de API][3] de Datadog
- Su sitio de Datadog
- **@openfeature/server-sdk** versión ~1.20.0

## Instalación e inicialización {#installing-and-initializing}

El Feature Flagging es proporcionado por Application Performance Monitoring (APM). Para integrar APM en su aplicación con soporte para Feature Flags, instale `dd-trace` e inicialice el proveedor de OpenFeature de Datadog. Consulte [Tracing Node.js Applications][1] para obtener instrucciones detalladas de instalación de APM.

```shell
npm install dd-trace@^6.12.0 @openfeature/server-sdk
```

### Configure la entrega Agentless {#configure-agentless-delivery}

Configure la clave de API, el sitio de Datadog y el entorno en el proceso de la aplicación:

```shell
DD_API_KEY=<YOUR_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<YOUR_ENVIRONMENT>
```

No se requiere la habilitación de Feature Flags ni la configuración de la fuente. Acceda a `tracer.openfeature` y regístrelo con OpenFeature, como se muestra a continuación, para comenzar el sondeo. Instalar o inicializar `dd-trace` por sí solo no crea tráfico de CDN de Feature Flags.

Inicialice el proveedor en el código:

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

Estos ejemplos utilizan módulos ESM, donde `await` está disponible en el nivel superior. En CommonJS, envuelva `await` de nivel superior en una función asíncrona.

La mayoría de las aplicaciones también ejecutan otras tareas de inicio asincrónicas, como abrir conexiones a bases de datos o cargar la configuración. Inicie sus promesas junto con la promesa del proveedor y espere a que se completen como grupo, de modo que el tiempo total de inicio se mantenga cerca de la tarea más lenta en lugar de la suma de todas ellas:

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

Bloquear el inicio hasta que el proveedor esté listo, como se muestra arriba, funciona bien para la mayoría de las aplicaciones. Si su aplicación debe comenzar a atender solicitudes antes de que se complete la inicialización, elija una de las siguientes estrategias.

### Aceptar valores predeterminados antes de la inicialización {#accepting-default-values-before-initialization}

Cuando la capacidad de respuesta durante el inicio es más importante que servir valores reales para las primeras solicitudes, puede llamar a `setProvider` sin esperar a la inicialización. `setProvider` es sincrónico, por lo que el cliente devuelve valores predeterminados hasta que la fuente de configuración seleccionada se carga en segundo plano.

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

### Esperando la inicialización del proveedor {#waiting-for-provider-initialization}

Cuando desee que el servidor comience a escuchar inmediatamente mientras sigue evaluando con datos de configuración reales, puede diferir la espera hasta el momento de la solicitud. Almacene la promesa de inicialización y luego espere a que se resuelva en cada controlador de solicitudes antes de evaluar las Feature Flags. Las solicitudes que llegan antes de que se complete la inicialización esperan a que esta finalice.

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

## Establezca el contexto de evaluación {#set-the-evaluation-context}

Defina a quién o a qué se aplica la evaluación de la Feature Flag mediante un `EvaluationContext`. El contexto de evaluación puede incluir información del usuario o de la sesión utilizada para determinar qué variaciones de las Feature Flags deben devolverse. Llame al método `OpenFeature.setContext` antes de evaluar las Feature Flags para garantizar una segmentación adecuada.

<div class="alert alert-warning">Datadog Feature Flags requiere que los atributos del contexto de evaluación sean valores primitivos planos: cadenas, números y booleanos. No pase objetos o arreglos anidados; no son compatibles y pueden causar que los datos de exposición se descarten.</div>

## Evalúe marcadores {#evaluate-flags}

Después de crear el cliente `OpenFeature` como se describe en la sección [Instalación e inicialización](#installing-and-initializing), puede comenzar a leer los valores de las Feature Flags en toda su aplicación. La evaluación de Feature Flags utiliza datos almacenados en caché localmente, por lo que no se producen solicitudes de red al evaluar Feature Flags.

Cada marcador se identifica mediante una _clave_ (una cadena única) y se puede evaluar con un _getter tipado_ que devuelve un valor del tipo esperado. Si el marcador no existe o no se puede evaluar, el SDK devuelve el valor predeterminado proporcionado.

### Marcadores booleanos {#boolean-flags}

Utilice `getBooleanValue()` para Feature Flags que representen condiciones de encendido/apagado o verdadero/falso. Opcionalmente, establezca el contexto para reglas de segmentación específicas.

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

### Marcadores de cadena {#string-flags}

Utilice `getStringValue()` para Feature Flags que seleccionen entre múltiples variantes o cadenas de configuración. Por ejemplo:

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

### Feature Flags numéricos {#number-flags}

Para Feature Flags numéricas, utilice `getNumberValue()`. Esto es apropiado cuando una funcionalidad depende de un parámetro numérico como un límite, porcentaje o multiplicador:

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

### Marcadores de objeto {#object-flags}

Para datos JSON estructurados, utilice `getObjectValue()`. Este método devuelve un `object`, que puede representar primitivos, arreglos o diccionarios. Las Feature Flags de tipo objeto son útiles cuando se necesitan proporcionar varias propiedades juntas.

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

### Detalles de evaluación de marcadores {#flag-evaluation-details}

Cuando necesite algo más que el valor de la Feature Flag, utilice las funciones `get<Type>Details`. Estos métodos devuelven tanto el valor evaluado como los metadatos que explican la evaluación:

* `getBooleanDetails() -> Promise<EvaluationDetails<boolean>>`
* `getStringDetails() -> Promise<EvaluationDetails<string>>`
* `getNumberDetails() -> Promise<EvaluationDetails<number>>`
* `getObjectDetails() -> Promise<EvaluationDetails<JsonValue>>`

Por ejemplo:

```javascript
const details = await client.getStringDetails('paywall-layout', 'control', evaluationContext);

console.log(details.value);        // Evaluated value (for example: "A", "B", or "control")
console.log(details.variant);      // Variant name, if applicable
console.log(details.reason);       // Description of why this value was chosen (for example: "TARGETING_MATCH")
console.log(details.errorCode);    // The error that occurred during evaluation, if any
console.log(details.errorMessage); // A more detailed message of the error that occurred, if any
console.log(details.flagMetadata); // Additional information about the evaluation
```

## Configuración avanzada {#advanced-configuration}

Utilice [Server SDK Configuration Sources][6] como referencia canónica para la selección de fuentes y los ajustes operativos:

- [Configure la entrega sin agente][9], incluyendo el sondeo, el tiempo de espera de la solicitud y los ajustes del punto de conexión
- [Utilice un punto de conexión sin agente personalizado][7] para pruebas avanzadas, desarrollo local o un proxy gestionado por el operador
- [Utilice Remote Configuration del Agent][10] para conservar la entrega gestionada por el Agent
- [Migre una configuración de Remote Configuration existente][8] y elimine el ajuste `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` obsoleto

En el modo sin agente, Node.js utiliza un relé de telemetría local compatible cuando está disponible. Envía eventos de exposición a experimentos directamente cuando no hay un relé compatible disponible. Para entornos serverless sin Agent, puede utilizar [`serverless-init`][11] como relé de telemetría local.

La métrica `feature_flag.evaluations` utiliza la configuración OTLP independiente en la guía de [Métricas de evaluación de Feature Flags del lado del servidor][4]. Requiere un Agent compatible o un receptor de telemetría serverless. Para obtener más información sobre los gráficos disponibles, consulte [Feature Flag Graphs][5].

## Pruebas {#testing}

Puede probar en un entorno de prueba dedicado de Datadog con el proveedor `tracer.openfeature` real, o cambiarlo por el `TypedInMemoryProvider` de OpenFeature para controlar los valores de las Feature Flags directamente en el código de prueba. Esta sección muestra el enfoque en memoria, que mantiene las pruebas herméticas y sin conexión. `TypedInMemoryProvider` se incluye con `@openfeature/server-sdk`, por lo que no se requiere ninguna dependencia adicional.

Cuando utilice el proveedor en memoria, no llame a `tracer.init()` ni establezca `tracer.openfeature` como proveedor; ese es el comportamiento que se está reemplazando.

La API de OpenFeature es un singleton por proceso de Node.js. Restablézcalo en `afterAll` con `OpenFeature.close()` o `OpenFeature.clearProviders()`, para evitar que el estado de un archivo de prueba se filtre al siguiente.

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

El fragmento anterior utiliza Vitest por su compatibilidad de primer nivel con ESM. El mismo patrón funciona con Jest; los usuarios de Jest podrían necesitar `--experimental-vm-modules` si su proyecto es ESM. La exportación no genérica `InMemoryProvider` está obsoleta; prefiera `TypedInMemoryProvider`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: https://openfeature.dev/
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/feature_flags/guide/server_flag_evaluation_metrics/
[5]: /es/feature_flags/concepts/flag_graphs/
[6]: /es/feature_flags/concepts/configuration_sources/
[7]: /es/feature_flags/concepts/configuration_sources/#use-a-custom-agentless-endpoint
[8]: /es/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[9]: /es/feature_flags/concepts/configuration_sources/#configure-agentless-delivery
[10]: /es/feature_flags/concepts/configuration_sources/#use-agent-remote-configuration
[11]: /es/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry
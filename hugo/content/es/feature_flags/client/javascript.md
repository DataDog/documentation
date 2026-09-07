---
description: Configure las Feature Flags de Datadog para aplicaciones JavaScript de
  navegador.
further_reading:
- link: /feature_flags/client/
  tag: Documentación
  text: Feature Flags del lado del cliente
- link: https://openfeature.dev/docs/reference/sdks/client/web/
  tag: OpenFeature
  text: SDK web de OpenFeature
- link: /real_user_monitoring/application_monitoring/browser/
  tag: Documentación
  text: Browser Monitoring
- link: /feature_flags/browser_developer_extension/
  tag: Documentación
  text: Extensión para desarrolladores de navegador
title: Feature Flags de JavaScript
---
## Descripción general {#overview}

Esta página describe cómo instrumentar su aplicación JavaScript de navegador con el SDK de Feature Flags de Datadog. Las Feature Flags de Datadog proporcionan una forma unificada de controlar de forma remota la disponibilidad de funciones en su aplicación, experimentar de forma segura y ofrecer nuevas experiencias con confianza.

El SDK de Feature Flags de Datadog para JavaScript está construido sobre [OpenFeature][1], un estándar abierto para la gestión de Feature Flags. Esta guía explica cómo instalar el SDK, configurar el proveedor de Datadog y evaluar Feature Flags en su aplicación.

## Instalación {#installation}

Instale el proveedor de OpenFeature de Datadog y el SDK web de OpenFeature utilizando su gestor de paquetes preferido:

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "pnpm" %}}
{{< code-block lang="bash" >}}
pnpm add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Inicialice el proveedor {#initialize-the-provider}

Cree una instancia de `DatadogProvider` con sus credenciales de Datadog. Para la configuración en vivo de los Browser Feature Flags, se requieren `applicationId`, `clientToken`, `site` y `env`. Para crear un token de cliente, consulte [Client tokens][2].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Los Browser Feature Flags no son compatibles con el <a href="/getting_started/site">Datadog site</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

const provider = new DatadogProvider({
  // Required
  // applicationId is a unique identifier to distinguish multiple frontend applications.
  // This should match the app ID you provide to your RUM SDK.
  applicationId: '<APPLICATION_ID>',
  // Required
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});
```

## Establezca el contexto de evaluación {#set-the-evaluation-context}

Defina a quién o a qué se aplica la evaluación de las Feature Flags mediante un contexto de evaluación. El contexto de evaluación incluye información del usuario o de la sesión utilizada para determinar qué variaciones de las Feature Flags deben devolverse. Haga referencia a estos atributos en sus reglas de segmentación para controlar quién ve cada variante.

<div class="alert alert-warning">Datadog Feature Flags requiere que los atributos del contexto de evaluación sean valores primitivos planos: cadenas, números y booleanos. No pase objetos o arreglos anidados; no son compatibles y pueden provocar que se pierdan los datos de exposición.</div>

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  user_role: 'admin',
  email: 'user@example.com',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">El <code>targetingKey</code> se utiliza como sujeto de aleatorización para la segmentación basada en porcentajes. Cuando un Feature Flag segmenta un porcentaje de sujetos (por ejemplo, 50%), el <code>targetingKey</code> determina en qué bucket cae un usuario. Los usuarios con el mismo <code>targetingKey</code> siempre reciben la misma variante para un Feature Flag determinado.</div>

La mayoría de las aplicaciones ejecutan varias tareas asíncronas al inicio, como obtener datos de otro servicio o cargar la configuración. Este ejemplo muestra solo la inicialización de las Feature Flags. Como práctica recomendada, inicie todas sus promesas de inicio juntas y espérelas como grupo (por ejemplo, con `Promise.all`) justo antes de que se necesiten los resultados, en lugar de esperar cada una secuencialmente. Esto mantiene el tiempo total de inicio cerca de la tarea más lenta en lugar de la suma de todas ellas.

## Evaluar Feature Flags {#evaluate-flags}

Después de que el proveedor se inicialice, puede evaluar Feature Flags en cualquier parte de su aplicación. La evaluación de Feature Flags es _local e instantánea_: el SDK utiliza datos almacenados en caché localmente, por lo que no se producen solicitudes de red al evaluar Feature Flags.

### Obtener un cliente {#get-a-client}

Recupere el cliente de OpenFeature para evaluar Feature Flags:

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
{{< /code-block >}}

### Feature Flags booleanos {#boolean-flags}

Use `getBooleanValue(key, defaultValue)` para Feature Flags que representan condiciones de encendido/apagado o verdadero/falso:

{{< code-block lang="javascript" >}}
const isNewCheckoutEnabled = client.getBooleanValue('checkout_new', false);

if (isNewCheckoutEnabled) {
  showNewCheckoutFlow();
} else {
  showLegacyCheckout();
}
{{< /code-block >}}

### Feature Flags de cadena {#string-flags}

Use `getStringValue(key, defaultValue)` para Feature Flags que seleccionan entre múltiples variantes o cadenas de configuración:

{{< code-block lang="javascript" >}}
const theme = client.getStringValue('ui_theme', 'light');

switch (theme) {
  case 'dark':
    setDarkTheme();
    break;
  case 'light':
  default:
    setLightTheme();
}
{{< /code-block >}}

### Feature Flags numéricos {#number-flags}

Use `getNumberValue(key, defaultValue)` para Feature Flags numéricos como límites, porcentajes o multiplicadores:

{{< code-block lang="javascript" >}}
const maxItems = client.getNumberValue('cart_items_max', 20);
const priceMultiplier = client.getNumberValue('pricing_multiplier', 1.0);
{{< /code-block >}}

### Feature Flags de objeto {#object-flags}

Use `getObjectValue(key, defaultValue)` para Feature Flags que proporcionen datos de configuración estructurados:

{{< code-block lang="javascript" >}}
const config = client.getObjectValue('promo_banner_config', {
  color: '#00A3FF',
  message: 'Welcome!',
});
{{< /code-block >}}

### Detalles de evaluación de Feature Flags {#flag-evaluation-details}

Cuando necesite más que solo el valor de una Feature Flag, use los métodos de detalle. Estos devuelven tanto el valor evaluado como los metadatos que explican la evaluación:

{{< code-block lang="javascript" >}}
const details = client.getBooleanDetails('checkout_new', false);

console.log(details.value);       // Evaluated value (true or false)
console.log(details.variant);     // Variant name, if applicable
console.log(details.reason);      // Why this value was chosen
console.log(details.errorCode);   // Error code, if evaluation failed
{{< /code-block >}}

## Ejemplo completo {#complete-example}

Aquí tiene un ejemplo completo que muestra cómo configurar y usar Datadog Feature Flags en una aplicación JavaScript:

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize the Datadog provider
const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});

// Set the evaluation context
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  user_role: 'admin',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);

// Get the client and evaluate flags
const client = OpenFeature.getClient();
const showNewFeature = client.getBooleanValue('new_feature', false);

if (showNewFeature) {
  console.log('New feature is enabled!');
}
```

## Actualizar el contexto de evaluación {#update-the-evaluation-context}

Para actualizar el contexto de evaluación después de la inicialización (por ejemplo, cuando un usuario inicia sesión), use `OpenFeature.setContext()`:

{{< code-block lang="javascript" >}}
await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## Configurar las opciones del proveedor del navegador {#configure-browser-provider-options}

El proveedor web también admite estas configuraciones opcionales:

| Opción | Predeterminado | Uso |
| --- | --- | --- |
| `enableExposureLogging` | `true` | Enviar eventos de exposición a la ingesta de exposiciones. |
| `enableFlagEvaluationTracking` | `true` | Enviar telemetría de evaluación agregada. |
| `enableRumFeatureFlagTracking` | `true` | Agregar evaluaciones de Feature Flags a los eventos de RUM cuando Browser RUM esté disponible. Habilitar esta opción puede aumentar el conteo de eventos facturados de RUM. |
| `flagEvaluationTrackingInterval` | `10000` ms | Intervalo de vaciado para la telemetría de evaluación. |
| `initialFlagsConfiguration` | `{}` | Bootstrap con Feature Flags precalculados. |
| `flaggingProxy` | unset | Obtener Feature Flags a través de un proxy en lugar de `site`. |
| `customHeaders` | unset | Agregar encabezados a las solicitudes de obtención de Feature Flags. |
| `overwriteRequestHeaders` | `false` | Reemplazar los encabezados de solicitud predeterminados con `customHeaders`. |

## Anule los Feature Flags en su navegador {#override-flags-in-your-browser}

Para explorar los Feature Flags de su organización y anularlos localmente mientras desarrolla, incorpore el `DatadogDevtools` wrapper en su pila de proveedores y utilice la pestaña **Feature Flags** en la [extensión para desarrolladores del Datadog Browser SDK][3].

## Pruebas {#testing}

Puede realizar pruebas en un entorno de prueba dedicado de Datadog con el `DatadogProvider` real, o cambiarlo por el `InMemoryProvider` de OpenFeature para controlar los valores de los Feature Flags directamente en el código de prueba. Esta sección muestra el enfoque en memoria, el cual mantiene las pruebas herméticas y sin conexión. `InMemoryProvider` se exporta directamente desde `@openfeature/web-sdk`, por lo que no se requiere ninguna dependencia adicional.

A diferencia del SDK del lado del servidor, el Web SDK evalúa los Feature Flags de forma sincrónica después de la inicialización. Aun así, `await` `setProviderAndWait` una vez en `beforeEach` para asegurarse de que el proveedor esté listo.

{{< code-block lang="javascript" >}}
import { beforeEach, afterAll, expect, test } from 'vitest';
import { OpenFeature, TypedInMemoryProvider } from '@openfeature/web-sdk';

const flags = {
  new_checkout_button: {
    variants: { on: true, off: false },
    defaultVariant: 'on',
    disabled: false,
  },
  ui_theme: {
    variants: { dark: 'dark', light: 'light' },
    defaultVariant: 'light',
    disabled: false,
  },
};

beforeEach(async () => {
  await OpenFeature.setProviderAndWait(new TypedInMemoryProvider(flags));
});

afterAll(async () => {
  await OpenFeature.close();
});

test('new checkout button is enabled by default', () => {
  const client = OpenFeature.getClient();
  expect(client.getBooleanValue('new_checkout_button', false)).toBe(true);
});

test('missing flag returns default', () => {
  const client = OpenFeature.getClient();
  expect(client.getBooleanValue('does-not-exist', false)).toBe(false);
});
{{< /code-block >}}

La estructura de Feature Flags del Web SDK requiere `variants`, `defaultVariant` y `disabled`. Omitir cualquiera de estos hace que falle la compilación de TypeScript; en tiempo de ejecución, evaluar una clave de Feature Flag desconocida devuelve el valor predeterminado proporcionado. Prefiera `TypedInMemoryProvider` en lugar del obsoleto `InMemoryProvider` para configuraciones de Feature Flags con verificación de tipos. El mismo patrón de prueba funciona con Jest + jsdom; intercambie las importaciones de `vitest` por `@jest/globals` y añada `jest-environment-jsdom` a su proyecto.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /es/account_management/api-app-keys/#client-tokens
[3]: /es/feature_flags/browser_developer_extension/
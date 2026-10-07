---
description: Configure las Feature Flags de Datadog para aplicaciones de React.
further_reading:
- link: /feature_flags/client/
  tag: Documentación
  text: Feature Flags del lado del cliente
- link: https://openfeature.dev/docs/reference/sdks/client/web/react/
  tag: OpenFeature
  text: OpenFeature React SDK
- link: /real_user_monitoring/application_monitoring/browser/
  tag: Documentación
  text: Browser Monitoring
title: Feature Flags de React
---
## Descripción general {#overview}

Esta página describe cómo instrumentar su aplicación de React con el SDK de Feature Flags de Datadog. Las Feature Flags de Datadog proporcionan una forma unificada de controlar de forma remota la disponibilidad de funciones en su aplicación, experimentar de forma segura y ofrecer nuevas experiencias con confianza.

El SDK de Feature Flags de Datadog para React está construido sobre [OpenFeature][1], un estándar abierto para la gestión de Feature Flags. Esta guía explica cómo instalar el SDK, configurar el proveedor de Datadog y evaluar Feature Flags en sus componentes de React.

## Instalación {#installation}

Instale el proveedor de OpenFeature de Datadog y el SDK de React de OpenFeature utilizando su gestor de paquetes preferido:

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "pnpm" %}}
{{< code-block lang="bash" >}}
pnpm add @datadog/openfeature-browser @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Inicialice el proveedor {#initialize-the-provider}

Cree una instancia de `DatadogProvider` y regístrela con OpenFeature. Haga esto lo antes posible en su aplicación, antes de renderizar sus componentes de React. Para la configuración en vivo de los Browser Feature Flags, se requieren `applicationId`, `clientToken`, `site` y `env`. Para crear un token de cliente, consulte [Client tokens][2].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Los Browser Feature Flags no son compatibles con el <a href="/getting_started/site">Datadog site</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';

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

Establezca el proveedor junto con el contexto de evaluación:

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/react-sdk';

const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  email: 'user@example.com',
  tier: 'premium',
};

OpenFeature.setProvider(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">El <code>targetingKey</code> se utiliza como sujeto de aleatorización para la segmentación basada en porcentajes. Cuando un Feature Flag segmenta un porcentaje de sujetos (por ejemplo, 50%), el <code>targetingKey</code> determina en qué bucket cae un usuario. Los usuarios con el mismo <code>targetingKey</code> siempre reciben la misma variante para un Feature Flag determinado.</div>

## Envuelva su aplicación {#wrap-your-application}

Envuelva su aplicación con el componente `OpenFeatureProvider`. Esto hace que Feature Flags estén disponibles para todos los componentes secundarios a través del contexto de React.

{{< code-block lang="jsx" >}}
import { OpenFeatureProvider } from '@openfeature/react-sdk';

function App() {
  return (
    <OpenFeatureProvider>
      <YourApp />
    </OpenFeatureProvider>
  );
}
{{< /code-block >}}

## Evalúe marcadores {#evaluate-flags}

El SDK de React de OpenFeature proporciona hooks para evaluar Feature Flags dentro de sus componentes. Cada hook devuelve el valor de Feature Flags según el contexto de evaluación que configuró.

### Feature Flags booleanos {#boolean-flags}

Utilice `useBooleanFlagValue(key, defaultValue)` para Feature Flags que representen condiciones de encendido/apagado o verdadero/falso:

{{< code-block lang="jsx" >}}
import { useBooleanFlagValue } from '@openfeature/react-sdk';

function CheckoutButton() {
  const isNewCheckoutEnabled = useBooleanFlagValue('new_checkout_button', false);

  if (isNewCheckoutEnabled) {
    return <NewCheckoutButton />;
  }

  return <LegacyCheckoutButton />;
}
{{< /code-block >}}

### Feature Flags de cadena {#string-flags}

Utilice `useStringFlagValue(key, defaultValue)` para Feature Flags que seleccionen entre múltiples variantes o cadenas de configuración:

{{< code-block lang="jsx" >}}
import { useStringFlagValue } from '@openfeature/react-sdk';

function ThemedComponent() {
  const theme = useStringFlagValue('ui_theme', 'light');

  switch (theme) {
    case 'dark':
      return <DarkTheme />;
    case 'light':
    default:
      return <LightTheme />;
  }
}
{{< /code-block >}}

### Feature Flags numéricos {#number-flags}

Utilice `useNumberFlagValue(key, defaultValue)` para Feature Flags numéricas, tales como límites, porcentajes o multiplicadores:

{{< code-block lang="jsx" >}}
import { useNumberFlagValue } from '@openfeature/react-sdk';

function CartDisplay() {
  const maxItems = useNumberFlagValue('max_cart_items', 20);

  return <Cart maxItems={maxItems} />;
}
{{< /code-block >}}

### Feature Flags de objeto {#object-flags}

Utilice `useObjectFlagValue(key, defaultValue)` para datos de configuración estructurados:

{{< code-block lang="jsx" >}}
import { useObjectFlagValue } from '@openfeature/react-sdk';

function Banner() {
  const config = useObjectFlagValue('promo_banner', {
    color: '#00A3FF',
    message: 'Welcome!',
  });

  return <PromoBanner color={config.color} message={config.message} />;
}
{{< /code-block >}}

### Soporte para Suspense {#suspense-support}

El soporte integrado para [suspense](https://react.dev/reference/react/Suspense) le permite evitar mostrar componentes con Feature Flags hasta que se complete la inicialización del proveedor, o cuando el contexto cambia. Pase `{ suspend: true }` en las opciones del hook para usar esta funcionalidad.

Por ejemplo:

{{< code-block lang="jsx" >}}
import { useBooleanFlagValue } from '@openfeature/react-sdk';
import { Suspense } from 'react';

function Content() {
  // Display a loading message if the component uses feature flags and the provider is not ready
  return (
    <Suspense fallback={"Loading..."}>
      <WelcomeMessage />
    </Suspense>
  );
}

function WelcomeMessage() {
  const showNewMessage = useBooleanFlagValue('show-new-welcome-message', false, { suspend: true });

  return (
    <>
      {showNewMessage ? (
        <p>Welcome! You're seeing the new experience.</p>
      ) : (
        <p>Welcome back!</p>
      )}
    </>
  );
}
{{< /code-block >}}

### Detalles de evaluación de marcadores {#flag-evaluation-details}

Cuando necesite más que solo el valor de Feature Flags, use los hooks de detalle. Estos devuelven tanto el valor evaluado como los metadatos que explican la evaluación:

* `useBooleanFlagDetails(key, defaultValue)`
* `useStringFlagDetails(key, defaultValue)`
* `useNumberFlagDetails(key, defaultValue)`
* `useObjectFlagDetails(key, defaultValue)`

Por ejemplo:

{{< code-block lang="jsx" >}}
import { useStringFlagDetails } from '@openfeature/react-sdk';

function PaywallLayout() {
  const details = useStringFlagDetails('paywall_layout', 'control');

  console.log(details.value);   // Evaluated value (for example: "A", "B", or "control")
  console.log(details.variant); // Variant name, if applicable
  console.log(details.reason);  // Description of why this value was chosen

  return <Layout variant={details.value} />;
}
{{< /code-block >}}

Los detalles del marcador le ayudan a depurar el comportamiento de evaluación y a entender por qué un usuario recibió un valor determinado.

## Ejemplo completo {#complete-example}

Aquí tiene un ejemplo completo que muestra cómo configurar y usar Feature Flags de Datadog en una aplicación de React:

```jsx
import { Suspense } from 'react';
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeatureProvider, OpenFeature, useBooleanFlagValue } from '@openfeature/react-sdk';

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

OpenFeature.setProvider(provider, evaluationContext);

// Wrap your app with the OpenFeatureProvider and Suspense for loading state
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <OpenFeatureProvider suspendUntilReady>
        <Page />
      </OpenFeatureProvider>
    </Suspense>
  );
}

// Use feature flags in your components
function Page() {
  const showNewFeature = useBooleanFlagValue('new_feature', false);

  return (
    <div>
      {showNewFeature ? <NewFeature /> : <ExistingFeature />}
    </div>
  );
}
```

## Actualizar el contexto de evaluación {#update-the-evaluation-context}

Para actualizar el contexto de evaluación después de la inicialización (por ejemplo, cuando un usuario inicia sesión), use `OpenFeature.setContext()`:

{{< code-block lang="javascript" >}}
// When a user logs in
await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## Configurar las opciones del proveedor del navegador {#configure-browser-provider-options}

El proveedor de React utiliza el proveedor de navegador de Datadog, que también admite estos ajustes opcionales:

| Opción | Predeterminado | Uso |
| --- | --- | --- |
| `enableExposureLogging` | `true` | Enviar eventos de exposición a la ingesta de exposiciones. |
| `enableFlagEvaluationTracking` | `true` | Enviar telemetría de evaluación agregada. |
| `enableRumFeatureFlagTracking` | `true` | Agregar evaluaciones de Feature Flags a los eventos de RUM cuando Browser RUM esté disponible. Habilitar esta opción puede aumentar el conteo de eventos facturados de RUM. |
| `flagEvaluationTrackingInterval` | `10000` ms | Intervalo de vaciado para la telemetría de evaluación. |
| `initialFlagsConfiguration` | unset | Proporcione datos precalculados que coincidan con el contexto como alternativa si la obtención falla. Consulte [Initial precomputed fallback data][3]. |
| `flaggingProxy` | unset | Obtener Feature Flags a través de un proxy en lugar de `site`. |
| `customHeaders` | unset | Agregar encabezados a las solicitudes de obtención de Feature Flags. |
| `overwriteRequestHeaders` | `false` | Reemplazar los encabezados de solicitud predeterminados con `customHeaders`. |

`DatadogProvider` sigue siendo el proveedor de navegador recomendado para aplicaciones de React. Para la entrega de configuración propiedad de la aplicación o la evaluación de reglas locales a través de cambios de contexto, consulte [Evaluación basada en reglas del navegador][4]. Esta configuración avanzada requiere una actualización explícita de la configuración y la gestión del ciclo de vida del seguimiento.

## Pruebas {#testing}

Puede realizar pruebas en un entorno de prueba de Datadog dedicado con el `DatadogProvider` real, o cambiarlo por el `TypedInMemoryProvider` de OpenFeature para controlar los valores de las Feature Flags directamente en el código de prueba. Esta sección muestra el enfoque en memoria, que mantiene las pruebas herméticas y sin conexión. `TypedInMemoryProvider` se exporta desde `@openfeature/web-sdk`; instálelo como una dependencia de desarrollo y regístrelo antes de renderizar los componentes bajo prueba:

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/react-sdk';
import { TypedInMemoryProvider } from '@openfeature/web-sdk';

await OpenFeature.setProviderAndWait(new TypedInMemoryProvider({
  new_checkout_button: {
    variants: { on: true, off: false },
    defaultVariant: 'on',
    disabled: false,
  },
}));
{{< /code-block >}}

La estructura de Feature Flags del Web SDK requiere `variants`, `defaultVariant` y `disabled`. Utilice `setProviderAndWait` (no `setProvider`) para evitar condiciones de carrera de suspense cuando el código de prueba renderice de inmediato los componentes controlados por Feature Flags. Para pruebas de componentes que montan un árbol de React, `@openfeature/react-sdk` también exporta un componente `OpenFeatureTestProvider` que envuelve a los hijos con un proveedor en memoria; consulte la [documentación del SDK de React de OpenFeature](https://openfeature.dev/docs/reference/technologies/client/web/react) para obtener más detalles.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /es/account_management/api-app-keys/#client-tokens
[3]: /es/feature_flags/client/javascript/#supply-initial-precomputed-fallback-data
[4]: /es/feature_flags/implementation_patterns/browser_rules_based_evaluation/
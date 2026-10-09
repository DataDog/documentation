---
description: Configure Feature Flags de Datadog para aplicaciones de React Native.
further_reading:
- link: https://openfeature.dev/docs/reference/sdks/client/web/react/
  tag: OpenFeature
  text: OpenFeature React SDK
- link: /feature_flags/client/
  tag: Documentación
  text: Feature Flags del lado del cliente
- link: /real_user_monitoring/application_monitoring/react_native/
  tag: Documentación
  text: Monitoreo de React Native
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: Guía
  text: Proxy para el tráfico del SDK de Feature Flag
title: Feature Flags de React Native
---
## Descripción general {#overview}

Esta página describe cómo instrumentar su aplicación React Native con el SDK de Datadog Feature Flags. Las Feature Flags de Datadog proporcionan una forma unificada de controlar de forma remota la disponibilidad de funciones en su aplicación, experimentar de forma segura y ofrecer nuevas experiencias con confianza.

El SDK de Datadog Feature Flags para React Native está construido sobre [OpenFeature][1], un estándar abierto para la gestión de Feature Flags. Esta guía explica cómo instalar el SDK, configurar el proveedor de Datadog y evaluar Feature Flags en sus componentes de React Native.

## Requisitos {#requirements}

- **React Native** versión 0.65 o posterior
- **iOS** versión 13 o posterior
- **Android** nivel de API 23 o posterior
- **Datadog React Native SDK** (`@datadog/mobile-react-native`) debe inicializarse primero

## Instalación {#installation}

Instale el Datadog React Native SDK, el proveedor de OpenFeature y el OpenFeature React SDK utilizando su gestor de paquetes preferido:

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/mobile-react-native @datadog/mobile-react-native-openfeature @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/mobile-react-native @datadog/mobile-react-native-openfeature @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Configuración de iOS {#ios-setup}

Instale el pod añadido:

{{< code-block lang="bash" >}}
(cd ios && pod install)
{{< /code-block >}}

### Configuración de Android {#android-setup}

Si utiliza React Native versión 0.68 o superior, utilice Java 17. Si utiliza React Native versión 0.67 o inferior, utilice Java versión 11.

En su archivo `android/build.gradle`, especifique `kotlinVersion` para evitar conflictos entre las dependencias de Kotlin:

{{< code-block lang="groovy" filename="build.gradle" >}}
buildscript {
    ext {
        kotlinVersion = "1.8.21"
    }
}
{{< /code-block >}}

## Inicializar el SDK {#initialize-the-sdk}

El proveedor de OpenFeature de Datadog para React Native requiere que el SDK central de Datadog React Native se inicialice primero, seguido de habilitar Feature Flags. Para crear un token de cliente, consulte [Client tokens][2].

### Opción 1: Uso del componente DatadogProvider {#option-1-using-datadogprovider-component}

Si utiliza el componente `DatadogProvider` para la inicialización del SDK, habilite Feature Flags en la devolución de llamada `onInitialized`:

```tsx
import { DatadogProvider, DatadogProviderConfiguration, DdFlags } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature, OpenFeatureProvider } from '@openfeature/react-sdk';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    trackingConsent,
    {
      rumConfiguration: {
        applicationId: '<APPLICATION_ID>',
      },
      // ...
    },
);
config.site = '{{< region-param key="dd_site" code="true" >}}';

export default function App() {
    return (
        <DatadogProvider
            configuration={config}
            onInitialized={async () => {
                await DdFlags.enable();

                const provider = new DatadogOpenFeatureProvider();
                OpenFeature.setProvider(provider);
            }}
        >
            <OpenFeatureProvider>
                <Navigation />
            </OpenFeatureProvider>
        </DatadogProvider>
    );
}
```

### Opción 2: Uso de inicialización imperativa {#option-2-using-imperative-initialization}

Si inicializa el SDK de forma imperativa, habilite Feature Flags después de que se complete la inicialización:

```tsx
import { DdSdkReactNative, DdFlags, CoreConfiguration } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature } from '@openfeature/react-sdk';

(async () => {
    const config = new CoreConfiguration(
        '<CLIENT_TOKEN>',
        '<ENVIRONMENT_NAME>',
        '<APPLICATION_ID>'
    );
    config.site = '{{< region-param key="dd_site" code="true" >}}';

    await DdSdkReactNative.initialize(config);

    // Enable Feature Flags after core SDK initialization
    await DdFlags.enable();

    // Set the Datadog provider with OpenFeature
    const provider = new DatadogOpenFeatureProvider();
    OpenFeature.setProvider(provider);
})();
```

<div class="alert alert-info">El envío de datos de evaluación de Feature Flags a Datadog se habilita automáticamente al usar el SDK de Feature Flags. Proporcione <code>rumIntegrationEnabled</code> y <code>trackExposures</code> parámetros a la <code>DdFlags.enable()</code> llamada para configurar este comportamiento.</div>

## Establezca el contexto de evaluación {#set-the-evaluation-context}

Defina a quién o a qué se aplica la evaluación de las Feature Flags mediante un contexto de evaluación. El contexto de evaluación incluye información del usuario o de la sesión utilizada para determinar qué variaciones de los marcadores deben devolverse. Haga referencia a estos atributos en sus reglas de segmentación para controlar quién ve cada variante.

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/react-sdk';

const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  email: 'user@example.com',
  tier: 'premium',
};

OpenFeature.setContext(evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">El <code>targetingKey</code> se utiliza como sujeto de aleatorización para la segmentación basada en porcentajes. Cuando un Flag segmenta un porcentaje de sujetos (por ejemplo, 50%), el <code>targetingKey</code> determina en qué bucket cae un usuario. Los usuarios con el mismo <code>targetingKey</code> siempre reciben la misma variante para un Flag determinado.</div>

## Envuelva su aplicación {#wrap-your-application}

Envuelva su aplicación con el componente `OpenFeatureProvider`. Esto hace que Feature Flags estén disponibles para todos los componentes secundarios a través del contexto de React.

{{< code-block lang="tsx" >}}
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

El SDK de React de OpenFeature proporciona hooks para evaluar Feature Flags dentro de sus componentes. Cada hook devuelve el valor de Feature Flags según el contexto de evaluación que configuró. La evaluación de marcadores es _local e instantánea_: el SDK utiliza datos almacenados en caché localmente, por lo que no se producen solicitudes de red al evaluar marcadores.

### Marcadores booleanos {#boolean-flags}

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

### Marcadores de cadena {#string-flags}

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

### Marcadores de objeto {#object-flags}

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

Aquí tiene un ejemplo completo que muestra cómo configurar y usar Datadog Feature Flags en una aplicación React Native:

```tsx
import { Suspense } from 'react';
import { View } from 'react-native';
import { DatadogProvider, DatadogProviderConfiguration, DdFlags } from '@datadog/mobile-react-native';
import { DatadogOpenFeatureProvider } from '@datadog/mobile-react-native-openfeature';
import { OpenFeature, OpenFeatureProvider, useBooleanFlagValue } from '@openfeature/react-sdk';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    trackingConsent,
    {
      rumConfiguration: {
        applicationId: '<APPLICATION_ID>',
      },
      // ...
    },
);

// Wrap your app with the DatadogProvider and OpenFeatureProvider.
export default function AppWithProviders() {
    // Based on your auth state.
    const user = getCurrentUser();

    return (
        <DatadogProvider
            configuration={config}
            onInitialized={async () => {
                await DdFlags.enable();

                const provider = new DatadogOpenFeatureProvider();

                const evaluationContext = {
                    targetingKey: user.id,
                    region: user.country,
                };

                OpenFeature.setProvider(provider, evaluationContext);
            }}
        >
          <Suspense fallback={<Loading />}>
            <OpenFeatureProvider suspendUntilReady>
                <App />
            </OpenFeatureProvider>
          </Suspense>
        </DatadogProvider>
    );
}

// Use feature flags in your components
function App() {
    const showNewFeature = useBooleanFlagValue('new_feature', false);

    return (
        <View>
            {showNewFeature ? <NewFeature /> : <ExistingFeature />}
        </View>
    );
}
```

## Actualizar el contexto de evaluación {#update-the-evaluation-context}

Para actualizar el contexto de evaluación después de la inicialización (por ejemplo, cuando un usuario inicia sesión), use `OpenFeature.setContext()`:

{{< code-block lang="tsx" >}}
import { OpenFeature } from '@openfeature/react-sdk';

// When a user logs in
function onUserLogin(user) {
    OpenFeature.setContext({
        targetingKey: user.id,
        email: user.email,
        plan: user.plan,
    });
}
{{< /code-block >}}

## Configurar las opciones de Feature Flags {#configure-feature-flags-options}

Pase las opciones de configuración a `DdFlags.enable()` para personalizar el comportamiento de las Feature Flags:

{{< code-block lang="tsx" >}}
await DdFlags.enable({
    // Send flag evaluation data to RUM for session analysis (default: true)
    rumIntegrationEnabled: true,
    // Track flag exposures for analytics (default: true)
    trackExposures: true,
});
{{< /code-block >}}

`rumIntegrationEnabled`
: Cuando `true` (predeterminado), las evaluaciones de marcadores se rastrean en RUM, lo que permite correlacionarlos con las sesiones de usuario. Esto permite análisis como _“¿Los usuarios en la variante B experimentan más errores?”_.

`trackExposures`
: Cuando `true` (predeterminado), el SDK registra automáticamente un _evento de exposición_ cuando se evalúa Feature Flags. Estos eventos contienen metadatos sobre qué marcador se accedió, qué variante se entregó y bajo qué contexto. Se envían a Datadog para que pueda analizar la adopción de funciones.

## Requisitos de atributos de contexto {#context-attribute-requirements}

<div class="alert alert-warning">
Los atributos del contexto de evaluación deben ser valores primitivos planos (cadenas, números, booleanos). Los objetos y arreglos anidados <strong>no son compatibles</strong> y se eliminarán del contexto de evaluación.
</div>

Utilice atributos planos en su contexto de evaluación:

{{< code-block lang="javascript" >}}
OpenFeature.setContext({
    targetingKey: 'user-123',
    userId: 'user-123',
    tier: 'premium',
    age: 25
});
{{< /code-block >}}

Evite objetos y arreglos anidados:

{{< code-block lang="javascript" >}}
// These attributes will be dropped from the evaluation context with a console warning.
OpenFeature.setContext({
    targetingKey: 'user-123',
    user: { id: 'user-123' },        // nested object - NOT SUPPORTED
    features: ['beta', 'analytics']  // array - NOT SUPPORTED
});
{{< /code-block >}}

## Pruebas {#testing}

Puede realizar pruebas en un entorno de prueba de Datadog dedicado con el `DatadogOpenFeatureProvider` real, o cambiarlo por el `TypedInMemoryProvider` de OpenFeature para controlar los valores de Feature Flags directamente en el código de prueba. Esta sección muestra el enfoque en memoria, que mantiene las pruebas herméticas y sin conexión. `TypedInMemoryProvider` se exporta desde `@openfeature/web-sdk`, que ya está instalado para las Feature Flags de React Native.

{{< code-block lang="tsx" >}}
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { OpenFeature, OpenFeatureProvider, useBooleanFlagValue } from '@openfeature/react-sdk';
import { TypedInMemoryProvider } from '@openfeature/web-sdk';

const flags = {
    new_checkout_button: {
        variants: { on: true, off: false },
        defaultVariant: 'on',
        disabled: false,
    },
};

beforeEach(async () => {
    await OpenFeature.setProviderAndWait(new TypedInMemoryProvider(flags));
});

afterAll(async () => {
    await OpenFeature.close();
});

function CheckoutButton() {
    const enabled = useBooleanFlagValue('new_checkout_button', false);
    return <Text>{enabled ? 'New checkout' : 'Legacy checkout'}</Text>;
}

test('new checkout button is enabled', () => {
    render(
        <OpenFeatureProvider>
            <CheckoutButton />
        </OpenFeatureProvider>
    );

    expect(screen.getByText('New checkout')).toBeTruthy();
});
{{< /code-block >}}

La estructura de Feature Flags del Web SDK requiere `variants`, `defaultVariant` y `disabled`. Utilice `setProviderAndWait` antes de renderizar los componentes para que los hooks no se evalúen con el proveedor predeterminado.

## Solución de problemas {#troubleshooting}

### No se devolvieron Feature Flags {#no-flags-returned}

Si las evaluaciones de las Feature Flags devuelven valores predeterminados:

1. Verifique que el SDK de Datadog para React Native esté inicializado antes de llamar a `DdFlags.enable()`.
2. Confirme que `DdFlags.enable()` se completó antes de configurar el proveedor de OpenFeature.
3. Compruebe que el contexto de evaluación esté configurado antes de evaluar Feature Flags.
4. Confirme que la Feature Flag existe y está habilitada en su panel de control de Datadog Feature Flags.

### Errores de pod install en iOS {#ios-pod-install-errors}

Si tiene `use_frameworks!` habilitado en su `Podfile`, es posible que vea errores durante `pod install`. Edite su `Podfile` para instalar el pod del SDK como una biblioteca estática:

{{< code-block lang="ruby" filename="Podfile" >}}
static_libraries = ['DatadogSDKReactNative']

pre_install do |installer|
  installer.pod_targets.each do |pod|
    if static_libraries.include?(pod.name)
      def pod.static_framework?;
        true
      end
      def pod.build_type;
        Pod::BuildType.static_library
      end
    end
  end
end
{{< /code-block >}}

### Error de Feature Flags no inicializados {#feature-flags-not-initialized-error}

Si ve un error sobre que las Feature Flags no están inicializadas, verifique el orden de inicialización:

1. Inicialice primero el SDK central de Datadog React Native (`DdSdkReactNative.initialize()` o `DatadogProvider`).
2. Llame a `DdFlags.enable()` después de la inicialización del SDK.
3. Cree y configure `DatadogOpenFeatureProvider` después de habilitar las Feature Flags.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /es/account_management/api-app-keys/#client-tokens
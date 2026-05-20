---
description: Configura indicadores de funciones de Datadog para aplicaciones JavaScript
  de navegador.
further_reading:
- link: /feature_flags/client/
  tag: Documentación
  text: Indicadores de funciones del lado del cliente
- link: https://openfeature.dev/docs/reference/sdks/client/web/
  tag: OpenFeature
  text: Kit de desarrollo de software (SDK) web de OpenFeature
- link: /real_user_monitoring/application_monitoring/browser/
  tag: Documentación
  text: Monitorización del navegador
title: Indicadores de funciones de JavaScript
---

## Información general

En esta page (página) se describe cómo instrumentar tu aplicación JavaScript de navegador con los el kit de desarrollo de software (SDK) de indicadores de funciones de Datadog. Los indicadores de funciones de Datadog proporcionan una forma unificada de controlar remotamente la disponibilidad de funciones en tu aplicación, experimentar de forma segura y ofrecer nuevas experiencias con confianza.

El kit de desarrollo de software (SDK) de indicadores de funciones de Datadog para JavaScript se compila en [OpenFeature][1], un estándar abierto para la gestión de indicadores de funciones. En esta guía se explica cómo instalar el kit de desarrollo de software (SDK), configurar el proveedor Datadog y evaluar los indicadores en tu aplicación.

## Instalación

Instala el proveedor OpenFeature y el kit de desarrollo de software (SDK) de OpenFeature Web de Datadog utilizando tu gestor de paquetes preferido:

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

## Inicializar el proveedor

Crea una instancia de `DatadogProvider` con tus credenciales de Datadog:

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});
```

## Definir el contexto de evaluación

Define a quién o a qué se aplica la evaluación del indicador utilizando un contexto de evaluación. El contexto de evaluación incluye información del usuario o de la sesión que se utiliza para determinar qué variantes del indicador deben devolverse. Haz referencia a estos atributos en tus reglas de orientación para controlar quién ve cada variante.

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  user_role: 'admin',
  email: 'user@example.com',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">La <code>targetingKey</code> se utiliza como sujeto de aleatorización para la orientación basada en el porcentaje. Cuando un indicador se dirige a un porcentaje de sujetos (por ejemplo, 50 %), la <code>targetingKey</code> determina en qué "bucket" cae un usuario. Los usuarios con la misma <code>targetingKey</code> siempre reciben la misma variante para un indicador determinado.</div>

## Evaluar indicadores

Una vez inicializado el proveedor, puedes evaluar los indicadores en cualquier lugar de tu aplicación. La evaluación de los indicadores es _local e instantánea_: el kit de desarrollo de software (SDK) utiliza datos almacenados en caché local, por lo que no se producen solicitudes de red al evaluar los indicadores.

### Conseguir un cliente

Recuperar el cliente OpenFeature para evaluar los indicadores:

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
{{< /code-block >}}

### Indicadores booleanos

Utiliza `getBooleanValue(key, defaultValue)` para los indicadores que representan condiciones de activado/desactivado o true/false:

{{< code-block lang="javascript" >}}
const isNewCheckoutEnabled = client.getBooleanValue('checkout_new', false);

if (isNewCheckoutEnabled) {
  showNewCheckoutFlow();
} else {
  showLegacyCheckout();
}
{{< /code-block >}}

### Indicadores de cadena

Utiliza `getStringValue(key, defaultValue)` para los indicadores que seleccionan entre múltiples variantes o cadenas de configuración:

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

### Indicadores numéricos

Utiliza `getNumberValue(key, defaultValue)` para indicadores numéricos como límites, porcentajes o multiplicadores:

{{< code-block lang="javascript" >}}
const maxItems = client.getNumberValue('cart_items_max', 20);
const priceMultiplier = client.getNumberValue('pricing_multiplier', 1.0);
{{< /code-block >}}

### Indicadores de objetos

Utiliza `getObjectValue(key, defaultValue)` para los datos de configuración estructurados:

{{< code-block lang="javascript" >}}
const config = client.getObjectValue('promo_banner_config', {
  color: '#00A3FF',
  message: 'Welcome!',
});
{{< /code-block >}}

### Detalles de la evaluación de indicadores

Si necesitas algo más que el valor del indicador, utiliza los métodos detallados. Estos devuelven el valor evaluado y los metadatos que explican la evaluación:

{{< code-block lang="javascript" >}}
const details = client.getBooleanDetails('checkout_new', false);

console.log(details.value);       // Valor (true o false)
console.log(details.variant);     // Nombre de la variante, si correspondiera
console.log(details.reason);      // ¿Por qué se seleccionó este valor?
console.log(details.errorCode);   // Código de error, si falló la evaluación
{{< /code-block >}}

## Ejemplo completo

Este es un ejemplo completo en el que se muestra cómo configurar y utilizar indicadores de funciones de Datadog en una aplicación JavaScript:

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

## Actualizar el contexto de evaluación

Para actualizar el contexto de evaluación después de la inicialización (por ejemplo, cuando un usuario inicia sesión), utiliza `OpenFeature.setContext()`:

{{< code-block lang="javascript" >}}
await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
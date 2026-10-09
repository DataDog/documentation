---
description: Utilice DatadogCoreProvider para configuraciones de navegador avanzadas
  con configuración administrada por la aplicación y ganchos de seguimiento opcionales.
further_reading:
- link: /feature_flags/client/javascript/
  tag: Documentación
  text: Feature Flags de JavaScript
- link: /feature_flags/concepts/evaluation_context/
  tag: Documentación
  text: Contexto de evaluación
- link: /feature_flags/concepts/distribution_channels/
  tag: Documentación
  text: Canales de distribución
title: Evaluación basada en reglas del navegador
---
## Descripción general {#overview}

**Utilice `DatadogProvider` para la mayoría de las aplicaciones de navegador.** Gestiona la obtención de configuración, actualizaciones de contexto y telemetría integrada. Siga [JavaScript Feature Flags][1] para esa configuración.

`DatadogCoreProvider` es un proveedor avanzado compatible con OpenFeature que evalúa las configuraciones suministradas por su aplicación. No obtiene ni sondea la configuración, instala ganchos de seguimiento ni envía telemetría. Con la configuración basada en reglas, evalúa las reglas de segmentación localmente cuando cambia el contexto de OpenFeature, sin obtener nuevas asignaciones.

## Cuándo usar este enfoque {#when-to-use-this-approach}

Elija `DatadogCoreProvider` cuando su aplicación necesite una o más de estas capacidades:

- Evaluar reglas de segmentación para contextos cambiantes sin una solicitud de configuración para cada cambio de contexto.
- Suministrar configuración a través de una ruta de entrega controlada por la aplicación, como una carga útil de arranque renderizada por el servidor.
- Controlar las actualizaciones de configuración y componer solo las integraciones de seguimiento que la aplicación necesita.

Su aplicación posee la disponibilidad de la configuración, la frescura y el ciclo de vida del seguimiento.

## Requisitos previos {#prerequisites}

- Instale `@datadog/openfeature-browser` 2.0.0 o posterior, `@openfeature/web-sdk` y `@openfeature/core`, siguiendo las [instrucciones de instalación de JavaScript][2]. Los ejemplos utilizan importaciones de paquetes npm.
- Para obtener reglas de Datadog, proporcione un [token de cliente][3], nombre de entorno y sitio de Datadog.
- Habilitar la entrega de reglas de cliente para su organización requiere el permiso **Feature Flag Environment Config Write**. Este permiso no es necesario para usar el SDK si la configuración ya está habilitada. Consulte [Permisos y Access Control][9].
- Distribuya solo las flags apropiadas para el navegador al **Client** [canal de distribución][4].

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Los Browser Feature Flags no son compatibles con el <a href="/getting_started/site">Datadog site</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

<div class="alert alert-warning">La configuración entregada a un navegador es inspeccionable, incluidas las reglas de segmentación y los valores que contiene. Mantenga las decisiones de configuración y autorización confidenciales en el servidor. Las Feature Flags del lado del cliente no son un mecanismo de Access Control.</div>

## Primeros pasos {#getting-started}

Para aplicaciones de navegador que cambian el contexto de evaluación repetidamente durante una sesión, use `fetchRulesConfiguration()` con `DatadogCoreProvider`. Cargue las reglas una vez y luego reutilice el proveedor y la configuración para evaluaciones y cambios de contexto posteriores.

La facturación de Feature Flags cuenta [Monthly Flag Configuration Requests (MFCR)][7], no las evaluaciones locales. La obtención inicial de reglas y las actualizaciones posteriores cuentan para las MFCR; los cambios de contexto locales no.

### Habilitar la entrega de reglas de cliente {#enable-client-rules-delivery}

Antes de obtener las reglas, habilite la entrega de reglas de cliente para su organización. Esta configuración está deshabilitada de forma predeterminada.

1. Abra **Feature Flags** > **Configuración** > [**Entrega de Feature Flags**][8].
2. Habilite **Permitir la evaluación de reglas locales en client SDKs**.
3. Haga clic en **Guardar**.

Esta configuración es independiente del [**Cliente** canal de distribución][4] por flag. La configuración estándar precalculada `DatadogProvider` no la requiere.

### Obtenga las reglas e inicialice {#fetch-rules-and-initialize}

Importe `DatadogCoreProvider` y `fetchRulesConfiguration` desde `@datadog/openfeature-browser/rules-based`. Obtenga las reglas y valide el resultado antes de proporcionarlo al proveedor:

```javascript
import {
  DatadogCoreProvider,
  fetchRulesConfiguration,
} from '@datadog/openfeature-browser/rules-based';
import { OpenFeature } from '@openfeature/web-sdk';

const configurationOptions = {
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
};

async function loadRulesConfiguration() {
  const configuration = await fetchRulesConfiguration(configurationOptions);
  if (!configuration.rules) {
    throw new Error(configuration.rulesError ?? 'Expected a rules-based configuration');
  }
  return configuration;
}

const configuration = await loadRulesConfiguration();
const provider = new DatadogCoreProvider();
provider.setConfiguration(configuration);

const domain = 'browser-flags';
await OpenFeature.setProviderAndWait(domain, provider, {
  targetingKey: 'user-123',
  plan: 'free',
});

const client = OpenFeature.getClient(domain);
const enabled = client.getBooleanValue('checkout_new', false);
```

El asistente de obtención realiza la solicitud de configuración. El registro del proveedor y la evaluación de la Feature Flag no obtienen la configuración. El asistente también acepta una implementación de `fetch` y un `signal` de cancelación para el transporte controlado por la aplicación.

Detecte los errores de inicialización en el flujo de inicio de su aplicación y decida si desea reintentar o continuar con el comportamiento predeterminado. No asuma que el proveedor está listo si `setProviderAndWait()` rechaza.

### Cambie el contexto de evaluación {#change-the-evaluation-context}

Utilice el mismo dominio al actualizar el contexto:

{{< code-block lang="javascript" >}}
await OpenFeature.setContext(domain, {
  targetingKey: 'user-456',
  plan: 'premium',
});

const enabledForUpdatedContext = client.getBooleanValue('checkout_new', false);
{{< /code-block >}}

La configuración de las reglas permanece en la memoria y se evalúa con respecto al nuevo contexto. No llame a `loadRulesConfiguration()` de nuevo para cada cambio de contexto. No se realiza ninguna solicitud de configuración. Los ganchos de seguimiento opcionales aún pueden enviar telemetría para las evaluaciones.

Utilice [atributos de contexto planos][5] y proporcione explícitamente los atributos necesarios para la segmentación. `DatadogCoreProvider` no copia automáticamente los atributos de usuario de RUM.

## Actualizar la configuración {#refresh-configuration}

El proveedor no sondea los cambios de las Feature Flags. Elija cuándo la aplicación actualiza la configuración y, a continuación, reemplácela antes de las evaluaciones posteriores:

{{< code-block lang="javascript" >}}
try {
  const nextConfiguration = await loadRulesConfiguration();
  provider.setConfiguration(nextConfiguration);
} catch (error) {
  console.warn('Could not refresh flag configuration; keeping the previous configuration.', error);
}
{{< /code-block >}}

Si la obtención o el parseo fallan, el proveedor continúa utilizando la configuración anterior. El ejemplo registra el error; añada reintentos según los requisitos de frescura de su aplicación. Los cambios realizados en Datadog no llegan a este proveedor hasta que la aplicación proporciona la configuración actualizada.

## Opcional: proporcionar configuración portátil {#optional-supply-portable-configuration}

En lugar de obtener las reglas en el navegador, su aplicación puede entregar una configuración de reglas serializada. Cree esta cadena llamando a `configurationToString(configuration)` en una configuración de reglas que ya haya obtenido. Importe este asistente desde `@datadog/openfeature-browser/rules-based`.

Entregue la cadena resultante al navegador a través de su aplicación, por ejemplo, en una carga útil de arranque renderizada por el servidor. Reemplace `<SERIALIZED_RULES_CONFIGURATION>` a continuación con esa cadena y use este código en lugar de la llamada `loadRulesConfiguration()` en el ejemplo de inicialización:

{{< code-block lang="javascript" >}}
import { configurationFromString } from '@datadog/openfeature-browser/rules-based';

const configuration = configurationFromString('<SERIALIZED_RULES_CONFIGURATION>');
if (!configuration.rules) {
  throw new Error(configuration.rulesError ?? 'Expected a rules-based configuration');
}
{{< /code-block >}}

La cadena serializada no es la respuesta binaria sin procesar del punto de conexión de reglas. Use el mecanismo de serialización segura del marco de trabajo al incrustar la configuración en HTML. El parseo y la provisión de la cadena no realizan una solicitud de configuración.

### Configuraciones precalculadas {#precomputed-configurations}

La configuración precalculada contiene asignaciones para un contexto específico, no reglas que puedan ser reevaluadas para diferentes contextos. Si la proporciona a `DatadogCoreProvider`, pase el contexto devuelto por `getPrecomputedContext(configuration)` a `setProviderAndWait()`. Un contexto que no coincide provoca un error de contexto no válido; el proveedor no obtiene asignaciones de reemplazo.

## Agregue ganchos de seguimiento opcionales {#add-optional-tracking-hooks}

El proveedor realiza evaluaciones sin seguimiento de forma predeterminada. Agregue solo las integraciones que la aplicación necesite:

| Factory | Behavior |
| --- | --- |
| `createDatadogExposureLoggingHook(trackingOptions)` | Elimina duplicados y procesa por lotes los eventos de exposición elegibles. |
| `createDatadogEvaluationLoggingHook(trackingOptions)` | Agrega y envía telemetría de evaluación de Feature Flags. |
| `createDatadogRumTrackingHook()` | Agrega evaluaciones de Feature Flags a una instancia global `DD_RUM` existente. No inicializa RUM ni completa el contexto de evaluación. |

Use `composeDatadogTrackingHooks()` para inicializar y cerrar las integraciones seleccionadas juntas. Registre sus hooks en el Client desde el ejemplo de inicialización antes de las evaluaciones que necesiten seguimiento:

```javascript
import {
  composeDatadogTrackingHooks,
  createDatadogExposureLoggingHook,
  createDatadogEvaluationLoggingHook,
  createDatadogRumTrackingHook,
} from '@datadog/openfeature-browser/rules-based';

const trackingOptions = {
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
  service: '<SERVICE_NAME>',
};

const tracking = composeDatadogTrackingHooks(
  createDatadogExposureLoggingHook(trackingOptions),
  createDatadogEvaluationLoggingHook(trackingOptions),
  createDatadogRumTrackingHook(),
);

await tracking.initialize();
client.addHooks(...tracking.hooks);

const trackedValue = client.getBooleanValue('checkout_new', false);
```

Estos hooks se ejecutan solo para las evaluaciones realizadas a través de esta instancia de Client. Continúe usando el mismo Client para las evaluaciones con seguimiento. Omita la importación y la llamada de fábrica de una integración para excluirla. El seguimiento de RUM requiere que [Browser RUM][6] esté disponible como `DD_RUM` y puede aumentar el conteo de eventos facturados por RUM.

Los hooks de exposición y evaluación no recopilan eventos hasta que `initialize()` se completa. Los eventos de exposición se agrupan y deduplican, por lo que una evaluación repetida podría no crear otra solicitud de exposición.

Cuando ya no se necesite el seguimiento, cancele el registro de los hooks y cierre sus recursos:

{{< code-block lang="javascript" >}}
client.clearHooks();
await tracking.shutdown();
{{< /code-block >}}

`clearHooks()` elimina **todos los hooks a nivel de Client** de este Client; este ejemplo asume que el Client está dedicado a esta configuración de seguimiento. No elimina los hooks globales o del proveedor. `shutdown()` solicita un vaciado final y detiene los temporizadores y suscripciones de seguimiento; el retorno no garantiza que cada solicitud de red se haya completado. Borrar los hooks o eliminar el proveedor principal por sí solo no cierra los recursos de seguimiento creados manualmente.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/feature_flags/client/javascript/
[2]: /es/feature_flags/client/javascript/#installation
[3]: /es/account_management/api-app-keys/#client-tokens
[4]: /es/feature_flags/concepts/distribution_channels/
[5]: /es/feature_flags/concepts/evaluation_context/#context-attributes
[6]: /es/real_user_monitoring/application_monitoring/browser/
[7]: /es/feature_flags/concepts/monthly_flag_configuration_requests/
[8]: https://app.datadoghq.com/feature-flags/settings/flag-delivery
[9]: /es/feature_flags/concepts/permissions/
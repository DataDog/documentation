---
aliases:
- /es/real_user_monitoring/guide/remote-config-launchdarkly/
beta: false
description: Aprende a configurar RUM con LaunchDarkly para configurar de forma remota
  los muestreos RUM.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualizar tus datos RUM en el RUM Explorer
private: true
title: Configurar RUM de forma remota con LaunchDarkly
---

## Información general
Al instrumentar una [aplicación RUM][1], puedes controlar de forma remota las configuraciones de inicialización de RUM en función de tus necesidades inmediatas, como una incidencia en curso en la que podrías necesitar datos de mayor fidelidad.

En lugar de tener que desplegar los cambios en tus configuraciones de inicialización RUM, puedes utilizar indicadores de características. Las empresas de gestión de indicadores de características como [LaunchDarkly][2] evalúan los indicadores de características en el lado del servidor y, por lo tanto, te permiten realizar cambios en tu código sin necesidad de volver a desplegarlo.

## Configuración de indicadores en LaunchDarkly
Para configurar tus indicadores en LaunchDarkly, empieza por seguir su documentación sobre la [configuración de un SDK][3]. Para más detalles, consulta [Documentación del SDK del lado del cliente][4] de LaunchDarkly.

LaunchDarkly admite indicadores multivariantes, lo que te permite personalizar el número y los tipos de variaciones que devuelven. Los tipos de indicadores multivariantes incluyen:

- **Indicadores de cadena**: utilizados frecuentemente para pasar valores simples de configuración o incluso contenido.
- **Indicadores numéricos**: utilizados frecuentemente para pasar valores numéricos simples de configuración.
- **Indicadores JSON**: pueden utilizarse para pasar objetos complejos de configuración o incluso contenido estructurado.

### Opciones de indicadores de características

Esta guía aborda dos maneras en las que puedes configurar tus indicadores de función para modificar tu configuración RUM remotamente:

1. Crea un indicador de función para cada **parámetro individual** que desees configurar.
2. Crea un indicador de características para la **configuración RUM completa**.

**Consejo**: utilizar la primera opción para crear indicadores individuales para cada parámetro puede darte un control más preciso sobre tu configuración RUM. Crear un indicador de características para toda la configuración RUM puede dar lugar a muchas variantes diferentes que pueden ser más difíciles de controlar y causar sobrecarga a tus desarrolladores para determinar cuáles son las diferencias específicas entre ellas.

### Opción de parámetro individual

En el ejemplo siguiente, se crea un indicador de característica para un parámetro individual, `sessionSampleRate`, de la configuración RUM.

1. Crea un nuevo indicador de característica en LaunchDarkly y proporciónale un nombre y una clave.

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-sample-rate-new-flag.png" alt="Crea un nuevo indicador para la frecuencia de muestreo de RUM en LaunchDarkly" style="width:75%;">}}

2. Especifica las variaciones del indicador. Para el parámetro `sessionSampleRate`, querrás pasar un valor numérico, por lo que puedes elegir que el tipo de indicador sea Number (Numérico) y añadir las Sample Rates (Frecuencias de muestreo) que desees como valor en los campos de variación.

   **Nota:** Si lo deseas, puedes crear múltiples variaciones de indicadores diferentes. No te preocupes por añadir todas las posibles frecuencias de muestreo que puedas querer ahora. Siempre puedes añadir una nueva variación de valores más adelante.

   {{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-sample-rate-flag-setup.png" alt="Añadir variantes para la frecuencia de muestreo en LaunchDarkly" style="width:75%;">}}

3. Establece tus reglas por defecto. En el ejemplo siguiente, la "Frecuencia de muestreo predeterminada" se establece cuando el indicador de función está desactivado y la "Frecuencia de muestreo de alta fidelidad" cuando el indicador de función está activado.

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-flag-targeting-rules.png" alt="Establece tus reglas predeterminadas en LaunchDarkly" style="width:75%;">}}

### Opción de configuración RUM completa

En este ejemplo, se crea un indicador de característica para el objeto de configuración RUM completa.

1. Crea un nuevo indicador de característica en LaunchDarkly y proporciónale un nombre y una clave.

   {{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-configuration-new-flag.png" alt="Crear un nuevo indicador para la configuración RUM en LaunchDarkly" style="width:75%;">}}

2. Modifica las variaciones del indicador. Para la [Configuración RUM][5], querrás pasar un objeto, por lo que puedes elegir el tipo de indicador JSON, añadir las configuraciones que te gustarían como los valores, y modificar el JSON a un objeto en nuestro código más tarde.

   **Nota:** Puedes crear múltiples variaciones diferentes de indicadores si lo deseas. No te preocupes por añadir todas las configuraciones posibles que quieras, siempre puedes entrar y añadir una nueva variación de valores cuando quieras.

   {{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/launchdarkly-rum-configuration-flag-setup.png" alt="Añadir variantes para la configuración RUM en LaunchDarkly" style="width:75%;">}}

3. Establece tus reglas por defecto. La "Configuración predeterminada" se establece cuando el indicador de característica está desactivado y la "Configuración de alta fidelidad" cuando el indicador de característica está activado.

## Añadir tu indicador de característica a tu configuración RUM
Una vez que hayas configurado con LaunchDarkly como se mencionó [arriba][7], hayas instalado las dependencias e [inicializado el cliente LaunchDarkly][8]
, puedes añadir la evaluación del indicador de característica en el código de Datadog. Puedes leer más sobre la evaluación de indicadores en LaunchDarkly [aquí][9].

### Opción de parámetro individual

Antes de inicializar el SDK de RUM para un parámetro individual, es necesario evaluar primero tus indicadores de características de LaunchDarkly.

En este ejemplo, puedes añadir una evaluación en JS como el siguiente fragmento de código.

```javascript
const RUM_sample_rate = client.variation('rum-sample-rate-configuration', false);
```
A continuación, añade esto a tu inicialización RUM:

```javascript
datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  service: 'my-web-application',
  env: 'production',
  version: '1.0.0',
  sessionSampleRate: RUM_sample_rate,
  sessionReplaySampleRate: 100,
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
})
```

### Opción de configuración RUM completa

Antes de inicializar el SDK de RUM, necesitas evaluar primero tus indicadores de característica de LaunchDarkly. Por ejemplo, en JS puedes añadir una evaluación como esta:

```javascript
const RUM_configuration = client.variation('rum-configuration', false);
```

Sin embargo, antes de que puedas pasar la configuración para inicializar RUM, tendrás que crear un objeto a partir del valor JSON del indicador. Una vez hecho esto, puedes inicializar el SDK de RUM.

```javascript
datadogRum.init(RUM_configuration_object)
```

## Integrar controles de LaunchDarkly para configurar RUM directamente en tus dashboards
Si deseas cambiar tu configuración RUM directamente en tu aplicación de Datadog, puedes integrar la interfaz de usuario de LaunchDarkly en Datadog y activar/desactivar tu indicador de característica. Los indicadores de características están configurados para que puedas mantenerlos desactivados, con los valores por defecto. Cuando desees tener datos de mayor fidelidad, puedes activar tu indicador de característica, y los valores que estableces para la variación ON se utilizarán para la inicialización de RUM.

La integración de la aplicación Datadog de LaunchDarkly integra la interfaz de usuario de la gestión de indicadores de características como un widget de dashboard. Puedes utilizar este widget para alternar los indicadores de características sin salir de Datadog. Puedes integrar el widget de LaunchDarkly dentro de un dashboard nuevo o existente que muestre las métricas clave. Si se produce una incidencia o un pico de errores, puedes alternar el indicador de característica para tu configuración RUM desde Datadog para comenzar a muestrear más datos y garantizar que tus equipos tengan acceso a la información que necesitan para abordar y resolver el problema.

{{< img src="real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly/datadog-launchdarkly-ui-widget.png" alt="Widget de integración de Datadog y la interfaz de usuario de LaunchDarkly" style="width:100%;">}}

Si necesitas cambiar los valores que estableciste originalmente para tu configuración, puedes actualizar tu indicador dentro de LaunchDarkly en cualquier momento. Después de guardar los cambios, todas las nuevas evaluaciones del indicador tendrán los valores actualizados.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser#setup
[2]: https://launchdarkly.com/
[3]: https://docs.launchdarkly.com/home/getting-started/setting-up
[4]: https://docs.launchdarkly.com/sdk/client-side
[5]: /es/real_user_monitoring/browser#setup
[6]: https://docs.launchdarkly.com/sdk/features/evaluating
[7]: #setting-up-your-flag-in-launchdarkly
[8]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client
[9]: https://docs.launchdarkly.com/sdk/features/evaluating
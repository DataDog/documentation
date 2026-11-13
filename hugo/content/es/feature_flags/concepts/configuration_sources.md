---
description: Comprenda cómo los SDK del lado del servidor de Feature Flags de Datadog
  reciben la configuración de los flags.
further_reading:
- link: /feature_flags/server/
  tag: Documentación
  text: Configure Feature Flags del lado del servidor
- link: /feature_flags/implementation_patterns/serverless/
  tag: Documentación
  text: Utilice Feature Flags en entornos serverless
- link: /remote_configuration/
  tag: Documentación
  text: Obtenga información sobre Remote Configuration
title: Fuentes de configuración del SDK del servidor
---
Los [SDK del lado del servidor][3] de Feature Flags de Datadog evalúan los flags localmente a partir de la configuración de los flags. La _fuente de configuración_ determina cómo recibe el SDK dicha configuración; no cambia la semántica de evaluación de OpenFeature.

## Elija una fuente de configuración {#choose-a-configuration-source}

Estas opciones de fuente de configuración están disponibles para los SDK del lado del servidor compatibles:

`agentless`
: El SDK obtiene periódicamente la configuración de los flags desde la CDN gestionada por Datadog a través de HTTPS.
  - El sondeo comienza cuando el código de la aplicación inicializa o accede al proveedor OpenFeature de Datadog.
  - No se requiere un Datadog Agent para la configuración de los flags.

`remote_config`
: El Datadog Agent recibe la configuración de los flags a través de Remote Configuration y la entrega al SDK.
  - Seleccionar `remote_config` activa la suscripción de Remote Configuration para Feature Flags.
  - Requiere un Datadog Agent con Remote Configuration habilitado.

La entrega Agentless es el valor predeterminado en [versiones de SDK compatibles](#use-agentless-delivery). Otros SDK del lado del servidor utilizan [Agent Remote Configuration](#use-agent-remote-configuration) para la entrega de flags.

Establezca `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` solo cuando desee seleccionar una fuente explícitamente:

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless
{{< /code-block >}}

El SDK resuelve la fuente una vez durante la inicialización. Reinicie la aplicación para cambiar las fuentes.

## Utilice la entrega Agentless {#use-agentless-delivery}

Para comenzar con la entrega Agentless, utilice una de estas versiones mínimas:

| SDK | Versión mínima |
|---|---|
| Java `dd-openfeature` y `dd-java-agent` | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |
| Python `ddtrace` | 4.14.0 |

La entrega por CDN para Java requiere `dd-openfeature` y `dd-java-agent`. No requiere un Datadog Agent para la configuración de los flags.

Configure la clave de API, el sitio de Datadog y el entorno en el proceso de la aplicación:

{{< code-block lang="bash" >}}
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

Luego, inicialice o acceda al proveedor de OpenFeature de Datadog en el código de la aplicación. Consulte las instrucciones de configuración para [Java][4], [Node.js][2] o [Python][5].

No se requiere una fuente de configuración ni una configuración de habilitación del proveedor. El sondeo comienza solo cuando el código de la aplicación inicializa o accede al proveedor; instalar o inicializar el rastreador por sí solo no genera tráfico de CDN de Feature Flags.

<div class="alert alert-warning">Las versiones iniciales de Node.js sin agente solo admiten la entrega de configuración y la evaluación local de flags. No exportan métricas de evaluación ni eventos de exposición. La entrega sin agente para Java y Python solo cambia la fuente de configuración. Java y Python no exportan estas señales sin un Datadog Agent compatible o una ruta de telemetría sin servidor.</div>

### Configure la entrega Agentless {#configure-agentless-delivery}

Establezca `DD_SITE` en el sitio de Datadog de su organización. Para el sitio seleccionado en esta página de documentación, utilice {{< region-param key="dd_site" code="true" >}}. La fuente sin agente también admite estos ajustes operativos:

| Variable de entorno | Valor predeterminado | Descripción |
|---|---|---|
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL` | Punto de conexión administrado por Datadog | Anula el punto de conexión de configuración de flags sin agente o la URL base. Consulte [Uso de un punto de conexión personalizado sin agente](#use-a-custom-agentless-endpoint). |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_POLL_INTERVAL_SECONDS` | `30` | Entero positivo que establece el tiempo entre intentos de sondeo completados. Java no limita los intentos, mientras que Node.js y Python limitan los valores a 3600 segundos. |
| `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_REQUEST_TIMEOUT_SECONDS` | `5` | Entero positivo que establece el tiempo de espera para una solicitud de configuración individual. |

El SDK obtiene la configuración en segundo plano y evalúa las flags localmente. Las evaluaciones de flags individuales no realizan solicitudes de red. La fuente sin agente hace lo siguiente:

- Realiza sondeos cada 30 segundos de forma predeterminada
- Utiliza un tiempo de espera de solicitud de 5 segundos de forma predeterminada
- Utiliza ETags para evitar la descarga de configuraciones sin cambios
- Conserva la última configuración aceptada durante errores temporales de red o de carga útil
- Evita sondeos superpuestos

La CDN administrada por Datadog utiliza puntos de presencia distribuidos globalmente, interconexión de redes y enrutamiento redundante. Por lo tanto, es probable que las ubicaciones de servicio estén geográficamente cerca de la mayoría de las cargas de trabajo de las aplicaciones.

Mantenga `DD_API_KEY` en un administrador de secretos y expóngalo solo al proceso de la aplicación que carga la configuración de flags. La entrega de configuración Agentless envía la clave de API directamente desde la aplicación a Datadog a través de HTTPS.

### Utilice un punto de conexión sin agente personalizado {#use-a-custom-agentless-endpoint}

Se recomienda el punto de conexión administrado por Datadog para implementaciones estándar. Para pruebas avanzadas, desarrollo local o un proxy administrado por el operador, sobrescríbalo con `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL`:

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_BASE_URL=http://localhost:8080
{{< /code-block >}}

La URL personalizada debe usar HTTP o HTTPS. Si solo contiene un origen o una ruta raíz, el SDK añade la ruta de configuración de flags estándar. Si contiene una ruta que no es raíz, el SDK utiliza esa ruta como el punto de conexión completo.

El SDK envía `DD_API_KEY` solo a través de HTTPS al punto de conexión predeterminado administrado por Datadog. Nunca reenvía la clave de Datadog API a un punto de conexión personalizado. Los puntos de conexión personalizados pueden usar HTTP para el desarrollo local controlado; use HTTPS para cualquier punto de conexión fuera del entorno de desarrollo local.

Si la configuración del punto de conexión personalizado no es válida, el SDK mantiene el proveedor deshabilitado, registra el error de configuración y las evaluaciones devuelven los valores predeterminados proporcionados por el llamador.

La entrega sin agente administrada por Datadog no está disponible para Datadog for Government en las versiones de SDK compatibles. Las aplicaciones en ese sitio continúan usando los valores predeterminados proporcionados por el llamador a menos que utilicen Agent Remote Configuration.

### Migre una configuración de Remote Configuration existente {#migrate-an-existing-remote-configuration-setup}

Los clientes existentes que establezcan `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` permanecen en Remote Configuration durante una ventana de migración. Esta configuración obsoleta es un puente de compatibilidad, no la configuración a largo plazo.

Cuando esté listo para usar la entrega sin agente:

1. Establezca `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless`.
2. Para el punto de conexión administrado por Datadog, configure `DD_API_KEY`, `DD_SITE` y `DD_ENV` en la aplicación.
3. Inicialice el proveedor y verifique que reciba actualizaciones de flags.
4. Elimine `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`. No deje habilitada la configuración obsoleta después de completar la migración.

Para permanecer temporalmente en Agent Remote Configuration, establezca `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`, luego elimine `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED`. Su clave de API permanece en el Agent.

Si establece `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=false`, reemplácelo con `DD_FEATURE_FLAGS_ENABLED=false`.

Los valores explícitos de `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` tienen prioridad sobre la configuración heredada. Después de eliminar la configuración heredada, las aplicaciones sin una fuente explícita utilizan la entrega sin agente. Establezca `remote_config` explícitamente antes de eliminar la configuración heredada obsoleta si desea permanecer en la entrega mediante Agent.

## Utilice Agent Remote Configuration {#use-agent-remote-configuration}

Establezca la fuente en `remote_config` para usar la entrega administrada por Agent:

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
{{< /code-block >}}

Para Java, Remote Configuration requiere versiones compatibles de `dd-openfeature` y `dd-java-agent`. Utilice la versión 1.65.0 o posterior para ambos componentes.

Configure la clave de API en el Agent, no en el proceso de la aplicación. Si Remote Configuration se ha deshabilitado en el Agent, vuelva a habilitarla. Consulte [Remote Configuration][1] para conocer la configuración del Agent y los requisitos de red.

## Configuración avanzada {#advanced-configuration}

### Habilite o deshabilite Feature Flags {#enable-or-disable-feature-flags}

`DD_FEATURE_FLAGS_ENABLED` tiene como valor predeterminado `true`, por lo que las nuevas configuraciones no necesitan establecerlo. Establézcalo en `false` para deshabilitar el proveedor y ambas rutas de entrega de configuración:

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_ENABLED=false
{{< /code-block >}}

### Activación y facturación {#activation-and-billing}

La facturación de Server Feature Flags se basa en las solicitudes de configuración realizadas a través de Remote Configuration o la CDN. La instalación del rastreador no activa ninguna de las rutas de entrega por sí sola.

- Con la fuente sin agente predeterminada, el sondeo de CDN comienza solo cuando el código de la aplicación inicializa o accede al proveedor de OpenFeature de Datadog.
- Seleccionar explícitamente `remote_config` inicia la suscripción a Feature Flags de Agent. No requiere que el código de la aplicación inicialice el proveedor.

### Precedencia de configuración {#configuration-precedence}

| Configuración | Resultado |
|---|---|
| `DD_FEATURE_FLAGS_ENABLED=false` | Deshabilita el proveedor y ambas rutas de entrega, independientemente de otras configuraciones. |
| Explícito `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` | Selecciona la entrega por CDN. El sondeo comienza cuando el código de la aplicación inicializa o accede al proveedor. |
| Explícito `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` | Selecciona la entrega por Agent y habilita la suscripción a Feature Flags Remote Configuration. |
| Vacío o solo espacios en blanco `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` | Trata la fuente como no establecida, por lo que se aplica la configuración de migración heredada o el valor predeterminado sin agente. |
| Explícito `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=offline` u otro valor no vacío no admitido | Falla en estado cerrado cuando el código de la aplicación accede al proveedor. El SDK no selecciona la entrega por CDN o Remote Configuration. |
| Sin fuente y `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` | Conserva Remote Configuration durante la ventana de migración. |
| Sin fuente y `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=false` | Mantiene el proveedor y ambas rutas de entrega deshabilitadas. |
| Ni `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE` ni `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` están establecidos | Selecciona la entrega sin agente. El sondeo comienza cuando el código de la aplicación inicializa o accede al proveedor. |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/remote_configuration/
[2]: /es/feature_flags/server/nodejs/
[3]: /es/feature_flags/server/
[4]: /es/feature_flags/server/java/
[5]: /es/feature_flags/server/python/
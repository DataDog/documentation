---
description: Configure los Feature Flags de Datadog para aplicaciones del lado del
  servidor.
further_reading:
- link: /feature_flags/client/
  tag: Documentación
  text: Feature Flags del lado del cliente
- link: /remote_configuration/
  tag: Documentación
  text: Remote Configuration
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: Guía
  text: Configure las métricas de evaluación de flags del lado del servidor
- link: /feature_flags/concepts/flag_graphs/
  tag: Concepto
  text: Gráficos de Feature Flag
- link: /feature_flags/implementation_patterns/serverless/
  tag: Documentación
  text: Entornos serverless y Feature Flags
- link: /feature_flags/concepts/configuration_sources/
  tag: Concepto
  text: Fuentes de configuración del SDK del servidor
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guía
  text: Configure el enriquecimiento de trazas de APM para Feature Flags
title: Feature Flags del lado del servidor
---
## Descripción general {#overview}

Los Feature Flags de Datadog para aplicaciones del lado del servidor le permiten controlar de forma remota la disponibilidad de funciones, ejecutar experimentos e implementar nuevas funcionalidades con confianza. Los SDK del lado del servidor reciben la configuración de los flags y evalúan los flags localmente. Algunos SDK utilizan un Datadog tracer para la entrega de configuración o telemetría.

Los Feature Flags de Datadog están basados en el estándar [OpenFeature](https://openfeature.dev/docs/reference/intro/), una especificación de código abierto y neutral respecto al proveedor para las API de Feature Flags. Si es nuevo en los conceptos de OpenFeature como proveedores, contexto de evaluación y hooks, consulte la [documentación de conceptos de OpenFeature](https://openfeature.dev/docs/category/concepts).

## Entrega de configuración {#configuration-delivery}

La [entrega de configuración][8] sin agente es la predeterminada en las versiones del SDK del servidor que la admiten. El SDK obtiene la configuración de los flags directamente desde la CDN administrada por Datadog a través de HTTPS, y luego evalúa los flags localmente. No se requiere un Datadog Agent para la configuración de los flags.

La fuente predeterminada no activa el tráfico de Feature Flags para todas las instalaciones del tracer. El sondeo sin agente comienza solo cuando el código de la aplicación inicializa o accede al proveedor OpenFeature de Datadog. Seleccionar explícitamente `remote_config` activa la suscripción de Remote Configuration para Feature Flags. Las solicitudes a través de cualquiera de las fuentes contribuyen a la facturación de Feature Flags del servidor.

| SDK | Versión mínima sin agente |
|---|---|
| Java `dd-openfeature` y `dd-java-agent` | 1.65.0 |
| Node.js `dd-trace` v5 | 5.116.0 |
| Node.js `dd-trace` v6 | 6.5.0 |
| Python `ddtrace` | 4.14.0 |

La entrega por CDN para Java requiere `dd-openfeature` y `dd-java-agent`. No requiere un Datadog Agent para la configuración de los flags.

<div class="alert alert-warning">Las versiones iniciales de Node.js sin agente solo admiten la entrega de configuración y la evaluación local de flags. No exportan métricas de evaluación ni eventos de exposición. La entrega sin agente para Java y Python solo cambia la fuente de configuración. Java y Python no exportan estas señales sin un Datadog Agent compatible o una ruta de telemetría sin servidor.</div>

La entrega Agentless está disponible para los SDK y las versiones enumeradas. Otros SDK de servidor utilizan Agent Remote Configuration.

## Elija un idioma {#choose-a-language}

Seleccione su idioma o framework para ver las instrucciones de configuración específicas del SDK:

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/server/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/feature_flags/server/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/feature_flags/server/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/feature_flags/server/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/feature_flags/server/php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/feature_flags/server/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/feature_flags/server/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}

Para entornos de ejecución Serverless, consulte [Entornos Serverless][5] para conocer la configuración Agentless, los requisitos de versión y las limitaciones iniciales de telemetría.

## Requisitos previos {#prerequisites}

Los requisitos dependen del SDK seleccionado y de la fuente de configuración. Los requisitos estándar incluyen:

- Las versiones del tracer específico del lenguaje o del proveedor de OpenFeature enumeradas en la página del SDK.
- Una [clave de API][2] de Datadog

La entrega por CDN de Java requiere el agente de Java en el proceso de la aplicación. No requiere rastreo de APM ni un servicio de Datadog Agent independiente.

Los requisitos específicos de la fuente son:

| Fuente | Requisitos |
|---|---|
| `agentless` (predeterminado donde sea compatible) | Configure `DD_API_KEY`, `DD_SITE` y `DD_ENV` en el proceso de la aplicación. No se requiere ningún Agente para la configuración de flags. |
| `remote_config` | Datadog Agent 7.55 o posterior con Remote Configuration habilitado, la clave de API configurada en el Datadog Agent y Remote Configuration habilitado para su organización en [{{< ui >}}Organization Settings{{< /ui >}}][3]. Java también requiere versiones compatibles de `dd-openfeature` y `dd-java-agent`. |

## Agentless configuration {#agentless-configuration}

En una [versión de SDK compatible](#configuration-delivery), configure el proceso de la aplicación:

{{< code-block lang="bash" >}}
# Required for direct configuration delivery
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

No se requiere la habilitación de Feature Flags ni la configuración de la fuente. Consulte [Feature Flags de Java][10], [Feature Flags de Node.js][9] o [Feature Flags de Python][11] para conocer las versiones de dependencia y la inicialización específica del lenguaje. La inicialización o el acceso al proveedor inician el sondeo de CDN; la instalación y la inicialización del tracer por sí solas no lo hacen.

## Agent Remote Configuration {#agent-remote-configuration}

Para Java, Node.js y Python, establezca la fuente explícitamente para mantener la entrega administrada por Agent Remote Configuration.

{{< code-block lang="bash" >}}
DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config
{{< /code-block >}}

Remote Configuration está habilitado de forma predeterminada en el Datadog Agent 7.47.0 y versiones posteriores. Si su Datadog Agent tiene Remote Configuration deshabilitado, vuelva a habilitarlo configurando `DD_REMOTE_CONFIGURATION_ENABLED=true` o agregando `remote_configuration.enabled: true` a su `datadog.yaml`.

Consulte la [Remote Configuration documentation][1] para obtener instrucciones de configuración detalladas en todos los entornos de implementación.

Las implementaciones existentes de Java, Node.js y Python con `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` permanecen en Remote Configuration durante un período de migración. La configuración está obsoleta. Consulte [Migrar desde la configuración del proveedor heredado][7] para permanecer en Remote Configuration de manera explícita o pasar a la entrega sin agente.

### Remote Configuration polling interval {#remote-configuration-polling-interval}

El Agent sondea a Datadog en busca de actualizaciones de configuración en un intervalo configurable:

{{< code-block lang="bash" >}}
# Optional: Configure the Agent polling interval (default: 60s)
DD_REMOTE_CONFIGURATION_REFRESH_INTERVAL=10s
{{< /code-block >}}

## Configuración avanzada de la aplicación {#advanced-application-configuration}

Configure su aplicación con las variables de entorno estándar de Datadog. Estos son comunes en todos los SDK del lado del servidor:

{{< code-block lang="bash" >}}
# Required: Service identification
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
DD_VERSION=<YOUR_APP_VERSION>

# Optional: Disable Feature Flags and both delivery paths
# DD_FEATURE_FLAGS_ENABLED=false

# Optional: Enable flag evaluation metrics
# See "Set Up Server-Side Flag Evaluation Metrics" documentation
{{< /code-block >}}

<div class="alert alert-info">En las versiones de Java, Node.js y Python enumeradas anteriormente, <code>DD_FEATURE_FLAGS_ENABLED</code> se establece de forma predeterminada en <code>true</code>, por lo que no necesita configurarlo. Configurarlo en <code>false</code> deshabilita el proveedor, el sondeo de CDN y la suscripción de Remote Configuration de Feature Flags. Otros SDK de servidor continúan utilizando la configuración de activación documentada en sus páginas de lenguaje.</div>

Para los SDK y modos de entrega que lo admiten, consulte <a href="/feature_flags/guide/server_flag_evaluation_metrics/">Configurar métricas de evaluación de flags del lado del servidor</a> para habilitar la <code>feature_flag.evaluations</code> métrica. Las versiones iniciales de Node.js sin agente no exportan métricas de evaluación ni eventos de exposición. Java y Python requieren un Datadog Agent compatible o una ruta de telemetría sin servidor para exportar estas señales. Consulte <a href="/feature_flags/concepts/flag_graphs/">Gráficos de Feature Flags</a> para obtener más información sobre los gráficos disponibles. Consulte <a href="/feature_flags/guide/apm_trace_enrichment/">Configurar el enriquecimiento de trazas de APM para Feature Flags</a> para adjuntar datos de evaluación de Feature Flags a las trazas de APM para filtrado y experimentación.

## Pruebas con proveedores en memoria {#testing-with-in-memory-providers}

Datadog admite estos enfoques de prueba:

- **Pruebas de integración**: Apunte `DatadogProvider` a un entorno de prueba dedicado y controle los valores de los flags desde la interfaz de usuario de Datadog. Esto ejercita el proveedor real y la fuente de configuración seleccionada de extremo a extremo.
- **Pruebas unitarias**: Intercambie `DatadogProvider` por el `InMemoryProvider` estándar de OpenFeature (o un stub de prueba equivalente, donde no haya un proveedor en memoria disponible en el lenguaje) y establezca los valores de los flags directamente en el código de prueba. Esto mantiene las pruebas herméticas y sin conexión.

Esta sección cubre el enfoque en memoria. Debido a que la API de OpenFeature está diseñada para que los proveedores sean intercambiables en tiempo de ejecución, el código de su aplicación no cambia; solo el proveedor registrado durante la configuración de la prueba.

Una prueba típica sigue este patrón:

1. Cree un mapa de claves de indicadores a variantes en la configuración de su prueba.
2. Registre un `InMemoryProvider` con ese mapa a través de la API de OpenFeature.
3. Llame al cliente de OpenFeature en las unidades que se están probando. El `InMemoryProvider` devuelve las asignaciones de indicadores configuradas en la configuración de la prueba.
4. Restablezca el proveedor en la finalización de la prueba para evitar la fuga de estado entre pruebas.

Consulte la página del SDK de su lenguaje (seleccione en la parte superior de esta página) para ver un ejemplo concreto de prueba.

## Requisitos de atributos de contexto {#context-attribute-requirements}

<div class="alert alert-warning">
Los atributos del contexto de evaluación deben ser valores primitivos planos (cadenas, números, booleanos). Los objetos y arreglos anidados <strong>no son compatibles</strong> y provocarán que los eventos de exposición se descarten silenciosamente.
</div>

Utilice atributos planos en su contexto de evaluación:

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: req.session?.userID,
  companyId: req.session?.companyID,
  tier: 'enterprise'
};

const value = client.getBooleanValue('my-flag', false, evaluationContext);
{{< /code-block >}}

Evite objetos y arreglos anidados:

{{< code-block lang="javascript" >}}
// These attributes will cause exposure events to be dropped
const evaluationContext = {
  targetingKey: req.session?.userID,
  company: { id: req.session?.companyID },  // nested object - NOT SUPPORTED
  roles: ['admin', 'user']                   // array - NOT SUPPORTED
};
{{< /code-block >}}

## Lecturas adicionales {#further-reading}

Para despliegues basados en porcentajes y segmentación determinista, consulte [División de tráfico y aleatorización](/feature_flags/concepts/traffic_splitting/).

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/remote_configuration
[2]: /es/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /es/tracing/guide/#tutorials-enabling-tracing
[5]: /es/feature_flags/implementation_patterns/serverless/
[7]: /es/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[8]: /es/feature_flags/concepts/configuration_sources/
[9]: /es/feature_flags/server/nodejs/
[10]: /es/feature_flags/server/java/
[11]: /es/feature_flags/server/python/
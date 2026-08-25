---
aliases:
- /es/real_user_monitoring/browser/setup/server/java
code_lang: java
code_lang_weight: 7
description: Inserta automáticamente el kit de desarrollo de software (SDK) del navegador
  de RUM en aplicaciones web basadas en Java Servlet utilizando la instrumentación
  automática del kit de desarrollo de software (SDK) de Java.
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/setup/server
  tag: Documentación
  text: Instrumentación automática de la monitorización del navegador
- link: /tracing/trace_collection/single-step-apm/
  tag: Documentación
  text: Instrumentación APM de un solo paso
title: Java Servlet
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">La instrumentación automática de RUM no está disponible para el sitio seleccionado ({{< region-param key="dd_site_name" >}}). En su lugar, utiliza la <a href="/real_user_monitoring/application_monitoring/browser/setup/client">instrumentación del lado del cliente</a>.</div>
{{< /site-region >}}

## Información general

La instrumentación automática de RUM añade automáticamente la monitorización de RUM a tu servidor de aplicaciones web, por lo que puedes empezar a recopilar datos de RUM editando un archivo de configuración en lugar de tener que modificar tu código de frontend directamente. Sin embargo, si deseas rastrear acciones de usuario específicas (acciones personalizadas) o añadir detalles de eventos personalizados (atributos de eventos), todavía tendrás que añadir algún código a tu aplicación.

## Cómo funciona

El kit de desarrollo de software (SDK) de Java funciona monitorizando tu API de servlet (que gestiona las solicitudes y respuestas web) y hacer un check automáticamente de cada respuesta HTTP que envía tu servidor. Cuando detecta una respuesta HTML, busca la sección `<head>` y añade allí automáticamente el código JavaScript RUM. El resto del contenido HTML permanece inalterado. Este enfoque añade una sobrecarga mínima, por lo que funciona bien incluso con respuestas de streaming (donde el contenido se envía en tiempo real).

## Requisitos previos

### Requisitos del servidor
- Servidor de aplicaciones web Java compatible con Servlet API 3.0 o superior:
  - Jetty 7+
  - Tomcat 7+
  - GlassFish 3+ / Payara 4.1+
  - JBoss AS 6+ / Wildfly 8+
  - Undertow 1+
  - WebLogic 12+
  - WebSphere AS 8+ / Open Liberty 17+

## Instalación

Selecciona el método de configuración que prefieras:

{{< tabs >}}
{{% tab "Instrumentación de un solo step (UI) / paso (generic) (Recomendada)" %}}

Activa la monitorización del navegador de RUM con la [Instrumentación de un solo step (UI) / paso (generic) (SSI)][2].
Al ejecutar la instalación del Agent con RUM activado, Datadog:
- Carga el kit de desarrollo de software de (SDK) Java en tus aplicaciones Java a través de la SSI
- Crea una aplicación RUM para ti
- Configura el kit de desarrollo de software (SDK) de Java con las variables de entorno necesarias de RUM.

**Este método no requiere cambios en el código ni la configuración manual del servidor web.**

1. Ve a la page (página) de [**Agent Installation**][1] (Instalación del Agent).
2. Selecciona tu plataforma (por ejemplo, Linux).
3. En la sección **Customize your observability coverage** (Personaliza tu cobertura de observabilidad), activa **Real User Monitoring** en **Application Observability** (Observabilidad de la aplicación).

   Al activar esta opción, se crea automáticamente una aplicación RUM.

4. Copia el comando de instalación generado y ejecútalo en tu host.
5. Reinicia tu aplicación Java basada en servlets.


[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[2]: /es/tracing/trace_collection/single-step-apm/

{{% /tab %}}
{{% tab "Configuración manual" %}}

Utiliza la configuración manual si prefieres configurar la monitorización del navegador de RUM de forma independiente o si la SSI no está disponible para tu entorno.

### Requisitos previos

- El kit de desarrollo de software (SDK) de Java instalado y cargado utilizando cualquiera de los siguientes:
  - [Instrumentación de un solo step (UI) / paso (generic)][1] (SSI)
  - [Instalación manual del kit de desarrollo de software (SDK)][2]
- Aplicación RUM [creada en Datadog][3]
- Valores de configuración listos:
  - `clientToken`
  - `applicationId`
  - `remoteConfigurationId`

### Activar la instrumentación de RUM en el kit de desarrollo de software (SDK) de Java

La instrumentación de RUM para servidores de aplicaciones web de Java puede configurarse utilizando los métodos de configuración habituales del kit de desarrollo de software (SDK) de Java. Para obtener más información, consulta [Configuración de la biblioteca del kit de desarrollo de software (SDK) de Java][4].

La inserción del kit de desarrollo de software (SDK) de RUM está desactivada en forma predeterminada. Actívala exportando las siguientes variables de entorno:

```shell
export DD_RUM_ENABLED=true
export DD_RUM_APPLICATION_ID=<your-application-id>
export DD_RUM_CLIENT_TOKEN=<your-client-token>
export DD_RUM_REMOTE_CONFIGURATION_ID=<your-remote-config-id>
export DD_RUM_SITE=datadoghq.com # or datadoghq.eu / us3.datadoghq.com / us5.datadoghq.com / ap1.datadoghq.com / ap2.datadoghq.eu
```

O utiliza las siguientes propiedades del sistema de Java:

```shell
java -Ddd.rum.enabled=true \
  -Ddd.rum.application.id=<your-application-id> \
  -Ddd.rum.client.token=<your-client-token> \
  -Ddd.rum.remote.configuration.id=<your-remote-configuration-id> \
  -Ddd.rum.site=datadoghq.com # or datadoghq.eu / us3.datadoghq.com / us5.datadoghq.com / ap1.datadoghq.com / ap2.datadoghq.eu
```

Reinicia el servidor de aplicaciones web de Java para aplicar los cambios.

Los documentos HTML deben contener la tag (etiqueta) Datadog RUM JavaScript justo antes del `</head>` de cierre. Es posible que tengas que borrar la caché de tu navegador. Deberías empezar a recibir datos para tu aplicación Datadog RUM.

[1]: /es/tracing/trace_collection/#single-step-instrumentation-recommended
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[3]: https://app.datadoghq.com/rum/list
[4]: /es/tracing/trace_collection/library_config/java/

{{% /tab %}}
{{< /tabs >}}

## Opciones de configuración

Estas son todas las opciones de configuración relacionadas con la activación de RUM en el kit de desarrollo de software (SDK) de Java:

| Propiedad | Variable de entorno | Valor | Requisito |
|----------|---------------------|-------|-------------|
| `dd.rum.enabled` | `DD_RUM_ENABLED` | `true` / `false` | Obligatorio |
| `dd.rum.application.id` | `DD_RUM_APPLICATION_ID` | `<string>` | Obligatorio |
| `dd.rum.client.token` | `DD_RUM_CLIENT_TOKEN` | `<string>` | Obligatorio |
| `dd.rum.site` | `DD_RUM_SITE` | `datadoghq.com` / `us3.datadoghq.com` / `us5.datadoghq.com` / `datadoghq.eu` / `ap1.datadoghq.com` / `ap2.datadoghq.eu` | Opcional, `datadoghq.com` en forma predeterminada |
| `dd.rum.service` | `DD_RUM_SERVICE` | `<string>` | opcional |
| `dd.rum.environment` | `DD_RUM_ENVIRONMENT` | `<string>` | opcional |
| `dd.rum.major.version` | `DD_RUM_MAJOR_VERSION` | `5` / `6` | Opcional, `6` en forma predeterminada |
| `dd.rum.version` | `DD_RUM_VERSION` | `<string>` | opcional |
| `dd.rum.track.user.interaction` | `DD_RUM_TRACK_USER_INTERACTION` | `true` / `false` | opcional |
| `dd.rum.track.resources` | `DD_RUM_TRACK_RESOURCES` | `true` / `false` | opcional |
| `dd.rum.track.long.tasks` | `DD_RUM_TRACK_LONG_TASKS` | `true` / `false` | opcional |
| `dd.rum.session.sample.rate` | `DD_RUM_SESSION_SAMPLE_RATE` | Porcentaje, de `0` a `100` | Obligatorio si falta `rum.remote.configuration.id`  |
| `dd.rum.session.replay.sample.rate` | `DD_RUM_SESSION_REPLAY_SAMPLE_RATE` | Porcentaje, de `0` a `100` | Obligatorio si falta `rum.remote.configuration.id`  |
| `dd.rum.remote.configuration.id` | `DD_RUM_REMOTE_CONFIGURATION_ID` | `<string>` | Obligatorio si falta `rum.session.sample.rate` o `rum.session.replay.sample.rate`  |

{{% rum-browser-auto-instrumentation-update-user-attributes %}}

## Solucionar problemas

Check los logs del servidor de aplicaciones web de Java si no ves la tag (etiqueta) RUM JavaScript insertada.

Busca el mensaje de error de análisis de configuración `"Unable to configure RUM injection"` en los logs. Si está presente, muestra un mensaje detallado sobre la causa.

Además, si se activan los logs de depuración mediante la propiedad del sistema `dd.trace.debug=true` o la variable de entorno `DD_TRACE_DEBUG=true`, se volcará la configuración de la biblioteca del cliente Java al iniciarse:

```shell
DEBUG datadog.trace.api.Config - New instance: Config{..., rumEnabled=true, rumInjectorConfig={"applicationId":"appid","clientToken":"token","site":"datadoghq.com","remoteConfigurationId":"remoteconfigid"}, ...}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}
---
aliases:
- /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/docker
code_lang: docker
code_lang_weight: 10
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Habilitar métricas de tiempo de ejecución
title: Instrumentación de APM de step (UI) / paso único en Docker
type: multi-code-lang
---

## Información general

En un contenedor Docker Linux, utiliza la instrumentación de un solo paso (SSI) para que APM instale el Datadog Agent e [instrumente][14] tus aplicaciones en un solo paso, sin necesidad de configuración adicional.

## Activar APM en tus aplicaciones

<div class="alert alert-info">Antes de continuar, confirma que tu entorno es compatible consultando la <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">guía de compatibilidad de SSI</a>.</div>

Para activar APM en un contenedor Docker Linux:

1. En Datadog, ve a la página [Instalar el Datadog Agent en Docker][15].
1. En la sección **Customize my Agent install command** (Personalizar mi comando de instalación del Agent), ve a **Additional configuration** > **Application Observability** (Configuración adicional > Observabilidad de aplicaciones), y activa **APM Instrumentation** (Instrumentación APM).

   {{< img src="tracing/trace_collection/docker-apm-instrumentation-toggle.png" alt="Sección 'Customize my Agent install command' (Personalizar mi comando de instalación del Agent) de las instrucciones en la aplicación para instalar el Datadog Agent en Docker" style="width:100%;" >}}

1. Copia y ejecuta el comando de instalación del Agent en tu contenedor Docker. Si el Agent ya se está ejecutando, vuelve a desplegar el contenedor del Agent utilizando el nuevo comando.
1. Reinicia tus aplicaciones.

<div class="alert alert-info">SSI añade una pequeña cantidad de tiempo de inicio a las aplicaciones instrumentadas. Si esta sobrecarga no es aceptable para tu uso caso de uso, ponte en contacto con el <a href="/help/">servicio de asistencia de Datadog</a>.</div>

## Configurar versiones de rastreador del SDK

Por defecto, la instrumentación de un solo paso instala las últimas versiones principales de los SDK de Datadog APM. Las actualizaciones de versiones menores se aplican automáticamente cuando están disponibles.

Es posible que quieras personalizar las versiones de SDK en función de la versión de lenguaje de tu aplicación o de los requisitos específicos del entorno. Puedes controlar las versiones principales y menores utilizadas personalizando las versiones de biblioteca durante la configuración.

Para personalizar las versiones de rastreador:

1. En Datadog, ve a la página [Instalar el Datadog Agent en Docker][15].
1. Después de activar **APM Instrumentation** (Instrumentación APM), haz clic en **Customize library versions** (Personalizar versiones de biblioteca).

   {{< img src="tracing/trace_collection/apm-instrumentation-version-pinning.png" alt="Menú desplegable 'Customize library versions' (Personalizar versiones de biblioteca) en las instrucciones de instalación del Datadog Agent en Docker" style="width:100%;" >}}

1. Busca tu(s) lenguaje(s) y utiliza el menú desplegable para:
   - Fijar una versión exacta de rastreador, o
   - Seleccionar la versión principal que quieres utilizar.
1. Copiar y ejecutar el comando de instalación actualizado.

Las versiones disponibles figuran en los repositorios fuentes de cada lenguaje:

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)
- [PHP][13] (`php`)

## Configurar etiquetas (tags) de servicio unificadas

Las etiquetas de servicio unificadas (UST) aplican etiquetas coherentes en trazas (traces), métricas y logs, lo que facilita la navegación y la correlación de los datos de observabilidad. Más información sobre cómo [configurar UST para servicios Docker][16].

## Activar productos y funciones dependientes de SDK

Una vez que SSI cargue el SDK de Datadog en tus aplicaciones y habilite el rastreo distribuido, puedes configurar productos adicionales que dependan del SDK. Estos incluyen funcionalidades como [Continuous Profiler][18], [App and API Protection][19] y [controles de ingesta de trazas][20].

Para activar los productos, [define variables de entorno][3] en la configuración de tu aplicación.

## Eliminar la instrumentación APM de un solo paso de tu Agent

Si no quieres recopilar datos de trazas de un determinado servicio, host, máquina virtual o contenedor, sigue los pasos que se indican a continuación:

### Eliminación de la instrumentación en servicios específicos

Para eliminar la instrumentación de APM y dejar de enviar trazas desde un servicio específico:

1. Añade la variable de entorno `DD_INSTRUMENT_SERVICE_WITH_APM` al comando de inicio de servicio:
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Reinicia el servicio.

### Eliminar APM para todos los servicios de la infraestructura

Para dejar de producir trazas, desinstala APM y reinicia la infraestructura:

1. Ejecuta:
   ```shell
   dd-container-install --uninstall
   ```
2. Reinicia Docker:
   ```shell
   systemctl restart docker
   ```
   O utiliza el equivalente para tu entorno.

## Solucionar problemas

Si tienes problemas para activar APM con SSI, consulta la [guía de resolución de problemas de SSI][17].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/tracing/trace_collection/library_config/
[3]: /es/tracing/trace_collection/library_config/
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases
[14]: /es/tracing/glossary/#instrumentation
[15]: https://app.datadoghq.com/fleet/install-agent/latest?platform=docker
[16]: /es/getting_started/tagging/unified_service_tagging/?tab=docker#containerized-environment
[17]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[18]: /es/profiler/
[19]: /es/security/application_security/
[20]: /es/tracing/trace_pipeline/ingestion_controls/
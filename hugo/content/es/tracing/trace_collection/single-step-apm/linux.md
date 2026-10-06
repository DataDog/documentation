---
aliases:
- /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/linux/
code_lang: linux
code_lang_weight: 0
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Habilitar métricas de tiempo de ejecución
- link: https://www.datadoghq.com/blog/single-step-instrumentation-rules/
  tag: blog
  text: Administre el rastreo de servicios entre servidores con reglas de instrumentación
    de Single Step
title: Instrumentación de Single Step APM en Linux
type: multi-code-lang
---
## Descripción general {#overview}

En un servidor o VM de Linux, utilice Single Step Instrumentation (SSI) para APM a fin de instalar el Datadog Agent e [instrumentar][14] sus aplicaciones en un solo paso, sin necesidad de configuración adicional. 

{{< skill-callout
    title="Configure APM con un Agent"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Habilite APM en sus aplicaciones {#enable-apm-on-your-applications}

<div class="alert alert-info">Antes de continuar, confirme que su entorno sea compatible revisando la <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">guía de compatibilidad de SSI.</a></div>

### Nueva instalación de Agent {#new-agent-installation}

Si aún no tiene instalado un Datadog Agent, instale el Agent y habilite SSI en un solo paso.

1. Ejecute el siguiente comando en su servidor o VM de Linux:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> \
   DD_SITE="{{< region-param key="dd_site" >}}" \
   DD_APM_INSTRUMENTATION_ENABLED=host \
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][22]. The command installs or updates the Agent and the SSI packages.

   By default, SSI installs the latest SDK versions. To pin specific versions, add the `DD_APM_INSTRUMENTATION_LIBRARIES` variable with comma-separated `language:major` pairs. Available versions are listed in the source repositories for each language: [Java][8] (`java`), [Node.js][9] (`js`), [Python][10] (`python`), [.NET][11] (`dotnet`), [Ruby][12] (`ruby`), [PHP][13] (`php`).

1. Restart your applications.

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

#### Generate the command from Datadog 

To get a command pre-filled with your API key and site, go to the [Install the Datadog Agent on Linux][15] page and turn on {{< ui >}}Application Performance Monitoring{{< /ui >}} under {{< ui >}}Core Observability{{< /ui >}}.

{{< img src="tracing/trace_collection/enable_apm.png" alt="La sección 'Customize your Agent coverage' de las instrucciones en la aplicación para instalar el Datadog Agent en Linux" style="width:100%;" >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Para seleccionar versiones del SDK desde los menús desplegables, haga clic en {{< ui >}}Customize Library Versions{{< /ui >}}.

{{< img src="tracing/trace_collection/customize_library_versions.png" alt="El menú desplegable 'Customize library versions' en las instrucciones para instalar el Datadog Agent en Linux" style="width:100%;" >}}
{{< /site-region >}}

Luego, copie y ejecute el comando generado.

### Instalación de Agent existente {#existing-agent-installation}

Si ya tiene instalado un Datadog Agent, vuelva a ejecutar el comando de instalación del Agent desde [Nueva instalación del Agent](#new-agent-installation) en el servidor. El comando actualiza el Agent existente y habilita SSI.

Alternativamente, utilice Fleet Automation para habilitar SSI desde Datadog:

1. En Datadog, vaya a [**Fleet Automation > Configuration**][21].
1. Haga clic en {{< ui >}}Configure Agents{{< /ui >}}.
1. Aplique filtros para seleccionar los Agent que desea configurar, luego haga clic en **Siguiente**.

   {{< img src="tracing/trace_collection/filter-agents.png" alt="La pantalla de filtrado de Agent en Fleet Automation, con opciones para definir el contexto por entorno, sistema operativo y nombre de host" style="width:100%;" >}}

1. Haga clic en el mosaico {{< ui >}}Application Performance Monitoring (APM){{< /ui >}}, luego haga clic en {{< ui >}}Next{{< /ui >}}.

   {{< img src="tracing/trace_collection/select-products-core-obs.png" alt="La pantalla de selección de productos en Fleet Automation, que muestra el mosaico de Application Performance Monitoring (APM)" style="width:80%;" >}}

1. En la pantalla {{< ui >}}Configure SDKs Installation{{< /ui >}}, haga clic en {{< ui >}}Yes{{< /ui >}} para instalar automáticamente el SDK. Seleccione {{< ui >}}Use latest version{{< /ui >}}, o desmarque para especificar versiones individuales de SDK.

   {{< img src="tracing/trace_collection/configure-sdks-installation.png" alt="La pantalla Configurar instalación de SDK en Fleet Automation, con opciones para habilitar la instalación automática de SDK y seleccionar versiones." style="width:60%;" >}}

1. Haga clic en **Siguiente**.
1. Revise su configuración y haga clic en {{< ui >}}Deploy Configuration{{< /ui >}}.

## Verifique la instalación {#verify-the-installation}

1. Confirme que el Agent se está ejecutando:

   ```shell
   sudo datadog-agent status
   ```

1. Confirme que la inyección de SSI esté activada en el servidor:

   ```shell
   cat /etc/ld.so.preload && ls /opt/datadog-packages/ | grep apm
   ```

   La salida enumera la biblioteca del inyector de APM en `/etc/ld.so.preload` y uno o más paquetes `datadog-apm-*`.

1. Después de que sus aplicaciones reciban tráfico, confirme que sus servicios aparecen en la [página de servicios de APM][23]. Si no aparecen en unos minutos, siga la [guía de solución de problemas de SSI][19].

## Configurar etiquetas de servicio unificadas {#configure-unified-service-tags}

Las etiquetas de servicio unificadas (USTs) aplican etiquetas coherentes en trazas, métricas y registros, lo que facilita la navegación y la correlación de sus datos de observabilidad. Aprenda a [configurar USTs para servicios de Linux][16].

## Habilitar productos y funciones que dependen del SDK {#enable-sdk-dependent-products-and-features}

Después de que SSI cargue el SDK de Datadog en sus aplicaciones y habilite el rastreo distribuido, puede configurar productos adicionales que dependen del SDK:

{{< ssi-products >}}

Utilice uno de los siguientes métodos de configuración:

- **[Configurar en `application_monitoring.yaml`][18]**:

  Configure productos y funciones en todos los servicios de un servidor sin modificar las líneas de comando de la aplicación.

- **[Establecer variables de entorno][17]**:

  Habilite productos estableciendo variables de entorno directamente en la configuración de su aplicación. 

## Opciones avanzadas {#advanced-options}

### Actualizar la versión del SDK {#update-sdk-version}

La versión del SDK se fija cuando ejecuta el comando de instalación del Agent.

Para actualizar las versiones del SDK:

1. Vuelva a ejecutar el comando de instalación del Agent. Este comando también actualiza el Agent a la versión más reciente.
1. Reinicie sus aplicaciones.

### Definir reglas de instrumentación {#define-instrumentation-rules}

{{< site-region region="gov" >}}
<div class="alert alert-warning">Las reglas de instrumentación no son compatibles con su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Las reglas de instrumentación (disponibles para el Agent v7.73+) le permiten controlar qué procesos son instrumentados automáticamente por SSI en servidores Linux.

Para configurar las reglas de instrumentación:

1. En Datadog, vaya a {{< ui >}}APM{{< /ui >}} > {{< ui >}}Service Setup{{< /ui >}} > [{{< ui >}}Manage Instrumentation Rules{{< /ui >}}][20].
1. Haga clic en {{< ui >}}Add or Edit Rules{{< /ui >}}.
1. Definir las reglas de instrumentación:
   1. Haga clic en {{< ui >}}Add New Rule{{< /ui >}}, luego elija {{< ui >}}Allow Rule{{< /ui >}} o {{< ui >}}Block Rule{{< /ui >}} para especificar si los procesos coincidentes deben ser instrumentados.
   1. Nombre su regla.
   1. Agregue una o más condiciones. Consulte [Definir las condiciones de la regla](#define-rule-conditions) para obtener más información.

   {{< img src="tracing/trace_collection/define_instrumentation_rule.png" alt="La interfaz de usuario de reglas de instrumentación, que muestra las opciones de configuración para definir una regla" style="width:100%;" >}}

1. (Opcional) Arrastre y suelte las reglas para reordenarlas.

   **Nota**: Las reglas se evalúan en orden. Después de que un proceso coincide con una regla, las reglas subsiguientes se ignoran.

1. Establezca el comportamiento predeterminado (permitir o bloquear) para los procesos que no coinciden con ninguna regla.
1. Haga clic en {{< ui >}}Next{{< /ui >}} para obtener una vista previa de sus reglas.
1. Haga clic en {{< ui >}}Deploy Rules{{< /ui >}}.

Si Remote Configuration está habilitado, las reglas se implementan en cada servidor y se aplican en aquellos con SSI habilitado en un plazo de 50 segundos. Alternativamente, haga clic en {{< ui >}}Export{{< /ui >}} para exportar el archivo de configuración y aplicarlo manualmente a sus servidores.

#### Definir las condiciones de la regla {#define-rule-conditions}

Cada regla consta de una o más condiciones. Una condición incluye los siguientes elementos:
- {{< ui >}}Attribute{{< /ui >}}: La propiedad del proceso que evalúa la regla.
- {{< ui >}}Operator{{< /ui >}}: La lógica de comparación (`equals`, `not equals`, `prefix` o `contains`).
- {{< ui >}}Value{{< /ui >}}: El texto o patrón a coincidir, como un nombre de proceso o un indicador de línea de comandos.

Los atributos admitidos incluyen:
| Atributo | Descripción | Ejemplo |
| --------- | ----------- | ------- |
| Sistema operativo | SO del servidor. | `linux` |
| Ejecutable | Nombre del ejecutable del proceso. | `python3.11` |
| Ruta completa del ejecutable | Ruta completa del ejecutable. | `/usr/bin/python3.11` |
| Argumentos | Argumentos de línea de comandos utilizados para iniciar el proceso. | `--env=production` |
| Directorio de trabajo | Directorio de trabajo del proceso. | `/app` |
| Lenguaje | Lenguaje de programación detectado para el proceso. | `python` |
| Archivo de punto de entrada | El archivo específico utilizado para iniciar la aplicación. | `app.py`, `server.js` |

#### Ejemplos de casos de uso {#example-use-cases}

Revise los siguientes ejemplos que demuestran cómo aplicar reglas de instrumentación:

{{< collapse-content title="Ejemplo 1: Instrumentar todos los procesos excepto algunos específicos" level="h5" >}}

Instrumentar todos los procesos de forma predeterminada. Agregue reglas de bloqueo para excluir servicios que agregarían ruido sin valor, como trabajos cron de análisis y procesadores por lotes de Java.

{{< img src="tracing/trace_collection/instrumentation-rules-example-1.png" alt="Dos reglas de instrumentación de bloqueo dirigidas a condiciones de Directorio de trabajo y Archivo de punto de entrada, con un valor predeterminado de permitir la instrumentación." style="width:100%;" >}}

{{< /collapse-content >}}

{{< collapse-content title="Ejemplo 2: Instrumentar solo procesos específicos" level="h5" >}}

Bloquear toda la instrumentación de forma predeterminada. Agregue reglas de permitir para incluir procesos específicos en APM. Este enfoque le brinda un control preciso y funciona bien para implementaciones graduales.

Por ejemplo, para instrumentar solo un servicio de pago y un portal de clientes, cree reglas de permitir usando {{< ui >}}Working Directory{{< /ui >}}, luego establezca el comportamiento predeterminado en {{< ui >}}Block Instrumentation{{< /ui >}}.

{{< img src="tracing/trace_collection/instrumentation-rules-linux-example-2.png" alt="Dos reglas de instrumentación de permitir que apuntan a servicios en directorios de trabajo específicos, con un valor predeterminado de bloquear la instrumentación." style="width:100%;" >}}

{{< /collapse-content >}}

## Elimine la instrumentación de Single Step APM de su Agent {#remove-single-step-apm-instrumentation-from-your-agent}

Para dejar de producir trazas para todos los servicios en su infraestructura:

1. Ejecute:
   ```shell
   dd-host-install --uninstall
   ```
2. Reinicie los servicios en el servidor o la VM.

## Solución de problemas {#troubleshooting}

Si encuentra problemas al habilitar APM con SSI, consulte la [guía de solución de problemas de SSI][19].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases
[14]: /es/tracing/glossary/#instrumentation
[15]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux
[16]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes#non-containerized-environment
[17]: /es/tracing/trace_collection/library_config/
[18]: /es/tracing/trace_collection/library_config/application_monitoring_yaml/
[19]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[20]: https://app.datadoghq.com/apm/service-setup/workload-selection
[21]: https://app.datadoghq.com/fleet/agent-management
[22]: https://app.datadoghq.com/organization-settings/api-keys
[23]: https://app.datadoghq.com/apm/services
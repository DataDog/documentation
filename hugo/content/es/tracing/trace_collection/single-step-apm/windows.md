---
aliases:
- /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/windows
code_lang: windows
code_lang_weight: 30
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Habilitar métricas de tiempo de ejecución
title: Instrumentación Single Step APM en Windows
type: multi-code-lang
---
## Descripción general {#overview}

Con Single Step Instrumentation (SSI), puede habilitar APM para sus aplicaciones Java y .NET en máquinas virtuales Windows utilizando un solo comando de instalación del Datadog Agent.

{{< skill-callout
    title="Configure APM con un Agent"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Habilitar APM en Windows {#enable-apm-on-windows}

<div class="alert alert-info">Antes de continuar, confirme que su entorno sea compatible revisando la <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">guía de compatibilidad de SSI.</a></div>

### Nueva instalación de Agent {#new-agent-installation}

Si aún no tiene instalado un Datadog Agent, siga estos pasos para instalar el Datadog Agent y habilitar SSI simultáneamente.

Puede habilitar APM en Windows de las siguientes maneras:
* Instrumentar solo aplicaciones .NET en IIS
* Instrumentar todas las aplicaciones Java y .NET en todo su servidor Windows

{{< tabs >}}
{{% tab "IIS" %}}

Para instrumentar solo aplicaciones .NET que se ejecutan en IIS:

1. Desde una sesión de PowerShell de administrador en su servidor Windows, ejecute uno de los siguientes comandos. Reemplace `<YOUR_DD_API_KEY>` con su [clave de Datadog API][2].

   Utilice el instalador de PowerShell:

   ```powershell
   [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; $env:DD_API_KEY = '<YOUR_DD_API_KEY>'; $env:DD_SITE = '{{< region-param key="dd_site" >}}'; $env:DD_APM_INSTRUMENTATION_ENABLED = 'iis'; $env:DD_APM_INSTRUMENTATION_LIBRARIES = 'dotnet:3'; (New-Object System.Net.WebClient).DownloadFile('https://install.datadoghq.com/datadog-installer-x86_64.exe', 'C:\\Windows\\SystemTemp\\datadog-installer-x86_64.exe'); C:\\Windows\\SystemTemp\\datadog-installer-x86_64.exe
   ```

   Alternatively, install with the MSI:

   ```powershell
   $p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /norestart /i "https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi" /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<YOUR_DD_API_KEY>" SITE="{{< region-param key="dd_site" >}}\" DD_APM_INSTRUMENTATION_ENABLED=\"iis\" DD_APM_INSTRUMENTATION_LIBRARIES=\"dotnet:3\"'
   if ($p.ExitCode -ne 0) { Write-Host \"msiexec failed with exit code $($p.ExitCode) please check the logs at C:\\Windows\\SystemTemp\\install-datadog.log\" -ForegroundColor Red }
   ```

   To install a different .NET version, change `dotnet:3`, or omit `DD_APM_INSTRUMENTATION_LIBRARIES` to install the latest.

   **Note**: The Chocolatey installation method does not preserve the SSI settings and cannot be used to enable SSI.

1. Restart the IIS applications you want instrumented. (You do not need to restart the entire IIS server.)

The Agent then automatically loads the Datadog .NET SDK into supported application processes to enable distributed tracing.

**Generate the command from Datadog**: To get a command pre-filled with your API key and site, go to [Install the Datadog Agent on Windows][1] and, in the {{< ui >}}Customize your observability coverage{{< /ui >}} section, toggle {{< ui >}}Application Performance Monitoring (APM){{< /ui >}}. To pin the .NET SDK version, select {{< ui >}}Customize Library Versions{{< /ui >}} under {{< ui >}}Instrumentation Configuration{{< /ui >}}. Then copy and run the generated command.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}

{{% tab "En todo el servidor (vista previa)" %}}

<div class="alert alert-info">
<strong>¡Únase a la vista previa!</strong><br>
La instrumentación en todo el servidor para Windows está en vista previa y limitada a los participantes de la vista previa. Las opciones de instalación y configuración descritas en esta pestaña aparecen en Datadog solo después de que se haya inscrito. <a href="https://www.datadoghq.com/product-preview/single-step-instrumentation-on-windows-vms/" class="alert-link">Solicite acceso</a> para unirse a la vista previa.
</div>

Para instrumentar aplicaciones Java y .NET en todo su servidor Windows:

1. En Datadog, vaya a [Instalar el Datadog Agent en Windows][1].
1. En la sección {{< ui >}}Customize your observability coverage{{< /ui >}}, active {{< ui >}}Application Performance Monitoring (APM){{< /ui >}}.
1. (Opcional) Establezca su versión de SDK:
   
   De forma predeterminada, la instrumentación de un solo paso (Single Step Instrumentation) instala la última versión compatible del SDK de .NET y Java de Datadog. Si necesita fijar una versión específica:

   1. En {{< ui >}}Instrumentation Configuration{{< /ui >}}, seleccione {{< ui >}}Customize Library Versions{{< /ui >}}.
   1. En .NET, elija la versión que desea usar.

1. Copie y ejecute el comando de instalación proporcionado en su servidor Windows. Datadog genera este comando en la aplicación después de que se inscriba en la vista previa.
1. Configure las reglas de instrumentación.

   La SSI a nivel de servidor instrumenta automáticamente todas las aplicaciones Java en el servidor y todas las aplicaciones .NET que se ejecutan en IIS. Para instrumentar aplicaciones .NET que se ejecutan fuera de IIS, debe [definir una regla de instrumentación](#define-instrumentation-rules) que las permita. También puede usar reglas de instrumentación para un control granular sobre qué aplicaciones Java en el servidor o aplicaciones .NET en IIS se instrumentan.

1. Reinicie los servicios que desea instrumentar.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">La SSI añade una pequeña cantidad de tiempo de inicio a las aplicaciones instrumentadas. Si esta sobrecarga no es aceptable para su caso de uso, contacte a <a href="/help/">Soporte de Datadog</a>.</div>

### Instalación de Agent existente {#existing-agent-installation}

Si ya tiene instalado un Datadog Agent, use Fleet Automation para habilitar la SSI.

1. En Datadog, vaya a [{{< ui >}}Fleet Automation{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}}][6].
1. Haga clic en {{< ui >}}Configure Agents{{< /ui >}}.
1. Aplique filtros para seleccionar los agentes que desea configurar, luego haga clic en **Siguiente**.

   {{< img src="tracing/trace_collection/filter-agents.png" alt="La pantalla de filtrado de agente en Fleet Automation, con opciones para definir el contexto por entorno, sistema operativo y nombre de host" style="width:100%;" >}}

1. Haga clic en el mosaico {{< ui >}}Application Performance Monitoring (APM){{< /ui >}}, luego haga clic en {{< ui >}}Next{{< /ui >}}.

   {{< img src="tracing/trace_collection/select-products-core-obs.png" alt="La pantalla de selección de productos en Fleet Automation, que muestra el mosaico de Application Performance Monitoring (APM)" style="width:80%;" >}}

1. En la pantalla {{< ui >}}Configure SDKs Installation{{< /ui >}}, haga clic en {{< ui >}}Yes{{< /ui >}} para instalar automáticamente el SDK. Seleccione {{< ui >}}Use latest version{{< /ui >}}, o desmarque para especificar versiones individuales de SDK.

   {{< img src="tracing/trace_collection/configure-sdks-installation.png" alt="La pantalla Configurar instalación de SDK en Fleet Automation, con opciones para habilitar la instalación automática de SDK y seleccionar versiones." style="width:60%;" >}}

1. Haga clic en {{< ui >}}Next{{< /ui >}}.
1. Revise su configuración y haga clic en {{< ui >}}Deploy Configuration{{< /ui >}}.
1. Configure las reglas de instrumentación.

   La SSI a nivel de servidor instrumenta automáticamente todas las aplicaciones Java en el servidor y todas las aplicaciones .NET que se ejecutan en IIS. Para instrumentar aplicaciones .NET que se ejecutan fuera de IIS, debe [definir una regla de instrumentación](#define-instrumentation-rules) que las permita. También puede usar reglas de instrumentación para un control granular sobre qué aplicaciones Java en el servidor o aplicaciones .NET en IIS se instrumentan.

## Verifique la instalación {#verify-the-installation}

1. Desde una sesión de PowerShell de administrador, confirme que el Agent esté en buen estado y que el APM Agent se esté ejecutando:

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

   Verifique la sección **APM Agent** de la salida.

1. Después de que sus aplicaciones instrumentadas reciban tráfico, confirme que sus servicios aparecen en la [página de servicios de APM][7]. Si no aparecen en unos minutos, siga la [guía de solución de problemas de SSI][4].

## Configurar etiquetas de servicio unificadas {#configure-unified-service-tags}

Las etiquetas de servicio unificadas (USTs) aplican etiquetas coherentes en trazas, métricas y registros, lo que facilita la navegación y la correlación de sus datos de observabilidad. Aprenda a [configurar USTs para servicios de Windows][2].

## Habilitar productos y funciones que dependen del SDK {#enable-sdk-dependent-products-and-features}

Después de que SSI cargue el SDK de Datadog en sus aplicaciones y habilite el rastreo distribuido, puede configurar productos adicionales que dependen del SDK:

{{< ssi-products >}}

Para habilitar productos, [configure variables de entorno][3] en la configuración de su aplicación.

## Opciones avanzadas {#advanced-options}

### Definir reglas de instrumentación {#define-instrumentation-rules}

{{< site-region region="gov" >}}
<div class="alert alert-warning">Las reglas de instrumentación no son compatibles con su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<div class="alert alert-info">Las reglas de instrumentación (disponibles para el Agent v7.73+) se aplican solo a la instrumentación en todo el servidor. No son compatibles con la instalación exclusiva de IIS.</div>
{{< /site-region >}}

Las reglas de instrumentación le permiten controlar qué procesos son instrumentados automáticamente por SSI en los hosts Windows. Se requieren reglas para instrumentar aplicaciones .NET que se ejecutan fuera de IIS. También son útiles para un control granular sobre qué aplicaciones Java en el servidor o aplicaciones .NET en IIS son instrumentadas.

Para configurar las reglas de instrumentación:

1. En Datadog, vaya a {{< ui >}}APM{{< /ui >}} > {{< ui >}}Service Setup{{< /ui >}} > [{{< ui >}}Manage Instrumentation Rules{{< /ui >}}][5].
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
| Sistema operativo | SO del servidor. | `windows` |
| Ejecutable | Nombre del ejecutable del proceso. | `w3wp.exe` |
| Ruta completa del ejecutable | Ruta completa del ejecutable. | `C:\Windows\System32\inetsrv\w3wp.exe` |
| Argumentos | Argumentos de línea de comandos utilizados para iniciar el proceso. | `--env=production` |
| Directorio de trabajo | Directorio de trabajo del proceso. | `C:\inetpub\wwwroot` |
| Lenguaje | Lenguaje de programación detectado para el proceso. | `dotnet` |
| Archivo de punto de entrada | El archivo específico utilizado para iniciar la aplicación. | `MyService.dll`, `app.py` |
| Grupo de aplicaciones de IIS | El grupo de aplicaciones de IIS que aloja el proceso de trabajo. Debido a que todos los trabajadores de IIS comparten el ejecutable `w3wp.exe`, esta es la forma más confiable de apuntar a una aplicación .NET específica en IIS. | `DefaultAppPool`, `MyWebApp` |

#### Ejemplos de casos de uso {#example-use-cases}

Revise los siguientes ejemplos que demuestran cómo aplicar reglas de instrumentación:

{{< collapse-content title="Ejemplo 1: Instrumentar todos los procesos excepto algunos específicos" level="h5" >}}

Instrumentar todos los procesos de forma predeterminada. Agregue reglas de bloqueo para excluir servicios que agregarían ruido sin valor, como trabajos cron de análisis y procesadores por lotes de Java.

{{< img src="tracing/trace_collection/instrumentation-rules-example-1.png" alt="Dos reglas de instrumentación de bloqueo dirigidas a condiciones de Directorio de trabajo y Archivo de punto de entrada, con un valor predeterminado de permitir la instrumentación." style="width:100%;" >}}

{{< /collapse-content >}}

{{< collapse-content title="Ejemplo 2: Instrumentar solo aplicaciones específicas de IIS" level="h5" >}}

Bloquear toda la instrumentación de forma predeterminada. Agregue reglas de permiso para incluir aplicaciones específicas de IIS en APM. Debido a que todos los trabajadores de IIS comparten el <code>w3wp.exe</code> ejecutable, utilice {{< ui >}}IIS Application Pool{{< /ui >}} para identificar las aplicaciones de destino. Este enfoque es útil para implementaciones graduales.

{{< img src="tracing/trace_collection/instrumentation-rules-example-2.png" alt="Dos reglas de permiso de instrumentación que apuntan a grupos de aplicaciones de IIS específicos por nombre, con un bloqueo de instrumentación predeterminado" style="width:100%;" >}}

{{< /collapse-content >}}

## Elimine la instrumentación de Single Step APM de su Agent {#remove-single-step-apm-instrumentation-from-your-agent}

Para deshabilitar SSI para .NET en su servidor, ejecute:

```shell
&"C:\Program Files\Datadog\Datadog Agent\bin\datadog-installer.exe" remove datadog-apm-library-dotnet
```

## Solución de problemas {#troubleshooting}

Si encuentra problemas al habilitar APM con SSI, consulte la [guía de solución de problemas de SSI][4].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: /es/integrations/windows-service/#tags
[3]: /es/tracing/trace_collection/library_config/
[4]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[5]: https://app.datadoghq.com/apm/service-setup/workload-selection
[6]: https://app.datadoghq.com/fleet/agent-management
[7]: https://app.datadoghq.com/apm/services
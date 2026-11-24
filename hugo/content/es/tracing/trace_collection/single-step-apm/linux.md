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
  tag: Blog
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

Si ya tiene instalado un Datadog Agent, habilite SSI de forma remota desde Datadog. No necesita ejecutar comandos en cada servidor.

1. En Datadog, vaya a [**APM > Instrument a Service**][21].

1. En {{< ui >}}How do you want to instrument these hosts?{{< /ui >}}, seleccione {{< ui >}}Deploy on existing hosts{{< /ui >}} para instrumentar sus servicios de forma remota a través del Datadog Agent.

1. En {{< ui >}}Which hosts should we instrument?{{< /ui >}}, utilice los filtros de contexto ({{< ui >}}Environments{{< /ui >}}, {{< ui >}}Hostname{{< /ui >}}, {{< ui >}}APM enabled{{< /ui >}}) para acotar la lista de servidores. Luego seleccione las instancias del Agent que desea instrumentar en la pestaña {{< ui >}}Eligible for deployment{{< /ui >}}. Los servidores que no se pueden instrumentar aparecen en la pestaña {{< ui >}}Excluded from deployment{{< /ui >}}.

1. En {{< ui >}}Configure SDKs installation{{< /ui >}}, haga clic en {{< ui >}}Yes{{< /ui >}} para que Datadog instale automáticamente los SDK de rastreo. Para fijar versiones específicas del SDK en lugar de la más reciente, expanda {{< ui >}}Customize library versions{{< /ui >}}.

1. En {{< ui >}}Configure rollout strategy{{< /ui >}}, elija qué porcentaje de instancias del Agent implementar a la vez. Datadog muestra las etapas resultantes y una duración estimada. Las implementaciones se pausan automáticamente si fallan tres instancias consecutivas del Agent o si las fallas alcanzan el 10 % del total. Puede volver a ejecutar la implementación más tarde.

1. En {{< ui >}}Review and apply APM instrumentation{{< /ui >}}, marque {{< ui >}}Configuration Summary{{< /ui >}} (cambie entre {{< ui >}}Summary{{< /ui >}} y {{< ui >}}YAML{{< /ui >}}), luego haga clic en {{< ui >}}Apply Instrumentation{{< /ui >}}.

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

Las reglas de instrumentación le permiten controlar qué procesos instrumenta SSI automáticamente en servidores Linux. Cada regla identifica los procesos según sus atributos y luego permite o bloquea la instrumentación de los procesos que coincidan. Puede implementar una regla en todos los servidores elegibles o limitar su contexto a uno o más [grupos de servidores](#create-host-groups) para restringir dónde se aplica.

Para ver y administrar las reglas de instrumentación, vaya a {{< ui >}}APM{{< /ui >}} > {{< ui >}}Instrument a Service{{< /ui >}} > [{{< ui >}}Instrumentation Rules{{< /ui >}}][20].

{{< img src="tracing/trace_collection/apm-instrumentation-rules-for-hosts.png" alt="La página APM Instrumentation Rules, con la opción Hosts seleccionada, muestra las tarjetas Default Behavior, Hosts in Scope y Deployment Status encima de una lista de reglas de instrumentación" style="width:100%;" >}}

#### Requisitos previos para las reglas de instrumentación {#prerequisites-for-instrumentation-rules}

- **Agent**: v7.73 o posterior en cada servidor, con SSI y [Remote Configuration][24] habilitados. Los servidores que cumplen con estos requisitos son elegibles para las reglas de instrumentación.
- **Permisos**: El [permiso][25] **APM Workload Selection Write**, que es necesario para crear y administrar reglas de instrumentación y grupos de servidores.

#### Establecer el comportamiento predeterminado {#set-the-default-behavior}

El comportamiento predeterminado se aplica a los procesos en servidores elegibles que no coinciden con ninguna regla de instrumentación. También se aplica cuando no ha creado ninguna regla.

1. En la página [Instrumentation Rules][20], vaya a la tarjeta {{< ui >}}Default Behavior{{< /ui >}} y haga clic en {{< ui >}}Edit{{< /ui >}}.
1. Elija una de las siguientes opciones:
   - {{< ui >}}Allow everything else{{< /ui >}}: Las aplicaciones compatibles se instrumentan a menos que una regla las bloquee.
   - {{< ui >}}Block everything else{{< /ui >}}: Las aplicaciones no se instrumentan a menos que una regla las permita.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

#### Crear grupos de servidores {#create-host-groups}

Los grupos de servidores son colecciones reutilizables de servidores a los que puede dirigir reglas de instrumentación.

Para crear un grupo de servidores:

1. En la página [Instrumentation Rules][20], vaya a la tarjeta {{< ui >}}Hosts in Scope{{< /ui >}} y haga clic en {{< ui >}}Manage host groups{{< /ui >}}.
1. Haga clic en {{< ui >}}New Host Group{{< /ui >}} e ingrese un nombre para el grupo.
1. Haga clic en {{< ui >}}Add Hosts{{< /ui >}}, luego busque y seleccione los servidores que desea agregar. Puede buscar por nombre de servidor, facetas o etiquetas de servidor.

   <div class="alert alert-info">Los grupos de servidores son dinámicos, por lo que los servidores nuevos que coincidan con su búsqueda se agregan al grupo automáticamente. Un servidor puede pertenecer a más de un grupo, pero todos los servidores de un grupo deben ejecutarse en la misma plataforma, como Linux o Windows.</div>

   {{< img src="tracing/trace_collection/instrumentation-rules-add-hosts.png" alt="El formulario de nuevo grupo de servidores, con dos de tres servidores seleccionados en la lista Add Hosts" style="width:80%;" >}}

1. Haga clic en {{< ui >}}Save Group{{< /ui >}}.

Datadog mantiene un grupo {{< ui >}}All hosts{{< /ui >}} automáticamente. Enumera los servidores elegibles que no pertenecen a ningún otro grupo, para que pueda ver qué servidores quedan por agrupar. No puede editar su lista de servidores.

Si elimina un grupo de servidores, Datadog elimina las reglas del grupo y el Agent deja de aplicarlas la próxima vez que consulte Remote Configuration.

Para cambiar el orden de los grupos de servidores, arrastre un grupo desde el control de arrastre en la lista de grupos. El orden de los grupos afecta [cómo se evalúan las reglas de instrumentación](#how-instrumentation-rules-are-evaluated).

{{< img src="tracing/trace_collection/instrumentation-rules-host-groups.png" alt="La página Host Groups, que muestra el grupo Canary por encima del grupo All hosts y enumera los servidores del grupo Canary" style="width:100%;" >}}

#### Crear reglas de instrumentación {#create-instrumentation-rules}

**Nota**: Puede usar Bits AI para crear reglas de instrumentación con lenguaje natural. En la ventana Create instrumentation rule, haga clic en {{< ui >}}Generate with Bits{{< /ui >}} y describa qué procesos instrumentar. Bits AI genera la regla correspondiente.

Para crear una regla de instrumentación:

1. En la página [Instrumentation Rules][20], haga clic en {{< ui >}}New Rule{{< /ui >}}. Como alternativa, en la página Host Groups, seleccione un grupo, abra su pestaña {{< ui >}}Rules{{< /ui >}} y haga clic en {{< ui >}}Create a new rule{{< /ui >}}.
1. Defina una o más condiciones, luego seleccione {{< ui >}}Block Instrumentation{{< /ui >}} o {{< ui >}}Allow Instrumentation{{< /ui >}}. Consulte la sección [Definir condiciones de regla](#define-rule-conditions).

   {{< img src="tracing/trace_collection/instrumentation-rules-create-rule.png" alt="La ventana Create instrumentation rule, con la condición Language equals Python, la acción Allow Instrumentation y el panel Rule Impact Preview" style="width:100%;" >}}

1. En {{< ui >}}Set host targeting{{< /ui >}}, seleccione {{< ui >}}All eligible hosts{{< /ui >}} o {{< ui >}}Select host groups{{< /ui >}}.

   Si selecciona más de un grupo, los grupos comparten una única regla y, al editarla más tarde, se actualizan todos los grupos seleccionados.

   {{< img src="tracing/trace_collection/instrumentation-rules-host-targeting.png" alt="El paso Set host targeting, con la opción Select host groups seleccionada y un grupo de servidores llamado Test seleccionado" style="width:80%;" >}}

1. Asigne un nombre a la regla y, luego, haga clic en {{< ui >}}Next{{< /ui >}}.
1. Revise la regla. Datadog agrega nuevas reglas al final de la lista de reglas de cada grupo de destino. Opcionalmente, en {{< ui >}}Set evaluation order{{< /ui >}}, arrastre las reglas para cambiar su orden en cada grupo. Consulte la sección [Cómo se evalúan las reglas de instrumentación](#how-instrumentation-rules-are-evaluated).

   {{< img src="tracing/trace_collection/instrumentation-rules-review-order.png" alt="El paso de revisión de la regla, que muestra el resumen de la regla y el orden de evaluación de las reglas en el grupo de servidores Test" style="width:100%;" >}}

1. Haga clic en {{< ui >}}Create Rule{{< /ui >}}.

Datadog implementa las reglas en los servidores elegibles a través de Remote Configuration en un plazo de 50 segundos. Después de implementar las reglas, reinicie los servicios afectados para que los cambios surtan efecto. La tarjeta {{< ui >}}Deployment Status{{< /ui >}} en la página [Instrumentation Rules][20] muestra cuántos servidores elegibles han recibido las reglas actuales.

Para aplicar las reglas manualmente, por ejemplo, en servidores que no tienen habilitada Remote Configuration, haga clic en {{< ui >}}Export{{< /ui >}} sobre la lista de reglas para exportar el archivo de configuración y, luego, aplíquelo a sus servidores.

#### Cómo se evalúan las reglas de instrumentación {#how-instrumentation-rules-are-evaluated}

Para cada proceso, Datadog evalúa las reglas de instrumentación en el siguiente orden y aplica la primera regla que coincida:

1. Reglas de los grupos a los que pertenece el servidor del proceso, en el orden de los grupos de arriba hacia abajo. Dentro de cada grupo, las reglas se evalúan en el orden establecido en {{< ui >}}Set evaluation order{{< /ui >}}.
1. Reglas que tienen como objetivo {{< ui >}}All eligible hosts{{< /ui >}}. Estas reglas se aplican a todos los servidores elegibles, incluidos los servidores en grupos de servidores.

Si ninguna regla coincide, se aplica el [comportamiento predeterminado](#set-the-default-behavior).

#### Definir las condiciones de la regla {#define-rule-conditions}

Cada regla consta de una o más condiciones. Un proceso debe cumplir con todas las condiciones de una regla para que esta se aplique. Una condición incluye los siguientes elementos:
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

{{% collapse-content title="Ejemplo 1: Instrumentar todos los procesos excepto algunos específicos" level="h5" %}}

Instrumentar todos los procesos de forma predeterminada. Agregue reglas de bloqueo para excluir servicios que agregarían ruido sin valor, como trabajos cron de análisis y procesadores por lotes de Java.

1. Establezca el comportamiento predeterminado en {{< ui >}}Allow everything else{{< /ui >}}.
1. Cree las siguientes reglas, cada una dirigida a {{< ui >}}All eligible hosts{{< /ui >}}:

   | Nombre de la regla | Condición | Acción |
   | --------- | --------- | ------ |
   | Excluir trabajo cron de análisis | <code>Working Directory</code> <code>contains</code> <code>analytics-service</code> | Block Instrumentation |
   | Excluir servicios por lotes | <code>Entry Point File</code> <code>contains</code> <code>batch-processor.jar</code> | Block Instrumentation |

{{% /collapse-content %}}

{{% collapse-content title="Ejemplo 2: Instrumentar solo procesos específicos" level="h5" %}}

Bloquear toda la instrumentación de forma predeterminada. Agregue reglas de permitir para incluir procesos específicos en APM.

Por ejemplo, para instrumentar solo un servicio de pago y un portal de clientes:

1. Establezca el comportamiento predeterminado en {{< ui >}}Block everything else{{< /ui >}}.
1. Cree las siguientes reglas, cada una dirigida a {{< ui >}}All eligible hosts{{< /ui >}}:

   | Nombre de la regla | Condición | Acción |
   | --------- | --------- | ------ |
   | Servicio de pago | <code>Working Directory</code> <code>equals</code> <code>/srv/checkout</code> | Allow Instrumentation |
   | Portal del cliente | <code>Working Directory</code> <code>equals</code> <code>/srv/customer-portal</code> | Allow Instrumentation |

{{% /collapse-content %}}

{{% collapse-content title="Ejemplo 3: Implementar la instrumentación gradualmente con un grupo de servidores" level="h5" %}}

Bloquee toda la instrumentación de forma predeterminada y permítala solo en un pequeño conjunto de servidores canario. Después de validar los resultados, agregue más servidores al grupo o cambie la regla para dirigirse a todos los servidores elegibles.

1. Establezca el comportamiento predeterminado en {{< ui >}}Block everything else{{< /ui >}}.
1. Cree un grupo de servidores llamado <code>canary</code> y agregue los servidores que se instrumentarán primero.
1. Cree una regla con la siguiente configuración:

   | Configuración | Valor |
   | ------- | ----- |
   | Condición | <code>Language</code> <code>equals</code> <code>python</code> |
   | Acción | Allow Instrumentation |
   | Host targeting | Select host groups: <code>canary</code> |

Solo las aplicaciones de Python en los servidores del <code>canary</code> grupo están instrumentadas. Todas las demás aplicaciones no están instrumentadas.

{{% /collapse-content %}}

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
[21]: https://app.datadoghq.com/apm/instrumentation
[22]: https://app.datadoghq.com/organization-settings/api-keys
[23]: https://app.datadoghq.com/apm/services
[24]: /es/remote_configuration/
[25]: /es/account_management/rbac/permissions/
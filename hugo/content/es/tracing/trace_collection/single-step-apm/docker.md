---
aliases:
- /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/docker
code_lang: docker
code_lang_weight: 10
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Habilitar métricas de tiempo de ejecución
title: Instrumentación de APM de un solo paso en Docker
type: multi-code-lang
---
## Descripción general {#overview}

En un contenedor de Docker Linux, utilice la instrumentación de un solo paso (SSI) para APM a fin de instalar el Datadog Agent e [instrumentar][14] sus aplicaciones en un solo paso, sin necesidad de configuración adicional. 

{{< skill-callout
    title="Configure APM con un Agent"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Habilite APM en sus aplicaciones {#enable-apm-on-your-applications}

<div class="alert alert-info">Antes de continuar, confirme que su entorno sea compatible revisando la <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">guía de compatibilidad de SSI.</a></div>

Para instalar el Datadog Agent y habilitar SSI en un entorno Docker de Linux, ejecute los siguientes comandos en su servidor Docker (no dentro de un contenedor de aplicación).

1. Instale los componentes de instrumentación de Docker sin instalar un Agent en el servidor:

   ```shell
   DD_APM_INSTRUMENTATION_ENABLED=docker \
   DD_NO_AGENT_INSTALL=true \
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

1. Ejecute o vuelva a implementar el contenedor del Agent. Reemplace `<YOUR_DD_API_KEY>` con su [clave de Datadog API][1]:

   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=<YOUR_DD_API_KEY> \
     -e DD_SITE="{{< region-param key="dd_site" >}}" \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/var/run/datadog/dsd.socket \
     -v /var/run/datadog:/var/run/datadog \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     -v /proc/:/host/proc/:ro \
     -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
     -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
     registry.datadoghq.com/agent:7
   ```

   **Note**: Run only one Datadog Agent per node. If a Datadog Agent container already exists, update its definition (or your Docker Compose file) with these settings and recreate it, rather than starting a second Agent. For rootless Docker, set the correct Docker socket in `docker_config.yaml`.

1. Recreate your application containers.

   Instrumentation is applied when a container is created, so restarting an existing container with `docker stop` and `docker start` does not instrument it. Remove your application containers and run them again.

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

### Generate the command from Datadog 

To get a command pre-filled with your API key and site, go to the [Install the Datadog Agent on Docker][15] page. In the {{< ui >}}Customize my agent install command{{< /ui >}} section, go to {{< ui >}}Additional configuration{{< /ui >}} > {{< ui >}}Application Observability{{< /ui >}}, and turn on {{< ui >}}APM Instrumentation{{< /ui >}}. Then copy and run the generated command.

{{< img src="tracing/trace_collection/docker-apm-instrumentation-toggle.png" alt="La sección 'Customize your agent install command' de las instrucciones en la aplicación para instalar el Datadog Agent en Docker" style="width:100%;" >}}

## Establecer versiones del rastreador del SDK {#set-sdk-tracer-versions}

De forma predeterminada, Single Step Instrumentation instala las versiones principales más recientes de los SDK de Datadog y aplica actualizaciones menores automáticamente cuando están disponibles.

Para fijar versiones específicas, agregue la variable `DD_APM_INSTRUMENTATION_LIBRARIES` con pares `language:major` separados por comas al comando de instalación del componente. Las versiones disponibles se enumeran en los repositorios de fuente para cada lenguaje:

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)
- [PHP][13] (`php`)

También puede seleccionar versiones desde los menús desplegables en Datadog: en la página [Install the Datadog Agent on Docker][15], después de activar {{< ui >}}APM Instrumentation{{< /ui >}}, haga clic en {{< ui >}}Customize library versions{{< /ui >}}.

{{< img src="tracing/trace_collection/apm-instrumentation-version-pinning.png" alt="El menú desplegable 'Customize library versions' en las instrucciones para instalar el Datadog Agent en Docker" style="width:100%;" >}}

## Verifique la instalación {#verify-the-installation}

1. Confirme que el demonio de Docker esté utilizando el tiempo de ejecución de Datadog:

   ```shell
   docker system info --format '{{.DefaultRuntime}}'
   ```

   The output must be `dd-shim`. If it is `runc` or anything else, the instrumentation components did not install successfully, and your applications are not instrumented regardless of whether the Agent is healthy. Re-run the installation command, and confirm that the Docker daemon was running when you ran it.

1. Confirm the Agent container is running:

   ```shell
   docker ps --filter name=dd-agent
   ```

1. Confirme que el Agent esté en buen estado y que el APM Agent se esté ejecutando:

   ```shell
   docker exec dd-agent agent status
   ```

   Verifique la sección **APM Agent** de la salida.

1. Confirme que un contenedor de aplicación esté utilizando el tiempo de ejecución de Datadog. Reemplace `<CONTAINER_NAME>` con el nombre de uno de sus contenedores de aplicación:

   ```shell
   docker inspect <CONTAINER_NAME> --format '{{.HostConfig.Runtime}}'
   ```

1. After your applications receive traffic, confirm your services appear on the [APM Services page][18]. If they don't appear within a few minutes, follow the [SSI troubleshooting guide][17].

## Configure Unified Service Tags 

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Docker services][16].

## Enable SDK-dependent products and features 

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK:

{{< ssi-products >}}

Para habilitar productos, [configure variables de entorno][3] en la configuración de su aplicación.

## Elimine la instrumentación de Single Step APM de su Agent {#remove-single-step-apm-instrumentation-from-your-agent}

Si no desea recopilar datos de traza para un servicio, servidor, VM o contenedor en particular, complete los siguientes pasos:

### Eliminar la instrumentación de servicios específicos {#remove-instrumentation-for-specific-services}

Para eliminar la instrumentación de APM y dejar de enviar trazas desde un servicio específico:

1. Agregue la variable de entorno `DD_INSTRUMENT_SERVICE_WITH_APM` al comando de inicio del servicio:
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Reinicie el servicio.

### Eliminar APM para todos los servicios en la infraestructura {#remove-apm-for-all-services-on-the-infrastructure}

Para dejar de producir trazas, desinstale APM y reinicie la infraestructura:

1. Ejecute:
   ```shell
   dd-container-install --uninstall
   ```
2. Reinicie Docker:
   ```shell
   systemctl restart docker
   ```
   O utilice el equivalente para su entorno.

## Solución de problemas {#troubleshooting}

Si encuentra problemas al habilitar APM con SSI, consulte la [guía de solución de problemas de SSI][17].

## Lecturas adicionales {#further-reading}

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
[18]: https://app.datadoghq.com/apm/services
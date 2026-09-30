---
further_reading:
- link: /integrations/google-cloud-run/
  tag: Documentación
  text: Integración con Google Cloud Run
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: Blog
  text: Recopile trazas, registros y métricas personalizadas de los servicios de Cloud
    Run
- link: /serverless/google_cloud_run/containers/in_container/
  tag: Documentación
  text: Instrumente su contenedor utilizando el enfoque in-container
- link: /serverless/google_cloud_run/containers/sidecar/
  tag: Documentación
  text: Instrumente su contenedor con el enfoque sidecar
- link: https://www.datadoghq.com/blog/instrument-cloud-run-with-datadog-sidecar/
  tag: Blog
  text: Instrumente las aplicaciones de Google Cloud Run con el nuevo sidecar del
    Datadog Agent
- link: /mcp_server/tools/#serverless_onboarding
  tag: Documentación
  text: 'Datadog MCP Server: herramienta serverless_onboarding'
title: Elección de un método de instrumentación para Containers
---
## Incorporación mediante agentes {#set-up-with-agentic-onboarding}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Esta función no es compatible con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Utilice la incorporación mediante agentes para configurar el monitoreo de sus contenedores de Cloud Run con asistencia de IA. La incorporación mediante agentes detecta los marcos de trabajo de su proyecto, aplica la configuración necesaria en el lugar y verifica que los datos fluyan. Dos rutas complementarias utilizan la misma cuenta de Datadog:

- **CLI de configuración de IA**: Una herramienta de terminal independiente. Úsela cuando no desee instalar MCP Server.
- **MCP Server**: Configúrelo desde su IDE a través de un asistente de codificación como Claude Code o Cursor.

{{< tabs >}}
{{% tab "CLI de configuración de IA" %}}

Ejecute la CLI en el directorio de su proyecto (requiere Node.js 22+). Vincula su cuenta de Datadog y luego instrumenta su servicio de Cloud Run:

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run
```

Omita `--product` para ejecutar de forma interactiva, o agregue `--site` para dirigirse a su sitio de Datadog.

{{% /tab %}}
{{% tab "MCP Server" %}}

Utilice la herramienta [`serverless_onboarding`](https://docs.datadoghq.com/es/agentic_onboarding/setup/?tab=serverlessmonitoring#mcp-server) del servidor de Datadog MCP para configurar el monitoreo para sus contenedores de Cloud Run con asistencia de IA. Después de conectarse, pruebe con un mensaje como:

```
Help me monitor my GCP Cloud Run services with Datadog using Terraform.
```

{{% /tab %}}
{{< /tabs >}}

## Instrumentación manual {#manual-instrumentation}
Para instrumentar sus contenedores de Google Cloud Run con Datadog, elija una de las dos opciones:

{{% gcr-container-options %}}

- [**In-Container**][1]: Envuelve su contenedor de aplicación con el Datadog Agent. Elija esta opción para una configuración más sencilla, menor sobrecarga de costos y envío directo de registros.
- [**Sidecar**][2]: Implementa el Datadog Agent en un contenedor separado junto a su contenedor de aplicación. Elija esta opción si tiene varios contenedores en un solo servicio, si prefiere un aislamiento estricto del Datadog Agent o si tiene cargas de trabajo sensibles al rendimiento.

### Comparación: Instrumentación In-Container frente a sidecar {#comparison-in-container-versus-sidecar-instrumentation}

| Aspecto                        | In-Container                                               | Sidecar                                                                                                                                                      |
|-------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Implementación                    | Un contenedor (su aplicación, envuelta con el Datadog Agent) | Dos contenedores (su aplicación, Datadog Agent)                                                                                                                    |
| Cambios en la imagen                 | Aumenta el tamaño de la imagen de la aplicación.                                | Sin cambios en la imagen de la aplicación.                                                                                                                                      |
| Sobrecarga de costos                 | Menor que sidecar (sin contenedor adicional).                  | vCPU/memoria adicional. La sobreasignación del sidecar desperdicia costos; la subasignación conduce a un escalado prematuro.                                                       |
| Registro                       | Acceso directo a stdout/stderr.                             | Volumen compartido + enrutamiento de la biblioteca de registro a un archivo de registro. Los errores no detectados requieren un manejo adicional, ya que no son manejados automáticamente por su biblioteca de registro. |
| Aislamiento de fallas             | En casos raros, los errores del Datadog Agent pueden afectar su aplicación.   | Las fallas del Datadog Agent están aisladas.                                                                                                                           |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/serverless/google_cloud_run/containers/in_container
[2]: /es/serverless/google_cloud_run/containers/sidecar
[3]: /es/agentic_onboarding/setup
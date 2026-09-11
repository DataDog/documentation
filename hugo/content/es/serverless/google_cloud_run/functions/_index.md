---
further_reading:
- link: https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions
  tag: Blog
  text: Cloud Functions ahora es funciones de Cloud Run — programación basada en eventos
    en una plataforma sin servidor unificada
- link: /mcp_server/tools/#serverless_onboarding
  tag: Documentación
  text: 'Datadog MCP Server: herramienta serverless_onboarding'
title: Instrumentación de funciones de Cloud Run
type: multi-code-lang
---
<div class="alert alert-info">
<strong>¿Busca funciones de Cloud Run de 1.ª generación?</strong> Si utiliza funciones de Cloud Run (1.ª generación), anteriormente conocidas como Cloud Functions (1.ª generación), consulte <a href="/serverless/google_cloud_run/functions_1st_gen">Instrumentación de funciones de Cloud Run de 1.ª generación</a>.
</div>

## Incorporación mediante agentes {#set-up-with-agentic-onboarding}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Esta función no es compatible con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Utilice la incorporación mediante agentes para configurar el monitoreo de sus funciones de Cloud Run con asistencia de IA. La incorporación mediante agentes detecta los marcos de trabajo de su proyecto, aplica la configuración necesaria en el lugar y verifica que los datos fluyan. Dos rutas complementarias utilizan la misma cuenta de Datadog:

- **CLI de configuración de IA**: Una herramienta de terminal independiente. Úsela cuando no desee instalar MCP Server.
- **MCP Server**: Configúrelo desde su IDE a través de un asistente de codificación como Claude Code o Cursor.

{{< tabs >}}
{{% tab "CLI de configuración de IA" %}}

Ejecute la CLI en el directorio de su proyecto (requiere Node.js 22+). Vincula su cuenta de Datadog y luego instrumenta su función de Cloud Run:

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run-functions
```

Omita `--product` para ejecutar de forma interactiva, o agregue `--site` para dirigirse a su sitio de Datadog.

{{% /tab %}}
{{% tab "MCP Server" %}}

Utilice la herramienta del servidor de Datadog MCP [`serverless_onboarding`](https://docs.datadoghq.com/es/agentic_onboarding/setup/?tab=serverlessmonitoring#mcp-server) para configurar el monitoreo para sus funciones de Cloud Run con asistencia de IA. Después de conectarse, pruebe con un mensaje como:

```
Help me monitor my GCP Cloud Run functions with Datadog using Terraform.
```

{{% /tab %}}
{{< /tabs >}}

## Instrumentación manual {#manual-instrumentation}

Primero, configure la [integración de Datadog con Google Cloud Platform][1] para recopilar métricas y registros de los servicios de Google Cloud. Recuerde agregar el rol `cloud asset viewer` a su cuenta de servicio y habilitar la API de Cloud Asset Inventory en Google Cloud.

Luego, seleccione su entorno de ejecución a continuación para obtener instrucciones sobre cómo instrumentar su aplicación:

{{% container-languages path="google_cloud_run/functions" functions="true" %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/google-cloud-platform/
[2]: /es/agentic_onboarding/setup
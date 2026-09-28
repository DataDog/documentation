---
aliases:
- /es/serverless/installation/installing_the_library/
- /es/serverless/installation
- /es/serverless/aws_lambda/installation
further_reading:
- link: /serverless/configuration/
  tag: Documentación
  text: Configurar Serverless Monitoring
- link: /integrations/amazon_lambda/
  tag: Documentación
  text: Integración con AWS Lambda
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: Centro de aprendizaje
  text: Configurar AWS Lambda para Serverless Monitoring con Datadog
- link: /mcp_server/tools/#serverless_onboarding
  tag: Documentación
  text: 'Datadog MCP Server: herramienta serverless_onboarding'
title: Instrumentar aplicaciones de AWS Lambda
---
## Descripción general {#overview}

Instrumente sus aplicaciones de AWS Lambda con Datadog Lambda Extension para recopilar trazas, métricas mejoradas y métricas personalizadas. Datadog Lambda Extension es análoga al uso de Datadog Agent y los SDK de Datadog para infraestructura basada en servidor y aplicaciones.

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Un diagrama que muestra cómo Datadog recibe telemetría de su aplicación de AWS Lambda instrumentada. Su aplicación Lambda, instrumentada con Datadog Lambda Library, envía registros, trazas, métricas mejoradas y métricas personalizadas a Datadog Lambda Extension, que luego envía estos datos a Datadog." style="width:100%;" >}}

## Inicio rápido {#quick-start}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Esta función no es compatible con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Para comenzar, [regístrese para obtener una cuenta de Datadog][1] si aún no tiene una. Luego, siga el [flujo de instalación en la aplicación en Fleet Automation][8] para AWS Lambda para instrumentar sus funciones Lambda. Esta configuración de inicio rápido permite que sus funciones envíen métricas, registros y trazas en tiempo real a Datadog.

Hay una aplicación de muestra [disponible en GitHub][6] con instrucciones sobre cómo implementar con múltiples entornos de ejecución y herramientas de infraestructura como código.

El proceso de inicio rápido configura sus funciones Lambda sobre la marcha. Para instrumentar funciones Lambda de forma permanente, consulte las secciones a continuación para la incorporación mediante agentes o la instrumentación manual.

## Incorporación mediante agentes {#set-up-with-agentic-onboarding}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Esta función no es compatible con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Utilice la incorporación mediante agentes para configurar el monitoreo de sus funciones Lambda con asistencia de IA. La incorporación mediante agentes detecta los marcos de trabajo de su proyecto, aplica la configuración necesaria en el lugar y verifica que los datos fluyan. Dos rutas complementarias utilizan la misma cuenta de Datadog:

- **CLI de configuración de IA**: Una herramienta de terminal independiente. Úsela cuando no desee instalar MCP Server.
- **MCP Server**: Configúrelo desde su IDE a través de un asistente de codificación como Claude Code o Cursor.

{{< tabs >}}
{{% tab "CLI de configuración de IA" %}}

Ejecute la CLI en el directorio de su proyecto (requiere Node.js 22+). Vincula su cuenta de Datadog y luego instrumenta su función Lambda:

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=aws-lambda
```

Omita `--product` para ejecutar de forma interactiva, o agregue `--site` para dirigirse a su sitio de Datadog.

{{% /tab %}}
{{% tab "MCP Server" %}}

Utilice la herramienta [`serverless_onboarding`](https://docs.datadoghq.com/es/agentic_onboarding/setup/?tab=serverlessmonitoring#mcp-server) del servidor de Datadog MCP para configurar el monitoreo para sus funciones Lambda con asistencia de IA. Después de conectarse, pruebe con un mensaje como:

```
Help me monitor my AWS Lambda functions with Datadog.
```

{{% /tab %}}
{{< /tabs >}}

## Instrumentación manual {#manual-instrumentation}

{{< card-grid card_width="30%" image_width="200" >}}
  {{< image-card href="/serverless/installation/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/serverless/installation/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/serverless/installation/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/serverless/installation/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/serverless/installation/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/serverless/installation/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
{{< /card-grid >}}

## Configuraciones avanzadas {#advanced-configurations}

Una vez que haya terminado con la instrumentación y haya configurado la recopilación de telemetría, puede usar [Configure Serverless Monitoring for AWS Lambda][3] para:

- conectar sus métricas, trazas y registros mediante etiquetas
- recopilar telemetría de recursos de AWS como API Gateway, AppSync y Step Functions
- capturar las cargas útiles de solicitud y respuesta para invocaciones individuales de Lambda
- vincular errores de sus funciones Lambda con su código fuente
- filtrar o depurar información confidencial de registros o trazas

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[3]: /es/serverless/aws_lambda/configuration/
[4]: /es/serverless/aws_lambda/fips-compliance/
[5]: /es/serverless/aws_lambda/remote_instrumentation
[6]: https://github.com/DataDog/serverless-sample-app
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=lambda
[9]: /es/mcp_server/tools/#serverless_onboarding
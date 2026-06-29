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
  text: Integración de AWS Lambda
title: Instrumentar aplicaciones de AWS Lambda
---
## Descripción general {#overview}

Instrumente sus aplicaciones de AWS Lambda con el Datadog Lambda Extension para recopilar trazas, métricas mejoradas y métricas personalizadas. El Datadog Lambda Extension es análogo a usar el Datadog Agent y los Datadog SDKs para infraestructura y aplicaciones basadas en host.

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Un diagrama que muestra cómo Datadog recibe telemetría de su aplicación de AWS Lambda instrumentada. Su aplicación Lambda, instrumentada con el Datadog Lambda Library, envía registros, trazas, métricas mejoradas y métricas personalizadas al Datadog Lambda Extension, que luego envía estos datos a Datadog." style="width:100%;" >}}

## Inicio rápido {#quick-start}

Para comenzar, [régístrese para obtener una cuenta de Datadog][1] si aún no la tiene. Luego, siga el [flujo de instalación en la aplicación en Fleet Automation][8] para AWS Lambda para instrumentar sus funciones Lambda. Esta configuración de inicio rápido permite que sus funciones envíen métricas, registros y trazas en tiempo real a Datadog.

Una aplicación de muestra está [disponible en GitHub][6] con instrucciones sobre cómo desplegar con múltiples entornos de ejecución y herramientas de infraestructura como código.

El proceso de inicio rápido configura sus funciones Lambda sobre la marcha. Para instrumentar funciones Lambda de manera permanente, consulte las instrucciones detalladas en la siguiente sección.

## Usar el Datadog MCP server {#use-the-datadog-mcp-server}

Utilice el [Datadog MCP server][9] para configurar el seguimiento de sus contenedores de AWS Lambda con asistencia de IA. Después de conectarse, pruebe un aviso como:

```shell
Help me monitor my AWS Lambda functions with Datadog
```

## Instrucciones de instrumentación {#instrumentation-instructions}

{{< card-grid card_width="30%" image_width="200" >}}
  {{< image-card href="/serverless/installation/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/serverless/installation/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/serverless/installation/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/serverless/installation/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/serverless/installation/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/serverless/installation/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
{{< /card-grid >}}

## Configuraciones avanzadas {#advanced-configurations}

Después de que haya terminado con la instrumentación y haya configurado la recolección de telemetría, puede usar [Configurar Serverless Monitoring para AWS Lambda][3] para:

- conectar sus métricas, trazas y registros usando etiquetas
- recolectar telemetría de recursos de AWS como API Gateway, AppSync y Step Functions
- capturar las cargas útiles de solicitud y respuesta para invocaciones individuales de Lambda
- vincular errores de sus funciones Lambda a su código fuente
- filtrar o eliminar información sensible de registros o trazas

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[3]: /es/serverless/aws_lambda/configuration/
[4]: /es/serverless/aws_lambda/fips-compliance/
[5]: /es/serverless/aws_lambda/remote_instrumentation
[6]: https://github.com/DataDog/serverless-sample-app
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=lambda
[9]: /es/agentic_onboarding/setup
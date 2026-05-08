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
title: Instrumentar aplicaciones AWS Lambda
---

## Información general

Instrumenta tus aplicaciones AWS Lambda con una biblioteca Lambda de Datadog para recopilar traces (trazas), métricas mejoradas y métricas personalizadas.

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Un diagrama en el que se muestra cómo recibe Datadog la telemetría desde tu aplicación instrumentada AWS Lambda. Tu aplicación Lambda, instrumentada una biblioteca Datadog Lambda, envía logs, traces (trazas), métricas mejoradas y métricas personalizadas a la Extensión Datadog Lambda, que luego envía estos datos a Datadog." style="width:100%;" >}}

## Inicio rápido

Para empezar, [regístrate para obtener una cuenta en Datadog ][1] si aún no tienes una. A continuación, sigue el [flujo de instalación dentro de la aplicación en Fleet Automation][8] para AWS Lambda para instrumentar tus funciones Lambda. Esta configuración de inicio rápido permite a tus funciones enviar métricas, logs y traces (trazas) en tiempo real a Datadog.

Hay una aplicación de muestra [disponible en GitHub][6] con instrucciones sobre cómo desplegarla con múltiples tiempos de ejecución y herramientas de infraestructura como código.

El proceso de inicio rápido configura tus funciones Lambda sobre la marcha. Para instrumentar funciones Lambda de forma permanente, consulta las instrucciones detalladas de la siguiente sección.

## Instrucciones de instrumentación

Para los tiempos de ejecución de Node.js y Python, puedes utilizar la [instrumentación remota][5] para añadir instrumentación a tus funciones de AWS Lambda y mantenerlas instrumentadas de forma segura. Consulta [Instrumentación remota para AWS Lambda][5].

Para otros tiempos de ejecución Lambda (o para instrumentar tus funciones Node.js o Python sin instrumentación remota) consulta las instrucciones detalladas de instrumentación:

{{< partial name="serverless/getting-started-languages.html" >}}

## Configuraciones avanzadas

Una vez que hayas terminado con la instrumentación y hayas instalado la recopilación de telemetría, puedes utilizar [Configurar Serverless Monitoring para AWS Lambda][3] para:

- conectar tus métricas, trazas y logs mediante etiquetas (tags);
- recopilar telemetría de recursos de AWS como API Gateway, AppSync y Step Functions;
- capturar las cargas útiles de solicitud y respuesta para invocaciones de Lambda individuales;
- vincular los errores de tus funciones de Lambda con tu código fuente;
- filtrar o borrar información confidencial de logs o trazas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[3]: /es/serverless/aws_lambda/configuration/
[4]: /es/serverless/aws_lambda/fips-compliance/
[5]: /es/serverless/aws_lambda/remote_instrumentation
[6]: https://github.com/DataDog/serverless-sample-app
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=lambda
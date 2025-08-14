---
aliases:
- /es/serverless/installation/installing_the_library/
- /es/serverless/installation
further_reading:
- link: /serverless/configuration/
  tag: Documentación
  text: Configurar Serverless Monitoring
- link: /integrations/amazon_lambda/
  tag: Documentación
  text: Integración de AWS Lambda
title: Instalar Serverless Monitoring para AWS Lambda
---

## Inicio rápido

Si estás dando tus primeros pasos en Datadog, [regístrate para obtener una cuenta de Datadog][1] y luego sigue las instrucciones de instalación del Datadog Agent para [AWS Lambda][2] de modo que puedas instrumentar tu función de Lambda y lograr un inicio rápido con Datadog. Completar estos pasos configura tus funciones de Lambda para enviar métricas, logs y trazas (traces) a Datadog en tiempo real.

<div class="alert alert-info">En GitHub hay <a href="https://github.com/DataDog/serverless-sample-app">disponible</a> una aplicación de ejemplo con instrucciones sobre cómo desplegarla con múltiples tiempos de ejecución y herramientas de infraestructura como código.</div>

El proceso de inicio rápido configura tus funciones de Lambda de forma temporal. Para instrumentar funciones de Lambda de forma permanente, consulta las instrucciones de instalación detalladas en la siguiente sección.

## Instrucciones de instalación

Para los tiempos de ejecución de Node.js y Python, puedes utilizar la [instrumentación remota][5] para añadir instrumentación a tus funciones de AWS Lambda y mantenerlas instrumentadas de forma segura. Consulta [Instrumentación remota para AWS Lambda][5].

Para otros tiempos de ejecución de Lambda (o para instrumentar tus funciones de Node.js o Python sin instrumentación remota) consulta las instrucciones de instalación detalladas:

{{< partial name="serverless/getting-started-languages.html" >}}

## Soporte para el cumplimiento de FIPS

Datadog proporciona monitorización conforme a FIPS para las funciones de AWS Lambda a través de capas de extensión de Lambda conformes a FIPS dedicadas y configuraciones específicas del tiempo de ejecución. Los componentes conformes con FIPS implementan criptografía certificada por FIPS y funcionan con cualquier sitio de Datadog, pero el cumplimiento de FIPS de extremo a extremo requiere el uso del sitio US1-FED. Si necesitas mantener la conformidad con FIPS mientras monitorizas tus funciones de Lambda, consulta la página de documentación [AWS Lambda FIPS Compliance][4] para obtener más detalles.

## Configuraciones avanzadas

Una vez finalizada la instalación y configurada la recopilación de telemetría, puedes utilizar las [configuraciones avanzadas][3] para hacer lo siguiente:

- conectar tus métricas, trazas y logs mediante etiquetas (tags);
- recopilar telemetría de recursos de AWS como API Gateway, AppSync y Step Functions;
- capturar las cargas útiles de solicitud y respuesta para invocaciones de Lambda individuales;
- vincular los errores de tus funciones de Lambda con tu código fuente;
- filtrar o borrar información confidencial de logs o trazas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[2]: https://app.datadoghq.com/signup/agent#lambda
[3]: /es/serverless/configuration/
[4]: /es/serverless/aws_lambda/fips-compliance/
[5]: /es/serverless/aws_lambda/remote_instrumentation
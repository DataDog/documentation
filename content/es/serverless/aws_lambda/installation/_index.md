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
kind: documentación
title: Instalar Serverless Monitoring para AWS Lambda
---

## Inicio rápido

Si estás dando tus primeros pasos en Datadog, [regístrate para obtener una cuenta de Datadog][1] y luego sigue las instrucciones de instalación del Datadog Agent para [AWS Lambda][2] de modo que puedas instrumentar tu función de Lambda y lograr un inicio rápido con Datadog. Completar estos pasos configura tus funciones de Lambda para enviar métricas, logs y trazas (traces) a Datadog en tiempo real.

{{< beta-callout-private url="https://docs.google.com/forms/d/e/1FAIpQLScw8XBxCyN_wjBVU2tWm-zX5oPIGF7BwUKcLSHY6MJsem259g/viewform?usp=sf_link" >}}
¿Te interesa instrumentar funciones de AWS Lambda de forma masiva directamente desde la interfaz de usuario de Datadog? Para participar, solicita acceso a la próxima fase beta privada de instrumentación de Lambda en remoto.
{{< /beta-callout-private >}}

El proceso de inicio rápido configura tus funciones de Lambda de forma temporal. Para instrumentar funciones de Lambda de forma permanente, consulta las instrucciones de instalación detalladas en la siguiente sección.

## Instrucciones de instalación

Para obtener instrucciones de instalación detalladas, selecciona el tiempo de ejecución de Lambda a continuación:

{{< partial name="serverless/getting-started-languages.html" >}}

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
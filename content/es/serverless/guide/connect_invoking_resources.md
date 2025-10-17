---
aliases:
- /es/serverless/troubleshooting/connect_invoking_resources/
title: Mayor visibilidad de los recursos que invocan funciones de Lambda
---

De forma predeterminada, la [Vista Serverless][4] agrupa los recursos serverless por servicio para que puedas visualizar el rendimiento de cada parte de tu aplicación. Puedes ver las funciones que le pertenecen cada servicio, junto con los recursos (Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis) que las invocaron.

Aunque la agrupación por servicio es la predeterminada, también puedes agrupar tus recursos por nombre de stack tecnológico de AWS CloudFormation, así como por cualquier otra etiqueta (tag) que hayas configurado (como equipo, proyecto o entorno).

## Configuración

Si vas a instrumentar tus funciones de Lambda por primera vez, sigue las [instrucciones de instalación serverless][1].

Los recursos gestionados se conectan automáticamente a tus funciones de AWS Lambda si se cumplen las siguientes condiciones en conjunto:
- Tus funciones están escritas en tiempos de ejecución de Lambda de Node.js o Python.
- Tienes configurado [APM con la integración de X-Ray de Datadog][2] en tus funciones junto con la [biblioteca Lambda de Datadog para enriquecer los segmentos de AWS X-Ray][3] **O** tienes configurado [APM con las bibliotecas de rastreo de Datadog][2] (`dd-trace`) en tus funciones.
- El recurso gestionado que invoca tu función es uno de los siguientes: API Gateway, SQS, SNS, EventBridge, Kinesis, DynamoDB, S3.
- Tus funciones están instrumentadas con una versión reciente de la librería Lambda de Datadog (>= `v3.46.0` para Node, >= `v28` para Python).

[1]: /es/serverless/installation
[2]: /es/serverless/distributed_tracing#choose-your-tracing-library
[3]: /es/integrations/amazon_xray/#enriching-xray-segments-with-datadog-libraries
[4]: https://app.datadoghq.com/functions

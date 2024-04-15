---
further_reading:
- link: /agent/basic_agent_usage/
  tag: Documentación
  text: Uso básico del Agent
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participa en una sesión interactiva para saber más sobre monitorización serverless.
kind: documentación
title: Empezando con AWS Lambda Serverless Monitoring
---

## Información general

_Serverless_ es un modelo en el que los desarrolladores crean y ejecutan aplicaciones y servicios mediante un proveedor de soluciones en la nube en lugar de gestionar la infraestructura ellos mismos. La [monitorización serverless][1] de Datadog recopila métricas, logs y trazas (traces) de tu infraestructura serverless, lo que te permite supervisar el estado y el rendimiento de tu aplicación.

Esta guía utiliza una [aplicación de muestreo][2] serverless que puedes iniciar con un solo clic. Esta aplicación tiene monitorización serverless preconfigurada. Sigue esta guía para entender cómo puedes solucionar problemas en tu aplicación de muestreo y qué tipo de visibilidad te ofrece la monitorización serverless.

### Instala la aplicación de muestreo

1. [Inicia el stack de CloudFormation][3]. Este enlace te lleva a la página **Create stack** (Crear stack) en CloudFormation.
2. Introduce tu [clave de API de Datadog][4] y [sitio de Datadog][5] ({{< region-param key="dd_site" code="true" >}}). 

  {{< img src="getting_started/serverless/aws_create_stack.png" alt="Primer plano de dos funciones" style="width:80%;">}}

   A continuación, identifica las funciones de IAM y haz clic en **Create stack**.

3. Cuando hayas creado el stack, abre la pestaña Outputs (Salidas).

  {{< img src="getting_started/serverless/aws_outputs.png" alt="Primer plano de dos funciones" style="width:80%;">}}

  Invoca tu aplicación de muestreo varias veces visitando `ApiGatewayInvokeURL`. Se mostrará el mensaje "Sent message to SNS" (Mensaje enviado a SNS).

Cada invocación ejecuta lo siguiente:

```python
import boto3, os

def handler(event, context):
    sns = boto3.client('sns')

    sns.publish(
        TopicArn=os.environ.get("SNS_TOPIC_ARN"),
        Message='Message sent to SNS'
        )

    return {
        "body": "Sent message to SNS",
        "statusCode": 200
    }
```

Puedes [ver tus funciones de la aplicación de muestra en Serverless View][6].

{{< img src="getting_started/serverless/dd_serverless_view.png" alt="Monitorización serverless: vista Serverless, una página de navegador" style="width:80%;">}}

## Vista Serverless

La vista Serverless muestra la telemetría de todos los recursos sin servidor en tu entorno de AWS. Puedes usar esta página como punto de partida para monitorizar, depurar y optimizar tus aplicaciones.

Si has invocado tu aplicación de muestreo al menos una vez, verás `datadog-sample-entry-function` y `datadog-sample-sqs-consumer-function`:

{{< img src="getting_started/serverless/functions_view.png" alt="Primer plano de dos funciones" style="width:80%;">}}

### Información sobre Serverless
En la vista Serverless, la última columna a la derecha se llama **Insights** (Información). Datadog resalta automáticamente los posibles problemas de tus aplicaciones serverless, como [errores importantes][7] y [largas duraciones][8], y estos problemas aparecen en la columna Insights.

Es probable que Datadog haya detectado un [arranque en frío][9] en tu aplicación de muestreo serverless. Los arranques en frío ocurren cuando la aplicación serverless recibe un aumento repentino del tráfico. Esto puede ocurrir si la función recibía anteriormente una cantidad relativamente constante de solicitudes y de repente empieza a recibir más o, como sucede en este caso, si se invoca por primera vez una función que estaba previamente inactiva.

## Crea un error para investigarlo

Puedes causar un error intencionadamente al editar la `datadog-sample-entry-function` en el stack de la aplicación de muestreo.

```python
  # Introducción del código de función lambda
  def handler(event, context):

    raise Exception('Genera un error.')
```

{{< img src="getting_started/serverless/aws_error.png" alt="Primer plano de dos funciones" style="width:80%;">}}


Despliega este cambio e invoca tu aplicación de muestreo de nuevo para ver cómo puedes investigar el error en Datadog.

{{< img src="getting_started/serverless/dd_serverless_view_error.png" alt="Primer plano de dos funciones" style="width:80%;">}}

Si te fijas, `datadog-sample-entry-function` tiene cinco errores.

## Detalles de la función
Haz clic en tu función para ver más detalles sobre las invocaciones y despliegues recientes.

{{< img src="getting_started/serverless/details_error.png" alt="Primer plano de dos funciones" style="width:80%;">}}

Como se muestra arriba, la vista detallada incluye tres gráficos. Puedes configurarlos para que muestren cualquier métrica disponible. De forma predeterminada, muestran tres [métricas Lambda mejoradas][10]: invocaciones, errores y duración.

Datadog genera métricas Lambda mejoradas y predefinidas con baja latencia, precisión de varios segundos y metadatos detallados para los arranques en frío y las etiquetas (tags) personalizadas. También puedes ver el [dashboard de métricas Lambda mejoradas][11] de manera predeterminada.


### Invocaciones
La pestaña **Invocations** (Invocaciones) muestra las invocaciones recientes de tu función. 

Cada invocación está asociada a una traza. Haz clic en **Open Trace** (Abrir traza) para ver la traza correspondiente a cada invocación:

{{< img src="getting_started/serverless/dd_flame_graph.png" alt="Primer plano de dos funciones" style="width:80%;">}}

La pestaña **Flame Graph** (Gráfico tipo llama) muestra exactamente lo que ha sucedido durante el tiempo de esta invocación, así como los servicios que ocuparon el mayor porcentaje del tiempo total de ejecución. Este gráfico muestra el recorrido de la solicitud desde APIGateway hasta tu `datadog-sample-sqs-function`, pasando por tu `datadog-sample-entry-function`, SNS y SQS.

{{< img src="getting_started/serverless/trace_map.png" alt="Primer plano de dos funciones" style="width:80%;">}}

La pestaña **Trace Map** (Mapa de trazas) representa el flujo de tus servicios y cómo están conectados entre sí.

La mitad inferior de la vista detallada de trazas muestra un stack trace, que informa sobre la línea de código que genera el error:

```
Traceback (most recent call last):
  File /opt/python/lib/python3.9/site-packages/datadog_lambda/wrapper.py, line 142, in __call__
    self.response = self.func(event, context, **kwargs)
File /var/task/index.py, line 17, in handler
    raise Exception('Genera un error.')
Exception: Genera un error.
```

Debajo, también podrás examinar las cargas útiles de solicitud y respuesta de Lambda. Datadog recopila las cargas útiles de eventos en cada invocación de Lambda.

### Logs

La aplicación de muestreo serverless tiene los logs activados por defecto. Puedes consultar los logs de cada función en la pestaña **Logs**.

{{< img src="getting_started/serverless/dd_logs_view.png" alt="Primer plano de dos funciones" style="width:80%;">}}

Puedes filtrar estos logs para ver solo los errores, o verlos en el [Log Explorer][12].


[1]: /es/serverless
[2]: https://github.com/DataDog/serverless-sample-app
[3]: https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-serverless-sample-app&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-sample-app/latest.yaml
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/es/getting_started/site
[6]: https://app.datadoghq.com/functions?cloud=aws&text_search=datadog-serverless-sample-app
[7]: https://docs.datadoghq.com/es/serverless/guide/insights/#high-errors
[8]: https://docs.datadoghq.com/es/serverless/guide/insights/#high-duration
[9]: https://docs.datadoghq.com/es/serverless/guide/insights/#cold-starts
[10]: https://docs.datadoghq.com/es/serverless/enhanced_lambda_metrics
[11]: https://app.datadoghq.com/screen/integration/30306?_gl=1*19700i3*_ga*OTk0Mjg4Njg4LjE2NDIwOTM2OTY.*_ga_KN80RDFSQK*MTY0OTI3NzAyMC4xNTAuMS4xNjQ5MjgzMjI1LjA.
[12]: https://docs.datadoghq.com/es/logs/explorer/
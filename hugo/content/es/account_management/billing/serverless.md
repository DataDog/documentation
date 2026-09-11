---
title: Facturación de serverless
---

## Gestionar el uso

Puedes hacer un seguimiento de tu uso total y facturable de serverless en la página de uso de Datadog. Es posible consultar tanto el resumen del último mes como el uso histórico.

La monitorización serverless de Datadog se factura según una combinación de invocaciones y funciones lambda activas que se rastrean y monitorizan dentro de Datadog. Las métricas relevantes para tu plan se pueden ver en la pestaña Serverless de la página Plan and Usage (Plan y uso), en el [filtro Billable][1] (Facturable). Para obtener más información sobre tu plan y uso, ponte en contacto con tu [asesor de clientes][3].

Las funciones lambda se pueden monitorizar a través de la [integración de AWS con Datadog][10] o mediante instrumentación directa con las capas de la [extensión Lambda][11] y [Forwarder][12].

## Integración

Para controlar qué funciones se están monitorizando con la integración, puedes utilizar los controles de recopilación de métricas [de la integración de Lambda][13] a través de la IU y la API.

### IU

Si quieres usar la IU para controlar qué funciones de AWS Lambda monitoriza Datadog, accede a la [página Integración de AWS][5]. En la barra lateral izquierda, selecciona la cuenta de AWS correspondiente y ve a la **pestaña Metric Collection** (Recopilación de métricas). Desplázate hacia abajo hasta el encabezado **Limit Metric Collection to Specific Resources** (Limitar la recopilación de métricas a recursos específicos) y selecciona Lambda en el menú desplegable **Select AWS Service** (Seleccionar servicio AWS). A continuación, podrás añadir etiquetas (tags) como conjuntos `key:value` en el campo de la derecha.

Para obtener más información sobre el uso de etiquetas en este campo, consulta la sección [Etiquetas (tags)](#Tags).

### API

Si deseas utilizar la API para controlar qué funciones de AWS Lambda monitoriza Datadog, consulta la [documentación sobre el filtro de etiquetas de la API][6].

### Etiquetas (tags)

Datadog permite introducir una lista de etiquetas separadas por comas con el formato `key:value`. Esta lista define un filtro que se utiliza al recopilar métricas del servicio de AWS asociado. Estos pares `key:value` pueden tanto permitir como excluir etiquetas. Para definir una exclusión, añade un signo `!` antes de la clave de la etiqueta. También se pueden utilizar comodines, como `?` (para caracteres únicos) y `*` (para caracteres múltiples).

El filtro solo excluye los recursos en los que faltan todas las etiquetas permitidas, es decir, en los que la lista de etiquetas permitidas está formada por una sentencia "OR".

Por ejemplo: `datadog:monitored,env:production`

Este filtro solo recopila instancias EC2 que contengan la etiqueta `datadog:monitored` o la etiqueta `env:production`.

Si añades una etiqueta de exclusión a la lista, esta tendrá prioridad; es decir, al añadir una etiqueta de exclusión, se añade una sentencia "AND".

Por ejemplo: `datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1`

Este filtro solo recopila las instancias EC2 que contengan la etiqueta
`datadog:monitored` o `env:production`, o bien una etiqueta "instance-type" con un valor `c1.*`, Y NO contengan una etiqueta `region:us-east-1`. 

## Instrumentación

Datadog proporciona una [extensión Lambda][14] y varias capas Lambda diferentes para rastrear y monitorizar funciones según tu tiempo de ejecución. Las funciones activas que se instrumentan y monitorizan con estas bibliotecas conllevan un uso sujeto a facturación, incluso cuando la integración de AWS está deshabilitada.

Datadog ofrece múltiples herramientas para gestionar la instalación y configuración de estas bibliotecas, que pueden utilizarse para escalar y automatizar la instalación o gestión de las bibliotecas lambda de Datadog. Para obtener más información, accede a la página [Instalar la monitorización serverless para AWS Lambda][15].

## Definición de funciones activas

La facturación de Datadog se basa en el número medio de funciones ejecutadas por hora durante todo el mes en cada una de tus cuentas. Cada hora, Datadog registra el número de funciones que se han ejecutado una o más veces y que se han monitorizado mediante tu cuenta Datadog. Al final del mes, Datadog calcula la media del número de funciones por hora registradas y cobra en consecuencia. Los planes Pro y Enterprise incluyen cinco métricas personalizadas por función facturable. Se define una sola función facturable a través de una única función ARN. En el caso de Lambda@Edge, se contabiliza cada función que se registre en una región diferente como una función facturable independiente.

La facturación de APM serverless se basa en la suma de invocaciones de AWS Lambda conectadas a tramos (spans) ingeridos de APM en un mes concreto. También se cobrará por el número total de [tramos indexados][4] enviados al servicio APM de Datadog que superen la cantidad incluida al final del mes. Cuando se utiliza serverless, no se cobran los [hosts de APM][4].

## Solucionar problemas

Si tienes alguna duda de índole técnica, contacta con el [equipo de asistencia de Datadog][7].
Para obtener más información sobre la facturación o sobre tu plan y uso, ponte en contacto con tu [asesor de clientes][3].

[1]: https://app.datadoghq.com/billing/usage?category=serverless&data_source=billable
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://app.datadoghq.com/account/usage
[5]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[6]: /es/api/latest/aws-integration/#set-an-aws-tag-filter
[7]: /es/help/
[8]: https://app.datadoghq.com/functions
[9]: https://app.datadoghq.com/metric/explorer?exp_metric=aws.lambda.invocations&exp_group=functionname&exp_agg=sum
[10]: /es/integrations/amazon_billing/
[11]: /es/serverless/libraries_integrations/extension/
[12]: /es/logs/guide/forwarder/
[13]: /es/integrations/amazon_lambda/
[14]: /es/serverless/aws_lambda
[15]: /es/serverless/installation/
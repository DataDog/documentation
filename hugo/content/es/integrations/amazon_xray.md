---
aliases:
- /es/integrations/awsxray/
app_id: amazon_xray
categories:
- aws
- nube
- rastreo
custom_kind: integración
description: Rastrear solicitudes a medida que pasan por los servicios de AWS
title: AWS X-Ray
---
{{< site-region region="gov" >}}

<div class="alert alert-danger">La integración de AWS Lambda X-Ray con Datadog solo es compatible con las cuentas comerciales de AWS. Sin una cuenta comercial de Lambda, la integración de AWS Lambda X-Ray con Datadog no es compatible con el sitio Datadog for Government.</div>

{{< /site-region >}}

## Información general

AWS X-Ray permite a los desarrolladores rastrear aplicaciones distribuidas creadas con productos AWS. Esta integración proporciona trazas (traces) de funciones Lambda en la página de detalles de las funciones [serverless](http://app.datadoghq.com/functions). Para obtener más información, consulta [Monitorización serverless](https://docs.datadoghq.com/serverless/).

## Configuración

### Instalación

Primero, [habilita la integración AWS](https://docs.datadoghq.com/integrations/amazon_web_services/) y asegúrate de que los siguientes permisos están presentes en el documento de la política del rol de tu integración Datadog:

```text
xray:BatchGetTraces,
xray:GetTraceSummaries
```

El permiso `GetTraceSummaries` se utiliza para obtener la lista de trazas recientes. `BatchGetTraces` devuelve las trazas completas.

A continuación, [habilita la integración X-Ray](https://app.datadoghq.com/integrations/amazon-xray) en Datadog.

Si estás utilizando una [clave maestra de cliente (CMK)](https://docs.aws.amazon.com/whitepapers/latest/kms-best-practices/customer-master-keys.html) para cifrar trazas, añade el método `kms:Decrypt` a tu política donde el recurso es la CMK utilizada para X-Ray.

**Nota:** Habilitar la integración AWS X-Ray aumenta la cantidad de tramos (spans) indexados, lo que puede incrementar tu factura.

### Habilitar AWS X-Ray para tus funciones

1. Sigue las instrucciones de AWS para activar el rastreo X-Ray en tus [funciones Lambda](https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html) y [puertas de enlace de API](https://docs.aws.amazon.com/xray/latest/devguide/xray-services-apigateway.html).
1. Para aprovechar al máximo la integración AWS X-Ray, también [instala el SDK de X-Ray](https://docs.aws.amazon.com/xray/latest/devguide/xray-instrumenting-your-app.html#xray-instrumenting-xray-sdk) en tu función Lambda.

### Enriquecer las trazas de X-Ray con Datadog

Datadog puede enriquecer las trazas de X-Ray con tramos y metadatos generados por el cliente Datadog APM y [fusionarlos](https://docs.datadoghq.com/serverless/distributed_tracing/serverless_trace_merging) en una única traza de Datadog para la misma invocación de Lambda.

1. [Instala la monitorización serverless de Datadog](https://docs.datadoghq.com/serverless/installation) en tus funciones Lambda.
1. Define la variable de entorno `DD_MERGE_XRAY_TRACES` como `true` en tus funciones Lambda.

**Nota**: Sólo se pueden fusionar trazas de X-Ray con funciones Lambda instrumentadas con Datadog.

## Datos recopilados

La integración AWS X-Ray extrae datos de trazas de AWS y no recopila métricas ni logs.
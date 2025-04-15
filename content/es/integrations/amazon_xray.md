---
aliases:
- /es/integrations/awsxray/
categories:
- aws
- nube
- rastreo
custom_kind: integration
dependencies: []
description: Rastrear solicitudes a medida que pasan por los servicios de AWS
doc_link: https://docs.datadoghq.com/integrations/amazon_xray/
draft: false
git_integration_title: amazon_xray
has_logo: true
integration_id: ''
integration_title: AWS X-Ray
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_xray
public_title: Integración de AWS X-Ray con Datadog
short_description: Rastrear solicitudes a medida que pasan por los servicios de AWS
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-warning">La integración de AWS Lambda X-Ray con Datadog solo es compatible con las cuentas comerciales de AWS. Sin una cuenta comercial de Lambda, la integración de AWS Lambda X-Ray con Datadog no es compatible con el sitio Datadog for Government.</div>

{{< /site-region >}}
## Información general

AWS X-Ray permite a los desarrolladores rastrear aplicaciones distribuidas creadas con productos de AWS. Esta integración proporciona trazas (traces) para funciones Lambda en la página de detalles de la función [Serverless][1]. Para obtener más información, consulta [Serverless Monitoring][2].

## Configuración

### Instalación

Primero, [habilita la integración de AWS][3] y asegúrate de que los siguientes permisos estén presentes en el documento de política de tu rol de integración de Datadog:

```text
xray:BatchGetTraces,
xray:GetTraceSummaries
```

El permiso `GetTraceSummaries` se utiliza para obtener la lista de trazas recientes. `BatchGetTraces` devuelve las trazas completas.

A continuación, [habilita la integración X-Ray][4] en Datadog.

Si estás utilizando una [clave maestra de cliente (CMK)][5] para cifrar trazas, añade el método `kms:Decrypt` a tu política donde el recurso es la CMK utilizada para X-Ray.

**Nota:** Habilitar la integración AWS X-Ray aumenta la cantidad de tramos (spans) indexados, lo que puede incrementar tu factura.

### Habilitar AWS X-Ray para tus funciones

1. Sigue las instrucciones de AWS para habilitar el rastreo de X-Ray en tus [funciones Lambda][6] y [API Gateways][7].
2. Para aprovechar al máximo la integración AWS X-Ray, también [instala el SDK de X-Ray][8] en tu función Lambda.

### Enriquecer las trazas de X-Ray con Datadog

Datadog puede enriquecer las trazas de X-Ray con tramos y metadatos generados por el cliente Datadog APM y [fusionarlos][9] en una única traza de Datadog para la misma invocación de Lambda.

1. [Instala Datadog Serverless Monitoring][10] en tus funciones Lambda.
2. Define la variable de entorno `DD_MERGE_XRAY_TRACES` como `true` en tus funciones Lambda.

## Datos recopilados

La integración AWS X-Ray extrae datos de trazas de AWS y no recopila métricas ni logs.

[1]: http://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/es/serverless/
[3]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[4]: https://app.datadoghq.com/integrations/amazon-xray
[5]: https://docs.aws.amazon.com/whitepapers/latest/kms-best-practices/customer-master-keys.html
[6]: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
[7]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-apigateway.html
[8]: https://docs.aws.amazon.com/xray/latest/devguide/xray-instrumenting-your-app.html#xray-instrumenting-xray-sdk
[9]: https://docs.datadoghq.com/es/serverless/distributed_tracing/serverless_trace_merging
[10]: https://docs.datadoghq.com/es/serverless/installation
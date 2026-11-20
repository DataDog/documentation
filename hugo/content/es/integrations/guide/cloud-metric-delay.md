---
aliases:
- /es/integrations/faq/are-my-aws-cloudwatch-metrics-delayed/
- /es/integrations/faq/why-is-there-a-delay-in-receiving-my-data/
- /es/integrations/faq/cloud-metric-delay
description: Comprenda los retrasos esperados para AWS, Azure, Google Cloud y otras
  métricas de integración en la nube recopiladas por API.
further_reading:
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: PREGUNTAS FRECUENTES
  text: ¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?
title: Retraso de métricas en la nube
---
## Descripción general {#overview}

Al utilizar cualquier integración en la nube de Datadog (AWS, Azure, Google Cloud, etc.), las métricas se obtienen mediante API con un rastreador. Es posible que observe un retraso en las métricas debido a las limitaciones de la API del proveedor de nube.

## Resumen {#summary}

| Proveedor   | Rastreador predeterminado  |
|------------|------------------|
| Alibaba    | Cada 10 minutos |
| AWS        | Cada 10 minutos (con la excepción de las [métricas de RDS][3], que se recopilan cada 3 minutos) |
| Azure      | Cada 2 minutos  |
| Cloudflare | Cada 5 minutos |
| GCP        | Cada 5 minutos  |

## Proveedores de nube {#cloud-providers}

Estos son detalles relacionados con proveedores de nube específicos.

### Alibaba {#alibaba}

Alibaba emite métricas con una granularidad de un minuto. Por lo tanto, espere retrasos en las métricas de ~7-8 minutos.

### AWS {#aws}

AWS ofrece dos niveles de granularidad para las métricas (métricas de 5 y 1 minuto). Si recibe métricas de 5 minutos de CloudWatch, puede haber un retraso de ~15-20 minutos en la recepción de sus métricas. Esto se debe a que CloudWatch hace que sus datos estén disponibles con una latencia de 5-10 minutos más el valor predeterminado de Datadog de 10 minutos (3 minutos para [métricas de RDS][3]). Las limitaciones de la cola y de la API de CloudWatch pueden sumar otros 5 minutos. Si recibe métricas de 1 minuto con CloudWatch, su retraso de disponibilidad es de aproximadamente 2 minutos, por lo que la latencia total para visualizar sus métricas puede ser de ~10 a 12 minutos.

Además, la API de CloudWatch solo ofrece un rastreo de cada métrica para extraer datos. Las API de CloudWatch tienen un límite de tasa que varía según la combinación de credenciales de autenticación, región y servicio. AWS pone las métricas a disposición según el nivel de la cuenta. Por ejemplo, si paga por *métricas detalladas* dentro de AWS, estas estarán disponibles más rápidamente. Este nivel de servicio para métricas detalladas también se aplica a la granularidad, con algunas métricas disponibles por minuto y otras cada cinco minutos.

En su [sitio de Datadog][4] seleccionado ({{< region-param key="dd_site_name" >}}), puede configurar opcionalmente Amazon CloudWatch Metric Streams y Amazon Data Firehose para obtener métricas de CloudWatch en Datadog más rápido con una latencia de 2 a 3 minutos. Visite la [documentación sobre el streaming de métricas][5] para obtener más información sobre este enfoque.


### Azure {#azure}

Azure emite métricas con una granularidad de 1 minuto. Por lo tanto, espere retrasos en las métricas de ~4 a 5 minutos.

### GCP {#gcp}

GCP emite métricas con una granularidad de 1 minuto. Por lo tanto, espere retrasos en las métricas de ~7-8 minutos.

## Monitores {#monitors}

Al crear seguimientos en Datadog, se muestra un mensaje de advertencia si elige una métrica con retraso. Datadog recomienda extender el marco de tiempo y retrasar la evaluación del seguimiento para estas métricas.

<div class="alert alert-info">Para los seguimientos de métricas respaldados por AWS, {{< ui >}}Edit{{< /ui >}} puede mostrar un retraso de evaluación recomendado (a menudo 900 segundos). Ese valor proviene de la integración de AWS y no se almacena hasta que hace clic en {{< ui >}}Save{{< /ui >}}. Para verificar la configuración guardada, abra la página {{< ui >}}Status{{< /ui >}} del seguimiento, exporte el JSON y busque <code>evaluation_delay</code>. Si el campo falta, configure el retraso en {{< ui >}}Edit{{< /ui >}} y guarde el seguimiento.</div>

## Métricas más rápidas {#faster-metrics}

Para obtener métricas a nivel de sistema con prácticamente cero retraso, instale el Datadog Agent en sus hosts en la nube siempre que sea posible. Para obtener la lista completa de beneficios de instalar el Agent en sus instancias en la nube, consulte la documentación [¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?][1].

Por parte de Datadog para las integraciones de AWS, Azure y GCP, Datadog puede acelerar el rastreador de métricas predeterminado para todas las métricas. Además, para AWS, Datadog cuenta con rastreadores específicos de espacio de nombres. Contacte al [soporte de Datadog][2] para obtener más información.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[2]: /es/help/
[3]: /es/integrations/amazon-rds/#metrics
[4]: /es/getting_started/site/
[5]: /es/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
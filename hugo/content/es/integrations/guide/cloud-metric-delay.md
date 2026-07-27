---
aliases:
- /es/integrations/faq/are-my-aws-cloudwatch-metrics-delayed/
- /es/integrations/faq/why-is-there-a-delay-in-receiving-my-data/
- /es/integrations/faq/cloud-metric-delay
further_reading:
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: FAQ
  text: ¿Por qué debería instalar el Datadog Agent en mis instancias de la nube?
title: Retraso de las métricas en la nube
---

## Información general

Cuando se utiliza cualquier integración de la nube de Datadog (AWS, Azure, Google Cloud, etc.), la API atrae las métricas con un rastreador. Es posible que se produzca un retraso en las métricas debido a las limitaciones de la API del proveedor de la nube.

## Resumen

| Proveedor   | Rastreador predeterminado  |
|------------|------------------|
| Alibaba    | Cada 10 minutos |
| AWS        | Cada 10 minutos (a excepción de las [métricas de RDS][3], que se recopilan cada 3 minutos) |
| Azure      | Cada 2 minutos  |
| Cloudflare | Cada 5 minutos |
| GCP        | Cada 5 minutos  |

## Proveedores de la nube

Se trata de aspectos específicos relacionados con determinados proveedores de la nube.

### Alibaba

Alibaba emite métricas con una granularidad de un minuto. Por lo tanto, espera retrasos de ~7-8 minutos en las métricas.

### AWS

AWS ofrece dos niveles de granularidad para las métricas (métricas de 5 y 1 minuto). Si recibes métricas de 5 minutos de CloudWatch, puede haber un retraso de ~15-20 minutos en la recepción de tus métricas. Esto se debe a que CloudWatch hace que tus datos estén disponibles con una latencia de 5-10 minutos más el valor predeterminado de Datadog de 10 minutos (3 minutos para [métricas de RDS][3]). Las colas y las limitaciones de la API de CloudWatch pueden añadir otros 5 minutos. Si recibes métricas de 1 minuto con CloudWatch, entonces su retraso de disponibilidad es de unos 2 minutos, por lo que la latencia total para ver tus métricas puede ser de ~10-12 minutos.

Además, la API de CloudWatch sólo ofrece un rastreo métrica por métrica para extraer datos. Las API de CloudWatch tienen un límite de velocidad que varía en función de la combinación de credenciales de autenticación, región y servicio. Las métricas están disponibles en AWS en función del nivel de la cuenta. Por ejemplo, si estás pagando por *métricas detalladas* en AWS, están disponibles más rápidamente. Este nivel de servicio para métricas detalladas también se aplica a la granularidad, algunas métricas están disponibles por minuto y otras cada cinco minutos.

En tu sitio [Datadog ][4] seleccionado ({{< region-param key="dd_site_name" >}}), puedes configurar opcionalmente Amazon CloudWatch Metric Streams y Amazon Data Firehose para obtener métricas de CloudWatch en Datadog más rápidamente con una latencia de 2-3 minutos. Visita la [documentación sobre streaming de métricas][5] para obtener más información sobre este enfoque.


### Azure

Azure emite métricas con una granularidad de 1 minuto. Por lo tanto, espera retrasos de ~4-5 minutos en métricas.

### GCP

GCP emite métricas con una granularidad de 1 minuto. Por lo tanto, espera retrasos de ~7-8 minutos en métricas.

## Monitores

Al crear monitores en Datadog, aparece un mensaje de advertencia si se elige un retraso de métricas. Datadog recomienda ampliar el plazo y retrasar la evaluación de monitores para estas métricas.

## Métricas más rápidas

Para obtener métricas en el nivel del sistema con un retraso prácticamente nulo, instala el Datadog Agent en tus  hosts de la nube siempre que sea posible. Para obtener una lista completa sobre las ventajas de instalar el Agent en tus instancias en la nube, consulta la documentación [¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?][1].

En el lado de Datadog para las integraciones de AWS, Azure y GCP, Datadog puede ser capaz de acelerar el rastreador predeterminado de métricas para todas las métricas. Además, para AWS, Datadog dispone de rastreadores específicos para espacio de nombres. Ponte en contacto con la [asistencia técnica de Datadog][2] para obtener más información.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[2]: /es/help/
[3]: /es/integrations/amazon-rds/#metrics
[4]: /es/getting_started/site/
[5]: /es/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
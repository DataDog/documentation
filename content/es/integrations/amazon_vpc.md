---
aliases: []
categories:
- aws
- nube
- recopilación de logs
- la red
custom_kind: integration
dependencies: []
description: Reúne tus logs de Amazon VPC.
doc_link: https://docs.datadoghq.com/integrations/amazon_vpc/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/vpc-security-flowlogs/
  tag: Blog
  text: Monitorizar logs de flujo (flow) para garantizar la seguridad de la VPC con
    Datadog
git_integration_title: amazon_vpc
has_logo: false
integration_id: ''
integration_title: Amazon VPC
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_vpc
public_title: Integración de Amazon VPC con Datadog
short_description: Reúne tus logs de Amazon VPC.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Amazon Virtual Private Cloud (Amazon VPC) te permite lanzar recursos AWS en tu red virtual. Los logs de flujo de VPC son una característica que te permite capturar información sobre el tráfico IP que entra y sale en las interfaces de red de tu VPC.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Amazon Web Services][1].

### Recopilación de métricas

No se requieren pasos adicionales para recopilar métricas de Amazon VPC que no son `aws.vpc.flowlogs.*`. Las métricas con el prefijo `aws.vpc.flowlogs.*` son generadas por la integración de [logs de flujo de VPC en Datadog][2]. Para habilitar la recopilación del métricas de logs de flujo, consulta la sección de [recopilación de logs](#log-collection) a continuación.

Para las métricas `aws.vpc.subnet.*`:
   1. Asegúrate de que la integración [Amazon EC2][3] esté instalada y que la recopilación de métricas de EC2 esté habilitada en la pestaña **Metric Collection** en la [página de la integración AWS][4].
   2. Ponte en contacto con el [servicio de asistencia de Datadog][5] para habilitar la recopilación en tu cuenta.

### Recopilación de logs


#### Buscar o crear el recurso de destino en AWS para tus logs de flujo de VPC

Los logs de flujo de VPC deben enviarse primero a un destino intermedio, antes de enviarse a Datadog. Puedes enviarlos directamente a Amazon Data Firehose o puedes almacenarlos en un bucket de S3 o en un grupo de CloudWatch Logs.

Amazon Data Firehose es la opción recomendada para enviar logs de flujo de VPC a Datadog, ya que tiene menos gastos operativos y puede ser más rentable. Para obtener más información, consulta [Introducción de logs de flujo de Amazon VPC en Kinesis Data Firehose][6].

1. Crea uno nuevo o elige uno existente:
   - Amazon Data Firehose (recomendado). Si aún no dispones de un flujo de entrega existente en Amazon Data Firehose para enviar logs a Datadog, sigue las instrucciones de la guía [Enviar logs de servicios AWS con el destino Datadog Amazon Firehose][7] para crear uno. **Nota:** Opcionalmente, puedes elegir un flujo de entrega de otra cuenta AWS, independiente de tu VPC, para la recopilación y la entrega centralizada de logs.
   - Bucket de S3 o ruta de carpeta.
   - Grupo de CloudWatch Logs.

**Nota**: Especifica `vpc` como prefijo de la ruta S3 o nombre del grupo de CloudWatch Logs para que Lambda etiquete automáticamente el origen `vpc` en los logs.


#### Habilitar la generación de logs de flujo de VPC

1. En la consola de AWS, ve a la VPC que quieres monitorizar.
2. Ve a la pestaña **Logs de flujo**. 
3. Haz clic en **Create flow log** (Crear log de flujo).
4. Selecciona el filtro `All` para obtener las conexiones autorizadas y también las rechazadas.
5. Selecciona el tipo de destino deseado (Amazon Data Firehose, bucket de S3 o grupo de CloudWatch Logs) para los logs.
6. Rellena la información del recurso de destino.
7. Haz clic en **Create flow log** (Crear log de flujo).

#### Enviar logs a Datadog

Si has seleccionado Amazon Data Firehose como destino, ya está todo listo.

Si has seleccionado un bucket de S3 o el grupo de CloudWatch Logs como destino:

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder][8] en tu cuenta AWS.
2. Una vez configurada, ve a la función Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
3. Para configurar un activador, selecciona el activador **S3** o **CloudWatch Logs**.
4. Selecciona el bucket de S3 o el grupo de CloudWatch Logs que contiene los logs de tu VPC.
5. Para S3, deja el tipo evento como `All object create events`.
6. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Explorador de logs][9] para empezar a explorar tus logs.

Para obtener más información sobre la recopilación de logs de servicios AWS, consulta [Enviar logs de servicios AWS con la función Lambda en Datadog][10].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_vpc" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

### Eventos

La integración de Amazon VPC no incluye eventos.

### Checks de servicio

La integración de Amazon VPC no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:464622532012:applications~Datadog-VPC-Flow-Logs
[3]: https://docs.datadoghq.com/es/integrations/amazon_ec2/
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://docs.datadoghq.com/es/help/
[6]: https://aws.amazon.com/blogs/networking-and-content-delivery/introducing-amazon-vpc-flow-logs-kinesis-data-firehose/
[7]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[8]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[9]: https://docs.datadoghq.com/es/logs/explorer/
[10]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_vpc/amazon_vpc_metadata.csv
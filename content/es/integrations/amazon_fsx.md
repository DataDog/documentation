---
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de Amazon FSx.
doc_link: https://docs.datadoghq.com/integrations/amazon_fsx/
draft: false
git_integration_title: amazon_fsx
has_logo: true
integration_id: ''
integration_title: Amazon FSx
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_fsx
public_title: Integración de Datadog y Amazon FSx
short_description: Rastrea métricas clave de Amazon FSx.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon FSx es un servicio totalmente gestionado que proporciona almacenamiento escalable para sistemas de archivos NetApp ONTAP, OpenZFS, Windows File Server y Lustre.

Activa esta integración para ver todas tus métricas de FSx en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `FSx` está habilitado en la pestaña `Metric Collection`.
2. Añade los siguientes permisos a tu [política de IAM de Datadog][3] con el fin de recopilar métricas de Amazon FSx.

    | Permiso de AWS                          | Descripción                                                                                                                                                                                                                                              |
    | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `fsx:ListTagsForResource`               | Se utiliza para añadir etiquetas (tags) personalizadas de FSx.                                                                                                                                                                                                                    |
    | `fsx:DescribeFileSystems`               | Se utiliza para proporcionar capacidad de almacenamiento y rendimiento.                                                                                                                                                                                    |

2. Instala la [integración de Datadog y Amazon FSx][4].


### Recopilación de logs

#### Logs de eventos de auditoría para FSx para Windows File Server
Para rastrear todos los accesos de usuarios a archivos individuales, carpetas y archivos compartidos, integra los logs de eventos de auditoría desde tu FSx para Windows File Server:

1. [Habilita la característica de auditoría del acceso a archivos][5] para tus sistemas de archivos y envía los logs a CloudWatch.
2. Si aún no lo has hecho, configura la [función de AWS Lambda de recopilación de logs de Datadog[4] (versión 3.35.0+).
3. Una vez instalada la función de Lambda, añade manualmente un activador en el grupo de logs de CloudWatch `/aws/fsx/windows` en la consola de AWS:
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="grupo de logs de CloudWatch" popup="true" style="width:70%;">}}
   Selecciona el grupo de logs de CloudWatch correspondiente, añade un nombre de filtro (o deja el filtro vacío) y añade el activador:
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="Activador de CloudWatch" popup="true" style="width:70%;">}}
4. Ve a la [sección de Logs de Datadog][6] para empezar a explorar tus logs.

**Nota**: También puedes enviar estos logs a Datadog con [Amazon Data Firehose][7], pero debes crear un [procesador][8] de logs personalizados para obtener la misma funcionalidad de parseo de logs y experiencia de búsqueda.


#### Actividad de la API de FSx

Amazon FSx está integrado con AWS CloudTrail, que realiza un rastreo de todas las acciones de FSx realizadas por un usuario, rol o servicio de AWS. 
Habilita la [integración de CloudTrail][9] de Datadog para monitorizar todas las llamadas a la API de FSx en tu cuenta de AWS.

### Métricas
{{< get-metrics-from-git "amazon_fsx" >}}


### Eventos

La integración de Amazon FSx no incluye ningún evento.

### Checks de servicios

La integración de Amazon FSx no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][11].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/es/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/integrations/amazon-fsx
[5]: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/file-access-auditing.html#faa-log-destinations
[6]: https://app.datadoghq.com/logs
[7]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=amazondatafirehosedeliverystream
[8]: https://docs.datadoghq.com/es/logs/log_configuration/processors/?tab=ui
[9]: https://docs.datadoghq.com/es/integrations/amazon_cloudtrail/#log-collection
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_fsx/amazon_fsx_metadata.csv
[11]: https://docs.datadoghq.com/es/help/
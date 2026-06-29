---
title: Ver logs relacionados con un error de configuración
---

La función de logs relacionados con Cloud Security de Datadog te permite identificar rápidamente los logs de auditoría de la nube relacionados con un recurso específico de la nube. Al investigar un error de configuración, esto puede ayudarte a comprender:
- Quién creó el recurso
- Quién modificó por última vez el recurso y posiblemente introdujo el error de configuración.

Los eventos de CloudTrail carecen de un formato estandarizado que permita una consulta genérica de logs, pero Related Logs utiliza un servicio interno que asigna atributos de recursos a campos de eventos de CloudTrail, que permite a Datadog identificar logs relacionados de CloudTrail.

He aquí un ejemplo de consulta de logs que Related Logs genera y ejecuta automáticamente para encontrar logs relacionados de CloudTrail. En este ejemplo, la consulta busca los logs relacionados con una instancia EC2 específica:

{{< code-block lang="plaintext" >}}
source:cloudtrail @recipientAccountId:172597598159 @awsRegion:us-east-1 @readOnly:false -status:error (@eventSource:ec2.amazonaws.com AND (@requestParameters.instanceId:"i-0d52853076ed2a357" OR @requestParameters.instancesSet.items.instanceId:"i-0d52853076ed2a357" OR @responseElements.instancesSet.items.instanceId:"i-0d52853076ed2a357" OR @requestParameters.resourcesSet.items.resourceId:"i-0d52853076ed2a357" OR @responseElements.ReplaceIamInstanceProfileAssociationResponse.iamInstanceProfileAssociation.instanceId:"i-0d52853076ed2a357" OR @responseElements.CreateFleetResponse.fleetInstanceSet.item.instanceIds.item:"i-0d52853076ed2a357" OR @requestParameters.CreateReplaceRootVolumeTaskRequest.InstanceId:"i-0d52853076ed2a357" OR @requestParameters.ModifyInstanceMetadataOptionsRequest.InstanceId:"i-0d52853076ed2a357" OR @serviceEventDetails.instanceIdSet:"i-0d52853076ed2a357" OR @requestParameters.AssociateIamInstanceProfileRequest.InstanceId:"i-0d52853076ed2a357" OR @requestParameters.CreateSnapshotsRequest.InstanceSpecification.InstanceId:"i-0d52853076ed2a357"))
{{< /code-block >}}

## Requisitos previos

- Para utilizar Related Logs, debes configurar [logs de CloudTrail][1].
- Related Logs es compatible con los siguientes recursos de AWS:
  {{< related-logs-supported-resources >}}

    Para solicitar tipos de recursos adicionales, completa el [formulario de comentarios][4].

## Ver logs relacionados

1. En la page (página) **Findings** (Resultados), en el [Explorer de errores de configuración][2], abre un error de configuración para un tipo de recurso admitido.
1. Haz clic en la pestaña **Related Logs**. Datadog consulta tus logs de CloudTrail en busca de eventos relacionado con el recurso en la nube.

## Buscar a través de un período de tiempo más amplio

En forma predeterminada, Related Logs busca en las dos últimas semanas de logs relacionados de CloudTrail. Para ampliar búsqueda a un período de tiempo mayor:

1. Mientras visualizas logs relacionados de un error de configuración, haz clic en **View All Related Logs** (Ver todos los logs relacionados). La búsqueda utilizada para rellenar la lista se abre en el Explorer de logs.
1. En la esquina superior derecha, cambia el período de tiempo de la búsqueda.

**Nota**: Related Logs solo muestra logs de CloudTrail dentro de su periodo de retención. Para almacenar logs de CloudTrail durante un periodo prolongado de forma rentable, Datadog recomienda utilizar [Flex Logs][3].

[1]: /es/security/cloud_security_management/setup/cloudtrail_logs/
[2]: https://app.datadoghq.com/security/compliance
[3]: /es/logs/log_configuration/flex_logs/
[4]: https://forms.gle/AqZg9jqBusDf62h87
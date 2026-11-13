---
description: Pasos para la solución de problemas de la integración de Alibaba Cloud
  de Datadog
further_reading:
- link: https://docs.datadoghq.com/integrations/alibaba-cloud/
  tag: Integración
  text: Integración de Alibaba Cloud
title: Solución de problemas de integración de Alibaba Cloud
---
## Descripción general {#overview}

Utilice esta guía para solucionar problemas de la [integración de Alibaba Cloud][1] de Datadog. Los problemas de configuración aparecen en el [mosaico de integración de Alibaba Cloud][2].

## La clave de acceso de Alibaba Cloud no es válida o ya no existe {#alibaba-cloud-access-key-is-invalid-or-no-longer-exists}

Este problema ocurre cuando el ID de clave de acceso o el secreto de clave de acceso configurados para la integración no son válidos, están inactivos o fueron eliminados.

Para solucionar este problema:

- Si la clave de acceso está inactiva, vuelva a habilitarla en la consola de RAM de Alibaba Cloud.
- Si el secreto de la clave de acceso no es válido, actualice la integración de Datadog con el secreto correcto.
- Si la clave de acceso ya no existe o el secreto correcto no está disponible, cree una clave de acceso de reemplazo para el usuario de RAM que utiliza Datadog. Copie el nuevo ID de clave y el secreto, luego actualice las credenciales de Alibaba Cloud en la integración de Datadog. Para obtener instrucciones, consulte [Create an AccessKey pair][3] en la documentación de Alibaba Cloud.

Luego, confirme que el usuario de RAM tenga los permisos requeridos por la [integración de Alibaba Cloud][1].

## Faltan permisos de monitoreo de la nube {#cloud-monitoring-permissions-are-missing}

Este problema ocurre cuando el usuario de RAM utilizado por la integración de Datadog no puede consultar las métricas de CloudMonitor.

Para solucionar este problema, agregue el permiso `cms:DescribeMetricList` a la política adjunta al usuario de RAM de la integración de Datadog. Luego, espere unos 15 minutos para que el siguiente ciclo de recolección confirme que Datadog recibe las métricas de CloudMonitor.

Para obtener instrucciones sobre cómo editar una política de RAM, consulte [Grant permissions to a RAM user][4].

## Faltan permisos de recolección de registros {#log-collection-permissions-are-missing}

<!-- vale Datadog.words_case_insensitive = NO -->
Este problema ocurre cuando el usuario de RAM utilizado por la integración de Datadog carece de los permisos necesarios para leer desde Simple Log Service (SLS).
<!-- vale Datadog.words_case_insensitive = YES -->

Para solucionar este problema:

1. Revise la política adjunta al usuario de RAM de la integración de Datadog.
2. Agregue los permisos de lectura de SLS descritos en [SLS RAM access control permissions][8].
3. Confirme que la política se aplique a cada proyecto y logstore de SLS del que desea que Datadog recopile registros.

Para obtener instrucciones sobre cómo editar una política de RAM, consulte [Grant permissions to a RAM user][4].

## Faltan permisos de Prometheus para ACK {#prometheus-permissions-for-ack-are-missing}

Este problema ocurre cuando el usuario de RAM utilizado por la integración de Datadog carece de los permisos necesarios para configurar Alibaba Cloud Managed Service for Prometheus en un clúster de Alibaba Cloud Container Service for Kubernetes (ACK).

Para solucionar este problema, agregue los siguientes permisos a la política adjunta a ese usuario de RAM. Limite la política a los clústeres previstos siempre que sea posible. La política debe incluir al menos:

- `cs:InstallClusterAddons`
- `cs:UnInstallClusterAddons`

Estos permisos permiten a Datadog instalar y reinstalar el complemento `ack-arms-prometheus` en clústeres de ACK.

Para obtener instrucciones sobre cómo editar una política de RAM, consulte [Grant permissions to a RAM user][4]. Para ver las opciones de contexto de recursos, consulte [InstallClusterAddons][9].

<!-- vale Datadog.headings = NO -->
## Alibaba Cloud Resource Center no está habilitado {#alibaba-cloud-resource-center-is-not-enabled}
<!-- vale Datadog.headings = YES -->

Este problema ocurre cuando Alibaba Cloud Resource Center no está habilitado para la cuenta. Datadog no puede recopilar métricas hasta que habilite el servicio.

Para solucionar este problema:

1. Inicie sesión en la cuenta de Alibaba Cloud que está conectada a Datadog.
2. Abra [Resource Center][5].
3. Habilite Resource Center para la cuenta.
4. Adjunte la política `AliyunResourceCenterReadOnlyAccess` al usuario de RAM de la integración de Datadog.
5. Espere unos 15 minutos para el siguiente ciclo de recopilación para confirmar que Datadog recibe métricas.

## Se alcanzó el límite de cuota de la API de Alibaba Cloud {#alibaba-cloud-api-quota-limit-reached}

Este problema ocurre cuando la cuenta ha alcanzado un límite de cuota de la API de Alibaba Cloud. Esto es distinto a la limitación temporal de solicitudes.

Para solucionar este problema:

1. Revise la cuota y el estado de facturación de la cuenta de Alibaba Cloud.
2. Si corresponde, habilite las cuotas de pago por uso o resuelva los problemas de facturación pendientes.
3. Si la cuota existente es insuficiente, [solicite un aumento de cuota][6].
4. Espere a que el cambio de cuota surta efecto y, luego, confirme que Datadog reanude la recopilación.

¿Aún necesita ayuda? Comuníquese con el [soporte de Datadog][7].

[1]: /es/integrations/alibaba-cloud/
[2]: https://app.datadoghq.com/integrations?integrationId=alibaba-cloud
[3]: https://www.alibabacloud.com/help/en/ram/user-guide/create-an-accesskey-pair
[4]: https://www.alibabacloud.com/help/en/ram/user-guide/grant-permissions-to-a-ram-user
[5]: https://resourcecenter.console.aliyun.com/
[6]: https://www.alibabacloud.com/help/en/resource-management/user-guide/request-a-quota-increase
[7]: /es/help/
[8]: https://www.alibabacloud.com/help/en/sls/log-service-ram-access-control-permissions-configuration
[9]: https://www.alibabacloud.com/help/en/ack/ack-managed-and-ack-dedicated/developer-reference/api-cs-2015-12-15-installclusteraddons
---
aliases: null
description: Integraciones de Azure
further_reading:
- link: https://www.datadoghq.com/blog/azure-investigator/
  tag: Blog
  text: Visualiza la actividad en tu entorno de Azure con Datadog Cloud SIEM Investigator
- link: https://www.datadoghq.com/blog/azure-workflow-automation/
  tag: Blog
  text: Soluciona rápidamente los problemas de tus aplicaciones Azure con Datadog
    Workflow Automation
title: Integraciones de Azure
---

## Información general

La integración de Azure de Datadog consiste en un [registro de la aplicación][1] con acceso a las suscripciones que deseas monitorizar, y las credenciales de la aplicación configuradas en Datadog. Esto te permite enviar tus métricas, logs, información de configuración y datos de costes a Datadog para obtener visibilidad y alertas.

{{% collapse-content title="Permisos necesarios para la configuración de la integración" level="h4" expanded=false id="required-permissions" %}}

### Permisos de Azure

Tu usuario de Microsoft Entra ID necesita los siguientes permisos:

#### Permiso para crear un registro de aplicación

**Una** de las siguientes condiciones debe ser cierta para el usuario:

- `Users can register applications` se ha fijado en `Yes`
- El usuario tiene el rol [Desarrollador de aplicaciones][58]

#### Permiso para asignar roles dentro de tus suscripciones

Debes tener uno de los [roles integrados de Azure en la categoría Privilegiado][56], o un rol personalizado que incluya la acción `Microsoft.Authorization/roleAssignments/write`, en cada una de las suscripciones que desees conectar.

#### Permiso para añadir y conceder consentimiento para permisos de Graph API

El [rol de administrador privilegiado][57] contiene los permisos necesarios.

### Permisos de Datadog

El `Datadog Admin Role`, o cualquier otro rol con el permiso `azure_configurations_manage`.

{{% /collapse-content %}} 

## Integraciones específicas de servicios de Azure

Al configurar la integración principal de Azure también se instalan todas las integraciones específicas del servicio de Azure de Datadog. Estas integraciones proporcionan métricas, checks de servicio y eventos que te ofrecen visibilidad sobre el estado y el comportamiento de un servicio de Azure concreto.

<div class="alert alert-warning">
La integración de Azure de Datadog se ha creado para recopilar <a href="https://docs.microsoft.com/en-us/azure/azure-monitor/platform/metrics-supported">todas las métricas del monitor de Azure</a>. Datadog se esfuerza por actualizar continuamente los documentos para mostrar todas las subintegraciones, pero los servicios en la nube lanzan rápidamente nuevas métricas y servicios, por lo que la lista de integraciones puede retrasarse en ocasiones.<br> Datadog genera la métrica <code>azure.*.count</code> a partir de Azure Resource Health. Para obtener más información, consulta la <a href="https://docs.datadoghq.com/integrations/guide/azure-advanced-configuration/#count-metric">métrica Count</a> en la guía de Azure Advanced Configuration.
</div>

{{% collapse-content title="Integraciones resaltadas" level="h4" expanded=false id="azure-integrations-list" %}}
| Integración | Descripción |
|---------------------------------|-----------------------------------------------------------------------------------------------------------|
| [Analysis Services][33] | Un servicio que proporciona modelos de datos en la nube.                                                         |
| [API Management][44] | Un servicio para publicar, asegurar, transformar, mantener y monitorizar APIs.                                      |
| [App Service][45] | Un servicio para desplegar y escalar aplicaciones web, móviles, API y lógica de negocio.                      |
| [App Service Environment][4] | Un servicio que proporciona un entorno para ejecutar de forma segura aplicaciones de App Service a gran escala.               |
| [App Service Plan][5] | Un conjunto de recursos informáticos para que se ejecute una aplicación web.                                                          |
| [Application Gateway][6] | Un equilibrador de carga de tráfico web que te permite gestionar el tráfico hacia tus aplicaciones web.                  |
| [Automatización][7] | Un servicio que proporciona automatización y gestión de la configuración en todos tus entornos.                 |
| [Batch Service][8] | Programador y procesador de tareas gestionadas.                                                                     |
| [Cognitive Services][9] | APIs, SDKs y servicios disponibles para ayudar a crear aplicaciones sin conocimientos de IA o ciencia de datos.       |
| [Container Instances][10] | Un servicio para desplegar contenedores sin necesidad de aprovisionar o gestionar la infraestructura subyacente.     |
| [Container Service][11] | Un clúster listo para la producción de Kubernetes, DC/OS o Docker Swarm.                                            |
| [Cosmos DB][12] | Un servicio de base de datos que admite bases de datos de documentos, clave-valor, columnas anchas y gráficos.                   |
| [Customer Insights][13] | Permite a las organizaciones reunir conjuntos de datos para construir una visión de 360° de tus clientes.                |
| [Data Explorer][48] | Servicio de exploración de datos rápido y altamente escalable.                                                        |
| [Data Factory][14] | Un servicio para componer servicios de almacenamiento, movimiento y procesamiento de datos en pipelines de datos automatizados.       |
| [Data Lake Analytics][15] | Un servicio de trabajo de análisis que simplifica el big data.                                                        |
| [Data Lake Store][16] | Un lago de datos sin límites que potencia la analítica de big data.                                                     |
| [Base de datos para MariaDB][17] | Un servicio que proporciona una base de datos de MariaDB comunitaria totalmente gestionada y preparada para empresas.                       |
| [Event Grid][18] | Un servicio de enrutamiento de eventos que permite el consumo uniforme de eventos mediante un modelo de publicación-suscripción.       |
| [Event Hub][19] | Servicio de gestión de flujos de datos a gran escala.                                                                   |
| [ExpressRoute][20] | Un servicio para extender tus redes locales a la nube.                                             |
| [Firewall][21] | Seguridad de red nativa de la nube para proteger tus recursos de red virtual de Azure.                            |
| [Funciones][22] | Un servicio para ejecutar código sin servidor en respuesta a activadores de eventos.                                      |
| [HDInsights][23] | Un servicio en la nube que procesa cantidades masivas de datos.                                                   |
| [IOT Hub][24] | Conectar, monitorizar y gestionar miles de millones de activos de IOT.                                                      |
| [Key Vault][25] | Un servicio para salvaguardar y gestionar claves criptográficas y secretos utilizados por aplicaciones y servicios en la nube. |
| [Load Balancer][26] | Escala tus aplicaciones y crea alta disponibilidad para tus servicios.                                   |
| [Logic App][27] | Crea potentes soluciones de integración.                                                                     |
| [Machine Learning][47] | Servicio de machine learning de nivel empresarial para crear y desplegar modelos más rápidamente.                              |
| [Interfaces de red][28] | Permite la comunicación de máquinas virtuales con Internet, Azure y recursos locales.                                 |
| [Notification Hubs][29] | Un motor push que permite enviar notificaciones a cualquier plataforma desde cualquier backend.                     |
| [Dirección IP pública][30] | Un recurso que permite la comunicación entrante y la conectividad saliente desde Internet.                |
| [Recovery Service Vault][51] | Entidad que almacena las copias de seguridad y los puntos de recuperación creados a lo largo del tiempo.                                  |
| [Caché de Redis][31] | Caché de datos gestionada.                                                                                       |
| [Relay][32] | Expone de forma segura servicios que se ejecutan en tu red corporativa a la nube pública.                          |
| Almacenamiento | Almacenamiento para [blobs][34], [archivos][35], [colas][36] y [tablas][37].                                     |
| [Stream Analytics][38] | Un motor de procesamiento de eventos para examinar grandes volúmenes de datos en streaming desde dispositivos.                        |
| [SQL Database][39] | Base de datos relacional altamente escalable en la nube.                                                         |
| [SQL Database Elastic Pool][40] | Gestiona el rendimiento de múltiples bases de datos.                                                              |
| [Synapse Analytics][52] | Un servicio de análisis que junta la integración de datos, el almacenamiento de datos empresariales y el análisis de big data. |
| [Uso y cuotas][41] | Sigue tu uso de Azure.                                                                                  |
| [Máquina virtual][42] | Servicio de gestión de máquinas virtuales.                                                                       |
| [Conjunto de máquinas virtuales a escala][43] | Despliegue, gestión y autoescalado de un conjunto de máquinas virtuales idénticas.                                                     |
| [Red virtual][46] | Permite que los recursos de Azure se comuniquen de forma segura entre sí, con Internet y con redes locales.    |
{{% /collapse-content %}} 

## Métricas generadas por Datadog

Datadog consulta automáticamente otras APIs de metadatos de Azure específicas de los recursos y utiliza esa información para generar métricas de series temporales adicionales. Hay más de 40 métricas generadas por Datadog y docenas de etiquetas nuevas para tus servicios de Azure, entre ellas:

- Servicios de aplicaciones
- Azure Functions
- App Service Plans
- Bases de datos de Azure SQL
- Azure Load Balancers
- Redes virtuales de Azure
- Uso y cuotas
- Recuentos y estados de los recursos

## Configuración

A fin de limitar la recopilación de métricas para los hosts basados ​​en Azure, abre el cuadro de integración de Azure. Selecciona la pestaña **Configuration** (Configuración) y, a continuación, abre **App Registrations** (Registros de aplicaciones). Ingresa una lista de etiquetas (tags) en el cuadro de texto debajo de **Metric Collection Filters** (Filtros de recopilación de métricas).

Esta lista de etiquetas en formato `<KEY>:<VALUE>` se encuentra separada por comas y define un filtro que se usa al recopilar métricas. También se pueden usar comodines como `?` (para caracteres individuales) y `*` (para varios caracteres).

Solo las VMs que coinciden con una de las etiquetas definidas se importan a Datadog. El resto se ignoran. Las VMs que coinciden con una etiqueta determinada también se pueden excluir al añadir `!` antes de la etiqueta. Por ejemplo:

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Consulta la guía de [Azure Advanced Configuration][60] para obtener más opciones de configuración.

## Datos recopilados

### Métricas

Todas las métricas estándar del monitor de Azure más [métricas únicas generadas por Datadog][53]. También pueded activar la recopilación de métricas personalizadas de Azure Application Insights en la pestaña **Recopilación de métricas** de la [página de integración de Azure][54].

Para obtener una lista detallada de las métricas, selecciona el servicio de Azure adecuado en la sección [Integraciones específicas de servicios de Azure](#azure-service-specific-integrations). Para excluir determinadas máquinas virtuales de la recopilación de métricas, consulta [Exclusión de máquinas virtuales de Azure][55].

### Logs

Consulta la [guía de reenvío automatizado de logs de Azure][61] para configurar el reenvío de logs desde tu entorno de Azure.

### Eventos

La integración de Azure recopila automáticamente los eventos de Azure Service Health. Para verlos en Datadog, navega hasta el espacio de nombres [Event Explorer][50] y filtra por el espacio de nombres `Azure Service Health`.

### Checks de servicio

La integración de Azure no incluye ningún check de servicios.

### Etiquetas

Las métricas, eventos y checks de servicios de integración de Azure reciben los siguientes etiquetas (tags) además de etiquetas (tags) definidas en tus entornos de Azure:

| Integración                             | Espacio de nombre                                   | Claves de etiqueta de Datadog                                                                                                                                                                                                 |
|-----------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Todas las integraciones de Azure                  | Todos                                         | `cloud_provider`, `region`, `kind`, `type`, `name`, `resource_group`, `tenant_name`, `subscription_name`, `subscription_id`, `status` (si procede)                                                            |
| Integraciones de máquinas virtuales de Azure                   | `azure.vm.*`                                | `host`, `size`, `operating_system`, `availability_zone`                                                                                                                                                          |
| Planes de servicios de aplicaciones Azure                 | `azure.web_serverfarms.*`                   | `per_site_scaling`, `plan_size`, `plan_tier`, `operating_system`                                                                                                                                                 |
| Aplicaciones web y funciones de servicios de aplicaciones de Azure  | `azure.app_services.*`, `azure.functions.*` | `operating_system`, `server_farm_id`, `reserved`, `usage_state`, `fx_version` (sólo aplicaciones web Linux), `php_version`, `dot_net_framework_version`, `java_version`, `node_version`, `python_version`                |
| Base de datos Azure SQL                            | `azure.sql_servers_databases.*`             | `license_type`, `max_size_mb`, `server_name`, `role`, `zone_redundant`. <br>Sólo para enlaces de réplica: `state` `primary_server_name` `primary_server_region` `secondary_server_name` `secondary_server_region` |
| Equilibrador de carga Azure                     | `azure.network_loadbalancers.*`             | `sku_name`                                                                                                                                                                                                       |
| Uso y cuota de Azure                   | `azure.usage.*`                             | `usage_category`, `usage_name`                   

**Nota**: Consulta la [página de facturación de la integración de Azure][62] para obtener información sobre la facturación.

## Siguientes pasos

- Consulta [Primeros pasos con Azure][2] para configurar la integración
- Consulta [Azure Advanced Configuration][60] para obtener información detallada sobre la arquitectura
- Consulta [Azure Automated Log Forwarding][3] para automatizar la configuración del reenvío de logs en tu entorno de Azure. Esta configuración de reenvío de logs también se puede configurar a través del método de configuración de la integración de [Azure Quickstart][].

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/security/zero-trust/develop/app-registration
[2]: /es/getting_started/integrations/azure/
[3]: /es/logs/guide/azure-automated-log-forwarding/
[4]: /es/integrations/azure_app_service_environment/
[5]: /es/integrations/azure_app_service_plan/
[6]: /es/integrations/azure_application_gateway/
[7]: /es/integrations/azure_automation/
[8]: /es/integrations/azure_batch/
[9]: /es/integrations/azure_cognitive_services/
[10]: /es/integrations/azure_container_instances/
[11]: /es/integrations/azure_container_service/
[12]: /es/integrations/azure_cosmosdb/
[13]: /es/integrations/azure_customer_insights/
[14]: /es/integrations/azure_data_factory/
[15]: /es/integrations/azure_data_lake_analytics/
[16]: /es/integrations/azure_data_lake_store/
[17]: /es/integrations/azure_db_for_mariadb/
[18]: /es/integrations/azure_event_grid/
[19]: /es/integrations/azure_event_hub/
[20]: /es/integrations/azure_express_route/
[21]: /es/integrations/azure_firewall/
[22]: /es/integrations/azure_functions/
[23]: /es/integrations/azure_hd_insight/
[24]: /es/integrations/azure_iot_hub/
[25]: /es/integrations/azure_key_vault/
[26]: /es/integrations/azure_load_balancer/
[27]: /es/integrations/azure_logic_app/
[28]: /es/integrations/azure_network_interface/
[29]: /es/integrations/azure_notification_hubs/
[30]: /es/integrations/azure_public_ip_address/
[31]: /es/integrations/azure_redis_cache/
[32]: /es/integrations/azure_relay/
[33]: /es/integrations/azure_analysis_services/
[34]: /es/integrations/azure_blob_storage/
[35]: /es/integrations/azure_file_storage/
[36]: /es/integrations/azure_queue_storage/
[37]: /es/integrations/azure_table_storage/
[38]: /es/integrations/azure_stream_analytics/
[39]: /es/integrations/azure_sql_database/
[40]: /es/integrations/azure_sql_elastic_pool/
[41]: /es/integrations/azure_usage_and_quotas/
[42]: /es/integrations/azure_vm/
[43]: /es/integrations/azure_vm_scale_set/
[44]: /es/integrations/azure_api_management/
[45]: /es/integrations/azure_app_services/
[46]: /es/integrations/azure-virtual-network/
[47]: /es/integrations/azure_machine_learning_services/
[48]: /es/integrations/azure_data_explorer/
[50]: https://app.datadoghq.com/event/explorer
[51]: /es/integrations/azure_recovery_service_vault/
[52]: /es/integrations/azure_synapse/
[53]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/
[54]: https://app.datadoghq.com/integrations/azure
[55]: /es/account_management/billing/azure/#azure-vm-exclusion
[56]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/privileged
[57]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator
[58]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer
[59]: /es/getting_started/integrations/azure/#quickstart-setup
[60]: /es/integrations/guide/azure-advanced-configuration/
[61]: /es/logs/guide/azure-automated-log-forwarding
[62]: /es/account_management/billing/azure/
---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/iocs_dmi
app_id: iocs-dmi
categories:
- nube
- marketplace
- red
custom_kind: integración
description: Recopila métricas de los productos MuleSoft y cárgalas en Datadog.
integration_version: 2.0.0
media:
- caption: 'Operaciones: Dashboard de API'
  image_url: images/dmi_ops_apis.png
  media_type: imagen
- caption: 'Operaciones: Dashboard de infraestructura'
  image_url: images/dmi_ops_infra.png
  media_type: imagen
- caption: 'Operaciones: Dashboard de asignación y uso de recursos'
  image_url: images/dmi_ops_allocation.png
  media_type: imagen
- caption: 'Desarrollo: Dashboard de optimizaciones'
  image_url: images/dmi_dev_optimization.png
  media_type: imagen
- caption: 'Ejecutivos: Dashboard de optimización de costes'
  image_url: images/dmi_exec_cost_optimization.png
  media_type: imagen
- caption: 'Operaciones: Información general del espacio privado'
  image_url: images/dmi_ops_spaces1.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Mule®
---
## Información general

[Nova](https://www.novacloud.io) es una empresa especializada en Servicios de consultoría de tecnologías de la información. Nuestras prácticas son tecnologías en la nube, integración de sistemas, big data, ciberseguridad e ingeniería de software. Prestamos servicios en toda Norteamérica, Europa y Latinoamérica. Nuestra sede se encuentra en el área metropolitana de Nueva York y también tenemos oficinas en Guadalajara, México y Madrid, España.

La integración de Mule® en Datadog es una integración basada en el Agent que recopila métricas de los productos MuleSoft y los carga en Datadog.

Puedes recopilar las siguientes métricas de los productos MuleSoft:

- Mule Runtime para CloudHub, CloudHub 2.0 Runtime Fabric y servidores autónomos on-premises
- Anypoint Runtime Fabric
- Anypoint API Manager y API Analytics
- Anypoint Exchange
- Anypoint Access Management
- Object Store v2

Puedes utilizar estas métricas para sacar partido de los dashboards y monitores predefinidos de Datadog o crear tus propias visualizaciones.

### **La observabilidad que necesitas para tus aplicaciones Mule**

#### Operaciones (infraestructura, API, alertas y dashboards de asignación de recursos)

- Monitorizar el estado de tus servidores, aplicaciones, API y otras infraestructura TI de Mule
- Recibir y visualizar alertas sobre tu infraestructura Mule
- Obtener información sobre la asignación de recursos de la plataforma Anypoint de tu organización

![Operaciones: Dashboard de infraestructura](images/dmi_ops_infra.png)

![Operaciones: Dashboard de API](images/dmi_ops_apis.png)

![Operaciones: Dashboard de asignación y uso de recursos](images/dmi_ops_allocation.png)

#### Desarrollo (_Dashboard de optimización_)

- Identificar rápidamente los problemas de memoria, de CPU y de red en tus aplicaciones Mule
- Encontrar cuellos de botella en tus aplicaciones Mule para optimizar el rendimiento

![Desarrollo: Dashboard de optimizaciones](images/dmi_dev_optimization.png)

#### Ejecutivo (_Dashboard de optimización de costos y tiempos de inactividad_)

- Analizar y predecir tu retorno de inversión (ROI) en función de los recursos utilizados y no utilizados
- Obtener visibilidad del tiempo de actividad del sistema de tu inversión en Mule

![Executivos: Dashboard de optimización de costos](images/dmi_exec_cost_optimization.png)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vcores_production.assigned** <br>(gauge) | Obtiene los núcleos virtuales asignados a los entornos de producción<br>_Mostrado como CPU_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vcores_production.reassigned** <br>(gauge) | Obtiene los núcleos virtuales reasignados a entornos de producción<br>_Mostrado como CPU_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vcores_sandbox.assigned** <br>(gauge) | Obtiene los núcleos virtuales asignados a entornos de espacios aislados<br>_Mostrado como CPU_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vcores_sandbox.reassigned** <br>(gauge) | Obtiene los núcleos virtuales reasignados a entornos espacios aislados<br>_Mostrado como CPU_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vcores_design.assigned** <br>(gauge) | Obtiene los núcleos virtuales asignados a entornos de diseño<br>_Mostrado como CPU_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vcores_design.reassigned** <br>(gauge) | Obtiene los núcleos virtuales reasignados a entornos de diseño<br>_Mostrado como CPU_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.static_ips.assigned** <br>(gauge) | Obtiene el count de direcciones IP estáticas asignadas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.static_ips.reassigned** <br>(gauge) | Obtiene el count de direcciones IP estáticas reasignadas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vpcs.assigned** <br>(gauge) | Obtiene el count de PC virtuales asignadas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vpcs.reassigned** <br>(gauge) | Obtiene el count de PC virtuales reasignadas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vpns.assigned** <br>(gauge) | Obtiene el count de redes privadas virtuales asignadas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vpns.reassigned** <br>(gauge) | Obtiene el count de redes virtuales privadas reasignadas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.loadbalancer.assigned** <br>(gauge) | Obtiene el count de equlibradores de carga asignados<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.loadbalancer.reassigned** <br>(gauge) | Obtiene el count de equilibradores de carga reasignados<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.worker_clouds.assigned** <br>(gauge) | Obtiene el count de nubes de trabajadores asignados<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.worker_clouds.reassigned** <br>(gauge) | Obtiene el count de nubes de trabajadores reasignados<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.object_store_request_units.base** <br>(gauge) | Obtiene el count base de unidades de las solicitudes de Object Store<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.object_store_request_units.add_on** <br>(gauge) | Obtiene el count de unidades añadidas de las solicitudes de OIbject Store<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.object_store_keys.base** <br>(gauge) | Obtiene el count base de las claves de Object Store<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.entitlements.object_store_keys.add_on** <br>(gauge) | Obtiene el count de de las claves añadidas de Object Store<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.vcores_production.assigned** <br>(gauge) | Obtiene los núcleos virtuales asignados a entornos de producción en la suborganización<br>_Mostrado como CPU_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.vcores_production.reassigned** <br>(gauge) | Obtiene los núcleos virtuales reasignados a entornos de producción en la suborganización<br>_Mostrado como CPU_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.vcores_sandbox.assigned** <br>(gauge) | Obtiene los núcleos virtuales asignados a entornos de espacios aislados en la suborganización<br>_Mostrado como CPU_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.vcores_sandbox.reassigned** <br>(gauge) | Obtiene los núcleos virtuales reasignados a entornos de espacios aislados en la suborganización<br>_Mostrado como CPU_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.vcores_design.assigned** <br>(gauge) | Obtiene los núcleos virtuales asignados a entornos de diseño en la suborganización<br>_Mostrado como CPU_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.vcores_design.reassigned** <br>(gauge) | Obtiene los núcleos virtuales reasignados a entornos de diseño en la suborganización<br>_Mostrado como CPU_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.static_ips.assigned** <br>(gauge) | Obtiene el count de direcciones IP estáticas de suborganizaciones asignadas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.static_ips.reassigned** <br>(gauge) | Obtiene el count asignado de las direcciones IP estáticas de suborganizaciones reasignadas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.vpcs.assigned** <br>(gauge) | Obtiene el count de PC virtuales asignadas por suborganización<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.vpcs.reassigned** <br>(gauge) | Obtiene el recuento de PC virtuales reasignadas por suborganización<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.vpns.assigned** <br>(gauge) | Obtiene el count de redes privadas virtuales asignadas por suborganización<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.vpns.reassigned** <br>(gauge) | Obtiene el count de redes privadas virtuales reasignadas por suborganización<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.loadbalancer.assigned** <br>(gauge) | Obtiene el count de equilibradores de carga asignados por suborganización<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.loadbalancer.reassigned** <br>(gauge) | Obtiene el count de equilibradores de carga reasignados por suborganización<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.worker_clouds.assigned** <br>(gauge) | Obtiene el count de nubes de trabajadores asignados por suborganización<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.entitlements.worker_clouds.reassigned** <br>(gauge) | Obtiene el count de nubes de trabajadores reasignados por suborganización<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.access_management.organization.sub_org.count** <br>(count) | Obtiene todas las suborganizaciones creadas en una cuenta de cuentas a pagar.<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.applications.message_count** <br>(gauge) | Obtiene el count de mensajes de las aplicaciones por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.applications.response_time** <br>(gauge) | Obtiene el tiempo (medio) de respuesta de mensajes de las aplicaciones por entorno<br>_Mostrado como tiempo_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.applications.error_count** <br>(gauge) | Obtiene el count de errores de eventos de las aplicaciones por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.aplications.flows.message_count** <br>(gauge) | Obtiene el count de mensajes de flujos por aplicación<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.applications.flows.response_time** <br>(gauge) | Obtiene el tiempo de respuesta de los mensajes de flujos por aplicación<br>_Mostrado como tiempo_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.applications.flows.error_count** <br>(gauge) | Obtiene el count de errores de eventos de flujos por aplicación<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.cpu_usage** <br>(gauge) | Obtiene el uso de la CPU de los objetivos en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.memory_usage** <br>(gauge) | Obtiene el uso de memoria de los objetivos en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.memory_committed** <br>(rate) | Obtiene la memoria de los objetivos confirmada en un periodo de tiempo por entorno<br>_Mostrado como byte_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.memory_total** <br>(gauge) | Obtiene el total de memoria de los objetivos en un periodo de tiempo por entorno<br>_Mostrado como byte_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.thread_count** <br>(gauge) | Obtiene el count de subprocesos de los objetivos en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.load_average** <br>(gauge) | Obtiene la media de carga de los objetivos en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.eden_usage** <br>(gauge) | Obtiene el uso de eden de los objetivos en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.eden_committed** <br>(gauge) | Obtiene los objetivos confirmados de eden en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.eden_total** <br>(gauge) | Obtiene el total de eden de los objetivos en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.survivor_usage** <br>(gauge) | Obtiene el uso de supervivencia de los objetivos en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.survivor_committed** <br>(gauge) | Obtiene la supervivencia confirmada de los objetivos en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.survivor_total** <br>(gauge) | Obtiene el total de supervivientes de los objetivos en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.metaspace_usage** <br>(gauge) | Obtiene el uso del metaespacio de los objetivos en un periodo de tiempo por entorno<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.metaspace_committed** <br>(gauge) | Obtiene el metaespacio confirmado de los objetivos en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.metaspace_total** <br>(gauge) | Obtiene el metaespacio total de los objetivos en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.tenured_gen_usage** <br>(gauge) | Obtiene el uso general que tuvieron los objetivos en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.tenured_gen_committed** <br>(gauge) | Obtiene los objetivos tenidos generales confirmados en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.targets.tenured_gen_total** <br>(gauge) | Obtiene el total general de los objetivos tenidos en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.class_loading_loaded** <br>(gauge) | Obtiene la carga de la clase de los objetivos cargados en un periodo de tiempo por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_monitoring_query.class_loading_total** <br>(gauge) | Obtiene el total de  carga de clase de los objetivos en un periodo de tiempo por entorno<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.arm_mule_agent.applications.count** <br>(count) | Obtiene todas las aplicaciones existentes en el agente<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_mule_agent.applications.flows.count** <br>(count) | Obtiene todos los flujos existentes de las aplicaciones en el agente<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_mule_agent.clusters.count** <br>(count) | Obtiene todos los clústeres existentes en el agente<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_mule_agent.clusters.members.count** <br>(count) | Obtiene todos los miembros existentes en el agente<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_rest_services.applications.started** <br>(count) | Obtiene todas las aplicaciones en ejecución<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.arm_rest_services.applications.stopped** <br>(count) | Obtiene todas las aplicaciones paradas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_rest_services.servers.started** <br>(count) | Obtiene todos los servidores en ejecución<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.arm_rest_services.servers.stopped** <br>(count) | Obtiene todos los servidores parados<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_rest_services.clusters.started** <br>(count) | Obtiene todos los clústeres en ejecución<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.arm_rest_services.clusters.stopped** <br>(count) | Obtiene todos los clústeres parados<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_rest_services.alerts.critical** <br>(count) | Obtiene todas las alertas críticas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_rest_services.alerts.info** <br>(count) | Obtiene todas las alertas de información<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.arm_rest_services.alerts.warning** <br>(count) | Obtiene todas las alertas de advertencia<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.applications.started** <br>(count) | Obtiene las aplicaciones CloudHub iniciadas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.applications.stopped** <br>(count) | Obtiene las aplicaciones CloudHub paradas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.applications.workers.active** <br>(count) | Obtiene los trabajadores activos de las aplicaciones de CloudHub<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.applications.workers.inactive** <br>(count) | Obtiene los trabajadores inactivos de las aplicaciones de CloudHub<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.applications.dashboard.stats.memory.used** <br>(gauge) | Obtiene la media de memoria utilizada en bytes en el intervalo específico <br>_Mostrado como byte_ |
| **ioconnect.mulesoft.anypoint.cloudhub.applications.dashboard.stats.memory.percentage.used** <br>(gauge) | Obtiene el porcentaje medio de memoria utilizada en el intervalo específico<br>_Mostrado como porcentaje_ |
| **ioconnect.mulesoft.anypoint.cloudhub.applications.dashboard.stats.memory.total.max** <br>(gauge) | Obtiene la memoria total en bytes del trabajador. memoryTotalUsed/memoryTotalMax = memoryPercentageUsed<br>_Mostrado como byte_ |
| **ioconnect.mulesoft.anypoint.cloudhub.applications.dashboard.stats.cpu.used** <br>(gauge) | Obtiene el porcentaje medio de CPU utilizado en el intervalo específico<br>_Mostrado como CPU_ |
| **ioconnect.mulesoft.anypoint.cloudhub.applications.dashboard.stats.network_in** <br>(gauge) | Obtiene la media de entrada de red en bytes por minuto en el intervalo específico<br>_Mostrado como byte_ |
| **ioconnect.mulesoft.anypoint.cloudhub.applications.dashboard.stats.network_out** <br>(gauge) | Obtiene la media de salida de red en bytes por minuto en el intervalo específico<br>_Mostrado como byte_ |
| **ioconnect.mulesoft.anypoint.cloudhub.applications.queues.queued** <br>(count) | Obtiene las colas puestas en cola<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.applications.schedules.count** <br>(count) | Obtiene programador(es) de una aplicación<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.applications.queues.inflight** <br>(count) | Obtiene las colas que están en tránsito<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.notifications.read** <br>(count) | Obtiene notificaciones de aplicaciones leídas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.notifications.unread** <br>(count) | Obtiene notificaciones de aplicaciones leídas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.alerts.count** <br>(count) | Obtiene el count de alertas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.alerts.history.count** <br>(count) | Obtiene el historial de alertas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.versions.count** <br>(count) | Obtiene todas las versiones de Mule admitidas. La primera versión devuelta es la versión más reciente y recomendada y la última versión devuelta es la versión más antigua admitida.<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.plan.max_production_workers** <br>(count) | Obtiene información sobre el plan, como el número máximo de trabajadores de producción<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.plan.max_sandbox_workers** <br>(count) | Obtiene información del plan, como el número máximo de trabajadores del espacio aislado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.plan.max_premium_connectors** <br>(count) | Obtiene información del plan, como el máximo de conectores premium<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.plan.max_static_ips** <br>(count) | Obtiene información del plan, como el número máximo de las direcciones IP estáticas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.plan.max_deployment_groups** <br>(count) | Obtiene información sobre el plan, como el número máximo de grupos de despliegue<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.usage.premium_connectors** <br>(count) | Obtiene información del uso de conectores premium<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.usage.production_applications** <br>(count) | Obtiene información del uso de las aplicaciones de producción<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.usage.sandbox_applications** <br>(count) | Obtiene información del uso de aplicaciones de espacio aislado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.usage.design_applications** <br>(count) | Obtiene información del uso de aplicaciones de diseño<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.usage.production_workers** <br>(count) | Obtiene información sobre el uso de trabajadores de producción<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.usage.sandbox_workers** <br>(count) | Obtiene información sobre el uso de trabajadores del espacio aislado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.usage.design_workers** <br>(count) | Obtiene información del uso de trabajadores de diseño<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.usage.static_ips** <br>(count) | Obtiene información sobre el uso de las direcciones IP estáticas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.usage.vpcs** <br>(count) | Obtiene información del uso de PC virtuales<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.usage.vpns** <br>(count) | Obtiene información del uso de las redes virtuales<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.usage.loadbalancers** <br>(count) | Obtiene información del uso de los equilibradores de carga<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.usage.loadbalancer_workers** <br>(count) | Obtiene información del uso de los trabajadores del equilibrador de carga<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub.organization.usage.deployment_groups** <br>(count) | Obtiene información de uso de los grupos de despliegue<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.exchange_experience.assets.count** <br>(count) | Obtiene el estado de los activos<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.exchange_experience.categories.count** <br>(count) | Obtiene las configuraciones de categorías disponibles para la organización<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.exchange_experience.fields.count** <br>(count) | Obtiene los campos disponibles para la organización<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.exchange_experience.assets.public.count** <br>(count) | Obtiene las versiones de los activos públicos<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.exchange_experience.assets.users.count** <br>(count) | Obtiene los usuarios asignados al activo<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.exchange_experience.assets.portal.published.count** <br>(count) | Obtiene el estado del portal de activos \[PUBLICADO, NO_PUBLICADO\] <br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.exchange_experience.assets.rating.number** <br>(gauge) | Obtiene la clasificación del activo<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.insight.cloudhub.applications.transactions.count** <br>(count) | Obtiene todas las transacciones del dominio especificado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.insight.cloudhub.applications.transactions.details.count** <br>(count) | Obtiene todos los detalles de la transacción para el ID de la transacción especificada<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.object_store.stores.partitions.keys.defined** <br>(count) | Obtiene particiones para un ID del almacén de objetos dado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.object_store_v2_stats.organizations.count** <br>(count) | Obtiene el count de solicitudes de la organización<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.object_store_v2_stats.organizations.environments.count** <br>(count) | Obtiene el count de solicitudes de un entorno específico en una organización<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_events.events.hits** <br>(count) | Accesos a la API realizados en un periodo de tiempo determinado<br>_Mostrado como solicitud_ |
| **ioconnect.mulesoft.anypoint.api_events.events.request.size** <br>(gauge) | Tamaño de una solicitud de la API<br>_Mostrado como byte_ |
| **ioconnect.mulesoft.anypoint.api_events.events.response.size** <br>(gauge) | Tamaño de la respuesta de un acceso a la API solicitado<br>_Mostrado como byte_ |
| **ioconnect.mulesoft.anypoint.api_events.events.response.time** <br>(gauge) | Tiempo que tardó una respuesta de la API en servir la solicitud<br>_Mostrado como milisegundo_ |
| **ioconnect.mulesoft.anypoint.api_events.events.status.code** <br>(count) | Código de estado HTTP en la respuesta de la API<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.reserved_cpu** <br>(gauge) | Obtiene la CPU de la aplicación reservada<br>_Mostrado como milicore_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.cpu_limit** <br>(gauge) | Obtiene el límite de CPU de la aplicación<br>_Mostrado como milicore_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.memory** <br>(gauge) | Obtiene la memoria de la aplicación<br>_Mostrado como mebibyte_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.replicas** <br>(gauge) | Obtiene el número de réplicas de la aplicación<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.status.running** <br>(count) | Obtiene las aplicaciones en ejecución<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.status.not_running** <br>(count) | Obtiene las aplicaciones que no están en ejecución<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.replicas.status.started** <br>(count) | Obtiene las réplicas de la aplicación con el estado iniciado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.replicas.status.starting** <br>(count) | Obtiene las réplicas de la aplicación con el estado inicial<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.replicas.status.stopped** <br>(count) | Obtiene las réplicas de aplicaciones con el estado detenido<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.replicas.status.pending** <br>(count) | Obtiene las réplicas de aplicaciones con estado pendiente<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.replicas.status.unschedulable** <br>(count) | Obtiene réplicas de la aplicación con estado no programable (sólo on-premises)<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.sidecar.reserved_cpu** <br>(gauge) | Obtiene la CPU reservada de los sidecars de la aplicación<br>_Mostrada como milicore_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.sidecar.cpu_limit** <br>(gauge) | Obtiene el límite de CPU de los sidecars de la aplicación<br>_Mostrado como milicore_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.sidecar.memory** <br>(gauge) | Obtiene la memoria de los sidecars de la aplicación<br>_Mostrado como mebibyte_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.settings.clustered.enabled** <br>(count) | Obtiene la aplicación configurada con la configuración en clúster activada<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.settings.clustered.disabled** <br>(count) | Obtiene la aplicación configurada con la opción en el clúster desactivada<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.settings.replicas_across_nodes.enabled** <br>(count) | Obtiene la aplicación configurada con el ajuste de réplicas en todos los nodos activado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.settings.replicas_across_nodes.disabled** <br>(count) | Obtiene la aplicación configurada con el ajuste de réplicas en todos los nodos desactivado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.settings.update_strategy.rolling** <br>(count) | Obtiene la aplicación configurada con el ajuste de estrategia de actualización gradual<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.settings.update_strategy.recreate** <br>(count) | Obtiene la aplicación configurada con el ajuste de estrategia de actualización recreado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.settings.last_mile_security.enabled** <br>(count) | Obtiene la aplicación configurada con el ajuste de seguridad de la última milla activado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.settings.last_mile_security.disabled** <br>(count) | Obtiene la aplicación configurada con el ajuste de seguridad de la última milla desactivado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.settings.am_log_forwarding.enabled** <br>(count) | Obtiene la aplicación configurada con la opción de monitorización de reenvío de logs a cualquier punto activada (solo on-premises)<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.settings.am_log_forwarding.disabled** <br>(count) | Obtiene la aplicación configurada con la opción de monitorización de reenvío de logs a cualquier punto desactivada (solo on-premises)<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.settings.external_log_forwarding.enabled** <br>(count) | Obtiene la aplicación configurada con el ajuste de reenvío de logs externos activado (solo on-premises)<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.settings.external_log_forwarding.disabled** <br>(count) | Obtiene la aplicación configurada con el ajuste de reenvío de logs externos desactivado (solo on-premises)<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.settings.forward_ssl_session.enabled** <br>(count) | Obtiene la aplicación configurada con la sesión de reenvío SSL activada<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.applications.settings.forward_ssl_session.disabled** <br>(count) | Obtiene la aplicación configurada con la sesión de reenvío SSL desactivada<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.node.workers** <br>(count) | Obtener nodos de aplicación RTF con rol de trabajador<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.node.controllers** <br>(count) | Obtener nodos de aplicación RTF con el rol de controlador<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.node.capacity.cpu** <br>(gauge) | Obtener la capacidad de CPU de los nodos de aplicación RTF<br>_Mostrado como milicore_ |
| **ioconnect.mulesoft.anypoint.rtf.node.capacity.memory** <br>(gauge) | Obtener la capacidad de memoria de los nodos de la aplicación RTF<br>_Mostrado como mebibyte_ |
| **ioconnect.mulesoft.anypoint.rtf.node.capacity.pods** <br>(gauge) | Obtener la capacidad de los nodos de aplicación RTF<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.node.capacity.request.cpu** <br>(gauge) | Obtener la capacidad de solicitud asignada a la CPU de los nodos de aplicación RTF<br>_Mostrado como milicore_ |
| **ioconnect.mulesoft.anypoint.rtf.node.capacity.request.memory** <br>(gauge) | Obtener la capacidad de solicitud asignada a la memoria de los nodos de aplicación RTF<br>_Mostrado como mebibyte_ |
| **ioconnect.mulesoft.anypoint.rtf.node.capacity.request.pods** <br>(gauge) | Obtener la capacidad de solicitud asignada de los pods de los nodos de aplicación RTF<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.node.capacity.limit.cpu** <br>(gauge) | Obtener la capacidad límite asignada de la CPU de los nodos de aplicación RTF<br>_Mostrada como milicore_ |
| **ioconnect.mulesoft.anypoint.rtf.node.capacity.limit.memory** <br>(gauge) | Obtener la capacidad límite asignada de memoria de los nodos de aplicación RTF<br>_Mostrado como mebibyte_ |
| **ioconnect.mulesoft.anypoint.rtf.node.capacity.limit.pods** <br>(gauge) | Obtener la capacidad límite asignada de los pods de los nodos de aplicación RTF<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.status.active** <br>(count) | Obtiene clústeres de aplicaciones RTF con estado activo<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.status.disconnected** <br>(count) | Obtiene clústeres de aplicaciones RTF con estado desconectado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.status.degraded** <br>(count) | Obtiene clústeres de aplicaciones RTF con estado degradado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.node.status.healthy** <br>(count) | Obtiene nodos de aplicación RTF con estado correcto<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.node.status.not_healthy** <br>(count) | Obtiene los nodos de aplicación RTF con estado incorrecto<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.node.status.ready** <br>(count) | Obtiene los nodos de aplicación RTF con estado listo<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.node.status.not_ready** <br>(count) | Obtiene los nodos de aplicación RTF con estado no listo<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.node.status.schedulable** <br>(count) | Obtiene nodos de aplicación RTF con estado programable<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.rtf.node.status.not_schedulable** <br>(count) | Obtiene los nodos de aplicación RTF con estado no programable<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_manager.active** <br>(count) | Obtiene el número de API con estado activo<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_manager.unregistered** <br>(count) | Obtiene el número de API con estado no registrado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_manager.apis** <br>(count) | Número total de API en el Gestor de API independientemente de su estado.<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_manager.apis.policies** <br>(count) | Obtiene las políticas de las API<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_manager.apis.tiers** <br>(count) | Obtiene los niveles de las API<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_manager.apis.contracts** <br>(count) | Obtiene el número de contratos en la instancia de la API<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_manager.apis.alerts** <br>(count) | Obtiene el número de alertas en la instancia de la API<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_manager.group_instances** <br>(count) | Obtiene el número de instancias de grupo de API en el gestor de API<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_manager.group_instances.contracts** <br>(count) | Obtiene el número de contratos en el grupo de instancia de API<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_manager.group_instances.tiers** <br>(count) | Obtiene el número de niveles en el grupo de instancia de API<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_manager.group_instances.api_instances** <br>(count) | Obtiene el número de instancias de API en el grupo de instancia API<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_manager.groups** <br>(count) | Obtiene todos los grupos<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_manager.policiy_templates** <br>(count) | Obtiene las plantillas de políticas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.api_manager.custom_policy_templates** <br>(count) | Obtiene plantillas de políticas personalizadas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.status.active** <br>(count) | Obtiene los espacios privados activos<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.status.inactive** <br>(count) | Obtiene los espacios privados no disponibles<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.provisioning.status.success** <br>(count) | Obtiene el aprovisionamiento de espacio privado con estado exitoso<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.provisioning.status.failed** <br>(count) | Obtener el aprovisionamiento de espacio privado con estado fallido<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.managed_firewall_rules.type.inbound** <br>(count) | Obtiene las reglas de entrada del firewall gestionado en el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.managed_firewall_rules.type.outbound** <br>(count) | Obtiene las reglas de salida del firewall gestionado en el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.firewall_rules.type.inbound** <br>(count) | Obtiene las reglas de entrada del firewall de espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.firewall_rules.type.outbound** <br>(count) | Obtiene las reglas de salida del firewall de espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.log_forwarding.anypoint_monitoring.enabled** <br>(count) | Obtiene la configuración de reenvío de logs activado desde el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.log_forwarding.anypoint_monitoring.disabled** <br>(count) | Obtiene la configuración de reenvío de logs desactivado desde el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.ingress_configuration.deployment.status.applied** <br>(count) | Obtiene el estado del despliegue de la configuración de entrada aplicada desde el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.ingress_configuration.deployment.status.not_applied** <br>(count) | Obtiene el estado del despliegue de la configuración de entrada no aplicada desde el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.global_space.status.active** <br>(count) | Obtiene el estado del espacio global activo desde el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.global_space.status.inactive** <br>(count) | Obtiene el estado de inactividad del espacio global desde el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.global_space.cluster.infra.status.success** <br>(count) | Obtiene el estado del éxito de la infraestructura de clúster del espacio global desde el espacio privado<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.global_space.cluster.infra.status.failed** <br>(count) | Obtiene el estado fallido de la infraestructura de clúster del espacio global desde el espacio privado<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.global_space.cluster.fabric.status.active** <br>(count) | Obtiene el estado activo del clúster fabric del espacio global desde el espacio privado<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.global_space.cluster.fabric.status.inactive** <br>(count) | Obtiene el estado inactivo del clúster fabric del espacio global desde el espacio privado<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.global_space.cluster.ingress.status.applied** <br>(count) | Obtiene el estado de la entrada del clúster del espacio global aplicada desde el espacio privado<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.global_space.cluster.ingress.status.not_applied** <br>(count) | Obtiene el estado de la entrada del clúster del espacio global no aplicada desde el espacio privado<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.global_space.network.status.success** <br>(count) | Obtiene el estado del éxito de la red del espacio global desde el espacio privado<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.global_space.network.status.failed** <br>(count) | Obtiene el estado de la red fallida del espacio global desde el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.connections.vpn.status.available** <br>(count) | Obtiene el estado disponible de la red privada virtual desde el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.connections.vpn.status.unavailable** <br>(count) | Obtiene el estado no disponible de la red privada virtual desde el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.connections.vpn.tunnel.status.up** <br>(count) | Obtiene el estado activo del túnel de la red privada virtual desde el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.connections.vpn.tunnel.status.down** <br>(count) | Obtiene el estado caído del túnel de la red privada virtual desde el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.transit_gateway.gateway.status.available** <br>(count) | Obtiene el estado disponible de la puerta de enlace de tránsito desde el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.transit_gateway.gateway.status.unavailable** <br>(count) | Obtiene el estado no disponible de la puerta de enlace de tránsito desde el espacio privado<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.transit_gateway.attachment.status.available** <br>(count) | Obtiene el estado disponible de la unión de la puerta de enlace de tránsito desde el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.transit_gateway.attachment.status.unavailable** <br>(count) | Obtiene el estado no disponible de la unión de la puerta de enlace de tránsito desde el espacio privado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.cloudhub20.private_space.transit_gateway.status.routes.count** <br>(count) | Obtiene las direcciones IP de las rutas de la puerta de enlace de tránsito<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.status.started** <br>(count) | Obtiene todas las aplicaciones CloudHub CloudHub2.0 y On-Premise en ejecución<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.applications.status.stopped** <br>(count) | Obtiene todas las aplicaciones CloudHub CloudHub2.0 y On-Premise paradas<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.memory.usage** <br>(gauge) | Obtiene la media de memoria utilizada en bytes en el intervalo específico<br>_Mostrado como byte_ |
| **ioconnect.mulesoft.anypoint.applications.memory.percentage.usage** <br>(indicador) | Obtiene el porcentaje medio de memoria utilizada en el intervalo específico<br>_Mostrado como porcentaje_ |
| **ioconnect.mulesoft.anypoint.applications.memory.total.max** <br>(gauge) | Obtiene la memoria total en bytes del trabajador. memoryTotalUsed/memoryTotalMax = memoryPercentageUsed<br>_Mostrado como byte_ |
| **ioconnect.mulesoft.anypoint.applications.cpu.usage** <br>(gauge) | Obtiene el porcentaje medio de CPU utilizado en el intervalo específico <br>_Mostrado como CPU_ |
| **ioconnect.mulesoft.anypoint.applications.network_in** <br>(gauge) | Obtiene la media de la entrada de red en bytes por minuto en el intervalo específico<br>_Mostrado como byte_ |
| **ioconnect.mulesoft.anypoint.applications.network_out** <br>(gauge) | Obtiene la media de la salida de red en bytes por minuto en el intervalo específico<br>_Mostrado como byte_ |
| **ioconnect.mulesoft.anypoint.applications.queues.queued** <br>(count) | Obtiene las colas puestas en cola<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.queues.inflight** <br>(count) | Obtiene las colas que están en tránsito<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.schedules.count** <br>(count) | Obtiene programador(es) de una aplicación<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.workers** <br>(count) | Obtiene el count de trabajadores<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.workers.started** <br>(count) | Obtiene los trabajadores activos de las aplicaciones CloudHub<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.workers.starting** <br>(count) | Obtiene los trabajadores iniciales de las aplicaciones CloudHub<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.workers.stopped** <br>(count) | Obtiene los trabajadores inactivos de las aplicaciones CloudHub<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.reserved_cpu** <br>(gauge) | Obtiene la CPU de la aplicación reservada<br>_Mostrado como milicore_ |
| **ioconnect.mulesoft.anypoint.applications.cpu_limit** <br>(gauge) | Obtiene el límite de CPU de la aplicación<br>_Mostrado como milicore_ |
| **ioconnect.mulesoft.anypoint.applications.memory** <br>(gauge) | Obtiene la memoria de la aplicación<br>_Mostrado como mebibyte_ |
| **ioconnect.mulesoft.anypoint.applications.replicas** <br>(gauge) | Obtiene el número de réplicas de la aplicación<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.replicas.status.started** <br>(count) | Obtiene las réplicas de la aplicación con el estado iniciado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.replicas.status.starting** <br>(count) | Obtiene las réplicas de la aplicación con el estado inicial<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.replicas.status.stopped** <br>(count) | Obtiene las réplicas de aplicaciones con estado parado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.replicas.status.pending** <br>(count) | Obtiene las réplicas de aplicaciones con estado pendiente<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.sidecar.reserved_cpu** <br>(gauge) | Obtiene la CPU reservada de los sidecars de la aplicación<br>_Mostrado como milicore_ |
| **ioconnect.mulesoft.anypoint.applications.sidecar.cpu_limit** <br>(gauge) | Obtiene el límite de CPU de los sidecars de la aplicación<br>_Mostrado como milicore_ |
| **ioconnect.mulesoft.anypoint.applications.sidecar.memory** <br>(gauge) | Obtiene la memoria de los sidecars de la aplicación<br>_Mostrado como mebibyte_ |
| **ioconnect.mulesoft.anypoint.applications.settings.clustered.enabled** <br>(count) | Obtiene la aplicación configurada con el ajuste en clúster activado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.settings.clustered.disabled** <br>(count) | Obtiene la aplicación configurada con el ajuste en clúster desactivado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.settings.replicas_across_nodes.enabled** <br>(count) | Obtiene la aplicación configurada con el ajuste de réplicas en todos los nodos activado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.settings.replicas_across_nodes.disabled** <br>(count) | Obtiene la aplicación configurada con el ajuste de las réplicas en todos los nodos desactivado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.settings.update_strategy.rolling** <br>(count) | Obtiene la aplicación configurada con el ajuste de estrategia de actualización gradual<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.settings.update_strategy.recreate** <br>(count) | Obtiene la aplicación configurada con el ajuste de estrategia de actualización recreada<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.settings.last_mile_security.enabled** <br>(count) | Obtiene la aplicación configurada con el ajuste de seguridad de última milla activado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.settings.last_mile_security.disabled** <br>(count) | Obtiene la aplicación configurada con el ajuste de seguridad de última milla desactivado<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.settings.am_log_forwarding.enabled** <br>(count) | Obtiene la aplicación configurada con el ajuste de monitorización de reenvío de logs a cualquier punto activada (solo on-premises)<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.settings.am_log_forwarding.disabled** <br>(count) | Obtiene la aplicación configurada con el ajuste de monitorización de reenvío de logs a cualquier punto desactivada (solo on-premises)<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.settings.forward_ssl_session.enabled** <br>(count) | Obtiene la aplicación configurada con la sesión de reenvío SSL activada<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.settings.forward_ssl_session.disabled** <br>(count) | Obtiene la aplicación configurada con la sesión de reenvío SSL desactivada<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.settings.external_log_forwarding.enabled** <br>(count) | Obtiene la aplicación configurada con el ajuste de reenvío de logs externos activado (solo on-premises)<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.settings.external_log_forwarding.disabled** <br>(count) | Obtiene la aplicación configurada con el ajuste de reenvío de logs externos desactivado (solo on-premises)<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.message_count** <br>(gauge) | Obtiene el count de mensajes de las aplicaciones por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.response_time** <br>(gauge) | Obtiene el tiempo (medio) de respuesta de mensajes de las aplicaciones por entorno<br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.applications.error_count** <br>(gauge) | Obtiene el count de errores de eventos de las aplicaciones por entorno<br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.flows.message_count** <br>(gauge) | Obtiene el count de mensajes de flujos por aplicación <br>_Mostrado como unidad_ |
| **ioconnect.mulesoft.anypoint.applications.flows.response_time** <br>(gauge) | Obtiene el tiempo de respuesta de los mensajes de flujos por aplicación <br>_Mostrado como unidad_. |
| **ioconnect.mulesoft.anypoint.applications.flows.error_count** <br>(gauge) | Obtiene el recuento de errores de eventos de flujos por aplicación <br>_Mostrado como unidad_ |

### Checks de servicio

**ioconnect.mulesoft.anypoint.can_connect**

Devuelve `CRITICAL` si el check no puede generar el token de connection (conexión) de Anypoint o la integración finalizó con un error del tiempo de ejecución, `OK` en caso contrario.

_Estados: ok, crítico_

**ioconnect.mulesoft.anypoint.license_valid**

Devuelve `CRITICAL` si la licencia de cliente no se puede validar, `OK` en caso contrario.

_Estados: ok, crítico_

.

### Eventos

La integración Mule® en Datadog no incluye eventos.

## Asistencia técnica

Tómese un momento para conocer el proceso de configuración de la integración de Datadog y Mule®: [Requisitos previos](https://docs.ioconnectservices.com/dmi/systemarchitecture) e [Instalación](https://docs.ioconnectservices.com/dmi/installation)

Para solicitar asistencia o funciones, ponte en contacto con el servicio de asistencia de Nova a través de los siguientes canales:

- Ventas: [products.sales@novacloud.io](mailto:products.sales@novacloud.io)
- Asistencia técnica: [support_ddp@novacloud.io](mailto:support_ddp@novacoud.io)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/iocs-dmi" target="_blank">Haz clic aquí</a> para comprar esta aplicación.
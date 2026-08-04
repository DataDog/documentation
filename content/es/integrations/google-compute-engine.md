---
aliases:
- /es/integrations/google_compute_engine
app_id: google-compute-engine
categories:
- nube
- configuración y despliegue
- google cloud
- recopilación de logs
- red
- sistema operativo y sistema
custom_kind: integración
description: Google Compute Engine ofrece máquinas virtuales que se ejecutan en los
  innovadores centros de datos de Google y en su red mundial de fibra óptica.
media: []
title: Google Compute Engine
---
## Información general

Google Cloud Compute Engine ofrece máquinas virtuales que se ejecutan en los innovadores centros de datos de Google y en la red mundial de fibra red.

Obtén métricas de Google Compute Engine para:

- Visualizar el rendimiento de tus motores informáticos.
- Correlacionar el rendimiento de tus motores informáticos con tus aplicaciones.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

#### Configuración

Para recopilar etiquetas (labels) Compute Engine personalizadas como etiquetas (tags), activa el permiso de inventario de recursos en la nube.

### Recopilación de logs

Los logs de Google Compute Engine se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/?tab=datadogussite#log-collection).

Una vez hecho esto, exporta tus logs de Google App Engine desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Compute Engine.

1. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.

1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}

1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

### Configuración

#### Limitar la recopilación de los hosts 

Si quieres monitorizar un subconjunto de tus instancias GCE con Datadog, asigna una etiqueta (label) de GCE, como `datadog:true`, a esas instancias GCE. Luego, especifica esa etiqueta (tag) en el cuadro de texto **Optionally limit metrics collection** (Limitar opcionalmente la recopilación de métricas) de tu [cuadro de la integración de GCP en Datadog](https://app.datadoghq.com/integrations/google_cloud_platform). Para obtener más información sobre el filtrado de máquinas virtuales por etiqueta (tag), consulta la [documentación de la integración Google Cloud Platform integration](https://docs.datadoghq.com/integrations/google-cloud-platform/#configuration).

#### Silenciado automático de GCE

Datadog puede silenciar de forma proactiva monitores relacionados con el apagado manual de instancias de Google Compute Engine (GCE) y con el cierre de instancias activada por el autoescalado de GCE en función de los estados de host de la API de GCE. Las instancias GCE silenciadas se muestran en la página del [tiempo de inactividad del monitor](https://app.datadoghq.com/monitors/downtimes) seleccionando **Show automatically muted hosts** (Mostrar hosts silenciados automáticamente).

Para silenciar los monitores de cierres de instancias GCE previstos, selecciona la casilla **GCE Automuting** (Silenciado automático de GCE) en el [cuadro de la integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/).

{{< img src="integrations/google_compute_engine/gce_automuting.png" alt="Silenciado automático de GCE" >}}

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.gce.firewall.dropped_bytes_count** <br>(count) | Bytes entrantes descartados por el cortafuegos.<br>_Se muestra en bytes_ |
| **gcp.gce.firewall.dropped_packets_count** <br>(count) | Paquetes entrantes descartados por el cortafuegos.<br>_Se muestra como paquete_ |
| **gcp.gce.guest.cpu.runnable_task_count** <br>(gauge) | Número medio de tareas ejecutables en la cola de ejecución.<br>_Se muestra como tarea_ |
| **gcp.gce.guest.cpu.usage_time** <br>(count) | Uso de CPU, en segundos.<br>_Se muestra en segundos_ |
| **gcp.gce.guest.disk.bytes_used** <br>(gauge) | Bytes de disco utilizados, en bytes.<br>_Se muestra en bytes_ |
| **gcp.gce.guest.disk.io_time** <br>(gauge) | Tiempo de E/S acumulado en el disco.<br>_Se muestra en milisegundos_ |
| **gcp.gce.guest.disk.merged_operation_count** <br>(count) | Recuento de operaciones de disco fusionadas. Las operaciones de disco que son adyacentes entre sí pueden ser fusionadas por el núcleo para mayor eficiencia.<br>_Se muestra como operación_ |
| **gcp.gce.guest.disk.operation_bytes_count** <br>(count) | Bytes transferidos en operaciones de disco.<br>_Se muestra en bytes_ |
| **gcp.gce.guest.disk.operation_count** <br>(count) | Recuento de operaciones de disco.<br>_Se muestra como operación_ |
| **gcp.gce.guest.disk.operation_time** <br>(gauge) | Tiempo empleado en operaciones de disco.<br>_Se muestra en milisegundos_ |
| **gcp.gce.guest.disk.queue_length** <br>(gauge) | Longitud de la cola en el disco promediada en los últimos 60 segundos.|
| **gcp.gce.guest.disk.weighted_io_time** <br>(count) | Tiempo de E/S ponderado acumulado transcurrido en el disco.<br>_Se muestra en milisegundos_ |
| **gcp.gce.guest.memory.anonymous_used** <br>(gauge) | Uso de memoria anónima, en bytes. Sumando los valores de todos los estados se obtiene el total de memoria anónima utilizada.<br>_Se muestra en bytes_ |
| **gcp.gce.guest.memory.bytes_used** <br>(gauge) | Uso de memoria por cada estado de memoria, en bytes. Sumando los valores de todos los estados se obtiene la memoria total de la máquina.<br>_Se muestra en bytes_ |
| **gcp.gce.guest.memory.dirty_used** <br>(gauge) | Uso de páginas sucias, en bytes.<br>_Se muestra en bytes_ |
| **gcp.gce.guest.memory.page_cache_used** <br>(gauge) | Uso de memoria caché de páginas, en bytes. Sumando los valores de todos los estados se obtiene el total de memoria anónima utilizada.<br>_Se muestra en bytes_ |
| **gcp.gce.guest.memory.unevictable_used** <br>(gauge) | Uso de memoria no desalojable, en bytes.<br>_Se muestra en bytes_ |
| **gcp.gce.guest.system.problem_count** <br>(count) | Número de veces que se ha producido un problema en la máquina.|
| **gcp.gce.guest.system.problem_state** <br>(gauge) | Si un problema está afectando al sistema o no. El problema afecta al sistema cuando se configura en 1 y no afecta al sistema cuando se configura en 0.|
| **gcp.gce.guest.system.uptime** <br>(gauge) | Número de segundos que se ha estado ejecutando el sistema operativo.<br>_Se muestra en segundos_ |
| **gcp.gce.instance_group.size** <br>(gauge) | Número de máquinas virtuales en el grupo de instancias.|
| **gcp.gce.instance.cpu.reserved_cores** <br>(gauge) | Número de núcleos reservados en el host de la instancia.<br>_Se muestra como núcleo_ |
| **gcp.gce.instance.cpu.scheduler_wait_time** <br>(gauge) | El tiempo de espera es el tiempo en que una vCPU está lista para ejecutarse, pero imprevistamente no está programada para ejecutarse. El tiempo de espera devuelto aquí es el valor acumulado de todas las vCPU.|
| **gcp.gce.instance.cpu.usage_time** <br>(gauge) | Tiempo de uso de CPU de todos los núcleos.<br>_Se muestra en segundos_ |
| **gcp.gce.instance.cpu.utilization** <br>(gauge) | Fracción de CPU asignada que está actualmente en uso en la instancia. Ten en cuenta que algunos tipos de máquinas permiten ráfagas por encima del 100% de uso.<br>_Se muestra como fracción_ |
| **gcp.gce.instance.disk.average_io_latency** <br>(gauge) | Latencia media de E/S del disco.<br>_Se muestra en microsegundos_ |
| **gcp.gce.instance.disk.average_io_queue_depth** <br>(gauge) | Profundidad media de E/S de la cola del disco.|
| **gcp.gce.instance.disk.max_read_bytes_count** <br>(gauge) | Rendimiento máximo de lectura por segundo del disco.<br>_Se muestra en bytes_ |
| **gcp.gce.instance.disk.max_read_ops_count** <br>(gauge) | Recuento máximo de solicitudes de lectura del disco por segundo.|
| **gcp.gce.instance.disk.max_write_bytes_count** <br>(gauge) | Rendimiento máximo de escritura por segundo del disco.|
| **gcp.gce.instance.disk.max_write_ops_count** <br>(gauge) | Número máximo de solicitudes de escritura por segundo.|
| **gcp.gce.instance.disk.read_bytes_count** <br>(count) | Bytes leídos del disco.<br>_Se muestra en bytes_ |
| **gcp.gce.instance.disk.read_ops_count** <br>(count) | Operaciones de E/S de lectura del disco.<br>_Se muestra como operación_ |
| **gcp.gce.instance.disk.write_bytes_count** <br>(count) | Bytes escritos en el disco.<br>_Se muestra en bytes_ |
| **gcp.gce.instance.disk.write_ops_count** <br>(count) | Operaciones de E/S de escritura en el disco.<br>_Se muestra como operación_ |
| **gcp.gce.instance.integrity.early_boot_validation_status** <br>(gauge) | Estado de validación de la política de integridad de arranque anticipado.|
| **gcp.gce.instance.integrity.late_boot_validation_status** <br>(gauge) | Estado de validación de la política de integridad de arranque tardío.|
| **gcp.gce.instance.is_running** <br>(gauge) | Check de estado que devuelve 1 si la instancia se está ejecutando.|
| **gcp.gce.instance.memory.balloon.ram_size** <br>(gauge) | Cantidad total de memoria en la máquina virtual.<br>_Se muestra en bytes_ |
| **gcp.gce.instance.memory.balloon.ram_used** <br>(gauge) | Memoria utilizada actualmente en la máquina virtual.<br>_Se muestra en bytes_ |
| **gcp.gce.instance.memory.balloon.swap_in_bytes_count** <br>(count) | Cantidad de memoria leída en el huésped desde su propio espacio de intercambio.<br>_Se muestra en bytes_ |
| **gcp.gce.instance.memory.balloon.swap_out_bytes_count** <br>(count) | Cantidad de memoria leída en el huésped desde su propio espacio de intercambio.<br>_Se muestra en bytes_ |
| **gcp.gce.instance.network.received_bytes_count** <br>(count) | Bytes recibidos de la red.<br>_Se muestra en bytes_ |
| **gcp.gce.instance.network.received_packets_count** <br>(count) | Paquetes recibidos de la red.<br>_Se muestra como paquete_ |
| **gcp.gce.instance.network.sent_bytes_count** <br>(count) | Bytes enviados a través de la red.<br>_Se muestra en bytes_ |
| **gcp.gce.instance.network.sent_packets_count** <br>(count) | Paquetes enviados a través de la red.<br>_Se muestra como paquete_ |
| **gcp.gce.instance.uptime** <br>(gauge) | Indica el tiempo de ejecución de la máquina virtual en segundos.<br>_Se muestra en segundos_ |
| **gcp.gce.mirroring.dropped_packets_count** <br>(count) | Número de paquetes espejados descartados.<br>_Se muestra como paquete_ |
| **gcp.gce.mirroring.mirrored_bytes_count** <br>(count) | Número de bytes espejados<br>_Se muestra en bytes_ |
| **gcp.gce.mirroring.mirrored_packets_count** <br>(count) | Número de paquetes espejados.<br>_Se muestra como paquete_ |
| **gcp.gce.nat.allocated_ports** <br>(gauge) | Número de puertos asignados a todas las máquinas virtuales por la pasarela NAT|
| **gcp.gce.nat.closed_connections_count** <br>(count) | Número de conexiones a la pasarela NAT cerradas<br>_Se muestra como conexión_ |
| **gcp.gce.nat.dropped_received_packets_count** <br>(count) | Número de paquetes recibidos descartados por la pasarela NAT<br>_Se muestra como paquete_ |
| **gcp.gce.nat.dropped_sent_packets_count** <br>(count) | Número de paquetes enviados descartados por la pasarela NAT<br>_Se muestra como paquete_ |
| **gcp.gce.nat.new_connections_count** <br>(count) | Número de nuevas conexiones a la pasarela NAT<br>_Se muestra como conexión_ |
| **gcp.gce.nat.open_connections** <br>(gauge) | Número de conexiones abiertas a la pasarela NAT<br>_Se muestra como conexión_ |
| **gcp.gce.nat.port_usage** <br>(gauge) | Mayor uso de puertos entre todas las máquinas virtuales conectadas a la pasarela NAT|
| **gcp.gce.nat.received_bytes_count** <br>(count) | Número de bytes recibidos por la pasarela NAT<br>_Se muestra en bytes_ |
| **gcp.gce.nat.received_packets_count** <br>(count) | Número de paquetes recibidos por la pasarela NAT<br>_Se muestra como paquete_ |
| **gcp.gce.nat.sent_bytes_count** <br>(gauge) | Número de bytes enviados por la pasarela NAT<br>_Se muestra en bytes_ |
| **gcp.gce.nat.sent_packets_count** <br>(gauge) | Número de paquetes enviados por la pasarela NAT<br>_Se muestra como paquete_ |
| **gcp.gce.project.quota.backend_buckets.limit** <br>(gauge) | Límite de cuota de proyectos para buckets de backend.|
| **gcp.gce.project.quota.backend_buckets.usage** <br>(gauge) | Uso de la cuota de proyectos para buckets de backend.|
| **gcp.gce.project.quota.backend_services.limit** <br>(gauge) | Límite de cuota de servicios de backend.|
| **gcp.gce.project.quota.backend_services.usage** <br>(gauge) | Cantidad de la cuota de servicios de backend utilizada.|
| **gcp.gce.project.quota.external_vpn_gateways.limit** <br>(gauge) | Límite de cuota de proyectos para pasarelas VPN externas.|
| **gcp.gce.project.quota.external_vpn_gateways.usage** <br>(gauge) | Uso de la cuota de proyectos para pasarelas VPN externas.|
| **gcp.gce.project.quota.firewalls.limit** <br>(gauge) | Límite de cuota de cortafuegos.|
| **gcp.gce.project.quota.firewalls.usage** <br>(gauge) | Cantidad de la cuota de cortafuegos utilizada.|
| **gcp.gce.project.quota.forwarding_rules.limit** <br>(gauge) | Límite de cuota de reglas de reenvío.|
| **gcp.gce.project.quota.forwarding_rules.usage** <br>(gauge) | Cantidad de la cuota de reglas de reenvío utilizada.|
| **gcp.gce.project.quota.global_internal_addresses.limit** <br>(gauge) | Límite de cuota de proyectos para direcciones IP internas globales.|
| **gcp.gce.project.quota.global_internal_addresses.usage** <br>(gauge) | Uso de la cuota de proyectos para direcciones IP internas globales.|
| **gcp.gce.project.quota.health_checks.limit** <br>(gauge) | Límite de cuota de checks de estado.|
| **gcp.gce.project.quota.health_checks.usage** <br>(gauge) | Cantidad de la cuota de checks de estado utilizada.|
| **gcp.gce.project.quota.images.limit** <br>(gauge) | Límite de cuota de imágenes.|
| **gcp.gce.project.quota.images.usage** <br>(gauge) | Cantidad de la cuota de imágenes utilizada.|
| **gcp.gce.project.quota.in_use_addresses.limit** <br>(gauge) | Límite de cuota de direcciones en uso.|
| **gcp.gce.project.quota.in_use_addresses.usage** <br>(gauge) | Cantidad de la cuota de direcciones utilizada.|
| **gcp.gce.project.quota.instance_templates.limit** <br>(gauge) | Límite de cuota de plantillas de instancia.|
| **gcp.gce.project.quota.instance_templates.usage** <br>(gauge) | Cantidad de la cuota de plantillas de instancias utilizada.|
| **gcp.gce.project.quota.interconnects.limit** <br>(gauge) | Límite de cuota de proyectos para interconexiones.|
| **gcp.gce.project.quota.interconnects.usage** <br>(gauge) | Uso de la cuota de proyectos para interconexiones.|
| **gcp.gce.project.quota.machine_images.limit** <br>(gauge) | Límite de cuota de proyectos para imágenes de máquinas.|
| **gcp.gce.project.quota.machine_images.usage** <br>(gauge) | Uso de la cuota de proyectos para imágenes de máquinas.|
| **gcp.gce.project.quota.network_endpoint_groups.limit** <br>(gauge) | Límite de cuota de proyectos para grupos de endpoints de red.|
| **gcp.gce.project.quota.network_endpoint_groups.usage** <br>(gauge) | Uso de la cuota de proyectos para grupos de endpoints de red.|
| **gcp.gce.project.quota.networks.limit** <br>(gauge) | Límite de cuota de redes.|
| **gcp.gce.project.quota.networks.usage** <br>(gauge) | Cantidad de la cuota de redes utilizada.|
| **gcp.gce.project.quota.packet_mirrorings.limit** <br>(gauge) | Límite de cuota de proyectos para espejamientos.|
| **gcp.gce.project.quota.packet_mirrorings.usage** <br>(gauge) | Uso de la cuota de proyectos para espejamientos.|
| **gcp.gce.project.quota.routers.limit** <br>(gauge) | Límite de cuota de proyectos para routers.|
| **gcp.gce.project.quota.routers.usage** <br>(gauge) | Uso de la cuota de proyectos para routers.|
| **gcp.gce.project.quota.routes.limit** <br>(gauge) | Límite de cuota de rutas.|
| **gcp.gce.project.quota.routes.usage** <br>(gauge) | Cantidad de la cuota de rutas utilizada.|
| **gcp.gce.project.quota.security_policies.limit** <br>(gauge) | Límite de cuota de proyectos para políticas de seguridad.|
| **gcp.gce.project.quota.security_policies.usage** <br>(gauge) | Uso de la cuota de proyectos para políticas de seguridad.|
| **gcp.gce.project.quota.security_policy_ceval_rules.limit** <br>(gauge) | Límite de cuota de proyectos para reglas ceval de la política de seguridad.|
| **gcp.gce.project.quota.security_policy_ceval_rules.usage** <br>(gauge) | Uso de la cuota de proyectos para reglas ceval de políticas de seguridad.|
| **gcp.gce.project.quota.security_policy_rules.limit** <br>(gauge) | Límite de cuota de proyectos para reglas de políticas de seguridad.|
| **gcp.gce.project.quota.security_policy_rules.usage** <br>(gauge) | Uso de la cuota de proyectos para reglas de políticas de seguridad.|
| **gcp.gce.project.quota.snapshots.limit** <br>(gauge) | Límite de cuota de snapshots.|
| **gcp.gce.project.quota.snapshots.usage** <br>(gauge) | Cantidad de la cuota de snapshots utilizada.|
| **gcp.gce.project.quota.ssl_certificates.limit** <br>(gauge) | Límite de cuota de certificados SSL.|
| **gcp.gce.project.quota.ssl_certificates.usage** <br>(gauge) | Cantidad de la cuota de certificados SSL utilizada.|
| **gcp.gce.project.quota.static_addresses.limit** <br>(gauge) | Límite de cuota de direcciones estáticas.|
| **gcp.gce.project.quota.static_addresses.usage** <br>(gauge) | Cantidad de la cuota de direcciones estáticas utilizada.|
| **gcp.gce.project.quota.subnetworks.limit** <br>(gauge) | Límite de cuota de subredes.|
| **gcp.gce.project.quota.subnetworks.usage** <br>(gauge) | Cantidad de la cuota de subredes utilizada.|
| **gcp.gce.project.quota.target_http_proxies.limit** <br>(gauge) | Límite de cuota de proxies http de destino.|
| **gcp.gce.project.quota.target_http_proxies.usage** <br>(gauge) | Cantidad de la cuota de proxies http de destino utilizada.|
| **gcp.gce.project.quota.target_https_proxies.limit** <br>(gauge) | Límite de cuota de proxies https de destino.|
| **gcp.gce.project.quota.target_https_proxies.usage** <br>(gauge) | Cantidad de la cuota de proxies https de destino utilizada.|
| **gcp.gce.project.quota.target_instances.limit** <br>(gauge) | Límite de cuota de instancias de destino.|
| **gcp.gce.project.quota.target_instances.usage** <br>(gauge) | Cantidad de la cuota de instancias de destino utilizada.|
| **gcp.gce.project.quota.target_pools.limit** <br>(gauge) | Límite de cuota de grupos de destino.|
| **gcp.gce.project.quota.target_pools.usage** <br>(gauge) | Cantidad de la cuota de grupos de destino utilizada.|
| **gcp.gce.project.quota.target_ssl_proxies.limit** <br>(gauge) | Límite de cuota de proyectos para proxies SSL de destino.|
| **gcp.gce.project.quota.target_ssl_proxies.usage** <br>(gauge) | Uso de cuota de los proyectos para proxies SSL de destino.|
| **gcp.gce.project.quota.target_tcp_proxies.limit** <br>(gauge) | Límite de cuota de proyectos para proxies TCP de destino.|
| **gcp.gce.project.quota.target_tcp_proxies.usage** <br>(gauge) | Uso de cuota de los proyectos para proxies TCP de destino.|
| **gcp.gce.project.quota.target_vpn_gateways.limit** <br>(gauge) | Límite de cuota de pasarelas VPN de destino.|
| **gcp.gce.project.quota.target_vpn_gateways.usage** <br>(gauge) | Cantidad de la cuota de pasarelas VPN de destino utilizada.|
| **gcp.gce.project.quota.url_maps.limit** <br>(gauge) | Límite de cuota de mapas URL.|
| **gcp.gce.project.quota.url_maps.usage** <br>(gauge) | Cantidad de la cuota de mapas URL utilizada.|
| **gcp.gce.project.quota.vpn_gateways.limit** <br>(gauge) | Límite de cuota de pasarelas VPN.|
| **gcp.gce.project.quota.vpn_gateways.usage** <br>(gauge) | Número de pasarelas VPN utilizadas.|
| **gcp.gce.project.quota.vpn_tunnels.limit** <br>(gauge) | Límite de cuota de túneles VPN.|
| **gcp.gce.project.quota.vpn_tunnels.usage** <br>(gauge) | Cantidad de la cuota de túneles VPN utilizada.|
| **gcp.gce.region.quota.affinity_groups.limit** <br>(gauge) | Límite de cuota de grupos de afinidad.|
| **gcp.gce.region.quota.affinity_groups.percentage** <br>(gauge) | Porcentaje de la cuota de grupos de afinidad utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.affinity_groups.usage** <br>(gauge) | Número de grupos de afinidad utilizados.|
| **gcp.gce.region.quota.autoscalers.limit** <br>(gauge) | Límite de cuota de autoescaladores.|
| **gcp.gce.region.quota.autoscalers.percentage** <br>(gauge) | Porcentaje de la cuota de autoescaladores utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.autoscalers.usage** <br>(gauge) | Número de autoescaladores utilizados.|
| **gcp.gce.region.quota.c2_cpus.limit** <br>(gauge) | Límite de cuota de CPU c2.|
| **gcp.gce.region.quota.c2_cpus.percentage** <br>(gauge) | Porcentaje de la cuota de CPU c2 utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.c2_cpus.usage** <br>(gauge) | Número de CPU c2 utilizadas.|
| **gcp.gce.region.quota.commitments.limit** <br>(gauge) | Límite de cuota de compromisos.|
| **gcp.gce.region.quota.commitments.percentage** <br>(gauge) | Porcentaje de la cuota de compromisos utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.commitments.usage** <br>(gauge) | Número de compromisos utilizados.|
| **gcp.gce.region.quota.committed_c2_cpus.limit** <br>(gauge) | Límite de cuota de CPU c2.|
| **gcp.gce.region.quota.committed_c2_cpus.percentage** <br>(gauge) | Porcentaje de la cuota de CPU c2 utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.committed_c2_cpus.usage** <br>(gauge) | Número de CPU c2 utilizadas.|
| **gcp.gce.region.quota.committed_cpus.limit** <br>(gauge) | Límite de cuota de CPU.|
| **gcp.gce.region.quota.committed_cpus.percentage** <br>(gauge) | Porcentaje de la cuota de CPU utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.committed_cpus.usage** <br>(gauge) | Número de CPU utilizadas.|
| **gcp.gce.region.quota.committed_local_ssd_total_gb.limit** <br>(gauge) | Límite de cuota total de gb del SSD local.|
| **gcp.gce.region.quota.committed_local_ssd_total_gb.percentage** <br>(gauge) | Porcentaje de la cuota de gb totales del SSD local utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.committed_local_ssd_total_gb.usage** <br>(gauge) | Número de gb totales del SSD local utilizados.|
| **gcp.gce.region.quota.committed_n2_cpus.limit** <br>(gauge) | Límite de cuota de CPU n2.|
| **gcp.gce.region.quota.committed_n2_cpus.percentage** <br>(gauge) | Porcentaje de la cuota de CPU n2 utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.committed_n2_cpus.usage** <br>(gauge) | Número de CPU n2 utilizadas.|
| **gcp.gce.region.quota.committed_n2d_cpus.limit** <br>(gauge) | Límite de cuota de CPU n2d.|
| **gcp.gce.region.quota.committed_n2d_cpus.percentage** <br>(gauge) | Porcentaje de la cuota de CPU n2d utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.committed_n2d_cpus.usage** <br>(gauge) | Número de CPU n2d utilizadas.|
| **gcp.gce.region.quota.committed_nvidia_k80_gpus.limit** <br>(gauge) | Límite de cuota de GPU k80 Nvidia.|
| **gcp.gce.region.quota.committed_nvidia_k80_gpus.percentage** <br>(gauge) | Porcentaje de la cuota de GPU k80 Nvidia utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.committed_nvidia_k80_gpus.usage** <br>(gauge) | Número de GPU k80 Nvidia utilizadas.|
| **gcp.gce.region.quota.committed_nvidia_p100_gpus.limit** <br>(gauge) | Límite de cuota de GPU p100 Nvidia.|
| **gcp.gce.region.quota.committed_nvidia_p100_gpus.percentage** <br>(gauge) | Porcentaje de la cuota de GPU p100 Nvidia utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.committed_nvidia_p100_gpus.usage** <br>(gauge) | Número de GPU p100 Nvidia utilizadas.|
| **gcp.gce.region.quota.committed_nvidia_p4_gpus.limit** <br>(gauge) | Límite de cuota de GPU p4 Nvidia.|
| **gcp.gce.region.quota.committed_nvidia_p4_gpus.percentage** <br>(gauge) | Porcentaje de la cuota de GPU p4 Nvidia utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.committed_nvidia_p4_gpus.usage** <br>(gauge) | Número de GPU p4 Nvidia utilizadas.|
| **gcp.gce.region.quota.committed_nvidia_t4_gpus.limit** <br>(gauge) | Límite de cuota de GPU t4 Nvidia.|
| **gcp.gce.region.quota.committed_nvidia_t4_gpus.percentage** <br>(gauge) | Porcentaje de la cuota de GPU t4 Nvidia utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.committed_nvidia_t4_gpus.usage** <br>(gauge) | Número de GPU t4 Nvidia utilizadas.|
| **gcp.gce.region.quota.committed_nvidia_v100_gpus.limit** <br>(gauge) | Límite de cuota de GPU v100 Nvidia.|
| **gcp.gce.region.quota.committed_nvidia_v100_gpus.percentage** <br>(gauge) | Porcentaje de la cuota de GPU v100 Nvidia utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.committed_nvidia_v100_gpus.usage** <br>(gauge) | Número de GPU v100 Nvidia utilizadas.|
| **gcp.gce.region.quota.cpus.limit** <br>(gauge) | Límite de cuota de CPU.|
| **gcp.gce.region.quota.cpus.percentage** <br>(gauge) | Porcentaje de la cuota de CPU utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.cpus.usage** <br>(gauge) | Número de CPU utilizadas.|
| **gcp.gce.region.quota.disks_total_gb.limit** <br>(gauge) | Cuota del tamaño total de los discos duros<br>_Se muestra en gibibytes_ |
| **gcp.gce.region.quota.disks_total_gb.percentage** <br>(gauge) | Porcentaje de la cuota de disco duro utilizada.<br>_Se muestra como porcentaje_. |
| **gcp.gce.region.quota.disks_total_gb.usage** <br>(gauge) | Tamaño total de disco duro utilizado.<br>_Se muestra en gibibytes_ |
| **gcp.gce.region.quota.in_use_addresses.limit** <br>(gauge) | Límite de cuota de direcciones IP en uso (efímeras + estáticas).|
| **gcp.gce.region.quota.in_use_addresses.percentage** <br>(gauge) | Porcentaje de la cuota de direcciones IP en uso (efímeras + estáticas) utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.in_use_addresses.usage** <br>(gauge) | Número de direcciones IP (efímeras + estáticas) utilizadas.|
| **gcp.gce.region.quota.in_use_backup_schedules.limit** <br>(gauge) | Límite de cuota de copias de seguridad.|
| **gcp.gce.region.quota.in_use_backup_schedules.percentage** <br>(gauge) | Porcentaje de la cuota de copias de seguridad utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.in_use_backup_schedules.usage** <br>(gauge) | Número de cronogramas de copias de seguridad utilizados.|
| **gcp.gce.region.quota.in_use_snapshot_schedules.limit** <br>(gauge) | Límite de cuota regional de cronogramas de snapshots en uso.|
| **gcp.gce.region.quota.in_use_snapshot_schedules.percentage** <br>(gauge) | Porcentaje de la cuota regional para cronogramas de snapshots en uso.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.in_use_snapshot_schedules.usage** <br>(gauge) | Uso de la cuota regional para cronogramas de snapshots en uso.|
| **gcp.gce.region.quota.instance_group_managers.limit** <br>(gauge) | Límite de cuota de gestores de grupos de instancias.|
| **gcp.gce.region.quota.instance_group_managers.percentage** <br>(gauge) | Porcentaje de la cuota de gestores de grupos de instancias utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.instance_group_managers.usage** <br>(gauge) | Número de gestores de grupos de instancias utilizados.|
| **gcp.gce.region.quota.instance_groups.limit** <br>(gauge) | Límite de cuota de grupos de instancias.|
| **gcp.gce.region.quota.instance_groups.percentage** <br>(gauge) | Porcentaje de la cuota de grupos de instancias utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.instance_groups.usage** <br>(gauge) | Número de grupos de instancias utilizados.|
| **gcp.gce.region.quota.instances.limit** <br>(gauge) | Límite de cuota de instancias.|
| **gcp.gce.region.quota.instances.percentage** <br>(gauge) | Porcentaje de la cuota de instancias utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.instances.usage** <br>(gauge) | Número de instancias utilizadas.|
| **gcp.gce.region.quota.interconnect_attachments_per_region.limit** <br>(gauge) | Límite de cuota de adjuntos de VLAN por región.|
| **gcp.gce.region.quota.interconnect_attachments_per_region.percentage** <br>(gauge) | Porcentaje de la cuota de adjuntos de VLAN por región utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.interconnect_attachments_per_region.usage** <br>(gauge) | Número de adjuntos de VLAN por región utilizados.|
| **gcp.gce.region.quota.interconnect_attachments_total_mbps.limit** <br>(gauge) | Límite de cuota total de mbp de adjuntos de VLAN.|
| **gcp.gce.region.quota.interconnect_attachments_total_mbps.percentage** <br>(gauge) | Porcentaje de la cuota total de mbps de adjuntos de VLAN utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.interconnect_attachments_total_mbps.usage** <br>(gauge) | Total de mbps de adjuntos de VLAN utilizados.|
| **gcp.gce.region.quota.internal_addresses.limit** <br>(gauge) | Límite de cuota de direcciones internas.|
| **gcp.gce.region.quota.internal_addresses.percentage** <br>(gauge) | Porcentaje de la cuota de direcciones internas utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.internal_addresses.usage** <br>(gauge) | Número de direcciones internas utilizadas.|
| **gcp.gce.region.quota.local_ssd_total_gb.limit** <br>(gauge) | Límite de cuota de gb totales del SSD local.<br>_Se muestra en gibibytes_ |
| **gcp.gce.region.quota.local_ssd_total_gb.percentage** <br>(gauge) | Porcentaje de la cuota total de gb totales del SSD local utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.local_ssd_total_gb.usage** <br>(gauge) | Cuota de gb totales del SSD local utilizada.<br>_Se muestra en gibibytes_ |
| **gcp.gce.region.quota.n2_cpus.limit** <br>(gauge) | Límite de cuota de CPU n2.|
| **gcp.gce.region.quota.n2_cpus.percentage** <br>(gauge) | Porcentaje de la cuota de CPU utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.n2_cpus.usage** <br>(gauge) | Cuota de CPU n2 utilizada.|
| **gcp.gce.region.quota.n2d_cpus.limit** <br>(gauge) | Límite de cuota de CPU n2d.|
| **gcp.gce.region.quota.n2d_cpus.percentage** <br>(gauge) | Porcentaje de la cuota de CPU n2d utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.n2d_cpus.usage** <br>(gauge) | Cuota de CPU n2d utilizada.|
| **gcp.gce.region.quota.network_endpoint_groups.limit** <br>(gauge) | Límite de cuota regional de grupos de endpoints de red.|
| **gcp.gce.region.quota.network_endpoint_groups.percentage** <br>(gauge) | Porcentaje de cuota regional para grupos de endpoints de red.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.network_endpoint_groups.usage** <br>(gauge) | Uso de cuotas regionales para grupos de endpoints de red.|
| **gcp.gce.region.quota.node_groups.limit** <br>(gauge) | Límite de cuota de grupos de nodos.|
| **gcp.gce.region.quota.node_groups.percentage** <br>(gauge) | Porcentaje de los grupos de nodos utilizado.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.node_groups.usage** <br>(gauge) | Cuota de grupos de nodos utilizada.|
| **gcp.gce.region.quota.node_templates.limit** <br>(gauge) | Límite de cuota de plantillas de nodos.|
| **gcp.gce.region.quota.node_templates.percentage** <br>(gauge) | Porcentaje de las plantillas de nodos utilizado.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.node_templates.usage** <br>(gauge) | Cuota de plantillas de nodos utilizada.|
| **gcp.gce.region.quota.nvidia_k80_gpus.limit** <br>(gauge) | Límite de cuota de GPU k80 Nvidia.|
| **gcp.gce.region.quota.nvidia_k80_gpus.percentage** <br>(gauge) | Porcentaje de la cuota de GPU k80 Nvidia utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.nvidia_k80_gpus.usage** <br>(gauge) | Número de GPU k80 Nvidia utilizadas.|
| **gcp.gce.region.quota.nvidia_p100_gpus.limit** <br>(gauge) | Límite de cuota de GPU p100 Nvidia.|
| **gcp.gce.region.quota.nvidia_p100_gpus.percentage** <br>(gauge) | Porcentaje de la cuota de GPU p100 Nvidia utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.nvidia_p100_gpus.usage** <br>(gauge) | Número de GPU p100 Nvidia utilizadas.|
| **gcp.gce.region.quota.nvidia_p100_vws_gpus.limit** <br>(gauge) | Límite de cuota de estaciones de trabajo virtuales p100 Nvidia.|
| **gcp.gce.region.quota.nvidia_p100_vws_gpus.percentage** <br>(gauge) | Porcentaje de la cuota de estaciones de trabajo virtuales p100 Nvidia utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.nvidia_p100_vws_gpus.usage** <br>(gauge) | Número de estaciones de trabajo virtuales p100 Nvidia utilizadas.|
| **gcp.gce.region.quota.nvidia_p4_gpus.limit** <br>(gauge) | Límite de cuota de GPU p4 Nvidia.|
| **gcp.gce.region.quota.nvidia_p4_gpus.percentage** <br>(gauge) | Porcentaje de la cuota de GPU p4 Nvidia utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.nvidia_p4_gpus.usage** <br>(gauge) | Número de GPU p4 Nvidia utilizadas.|
| **gcp.gce.region.quota.nvidia_p4_vws_gpus.limit** <br>(gauge) | Límite de cuota regional de GPU de estaciones de trabajo virtuales P4 Nvidia.|
| **gcp.gce.region.quota.nvidia_p4_vws_gpus.percentage** <br>(gauge) | Porcentaje de la cuota regional de GPU de estaciones de trabajo virtuales P4 Nvidia<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.nvidia_p4_vws_gpus.usage** <br>(gauge) | Uso de la cuota regional de GPU de estaciones de trabajo virtuales P4 Nvidia.|
| **gcp.gce.region.quota.nvidia_t4_gpus.limit** <br>(gauge) | Límite de cuota regional de GPU T4 Nvidia.|
| **gcp.gce.region.quota.nvidia_t4_gpus.percentage** <br>(gauge) | Porcentaje de la cuota regional de GPU T4 Nvidia.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.nvidia_t4_gpus.usage** <br>(gauge) | Uso de la cuota regional de GPU T4 Nvidia.|
| **gcp.gce.region.quota.nvidia_t4_vws_gpus.limit** <br>(gauge) | Límite de cuota regional de GPU de estaciones de trabajo virtuales T4 Nvidia.|
| **gcp.gce.region.quota.nvidia_t4_vws_gpus.percentage** <br>(gauge) | Porcentaje de la cuota regional de GPU de estaciones de trabajo virtuales T4 Nvidia<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.nvidia_t4_vws_gpus.usage** <br>(gauge) | Uso de la cuota regional de GPU de estaciones de trabajo virtuales T4 Nvidia.|
| **gcp.gce.region.quota.nvidia_v100_gpus.limit** <br>(gauge) | Límite de cuota de GPU v100 Nvidia.|
| **gcp.gce.region.quota.nvidia_v100_gpus.percentage** <br>(gauge) | Porcentaje de la cuota de GPU v100 Nvidia utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.nvidia_v100_gpus.usage** <br>(gauge) | Número de GPU v100 Nvidia utilizadas.|
| **gcp.gce.region.quota.preemptible_cpus.limit** <br>(gauge) | Límite de cuota de CPU preferentes.|
| **gcp.gce.region.quota.preemptible_cpus.percentage** <br>(gauge) | Porcentaje de la cuota de CPU preferentes utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.preemptible_cpus.usage** <br>(gauge) | Número de CPU preferentes utilizadas.|
| **gcp.gce.region.quota.preemptible_local_ssd_gb.limit** <br>(gauge) | Límite de cuota de gb del SSD local preferente.<br>_Se muestra en gibibytes_ |
| **gcp.gce.region.quota.preemptible_local_ssd_gb.percentage** <br>(gauge) | Porcentaje de la cuota de gb del SSD local preferente utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.preemptible_local_ssd_gb.usage** <br>(gauge) | Cuota de gb del SSD local preferente utilizada.<br>_Se muestra en gibibytes_ |
| **gcp.gce.region.quota.preemptible_nvidia_k80_gpus.limit** <br>(gauge) | Límite de cuota de GPU k80 Nvidia preferentes.|
| **gcp.gce.region.quota.preemptible_nvidia_k80_gpus.percentage** <br>(gauge) | Porcentaje de la cuota de GPU k80 Nvidia preferentes utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.preemptible_nvidia_k80_gpus.usage** <br>(gauge) | Número de GPU k80 Nvidia preferentes utilizadas.|
| **gcp.gce.region.quota.preemptible_nvidia_p100_gpus.limit** <br>(gauge) | Límite de cuota de GPU p100 Nvidia preferentes.|
| **gcp.gce.region.quota.preemptible_nvidia_p100_gpus.percentage** <br>(gauge) | Porcentaje de la cuota de GPU p100 Nvidia preferentes utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.preemptible_nvidia_p100_gpus.usage** <br>(gauge) | Número de GPU p100 Nvidia preferentes utilizadas.|
| **gcp.gce.region.quota.preemptible_nvidia_p100_vws_gpus.limit** <br>(gauge) | Límite de cuota regional de GPU de estaciones de trabajo virtuales preferentes P100 Nvidia.|
| **gcp.gce.region.quota.preemptible_nvidia_p100_vws_gpus.percentage** <br>(gauge) | Porcentaje de la cuota regional de GPU de estaciones de trabajo virtuales preferentes P100 Nvidia.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.preemptible_nvidia_p100_vws_gpus.usage** <br>(gauge) | Uso de la cuota regional de GPU de estaciones de trabajo virtuales preferentes P100 Nvidia.|
| **gcp.gce.region.quota.preemptible_nvidia_p4_gpus.limit** <br>(gauge) | Límite de cuota regional de GPU preferentes P4 Nvidia.|
| **gcp.gce.region.quota.preemptible_nvidia_p4_gpus.percentage** <br>(gauge) | Porcentaje de la cuota regional de GPU preferentes P4 Nvidia..<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.preemptible_nvidia_p4_gpus.usage** <br>(gauge) | Uso de la cuota regional de GPU preferentes P4 Nvidia.|
| **gcp.gce.region.quota.preemptible_nvidia_p4_vws_gpus.limit** <br>(gauge) | Límite de cuota regional de GPU de estaciones de trabajo virtuales preferentes P4 Nvidia.|
| **gcp.gce.region.quota.preemptible_nvidia_p4_vws_gpus.percentage** <br>(gauge) | Porcentaje de la cuota regional de GPU de estaciones de trabajo virtuales preferentes P4 Nvidia.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.preemptible_nvidia_p4_vws_gpus.usage** <br>(gauge) | Uso de la cuota regional de GPU de estaciones de trabajo virtuales preferentes P4 Nvidia.|
| **gcp.gce.region.quota.preemptible_nvidia_t4_gpus.limit** <br>(gauge) | Límite de cuota regional de GPU preferentes T4 Nvidia.|
| **gcp.gce.region.quota.preemptible_nvidia_t4_gpus.percentage** <br>(gauge) | Porcentaje de la cuota regional de GPU preferentes T4 Nvidia.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.preemptible_nvidia_t4_gpus.usage** <br>(gauge) | Uso de de la cuota regional de GPU preferentes T4 Nvidia.|
| **gcp.gce.region.quota.preemptible_nvidia_t4_vws_gpus.limit** <br>(gauge) | Límite de cuota regional de GPU de estaciones de trabajo virtuales preferentes T4 Nvidia.|
| **gcp.gce.region.quota.preemptible_nvidia_t4_vws_gpus.percentage** <br>(gauge) | Porcentaje de la cuota regional de GPU de estaciones de trabajo virtuales preferentes T4 Nvidia.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.preemptible_nvidia_t4_vws_gpus.usage** <br>(gauge) | Uso de la cuota regional de GPU de estaciones de trabajo virtuales preferentes T4 Nvidia.|
| **gcp.gce.region.quota.preemptible_nvidia_v100_gpus.limit** <br>(gauge) | Límite de cuota de GPU v100 Nvidia preferentes.|
| **gcp.gce.region.quota.preemptible_nvidia_v100_gpus.percentage** <br>(gauge) | Porcentaje de la cuota de GPU v100 Nvidia preferentes utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.preemptible_nvidia_v100_gpus.usage** <br>(gauge) | Número de GPU v100 Nvidia preferentes utilizadas.|
| **gcp.gce.region.quota.regional_autoscalers.limit** <br>(gauge) | Límite de cuota de autoescaladores regionales.|
| **gcp.gce.region.quota.regional_autoscalers.percentage** <br>(gauge) | Porcentaje de la cuota regional de autoescaladores utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.regional_autoscalers.usage** <br>(gauge) | Número de autoescaladores regionales utilizados.|
| **gcp.gce.region.quota.regional_instance_group_managers.limit** <br>(gauge) | Límite de cuota de gestores de grupos de instancias regionales.|
| **gcp.gce.region.quota.regional_instance_group_managers.percentage** <br>(gauge) | Porcentaje de la cuota de gestores de grupos de instancias regionales utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.regional_instance_group_managers.usage** <br>(gauge) | Número de gestores de grupos de instancias regionales utilizados.|
| **gcp.gce.region.quota.reservations.limit** <br>(gauge) | Límite de cuota de reservas.|
| **gcp.gce.region.quota.reservations.percentage** <br>(gauge) | Porcentaje de reservas utilizadas.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.reservations.usage** <br>(gauge) | Cuota de reservas utilizada.|
| **gcp.gce.region.quota.resource_policies.limit** <br>(gauge) | Límite de cuota de políticas de recursos.|
| **gcp.gce.region.quota.resource_policies.percentage** <br>(gauge) | Porcentaje de la cuota de políticas de recursos utilizada<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.resource_policies.usage** <br>(gauge) | Número de políticas de recursos utilizadas.|
| **gcp.gce.region.quota.ssd_total_gb.limit** <br>(gauge) | Límite de cuota de gb totales del SSD.<br>_Se muestra en gibibytes_ |
| **gcp.gce.region.quota.ssd_total_gb.percentage** <br>(gauge) | Porcentaje de la proporción de gb del SSD utilizada.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.ssd_total_gb.usage** <br>(gauge) | Total de gb del SSD utilizados.<br>_Se muestra en gibibytes_ |
| **gcp.gce.region.quota.static_addresses.limit** <br>(gauge) | Límite de cuota regional de direcciones estáticas.|
| **gcp.gce.region.quota.static_addresses.percentage** <br>(gauge) | Porcentaje de la cuota regional de direcciones IP estáticas.<br>_Se muestra como porcentaje_ |
| **gcp.gce.region.quota.static_addresses.usage** <br>(gauge) | Uso de la cuota regional de direcciones IP estáticas.|

### Eventos

La integración Google Cloud Compute Engine no incluye eventos.

### Checks de servicio

La integración Google Cloud Compute Engine no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitorización de métricas de Google Compute Engine](https://www.datadoghq.com/blog/monitoring-google-compute-engine-performance)
- [Recopilación de métricas de Google Compute Engine](https://www.datadoghq.com/blog/how-to-collect-gce-metrics)
- [Monitorizar Google Compute Engine con Datadog](https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog)
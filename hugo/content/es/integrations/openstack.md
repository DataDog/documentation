---
app_id: openstack
categories:
- cloud
- log collection
- network
- provisioning
- configuration & deployment
custom_kind: integración
description: Seguimiento del uso de recursos a nivel de hipervisor y VM, además de
  métricas de Neutron.
further_reading:
- link: https://www.datadoghq.com/blog/openstack-monitoring-nova
  tag: blog
  text: Monitorización de OpenStack Nova
- link: https://www.datadoghq.com/blog/install-openstack-in-two-commands
  tag: blog
  text: Instalar OpenStack en dos comandos para dev y test
- link: https://www.datadoghq.com/blog/openstack-host-aggregates-flavors-availability-zones
  tag: blog
  text: 'OpenStack: agregados de hosts, opciones y zonas de disponibilidad'
integration_version: 4.0.1
media: []
supported_os:
- linux
- windows
- macos
title: OpenStack (heredado)
---
![Dashboard por defecto de OpenStack](https://raw.githubusercontent.com/DataDog/integrations-core/master/openstack/images/openstack_dashboard.png)

## Información general

**Nota**: Esta integración solo se aplica a OpenStack v12 e inferiores. Si deseas recopilar métricas de OpenStack v13+, utiliza la [integración de OpenStack Controller](https://docs.datadoghq.com/integrations/openstack_controller).

Obtén métricas del servicio OpenStack en tiempo real para:

- Visualizar y monitorizar estados de OpenStack.
- Recibir notificaciones sobre fallos y eventos de OpenStack.

## Configuración

### Instalación

Para capturar tus métricas de OpenStack, [instala el Agent](https://app.datadoghq.com/account/settings/agent/latest) en tus hosts que ejecutan hipervisores.

### Configuración

#### Preparar OpenStack

Configura un rol y un usuario de Datadog con tu servidor de identidad:

```console
openstack role create datadog_monitoring
openstack user create datadog \
    --password my_password \
    --project my_project_name
openstack role add datadog_monitoring \
    --project my_project_name \
    --user datadog
```

A continuación, actualiza tus archivos `policy.json` para conceder los permisos necesarios. `role:datadog_monitoring` requiere acceso a las siguientes operaciones:

**Nova**

```json
{
  "compute_extension": "aggregates",
  "compute_extension": "hypervisors",
  "compute_extension": "server_diagnostics",
  "compute_extension": "v3:os-hypervisors",
  "compute_extension": "v3:os-server-diagnostics",
  "compute_extension": "availability_zone:detail",
  "compute_extension": "v3:availability_zone:detail",
  "compute_extension": "used_limits_for_admin",
  "os_compute_api:os-aggregates:index": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-aggregates:show": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-hypervisors": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-server-diagnostics": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-used-limits": "rule:admin_api or role:datadog_monitoring"
}
```

**Neutron**

```json
{
  "get_network": "rule:admin_or_owner or rule:shared or rule:external or rule:context_is_advsvc or role:datadog_monitoring"
}
```

**Keystone**

```json
{
  "identity:get_project": "rule:admin_required or project_id:%(target.project.id)s or role:datadog_monitoring",
  "identity:list_projects": "rule:admin_required or role:datadog_monitoring"
}
```

Es posible que tengas que reiniciar tus servicios de API de Keystone, Neutron y Nova para asegurarte de que los cambios de política se llevan a cabo.

**Nota**: La instalación de la integración de OpenStack podría aumentar el número de máquinas virtuales que Datadog monitoriza. Para obtener más información sobre cómo esto puede afectar a tu facturación, consulta las FAQ de facturación.

#### Configuración del Agent

1. Configura el Datadog Agent para conectarte a tu servidor Keystone, y especifica proyectos individuales para monitorizar. Edita el archivo `openstack.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) con la configuración de abajo. Consulta el [openstack.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/openstack/datadog_checks/openstack/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles:

   ```yaml
   init_config:
     ## @param keystone_server_url - string - required
     ## Where your identity server lives.
     ## Note that the server must support Identity API v3
     #
     keystone_server_url: "https://<KEYSTONE_SERVER_ENDPOINT>:<PORT>/"

   instances:
     ## @param name - string - required
     ## Unique identifier for this instance.
     #
     - name: "<INSTANCE_NAME>"

       ## @param user - object - required
       ## User credentials
       ## Password authentication is the only auth method supported.
       ## `user` object expects the parameter `username`, `password`,
       ## and `user.domain.id`.
       ##
       ## `user` should resolve to a structure like:
       ##
       ##  {'password': '<PASSWORD>', 'name': '<USERNAME>', 'domain': {'id': '<DOMAINE_ID>'}}
       #
       user:
         password: "<PASSWORD>"
         name: datadog
         domain:
           id: "<DOMAINE_ID>"
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent, puedes activarla en `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `openstack.d/conf.yaml` para empezar a recopilar tus logs de Openstack:

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: openstack
   ```

   Cambia el valor de los parámetros de `path` y configúralos para tu entorno. Consulta el [openstack.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/openstack/datadog_checks/openstack/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

### Validación

Ejecuta el subcomando [de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `openstack` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **openstack.nova.current_workload** <br>(gauge) | Carga de trabajo actual en el hipervisor de Nova|
| **openstack.nova.disk_available_least** <br>(gauge) | Disco disponible para el hipervisor de Nova<br>_Se muestra como gibibyte_ |
| **openstack.nova.free_disk_gb** <br>(gauge) | Disco libre en el hipervisor de Nova<br>_Se muestra como gibibyte_ |
| **openstack.nova.free_ram_mb** <br>(gauge) | RAM libre en el hipervisor de Nova<br>_Se muestra como mebibyte_ |
| **openstack.nova.hypervisor_load.1** <br>(gauge) | La carga media del hipervisor durante un minuto.|
| **openstack.nova.hypervisor_load.15** <br>(gauge) | La carga media del hipervisor en quince minutos.|
| **openstack.nova.hypervisor_load.5** <br>(gauge) | La carga media del hipervisor en cinco minutos.|
| **openstack.nova.limits.max_image_meta** <br>(gauge) | El máximo permitido de definiciones de metadatos de imagen para este inquilino|
| **openstack.nova.limits.max_personality** <br>(gauge) | Las personalidades máximas permitidas para este inquilino|
| **openstack.nova.limits.max_personality_size** <br>(gauge) | El tamaño máximo de una sola personalidad permitido para este inquilino.|
| **openstack.nova.limits.max_security_group_rules** <br>(gauge) | El número máximo de reglas de grupo de seguridad permitidas para este inquilino.|
| **openstack.nova.limits.max_security_groups** <br>(gauge) | Número máximo de grupos de seguridad permitidos para este inquilino|
| **openstack.nova.limits.max_server_meta** <br>(gauge) | El máximo permitido de definiciones de metadatos de servicio para este inquilino|
| **openstack.nova.limits.max_total_cores** <br>(gauge) | El máximo de núcleos permitidos para este inquilino|
| **openstack.nova.limits.max_total_floating_ips** <br>(gauge) | El máximo permitido de IPs flotantes para este inquilino|
| **openstack.nova.limits.max_total_instances** <br>(gauge) | Número máximo de instancias permitidas para este inquilino|
| **openstack.nova.limits.max_total_keypairs** <br>(gauge) | Los pares de claves máximos permitidos para este inquilino|
| **openstack.nova.limits.max_total_ram_size** <br>(gauge) | El tamaño máximo de RAM permitido para este inquilino en megabytes (MB)<br>_Se muestra como mebibyte_ |
| **openstack.nova.limits.total_cores_used** <br>(gauge) | El total de núcleos utilizados por este inquilino|
| **openstack.nova.limits.total_floating_ips_used** <br>(gauge) | El total de IPs flotantes utilizadas por este inquilino|
| **openstack.nova.limits.total_instances_used** <br>(gauge) | El total de instancias utilizadas por este inquilino|
| **openstack.nova.limits.total_ram_used** <br>(gauge) | La RAM actual utilizada por este inquilino en megabytes (MB)<br>_Se muestra como mebibyte_ |
| **openstack.nova.limits.total_security_groups_used** <br>(gauge) | Número total de grupos de seguridad utilizados por este inquilino|
| **openstack.nova.local_gb** <br>(gauge) | El tamaño en GB del disco efímero presente en este host hipervisor<br>_Se muestra como gibibyte_ |
| **openstack.nova.local_gb_used** <br>(gauge) | El tamaño en GB del disco utilizado en este host hipervisor<br>_Se muestra como gibibyte_ |
| **openstack.nova.memory_mb** <br>(gauge) | El tamaño en MB de la RAM presente en este host hipervisor<br>_Se muestra como mebibyte_ |
| **openstack.nova.memory_mb_used** <br>(gauge) | El tamaño en MB de la RAM utilizada en este host hipervisor<br>_Se muestra como mebibyte_ |
| **openstack.nova.running_vms** <br>(gauge) | Número de máquinas virtuales en ejecución en este host de hipervisor|
| **openstack.nova.server.cpu0_time** <br>(gauge) | Tiempo de CPU en nanosegundos de esta CPU virtual<br>_Se muestra como nanosegundo_ |
| **openstack.nova.server.hdd_errors** <br>(gauge) | Número de errores observados por el servidor al acceder a un dispositivo HDD|
| **openstack.nova.server.hdd_read** <br>(gauge) | Número de bytes leídos desde un dispositivo HDD por este servidor<br>_Se muestra como byte_ |
| **openstack.nova.server.hdd_read_req** <br>(gauge) | Número de solicitudes de lectura realizadas a un dispositivo HDD por este servidor|
| **openstack.nova.server.hdd_write** <br>(gauge) | Número de bytes escritos en un dispositivo HDD por este servidor<br>_Se muestra como byte_ |
| **openstack.nova.server.hdd_write_req** <br>(gauge) | El número de solicitudes de escritura realizadas a un dispositivo HDD por este servidor|
| **openstack.nova.server.memory** <br>(gauge) | La cantidad de memoria en MB aprovisionada para este servidor<br>_Se muestra como mebibyte_ |
| **openstack.nova.server.memory_actual** <br>(gauge) | La cantidad de memoria en MB aprovisionada para este servidor<br>_Se muestra como mebibyte_ |
| **openstack.nova.server.memory_rss** <br>(gauge) | La cantidad de memoria utilizada por los procesos de este servidor que no está asociada a páginas de disco, como el stack tecnológico y la memoria heap<br>_Se muestra como mebibyte_ |
| **openstack.nova.server.vda_errors** <br>(gauge) | Número de errores observados por el servidor al acceder a un dispositivo VDA.|
| **openstack.nova.server.vda_read** <br>(gauge) | Número de bytes leídos desde un dispositivo VDA por este servidor<br>_Se muestra como byte_ |
| **openstack.nova.server.vda_read_req** <br>(gauge) | Número de solicitudes de lectura realizadas a un dispositivo VDA por este servidor.|
| **openstack.nova.server.vda_write** <br>(gauge) | Número de bytes escritos en un dispositivo VDA por este servidor<br>_Se muestra como byte_ |
| **openstack.nova.server.vda_write_req** <br>(gauge) | Número de solicitudes de escritura realizadas a un dispositivo VDA por este servidor|
| **openstack.nova.vcpus** <br>(gauge) | Número de vCPUs disponibles en este host hipervisor|
| **openstack.nova.vcpus_used** <br>(gauge) | Número de vCPUS utilizados en este host hipervisor|

### Eventos

El check de OpenStack no incluye ningún evento.

### Checks de servicio

**openstack.neutron.api.up**

Devuelve `CRITICAL` si el Agent no puede consultar la API de Neutron, `UNKNOWN` si hay un problema con la API de Keystone. En caso contrario, devuelve `OK`.

_Estados: ok, critical, unknown_

**openstack.nova.api.up**

Devuelve `CRITICAL` si el Agent no puede consultar la API de Nova, `UNKNOWN` si hay un problema con la API de Keystone. En caso contrario, devuelve `OK`.

_Estados: ok, critical, unknown_

**openstack.keystone.api.up**

Devuelve `CRITICAL` si el Agent no puede consultar la API de Keystone. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

**openstack.nova.hypervisor.up**

Devuelve `UNKNOWN` si el Agent no puede obtener el estado del hipervisor, `CRITICAL` si el hipervisor está caído. Devuelve `OK` en caso contrario.

_Estados: ok, critical, unknown_

**openstack.neutron.network.up**

Devuelve `UNKNOWN` si el Agent no puede obtener el estado de la red, `CRITICAL` si la red está caída. En caso contrario, devuelve `OK`.

_Estados: ok, critical, unknown_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorización de OpenStack Nova](https://www.datadoghq.com/blog/openstack-monitoring-nova)
- [Instalar OpenStack en dos comandos para dev y test](https://www.datadoghq.com/blog/install-openstack-in-two-commands)
- [OpenStack: agregados de hosts, opciones y zonas de disponibilidad](https://www.datadoghq.com/blog/openstack-host-aggregates-flavors-availability-zones)
---
app_id: ceph
categories:
- data stores
- os & system
- log collection
custom_kind: integración
description: Recopila métricas de rendimiento por grupo y monitoriza el estado general del clúster.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ceph-datadog
  tag: blog
  text: 'Monitorizar Ceph: del estado del nodo al rendimiento de todo el clúster'
integration_version: 4.1.0
media: []
supported_os:
- linux
- macos
title: Ceph
---
![Dashboard de Ceph](https://raw.githubusercontent.com/DataDog/integrations-core/master/ceph/images/ceph_dashboard.png)

## Información general

Habilita la integración de Ceph con Datadog para:

- Rastrear el uso del disco en los grupos de almacenamiento
- Recibir checks de servicio en caso de problemas
- Monitorizar las métricas de rendimiento de E/S

## Configuración

### Instalación

El check de Ceph está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores Ceph.

### Configuración

Edita el archivo `ceph.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta el [ejemplo de ceph.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/ceph/datadog_checks/ceph/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

```yaml
init_config:

instances:
  - ceph_cmd: /path/to/your/ceph # default is /usr/bin/ceph
    use_sudo: true # only if the ceph binary needs sudo on your nodes
```

Si has habilitado `use_sudo`, añade una línea como la siguiente a tu archivo `sudoers`:

```text
dd-agent ALL=(ALL) NOPASSWD:/path/to/your/ceph
```

#### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Luego, edita `ceph.d/conf.yaml` al quitar los comentarios de las líneas `logs` de la parte inferior. Actualiza la `path` de los logs con la ruta correcta a tus archivos de logs de Ceph.

   ```yaml
   logs:
     - type: file
       path: /var/log/ceph/*.log
       source: ceph
       service: "<APPLICATION_NAME>"
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `ceph` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **ceph.aggregate_pct_used** <br>(gauge) | Métrica de uso de la capacidad global<br>_Se muestra como porcentaje_. |
| **ceph.apply_latency_ms** <br>(gauge) | Tiempo que se tarda en enviar una actualización a los discos<br>_Se muestra como milisegundo_ |
| **ceph.class_pct_used** <br>(gauge) | Porcentaje por clase de almacenamiento bruto utilizado<br>_Se muestra como porcentaje_ |
| **ceph.commit_latency_ms** <br>(gauge) | Tiempo que se tarda en confirmar una operación en el diario<br>_Se muestra como milisegundo_ |
| **ceph.misplaced_objects** <br>(gauge) | Número de objetos extraviados<br>_Se muestra como elemento_ |
| **ceph.misplaced_total** <br>(gauge) | Número total de objetos si hay objetos extraviados<br>_Se muestra como elemento_ |
| **ceph.num_full_osds** <br>(gauge) | Número de OSD completas<br>_Se muestra como elemento_ |
| **ceph.num_in_osds** <br>(gauge) | Número de daemons de almacenamiento participantes<br>_Se muestra como elemento_ |
| **ceph.num_mons** <br>(gauge) | Número de daemons de monitor<br>_Se muestra como elemento_ |
| **ceph.num_near_full_osds** <br>(gauge) | Número de OSD casi completas<br>_Se muestra como elemento_ |
| **ceph.num_objects** <br>(gauge) | Recuento de objetos de un grupo determinado<br>_Se muestra como elemento_ |
| **ceph.num_osds** <br>(gauge) | Número de daemons de almacenamiento conocidos<br>_Se muestra como elemento_ |
| **ceph.num_pgs** <br>(gauge) | Número de grupos de colocación disponibles<br>_Se muestra como elemento_ |
| **ceph.num_pools** <br>(gauge) | Número de grupos<br>_Se muestra como elemento_ |
| **ceph.num_up_osds** <br>(gauge) | Número de daemons de almacenamiento en línea<br>_Se muestra como elemento_ |
| **ceph.op_per_sec** <br>(gauge) | Operaciones de E/S por segundo para un grupo determinado<br>_Se muestra como operación_ |
| **ceph.osd.pct_used** <br>(gauge) | Porcentaje utilizado de OSD completas/casi completas<br>_Se muestra como porcentaje_. |
| **ceph.pgstate.active_clean** <br>(gauge) | Número de grupos de colocación activos+limpios<br>_Se muestra como elemento_ |
| **ceph.read_bytes** <br>(gauge) | Bytes de lectura por grupo<br>_Se muestra como byte_ |
| **ceph.read_bytes_sec** <br>(gauge) | Bytes/segundo que se leen<br>_Se muestra como byte_ |
| **ceph.read_op_per_sec** <br>(gauge) | Operaciones de lectura por grupo/segundo<br>_Se muestra como operación_ |
| **ceph.recovery_bytes_per_sec** <br>(gauge) | Tasa de bytes recuperados<br>_Se muestra como byte_ |
| **ceph.recovery_keys_per_sec** <br>(gauge) | Tasa de claves recuperadas<br>_Se muestra como elemento_ |
| **ceph.recovery_objects_per_sec** <br>(gauge) | Tasa de objetos recuperados<br>_Se muestra como elemento_ |
| **ceph.total_objects** <br>(gauge) | Recuento de objetos del almacén de objetos subyacente. \[v\<=3 only\]<br>_Se muestra como elemento_ |
| **ceph.write_bytes** <br>(gauge) | Bytes de escritura por grupo<br>_Se muestra como byte_ |
| **ceph.write_bytes_sec** <br>(gauge) | Bytes/segundo que se escriben<br>_Se muestra como byte_ |
| **ceph.write_op_per_sec** <br>(gauge) | Operaciones de escritura por grupo/segundo<br>_Se muestra como operación_ |

**Nota**: Si estás ejecutando Ceph Luminous o posterior, la métrica `ceph.osd.pct_used` no está incluida.

### Eventos

El check de Ceph no incluye eventos.

### Checks de servicio

**ceph.overall_status**

Devuelve `OK` si el estado de tu clúster Ceph es HEALTH_OK, `WARNING` si es HEALTH_WARNING, `CRITICAL` en caso contrario.

_Estados: ok, warning, critical_

**ceph.osd_down**

Devuelve `OK` si no tienes ningún OSD caído. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.osd_orphan**

Devuelve `OK` si no tienes ningún OSD huérfano. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.osd_full**

Devuelve `OK` si tus OSD no están completas. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.osd_nearfull**

Devuelve `OK` si tus OSD no están casi completas. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.pool_full**

Devuelve `OK` si tus grupos no han alcanzado su cuota. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.pool_near_full**

Devuelve `OK` si tus grupos no están cerca de alcanzar su cuota. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.pg_availability**

Devuelve `OK` si hay plena disponibilidad de datos. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.pg_degraded**

Devuelve `OK` si hay redundancia total de datos. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.pg_degraded_full**

Devuelve `OK` si hay espacio suficiente en el cluster para la redundancia de datos. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.pg_damaged**

Devuelve `OK` si no hay incoherencias tras la depuración de datos. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.pg_not_scrubbed**

Devuelve `OK` si los PG fueron depurados recientemente. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.pg_not_deep_scrubbed**

Devuelve `OK` si los PG fueron enteramente depurados recientemente. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.cache_pool_near_full**

Devuelve `OK` si los grupos de caché no están casi llenos. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.too_few_pgs**

Devuelve `OK` si el número de PG supera el umbral mínimo. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.too_many_pgs**

Devuelve `OK` si el número de PG está por debajo del umbral máximo. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.object_unfound**

Devuelve `OK` si se pueden encontrar todos los objetos. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.request_slow**

Devuelve `OK` si las solicitudes tardan un tiempo normal en procesarse. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

**ceph.request_stuck**

Devuelve `OK` si las solicitudes tardan un tiempo normal en procesarse. En caso contrario, devuelve `WARNING` si la gravedad es `HEALTH_WARN`, si no devuelve `CRITICAL`.

_Estados: ok, warning, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitorizar Ceph: del estado del nodo al rendimiento de todo el clúster](https://www.datadoghq.com/blog/monitor-ceph-datadog)

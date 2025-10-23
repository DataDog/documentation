---
app_id: n2ws
categories:
- nube
custom_kind: integración
description: Ver datos resumidos de todos los hosts conectados de N2WS Backup & Recovery
media: []
supported_os:
- linux
- macos
- windows
title: N2WS
---
## Información general

N2WS Backup & Recovery (CPM), conocido como N2WS, es una solución empresarial de copia de seguridad, recuperación y recuperación de desastres para Amazon Web Services (AWS) y Microsoft Azure. N2WS utiliza tecnologías nativas en la nube (snapshots) para brindar capacidades de copia de seguridad y restauración en AWS y Azure.

Tu instancia de N2WS Backup and Recovery admite la monitorización de copias de seguridad, recuperación de desastres, copia a S3, alertas,
y mucho más con el servicio d emonitorización de Datadog. Esta integración permite a los usuarios monitorizar y analizar las métricas de dashboard de N2WS Backup and Recovery.

## Configuración

### Instalación

1. Instala la [integración de Python](https://app.datadoghq.com/account/settings#integrations/python).

1. Habilita la compatibilidad con Datadog en tu instancia de N2WS:

   - Conéctate a tu instancia de N2WS Backup and Recovery con SSH.
   - Añade las líneas siguientes a `/cpmdata/conf/cpmserver.cfg`. Es posible que necesites privilegios `sudo` para realizar esta acción.
     ```
     [external_monitoring]
     enabled=True
     ```
   - Ejecuta `service apache2 restart`

1. Instala el Datadog Agent en tu instancia de N2WS.

   - Inicia sesión en Datadog y ve a Integrations -> Agent -> Ubuntu (Integraciones -> Agent -> Ubuntu)
   - Copia el comando de instalación en un solo paso del Agent.
   - Conéctate a tu instancia de N2WS Backup and Recovery con SSH y ejecuta el comando. Es posible que necesites privilegios `sudo` para realizar esta acción.

1. Configura las métricas de dashboard de Datadog:

   - Ve a [**Metrics** -> **Explorer** (Métricas -> Explorer)](https://app.datadoghq.com/metric/explorer)

   **Gráfico**: selecciona tu métrica en la lista. Todas las métricas de N2WS comienzan con la cadena `cpm_metric`.

   **Sobre**: selecciona los datos de la lista. Todos los datos de los usuarios de N2WS comienzan con la cadena `cpm:user:<user-name>`.
   Puedes seleccionar un usuario específico o toda la instancia de N2WS.

1. Obtén dashboards de N2WS

   - En [Integraciones de Datadog](https://app.datadoghq.com/account/settings#integrations/n2ws), busca el ícono `N2WS` e instálalo.
   - Cinco dashboards están instalados en tu cuenta:
     `N2WSBackup&Recovery-Graphicalversion`, `N2WSBackup&Recovery-Graphicalversion-areas` y `N2WSBackup&Recovery-EntitiesSpecificDashboard` para N2WS Backup & Recovery v3.2.1
     **Nota**: Estos dashboards solo están disponibles para los usuarios de AWS.
     `N2WSBackup&Recovery-EntitiesSpecificDashboardV4.1` y `N2WSBackup&Recovery-GraphicalVersionV4.1` para N2WS Backup & Recovery v4.1

   Alternativamente, puedes [importar plantillas JSON desde N2WS](https://support.n2ws.com/portal/en/kb/articles/datadog-templates) para crear tus dashboards.

## Datos recopilados

Datadog recopila los siguientes datos sobre las copias de seguridad de N2WS Backup & Recovery:

- El número de snapshots de cada tipo
- Copias de seguridad correctas (solo AWS)
- Copias de seguridad fallidas (solo AWS)
- Copias de seguridad parcialmente correctas (solo AWS)
- Recursos protegidos de cualquier tipo
- Datos sobre la capacidad del volumen (solo AWS), alertas, etc.

### Métricas

| | |
| --- | --- |
| **cpm_metric.dashboard_activity.backup_success_num** <br>(gauge) | Número total de copias de seguridad realizadas con éxito (de todos los tipos)|
| **cpm_metric.dashboard_activity.backup_fail_num** <br>(gauge) | Número total de copias de seguridad fallidas (de todos los tipos)|
| **cpm_metric.dashboard_activity.backup_partial_num** <br>(gauge) | Número total de copias de seguridad parcialmente correctas (de todos los tipos)|
| **cpm_metric.dashboard_activity.backup_dr_success_num** <br>(gauge) | Número total de copias de seguridad DR realizadas con éxito (de todos los tipos)|
| **cpm_metric.dashboard_activity.backup_dr_fail_num** <br>(gauge) | Número total de copias de seguridad DR fallidas (de todos los tipos)|
| **cpm_metric.dashboard_activity.backup_dr_partial_num** <br>(gauge) | Número total de copias de seguridad de RD parcialmente correctas (de todos los tipos)|
| **cpm_metric.dashboard_activity.backup_s3_success_num** <br>(gauge) | Número total de copias de seguridad realizadas con éxito en S3|
| **cpm_metric.dashboard_activity.backup_s3_fail_num** <br>(gauge) | Número total de copias de seguridad fallidas en S3|
| **cpm_metric.dashboard_activity.backup_s3_partial_num** <br>(gauge) | Número total de copias de seguridad parcialmente correctas en S3|
| **cpm_metric.dashboard_state.policies_num** <br>(gauge) | Número total de políticas en todos los hosts|
| **cpm_metric.dashboard_state.accounts_num** <br>(gauge) | Número total de cuentas en todos los hosts|
| **cpm_metric.dashboard_state.snapshots_volume_num** <br>(gauge) | Número total de instantáneas de volúmenes|
| **cpm_metric.dashboard_state.snapshots_only_ami_num** <br>(gauge) | Número total de instantáneas de instancia solo AMI|
| **cpm_metric.dashboard_state.snapshots_dr_volume_num** <br>(gauge) | Número total de instantáneas DR de volúmenes|
| **cpm_metric.dashboard_state.snapshots_rds_num** <br>(gauge) | Número total de instantáneas de bases de datos RDS|
| **cpm_metric.dashboard_state.snapshots_dr_rds_num** <br>(gauge) | Número total de instantáneas DR de bases de datos RDS|
| **cpm_metric.dashboard_state.snapshots_redshift_num** <br>(gauge) | Número total de instantáneas de bases de datos de Redshift|
| **cpm_metric.dashboard_state.snapshots_rds_clus_num** <br>(gauge) | Número total de instantáneas de los clústeres de Aurora|
| **cpm_metric.dashboard_state.snapshots_dr_rds_clus_num** <br>(gauge) | Número total de instantáneas DR de los clústeres de Aurora|
| **cpm_metric.dashboard_state.snapshots_ddb_num** <br>(gauge) | Número total de instantáneas de DynamoDB|
| **cpm_metric.dashboard_state.snapshots_efs_num** <br>(gauge) | Número total de instantáneas DR de sistemas de archivos EFS|
| **cpm_metric.dashboard_state.snapshots_dr_efs_num** <br>(gauge) | Número total de instantáneas de Azure Disks|
| **cpm_metric.dashboard_state.snapshots_disk_num** <br>(gauge) | Número total de instantáneas de sistemas de archivos EFS|
| **cpm_metric.dashboard_state.protected_instances_num** <br>(gauge) | Número total de recursos de instancias protegidas|
| **cpm_metric.dashboard_state.protected_volumes_num** <br>(gauge) | Número total de recursos de volúmenes protegidos|
| **cpm_metric.dashboard_state.protected_rds_db_num** <br>(gauge) | Número total de recursos RDS protegidos|
| **cpm_metric.dashboard_state.protected_ddb_num** <br>(gauge) | Número total de recursos de DynamoDB protegidos|
| **cpm_metric.dashboard_state.protected_efs_num** <br>(gauge) | Número total de recursos EFS protegidos|
| **cpm_metric.dashboard_state.protected_rds_clus_num** <br>(gauge) | Número total de recursos de Aurora protegidos|
| **cpm_metric.dashboard_state.protected_redshift_num** <br>(gauge) | Número total de recursos de máquinas virtuales de Azure protegidas|
| **cpm_metric.dashboard_state.protected_virtual_machines_num** <br>(gauge) | Número total de recursos de Redshift protegidos|
| **cpm_metric.dashboard_state.protected_disks_num** <br>(gauge) | Número total de recursos de Redshift protegidos|
| **cpm_metric.dashboard_state.volumes_above_high_watermark_num** <br>(gauge) | Número de volúmenes con capacidad superior a la marca de agua|
| **cpm_metric.dashboard_state.volumes_below_low_watermark_num** <br>(gauge) | Número de volúmenes con capacidad inferior a la marca de agua|
| **cpm_metric.dashboard_state.volumes_usage_percentage_num** <br>(gauge) | Uso total de la capacidad para todos los volúmenes de todos los hosts<br>_Mostrado como porcentaje_ |

### Eventos

Datadog recopila los mensajes de alerta de todos los hosts de N2WS Backup & Recovery.

### Checks de servicio

La integración de N2WS Backup & Recovery no incluye ningún check de servicio.

## Solucionar problemas

- [Guía del usuario y documentación de N2WS](https://n2ws.com/support/documentation)
- [Asistencia técnica de N2WS](https://n2ws.com/support)
- [Asistencia técnica de Datadog](https://docs.datadoghq.com/help/)
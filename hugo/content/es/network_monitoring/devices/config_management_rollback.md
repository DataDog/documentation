---
description: Revierta un dispositivo de red a una configuración anterior desde NDM.
further_reading:
- link: /network_monitoring/devices/config_management
  tag: Documentación
  text: Network Configuration Management
- link: /actions/private_actions/
  tag: Documentación
  text: Private Action Runner
title: Reversiones de Network Configuration Management
---
## Descripción general {#overview}

Las reversiones de Network Configuration Management (NCM) le permiten restaurar un dispositivo de red a una configuración anterior directamente desde Datadog. Las reversiones utilizan un [Private Action Runner (PAR)][1] para aplicar la configuración seleccionada de nuevo al dispositivo.

Las reversiones son compatibles con los siguientes proveedores y plataformas:

- Cisco IOS
- Arista (EOS)

## Requisitos previos {#prerequisites}

- [Network Configuration Management][2] debe estar configurado para sus dispositivos.
- El Datadog Agent debe estar en la versión `7.83.0` o posterior.
- Un [Private Action Runner][1] al que el puerto IPC del Agent (predeterminado `5001`) pueda acceder, ya sea en el mismo servidor o a través de la red.

## Configuración {#setup}

### Agent {#agent}

1. Agregue lo siguiente a su `datadog.yaml` para habilitar las reversiones:

   ```yaml
   network_devices:
     config_management:
       rollback:
         enabled: true
   ```

   Alternativamente, configure la opción de configuración `network_devices.config_management.rollback.enabled` en `true`.

2. En `conf.d/network_config_management.d/conf.yaml`, configure opcionalmente con qué frecuencia el Agent informa su inventario de configuración:

   ```yaml
   init_config:
     ## @param inventory_report_max_interval - integer - optional - default: 3600 (1 hour)
     ## Maximum interval, in seconds, between inventory reports.
     inventory_report_max_interval: 3600
   ```

3. Opcionalmente, configure el almacenamiento local que contiene las configuraciones elegibles para la reversión:

   ```yaml
   init_config:
     store:
       ## @param min_configs_per_device - integer - optional - default: 2
       ## Minimum number of configurations to retain per device, regardless of age.
       min_configs_per_device: 2
       ## @param max_configs_per_device - integer - optional - default: 24
       ## Maximum number of configurations to retain per device before older ones are evicted.
       max_configs_per_device: 24
       ## @param max_raw_config_store_bytes - integer - optional - default: 2000000000 (2 GB)
       ## Maximum size, in bytes, of the local configuration store before older configurations are evicted.
       max_raw_config_store_bytes: 2000000000
   ```

4. El proceso del Agent necesita acceso de escritura al directorio `run_path` donde se almacenan los datos de reversión localmente.

5. Reinicie el Agent para aplicar los cambios de configuración.

### Private Action Runner {#private-action-runner}

1. [Set up a Private Action Runner][1] en un servidor al que el puerto IPC del Agent pueda acceder.
2. Agregue `com.datadoghq.remoteaction.networkconfigmanagement.rollbackConfig` a la sección `private_action_runner.actions_allowlist` de `/etc/datadog-agent/datadog.yaml`. Consulte [Cambiar la lista de permitidos de un runner][3] para obtener más detalles.
3. Registre el runner en Datadog y asígnelo a un grupo de ejecución. Dentro de ese grupo, cree una política que permita la acción `com.datadoghq.remoteaction.networkconfigmanagement.rollbackConfig`.
   - La política debe otorgar acceso `Editor` a los usuarios con el rol `NCM Device Config Write`.

   {{< img src="/network_device_monitoring/config_mgmt/execution_group_policy.png" alt="Captura de pantalla que muestra cómo agregar el rol NCM Write a una política de grupo de ejecución" style="width:100%;" >}}

### Permisos {#permissions}

Los rollbacks utilizan los siguientes permisos de NCM:

| Permiso | Permite |
|---|---|
| NCM Read | Ver configuraciones de dispositivos |
| NCM Write | Activar un rollback |


## Activar un rollback {#trigger-a-rollback}

1. Navegue a la [pestaña Configuración][2] de un dispositivo en la vista de dispositivos de NDM.
2. Seleccione la versión de configuración a la que desea volver. El panel lateral muestra un botón {{< ui >}}Rollback{{< /ui >}} para esa versión.
3. Haga clic en {{< ui >}}Rollback{{< /ui >}}, revise la diferencia en el modal de confirmación.
4. Haga clic en {{< ui >}}Rollback{{< /ui >}} nuevamente para confirmar.

   {{< img src="/network_device_monitoring/config_mgmt/config_rollback.png" alt="Captura de pantalla que muestra cuándo se ha iniciado una reversión y qué esperar" style="width:100%;" >}}


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/private_actions/
[2]: /es/network_monitoring/devices/config_management/#viewing-configurations
[3]: /es/actions/private_actions/set_up_agent_based/?tab=linux#change-the-allowlist
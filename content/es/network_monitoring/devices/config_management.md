---
description: Visualiza y compara los cambios de configuración de los dispositivos
  en NDM.
further_reading:
- link: /network_monitoring/devices/troubleshooting
  tag: Documentación
  text: Solucionar problemas de NDM
title: Network Configuration Management
---

<div class="alert alert-info">Network Configuration Management se encuentra en fase de vista previa. Para solicitar acceso y recibir la compilación personalizada del Datadog Agent, ponte en contacto con tu representante de Datadog.</div>

## Información general

Network Configuration Management (NCM) amplía [Network Device Monitoring (NDM)][1] para incluir conocimientos sobre la configuración y el seguimiento de los cambios. NCM te permite:

- Monitorizar cómo cambian las configuraciones de los dispositivos con el tiempo
- Comparar dos versiones de configuración
- Utilizar resúmenes generados por IA para comprender los cambios y su posible impacto durante los incidentes

{{< img src="/network_device_monitoring/config_mgmt/network_device_config_redacted.png" alt="Pestaña de configuración de Network Device Management, donde se muestra la configuración más reciente y un resumen de IA de los cambios." style="width:100%;" >}}

**Nota**: NCM es de solo lectura en vista previa. 

## Requisitos previos

- [Network Device Monitoring][3] (NDM) debe estar configurado en tus dispositivos.
- Instala la versión personalizada del Datadog Agent proporcionada por tu representante de Datadog.

## Instalación

1. En el directorio raíz de configuración del Agent en `conf.d/network_config_management.d/`, crea el archivo `conf.yaml` y configúralo como sigue:

   ```yaml
     init_config:
       ## @param namespace - string - optional - default: default
       ## The namespace should match namespaces of devices being monitored
       namespace: default
       ## @param min_collection_interval - integer - optional - default: 900 (15 minutes)
       min_collection_interval: 900
       ## @param ssh - object - optional
       ## Global SSH configuration that applies to all device instances unless 
       ## overridden at the device level. 
       ssh:
         ## @param timeout - duration - optional - default: 30 (seconds)
         ## Maximum time for the SSH client to establish a TCP connection.
         timeout: 30
         ## @param known_hosts_path - string - required (unless insecure_skip_verify is true)
         ## Path to the known_hosts file containing public keys of servers to 
         ## verify the identity of remote hosts. Required for secure connections.
         known_hosts_path: /path/to/known_hosts
         ## @param insecure_skip_verify - boolean - optional - default: false
         ## Skip host key verification. This is INSECURE and should only be used
         ## for development/testing purposes.
         insecure_skip_verify: false 
      instances:
        ip_address - string - required
        ## The IP address of the network device to collect configurations from.
        ip_address: <IP_ADDRESS>
        ## @param auth - object - required
        ## Authentication credentials to connect to the network device.
        auth:
          ## @param username - string - required
          ## Username to authenticate to the network device.
          username: <USERNAME>
          ## @param password - string - required (if private_key_file is not provided)
          ## Password to authenticate to the network device.
          ## Used as a fallback after private key authentication if both are provided.
          password: <PASSWORD>
          ## @param private_key_file - string - optional
          ## Path to the SSH private key file for authentication.
          ## At least one of password or private_key_file must be provided.
          private_key_file: /path/to/private_key
   ```

2. Opcionalmente, si tus dispositivos requieren algoritmos SSH específicos, utiliza la siguiente configuración:

   ```yaml
   init_config:
     ## @param ciphers - list of strings - optional
     ## List of SSH encryption ciphers to use for the connection.
     ## If not specified, the SSH library will use its default ciphers.
     ssh:
       ciphers: [aes128-gcm@openssh.com, aes128-ctr, aes192-ctr]
       key_exchanges: [diffie-hellman-group14-sha256, ecdh-sha2-nistp256]
       host_key_algorithms: [ssh-ed25519]
   ```

3. Reinicia el Agent para aplicar los cambios de configuración.

## Visualización de configuraciones

Se puede acceder a Network Configuration Management desde el panel lateral del dispositivo en Network Device Monitoring:

1. Ve a [Network Device Monitoring][3].
2. Selecciona un dispositivo de la lista de dispositivos o de cualquier visualización de NDM, como el [Geomapa de dispositivos][4] o el [Mapa de topología de dispositivos][5].
3. Abre la pestaña **Configuration** (Configuración) en el panel lateral del dispositivo.

   {{< img src="/network_device_monitoring/config_mgmt/config_tab_redacted.png" alt="Panel lateral de Network Device Management, donde se resalta la pestaña Configuration (Configuración)." style="width:100%;" >}}

   En la pestaña Configuration (Configuración), puedes filtrar lo que muestra la lista de configuración:
   - **All** (Todo): Muestra tanto las configuraciones en ejecución como las de inicio.
   - **Running** (En ejecución): La configuración activa y en directo que se ejecuta en el dispositivo.
   - **Arranque**: La configuración guardada que se carga al arrancar el dispositivo

### Selector de tiempo y retención

Los controles de tiempo de la parte superior de la página te permiten seleccionar el historial de configuración que quieres ver. Por defecto, la vista muestra los cambios de configuración de los últimos 2 días. Puedes ampliar este intervalo para ver versiones anteriores, hasta el límite de retención (1 año).

La línea de tiempo y la lista de versiones de configuración se actualizan automáticamente en función del intervalo de tiempo seleccionado.

**Nota**: El historial de configuración comienza cuando se activa NCM para tu cuenta. Los datos históricos anteriores a la activación no están disponibles.

### Visualizar una configuración en un momento dado

Al seleccionar un evento de configuración de la línea de tiempo o de la lista, se abre una única vista de configuración que muestra el estado del dispositivo en ese momento.

La vista de configuración única muestra:

- La configuración completa de la marca de tiempo seleccionada
- Metadatos del dispositivo, incluida la hora y la identidad del dispositivo

Puedes desplazarte por la configuración para investigar el estado del dispositivo durante un incidente o ajustar el intervalo de tiempo para ver configuraciones de diferentes periodos de tiempo.

### Comparar versiones de configuración

Para ver qué ha cambiado entre las versiones de configuración:

1. Selecciona dos configuraciones de la lista del historial o de la línea de tiempo utilizando las casillas de verificación. 
2. Haz clic en **Compare Two Configs** (Comparar dos configuraciones) para abrir la vista de comparación.

   {{< img src="/network_device_monitoring/config_mgmt/compare_two_configs_2.png" alt="Panel lateral de Network Device Management, donde se resalta la opción Compare Two Configs (Comparar dos configuraciones)." style="width:100%;" >}}

La vista de comparación muestra ambas configuraciones una al lado de la otra con diferencias en línea que resaltan las líneas modificadas. Puedes alternar entre diferentes pares de configuraciones sin cerrar la vista de comparación.

   {{< img src="/network_device_monitoring/config_mgmt/config_screen_split_2.png" alt="Pestaña de configuración de Network Device Management, donde se comparan dos versiones en una vista dividida." style="width:90%;" >}}

## Resúmenes de IA

Network Configuration Management incluye un panel de resumen basado en IA que traduce los cambios de configuración a explicaciones en lenguaje natural.

Al comparar dos versiones de configuración, el resumen de IA automáticamente:

- Describe los cambios en términos legibles para el ser humano
- Resalta los cambios que pueden ser relevantes para la investigación de incidentes o el análisis de riesgos

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/devices/
[2]: /es/network_monitoring/devices/setup#configuration
[3]: https://app.datadoghq.com/devices
[4]: /es/network_monitoring/devices/geomap
[5]: /es/network_monitoring/devices/topology
[6]: /es/network_monitoring/devices/supported_devices#vendor-profiles
[7]: https://github.com/DataDog/datadog-agent/tree/main/cmd/agent/dist/conf.d/network_config_management.d/
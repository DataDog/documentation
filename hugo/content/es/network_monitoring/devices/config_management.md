---
description: Visualice y compare los cambios de configuración de los dispositivos
  en NDM.
further_reading:
- link: /network_monitoring/devices/config_management_rollback
  tag: Documentación
  text: Reversiones de Network Configuration Management
- link: /network_monitoring/devices/troubleshooting
  tag: Documentación
  text: Solución de problemas de NDM
- link: https://www.datadoghq.com/blog/end-to-end-network-operations-with-bits/
  tag: Blog
  text: Resuelva problemas de red de L7 a L1 con Datadog
site_support_id: network_config_management
title: Network Configuration Management
---
## Descripción general {#overview}

Network Configuration Management (NCM) extiende [Network Device Monitoring (NDM)][1] para incluir el conocimiento de la configuración y el seguimiento de cambios. NCM le permite:

- Hacer un seguimiento de cómo cambian las configuraciones de los dispositivos a lo largo del tiempo
- Comparar dos versiones de configuración lado a lado
- Utilizar resúmenes generados por IA para comprender los cambios y su impacto potencial durante los incidentes
- [Revertir un dispositivo a una configuración anterior][8]

{{< img src="/network_device_monitoring/config_mgmt/network_device_config_ndm_view.png" alt="Pestaña de configuración de Network Device Management, que muestra la configuración más reciente y un resumen de IA de lo que cambió." style="width:100%;" >}}

## Requisitos previos {#prerequisites}

- [Network Device Monitoring][3] (NDM) debe estar configurado en sus dispositivos.

## Configuración {#setup}

1. En el directorio de configuración raíz del Agent en `conf.d/network_config_management.d/`, cree el archivo `conf.yaml` y configúrelo de la siguiente manera:

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
     ## ip_address - string - required
     ## The IP address of the network device to collect configurations from.
   - ip_address: <IP_ADDRESS>
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

2. Opcionalmente, si sus dispositivos requieren algoritmos SSH específicos, utilice la siguiente configuración:

   ```yaml
   init_config:
     ## To confirm a possible value of algorithms, see the constants described in the golang document.
     ## https://pkg.go.dev/golang.org/x/crypto/ssh#pkg-constants
     ##
     ## @param ciphers - list of strings - optional
     ## List of SSH encryption ciphers to use for the connection.
     ## If not specified, the SSH library will use its default ciphers.
     ssh:
       ciphers: [aes128-gcm@openssh.com, aes128-ctr, aes192-ctr]
       key_exchanges: [diffie-hellman-group14-sha256, ecdh-sha2-nistp256]
       host_key_algorithms: [ssh-ed25519]
   ```
   
3. Reinicie el Agent para aplicar los cambios de configuración.

## Visualización de configuraciones {#viewing-configurations}

Network Configuration Management es accesible desde la vista de dispositivo de NDM en Network Device Monitoring:

1. Navegue a [Network Device Monitoring][3].
2. Seleccione un dispositivo de la lista de dispositivos o de cualquier visualización de NDM, como [Device Geomap][4] o el mapa [Device Topology][5].
3. Abra la pestaña {{< ui >}}Configuration{{< /ui >}} en la vista de dispositivo de NDM.

   {{< img src="/network_device_monitoring/config_mgmt/config_tab.png" alt="La vista de dispositivo de NDM, resaltando la pestaña Configuration." style="width:100%;" >}}

   En la pestaña Configuration, puede filtrar lo que muestra la lista:
   - {{< ui >}}All{{< /ui >}}: Muestra tanto las configuraciones en ejecución como las de inicio
   - {{< ui >}}Running{{< /ui >}}: La configuración activa y en tiempo real que se ejecuta en el dispositivo
   - {{< ui >}}Startup{{< /ui >}}: La configuración guardada que se carga cuando el dispositivo se inicia

### Selector de tiempo y retención {#time-picker-and-retention}

Los controles de tiempo en la parte superior de la página le permiten seleccionar qué historial de configuración visualizar. Puede ampliar este rango para visualizar versiones más antiguas, hasta el límite de retención (1 año).

La línea de tiempo y la lista de versiones se actualizan automáticamente según el rango de tiempo seleccionado.

**Nota**: El historial de configuración comienza cuando NCM está habilitado para su cuenta. Los datos históricos anteriores a la habilitación no están disponibles.

### Visualizar una configuración en un punto en el tiempo {#view-a-configuration-at-a-point-in-time}

Seleccionar un evento de configuración de la línea de tiempo o de la lista abre una visualización de configuración única que muestra el estado del dispositivo en ese momento.

La visualización de configuración única muestra:

- La configuración completa para la marca de tiempo seleccionada
- Metadatos del dispositivo, incluidos la hora y la identidad del dispositivo

Puede desplazarse por la configuración para investigar el estado del dispositivo durante un incidente, o ajustar el rango de tiempo para visualizar configuraciones de diferentes períodos.

### Comparar versiones de configuración {#compare-configuration-versions}

Para visualizar qué cambió entre las versiones de configuración:

1. Seleccione dos configuraciones de la lista de historial o de la línea de tiempo usando las casillas de verificación. 
2. Haga clic en {{< ui >}}Compare Two Configs{{< /ui >}} para abrir la visualización de comparación.

   {{< img src="/network_device_monitoring/config_mgmt/compare_two_configs_3.png" alt="Pestaña de configuración de Administración de dispositivos de red, resaltando la opción Comparar dos configuraciones." style="width:100%;" >}}

La visualización de comparación muestra ambas configuraciones lado a lado con diferencias en línea que resaltan las líneas cambiadas. Puede cambiar entre diferentes pares de configuración sin cerrar la visualización de comparación.

   {{< img src="/network_device_monitoring/config_mgmt/config_screen_split_3.png" alt="Pestaña de configuración de Network Device Management, comparando dos versiones en vista dividida" style="width:90%;" >}}

### Revertir a una configuración anterior {#roll-back-to-a-previous-configuration}

Si un cambio de configuración causa un problema, puede restaurar un dispositivo a una configuración anterior directamente desde Datadog. Las reversiones utilizan un Private Action Runner para restaurar la configuración seleccionada en el dispositivo.

Consulte [Network Configuration Management Rollbacks][8] para obtener instrucciones de configuración y uso.

## Resúmenes de IA {#ai-summaries}

Network Configuration Management incluye un panel de resumen con tecnología de IA que traduce los cambios de configuración en explicaciones en lenguaje natural.

Cuando compara dos versiones de configuración, el resumen de IA automáticamente:

- Describe los cambios en términos legibles para los humanos
- Resalta los cambios que pueden ser relevantes para la investigación de incidentes o el análisis de riesgos

## Perfiles de dispositivo compatibles {#supported-device-profiles}

NCM utiliza perfiles de dispositivo para recopilar configuraciones de dispositivos de red a través de SSH. Los perfiles se incluyen con el Datadog Agent, se asignan automáticamente según el sistema operativo de su dispositivo y se actualizan a través de las versiones del Agent.

| Proveedor | SO | Perfil | Mín. Versión del Agent | En ejecución | Inicio |
|---|---|---|---|---|---|
| Arista | EOS | `eos` | 7.77.0 | {{< X >}} | {{< X >}} |
| Aruba | AOS-CX | `aoscx` | 7.76.0 | {{< X >}} | {{< X >}} |
| Aruba | AOS-W | `aosw` | 7.75.0 | {{< X >}} | |
| Cisco | IOS | `cisco-ios` | 7.73.0 | {{< X >}} | {{< X >}} |
| Cisco | NX-OS | `nxos` | 7.76.0 | {{< X >}} | {{< X >}} |
| Dell | DellOS10 | `dellos10` | 7.77.0 | {{< X >}} | {{< X >}} |
| F5 | TMOS | `tmos` | 7.76.0 | {{< X >}} | |
| FortiGate | FortiOS | `fortios` | 7.77.0 | {{< X >}} | |
| Juniper | JunOS | `junos` | 7.74.0 | {{< X >}} | |
| Palo Alto | PAN-OS | `pan-os` | 7.75.0 | {{< X >}} | |

### Comandos de recuperación de configuración {#configuration-retrieval-commands}

Cada perfil utiliza los siguientes comandos para recopilar configuraciones de dispositivos a través de SSH. Para las definiciones completas de los comandos, consulte [default_profiles.go][9].

| Proveedor | SO | Comando de configuración en ejecución | Comando de configuración de inicio |
|---|---|---|---|
| Arista | EOS | `show running-config \| no-more \| exclude ! Time:` | `show startup-config \| no-more \| exclude ! Time:` |
| Aruba | AOS-CX | `show running-config` | `show startup-config` |
| Aruba | AOS-W | `show running-config` | |
| Cisco | IOS | `show running-config` | `show startup-config` |
| Cisco | NX-OS | `show running-config` | `show startup-config` |
| Dell | DellOS10 | `show running-configuration` | `show startup-configuration` |
| F5 | TMOS | `cat /config/partitions/*/bigip*.conf` | |
| FortiGate | FortiOS | `show full-configuration` | |
| Juniper | JunOS | `show configuration \| display omit` | |
| Palo Alto | PAN-OS | `show config running` | |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/devices/
[2]: /es/network_monitoring/devices/setup#configuration
[3]: https://app.datadoghq.com/devices
[4]: /es/network_monitoring/devices/geomap
[5]: /es/network_monitoring/devices/topology
[6]: /es/network_monitoring/devices/supported_devices#vendor-profiles
[7]: https://github.com/DataDog/datadog-agent/tree/main/cmd/agent/dist/conf.d/network_config_management.d/
[8]: /es/network_monitoring/devices/config_management_rollback
[9]: https://github.com/DataDog/datadog-agent/blob/main/pkg/networkconfigmanagement/profile/default_profiles.go
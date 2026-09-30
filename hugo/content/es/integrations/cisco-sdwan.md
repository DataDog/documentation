---
aliases:
- /es/integrations/cisco_sdwan
app_id: cisco-sdwan
categories:
- red
custom_kind: integración
description: Monitoriza tu entorno de Cisco SD-WAN con Datadog.
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Cisco SD-WAN
---
# Check del Agent: Cisco SD-WAN

## Información general

La integración de Cisco SD-WAN te permite monitorizar tu entorno de Cisco SD-WAN dentro de [Network Device Monitoring](https://app.datadoghq.com/devices).. Obtén información completa sobre el rendimiento y el estado de tu infraestructura SD-WAN, incluidos sitios, túneles y dispositivos.

## Configuración

**La integración de Cisco SD-WAN NDM está en fase de vista previa y no se facturará hasta que esté disponible de forma generalizada.**

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Cisco SD-WAN está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

Las integraciones de Cisco SD-WAN necesitan credenciales válidas para acceder a la instancia de Catalyst Manager.
Las credenciales deben tener el grupo de permisos "Monitorización de dispositivos".

1. Edita el archivo `cisco_sdwan.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Cisco SD-WAN. Consulta el [ejemplo cisco_sd_wan.d/conf.yaml](https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/cisco_sdwan.d/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **cisco_sdwan.application.latency** <br>(gauge) | Latencia en milisegundos por aplicación en la nube.<br>_Se muestra en milisegundos_ |
| **cisco_sdwan.application.loss** <br>(gauge) | Pérdida de paquetes por aplicación en la nube.<br>_Se muestra como porcentaje_ |
| **cisco_sdwan.application.qoe** <br>(gauge) | Puntuación QOE por aplicación en la nube.|
| **cisco_sdwan.bfd_session.status** <br>(gauge) | Estado de la sesión BFD. El valor es 1 si la sesión está activa, 0 en caso contrario.|
| **cisco_sdwan.bgp.neighbor** <br>(gauge) | Estado de cada vecino bgp. Métrica constante igual a 1.|
| **cisco_sdwan.control_connection.status** <br>(gauge) | Estado de la conexión de control. El valor es 1 si la conexión está activada, 0 en caso contrario.|
| **cisco_sdwan.cpu.usage** <br>(gauge) | Porcentaje de CPU que se está utilizando actualmente.<br>_Se muestra como porcentaje_ |
| **cisco_sdwan.crash.count** <br>(count) | Número de fallos.|
| **cisco_sdwan.device.reachable** <br>(gauge) | Estado del dispositivo. El valor es 1 si el dispositivo es accesible, 0 en caso contrario.|
| **cisco_sdwan.device.uptime** <br>(gauge) | Tiempo (en centésimas de segundo) transcurrido desde la última reinicialización de la parte de gestión de red del sistema.|
| **cisco_sdwan.disk.usage** <br>(gauge) | Porcentaje de disco que se está utilizando actualmente.<br>_Se muestra como porcentaje_ |
| **cisco_sdwan.hardware.status_ok** <br>(gauge) | Estado de cada componente de hardware. El valor es 1 si el componente está bien, 0 en caso contrario.|
| **cisco_sdwan.interface.rx_bandwidth_usage** <br>(gauge) | Porcentaje de ancho de banda recibido utilizado.<br>_Se muestra como porcentaje_ |
| **cisco_sdwan.interface.rx_bits** <br>(count) | Número total de bits recibidos en la interfaz.<br>_Se muestra en bits_ |
| **cisco_sdwan.interface.rx_bps** <br>(gauge) | Tasa de ancho de banda entrante en bits por segundo.<br>_Se muestra en bits_ |
| **cisco_sdwan.interface.rx_drops** <br>(count) | Número de paquetes entrantes elegidos para ser descartados aunque no se hayan detectado errores que impidan su entrega a un protocolo de nivel superior.<br>_Se muestra como paquete_ |
| **cisco_sdwan.interface.rx_errors** <br>(count) | Número de paquetes entrantes que contenían errores que impedían su entrega a un protocolo de nivel superior.<br>_Se muestra como paquete_ |
| **cisco_sdwan.interface.speed** <br>(gauge) | Velocidad actual de la interfaz en bits por segundo.|
| **cisco_sdwan.interface.status** <br>(gauge) | Para cada interfaz de cada dispositivo Cisco SD-WAN monitorizado, esta métrica informa siempre 1 con admin_status y oper_status como etiquetas, así como un estado "combinado" que se puede utilizar para monitores.|
| **cisco_sdwan.interface.tx_bandwidth_usage** <br>(gauge) | Porcentaje de ancho de banda enviado utilizado.<br>_Se muestra como porcentaje_ |
| **cisco_sdwan.interface.tx_bits** <br>(count) | Número total de bits transmitidos desde la interfaz.<br>_Se muestra en bits_ |
| **cisco_sdwan.interface.tx_bps** <br>(gauge) | Tasa de ancho de banda de salida en bits por segundo.<br>_Se muestra en bits_ |
| **cisco_sdwan.interface.tx_drops** <br>(count) | Número de paquetes salientes elegidos para ser descartados aunque no se hayan detectado errores que impidan su transmisión.<br>_Se muestra como paquete_ |
| **cisco_sdwan.interface.tx_errors** <br>(count) | Número de paquetes salientes que no se han podido transmitir debido a errores.<br>_Se muestra como paquete_ |
| **cisco_sdwan.memory.usage** <br>(gauge) | Porcentaje de memoria que se está utilizando actualmente.<br>_Se muestra como porcentaje_ |
| **cisco_sdwan.omp_peer.status** <br>(gauge) | Estado de la conexión OMP Peer. El valor es 1 si la sesión está activa, 0 en caso contrario.|
| **cisco_sdwan.reboot.count** <br>(count) | Número de reinicios.|
| **cisco_sdwan.tunnel.jitter** <br>(gauge) | Jitter del túnel.<br>_Se muestra en milisegundos_ |
| **cisco_sdwan.tunnel.latency** <br>(gauge) | Latencia en milisegundos del túnel.<br>_Se muestra en milisegundos_ |
| **cisco_sdwan.tunnel.loss** <br>(gauge) | Pérdida de paquetes del túnel.<br>_Se muestra como porcentaje_ |
| **cisco_sdwan.tunnel.qoe** <br>(gauge) | Puntuación QOE del túnel.|
| **cisco_sdwan.tunnel.rx_bits** <br>(count) | Número total de bits recibidos a través del túnel.<br>_Se muestra en bits_ |
| **cisco_sdwan.tunnel.rx_packets** <br>(count) | Número total de paquetes recibidos a través del túnel.<br>_Se muestra como paquete_ |
| **cisco_sdwan.tunnel.status** <br>(gauge) | Estado del túnel. El valor es 1 si el túnel está activo, 0 en caso contrario.|
| **cisco_sdwan.tunnel.tx_bits** <br>(count) | Número total de bits transmitidos a través del túnel.<br>_Se muestra en bits_ |
| **cisco_sdwan.tunnel.tx_packets** <br>(count) | Número total de paquetes transmitidos a través del túnel.<br>_Se muestra como paquete_ |

### Eventos

El check de Cisco SD-WAN no incluye ningún evento.

### Checks de servicio

El check de Cisco SD-WAN no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).
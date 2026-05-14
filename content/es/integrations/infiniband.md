---
app_id: infiniband
categories:
- network
custom_kind: integración
description: Recopilar y representar gráficamente el rendimiento y las estadísticas
  de InfiniBand
integration_version: 1.1.0
media: []
supported_os:
- linux
title: InfiniBand
---
## Información general

Este check monitoriza [InfiniBand](https://www.infinibandta.org/) a través del Datadog Agent.

Esta integración monitoriza las transferencias de datos mediante la recopilación de contadores y contadores de hardware RDMA del subsistema InfiniBand. Realiza un seguimiento de las métricas de rendimiento a través de la interfaz de InfiniBand del núcleo Linux, que proporciona contadores de métricas incluso cuando se utilizan transportes alternativos como RDMA sobre Ethernet convergente (RoCE).

Obtén visibilidad de tu infraestructura de red de alto rendimiento para ayudar a identificar cuellos de botella y problemas de rendimiento en cargas de trabajo con gran cantidad de datos. Al monitorizar tanto los contadores estándar de InfiniBand como los contadores de hardware RDMA, obtendrás información completa sobre el rendimiento de la red, los errores y las estadísticas de paquetes en todos tus dispositivos y puertos.

Las métricas clave recopiladas incluyen contadores de puertos como bytes/paquetes transmitidos y recibidos, recuento de errores y métricas específicas del hardware RDMA, lo que proporciona a los operadores los datos necesarios para garantizar un rendimiento óptimo de su infraestructura de red de alta velocidad.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. El check recopila métricas leyendo y enviando contadores de forma predeterminada desde los directorios [`/sys/class/infiniband/<device>/ports/*/counters/` y `/sys/class/infiniband/<device>/ports/*/hw_counters/`](https://docs.nvidia.com/networking/display/ofedv512580/infiniband+interface). Para asegurarte de que esta integración funciona, debes garantizar que el Agent tiene los permisos adecuados para acceder y leer los contadores de estos directorios.

### Instalación

El check de InfiniBand se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Para empezar a recopilar tus datos de rendimiento de InfiniBand, crea y edita el archivo `infiniband.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent. Consulta el [infiniband.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/infiniband/datadog_checks/infiniband/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. Este check funciona con una configuración mínima. Configura los parámetros opcionales, que se proporcionan para controlar mejor dónde busca el Agent los datos y qué datos recopilar si no se desean los comportamientos predeterminados. Las opciones incluyen configurar el directorio donde residen los contadores, excluir dispositivos/puertos específicos y omitir o añadir contadores para su recopilación.

```yaml
init_config:
instances:
  -
    ## @param infiniband_path - string - optional - default: /sys/class/infiniband
    ## The path to the infiniband directory.
    #
    # infiniband_path: /sys/class/infiniband

    ## @param exclude_devices - list of strings - optional
    ## A list of devices to exclude from the check. Devices are located in the infiniband directory. 
    ## The devices are located by default in /sys/class/infiniband.
    #
    # exclude_devices:
    #   - mlx5_0
    #   - efa0
    #   - ib1

    ## @param additional_counters - list of strings - optional
    ## A list of additional counters to collect. The counter names are the files in which the counter 
    ## values are stored. These are located inside /sys/class/infiniband/devices/<device>/ports/<port>/counters.
    #
    # additional_counters:
    #   - additional_counter
    #   - rx_mpwqe_frag

    ## @param additional_hw_counters - list of strings - optional
    ## A list of additional hardware counters to collect. The counter names are the files in which the 
    ## counter values are stored. These are located inside 
    ## /sys/class/infiniband/devices/<device>/ports/<port>/hw_counters.
    #
    # additional_hw_counters:
    #   - additional_hw_counter
    #   - rx_mpwqe_frag

    ## @param exclude_counters - list of strings - optional
    ## A list of counters to exclude from the check.
    #
    # exclude_counters:
    #   - duplicate_request
    #   - lifespan

    ## @param exclude_hw_counters - list of strings - optional
    ## A list of hardware counters to exclude from the check.
    #
    # exclude_hw_counters:
    #   - VL15_dropped
    #   - link_downed
```

3. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `infiniband` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **infiniband.VL15_dropped** <br>(gauge) | Número de paquetes entrantes de Virtual Lane 15 descartados debido a limitaciones de recursos (por ejemplo, falta de búferes) del puerto<br>_Se muestra como paquete_ |
| **infiniband.VL15_dropped.count** <br>(count) | Número de nuevos paquetes de Virtual Lane 15 descartados debido a limitaciones de recursos desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.excessive_buffer_overrun_errors** <br>(gauge) | Número de errores de desbordamiento excesivo del búfer<br>_Se muestra como error_ |
| **infiniband.excessive_buffer_overrun_errors.count** <br>(count) | Número de nuevos errores de desbordamiento excesivo del búfer desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.link_downed** <br>(gauge) | Número de veces que la máquina de estado de formación de puertos ha fallado en el proceso de recuperación de errores de enlace y ha interrumpido el enlace<br>_Se muestra como ocurrencia_ |
| **infiniband.link_downed.count** <br>(count) | Número de nuevas veces que la máquina de estado de entrenamiento de puertos ha interrumpido el enlace desde el último envío de métricas<br>_Se muestra como ocurrencia_ |
| **infiniband.link_error_recovery** <br>(gauge) | Número de veces que la máquina de estado de entrenamiento de puertos ha completado con éxito el proceso de recuperación de errores de enlace<br>_Se muestra como ocurrencia_ |
| **infiniband.link_error_recovery.count** <br>(count) | Número de nuevas recuperaciones con éxito de errores de enlace desde el último envío de métricas<br>_Se muestra como ocurrencia_ |
| **infiniband.local_link_integrity_errors** <br>(gauge) | Número de veces que el recuento de errores físicos locales superó el umbral especificado por LocalPhyErrors<br>_Se muestra como error_ |
| **infiniband.local_link_integrity_errors.count** <br>(count) | Número de nuevas veces que los errores físicos locales han superado el umbral desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.multicast_rcv_packets** <br>(gauge) | Número de paquetes multicast, incluidos los paquetes multicast que contienen errores (legado)<br>_Se muestra como paquete_ |
| **infiniband.multicast_rcv_packets.count** <br>(count) | Número de nuevos paquetes de multicast recibidos desde el último envío de métricas (legacy)<br>_Se muestra como paquete_ |
| **infiniband.multicast_xmit_packets** <br>(gauge) | Número de paquetes de multicast transmitidos en todos los Virtual Lanes desde el puerto (heredado)<br>_Se muestra como paquete_ |
| **infiniband.multicast_xmit_packets.count** <br>(count) | Número de nuevos paquetes de multicast trasmitidos desde el último envío de métricas (legacy)<br>_Se muestra como paquete_ |
| **infiniband.port_multicast_rcv_packets** <br>(gauge) | Número de paquetes de multicast recibidos<br>_Se muestra como paquete_ |
| **infiniband.port_multicast_rcv_packets.count** <br>(count) | Número de nuevos paquetes de multicast recibidos desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.port_multicast_xmit_packets** <br>(gauge) | Número de paquetes de multicast transmitidos en todas las Virtual Lanes desde el puerto<br>_Se muestra como paquete_ |
| **infiniband.port_multicast_xmit_packets.count** <br>(count) | Número de nuevos paquetes de multicast transmitidos desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.port_phys_state** <br>(gauge) | Estado del enlace físico|
| **infiniband.port_rcv_constraint_errors** <br>(gauge) | Número de paquetes recibidos en el puerto físico del conmutador que se descartan<br>_Se muestra como error_ |
| **infiniband.port_rcv_constraint_errors.count** <br>(count) | Número de nuevos paquetes descartados en la recepción desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.port_rcv_data** <br>(gauge) | Número de octetos de datos, divididos por 4, recibidos en todas las Virtual Lanes desde el puerto<br>_Se muestra como byte_ |
| **infiniband.port_rcv_data.count** <br>(count) | Número de nuevos octetos de datos (dividido por 4) recibidos desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.port_rcv_data_64** <br>(gauge) | Número de octetos de datos, divididos por 4, recibidos en todas las Virtual Lanes desde el puerto<br>_Se muestra como byte_ |
| **infiniband.port_rcv_data_64.count** <br>(count) | Número de nuevos octetos de datos (dividido por 4) recibidos desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.port_rcv_discards** <br>(gauge) | Número de paquetes recibidos descartados<br>_Se muestra como paquete_ |
| **infiniband.port_rcv_discards.count** <br>(count) | Número de nuevos paquetes recibidos descartados desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.port_rcv_errors** <br>(gauge) | Número de paquetes con error recibidos en el puerto<br>_Se muestra como error_ |
| **infiniband.port_rcv_errors.count** <br>(count) | Número de nuevos paquetes de error recibidos desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.port_rcv_packets** <br>(gauge) | Número de paquetes (puede incluir paquetes que contengan Errores)<br>_Se muestra como paquete_ |
| **infiniband.port_rcv_packets.count** <br>(count) | Número de nuevos paquetes recibidos desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.port_rcv_packets_64** <br>(gauge) | Número de paquetes de 64 bits recibidos<br>_Se muestra como paquete_ |
| **infiniband.port_rcv_packets_64.count** <br>(count) | Número de nuevos paquetes de 64 bits recibidos desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.port_rcv_remote_physical_errors** <br>(gauge) | Número de paquetes marcados con el delimitador EBP recibidos en el puerto<br>_Se muestra como error_ |
| **infiniband.port_rcv_remote_physical_errors.count** <br>(count) | Número de nuevos paquetes con delimitador EBP recibidos desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.port_rcv_switch_relay_errors** <br>(gauge) | Número de paquetes recibidos en el puerto que fueron descartados porque no pudieron ser reenviados por el switch relay<br>_Se muestra como error_ |
| **infiniband.port_rcv_switch_relay_errors.count** <br>(count) | Número de paquetes nuevos descartados debido a un fallo de reenvío del switch relay desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.port_state** <br>(gauge) | Estado del puerto|
| **infiniband.port_unicast_rcv_packets** <br>(gauge) | Número de paquetes unicast, incluidos los paquetes unicast con errores<br>_Se muestra como paquete_ |
| **infiniband.port_unicast_rcv_packets.count** <br>(count) | Número de nuevos paquetes unicast recibidos desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.port_unicast_xmit_packets** <br>(gauge) | Número de paquetes unicast transmitidos en todas las Virtual Lanes desde el puerto<br>_Se muestra como paquete_ |
| **infiniband.port_unicast_xmit_packets.count** <br>(count) | Número de nuevos paquetes unicast transmitidos desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.port_xmit_constraint_errors** <br>(gauge) | Número de paquetes no transmitidos desde el puerto físico del switch<br>_Se muestra como error_ |
| **infiniband.port_xmit_constraint_errors.count** <br>(count) | Número de paquetes nuevos no transmitidos debido a restricciones desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.port_xmit_data** <br>(gauge) | Número de octetos de datos, divididos por 4, transmitidos en todas las Virtual Lanes desde el puerto<br>_Se muestra como byte_ |
| **infiniband.port_xmit_data.count** <br>(count) | Número de nuevos octetos de datos (divididos por 4) transmitidos desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.port_xmit_data_64** <br>(gauge) | Volumen de datos transmitidos de 64 bits<br>_Se muestra como byte_ |
| **infiniband.port_xmit_data_64.count** <br>(count) | Cambio en el volumen de datos de 64 bits transmitidos desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.port_xmit_discards** <br>(gauge) | Número de paquetes salientes descartados por el puerto porque el puerto está caído o congestionado<br>_Se muestra como paquete_ |
| **infiniband.port_xmit_discards.count** <br>(count) | Número de nuevos paquetes salientes descartados desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.port_xmit_packets** <br>(gauge) | Número de paquetes transmitidos en todas las Virtual Lanes desde este puerto<br>_Se muestra como paquete_ |
| **infiniband.port_xmit_packets.count** <br>(count) | Número de nuevos paquetes transmitidos desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.port_xmit_packets_64** <br>(gauge) | Número de paquetes de 64 bits transmitidos<br>_Se muestra como paquete_ |
| **infiniband.port_xmit_packets_64.count** <br>(count) | Número de nuevos paquetes de 64 bits transmitidos desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.port_xmit_wait** <br>(gauge) | Número de tics durante los cuales el puerto tenía datos para transmitir, pero no se envió ningún dato.|
| **infiniband.port_xmit_wait.count** <br>(count) | Número de nuevos tics de espera de transmisión desde el último envío de métricas|
| **infiniband.rdma.duplicate_request** <br>(gauge) | Número de paquetes recibidos. Una solicitud duplicada es una solicitud que se había ejecutado previamente<br>_Se muestra como error_ |
| **infiniband.rdma.duplicate_request.count** <br>(count) | Número de nuevos paquetes recibidos que eran solicitudes duplicadas desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.implied_nak_seq_err** <br>(gauge) | Número de veces que el solicitado decidió un acuse de recibo con un número de secuencia de paquete mayor que el esperado para una lectura o respuesta RDMA<br>_Se muestra como error_ |
| **infiniband.rdma.implied_nak_seq_err.count** <br>(count) | Número de nuevos acuses de recibo con número de secuencia de paquetes superior al esperado desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.lifespan** <br>(gauge) | El periodo máximo en ms que define la antigüedad del contador lee<br>_Se muestra como milisegundo_ |
| **infiniband.rdma.lifespan.count** <br>(count) | Cambio en el periodo máximo de antigüedad desde el último envío de métricas<br>_Se muestra en milisegundos_ |
| **infiniband.rdma.link_down_events_phy** <br>(gauge) | Número de eventos de caída del enlace físico<br>_Se muestra como ocurrencia_ |
| **infiniband.rdma.link_down_events_phy.count** <br>(count) | Número de nuevos eventos de caída del enlace físico desde el último envío de métricas<br>_Se muestra como ocurrencia_ |
| **infiniband.rdma.local_ack_timeout_err** <br>(gauge) | Número de veces que ha expirado el temporizador de acuse de recibo del par de colas para los pares de colas de transporte de conexión fiable, conexión fiable ampliada y conexión dinámica en el lado del remitente<br>_Se muestra como error_ |
| **infiniband.rdma.local_ack_timeout_err.count** <br>(count) | Número de nuevos vencimientos del temporizador de acuse de recibo del par de colas desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.np_cnp_sent** <br>(gauge) | Número de paquetes de notificación de congestión enviados por el punto de notificación cuando se percató de la congestión experimentada<br>_Se muestra como paquete_ |
| **infiniband.rdma.np_cnp_sent.count** <br>(count) | Número de nuevos paquetes de notificación de congestión enviados debido a la congestión desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.rdma.np_ecn_marked_roce_packets** <br>(gauge) | Número de paquetes RoCEv2 recibidos por el punto de notificación que se marcaron por experimentar congestión<br>_Se muestra como paquete_ |
| **infiniband.rdma.np_ecn_marked_roce_packets.count** <br>(count) | Número de nuevos paquetes RoCEv2 marcados de congestión recibidos desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.rdma.out_of_buffer** <br>(gauge) | Número de abandonos producidos por falta de entradas de cola de trabajo para los pares de colas asociados<br>_Se muestra como error_ |
| **infiniband.rdma.out_of_buffer.count** <br>(count) | Número de nuevas bajas por falta de entradas en la cola de trabajo desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.out_of_sequence** <br>(gauge) | Número de paquetes fuera de secuencia recibidos<br>_Se muestra como error_ |
| **infiniband.rdma.out_of_sequence.count** <br>(count) | Número de nuevos paquetes fuera de secuencia recibidos desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.packet_seq_err** <br>(gauge) | Número de paquetes de error de secuencia de acuse de recibo negativo recibidos. No se ha superado el límite de reintentos del par de colas<br>_Se muestra como error_ |
| **infiniband.rdma.packet_seq_err.count** <br>(count) | Número de nuevos paquetes de error de secuencia de acuse de recibo negativo recibidos desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.rdma_read_bytes** <br>(gauge) | Número de bytes leídos en operaciones RDMA<br>_Se muestra como byte_ |
| **infiniband.rdma.rdma_read_bytes.count** <br>(count) | Número de bytes nuevos leídos en operaciones RDMA desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.rdma.rdma_read_resp_bytes** <br>(gauge) | Número de bytes en las respuestas de lectura RDMA<br>_Se muestra como byte_ |
| **infiniband.rdma.rdma_read_resp_bytes.count** <br>(count) | Número de bytes nuevos en respuestas de lectura RDMA desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.rdma.rdma_read_wr_err** <br>(gauge) | Número de errores de solicitud de trabajo de lectura RDMA<br>_Se muestra como error_ |
| **infiniband.rdma.rdma_read_wr_err.count** <br>(count) | Número de nuevos errores de solicitud de trabajo de lectura RDMA desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.rdma_read_wrs** <br>(gauge) | Número de solicitudes de trabajo de lectura RDMA<br>_Se muestra como solicitud_ |
| **infiniband.rdma.rdma_read_wrs.count** <br>(count) | Número de nuevas solicitudes de trabajo de lectura RDMA desde el último envío de métricas<br>_Se muestra como solicitud_ |
| **infiniband.rdma.rdma_write_bytes** <br>(gauge) | Número de bytes escritos en operaciones RDMA<br>_Se muestra como byte_ |
| **infiniband.rdma.rdma_write_bytes.count** <br>(count) | Número de bytes nuevos escritos en operaciones RDMA desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.rdma.rdma_write_recv_bytes** <br>(gauge) | Número de bytes recibidos en operaciones de escritura RDMA<br>_Se muestra como byte_ |
| **infiniband.rdma.rdma_write_recv_bytes.count** <br>(count) | Número de bytes nuevos recibidos en operaciones de escritura RDMA desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.rdma.rdma_write_wr_err** <br>(gauge) | Número de errores de solicitud de trabajo de escritura RDMA<br>_Se muestra como error_ |
| **infiniband.rdma.rdma_write_wr_err.count** <br>(count) | Número de nuevos errores de solicitud de trabajo de escritura RDMA desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.rdma_write_wrs** <br>(gauge) | Número de solicitudes de trabajo de escritura RDMA<br>_Se muestra como solicitud_ |
| **infiniband.rdma.rdma_write_wrs.count** <br>(count) | Número de nuevas solicitudes de trabajo de escritura RDMA desde el último envío de métricas<br>_Se muestra como solicitud_ |
| **infiniband.rdma.recv_bytes** <br>(gauge) | Número de bytes recibidos en solicitudes de trabajo<br>_Se muestra como byte_ |
| **infiniband.rdma.recv_bytes.count** <br>(count) | Número de bytes nuevos recibidos en solicitudes de trabajo desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.rdma.recv_wrs** <br>(gauge) | Número de solicitudes de trabajo recibidas<br>_Se muestra como solicitud_ |
| **infiniband.rdma.recv_wrs.count** <br>(count) | Número de nuevas solicitudes de trabajo recibidas desde la última presentación de métricas<br>_Se muestra como solicitud_ |
| **infiniband.rdma.req_cqe_error** <br>(gauge) | Número de errores de entrada en la cola de finalización (solicitante)<br>_Se muestra como error_ |
| **infiniband.rdma.req_cqe_error.count** <br>(count) | Número de nuevos errores de entrada en la cola de finalización (solicitante) desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.req_cqe_flush_error** <br>(gauge) | Número de errores de vaciado de la cola de finalización (solicitante)<br>_Se muestra como error_ |
| **infiniband.rdma.req_cqe_flush_error.count** <br>(count) | Número de nuevos errores de vaciado de la cola de finalización (solicitante) desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.req_remote_access_errors** <br>(gauge) | Número de errores de acceso remoto (solicitante)<br>_Se muestra como error_ |
| **infiniband.rdma.req_remote_access_errors.count** <br>(count) | Número de nuevos errores de acceso remoto (solicitante) desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.req_remote_invalid_request** <br>(gauge) | Número de solicitudes remotas no válidas<br>_Se muestra como solicitud_ |
| **infiniband.rdma.req_remote_invalid_request.count** <br>(count) | Número de nuevas solicitudes remotas no válidas desde el último envío de métricas<br>_Se muestra como solicitud_ |
| **infiniband.rdma.resp_cqe_error** <br>(gauge) | Número de errores de entrada en la cola de finalización (respondedor)<br>_Se muestra como error_ |
| **infiniband.rdma.resp_cqe_error.count** <br>(count) | Número de nuevos errores de entrada en la cola de finalización (respondedor) desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.resp_cqe_flush_error** <br>(gauge) | Número de errores de vaciado de la cola de finalización (respondedor)<br>_Se muestra como error_ |
| **infiniband.rdma.resp_cqe_flush_error.count** <br>(count) | Número de nuevos errores de vaciado de la cola de finalización (respondedor) desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.resp_local_length_error** <br>(gauge) | Número de errores de longitud local (respondedor)<br>_Se muestra como error_ |
| **infiniband.rdma.resp_local_length_error.count** <br>(count) | Número de nuevos errores de longitud local (respondedor) desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.resp_remote_access_errors** <br>(gauge) | Número de errores de acceso remoto (respondedor)<br>_Se muestra como error_ |
| **infiniband.rdma.resp_remote_access_errors.count** <br>(count) | Número de nuevos errores de acceso remoto (respondedor) desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.rnr_nak_retry_err** <br>(gauge) | Número de errores de reintento de acuse de recibo negativo del receptor no listo<br>_Se muestra como error_ |
| **infiniband.rdma.rnr_nak_retry_err.count** <br>(count) | Número de nuevos errores de reintento de acuse de recibo negativo del receptor no preparado desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.roce_adp_retrans** <br>(gauge) | Número de retransmisiones adaptables para tráfico RoCE<br>_Se muestra como ocurrencia_ |
| **infiniband.rdma.roce_adp_retrans.count** <br>(count) | Número de nuevas retransmisiones adaptativas para tráfico RoCE desde el último envío de métricas<br>_Se muestra como ocurrencia_ |
| **infiniband.rdma.roce_adp_retrans_to** <br>(gauge) | Número de veces que el tráfico RoCE alcanzó el tiempo de espera debido a la retransmisión adaptativa<br>_Se muestra como ocurrencia_ |
| **infiniband.rdma.roce_adp_retrans_to.count** <br>(count) | Número de nuevos tiempos de espera de tráfico RoCE debidos a retransmisión adaptativa desde el último envío de métricas<br>_Se muestra como ocurrencia_ |
| **infiniband.rdma.roce_slow_restart** <br>(gauge) | Número de veces que se utilizó el reinicio lento RoCE<br>_Se muestra como ocurrencia_ |
| **infiniband.rdma.roce_slow_restart.count** <br>(count) | Número de nuevos usos de reinicio lento RoCE desde el último envío de métricas<br>_Se muestra como ocurrencia_ |
| **infiniband.rdma.roce_slow_restart_cnps** <br>(gauge) | Número de veces que el reinicio lento RoCE generó paquetes de notificación de congestión<br>_Se muestra como ocurrencia_ |
| **infiniband.rdma.roce_slow_restart_cnps.count** <br>(count) | Número de nuevos paquetes de notificación de congestión generados por el reinicio lento RoCE desde el último envío de métricas<br>_Se muestra como ocurrencia_ |
| **infiniband.rdma.roce_slow_restart_trans** <br>(gauge) | Número de veces que el reinicio lento RoCE cambió de estado a reinicio lento<br>_Se muestra como ocurrencia_ |
| **infiniband.rdma.roce_slow_restart_trans.count** <br>(count) | Número de nuevos cambios de estado de reinicio lento RoCE desde el último envío de métricas<br>_Se muestra como ocurrencia_ |
| **infiniband.rdma.rp_cnp_handled** <br>(gauge) | Número de paquetes de notificación de congestión gestionados<br>_Se muestra como paquete_ |
| **infiniband.rdma.rp_cnp_handled.count** <br>(count) | Número de nuevos paquetes de notificación de congestión gestionados desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.rdma.rp_cnp_ignored** <br>(gauge) | Número de paquetes de notificación de congestión ignorados<br>_Se muestra como paquete_ |
| **infiniband.rdma.rp_cnp_ignored.count** <br>(count) | Número de nuevos paquetes de notificación de congestión ignorados desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.rdma.rx_atomic_requests** <br>(gauge) | Número de solicitudes RDMA atómicas recibidas<br>_Se muestra como solicitud_ |
| **infiniband.rdma.rx_atomic_requests.count** <br>(count) | Número de nuevas solicitudes RDMA atómicas recibidas desde el último envío de métricas<br>_Se muestra como solicitud_ |
| **infiniband.rdma.rx_buff_alloc_err** <br>(gauge) | Número de errores de asignación del búfer de recepción<br>_Se muestra como error_ |
| **infiniband.rdma.rx_buff_alloc_err.count** <br>(count) | Número de nuevos errores de asignación del búfer de recepción desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.rx_bytes** <br>(gauge) | Número de bytes recibidos<br>_Se muestra como byte_ |
| **infiniband.rdma.rx_bytes.count** <br>(count) | Número de bytes nuevos recibidos desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.rdma.rx_cqe_compress_blks** <br>(gauge) | Número de bloques de cola de finalización comprimidos<br>_Se muestra como bloque_ |
| **infiniband.rdma.rx_cqe_compress_blks.count** <br>(count) | Número de nuevos bloques de cola de finalización comprimidos desde el último envío de métricas<br>_Se muestra como bloque_ |
| **infiniband.rdma.rx_cqe_compress_pkts** <br>(gauge) | Número de paquetes comprimidos de la cola de finalización<br>_Se muestra como paquete_ |
| **infiniband.rdma.rx_cqe_compress_pkts.count** <br>(count) | Número de nuevos paquetes de la cola de finalización comprimidos desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.rdma.rx_dct_connect** <br>(gauge) | Número de solicitudes de conexión recibidas para los transportes conectados dinámicamente asociados<br>_Se muestra como conexión_ |
| **infiniband.rdma.rx_dct_connect.count** <br>(count) | Número de nuevas solicitudes de conexión de transporte conectado dinámicamente recibidas desde el último envío de métricas<br>_Se muestra como conexión_ |
| **infiniband.rdma.rx_drops** <br>(gauge) | Número de paquetes perdidos<br>_Se muestra como paquete_ |
| **infiniband.rdma.rx_drops.count** <br>(count) | Número de nuevos paquetes perdidos desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.rdma.rx_icrc_encapsulated** <br>(gauge) | Número de paquetes RoCE con errores ICReliable Connected<br>_Se muestra como paquete_ |
| **infiniband.rdma.rx_icrc_encapsulated.count** <br>(count) | Número de nuevos paquetes RoCE con errores ICReliable Connected desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.rdma.rx_mpwqe_filler** <br>(gauge) | Número de eventos de llenado de entrada de cola de trabajo multipaquete<br>_Se muestra como evento_ |
| **infiniband.rdma.rx_mpwqe_filler.count** <br>(count) | Número de nuevos eventos de llenado de entrada de cola de trabajo multipaquete desde el último envío de métricas<br>_Se muestra como evento_ |
| **infiniband.rdma.rx_mpwqe_frag** <br>(gauge) | Número de eventos de fragmento de entrada de cola de trabajo multipaquete<br>_Se muestra como evento_ |
| **infiniband.rdma.rx_mpwqe_frag.count** <br>(count) | Número de nuevos eventos de fragmento de entrada de cola de trabajo multipaquete desde el último envío de métricas<br>_Se muestra como evento_ |
| **infiniband.rdma.rx_out_of_buffer** <br>(gauge) | Número de eventos fuera de búfer en recepción<br>_Se muestra como evento_ |
| **infiniband.rdma.rx_out_of_buffer.count** <br>(count) | Número de nuevos eventos de búfer agotado en recepción desde el último envío de métricas<br>_Se muestra como evento_ |
| **infiniband.rdma.rx_pkts** <br>(gauge) | Número de paquetes recibidos<br>_Se muestra como paquete_ |
| **infiniband.rdma.rx_pkts.count** <br>(count) | Número de nuevos paquetes recibidos desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.rdma.rx_read_requests** <br>(gauge) | Número de solicitudes de lectura recibidas<br>_Se muestra como solicitud_ |
| **infiniband.rdma.rx_read_requests.count** <br>(count) | Número de nuevas solicitudes de lectura recibidas desde el último envío de métricas<br>_Se muestra como solicitud_ |
| **infiniband.rdma.rx_vport_multicast_bytes** <br>(gauge) | Número de bytes de multicast recibidos en el puerto virtual<br>_Se muestra como byte_ |
| **infiniband.rdma.rx_vport_multicast_bytes.count** <br>(count) | Número de nuevos bytes de multicast recibidos en el puerto virtual desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.rdma.rx_vport_multicast_packets** <br>(gauge) | Número de paquetes multicast recibidos en el puerto virtual<br>_Se muestra como paquete_ |
| **infiniband.rdma.rx_vport_multicast_packets.count** <br>(count) | Número de nuevos paquetes multicast recibidos en el puerto virtual desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.rdma.rx_vport_unicast_bytes** <br>(gauge) | Número de bytes unicast recibidos en el puerto virtual<br>_Se muestra como byte_ |
| **infiniband.rdma.rx_vport_unicast_bytes.count** <br>(count) | Número de nuevos bytes unicast recibidos en el puerto virtual desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.rdma.rx_vport_unicast_packets** <br>(gauge) | Número de paquetes unicast recibidos en el puerto virtual<br>_Se muestra como paquete_ |
| **infiniband.rdma.rx_vport_unicast_packets.count** <br>(count) | Número de nuevos paquetes unicast recibidos en el puerto virtual desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.rdma.rx_wqe_err** <br>(gauge) | Número de errores de entrada en cola de trabajo en recepción<br>_Se muestra como error_ |
| **infiniband.rdma.rx_wqe_err.count** <br>(count) | Número de nuevos errores de entrada en cola de trabajo en la recepción desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.rdma.rx_write_requests** <br>(gauge) | Número de solicitudes de escritura recibidas<br>_Se muestra como solicitud_ |
| **infiniband.rdma.rx_write_requests.count** <br>(count) | Número de nuevas solicitudes de escritura recibidas desde el último envío de métricas<br>_Se muestra como solicitud_ |
| **infiniband.rdma.send_bytes** <br>(gauge) | Número de bytes enviados<br>_Se muestra como byte_ |
| **infiniband.rdma.send_bytes.count** <br>(count) | Número de bytes nuevos enviados desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.rdma.send_wrs** <br>(gauge) | Número de solicitudes de trabajo enviadas<br>_Se muestra como solicitud_ |
| **infiniband.rdma.send_wrs.count** <br>(count) | Número de nuevas solicitudes de trabajo enviadas desde la última presentación de métricas<br>_Se muestra como solicitud_ |
| **infiniband.rdma.tx_bytes** <br>(gauge) | Número de bytes transmitidos<br>_Se muestra como byte_ |
| **infiniband.rdma.tx_bytes.count** <br>(count) | Número de bytes nuevos transmitidos desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.rdma.tx_pkts** <br>(gauge) | Número de paquetes transmitidos en todas las Virtual Lanes desde este puerto<br>_Se muestra como paquete_ |
| **infiniband.rdma.tx_pkts.count** <br>(count) | Número de nuevos paquetes transmitidos desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.rdma.tx_vport_unicast_bytes** <br>(gauge) | Número de bytes unicast transmitidos en el puerto virtual<br>_Se muestra como byte_ |
| **infiniband.rdma.tx_vport_unicast_bytes.count** <br>(count) | Número de nuevos bytes unicast transmitidos en el puerto virtual desde el último envío de métricas<br>_Se muestra como byte_ |
| **infiniband.rdma.tx_vport_unicast_packets** <br>(gauge) | Número de paquetes unicast transmitidos en el puerto virtual<br>_Se muestra como paquete_ |
| **infiniband.rdma.tx_vport_unicast_packets.count** <br>(count) | Número de nuevos paquetes unicast transmitidos en el puerto virtual desde el último envío de métricas<br>_Se muestra como paquete_ |
| **infiniband.symbol_error** <br>(gauge) | Número de errores de enlace menores detectados en uno o más lanes físicas<br>_Se muestra como error_ |
| **infiniband.symbol_error.count** <br>(count) | Número de nuevos errores de enlace menores detectados desde el último envío de métricas<br>_Se muestra como error_ |
| **infiniband.unicast_rcv_packets** <br>(gauge) | Número de paquetes unicast, incluidos los paquetes unicast con errores (legacy)<br>_Se muestra como paquete_ |
| **infiniband.unicast_rcv_packets.count** <br>(count) | Número de nuevos paquetes unicast recibidos desde el último envío de métricas (legacy)<br>_Se muestra como paquete_ |
| **infiniband.unicast_xmit_packets** <br>(gauge) | Número de paquetes unicast transmitidos en todas las Virtual Lanes desde el puerto (legacy)<br>_Se muestra como paquete_ |
| **infiniband.unicast_xmit_packets.count** <br>(count) | Número de nuevos paquetes unicast transmitidos desde el último envío de métricas (legacy)<br>_Se muestra como paquete_ |

### Eventos

La integración de InfiniBand no incluye ningún evento.

### Checks de servicio

La integración de InfiniBand no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).
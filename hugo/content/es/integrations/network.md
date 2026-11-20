---
app_id: sistema
categories:
- network
custom_kind: integración
description: Seguimiento de bytes y paquetes de entrada/salida, estados de conexión,
  tiempos de ida y vuelta, and more.
integration_version: 5.3.0
media: []
supported_os:
- linux
- macos
- windows
title: Red
---
![Dashboard de red](https://raw.githubusercontent.com/DataDog/integrations-core/master/network/images/netdashboard.png)

## Información general

El check de red recopila las estadísticas TCP/IP del sistema operativo del host.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host.

### Instalación

El check de red está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tu servidor.

Para recopilar métricas con esta integración, asegúrate de que el módulo conntrack está activado en tu host. Si no es el caso, ejecuta:

```shell
sudo modprobe nf_conntrack
```

*Nota*: Puede que necesites instalar el binario conntrack en la imagen del Agent.

### Configuración

1. El Agent activa el check de red por defecto, pero si deseas configurarla tú mismo, edita el archivo `network.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Ve el [network.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/network/datadog_checks/network/data/conf.yaml.default) para todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) para efectuar los cambios de configuración.

**Nota**:

Algunas métricas conntrack requieren ejecutar conntrack con acceso privilegiado para ser recuperadas.

Linux: configura la siguiente regla sudoers para que esto funcione:

```shell
dd-Agent ALL=NOPASSWD: /usr/sbin/conntrack -S
```

#### Kubernetes

Las métricas de Conntrack están disponibles por defecto en Kubernetes \< v1.11 o cuando se utiliza el modo de red `host` en Kubernetes v1.11+.

Para recopilar [métricas de AWS ENA](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-network-performance-ena.html):

- Actualiza el check de `network` para permitir la recopilación de métricas de AWS ENA con `collect_aws_ena_metrics: true`.
- Actualiza los contenedores del Agent para que utilicen el modo de red `host` y añade las capacidades de `NET_ADMIN`.

Para el despliegue de Datadog [Helm Chart](https://docs.datadoghq.com/containers/kubernetes/installation/?tab=helm#installation), actualiza los valores de chart con:

```yaml
datadog:
  # Enable AWS ENA metrics collection for network check
  confd:
    network.yaml: |-
      init_config:
      instances:
        - collect_aws_ena_metrics: true

# Have agent containers use host network with NET_ADMIN capability
agents:
  useHostNetwork: true
  containers:
    agent:
      securityContext:
        capabilities:
          add:
            - NET_ADMIN

```

Para Agents desplegados manualmente con DaemonSet, aplica el parche `datadog` DaemonSet:

```yaml
spec:
  template:
    spec:
      dnsPolicy: ClusterFirstWithHostNet
      hostNetwork: true
      containers:
        - name: agent
          ports:
          - containerPort: 8125
            hostPort: 8125
            name: dogstatsdport
            protocol: UDP
          securityContext:
            capabilities:
              add:
              - NET_ADMIN
```

**Nota**: Es posible que tengas que añadir `hostPort: 8125` para otros contenedores en el DaemonSet, ya que `hostNetwork: true` se aplicará a todos los contenedores.

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `network` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **system.net.aws.ec2.bw_in_allowance_exceeded** <br>(gauge) | El número de paquetes formados porque el ancho de banda agregado entrante excedió el máximo para la instancia.<br>_Se muestra como paquete_ |
| **system.net.aws.ec2.bw_out_allowance_exceeded** <br>(gauge) | El número de paquetes formados porque el ancho de banda agregado de salida excedió el máximo para la instancia.<br>_Se muestra como paquete_ |
| **system.net.aws.ec2.conntrack_allowance_available** <br>(gauge) | El número de conexiones rastreadas que pueden establecerse antes de llegar al límite de Conexiones rastreadas.<br>_Se muestra como conexión_ |
| **system.net.aws.ec2.conntrack_allowance_exceeded** <br>(gauge) | El número de paquetes formados porque el seguimiento de conexiones superó el máximo para la instancia y no se pudieron establecer nuevas conexiones.<br>_Se muestra como paquete_ |
| **system.net.aws.ec2.linklocal_allowance_exceeded** <br>(gauge) | El número de paquetes formados porque el PPS del tráfico a los servicios de proxy locales superó el máximo para la interfaz de red.<br>_Se muestra como paquete_ |
| **system.net.aws.ec2.pps_allowance_exceeded** <br>(gauge) | El número de paquetes formados porque el PPS bidireccional excedió el máximo para la instancia.<br>_Se muestra como paquete_ |
| **system.net.iface.mtu** <br>(gauge) | La Unidad de Transmisión Máxima (MTU) de la interfaz de red (solo Linux).<br>_Se muestra como unidad_ |
| **system.net.iface.tx_queue_len** <br>(gauge) | La longitud de la cola de transmisión de la interfaz de red (solo Linux).<br>_Se muestra como unidad_ |
| **system.net.iface.num_tx_queues** <br>(gauge) | El número de cola de transmisión de una interfaz de red (solo Linux).<br>_Se muestra como unidad_ |
| **system.net.iface.num_rx_queues** <br>(gauge) | El número de colas de recepción de una interfaz de red (solo Linux).<br>_Se muestra como unidad_ |
| **system.net.iface.up** <br>(gauge) | Indica si la interfaz de red está activa (solo en Linux).|
| **system.net.bytes_rcvd** <br>(gauge) | El número de bytes recibidos en un dispositivo por segundo.<br>_Se muestra como byte_ |
| **system.net.bytes_sent** <br>(gauge) | El número de bytes enviados desde un dispositivo por segundo.<br>_Se muestra como byte_ |
| **system.net.conntrack.acct** <br>(gauge) | Booleano para activar la contabilidad de flujos de seguimiento de conexión. Se añaden contadores de paquetes y bytes de 64 bits por flujo.<br>_Se muestra como unidad_ |
| **system.net.conntrack.buckets** <br>(gauge) | Tamaño de la tabla hash.<br>_Se muestra como unidad_ |
| **system.net.conntrack.checksum** <br>(gauge) | Booleano para verificar la suma de check de los paquetes entrantes.<br>_Se muestra como unidad_ |
| **system.net.conntrack.count** <br>(gauge) | El número de conexiones presentes en la tabla conntrack.<br>_Se muestra como conexión_ |
| **system.net.conntrack.drop** <br>(count) | El número de descartes en la tabla conntrack.<br>_Se muestra como unidad_ |
| **system.net.conntrack.early_drop** <br>(count) | El número del descarte temprano en la tabla conntrack.<br>_Se muestra como unidad_ |
| **system.net.conntrack.error** <br>(count) | El número de error en la tabla conntrack.<br>_Se muestra como unidad_ |
| **system.net.conntrack.events** <br>(count) | El booleano para habilitar el código de seguimiento de conexiones proporcionará un espacio de usuario con eventos de seguimiento de conexión a través de ctnetlink.<br>_Se muestra como unidad_ |
| **system.net.conntrack.events_retry_timeout** <br>(gauge) | <br>_Se muestra como unidad_ |
| **system.net.conntrack.expect_max** <br>(gauge) | Tamaño máximo de la tabla de expectativas.<br>_Se muestra como unidad_ |
| **system.net.conntrack.found** <br>(count) | El número de entradas de flujo asignadas actualmente.<br>_Se muestra como unidad_ |
| **system.net.conntrack.generic_timeout** <br>(gauge) | Predeterminado para el tiempo de espera genérico. Se refiere a protocolos de capa 4 desconocidos/no admitidos.<br>_Se muestra como unidad_ |
| **system.net.conntrack.helper** <br>(gauge) | Booleano para activar la asignación automática de auxiliares conntrack.<br>_Se muestra como unidad_ |
| **system.net.conntrack.icmp_timeout** <br>(gauge) | Por defecto para el tiempo de espera ICMP.<br>_Se muestra como segundo_ |
| **system.net.conntrack.ignore** <br>(count) | El número de ignorados en la tabla conntrack.<br>_Se muestra como unidad_ |
| **system.net.conntrack.invalid** <br>(count) | El número de no válidos en la tabla conntrack.<br>_Se muestra como unidad_ |
| **system.net.conntrack.insert** <br>(count) | El número de inserción en la tabla conntrack.<br>_Se muestra como unidad_ |
| **system.net.conntrack.insert_failed** <br>(count) | El número de inserciones fallidas en la tabla conntrack.<br>_Se muestra como unidad_ |
| **system.net.conntrack.log_invalid** <br>(gauge) | Paquetes no válidos de log de un tipo especificado por valor.<br>_Se muestra como unidad_ |
| **system.net.conntrack.max** <br>(gauge) | Capacidad máxima de la tabla Conntrack.<br>_Se muestra como conexión_ |
| **system.net.conntrack.search_restart** <br>(count) | <br>_Se muestra como unidad_ |
| **system.net.conntrack.tcp_be_liberal** <br>(gauge) | Booleano para marcar solo segmentos RST fuera de la ventana como NO VÁLIDOS.<br>_Se muestra como unidad_ |
| **system.net.conntrack.tcp_loose** <br>(gauge) | Booleano para permitir recopilar conexiones ya establecidas.<br>_Se muestra como unidad_ |
| **system.net.conntrack.tcp_max_retrans** <br>(gauge) | Número máximo de paquetes que pueden retransmitirse sin recibir un ACK (aceptable) del destino.<br>_Se muestra como paquete_ |
| **system.net.conntrack.tcp_timeout_close** <br>(gauge) | <br>_Se muestra como segundo_ |
| **system.net.conntrack.tcp_timeout_close_wait** <br>(gauge) | <br>_Se muestra como segundo_ |
| **system.net.conntrack.tcp_timeout_established** <br>(gauge) | <br>_Se muestra como segundo_ |
| **system.net.conntrack.tcp_timeout_fin_wait** <br>(gauge) | <br>_Se muestra como segundo_ |
| **system.net.conntrack.tcp_timeout_last_ack** <br>(gauge) | <br>_Se muestra como segundo_ |
| **system.net.conntrack.tcp_timeout_max_retrans** <br>(gauge) | <br>_Se muestra como segundo_ |
| **system.net.conntrack.tcp_timeout_syn_recv** <br>(gauge) | <br>_Se muestra como segundo_ |
| **system.net.conntrack.tcp_timeout_syn_sent** <br>(gauge) | <br>_Se muestra como segundo_ |
| **system.net.conntrack.tcp_timeout_time_wait** <br>(gauge) | <br>_Se muestra como segundo_ |
| **system.net.conntrack.tcp_timeout_unacknowledged** <br>(gauge) | <br>_Se muestra como segundo_ |
| **system.net.conntrack.tcp_timeout** <br>(gauge) | <br>_Se muestra como segundo_ |
| **system.net.conntrack.tcp_timeout_stream** <br>(gauge) | <br>_Se muestra como segundo_ |
| **system.net.conntrack.timestamp** <br>(gauge) | Booleano para habilitar la marca temporal del flujo de seguimiento de conexiones.<br>_Se muestra como unidad_ |
| **system.net.packets_in.count** <br>(gauge) | El número de paquetes de datos recibidos por la interfaz.<br>_Se muestra como paquete_ |
| **system.net.packets_in.drop** <br>(gauge) | Número de descartes en la recepción de paquetes detectados por el controlador del dispositivo. Esta métrica solo está disponible en Linux o Windows.<br>_Se muestra como paquete_ |
| **system.net.packets_in.error** <br>(gauge) | Número de errores de recepción de paquetes detectados por el controlador del dispositivo.<br>_Se muestra como error_ |
| **system.net.packets_out.count** <br>(gauge) | El número de paquetes de datos transmitidos por la interfaz.<br>_Se muestra como paquete_ |
| **system.net.packets_out.drop** <br>(gauge) | Número de descartes en la transmisión de paquetes detectados por el controlador del dispositivo. Esta métrica solo está disponible en Linux o Windows.<br>_Se muestra como paquete_ |
| **system.net.packets_out.error** <br>(gauge) | El número de errores de transmisión de paquetes detectados por el controlador del dispositivo.<br>_Se muestra como error_ |
| **system.net.ip.in_receives** <br>(gauge) | Número de datagramas de IP recibidos (incluidos los datagramas descartados) (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_receives.count** <br>(count) | Número de datagramas de IP recibidos (incluidos los datagramas descartados) (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_header_errors** <br>(gauge) | Número de datagramas de IP recibidos descartados debido a errores en el encabezado de IP (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_header_errors.count** <br>(count) | Número de datagramas de IP recibidos descartados debido a errores en el encabezado de IP (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_addr_errors** <br>(gauge) | Número de datagramas de IP recibidos descartados debido a una dirección de IP no válida (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_addr_errors.count** <br>(count) | Número de datagramas de IP recibidos descartados debido a una dirección de IP no válida (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_unknown_protos** <br>(gauge) | Número de datagramas de IP recibidos descartados debido a un protocolo IP desconocido (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_unknown_protos.count** <br>(count) | Número de datagramas de IP recibidos descartados debido a un protocolo IP desconocido (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_discards** <br>(gauge) | Número de datagramas de IP recibidos que fueron válidos pero descartados debido a un problema de búfer (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_discards.count** <br>(count) | Número de datagramas de IP recibidos que fueron válidos pero descartados debido a un problema de búfer (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_delivers** <br>(gauge) | Número de datagramas de IP recibidos entregados a protocolos de usuario de IP (incluido ICMP) (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_delivers.count** <br>(count) | Número de datagramas de IP recibidos entregados a protocolos de usuario de IP (incluido ICMP) (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.out_requests** <br>(gauge) | Número de datagramas de IP de salida (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.out_requests.count** <br>(count) | Número de datagramas de IP de salida (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.out_discards** <br>(gauge) | Número de datagramas de IP de salida que fueron válidos pero descartados debido a un problema de búfer (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.out_discards.count** <br>(count) | Número de datagramas de IP de salida que fueron válidos pero descartados debido a un problema de búfer (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.out_no_routes** <br>(gauge) | Número de datagramas de IP de salida descartados porque no se encontró ninguna ruta (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.out_no_routes.count** <br>(count) | Número de datagramas de IP de salida descartados porque no se encontró ninguna ruta (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.forwarded_datagrams** <br>(gauge) | Número de datagramas de IP reenviados (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.forwarded_datagrams.count** <br>(count) | Número de datagramas de IP reenviados (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.reassembly_timeouts** <br>(gauge) | Número de tiempo de espera de IP activados durante el reensamblaje (Solo Linux).<br>_Se muestra como tiempo de espera_ |
| **system.net.ip.reassembly_timeouts.count** <br>(count) | Número de tiempos de espera de IP activados durante el reensamblaje (solo Linux).<br>_Se muestra como tiempo de espera_ |
| **system.net.ip.reassembly_requests** <br>(gauge) | Número de fragmentos de IP recibidos que necesitan ser reensamblados (solo Linux).|
| **system.net.ip.reassembly_requests.count** <br>(count) | Número de fragmentos de IP recibidos que necesitan ser reensamblados (solo Linux).|
| **system.net.ip.reassembly_oks** <br>(gauge) | Número de datagramas de IP reensamblados con éxito (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.reassembly_oks.count** <br>(count) | Número de datagramas de IP reensamblados con éxito (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.reassembly_fails** <br>(gauge) | Número de fallos durante el reensamblado de IP (solo Linux).|
| **system.net.ip.reassembly_fails.count** <br>(count) | Número de fallos durante el reensamblado de IP (solo Linux).|
| **system.net.ip.reassembly_overlaps** <br>(gauge) | Número de fragmentos de IP de entrada que se solapan durante el reensamblado (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.reassembly_overlaps.count** <br>(count) | Número de fragmentos de IP de entrada que se solapan durante el reensamblado (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.fragmentation_oks** <br>(gauge) | Número de datagramas de IP de salida que se fragmentaron con éxito (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.fragmentation_oks.count** <br>(count) | Número de datagramas de IP de salida que se fragmentaron con éxito (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.fragmentation_fails** <br>(gauge) | Número de datagramas de IP de salida descartados porque no se han podido fragmentar (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.fragmentation_fails.count** <br>(count) | Número de datagramas de IP de salida descartados porque no se han podido fragmentar (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.fragmentation_creates** <br>(gauge) | Número de fragmentos de IP de salida generados como resultado de la fragmentación de IP (solo Linux).|
| **system.net.ip.fragmentation_creates.count** <br>(count) | Número de fragmentos de IP de salida generados como resultado de la fragmentación de IP (solo Linux).|
| **system.net.ip.in_no_routes** <br>(gauge) | Número de datagramas de IP de entrada descartados porque no se encontró ninguna ruta (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_no_routes.count** <br>(count) | Número de datagramas de IP de entrada descartados porque no se encontró ninguna ruta (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_truncated_pkts** <br>(gauge) | Número de datagramas de IP de entrada cuyo tamaño real es menor que el campo Longitud total del encabezado IPv4 (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_truncated_pkts.count** <br>(count) | Número de datagramas de IP de entrada cuyo tamaño real es menor que el campo Longitud total del encabezado IPv4 (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_csum_errors** <br>(gauge) | Número de datagramas de IP de entrada con suma de comprobación incorrecta (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.ip.in_csum_errors.count** <br>(count) | Número de datagramas de IP de entrada con suma de checks incorrecta (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.tcp.active_opens** <br>(gauge) | Número de veces que las conexiones TCP han realizado una transición directa al estado SYN-SENT desde el estado CLOSED (solo Linux o Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp.active_opens.count** <br>(count) | Número de veces que las conexiones TCP han realizado una transición directa al estado SYN-SENT desde el estado CLOSED (solo Linux o Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp.passive_opens** <br>(gauge) | Número de veces que las conexiones TCP han realizado una transición directa al estado SYN-RCVD desde el estado LISTEN (solo Linux o Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp.passive_opens.count** <br>(count) | Número de veces que las conexiones TCP han realizado una transición directa al estado SYN-RCVD desde el estado LISTEN (solo Linux o Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp.attempt_fails** <br>(gauge) | El número de veces que las conexiones TCP han realizado una transición directa al estado CLOSED desde el estado SYN-SENT o el estado SYN-RCVD más el número de veces que las conexiones TCP han realizado una transición directa al estado LISTEN desde el estado SYN-RCVD (solo Linux o Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp.attempt_fails.count** <br>(count) | El número de veces que las conexiones TCP han realizado una transición directa al estado CLOSED desde el estado SYN-SENT o el estado SYN-RCVD más el número de veces que las conexiones TCP han realizado una transición directa al estado LISTEN desde el estado SYN-RCVD (solo Linux o Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp.established_resets** <br>(gauge) | El número de veces que las conexiones TCP han realizado una transición directa al estado CLOSED desde el estado ESTABLISHED o el estado CLOSED-WAIT (solo Linux o Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp.established_resets.count** <br>(count) | El número de veces que las conexiones TCP han realizado una transición directa al estado CLOSED desde el estado ESTABLISHED o el estado CLOSE-WAIT (solo Linux o Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp.current_established** <br>(gauge) | Número de conexiones TCP cuyo estado actual es ESTABLISHED o CLOSE-WAIT (solo Linux o Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp.connections** <br>(gauge) | El número de conexiones TCP en todos los estados excepto conexiones de escucha.<br>_Se muestra como segmento_ |
| **system.net.tcp.in_errors** <br>(gauge) | Número total de segmentos recibidos con errores (por ejemplo, sumas de checks de TCP erróneos) (solo Linux o Windows).<br>_Se muestra como paquete_ |
| **system.net.tcp.in_errors.count** <br>(count) | Número total de segmentos recibidos con errores (por ejemplo, sumas de checks TCP erróneos) (solo Linux o Windows).<br>_Se muestra como paquete_ |
| **system.net.tcp.out_resets** <br>(gauge) | El número de segmentos TCP enviados que contienen el indicador RST (solo Linux o Windows).<br>_Se muestra como paquete_ |
| **system.net.tcp.out_resets.count** <br>(count) | El número de segmentos TCP enviados que contienen el indicador RST (solo Linux o Windows).<br>_Se muestra como paquete_ |
| **system.net.tcp.in_csum_errors** <br>(gauge) | Número de segmentos TCP recibidos con una suma de check TCP errónea (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.tcp.in_csum_errors.count** <br>(count) | Número de segmentos TCP recibidos con una suma de check TCP errónea (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.tcp.failed_retransmits** <br>(gauge) | Número de paquetes TCP que no se han podido retransmitir (solo Linux)<br>_Se muestra como paquete_ |
| **system.net.tcp.failed_retransmits.count** <br>(count) | Número de paquetes TCP que no se han podido retransmitir (solo Linux)<br>_Se muestra como paquete_ |
| **system.net.tcp.in_segs** <br>(gauge) | El número de segmentos TCP recibidos (solo Linux, Solaris, o Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp.in_segs.count** <br>(count) | Número total de segmentos TCP recibidos (solo Linux, Solaris o Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp.out_segs** <br>(gauge) | El número de segmentos TCP transmitidos (solo Linux, Solaris, o Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp.out_segs.count** <br>(count) | Número total de segmentos TCP transmitidos (solo Linux, Solaris o Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp.rcv_packs** <br>(gauge) | El número de paquetes TCP recibidos (solo BSD).<br>_Se muestra como paquete_ |
| **system.net.tcp.retrans_packs** <br>(gauge) | El número de paquetes TCP retransmitidos (solo BSD).<br>_Se muestra como paquete_ |
| **system.net.tcp.retrans_segs** <br>(gauge) | El número de segmentos TCP retransmitidos (solo Linux, Solaris, o Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp.retrans_segs.count** <br>(count) | Número total de segmentos TCP retransmitidos (solo Linux, Solaris o Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp.sent_packs** <br>(gauge) | El número de paquetes TCP transmitidos (solo BSD).<br>_Se muestra como paquete_ |
| **system.net.tcp.listen_overflows** <br>(gauge) | El número de veces que las conexiones han desbordado el búfer de aceptación (solo Linux). Disponible desde el Agent v5.14.0.|
| **system.net.tcp.listen_overflows.count** <br>(count) | Número total de veces que las conexiones han desbordado el búfer de aceptación (solo Linux).|
| **system.net.tcp.listen_drops** <br>(gauge) | El número de veces que las conexiones han abandonado la escucha (solo Linux). Disponible desde el Agent v5.14.0.|
| **system.net.tcp.listen_drops.count** <br>(count) | Número total de veces que las conexiones han abandonado la escucha (solo en Linux).|
| **system.net.tcp.backlog_drops** <br>(gauge) | El número de paquetes descartados porque no había espacio en el backlog TCP (solo Linux). Disponible desde el Agent v5.14.0.<br>_Se muestra como paquete_ |
| **system.net.tcp.backlog_drops.count** <br>(count) | Número total de paquetes descartados porque no había espacio en el backlog TCP (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.tcp.prune_called** <br>(gauge) | El número de veces que se llamó a la poda TCP (solo Linux).|
| **system.net.tcp.prune_called.count** <br>(count) | Número total de veces que se ha llamado a la poda TCP (solo Linux).|
| **system.net.tcp.prune_rcv_drops** <br>(gauge) | El número de paquetes recibidos descartados tras una poda fallida (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.tcp.prune_rcv_drops.count** <br>(count) | Número total de paquetes recibidos descartados tras una poda fallida (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.tcp.prune_ofo_called** <br>(gauge) | El número de veces que se podaron las colas fuera de orden (solo Linux).|
| **system.net.tcp.prune_ofo_called.count** <br>(count) | Número total de veces que se podaron las colas fuera de orden (solo Linux).|
| **system.net.tcp.paws_connection_drops** <br>(gauge) | El número de paquetes SYN-ACK descartados por PAWS (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.tcp.paws_connection_drops.count** <br>(count) | Número total de paquetes SYN-ACK descartados por PAWS (solo Linux).|
| **system.net.tcp.paws_established_drops** <br>(gauge) | El número de paquetes descartados por PAWS en una conexión establecida (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.tcp.paws_established_drops.count** <br>(count) | Número total de paquetes descartados por PAWS en una conexión establecida (solo Linux).|
| **system.net.tcp.syn_cookies_sent** <br>(gauge) | El número de paquetes de cookie SYN enviados (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.tcp.syn_cookies_sent.count** <br>(count) | Número total de paquetes de cookie SYN enviados (solo Linux).|
| **system.net.tcp.syn_cookies_recv** <br>(gauge) | El número de paquetes de cookie SYN recibidos (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.tcp.syn_cookies_recv.count** <br>(count) | Número total de paquetes de cookie SYN recibidos (solo Linux).|
| **system.net.tcp.syn_cookies_failed** <br>(gauge) | El número de paquetes de cookie SYN fallidos recibidos (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.tcp.syn_cookies_failed.count** <br>(count) | Número total de paquetes de cookie SYN fallidos recibidos (solo Linux).|
| **system.net.tcp.abort_on_timeout** <br>(gauge) | El número de sockets cerrados debido a tiempo de inactividad (retransmisión máxima alcanzada o tcp keepalive timeout) (solo Linux).|
| **system.net.tcp.abort_on_timeout.count** <br>(count) | Número total de sockets cerrados por tiempo de inactividad (retransmisión máxima alcanzada o tcp keepalive timeout) (solo Linux).|
| **system.net.tcp.syn_retrans** <br>(gauge) | El número de paquetes SYN retransmitidos (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.tcp.syn_retrans.count** <br>(count) | Número total de paquetes SYN retransmitidos (solo Linux).|
| **system.net.tcp.from_zero_window** <br>(gauge) | El número de sockets que salen de un estado de intervalo cero (solo Linux).|
| **system.net.tcp.from_zero_window.count** <br>(count) | Número total de sockets que salen de un estado de intervalo cero (solo Linux).|
| **system.net.tcp.to_zero_window** <br>(gauge) | El número de sockets que entran en estado de intervalo cero (solo Linux).|
| **system.net.tcp.to_zero_window.count** <br>(count) | Número total de sockets que entran en estado de intervalo cero (solo Linux).|
| **system.net.tcp.tw_reused** <br>(gauge) | El número de sockets de tiempo de espera reutilizados (solo Linux).|
| **system.net.tcp.tw_reused.count** <br>(count) | Número total de sockets de tiempo de espera reutilizados (solo Linux).|
| **system.net.ip.reverse_path_filter** <br>(gauge) | El número de paquetes marcianos descartados por el filtro de ruta inversa (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ip.reverse_path_filter.count** <br>(count) | Número total de paquetes marcianos descartados por el filtro de ruta inversa (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.tcp.recv_q.95percentile** <br>(gauge) | El percentil 95 del tamaño de la cola de recepción TCP.<br>_Se muestra como byte_ |
| **system.net.tcp.recv_q.avg** <br>(gauge) | El tamaño medio de la cola de recepción TCP.<br>_Se muestra como byte_ |
| **system.net.tcp.recv_q.count** <br>(rate) | La tasa de conexiones.<br>_Se muestra como conexión_ |
| **system.net.tcp.recv_q.max** <br>(gauge) | El tamaño máximo de la cola de recepción TCP.<br>_Se muestra como byte_ |
| **system.net.tcp.recv_q.median** <br>(gauge) | Tamaño medio de la cola de recepción TCP.<br>_Se muestra como byte_ |
| **system.net.tcp.send_q.95percentile** <br>(gauge) | El percentil 95 del tamaño de la cola de envío TCP.<br>_Se muestra como byte_ |
| **system.net.tcp.send_q.avg** <br>(gauge) | Tamaño medio de la cola de envío TCP.<br>_Se muestra como byte_ |
| **system.net.tcp.send_q.count** <br>(rate) | La tasa de conexiones.<br>_Se muestra como conexión_ |
| **system.net.tcp.send_q.max** <br>(gauge) | El tamaño máximo de la cola de envío TCP.<br>_Se muestra como byte_ |
| **system.net.tcp.send_q.median** <br>(gauge) | Tamaño medio de la cola de envío TCP.<br>_Se muestra como byte_ |
| **system.net.tcp4.close** <br>(gauge) | El número de conexiones TCP IPv4 cerradas.<br>_Se muestra como conexión_ |
| **system.net.tcp4.close_wait** <br>(gauge) | El número de conexiones TCP IPv4 en espera de terminación.<br>_Se muestra como conexión_ |
| **system.net.tcp4.closing** <br>(gauge) | El número de conexiones de cierre TCP IPv4. <br>_Se muestra como conexión_ |
| **system.net.tcp4.estab** <br>(gauge) | El número de conexiones TCP IPv4 abiertas.<br>_Se muestra como conexión_ |
| **system.net.tcp4.established** <br>(gauge) | Número de conexiones TCP IPv4 establecidas. <br>_Se muestra como conexión_ |
| **system.net.tcp4.fin_wait_1** <br>(gauge) | El número de conexiones TCP IPv4 que esperan una solicitud de terminación de conexión o un reconocimiento de una solicitud de terminación de conexión enviada previamente.<br>_Se muestra como conexión_ |
| **system.net.tcp4.fin_wait_2** <br>(gauge) | El número de conexiones TCP IPv4 en espera de una solicitud de terminación de conexión.<br>_Se muestra como conexión_ |
| **system.net.tcp4.listen** <br>(gauge) | El número de conexiones TCP IPv4 a la escucha.<br>_Se muestra como conexión_ |
| **system.net.tcp4.listening** <br>(gauge) | Número de conexiones TCP IPv4 a la escucha. <br>_Se muestra como conexión_ |
| **system.net.tcp4.opening** <br>(gauge) | Número de conexiones TCP IPv4 abiertas. <br>_Se muestra como conexión_ |
| **system.net.tcp4.syn_recv** <br>(gauge) | El número de conexiones TCP IPv4 en espera de confirmar la solicitud de conexión.<br>_Se muestra como conexión_ |
| **system.net.tcp4.syn_sent** <br>(gauge) | Número de conexiones TCP IPv4 en espera de una solicitud de conexión coincidente.<br>_Se muestra como conexión_ |
| **system.net.tcp4.time_wait** <br>(gauge) | El número de conexiones TCP IPv4 cerradas en espera de paquetes retrasados.<br>_Se muestra como conexión_ |
| **system.net.tcp4.unconn** <br>(gauge) | El número de conexiones TCP IPv4 en estado desconectado.<br>_Se muestra como conexión_ |
| **system.net.tcp4.active_opens** <br>(gauge) | Número de veces que las conexiones TCP IPv4 han realizado una transición directa al estado SYN-SENT desde el estado CLOSED (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp4.active_opens.count** <br>(count) | Número de veces que las conexiones TCP IPv4 han realizado una transición directa al estado SYN-SENT desde el estado CLOSED (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp4.connections** <br>(gauge) | El número de conexiones TCP IPv4 en todos los estados excepto las conexiones de escucha (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp4.passive_opens** <br>(gauge) | Número de veces que las conexiones TCP IPv4 han realizado una transición directa al estado SYN-RCVD desde el estado LISTEN (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp4.passive_opens.count** <br>(count) | Número de veces que las conexiones TCP IPv4 han realizado una transición directa al estado SYN-RCVD desde el estado LISTEN (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp4.attempt_fails** <br>(gauge) | El número de veces que las conexiones TCP IPv4 han realizado una transición directa al estado CLOSED desde el estado SYN-SENT o el estado SYN-RCVD más el número de veces que las conexiones TCP IPv4 han realizado una transición directa al estado LISTEN desde el estado SYN-RCVD (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp4.attempt_fails.count** <br>(count) | El número de veces que las conexiones TCP IPv4 han realizado una transición directa al estado CLOSED desde el estado SYN-SENT o el estado SYN-RCVD más el número de veces que las conexiones TCP IPv4 han realizado una transición directa al estado LISTEN desde el estado SYN-RCVD (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp4.established_resets** <br>(gauge) | El número de veces que las conexiones TCP IPv4 han realizado una transición directa al estado CLOSED desde el estado ESTABLISHED o el estado CLOSE-WAIT (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp4.established_resets.count** <br>(count) | El número de veces que las conexiones TCP IPv4 han realizado una transición directa al estado CLOSED desde el estado ESTABLISHED o el estado CLOSE-WAIT (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp4.current_established** <br>(gauge) | El número de conexiones TCP IPv4 establecidas actualmente (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp4.in_errors** <br>(gauge) | Número total de segmentos recibidos por error (por ejemplo, sumas de checks TCP IPv4 erróneos) (solo Windows).<br>_Se muestra como paquete_ |
| **system.net.tcp4.in_errors.count** <br>(count) | Número total de segmentos recibidos con errores (por ejemplo, sumas de checks TCP IPv4 erróneos) (solo Windows).<br>_Se muestra como paquete_ |
| **system.net.tcp4.out_resets** <br>(gauge) | Número de segmentos TCP IPv4 enviados que contienen el indicador RST (solo Windows).<br>_Se muestra como paquete_ |
| **system.net.tcp4.out_resets.count** <br>(count) | Número de segmentos TCP IPv4 enviados que contienen el indicador RST (solo Windows).<br>_Se muestra como paquete_ |
| **system.net.tcp4.in_segs** <br>(gauge) | El número de segmentos TCP IPv4 recibidos (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp4.in_segs.count** <br>(count) | Número total de segmentos TCP IPv4 recibidos (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp4.out_segs** <br>(gauge) | El número de segmentos TCP IPv4 transmitidos (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp4.out_segs.count** <br>(count) | Número total de segmentos TCP IPv4 transmitidos (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp4.retrans_segs** <br>(gauge) | El número de segmentos TCP IPv4 retransmitidos (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp4.retrans_segs.count** <br>(count) | Número total de segmentos TCP IPv4 retransmitidos (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp6.close** <br>(gauge) | El número de conexiones TCP IPv6 cerradas.<br>_Se muestra como conexión_ |
| **system.net.tcp6.close_wait** <br>(gauge) | El número de conexiones TCP IPv6 en espera de terminación.<br>_Se muestra como conexión_ |
| **system.net.tcp6.closing** <br>(gauge) | Número de conexiones TCP IPv6 que se están cerrando. <br>_Se muestra como conexión_ |
| **system.net.tcp6.estab** <br>(gauge) | El número de conexiones TCP IPv6 abiertas.<br>_Se muestra como conexión_ |
| **system.net.tcp6.established** <br>(gauge) | Número de conexiones TCP IPv6 establecidas. <br>_Se muestra como conexión_ |
| **system.net.tcp6.fin_wait_1** <br>(gauge) | El número de conexiones TCP IPv6 que esperan una solicitud de terminación de conexión o un reconocimiento de una solicitud de terminación de conexión enviada previamente.<br>_Se muestra como conexión_ |
| **system.net.tcp6.fin_wait_2** <br>(gauge) | El número de conexiones TCP IPv6 en espera de una solicitud de terminación de conexión.<br>_Se muestra como conexión_ |
| **system.net.tcp6.listen** <br>(gauge) | El número de conexiones TCP IPv6 a la escucha.<br>_Se muestra como conexión_ |
| **system.net.tcp6.listening** <br>(gauge) | Número de conexiones TCP IPv6 a la escucha. <br>_Se muestra como conexión_ |
| **system.net.tcp6.opening** <br>(gauge) | Número de conexiones TCP IPv6 abiertas. <br>_Se muestra como conexión_ |
| **system.net.tcp6.syn_recv** <br>(gauge) | El número de conexiones TCP IPv6 en espera de confirmar la solicitud de conexión.<br>_Se muestra como conexión_ |
| **system.net.tcp6.syn_sent** <br>(gauge) | El número de conexiones TCP IPv6 en espera de una solicitud de conexión coincidente.<br>_Se muestra como conexión_ |
| **system.net.tcp6.time_wait** <br>(gauge) | El número de conexiones TCP IPv6 cerradas en espera de paquetes retrasados.<br>_Se muestra como conexión_ |
| **system.net.tcp6.unconn** <br>(gauge) | El número de conexiones TCP IPv6 en estado desconectado.<br>_Se muestra como conexión_ |
| **system.net.tcp6.active_opens** <br>(gauge) | Número de veces que las conexiones TCP IPv6 han realizado una transición directa al estado SYN-SENT desde el estado CLOSED (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp6.active_opens.count** <br>(count) | Número de veces que las conexiones TCP IPv6 han realizado una transición directa al estado SYN-SENT desde el estado CLOSED (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp6.connections** <br>(gauge) | El número de conexiones TCP IPv6 en todos los estados excepto las conexiones de escucha (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp6.passive_opens** <br>(gauge) | Número de veces que las conexiones TCP IPv6 han realizado una transición directa al estado SYN-RCVD desde el estado LISTEN (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp6.passive_opens.count** <br>(count) | Número de veces que las conexiones TCP IPv6 han realizado una transición directa al estado SYN-RCVD desde el estado LISTEN (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp6.attempt_fails** <br>(gauge) | El número de veces que las conexiones TCP IPv6 han realizado una transición directa al estado CLOSED desde el estado SYN-SENT o el estado SYN-RCVD más el número de veces que las conexiones TCP IPv6 han realizado una transición directa al estado LISTEN desde el estado SYN-RCVD (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp6.attempt_fails.count** <br>(count) | El número de veces que las conexiones TCP IPv6 han realizado una transición directa al estado CLOSED desde el estado SYN-SENT o el estado SYN-RCVD más el número de veces que las conexiones TCP IPv6 han realizado una transición directa al estado LISTEN desde el estado SYN-RCVD (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp6.established_resets** <br>(gauge) | El número de veces que las conexiones TCP IPv6 han realizado una transición directa al estado CLOSED desde el estado ESTABLISHED o el estado CLOSE-WAIT (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp6.established_resets.count** <br>(count) | El número de veces que las conexiones TCP IPv6 han realizado una transición directa al estado CLOSED desde el estado ESTABLISHED o el estado CLOSE-WAIT (solo Windows).<br>_Se muestra como conexión_ |
| **system.net.tcp6.current_established** <br>(gauge) | El número de conexiones TCP IPv6 establecidas actualmente (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp6.in_errors** <br>(gauge) | El número total de segmentos recibidos por error (por ejemplo, sumas de checks TCP IPv6 erróneos) (solo Windows).<br>_Se muestra como paquete_ |
| **system.net.tcp6.in_errors.count** <br>(count) | El número total de segmentos recibidos por error (por ejemplo, sumas de checks TCP IPv6 erróneos) (solo Windows).<br>_Se muestra como paquete_ |
| **system.net.tcp6.out_resets** <br>(gauge) | Número de segmentos TCP IPv6 enviados que contienen el indicador RST (solo Windows).<br>_Se muestra como paquete_ |
| **system.net.tcp6.out_resets.count** <br>(count) | Número de segmentos TCP IPv6 enviados que contienen el indicador RST (solo Windows).<br>_Se muestra como paquete_ |
| **system.net.tcp6.in_segs** <br>(gauge) | El número de segmentos TCP IPv6 recibidos (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp6.in_segs.count** <br>(count) | Número total de segmentos TCP IPv6 recibidos (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp6.out_segs** <br>(gauge) | El número de segmentos TCP IPv6 transmitidos (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp6.out_segs.count** <br>(count) | Número total de segmentos TCP IPv6 transmitidos (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp6.retrans_segs** <br>(gauge) | El número de segmentos TCP IPv6 retransmitidos (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.tcp6.retrans_segs.count** <br>(count) | Número total de segmentos TCP IPv6 retransmitidos (solo Windows).<br>_Se muestra como segmento_ |
| **system.net.udp.in_datagrams** <br>(gauge) | La tasa de datagramas UDP entregados a usuarios UDP (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.udp.in_datagrams.count** <br>(count) | Número total de datagramas UDP entregados a usuarios UDP (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.udp.in_errors** <br>(gauge) | La tasa de datagramas UDP recibidos que no pudieron entregarse por razones distintas a la falta de una aplicación en el puerto de destino (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.udp.in_errors.count** <br>(count) | Número total de datagramas UDP recibidos que no se han podido entregar por razones distintas a la falta de una aplicación en el puerto de destino (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.udp.no_ports** <br>(gauge) | La tasa de datagramas UDP recibidos para los que no había ninguna aplicación en el puerto de destino (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.udp.no_ports.count** <br>(count) | Número total de datagramas UDP recibidos para los que no había ninguna aplicación en el puerto de destino (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.udp.out_datagrams** <br>(gauge) | La tasa de datagramas UDP enviados desde esta entidad (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.udp.out_datagrams.count** <br>(count) | Número total de datagramas UDP enviados desde esta entidad (solo Linux).<br>_Se muestra como datagrama_ |
| **system.net.udp.rcv_buf_errors** <br>(gauge) | La tasa de datagramas UDP perdidos porque no había espacio en el búfer de recepción (solo Linux).<br>_Se muestra como error_ |
| **system.net.udp.rcv_buf_errors.count** <br>(count) | Número total de datagramas UDP perdidos porque no había espacio en el búfer de recepción (solo Linux).<br>_Se muestra como error_ |
| **system.net.udp.snd_buf_errors** <br>(gauge) | La tasa de datagramas UDP perdidos porque no había espacio en el búfer de envío (solo Linux).<br>_Se muestra como error_ |
| **system.net.udp.snd_buf_errors.count** <br>(count) | Número total de datagramas UDP perdidos porque no había espacio en el búfer de envío (solo Linux).<br>_Se muestra como error_ |
| **system.net.udp.in_csum_errors** <br>(gauge) | Porcentaje de datagramas UDP que no han superado la verificación de la suma de checks (solo Linux).<br>_Se muestra como error_ |
| **system.net.udp.in_csum_errors.count** <br>(count) | Número total de datagramas UDP que no han superado la verificación de la suma de checks (solo Linux).<br>_Se muestra como error_ |
| **system.net.udp4.connections** <br>(gauge) | El número de sockets UDP IPv4 abiertos actualmente.<br>_Se muestra como conexión_ |
| **system.net.udp6.connections** <br>(gauge) | El número de sockets UDP IPv6 abiertos actualmente.<br>_Se muestra como conexión_ |
| **system.net.ena.queue.rx_cnt** <br>(count) | El número de paquetes recibidos por una cola (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ena.queue.rx_bytes** <br>(count) | El número de bytes recibidos por una cola (solo Linux).<br>_Se muestra como byte_ |
| **system.net.ena.queue.rx_bad_csum** <br>(count) | El número de paquetes recibidos por una cola con una suma de checks incorrectos (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ena.queue.rx_good_csum** <br>(count) | El número de paquetes recibidos por una cola con una suma de checks correctos (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ena.queue.rx_csum_good** <br>(count) | El número de paquetes recibidos por una cola con una suma de checks correctos (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ena.queue.rx_csum_unchecked** <br>(count) | El número de paquetes recibidos por una cola con una suma de checks sin marcar (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ena.queue.rx_rx_copybreak_pkt** <br>(count) | El número de paquetes recibidos por una cola copiados en el encabezado skb por ser más pequeños que el umbral de copybreak (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ena.queue.rx_refil_partial** <br>(count) | El número de veces que una cola ha tenido búferes rx parcialmente asignados (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.ena.queue.rx_page_alloc_fail** <br>(count) | El número de fallos de asignación de página (solo Linux).<br>_Se muestra como error_ |
| **system.net.ena.queue.rx_skb_alloc_fail** <br>(count) | El número de fallos en la asignación de búferes de socket (solo Linux).<br>_Se muestra como error_ |
| **system.net.ena.queue.rx_dma_mapping_err** <br>(count) | El número de errores de asignación dma para una cola rx (solo Linux).<br>_Se muestra como error_ |
| **system.net.ena.queue.rx_bad_desc_num** <br>(count) | El número de veces que se han recibido demasiados descriptores (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.ena.queue.rx_bad_req_id** <br>(count) | El número de veces que un identificador de solicitud no fue válido en una cola de recepción (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.ena.queue.rx_empty_rx_ring** <br>(count) | El número de veces que el anillo rx estuvo vacío para una cola (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.ena.queue.rx_xdp_aborted** <br>(count) | El número de paquetes XPD etiquetados como XDP_ABORTED (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ena.queue.rx_xdp_drop** <br>(count) | El número de paquetes XDP etiquetados como XDP_DROP (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ena.queue.rx_xdp_pass** <br>(count) | El número de paquetes XDP etiquetados como XDP_PASS (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ena.queue.rx_xdp_tx** <br>(count) | El número de paquetes XDP etiquetados como XDP_TX (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ena.queue.rx_xdp_invalid** <br>(count) | El número de paquetes XDP etiquetados como XDP_INVALID (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ena.queue.rx_xdp_redirect** <br>(count) | El número de paquetes XDP etiquetados como XDP_REDIRECT (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ena.queue.tx_cnt** <br>(count) | El número de paquetes enviados por una cola (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ena.queue.tx_bytes** <br>(count) | El número de bytes enviados por una cola (solo Linux).<br>_Se muestra como byte_ |
| **system.net.ena.queue.tx_dma_mapping_err** <br>(count) | El número de errores de asignación dma para una cola tx (solo Linux).<br>_Se muestra como error_ |
| **system.net.ena.queue.tx_bad_req_id** <br>(count) | El número de veces que un identificador de solicitud no fue válido en una cola de transmisión (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.ena.queue.tx_queue_stop** <br>(count) | El número de veces que una cola de transmisión estuvo llena y se detuvo (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.ena.queue.tx_queue_wakeup** <br>(count) | El número de veces que se reanudó una cola de transmisión después de haberse detenido (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.ena.queue.tx_linearize** <br>(count) | El número de veces que skb se linealizó en una cola de transmisión (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.ena.queue.tx_linearize_failed** <br>(count) | El número de skb de linealización fallidos en una cola de transmisión (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.ena.queue.tx_doorbells** <br>(count) | El número de timbres de la cola de envío escritos en una cola de transmisión (solo Linux).<br>_Se muestra como evento_ |
| **system.net.ena.queue.tx_prepare_ctx_err** <br>(count) | El número de veces que falló la preparación de tx en una cola de transmisión (solo Linux).<br>_Se muestra como error_ |
| **system.net.ena.queue.tx_llq_buffer_copy** <br>(count) | El número de veces que se ha copiado un encabezado skb con cola de baja latencia (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.ena.queue.tx_missed_tx** <br>(count) | El número de paquetes que han pasado el tiempo de espera en la cola de transmisión (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.ena.queue.tx_unmask_interrupt** <br>(count) | El número de veces que se desenmascaró la interrupción en una cola de transmisión (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.ena.queue.tx_napi_comp** <br>(count) | Número de veces que se ha llamado a napi_complete en una cola<br>_Se muestra como tiempo_ |
| **system.net.ena.queue.tx_tx_poll** <br>(count) | El número de veces que el identificador de napi fue programado para una cola (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.ena.tx_timeout** <br>(count) | El número de tiempos de espera de transmisión (solo Linux).<br>_Se muestra como tiempo de espera_ |
| **system.net.ena.suspend** <br>(count) | El número de veces que se suspendió el dispositivo (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.ena.resume** <br>(count) | El número de veces que se reanudó el dispositivo (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.ena.wd_expired** <br>(count) | El número de veces que expiró el evento watchdog keep-alive (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.virtio_net.queue.rx_drops** <br>(count) | El número de paquetes descartados en una cola de recepción (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.virtio_net.queue.rx_kicks** <br>(count) | El número de lanzamientos enviados al hipervisor para una cola de recepción (solo Linux).<br>_Se muestra como evento_ |
| **system.net.virtio_net.queue.rx_packets** <br>(count) | El número de paquetes recibidos por una cola (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.virtio_net.queue.rx_bytes** <br>(count) | El número de bytes recibidos por una cola (solo Linux).<br>_Se muestra como byte_ |
| **system.net.virtio_net.queue.rx_xdp_drops** <br>(count) | El número de paquetes XDP etiquetados como XDP_DROP en una cola de recepción (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.virtio_net.queue.rx_xdp_redirects** <br>(count) | El número de paquetes XDP etiquetados como XDP_REDIRECT en una cola de recepción (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.virtio_net.queue.rx_xdp_tx** <br>(count) | El número de paquetes XDP etiquetados como XDP_TX en una cola de recepción (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.virtio_net.queue.tx_kicks** <br>(count) | El número de lanzamientos enviados al hipervisor para una cola de transmisión (solo Linux).<br>_Se muestra como evento_ |
| **system.net.virtio_net.queue.tx_packets** <br>(count) | El número de paquetes enviados por una cola de transmisión (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.virtio_net.queue.tx_bytes** <br>(count) | El número de bytes enviados por una cola de transmisión (solo Linux).<br>_Se muestra como byte_ |
| **system.net.virtio_net.queue.tx_xdp_tx** <br>(count) | El número de paquetes XDP etiquetados como XDP_TX en una cola de transmisión (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.virtio_net.queue.tx_xdp_tx_drops** <br>(count) | El número de paquetes XDP etiquetados como XDP_DROP en una cola de transmisión (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.hv_netvsc.queue.rx_bytes** <br>(count) | El número de bytes recibidos por una cola (solo Linux).<br>_Se muestra como byte_ |
| **system.net.hv_netvsc.queue.rx_packets** <br>(count) | El número de paquetes recibidos por una cola (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.hv_netvsc.queue.rx_xdp_drop** <br>(count) | El número de paquetes XDP etiquetados como XDP_DROP en una cola de recepción (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.hv_netvsc.queue.tx_bytes** <br>(count) | El número de bytes enviados por una cola (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.hv_netvsc.queue.tx_packets** <br>(count) | El número de paquetes enviados por una cola (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.hv_netvsc.cpu.rx_packets** <br>(count) | El número de paquetes recibidos procesados por una cpu (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.hv_netvsc.cpu.vf_rx_packets** <br>(count) | El número de paquetes recibidos procesados por una cpu usando la función virtual (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.hv_netvsc.cpu.rx_bytes** <br>(count) | El número de bytes recibidos procesados por una cpu (solo Linux).<br>_Se muestra como byte_ |
| **system.net.hv_netvsc.cpu.vf_rx_bytes** <br>(count) | El número de paquetes recibidos procesados por una cpu utilizando la función virtual (solo Linux).<br>_Se muestra como byte_ |
| **system.net.hv_netvsc.cpu.tx_packets** <br>(count) | El número de paquetes enviados procesados por una cpu (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.hv_netvsc.cpu.vf_tx_packets** <br>(count) | El número de paquetes enviados procesados por una cpu usando la función virtual (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.hv_netvsc.cpu.tx_bytes** <br>(count) | El número de bytes enviados procesados por una cpu (solo Linux).<br>_Se muestra como byte_ |
| **system.net.hv_netvsc.cpu.vf_tx_bytes** <br>(count) | El número de paquetes enviados procesados por una cpu usando la función virtual (solo Linux).<br>_Se muestra como byte_ |
| **system.net.hv_netvsc.tx_scattered** <br>(count) | El número de transmisiones excede el número máximo de página. Esto activará una linealización del búfer del socket para intentar reducir el número de páginas necesarias (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.hv_netvsc.tx_no_memory** <br>(count) | El número de transmisiones fallidas debido a un error de asignación (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.hv_netvsc.tx_no_space** <br>(count) | El número de transmisiones fallidas debido a un búfer de anillo lleno (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.hv_netvsc.tx_too_big** <br>(count) | El número de transmisiones descartadas debido a que se ha superado el número máximo de página incluso después de la linealización del búfer del socket (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.hv_netvsc.tx_busy** <br>(count) | El número de transmisiones fallidas debido a una cola ocupada (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.hv_netvsc.tx_send_full** <br>(count) | El número de veces que se llenó un búfer de envío (solo Linux).<br>_Se muestra como error_ |
| **system.net.hv_netvsc.rx_comp_busy** <br>(count) | El número de solicitudes de finalización que fallaron (solo Linux).<br>_Se muestra como error_ |
| **system.net.hv_netvsc.rx_no_memory** <br>(count) | El número de recepciones fallidas debido a un error de asignación (solo Linux).<br>_Se muestra como error_ |
| **system.net.hv_netvsc.stop_queue** <br>(count) | El número de veces que se ha detenido una cola (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.hv_netvsc.wake_queue** <br>(count) | El número de veces que se ha despertado una cola (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.gve.queue.rx_posted_desc** <br>(count) | El número de descriptores publicados en una cola de recepción (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.gve.queue.rx_completed_desc** <br>(count) | El número de descriptores completados en una cola de recepción (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.gve.queue.rx_bytes** <br>(count) | El número de bytes enviados por una cola de recepción (solo Linux).<br>_Se muestra como byte_ |
| **system.net.gve.queue.rx_dropped_pkt** <br>(count) | El número de paquetes descartados debido a errores en el descriptor (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.gve.queue.rx_copybreak_pkt** <br>(count) | El número de paquetes copiados en el encabezado del buffer del socket porque son más pequeños que el umbral de copybreak (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.gve.queue.rx_copied_pkt** <br>(count) | El número de paquetes copiados (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.gve.queue.rx_queue_drop_cnt** <br>(count) | Número de paquetes descartados. Estadísticas de NIC (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.gve.queue.rx_no_buffers_posted** <br>(count) | Número de veces que no hay búfer disponible para el descriptor de publicación. Estadísticas de NIC (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.gve.queue.rx_drops_packet_over_mru** <br>(count) | Número de paquetes descartados por exceder la Unidad Máxima de Recepción. Estadísticas de NIC (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.gve.queue.rx_drops_invalid_checksum** <br>(count) | Número de paquetes descartados debido a una suma de checks no válidos. Estadísticas de NIC (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.gve.queue.tx_posted_desc** <br>(count) | El número de descriptores publicados en una cola de transmisión (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.gve.queue.tx_completed_desc** <br>(count) | El número de descriptores completados en una cola de transmisión (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.gve.queue.tx_bytes** <br>(count) | El número de bytes enviados por una cola de transmisión (solo Linux).<br>_Se muestra como byte_ |
| **system.net.gve.queue.tx_wake** <br>(count) | El número de veces que se ha despertado la cola de transmisión (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.gve.queue.tx_stop** <br>(count) | El número de veces que se detuvo la cola de transmisión (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.gve.queue.tx_event_counter** <br>(count) | El número de evento para esta cola de transmisión (solo Linux).<br>_Se muestra como evento_ |
| **system.net.gve.queue.tx_dma_mapping_error** <br>(count) | El número de errores de asignación de acceso directo a memoria para una cola de transmisión (solo Linux).<br>_Se muestra como error_ |
| **system.net.gve.tx_timeouts** <br>(count) | El número de veces que una cola de transmisión ha agotado el tiempo de espera (solo Linux).<br>_Se muestra como tiempo_ |
| **system.net.gve.rx_skb_alloc_fail** <br>(count) | Número de fallos en la asignación de búferes de socket para una cola de recepción (solo Linux).<br>_Se muestra como error_ |
| **system.net.gve.rx_buf_alloc_fail** <br>(count) | El número de fallos de asignación de búfer para una cola de recepción (solo Linux).<br>_Se muestra como error_ |
| **system.net.gve.rx_desc_err_dropped_pkt** <br>(count) | El número de paquetes descartados debido a un error en el descriptor (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.gve.page_alloc_fail** <br>(count) | El número de errores de asignación de página (solo Linux).<br>_Se muestra como error_ |
| **system.net.gve.dma_mapping_error** <br>(count) | El número de errores de asignación de Acceso Directo a Memoria (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.queue.rx_arfs_err** <br>(count) | Número de reglas de flujo que no se han podido añadir a la tabla de flujos (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.queue.rx_buff_alloc_err** <br>(count) | Fallo al asignar un búfer al paquete recibido (o SKB) en el anillo i (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.queue.rx_recover** <br>(count) | El número de veces que se recuperó el RQ (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.queue.rx_tls_err** <br>(count) | Número de veces que la descarga TLS de CQE generó problemas (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.queue.rx_tls_resync_res_retry** <br>(count) | Número de veces que se ha reintentado la llamada de respuesta de resincronización TLS al controlador cuando ICOSQ está lleno (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.queue.rx_tls_resync_req_skip** <br>(count) | Número de veces que el procedimiento de solicitud de resincronización asíncrona TLS se inició pero no finalizó correctamente (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.queue.rx_wqe_err** <br>(count) | El número de opcodes erróneos recibidos en el anillo i (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.queue.rx_xdp_tx_err** <br>(count) | Número de veces que se ha producido un error XDP_TX, como un frame demasiado largo o demasiado corto, en el anillo XDP_TX del anillo RX (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.queue.rx_xdp_tx_full** <br>(count) | El número de paquetes que deberían haber sido reenviados al puerto debido a la acción XDP_TX pero que fueron descartados debido a que la cola de tx estaba llena (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.queue.tx_cqe_err** <br>(count) | El número de CQEs de error encontrados en el SQ para el anillo i (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.queue.tx_dropped** <br>(count) | Paquetes transmitidos que se descartaron debido a un fallo de asignación DMA en el anillo i (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.queue.tx_recover** <br>(count) | El número de veces que se recuperó el SQ (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.ch_arm** <br>(count) | El número de veces que la función de sondeo NAPI completó y armó las colas de finalización (solo Linux).<br>_Se muestra como evento_ |
| **system.net.mlx5_core.ch_eq_rearm** <br>(count) | El número de veces que se recuperó el ecualizador (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.ch_poll** <br>(count) | El número de invocaciones de la función de sondeo NAPI (solo Linux).<br>_Se muestra como evento_ |
| **system.net.mlx5_core.link_down_events_phy** <br>(count) | El número de veces en que el estado operativo del enlace cambió a fuera de funcionamiento (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.module_bad_shorted** <br>(count) | El número de veces que los cables del módulo entraron en cortocircuito (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.module_bus_stuck** <br>(count) | Número de veces que se ha detectado un cortocircuito en el bus I2C de ese módulo (datos o reloj) (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.module_high_temp** <br>(count) | El número de veces que la temperatura del módulo fue demasiado alta (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.rx_bytes** <br>(count) | El número de bytes recibidos (solo Linux).<br>_Se muestra como bytes_ |
| **system.net.mlx5_core.rx_crc_errors_phy** <br>(count) | El número de paquetes recibidos descartados debido a un error FCS (Frame Check Sequence) en el puerto físico (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_csum_complete** <br>(count) | Paquetes recibidos con un CHECKSUM_COMPLETE (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_csum_none** <br>(count) | Paquetes recibidos con un CHECKSUM_NONE (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_csum_unnecessary** <br>(count) | Paquetes recibidos con un CHECKSUM_UNNECESSARY (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_discards_phy** <br>(count) | Número de paquetes recibidos que se han descartado por falta de memoria intermedia en un puerto físico (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_fragments_phy** <br>(count) | Número de paquetes recibidos descartados debido a una longitud inferior a 64 bytes y con error FCS en un puerto físico (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_in_range_len_errors_phy** <br>(count) | El número de paquetes recibidos descartados debido a errores de longitud/tipo en un puerto físico (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_jabbers_phy** <br>(count) | Número de paquetes recibidos debido a una longitud superior a 64 bytes y con error FCS en un puerto físico (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_out_of_buffer** <br>(count) | Número de veces que la cola de recepción no tenía búferes de software asignados para el tráfico entrante del adaptador (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.rx_out_of_range_len_phy** <br>(count) | El número de paquetes recibidos descartados debido a una longitud superior a la permitida en un puerto físico (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_oversize_pkts_buffer** <br>(count) | El número de paquetes recibidos descartados debido a la longitud que llegaron a RQ y exceden el tamaño del búfer de software asignado por el dispositivo para el tráfico entrante (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_oversize_pkts_phy** <br>(count) | El número de paquetes recibidos descartados debido a la longitud que excede el tamaño MTU en un puerto físico (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_oversize_pkts_sw_drop** <br>(count) | Número de paquetes recibidos descartados en software porque los datos CQE son mayores que el tamaño MTU (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_packets** <br>(count) | El número de paquetes recibidos (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_pp_alloc_empty** <br>(count) | El contador se incrementa cuando el anillo ptr está vacío por lo que se forzó una asignación de ruta lenta (solo Linux).<br>_Se muestra como evento_ |
| **system.net.mlx5_core.rx_steer_missed_packets** <br>(count) | Número de paquetes recibidos por el NIC pero descartados por no coincidir con ningún flujo de la tabla de flujos del NIC (solo Linux).<br>_Se muestra como paquete_. |
| **system.net.mlx5_core.rx_symbol_err_phy** <br>(count) | El número de paquetes recibidos descartados debido a errores de codificación física (errores de símbolo) en un puerto físico (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_undersize_pkts_phy** <br>(count) | Número de paquetes recibidos descartados debido a una longitud inferior a 64 bytes en un puerto físico (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_unsupported_op_phy** <br>(count) | El número de paquetes de control MAC recibidos con opcode no admitido en un puerto físico (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_xdp_drop** <br>(count) | El número de paquetes descartados debido a la acción XDP_DROP del programa XDP (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.rx_xdp_redirect** <br>(count) | El número de veces que se activó una acción de redirección XDP (solo Linux).<br>_Se muestra como evento_ |
| **system.net.mlx5_core.rx_xdp_tx_err** <br>(count) | Número de veces que se ha producido un error XDP_TX, como un frame demasiado largo o demasiado corto, en el anillo XDP_TX del anillo RX (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.rx_xsk_buff_alloc_err** <br>(count) | El número de veces que falló la asignación de un búfer skb o XSK en el contexto XSK RQ (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.tx_bytes** <br>(count) | El número de bytes enviados (solo Linux).<br>_Se muestra como byte_ |
| **system.net.mlx5_core.tx_discards_phy** <br>(count) | El número de paquetes que se descartaron en la transmisión aunque no se detectaran errores (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.tx_errors_phy** <br>(count) | El número de paquetes transmitidos descartados debido a una longitud que excede el tamaño MTU en un puerto físico (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.tx_packets** <br>(count) | El número de paquetes enviados (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.tx_queue_dropped** <br>(count) | Paquetes transmitidos que se descartaron debido a un fallo de asignación DMA (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.tx_queue_stopped** <br>(count) | Eventos en los que SQ estaba lleno (solo Linux).<br>_Se muestra como evento_ |
| **system.net.mlx5_core.tx_queue_wake** <br>(count) | Eventos en los que SQ estaba lleno y ha pasado a no estarlo (solo Linux).<br>_Se muestra como evento_ |
| **system.net.mlx5_core.tx_xdp_err** <br>(count) | El número de paquetes redirigidos a la interfaz (debido a la redirección XDP) pero que fueron descartados debido a errores como un frame demasiado largo y demasiado corto (solo Linux).<br>_Se muestra como paquete_ |
| **system.net.mlx5_core.tx_xsk_err** <br>(count) | Número de errores que se han producido en el modo de zerocopy XSK como, por ejemplo, si el tamaño de los datos es mayor que el tamaño de la MTU (solo Linux).<br>_Se muestra como error_ |
| **system.net.mlx5_core.tx_xsk_full** <br>(count) | Número de veces que suena el timbre en modo zerocopy XSK cuando SQ está lleno (solo Linux).<br>_Se muestra como error_ |

**Nota**: Las métricas `system.net.conntrack` están disponibles con el Agent v6.12+. Consulta el [CHANGELOG](https://github.com/DataDog/integrations-core/blob/master/network/CHANGELOG.md#1110--2019-05-14) para obtener más información.

### Eventos

El check de red no incluye ningún evento.

### Checks de servicio

El check de red no incluye ningún check de servicio.

## Solucionar problemas

- [Enviar métricas de host TCP/UDP a la API de Datadog](https://docs.datadoghq.com/integrations/guide/send-tcp-udp-host-metrics-to-the-datadog-api/)

## Referencias adicionales

- [Crear un monitor de red en un check HTTP](https://docs.datadoghq.com/monitors/monitor_types/network/)
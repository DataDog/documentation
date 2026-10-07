---
app_id: go-metro
categories:
- languages
custom_kind: integración
description: Cálculo pasivo del TCP RTT entre hosts
integration_version: 1.3.1
media: []
supported_os:
- linux
title: Go-Metro
---
## Información general

El check de TCP RTT informa sobre los tiempos de ida y vuelta entre el host en el que se está ejecutando el Agent y cualquier host con el que se esté comunicando. Este check es pasivo y sólo informa sobre los tiempos RTT de los paquetes que se envían y reciben desde fuera del check. El propio check no envía ningún paquete.

Este check sólo se incluye en los paquetes DEB y RPM de 64 bits del Datadog Agent v5. El check no está disponible con el Datadog Agent v6.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check TCP RTT, también conocido como [go-metro](https://github.com/DataDog/go-metro), se incluye en el paquete del Agent, pero requiere bibliotecas de sistema adicionales. El check utiliza marcas temporales proporcionadas por la biblioteca PCAP para calcular el tiempo entre cualquier paquete saliente y la aceptación de TCP correspondiente. Como tal, PCAP debe ser instalado y configurado.

Los sistemas basados en Debian deben utilizar una de las siguientes opciones:

```bash
sudo apt-get install libcap
sudo apt-get install libcap2-bin
```

Los sistemas basados en Redhat deben utilizar una de las siguientes opciones:

```bash
sudo yum install libcap
sudo yum install compat-libcap1
```

Por último, configura PCAP:

```bash
sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

### Configuración

Edita el archivo `go-metro.yaml` en el directorio `conf.d` de tu agente. Consulta el [go-metro.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/go-metro/datadog_checks/go-metro/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.
El siguiente es un archivo de ejemplo que muestra los tiempos TCP RTT para app.datadoghq.com y 192.168.0.22:

```yaml
init_config:
  snaplen: 512
  idle_ttl: 300
  exp_ttl: 60
  statsd_ip: 127.0.0.1
  statsd_port: 8125
  log_to_file: true
  log_level: info
instances:
  - interface: eth0
    tags:
      - env:prod
    ips:
      - 45.33.125.153
    hosts:
      - app.datadoghq.com
```

**Nota**: Para que go-metro se ejecute sin privilegios, es necesario configurar las capacidades de `CAP_NET_RAW` en el binario:

```
# Install required libraries
$ sudo apt-get install libcap  # debian
$ sudo apt-get install libcap2-bin  # debian alternative
$ sudo yum install libcap  # redhat
$ sudo yum install compat-libcap1  # redhat alternative

# Set capabilities
$ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

Debido a los diferentes nombres de los paquetes en las distintas distribuciones, si las instrucciones anteriores no te funcionan, envía un mensaje a `apt-cache search libcap` o `yum search libcap` para obtener una lista de los paquetes que proporcionan el binario. Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/), si necesitas ayuda.

**Nota**: go-metro genera logs en su propio archivo, que se encuentra en `/var/log/datadog/go-metro.log`. Además, go-metro se ejecuta de forma autónoma, por lo que no aparece en el resultado del estado del Agent.

Por último, debido a que el binario go-metro sólo se incluye con las distribuciones RPM y DEB de 64 bits del Datadog Agent, sólo está disponible en esas versiones empaquetadas. Esto significa que go-metro no está disponible con la instalación de origen, ni con los paquetes de 32 bits.

### Validación

Para validar que el check se está ejecutando correctamente, deberías ver las métricas de `system.net.tcp.rtt` mostrándose en la interfaz de Datadog. Además, si [ejecutas el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information), deberías ver algo similar a lo siguiente:

```text
 datadog-agent.service - "Datadog Agent"
    Loaded: loaded (/lib/...datadog-agent.service; enabled; vendor preset: enabled)
    Active: active (running) since Thu 2016-03-31 20:35:27 UTC; 42min ago
  Process: 10016 ExecStop=/opt/.../supervisorctl -c /etc/dd-....conf shutdown (code=exited, status=0/SUCCESS)
  Process: 10021 ExecStart=/opt/.../start_agent.sh (code=exited, status=0/SUCCESS)
  Main PID: 10025 (supervisord)
    CGroup: /system.slice/datadog-agent.service
            |_10025 /opt/datadog-...python /opt/datadog-agent/bin/supervisord -c /etc/dd-agent/supervisor.conf
            |_10043 /opt/datadog-...python /opt/datadog-agent/agent/dogstatsd.py --use-local-forwarder
            |_10044 /opt/datadog-agent/bin/go-metro -cfg=/etc/dd-agent/conf.d/go-metro.yaml
            |_10046 /opt/datadog-.../python /opt/datadog-agent/agent/ddagent.py
            |_10047 /opt/datadog-.../python /opt/datadog-agent/agent/agent.py foreground --use-local-forwarder
```

Si el check de TCP RTT se ha iniciado, deberías ver algo similar a la línea go-metro anterior.

**Se trata de un check pasivo, por lo que no se informan métricas, a menos que se envíen paquetes activamente a los hosts mencionados en el archivo yaml.**

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **system.net.tcp.rtt** <br>(gauge) | El tiempo de ida y vuelta de TCP. Disponible desde el Agent v5.7.0.<br>_Se muestra como milisegundo_ |
| **system.net.tcp.rtt.avg** <br>(gauge) | El tiempo medio de ida y vuelta de TCP calculado normalmente por el stack tecnológico de TCP. Disponible desde el Agent v5.7.0.<br>_Se muestra como milisegundo_ |
| **system.net.tcp.rtt.jitter** <br>(gauge) | El jitter del tiempo de ida y vuelta de TCP. Disponible desde el Agent v5.7.0.<br>_Se muestra como milisegundo_ |

### Eventos

El check de Go-metro no incluye eventos.

### Checks de servicio

El check de Go-metro no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).
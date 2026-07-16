---
aliases:
- /es/integrations/tcprtt
categories:
- red
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/tcp_rtt.md
integration_id: tcp-rtt
integration_title: TCP RTT
is_public: true
name: tcp_rtt
newhlevel: true
public_title: Integración de Datadog y TCP RTT
short_description: Monitoriza la conectividad TCP a hosts remotos.
---

## Información general

El check de TCP RTT informa sobre los tiempos de ida y vuelta entre el host del Agent y cualquier host con el que se esté comunicando. Este check es pasivo y sólo informa sobre los tiempos RTT de los paquetes que se envían y reciben desde fuera del check. El propio check no envía ningún paquete.

Este check sólo se entrega con los paquetes DEB y RPM de 64 bits del Datadog Agent v5. Para otras versiones del Agent, consulta el [uso de Datadog/go-metro][1] para obtener instrucciones sobre cómo compilar el binario go-metro.

## Configuración

### Instalación

El check utiliza las marcas de tiempo proporcionadas por la librería PCAP para calcular el tiempo transcurrido entre cualquier paquete saliente y el acuse de recibo TCP correspondiente. La librería PCAP debe estar instalada y configurada.

Los sistemas basados en Debian deben utilizar una de las siguientes opciones:

```text
$ sudo apt-get install libcap
$ sudo apt-get install libcap2-bin
```

Los sistemas basados en Redhat deben utilizar una de las siguientes opciones:

```text
$ sudo yum install libcap
$ sudo yum install compat-libcap1
```

Por último, configura PCAP:

```text
$ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

### Configuración

Edita el archivo `go-metro.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][2]. Para conocer todas las opciones de configuración disponibles, consulta el [go-metro.d/conf.yaml de ejemplo][3]:

El siguiente ejemplo recupera los tiempos RTT TCP para `app.datadoghq.com` y `192.168.0.22`:

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

### Validación

Para confirmar que el check se está ejecutando correctamente, deberías ver métricas`system.net.tcp.rtt` en la interfaz de Datadog. Además, si ejecutas `sudo /etc/init.d/datadog-agent status`, deberías ver algo similar a lo siguiente:

```bash
datadog-agent.service - "Datadog Agent"
  Loaded: loaded (/lib/...datadog-agent.service; enabled; vendor preset: enabled)
  Active: active (running) since Thu 2016-03-31 20:35:27 UTC; 42min ago
 Process: 10016 ExecStop=/opt/.../supervisorctl -c /etc/dd-....conf shutdown (code=exited, status=0/SUCCESS)
 Process: 10021 ExecStart=/opt/.../start_agent.sh (code=exited, status=0/SUCCESS)
Main PID: 10025 (supervisord)
  CGroup: /system.slice/datadog-agent.service
          ├─10025 /opt/datadog-...python /opt/datadog-agent/bin/supervisord -c /etc/dd-agent/supervisor.conf
          ├─10043 /opt/datadog-...python /opt/datadog-agent/agent/dogstatsd.py --use-local-forwarder
          ├─10044 /opt/datadog-agent/bin/go-metro -cfg=/etc/dd-agent/conf.d/go-metro.yaml
          ├─10046 /opt/datadog-.../python /opt/datadog-agent/agent/ddagent.py
          └─10047 /opt/datadog-.../python /opt/datadog-agent/agent/agent.py foreground --use-local-forwarder
```

Si el check de TCP RTT se ha iniciado, deberías ver algo similar a la línea go-metro anterior.

Se trata de un check pasivo, por lo que no se informan métricas, a menos que se envíen paquetes activamente a los hosts mencionados en el archivo yaml.

## Datos recopilados

### Métricas

{{< get-metrics-from-git "system" "system.net.tcp.rtt" >}}

[1]: https://github.com/DataDog/go-metro#usage
[2]: /es/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/go-metro/datadog_checks/go-metro/data/conf.yaml.example

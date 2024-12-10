---
app_id: go-metro
app_uuid: 77c9906a-9579-4014-95c3-42b4536dc17d
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.net.tcp.rtt
      metadata_path: metadata.csv
      prefix: system.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Go-Metro
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- languages
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/go-metro/README.md
display_on_public_website: true
draft: false
git_integration_title: go-metro
integration_id: go-metro
integration_title: Go-Metro
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: go-metro
public_title: Go-Metro
short_description: Calcular pasivamente TCP RTT entre hosts
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Lenguajes
  - Offering::Integración
  configuration: README.md#Configuración
  description: Calcular pasivamente TCP RTT entre hosts
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Go-Metro
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

El check de TCP RTT informa sobre los tiempos de ida y vuelta entre el host en el que se está ejecutando el Agent y cualquier host con el que se esté comunicando. Este check es pasivo y sólo informa sobre los tiempos RTT de los paquetes que se envían y reciben desde fuera del check. El propio check no envía ningún paquete.

Este check sólo se incluye en los paquetes DEB y RPM de 64 bits del Datadog Agent v5. El check no está disponible con el Datadog Agent v6.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de TCP RTT, también conocido como [go-metro][2], se incluye en el paquete del Agent, pero requiere bibliotecas de sistema adicionales. El check utiliza marcas de tiempo proporcionadas por la biblioteca PCAP para calcular el tiempo entre cualquier paquete saliente y la confirmación TCP correspondiente. Como tal, PCAP debe ser instalado y configurado.

Los sistemas basados en Debian deben utilizar una de las siguientes opciones:

```bash
sudo apt-get install libcap
sudo apt-get install libcap2-bin
```

Los sistemas basados en Redhat deben utilizar uno de estos:

```bash
sudo yum install libcap
sudo yum install compat-libcap1
```

Por último, configura PCAP:

```bash
sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

### Configuración

Edita el archivo `go-metro.yaml` en el directorio `conf.d` de tu Agent. Consulta el [go-metro.yaml de ejemplo][3] para conocer todas las opciones de configuración disponibles.
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
# Instala las bibliotecas requeridas
$ sudo apt-get install libcap  # debian
$ sudo apt-get install libcap2-bin  # debian alternative
$ sudo yum install libcap  # redhat
$ sudo yum install compat-libcap1  # redhat alternative

# Configura las capacidades
$ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

Debido a los diferentes nombres de paquete para diferentes distribuciones, si las instrucciones anteriores no funcionan para ti, emite un `apt-cache search libcap` o un `yum search libcap` para una breve lista de paquetes que proporcionen el binario. Si necesitas ayuda, ponte en contacto con el [servicio de asistencia de Datadog][4].

**Nota**: go-metro genera logs en su propio archivo, que se encuentra en `/var/log/datadog/go-metro.log`. Además, go-metro se ejecuta de forma autónoma, por lo que no aparece en el resultado del estado del Agent.

Por último, debido a que el binario go-metro sólo se incluye con las distribuciones RPM y DEB de 64 bits del Datadog Agent, sólo está disponible en esas versiones empaquetadas. Esto significa que go-metro no está disponible con la instalación de origen, ni con los paquetes de 32 bits.

### Validación

Para confirmar que el check se está ejecutando correctamente, deberías ver métricas`system.net.tcp.rtt` en la interfaz de Datadog. Además, si [ejecutas el subcomando `status` del Agent][5], deberías ver algo similar a lo siguiente:

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
{{< get-metrics-from-git "go-metro" >}}


### Eventos

El check de Go-metro no incluye eventos.

### Checks de servicio

El check de Go-metro no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/go-metro
[3]: https://github.com/DataDog/integrations-core/blob/master/go-metro/datadog_checks/go-metro/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/help/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/go-metro/metadata.csv
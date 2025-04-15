---
app_id: systemd
app_uuid: a18dccd2-35c0-40e2-9c0a-7a01a5daf5f3
assets:
  dashboards:
    Systemd Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: systemd.units_by_state
      metadata_path: metadata.csv
      prefix: systemd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10066
    source_type_name: Systemd
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- sistema operativo y sistema
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/systemd/README.md
display_on_public_website: true
draft: false
git_integration_title: systemd
integration_id: systemd
integration_title: Systemd
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: systemd
public_title: Systemd
short_description: Obtener métricas sobre Systemd y unidades gestionadas por Systemd
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Categoría::Sistema operativo y sistema
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Obtener métricas sobre Systemd y unidades gestionadas por Systemd
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Systemd
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Systemd][1] y las unidades que gestiona a través del Datadog Agent.

- Seguimiento del estado de tu Systemd
- Monitorización de las unidades, los servicios y los sockets gestionados por Systemd

## Configuración

### Instalación

El check de Systemd está incluido en el paquete del [Datadog Agent][2]. No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `systemd.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del
   directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de Systemd.
   Para conocer todas las opciones de configuración disponibles, consulta el [systemd.d/conf.yaml de ejemplo][1].

2. [Reinicia el Agent][2].

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/systemd.d/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

Para entornos en contenedores, instala la carpeta `/run/systemd/`, que contiene el socket `/run/systemd/private` necesario para recuperar los datos de Systemd. Por ejemplo:

```bash
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup/:ro \
              -v /run/systemd/:/host/run/systemd/:ro \
              -e DD_API_KEY=<YOUR_API_KEY> \
              datadog/agent:latest
```

#### Helm

Para configuraciones Helm, puedes configurar el Datadog Agent para monitorizar unidades de Systemd (como: `kubelet.service` y `ssh.service`) definiendo instalaciones de volúmenes y volúmenes para acceder a archivos y directorios relacionados con Systemd dentro de los contenedores. Por ejemplo:

```bash
datadog:
  #(...)
  confd:      
    # Archivo de configuración personalizado para SystemD
    # Ejemplo: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/systemd.d/conf.yaml.example

    systemd.yaml: |-
      init_config:
      instances:
        - unit_names:
            - kubelet.service
            - ssh.service

agents:
  # Instalaciones personalizadas para el socket SystemD (/run/systemd/private)
  volumeMounts:
    - name: systemd
      mountPath: /host/run/systemd/ # ruta dentro del contenedor donde se instalará el volumen

  volumes:
    - name: systemd
      hostPath:
        path: /run/systemd/ # ruta en la máquina host que se instalará dentro del contenedor.
```


{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `systemd` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "systemd" >}}


Algunas métricas sólo se notifican si están activadas las respectivas configuraciones:

- `systemd.service.cpu_time_consumed` requiere la activación de la configuración de Systemd `CPUAccounting` 
- `systemd.service.memory_usage` requiere la activación de la configuración de Systemd`MemoryAccounting` 
- `systemd.service.task_count` requiere la activación de la configuración de Systemd `TasksAccounting` 

Algunas métricas sólo están disponibles a partir de una versión específica de Systemd:

- `systemd.service.cpu_time_consumed` requiere Systemd v220
- `systemd.service.restart_count` requiere Systemd v235
- `systemd.socket.connection_refused_count` requiere Systemd v239

### Eventos

El check de Systemd no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "systemd" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].



[1]: https://www.freedesktop.org/wiki/Software/systemd/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/
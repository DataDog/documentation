---
app_id: twingate
app_uuid: c88bd253-18da-4224-af14-7854ce8ae6ed
assets:
  dashboards:
    Twingate Dashboard: assets/dashboards/twingate_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10338
    source_type_name: Twingate
author:
  homepage: https://www.twingate.com/?utm_source=datadog&utm_medium=partner&utm_campaign=integrations
  name: Twingate
  sales_email: sales@twingate.com
  support_email: support@twingate.com
categories:
- red
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/twingate/README.md
display_on_public_website: true
draft: false
git_integration_title: twingate
integration_id: twingate
integration_title: Twingate
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: twingate
public_title: Twingate
short_description: Twingate ofrece una alternativa moderna y de confianza cero a las
  VPN corporativas
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Twingate ofrece una alternativa moderna y de confianza cero a las VPN
    corporativas
  media:
  - caption: Logs de actividad de Twingate
    image_url: images/twingate_activity_log.png
    media_type: imagen
  - caption: Dashboard de actividad en tiempo real de Twingate
    image_url: images/dashboard.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-network-access-with-twingate/
  support: README.md#Support
  title: Twingate
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

[Twingate][1] es una plataforma de acceso a la red de confianza cero que permite a las empresas de rápido crecimiento proporcionar de forma rápida y sencilla un acceso seguro a su entorno de AWS. Al incorporar tecnologías modernas como NAT traversal, QUIC, proxies privados y túnel dividido, Twingate puede sustituir a una VPN tradicional o en la nube, al tiempo que mejora el rendimiento de los usuarios y la seguridad general.

Esta integración permite a las organizaciones monitorizar las actividades de acceso a recursos de un usuario en tiempo real.

## Configuración
### Requisitos previos
1. Tienes el Datadog Agent instalado en el servidor del Conector Twingate. Debes poder conectarte con ese host y editar los archivos para configurar la integración de las configuraciones del Agent y YAML. Para instalar el Datadog Agent, consulta [Empezando con el Agent][2].
2. Debes desplegar el conector Twingate. Para activar logs de conexión en tiempo real, consulta la [documentación de Twingate][3].

### Configurar el Datadog Agent
#### Conector Systemd
1. Configura la [integración de Datadog journald][4].
2. Sustituye `journald.d/conf.yaml` por la siguiente configuración:
   ```yaml
    logs:
      - type: journald
        container_mode: true
        include_units:
          - twingate-connector.service
        service: Twingate Connection
        source: Twingate
        log_processing_rules:
        - type: include_at_match
          name: analytics
          pattern: ANALYTICS
        - type: mask_sequences
          name: remove_analytics
          replace_placeholder: ""
          pattern: "ANALYTICS "
   ```
3. Añade el usuario `dd-agent` al grupo `systemd-journal` utilizando `usermod -a -G systemd-journal dd-agent`.
4. Reinicia el Datadog Agent ejecutando `service datadog-agent restart`.
5. Confirma que el log de Twingate Analytic aparece en el [explorador de logs][5].


#### Conector de Docker
##### Configura la integración de Datadog Docker para el Agent del host
Añade las siguientes líneas al archivo de configuración `datadog.yaml`:
```yaml
logs_enabled: true
listeners:
- name: docker
config_providers:
- name: docker
polling: true
logs_config:
container_collect_all: true
container_exclude: ["image:.*"]
container_include: ["image:twingate/connector"]
```
- Añade el usuario `dd-agent` al grupo `docker` utilizando `usermod -a -G docker dd-agent`.
- Reinicia el Datadog Agent ejecutando `service datadog-agent restart`.

##### Configura la integración de Datadog Docker para el Agent de contenedor
Añade parámetros adicionales `-e DD_CONTAINER_EXCLUDE="image:.*"` y `-e DD_CONTAINER_INCLUDE="image:twingate/connector"` en el comando de ejecución de Docker.
```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=xxx \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="image:.*" \
           -e DD_CONTAINER_INCLUDE="image:twingate/connector" \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

##### Configura el conector de Twingate con parámetros adicionales de Docker 
Añade la etiqueta `com.datadoghq.ad.logs` al comando de ejecución de docker del conector de Twingate Docker:
```shell
docker run -d --sysctl net.ipv4.ping_group_range="0 2147483647" \
  -l "com.datadoghq.ad.logs"='[{"service":"Twingate Connection","source":"Twingate","log_processing_rules":[{"type":"include_at_match","name":"analytics","pattern":"ANALYTICS"},{"type":"mask_sequences","name":"remove_analytics","replace_placeholder":"","pattern":"ANALYTICS "}]}]' \
  --env TENANT_URL="https://xxx.twingate.com" \
  --env ACCESS_TOKEN="xxx" \
  --env REFRESH_TOKEN="xxx" \
  --env TWINGATE_LABEL_HOSTNAME="`hostname`" \
  --name "twingate-golden-seal" \
  --restart=unless-stopped \
  $(docker run --help | grep -- --pull >/dev/null && echo "--pull=always") twingate/connector:1
```
**Nota**: Es necesario volver a crear el contenedor del conector de Twingate para añadir la nueva etiqueta. 

### Dashboard de Twingate Analytics
1. Ve a la [lista de dashboards][6] de Datadog.
2. Busca el dashboard de Twingate Analytics.

## Solucionar problemas
¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Twingate][7].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitoriza el acceso a la red con la oferta de Twingate en el marketplace de Datadog][8]

[1]: https://www.twingate.com/
[2]: https://docs.datadoghq.com/es/getting_started/agent/
[3]: https://docs.twingate.com/docs/connector-real-time-logs
[4]: https://docs.datadoghq.com/es/agent/logs/?tab=journald
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/dashboard/lists
[7]: https://help.twingate.com/hc/en-us
[8]: https://www.datadoghq.com/blog/monitor-network-access-with-twingate/
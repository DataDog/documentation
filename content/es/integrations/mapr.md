---
app_id: mapr
app_uuid: 96cb179f-2a53-424b-95ce-302610f155eb
assets:
  dashboards:
    MapR - Overview: assets/dashboards/mapr_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: mapr.metrics.submitted
      metadata_path: metadata.csv
      prefix: mapr.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10073
    source_type_name: MapR
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/mapr/README.md
display_on_public_website: true
draft: false
git_integration_title: mapr
integration_id: mapr
integration_title: MapR
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: mapr
public_title: MapR
short_description: Recopila las métricas de monitorización de MapR.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenes de datos
  - Categoría::Recopilación de logs
  - SO compatible::Linux
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopila las métricas de monitorización de MapR.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: MapR
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [MapR][1] v6.1 o posterior a través del Datadog Agent.

## Configuración

Sigue las instrucciones de abajo para instalar y configurar este check para un Agent que se ejecuta en un host.

### Instalación

El check de MapR está incluido en el paquete del [Datadog Agent][2], pero requiere que se realicen operaciones de configuración adicionales.

#### Requisitos previos

- Asegúrate de que la [monitorización de MapR][3] se ejecute correctamente.
- Asegúrate de disponer de un [usuario de MapR][4] (con nombre, contraseña, UID y GID) con el permiso 'consume' en el flujo (stream) `/var/mapr/mapr.monitoring/metricstreams`. Puede ser un usuario existente o un usuario nuevo.
- **En un clúster no seguro**: sigue los pasos de [Configuración de la suplantación sin seguridad en el clúster][5] para que el usuario del `dd-agent` pueda suplantar a este usuario de MapR.
- **En un clúster seguro**: genera un [ticket de servicio de larga duración][6] para este usuario que sea legible para el usuario del `dd-agent`.

Pasos de instalación para cada nodo:

1. [Instala el Agent][2].
2. Instala la biblioteca _librdkafka_, que se requiere para _mapr-streams-library_, siguiendo [estas instrucciones][7].
3. Instala la biblioteca _mapr-streams-library_ con el siguiente comando:

    `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install --global-option=build_ext --global-option="--library-dirs=/opt/mapr/lib" --global-option="--include-dirs=/opt/mapr/include/" mapr-streams-python`.

    Si utilizas Python 3 con el Agent v7, reemplaza `pip` por `pip3`.

4. Añade `/opt/mapr/lib/` a `/etc/ld.so.conf` (o un archivo en `/etc/ld.so.conf.d/`). Esto es necesario para que la _mapr-streams-library_ que utiliza el Agent encuentre las bibliotecas compartidas de MapR.
5. Vuelve a cargar las bibliotecas ejecutando `sudo ldconfig`.
6. Configura la integración mediante la especificación de la localización del ticket.

#### Notas adicionales

- Si no tienes habilitada la "seguridad" en el clúster, puedes continuar sin un ticket.
- Si tu entorno de producción no admite herramientas de compilación como gcc (necesarias para compilar la mapr-streams-library), es posible generar un archivo wheel compilado de la biblioteca en una instancia de desarrollo y distribuir el archivo wheel compilado a producción. Los hosts de desarrollo y producción tienen que ser lo suficientemente similares para que el archivo wheel compilado sea compatible. Puedes ejecutar `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip wheel --global-option=build_ext --global-option="--library-dirs=/opt/mapr/lib" --global-option="--include-dirs=/opt/mapr/include/" mapr-streams-python` para crear el archivo de wheel en la máquina de desarrollo. Luego, debes ejecutar `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install <THE_WHEEL_FILE>` en la máquina de producción.
- Si utilizas Python 3 con el Agent v7, asegúrate de reemplazar `pip` por `pip3` al instalar la _mapr-streams-library_.

### Configuración

#### Recopilación de métricas

1. Edita el archivo `mapr.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de MapR. Consulta el [archivo de ejemplo mapr.d/conf.yaml][8] para conocer todas las opciones de configuración disponibles.
2. Define el parámetro `ticket_location` de la configuración como la ruta del ticket de larga duración que creaste.
3. [Reinicia el Agent][9].

#### Recopilación de logs

MapR utiliza FluentD para los logs. Debes usar el [complemento de FluentD para Datadog][10] para recopilar los logs de MapR. El siguiente comando descarga e instala el complemento en el directorio correcto.

`curl https://raw.githubusercontent.com/DataDog/fluent-plugin-datadog/master/lib/fluent/plugin/out_datadog.rb -o /opt/mapr/fluentd/fluentd-<VERSION>/lib/fluentd-<VERSION>-linux-x86_64/lib/app/lib/fluent/plugin/out_datadog.rb`

Luego, actualiza `/opt/mapr/fluentd/fluentd-<VERSION>/etc/fluentd/fluentd.conf` con la siguiente sección.

```text
<match *>
  @type copy
  <store> # This section is here by default and sends the logs to ElasticCache for Kibana.
    @include /opt/mapr/fluentd/fluentd-<VERSION>/etc/fluentd/es_config.conf
    include_tag_key true
    tag_key service_name
  </store>
  <store> # This section also forwards all the logs to Datadog:
    @type datadog
    @id dd_agent
    include_tag_key true
    dd_source mapr  # Sets "source: mapr" on every log to allow automatic parsing on Datadog.
    dd_tags "<KEY>:<VALUE>"
    service <YOUR_SERVICE_NAME>
    api_key <YOUR_API_KEY>
  </store>
```

Consulta el [fluent_datadog_plugin][10] para obtener más detalles sobre las opciones que puedes utilizar.

### Validación

Ejecuta el [subcomando de estado del Agent][11] y busca `mapr` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "mapr" >}}


### Eventos

El check de MapR no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "mapr" >}}


## Solucionar problemas

- **El Agent entra en un bucle de error luego de configurar la integración de MapR.**

  Ha habido algunos casos en los que la biblioteca de C dentro de _mapr-streams-python_ genera errores de segmentación debido a problemas de permisos. Asegúrate de que el usuario del `dd-agent` tenga permiso de lectura en el archivo del ticket y que dicho usuario del `dd-agent` pueda ejecutar comandos de la `maprcli` cuando la variable de entorno `MAPR_TICKETFILE_LOCATION` esté apuntando hacia el ticket.

- **La integración parece funcionar correctamente, pero no envía ninguna métrica.**

  Asegúrate de dejar que el Agent se ejecute durante al menos un par de minutos, ya que la integración extrae datos de un tema y MapR necesita introducir datos en ese tema.
  Si eso no funciona, pero al ejecutar el Agent manualmente con `sudo` se muestran datos, se trata de un problema con los permisos. Revisa todo. El usuario de Linux del `dd-agent` debe ser capaz de utilizar un ticket almacenado localmente, lo que le permite ejecutar consultas en MapR como usuario X (que puede o no ser el mismo `dd-agent`). Además, el usuario X debe tener el permiso `consume` en el flujo `/var/mapr/mapr.monitoring/metricstreams`.

- **Ves el mensaje `confluent_kafka was not imported correctly ...`**

  El entorno integrado del Agent no pudo ejecutar el comando `import confluent_kafka`. Esto significa que la _mapr-streams-library_ no se instaló dentro del entorno integrado o que no puede encontrar las bibliotecas mapr-core. El mensaje de error debería incluir más detalles.

¿Necesitas más ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][14].


[1]: https://mapr.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://mapr.com/docs/61/AdministratorGuide/Monitoring.html
[4]: https://mapr.com/docs/61/AdministratorGuide/c-managing-users-and-groups.html
[5]: https://docs.datafabric.hpe.com/52/SecurityGuide/t_config_impersonation_notsecure.html?hl=secure%2Ccluster
[6]: https://mapr.com/docs/61/SecurityGuide/GeneratingServiceTicket.html
[7]: https://github.com/confluentinc/librdkafka#installing-prebuilt-packages
[8]: https://github.com/DataDog/integrations-core/blob/master/mapr/datadog_checks/mapr/data/conf.yaml.example
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://www.rubydoc.info/gems/fluent-plugin-datadog
[11]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/mapr/metadata.csv
[13]: https://github.com/DataDog/integrations-core/blob/master/mapr/assets/service_checks.json
[14]: https://docs.datadoghq.com/es/help/

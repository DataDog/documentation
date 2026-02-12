---
app_id: flume
app_uuid: 9e349061-5665-482d-9a5a-f3a07999bfae
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: flume.channel.capacity
      metadata_path: metadata.csv
      prefix: flume.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10133
    source_type_name: flume
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: kealan.maas@datadoghq.com
  support_email: kealan.maas@datadoghq.com
categories: []
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/flume/README.md
display_on_public_website: true
draft: false
git_integration_title: flume
integration_id: flume
integration_title: flume
integration_version: 0.0.1
is_public: true
manifest_version: 2.0.0
name: flume
public_title: flume
short_description: Seguimiento de sumidero, canal y fuente del Agent Apache Flume
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Seguimiento de sumidero, canal y fuente del Agent Apache Flume
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: flume
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [Apache Flume][1].

## Configuración

El check de Flume no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Flume en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-flume==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Configura el Agent Flume para habilitar JMX añadiendo los siguientes argumentos JVM a tu [flume-env.sh][5]: 

```
export JAVA_OPTS="-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=5445 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false"

```

2. Edita el archivo `flume.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del
   directorio de configuración de tu Agent, para empezar a recopilar datos de rendimiento de Flume.
   Consulta el [`flume.d/conf.yaml` de ejemplo][6] para conocer todas las opciones de configuración disponibles.

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en el resultado del estado.
   Puedes especificar las métricas que te interesan editando la configuración a continuación.
   Para obtener instrucciones detalladas sobre la personalización de métricas para recopilar, consulta la [documentación de los checks de JMX][7].
   Si necesitas monitorizar más métricas, ponte en contacto con el [servicio de asistencia de Datadog][8].

3. [Reinicia el Agent][9].

### Validación

[Ejecuta el subcomando `status` de estado del Agent][10] y busca `flume` en la sección **Checks**.

### Métricas de componente

Las métricas recuperadas por este check dependen de la fuente, del canal y del sumidero utilizados por tu Agent Flume. Para ver una lista completa de las métricas expuestos por cada componente, consulta [Métricas de componentes disponibles][9] de la documentación de Apache Flume. Para ver una lista de las métricas que puedes ver en Datadog, consulta la sección [Métricas](#métricas) de esta página.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "flume" >}}


### Eventos

Flume no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "flume" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].


[1]: https://flume.apache.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://flume.apache.org/FlumeUserGuide.html#jmx-reporting
[6]: https://github.com/DataDog/integrations-extras/blob/master/flume/datadog_checks/flume/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/integrations/java/
[8]: https://docs.datadoghq.com/es/help/
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-extras/blob/master/flume/metadata.csv
[12]: https://github.com/DataDog/integrations-extras/blob/master/flume/assets/service_checks.json
---
app_id: aqua
app_uuid: d3819b09-3e08-492f-b0f8-b0d3f53fbdf5
assets:
  dashboards:
    aqua: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: aqua.running_containers
      metadata_path: metadata.csv
      prefix: aqua.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10042
    source_type_name: Aqua
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Aqua
  sales_email: oran.moshai@aquasec.com
  support_email: oran.moshai@aquasec.com
categories:
- rastreo
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/aqua/README.md
display_on_public_website: true
draft: false
git_integration_title: aqua
integration_id: aqua
integration_title: Aqua
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: aqua
public_title: Aqua
short_description: Solución de seguridad completa desde el desarrollo hasta la producción
  para contenedores y aplicaciones nativas de la nube
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Contenedores
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Solución de seguridad completa desde el desarrollo hasta la producción
    para contenedores y aplicaciones nativas de la nube
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Aqua
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [Aqua][1].

El check de Aqua alerta al usuario si se alcanza una vulnerabilidad de alta gravedad total o si un contenedor se está ejecutando dentro de un host no registrado por Aqua. Aqua también envía alertas de datos sobre eventos bloqueados en tiempo de ejecución y es posible activar un webhook para escalar la infraestructura si se requieren más analizadores de Aqua.

## Configuración

El check de Aqua no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Aqua en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-aqua==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

#### Recopilación de métricas

1. Edita el archivo `aqua.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][5] para empezar a recopilar tus [métricas](#metrics) de Aqua. Consulta el [conf.yaml de ejemplo][6] para conocer todas las opciones de configuración disponibles.

   ```yaml
   instances:
     - url: http://your-aqua-instance.com
       api_user: "<API_USERNAME>"
       password: "<API_USER_PASSWORD>"
   ```

   Cambia los valores de los parámetros `api_user` y `password` y configúralos para tu entorno.

2. [Reinicia el Agent][7].

#### Recopilación de logs

Hay dos tipos de logs generados por Aqua:

- Logs de auditoría de Aqua
- Logs de Aqua Enforcer

Para recopilar los logs de auditoría de Aqua:

1. Conéctate a tu cuenta de Aqua.
2. Ve a la sección `Log Management` de la página `Integration`.
3. Activa la integración del webhook.
4. Habilítala y añade el siguiente endpoint: `{{< region-param key="http_endpoint" code="true" >}}/v1/input/<DATADOG_API_KEY>?ddsource=aqua`.
   - Sustituye `<DATADOG_API_KEY>` por tu [clave de API Datadog][8].

Para los logs de Aqua Enforcer: **Disponible para Agent 6.0 o posteriores**

5. La recopilación de logs está deshabilitada por defecto en el Datadog Agent. Actívala en tu [configuración de daemonset][9]:

   ```yaml
     # (...)
     env:
       # (...)
       - name: DD_LOGS_ENABLED
           value: "true"
       - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
           value: "true"
     # (...)
   ```

    Asegúrate de que el socket de Docker esté montado en el Datadog Agent. Consulta la documentación de Kubernetes para ver los [manifiestos de ejemplo][10].

6. [Reinicia el Agent][7].

### Validación

[Ejecuta el subcomando `status` del Agent][11] y busca `aqua` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "aqua" >}}


### Eventos

Aqua no incluye ningún evento.

### Checks de servicios
{{< get-service-checks-from-git "aqua" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][14].


[1]: https://www.aquasec.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://docs.datadoghq.com/es/agent/faq/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/aqua/datadog_checks/aqua/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/faq/agent-commands/#start-stop-restart-the-agent
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: https://docs.datadoghq.com/es/agent/kubernetes/daemonset_setup/#log-collection
[10]: https://docs.datadoghq.com/es/agent/kubernetes/?tab=daemonset#installation
[11]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/aqua/metadata.csv
[13]: https://github.com/DataDog/integrations-extras/blob/master/aqua/assets/service_checks.json
[14]: https://docs.datadoghq.com/es/help/
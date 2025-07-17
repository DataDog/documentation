---
app_id: harbor
app_uuid: a4aae6fb-1865-42d0-be03-78e98b7e4b22
assets:
  dashboards:
    Harbor Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: harbor.projects.count
      metadata_path: metadata.csv
      prefix: harbor.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10063
    source_type_name: Harbor
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- rastreo
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/harbor/README.md
display_on_public_website: true
draft: false
git_integration_title: harbor
integration_id: harbor
integration_title: Harbor
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: harbor
public_title: Harbor
short_description: Monitoriza el estado del registro de contenedores de Harbor
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
  - Categoría::Contenedores
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza el estado del registro de contenedores de Harbor
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Harbor
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Harbor][1] a través del Datadog Agent.

## Configuración

### Instalación

El check de Harbor está incluido en el paquete del [Datadog Agent][2]. No se necesita ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `harbor.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1], para empezar a recopilar los datos de rendimiento de Harbor. Para conocer todas las opciones de configuración disponibles, consulta el [harbor.d/conf.yaml de ejemplo][2].

    **Nota**: Puedes especificar cualquier tipo de usuario en la configuración, pero se requiere una cuenta con permisos de administrador para obtener las métricas del disco. La métrica `harbor.projects.count` solo refleja la cantidad de proyectos a los que puede acceder el usuario proporcionado.

2. [Reinicia el Agent][3].

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `harbor.d/conf.yaml` para empezar a recopilar tus logs de Harbor:

   ```yaml
     logs:
       - type: file
         path: /var/log/harbor/*.log
         source: harbor
         service: '<SERVICE_NAME>'
   ```

3. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/
[2]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedores" %}}

#### Contenedores

En el caso de los entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `harbor`                                                                              |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                         |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%", "username": "<USER_ID>", "password": "<USER_PASSWORD>"}` |

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "harbor", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `harbor` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "harbor" >}}


### Eventos

La integración de Harbor no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "harbor" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].



[1]: https://goharbor.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/
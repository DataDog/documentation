---
app_id: twistlock
app_uuid: b10f1447-4e25-4c76-ab05-911cde5df5c6
assets:
  dashboards:
    Twistlock: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: twistlock.images.cve.details
      metadata_path: metadata.csv
      prefix: twistlock.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10052
    source_type_name: Twistlock
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- conformidad
- contenedores
- recopilación de logs
- la red
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/twistlock/README.md
display_on_public_website: true
draft: false
git_integration_title: twistlock
integration_id: twistlock
integration_title: Prisma Cloud Compute Edition
integration_version: 5.1.1
is_public: true
manifest_version: 2.0.0
name: twistlock
public_title: Prisma Cloud Compute Edition
short_description: Twistlock es un escáner de seguridad de contenedores
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Cumplimiento
  - Categoría::Contenedores
  - Categoría::Recopilación de logs
  - Categoría::Red
  - Categoría::Seguridad
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Twistlock es un escáner de seguridad de contenedores
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Prisma Cloud Compute Edition
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

[Prisma Cloud Compute Edition][1] es un escáner de seguridad. Analiza contenedores, hosts y paquetes para detectar vulnerabilidades y problemas de cumplimiento.

## Configuración

### Instalación

El check de Prisma Cloud Compute Edition está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tu servidor.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `twistlock.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu Twistlock. Para conocer todas las opciones de configuración disponibles, consulta el [twistlock.d/conf.yaml de ejemplo][1].

2. [Reinicia el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/twistlock/datadog_checks/twistlock/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                                               |
| -------------------- | ----------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `twistlock`                                                                         |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                       |
| `<INSTANCE_CONFIG>`  | `{"url":"http://%%host%%:8083", "username":"<USERNAME>", "password": "<PASSWORD>"}` |

###### Kubernetes

Si utilizas Kubernetes, añade la configuración a la sección del controlador de replicación de twistlock_console.yaml antes del despliegue:

```yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: twistlock-console
  namespace: twistlock
spec:
  replicas: 1
  selector:
    name: twistlock-console
  template:
    metadata:
      annotations:
        ad.datadoghq.com/twistlock-console.check_names: '["twistlock"]'
        ad.datadoghq.com/twistlock-console.init_configs: "[{}]"
        ad.datadoghq.com/twistlock-console.instances: '[{"url":"http://%%host%%:8083", "username":"<USERNAME>", "password": "<PASSWORD>"}]'
        ad.datadoghq.com/twistlock-console.logs: '[{"source": "twistlock", "service": "twistlock"}]'
      name: twistlock-console
      namespace: twistlock
      labels:
        name: twistlock-console
```

##### Recopilación de logs


{{< site-region region="us3" >}}
**La recopilación de logs no es compatible con el sitio Datadog {{< region-param key="dd_site_name" >}}**.
{{< /site-region >}}


_Disponible para la versión 6.0 o posteriores del Agent_

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "twistlock", "service": "twistlock"}` |

###### Kubernetes

1. La recopilación de Logs se encuentra deshabilitada por defecto en el Datadog Agent. Habilítala en tu [configuración de DaemonSet][3]:

   ```yaml
     #(...)
       env:
         #(...)
         - name: DD_LOGS_ENABLED
             value: "true"
         - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
             value: "true"
     #(...)
   ```

2. Instala el socket Docker en el Datadog Agent. Consulta los [manifiestos de ejemplo][4] de Datadog Kubernetes.

3. Asegúrate de que la sección de logs está incluida en la anotación de Pod del defensor, donde el nombre del contenedor se puede encontrar justo debajo en la especificación del pod:

   ```yaml
   ad.datadoghq.com/<container-name>.logs: '[{"source": "twistlock", "service": "twistlock"}]'
   ```

4. [Reinicia el Agent][5].

###### Docker

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala con la variable de entorno:

   ```shell
   DD_LOGS_ENABLED=true
   ```

2. Añade una etiqueta (tag) en el contenedor del defensor:

   ```yaml
   ad.datadoghq.com/<container-name>.logs: '[{"source": "twistlock", "service": "twistlock"}]'
   ```

3. Instala el socket Docker en el Datadog Agent. Para obtener más información sobre la configuración necesaria para recopilar logs con el Datadog Agent, consulta [Recopilación de logs de Docker][6].

4. [Reinicia el Agent][5].

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/?tab=containerinstallation#setup
[3]: https://docs.datadoghq.com/es/agent/kubernetes/daemonset_setup/#log-collection
[4]: https://docs.datadoghq.com/es/agent/kubernetes/?tab=daemonset
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/docker/log/?tab=containerinstallation
{{% /tab %}}
{{< /tabs >}}

### Validación

Ejecuta el [subcomando de estado del Agent][3] y busca `twistlock` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "twistlock" >}}


### Eventos

Prisma Cloud Compute Edition envía un evento cuando se encuentra un nuevo CVE.

### Checks de servicio
{{< get-service-checks-from-git "twistlock" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].



[1]: https://www.paloaltonetworks.com/prisma/cloud
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/
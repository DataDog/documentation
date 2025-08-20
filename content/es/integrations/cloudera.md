---
app_id: cloudera
app_uuid: 526ca1e8-f474-49cd-9a79-6cfe75de15fe
assets:
  dashboards:
    Cloudera Data Platform Overview: assets/dashboards/cloudera_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cloudera.cluster.cpu_percent_across_hosts
      metadata_path: metadata.csv
      prefix: cloudera.
    process_signatures:
    - cdp
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10318
    source_type_name: Cloudera
  monitors:
    Cloudera CPU usage is high: assets/monitors/cloudera_high_cpu.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cloudera/README.md
display_on_public_website: true
draft: false
git_integration_title: cloudera
integration_id: cloudera
integration_title: Cloudera
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: cloudera
public_title: Cloudera
short_description: Cloudera
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Data Stores
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Cloudera
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/cloudera-integration-announcement/
  support: README.md#Support
  title: Cloudera
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Esta integración monitoriza tu [plataforma de Cloudera Data][1] a través del Datadog Agent, permitiéndote enviar métricas y checks de servicio sobre el estado de tus clústeres, hosts y roles de Cloudera Data Hub.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Cloudera está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Requisitos
El check de Cloudera requiere la versión 7 de Cloudera Manager.

#### Preparar Cloudera Manager
1. En la plataforma de Cloudera Data, ve a la consola de gestión y haz clic en la pestaña **User Management** (Gestión de usuarios).
![Gestión de usuarios][4]

2. Haz clic en **Actions** (Acciones), luego en **Create Machine User** (Crear usuario de máquina) para crear el usuario de máquina que consulta el Cloudera Manager a través del Datadog Agent.
![Crear usuario de máquina][5]

3. Si no se ha establecido la contraseña de la carga de trabajo, haz clic en **Set Workload Password** (Establecer la contraseña de la carga de trabajo) después de crear el usuario.
![Establecer la contraseña de la carga de trabajo][6]

{{< tabs >}}
{{% tab "Host" %}}

#### Host
1. Edita el archivo `cloudera.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de clúster y host de Cloudera. Ve el [cloudera.d/conf.yaml de ejemplo][1] para conocer todas las opciones disponibles de configuración.  
**Nota**: La `api_url` debe contener la versión de la API al final.

   ```yaml
   init_config:

      ## @param workload_username - string - required
      ## The Workload username. This value can be found in the `User Management` tab of the Management 
      ## Console in the `Workload User Name`.
      #
      workload_username: <WORKLOAD_USERNAME>

      ## @param workload_password - string - required
      ## The Workload password. This value can be found in the `User Management` tab of the Management 
      ## Console in the `Workload Password`.
      #
      workload_password: <WORKLOAD_PASSWORD>

   ## Every instance is scheduled independently of the others.
   #
   instances:

      ## @param api_url - string - required
      ## The URL endpoint for the Cloudera Manager API. This can be found under the Endpoints tab for 
      ## your Data Hub to monitor. 
      ##
      ## Note: The version of the Cloudera Manager API needs to be appended at the end of the URL. 
      ## For example, using v48 of the API for Data Hub `cluster_1` should result with a URL similar 
      ## to the following:
      ## `https://cluster1.cloudera.site/cluster_1/cdp-proxy-api/cm-api/v48`
      #
      - api_url: <API_URL>
   ```

2. [Reinicia el Agent][2] para empezar a recopilar y enviar datos del clúster de Cloudera Data Hub a Datadog.

[1]: https://github.com/DataDog/integrations-core/blob/master/cloudera/datadog_checks/cloudera/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `cloudera`                                                                                                       |
| `<INIT_CONFIG>`      | `{"workload_username": "<WORKLOAD_USERNAME>", 'workload_password": "<WORKLOAD_PASSWORD>"}`                       |
| `<INSTANCE_CONFIG>`  | `{"api_url": <API_URL>"}`                                                                                        |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Detección de clústeres

Puedes configurar cómo se detectan tus clústeres con la opción de configuración `clusters` con los siguientes parámetros:

- `limit`
: número máximo de elementos para Autodiscovery.
**Valor por defecto**: `None` (se procesarán todos los clústeres)

- `include`
: asignación de claves de expresiones regulares y valores de configuración de componentes para Autodiscovery.
**Valor por defecto**: asignación vacía

- `exclude`
: lista de expresiones regulares con los patrones de los componentes a excluir de Autodiscovery. 
**Valor por defecto**: lista vacía

- `interval`
: tiempo de validez en segundos de la última lista de clústeres obtenida a través del endpoint.
**Valor por defecto**: `None` (no se utiliza caché)

**Ejemplos**:

Proceso de un máximo de `5` clústeres con nombres que empiecen por `my_cluster`:

```yaml
clusters:
  limit: 5
  include:
    - 'my_cluster.*'
```

Proceso de un máximo de `20` clústeres y exclusión de aquellos cuyos nombres empiecen por `tmp_`:

```yaml
clusters:
  limit: 20
  include:
    - '.*'
  exclude:
    - 'tmp_.*'
```

#### Consultas personalizadas

Puedes configurar la integración de Cloudera para recopilar métricas personalizadas que no se recopilan por defecto ejecutando consultas de series temporales personalizadas. Estas consultas utilizan [el lenguaje tsquery][7] para recuperar datos de Cloudera Manager. 

**Ejemplo**:

Recopila la tasa de recopilación de elementos no usados de la JVM y la memoria libre de la JVM con `cloudera_jvm` como una etiqueta personalizada:

```yaml
custom_queries:
- query: select last(jvm_gc_rate) as jvm_gc_rate, last(jvm_free_memory) as jvm_free_memory
  tags: cloudera_jvm
```

Nota: Estas consultas pueden aprovechar las expresiones de métrica, dando lugar a consultas como `total_cpu_user + total_cpu_system`, `1000 * jvm_gc_time_ms / jvm_gc_count` y `max(total_cpu_user)`. Cuando utilices expresiones de métrica, asegúrate de incluir también alias para las métricas, ya que de lo contrario los nombres de métrica podrían tener un formato incorrecto. Por ejemplo, `SELECT last(jvm_gc_count)` da como resultado la métrica `cloudera.<CATEGORY>.last_jvm_gc_count`. Puedes añadir un alias como en el siguiente ejemplo: `SELECT last(jvm_gc_count) as jvm_gc_count` para generar la métrica `cloudera.<CATEGORY>.jvm_gc_count`.

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `cloudera` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "cloudera" >}}


### Eventos

La integración de Cloudera recopila eventos que se emiten desde el endpoint `/events` de la API de Cloudera Manager. Los niveles de evento se asignan de la siguiente manera:

| Cloudera                  | Datadog                        |
|---------------------------|--------------------------------|
| `UNKNOWN`                 | `error`                        |
| `INFORMATIONAL`           | `info`                         |
| `IMPORTANT`               | `info`                         |
| `CRITICAL`                | `error`                        |

### Checks de servicio
{{< get-service-checks-from-git "cloudera" >}}


## Solucionar problemas

### Recopilación de métricas de integraciones de Datadog en hosts de Cloudera
Para instalar el Datadog Agent en un host de Cloudera, asegúrate de que el grupo de seguridad asociado al host permite el acceso SSH. 
A continuación, deberás utilizar el [usuario raíz `cloudbreak`][9] cuando accedas al host con la clave SSH generada durante la creación del entorno:

```
sudo ssh -i "/path/to/key.pem" cloudbreak@<HOST_IP_ADDRESS>
```

El nombre de usuario y la contraseña de la carga de trabajo pueden utilizarse para acceder a hosts de Cloudera a través de SSH, aunque sólo el usuario `cloudbreak` puede instalar el Datadog Agent. 
Intentar utilizar cualquier usuario que no sea `cloudbreak` puede dar lugar al siguiente error:
```
<NON_CLOUDBREAK_USER> is not allowed to run sudo on <CLOUDERA_HOSTNAME>.  This incident will be reported.
```

### Errores de configuración al recopilar métricas de Datadog
Si ves algo similar a lo siguiente en el estado del Agent al recopilar métricas de tu host de Cloudera:

```
  Config Errors
  ==============
    zk
    --
      open /etc/datadog-agent/conf.d/zk.d/conf.yaml: permission denied
```

Debes cambiar la propiedad de `conf.yaml` a `dd-agent`:

```
[cloudbreak@<CLOUDERA_HOSTNAME> ~]$ sudo chown -R dd-agent:dd-agent /etc/datadog-agent/conf.d/zk.d/conf.yaml
```


¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Obtén visibilidad de tus clústeres de Cloudera con Datadog][11]


[1]: https://www.cloudera.com/products/cloudera-data-platform.html
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cloudera/images/user_management.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cloudera/images/create_machine_user.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cloudera/images/set_workload_password.png
[7]: https://docs.cloudera.com/cloudera-manager/7.9.0/monitoring-and-diagnostics/topics/cm-tsquery-syntax.html
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://docs.cloudera.com/data-hub/cloud/access-clusters/topics/mc-accessing-cluster-via-ssh.html
[10]: https://docs.datadoghq.com/es/help/
[11]: https://www.datadoghq.com/blog/cloudera-integration-announcement/
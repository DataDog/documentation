---
app_id: sonarqube
app_uuid: c6033e2f-8b3d-4b82-8d35-7c61ce7d0908
assets:
  dashboards:
    Sonarqube Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: sonarqube.server.database.pool_active_connections
      metadata_path: metadata.csv
      prefix: sonarqube.
    process_signatures:
    - java org.sonar.server.app.WebServer
    - java org.sonar.ce.app.CeServer
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10132
    source_type_name: SonarQube
  monitors:
    Sonarqube has vulnerabilities: assets/monitors/vulnerabilities.json
  saved_views:
    status_overview: assets/saved_views/status_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- automatización
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sonarqube/README.md
display_on_public_website: true
draft: false
git_integration_title: sonarqube
integration_id: sonarqube
integration_title: SonarQube
integration_version: 5.3.0
is_public: true
manifest_version: 2.0.0
name: sonarqube
public_title: SonarQube
short_description: Monitoriza tu servidor y proyectos de SonarQube.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza tu servidor y proyectos de SonarQube.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SonarQube
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [SonarQube][1].

## Configuración

### Instalación

El check de SonarQube está incluido en el paquete del [Datadog Agent][2].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

SonarQube expone métricas desde dos fuentes: su API web y JMX. Para recopilar todas las
[métricas especificadas a continuación](#metrics), configura tres instancias de este check. Una para monitorizar la API web de SonarQube y
las otras dos para monitorizar los beans JMX de SonarQube.

La documentación sobre la API web de SonarQube está disponible en `/web_api` en tu interfaz de usuario web de SonarQube. Por defecto, esta integración
recopila todas las métricas de rendimiento pertinentes de SonarQube expuestas a través de beans JMX de SonarQube. La configuración para estas
métricas por defecto está disponible en el archivo [sonarqube.d/metrics.yaml][3]. La documentación sobre estos beans está disponible en
[el sitio web de SonarQube][4].

El servidor JMX de SonarQube **no está habilitado** por defecto, esto significa que a menos que esté habilitado, las métricas `sonarqube.server.*` no se recopilan. Puedes encontrar más información sobre cómo habilitar y configurar JMX dentro de SonarQube en la [documentación de SonarQube][5]. A continuación, se muestran las configuraciones necesarias para habilitar el servidor JMX para algunos procesos comunes de Java:

```conf
# WEB SERVER
sonar.web.javaAdditionalOpts="
  -Dcom.sun.management.jmxremote=true
  -Dcom.sun.management.jmxremote.port=10443
  -Dcom.sun.management.jmxremote.rmi.port=10443
  ...
  "

# COMPUTE ENGINE
sonar.ce.javaAdditionalOpts="
  -Dcom.sun.management.jmxremote=true
  -Dcom.sun.management.jmxremote.port=10444
  -Dcom.sun.management.jmxremote.rmi.port=10444
  ...
  "

# ELASTICSEARCH
sonar.search.javaAdditionalOpts="
  -Dcom.sun.management.jmxremote=true
  -Dcom.sun.management.jmxremote.port=10445
  -Dcom.sun.management.jmxremote.rmi.port=10445
  ...
  "
```

Este es un ejemplo básico de `sonarqube.d/conf.yaml` basado en los valores por defecto de SonarQube y JMX. Puedes utilizarlo como punto de partida para configurar tanto la instalación del Agent basada en host como la basada en contenedor.

```yaml
init_config:
    is_jmx: false
    collect_default_metrics: true
instances:

  # Web API instance
  - is_jmx: false
    web_endpoint: http://localhost:9000
    auth_type: basic
    username: <username>    # Defined in the Web UI
    password: <password>    # Defined in the Web UI
    default_tag: component  # Optional
    components:             # Required
      my-project:
        tag: project_name

  # Web JMX instance
  - is_jmx: true
    host: localhost
    port: 10443           # See sonar.web.javaAdditionalOpts in SonarQube's sonar.properties file
    user: <username>      # Defined in SonarQube's sonar.properties file
    password: <password>  # Defined in SonarQube's sonar.properties file

  # Compute Engine JMX instance
  - is_jmx: true
    host: localhost
    port: 10444           # See sonar.ce.javaAdditionalOpts in SonarQube's sonar.properties file
    user: <username>      # Defined in SonarQube's sonar.properties file
    password: <password>  # Defined in SonarQube's sonar.properties file
```

**Nota**: Una vez configurada la integración, haz que SonarQube escanee al menos un proyecto para enviar métricas a Datadog.

Las métricas recopiladas por esta integración se etiquetan por defecto con una etiqueta `component`. Si deseas cambiar el nombre de etiqueta
por componente, especifica la propiedad `tag` en la definición del componente. Para establecerlo para todos los proyectos,
establece la propiedad `default_tag` en la configuración de instancia.

**Nota**: Los proyectos en SonarQube a menudo contienen múltiples ramas de control de código fuente. Esta integración sólo puede recopilar métricas de la rama por defecto en SonarQube (normalmente `main`).

#### Buscar métricas de servidor

SonarQube expone un servidor de búsqueda, que puede ser monitorizado mediante una instancia adicional de esta integración y una configuración de las métricas de JMX. Para aprender a personalizar las métricas a recopilar, consulta la [documentación de checks de JMX][6] para obtener instrucciones más detalladas. A modo de ejemplo, utiliza la siguiente configuración y la configuración predeterminada de métrica de JMX en [sonarqube.d/metrics.yaml][3].

```yaml
init_config:
  # The list of metrics to be collected by the integration.
  config:
    - include:
      domain: SonarQube
      name: <name>
      exclude_tags:
        - name
      attribute:
        MyMetric:
          alias: sonarqube.search_server.my_metric
          metric_type: gauge
instances:
  # Search Server JMX instance
  - is_jmx: true
    host: localhost
    port: 10445           # See sonar.search.javaAdditionalOpts in SonarQube's sonar.properties file
    user: <username>      # Defined in SonarQube's sonar.properties file
    password: <password>  # Defined in SonarQube's sonar.properties file
```

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `sonarqube.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu
   directorio de configuración del Agent para empezar a recopilar los datos de SonarQube.
   Consulta el [sonarqube.d/conf.yaml de ejemplo][1] para conocer todas las opciones disponibles de configuración.

   Este check tiene un límite de 350 métricas por instancia de JMX. El número de métricas se indica en [la página de estado][2].
   Puedes especificar las métricas que te interesan editando la siguiente configuración.
   Para saber cómo personalizar las métricas a recopilar, consulta la [documentación de checks de JMX][3] para obtener instrucciones más detalladas.
   Si necesitas monitorizar más métricas ponte en contacto con el [soporte de Datadog][4].

2. [Reinicia el Agent][5].

##### Recopilación de logs

1. Activar [el registro][6] de SonarQube.

2. La recopilación de logs está desactivada por defecto en el archivo del Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

3. Añade el siguiente bloque de configuración a tu archivo `sonarqube.d/conf.yaml`. Cambia los valores de los parámetros `path` y `service` en función de tu entorno. Consulta el [sonarqube.d/conf.yaml de ejemplo][1] para ver todas las opciones disponibles de configuración.

   ```yaml
   logs:
     - type: file
       path: /opt/sonarqube/logs/access.log
       source: sonarqube
     - type: file
       path: /opt/sonarqube/logs/ce.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
     - type: file
       path: /opt/sonarqube/logs/es.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
     - type: file
       path: /opt/sonarqube/logs/sonar.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
     - type: file
       path: /opt/sonarqube/logs/web.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

5. [Reinicia el Agent][5].

[1]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/es/integrations/java/
[4]: https://docs.datadoghq.com/es/help/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.sonarqube.org/latest/instance-administration/system-info/
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

##### Recopilación de métricas

Para obtener información sobre entornos en contenedores, consulta la guía [Autodiscovery con JMX][1].

##### Recopilación de logs

La recopilación de logs está deshabilitada por defecto en el Datadog Agent. Para activarla, consulta [recopilación de logs de Docker][2].

| Parámetro      | Valor                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "sonarqube"}` |

[1]: https://docs.datadoghq.com/es/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/es/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

#### Detección de componentes

Puedes configurar cómo se detectan tus componentes con el parámetro `components_discovery`.

`limit`
: número máximo de elementos a detectar automáticamente.  
**Valor por defecto**: `10`

`include`
: asignación de claves de expresiones regulares y valores de configuración de componentes para la detección automática.  
**Valor por defecto**: asignación vacía

`exclude`
: lista de expresiones regulares con los patrones de componentes a excluir de Autodiscovery. 
**Valor por defecto**: lista vacía

**Ejemplos**:

Incluye un máximo de `5` componentes cuyos nombres empiecen por `my_project`:

```yaml
components_discovery:
  limit: 5
  include:
    'my_project*':
```

Incluye un máximo de `20` componentes y excluye los que empiecen por `temp`:

```yaml
components_discovery:
  limit: 20
  include:
    '.*':
  exclude:
    - 'temp*'
```

Incluye todos los componentes cuyos nombres empiecen por `issues`, aplica la etiqueta (tag) `issues_project` y recopila solo las métricas pertenecientes a la categoría `issues`. Como `limit` no está definido, el número de componentes detectados se limita al valor por defecto `10`:
```yaml
components_discovery:
  include:
    'issues*':
       tag: issues_project
       include:
         - issues.
```

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `sonarqube` en la sección **JMXFetch**:

```text
========
JMXFetch
========
  Initialized checks
  ==================
    sonarqube
      instance_name : sonarqube-localhost-10444
      message : <no value>
      metric_count : 33
      service_check_count : 0
      status : OK
      instance_name : sonarqube-localhost-10443
      message : <no value>
      metric_count : 38
      service_check_count : 0
      status : OK
```

Si configuras una instancia sin `is_jmx: true`, busca también `sonarqube` en la sección **Collector** (Recopilador):

```text
=========
Collector
=========
  Running Checks
  ==============
    sonarqube (1.1.0)
    -----------------
      Instance ID: sonarqube:1249c1ed7c7b489a [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/sonarqube.d/conf.yaml
      Total Runs: 51
      Metric Samples: Last Run: 39, Total: 1,989
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 51
      Average Execution Time : 1.19s
      Last Execution Date : 2021-03-12 00:00:44.000000 UTC
      Last Successful Execution Date : 2021-03-12 00:00:44.000000 UTC
```

## Datos recopilados

### Métricas
{{< get-metrics-from-git "sonarqube" >}}


### Eventos

SonarQube no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "sonarqube" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://www.sonarqube.org
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/metrics.yaml
[4]: https://docs.sonarqube.org/latest/server-upgrade-and-maintenance/monitoring/instance/#exposed-jmx-mbeans
[5]: https://docs.sonarsource.com/sonarqube/latest/instance-administration/monitoring/instance/#how-do-i-activate-jmx
[6]: https://docs.datadoghq.com/es/integrations/java/
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/es/help/
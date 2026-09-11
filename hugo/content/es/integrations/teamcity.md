---
"app_id": "teamcity"
"app_uuid": "8dd65d36-9cb4-4295-bb0c-68d67c0cdd4b"
"assets":
  "dashboards":
    "TeamCity Overview": "assets/dashboards/overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check":
      - "teamcity.builds"
      - "teamcity.build_duration"
      "metadata_path": "metadata.csv"
      "prefix": "teamcity."
    "process_signatures":
    - "teamcity-server.sh"
    - "teamcity-server"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "109"
    "source_type_name": "Teamcity"
  "monitors":
    "Builds are failing": "assets/monitors/build_status.json"
  "saved_views":
    "teamcity_processes": "assets/saved_views/teamcity_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "configuration & deployment"
- "log collection"
- "notifications"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/teamcity/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "teamcity"
"integration_id": "teamcity"
"integration_title": "TeamCity"
"integration_version": "6.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "teamcity"
"public_title": "TeamCity"
"short_description": "Realiza un seguimiento de las compilaciones y comprende el impacto en el rendimiento de cada despliegue."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Configuration & Deployment"
  - "Category::Log Collection"
  - "Category::Notifications"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Realiza un seguimiento de las compilaciones y comprende el impacto en el rendimiento de cada despliegue."
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/track-performance-impact-of-code-changes-with-teamcity-and-datadog"
  "support": "README.md#Support"
  "title": "TeamCity"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Esta integración se conecta a tu servidor de TeamCity para enviar métricas, checks de servicio y eventos, lo que te permite monitorizar el estado de las configuraciones de compilación de tus proyectos de TeamCity, las ejecuciones de compilación, los recursos del servidor y mucho más.

## Configuración

### Instalación

El check de TeamCity está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalar nada más en tus servidores de TeamCity.

### Configuración

#### Preparar TeamCity

Puedes activar el [inicio de sesión de invitado](#guest-login), o identificar [credenciales de usuario](#user-credentials) para la autenticación HTTP básica.

##### Inicio de sesión de invitado

1. [Activar el inicio de sesión de invitado][2].

2. Habilita `Per-project permissions` para permitir la asignación de permisos basados en proyectos al usuario invitado. Consulta [Cambiar el modo de autorización][3].
![Activar inicio de sesión de invitado][4]
3. Utiliza un rol existente o crea uno nuevo de solo lectura y añade el permiso `View Usage Statistics` al rol. Consulta [Gestión de roles y permisos][5].
![Crear rol de solo lectura][6]

3. _[Opcional]_ Para permitir que el check detecte automáticamente el tipo de configuración de la compilación durante la recopilación de eventos, añade el permiso `View Build Configuration Settings` al rol de solo lectura.
![Asignar permiso de configuración de vista de compilación][7]

4. Asigna el rol de solo lectura al usuario invitado. Consulta [Asignación de roles a los usuarios][8].
![Configuración del usuario invitado][9]
![Asignar rol][10]

##### Credenciales de usuario

Para la autenticación HTTP básica
- Especifica un `username` identificado y `password` en el archivo `teamcity.d/conf.yaml` en la carpeta `conf.d/` de tu [directorio de configuración del Agent][11].
- Si encuentras un error `Access denied. Enable guest authentication or check user permissions.`, asegúrate de que el usuario tiene los permisos correctos:
  - Permisos Por proyecto y Ver estadísticas de uso activados.
  - Si estás recopilando estadísticas de carga útil del Agent, asigna también los permisos Ver detalles del Agent y Ver estadísticas de uso del Agent.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

Edita el archivo `teamcity.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1]. Para conocer todas las opciones de configuración disponibles, consulta el [teamcity.d/conf.yaml de ejemplo][2]:

El check de TeamCity ofrece dos métodos de recopilación de datos. Para optimizar la monitorización de tu entorno de TeamCity, configura dos instancias separadas para recopilar métricas de cada método. 

1. Método de OpenMetrics (requiere Python versión 3):

   Habilita `use_openmetrics: true` para recopilar métricas desde el endpoint de Prometheus`/metrics` de TeamCity.

   ```yaml
   init_config: 

   instances:
    - use_openmetrics: true

      ## @param server - string - required
      ## Specify the server name of your TeamCity instance.
      ## Enable Guest Authentication on your instance or specify `username` and `password` to
      ## enable basic HTTP authentication.
      #
      server: http://teamcity.<ACCOUNT_NAME>.com
   ```

  Para recopilar métricas de histograma y resumen [conformes con OpenMetrics][3] (disponible a partir de TeamCity Server 2022.10+), añade la propiedad interna, `teamcity.metrics.followOpenMetricsSpec=true`. Consulta [Propiedades internas de TeamCity][4].

2. Método API REST de TeamCity Server (requiere Python versión 3):

   Configura una instancia separada en el archivo `teamcity.d/conf.yaml` para recopilar métricas específicas de la compilación, checks de servicio y eventos de estado de la compilación de la API REST del servidor TeamCity. Especifica tus proyectos y configuraciones de compilación utilizando la opción `projects`.

   ```yaml
   init_config:

   instances:
     - server: http://teamcity.<ACCOUNT_NAME>.com

       ## @param projects - mapping - optional
       ## Mapping of TeamCity projects and build configurations to
       ## collect events and metrics from the TeamCity REST API.
       #
       projects:
         <PROJECT_A>:
           include:    
           - <BUILD_CONFIG_A>
           - <BUILD_CONFIG_B>
           exclude:
           - <BUILD_CONFIG_C>
         <PROJECT_B>:
           include:
           - <BUILD_CONFIG_D>
         <PROJECT_C>: {}
    ```

Personaliza la monitorización de la configuración de compilación de cada proyecto utilizando los filtros opcionales `include` y `exclude` para especificar IDs de configuración de la compilación para incluir o excluir de la monitorización, respectivamente. Se admiten patrones de expresión regular en las claves `include` y `exclude` para especificar patrones de coincidencia de ID de la configuración de la compilación. Si se omiten los filtros `include` y `exclude`, todas las configuraciones de compilación se monitorean para el proyecto especificado. 

Para Python versión 2, configura un ID de configuración de compilación por instancia utilizando la opción `build_configuration`:

```yaml
init_config:

instances:
  - server: http://teamcity.<ACCOUNT_NAME>.com

    ## @param projects - mapping - optional
    ## Mapping of TeamCity projects and build configurations to
    ## collect events and metrics from the TeamCity REST API.
    #
    build_configuration: <BUILD_CONFIGURATION_ID>
```

[Reinicia el Agent][5] para empezar a recopilar y enviar eventos de TeamCity a Datadog.

##### Recopilación de logs

1. Establecer la [configuración de registro][6] de TeamCity.

2. Por defecto, el pipeline de la integración de Datadog admite el siguiente tipo de formato de log:

   ```text
   [2020-09-10 21:21:37,486]   INFO -  jetbrains.buildServer.STARTUP - Current stage: System is ready
   ```

   Clona y edita el [pipeline de integración][7] si has definido diferentes [patrones] de conversión[8].

3. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

4. Anula los comentarios del bloque de configuración siguiente en tu archivo `teamcity.d/conf.yaml`. Cambia el valor de los parámetros `path` según tu entorno. Consulta el [teamcity.d/conf.yaml de ejemplol][2] para ver todas las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: file
       path: /opt/teamcity/logs/teamcity-server.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-activities.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-vcs.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-cleanup.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-notifications.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-ws.log
       source: teamcity
   ```

5. [Reinicia el Agent][5].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/teamcity/datadog_checks/teamcity/data/conf.yaml.example
[3]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md
[4]: https://www.jetbrains.com/help/teamcity/server-startup-properties.html#TeamCity+Internal+Properties
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://www.jetbrains.com/help/teamcity/teamcity-server-logs.html
[7]: https://docs.datadoghq.com/logs/log_configuration/pipelines/#integration-pipelines
[8]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `teamcity`                                                                                        |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                                     |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%", "use_openmetrics": "true"}`                                               |

##### Recopilación de logs

La recopilación de logs está deshabilitada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "teamcity"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando `status` del Agent][12] y busca `teamcity` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "teamcity" >}}


### Eventos

Los eventos de TeamCity que representan las compilaciones exitosas y fallidas se envían a Datadog.

### Checks de servicio
{{< get-service-checks-from-git "teamcity" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][13].

## Referencias adicionales

- [Seguimiento del impacto en el rendimiento de los cambios de código con TeamCity y Datadog][14]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://www.jetbrains.com/help/teamcity/enabling-guest-login.html
[3]: https://www.jetbrains.com/help/teamcity/managing-roles-and-permissions.html#Changing+Authorization+Mode
[4]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/authentication.jpg
[5]: https://www.jetbrains.com/help/teamcity/managing-roles-and-permissions.html
[6]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/create_role.jpg
[7]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/build_config_permissions.jpg
[8]: https://www.jetbrains.com/help/teamcity/creating-and-managing-users.html#Assigning+Roles+to+Users
[9]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/guest_user_settings.jpg
[10]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/assign_role.jpg
[11]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[12]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[13]: https://docs.datadoghq.com/help/
[14]: https://www.datadoghq.com/blog/track-performance-impact-of-code-changes-with-teamcity-and-datadog

---
"app_id": "lighttpd"
"app_uuid": "3d7ace6a-9efd-4d21-b4e6-a9956512a875"
"assets":
  "dashboards":
    "lighttpd": "assets/dashboards/lighttpd_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "lighttpd.performance.uptime"
      "metadata_path": "metadata.csv"
      "prefix": "lighttpd."
    "process_signatures":
    - "lighttpd"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "58"
    "source_type_name": "Lighttpd"
  "saved_views":
    "lighttpd_processes": "assets/saved_views/lighttpd_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/lighttpd/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "lighttpd"
"integration_id": "lighttpd"
"integration_title": "Lighttpd"
"integration_version": "5.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "lighttpd"
"public_title": "Lighttpd"
"short_description": "Realiza un seguimiento del tiempo de actividad, de los bytes utilizados, de las solicitudes por segundo, de los códigos de respuesta y mucho más."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Recopilación de logs"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Offering::Integración"
  "configuration": "README.md#Configuración"
  "description": "Realiza un seguimiento del tiempo de actividad, de los bytes utilizados, de las solicitudes por segundo, de los códigos de respuesta y mucho más."
  "media": []
  "overview": "README.md#Información general"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitor-lighttpd-web-server-metrics"
  "support": "README.md#Soporte"
  "title": "Lighttpd"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Dashboard de Lighttpd][1]

## Información general

El check de Lighttpd del Agent realiza un seguimiento del tiempo de actividad, de los bytes utilizados, de las solicitudes por segundo, de los códigos de respuesta y mucho más.

## Configuración

### Instalación

El check de Lighttpd está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tus servidores de Lighttpd.

Además, instala `mod_status` en tus servidores de Lighttpd.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `lighttpd.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][1]. Para ver todas las opciones de configuración disponibles, consulta el [ejemplo marathon.d/conf.yaml][2]:

   ```yaml
   init_config:

   instances:
     ## @param lighttpd_status_url - string - required
     ## Status url of your Lighttpd server.
     #
     - lighttpd_status_url: http://localhost/server-status?auto
   ```

2. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                           |
| -------------------- | --------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `lighttpd`                                                      |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                   |
| `<INSTANCE_CONFIG>`  | `{"lighttpd_status_url": "http://%%host%%/server-status?auto"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `lighttpd.d/conf.yaml` para empezar a recopilar logs de Lighttpd:

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: lighttpd
   ```

   Cambia el valor del parámetro `path` y configúralo para tu entorno.
   Para ver todas las opciones de configuración disponibles, consulta el [ejemplo lighttpd.d/conf.yaml][3].

3. [Reinicia el Agent][4].

### Validación

[Ejecuta el subcomando `status` del Agent][5] y busca `lighttpd` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "lighttpd" >}}


### Eventos

El check de Lighttpd no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "lighttpd" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][6].

## Referencias adicionales

- [Monitoriza métricas del servidor web Lighttpd con Datadog][7].



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/lighttpd/images/lighttpddashboard_2.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/help/
[7]: https://www.datadoghq.com/blog/monitor-lighttpd-web-server-metrics

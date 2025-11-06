---
app_id: php-fpm
app_uuid: 34faabdb-8545-4a45-a8bd-be0f979e99e7
assets:
  dashboards:
    php-fpm: assets/dashboards/php-fpm_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: php_fpm.processes.total
      metadata_path: metadata.csv
      prefix: php_fpm.
    process_signatures:
    - php-fpm
    - 'php-fpm:'
    - php7.0-fpm
    - inicio de php7.0-fpm
    - servicio PHP-fpm
    - reinicio de php7.0-fpm
    - reiniciar PHP-fpm
    - systemctl restart PHP-fpm.servicio
    - php7.0-fpm.service
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 117
    source_type_name: PHP-FPM
  saved_views:
    php-fpm_processes: assets/saved_views/php-fpm_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/php_fpm/README.md
display_on_public_website: true
draft: false
git_integration_title: php_fpm
integration_id: php-fpm
integration_title: PHP FPM
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: php_fpm
public_title: PHP FPM
short_description: Monitoriza estados de procesos, solicitudes lentas y solicitudes
  aceptadas.
supported_os:
- Linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Metrics
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza estados de procesos, solicitudes lentas y solicitudes aceptadas.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PHP FPM
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


![información general de PHP][1]

## Información general

El check de PHP-FPM monitoriza el estado de tu grupo de FPM y realiza un seguimiento del rendimiento de las solicitudes.

## Configuración

### Instalación

El check de PHP-FPM está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tu servidor.

### Configuración

Sigue las instrucciones de abajo para configurar este check para un Agent que se ejecuta en un host. En el caso de entornos en contenedores, consulta la sección [En contenedores](#containerized).

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `php_fpm.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][1]. Para ver todas las opciones de configuración disponibles, consulta el [marathon.d/conf.yaml de ejemplo][2]:

   ```yaml
   init_config:

   instances:
     ## @param status_url - string - required
     ## Get metrics from your FPM pool with this URL
     ## The status URLs should follow the options from your FPM pool
     ## See http://php.net/manual/en/install.fpm.configuration.php
     ##   * pm.status_path
     ## You should configure your fastcgi passthru (nginx/apache) to catch these URLs and
     ## redirect them through the FPM pool target you want to monitor (FPM `listen`
     ## directive in the config, usually a UNIX socket or TCP socket.
     #
     - status_url: http://localhost/status

       ## @param ping_url - string - required
       ## Get a reliable service check of your FPM pool with `ping_url` parameter
       ## The ping URLs should follow the options from your FPM pool
       ## See http://php.net/manual/en/install.fpm.configuration.php
       ##   * ping.path
       ## You should configure your fastcgi passthru (nginx/apache) to
       ## catch these URLs and redirect them through the FPM pool target
       ## you want to monitor (FPM `listen` directive in the config, usually
       ## a UNIX socket or TCP socket.
       #
       ping_url: http://localhost/ping

       ## @param use_fastcgi - boolean - required - default: false
       ## Communicate directly with PHP-FPM using FastCGI
       #
       use_fastcgi: false

       ## @param ping_reply - string - required
       ## Set the expected reply to the ping.
       #
       ping_reply: pong
   ```

2. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/php_fpm/datadog_checks/php_fpm/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedores" %}}

#### Contenedores

En el caso de los entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `php_fpm`                                                                                                                |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                                                            |
| `<INSTANCE_CONFIG>`  | `{"status_url":"http://%%host%%/status", "ping_url":"http://%%host%%/ping", "use_fastcgi": false, "ping_reply": "pong"}` |

#### Extras

##### Grupos múltiples

Es posible monitorizar múltiples grupos de PHP-FPM utilizando el mismo servidor proxy, un escenario común cuando se ejecuta en Kubernetes. Para ello, modifica las rutas de tu servidor para que apunten a diferentes instancias PHP-FPM. Este es un ejemplo de configuración de NGINX:

```text
server {
    ...

    location ~ ^/(status1|ping1)$ {
        access_log off;
        fastcgi_pass instance1_ip:instance1_port;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    location ~ ^/(status2|ping2)$ {
        access_log off;
        fastcgi_pass instance2_ip:instance2_port;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

Si esta estrategia a escala te resulta demasiado tediosa, configurar `use_fastcgi` como `true` instruye al check para que omita cualquier servidor proxy y se comunique directamente con PHP-FPM a través de FastCGI. El puerto por defecto es `9000` cuando se omite `status_url` o `ping_url`.

##### Sockets Unix

Si tu instalación de PHP-FPM utiliza sockets Unix, debes utilizar la siguiente sintaxis para `status_url`, `ping_url` y habilitar `use_fastcgi`:

| Parámetro     | Valor                             |
| ------------- | --------------------------------- |
| `status_url`  | `unix:///<FILE_PATH>.sock/status` |
| `ping_url`    | `unix:///<FILE_PATH>.sock/ping`   |
| `ping_reply`  | `pong`                            |
| `use_fastcgi` | `true`                            |

**Nota**: Con Autodiscovery, si el Agent se ejecuta en un(a) contenedor/tarea/pod separado(a), no tendrá acceso al archivo de sockets Unix de tu grupo de FPM. Para solucionar este inconveniente, ejecuta el Agent como sidecar.

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando `status` del Agent][3] y busca `php_fpm` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "php_fpm" >}}


### Eventos

El check de PHP-FPM no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "php_fpm" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/php_fpm/images/phpfpmoverview.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/
---
app_id: powerdns
app_uuid: 44e491e1-f7c3-447a-b597-e740196479e0
assets:
  dashboards:
    powerdns: assets/dashboards/powerdns_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: powerdns.recursor.questions
      metadata_path: metadata.csv
      prefix: powerdns.
    process_signatures:
    - pdns_server
    - systemctl start pdns@
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: !!int 144
    source_type_name: PowerDNS Recursor
  saved_views:
    powerdns_processes: assets/saved_views/powerdns_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- log collection
- network
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/README.md
display_on_public_website: true
draft: false
git_integration_title: powerdns_recursor
integration_id: powerdns
integration_title: Power DNS Recursor
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: powerdns_recursor
public_title: Power DNS Recursor
short_description: Vigila el tráfico extraño hacia y desde tus Power DNS Recursors.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caché
  - Category::Recopilación de logs
  - Category::Red
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integración
  configuration: README.md#Configuración
  description: Vigila el tráfico extraño hacia y desde tus Power DNS Recursors.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Power DNS Recursor
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Realiza un seguimiento del rendimiento de tu PowerDNS Recursor y monitoriza el tráfico extraño o preocupante. Este check del Agent recopila una variedad de métricas de tus recursors, incluyendo los de:

- Tiempos de respuesta de las consultas, para observar cuántas respuestas tardan menos de 1ms, 10ms, 100ms, 1s o más de 1s.
- Tiempos de espera de consultas.
- Aciertos y errores de caché.
- Índices de respuesta por tipo: SRVFAIL, NXDOMAIN, NOERROR.
- Paquetes ignorados y descartados.

Y muchos más.

## Configuración

### Instalación

El check del PowerDNS Recursor está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalar nada más en tus recursors.

### Configuración

#### Preparación de PowerDNS

Este check recopila estadísticas de rendimiento utilizando la API de estadísticas del PowerDNS Recursor. Las versiones de pdns_recursor anteriores a la v4.1 no habilitan la API de estadísticas por defecto. Si estás ejecutando una versión anterior, habilítala añadiendo lo siguiente a tu archivo de configuración del recursor, por ejemplo `/etc/powerdns/recursor.conf`:

```conf
webserver=yes
api-key=changeme                       # sólo disponible a partir de la v4.0
webserver-readonly=yes                 # por defecto no
#puerto del servidor web=8081         # por defecto 8082
#dirección del servidor web=0.0.0.0    # por defecto 127.0.0.1
```

Si ejecutas pdns_recursor v3.x, añade `experimental-` a los nombres de estas opciones, por ejemplo: `experimental-webserver=yes`.

Si ejecutas pdns_recursor v4.1 o posterior, simplemente configura `api-key`.

Reinicia el recursor para habilitar la API de estadísticas.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `powerdns_recursor.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][1]. Para ver todas las opciones de configuración disponibles, consulta el [powerdns_recursor.d/conf.yam de ejemplo][2]:

   ```yaml
   init_config:

   instances:
     ## @param host - string - required
     ## Host running the recursor.
     #
     - host: 127.0.0.1

       ## @param port - integer - required
       ## Recursor web server port.
       #
       port: 8082

       ## @param api_key - string - required
       ## Recursor web server api key.
       #
       api_key: "<POWERDNS_API_KEY>"

       ## @param version - integer - required - default: 3
       ## Version 3 or 4 of PowerDNS Recursor to connect to.
       ## The PowerDNS Recursor in v4 has a production ready web server that allows for
       ## statistics gathering. In version 3.x the server was marked as experimental.
       ##
       ## As the server was marked as experimental in version 3 many of the metrics have
       ## changed names and the API structure (paths) have also changed. With these changes
       ## there has been a need to separate the two concerns. The check now has a key value
       ## version: which if set to version 4 queries with the correct API path on the
       ## non-experimental web server.
       ##
       ## https://doc.powerdns.com/md/httpapi/api_spec/#url-apiv1serversserver95idstatistics
       #
       version: 3
   ```

2. [Reinicia el Agent][3].

##### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade el usuario `dd-agent` al grupo `systemd-journal` ejecutando:
   ```text
   usermod -a -G systemd-journal dd-agent
   ```

3. Añade este bloque de configuración al archivo `powerdns_recursor.d/conf.yaml` para empezar a recopilar logs del PowerDNS Recursor:

   ```yaml
   logs:
     - type: journald
       source: powerdns
   ```

   Para ver todas las opciones de configuración disponibles, consulta el [powerdns_recursor.d/conf.yaml de ejemplo][2].

4. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/datadog_checks/powerdns_recursor/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedorizado

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `powerdns_recursor`                                                              |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                    |
| `<INSTANCE_CONFIG>`  | `{"host":"%%host%%", "port":8082, "api_key":"<POWERDNS_API_KEY>", "version": 3}` |

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en Datadog Agent. Para activarla, consulta [recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "powerdns"}`                  |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de `status` del Agent][2] y busca `powerdns_recursor` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "powerdns" >}}


### Eventos

El check del PowerDNS Recursor no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "powerdns" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/help/

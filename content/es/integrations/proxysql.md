---
app_id: proxysql
app_uuid: aadfa11b-3de5-4827-9cdd-888c4e9587d0
assets:
  dashboards:
    ProxySQL Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: proxysql.active_transactions
      metadata_path: metadata.csv
      prefix: proxysql.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10096
    source_type_name: ProxySQL
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: ayuda@datadoghq.com
categories:
- almacenes de datos
- recopilación de logs
- almacenamiento en caché
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/proxysql/README.md
display_on_public_website: true
draft: false
git_integration_title: proxysql
integration_id: proxysql
integration_title: ProxySQL
integration_version: 7.0.0
is_public: true
manifest_version: 2.0.0
name: proxysql
public_title: ProxySQL
short_description: Recopila tus métricas y logs de ProxySQL.
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
  - Categoría::Almacenes de datos
  - Categoría::Recopilación de logs
  - Categoría::Almacenamiento en caché
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopila tus métricas y logs de ProxySQL.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: ProxySQL
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [ProxySQL][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

La integración ProxySQL está incluida en el paquete del [Datadog Agent][3], por lo que no necesitas instalar nada más en tus servidores.

### Configuración

#### Activación de SSL
Para conectarte a ProxySQL utilizando la validación SSL/TLS completa, habilita la opción `tls_verify` en `conf.yaml`. Incluye los certificados y las contraseñas necesarios para conectarse con SSL/TLS.

```yaml
    tls_verify: true
    tls_ca_cert: ca_cert.pem
```

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `proxysql.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][1]  para empezar a recopilar tus datos de rendimiento de ProxySQL. Consulta el [proxysql.d/conf.yaml de ejemplo][2] para ver todas las opciones de configuración disponibles.

2. [Reinicia el Agent][3].

##### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade los archivos de logs que te interesan a tu archivo `proxysql.d/conf.yaml` para empezar a recopilar tus logs de ProxySQL:

   ```yaml
     logs:
         # Default logging file
       - type: file
         path: /var/log/proxysql.log
         source: proxysql
         service: "<SERVICE_NAME>"
         # Logged queries, file needs to be in JSON
         # https://github.com/sysown/proxysql/wiki/Query-Logging
       - type: file
         path: "<QUERY_LOGGING_FILE_PATH>"
         source: proxysql
         service: "<SERVICE_NAME>"
         # Audit log
         # https://github.com/sysown/proxysql/wiki/Audit-log
       - type: file
         path: "<AUDIT_LOG_FILE_PATH>"
         source: proxysql
         service: "<SERVICE_NAME>"
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [proxysql.d/conf.yaml de ejemplo][2] para ver todas las opciones de configuración disponibles.

3. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/proxysql/datadog_checks/proxysql/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedorizado

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

#### Recopilación de métricas

| Parámetro            | Valor                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `proxysql`                                                   |
| `<INIT_CONFIG>`      | en blanco o `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port": "%%port%%", "username": "<USER>", "password": "<PASSWORD>"}`       |

##### Recopilación de logs

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "proxysql", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `proxysql` en la sección Checks:

## Datos recopilados

### Métricas
{{< get-metrics-from-git "proxysql" >}}


### Eventos

El check de ProxySQL no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "proxysql" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].



[1]: https://proxysql.com/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/es/help
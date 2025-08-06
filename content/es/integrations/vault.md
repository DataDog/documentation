---
app_id: vault
app_uuid: 450e17a2-3ca0-4dc5-800c-99c5db736073
assets:
  dashboards:
    Vault - Overview: assets/dashboards/vault_overview_legacy.json
    Vault - Overview (OpenMetricsV2): assets/dashboards/vault_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: vault.is_leader
      metadata_path: metadata.csv
      prefix: vault.
    process_signatures:
    - vault server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10059
    source_type_name: Vault
  monitors:
    Time to access secrets is high: assets/monitors/vault_S3_time_high.json
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    service_name_overview: assets/saved_views/service_name_overview.json
    vault_patern: assets/saved_views/vault_patern.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/vault/README.md
display_on_public_website: true
draft: false
git_integration_title: vault
integration_id: vault
integration_title: Vault
integration_version: 6.1.0
is_public: true
manifest_version: 2.0.0
name: vault
public_title: Vault
short_description: Vault es una aplicación de servicios de gestión de secretos
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Vault es una aplicación de servicios de gestión de secretos
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-hashicorp-vault-with-datadog
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-vault-metrics-and-logs/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/vault-monitoring-tools
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/vault-monitoring-with-datadog
  support: README.md#Soporte
  title: Vault
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza el estado del clúster y los cambios de líder de [Vault][1].

## Configuración

### Instalación

El check de Vault está incluido en el paquete del [Datadog Agent][2].


A partir de la versión 3.4.0, esta integración basada en OpenMetrics tiene un modo "más reciente" (`use_openmetrics`: verdadero) y un modo legacy (`use_openmetrics`: falso). Para obtener todas las funciones más actualizadas, Datadog recomienda habilitar el modo "más reciente". Ten en cuenta que el modo "más reciente" requiere Python 3. Para obtener más información, consulta [Versiones más recientes y heredadas de integraciones basadas en OpenMetrics][3].

1. Asegúrate de que has activado [métricas de Prometheus en la configuración de Vault][4].


2. Para que el check de Vault funcione correctamente, es necesario habilitar el acceso no autenticado a métricas de Vault (utilizando Vault v1.3.0 o posterior) o proporcionar un token de cliente de Vault:

   * Para habilitar el acceso no autenticado, define la configuración [`unauthenticated_metrics_access`][5] de Vault como `true`. Esto permite el acceso no autenticado al endpoint `/v1/sys/metrics`.

     **Nota**: El endpoint `/sys/metrics` requiere Vault v1.1.0 o posterior para recopilar métricas.

   * Para utilizar un token de cliente de Vault, sigue el siguiente ejemplo. El ejemplo utiliza el método de autenticación JWT, pero también puede utilizar otros [métodos de autenticación][6]. 

La integración Vault requiere las siguientes capacidades:

* Contenido de `metrics_policy.hcl`:

  ```text
  path "sys/metrics*" {
    capabilities = ["read", "list"]
  }
  ```

* Configura la política y el rol:

  ```text
  $ vault policy write metrics /path/to/metrics_policy.hcl
  $ vault auth enable jwt
  $ vault write auth/jwt/config jwt_supported_algs=RS256 jwt_validation_pubkeys=@<PATH_TO_PUBLIC_PEM>
  $ vault write auth/jwt/role/datadog role_type=jwt bound_audiences=<AUDIENCE> user_claim=name token_policies=metrics
  $ vault agent -config=/path/to/agent_config.hcl
  ```

* Contenido de `agent_config.hcl`:

  ```
  exit_after_auth = true
  pid_file = "/tmp/agent_pid"

  auto_auth {
    method "jwt" {
      config = {
        path = "<JWT_CLAIM_PATH>"
        role = "datadog"
      }
    }

    sink "file" {
      config = {
        path = "<CLIENT_TOKEN_PATH>"
      }
    }
  }

  vault {
    address = "http://0.0.0.0:8200"
  }
  ```

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `vault.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1], para empezar a recopilar los datos de rendimiento de tu Vault. Para conocer todas las opciones de configuración disponibles, consulta el [vault.d/conf.yaml de ejemplo][2].

   Configuración para ejecutar la integración sin un token (con la opción de configuración de Vault `unauthenticated_metrics_access` definida como verdadera):

    ```yaml
    init_config:

    instances:
        ## @param api_url - string - required
        ## URL of the Vault to query.
        #
      - api_url: http://localhost:8200/v1

        ## @param no_token - boolean - optional - default: false
        ## Attempt metric collection without a token.
        #
        no_token: true
    ```

   Configuración para ejecutar la integración con un token de cliente:

    ```yaml
    init_config:

    instances:
        ## @param api_url - string - required
        ## URL of the Vault to query.
        #
      - api_url: http://localhost:8200/v1

        ## @param client_token - string - optional
        ## Client token necessary to collect metrics.
        #
        client_token: <CLIENT_TOKEN>

        ## @param client_token_path - string - optional
        ## Path to a file containing the client token. Overrides `client_token`.
        ## The token will be re-read after every authorization error.
        #
        # client_token_path: <CLIENT_TOKEN_PATH>
    ```

2. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/vault/datadog_checks/vault/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                    |
| -------------------- | ---------------------------------------- |
| `<INTEGRATION_NAME>` | `vault`                                  |
| `<INIT_CONFIG>`      | en blanco o `{}`                            |
| `<INSTANCE_CONFIG>`  | `{"api_url": "http://%%host%%:8200/v1"}` |

`INSTANCE_CONFIG` debe personalizarse en función de la configuración de autenticación de tu Vault. Consulta el ejemplo en la sección Host más arriba. 

#### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Configura Vault para activar logs de auditoría y servidor.

   - Los logs de auditoría deben ser habilitados por un usuario privilegiado con las políticas apropiadas. Para obtener más información, consulta [Activación de dispositivos de auditoría][2].

     ```shell
     vault audit enable file file_path=/vault/vault-audit.log
     ```

   - Asegúrate de que los [logs de servidor][3] se escriban en el archivo. Puedes configurar logs de servidor estáticos en el [script de inicio systemd Vault][4].
     El siguiente script envía logs a `/var/log/vault.log`.

     ```text
     ...
     [Service]
     ...
     ExecStart=/bin/sh -c '/home/vagrant/bin/vault server -config=/home/vagrant/vault_nano/config/vault -log-level="trace" > /var/log/vault.log
     ...
     ```

3. Añade este bloque de configuración a tu archivo `vault.d/conf.yaml` para empezar a recopilar logs de Vault:

   ```yaml
   logs:
     - type: file
       path: /vault/vault-audit.log
       source: vault
       service: "<SERVICE_NAME>"
     - type: file
       path: /var/log/vault.log
       source: vault
       service: "<SERVICE_NAME>"
   ```

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://learn.hashicorp.com/vault/operations/troubleshooting-vault#enabling-audit-devices
[3]: https://learn.hashicorp.com/vault/operations/troubleshooting-vault#vault-server-logs
[4]: https://learn.hashicorp.com/vault/operations/troubleshooting-vault#not-finding-the-server-logs
{{% /tab %}}
{{< /tabs >}}

### Validación

Ejecuta el [subcomando de estado del Agent][7] y busca `vault` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "vault" >}}



[Métricas que empiezan con `vault.replication.fetchRemoteKeys`, `vault.replication.merkleDiff` y `vault.replication.merkleSync`] no se notifican a menos que la replicación se encuentre en un estado no saludable. 

### Eventos

`vault.leader_change`:
Este evento se dispara cuando cambia el líder de clúster.

### Checks de servicio
{{< get-service-checks-from-git "vault" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización de HashiCorp Vault con Datadog][9]
- [Monitorización de métricas y logs de HashiCorp Vault][10]
- [Herramientas para la monitorización de HashiCorp Vault][11]
- [Monitorización de HashiCorp Vault con Datadog][12]


[1]: https://www.vaultproject.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/integrations/guide/versions-for-openmetrics-based-integrations
[4]: https://www.vaultproject.io/docs/configuration/telemetry#prometheus
[5]: https://www.vaultproject.io/docs/configuration/listener/tcp#unauthenticated_metrics_access
[6]: https://www.vaultproject.io/docs/auth
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/es/help/
[9]: https://www.datadoghq.com/blog/monitor-hashicorp-vault-with-datadog
[10]: https://www.datadoghq.com/blog/monitor-vault-metrics-and-logs/
[11]: https://www.datadoghq.com/blog/vault-monitoring-tools
[12]: https://www.datadoghq.com/blog/vault-monitoring-with-datadog
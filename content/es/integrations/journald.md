---
app_id: journald
app_uuid: 2ee4cbe2-2d88-435b-9ed9-dbe07ca1d059
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10167
    source_type_name: journald
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/journald/README.md
display_on_public_website: true
draft: false
git_integration_title: journald
integration_id: journald
integration_title: journald
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: journald
public_title: journald
short_description: Monitoriza tus logs systemd-journald con Datadog.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza tus logs systemd-journald con Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: journald
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Systemd-journald es un servicio de sistema que recopila y almacena datos de registro. 
Crea y mantiene diarios estructurados e indexados basados en información de registro procedente de diversas fuentes.

## Configuración

### Instalación

El check de journald está incluido en el paquete del [Datadog Agent ][1].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

Los archivos del diario, por defecto, son propiedad del grupo del sistema systemd-journal y pueden ser leidos por él. Para empezar a recopilar tus logs de diario, debes hacer lo siguiente:

1. [Instala el Agent][2] en la instancia que ejecuta el diario.
2. Añade el usuario `dd-agent` al grupo `systemd-journal` ejecutando:
    ```text
     usermod -a -G systemd-journal dd-agent
    ```

{{< tabs >}}
{{% tab "Host" %}}

Para configurar este check para un Agent que se ejecuta en un host:

Edita el archivo `journald.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent][1] para empezar a recopilar logs.

#### Recopilación de logs

La recopilación de Logs está desactivada por defecto en el Datadog Agent, debe activarla en `datadog.yaml` con:

```yaml
logs_enabled: true
```

A continuación, añade este bloque de configuración a tu archivo `journald.d/conf.yaml` para empezar a recopilar tus logs:

```yaml
logs:
    - type: journald
      container_mode: true
```

Para rellenar los atributos `source` y `service`, el Agent recopila `SYSLOG_IDENTIFIER`, `_SYSTEMD_UNIT` y `_COMM`y los establece en el primer valor no vacío. Para aprovechar las ventajas de pipelines de integración, Datadog recomienda establecer el parámetro `SyslogIdentifier` en el archivo de servicio `systemd` directamente, o en un archivo de anulación de servicio `systemd`. Su localización depende de tu distribución, pero puedes encontrar la localización del archivo de servicio `systemd` usando el comando `systemctl show -p FragmentPath <unit_name>`.

**Nota**: Con Agent 7.17+, si `container_mode` se establece en `true`, el comportamiento por defecto cambia para logs procedentes de contenedores de Docker. El atributo `source` de tus logs se establecen automáticamente en el nombre corto de imagen correspondiente del contenedor en lugar de simplemente `docker`.

[Reinicia el Agent][2].


[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

#### Recopilación de logs


La recopilación de logs está desactivada por defecto en Datadog Agent. Para activarla, consulta [recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "journald", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}


#### Funciones avanzadas

##### Cambiar la localización del diario

Por defecto, el Agent busca el diario en las siguientes localizaciones:

- `/var/log/journal`
- `/run/log/journal`

Si tu diario se encuentra en otro lugar, añade un parámetro `path` con la ruta del diario correspondiente.

##### Filtrar unidades del diario

Puedes filtrar unidades específicas _a nivel de sistema_ utilizando estos parámetros:

- `include_units`: incluye todas las unidades de nivel de sistema especificadas.
- `exclude_units`: excluye todas las unidades de nivel de sistema especificadas.


Ejemplo:

```yaml
logs:
    - type: journald
      path: /var/log/journal/
      include_units:
          - docker.service
          - sshd.service
```

En el Datadog Agent versión `7.37.0`+, puedes filtrar unidades _a nivel de usuario_ mediante el uso de estos parámetros:

- `include_user_units`: incluye todas las unidades de nivel de usuario especificadas.
- `exclude_user_units`: excluye todas las unidades de nivel de usuario especificadas.

**Nota**: Utiliza el comodín `*` en `exclude_units` o `exclude_user_units` para especificar un log de JournaId particular. El comodín `*` no funciona con `include_units`. Por defecto, si no hay unidades ni para el sistema ni para el usuario, y no se definen coincidencias, se recopilan todos los logs diarios.

Ejemplo:

```yaml
logs:
    # Collect all system-level unit logs.
    - type: journald
      exclude_user_units:
          - '*'
```

##### Filtrar los mensajes del diario

En el Datadog Agent versión `7.39.0`+, puedes filtrar mensajes arbitrarios utilizando pares de clave-valor con estos parámetros:

- `include_matches`: incluye mensajes coincidentes con `key=value`
- `exclude_matches`: excluye los mensajes que coinciden con `key=value`


Ejemplo:

```yaml
logs:
    - type: journald
      path: /var/log/journal/
      include_matches:
          - _TRANSPORT=kernel
```

##### Seguimiento del mismo diario varias veces

Si deseas informar de unidades con diferentes fuentes o etiquetas de servicio, éstas deben aparecer en configuraciones de journald separadas.

Para ello debes identificar unívocamente la configuración del diario con un `config_id` (disponible en Agent `7.41.0` +).

```yaml
logs:
    - type: journald
      config_id: my-app1
      source: my-app1
      service: my-app1
      include_units:
          - my-app1.service

    - type: journald
      config_id: my-app2
      source: my-app2
      service: my-app2
      include_units:
          - my-app2.service
```

##### Recopilar etiquetas de contenedor

Las etiquetas son fundamentales para encontrar información en entornos en contenedores altamente dinámicos, por lo que el Agent puede recopilar etiquetas de contenedor en logs de journald.

Esto funciona automáticamente cuando el Agent se está ejecutando desde el host. Si estás utilizando la versión en contenedores del Datadog Agent, integra la ruta de tu diario y el siguiente archivo:

- `/etc/machine-id`: esto asegura que el Agent puede consultar el diario almacenado en el host.

### Validación

Ejecuta el [subcomando de estado][3] del Agent y busca `journald` en la sección Logs del Agent.

## Datos recopilados

### Métricas

journald no incluye ninguna métrica.

### Checks de servicio

journald no incluye ningún check de servicio.

### Eventos

journald no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].


[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/
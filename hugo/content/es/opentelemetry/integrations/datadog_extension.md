---
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: Documentación
  text: Configuración de OpenTelemetry Collector
- link: /infrastructure/list/
  tag: Documentación
  text: Lista de infraestructuras
- link: /infrastructure/resource_catalog/
  tag: Documentación
  text: Resource Catalog
title: Extensión de Datadog
---

## Información general

A partir de OpenTelemetry Collector Contrib [módulos v0.129.0][4] y posteriores, la extensión de Datadog se incluye en [distribuciones de contribución][5] del recopilador de OpenTelemetry. También está disponible para [compilaciones personalizadas][6] del recopilador de OpenTelemetry.

La extensión de Datadog te permite visualizar la configuración del recopilador de OpenTelemetry y la información de compilación directamente en Datadog en la [Lista de infraestructuras][2] y [Resource Catalog][3]. Cuando se utiliza con [Datadog Exporter][1], esta extensión te ofrece visibilidad de tu flota de recopiladores sin salir de la interfaz de usuario de Datadog.

{{< img src="/opentelemetry/integrations/datadog_extension_hostlist.png" alt="Configuración del recopilador de OpenTelemetry mostrada en la lista de hosts de Datadog" style="width:100%;" >}}

## Características principales

- **Visibilidad de la configuración del recopilador**: Visualiza la configuración completa de cualquier recopilador de tu infraestructura.
- **Información de compilación**: Consulta la versión del recopilador, los detalles de la compilación y la información de los componentes.
- **Gestión de flotas**: Monitoriza y gestiona tu flota de recopiladores de OpenTelemetry desde la interfaz de usuario de Datadog.
- **Endpoint de inspección local**: Utiliza un endpoint de HTTP para la depuración local y la verificación de la configuración.

## Instalación

### 1. Añade la extensión de Datadog a la configuración del recopilador.

Configura la extensión de Datadog en tu archivo de configuración del recopilador de OpenTelemetry:

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    # hostname: "my-collector-host"  # Optional: must match Datadog Exporter hostname if set

service:
  extensions: [datadog]
```

### 2. Configura el exportador de Datadog 

Esta función requiere que el exportador de Datadog esté configurado y activado en un pipeline activo (`traces` o `metrics`). La extensión utiliza la telemetría del exportador para asociar la configuración del recopilador con un host específico en Datadog.

```yaml
exporters:
  datadog/exporter:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    # hostname: "my-collector-host"  # Optional: must match Datadog Extension hostname if set
```

### 3. Activa la extensión en la configuración de tu servicio

Añade la extensión de Datadog a tus extensiones de servicio:

```yaml
service:
  extensions: [datadog]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/exporter]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/exporter]
```

## Opciones de configuración

| Parámetro | Descripción | Valor predeterminado |
|-----------|-------------|---------|
| `api.key` | Clave de API de Datadog (obligatoria) | - |
| `api.site` | Sitio de Datadog (por ejemplo, `us5.datadoghq.com`) | `datadoghq.com` |
| `hostname` | Nombre de host personalizado para el recopilador | Autodetección |
| `http.endpoint` | Endpoint del servidor HTTP local | `localhost:9875` |
| `http.path` | Ruta de acceso al servidor HTTP para metadatos | `/metadata` |
| `proxy_url` | URL de proxy HTTP para solicitudes salientes | - |
| `timeout` | Tiempo de espera para solicitudes HTTP | `30s` |
| `tls.insecure_skip_verify` | Omitir la verificación de certificados TLS | `false` |

<div class="alert alert-danger">
<strong>Coincidencia de nombres de host</strong>: si especificas un <code>nombre de host</code> personalizado en la extensión de Datadog, <strong>debe</strong> coincidir con el valor del <code>nombre de host</code> en la configuración del exportador de Datadog. La extensión de Datadog no tiene acceso a la telemetría de pipeline y no puede deducir nombres de host de los spans (tramos) entrantes. Solo obtiene los nombres de host de las API del sistema/proveedor de la nube o de la configuración manual. Si la telemetría tiene <a href="/OpenTelemetry/config/hostname_tagging/?tab=host">atributos del nombre de host</a> diferentes del nombre de host informado por la extensión, la telemetría no se correlacionará con el host correcto y es posible que veas hosts duplicados en Datadog.
</div>

### Ejemplo de configuración completa

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    hostname: "my-collector-host"
    http:
      endpoint: "localhost:9875"
      path: "/metadata"
    proxy_url: "http://proxy.example.com:8080"
    timeout: 30s
    tls:
      insecure_skip_verify: false

exporters:
  datadog/exporter:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    hostname: "my-collector-host"

service:
  extensions: [datadog]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/exporter]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/exporter]
```

## Visualización de la configuración del recopilador

Una vez configurado, puedes visualizar la configuración del recopilador de OpenTelemetry y la información de compilación en dos ubicaciones:

### Lista de infraestructuras (Lista de hosts)

1. Ve a **[Infraestructure > Hosts][2]** (Infraestructura > Hosts) en tu cuenta de Datadog.
2. Haz clic en cualquier host que ejecute el recopilador de OpenTelemetry (**Nota**: filtra por `field:apps:OpenTelemetry` para mostrar solo las instancias del recopilador).
3. En el panel de detalles del host, selecciona la pestaña **OTel Collector** (Recopilador de OpenTelemetry) para consultar la información de compilación y la configuración completa del recopilador.

### Catálogo de recursos

1. Ve a **[Infrastructure > Resource Catalog][3]** (Infraestructura > Resource Catalog) en tu cuenta de Datadog 
2. Filtra por hosts o busca tus instancias del recopilador.
3. Haz clic en cualquier host que ejecute el recopilador de OpenTelemetry.
4. Desplázate a **Collector** (Recopilador) para consultar la información de compilación y la configuración completa del recopilador.

## Servidor HTTP local

La extensión de Datadog incluye un servidor HTTP local para depuración e inspección:

```bash
# Access collector metadata locally
curl http://localhost:9875/metadata
```

Este endpoint proporciona:
- Configuración del recopilador (sin información confidencial)
- Información sobre la compilación y detalles de la versión
- Lista de componentes activos
- Estado de la extensión

## Solucionar problemas

### La configuración no aparece en Datadog

1. **Check la coincidencia de nombres de host**: Asegúrate de que los nombres de host coincidan entre la extensión de Datadog y el exportador de Datadog.
2. **Verificar la clave de API**: Confirma que la clave de API sea válida y que tenga los permisos adecuados.
3. **Check los logs del recopilador**: Busca los logs de inicialización de la extensión y de envío de datos.
4. **Confirmar que la extensión esté activada**: Verifica que la extensión aparezca en la configuración del servicio.

### Problemas con el servidor HTTP

1. **Conflictos de puertos**: Asegúrate de que el puerto 9875 esté disponible o configura un puerto diferente.
2. **Acceso a la red**: Verifica que el servidor HTTP esté accesible desde tu ubicación de depuración.
3. **Check los logs**: Revisa los logs de la extensión en busca de problemas de inicio del servidor HTTP.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/catalog
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.129.0
[5]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/tag/v0.129.1
[6]: https://opentelemetry.io/docs/collector/custom-collector/
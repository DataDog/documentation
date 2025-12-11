---
app_id: sentinelone
app_uuid: 4b8cdc1f-0f97-4e19-b127-99427b56df88
assets:
  dashboards:
    SentinelOne-Overview: assets/dashboards/SentinelOne-Overview_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 611
    source_type_name: SentinelOne
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sentinelone
integration_id: sentinelone
integration_title: SentinelOne
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sentinelone
public_title: SentinelOne
short_description: Recopilar alertas, amenazas y telemetría del endpoint de SentinelOne
  Singularity
supported_os:
- windows
- macOS
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Linux
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopilar alertas, amenazas y telemetría del endpoint de SentinelOne
    Singularity
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: SentinelOne
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

SentinelOne es una solución de detección y respuesta de endpoints (EDR) para detectar, proteger y responder a amenazas de endpoints. El endpoint de SentinelOne Singularity utiliza detecciones estáticas y de comportamiento para identificar y contener amenazas conocidas y desconocidas en toda la empresa. Es compatible con los sistemas operativos Windows, MacOS y Linux.

Utiliza esta integración para recopilar logs de actividad, alertas y amenazas directamente desde la API de gestión de SentinelOne. La combinación de SentinelOne y [Datadog Cloud SIEM][1] te ofrece una visibilidad completa de tu infraestructura de nube y de tus endpoints. La regla de detección predefinida muestra las alertas integradas en SentinelOne y cualquier amenaza personalizada, junto con el resto de las señales de Cloud SIEM, para tener una vista única de todos tus sistemas.

También puedes configurar [SentinelOne Cloud Funnel][2] para reenviar telemetría sin procesar de SentinelOne desde un bucket de Amazon S3 a Datadog. Los clientes con Cloud SIEM pueden utilizar estos datos de telemetría EDR para el almacenamiento a largo plazo, las detecciones personalizadas, las investigaciones y los informes.

Todos los datos de logs recopilados se analizan y normalizan para facilitar las búsquedas y su gestión en dashboards.

## Configuración

Los clientes de SentinelOne pueden recopilar alertas, amenazas y logs de actividad, así como telemetría de Cloud Funnel. Sigue las siguientes instrucciones para configurar la recopilación de datos:

### Recopilar alertas, amenazas y logs de actividad

1. Inicia sesión en tu consola de SentinelOne Cloud y haz clic en **Settings** (Configuración).
2. Selecciona la pestana **Users** (Usuarios).
3. Selecciona **Service Users** (Usuarios de servicios).
4. Haz clic en **Actions** (Acciones) y selecciona **Create New Service User** (Crear nuevo usuario de servicio).
5. En la ventana emergente **Create New Service User** (Crear nuevo usuario servicio) que se abre, introduce un **Nombre** y una **Descripción** y, a continuación, selecciona una **Fecha de caducidad** personalizada en 10 años.
6. Haz clic en **Next** (Siguiente).
7. Selecciona **Site** (Sitio) y luego selecciona Visor para tu sitio.
8. Haz clic en **Create User** (Crear usuario).
9. En la ventana emergente que se abre, haz clic en **Copy API Token** (Copiar token de API) para copiar el nuevo token.
   {{% site-region region="gov" %}}
10. Habilita los siguientes permisos de endpoint para tu cuenta de usuario de servicio SentinelOne:

- Vista
- Ver amenazas
- Mostrar aplicaciones
- Buscar con visibilidad orofunda
- Recuperar logs
  {{% /site-region %}}

### Recopilar telemetría de SentinelOne Cloud Funnel

**Nota**: Inicia sesión en tu cuenta del portal del cliente de SentinelOne para acceder a la documentación de SentinelOne.

1. Crea y configura un bucket de Amazon S3. Para obtener instrucciones, consulta [Configurar tu bucket de Amazon S3][3] en la documentación de SentinelOne.
2. Configura la transmisión de Cloud Funnel en tu consola de administración de SentinelOne. Para obtener instrucciones, consulta [Activar la transmisión de Cloud Funnel][4] en la documentación de SentinelOne.

   En la página de configuración de Cloud Funnel, utiliza los siguientes valores:

   - **Proveedor de nube**: AWS (Amazon Web Services)
   - **Nombre del bucket de S3**: El nombre del bucket de S3 que creaste en el primer paso

3. En S3, comprueba que tus logs de Cloud Funnel se dirigen a tu bucket de S3.
4. Despliega el stack tecnológico CloudFromation del Datadog Forwarder haciendo clic en **Launch Stack** (Iniciar stack tecnológico) en la página [Datadog Forwarder > CloudFormation][5].

   Configura los siguientes parámetros:

   - `DdApiKey`: Tu clave de API Datadog
   - `DdSite`: Tu [sitio Datadog][6]
   - `DdTags`: `source:sentinelone,service:sentinelone,endpoint:EDR_Telemetry`

5. En la consola de AWS, abre la función Lambda de tu Datadog Forwarder. Ve a la pestaña **Triggers** (Activadores) y selecciona **Add trigger** (Añadir activador).

   - Selecciona **S3** como tipo de activador.
   - En **Bucket**, introduce tu bucket de S3.
   - En **evento types**, seleccione **All object create eventos**.

#### Verificación

En la consola AWS, consulta la pestaña **Monitor** de tu función Lambda en busca de errores.

En el Explorador de logs de Datadog, busca tus logs de SentinelOne.

## Datos recopilados

### Métricas

SentinelOne no incluye métricas.

### Logs

Los logs proceden de las siguientes fuentes:

- **Actividad Logs** registra los datos de las actividades de gestión en la Consola SentinelOne. Por ejemplo, cuando se añade, elimina o cambian las reglas de autenticación (2FA) de un usuario, un evento registra la actividad. Del mismo modo, cuando una amenaza se mitiga o permanece sin mitigar, se genera un evento. Estos eventos pueden utilizarse para investigaciones y búsqueda de amenazas.
- Las **amenazas** implican la detección de determinadas actividades maliciosas, prácticas de riesgo y ataques como los intentos de ataques de fuerza bruta y la pulverización de contraseñas. Los logs incluyen creaciones y actualizaciones de amenazas.
- **Las alertas** le permiten generar y distribuir alertas eventos cuando se cumplen sus condiciones. La condición normalmente implica un métrica que se mueve por encima o por debajo de un valor umbral, la ocurrencia de un evento, o la ocurrencia de múltiples eventos en un periodo de tiempo.

### Eventos

El SentinelOne integración no incluye ninguna eventos.

### Checks de servicios
{{< get-service-checks-from-git "sentinelone" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://app.datadoghq.com/security/siem/home
[2]: https://www.sentinelone.com/platform/singularity-cloud-funnel/
[3]: https://community.sentinelone.com/s/article/000006282
[4]: https://community.sentinelone.com/s/article/000006285
[5]: https://docs.datadoghq.com/es/logs/guide/forwarder/?tab=cloudformation#cloudformation
[6]: https://docs.datadoghq.com/es/getting_started/site/
[7]: https://github.com/DataDog/integrations-internal-core/blob/master/sentinelone/assets/service_checks.json
[8]: https://docs.datadoghq.com/es/help/
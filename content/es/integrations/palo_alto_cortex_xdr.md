---
app_id: palo-alto-cortex-xdr
app_uuid: 156afdc8-d8e9-4544-92fd-d8da87278671
assets:
  dashboards:
    Palo Alto Cortex XDR - Alerts: assets/dashboards/palo_alto_cortex_xdr_alerts.json
    Palo Alto Cortex XDR - Incidents: assets/dashboards/palo_alto_cortex_xdr_incidents.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 20766332
    source_type_name: Palo Alto Cortex XDR
  logs:
    source: palo-alto-cortex-xdr
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
- https://github.com/DataDog/integrations-core/blob/master/palo_alto_cortex_xdr/README.md
display_on_public_website: true
draft: false
git_integration_title: palo_alto_cortex_xdr
integration_id: palo-alto-cortex-xdr
integration_title: Palo Alto Cortex XDR
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: palo_alto_cortex_xdr
public_title: Palo Alto Cortex XDR
short_description: Obtener información sobre logs de Palo Alto Cortex XDR
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Configuración
  description: Obtener información sobre logs de Palo Alto Cortex XDR
  media:
  - caption: Palo Alto Cortex XDR - Incidentes
    image_url: images/palo_alto_cortex_xdr_incidents.png
    media_type: imagen
  - caption: Palo Alto Cortex XDR - Alertas
    image_url: images/palo_alto_cortex_xdr_alerts.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Palo Alto Cortex XDR
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

[Palo Alto Cortex XDR][1] es una plataforma integral de detección y respuesta que proporciona protección avanzada frente a amenazas en endpoints, redes y entornos de nube. Integra la protección de endpoints, la seguridad de red y los análisis para ofrecer visibilidad y capacidad de respuesta en tiempo real y combatir las ciberamenazas sofisticadas de forma eficaz.

Esta integración ingiere los siguientes logs:

- Incidente: Representa información de artefactos, recursos y alertas de un evento de amenaza, incluyendo su gravedad, su estado y los usuarios que los manejan.
- Alerta: Representa el análisis en tiempo real de las alertas, incluyendo su gravedad, su frecuencia y su origen.

La integración Palo Alto Cortex XDR recopila sin interrupción datos de logs de Palo Alto Cortex XDR a través de las API REST. Antes de ingerir los datos, normaliza y enriquece los logs, garantizando un formato de datos constante y mejorando el contenido de la información para su posterior procesamiento y análisis. La integración proporciona información sobre incidentes y alertas utilizando dashboards predefinidos.

## Configuración

### Generar credenciales de API en Palo Alto Cortex XDR

1. Inicia sesión en tu cuenta de **Palo Alto Cortex XDR**.
2. Ve a **Settings** > **Configurations** > **Integrations** > **API Keys** (Parámetros > Configuraciones > Integraciones > Claves de API).
3. Haz clic en **New Key** (Nueva clave).
4. Elige el tipo de clave de API en función del nivel de seguridad que busques: **Avanzado** o **Estándar**.
5. Si quieres definir un límite de tiempo para la autenticación de la clave de API, selecciona **Habilitar fecha de caducidad** y luego selecciona la **fecha y hora de caducidad**. Ve a **Settings** > **Configurations** > **Integrations** > **API Keys** (Parámetros > Configuraciones > Integraciones > Claves de API) para comprobar el parámetro **Tiempo de caducidad** de cada clave de API.
6. Proporciona un comentario que describa el propósito de la clave de API, si lo prefieres.
7. Selecciona el nivel de acceso buscado para esta clave a partir de los **Roles** existentes. También puedes seleccionar **Personalizado** para definir los permisos de forma granular.
8. Haz clic en **Generate** (Generar) para generar la clave de API.

### Obtener el ID de la clave de API de Palo Alto Cortex XDR

1. En la tabla de claves de API, busca el campo ID.
2. Anota tu número de ID correspondiente. Este valor representa el token **x-xdr-auth-id:{key_id}**.

### Obtener FQDN de Palo Alto Cortex XDR

1. Haz clic con el botón derecho en tu clave de API y selecciona **Ver ejemplos**.
2. Copia la URL **CURL de ejemplo**. El ejemplo contiene tu **FQDN** único.

### Conectar tu cuenta de Palo Alto Cortex XDR a Datadog

1. Añade tus credenciales de Palo Alto Cortex XDR.

    | Parámetros | Descripción |
    | -------------| ------------ |
    | Clave de API | La clave de API de Palo Alto Cortex XDR. |
    | ID de clave de API | El ID de autenticación de Palo Alto Cortex XDR. |
    | FQDN | El FQDN de Palo Alto Cortex XDR. Es la parte `baseUrl` de `baseUrl/public_api/v1/{name of api}/{name of call}/` |

2. Haz clic en el botón **Save** (Guardar) para guardar la configuración.

## Datos recopilados

### Logs

La integración Palo Alto Cortex XDR recopila y reenvía logs de incidentes y alertas de Palo Alto Cortex XDR a Datadog.

### Métricas

La integración Palo Alto Cortex XDR no incluye métricas.

### Eventos

La integración Palo Alto Cortex XDR no incluye eventos.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][2].

[1]: https://docs-cortex.paloaltonetworks.com/p/XDR
[2]: https://docs.datadoghq.com/es/help/
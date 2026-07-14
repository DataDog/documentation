---
app_id: pingdom
app_uuid: bde11e46-65f6-4cee-b011-f0944c5fb5bb
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: pingdom.response_time
      metadata_path: metadata.csv
      prefix: pingdom.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8
    source_type_name: API Pingdom legacy (V2.1)
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: pingdom_legacy
integration_id: pingdom
integration_title: API Pingdom legacy (V2.1)
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pingdom_legacy
public_title: API Pingdom legacy (V2.1)
short_description: Gestiona y migra la configuración existente de endpoints de monitorización
  Pingdom legacy.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Oferta::Integración
  - Categoría:Métricas
  configuration: README.md#Configuración
  description: Gestiona y migra la configuración existente de endpoints de monitorización
    Pingdom legacy.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: API Pingdom legacy (V2.1)
---

<!--  EXTRAÍDO de https://github.com/DataDog/integrations-internal-core -->
## Información general

<div class="alert alert-warning">
Este integración está obsoleto, y la API en la que se basa podría perder soporte en cualquier momento. Utilice en su lugar <a href="https://docs.datadoghq.com/integraciones/pingdom_v3/" class="alert-link">Datadog Pingdom V3 integración</a>.
</div>

Realiza un seguimiento de métricas de rendimiento de Pingdom centradas en el usuario en Datadog, para su correlación con otros eventos y métricas pertinentes.

Datadog realiza un seguimiento de la métrica `response_time` de cualquier sitio que configures en el sitio web de Pingdom.

Los eventos de Pingdom puede añadirse configurando el [monitor del estado de la integración][1] correspondiente.

<div class="alert alert-info">
Las métricas sólo pueden ser importadas por clientes de Pingdom de nivel Starter o superior.
</div>

## Configuración

### Instalación

1. Abre el cuadro de la integración Pingdom.
2. Ingresa el nombre de usuario y la contraseña de tu cuenta de Pingdom. (Si tienes una cuenta de equipo, puedes utilizar tus propias credenciales y especificar la cuenta de la que quieres extraer checks).
3. Puedes ignorar algunos checks desmarcándolos o añadir algunas etiquetas (tags) a los eventos que se van a generar.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "pingdom_legacy" >}}


### Eventos

La integración Pingdom no incluye eventos.

### Checks de servicio

La integración Pingdom extrae checks de transacciones y los informa como checks de servicios.

Para el check `pingdom.status`, la siguiente tabla explica qué resultados de checks de transacciones de Pingdom se correlacionan con qué resultados de checks de servicios de Datadog.

| Estado de Datadog | Estado de Pingdom      |
| -------------- | ------------------- |
| `OK`           | `up`                |
| `CRITICAL`     | `down`              |
| `WARNING`      | `unconfirmed_down`  |
| `UNKNOWN`      | `unknown`, `paused` |

## Solucionar problemas

### Error al actualizar el nombre de usuario o la contraseña

Es posible que hayas visto el siguiente error al guardar tus credenciales Pingdom:

`“There was an issue while testing your Pingdom configuration: Not permitted for account type”`.

Añade la dirección de correo electrónico del propietario de tu cuenta Pingdom en el campo **Cuenta a consultar** (opcional) y guarda esta acción.

[1]: https://app.datadoghq.com/monitors/create/integration
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/pingdom/pingdom_metadata.csv
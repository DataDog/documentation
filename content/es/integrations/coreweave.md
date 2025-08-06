---
app_id: coreweave
app_uuid: 74da15c6-f6f3-4d03-b44e-9e126e5da9e7
assets:
  dashboards:
    coreweave: assets/dashboards/coreweave_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - coreweave.kube_pod_status_phase
      metadata_path: metadata.csv
      prefix: coreweave.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10368
    source_type_name: coreweave
  monitors:
    Container CPU load is high: assets/monitors/coreweave_high_cpu.json
    Container memory usage is high: assets/monitors/coreweave_high_mem.json
    Hourly billing cost is increasing: assets/monitors/coreweave_billing.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- ai/ml
- Kubernetes
- suministrar
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: coreweave
integration_id: coreweave
integration_title: CoreWeave
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: coreweave
public_title: CoreWeave
short_description: Reúne métricas de Prometheus de Coreweave
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::AI/ML
  - Category::Kubernetes
  - Category::Provisioning
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Reúne métricas de Prometheus de Coreweave
  media:
  - caption: Información general del dashboard de CoreWeave
    image_url: images/coreweave_dashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: CoreWeave
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-internal-core -->


## Información general

Con la integración de CoreWeave, Datadog puede extraer métricas de Prometheus de CoreWeave e importarlas con un complemento completo de etiquetas (tags), incluidas etiquetas (tags) proporcionadas por Prometheus (como pod, contenedor y espacio de nombres).

Rastrea los patrones de uso a través de Datadog para comprender mejor y optimizar el modo en que las organizaciones utilizan la plataforma CoreWeave Cloud.

Esta integración también proporciona una mayor visibilidad de la manera en que se factura a las organizaciones y señala de dónde proceden los gastos dentro de CoreWeave Cloud. Detecta anomalías en la facturación y recibe alertas si se producen o cuando se produzcan, lo que ayuda a los equipos a abordar los cambios rápidamente y determina qué pods o espacios de nombres son los más costosos.

## Configuración

**Paso 1: Recuperar un token de acceso en CoreWeave**

Para empezar, [recupera tu token de acceso a CoreWeave][1]. Ten en cuenta que sólo los administradores de la organización pueden generar, ver y borrar tokens.

Sigue estos pasos para añadir la integración a tu cuenta de CoreWeave y crear un token de portador:

1. Ve a la página [token de acceso][1] de CoreWeave y haz clic en **Crear un nuevo token**.
2. Introduce un **nombre de token**, preferiblemente algo exclusivo de Datadog.
3. Asigna un **espacio de nombres** a tu token moviéndolo de **Espacios de nombres disponibles** a **Espacios de nombres seleccionados**. Datadog recomienda un token de acceso por espacio de nombres cuando utilices la integración de CoreWeave.
4. Haz clic en **Generate** (Generar).

Necesitarás este token de acceso para el paso 2.

**Paso 2: Conecta tu cuenta de CoreWeave a Datadog**

Para empezar, copia la clave token de acceso del paso 1.

1. Ve al [ícono de la integración de CoreWeave][2].
1. Introduce un **Nombre** para la cuenta.
2. Pega la **clave token de acceso** de tu cuenta de CoreWeave en el campo Token de acceso.
3. Opcionalmente, puedes definir **etiquetas (tags)** para estos logs. 
4. A continuación, haz clic en **Save** (Guardar).

### Validación

1. Check si hay métricas con el prefijo `coreweave.`. Si estas métricas están presentes, ¡tu integración está funcionando!

## Datos recopilados

### Métricas
{{< get-metrics-from-git "coreweave" >}}


### Checks de servicio

CoreWeave no incluye ningún check de servicio.

### Eventos

CoreWeave no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog][4].


[1]: https://cloud.coreweave.com/tokens/api-access
[2]: https://app.datadoghq.com/integrations/coreweave
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/coreweave/metadata.csv
[4]: https://docs.datadoghq.com/es/help/
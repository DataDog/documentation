---
app_id: nobl9
app_uuid: 678f6805-2038-4705-80b3-de7cc143baef
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: nobl9.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10230
    source_type_name: Nobl9
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Nobl9
  sales_email: support@nobl9.com
  support_email: support@nobl9.com
categories:
- métricas
- notificaciones
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nobl9/README.md
display_on_public_website: true
draft: false
git_integration_title: nobl9
integration_id: nobl9
integration_title: Nobl9
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: nobl9
public_title: Nobl9
short_description: Nobl9 permite la recopilación de SLI, el cálculo de SLO y las alertas
  de presupuesto de errores
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Métricas
  - Categoría::Notificaciones
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Nobl9 permite la recopilación de SLI, el cálculo de SLO y las alertas
    de presupuesto de errores
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Nobl9
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general
Nobl9 es una plataforma de SLO que brinda informes de SLO históricos y en tiempo real. Nobl9 se integra con Datadog para recopilar métricas de SLI y compararlas con los objetivos de SLO. Dado que Nobl9 calcula presupuestos de errores de umbrales aceptables, puede activar flujos de trabajo y alertas cuando la tasa de errores de consumo es demasiado alta o se ha superado.

Con la integración de Datadog Nobl9, puedes:

- Pasar el contexto empresarial a través de los datos de monitorización
- Definir y medir los objetivos de fiabilidad
- Ajustar las actividades a las prioridades fijadas por el presupuesto de errores

### Vista de cuadrícula de SLO
![Vista de cuadrícula de SLO][1]

### Detalle de SLO
![Detalle][2]

### Informe de SLO
![Informe de SLO][3]

### Dashboard de estado de servicio
![Dashboard de estado de servicio][4]

## Configuración

Toda configuración ocurre en la plataforma de SLO de Nobl9.

1. Añade el endpoint de la API de Datadog para conectarte a tu fuente de datos, ya sea `https://api.datadoghq.com/` o `https://api.datadoghq.eu/` (obligatorio).
2. Introduce un nombre de **Project** (Proyecto). Este campo está pensado para situaciones en las que varios usuarios están repartidos en varios equipos o proyectos. Si el campo se deja en blanco, aparece un valor por defecto.
3. El **Display Name** (Nombre para mostrar) aparece automáticamente cuando se introduce un nombre en el campo **Name** (Nombre).
4. Introduce un nombre para tu origen de datos (obligatorio). Los nombres de los metadatos son únicos dentro de cada proyecto y se validan con nombres RFC y DNS. El nombre del origen de datos debe contener solo caracteres alfanuméricos en minúsculas y guiones. Por ejemplo: `my-datadog-data-source`.
5. Introduce una descripción (opcional). Añade los detalles del equipo o del propietario y explica por qué has creado este origen de datos específico. Las descripciones proporcionan un contexto inmediato para cualquier miembro del equipo.

Para obtener más información sobre la creación de SLO en la plataforma de Nobl9, consulta la [Guía del usuario][5] de Nobl9.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [Soporte de Nobl9][6] o el [Soporte de Datadog][7].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/grid_view.jpg
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/slo_detail.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/slo_report.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/service_health.png
[5]: https://nobl9.github.io/techdocs_User_Guide/#service-level-objectives-38
[6]: https://nobl9.com/about/#contact
[7]: https://docs.datadoghq.com/es/help/
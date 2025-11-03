---
app_id: uptycs
app_uuid: d27ee4b6-649d-42bd-b7ac-fb40537d7031
assets:
  dashboards:
    Uptycs Events Dashboard: assets/dashboards/uptycs.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10400
    source_type_name: Uptycs
author:
  homepage: https://www.uptycs.com
  name: Uptycs
  sales_email: sales@uptycs.com
  support_email: support@uptycs.com
categories:
- nube
- colaboración
- events
- conformidad
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/uptycs/README.md
display_on_public_website: true
draft: false
git_integration_title: uptycs
integration_id: uptycs
integration_title: Uptycs
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: uptycs
public_title: Uptycs
short_description: Recopilar alertas y detección de Uptycs
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Collaboration
  - Category::Alerting
  - Category::Compliance
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Recopilar alertas y detección de Uptycs
  media:
  - caption: Dashboard de eventos de Uptycs
    image_url: images/integration_dashboard_1.png
    media_type: imagen
  - caption: Eventos de Uptycs por gráfico de tendencias de host
    image_url: images/integration_dashboard_2.png
    media_type: imagen
  - caption: Detección de uptycs como evento de Datadog
    image_url: images/data_collected_1.png
    media_type: imagen
  - caption: Alerta de Uptycs como evento de Datadog
    image_url: images/data_collected_2.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Uptycs
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Uptycs mitiga el riesgo priorizando tus respuestas a las amenazas, vulnerabilidades, configuraciones erróneas, exposición de datos confidenciales y requisitos de cumplimiento en toda tu superficie de ataque moderna, haciendo que esta información sea accesible a través de una única interfaz de usuario y modelo de datos. Esto incluye la capacidad de correlacionar la actividad de las amenazas a medida que atraviesan los límites de las instalaciones y la nube, proporcionando una postura de seguridad más completa para toda la empresa.

¿Buscas acrónimos? Tenemos lo que necesitas: CNAPP, CWPP, CSPM, KSPM, CIEM, CDR y XDR. Comienza con Detection Cloud, utiliza la búsqueda similar a Google y la cobertura de superficie de ataque que necesitas hoy.

Para más información, consulta el [sitio web de Uptycs][1].

La integración de Uptycs te permite ingerir tus alertas y detecciones de Uptycs en eventos de Datadog.

### Detalles de la alerta

Cada alerta contiene los siguientes componentes principales:
   1. Título
   2. Descripción
   3. ID: ID de alerta de Uptycs.
   4. Código de alerta de Uptycs.
   5. Gravedad de la alerta.
   6. Clave y valor de la alerta.
   7. Detalles del activo: ID del activo y nombre del host.
   8. URL de Uptycs para navegar a la plataforma de Uptycs.

### Detalles de la detección

Cada detección contiene los siguientes componentes principales:
   1. Título o nombre
   2. ID: ID de detección de Uptycs.
   3. Puntuación: puntuación calculada por Uptycs.
   4. Alertas: lista de alertas asociadas a la detección.
   5. Eventos: lista de eventos asociados a la detección.
   5. Matriz de ataques: técnicas asociadas a las alertas y eventos.
   7. Detalles del activo: ID del activo y nombre del host.
   8. URL de Uptycs para navegar a la plataforma de Uptycs.

## Configuración

Para configurar esta integración, debes tener una cuenta de Uptycs. Si no eres cliente de Uptycs, [ponte en contacto con nosotros][2] para obtener una cuenta de Uptycs.
También necesitarás las claves de API de Datadog.

### Configuración

1. Crea una [clave de API de Datadog][3].
2. Crea un destino de integración de Datadog en la plataforma de Uptycs utilizando tu clave de API de Datadog:
   1. Ve a Configuration > Destinations (Configuración > Destinos).
   2. Haz clic en New destination (Nuevo destino).
   3. Selecciona **Datadog** como tipo de destino.
   4. Proporciona un nombre para el destino, tu dominio de Datadog y tu clave de API. También puedes añadir plantillas personalizadas para alertas o detecciones en el campo de plantilla.

      ![configuración de la integración parte 1][4]

   5. Haz clic en **Save** (Guardar).
3. Una vez configurado el destino, crea una regla de reenvío para él.
   1. Ve a Configuration > Detection Forwarding Rules > New rule (Configuración > Reglas de reenvío de detección > Nueva regla)
   2. Introduce un nombre y una descripción y, a continuación, selecciona los criterios pertinentes para la regla.
   3. En las opciones de "Destinations" (Destinos), selecciona el destino recién creado.

      ![configuración de la integración parte 2][5]

   4. Selecciona Enable Rule (Activar regla) y haz clic en **Save** (Guardar).
4. El destino creado puede utilizarse para el reenvío de alertas.
   1. Ve a Configuration > Alert Rules (Configuración > Reglas de alerta).
   2. Selecciona una regla de alerta o selecciona varias reglas en bloque.
   3. En las opciones de "Destinations" (Destinos), selecciona el destino recién creado.
   4. Selecciona las opciones de 'Notify on Every Alert' (Notificar en cada alerta) y 'Close After Delivery' (Cerrar después de la alerta).

      ![configuración de la integración parte 3][6]

   5. Haz clic en **Save** (Guardar).
6. Una vez que Uptycs genere una alerta o detección, se entregará como un evento de Datadog.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con [Soporte][7].

[1]: https://www.uptycs.com
[2]: https://www.uptycs.com/about/contact/
[3]: https://docs.datadoghq.com/es/account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptycs/images/integration_setup_1.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptycs/images/integration_setup_2.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptycs/images/integration_setup_3.png
[7]: mailto:support@uptycs.com
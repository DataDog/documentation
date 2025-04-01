---
app_id: launchdarkly
app_uuid: 7144d0c5-42f2-4cc5-b562-5f77debc0c52
assets:
  dashboards:
    launchdarkly: assets/dashboards/launchdarkly.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: launchdarkly_relay.connections_env_platformCategory_userAgent
      metadata_path: metadata.csv
      prefix: launchdarkly_relay.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10025
    source_type_name: LaunchDarkly
author:
  homepage: https://launchdarkly.com
  name: LaunchDarkly
  sales_email: sales@launchdarkly.com
  support_email: support@launchdarkly.com
categories:
- configuración y despliegue
- notificaciones
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/launchdarkly/README.md
display_on_public_website: true
draft: false
git_integration_title: launchdarkly
integration_id: launchdarkly
integration_title: LaunchDarkly
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: launchdarkly
public_title: LaunchDarkly
short_description: Controla con confianza los lanzamientos de características y los
  cambios en la infraestructura.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Configuración y despliegue
  - Categoría::Notificaciones
  - Oferta::Extensión de la interfaz de usuario
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Controla con confianza los lanzamientos de características y los cambios
    en la infraestructura.
  media:
  - caption: Breve descripción general de LaunchDarkly.
    image_url: images/video-thumbnail.png
    media_type: vídeo
    vimeo_id: 637675972
  - caption: Dashboard de LaunchDarkly configurado con el widget de los indicadores
      y la integración de eventos de LaunchDarkly.
    image_url: images/dashboard.png
    media_type: imagen
  - caption: Dashboard de LaunchDarkly con el panel lateral de cambio de indicadores
      abierto.
    image_url: images/toggle-flag.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: otros
    url: https://launchdarkly.com
  - resource_type: Documentación
    url: https://docs.launchdarkly.com/integrations/datadog/events
  support: README.md#Soporte
  title: LaunchDarkly
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general


{{% site-region region="gov" %}}
**La integración de LaunchDarkly no es compatible con el sitio Datadog {{< region-param key="dd_site_name" >}}**.
{{% /site-region %}}


LaunchDarkly proporciona las siguientes integraciones con Datadog:

### Integración de eventos

La integración de eventos de [LaunchDarkly][1] en Datadog aporta marcadores de eventos de indicadores a tus dashboards de monitorización para que puedas ver los efectos de tus despliegues de características de LaunchDarkly en los servicios o sistemas de tus clientes. Por ejemplo, si una característica desplegada hace que un servicio se ralentice, puedes ver la causa en Datadog.

### Integración del seguimiento de indicadores de características

La integración del seguimiento de indicadores de características LaunchDarkly enriquece tus datos RUM con tus indicadores de características para ofrecer una visibilidad de la monitorización del rendimiento y de los cambios de comportamiento. Determina a qué usuarios se les muestra una experiencia de usuario y si está afectando negativamente al rendimiento del usuario.

### Widget del dashboard

El widget del dashboard de LaunchDarkly te permite fijar un indicador de subconjuntos de características que apunta a tus dashboards de Datadog para monitorizar e iniciar características desde una sola ventana.

### Integración de métricas de proxy de retransmisión

Si utilizas el [proxy de retransmisión de LaunchDarkly][2], puedes configurarlo para exportar métricas, como las conexiones activas y acumuladas, a Datadog.

## Configuración

### Integración de eventos

La integración de eventos de LaunchDarkly utiliza una [clave de API Datadog][3] que puede ser creada por un administrador Datadog. Una vez obtenida la clave de API Datadog, consulta la [documentación de LaunchDarkly para la integración en Datadog][4] para aprender a configurar la integración de eventos de LaunchDarkly en Datadog.

### Configuración del seguimiento de indicadores de características

El seguimiento de indicadores de características está disponible en el SDK del navegador RUM. Para obtener instrucciones detalladas de configuración, consulta la guía [Empezando con datos de indicadores de características en RUM][5].

1. Actualiza el SDK de tu navegador RUM versión 4.25.0 o posterior.
2. Inicializa el SDK RUM y configura el parámetro de inicialización `enableExperimentalFeatures` con `["feature_flags"]`.
3. Inicializa el SDK de LaunchDarkly y crea un inspector que informe de las evaluaciones de indicadores de características a Datadog utilizando el fragmento de código que se muestra a continuación.

```
const client = LDClient.initialize("<APP_KEY>", "<USER_ID>", {
  inspectors: [
    {
      type: "flag-used",
      name: "dd-inspector",
      method: (key: string, detail: LDClient.LDEvaluationDetail) => {
        datadogRum.addFeatureFlagEvaluation(key, detail.value);
      },
    },
  ],
});
```

### Widget del dashboard

1. En el [cuadro de la integración de LaunchDarkly][6], asegúrate de que esté instalada la integración de LaunchDarkly.
1. En Datadog, ve a un dashboard existente o crea uno nuevo.
1. Pulsa el botón **Add Widgets** (Añadir widgets) para abrir el cajón de widgets.
1. Busca en **LaunchDarkly** para encontrar el widget de LaunchDarkly en la sección **Aplicaciones** del cajón de widgets.
1. Haz clic o arrastra el icono del widget de LaunchDarkly para añadirlo a tu dashboard y abre el modal **Editor LaunchDarkly**.
1. Pulsa el botón **Connect** (Conectar) para conectar tu cuenta de LaunchDarkly. Se abrirá una nueva ventana en la que se te pedirá que autorices Datadog.
1. Haz clic en **Authorize** (Autorizar), lo que te llevará de nuevo a Datadog.
1. A continuación, configura las siguientes opciones de widgets en el **Editor LaunchDarkly**:

   - **Proyecto LaunchDarkly**: El nombre del proyecto LaunchDarkly que quieres asociar al widget del dashboard.
   - **Entorno LaunchDarkly**: El nombre del entorno LaunchDarkly que quieres asociar al widget del dashboard.
   - **Variable de plantilla de entorno**: Una [variable de plantilla de Datadog][7] opcional utilizada para anular la opción **Entorno LaunchDarkly**.
   - **Filtro de etiquetas (tags) de LaunchDarkly**: Una lista de etiquetas opcionales separadas por `+` utilizada para filtrar los indicadores de características mostrados en el widget. Si se incluyen varias etiquetas, sólo los indicadores que coinciden con **todas** las etiquetas incluidas aparecen en el widget. Si se omiten, todos los indicadores de características del proyecto aparecen en el widget.
   - **Orden**: El orden en que se muestran los indicadores en el widget. Por defecto es **Más recientes**.

1. Si lo deseas, puedes dar un título al widget.
1. Pulsa **Save** (Guardar) para finalizar la configuración del widget del dashboard de Datadog.

### Métricas del proxy de retransmisión

Para configurar esta característica, consulta la [documentación sobre integraciones de métricas][8] del proxy de retransmisión.

## Datos recopilados

### Métricas

El proxy de retransmisión LaunchDarkly puede configurarse para enviar las siguientes métricas a Datadog:

- **`connections`**: El número de conexiones de flujo (stream) existentes actualmente desde los SDK al proxy de retransmisión.
- **`newconnections`**: El número acumulado de conexiones de flujo que se han hecho al proxy de retransmisión desde que se inició.
- **`requests`**: El número acumulado de solicitudes recibidas por todos los [endpoints de servicio][9] del proxy de retransmisión (excepto el endpoint de estado) desde que se inició.

### Eventos

La integración de eventos de LaunchDarkly envía eventos de indicadores, proyectos y entornos desde LaunchDarkly a Datadog.

### Checks de servicio

La integración de LaunchDarkly no incluye checks de servicios.

## Compatibilidad

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Referencias adicionales

Más información sobre [LaunchDarkly][1] y la [integración de eventos de Datadog][4].

[1]: https://launchdarkly.com
[2]: https://docs.launchdarkly.com/home/relay-proxy
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.launchdarkly.com/integrations/datadog/events
[5]: https://docs.datadoghq.com/es/real_user_monitoring/guide/setup-feature-flag-data-collection/
[6]: https://app.datadoghq.com/integrations/launchdarkly
[7]: https://docs.datadoghq.com/es/dashboards/template_variables/
[8]: https://github.com/launchdarkly/ld-relay/blob/v6/docs/metrics.md
[9]: https://github.com/launchdarkly/ld-relay/blob/v6/docs/endpoints.md
[10]: https://docs.datadoghq.com/es/help/
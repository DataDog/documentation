---
categories:
- métricas
custom_kind: integration
dependencies: []
description: Monitoriza métricas de informaciones de calidad en plataformas de streaming
  de vídeo.
doc_link: https://docs.datadoghq.com/integrations/conviva/
draft: false
git_integration_title: conviva
has_logo: true
integration_id: ''
integration_title: Conviva
integration_version: ''
is_public: true
manifest_version: '1.0'
name: conviva
public_title: Integración de Conviva con Datadog
short_description: Recopila métricas de MetricLens de calidad en Conviva.
team: integraciones-web
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Conecta Datadog con tu cuenta de Conviva para ver tus métricas de calidad de la experiencia (QoE) de MetricLens.

## Configuración

### Instalación

Instala la integración con el [cuadro de la integración Conviva][1] en Datadog.

### Configuración
1. Ve a la pestaña de configuración dentro del [cuadro de la integración Conviva][1] en Datadog.
2. Haz clic en **Add New Credentials** (Añadir nuevas credenciales) e introduce tu clave de API Conviva y tu secreto de API. Datadog busca cuentas asociadas a esas credenciales.
3. Una vez que Datadog encuentre las cuentas asociadas a tus credenciales, añade un MetricLens para determinar qué métricas se ingerirán en Datadog. Especifica un nombre para el MetricLens junto con un Filtro y una Dimensión. El nombre de ese MetricLens específico se etiqueta automáticamente.
4. También puedes añadir etiquetas (tags) a MetricLenses específicos o a cuentas. Cuando se añade una etiqueta a una cuenta, esa etiqueta se aplica a todos los MetricLenses asociados a esa cuenta.
5. Añade más MetricLenses haciendo clic en **Add New** (Añadir nuevo) y siguiendo las instrucciones.
6. Repite estos pasos con cualquier otra credencial de Conviva, utilizando el botón **Add New Credentials** (Añadir nuevas credenciales).

### Dashboard
Después de configurar la integración, utiliza el dashboard predefinido de Conviva para obtener una visión general de las métricas del MetricLens. Por defecto, se muestran todas las métricas recopiladas de todos los MetricLenses.

{{< img src="integrations/conviva/conviva_dashboard.png" alt="Dashboard predefinido de la integración Conviva" popup="true" style="width:100%" >}}

Filtra por `metriclens` para ver el desglose de métricas por cada MetricLens correspondiente, configurado en el cuadro. Profundiza aún más filtrando por `dimension`, para ver métricas por una entidad de una sola de dimensión. 

## Datos recopilados

### Métricas
{{< get-metrics-from-git "conviva" >}}


### Eventos

La integración Conviva envía alertas a tu [flujo (stream) de eventos de Datadog][3].

{{< img src="integrations/conviva/conviva_eventstream.png" alt="Alertas de monitor de Conviva en el flujo de eventos de Datadog" popup="true" style="width:100%" >}}

### Checks de servicio

La integración Conviva no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

## Leer más

Más enlaces, artículos y documentación útiles:

- [Monitorización de Conviva con Datadog][5]

[1]: https://app.datadoghq.com/integrations/conviva
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/conviva/conviva_metadata.csv
[3]: https://docs.datadoghq.com/es/events/
[4]: https://docs.datadoghq.com/es/help/
[5]: https://www.datadoghq.com/blog/video-streaming-performance-monitoring-conviva/
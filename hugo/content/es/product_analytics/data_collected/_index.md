---
description: Conozca los tipos de eventos, mediciones y atributos que recopila Product
  Analytics, incluyendo sesiones, la función de visualizar y acciones.
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: Centro de aprendizaje
  text: Introducción a Product Analytics
- link: https://learn.datadoghq.com/courses/define-user-behavior-with-labeled-actions-in-product-analytics
  tag: Centro de aprendizaje
  text: Defina el comportamiento del usuario con acciones etiquetadas en Product Analytics
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: Documentación
  text: Datos de navegador de RUM recopilados
- link: /real_user_monitoring/application_monitoring/ios/data_collected/
  tag: Documentación
  text: Datos recopilados de RUM para iOS
- link: /real_user_monitoring/application_monitoring/android/data_collected/
  tag: Documentación
  text: Datos recopilados de RUM para Android
- link: /product_analytics/data_collected/server_side_events/
  tag: Documentación
  text: Rastree eventos del lado del servidor
title: Datos recopilados de Product Analytics
---
## Descripción general {#overview}

Product Analytics recopila datos de actividad del usuario como eventos. Cada evento tiene dos tipos de datos:

- **Telemetría**: Valores cuantificables utilizados para rastrear y comparar la actividad (por ejemplo, `view.time_spent`).
- **Atributos**: Valores descriptivos utilizados para filtrar y desglosar las mediciones en su análisis (por ejemplo, `device.type` o `geo.country`).

Cada evento incluye los [atributos predeterminados](#default-attributes). Cada tipo de evento también tiene [telemetría y atributos específicos](#event-specific-attributes).

Para identificar a los usuarios individuales a través de las sesiones, Product Analytics depende de los atributos `usr.id` y `usr.email`. Para usuarios no autenticados o visitantes que nunca inician sesión, el SDK de RUM asigna automáticamente un `usr.anonymous_id` para rastrear la actividad. Consulte [Track unauthenticated users][4] para obtener más detalles.

<div class="alert alert-info">Product Analytics utiliza los mismos SDKs y configuración que Real User Monitoring (RUM) para recopilar datos. A diferencia de RUM, Product Analytics no recopila eventos de Errores, Recursos, Tareas largas o Vitals. Para obtener la lista completa de tipos de eventos y atributos de RUM, consulte las páginas de datos recopilados para <a href="/real_user_monitoring/application_monitoring/browser/data_collected/">navegador</a>, <a href="/real_user_monitoring/application_monitoring/ios/data_collected/">iOS</a> y <a href="/real_user_monitoring/application_monitoring/android/data_collected/">Android</a>.</div>

| Tipo de evento | Retención | Descripción |
|------------|-----------|-------------|
| Sesión | 15 meses | Una sesión representa el recorrido real de un usuario a través de su aplicación. Comienza cuando un usuario abre la aplicación y permanece abierta mientras el usuario esté activo. Todos los eventos generados durante la sesión comparten el mismo atributo `session.id`. **Nota:** La sesión se restablece después de 15 minutos de inactividad. |
| Visualizar| 15 meses | Una "visualizar" representa una página o pantalla única que un usuario visita dentro de una sesión. En un navegador, se crea una "visualizar" cada vez que un usuario visita una página. En dispositivos móviles, una "visualizar" corresponde a una pantalla o segmento de pantalla. Todos los eventos generados mientras un usuario está en una "visualizar" comparten el mismo atributo `view.id`. |
| Acción | 15 meses | Una acción representa la actividad del usuario en su aplicación, como un clic, toque, deslizamiento o desplazamiento. Las acciones son recopiladas automáticamente por el SDK. Cada acción está vinculada a la "visualizar" en la que se generó con un `action.id` único. |
| Acción etiquetada | 15 meses | Una acción etiquetada es un nombre personalizado aplicado a una acción capturada automáticamente mediante [Gestión de acciones][1]. Las acciones etiquetadas le permiten organizar y analizar interacciones específicas del usuario sin escribir código. |

## Atributos predeterminados {#default-attributes}

Los siguientes atributos se adjuntan a todos los eventos de forma predeterminada.

### General {#general}

| Atributo | Tipo | Descripción |
|-----------|------|-------------|
| `date` | número | Marca de tiempo del evento. |
| `type` | cadena | El tipo de evento (por ejemplo, `view` o `action`). |
| `service` | cadena | El nombre del servicio unificado para esta aplicación utilizado para correlacionar las sesiones de usuario. |
| `application.id` | cadena | El ID de la aplicación Datadog. |
| `application.name` | cadena | El nombre de la aplicación Datadog. |

### Dispositivo {#device}

| Atributo | Tipo | Descripción |
|-----------|------|-------------|
| `device.brand` | cadena | La marca del dispositivo según lo reportado por el dispositivo. |
| `device.model` | cadena | El modelo del dispositivo según lo reportado por el dispositivo. |
| `device.name` | cadena | El nombre del dispositivo según lo reportado por el dispositivo. |
| `device.type` | cadena | El tipo de dispositivo según lo reportado por el dispositivo (por ejemplo, `Mobile`, `Tablet` o `Desktop`). |

### Sistema operativo {#operating-system}

| Atributo | Tipo | Descripción |
|-----------|------|-------------|
| `os.name` | cadena | El nombre del SO según lo reportado por el dispositivo. |
| `os.version` | cadena | La versión del SO según lo reportado por el dispositivo. |
| `os.version_major` | cadena | La versión principal del SO según lo reportado por el dispositivo. |

### Geolocalización {#geolocation}

Los siguientes atributos se derivan de la dirección IP de la sesión.

**Nota:** Para dejar de recopilar atributos de geolocalización, cambie la configuración en [Gestión de aplicaciones][2].

| Atributo | Tipo | Descripción |
|-----------|------|-------------|
| `geo.country` | string | Nombre del país. |
| `geo.country_iso_code` | string | Código ISO del país (por ejemplo, `US` o `FR`). |
| `geo.country_subdivision` | string | Nombre del primer nivel de subdivisión del país (por ejemplo, `California` o `Sarthe`). |
| `geo.continent_code` | string | Código de continente de dos letras (por ejemplo, `EU` para Europa o `NA` para Norteamérica). |
| `geo.continent` | string | Nombre del continente. |
| `geo.city` | string | Nombre de la ciudad (por ejemplo, `San Francisco` o `Paris`). |

### Atributos de usuario {#user-attributes}

Puede habilitar [tracking user info][3] globalmente para recopilar y aplicar atributos de usuario a todos los eventos.

| Atributo | Tipo | Descripción |
|-----------|------|-------------|
| `usr.id` | string | Identificador del usuario. |
| `usr.name` | string | Nombre del usuario. |
| `usr.email` | string | Correo electrónico del usuario. |
| `usr.anonymous_id` | string | UUID generado aleatoriamente asignado a usuarios no autenticados. Persiste hasta por un año. Consulte [Track unauthenticated users][4]. |

## Atributos específicos del evento {#event-specific-attributes}

Los siguientes atributos son específicos para cada tipo de evento.

### Atributos de sesión {#session-attributes}

| Atributo | Tipo | Descripción |
|-----------|------|-------------|
| `session.id` | string | ID único de la sesión. |
| `session.type` | string | Tipo de la sesión. El valor es `user` para Product Analytics. |
| `session.is_active` | Boolean | Indica si la sesión está activa. La sesión finaliza después de 4 horas de actividad o 15 minutos de inactividad. |
| `session.time_spent` | number (nanosegundos) | Tiempo dedicado a la sesión. |
| `session.view.count` | number | Recuento de todas las visualizaciones recopiladas para esta sesión. |
| `session.action.count` | number | Recuento de todas las acciones recopiladas para esta sesión. |
| `session.initial_view.url` | string | URL de la visualización inicial de la sesión. |
| `session.initial_view.name` | string | Nombre de la visualización inicial de la sesión. |
| `session.last_view.url` | string | URL de la última visualización de la sesión. |
| `session.last_view.name` | string | Nombre de la última visualización de la sesión. |
| `session.ip` | string | Dirección IP de la sesión. Para dejar de recopilar este atributo, cambie la configuración en [Application Management][2]. |
| `session.useragent` | string | Identificador del navegador o dispositivo utilizado para determinar el tipo y la versión del dispositivo. |
| `session.has_replay` | Boolean | Indica si la sesión tiene una grabación de Session Replay adjunta. |

### Atributos de la visualización {#view-attributes}

| Atributo | Tipo | Descripción |
|-----------|------|-------------|
| `view.id` | string | ID único de la visualización. |
| `view.url` | cadena | URL de la página o nombre canónico de la pantalla correspondiente al evento. |
| `view.name` | cadena | Nombre personalizable de la visualización. |
| `view.is_active` | Booleano | Indica si la visualización está activa. |
| `view.time_spent` | número (nanosegundos) | Tiempo dedicado a esta visualización. |
| `view.action.count` | número | Recuento de todas las acciones recopiladas para esta visualización. |
| `view.loading_time` | número (nanosegundos) | Tiempo hasta que la visualización está lista y no ocurre ninguna solicitud de red o mutación del DOM. |
| `view.interaction_to_next_view_time` | número (nanosegundos) | Tiempo entre la última interacción del usuario en la visualización anterior y el inicio de esta visualización. |

#### Atributos UTM {#utm-attributes}

**Nota:** Los atributos UTM solo están disponibles para aplicaciones de navegador.

| Atributo | Tipo | Descripción |
|-----------|------|-------------|
| `view.url_query.utm_source` | cadena | El parámetro en la URL que rastrea la fuente del tráfico. |
| `view.url_query.utm_medium` | cadena | El parámetro en la URL que rastrea el canal desde donde proviene el tráfico. |
| `view.url_query.utm_campaign` | string | El parámetro en la URL que identifica la campaña de marketing específica vinculada a esa visualización. |
| `view.url_query.utm_content` | cadena | El parámetro en la URL que identifica el elemento específico en el que hizo clic un usuario dentro de una campaña de marketing. |
| `view.url_query.utm_term` | cadena | El parámetro en la URL que rastrea la palabra clave que un usuario buscó para activar una campaña determinada. |

### Atributos de acción {#action-attributes}

| Atributo | Tipo | Descripción |
|-----------|------|-------------|
| `action.id` | cadena | ID único de la acción del usuario. |
| `action.type` | string | Tipo de acción del usuario (por ejemplo, `click`, `tap` o `application_start`). |
| `action.name` | string | Nombre de la acción del usuario (por ejemplo, `Click on #checkout`). |
| `action.target.name` | string | Elemento con el que interactuó el usuario. Solo disponible para acciones recopiladas automáticamente. |
| `action.loading_time` | number (nanosegundos) | El tiempo de carga de la acción. |

### Señales de frustración {#frustration-signals}

**Nota:** Las señales de frustración solo están disponibles para aplicaciones de navegador.

#### Mediciones {#measurements}

| Atributo | Tipo | Descripción |
|-----------|------|-------------|
| `session.frustration.count` | number | Recuento de todas las señales de frustración asociadas con una sesión. |
| `view.frustration.count` | number | Recuento de todas las señales de frustración asociadas con una visualización. |

#### Atributos {#attributes}

| Atributo | Tipo | Descripción |
|-----------|------|-------------|
| `action.frustration.type:dead_click` | string | Clics muertos detectados por el SDK de RUM del navegador. |
| `action.frustration.type:rage_click` | string | Clics de furia detectados por el SDK de RUM del navegador. |
| `action.frustration.type:error_click` | string | Clics de error detectados por el SDK de RUM del navegador. |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/product_analytics/guide/action_management/
[2]: https://app.datadoghq.com/rum/list
[3]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/#user-session
[4]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/#track-unauthenticated-users
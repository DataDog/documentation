---
description: Más información sobre la manera de utilizar Product Analytics y Session
  Replay para monitorizar el rendimiento de las campañas de UTM.
title: Cómo monitorizar Campañas de UTM en Product Analytics
---

## Información general

El rastreo del módulo de rastreo Urchin (UTM) es un parámetro que puede añadirse a una URL para realizar un rastreo del rendimiento de campañas específicas e identificar rutas de atribución para saber cómo llegaron los visitantes a tu sitio web. En esta guía se te explicarán los tipos de parámetros de UTM que Datadog Product Analytics recopila y cómo puedes utilizar Product Analytics para monitorizar su uso.

## Datos recopilados

Las campañas de UTM están conectadas a [Ver][1] eventos en Product Analytics. Los datos de la campaña se recopilan automáticamente por el SDK del navegador y pueden visualizarse como facetas en el Analytics Explorer. Los parámetros de UTM que recogen Datadog pueden definirse de la siguiente manera:

| Campo                | Tipo   | Descripción                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `view.url_query.utm_source`     | Cadena | El parámetro de la URL que rastrea la fuente de tráfico. |
| `view.url_query.utm_medium`        | Cadena | El parámetro de la URL que rastrea el canal del que procede el tráfico.    |
| `view.url_query.utm_campaign`  | Cadena | El parámetro de la URL que identifica la campaña de marketing específica vinculada a esa visita.              |
| `view.url_query.utm_content`  | Cadena | El parámetro de la URL que identifica el elemento específico en el que ha hecho clic un usuario en una campaña de marketing.           |
| `view.url_query.utm_term` | Cadena | El parámetro en la URL que rastrea la palabra clave que un usuario buscó para activar una campaña determinada.             |

## Casos de uso

### Identifica cómo llegan los usuarios a tu sitio

Para medir cómo llegan los usuarios a tu sitio, puedes utilizar la faceta '@view.url_query.utm_medium'. Esta faceta muestra diferentes medios como redes sociales, orgánico, búsqueda, campañas de Google o incluso eventos específicos como un webinar. Puedes ver repeticiones de sesiones de usuarios que llegan a tu sitio web desde diferentes medios y observar si se producen patrones notables entre distintos grupos.

### Rastrear si determinadas campañas tienen más tráfico que otras

{{< img src="real_user_monitoring/guide/UTM-campaign-tracking.png" alt="Captura de pantalla de todas las visitas de una página de campaña dada" style="width:90%;">}}

Como en la consulta anterior, puedes contar todas las visitas de una página, como la página de destino, en la que se está ejecutando la campaña. Esto puede ayudar a comprender si ciertas páginas están recibiendo más visitas y debes aumentar la inversión publicitaria hacia esa página específica.

### Analizar una fuente de UTM por país

{{< img src="real_user_monitoring/guide/UTM-by-country.png" alt="Captura de pantalla de una fuente de UTM por país" style="width:90%;">}}

En este ejemplo, puedes realizar un rastreo de las diferentes fuentes de las campañas, como los anuncios frente al tráfico orgánico. A continuación, puedes añadir una capa adicional, como la geografía, para comprender si los patrones de audiencia cambian según el país.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/#views
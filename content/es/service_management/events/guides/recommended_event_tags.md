---
aliases:
- /es/events/guides/recommended_event_tags
description: Obtén información sobre las etiquetas de eventos recomendadas y cómo
  añadirlas.
further_reading:
- link: /getting_started/tagging/assigning_tags
  tag: Documentación
  text: Más información sobre cómo asignar etiquetas (tags)
kind: guía
title: Prácticas recomendadas para el etiquetado de eventos
---

## Información general

Datadog recomienda utilizar el [etiquetado de servicios unificados][1] y las etiquetas que se enumeran a continuación en todos tus eventos por los siguientes beneficios:

- Identifica los posibles problemas con mayor rapidez
- Localiza eventos relacionados
- Filtra con mayor precisión en [Events Explorer][2], por ejemplo, para un entorno específico

## Añadir etiquetas

Cuentas con varias opciones a fin de mejorar tu estrategia de etiquetado para los eventos:

- API: al utilizar la [API][3], puedes añadir etiquetas en el campo `tags`.

- Monitor: al crear o editar un monitor, puedes añadir etiquetas recomendadas en la [sección **Say what's happening**][4] (Saber qué ocurre).

- Integraciones: para obtener más información sobre cómo añadir etiquetas a las integraciones, consulta la sección [Asignar etiquetas (tags)][5] o la [integración][6] específica.

Puedes añadir los siguientes atributos básicos a tus eventos:

| **Atributo** | **Descripción**                                                                                                                                                                                    |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| env           | El entorno en el que se origina el evento, como producción, borde o staging. Esto te permite garantizar que los eventos de un entorno inferior no se confundan como de alta prioridad.                       |
| Servicio       | El nombre del servicio. Te permite:<br>- Saber qué servicios se ven afectados si un evento se relaciona con un error<br>- Pasar al servicio afectado  <br>- Filtrar todos los eventos con ese servicio |
| version       | La versión de compilación o servicio. Esto te permite identificar, por ejemplo, si una interrupción o evento se relaciona con una versión concreta.                                                                         |
| host          | El nombre del host. Te permite: <br>- Enriquecer de manera automática los eventos en el momento de la ingesta con etiquetas de host adicionales<br>- Pasar a las pestañas **Host Infrastructure** (Infraestructura de host) y **Metrics** (Métricas) del [Events Explorer][7].                             |
| team          | El equipo que posee el evento y al que se le notifica si es necesario.                                                                                                                       |                                                          |

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging
[2]: /es/service_management/events/explorer
[3]: /es/api/latest/events/#post-an-event
[4]: /es/getting_started/monitors/#notify-your-services-and-your-team-members
[5]: /es/getting_started/tagging/assigning_tags
[6]: /es/integrations/
[7]: https://app.datadoghq.com/event/explorer
---
further_reading:
- link: /service_management/incident_management/notification
  tag: Documentación
  text: Más información sobre las notificaciones de Incident Management
title: Plantillas
---

## Información general

Las plantillas dinámicas ofrecen un marco completo para mejorar la respuesta a incidentes y la eficacia operativa. El uso de plantillas de mensajes personalizadas para notificaciones, tanto ad hoc como automatizadas, puede ahorrar tiempo durante incidentes de gran tensión. Esto garantiza que los mensajes sean siempre precisos y contengan el contexto pertinente, lo que permite una comprensión y una acción más rápidas por parte de los destinatarios. 

Los ajustes personalizables para el análisis postmortem pueden proporcionar información valiosa y optimización a largo plazo. Al adaptar los informes y dashboards al contexto único de tu organización, puedes identificar problemas recurrentes y aplicar medidas preventivas con mayor eficacia.

## Mensajes

Las plantillas de mensajes son mensajes dinámicos y reutilizables que pueden usarse en [notificaciones de incidentes manuales][1], o en reglas de notificación automatizadas. Las plantillas de mensajes aprovechan variables de plantilla, como `{{incident.severity}}`, para inyectar dinámicamente el valor correspondiente del incidente para el que se envía la notificación. Las plantillas de mensajes son compatibles con Markdown para que las notificaciones de incidente puedan incluir formato de texto, tablas, listas con sangría e hipervínculos. Para organizar mejor un gran número de plantillas de mensajes, cada plantilla requiere una categoría durante el proceso de creación.

Para crear una plantilla de mensaje:

1. Haz clic en el botón **+ New Message Template** (+ Nueva plantilla de mensaje).
2. Dale un nombre a la plantilla
3. Asígnale una categoría nueva o existente
4. Asigna un asunto a la plantilla (para correos electrónicos)
5. Escribe el mensaje de la plantilla
6. Haz clic en **Save** (Guardar).

**Nota:** Se admiten variables de plantilla tanto en el título como en el cuerpo del mensaje.

## Análisis retrospectivos

Las plantillas de análisis retrospectivo son plantillas dinámicas y reutilizables que se utilizan para crear un [notebook de Datadog][2] o [página de Confluence][3] que se rellena automáticamente con información sobre incidentes después de que se haya resuelto un incidente. Las plantillas de análisis retrospectivo aprovechan variables de plantilla, como `{{incident.severity}}`, para inyectar dinámicamente el valor correspondiente del incidente para el que se está creando la plantilla de análisis retrospectivo.

Para crear una plantilla de análisis retrospectivo:

1. Haz clic en el botón **+ New Postmortem Template** (+ Nueva plantilla de análisis retrospectivo).
2. Dale un nombre a la plantilla
3. Selecciona un notebook de Datadog o una página de Confluence que se creará en la generación.
4. Escribe el contenido de la plantilla (a la derecha del cuadro de texto aparecen las variables de plantilla disponibles)
5. (Opcional) Establece la plantilla como predeterminada 
6. Haz clic en **Save** (Guardar).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/incident_management/notifications
[2]: /es/notebooks/
[3]: /es/integrations/confluence/
---
description: Mide la retención de usuarios para comprender la satisfacción general
  de los usuarios con tu aplicación.
further_reading:
- link: /product_analytics/
  tag: Documentación
  text: Análisis de productos
title: Retención de usuarios
---

## Información general
Retention Analysis te permite medir la frecuencia con la que los usuarios vuelven a una página o acción. Mediante el seguimiento de la retención de usuarios a lo largo del tiempo, puedes obtener información sobre la satisfacción general de los usuarios.

La retención de usuarios se mide dentro de una cohorte determinada de usuarios que definas. Una cohorte es un grupo de usuarios que participan en un evento inicial, como hacer clic en un enlace. Un usuario de la cohorte se considera retenido si posteriormente completa un evento de retorno, como volver a hacer clic en el mismo enlace o hacer clic en un botón **Proceed to Payment** (Proceder al pago). Sólo las vistas y las acciones pueden actuar como eventos.

El gráfico de retención muestra el porcentaje de usuarios que completaron el evento de retorno cada semana.

{{< img src="real_user_monitoring/retention_analysis/example-retention-analysis-graph.png" alt="Ejemplo de gráfico de Retention Analysis" style="width:100%;" >}}

## Requisitos previos

Para que los datos de User Retention se rellenen, debes establecer el atributo `usr.id` en tu SDK. Consulta las [instrucciones para enviar atributos de usuario únicos][4].

## Crear un gráfico

Para crear un gráfico de retención, ve a **[Digital Experience > Product Analytics > Retention Analysis][1]** (Experiencia digital > Product Analytics > Retention Analysis), que te llevará a la página **User Retention** (Retención de usuarios), y sigue los pasos que se indican a continuación.

### 1. Define el evento inicial
1. Selecciona la vista o acción que actuará como evento inicial para definir un grupo de usuarios.
2. Opcionalmente, añade filtros como el dispositivo utilizado o el país de origen.
    - Si tu evento inicial es una vista, puedes añadir cualquier [faceta de vista][2] o faceta de contexto.
    - Si tu evento inicial es una acción, puedes añadir cualquier [faceta de acción][3] o faceta de contexto.

### 2. Opcionalmente, define el evento de retorno
El evento de retorno es por defecto una repetición del evento original. Para utilizar un evento de retorno diferente:

1. Cambia **Repeated the original event** (Repitió el evento original) a **Experienced a different event** (Experimentó un evento diferente).
2. Selecciona la vista o acción que actuará como evento de retorno.
3. Opcionalmente, añade cualquier criterio de filtrado que desees, como el sistema operativo del usuario.

## Analizar el gráfico
Para obtener información sobre la retención de usuarios semana a semana, lee cada fila del gráfico horizontalmente de izquierda a derecha. 

Puedes hacer clic en una celda individual del diagrama para ver una lista de los usuarios y exportar la lista como CSV:

{{< img src="real_user_monitoring/retention_analysis/retention-analysis-graph-details-panel.png" alt="Panel de detalles para una celda de diagrama" style="width:90%;" >}}

El gráfico muestra información ligeramente diferente en función de si los eventos inicial y de retorno coinciden.

### Coincidencia de eventos
Si los eventos coinciden:
- **La semana 0** es siempre el 100%, ya que representa a todos los usuarios que completaron el evento inicial.
- Las demás celdas comparan los espectadores de una semana determinada con los de la **semana 0**, mostrando el porcentaje de la cohorte que completó el evento en esa semana.

{{< img src="real_user_monitoring/retention_analysis/matching-events-retention-graph.png" alt="Gráfico de retención para eventos coincidentes" style="width:90%;" >}}

Leyendo la fila **Dec 04 2023** del gráfico anterior de izquierda a derecha:
- El 94% de las personas que completaron el evento en la **semana 0** volvieron a completarlo en la **semana 1**.
- El 92% de las personas que completaron el evento en la **semana 0** volvieron a completarlo en la **semana 2**.

### Eventos que difieren
Si los eventos difieren:
- **La semana 0** representa a los usuarios que completaron tanto el evento inicial como el evento de retorno.
- Después de la **Semana 0**, cada celda muestra el porcentaje de la columna **Users** (Usuarios) que completaron el evento de retorno en esa semana.

{{< img src="real_user_monitoring/retention_analysis/differing-events-retention-graph.png" alt="Gráfico de retención para eventos que difieren" style="width:90%;" >}}

Leyendo la fila **Dec 04 2023** del gráfico anterior de izquierda a derecha:
- 144 usuarios completaron el evento inicial.
- En la **semana 0**, el 94% de esos 144 usuarios completaron el evento de retorno.
- En la **semana 1**, el 92% de los 144 usuarios completaron el evento de retorno.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/retention-analysis
[2]: /es/real_user_monitoring/browser/data_collected/#view-attributes
[3]: /es/real_user_monitoring/browser/data_collected/#action-timing-metrics
[4]: /es/real_user_monitoring/browser/advanced_configuration#user-session
[5]: /es/help
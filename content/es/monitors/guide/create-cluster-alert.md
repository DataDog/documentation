---
further_reading:
- link: /monitors/
  tag: Documentación
  text: Aprender a crear un monitor
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
kind: guía
title: Crear alertas de clúster para notificar si un porcentaje de grupos están en
  estado crítico
---

## Información general

Esta guía te muestra cómo crear alertas que no notifiquen cada vez que un grupo individual cumple la condición, sino sólo cuando un determinado porcentaje de grupos lo hace.
Esto es útil, por ejemplo, si quieres que un monitor te alerte sólo cuando un determinado porcentaje de hosts o contenedores alcanzan un estado crítico.

### Ejemplo: alerta sobre un porcentaje de hosts con elevado uso de CPU

En este ejemplo, quieres recibir una notificación cuando el 40 por ciento de los hosts muestran un uso de CPU superior al 50 por ciento. Aprovecha las funciones `min_cutoff` y `count_nonzero`:

* Utiliza la función `min_cutoff` para contabilizar el número de hosts que muestran un uso de CPU superior al 50 por ciento.
* Utiliza la función `count_nonzero` para contabilizar el número total de hosts.
* Divide uno por otro para obtener el porcentaje resultante de hosts con un uso de CPU superior al 50 por ciento.

{{< img src="monitors/faq/cluster-condition.png" alt="cluster-alert-condition" >}}

* Luego, establece la condición para alertar si el porcentaje de hosts que muestran esa condición alcanzan el 40 por ciento.

{{< img src="monitors/faq/cluster-trigger.png" alt="cluster-alert-trigger" >}}

Este monitor rastrea el porcentaje de hosts que han mostrado un uso de CPU superior al 50 por ciento en los últimos diez minutos y genera un notificación si más del 40 por ciento de esos hosts cumplen la condición especificada.

{{< img src="monitors/faq/cluster-status.png" alt="cluster-alert-status" >}}

{{< partial name="whats-next/whats-next.html" >}}
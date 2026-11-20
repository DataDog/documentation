---
description: Aprende a crear alertas de clúster que avisen cuando un porcentaje de
  grupos cumple ciertas condiciones, como por ejemplo cuando el 40% de los hosts tienen
  un uso elevado de CPU.
further_reading:
- link: /monitors/
  tag: Documentación
  text: Aprender a crear un monitor
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
title: Crear alertas de clúster para notificar si un porcentaje de los grupos están
  en estado crítico
---

## Información general

Esta guía te muestra cómo crear alertas que no te notifiquen cada vez que un grupo individual cumple la condición, sino sólo cuando un determinado porcentaje de grupos lo hace.
Esto es útil, por ejemplo, si quieres que un monitor te alerte sólo cuando un determinado porcentaje de hosts o contenedores alcanzan un estado crítico.

### Ejemplo: alerta sobre un porcentaje de hosts con elevado uso de CPU

En este ejemplo, quieres recibir una notificación cuando el 40 por ciento de los hosts tienen un uso de CPU superior al 50 por ciento. Aprovecha las funciones `min_cutoff` y `count_nonzero`:

* Utiliza la función `min_cutoff` para contabilizar el número de hosts que tienen un uso de CPU superior al 50 por ciento.
* Utiliza la función `count_nonzero` para contabilizar el número total de hosts.
* Divide uno por el otro para obtener el porcentaje resultante de hosts con un uso de CPU superior al 50 por ciento.
* Luego, establece la condición para generar una alerta si el porcentaje de hosts que tienen esa condición alcanza el 40 por ciento.

{{< img src="/monitors/guide/create_cluster_alert/cluster_alert_config.png" alt="Monitoriza la configuración en busca de alertas de clúster para recibir una notificación cuando el 40 por ciento de los hosts tenga un uso de la CPU por encima del 50 por ciento" style="width:100%;" >}}

Este monitor rastrea el porcentaje de hosts que han tenido un uso de CPU superior al 50 por ciento durante los últimos diez minutos y genera un notificación si más del 40 por ciento de esos hosts cumplen la condición especificada.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}
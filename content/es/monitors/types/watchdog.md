---
aliases:
- /es/monitors/monitor_types/watchdog
- /es/monitors/create/types/watchdog/
description: Detecta problemas en aplicaciones e infraestructuras mediante algoritmos.
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /watchdog/
  tag: Documentación
  text: Watchdog detecta problemas en aplicaciones e infraestructuras mediante algoritmos
kind: Documentación
title: Monitor Watchdog
---

## Información general

[Watchdog][1] es una función algorítmica para APM, infraestructuras y logs. Detecta automáticamente posibles problemas observando continuamente tendencias y patrones en métricas y logs, y buscando comportamientos atípicos.

## Creación de un monitor

Para crear un [monitor de Watchdog][2] en Datadog, utiliza la navegación principal: *Monitors --> New Monitor --> Watchdog* (Monitores > Nuevo monitor > Watchdog).

{{< img src="/monitors/monitor_types/watchdog/watchdog-monitor-1.png" alt="Configuración de un monitor Watchdog" style="width:80%;">}}

## Definir tu consulta
Selecciona el contexto sobre el que quieres recibir alertas con las siguientes configuraciones opcionales (se admiten comodines):

**1. Selectores predefinidos**
* Entorno. Estos valores se obtienen de la etiqueta `env`.
* Categoría de Alerta. Delimita el monitor a un subconjunto de alertas de Watchdog.
* Equipo. Estos valores se obtienen del catálogo de servicios.

**2. Contexto adicional**
* Filtra por cualquier etiqueta adicional disponible en el evento de Watchdog.
* Agrupar por las dimensiones que quieras aplicar para [agrupar notificaciones][3].
{{< img src="/monitors/monitor_types/watchdog/watchdog-monitor-2.png" alt="Configuración de un monitor Watchdog con parámetros avanzados" style="width:80%;">}}

Una vez realizadas las selecciones, el gráfico de la parte superior de la página de creación del monitor muestra los eventos de Watchdog correspondientes durante el periodo de tiempo seleccionado.

### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configurar notificaciones y automatizaciones**, consulta la página [Notificaciones][4].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/watchdog/
[2]: https://app.datadoghq.com/monitors#create/watchdog
[3]: /es/monitors/configuration/?tab=thresholdalert#alert-grouping
[4]: /es/monitors/notify/
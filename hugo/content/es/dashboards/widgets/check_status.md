---
aliases:
- /es/graphing/widgets/check_status/
description: Grafica el estado actual o la cantidad de resultados de cualquier check
  realizado.
further_reading:
- link: /developers/service_checks
  tag: Documentación
  text: Más información sobre los checks de servicio
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
title: Widget de estado del check
widget_type: check_status
---

Los checks de servicio monitorizan el estado activo o inactivo de un servicio específico. Las alertas se activan cuando el Agent de monitorización no logra conectarse al servicio en una cantidad específica de checks consecutivos. El widget de estado del check puede mostrar de manera visual la degradación del servicio, fallas del servicio, problemas en todo el clúster, caídas en el rendimiento o aumentos en la latencia de tu dashboard. Para obtener más información, consulta la documentación de [Check de servicio][1].

El estado del check muestra el estado actual o la cantidad de resultados de cualquier check realizado:

{{< img src="dashboards/widgets/check_status/check_status.png" alt="Widget de estado del check" >}}

## Python

### Dashboards

1. Selecciona un [check de servicio][1] creado previamente.
2. Elige un período de tiempo para la presentación de informes. En este período de tiempo siempre se incluye hasta el momento actual, por lo que puedes elegir una opción como `The past 10 minutes` o `The past 1 day` y te informará un estado que incluye ese período de tiempo hasta el momento presente. Si eliges `Global Time`, la persona que utiliza el dashboard puede seleccionar un rango con el selector de período de tiempo en la parte superior derecha, _pero debe elegir uno que incluya el momento presente_, es decir, cualquier período de tiempo de `past X`. De lo contrario, el widget estará en blanco.
3. Elige tu alcance:
    * **A single check** (Un solo check): selecciona esta opción si tu widget de estado del check solo es para un elemento específico, por ejemplo: un `host:<HOSTNAME>`, un `service:<SERVICE_NAME>`.
    * **A cluster of checks** (Un clúster de checks): selecciona esta opción si tu widget de estado del check es para un alcance de elementos como en todos los `host`s, o todos los `service`s.

4. Después de seleccionar tu alcance, define el contexto del widget de estado del check con el campo **Reported by** (Informado por).
5. En el caso del alcance de **A cluster of checks** (Un clúster de checks), tienes la opción de seleccionar un subconjunto con el campo **Group by** (Agrupar por). **Nota**: El estado del check no te muestra el recuento de checks por grupo, te muestra el recuento de grupos que ejecutan el check. Por ejemplo, si estás monitorizando el Agent activo, agrupado por `env`, el estado del check te muestra el número de `env` que coincide con las configuraciones de tu alcance y que está ejecutando el Agent, no el recuento de Agents en un entorno.

## Python

Este widget se puede utilizar con la **[API de dashboards][2]**. Consulta la siguiente tabla para obtener la [definición del esquema JSON del widget][3]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/developers/service_checks
[2]: /es/api/latest/dashboards/
[3]: /es/dashboards/graphing_json/widget_json/
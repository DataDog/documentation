---
description: Aprende a delimitar correctamente los tiempos de inactividad a monitores
  y grupos específicos mediante etiquetas de monitor, alcances de grupo y filtrado
  detallado.
disable_toc: false
further_reading:
- link: /monitors/downtimes
  tag: Documentación
  text: Información general sobre tiempos de inactividad
- link: /monitors/manage/search
  tag: Documentación
  text: Sintaxis de consulta para la búsqueda de monitores
- link: /monitors/guide/suppress-alert-with-downtimes
  tag: Guía
  text: Suprimir alertas a través de la API de tiempos de inactividad y la interfaz
    de usuario
title: Delimitación de los tiempos de inactividad
---

## Información general

Los tiempos de inactividad se programan para cierres del sistema, mantenimientos fuera de línea o actualizaciones sin activar tus monitores. Los tiempos de inactividad silencian todas las alertas y notificaciones de monitores, pero no impiden las transiciones de estado de los monitores.

En la mayoría de los casos, no querrás silenciar completamente **todas** las notificaciones de monitores, ya que correrías el riesgo de perder importantes alertas que no están relacionadas con ningún mantenimiento programado.

Esta guía muestra cómo delimitar adecuadamente los tiempos de inactividad a través de la interfaz de usuario para la delimitación de los tiempos de inactividad en un proceso de dos pasos:
1. [Selecciona el o los monitores en el/los que quieres aplicar el tiempo de inactividad.](#choose-which-monitors-to-silence)
2. [Delimita la consulta para filtrar las notificaciones _exactas_ que quieres silenciar en cada uno de los monitores.](#granularly-scope-downtimes)

## Elige qué monitores silenciar

Define a qué monitores quieres asignar los tiempos de inactividad. Hay tres opciones diferentes: asignarlos a un monitor específico, a varios monitores o a todos los monitores.

### Seleccionar un monitor específico

Puedes optar por silenciar temporalmente un monitor específico. Por ejemplo, si el monitor está enviando muchas alertas en ese momento o si es el único monitor afectado por un eventual mantenimiento.

En la configuración del tiempo de inactividad, selecciona **Por nombre de monitor** y busca el monitor deseado.

### Seleccionar varios monitores en función de las etiquetas (tags) de monitor

<div class="alert alert-info">Las etiquetas de monitor son independientes de las etiquetas enviadas por el Agent o por las integraciones y de las etiquetas asignadas a los datos que estás consultando.</div>

Los tiempos de inactividad en monitores pueden programarse en función de tus etiquetas de monitor y luego delimitarse mediante las etiquetas agrupadas en la consulta del monitor. Selecciona `By Monitor Tags` e introduce las etiquetas del monitor que quieres seleccionar.

**Nota**: Las etiquetas son aditivas, lo que significa que una entrada de `env:dev team:automations` se asignará a monitores que tengan **ambas** etiquetas: `env:dev` Y `team:automations`.

### Seleccionar todos los monitores

Para ambas opciones, `By Monitor Name` o `By Monitor Tags`, puedes optar por asignarlas a todos los monitores seleccionando el primer elemento del menú desplegable etiquetado como `All Monitors`.

## Delimitar tiempos de inactividad de forma específica

Utiliza el contexto de grupo para aplicar filtros adicionales a tu tiempo de inactividad y tener un control específico sobre los monitores que quieres silenciar. El contexto de grupo de un tiempo de inactividad se empareja **con** el objetivo específico del monitor. Si seleccionas varios monitores utilizando etiquetas de monitor, primero tendrás que buscar los monitores etiquetados en consecuencia antes del emparejamiento con el contexto de grupo.

Los ejemplos de esta guía muestran cómo el `Group scope` puede aplicarse a monitores en los que está configurada la [agrupación de alertas múltiples][2].

### Silenciar monitores con una etiqueta específica

1. Para programar un tiempo de inactividad en un solo grupo (en este caso, `service:web-store`), introduce ese grupo en el campo `Group scope`.
2. Haz clic en **Preview affected monitors** (Previsualizar monitores afectados) para comprobar que el monitor elegido sigue en el contexto, a fin de que las alertas del grupo `service:web-store` se silencien durante el tiempo de inactividad programado.

{{< img src="monitors/downtimes/downtime_example_byname.png" alt="Ejemplo de tiempo de inactividad 'Por nombre de monitor' que muestra la vista previa de los monitores afectados" style="width:90%;">}}

Una vez que se inicia el tiempo de inactividad programado, sólo se silencian las alertas del grupo `service:web-store` de ese monitor.

Esto silencia cualquier alerta que incluya la etiqueta `service:web-store`, por ejemplo:

| Grupo de monitores                | Silenciado |
| ---------------------------  | --- |
| `host:A`, `service:web-store`| Sí |
| `host:A`, `host:B`, `service:synthesizer`, `service:demo`, `service:web-store`| Sí |
| `host:A`, `host:B`, `service:synthesizer`| No (falta `service:web-store`) |


### Silenciar monitores que tienen varias etiquetas

1. Para programar un tiempo de inactividad en varios grupos (por ejemplo, `service:web-store` y `env:prod`), introduce ese grupo en el campo `Group scope`.
2. Haz clic en **Preview affected monitors** (Previsualizar monitores afectados) para verificar los monitores que se encuentran en el contexto.
3. Una vez que se inicia el tiempo de inactividad programado, se silencian las alertas del grupo:
`env:prod` **Y** `service:web-store`

| Grupo de monitores                                                                    | Silenciado |
| -----------                                                                      | ----  |
| `env:prod`, `service:web-store`                                                  | Sí |
| `env:prod`, `env:dev`, `service:synthesizer`, `service:demo`, `service:web-store`| Sí |
| `env:dev`, `env:demo`, `service:web-store`                                       | No (falta `env:prod`) |
| `env:prod`, `env:demo`, `service:synthesizer`                                    | No (falta `service:web-store`) |


### Silenciar monitores mediante la combinación de etiquetas

Para combinar varios valores de etiquetas en un contexto más complejo, utiliza las combinaciones `OR` en un único tiempo de inactividad. Por ejemplo, si quieres silenciar todas las notificaciones relacionadas con entornos de desarrollo o de puesta en marcha, utiliza `env:(dev OR staging)` como tu consulta de contexto.

**Nota**: No se admite la combinación de diferentes etiquetas (por ejemplo, `env:dev OR service:web-store`). En estos casos es necesario crear un tiempo de inactividad distinto para cada etiqueta.

Consulta `env:(dev OR staging)`
| Grupo de monitores                                                            | Silenciado |
| -----------                                                                          | ----  |
| `env:staging`, `service:web-store`                                             | Sí |
| `env:dev`, `env:prod`, `service:web-store`                                  | Sí |
| `env:demo`, `env:staging`, `service:web-store`                              | Sí |
| `env:demo`, `env:prod`, `service:web-store  `                               | No (faltan `env:dev` y `env:staging`) |

### Silenciar monitores mediante contextos con comodines

La ejecución de importantes actualizaciones dentro de tu infraestructura no es poco frecuente. Los tiempos de inactividad pueden ayudar silenciar todas las entidades afectadas, sin demasiado scripting adicional. Por ejemplo, podrías estar actualizando todos los hosts de un determinado servicio. Estos hosts podrían seguir ciertas convenciones de nomenclatura de tu organización, como llevar los nombres de sus aplicaciones relacionadas como prefijo. Esto podría resultar en cientos de hosts con nombres como `host:mydemoapplication-host-1`y `host:mydemoapplication-host-2`.

Crea un tiempo de inactividad delimitado por `host:mydemoapplication-*`. Esto empareja y silencia todos los hosts que tienen el prefijo correspondiente. También puedes aplicar el método inverso, en el que el tiempo de inactividad está delimitado por `host:*-mydemoapplication`. Esto empareja y silencia todos los hosts que terminan con `mydemoapplication`.

### Excluir grupos para no silenciarlos

Si estás ejecutando tu aplicación y tu infraestructura en varios entornos, probablemente tengas un entorno de producción y varios entornos de no producción (por ejemplo, de test, de regresión o de demostración). Para evitar recibir alertas de entornos de no producción, puedes configurar un tiempo de inactividad delimitado por: `env:* -env:prod`. Este contexto agrupa todas las alertas que tienen el conjunto de etiquetas `env` y luego excluye tu entorno de producción como un paso secundario.

### Múltiples monitores delimitados con la misma etiqueta

1. El *monitor A* es un monitor de alerta múltiple para hosts que informan de una métrica promediada entre varios grupos de `service`.
2. El *monitor B* es un monitor de alerta múltiple para hosts que informan sobre la misma métrica para `service:web-store`.
3. El tiempo de inactividad se programa para cualquier monitor que tenga la etiqueta de monitor `downtime:true`.
4. Este tiempo de inactividad se limita al grupo `service:web-store`.
5. Haz clic en **Preview affected monitors** (Previsualizar monitores afectados) para verificar los monitores que están en el contexto. En este ejemplo se muestra que ambos monitores tienen el grupo `service:web-store` en el contexto.

{{< img src="monitors/downtimes/downtime_examplebytag1_downtime.png" alt="Ejemplo de tiempo de inactividad 'Por etiquetas de monitor' que muestra la previsualización de los monitores afectados" style="width:80%;">}}

6. El *monitor A* muestra que se ha iniciado el tiempo de inactividad, pero sólo para el grupo en el contexto: `service:web-store`

7. El *monitor B* muestra que se ha iniciado el tiempo de inactividad para `service:web-store`. Debido a que todos los grupos de monitores (por `host`) pertenecen a `service:web-store`, todos los hosts estarán silenciados durante el tiempo de inactividad de este monitor.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/manage/#monitor-tags
[2]: /es/monitors/configuration/#multi-alert
[3]: /es/monitors/manage/search/
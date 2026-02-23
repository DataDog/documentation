---
algolia:
  tags:
  - acciones del usuario
description: Realiza un seguimiento automático de las interacciones de los usuarios
  y las acciones personalizadas en las aplicaciones web para comprender el comportamiento
  de los usuarios, el rendimiento y la adopción de funciones.
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Presentación del Real User Monitoring (RUM) de Datadog
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Explorar tus vistas en Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentación
  text: Aplicar visualizaciones a tus eventos
- link: /real_user_monitoring/platform/dashboards/
  tag: Documentación
  text: Información sobre los dashboards de RUM
title: Rastrear las acciones de los usuarios
---

## Información general

La monitorización del navegador detecta automáticamente las interacciones realizadas por los usuarios durante su recorrido y proporciona información sobre su comportamiento sin necesidad de instrumentar de forma manual cada uno de los clics de tu aplicación.

Puedes alcanzar los siguientes objetivos:

* Comprender el rendimiento de las interacciones clave (por ejemplo, un clic en el botón **Add to cart** [Añadir al carrito]).
* Cuantificar la adopción de las funciones
* Identificar los pasos que llevaron a un error específico en el navegador

Aunque no hay un límite explícito en el número total de acciones que pueden ser recopiladas por el SDK del RUM Browser durante una sesión, hay limitaciones técnicas en los tamaños de los eventos individuales y la carga útil enviada. Para más detalles sobre las limitaciones de las acciones, consulta la [documentación de resolución de problemas del RUM Browser][1].

## Administrar la información recopilada

El parámetro de inicialización `trackUserInteractions` activa la recopilación de los clics del usuario en tu aplicación, lo que significa que se pueden incluir datos confidenciales y privados presentes en tus páginas para identificar los elementos con los que ha interactuado un usuario.

Para controlar qué información se envía a Datadog, puedes [enmascarar nombres de acciones con opciones de privacidad][2], [configurar manualmente un nombre de acción](#declare-a-name-for-click-actions) o [implementar una regla de limpieza global en el SDK de Datadog Browser para RUM][3].

## Administrar las interacciones de los usuarios

El SDK de RUM Browser rastrea automáticamente los clics para generar acciones de clic. Una acción de un solo clic representa generalmente un clic del usuario, excepto cuando se hace clic varias veces seguidas en el mismo elemento, y en ese caso se considera una sola acción (consulta [Señales de frustración "clics repetidos"][4]).

## Telemetría de tiempos de acción

Para obtener información sobre los atributos predeterminados para todos los tipos de eventos RUM, consulta [Datos recopilados del RUM Browser][5].

| Telemetría    | Tipo   | Descripción              |
|--------------|--------|--------------------------|
| `action.loading_time` | número (ns) | El tiempo de carga de la acción.  |
| `action.long_task.count`        | número      | Número de tareas largas recopiladas para esta acción. |
| `action.resource.count`         | número      | Número de recursos recopilados para esta acción. |
| `action.error.count`      | número      | Número de errores recopilados para esta acción.|

El SDK de Datadog Browser para RUM calcula el tiempo de carga de la acción monitorizando la actividad de la página después de cada clic. Una acción se considera completa cuando la página no tiene más actividad. Consulta [Cómo se calcula la actividad de la página][2] para obtener más información.

Para obtener más información sobre la configuración para el muestreo o el contexto global, consulta [Modificación de datos y contexto RUM][3].

## Atributos de las acciones

| Atributo    | Tipo   | Descripción              |
|--------------|--------|--------------------------|
| `action.id` | cadena | UUID de la acción del usuario. |
| `action.type` | cadena | Tipo de acción del usuario. En el caso de las acciones personalizadas del usuario, se configura como `custom`. |
| `action.target.name` | cadena | Elemento con el que ha interactuado el usuario. Solo para acciones recopiladas automáticamente. |
| `action.name` | cadena | Nombre de usuario creado (por ejemplo, `Click on #checkout`). Si se trata de acciones personalizadas del usuario, el nombre de la acción indicado en la llamada de la API. |

## Declarar un nombre para las acciones de clics

El SDK del navegador de Datadog para RUM utiliza varias estrategias para asignar un nombre a las acciones de clics. Si deseas tener un mayor control, puedes definir un atributo `data-dd-action-name` en los elementos en los cuales se puede hacer clic (o en cualquiera de sus elementos principales) que se utilizan para dar un nombre a la acción.

Por ejemplo:

```html
<a class="btn btn-default" href="#" role="button" data-dd-action-name="Login button">Try it out!</a>

<div class="alert alert-warning" role="alert" data-dd-action-name="Dismiss alert">
    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
    <span class="visually-hidden">Error:</span>
    Enter a valid email address
</div>
```

A partir de la [versión 2.16.0][7], con el parámetro de inicialización `actionNameAttribute`, puedes especificar un atributo personalizado que se utiliza para dar nombre a acción.

Por ejemplo:

```html
<script>
  window.DD_RUM.init({
    ...
    trackUserInteractions: true,
    actionNameAttribute: 'data-custom-name',
  ...
  })
</script>

<a class="btn btn-default" href="#" role="button" data-custom-name="Login button">Try it out!</a>
```

Cuando ambos atributos están presentes en un elemento, se favorece `data-dd-action-name`.

### Cómo se calculan los nombres de las acciones

El SDK del navegador de Datadog utiliza diferentes estrategias para calcular los nombres de las acciones de clics:

1. Si el usuario configura explícitamente el atributo `data-dd-action-name` o un atributo personalizado (como se ha explicado anteriormente) en el elemento sobre el que se ha hecho clic (o en uno de los principales), su valor se utiliza como nombre de la acción.

2. Si no se configura el atributo `data-dd-action-name` o su equivalente, según el tipo de elemento, el SDK utiliza otros atributos como `label`, `placeholder`, `aria-label` del elemento o de los principales para construir el nombre de la acción. Si no se encuentra ninguno de estos atributos, el SDK utiliza el texto interior como nombre de la acción.

## Enviar acciones personalizadas

Para aumentar la recopilación de interacciones del usuario, envía tus acciones personalizadas mediante la API `addAction`. Estas acciones personalizadas envían información sobre un evento que se produce durante el recorrido de un usuario.

Para obtener más información, consulta [Enviar acciones personalizadas][8].

## Límites y muestreo de acciones

No existe un límite estricto en el número de acciones del usuario, como clics o acciones personalizadas, que el SDK de Datadog RUM Browser puede rastrear por sesión o página. Sin embargo, debes tener en cuenta lo siguiente:

- **Muestreo**: puedes configurar el SDK para que muestree un porcentaje de las acciones del usuario utilizando las opciones `sampleRate` y `trackInteractions`. Esto ayuda a controlar el volumen de datos enviados a Datadog. Para más información, consulta [Configuración avanzada][1].
- **Rendimiento**: el SDK agrupa y envía eventos periódicamente. En casos de acciones de alta frecuencia, como clics repetidos, el SDK puede deduplicar o agrupar acciones, por ejemplo, mediante la detección de clics repetidos para evitar inundaciones.

Como mejor práctica, si esperas un alto volumen de acciones de usuario, considera ajustar tu configuración de muestreo y monitorizar tu uso de eventos de Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/troubleshooting/
[2]: /es/data_security/real_user_monitoring/#mask-action-names
[3]: /es/real_user_monitoring/browser/advanced_configuration/
[4]: /es/real_user_monitoring/browser/frustration_signals/
[5]: /es/real_user_monitoring/browser/data_collected/#default-attributes
[6]: /es/real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[7]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2160
[8]: /es/real_user_monitoring/guide/send-rum-custom-actions
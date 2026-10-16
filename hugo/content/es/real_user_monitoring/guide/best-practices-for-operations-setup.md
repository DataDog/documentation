---
description: Aprenda a definir operaciones de RUM que generen métricas confiables
  de disponibilidad y latencia para los recorridos.
further_reading:
- link: /real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
  tag: Guía
  text: Mejores prácticas para crear SLO para operaciones de RUM
- link: /real_user_monitoring/operations_monitoring/?tab=browser
  tag: Documentación
  text: Obtenga información sobre el monitoreo de operaciones
- link: /journey_monitoring/
  tag: Documentación
  text: Obtenga información sobre Journey Monitoring
title: Prácticas recomendadas para configurar operaciones de RUM
---
## Descripción general {#overview}

Esta guía le ayuda a elegir el método adecuado para definir operaciones y aplicar las mejores prácticas al definir cada [operación][1].

Las operaciones bien definidas generan [métricas de disponibilidad y latencia][2] confiables a partir de todo el tráfico de sesión en su aplicación RUM. Cuando vincule una operación a un recorrido, estas métricas le ayudan a evaluar los pasos críticos del recorrido e identificar problemas de rendimiento que impiden que los usuarios completen el recorrido.

## Elija un método de instrumentación {#choose-an-instrumentation-method}

Elija un método de instrumentación según si puede cambiar su código de frontend y cuánto control necesita sobre el ciclo de vida de la operación. Puede definir operaciones de una de estas dos maneras:

1. Agregue instrumentación directamente al código de su aplicación frontend con las [API del SDK de RUM][3].
2. Cree operaciones a partir de eventos de RUM existentes con la interfaz de usuario o la API de Datadog.

Las API del SDK de RUM brindan más control sobre una operación. La Datadog UI y la API de Datadog le permiten definir operaciones sin implementar cambios en el código del frontend.

### Use las API del SDK de RUM {#use-rum-sdk-apis}

Use las API del SDK de RUM si tiene acceso a su base de código del frontend y puede implementar cambios. Este método le permite definir cuándo comienza y termina una operación, especificar si tiene éxito o falla, e identificar fallas causadas por errores o abandono. También puede agregar atributos personalizados para proporcionar contexto sobre cada operación.

### Use la Datadog UI o la API de Datadog {#use-the-datadog-ui-or-api}

Use la Datadog UI si no puede acceder a su base de código del frontend o desea generar eventos y métricas de operación sin cambiar el código del frontend. Con este método, defina una operación asignando eventos de RUM, como vistas, recursos y errores, a las condiciones de inicio, éxito y falla de la operación. Dado que la operación depende de eventos ya recopilados por RUM, sus límites se limitan a esos eventos.

Utilice la Datadog API para crear operaciones de forma masiva después de determinar qué eventos de RUM existentes definen cada operación.

<div class="alert alert-warning">Una aplicación RUM admite hasta 1,000 operaciones creadas con la Datadog UI o la API de Datadog. Las API del SDK de RUM no limitan la cantidad de operaciones que puede definir.</div>

## Aplique las mejores prácticas al definir operaciones {#apply-best-practices-when-defining-operations}

### Mida el trabajo controlado por la aplicación {#measure-application-controlled-work}

Defina una operación en torno a un paso que su aplicación realiza y que los usuarios esperan que se complete de manera confiable. Por ejemplo, una operación podría medir el tiempo necesario para cargar resultados de búsqueda o enviar un formulario. Las operaciones lentas o fallidas pueden frustrar a los usuarios y evitar que completen el recorrido.

Excluya el tiempo dedicado a esperar la entrada del usuario, como leer contenido o decidir qué seleccionar. El tiempo controlado por el usuario aumenta la latencia medida incluso cuando la aplicación funciona como se espera, lo que dificulta la identificación de problemas de rendimiento de la aplicación.

### Mantenga la tasa de tiempo de espera en o por debajo del 1% {#keep-the-timeout-rate-at-or-below-1}

Cada operación debe tener un inicio y un final registrados. El final indica si la operación tuvo éxito o falló. Si RUM registra el inicio pero no el final correspondiente, la [operación agota el tiempo de espera][4] (consulte la nota en **Paralelización**) y Datadog no puede determinar su resultado.

Las operaciones que agotan el tiempo de espera reducen la muestra de operaciones con datos de resultados significativos y pueden ocultar errores o el abandono del usuario. Mantenga la tasa de tiempo de espera en o por debajo del 1% para que Datadog pueda clasificar al menos el 99% de las operaciones iniciadas como éxitos o fallas. Una tasa de tiempo de espera más alta hace que las métricas de rendimiento de la operación sean menos representativas y puede indicar una instrumentación incompleta.

### Vincule las operaciones a los recorridos {#link-operations-to-journeys}

Vincule una operación a un recorrido cuando la cree para que la operación contribuya al estado del recorrido. La vinculación es opcional durante la creación de la operación, y posteriormente puede vincular la operación a recorridos adicionales o eliminar los vínculos existentes.

### Cree SLOs para su recorrido {#create-slos-for-your-journey}

Para un desglose completo, consulte [Prácticas recomendadas para crear SLOs para operaciones de RUM][7].

### Priorice la operación final en un recorrido {#prioritize-the-final-operation-in-a-journey}

Priorice la operación que representa el paso final de un recorrido porque su resultado a menudo determina si el usuario completa el recorrido. Defina el inicio y el resultado exitoso de la operación en torno a ese paso final. Por ejemplo:

- **Recorrido de pago**: Inicie la operación final cuando el usuario haga clic en **Pagar ahora**, y márquela como exitosa cuando se complete el pago.
- **Recorrido de inicio de sesión**: Inicie la operación final cuando el usuario haga clic en **Iniciar sesión** con credenciales válidas, y márquela como exitosa cuando la aplicación autentique al usuario.
- **Recorrido de búsqueda**: Inicie la operación final cuando el usuario envíe una consulta de búsqueda válida, y márquela como exitosa cuando la página de resultados muestre los elementos coincidentes.

## Solucione problemas de instrumentación de operaciones {#troubleshoot-operation-instrumentation}

Utilice las siguientes herramientas para investigar resultados de operación inesperados o verificar que una operación esté instrumentada correctamente:

- Inicie una [Bits Investigation][5] desde una tarjeta de recomendación en la página de detalles de la operación para analizar errores, abandonos, tiempos de espera, bloqueos y lentitud.
- Revise sesiones de ejemplo en la página de detalles de la operación para el resultado que desea investigar.
- Consulte eventos de operación en el [RUM Explorador][6] para inspeccionar sus atributos y el contexto de sesión circundante.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/operations_monitoring/?tab=browser
[2]: /es/real_user_monitoring/operations_monitoring/?tab=browser#monitor-your-availability-on-datadog
[3]: /es/real_user_monitoring/operations_monitoring/?tab=browser#start-an-operation
[4]: /es/real_user_monitoring/operations_monitoring/?tab=browser#parallelization
[5]: /es/real_user_monitoring/bits_ai/optimize_performance/#operations-monitoring
[6]: /es/real_user_monitoring/explorer/
[7]: /es/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
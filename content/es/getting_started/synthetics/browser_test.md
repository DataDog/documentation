---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: Centro de aprendizaje
  text: Introducción a los tests Synthetic
- link: /synthetics/browser_tests
  tag: Documentación
  text: Más información sobre los tests de navegador
- link: /getting_started/synthetics/private_location
  tag: Documentación
  text: Más información sobre las localizaciones privadas
- link: /continuous_testing/cicd_integrations
  tag: Documentación
  text: Descubre cómo activar los tests Synthetic desde tu pipeline de integración/distribución
    continuas (CI/CD)
- link: /synthetics/identify_synthetics_bots
  tag: Documentación
  text: Descubre cómo identificar los bots Synthetic de los tests de API
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Más información sobre los monitores de test sintéticos
kind: documentación
title: Empezando con los tests de navegador
---

## Información general

[Los tests de navegador][1] son situaciones que Datadog lleva a cabo en tus aplicaciones web. Puedes configurar intervalos periódicos para ejecutar tests desde varias localizaciones, dispositivos y navegadores, así como desde tus pipelines de CI/CD.

{{< img src="getting_started/synthetics/browser-test-overview.png" alt="Información general del test de un navegador Synthetic" style="width:100%;" >}}

Estos tests verifican que los usuarios puedan llevar a cabo **transacciones empresariales críticas** en tus aplicaciones y que los últimos cambios en el código no hayan causado problemas.

## Crear un test de navegador

El siguiente ejemplo demuestra la creación de un test de navegador que mapea el recorrido de un usuario desde que añade un artículo al carrito hasta que realiza el pago.

{{< img src="getting_started/synthetics/browser-test-1.png" alt="Test de navegador que mapea el recorrido de un usuario" style="width:100%;" >}}
### Configura los detalles de tu test

1. En el sitio de Datadog, pasa el cursor sobre **UX Monitoring** (Monitorizar la experiencia de uso), en el menú de la izquierda, y selecciona **[Synthetic Tests][2]** (Tests Synthetic).
2. En la esquina superior derecha, haz clic en **New Test** (Nuevo test) > **[Browser Test][3]** (Test de navegador).
3. Define tu test de navegador:

    - Añade la URL al sitio web que quieres monitorizar. Si no sabes con qué empezar, puedes usar `https://www.shopist.io`, una aplicación web de comercio electrónico de prueba.
    - Selecciona **Advanced Options** (Opciones avanzadas) para establecer las opciones de solicitud, certificados, credenciales de autenticación y otros parámetros personalizados.
      En este ejemplo, no se necesita ninguna opción avanzada en concreto.
    - Elige un nombre para tu test y configura las etiquetas asociadas, como `env:prod` y `app:shopist`. Las etiquetas te ayudarán a organizar tu conjunto de tests y a encontrar rápidamente los que necesites en la página de inicio.
    - Elige los navegadores y dispositivos con los que quieres hacer los tests.

### Selecciona las localizaciones

Elige una o varias **localizaciones gestionadas** o **localizaciones privadas** desde las que ejecutar tu test.

Las localizaciones gestionadas te permiten hacer tests en sitios web y endpoints públicos. Para hacer tests en aplicaciones internas o simular el comportamiento de los usuarios en regiones geográficas discretas, utiliza [localizaciones privadas][4].

La aplicación Shopist está disponible públicamente en `https://www.shopist.io/`, así que puedes elegir cualquier localización gestionada para ejecutar tu test.

### Indica la frecuencia del test

Elige la frecuencia con la que quieres que se ejecute tu test. Si lo prefieres, puedes dejar la frecuencia predeterminada de 1 hora.

Además de ejecutar tu test Synthetic de forma programada, puedes activarlo manualmente o desde tus [pipelines de CI/CD][5].

### Define las condiciones de alerta

Puedes definir las condiciones de alerta para asegurarte de que tu test no se active en situaciones como un incidente breve y esporádico en la red. De este modo, solo recibirás alertas en caso de que haya problemas reales con tu aplicación.

Puedes indicar el número de fallos consecutivos que deberían producirse antes de considerar que una localización ha fallado:

```text
Repetir el test 2 veces tras 300 ms en caso de fallo
```

También puedes configurar tu test para activar solo una notificación cuando la aplicación deje de funcionar durante cierto tiempo y en un número determinado de localizaciones. En el siguiente ejemplo, la regla de alerta está configurada para enviar una notificación si la prueba falla durante tres minutos en dos localizaciones distintas:

```text
La alerta se activa si el test falla durante 3 minutos en 2 de las 13 localizaciones
```

### Configurar el monitor de tests

Redacta el mensaje de la alerta y añade la dirección de correo electrónico a la que deben enviarse las alertas del test.

{{< img src="getting_started/synthetics/configured-browser-test.mp4" alt="Ejemplo de configuración del test de un navegador" video="true" >}}

También puedes usar [integraciones de notificaciones][6] como Slack, PagerDuty, Microsoft Teams y webhooks. Para activar una alerta Synthetic para estas herramientas de notificación, primero deberás configurar la [integración][7] correspondiente.

Cuando estés listo para guardar la configuración y el monitor tu prueba, haz clic en **Save & Edit Recording** (Guardar y editar grabación).

Para más información, consulta [Uso de monitores de test sintéticos][8].

## Crear una grabación

Una vez guardada la configuración del test, Datadog te pedirá que descargues e instales la extensión de Chrome [Datadog test recorder][9]. 

Cuando hayas instalado la extensión, haz clic en **Start Recording** (Iniciar grabación) para empezar a grabar los pasos del test.

Navega por la página en el iframe ubicado a la derecha de la página de grabación. Cuando selecciones un div, una imagen o cualquier área de la página, Datadog grabará y creará el paso correspondiente en el test de navegador.

Para finalizar la grabación de los pasos del test, haz clic en **Stop Recording** (Detener la grabación).

El siguiente ejemplo muestra cómo mapear el recorrido de un usuario desde que se añade un artículo al carrito hasta que se realiza el pago en `https://www.shopist.io`:

1. Dirígete a alguna de las secciones de muebles en el sitio web de ejemplo, como la de **Chairs** (Sillas), y selecciona **Add to cart** (Añadir al carrito).
2. Haz clic en **Cart** (Carrito) y **Checkout** (Pagar).
3. En **Add New** (Añadir nuevo), selecciona **Assertion** (Aserción) y haz clic en **"Test that some text is present on the active page"** (Comprobar que hay texto en la página activa).
4. Para confirmar que las palabras "Thank you!" (Gracias) aparecen después de realizar el pago, escribe `Thank you!` en el campo **Value** (Valor).
5. Haz clic en **Save & Quit** (Guardar y cerrar).

Es importante finalizar el test de navegador con una **aserción** para asegurarte de que la aplicación cambie al estado esperado después del recorrido del usuario que hayas definido.

{{< img src="getting_started/synthetics/record-test.mp4" alt="Grabar los pasos del test" video="true" >}}

El sitio web de ejemplo genera regularmente un error que hace que falle intencionadamente. Si incluyes tu dirección de correo electrónico en el campo **Notify your team** (Notificar a tu equipo), recibirás un correo electrónico notificación cuando la prueba falle y se recupere.

## Consultar los resultados del test

La página de detalles del **test de navegador** muestra la información general sobre la configuración de tu test, el tiempo de actividad global y por localización, gráficos sobre el tiempo de interacción y la duración del test, ejemplos de resultados de test correctos y fallidos, y una lista con todos los resultados del test. Dependiendo de la duración del test, quizá tengas que esperar unos minutos hasta ver los primeros resultados.

Para solucionar los problemas de un [test fallido][10], selecciona el test que corresponda y repasa las capturas de pantalla hasta encontrar el paso fallido. También puedes consultar los posibles **[errores y advertencias][11]**, **[recursos][12]** y **[métricas de Core Web Vitals][13]** para hacer un diagnóstico del problema.

En el siguiente ejemplo, el test ha fallado debido al tiempo de espera del servidor.

{{< img src="getting_started/synthetics/browser-test-failure.mp4" alt="Fallo en el test del navegador" video="true" >}}

Utiliza la [integración de APM con la monitorización Synthetic][14] de Datadog para ver las trazas generadas por tu backend en las ejecuciones del test desde la pestaña **Traces** (Trazas).

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/list
[3]: https://app.datadoghq.com/synthetics/browser/create
[4]: /es/getting_started/synthetics/private_location
[5]: /es/continuous_testing/cicd_integrations
[6]: /es/integrations/#cat-notification
[7]: https://app.datadoghq.com/account/settings
[8]: /es/synthetics/guide/synthetic-test-monitors
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /es/synthetics/browser_tests/test_results#test-failure
[11]: /es/synthetics/browser_tests/test_results#errors
[12]: /es/synthetics/browser_tests/test_results#resources
[13]: /es/synthetics/browser_tests/test_results#page-performance
[14]: /es/synthetics/apm/
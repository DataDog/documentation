---
description: Cree pruebas de navegador de Datadog para hacer un seguimiento de los
  recorridos de los usuarios en dispositivos y navegadores. Grabe escenarios de prueba,
  configure alertas y valide transacciones comerciales.
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centro de aprendizaje
  text: Primeros pasos con las pruebas Synthetic de navegador
- link: /synthetics/browser_tests
  tag: Documentación
  text: Más información sobre las pruebas de navegador
- link: /getting_started/synthetics/private_location
  tag: Documentación
  text: Más información sobre ubicaciones privadas
- link: /continuous_testing/cicd_integrations
  tag: Documentación
  text: Aprenda a activar pruebas Synthetic desde su canalización de CI/CD
- link: /synthetics/identify_synthetics_bots
  tag: Documentación
  text: Aprenda a identificar bots Synthetic para pruebas de API.
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Obtenga información sobre los monitores de prueba Synthetic
- link: /synthetics/guide/export-tests-to-terraform
  tag: Guía
  text: Exportar pruebas Synthetic a Terraform
title: Primeros pasos con las pruebas de navegador
---
## Descripción general {#overview}

[Las pruebas de navegador][1] son escenarios que Datadog ejecuta en sus aplicaciones web. Puede configurar intervalos periódicos para ejecutar pruebas desde múltiples ubicaciones, dispositivos y navegadores, así como ejecutarlas desde sus canalizaciones de CI/CD. Estas pruebas verifican que sus usuarios puedan realizar **transacciones comerciales clave** en sus aplicaciones y que no se vean afectados negativamente por cambios recientes en el código.

## Crear una prueba de navegador {#create-a-browser-test}

El siguiente ejemplo demuestra la creación de una prueba de navegador que mapea el recorrido de un usuario desde que agrega un artículo a un carrito hasta que finaliza la compra con éxito. 

### Configure los detalles de su prueba {#configure-your-test-details}

1. En el sitio de Datadog, pase el cursor sobre {{< ui >}}Digital Experience{{< /ui >}} en el menú de la izquierda y seleccione [{{< ui >}}Tests{{< /ui >}}][2] (bajo {{< ui >}}Synthetic Monitoring & Testing{{< /ui >}}).
2. En la esquina superior derecha, haga clic en {{< ui >}}New Test{{< /ui >}} > [{{< ui >}}Browser Test{{< /ui >}}][3].

Puede crear una prueba utilizando una de las siguientes opciones:

- **Cree una prueba a partir de una plantilla**:

    1. Pase el cursor sobre una de las plantillas precargadas y haga clic en {{< ui >}}View Template{{< /ui >}}. Esto abre un panel lateral que muestra información de configuración precargada, incluyendo: Detalles de la prueba, Condiciones de alerta, Pasos y, opcionalmente, Variables.
    2. Haga clic en {{< ui >}}\+ Create Test{{< /ui >}} para abrir la página de configuración, donde puede revisar y editar las opciones de configuración prellenadas. Los campos presentados son idénticos a los disponibles al crear una prueba desde cero.
    3. Haga clic en {{< ui >}}Save & Quit{{< /ui >}} en la esquina superior derecha para enviar su prueba de navegador.<br /><br>

       {{< img src="/synthetics/browser_tests/synthetics_templates_browser.mp4" alt="Video de la página de inicio de la prueba de navegador de Synthetics con plantillas" video="true" >}}

- **Cree una prueba desde cero**:

    1. Haga clic en la plantilla {{< ui >}}\+{{< /ui >}} para iniciar una nueva prueba de navegador desde cero.
    1. Agregue la URL del sitio web que desea hacer un seguimiento Si no sabe por dónde empezar, puede usar `https://www.shopist.io`, una aplicación web de comercio electrónico de prueba.
    2. Seleccione {{< ui >}}Advanced Options{{< /ui >}} para establecer opciones de solicitud personalizadas, certificados, credenciales de autenticación y más. 
    3. Asigne un nombre a su prueba y establézcale etiquetas como `env:prod` y `app:shopist`. Las etiquetas le permiten mantener organizado su conjunto de pruebas y encontrar rápidamente las pruebas que le interesan en la página de inicio.
    4. Elija los navegadores y dispositivos con los que desea probar. 
    5. Haga clic en {{< ui >}}Save & Edit Recording{{< /ui >}} para enviar su prueba de navegador.

### Seleccione ubicaciones {#select-locations}

Seleccione una o más {{< ui >}}Managed Locations{{< /ui >}} o {{< ui >}}Private Locations{{< /ui >}} desde las cuales ejecutar su prueba.

Las ubicaciones administradas le permiten probar sitios web y puntos de conexión públicos. Para probar aplicaciones internas o simular el comportamiento del usuario en regiones geográficas discretas, utilice [ubicaciones privadas][4] en su lugar.

La aplicación Shopist está disponible públicamente en `https://www.shopist.io/`, por lo que puede elegir cualquier ubicación administrada desde la cual ejecutar su prueba.

### Especifique la frecuencia de la prueba {#specify-test-frequency}

Seleccione la frecuencia con la que desea que se ejecute su prueba. Puede dejar la frecuencia predeterminada de 1 hora.

Además de ejecutar su prueba Synthetic según un horario, puede activarla manualmente o directamente desde sus [CI/CD pipelines][5].

### Defina las condiciones de alerta {#define-alert-conditions}

Puede definir condiciones de alerta para asegurarse de que su prueba no se active por cosas como una falla de red esporádica, de modo que solo reciba una alerta en caso de problemas reales con su aplicación.

Puede especificar el número de fallas consecutivas que deben ocurrir antes de considerar que una ubicación falló:

```text
Retry test 2 times after 300 ms in case of failure
```

También puede configurar su prueba para que solo active una notificación cuando su aplicación deje de funcionar durante una cierta cantidad de tiempo y número de ubicaciones. En el siguiente ejemplo, la regla de alerta está configurada para enviar una notificación si la prueba falla durante tres minutos en dos ubicaciones diferentes:

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### Configure el seguimiento de prueba {#configure-the-test-monitor}

Utilice esta sección para crear el **mensaje** que desea enviar con la notificación. La notificación incluye su mensaje personalizado y detalles sobre cualquier ubicación con fallas. Los mensajes de seguimiento prellenados se incluyen en el cuerpo del mensaje:

{{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Sección de seguimiento de Synthetic Monitoring, que destaca los mensajes de seguimiento prellenados" style="width:100%;" >}}

Por ejemplo, el siguiente mensaje de seguimiento crea un seguimiento que itera sobre los pasos y extrae variables para pruebas de navegador:

   ```text
   {{! Liste las variables extraídas en todos los pasos exitosos }}
   # Variables extraídas
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **Nombre**: `{{extractedValue.name}}`
   **Valor:** {{#if extractedValue.secure}}*Ofuscado (valor oculto)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

When you're ready to save your test configuration and monitor, click {{< ui >}}Save & Edit Recording{{< /ui >}}.

For more information, see [Using Synthetic Test Monitors][8].

## Create recording 

Once your test configuration is saved, Datadog prompts you to download and install the [Datadog test recorder][9] Chrome extension. (This Chrome extension can also be installed on a Microsoft Edge browser)

Once you have installed the extension, click {{< ui >}}Start Recording{{< /ui >}} to begin recording your test steps.

Navigate through the page in the iframe located on the right of the recorder page. When you select a div, image, or any area of the page, Datadog records and creates the associated step in the browser test. 

To end recording your test steps, click {{< ui >}}Stop Recording{{< /ui >}}.

The example below demonstrates how to map a user journey from adding an item to a cart to successfully checking out in `https://www.shopist.io`:

1. Navigate to one of the furniture sections on the example website such as {{< ui >}}Chairs{{< /ui >}} and select {{< ui >}}Add to cart{{< /ui >}}.
2. Click on {{< ui >}}Cart{{< /ui >}} and {{< ui >}}Checkout{{< /ui >}}.
3. Under {{< ui >}}Add New{{< /ui >}}, select {{< ui >}}Assertion{{< /ui >}} and click {{< ui >}}"Test that some text is present on the active page"{{< /ui >}}.
4. To confirm that the words "Thank you!" appear after checking out, enter `Thank you!` in the {{< ui >}}Value{{< /ui >}} field. 
5. Press {{< ui >}}Save & Quit{{< /ui >}}.

It is important to finish your browser test with an {{< ui >}}Assertion{{< /ui >}} to ensure your application resulted in the expected state after the defined user journey.

{{< img src="getting_started/synthetics/record-test.mp4" alt="Grabar pasos de prueba" video="true" >}}

El sitio web de ejemplo arroja un error regularmente, lo que provoca que falle intencionalmente. Si incluye su dirección de correo electrónico en el campo {{< ui >}}Configure the monitor for this test{{< /ui >}}, recibirá una notificación por correo electrónico cuando la prueba falle y se recupere.

## Consulte los resultados de la prueba {#look-at-test-results}

La página de detalles de {{< ui >}}Browser Test{{< /ui >}} muestra una descripción general de la configuración de su prueba, el tiempo de actividad global y por ubicación, gráficos sobre el tiempo hasta la interactividad y la duración de la prueba, ejemplos de resultados de pruebas exitosos y fallidos, y la lista de todos los resultados de las pruebas. Dependiendo de la duración de su prueba, es posible que deba esperar unos minutos para ver los primeros resultados de la prueba.

Para solucionar problemas de una [prueba fallida][10], revise las fallas en la pestaña **Actividad** o en la pestaña **Ejecuciones de prueba**. Seleccione una alerta de la línea de tiempo para ver un **¿Qué sucedió?** resumen que describe el paso fallido y el mensaje de error. Desde el panel **Próximos pasos**, puede investigar con Bits Investigation, ver la recuperación, pausar la programación o declarar un incidente. También puede revisar posibles [{{< ui >}}Errors & Warnings{{< /ui >}}][11], [{{< ui >}}Resources{{< /ui >}}][12] y [{{< ui >}}Core Web Vitals{{< /ui >}}][13] para diagnosticar el problema.

{{< img src="synthetics/browser_tests/synthetics_bits_investigation.png" alt="Página de detalles de la prueba de navegador que muestra la pestaña Actividad con una línea de tiempo de alertas, un resumen de fallas y un panel de Próximos pasos" style="width:100%;">}}

Utilice la [integración de APM con Synthetic Monitoring][14] de Datadog para ver los traces generados desde su backend por las ejecuciones de prueba desde la pestaña {{< ui >}}Traces{{< /ui >}}.

### Inicie una Bits Investigation {#launch-a-bits-investigation}

Para identificar la causa raíz de una prueba Synthetic de navegador fallida, inicie una [Bits Investigation][15]. Bits Investigation analiza los resultados de las pruebas, trazas, registros y métricas para revelar una causa raíz y marcar si el fallo es una regresión o una configuración incorrecta.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/tests
[3]: https://app.datadoghq.com/synthetics/browser/create
[4]: /es/getting_started/synthetics/private_location
[5]: /es/continuous_testing/cicd_integrations
[6]: /es/integrations/#cat-notification
[7]: https://app.datadoghq.com/account/settings
[8]: /es/monitors/types/synthetic_monitoring/
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /es/synthetics/browser_tests/test_results#test-failure
[11]: /es/synthetics/browser_tests/test_results#errors
[12]: /es/synthetics/browser_tests/test_results#resources
[13]: /es/synthetics/browser_tests/test_results#test-performance
[14]: /es/synthetics/apm/
[15]: /es/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page
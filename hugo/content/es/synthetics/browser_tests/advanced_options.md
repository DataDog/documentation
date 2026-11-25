---
aliases:
- /es/synthetics/guide/browser-tests-switch-tabs/
- /es/synthetics/guide/browser-test-self-maintenance/
description: Configure opciones avanzadas para los pasos de pruebas de navegador
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: Blog
  text: Monitoreo de la experiencia del usuario con pruebas de navegador sintéticas
- link: /synthetics/browser_tests/test_steps/
  tag: Documentación
  text: Más información sobre los pasos de pruebas de navegador
title: Opciones avanzadas para los pasos de pruebas de navegador
---
## Descripción general {#overview}

Esta página describe las opciones avanzadas para las pruebas de navegador de Synthetic Monitoring. 

## Localizar un elemento {#locate-an-element}

### Algoritmo de Datadog {#datadog-algorithm}

La inestabilidad es un punto crítico en las pruebas de extremo a extremo porque las pruebas fallan ocasionalmente cuando un equipo de frontend implementa cambios, lo que provoca que un identificador en su prueba genere una alerta en lugar de un problema real de la aplicación.

Para evitar pruebas inestables, Datadog utiliza un algoritmo que aprovecha un conjunto de localizadores para apuntar a elementos en las pruebas de navegador. Un pequeño cambio en la interfaz de usuario puede modificar un elemento (por ejemplo, moverlo a otra ubicación). La prueba de navegador localiza automáticamente el elemento de nuevo basándose en puntos de referencia que no se vieron afectados por el cambio. 

Cuando la prueba se ejecuta correctamente, la prueba de navegador vuelve a calcular (o "se autorrepara") cualquier localizador roto con valores actualizados, lo que garantiza que sus pruebas no se interrumpan por cambios menores en la interfaz de usuario y se adapten automáticamente a la interfaz de su aplicación. 

Para asegurarse de que su prueba de navegador no valide un cambio inesperado, utilice [aserciones][5] al crear la prueba. Las aserciones le permiten definir qué comportamientos se esperan y cuáles no durante el recorrido de los pasos de la prueba. 

### Localizador especificado por el usuario {#user-specified-locator}

De forma predeterminada, las pruebas de navegador utilizan el sistema de localizadores de Datadog. Cuando una prueba busca un elemento específico con el cual interactuar (por ejemplo, un botón de pago), en lugar de buscar un elemento con un XPath específico o un selector CSS específico, la prueba utiliza varios puntos de referencia diferentes para localizar el elemento (por ejemplo, XPath, texto, clases y elementos cercanos). 

Estos puntos de referencia se convierten en un conjunto de localizadores, cada uno de los cuales define de forma única el elemento. Solo debe utilizar selectores personalizados en casos excepcionales, ya que el sistema de localizadores de Datadog permite que las pruebas se mantengan por sí mismas.

Los selectores personalizados se crean al realizar un paso en la grabadora (como **click**, **hover** o **assert**) sobre cualquier elemento de su página. Esto especifica el tipo de paso que debe realizarse.

Para usar un identificador específico (por ejemplo, para hacer clic en el elemento `nth` en un menú desplegable independientemente de cuál sea el contenido del elemento):

1. Grabe o agregue manualmente un [paso][1] a su grabación.
2. Haga clic en el paso grabado y haga clic en {{< ui >}}Advanced options{{< /ui >}}.
3. Ingrese un selector XPath 1.0 o una clase/ID de CSS en {{< ui >}}User Specified Locator{{< /ui >}}, por ejemplo: `div`, `h1` o `.hero-body`, para el elemento HTML.
4. Opcionalmente, use la sintaxis de handlebars (`{{`) para insertar contenido dinámico. Se muestra una lista desplegable precargada de variables:

{{< img src="synthetics/browser_tests/advanced_options/advanced_user_locator_2.png" alt="Campo de localizador especificado por el usuario que resalta la sintaxis de handlebars con variables" style="width:70%">}}

5. Una vez que haya definido un elemento, haga clic en {{< ui >}}Highlight{{< /ui >}} para resaltar el elemento en la grabación a la derecha.

De forma predeterminada, la casilla de verificación {{< ui >}}If user specified locator fails, fail test{{< /ui >}} está seleccionada. Esto significa que, si el localizador definido falla, la prueba se considera fallida.

{{< img src="synthetics/browser_tests/advanced_options/css_2.mp4" alt="Probar elemento resaltado" video=true >}}

Puede decidir recurrir al algoritmo de prueba de navegador regular desmarcando la casilla {{< ui >}}If user specified locator fails, fail test{{< /ui >}}.

{{< img src="synthetics/browser_tests/advanced_options/fail_test.png" alt="Opción para marcar la prueba como fallida" style="width:70%">}}


## Tiempo de espera {#timeout}

Si una prueba de navegador no puede localizar un elemento, vuelve a intentar el paso durante 60 segundos.

Puede decidir disminuir o aumentar este tiempo de espera hasta 300 segundos si desea que su prueba espere menos o más tiempo para poder encontrar el elemento objetivo del paso.

{{< img src="synthetics/browser_tests/advanced_options/time_before_fail.png" alt="Tiempo antes de fallar" style="width:50%">}}

## Paso opcional {#optional-step}

Para hacer que un paso sea opcional, como un paso que cierra una ventana emergente, seleccione {{< ui >}}If this step fails, continue to next step{{< /ui >}}. Si el paso falla después de su tiempo de espera (60 segundos de forma predeterminada), la prueba ejecuta el siguiente paso.

Esta opción también muestra {{< ui >}}If this step fails, mark test as failed{{< /ui >}}, que está seleccionada de forma predeterminada. Con esta opción seleccionada, la prueba sigue fallando después de que se ejecutan los pasos restantes. Para que la prueba siga considerándose satisfactoria cuando falle el paso opcional, desmarque esta opción.

{{< img src="synthetics/browser_tests/advanced_options/optional_step_2.png" alt="Opciones avanzadas del paso con la opción de continuar al siguiente paso seleccionada y la opción de marcar la prueba como fallida desmarcada." style="width:50%">}}

## Salir al tener éxito {#exit-on-success}

Configure esta opción para salir de la prueba después de completar un paso con éxito. Esto evita ejecutar pasos innecesarios y evita marcar la prueba como un fallo.

{{< img src="synthetics/browser_tests/advanced_options/exit_on_success_browser.png" alt="Salir al tener éxito" style="width:50%">}}

## Ejecutar siempre este paso {#always-run-this-step}

Configure esta opción para ejecutar este paso incluso si los pasos anteriores han fallado. Esto puede ser útil para tareas de limpieza cuando desea que los pasos posteriores continúen.

{{< img src="synthetics/browser_tests/advanced_options/always_run_step.png" alt="Ejecutar siempre el paso incluso si los pasos anteriores han fallado" style="width:50%">}}


## Evitar la captura de pantalla {#prevent-screenshot-capture}

Puede evitar que se tome una captura de pantalla de un paso durante la ejecución de la prueba. Esto es útil para garantizar que no aparezcan datos confidenciales en los resultados de sus pruebas. Úselo con precaución, ya que puede dificultar el diagnóstico de fallas. Para obtener más información, consulte [Seguridad de los datos de Synthetic Monitoring (Data Security)][2].

{{< img src="synthetics/browser_tests/advanced_options/screenshot_capture_option.png" alt="Opción de captura de pantalla" style="width:50%">}}

**Nota:** Esta función también está disponible a nivel global de la prueba como una [opción avanzada][3] en la configuración de su prueba de navegador.

## Subpruebas {#subtests}

Las opciones avanzadas para [subpruebas][4] le permiten elegir dónde desea que se reproduzca su subprueba y configurar el comportamiento de su prueba de navegador si la subprueba falla.

{{< img src="synthetics/browser_tests/advanced_options/subtest_advanced_2.png" alt="Opciones avanzadas para subpruebas en pruebas de navegador" style="width:60%">}}

### Configurar la ventana de la subprueba {#set-the-subtest-window}

* {{< ui >}}Main (default){{< /ui >}}: La subprueba se reproduce en su ventana principal, en secuencia con otros pasos.
* {{< ui >}}New{{< /ui >}}: La subprueba se reproduce en una ventana nueva, la cual se cierra al finalizar la subprueba. Esto significa que la ventana no puede reutilizarse.
* {{< ui >}}Specific window{{< /ui >}}: La subprueba se reproduce en una ventana numerada, la cual puede ser reutilizada por otras subpruebas.

Abrir su subprueba en la ventana principal significa que su subprueba es la continuación de su prueba principal, ya que utiliza la URL del paso anterior. Abrir la subprueba en una ventana nueva o en una ventana específica significa que la prueba comienza a ejecutarse desde la URL de inicio de la subprueba.

### Configurar el comportamiento ante fallos {#set-failure-behavior}

Seleccione {{< ui >}}If this step fails, continue to next step{{< /ui >}} para que la prueba principal continúe si la subprueba falla. {{< ui >}}If this step fails, mark test as failed{{< /ui >}} está seleccionado de forma predeterminada. Con esta opción seleccionada, la prueba principal falla después de que se ejecuten sus pasos restantes. Para que la prueba principal siga aprobándose cuando falle la subprueba, desmarque esta opción.

### Configurar el comportamiento ante el éxito {#set-success-behavior}

Haga clic en {{< ui >}}If this step succeeds, stop this test and mark it as passed{{< /ui >}} para asegurarse de que su prueba de navegador se detenga inmediatamente y se marque como aprobada.

### Configurar el comportamiento de ejecución {#set-execution-behavior}

Haga clic en {{< ui >}}Always run this step{{< /ui >}} para asegurarse de que este paso se ejecute incluso si los pasos anteriores en la prueba de navegador han fallado.

### Anular variables en subpruebas {#override-variables-in-subtests}

Para anular el valor de una variable en una subprueba de una prueba de navegador, asigne un nombre a la variable en la subprueba y use el mismo nombre de variable en la prueba principal; así, la prueba de navegador anulará el valor de la subprueba.

Para obtener más información, consulte [Pasos de la prueba de navegador][4].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/browser_tests/test_steps/
[2]: /es/data_security/synthetics/
[3]: /es/synthetics/browser_tests/?tab=privacy#test-configuration
[4]: /es/synthetics/browser_tests/test_steps/#subtests
[5]: /es/synthetics/browser_tests/test_steps/#assertion
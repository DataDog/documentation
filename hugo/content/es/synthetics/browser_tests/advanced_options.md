---
aliases:
- /es/synthetics/guide/browser-tests-switch-tabs/
- /es/synthetics/guide/browser-test-self-maintenance/
description: Configurar opciones avanzadas para los pasos de tests de navegador
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: Blog
  text: Monitorización de la experiencia de los usuarios con tests de navegador Synthetic
- link: /synthetics/browser_tests/actions/
  tag: Documentación
  text: Más información sobre los pasos de tests de navegador
title: Opciones avanzadas para los pasos de tests de navegador
---

## Información general

Esta página describe opciones avanzadas para tests de navegador Synthetic


## Localizar un elemento

### Algoritmo de Datadog

La inestabilidad es un punto sensible en los tests de extremo a extremo, ya que los tests a menudo fallan cuando un equipo frontend implementa cambios, lo que hace que un identificador de tu test genere una alerta, en lugar de que la genere un problema real de una aplicación.

Para evitar pruebas defectuosas, Datadog utiliza un algoritmo que aprovecha un conjunto de localizadores que se dirigen a ciertos elementos de los tests de navegador. Un pequeño cambio en la interfaz de usuario puede modificar un elemento (por ejemplo, desplazándolo a otra localización). El test de navegador vuelve a localizar automáticamente el elemento basándose en puntos de referencia que no se han visto afectados por el cambio. 

Cuando el test se ejecuta correctamente, el test del navegador vuelve a calcular (o "autocura") cualquier localizador por medio de valores actualizados, lo que asegura que tus tests no se rompan tras simples actualizaciones de la interfaz de usuario y que se adapten automáticamente a la interfaz de usuario de tu aplicación. 

Para asegurarte de que tu test del navegador no valide un cambio inesperado, utiliza [aserciones][5] en la creación de tu test. Las aserciones te permiten definir qué es y qué no es un comportamiento esperado asociado al recorrido del paso del test. 

### Localizador especificado por el usuario

Por defecto, los tests de navegador utilizan el sistema del localizador de Datadog. Cuando un test busca un elemento específico con el que interactuar (por ejemplo, un botón de pago), en lugar de buscar un elemento con un XPath específico o un selector CSS específico, el test utiliza varios puntos de referencia diferentes para localizar el elemento (por ejemplo, XPath, texto, clases y elementos cercanos). 

Estos puntos de referencia se convierten en un conjunto de localizadores, cada uno de los cuales define de forma única el elemento. Sólo debes utilizar selectores personalizados en casos extremos, ya que el sistema de localizadores de Datadog permite que los tests sean de mantenimiento automático.

Los selectores personalizados se crean realizando un paso de interés en el grabador (como un **clic**, **posición del cursor** o **aserción**) en cualquier elemento de tu página. Esto especifica el tipo de paso que se debe realizar.

Para utilizar un identificador específico (por ejemplo, para hacer clic en el elemento `nth` en un menú desplegable, independientemente del contenido del elemento):

1. Graba o añade manualmente un [paso][1] a tu grabación.
2. Haz clic en el paso grabado y luego en **Opciones avanzadas**.
3. Introduce un selector XPath 1.0 o una clase/un ID CSS en **Localizador especificado por el usuario**, por ejemplo: `div`, `h1` o `.hero-body`, para el elemento HTML.
4. También puedes utilizar la sintaxis handlebars (`{{`) para insertar contenido dinámico. Se muestra una lista de variables desplegable:

{{< img src="synthetics/browser_tests/advanced_options/advanced_user_locator_2.png" alt="Campo Localizador especificado por el cliente, donde se resalta la sintaxis handlebars con variables" style="width:70%">}}

5. Una vez que hayas definido un elemento, haz clic en **Highlight** (Resaltar) para resaltar el elemento en la grabación de la derecha.

De forma predeterminada, la casilla **Si falla el localizador especificado por el usuario, falla el test** aparece seleccionada. Esto significa que si el localizador definido falla, el test se considera fallido.

{{< img src="synthetics/browser_tests/advanced_options/css_2.mp4" alt="Probar el elemento resaltado" video=true >}}

Puedes decidir utilizar el algoritmo de test de navegador estándar desmarcando la casilla la casilla **Si falla el localizador especificado por el usuario, falla el test**.

{{< img src="synthetics/browser_tests/advanced_options/fail_test.png" alt="Opción de test fallido" style="width:70%">}}


## Tiempo de espera

Si un test de navegador no puede localizar un elemento, vuelve a intentar el paso durante 60 segundos.

Puedes decidir disminuir o aumentar este tiempo de espera hasta 300 segundos si quieres que el test espere menos o más tiempo para poder encontrar el elemento buscado en el paso.

{{< img src="synthetics/browser_tests/advanced_options/time_before_fail.png" alt="Tiempo antes del fallo" style="width:50%">}}

## Paso opcional

En algunos casos, como en el de una ventana emergente, es posible que quieras que algunos pasos sean opcionales. Para configurar esta opción, selecciona **Permitir que este paso falle**. Si el paso falla después de la cantidad de minutos especificados en la opción de tiempo de espera (60 segundos por defecto), el test continúa y ejecuta el paso siguiente.

{{< img src="synthetics/browser_tests/advanced_options/timeout.png" alt="Tiempo de espera" style="width:25%">}}

## Salir, no hubo errores

Configura esta opción para salir del test después de finalizar con éxito un paso. De este modo se evita la ejecución de pasos innecesarios y se evita marcar el test como fallido.

{{< img src="synthetics/browser_tests/advanced_options/exit_on_success_browser.png" alt="Salir, no hubo errores" style="width:50%">}}

## Ejecutar siempre este paso

Configura esta opción para ejecutar este paso incluso si los pasos anteriores han fallado. Esto puede ser útil para tareas de limpieza, cuando quieres que continúen los pasos posteriores.

{{< img src="synthetics/browser_tests/advanced_options/always_run_step.png" alt="Ejecutar siempre este paso, incluso si los pasos anteriores han fallado" style="width:50%">}}


## Impedir las capturas de pantalla

Puedes evitar la captura de pantalla de un paso durante la ejecución de un test. Esta opción es útil para garantizar que no se muestren datos confidenciales en los resultados del test, pero debes utilizarla con prudencia ya que puede dificultar la resolución de problemas. Para obtener más información, consulta [Seguridad en la monitorización de datos Synthetic][2].

{{< img src="synthetics/browser_tests/advanced_options/screenshot_capture_option.png" alt="Opción de captura de pantalla" style="width:50%">}}

**Nota:** Esta función también está disponible a escala global del test como una [opción avanzada][3] de la configuración de tu test de navegador.

## Subtests

Las opciones avanzadas para [subtests][4] te permiten elegir dónde quieres que se reproduzca tu subtest y configurar el comportamiento de tu test de navegador si falla el subtest.

{{< img src="synthetics/browser_tests/advanced_options/subtest_advanced.png" alt="Opciones avanzadas para subtests en tests de navegador" style="width:60%">}}

### Configuración de la ventana del subtest

* **Principal (por defecto)**: El subtest se reproduce en tu ventana principal, en secuencia con otros pasos.
* **Nueva**: El subtest se reproduce en una nueva ventana, que se cierra al final del subtest. Esto significa que la ventana no se puede reutilizar.
* **Ventana específica**: El subtest se reproduce en una ventana numerada, que pueden reutilizar otros subtests.

Si se abre el subtest en la ventana principal, este será la continuación de tu test principal, ya que utiliza la URL del paso anterior. Si se abre el subtest en una nueva ventana o en una ventana específica, el test empezará a ejecutarse desde la URL de inicio del subtest.

### Definir el comportamiento del fallo

Haz clic en **Continuar con el test si falla este paso** y en **Considerar todo el test como fallido si falla este paso** para asegurarte de que tu test de navegador continuará si falla el subtest o de que fallará por completo si falla el subtest.

### Anulación de variables en subtests

Para anular el valor de una variable en un subtest del test del navegador, asigna un nombre a la variable del subtest y utiliza el mismo nombre de variable en el test principal. Esto hará que el test del navegador anule el valor del subtest.

Para obtener más información, consulta [Pasos de tests de navegador][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/browser_tests/actions/
[2]: /es/data_security/synthetics/
[3]: /es/synthetics/browser_tests/?tab=privacy#test-configuration
[4]: /es/synthetics/browser_tests/actions/#subtests
[5]: /es/synthetics/browser_tests/actions/#assertion
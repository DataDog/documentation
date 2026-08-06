---
aliases:
- /es/mobile_testing/mobile_app_tests/steps
- /es/mobile_app_testing/mobile_app_tests/steps
description: Aprende a grabar automáticamente y configurar manualmente los pasos en
  una grabación de test móvil.
further_reading:
- link: /synthetics/mobile_app_testing/mobile_app_tests/
  tag: Documentación
  text: Más información sobre los tests móviles Synthetic
- link: /synthetics/mobile_app_testing/mobile_app_tests/advanced_options
  tag: Documentación
  text: Más información sobre las opciones avanzadas de los tests móviles
title: Pasos de tests de aplicaciones móviles
---

## Información general

Los pasos representan las interacciones o aserciones grabadas individualmente que quieres ejecutar en tu test. Para definir un paso, haz clic en **Start Recording** (Iniciar grabación) e interactúa con el dispositivo como lo harías normalmente o crea un paso manualmente haciendo clic en **Assertions** (Aserciones) o **Special Actions** (Acciones especiales). 

## Iniciar un dispositivo

Para empezar a grabar y añadir pasos, selecciona un dispositivo para iniciar un test de aplicación móvil en el menú desplegable y haz clic en **Launch Device** (Iniciar dispositivo).

{{< img src="mobile_app_testing/launch_device.png" alt="Seleccionar un dispositivo para realizar un test móvil en él" style="width:60%" >}}

Selecciona **Mostrar sólo los dispositivos disponibles. Los dispositivos disponibles se cargan más rápido** para ver los dispositivos con mayor disponibilidad y reducir el tiempo de espera de los tests.

### Notificaciones

Haz clic en el botón verde **Device Connection Notification** (Notificación de conexión de dispositivos) en el modal **Iniciar un dispositivo para empezar la grabación** para habilitar notificaciones para cuando tu dispositivo esté listo y cuando esté a punto de pasar a un tiempo de espera por inactividad.

## Pasos grabados automáticamente

Una vez que hagas clic en **Start Recording** (Iniciar grabación), Datadog grabará automáticamente todas las interacciones que tengas con tu dispositivo y las mostrará en la lista de pasos de la izquierda.

Para detener la grabación, haz clic en **Stop Recording** (Detener grabación).

## Pasos añadidos manualmente

Además de crear pasos automáticamente interactuando directamente con tu dispositivo, puedes crear pasos manualmente (utilizando [aserciones](#assertion) y [acciones especiales](#special-actions)). También puedes actualizar pasos haciendo clic en un paso previamente grabado o [reordenar pasos](#manage-step-order) arrastrándolos hacia arriba y hacia abajo en la lista de pasos.

### Aserción

Las aserciones te permiten validar el contenido mostrado (o no mostrado) en una sección concreta de tu flujo (flow) de tests.


{{< img src="mobile_app_testing/assertions.png" alt="Opciones de aserciones en un test móvil" style="width:60%;" >}}


Para crear un paso, selecciona un tipo de aserción:

{{< tabs >}}
{{% tab "Realizar test de un elemento en la pantalla activa" %}}

#### Comprobar el contenido de un elemento

Crea este paso de aserción para que tu test de aplicación móvil seleccione un elemento de la página y compruebe si contiene un valor específico. 

{{% /tab %}}
{{% tab "Realizar test del contenido de la pantalla activa" %}}

#### Probar la presencia de un texto concreto en la pantalla activa

Crea este paso de aserción para que el test de tu aplicación móvil confirme que el texto especificado en el campo `Value` está presente en la página actual que se está grabando.

#### Probar la ausencia de un texto concreto en la pantalla activa

Crea este paso de aserción para que el test de tu aplicación móvil confirme que el texto especificado en el campo `Value` **no** está presente en la página actual que se está grabando.

{{% /tab %}}
{{< /tabs >}}

### Acciones especiales

Además de grabar automáticamente los pasos basados en las interacciones de tu dispositivo, también puedes crear pasos manualmente haciendo clic en **Special Actions** (Acciones especiales).

{{< img src="mobile_app_testing/test_steps/special_actions_2.png" alt="Choose an action type to add an assertion step" style="width:60%;" >}}

#### Doble toque

Al interactuar con los elementos mediante un toque doble en tu aplicación móvil se graba un paso.

{{< img src="mobile_app_testing/double_tap.mp4" alt="Grabación de un paso de toque doble en un test móvil" video=true >}}

#### Extraer variable del elemento

Esta acción permite extraer el valor de un elemento y guardarlo como variable.

{{< img src="mobile_app_testing/test_steps/extract_variable_from_element.mp4" alt="Grabación de la manera de extraer una variable de un elemento en un test móvil" style="width:60%" video=true >}}

#### Abrir enlace profundo

Añade un nombre al paso e introduce un URI de enlace profundo.

{{< img src="mobile_app_testing/open_deep_link.png" alt="Grabación de un paso de enlace profundo abierto en un test móvil" style="width:60%" >}}

#### Reiniciar la aplicación

Esta acción te permite reiniciar tu aplicación.
Esta acción no reinstala la aplicación, sino que la cierra y la vuelve a iniciar. 

{{< img src="mobile_app_testing/test_steps/restart_application.mp4" alt="Grabación de la manera de reiniciar tu aplicación" style="width:60%" video=true >}}

#### Rotación del dispositivo

Añade un nombre al paso y selecciona el modo **Retrato** o **Paisaje**.

{{< img src="mobile_app_testing/rotate_device.png" alt="Grabación de un paso de rotación de dispositivo en un test móvil" style="width:60%" >}}

#### Desplazamiento

Los tests de aplicaciones móviles se desplazan automáticamente a los elementos con los que es necesario interactuar. En la mayoría de los casos, no es necesario añadir un paso de desplazamiento manualmente. Utiliza el paso de desplazamiento cuando necesites activar una interacción adicional, como un desplazamiento infinito.

Especifica el número de píxeles que quieres que el test de la aplicación móvil se desplace vertical y horizontalmente.

{{< img src="mobile_app_testing/scroll_step.png" alt="Paso de desplazamiento en la grabación de un test móvil" style="width:60%;" >}}

Por defecto, el paso **Desplazamiento** efectúa desplazamientos de toda la página. Si necesitas desplazarte por un elemento concreto (por ejemplo, un `<div>` específico), haz clic en **Starting Element** (Elemento inicial) y selecciona un elemento por el que quieres que se desplace el test de la aplicación móvil.

#### Desplazarse hasta el elemento

Esta acción te permite desplazarte a un elemento específico horizontal o verticalmente.

{{< img src="mobile_app_testing/test_steps/scroll_to_element_2.mp4" alt="Grabación el desplazamiento hasta un elemento en un test móvil" style="width:60%" video=true >}}

#### Toque

Al interactuar con los elementos mediante un toque en tu aplicación móvil se graba un paso.

{{< img src="mobile_app_testing/tap.mp4" alt="Grabación de un paso de toque en un test móvil" video=true >}}

#### Activar Wi-Fi

Esta acción le permite activar o desactivar Wi-Fi dentro de su prueba para Monitor cómo funciona su aplicación con o sin acceso a Internet.

{{< img src="mobile_app_testing/test_steps/toggle_wifi.png" alt="Screenshot of the Toggle Wi-Fi special actions step" style="width:60%" >}}

#### Escribir texto

Al interactuar con un campo de introducción de texto en tu aplicación móvil, añadir un nombre y configurar un valor se graba un paso.

{{< img src="mobile_app_testing/type_text.mp4" alt="Grabación de un paso de introducción de texto en un test móvil" video=true >}}

Para ver todas las variables disponibles en los pasos añadidos manualmente, escribe `{{` en el campo de entrada.

{{< img src="mobile_app_testing/injecting_variable.png" alt="Paso de introducción de texto para el uso de variables en un test móvil" style="width:25%" >}}

Para utilizar una variable en pasos grabados automáticamente, añade un nombre de paso y especifica el valor de la variable para introducirlo durante la grabación. 

#### Esperar

Si sabes que una página o un elemento de página tarda más de 60 segundos en cargarse, puedes añadir un paso de espera con un valor máximo de 300 segundos.

{{< img src="mobile_app_testing/wait_step.png" alt="Grabación de un paso de espera en un test móvil" style="width:60%;" >}}

Por defecto, los tests de aplicaciones móviles esperan a que una página esté completamente cargada antes de realizar un paso o el paso siguiente con un tiempo de espera de 60 segundos. Este tiempo adicional se añade sistemáticamente a **cada ejecución** de la grabación de tu test de aplicación móvil.

#### Volver atrás

Al interactuar con el botón **Atrás** debajo de la aplicación móvil se graba un paso.

{{< img src="mobile_app_testing/press_back.mp4" alt="Grabación de un paso volver atrás en un test móvil" video=true >}}

</br>

Para obtener más información sobre configuraciones adicionales en pasos de tests, consulta [Opciones avanzadas para pasos de test de aplicaciones móviles][4].

### Subtests

Puedes ejecutar tests de aplicaciones móviles dentro de otros tests de aplicaciones móviles para reutilizar los flujos de trabajo existentes hasta dos niveles de anidamiento.

Para utilizar un test de aplicación móvil existente como subtest, haz clic en **Subtest**, selecciona un test de aplicación móvil en el menú desplegable y haz clic en **Add Subtest** (Agregar subtest).

{{< img src="mobile_app_testing/example_subtest.png" alt="Seleccionar un test móvil para agregar como subtest" style="width:60%" >}}

Para anular las variables de los subtests en los tests padre, asegúrate de que las variables creadas en el nivel del test padre tienen los mismos nombres que las variables presentes en el subtest. Una variable siempre utiliza el valor que se le asignó en primer lugar.

Para más información sobre opciones avanzadas para subtests, consulta [Opciones avanzadas para pasos de test de navegador][5].

Si para ti no tiene sentido ejecutar un subtest de forma independiente, puedes detenerlo. El test continúa siendo invocado como parte de tu test principal y no se ejecuta individualmente. Para obtener más información consulta [Reutilización de los recorridos de tests de navegador en tu conjunto de tests][6].

### Variables
Si tu subtest contiene variables, éstas serán heredadas por el test en el que las importes. 
Para anular estas variables, crea una variable en el test principal con el mismo nombre que las variables del subtest. 

## Gestiona el orden de los pasos

En lugar de reordenar manualmente los nuevos pasos arrastrando y soltando pasos individuales, puedes colocar el cursor en un paso de test en una fase concreta de la grabación e insertar pasos adicionales.

1. Pasa el cursor por encima de un paso de test grabado y haz clic en el icono **Set Cursor** (Situar el cursor). Aparecerá una línea azul sobre el paso de test.
2. Graba [pasos de test] (#automatically-recorded-steps) adicionales, o añade [pasos manualmente] (#manually-added-steps).
3. Cuando hayas terminado de añadir pasos adicionales sobre tus pasos de test, haz clic en **Clear Cursor** (Borrar el cursor) para salir.

{{< img src="mobile_app_testing/recording_cursor_step.mp4" alt="Configurar el cursor en un paso de test para añadir pasos adicionales antes de este paso" video=true >}}

## Editar una grabación 

Para editar una grabación móvil una vez guardada:

- Ve a [Synthetics > Tests.][7]
- Haz clic en un test móvil previamente guardado.
- Haz clic en el icono de engranaje de la esquina superior derecha y, a continuación, en "Edit recording" (Editar grabación).
- Selecciona uno o varios pasos para eliminarlos o reproducirlos y, a continuación, haz clic en **Save & Quit** (Guardar y salir).
- Selecciona uno o varios pasos para eliminarlos o reproducirlos y, a continuación, haz clic en **Save & Quit** (Guardar y salir).

{{< img src="mobile_app_testing/test_steps/edit-mobile-recording.png" alt="Edición de una grabación móvil y uso de la función de selección múltiple" width="70%" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/mobile_app_testing/mobile_app_tests/#variables
[2]: /es/synthetics/settings/#global-variables
[3]: /es/synthetics/guide/browser-tests-totp/
[4]: /es/mobile_app_testing/mobile_app_tests/advanced_options
[5]: /es/mobile_app_testing/mobile_app_tests/advanced_options#subtests
[6]: /es/synthetics/guide/reusing-browser-test-journeys/
[7]: https://app.datadoghq.com/synthetics/tests
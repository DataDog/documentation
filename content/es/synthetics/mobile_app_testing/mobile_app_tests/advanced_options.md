---
aliases:
- /es/mobile_testing/mobile_app_tests/advanced_options
- /es/mobile_app_testing/mobile_app_tests/advanced_options
description: Configurar opciones avanzadas para los pasos de tests de aplicaciones
  móviles
further_reading:
- link: https://www.datadoghq.com/blog/test-maintenance-best-practices/
  tag: Blog
  text: Prácticas recomendadas para el mantenimiento de tests de extremo a extremo
- link: /synthetics/mobile_app_testing/mobile_app_tests/
  tag: Documentación
  text: Aprender a crear tests de aplicaciones móviles
- link: /synthetics/mobile_app_testing/mobile_app_tests/steps/
  tag: Documentación
  text: Aprender a crear pasos en tests de aplicaciones móviles
- link: /data_security/synthetics/
  tag: Documentación
  text: Más información sobre la seguridad de los datos durante la monitorización
    Synthetic
title: Opciones avanzadas para los pasos de tests de aplicaciones móviles
---

## Información general

En esta página se describen las opciones avanzadas para los tests de aplicaciones móviles Synthetic.

## Localizar un elemento

### Algoritmo de Datadog

Para asegurarte de que el test de tu aplicación móvil no acepte un cambio inesperado en la interfaz de usuario de tu aplicación móvil, utiliza [aserciones][1] en la creación de tu test. Las aserciones te permiten definir qué es y qué no es un comportamiento esperado en el recorrido de los pasos de tests.

### Localizador especificado por el usuario

Por defecto, los tests de aplicaciones móviles utilizan el sistema de localización Datadog. Cuando un test busca un elemento específico con el que interactuar (por ejemplo, un botón de pago), en lugar de buscar un elemento con un XPath específico o un selector CSS específico, el test utiliza varios puntos de referencia diferentes para localizar el elemento (por ejemplo, XPath, texto, clases y elementos cercanos).

Estos puntos de referencia se convierten en un conjunto de localizadores, cada uno de los cuales define de forma única el elemento. Sólo debes utilizar selectores personalizados en casos extremos, ya que el sistema de localizadores de Datadog permite que los tests se automantengan.

Los selectores personalizados se crean realizando un [paso en el grabador][1] (como un **toque**, **doble toque** o **abrir enlace profundo**) en cualquier elemento de tu página. Esto especifica el tipo de paso que debe realizarse.

Opcionalmente, en opciones avanzadas, utiliza la sintaxis handlebars (`{{`) para insertar contenido dinámico. Se muestra una lista desplegable de variables:

{{< img src="mobile_app_testing/mobile_app_advanced_user_locator_2.png" alt="Campo de localización especificado por el usuario donde se resalta la sintaxis handlebars con variables" style="width:70%">}}

## Tiempo de espera

Si un test de aplicación móvil no puede localizar un elemento, vuelve a intentar el paso durante 60 segundos por defecto.

Puedes personalizar este tiempo de espera hasta 60 segundos, si quieres que tu test espere menos tiempo para poder encontrar el elemento buscado en el paso.

{{< img src="mobile_app_testing/timeout.png" alt="Esperar 30 segundos antes de declarar el paso como fallido" style="width:50%" >}}

## Paso opcional

En algunos casos, como en el evento de una ventana emergente, es posible que quieras realizar algunos pasos opcionales. Para configurar esta opción, selecciona **Continue with test if this step fails** (Continuar con el test si este paso falla). Si el paso falla después de la cantidad de minutos especificados en la opción de tiempo de espera, entonces el test de la aplicación móvil continúa y ejecuta el siguiente paso.

{{< img src="mobile_app_testing/failure_behavior.png" alt="Elegir si el test debe fallar o continuar, si el paso del test falla" style="width:50%" >}}

Si lo prefieres, haz clic en **Consider entire test as failed if this step fails** (Considerar todo el test como fallido si este paso falla), para asegurarte de que se completan los pasos importantes.

## Impedir las capturas de pantalla

Puedes evitar que se realice una captura de pantalla de un paso durante la ejecución de un test haciendo clic en **Do not capture screenshot for this step** (No realizar la captura de pantalla de este paso).

{{< img src="mobile_app_testing/no_screenshots.png" alt="No realizar la captura de pantalla de este paso" style="width:50%" >}}

Esta opción es útil para garantizar que no aparezcan datos confidenciales en los resultados de los tests. Utilízala con cuidado, ya que puede dificultar la resolución de problemas. Para obtener más información, consulta [Seguridad de los datos durante la monitorización Security][2].

## Subtests

Las opciones avanzadas para [subtests][3] te permiten definir el comportamiento del test de tu aplicación móvil si el subtest falla.

{{< img src="mobile_app_testing/example_subtest.png" alt="Seleccionar un test de aplicación móvil para agregar como subtest" style="width:50%" >}}

### Definir el comportamiento del fallo

Haz clic en **Continue with test if this step fails** (Continuar con el test si este paso falla), para asegurarte de que el test de la aplicación móvil continúa si falla el subtest.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/mobile_app_testing/mobile_app_tests/steps/
[2]: /es/data_security/synthetics/
[3]: /es/mobile_testing/mobile_app_tests/steps/#subtests
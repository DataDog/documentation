---
further_reading:
- link: synthetics/browser_tests
  tag: Documentación
  text: Configurar un test de navegador
- link: /synthetics/browser_tests/actions
  tag: Documentación
  text: Crear pasos de tests de navegador
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Prácticas recomendadas para crear tests de extremo a extremo
title: Reutilizar recorridos de tests de navegador en el conjunto de tests
---

## Información general

Hay ocasiones en las que resulta útil reutilizar un recorrido en varios tests, como en estos casos:

* Si hay que iniciar sesión para usar la mayoría de las funcionalidades de la aplicación. En este caso, puedes [reutilizar los pasos de inicio de sesión](#create-and-reuse-a-login-subtest) al comienzo de cada test.
* Si tienes que monitorizar las funcionalidades de tu aplicación en distintos entornos. En tal caso, puedes crear tests para producción y reutilizarlos como subtests para desarrollo o staging.
* Si, al ejecutar los tests, se crean objetos de bases de datos. En este caso, puedes crear tests que limpien el entorno de pruebas y usarlos como subtests para hacer una limpieza sistemática al principio y al final de los tests.

Los subtests de navegador son un buen método para reutilizar recorridos en un conjunto de tests. De esta forma:
* **Ahorrarás tiempo al crear tests.** Si tienes un test de inicio de sesión, reutilízalo como subtest al comienzo de todo tu conjunto de tests para no tener que grabar los mismos pasos de inicio de sesión en cada uno de ellos.
* **Los tests serán más fáciles de entender**, porque harás bloques que tendrán sentido para quienes lean tus tests.
* **El mantenimiento será más sencillo**, ya que si los procesos varían, solo tendrás que cambiarlos una vez, no test a test.


## Crear y reutilizar un subtest de inicio de sesión

Si para monitorizar tu aplicación primero tienes que iniciar sesión, es recomendable crear un solo test que contenga todos los pasos necesarios para iniciar sesión y reutilizarlo a modo de subtest.

Para crear un test de inicio de sesión y emplearlo a modo de subtest dentro de un conjunto, haz lo siguiente:

1. Crea un test A que se limite a iniciar sesión en la aplicación y, en el parámetro **Starting URL** (URL de inicio) de dicho test, introduce la URL previa al inicio de sesión.

  {{< img src="synthetics/guide/reusing-browser-test-journeys/login_subtest_recording.mp4" alt="Grabación del subtest de inicio de sesión" video="true" width="100%">}}

2. Crea un test B para monitorizar el funcionamiento posterior al inicio de sesión en la aplicación. En el siguiente ejemplo, este test B monitoriza la creación de un dashboard. En el parámetro **Starting URL** (URL de inicio) del test B, introduce también la URL previa al inicio de sesión.

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_configuration.png" alt="Configuración del test principal" >}}

3. Cuando grabes el test B, haz clic en **Subtest** y selecciona el test A de inicio de sesión. 

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_subtest.mp4" alt="Introducción del subtest en el test principal" video="true" width="100%">}}

  Cuando creas este paso de subtest, todo los pasos del test A se reproducen al principio del test B principal y, además, las variables del subtest A se importan en el test B principal. De forma predeterminada, el subtest se reproduce en la pestaña principal, por lo que los pasos incluidos en él se reproducen en la misma pestaña que los pasos previos y posteriores. El subtest empieza a ejecutarse con la URL configurada en el test principal (en este ejemplo, la URL previa al inicio de sesión) y, una vez ejecutados todos los pasos del subtest, el test de navegador ejecuta el primer paso del test principal que no pertenece al subtest en la página en la que se quedó en subtest. Hasta el momento, no se ha creado ningún paso principal.

**Nota:** En [**Subtest Advanced Options**][1] (Opciones avanzadas del subtest), puedes elegir en qué pestaña debe ejecutarse el subtest.

4. Antes de empezar a grabar los pasos del test principal, inicia sesión en tu cuenta con las credenciales pertinentes en la ventana de la herramienta de grabación. De esta forma, te asegurarás de que el test principal empiece en el estado en el que se encuentra el test de navegador tras finalizar los pasos del subtest.

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_iframe.mp4" alt="Reproducción del subtest en el test principal" video="true" width="100%">}}

5. Una vez iniciada la sesión, haz clic en **Start recording** (Iniciar grabación) para empezar a grabar los pasos posteriores al inicio de sesión del test principal. Cuando hayas acabado, haz clic en **Save** (Guardar).

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_recording.mp4" alt="Grabación del test principal" video="true" width="100%">}}

 En el anterior ejemplo, con el subtest de inicio de sesión nos aseguramos de que, después de iniciar sesión en la cuenta de prueba de Datadog, los usuarios puedan crear timeboards, que se asocian a dichos usuarios.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/browser_tests/advanced_options#subtests
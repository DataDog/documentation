---
further_reading:
- link: https://www.datadoghq.com/blog/create-browser-tests-from-datadog-rum-session-replay/
  tag: Blog
  text: Cree pruebas de navegador directamente desde Session Replay de Datadog RUM
- link: synthetics/browser_tests
  tag: Documentación
  text: Configure una prueba de navegador
- link: real_user_monitoring/application_monitoring/browser
  tag: Documentación
  text: Supervisión de navegador de RUM
title: Genere pruebas de navegador sintéticas a partir de Session Replay
---
## Descripción general {#overview}

[Real User Monitoring (RUM)][1] le brinda visibilidad de extremo a extremo sobre la actividad y la experiencia en tiempo real de los usuarios individuales. Las [pruebas de navegador sintéticas][2] le permiten observar cómo funcionan sus sistemas y aplicaciones mediante solicitudes y acciones simuladas de todo el mundo.

{{< img src="synthetics/guide/rum_to_synthetics/generate_test_modal.png" alt="Genere una prueba de navegador con su modal de Session Replay" style="width:70%" >}}

Puede crear pruebas de navegador sintéticas a partir de sus Session Replay en RUM para realizar un seguimiento del rendimiento basado en el comportamiento real del usuario.

## Genere una prueba a partir de un Session Replay {#generate-a-test-from-a-session-replay}

Navegue al [RUM Explorer][3] y seleccione una sesión con un [Session Replay][4] disponible a partir del cual desee crear una prueba de navegador. Haga clic en {{< ui >}}Generate Synthetic Browser Test{{< /ui >}} sobre la línea de tiempo de eventos. 

{{< img src="synthetics/guide/rum_to_synthetics/test_recording.png" alt="Una sesión de usuario en el RUM Explorer" style="width:100%" >}}

Esto clona automáticamente los eventos capturados dentro de un Session Replay, como clics de usuario y cargas de página, en pasos individuales para una nueva prueba de navegador. 

Por ejemplo, en la siguiente captura de pantalla, la prueba de navegador generada clonó la sesión de un usuario en la página de compras, incluyendo su navegación hacia ella y el clic en el botón {{< ui >}}Add to cart{{< /ui >}}. 

{{< img src="synthetics/guide/rum_to_synthetics/example_test.png" alt="Grabador de pruebas de navegador completado automáticamente con datos de RUM" style="width:100%" >}}

Personalice aún más sus pruebas y pasos de prueba para satisfacer sus necesidades, tal como lo haría para [cualquier otra prueba de navegador][6]. Por ejemplo, puede agregar [pasos de prueba][5] adicionales (como aserciones), ajustar la frecuencia de ejecución de su prueba y personalizar su notificación.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/
[2]: /es/synthetics/browser_tests
[3]: https://app.datadoghq.com/rum/sessions
[4]: /es/session_replay/
[5]: /es/synthetics/browser_tests/test_steps
[6]: /es/synthetics/browser_tests/?tab=requestoptions#test-configuration
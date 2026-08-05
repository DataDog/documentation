---
further_reading:
- link: https://www.datadoghq.com/blog/create-browser-tests-from-datadog-rum-session-replay/
  tag: Blog
  text: Crear tests de navegador directamente desde Datadog RUM Session Replay
- link: synthetics/browser_tests
  tag: Documentación
  text: Configurar un test de navegador
- link: real_user_monitoring/browser
  tag: Documentación
  text: Monitorización de RUM Browser
title: Generación de tests de navegador Sintético desde Session Replay
---

## Información general

[Real User Monitoring (RUM)][1] te ofrece visibilidad de extremo a extremo de la actividad y experiencia en tiempo real de usuarios individuales. Los [tests de navegador de Sintético][2] te permiten observar el rendimiento de tus sistemas y aplicaciones mediante solicitudes y acciones simuladas procedentes de todo el mundo.

{{< img src="synthetics/guide/rum_to_synthetics/generate_test_modal.png" alt="Generar un test de navegador con tu modal de Session Replay" style="width:70%" >}}

Puedes crear tests de navegador Sintético a partir de tus repeticiones de sesión en RUM para realizar un rastreo del rendimiento en función del comportamiento del usuario real.

## Generar un test a partir de una repetición de sesión

Ve al [Explorador de RUM][3] y selecciona una sesión con una [Repetición de sesión][4] disponible a partir de la cual desees crear un test de navegador. Haz clic en **Generar test de navegador Sintético** encima de la línea de tiempo de eventos. 

{{< img src="synthetics/guide/rum_to_synthetics/test_recording.png" alt="Una sesión de usuario en el explorador de RUM" style="width:100%" >}}

Esto clona automáticamente los eventos capturados en una repetición de sesión, como los clics del usuario y las cargas de páginas, en pasos individuales para un nuevo test de navegador. 

Por ejemplo, en la siguiente captura de pantalla, el test de navegador generado clonó la sesión de un usuario en la página de compras, incluidos ir a ella y hacer clic en el botón **Add to cart** (Añadir al carrito). 

{{< img src="synthetics/guide/rum_to_synthetics/example_test.png" alt="El grabador de tests de navegador se rellenó automáticamente con datos de RUM" style="width:100%" >}}

Personaliza aún más tus tests y pasos de tests para adaptarlos a tus necesidades, igual que harías con [cualquier otro test de navegador][6]. Por ejemplo, puedes añadir [pasos de tests][5] adicionales (como aserciones), ajustar la frecuencia de ejecución de tus tests y personalizar su notificación.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/
[2]: /es/synthetics/browser_tests
[3]: https://app.datadoghq.com/rum/sessions
[4]: /es/real_user_monitoring/session_replay/browser/
[5]: /es/synthetics/browser_tests/actions
[6]: /es/synthetics/browser_tests/?tab=requestoptions#test-configuration
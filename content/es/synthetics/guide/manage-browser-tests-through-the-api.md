---
further_reading:
- link: /synthetics/browser_tests
  tag: Documentación
  text: Más información sobre las pruebas de navegador
- link: /api/latest/synthetics
  tag: API
  text: API de Synthetics
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Terraform
  text: Crear y gestionar tests de navegador Synthetic con Terraform
title: Gestiona tus pruebas de navegador de manera programada
---

## Información general

Monitorizar tu aplicación de extremo a extremo es crucial para conocer bien la experiencia de tus usuarios. La [grabadora de pruebas de Datadog][1] te permite simplificar la configuración de estos procesos de trabajo de pruebas tan complejos. No obstante, quizá prefieras gestionar tus recursos Synthetics de manera programada y definir tus pruebas de navegador con la API.

## Gestionar tus pruebas de navegador con la API

Datadog recomienda crear primero tus pruebas de navegador en la interfaz de usuario de Datadog y recuperar las configuraciones de tus pruebas con la API.

1. [Crea una prueba de navegador][2] y [guarda una grabación][3].
2. Utiliza el punto de conexión [Obtener la lista de todas las pruebas][4] para recuperar una lista con todas las pruebas de Synthetics.
3. Filtra por `type: browser` y recupera los `public_ids` de las pruebas de navegador que quieras gestionar con la API.
4. Utiliza el punto de conexión [Obtener una prueba de navegador][5] para recuperar los archivos de configuración de cada prueba de navegador.

Puedes almacenar los archivos de configuración de las pruebas de navegador para usarlas más adelante. También te servirán para duplicar, actualizar y eliminar tus pruebas de navegador de manera programada.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: /es/getting_started/synthetics/browser_test#create-a-browser-test
[3]: /es/getting_started/synthetics/browser_test#create-recording
[4]: /es/api/latest/synthetics/#get-the-list-of-all-tests
[5]: /es/api/latest/synthetics/#get-a-browser-test
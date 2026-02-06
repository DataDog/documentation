---
further_reading:
- link: /api/latest/synthetics
  tag: API
  text: API de Synthetics
- link: https://www.datadoghq.com/blog/private-synthetic-monitoring/
  tag: Blog
  text: Tests de aplicaciones locales con localizaciones privadas de Datadog Synthetic
- link: /synthetics/browser_tests
  tag: Documentación
  text: Más información sobre los tests de navegador
title: Gestión de los tests de navegador mediante programación
---

## Información general

La monitorización de tu aplicación de extremo a extremo es crucial para comprender la experiencia de los usuarios. La [grabación de tests de Datadog][1] te permite simplificar la configuración para estos complejos flujos de trabajo de tests. Sin embargo, es posible que desees gestionar tus recursos de Synthetics mediante programación y definir tests de navegador con la API o a través de [Terraform][14].

## Gestión de los tests de navegador con la API

Datadog recomienda crear primero los tests de navegador en la IU de Datadog y recuperar las configuraciones de los tests con la API.

1. [Crea un test de navegador][2] y [guarda una grabación][3].
2. Utiliza el [endpoint Obtener la lista de todos los tests][4] para recuperar la lista de todos los tests de Synthetic Monitoring.
3. Filtra en `type: browser` y recupera el `public_ids` de los tests de navegador que deseas gestionar con la API.
4. Utiliza el [endpoint Get a browser test][5] para recuperar los archivos de configuración de cada test de navegador.

Puedes almacenar los archivos de configuración de un test de navegador para su uso posterior o utilizarlos para duplicar, actualizar y eliminar tus tests de navegador mediante programación.

## Gestión de tests de navegador con Terraform

Puedes utilizar el [proveedor de Datadog Terraform][6] para crear y gestionar tests de navegador y recursos de Synthetics asociados mediante programación a través de una configuración de Terraform. También puedes [importar][7] tus recursos existentes en tu configuración de Terraform o referenciar recursos existentes como [fuentes de datos][9] externas.

### Tests de navegador

El [recurso de test de Synthetic][8], con `type` establecido en `browser`, se puede utilizar para crear y gestionar los tests de navegador a través de Terraform.

### Localizaciones privadas

Si necesitas ejecutar tests de Synthetic desde localizaciones personalizadas o protegidas, puedes utilizar el [recurso de localización privada][10] para crear y gestionar localizaciones privadas desde las que ejecutarás tus tests. Obtén más información en la página [Localizaciones privadas][11].

### Variables globales y locales

Utiliza el [recurso de variable global de Synthetics][12] para crear y gestionar variables globales de Synthetics, que son variables que pueden compartirse de forma segura entre tests. También puedes crear [variables locales con funciones integradas][15] específicas para cada test al definir el esquema anidado [config_variable][16] con `type = "text"` en tus recursos de test de Synthetic.

### Límite de concurrencia

El [recurso de límite de concurrencia de Synthetics][13] permite limitar el número de tests de Synthetic que se ejecutan en paralelo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: /es/getting_started/synthetics/browser_test#create-a-browser-test
[3]: /es/getting_started/synthetics/browser_test#create-recording
[4]: /es/api/latest/synthetics/#get-the-list-of-all-tests
[5]: /es/api/latest/synthetics/#get-a-browser-test
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[7]: https://developer.hashicorp.com/terraform/cli/import
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
[9]: https://developer.hashicorp.com/terraform/language/data-sources
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
[11]: /es/synthetics/private_locations
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
[13]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_concurrency_cap
[14]: https://www.terraform.io/
[15]: https://docs.datadoghq.com/es/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[16]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test#nested-schema-for-config_variable
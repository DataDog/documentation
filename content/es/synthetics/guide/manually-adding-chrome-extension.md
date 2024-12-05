---
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: Blog
  text: Monitorizar la experiencia de usuario con los tests de navegador de Datadog
- link: /synthetics/browser_tests
  tag: Documentación
  text: Crear un test de navegador
title: Añadir manualmente la extensión de Chrome para tus tests de navegador
---

## Información general

Si no puedes descargar aplicaciones directamente de Chrome Web Store por motivos de seguridad, pásate al sistema de detección de extensiones de Datadog para grabar tests de navegador de Synthetics. Este sistema está disponible desde la versión 3.1.6 de la extensión de Chrome.

1. Descarga el [último archivo CRX][1] de la extensión del grabador de tests de Datadog.
2. Carga el archivo CRX en tu tienda de aplicaciones interna y vuelve a comprimir la extensión. El icono de la nueva extensión aparecerá en el navegador Chrome junto a tus otras extensiones.

   {{< img src="synthetics/guide/manually_adding_chrome_extension/icon.png" alt="el ícono que aparece en tu navegador" style="width:100%;" >}}

3. Crea tu [test de navegador][2] [definiendo la configuración de tu test][3] (como el nombre del test, las etiquetas (tags), las localizaciones y la frecuencia) y haciendo clic en **Guardar detalles y grabar test**. Para empezar a grabar, descarga primero la [extensión del grabador de tests de Datadog][4].
4. Haz clic en el icono de la extensión de grabación de tests de Datadog, que encontrarás en la esquina superior derecha del navegador. Esta extensión detectará automáticamente la extensión que has cargado en tu tienda de aplicaciones interna.
5. Empieza a [grabar los pasos de tu test de navegador][5] y haz clic en **Guardar grabación** cuando hayas terminado. 

   {{< img src="synthetics/guide/manually_adding_chrome_extension/record_test.png" alt="Graba tus tests de navegador" style="width:100%;" >}}

**Nota:** Datadog publica actualizaciones de la extensión del grabador de tests en la [Chrome Web Store][4]. Puedes actualizar manualmente tu extensión interna para grabar tests de navegador.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/synthetics-browser-extension
[2]: https://app.datadoghq.com/synthetics/browser/create
[3]: /es/synthetics/browser_tests/#test-configuration
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa?hl=en
[5]: /es/synthetics/browser_tests/#record-your-steps
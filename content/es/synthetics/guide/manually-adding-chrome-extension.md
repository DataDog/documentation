---
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: Blog
  text: Monitorizar la experiencia de usuario con los tests de navegador de Datadog
- link: /synthetics/browser_tests
  tag: Documentación
  text: Crear un test de navegador
title: Añadir la extensión de tests de navegador para Chrome manualmente a tiendas
  de aplicaciones internas
---

## Información general

Si no puedes descargar aplicaciones directamente de Chrome Web Store por motivos de seguridad, pásate al sistema de detección de extensiones de Datadog para grabar tests de navegador de Synthetics. Este sistema está disponible desde la versión 3.1.6 de la extensión de Chrome.

1. Descarga el [archivo CRX más reciente][5] de la extensión para grabar tests de Datadog.
2. Carga el archivo CRX en tu tienda de aplicaciones interna y vuelve a comprimir la extensión. El icono de la nueva extensión aparecerá en el navegador Chrome junto a tus otras extensiones.

   {{< img src="synthetics/guide/manually_adding_chrome_extension/icon.png" alt="Icono que aparece en el navegador" style="width:100%;" >}}

3. Crea un [test de navegador][2]. Para ello, tendrás que [establecer la configuración del test][3] (el nombre, las etiquetas, las ubicaciones y la frecuencia) y hacer clic en **Save Details & Record Test** (Guardar detalles y grabar el test). Para empezar a grabar, descarga la [extensión de grabación de tests de Datadog][1].
4. Haz clic en el icono de la extensión de grabación de tests de Datadog, que encontrarás en la esquina superior derecha del navegador. Esta extensión detectará automáticamente la extensión que has cargado en tu tienda de aplicaciones interna.
5. Empieza a [grabar los pasos del test de navegador][4] y haz clic en **Save Recording** (Guardar grabación) cuando lo tengas todo listo. 

   {{< img src="synthetics/guide/manually_adding_chrome_extension/record_test.png" alt="Graba tus tests de navegador" style="width:100%;" >}}

**Nota:** Datadog publica actualizaciones de la extensión de grabación de tests en [Chrome Web Store][1]., por lo que podrás actualizar manualmente tu extensión interna para grabar tests de navegador.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa?hl=en
[2]: https://app.datadoghq.com/synthetics/browser/create
[3]: /es/synthetics/browser_tests/#configuration
[4]: /es/synthetics/browser_tests/#record-test
[5]: https://github.com/DataDog/synthetics-browser-extension
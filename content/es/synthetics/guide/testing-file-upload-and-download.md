---
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de la monitorización Synthetic Datadog
- link: synthetics/
  tag: Documentación
  text: Más información sobre la monitorización Synthetic
- link: synthetics/browser_tests
  tag: Documentación
  text: Configurar un test de navegador
title: Cargar y descargar un archivo de test
---

## Información general

Las aplicaciones web pueden albergar una gran cantidad de procesos lógicos. Los tests de extremo a extremo suelen incluir, sobre todo, interacciones básicas (por ejemplo, clics e introducción de datos en formularios) con tu web. Por ello, a veces tienes que ir más allá y verificar interacciones complejas para asegurarte de que tus transacciones comerciales clave se pueden realizar en tu aplicación.

## Probar la carga de archivos

Puedes **cargar un archivo** si quieres validar el paso final de un flujo (flow) de trabajo funcional para probar la creación de perfiles. Cuando se carga un archivo a nivel del grabador de tests, los tests de navegador Synthetic Datadog identifican automáticamente el archivo cargado y crean el [paso `Upload file` asociado][1]. De esta forma, se puede volver a cargar ese archivo durante la ejecución del test.

{{< img src="synthetics/guide/testing-a-downloaded-file/upload_file.mp4" alt="Carga de archivo" video="true" width="100%">}}

## Probar la descarga de archivos

**Descargar archivos** es otra de las cosas que los usuarios suelen hacer en las aplicaciones web, ya sea de la confirmación de un pedido en un comercio electrónico o del historial de exportación en PDF o CSV de transacciones de una cuenta bancaria.

Los tests de navegador de Datadog y la aserción `Test a downloaded file` te permiten verificar que los archivos que se pueden descargar de tu aplicación web se facilitan correctamente (por ejemplo, desde el servidor FTP). Con esta aserción, se pueden probar archivos descargables para garantizar que tienen el nombre, el tamaño y los datos correctos.

Para crear un test de navegador con esta aserción, haz lo siguiente:

1. **Graba el paso que genera la descarga del archivo** en tu test de navegador. El siguiente ejemplo muestra cómo grabar un clic en un botón que desencadena la descarga de un archivo `.docx`. El tamaño del archivo debe ser inferior a 250 Mb.

    {{< img src="synthetics/guide/testing-a-downloaded-file/recording_step.mp4" alt="Grabación de pasos" video="true">}}

2. **Añade una aserción `Test a downloaded file`** para confirmar que el archivo se ha descargado correctamente:

    {{< img src="synthetics/guide/testing-a-downloaded-file/basic_assert.mp4" alt="Agregado de aserciones" video="true">}}

   Si es preciso, puedes hacer verificaciones más avanzadas, como las del nombre del archivo o su tamaño, e incluso de su integridad utilizando una cadena md5:

    {{< img src="synthetics/guide/testing-a-downloaded-file/advanced_assert.mp4" alt="Verificación avanzada" video="true">}}

   Para obtener más información sobre la aserción `Test a downloaded file`, consulta la lista completa de [aserciones de tests de navegador][2].

3. **Confirma que el archivo se ha descargado** y que cumple los requisitos que has configurado en tu aserción consultando el resultado del test:

    {{< img src="synthetics/guide/testing-a-downloaded-file/test_results.png" alt="Resultados del test" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/browser_tests/actions/#upload-file
[2]: /es/synthetics/browser_tests/actions/#assertion
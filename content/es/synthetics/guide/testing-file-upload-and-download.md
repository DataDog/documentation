---
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de Datadog Synthetic Monitoring
- link: synthetics/
  tag: Documentación
  text: Más información sobre Synthetic Monitorig
- link: synthetics/browser_tests
  tag: Documentación
  text: Configurar un test de navegador
title: Probar la carga y la descarga de archivos
---

## Información general

Las aplicaciones web pueden albergar una gran cantidad de procesos lógicos. Los tests de extremo a extremo suelen comprender, sobre todo, interacciones básicas (por ejemplo, clics e introducción de datos en formularios) con tu web. Por ello, a veces tienes que ir más allá y verificar interacciones complejas para asegurarte de que las transacciones que sustentan tu negocio se pueden hacer en tu aplicación.

## Probar la carga de archivos

Puedes **cargar un archivo** si quieres validar el paso final de un flujo de trabajo para probar la creación de perfiles. Cuando se carga un archivo para la herramienta de grabación de tests, los tests de navegador de Datadog Synthetics identifican automáticamente el archivo cargado y crean el [paso `Upload file` asociado][1]. De esta forma, se puede volver a cargar ese archivo cuando se está ejecutando el test.

{{< img src="synthetics/guide/testing-a-downloaded-file/upload_file.mp4" alt="Carga de archivo" video="true" width="100%">}}

## Probar la descarga de archivos

**Descargar archivos** es otra de las cosas que los usuarios suelen hacer en las aplicaciones web, ya sea la confirmación de un pedido en un comercio electrónico o la exportación en PDF o CSV del historial de transacciones de una cuenta bancaria.

Los tests de navegador de Datadog y la aserción `Test a downloaded file` te permiten verificar que los archivos que se pueden descargar de tu aplicación web se facilitan correctamente (por ejemplo, desde el servidor FTP). Con esta aserción, se pueden probar archivos descargables para garantizar que tienen el nombre, el tamaño y los datos correctos.

Para crear un test de navegador con esta aserción, haz lo siguiente:

1. **Graba el paso que desencadena la descarga del archivo** en el test de navegador. En el siguiente ejemplo se muestra cómo grabar el clic en un botón que hace que se descargue un archivo `.docx`. El archivo no puede superar los 50 MB.

    {{< img src="synthetics/guide/testing-a-downloaded-file/recording_step.mp4" alt="Grabación de pasos" video="true">}}

2. **Añade una aserción `Test a downloaded file`** para confirmar que el archivo se ha descargado correctamente:

    {{< img src="synthetics/guide/testing-a-downloaded-file/basic_assert.mp4" alt="Introducción de aserciones" video="true">}}

   Si es preciso, puedes hacer verificaciones más avanzadas, como las del nombre del archivo o su tamaño, e incluso de su integridad mediante una cadena md5:

    {{< img src="synthetics/guide/testing-a-downloaded-file/advanced_assert.mp4" alt="Verificación avanzada" video="true">}}

   Consulta la lista completa de [aserciones de tests de navegador][2] para obtener más información sobre la aserción `Test a downloaded file`.

3. **Confirma que el archivo se ha descargado** y que cumple los requisitos que has configurado en tu aserción consultando el resultado del test:

    {{< img src="synthetics/guide/testing-a-downloaded-file/test_results.png" alt="Resultados del test" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/browser_tests/actions/#upload-file
[2]: /es/synthetics/browser_tests/actions/#assertion
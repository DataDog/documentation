---
description: Realiza reintentos de los casos de prueba fallidos para evitar que la
  compilación falle debido a pruebas defectuosas.
further_reading:
- link: /tests
  tag: Documentación
  text: Más información sobre Visibilidad de pruebas
- link: /tests/guides/flaky_test_management
  tag: Documentación
  text: Más información sobre Gestión de pruebas defectuosas
kind: documentación
title: Reintentos automáticos de pruebas
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Visibilidad de pruebas no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Reintentos automáticos de pruebas está en beta pública.
{{< /callout >}}

## Información general

La función Reintentos automáticos de pruebas de Visibilidad de pruebas permite realizar reintentos de pruebas fallidas hasta N veces para evitar que la compilación falle debido a pruebas defectuosas:
un caso de prueba fallido se reintenta hasta que se supera con éxito o hasta que no quedan más intentos (en cuyo caso la compilación falla).

## Ajuste

Asegúrate de que la opción Test Visibility [Visibilidad de pruebas][1] está configurada para tus ejecuciones de prueba.

### Compatibilidad

* dd-trace-java >= 1.34.0

### Configuración

Después de configurar Visibilidad de pruebas, puedes configurar Auto Test Retries (Reintentos automáticos de pruebas) desde la página Test Service Settings [Configuración del servicio de pruebas][2].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Reintentos automáticos de pruebas en Configuración del servicio de pruebas." style="width:100%" >}}

El comportamiento predeterminado de la función es reintentar cualquier caso de prueba fallido hasta 5 veces.
Este comportamiento se puede ajustar con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ONLY_KNOWN_FLAKES`: si esta variable de entorno se establece en `true`, solo se reintentan los casos de prueba que Visibilidad de pruebas considera [defectuosos][3].
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT`: se puede establecer en cualquier número no negativo para cambiar el número máximo de reintentos por caso de prueba.

## Explorar los resultados en el Explorador de visibilidad de pruebas

Puedes consultar las pruebas reintentadas en el Test Visibility Explorer [Explorador de visibilidad de pruebas][4]: tienen la etiqueta (tag) `@test.is_retry` establecida en `true` (algunas de ellas también pueden tener la etiqueta `@test.is_new` establecida en `true`, lo que indica que la función [Detección temprana de defectos][5] las ha reintentado).

## Solucionar problemas

Si crees que hay algún problema con Reintentos automáticos de pruebas, ve a la página [Configuración del servicio de pruebas][2], busca tu servicio de pruebas y haz clic en **Configure** (Configurar). Haz clic en el icono de interruptor para desactivar Reintentos automáticos de pruebas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/setup/
[2]: https://app.datadoghq.com/ci/settings/test-service
[3]: /es/tests/guides/flaky_test_management/
[4]: /es/tests/explorer/
[5]: /es/tests/early_flake_detection
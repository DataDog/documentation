---
aliases:
- /es/tests/auto_test_retries
description: Realiza reintentos de los casos de tests fallidos para evitar que la
  compilación falle debido a tests defectuosos.
further_reading:
- link: /tests
  tag: Documentación
  text: Más información sobre Test Optimization
- link: /tests/flaky_test_management
  tag: Documentación
  text: Más información sobre Gestión de tests defectuosos
title: Reintentos automáticos de tests
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Test Optimization no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

## Resumen

La función Reintentos de test automáticos de Test Optimization permite reintentar tests fallidos hasta N veces para evitar que falle la compilación debido a tests defectuosos:
un caso de test fallido se reintenta hasta que pasa con éxito o hasta que no quedan más reintentos (en cuyo caso la compilación falla).

## Configuración

Asegúrate de que [Test Optimization][1] está configurado para tus tests.

{{< tabs >}}

{{% tab "Java" %}}

### Compatibilidad

`dd-trace-java >= 1.34.0`

### Configuración
Después de haber configurado Test Optimization, puedes configurar los Reintentos de test automáticos desde la página de [configuración del servicio de test][1].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Reintentos de test automáticos en la Configuración del servicio de test." style="width:100%" >}}

El comportamiento predeterminado de la función es reintentar cualquier caso de test fallido hasta 5 veces.
Este comportamiento se puede ajustar con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ONLY_KNOWN_FLAKES`: si esta variable de entorno se establece en `true`, sólo se reintentarán los casos de test que Test Optimization considere [defectuosos][2].
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT`: puede establecerse en cualquier número no negativo para cambiar el número máximo de reintentos por caso de test.

[1]: https://app.datadoghq.com/ci/settings/test-optimization
[2]: /es/tests/flaky_test_management/
{{% /tab %}}

{{% tab "JavaScript" %}}

### Compatibilidad

`dd-trace-js >= v5.19.0` y `dd-trace-js >= v4.43.0`

### Configuración

Después de haber configurado Test Optimization, puedes configurar Reintentos de test automáticos desde la página [Configuración del servicio de test][1].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Reintentos de test automáticos en la Configuración del servicio de test." style="width:100%" >}}

El comportamiento predeterminado de la función es reintentar cualquier caso de test fallido hasta 5 veces.
Este comportamiento se puede ajustar con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED`: se establece en 0 o false para desactivar explícitamente los reintentos incluso si la configuración remota está activada (por defecto: true).
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT`: un número no negativo para cambiar el número máximo de reintentos por caso de test (por defecto: 5).

#### Limitaciones conocidas

[jest-image-snapshot][2] es incompatible con `jest.retryTimes` a menos que se pase `customSnapshotIdentifier` (ver [jest-image-snapshot docs][3]) a `toMatchImageSnapshot`. Por lo tanto, los reintentos automáticos de test no funcionan a menos que se utilice `customSnapshotIdentifier`.

[1]: https://app.datadoghq.com/ci/settings/test-optimization
[2]: https://www.npmjs.com/paquete/jest-image-snapshot
[3]: https://github.com/americanexpress/jest-image-snapshot?tab=readme-ov-file#jestretrytimes
{{% /tab %}}

{{% tab "Ruby" %}}

### Compatibilidad

`datadog-ci-rb >= 1.4.0`

### Configuración

Después de haber configurado Test Optimization, puedes configurar Reintentos de test automáticos desde la página [Configuración del servicio de test][1].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Reintentos de test automáticos en la Configuración del servicio de test." style="width:100%" >}}

El comportamiento predeterminado de la función es reintentar cualquier caso de test fallido hasta 5 veces.
Este comportamiento se puede ajustar con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED`: se establece en 0 o false para deshabilitar explícitamente los reintentos incluso si la configuración remota está habilitada (por defecto: true).
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT`: un número no negativo para cambiar el número máximo de reintentos por caso de test (por defecto: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT`: un número no negativo para establecer el número total máximo de tests fallidos a reintentar (por defecto: 1000)


[1]: https://app.datadoghq.com/ci/settings/test-optimization

{{% /tab %}}

{{% tab ".NET" %}}

### Compatibilidad

`dd-trace-dotnet >= 3.4.0`

### Configuración

Después de configurar Test Visibility, puedes configurar los Reintentos de test automáticos desde la página [Configuración del servicio de test][1].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Reintentos de test automáticos en Configuración del servicio de test." style="width:100%" >}}

Por defecto, la función reintenta cualquier caso de test que falle hasta 5 veces.
Personaliza los reintentos automáticos de test con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED`: definida como `0` o `false` para desactivar explícitamente los reintentos incluso si la configuración remota está activada (por defecto: true).
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT`: un número no negativo para cambiar el número máximo de reintentos por caso de test (por defecto: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT`: un número no negativo para establecer el número total máximo de tests fallidos a reintentar (por defecto: 1000).


[1]: https://app.datadoghq.com/ci/settings/test-optimization
{{% /tab %}}

{{% tab "Go" %}}

<div class="alert alert-info">Test Optimization para Go está en vista previa.

### Compatibilidad

`orchestrion >= 0.9.4` + `dd-trace-go >= 1.69.1`

### Configuración

Después de configurar Test Visibility, puedes configurar Reintentos de test automáticos desde la página [Configuración del servicio de test][1].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Reintentos automáticos de tests activados en Configuración del servicio de tests." style="width:100%" >}}

Por defecto, la función reintenta cada caso de test que falla hasta 5 veces.
Personaliza los reintentos de test automáticos con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED`: establece `0` o `false` para desactivar explícitamente los reintentos incluso si la configuración remota está activada (por defecto: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT`: un número no negativo para cambiar el número máximo de reintentos por caso de test (por defecto: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT`: un número no negativo para establecer el número total máximo de tests fallidos a reintentar (por defecto: 1000)


[1]: https://app.datadoghq.com/ci/settings/test-optimization
{{% /tab %}}

{{% tab "Python" %}}

<div class="alert alert-info">Reintentos de test automáticos está disponible usando la fase beta del nuevo complemento pytest. Establece la variable de entorno <code>DD_PYTEST_USE_NEW_PLUGIN_BETA</code> a <code>true</code> para habilitarla.</div>

### Compatibilidad

`dd-trace-py >= 2.18.0` (`pytest >= 7.2.0`)

### Configuración

Después de configurar Test Optimization, puedes configurar Reintentos de test automáticos desde [la página de Configuración del servicio de test][1].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Reintentos automáticos de tests en Parámetros del servicio de tests." style="width:100%" >}}

El comportamiento predeterminado de la función es reintentar cualquier caso de test que falle hasta cinco veces. Los tests que fallan originalmente, ya sea en la configuración original, desmontaje, o accesorios en Pytest, no se vuelven a intentar.

Puedes ajustar este comportamiento con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED`: establece `0` o `false` para desactivar explícitamente los reintentos incluso si la configuración remota está activada (por defecto: `true`)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT`: un número no negativo para cambiar el número máximo de reintentos por caso de test (por defecto: `5`).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT`: un número no negativo para establecer el número total máximo de tests fallidos a reintentar (por defecto: `1000`)

[1]: https://app.datadoghq.com/ci/settings/test-optimization
{{% /tab %}}

{{% tab "Swift" %}}

### Compatibilidad

`dd-sdk-swift-testing >= 2.5.2`

### Configuración

Después de configurar Test Optimization, puedes configurar Reintentos de test automáticos desde [la página de Configuración del servicio de test][1].

{{< img src="continuous_integration/auto_test_retries_test_settings.png" alt="Reintentos automáticos de tests en Parámetros del servicio de tests." style="width:100%" >}}

El comportamiento predeterminado de la característica es reintentar cualquier caso de test fallido hasta 5 veces.
Este comportamiento se puede ajustar con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED`: se establece en 0 o false para desactivar explícitamente los reintentos incluso si la configuración remota está activada (por defecto: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT`: un número no negativo para cambiar el número máximo de reintentos por caso de test (por defecto: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT`: un número no negativo para establecer el número total máximo de tests fallidos a reintentar (por defecto: 1000)


[1]: https://app.datadoghq.com/ci/settings/test-optimization
{{% /tab %}}

{{< /tabs >}}

## Explora los resultados en el Test Optimization Explorer

Puedes consultar los tests reintentados en el [Test Optimization Explorer][2]: tienen la etiqueta `@test.is_retry` establecida en `true` (algunas de ellas también pueden tener `@test.is_new` establecida a `true`, lo que indica que han sido reintentadas por la función [Detección temprana de fallos][3]).

## Resolución de problemas

Si crees que hay algún problema con Reintentos de test automáticos, ve a la [página Configuración del servicio de tests][4], busca tu servicio de tests y haz clic en **Configure** (Configurar). Haz clic en el icono de interruptor para desactivar Reintentos automáticos de tests.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/setup/
[2]: /es/tests/explorer/
[3]: /es/tests/flaky_test_management/early_flake_detection
[4]: https://app.datadoghq.com/ci/settings/test-optimization
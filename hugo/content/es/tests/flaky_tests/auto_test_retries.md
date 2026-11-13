---
aliases:
- /es/tests/auto_test_retries
- /es/tests/flaky_test_management/auto_test_retries
description: Reintente las incidencias de prueba fallidas para evitar que la compilación
  falle debido a pruebas inestables.
further_reading:
- link: /tests
  tag: Documentación
  text: Aprenda sobre Test Optimization
- link: /tests/flaky_test_management
  tag: Documentación
  text: Obtenga información sobre Flaky Test Management
title: Auto Test Retries
---
## Descripción general {#overview}

La función Auto Test Retries de Test Optimization permite reintentar las pruebas fallidas hasta N veces para evitar que su compilación falle debido a pruebas inestables:
Una incidencia de prueba fallida se reintenta hasta que pasa correctamente o hasta que no quedan más intentos de reintento (en cuyo caso la compilación falla).

## Configuración {#setup}

Asegúrese de que [Test Optimization][1] esté configurado para sus ejecuciones de prueba.

{{< tabs >}}

{{% tab "Java" %}}

### Compatibilidad {#compatibility}

`dd-trace-java >= 1.34.0`

La compatibilidad del marco de pruebas es la misma que [Test Optimization Compatibility][3], con la excepción de `Scala Weaver`.

### Configuración {#configuration}
Después de configurar Test Optimization, configure Auto Test Retries en [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]. Puede aplicar la configuración a nivel de organización, repositorio o servicio de pruebas.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="Interruptor de Auto Test Retries en la configuración de CI/CD." style="width:100%" >}}

El comportamiento predeterminado de la función es reintentar cualquier incidencia de prueba fallida hasta 5 veces.
Este comportamiento se puede ajustar con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ONLY_KNOWN_FLAKES` - si esta variable de entorno se establece en `true`, solo se reintentan las incidencias de prueba que Test Optimization considera [flaky][2].
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - se puede establecer en cualquier número no negativo para cambiar el número máximo de reintentos por incidencia de prueba.

[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[2]: /es/tests/flaky_test_management/
[3]: /es/tests/setup/java/#compatibility
{{% /tab %}}

{{% tab "JavaScript" %}}

### Compatibilidad {#compatibility-1}

`dd-trace-js >= v5.19.0`

### Configuración {#configuration-1}

Después de configurar Test Optimization, configure Auto Test Retries en [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]. Puede aplicar la configuración a nivel de organización, repositorio o servicio de pruebas.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="Interruptor de Auto Test Retries en la configuración de CI/CD." style="width:100%" >}}

El comportamiento predeterminado de la función es reintentar cualquier incidencia de prueba fallida hasta 5 veces.
Este comportamiento se puede ajustar con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - establézcalo en 0 o false para deshabilitar explícitamente los reintentos incluso si la configuración remota está habilitada (predeterminado: true).
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - un número no negativo para cambiar el número máximo de reintentos por incidencia de prueba (predeterminado: 5).

[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories

{{% /tab %}}

{{% tab "Ruby" %}}

### Compatibilidad {#compatibility-2}

`datadog-ci-rb >= 1.4.0`

### Configuración {#configuration-2}

Después de configurar Test Optimization, configure Auto Test Retries en [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]. Puede aplicar la configuración a nivel de organización, repositorio o servicio de pruebas.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="Interruptor de Auto Test Retries en la configuración de CI/CD." style="width:100%" >}}

El comportamiento predeterminado de la función es reintentar cualquier incidencia de prueba fallida hasta 5 veces.
Este comportamiento se puede ajustar con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - establezca en 0 o false para deshabilitar explícitamente los reintentos incluso si la configuración remota está habilitada (predeterminado: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - un número no negativo para cambiar el número máximo de reintentos por incidencia de prueba (predeterminado: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - un número no negativo para establecer el número total máximo de pruebas fallidas a reintentar (predeterminado: 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{% tab ".NET" %}}

### Compatibilidad {#compatibility-3}

`dd-trace-dotnet >= 3.4.0`

### Configuración {#configuration-3}

Después de configurar Test Optimization, configure Auto Test Retries en [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]. Puede aplicar la configuración a nivel de organización, repositorio o servicio de pruebas.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="Interruptor de Auto Test Retries en la configuración de CI/CD." style="width:100%" >}}

De forma predeterminada, la función reintenta cualquier incidencia de prueba fallida hasta 5 veces.
Personalice Auto Test Retries con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - establezca en `0` o `false` para deshabilitar explícitamente los reintentos incluso si la configuración remota está habilitada (predeterminado: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - un número no negativo para cambiar el número máximo de reintentos por incidencia de prueba (predeterminado: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - un número no negativo para establecer el número total máximo de pruebas fallidas a reintentar (predeterminado: 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{% tab "Go" %}}

### Compatibilidad {#compatibility-4}

`orchestrion >= 0.9.4` + `dd-trace-go >= 1.69.1`

### Configuración {#configuration-4}

Después de configurar Test Optimization, configure Auto Test Retries en [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]. Puede aplicar la configuración a nivel de organización, repositorio o servicio de pruebas.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="Interruptor de Auto Test Retries en la configuración de CI/CD." style="width:100%" >}}

De forma predeterminada, la función reintenta cada incidencia de prueba fallida hasta 5 veces.
Personalice Auto Test Retries con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - establezca en `0` o `false` para deshabilitar explícitamente los reintentos incluso si la configuración remota está habilitada (predeterminado: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - un número no negativo para cambiar el número máximo de reintentos por incidencia de prueba (predeterminado: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - un número no negativo para establecer el número total máximo de pruebas fallidas a reintentar (predeterminado: 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{% tab "Python" %}}

### Compatibilidad {#compatibility-5}

`dd-trace-py >= 3.0.0` (`pytest >= 7.2.0`)

### Configuración {#configuration-5}

Después de configurar Test Optimization, configure Auto Test Retries en [{{< ui >}}CI/CD Settings{{< /ui >}}][1]. Puede aplicar la configuración a nivel de organización, repositorio o servicio de pruebas.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="Interruptor de Auto Test Retries en la configuración de CI/CD." style="width:100%" >}}

El comportamiento predeterminado de la función es reintentar cualquier incidencia de prueba fallida hasta cinco veces. Las pruebas que fallan originalmente en la configuración, la limpieza o los fixtures en Pytest no se reintentan.

Puede ajustar este comportamiento con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - establezca en `0` o `false` para deshabilitar explícitamente los reintentos incluso si la configuración remota está habilitada (predeterminado: `true`)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - un número no negativo para cambiar el número máximo de reintentos por incidencia de prueba (predeterminado: `5`).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - un número no negativo para establecer el número total máximo de pruebas fallidas que se volverán a intentar (predeterminado: `1000`)

### Dynamic Auto Test Retries {#dynamic-auto-test-retries}

`dd-trace-py >= 4.15.0`

De forma predeterminada, Auto Test Retries aplica el mismo límite de reintentos a cada prueba fallida. Dynamic Auto Test Retries (Dynamic ATR) basa el número de reintentos en cuánto tiempo tarda la prueba en ejecutarse en su primer intento. Las pruebas más rápidas reciben más reintentos y las pruebas más lentas reciben menos.

El presupuesto de reintentos para una prueba se determina una vez, a partir de la duración de su intento inicial, y se aplica a todos sus reintentos. Una prueba deja de ser reintentada tan pronto como un reintento pasa.

Los intervalos de duración predeterminados son:

| Duración del primer intento | Reintentos predeterminados |
| ---------------------- | --------------- |
| 5 segundos o menos | 10 |
| Más de 5 segundos, hasta 10 segundos | 5 |
| Más de 10 segundos, hasta 30 segundos | 3 |
| Más de 30 segundos, hasta 5 minutos | 2 |
| Más de 5 minutos | 1 |

Cada prueba fallida se vuelve a intentar al menos una vez, independientemente de su duración.

Para habilitar Dynamic Auto Test Retries, establezca las siguientes variables de entorno:

* `DD_CIVISIBILITY_DYNAMIC_ATR_ENABLED` - establezca en `true` para basar el número de reintentos en la duración del primer intento de la prueba en lugar del límite fijo de `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` (predeterminado: `false`) - el límite fijo se ignora mientras Dynamic ATR está habilitado. Auto Test Retries debe estar habilitado en [{{< ui >}}CI/CD Settings{{< /ui >}}][1].
* `DD_CIVISIBILITY_DYNAMIC_ATR_BUCKETS` - cinco números enteros separados por comas entre `1` y `20` que anulan los presupuestos predeterminados en la tabla anterior, ordenados desde el intervalo de duración más rápido al más lento (por ejemplo, `10,4,1,1,1`). Si esta variable no está configurada o está vacía, se utilizan los presupuestos predeterminados en la tabla anterior. Si `DD_CIVISIBILITY_DYNAMIC_ATR_BUCKETS` contiene un valor no válido, la biblioteca lo ignora, registra una advertencia y utiliza los presupuestos predeterminados.

**Nota**: El límite a nivel de sesión `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` sigue aplicándose cuando Dynamic ATR está habilitado.

[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories

{{% /tab %}}

{{% tab "Swift" %}}

### Compatibilidad {#compatibility-6}

`dd-sdk-swift-testing >= 2.5.2`

### Configuración {#configuration-6}

Después de configurar Test Optimization, configure Auto Test Retries en [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]. Puede aplicar la configuración a nivel de organización, repositorio o servicio de pruebas.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="Interruptor de Auto Test Retries en la configuración de CI/CD." style="width:100%" >}}

El comportamiento predeterminado de la función es reintentar cualquier incidencia de prueba fallida hasta 5 veces.
Este comportamiento se puede ajustar con las siguientes variables de entorno:

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - establezca en 0 o false para deshabilitar explícitamente los reintentos incluso si la configuración remota está habilitada (predeterminado: true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - un número no negativo para cambiar el número máximo de reintentos por incidencia de prueba (predeterminado: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - un número no negativo para establecer el número total máximo de pruebas fallidas a reintentar (predeterminado: 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{< /tabs >}}

### Repetición de pruebas fallidas {#failed-test-replay}

<div class="alert alert-info">La repetición de pruebas fallidas solo es compatible con Java, JavaScript y .NET.</div>

Además de reintentar automáticamente las pruebas fallidas, la repetición de pruebas fallidas le permite ver los datos de las variables locales en el marco superior de la traza de pila del error de la prueba.

La repetición de pruebas fallidas requiere que Auto Test Retries esté habilitado, ya que captura datos de variables de las ejecuciones de prueba reintentadas.

Habilite la repetición de pruebas fallidas en [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][4] bajo {{< ui >}}Mitigation{{< /ui >}} > {{< ui >}}Failed Test Replay{{< /ui >}}. Puede aplicar la configuración a nivel de organización, repositorio o servicio de pruebas.

#### Crear un índice de registros {#create-a-logs-index}

La repetición de pruebas fallidas crea registros que se envían a Datadog y aparecen junto a los registros de su aplicación habitual.

Si utiliza [filtros de exclusión][5], asegúrese de que los registros de repetición de pruebas fallidas no se filtren:

1. Cree un índice de registros y [configúrelo][6] con la retención deseada con **sin muestreo**.
2. Establezca el filtro para que coincida con la etiqueta `source:dd_debugger`. Todos los registros de repetición de pruebas fallidas tienen esta fuente.
3. Asegúrese de que el nuevo índice tenga prioridad sobre cualquier otro índice con filtros que coincidan con esa etiqueta, porque la primera coincidencia gana.

Después de habilitar esta función, puede ver los datos de las variables locales en las pruebas fallidas:

{{< img src="continuous_integration/failed_test_replay_local_variables.png" alt="Repetición de pruebas fallidas." style="width:100%" >}}

#### Limitaciones conocidas {#known-limitations}

[jest-image-snapshot][7] es incompatible con `jest.retryTimes` a menos que se pase `customSnapshotIdentifier` (consulte la [documentación de jest-image-snapshot][8]) a `toMatchImageSnapshot`. Por lo tanto, los reintentos automáticos de prueba no funcionan a menos que se utilice `customSnapshotIdentifier`.

## Explorar resultados en el Test Optimization Explorer {#explore-results-in-the-test-optimization-explorer}

Puede consultar las pruebas reintentadas en el [Test Optimization Explorer][2]: tienen la etiqueta `@test.is_retry` establecida en `true` (algunas de ellas también pueden tener la etiqueta `@test.is_new` establecida en `true`, lo que indica que han sido reintentadas por la función [Detección temprana de inestabilidad][3]).

## Solución de problemas {#troubleshooting}

Si sospecha que hay algún problema con Auto Test Retries, abra [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][4], busque su repositorio o servicio y desactive Auto Test Retries.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/setup/
[2]: /es/tests/explorer/
[3]: /es/tests/flaky_test_management/early_flake_detection
[4]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[5]: /es/logs/log_configuration/indexes/#exclusion-filters
[6]: /es/logs/log_configuration/indexes/#add-indexes
[7]: https://www.npmjs.com/package/jest-image-snapshot
[8]: https://github.com/americanexpress/jest-image-snapshot?tab=readme-ov-file#jestretrytimes
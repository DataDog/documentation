---
description: Investigue los datos de registro no leídos reportados después de la rotación
  de archivos e identifique la contrapresión en la canalización de registros del Datadog
  Agent.
further_reading:
- link: /agent/logs/log_transport/
  tag: Documentación
  text: Transporte de Agent para registros
- link: /agent/logs/advanced_log_collection/
  tag: Documentación
  text: Recopilación de registros avanzada
- link: /logs/guide/mechanisms-ensure-logs-not-lost/
  tag: Guía
  text: Mecanismos para garantizar que los registros no se pierdan
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentación
  text: Envíe un flare del Agent
title: Solucione bytes de registro faltantes
---
## Descripción general {#overview}

El Datadog Agent recopila registros de aplicaciones y los envía a Datadog. Para las aplicaciones que escriben registros en archivos, el Agent lee esos archivos a medida que se agregan nuevas entradas. Las aplicaciones a menudo rotan sus archivos de registro, reemplazando el archivo activo por uno nuevo cuando alcanza un límite de tamaño o antigüedad.

Si el Agent deja de leer un archivo rotado antes de llegar al final, los datos restantes no se envían a Datadog. El Agent reporta esto como **bytes de registro faltantes**. Es posible que note brechas en el [Log Explorer][11] o vea una advertencia en el [archivo de registro del Agent][10]:

```text
WARN | After rotation close timeout (60s), there were 148213 bytes remaining unread for file "/var/log/app/app.log". These unread logs are now lost. Consider increasing DD_LOGS_CONFIG_CLOSE_TIMEOUT
```

El Agent continúa leyendo un archivo rotado durante `logs_config.close_timeout` (60 segundos de forma predeterminada) después de detectar la rotación. Si quedan datos sin leer cuando expira este tiempo de espera, el Agent cierra el archivo y escribe la advertencia anterior.

## Posibles causas {#possible-causes}

La contrapresión ocurre cuando una etapa en la canalización de registros del Agent no puede seguir el ritmo, lo que ralentiza las etapas anteriores y las lecturas de archivos. La rotación frecuente o un alto volumen de registros también pueden evitar que el Agent termine dentro del tiempo de espera.

- El Agent no puede entregar cargas útiles a la ingesta de Datadog debido a errores de red, proxy, autenticación o de ingesta.
- La latencia de red o de ingesta ralentiza los envíos de registros exitosos.
- La codificación, el procesamiento por lotes o la compresión están limitando una canalización de registros.
- Las reglas de procesamiento o el procesamiento multilínea están limitando una canalización de registros.
- La tasa de registros excede la capacidad de CPU o de red disponible para el Agent.
- El archivo afectado rota antes de que el Agent pueda leer los datos escritos durante el intervalo de rotación, incluso cuando la canalización descendente no está saturada.

## Diagnostique bytes de registro faltantes {#diagnose-missing-log-bytes}

1. Busque la advertencia de rotación en el [archivo de registro del Agent][10]. Registre las rutas de archivo afectadas, las marcas de tiempo y el número de bytes no leídos.
2. Si utiliza el Agent 7.82.0 o posterior, ejecute el [comando de estado][1] y lea la sección [Interpretar la contrapresión del Agent de registros](#interpret-logs-agent-backpressure). Compare el historial retenido con las marcas de tiempo de advertencia.
3. Si varias filas en la tabla **Contrapresión del Agent de registro** están saturadas, investíguelas en este orden: `destination_reliable_N`, `worker`, `strategy` y `processor`. Utilice la sección [Elegir una acción de ajuste](#choose-a-tuning-action) para seleccionar el siguiente paso para el primer componente saturado en esa lista.
4. Aplique un cambio relevante, luego siga la sección [Verificar el resultado](#verify-the-result) bajo un volumen de registro representativo antes de abordar otro componente.
5. Si el agent sigue sin poder procesar el volumen requerido, siga la sección [Reducir el volumen de registro](#reduce-log-volume).

### Interpretar la contrapresión del Agent de registros {#interpret-logs-agent-backpressure}

Las versiones 7.82.0 y posteriores del Agent incluyen una sección **Contrapresión del Agent de registros** en el [comando de estado][1]. La sección informa sobre la utilización reciente del procesador, la estrategia de procesamiento por lotes, los trabajadores de envío y los destinos. Conserva la utilización máxima durante aproximadamente 10 horas y la duración detallada de la saturación durante 30 minutos.

{{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}

También puede encontrar la sección en `status.log` dentro de [un flare del Agent][2]. Debido a que el historial se restablece cuando el Agent se reinicia, tome un flare antes de reiniciar.

```text
Logs Agent Backpressure
=======================

  Overall state: SATURATED
  Reason: destination_reliable_0 pipeline q0s0 is currently saturated (saturated for 3m20s in the last 30m)

  Component              Instance Current   5m avg/max    30m avg/max    2h max    5h max    10h max    30m saturated    Last saturated
  processor              0        20%       18/26%        15/41%         55%       55%       55%        0s               -
  strategy               0        14%       12/19%        13/22%         22%       22%       22%        0s               -
  worker                 q0s0     46%       43/63%        27/63%         63%       63%       63%        0s               -
  destination_reliable_0 q0s0     93%       82/93%        71/93%         93%       93%       93%        3m20s            12:09:42
```

Debido a que `destination_reliable_0` está saturado, siga la sección [Resolver errores de entrega](#resolve-delivery-errors) antes de cambiar la configuración del procesador o de procesamiento por lotes.

#### Estado general {#overall-state}

| Estado | Significado |
| --- | --- |
| `HEALTHY` | Ningún componente está saturado y ninguno estuvo saturado en los últimos 30 minutos. |
| `WARNING` | Ningún componente está saturado, pero al menos uno estuvo saturado en los últimos 30 minutos. Compare `Last saturated` con las marcas de tiempo de advertencia de bytes faltantes. |
| `SATURATED` | Al menos un componente alcanzó el umbral de saturación dentro del periodo actual de 15 segundos. |

La saturación significa que un componente pasó al menos el 90% de su tiempo de muestreo trabajando en lugar de esperando. Utilice la advertencia de rotación para confirmar la pérdida y la tabla para identificar una posible restricción.

#### Columnas de la tabla {#table-columns}

| Columna | Significado |
| --- | --- |
| `Component` | La etapa de la canalización de registros. Consulte la sección [Elegir una acción de ajuste](#choose-a-tuning-action). |
| `Instance` | La instancia de la canalización o del destino. |
| `Current` | Utilización suavizada durante aproximadamente 15 segundos. |
| `5m avg/max` y `30m avg/max` | Utilización promedio y máxima durante el periodo indicado. |
| `2h max`, `5h max` y `10h max` | Utilización máxima durante el periodo indicado. |
| `30m saturated` | Tiempo transcurrido al 90% de utilización o más durante los últimos 30 minutos. |
| `Last saturated` | Hora de la última muestra de saturación retenida. Un `-` significa que no hay ninguna muestra retenida disponible. |

## Déle al Agent más tiempo para leer los archivos rotados {#give-the-agent-more-time-to-read-rotated-files}

Aumente `logs_config.close_timeout` cuando el Agent necesite más de los 60 segundos predeterminados para terminar de leer un archivo rotado. Para usar un tiempo de espera de 180 segundos:

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  close_timeout: 180
{{< /code-block >}}

{{% /tab %}}
{{% tab "Variable de entorno" %}}

```shell
DD_LOGS_CONFIG_CLOSE_TIMEOUT=180
```

{{% /tab %}}
{{< /tabs >}}

Después de cambiar el tiempo de espera, busque en el [archivo de registro del Agent][10] nuevas advertencias de rotación durante un volumen de registro representativo. Si las advertencias continúan, aumente el tiempo de espera nuevamente o use la sección [Elija una acción de ajuste](#choose-a-tuning-action) para seleccionar una acción para el componente saturado. Los tiempos de espera más largos mantienen abiertos los archivos rotados y pueden aumentar el uso de descriptores de archivos y de disco.

Si el Agent no realiza el seguimiento de las últimas líneas de todos los archivos coincidentes, verifique `logs_config.open_files_limit` en su lugar. Para obtener detalles de configuración, consulte [Aumentar el número de archivos de registro a los que se realiza seguimiento de las últimas líneas por el Agent][3].

## Ajuste el Agent {#tune-the-agent}

### Elija una acción de ajuste {#choose-a-tuning-action}

| Componente | Interpretación | Comience con esta sección |
| --- | --- | --- |
| `destination_reliable_N` | Los envíos de registros se retrasan o se reintentan. | [Resuelva errores de entrega](#resolve-delivery-errors) |
| `worker` | Las cargas útiles están esperando para ser enviadas. | [Resuelva errores de entrega](#resolve-delivery-errors) |
| `strategy` | El trabajo de codificación, procesamiento por lotes o compresión está al límite de su capacidad. | [Deshabilite la compresión](#disable-compression) o [aumente el paralelismo de la canalización](#increase-pipeline-parallelism) |
| `processor` | El procesamiento de registros está al límite de su capacidad. | [Reduzca el procesamiento de registros](#reduce-log-processing) o [aumente el paralelismo de la canalización](#increase-pipeline-parallelism) |

### Resuelva los errores de entrega {#resolve-delivery-errors}

Si `destination_reliable_N` está saturado, abra el [archivo de registro del Agent][10] e inspeccione las entradas cerca de la marca de tiempo de advertencia de bytes faltantes para ver si hubo envíos fallidos o reintentados. Resuelva los errores de autenticación, rechazo, proxy, DNS y conexión. Verifique la [configuración del proxy][5], el [acceso a la red a los puntos de conexión de Datadog][6] y el [sitio de Datadog][4].

### Deshabilite la compresión {#disable-compression}

Para la entrega HTTPS, la compresión está habilitada de forma predeterminada. Si `strategy` está saturado y el uso de la CPU del Agent es alto, considere deshabilitar la compresión. Esto reduce el trabajo de compresión, pero aumenta el tamaño de la carga útil y la cantidad de bytes enviados a la ingesta de registros:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  use_compression: false
{{< /code-block >}}

Después del cambio, ejecute el [comando de estado][1] y confirme que `strategy` pasa menos tiempo saturado. Vuelva a habilitar la compresión si el uso de la red alcanza su capacidad o si el [archivo de registro Agent][10] muestra nuevos errores de entrega.

### Aumente el paralelismo de la canalización {#increase-pipeline-parallelism}

De forma predeterminada, el Agent ejecuta una canalización de registros por cada CPU lógica disponible, hasta un máximo de cuatro canalizaciones.

Si `processor` o `strategy` están saturados y la CPU del servidor está por debajo de su capacidad, aumente `logs_config.pipelines`. Por ejemplo, en un servidor con ocho CPU lógicas disponibles para el Agent:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  pipelines: 8
{{< /code-block >}}

Las canalizaciones adicionales ayudan cuando el Agent recopila datos de múltiples registros. Una sola fuente permanece en una canalización. Más canalizaciones pueden aumentar la CPU del Agent, la memoria y la concurrencia total de envío HTTP. Después del cambio, ejecute el [comando de estado][1] y confirme que el componente objetivo pasa menos tiempo saturado.

### Reduzca el procesamiento de registros {#reduce-log-processing}

Si `processor` está saturado, revise las [reglas de procesamiento][7] configuradas. Las reglas globales se ejecutan contra cada registro recopilado por el Agent. Cuando una regla se aplique a una fuente, muévala a la configuración de integración de esa fuente:

{{< code-block lang="yaml" filename="conf.d/myapp.d/conf.yaml" >}}
logs:
  - type: file
    path: /var/log/app/app.log
    service: myapp
    source: myapp
    log_processing_rules:
      - type: exclude_at_match
        name: exclude_debug
        pattern: \[DEBUG\]
{{< /code-block >}}

Elimine las reglas duplicadas de global `logs_config.processing_rules` y a nivel de fuente `log_processing_rules`. A partir del Agent 7.82.0, la [detección automática de varias líneas][8] está habilitada de forma predeterminada. Si el componente `processor` está saturado y sus registros no requieren agregación de varias líneas, considere deshabilitarlo:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  auto_multi_line_detection: false
{{< /code-block >}}

Si una fuente tiene un formato de varias líneas conocido, [configure una regla de procesamiento a nivel de fuente `multi_line`][12] en lugar de usar la detección automática. Después del cambio, ejecute el [comando de estado][1] para comparar la saturación del procesador y verificar en [Log Explorer][11] que las líneas relacionadas permanezcan agrupadas correctamente.

## Reduzca el volumen de registros {#reduce-log-volume}

Si el Agent no puede procesar el volumen requerido dentro de la capacidad disponible del servidor y la red, filtre los registros que no necesite. `exclude_at_match`Una regla de procesamiento descarta los registros coincidentes antes de que salgan del servidor:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_health_checks
      pattern: GET /health
{{< /code-block >}}

Utilice una entrada a nivel de fuente `log_processing_rules` cuando el filtro se aplique solo a una fuente.

## Verifique el resultado {#verify-the-result}

Pruebe cada cambio bajo un volumen de registros representativo:

1. Ejecute el comando de estado:
   {{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}
2. Confirme que el componente objetivo pasa menos tiempo en o por encima del 90% de utilización. El estado general permanece `WARNING` hasta por 30 minutos después de que se despeja la saturación.
3. Busque en el [registro del Agent][10] nuevas advertencias de `remaining unread`.

Si un cambio no reduce la saturación o la frecuencia de nuevas advertencias de rotación, reviértalo. Luego seleccione la siguiente acción de la sección [Elija una acción de ajuste](#choose-a-tuning-action). Si la saturación se mueve a un componente diferente, utilice la acción enumerada para ese componente.

## Comuníquese con el soporte de Datadog {#contact-datadog-support}

Si los pasos en esta página no resuelven el problema, [comuníquese con el soporte de Datadog][9]. Envíe [un flare][2] mientras la canalización esté saturada y antes de reiniciar el Agent.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/configuration/agent-commands/#agent-status-and-information
[2]: /es/agent/troubleshooting/send_a_flare/
[3]: /es/logs/guide/increase-number-of-log-files-tailed/
[4]: /es/getting_started/site/
[5]: /es/agent/configuration/proxy/
[6]: /es/agent/configuration/network/
[7]: /es/agent/logs/advanced_log_collection/
[8]: /es/agent/logs/auto_multiline_detection/
[9]: /es/help/
[10]: /es/agent/configuration/agent-log-files/
[11]: /es/logs/explorer/
[12]: /es/agent/logs/advanced_log_collection/#manually-aggregate-multi-line-logs
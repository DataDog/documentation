---
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API listas para usar
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
title: Solución de problemas de protección de aplicaciones y API de PHP
---
## Descripción general {#overview}

Este documento proporciona información de diagnóstico para problemas comunes y comportamientos inesperados con la protección de aplicaciones y API de Datadog. Si continúa teniendo problemas, comuníquese con el [soporte de Datadog][1] para obtener más ayuda.

## Límites de tasa de AAP {#aap-rate-limits}

Las trazas de AAP tienen un límite de tasa de 100 trazas por segundo. Las trazas enviadas después del límite no se reportan. Comuníquese con el [soporte de Datadog][1] si necesita cambiar el límite.

## No se detectaron trazas de seguridad por AAP {#no-security-traces-detected-by-aap}

Hay una serie de pasos que deben ejecutarse correctamente para que la información de amenazas aparezca en el [Explorador de trazas y señales][2] de AAP. Es importante verificar cada paso al investigar este problema.

### Confirme que AAP esté habilitado {#confirm-aap-is-enabled}

Puede usar la métrica `datadog.apm.appsec_host` para verificar si AAP se está ejecutando.

1. Vaya a **Metrics > Summary** en Datadog.
2. Busque la métrica `datadog.apm.appsec_host`. Si la métrica no existe, entonces no hay servicios ejecutando AAP. Si la métrica existe, los servicios se reportan con las etiquetas de métrica `host` y `service`.
3. Seleccione la métrica y, en la sección **Tags**, busque `service` para ver qué servicios están ejecutando AAP.

Si no ve `datadog.apm.appsec_host`, consulte las [instrucciones en la aplicación][3] para confirmar que todos los pasos de la configuración inicial estén completos.

Los datos de AAP se envían con trazas de APM. Consulte [solución de problemas de APM][4] para [confirmar la configuración de APM][5] y verificar si hay [errores de conexión][6].

### Envíe un ataque de prueba a su aplicación {#send-a-test-attack-to-your-application}

 Para probar su configuración de AAP, active la regla [Security Scanner Detected][7] ejecutando un archivo que contenga el siguiente script de curl:

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**Nota:** El valor `dd-test-scanner-log` es compatible en las versiones más recientes.

Unos minutos después de habilitar su aplicación y ejecutar una prueba exitosa en ella, la información sobre amenazas aparece en el [Explorador de trazas y señales][2].

{{< img src="/security/security_monitoring/explorer/signal_panel_v2.png" alt="Página de detalles de Security Signal que muestra etiquetas, métricas, próximos pasos sugeridos y direcciones IP del atacante asociadas con una amenaza." style="width:100%;" >}}

### Verifique si las integraciones de tracer requeridas están desactivadas {#check-if-required-tracer-integrations-are-deactivated}

AAP depende de ciertas integraciones de tracer. Si están desactivadas, AAP no funcionará. Para ver si hay integraciones desactivadas, busque `disabled_integrations` en sus [registros de inicio][8].

Las integraciones requeridas varían según el lenguaje.

No hay integraciones requeridas para PHP.

### Verifique la configuración del Datadog Agent {#check-datadog-agent-configuration}

 Para solucionar problemas en este paso del proceso, haga lo siguiente:

- Verifique los detalles del Agent en ejecución en esta dirección `http://<agent-machine-name>:<agent-port>/info`, generalmente `http://localhost:8126/info`.
- Asegúrese de que no haya errores de transmisión del Agent relacionados con los spans en sus [registros del tracer][10].
- Si el Agent está instalado en una máquina separada, verifique que `DD_AGENT_HOST` y, opcionalmente, `DD_TRACE_AGENT_PORT` estén configurados, o que `DD_TRACE_AGENT_URL` esté configurado para el SDK de la aplicación.

### Verifique si los spans se transmiten correctamente a Datadog {#check-if-spans-are-successfully-transmitted-to-datadog}

Los datos de AAP se envían a través de [spans][9]. Para confirmar que los spans se transmiten correctamente a Datadog, verifique que sus registros del tracer contengan registros similares a este:

```
2021-11-29 21:19:58 CET | TRACE | INFO | (pkg/trace/info/stats.go:111 in LogStats) | [lang:.NET lang_version:5.0.10 interpreter:.NET tracer_version:1.30.1.0 endpoint_version:v0.4] -> traces received: 2, traces filtered: 0, traces amount: 1230 bytes, events extracted: 0, events sampled: 0
```

Si los spans no se están transmitiendo, entonces los registros del tracer contendrán registros similares a este:

```
2021-11-29 21:18:48 CET | TRACE | INFO | (pkg/trace/info/stats.go:104 in LogStats) | No data received
```

## Solución de problemas por lenguaje {#troubleshooting-by-language}

A continuación se presentan pasos adicionales de solución de problemas para PHP.

Para PHP, para comenzar a solucionar problemas con la extensión AAP de Datadog, habilite los registros de depuración en el archivo `.ini` de la extensión AAP.

El archivo `ini` de la extensión generalmente se encuentra en `/etc/php/<version>/xxx/conf.d/98-ddtrace.ini`, pero la ubicación puede variar según su instalación. Revise el principio de la salida de `phpinfo()` para identificar el directorio que se analiza en busca de archivos `.ini`, si los hay. En el archivo `.ini`, establezca las siguientes opciones de configuración con lo siguiente:

```php
datadog.appsec.log_level='debug'
datadog.appsec.helper_extra_args='--log_level=debug'
datadog.appsec.helper_log_file='/tmp/helper.log'
```

La extensión envía los registros al archivo de registro `php_error` predeterminado. Si no hay registros en el archivo, agregue lo siguiente al archivo `.ini`:

```php
datadog.appsec.log_file='tmp/extension.log'
```

### La instalación no encuentra PHP {#installation-fails-to-find-php}
Si el script de instalación no puede encontrar la versión correcta de PHP, puede establecer `--php-bin` en la ubicación del binario de PHP, por ejemplo:

```
$ php datadog-setup.php --php-bin /usr/bin/php7.4 --enable-appsec
```
### Error en la conexión con el asistente {#connection-to-helper-failed}
Si la extensión AAP no puede comunicarse con el proceso del asistente, aparece la siguiente advertencia:

```
PHP Warning:  Unknown: [ddappsec] Connection to helper failed and we are not going to attempt to launch it: dd_error
```

La advertencia podría ir seguida de uno de estos mensajes de error:

```
PHP Warning:  Unknown: [ddappsec] Could not open lock file /tmp/ddappsec.lock: Permission denied in Unknown on line 0
```

```
PHP Warning:  Unknown: [ddappsec] Call to bind() failed: Permission denied
```

```
PHP Warning:  Unknown: [ddappsec] Failed to unlink /tmp/ddappsec.sock: Operation not permitted
```

Esto indica que el archivo de bloqueo o el archivo de socket utilizado por la extensión tiene permisos no válidos, o que el usuario que ejecuta el proceso PHP no tiene acceso de escritura al directorio `tmp`.

Si el archivo de bloqueo o el archivo de socket tiene permisos no válidos, puede eliminarlos y reiniciar Apache/FPM o ajustar `user:group` para que coincida con el utilizado por Apache/FPM, por ejemplo, `www-data`.

Si el usuario no tiene acceso de escritura al directorio tmp, puede cambiar la ubicación del archivo de bloqueo y del archivo de socket modificando los siguientes ajustes en el archivo `.ini` de la extensión:

```
datadog.appsec.helper_runtime_path = /<directory with compatible permissions>/
```

### Confirme que las versiones del trazador estén actualizadas {#confirm-tracer-versions-are-updated}

Consulte la documentación de configuración de protección de aplicaciones y API para validar que está utilizando la versión correcta del tracer. Estas versiones mínimas son necesarias para comenzar a enviar datos de telemetría que incluyan información de la biblioteca.

### Asegure la comunicación de los datos de telemetría {#ensure-the-communication-of-telemetry-data}

Asegúrese de que la variable de entorno `DD_INSTRUMENTATION_TELEMETRY_ENABLED` (`DD_TRACE_TELEMETRY_ENABLED` para Node.js) esté establecida en `true`, o que la propiedad del sistema correspondiente para su lenguaje esté habilitada. Por ejemplo, en Java: `-Ddd.instrumentation.telemetry.enabled=true`

## Deshabilitar AAP {#disabling-aap}

Para deshabilitar AAP, utilice uno de los siguientes métodos.

### DD_APPSEC_ENABLED {#dd-appsec-enabled}

Si la variable de entorno `DD_APPSEC_ENABLED=true` está configurada para su servicio, elimine la variable de entorno `DD_APPSEC_ENABLED=true` de la configuración de su aplicación y reinicie su servicio.

Si su servicio es un servicio PHP, establezca explícitamente la variable de entorno en `DD_APPSEC_ENABLED=false` y, si corresponde, comente la marca `datadog.appsec.enabled = On` de su archivo de configuración `php.ini`. Luego, reinicie su servicio. 

### Remote Configuration {#remote-configuration}

Si AAP se activó mediante [Remote Configuration][16], haga lo siguiente: 
  1. Vaya a [{{< ui >}}Services{{< /ui >}}][15].
  2. Seleccione {{< ui >}}App & API Protection in Monitoring Mode{{< /ui >}}.
  3. En la faceta {{< ui >}}App & API Protection{{< /ui >}}, habilite {{< ui >}}Monitoring Only{{< /ui >}}, {{< ui >}}No data{{< /ui >}} y {{< ui >}}Ready to block{{< /ui >}}.
  4. Haga clic en un servicio.
  5. En {{< ui >}}Capabilities{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Threat Detection{{< /ui >}}, haga clic en {{< ui >}}Deactivate{{< /ui >}}.

<div class="alert alert-info">Si AAP se activó mediante <a href="https://app.datadoghq.com/organization-settings/remote-config">Remote Configuration</a>, puede usar un botón de <strong>Desactivar</strong>. Si AAP se activó mediante la configuración local, el botón <strong>Desactivar</strong> no es una opción.</div>

### Deshabilitar en bloque {#bulk-disable}

Para deshabilitar AAP en sus servicios de forma masiva, haga lo siguiente: 
  1. Vaya a [{{< ui >}}Services{{< /ui >}}][15].
  2. En la faceta {{< ui >}}App & API Protection{{< /ui >}}, habilite {{< ui >}}Monitoring Only{{< /ui >}}, {{< ui >}}No data{{< /ui >}} y {{< ui >}}Ready to block{{< /ui >}}.
  3. Seleccione las casillas de verificación de los servicios en los que desea deshabilitar la detección de amenazas.
  4. En {{< ui >}}Bulk Actions{{< /ui >}}, seleccione {{< ui >}}Deactivate threat detection on (number of) services{{< /ui >}}.



## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: https://app.datadoghq.com/security/appsec/
[3]: https://app.datadoghq.com/security/appsec?instructions=all
[4]: /es/tracing/troubleshooting/
[5]: /es/tracing/troubleshooting/#confirm-apm-setup-and-agent-status
[6]: /es/tracing/troubleshooting/connection_errors/
[7]: /es/security/default_rules/security-scan-detected/
[8]: /es/tracing/troubleshooting/tracer_startup_logs/
[9]: /es/tracing/glossary/#spans
[10]: /es/tracing/troubleshooting/#tracer-debug-logs
[12]: https://app.datadoghq.com/security/appsec/vm
[13]: /es/security/code_security/iast/
[14]: /es/security/code_security/software_composition_analysis
[15]: https://app.datadoghq.com/security/configuration/asm/services-config
[16]: https://app.datadoghq.com/organization-settings/remote-config
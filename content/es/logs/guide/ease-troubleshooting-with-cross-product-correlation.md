---
further_reading:
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentación
  text: Obtener más información sobre el etiquetado unificado de servicios
- link: /tracing/other_telemetry/connect_logs_and_traces
  tag: Documentación
  text: Conectar logs y trazas
- link: /real_user_monitoring/platform/connect_rum_and_traces/
  tag: Documentación
  text: Conectar RUM, Session Replay y trazas
- link: /synthetics/apm/
  tag: Documentación
  text: Conectar tests Synthetic y trazas
kind: guía
title: Facilitar la resolución de problemas a través de la correlación entre productos
---

## Información general

El [etiquetado unificado de servicios][1] ofrece capacidades de correlación de alto nivel. En ocasiones, es posible que los puntos de partida de tu investigación sean un log, una traza, una vista o un test Synthetic únicos. Correlacionar logs, trazas y vistas con otros datos proporciona un contexto útil que te permite calcular el impacto en tus actividades e identificar la causa raíz de un problema rápidamente.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/full-stack-cover.png" alt="Correlación de pila completa" style="width:100%;" >}}

En esta guía te explica cómo correlacionar los datos de toda la pila. Dependiendo de tu caso de uso, puedes omitir algunos pasos. Los pasos que dependen de otros se indican explícitamente.

1. [Correlacionar logs del lado del servidor con trazas](#correlate-server-side-logs-with-traces)
   * [Correlacionar logs de aplicación](#correlate-application-logs)
   * [Correlacionar logs de proxy](#correlate-proxy-logs)
   * [Correlacionar logs de base de datos](#correlate-database-logs)
2. [Correlacionar productos frontend](#correlate-frontend-products)
   * [Correlacionar logs de navegador con RUM](#correlate-browser-logs-with-rum)
3. [Correlacionar la experiencia del usuario con el comportamiento del servidor](#correlate-user-experience-with-server-behavior)
   * [Correlacionar vistas de RUM con trazas](#correlate-rum-views-with-traces)
   * [Aprovechar la correlación de trazas para solucionar problemas de tests Synthetic](#leverage-trace-correlation-to-troubleshoot-synthetic-tests)

## Correlacionar logs del lado del servidor con trazas

Cuando tus usuarios encuentran errores o una latencia elevada en tu aplicación, la visualización de logs específicos de una solicitud problemática puede revelar exactamente qué ha salido mal. Al reunir todos los logs relativos a una solicitud determinada, puedes ver con lujo de detalles cómo se ha gestionado de principio a fin y así diagnosticar rápidamente el problema.

Correlacionar tus logs con trazas también facilita la aplicación de [una agresiva estrategia de muestreo sin pérdida de coherencia a nivel de la entidad][2] mediante el uso de `trace_id`.

La [correlación de logs de aplicación](#correlate-application-logs) te proporciona una amplia visibilidad de toda tu pila, pero algunos casos de uso específicos requieren una correlación más profunda en tu pila. Sigue los siguientes enlaces para completar la configuración de cada caso de uso:

* [Correlacionar logs de proxy](#correlate-proxy-logs)
* [Correlacionar logs de base de datos](#correlate-database-logs)

### Correlacionar logs de aplicación

#### ¿Por qué?

Los logs de aplicación ofrecen el mayor contexto en torno a la mayoría de los problemas de código y de lógica empresarial. Incluso pueden ayudarte resolver otros problemas de servicios. Por ejemplo, la mayoría de los errores de base de datos de logs de ORM.

#### ¿Cómo?

Utiliza una de las [varias correlaciones OOTB][3]. Si utilizas un rastreador personalizado o si tienes algún problema, consulta la sección de [FAQ acerca de correlaciones][4].

### Correlacionar logs de proxy

#### ¿Por qué?

Los logs de proxy proporcionan más información que los logs de aplicación, ya que abarcan más puntos de entrada y brindan información sobre el contenido estático y las redirecciones.

#### ¿Cómo?

El rastreador de aplicaciones genera los ID de rastreo por defecto. Esto se puede cambiar inyectando `x-datadog-trace-id` en los encabezados de solicitudes HTTP.

#### NGINX

##### Configurar OpenTracing

Consulta la [integración de rastreo NGINX][5].

##### Inyectar un ID de rastreo en logs

El ID de rastreo se almacena como variable `opentracing_context_x_datadog_trace_id`. Actualiza el formato de log NGINX añadiendo el siguiente bloque de configuración en la sección HTTP de tu archivo de configuración NGINX `/etc/nginx/nginx.conf`:

```conf
http {
  log_format main '$remote_addr - $opentracing_context_x_datadog_trace_id $http_x_forwarded_user [$time_local] "$request" '
          '$status $body_bytes_sent "$http_referer" '
          '"$http_user_agent" "$http_x_forwarded_for" ';

  access_log /var/log/nginx/access.log;
}
```

##### Analizar los ID de rastreo en pipelines

1. Clona el pipeline NGINX.

2. Personaliza el primer [analizador grok][6]:
   - En **Parsing rules* (Reglas de análisis), sustituye la primera regla de análisis por:
   ```text
   access.common %{_client_ip} %{_ident} %{_trace_id} %{_auth} \[%{_date_access}\] "(?>%{_method} |)%{_url}(?> %{_version}|)" %{_status_code} (?>%{_bytes_written}|-)
   ```
   - En **Advanced settings** (Configuración avanzada), en **Helper Rules** (Reglas de ayuda), añade la línea:
   ```text
   _trace_id %{notSpace:dd.trace_id:nullIf("-")}
   ```

3. Añade un [reasignador de ID de rastreo][7] en el atributo `dd.trace_id`.

### Correlacionar logs de base de datos

#### ¿Por qué?

Los logs de base de datos suelen ser difíciles de contextualizar debido a la similitud de las consultas, la anonimización variable y el elevado uso.

Por ejemplo, las consultas lentas de producción son difíciles de reproducir y analizar sin invertir mucho tiempo y recursos. A continuación se muestra un ejemplo de cómo correlacionar el análisis de consultas lentas con las trazas.

#### ¿Cómo?

#### PostgreSQL

##### Para enriquecer tus logs de base de datos

Los logs predeterminados de PostgreSQL no tienen información. Para enriquecerlos, sigue [esta guía sobre integraciones][8].

Las prácticas recomendadas para consultas lentas también sugieren registrar planes de ejecución de sentencias lentas automáticamente, para que no tengas que ejecutar `EXPLAIN` manualmente. Para ejecutar `EXPLAIN` automáticamente, actualiza `/etc/postgresql/<VERSION>/main/postgresql.conf` con:

```conf
session_preload_libraries = 'auto_explain'
auto_explain.log_min_duration = '500ms'
```

Las consultas de más de 500ms registran su plan de ejecución.

**Nota**: `auto_explain.log_analyze = 'true'` proporciona aún más información, pero afecta enormemente al rendimiento. Para obtener más información, consulta la [documentación oficial][9].

##### Inyectar trace_id en tus logs de base de datos

Inyecta `trace_id` en la mayoría de tus logs de base de datos con [comentarios SQL][10]. El siguiente es un ejemplo con Flask y SQLAlchemy:

```python
if os.environ.get('DD_LOGS_INJECTION') == 'true':
    from ddtrace import tracer
    from sqlalchemy.engine import Engine
    from sqlalchemy import event

    @event.listens_for(Engine, "before_cursor_execute", retval=True)
    def comment_sql_calls(conn, cursor, statement, parameters, context, executemany):
        trace_ctx = tracer.get_log_correlation_context()
        statement = f"{statement} -- dd.trace_id=<{trace_ctx['trace_id']}>"
        return statement, parameters
```

**Nota**: Esto sólo correlaciona logs que incluyen una declaración de consulta. Los errores de logs como `ERROR:  duplicate key value violates unique constraint "<TABLE_KEY>"` permanecen fuera de contexto. La mayoría de las veces puedes obtener información sobre errores a través de tus logs de aplicación.

Clona y personaliza el pipeline PostgreSQL:

1. Añade un nuevo [analizador grok][6]:
   ```text
   extract_trace %{data}\s+--\s+dd.trace_id=<%{notSpace:dd.trace_id}>\s+%{data}
   ```

2. Añade un [reasignador de ID de rastreo][7] en el atributo `dd.trace_id`.

El siguiente es un ejemplo de plan de ejecución de una consulta lenta a partir de una traza lenta:

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/slow-query-root-cause.png" alt="Correlación de logs de consulta lenta" style="width:100%;" >}}

## Correlacionar productos frontend

### Correlacionar logs de navegador con RUM y Session Replay

#### ¿Por qué?

Los [logs de navegador][11] de un evento RUM proporcionan contexto e información sobre un problema. En el siguiente ejemplo, los logs de navegador indican que la causa principal de la consulta errónea es un ID de usuario no válido.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/browser-logs-in-rum.png" alt="Logs de navegador en una acción RUM" style="width:100%;" >}}

Correlacionar tus logs de navegador con RUM también facilita la aplicación de [una agresiva estrategia de muestreo sin pérdida de coherencia a nivel de la entidad][2] mediante el uso de atributos como `session_id` y `view.id`.

#### ¿Cómo?

Los logs de navegador y los eventos RUM se correlacionan automáticamente. Para obtener más información, consulta [Facturación de RUM y Session Replay][12]. Debes [hacer coincidir las configuraciones entre los SDK de navegador RUM y los SDK de logs][13].

## Correlacionar la experiencia del usuario con el comportamiento del servidor

Las monitorizaciones backend y frontend tradicionales están aisladas y pueden requerir flujos de trabajo separados para solucionar problemas en toda la pila. Las correlaciones de pila completa de Datadog te permiten identificar la causa raíz, ya sea que provenga de un problema con el navegador o de un tiempo de inactividad en una base de datos, y calcular su impacto en el usuario.

En esta sección se explica cómo habilitar estas correlaciones:

* [Correlacionar vistas de RUM con trazas](#correlate-rum-views-with-traces)
* [Aprovechar la correlación de trazas para solucionar problemas de tests Synthetic](#leverage-trace-correlation-to-troubleshoot-synthetic-tests)

### Correlacionar vistas de RUM con trazas

#### ¿Por qué?

La integración de APM con RUM y Session Replay te permite ver datos frontend y backend en una sola lente, además de:

* Localizar rápidamente los problemas en cualquier punto de la pila, incluido el frontend.
* Comprender plenamente lo que experimentan tus usuarios

#### ¿Cómo?

Puedes acceder a las vistas de RUM en el [Explorador de trazas][14] y a las trazas de APM en el [Explorador RUM][15]. Para obtener más información, consulta [Conectar RUM y trazas][16]. 

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/trace-details-rum.png" alt="Información RUM en una traza" style="width:100%;" >}}

No existe una correlación directa entre las vistas de RUM y los logs del servidor. Para ver eventos RUM en un log y logs en un evento RUM, haz clic en la pestaña **Traces** (Trazas). 

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/rum-action-server-logs.png" alt="Vista previa de logs en la traza de una acción RUM" style="width:100%;" >}}

### Aprovechar la correlación de trazas para solucionar problemas en tests Synthetic 

#### ¿Por qué?

La integración de APM con la monitorización Synthetic te permite navegar desde la ejecución fallida de un test hasta la causa raíz del problema a través de la traza generada por el test.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/synthetic-trace-root-cause.png" alt="Causa raíz del fallo de un test Synthetic" style="width:100%;" >}}

Obtener datos específicos relacionados con la red a partir de tu test, además de información de backend, de infraestructura, de logs a partir de tu traza y de eventos RUM (sólo para [tests de navegador][17]) te permite acceder a detalles adicionales sobre el comportamiento de tu aplicación y la experiencia del usuario.

#### ¿Cómo?

Después de habilitar APM en el endpoint de tu aplicación, puedes acceder a las trazas de APM en la [página de monitorización Synthetic y ejecución permanente de tests][18]. 

Para obtener más información, consulta [Conectar tests Synthetic y trazas][19].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging
[2]: /es/logs/indexes/#sampling-consistently-with-higher-level-entities
[3]: /es/tracing/other_telemetry/connect_logs_and_traces
[4]: /es/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
[5]: /es/tracing/trace_collection/proxy_setup/?tab=nginx
[6]: /es/logs/log_configuration/processors/#grok-parser
[7]: /es/logs/log_configuration/processors/#trace-remapper
[8]: /es/integrations/postgres/?tab=host#log-collection
[9]: https://www.postgresql.org/docs/13/auto-explain.html
[10]: https://www.postgresql.org/docs/13/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS
[11]: /es/logs/log_collection/javascript/
[12]: /es/account_management/billing/rum/#how-do-you-view-logs-from-the-browser-collector-in-rum
[13]: /es/real_user_monitoring/browser/setup/#initialization-parameters
[14]: https://app.datadoghq.com/apm/traces
[15]: https://app.datadoghq.com/rum/explorer
[16]: /es/real_user_monitoring/platform/connect_rum_and_traces
[17]: /es/synthetics/browser_tests/
[18]: https://app.datadoghq.com/synthetics/tests
[19]: /es/synthetics/apm
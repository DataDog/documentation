---
code_lang: python
code_lang_weight: 10
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
  tag: Documentation
  text: 'Rastreo de aplicaciones Python '
- link: /tracing/other_telemetry/connect_logs_and_traces/python/
  tag: Documentation
  text: Correlación de logs y trazas de Python
title: Instrumentación de un trabajo Python Cloud Run
type: multi-code-lang
---

## Ajuste

<div class="alert alert-info">Una aplicación de ejemplo está <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-jobs/python">disponible en GitHub</a>.</div>
<div class="alert alert-info">
Para obtener una visibilidad completa y acceso a todas las funciones de Datadog en Cloud Run Jobs, asegúrese de haber <a href="http://localhost:1313/integrations/google_cloud_platform/">instalado la integración</a> de Google Cloud y de estar utilizando la versión 1.9.0 o posterior de <a href="https://hub.docker.com/r/datadog/serverless-init">inicio sin servidor</a>.
</div>

1. Instala el rastreador Python de Datadog.

   Añade `ddtrace` a tu `requirements.txt` o `pyproject.toml`. Puedes encontrar la última versión en [PyPI][1]: {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}} ddtrace==<VERSION> {{< /code-block >}}

   Alternativamente, puede instalar el trazador en su Dockerfile: {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}} RUN pip install ddtrace {{< /code-block >}}

   Luego, envuelva su comando start con `ddtrace-run`: {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}} CMD ["ddtrace-run", "python", "app.py"] {{< /code-block >}}

   **NOTA:** Cloud Run Jobs se ejecuta hasta completarse en lugar de servir solicitudes, por lo que la instrumentación automática no creará un lapso de "trabajo" de alto nivel. Para una visibilidad de extremo a extremo, cree su propio tramo raíz. Consulte las instrucciones [de Python Custom Instrumentation][2].

   Para obtener más información, consulte [Rastreo de aplicaciones][3] Python.

2. **Instale serverless-init**.

   | ---------------------------------- | ----------------------------------- |

3. **Configura troncos**.

   Para habilitar el registro, establezca la variable de entorno `DD_LOGS_ENABLED=true`. Esto permite a los `serverless-init` leer registros de stdout y stderr.

   Datadog también recomienda las siguientes variables de entorno:
   - `ENV PYTHONUNBUFFERED=1`: Asegúrese de que las salidas de Python aparezcan inmediatamente en los registros de contenedores en lugar de almacenarse en búfer.
   - `ENV DD_LOGS_INJECTION=true`: Habilite la correlación registro/trazo para los registradores compatibles.
   - `ENV DD_SOURCE=python`: Habilite el análisis avanzado de registros de Datadog.

   Si desea que los registros multilínea se conserven en un solo mensaje de registro, Datadog recomienda escribir sus registros en formato JSON. Por ejemplo, puede utilizar una biblioteca de registro de terceros como `structlog`: {{< code-block lang="python" disable_copy="false" >}} import structlog

def tracer_injection(logger, log_method, event_dict): event_dict.update(tracer.get_log_correlation_context()) return event_dict

structlog.configure( processors=[ tracer_injection, structlog.processors.EventRenamer("msg"), structlog.processors.JSONRenderer() ], logger_factory=structlog.WriteLoggerFactory(file=sys.stdout), )

logger = structlog.get_logger()

logger.info("Hola mundo!") {{< /code-block >}}

   Para obtener más información, consulte [Correlacionar registros y rastros][4] de Python.

4. Configurar la aplicación

| ---------------------------------- | ----------------------------------- |

5. | ---------------------------------- | ----------------------------------- |

6. | ---------------------------------- | ----------------------------------- |

7. Enviar métricas personalizadas

   Para enviar métricas personalizadas, [instale el cliente DogStatsD][5] y [vea ejemplos de][6] código. En serverless, solo se admite el tipo de métrica de *distribución*.

| ---------------------------------- | ----------------------------------- |

## Solucionar problemas

| ---------------------------------- | ----------------------------------- |

## Leer más

| ---------------------------------- | ----------------------------------- |

[1]: https://pypi.org/project/ddtrace/
[2]: /es/tracing/trace_collection/custom_instrumentation/python/dd-api?tab=decorator
[3]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/python/
[5]: /es/developers/dogstatsd/?tab=python#install-the-dogstatsd-client
[6]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5
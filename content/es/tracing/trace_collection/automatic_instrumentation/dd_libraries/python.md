---
aliases:
- /es/tracing/python/
- /es/tracing/languages/python/
- /es/agent/apm/python/
- /es/tracing/setup/python
- /es/tracing/setup_overview/python
- /es/tracing/setup_overview/setup/python
- /es/tracing/trace_collection/dd_libraries/python/
code_lang: Python
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-trace-py
  tag: Código fuente
  text: Código fuente
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: Sitio externo
  text: Documentos API
- link: tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
- link: tracing/
  tag: Documentación
  text: Uso avanzado
title: Rastreo de aplicaciones Python
type: lenguaje de código múltiple
---
## Requisitos de compatibilidad
Para ver la lista completa de compatibilidad de versiones Python y de marcos de Datadog (incluidas las versiones heredadas y de mantenimiento), consulta la página de [requisitos de compatibilidad][1].

## Para empezar

Antes de empezar, asegúrate de haber [instalado y configurado el Agent][13].

### Instrumentación de tu aplicación

Después de instalar y configurar tu Datadog Agent, el siguiente paso es añadir la biblioteca de rastreo directamente en la aplicación para instrumentarla. Consulta más bibliografía con [información sobre la compatibilidad][1].

Para empezar a rastrear aplicaciones escritas en Python, instala la biblioteca de rastreo de Datadog, `ddtrace`, utilizando pip:

```python
pip install ddtrace
```

**Nota:** Este comando requiere la versión de pip `18.0.0` o superior. Para Ubuntu, Debian, u otro gestor de paquetes, actualiza tu versión de pip con el siguiente comando:

```python
pip install --upgrade pip
```

A continuación, para instrumentar tu aplicación Python utiliza el comando incluido `ddtrace-run`. Para utilizarlo, coloca `ddtrace-run` delante del comando de punto de entrada de Python.

Por ejemplo, si tu aplicación se inicia con `python app.py` entonces:

```shell
ddtrace-run python app.py
```

Una vez que hayas terminado la configuración y estés ejecutando el rastreador con tu aplicación, puedes ejecutar `ddtrace-run --info` para comprobar que las configuraciones funcionan como se espera. Ten en cuenta que el resultado de este comando no refleja los cambios de configuración realizados durante el tiempo de ejecución en el código.

## Configuración

Si es necesario, configura la biblioteca de rastreo para que envíe datos de telemetría sobre el rendimiento de la aplicación, incluida la configuración del etiquetado unificado de servicios. Para ver más detalles, consulta la [configuración de bibliotecas][3].

La conexión para trazas también puede configurarse en código:

```python
from ddtrace import tracer

# Sockets de red
tracer.configure(
    https=False,
    hostname="custom-hostname",
    port="1234",
)

# Configuración del socket de dominio Unix
tracer.configure(
    uds_path="/var/run/datadog/apm.socket",
)
```

La conexión para estadísticas también puede configurarse en código:

```python
from ddtrace import tracer

# Socket de red
tracer.configure(
  dogstatsd_url="udp://localhost:8125",
)

# Configuración del socket de dominio Unix
tracer.configure(
  dogstatsd_url="unix:///var/run/datadog/dsd.socket",
)
```

### Actualización a v1

Si estás actualizando a ddtrace v1, revisa la [guía de actualización][4] y las [notas de la versión][5] en la documentación de biblioteca para ver todos los detalles.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /es/tracing/trace_collection/library_config/python/
[4]: https://ddtrace.readthedocs.io/en/stable/upgrading.html#upgrade-0-x
[5]: https://ddtrace.readthedocs.io/en/stable/release_notes.html#v1-0-0
[11]: /es/tracing/trace_collection/library_injection_local/
[13]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
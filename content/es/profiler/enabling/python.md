---
aliases:
- /es/tracing/profiler/enabling/python/
code_lang: python
code_lang_weight: 20
further_reading:
- link: getting_started/profiler
  tag: Documentación
  text: Empezando con el generador de perfiles
- link: profiler/profile_visualizations
  tag: Documentación
  text: Más información sobre las visualizaciones de perfiles disponibles
- link: profiler/profiler_troubleshooting/python
  tag: Documentación
  text: Solucionar los problemas que surjan al utilizar el generador de perfiles
title: Activación de Python Profiler
type: multi-code-lang
---

El generador de perfiles se incluye en las bibliotecas de rastreo de Datadog. Si ya estás utilizando [APM para recopilar trazas (traces)][1] para tu aplicación, puedes omitir la instalación de librería e ir directamente a habilitar el generador de perfiles.

## Requisitos

Para obtener un resumen de las versiones mínimas y recomendadas del tiempo de ejecución y del rastreador en todos los lenguajes, consulta [Versiones de lenguaje y rastreadores compatibles][14].

Datadog Profiler requiere Python 2.7+.

Las siguientes funciones de generación de perfiles están disponibles según tu versión de Python. Para más detalles, consulta [Tipos de perfiles][8]:

|      Función         | Versiones compatibles de Python           |
|----------------------|------------------------------------|
| Perfiles de tiempo real  | Python 2.7+                      |
| Perfiles de tiempo de CPU   | Python 2.7+ en plataformas POSIX   |
| Perfiles de excepción  | Python 3.7+ en plataformas POSIX   |
| Perfiles de bloqueo       | Python 2.7+                      |
| Perfiles de memoria     | Python 3.5+                      |

La instalación requiere pip versión 18 o posterior.

Las siguientes funciones de generación de perfiles están disponibles en las siguientes versiones mínimas de la librería `dd-trace-py`:

| Función                  | Versión requerida de `dd-trace-py`  |
|--------------------------|--------------------------------|
| [Hotspots de código][12]      | 0.44.0+                        |
| [Perfiles de endpoint][13] | 0.54.0+                        |

## Instalación

Asegúrate de que Datadog Agent v6+ está instalado y en funcionamiento. Datadog recomienda utilizar [Datadog Agent v7+][2].

Instala `ddtrace`, que proporciona funciones de rastreo y generación de perfiles:

```shell
pip install ddtrace
```

**Nota**: La generación de perfiles requiere la versión 0.40+ de la librería `ddtrace`.

Si utilizas una plataforma en la que no está disponible la distribución binaria de `ddtrace`, instala primero una versión de entorno de desarrollo.

Por ejemplo, en Alpine Linux, esto se puede hacer con:
```shell
apk install gcc musl-dev linux-headers
```

## Uso

Para general un perfil automáticamente de tu código, establece la variable de entorno `DD_PROFILING_ENABLED` en `true` cuando utilices `ddtrace-run`:

    DD_PROFILING_ENABLED=true \
    DD_ENV=prod \
    DD_SERVICE=my-web-app \
    DD_VERSION=1.0.3 \
    ddtrace-run python app.py

Consulta [Configuración](#configuration) para un uso más avanzado.

Opcionalmente, configura [la integración de código fuente][4] para conectar tus datos de perfiles con tus repositorios Git.

Tras un par de minutos, visualizarás tus perfiles en la página [Datadog APM > Generador de perfiles][5].

Si deseas controlar manualmente el ciclo de vida del generador de perfiles, utiliza el objeto `ddtrace.profiling.Profiler`:

```python
from ddtrace.profiling import Profiler

prof = Profiler(
    env="prod",  # si no se especifica, vuelve la variable de entorno DD_ENV
    service="my-web-app",  # si no se especifica, vuelve la variable de entorno DD_SERVICE
    version="1.0.3",   # si no se especifica, vuelve la variable de entorno DD_VERSION
)
prof.start()  # Debe estar lo más antes posible, por ejemplo, antes de otras importaciones, para asegurar que todo se incluya en el perfil
```

## Advertencias

Cuando tu proceso se bifurca con `os.fork`, el generador de perfiles debe iniciarse en
el proceso secundario. En Python 3.7+, esto se hace automáticamente. En Python < 3.7,
es necesario iniciar manualmente un nuevo generador de perfiles en tu proceso secundario:

```python
# Para usuarios de ddtrace-run, llama a esto en tu proceso secundario
ddtrace.profiling.auto.start_profiler()  # Debe estar lo más antes posible, por ejemplo, antes de otras importaciones, para asegurar que todo se incluya en el perfil

# Alternativamente, para la instrumentación manual,
# crea un nuevo generador de perfiles en tu proceso secundario:
from ddtrace.profiling import Profiler

prof = Profiler(...)
prof.start()  # Debe estar lo más antes posible, por ejemplo, antes de otras importaciones, para asegurar que todo se incluya en el perfil
```

## Configuración

Puedes configurar el generador de perfiles con las [variables de entorno][6].

### Procedencia del código

El generador de perfiles de Python admite informes de procedencia del código, lo que permite
 comprobar que la librería está ejecutando el código. Aunque está
desactivado por defecto, se puede activar mediante la configuración de
`DD_PROFILING_ENABLE_CODE_PROVENANCE=1`.

## ¿No sabes qué hacer a continuación?

La guía [Empezando con el generador de perfiles][7] toma un ejemplo de servicio con un problema de rendimiento y te muestra cómo utilizar Continuous Profiler para comprender y solucionar el problema.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[4]: /es/integrations/guide/source-code-integration/?tab=python
[5]: https://app.datadoghq.com/profiling
[6]: https://ddtrace.readthedocs.io/en/stable/configuration.html#configuration
[7]: /es/getting_started/profiler/
[8]: /es/profiler/profile_types/?code-lang=python
[12]: /es/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /es/profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[14]: /es/profiler/enabling/supported_versions/

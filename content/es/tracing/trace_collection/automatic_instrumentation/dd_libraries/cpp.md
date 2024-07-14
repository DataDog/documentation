---
aliases:
- /es/tracing/cpp/
- /es/tracing/languages/cpp/
- /es/agent/apm/cpp/
- /es/tracing/setup/cpp
- /es/tracing/setup_overview/cpp
- /es/tracing/setup_overview/setup/cpp
- /es/tracing/trace_collection/dd_libraries/cpp
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-cpp
  tag: Código fuente
  text: Código fuente
- link: /tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
- link: /tracing/
  tag: Documentación
  text: Uso avanzado
kind: documentación
title: Rastreo de de aplicaciones C++
type: lenguaje de código múltiple
---

<div class="alert alert-warning">
 <strong>Nota:</strong> C++ no proporciona integraciones para la instrumentación automática, pero es utilizado por el rastreo de proxy como <a href="/tracing/setup/envoy/">Envoy</a> y <a href="/tracing/setup/nginx/">Nginx</a>.
</div>

## Requisitos de compatibilidad
La biblioteca de rastreo de C++ requiere la cadena de herramientas C++17 para su compilación. Para obtener la lista completa de los requisitos de compatibilidad de la biblioteca de rastreo y de la arquitectura del procesador de Datadog, consulta la página de [requisitos de compatibilidad][3].

## Para empezar
Antes de empezar, asegúrate de haber [instalado y configurado el Agent][12].

## Instrumentación de tu aplicación

La siguiente es una aplicación de ejemplo que puede utilizarse para probar `dd-trace-cpp`.
Esta aplicación crea una instancia de trazador con parámetros predeterminados y genera una traza (trace) con dos tramos (spans), que se informa con el nombre de servicio `my-service` .

```cpp
// tracer_example.cpp
#include <datadog/span_config.h>
#include <datadog/tracer.h>
#include <datadog/tracer_config.h>

#include <iostream>
#include <string>

namespace dd = datadog::tracing;

int main() {
  dd::TracerConfig config;
  config.service = "my-service";

  const auto validated_config = dd::finalize_config(config);
  if (!validated_config) {
    std::cerr << validated_config.error() << '\n';
    return 1;
  }

  dd::Tracer tracer{*validated_config};
  // Create some spans.
  {
    auto span_a = tracer.create_span();
    span_a.set_name("A");
    span_a.set_tag("tag", "123");
    auto span_b = span_a.create_child();
    span_b.set_name("B");
    span_b.set_tag("tag", "value");
  }

  return 0;
}
```

{{< tabs >}}

{{% tab "CPM" %}}

[CPM.cmake][1] es un script CMake multiplataforma que añade capacidades de gestión de dependencias a CMake.

````CMake
# En un CMakeLists.txt

CPMAddPackage("gh:DataDog/dd-trace-cpp#0.2.1")

# Agrega el destino `tracer_example`
add_executable(tracer_example tracer_example.cpp)

# Vincula estadísticamente con `dd-trace-cpp`
# NOTA: Para vincular estadísticamente con `dd-trace-cpp` utiliza el destino `dd_trace::shared`
target_link_libraries(tracer_example dd_trace::static)
````

Crea el ejemplo utilizando los siguientes comandos:

```bash
cmake -B build .
cmake --build build --target tracer_example -j

./build/tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
```

[1]: https://github.com/cpm-cmake/CPM.cmake
{{% /tab %}}

{{% tab "CMake" %}}
Para integrar la biblioteca `dd-trace-cpp` en tu proyecto C++ utilizando CMake, sigue estos pasos:
````CMake
include(FetchContent)

FetchContent_Declare(
  dd-trace-cpp
  GIT_REPOSITORY https://github.com/DataDog/dd-trace-cpp
  GIT_TAG        v0.2.0
  GIT_SHALLOW    ON
  GIT_PROGRESS   ON
)

FetchContent_MakeAvailable(dd-trace-cpp)

# Agrega el destino `tracer_example`
add_executable(tracer_example tracer_example.cpp)

# Vincula estadísticamente con `dd-trace-cpp`
# NOTA: Para vincular estadísticamente con `dd-trace-cpp` utiliza el destino `dd_trace_cpp_shared`
target_link_libraries(tracer_example dd_trace::static)
````

Crea el ejemplo utilizando los siguientes comandos:

```bash
cmake -B build .
cmake --build build --target tracer_example -j

./build/tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
```

{{% /tab %}}

{{% tab "Manual" %}}

Para descargar e instalar manualmente la biblioteca `dd-trace-cpp`, ejecuta el siguiente script bash:
```bash
# Requiere el comando "jq", que puede instalarse a través de
# el gestor de paquetes:
#   - APT: `apt install jq`
#   - APK: `apk add jq`
#   - YUM: `yum install jq`
if ! command -v jq >/dev/null 2>&1; then
  >&2 echo "jq command not found. Install using the local package manager."
  exit 1
fi

# Obtiene el número de versión del último lanzamiento desde GitHub.
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}

DD_TRACE_CPP_VERSION="$(get_latest_release DataDog/dd-trace-cpp)"

# Descarga e instala la biblioteca dd-trace-cpp.
wget https://github.com/DataDog/dd-trace-cpp/archive/${DD_TRACE_CPP_VERSION}.tar.gz -O dd-trace-cpp.tar.gz
mkdir dd-trace-cpp && tar zxvf dd-trace-cpp.tar.gz -C ./dd-trace-cpp/ --strip-components=1
cd dd-trace-cpp

# Descarga e instala la versión correcta de dd-trace-cpp.
# Configura el proyecto, créalo e instálalo.
cmake -B build .
cmake --build build -j
cmake --install build
```

Por defecto, `cmake --install` coloca los encabezados compartidos públicos y de bibliotecas en los directorios apropiados del sistema (por ejemplo, `/usr/local/[...]`).
Para instalarlos en una localización específica, utiliza `cmake --install build --prefix <INSTALL_DIR>`.

### Vinculación dinámica
Vincula a `libdd_trace_cpp.so`, asegurándote de que la biblioteca compartids está en `LD_LIBRARY_PATH`.

````bash
clang -std=c++17 -o tracer_example tracer_example.cpp -ldd_trace_cpp
./tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
````

{{% /tab %}}

{{< /tabs >}}

## Configuración

Si es necesario, configura la biblioteca de rastreo para que envíe datos de telemetría sobre el rendimiento de la aplicación, según sea necesario, incluida la configuración del etiquetado unificado de servicios. Para ver más detalles, consulta la [configuración de bibliotecas][4].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/proxy_setup/?tab=envoy
[2]: /es/tracing/trace_collection/proxy_setup/?tab=nginx
[3]: /es/tracing/trace_collection/compatibility/cpp/
[4]: https://app.datadoghq.com/apm/service-setup
[5]: /es/tracing/trace_collection/library_config/cpp/
[6]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
---
aliases:
- /es/tracing/cpp/
- /es/tracing/languages/cpp/
- /es/agent/apm/cpp/
- /es/tracing/setup/cpp
- /es/tracing/setup_overview/cpp
- /es/tracing/setup_overview/setup/cpp
- /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/cpp
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-cpp
  tag: Código fuente
  text: Código fuente
- link: /tracing/glossary/
  tag: Documentación
  text: Explore sus servicios, recursos y trazas
- link: /tracing/
  tag: Documentación
  text: Uso avanzado
- link: https://learn.datadoghq.com/courses/configure-manage-apm-sdk
  tag: Centro de aprendizaje
  text: Configure y administre el SDK de APM para sus aplicaciones
title: Rastreo de aplicaciones C++
type: multi-code-lang
---
<div class="alert alert-danger">
  <strong>Nota:</strong> C++ no proporciona integraciones para la instrumentación automática, pero se utiliza en la traza de proxy, como <a href="/tracing/setup/envoy/">Envoy</a> y <a href="/tracing/setup/nginx/">Nginx</a>.
</div>

## Requisitos de compatibilidad {#compatibility-requirements}
El SDK de C++ requiere una cadena de herramientas C++17 para compilar. Para obtener una lista completa de los requisitos de compatibilidad del SDK de Datadog y la compatibilidad con la arquitectura del procesador, visite la página [Requisitos de compatibilidad][3].

## Primeros pasos {#getting-started}
Antes de comenzar, asegúrese de haber [instalado y configurado el Agent][6].

## Instrumente su aplicación {#instrument-your-application}

Aquí hay una aplicación de ejemplo que se puede usar para realizar pruebas `dd-trace-cpp`.
Esta aplicación crea una instancia de rastreador con la configuración predeterminada y genera una traza con dos segmentos, la cual se reporta bajo el nombre de servicio `my-service`.

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

[CPM.cmake][1] es un script de CMake multiplataforma que añade capacidades de gestión de dependencias a CMake.

````CMake
# In a CMakeLists.txt 

CPMAddPackage("gh:DataDog/dd-trace-cpp#1.0.0")

# Add `tracer_example` target 
add_executable(tracer_example tracer_example.cpp)

# Statically link against `dd-trace-cpp` 
# NOTE: To dynamically link against `dd-trace-cpp` use the `dd_trace::shared` target 
target_link_libraries(tracer_example dd_trace::static)
````

Compile el ejemplo usando los siguientes comandos:

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Release .
cmake --build build --target tracer_example -j

./build/tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
```

[1]: https://github.com/cpm-cmake/CPM.cmake
{{% /tab %}}

{{% tab "CMake" %}}
Para integrar la biblioteca `dd-trace-cpp` en su proyecto de C++ usando CMake, siga estos pasos:
````CMake
include(FetchContent)

FetchContent_Declare(
  dd-trace-cpp
  GIT_REPOSITORY https://github.com/DataDog/dd-trace-cpp
  GIT_TAG        v1.0.0
  GIT_SHALLOW    ON
  GIT_PROGRESS   ON
)

FetchContent_MakeAvailable(dd-trace-cpp)

# Add `tracer_example` target 
add_executable(tracer_example tracer_example.cpp)

# Statically link against `dd-trace-cpp` 
# NOTE: To dynamically link against `dd-trace-cpp` use the `dd_trace_cpp_shared` target 
target_link_libraries(tracer_example dd_trace::static)
````

Compile el ejemplo usando los siguientes comandos:

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Release .
cmake --build build --target tracer_example -j

./build/tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
```

{{% /tab %}}

{{% tab "Manual" %}}

Para descargar e instalar manualmente la biblioteca `dd-trace-cpp`, ejecute el siguiente script de bash:

```bash
# Requires the "jq" command, which can be installed via
# the package manager:
#   - APT: `apt install jq`
#   - APK: `apk add jq`
#   - YUM: `yum install jq`
if ! command -v jq >/dev/null 2>&1; then
  >&2 echo "jq command not found. Install using the local package manager."
  exit 1
fi

# Gets the latest release version number from GitHub.
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}

DD_TRACE_CPP_VERSION="$(get_latest_release DataDog/dd-trace-cpp)"

# Download and install dd-trace-cpp library.
wget https://github.com/DataDog/dd-trace-cpp/archive/${DD_TRACE_CPP_VERSION}.tar.gz -O dd-trace-cpp.tar.gz
mkdir dd-trace-cpp && tar zxvf dd-trace-cpp.tar.gz -C ./dd-trace-cpp/ --strip-components=1
cd dd-trace-cpp

# Download and install the correct version of dd-trace-cpp.
# Configure the project, build it, and install it.
cmake -B build .
cmake --build build -j
cmake --install build
```

De forma predeterminada, `cmake --install` coloca la biblioteca compartida y los encabezados públicos en los directorios del sistema apropiados (por ejemplo, `/usr/local/[...]`).
Para instalarlos en una ubicación específica, use `cmake --install build --prefix <INSTALL_DIR>` en su lugar.

### Enlace dinámico {#dynamic-linking}
Enlace con `libdd-trace-cpp.so` y asegúrese de que la biblioteca compartida esté en `LD_LIBRARY_PATH`.

````bash
clang -std=c++17 -o tracer_example tracer_example.cpp -ldd-trace-cpp
LD_LIBRARY_PATH=/usr/local/lib/ ./tracer_example
DATADOG TRACER CONFIGURATION - {"collector":{"config":{"event_scheduler":{"type":"datadog::tracing::ThreadedEventScheduler" ... }}}
````

{{% /tab %}}

{{< /tabs >}}

## Configuración {#configuration}

Si es necesario, configure el SDK para enviar datos de telemetría de rendimiento de la aplicación según lo requiera, incluyendo la configuración de Unified Service Tagging. Lea [Configuración de la biblioteca][5] para obtener detalles.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/proxy_setup/?tab=envoy
[2]: /es/tracing/trace_collection/proxy_setup/?tab=nginx
[3]: /es/tracing/trace_collection/compatibility/cpp/
[4]: https://app.datadoghq.com/apm/service-setup
[5]: /es/tracing/trace_collection/library_config/cpp/
[6]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
---
further_reading:
- link: /tracing/trace_collection/dd_libraries/cpp/
  tag: Documentación
  text: Más información sobre el rastreo de aplicaciones con C++
title: Configuración de APM con C++
---

## Información general

Esta guía amplía la [documentación de APM con C++][1] para proporcionar instrucciones paso a paso sobre cómo configurar una aplicación C++ con APM sencilla en tu VM para solucionar problemas.

## Configuración de tu caja

### Entorno básico

En primer lugar, rota la nueva caja `ubuntu/jammy64` de Vagrant y `ssh` en ella con:

```bash
vagrant init ubuntu/jammy64
vagrant up
vagrant ssh
```

A continuación, instala el Agent siguiendo las [instrucciones de la interfaz de usuario][2].

### Preparación para C++

Instala `g++` y `cmake` con:

```shell
sudo apt-get update
sudo apt-get -y install g++ cmake
```

Descarga e instala la biblioteca `dd-trace-cpp` con:

```shell
wget https://github.com/DataDog/dd-trace-cpp/archive/v0.2.0.tar.gz -O dd-trace-cpp.tar.gz
```

Si recibes un mensaje de tasa limitada de GitHub, espera unos minutos y vuelve a ejecutar el comando.

Una vez descargado el archivo `tar`, descomprímelo:

```bash
tar zxvf dd-trace-cpp.tar.gz -C ./dd-trace-cpp/ --strip-components=1
```

Por último, crea e instala la biblioteca:

```bash
cd dd-trace-cpp
cmake -B build .
cmake --build build -j
cmake --install build
```

## Crear una aplicación sencilla

Crea un nuevo archivo llamado `tracer_example.cpp` y rellénalo con el siguiente código:

```cpp
#include <datadog/tracer.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  datadog::tracing::TracerConfig tracer_config;
  tracer_config.service = "compiled-in example";

  const auto validated_config = dd::finalize_config(tracer_options);
  if (!validated_config) {
    std::cerr << validated_config.error() << '\n';
    return 1;
  }

  dd::Tracer tracer{*validated_config};

  // Crea algunos tramos.
  {
    datadog::tracing::SpanConfig options;
    options.name = "A";
    options.tags.emplace("tag", "123");
    auto span_a = tracer.create_span(options);

    auto span_b = span_a.create_child();
    span_b.set_name("B");
    span_b.set_tag("tag", "value");
  }

  return 0;
}
```

Esto crea un rastreador que genera dos tramos, un tramo primario `span_a` y un tramo secundario `span_b` , y los etiqueta.

A continuación, compila y vincula contra `libdd_trace_cpp` con:

```shell
g++ -std=c++17 -o tracer_example tracer_example.cpp -ldd_trace_cpp
```

Por último, ejecuta la aplicación con:

```shell
LD_LIBRARY_PATH=/usr/local/lib/ ./tracer_example
```

## Envío de trazas

Ahora que ya existe una aplicación, puedes empezar a enviar trazas y ver en acción el Trace Agent.

En primer lugar, supervisa el log del Trace Agent con:

```shell
tail -f /var/log/datadog/trace-agent.log
```

A continuación, abre una nueva pestaña y ejecuta el ejemplo un par de veces:

```shell
LD_LIBRARY_PATH=/usr/local/lib/ ./tracer_example
```

En la pestaña Trace Agent, verás algo parecido a:

```text
2019-08-09 20:02:26 UTC | TRACE | INFO | (pkg/trace/info/stats.go:108 in LogStats) | [lang:cpp lang_version:201402 tracer_version:0.2.0] -> traces received: 1, traces filtered: 0, traces amount: 363 bytes, events extracted: 0, events sampled: 0
```

A continuación, aparece el servicio en el Catálogo de servicios en Datadog.

{{< img src="tracing/guide/setting_up_APM_with_cpp/apm_services_page.png" alt="Página de servicios de APM" >}}

Haz clic en el servicio para ver tus trazas.

{{< img src="tracing/guide/setting_up_APM_with_cpp/traces_ui.png" alt="Interfaz de usuario de trazas de APM" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/setup/cpp/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=ubuntu
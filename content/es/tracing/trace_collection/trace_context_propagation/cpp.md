---
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitorizar aplicaciones instrumentadas con OpenTelemetry compatibles con
    el contexto de rastreo de W3C
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry con trazas de Datadog instrumentadas
kind: documentación
title: Propagación del contexto de rastreo de C++
type: lenguaje de código múltiple
---

## Información general

El rastreador de Datadog APM admite la extracción e inyección de encabezados [B3][11] y [W3C][1] para el rastreo distribuido.

La inyección y extracción de cabeceras distribuidas se controla mediante la configuración de estilos de inyección/extracción. Los estilos compatibles con C++ son:

- Datadog: `datadog`
- B3: `b3`
- W3C: `tracecontext`

### Configuración

{{< tabs >}}

{{% tab "Environment Variable" (Variable de entorno) %}}

#### Estilos de inyección

`DD_TRACE_PROPAGATION_STYLE_INJECT="datadog,b3"`

El valor de la variable de entorno es una lista separada por comas (o espacios) de los estilos de cabeceras que están habilitadas para la inyección. Los estilos de inyección por defecto son `datadog,tracecontext`.

#### Estilos de extracción

`DD_TRACE_PROPAGATION_STYLE_EXTRACT="datadog,b3"`

El valor de la variable de entorno es una lista separada por comas (o espacios) de los estilos de cabeceras que están habilitadas para la extracción. Los estilos de extracción por defecto son `datadog,tracecontext`.

{{% /tab %}}

{{% tab "Code" (Código) %}}

```cpp
#incluye <datadog/tracer_config.h>
#incluye <datadog/propagation_style.h>

namespace dd = datadog::tracing;
int main() {
  dd::TracerConfig config;
  config.service = "my-service";

  // `injection_styles` indica con qué sistemas de rastreo se rastrea la propagación
  // será compatible con la inyección (envío) de contextos de rastreo.
  // Todos los estilos indicados por `injection_styles` se utilizan para la inyección.
  // `injection_styles` es anulado por las variables de entorno `DD_TRACE_PROPAGATION_STYLE_INJECT`
  // y `DD_TRACE_PROPAGATION_STYLE`.
  config.injection_styles = {dd::PropagationStyle::DATADOG, dd::PropagationStyle::B3};

  // `extraction_styles` indica con qué sistemas de rastreo se rastrea la propagación
  // será compatible con la extracción (recepción) de contextos de rastreo.
  // Los estilos de extracción se aplican en el orden en que aparecen en
  // `extraction_styles`. El primer estilo que produce contextos de rastreo o
  // un error determina el resultado de la extracción.
  // `extraction_styles` es anulado por las variables de entorno
  // `DD_TRACE_PROPAGATION_STYLE_EXTRACT` y `DD_TRACE_PROPAGATION_STYLE`.
  config.extraction_styles = {dd::PropagationStyle::W3C};

  ...
}
```

{{% /tab %}}

{{< /tabs >}}

Si se habilitan varios estilos de extracción, los intentos de extracción se realizan en el orden en que están configurados estos estilos y se utiliza el primer valor extraído con éxito.

El parámetro por defecto de las inyecciones y extracciones para las versiones más recientes de la biblioteca es `datadog,tracecontext`.

### Extracción del contexto propagado
La extracción del contexto de propagación puede realizarse implementando una interfaz personalizada `DictReader` y llamando a `Tracer::extract_span` o a`Tracer::extract_or_create_span`.

La siguiente es una implementación para extraer el contexto de propagación de cabeceras HTTP:

```cpp
#incluye <datadog/dict_reader.h>
#incluye <datadog/optional.h>
#incluye <datadog/string_view.h>

#incluye <unordered_map>

namespace dd = datadog::tracing;

class HTTPHeadersReader : public datadog::tracing::DictReader {
  std::unordered_map<dd::StringView, dd::StringView> headers_;

public:
  HTTPHeadersReader(std::unordered_map<dd::StringView, dd::StringView> headers)
    : headers_(std::move(headers)) {}

  ~HTTPHeadersReader() override = default;

  // Devuelve el valor a la `key`especificada o devuelve`nullopt` si no hay
  // ningún valor en `key`.
  dd::Optional<dd::StringView> lookup(dd::StringView key) const override {
    auto found = headers_.find(key);
    if (found == headers_.cend()) return dd::nullopt;

    return found->second;
  }

  // Invoca el `visitor` especificado una vez por cada par clave-valor en este objeto.
  void visit(
      const std::function<void(dd::StringView key, dd::StringView value)>& visitor)
      const override {
      for (const auto& [key, value] : headers_) {
        visitor(key, value);
      }
  };
};

// Ejemplo de uso:
void handle_http_request(const Request& request, datadog::tracing::Tracer& tracer) {
  HTTPHeadersReader reader{request.headers};
  auto maybe_span = tracer.extract_span(reader);
  ..
}
```

### Inyectar contexto para el rastreo distribuido
La inyección de contexto de propagación puede realizarse implementando la interfaz `DictWriter` y llamando a `Span::inject` en una instancia de tramo (span).

```cpp
#incluye <datadog/dict_writer.h>
#incluye <datadog/string_view.h>

#incluye <string>
#incluye <unordered_map>

using namespace dd = datadog::tracing;

class HTTPHeaderWriter : public dd::DictWriter {
  std::unordered_map<std::string, std::string>& headers_;

public:
  explicit HTTPHeaderWriter(std::unordered_map<std::string, std::string>& headers) : headers_(headers) {}

  ~HTTPHeaderWriter() override = default;

  void set(dd::StringView key, dd::StringView value) override {
    headers_.emplace(key, value);
  }
};

// Ejemplo de uso:
void handle_http_request(const Request& request, dd::Tracer& tracer) {
  auto span = tracer.create_span();

  HTTPHeaderWriter writer(request.headers);
  span.inject(writer);
  // `request.headers` ahora rellenados con las cabeceras necesarias para propagar el tramo.
  ..
}
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/w3c/trace-context
[9]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[10]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
[11]: https://github.com/openzipkin/b3-propagation
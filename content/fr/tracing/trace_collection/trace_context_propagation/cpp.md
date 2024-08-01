---
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Surveiller les apps instrumentées avec OpenTelemetry grâce à la prise en charge
    du contexte des traces W3C
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentation
  text: Interopérabilité des traces instrumentées par l'API OpenTelemetry et par Datadog
title: Propagation du contexte des traces C++
type: multi-code-lang
---

## Présentation

Le traceur APM Datadog prend en charge l'extraction et l'injection des en-têtes [B3][11] et [W3C][1] pour le tracing distribué.

L'injection et l'extraction distribuées d'en-têtes sont contrôlées en configurant des styles d'injection/extraction. Les styles pris en charge pour C++ sont les suivants :

- Datadog : `datadog`
- B3 : `b3`
- W3C : `tracecontext`

### Configuration

{{< tabs >}}

{{% tab "Variable d'environnement" %}}

#### Styles d'injection

`DD_TRACE_PROPAGATION_STYLE_INJECT="datadog,b3"`

La variable d'environnement prend pour valeur une liste de styles d'en-tête séparés par des virgules (ou des espaces) qui sont activés pour l'injection. Les styles d'injection par défaut sont  `datadog,tracecontext`.

#### Styles d'extraction

`DD_TRACE_PROPAGATION_STYLE_EXTRACT="datadog,b3"`

La variable d'environnement prend pour valeur une liste de styles d'en-tête séparés par des virgules (ou des espaces) qui sont activés pour l'extraction. Les styles d'extraction par défaut sont  `datadog,tracecontext`.

{{% /tab %}}

{{% tab "Code" %}}

```cpp
#include <datadog/tracer_config.h>
#include <datadog/propagation_style.h>

namespace dd = datadog::tracing;
int main() {
  dd::TracerConfig config;
  config.service = "my-service";

  // `injection_styles` indique les systèmes de tracing compatibles avec la propagation
  // des traces lors de l'injection (l'envoi) du contexte des traces.
  // Tous les styles spécifiés via `injection_styles` sont utilisés pour l'injection.
  // `injection_styles` est remplacé par les variables d'environnement `DD_TRACE_PROPAGATION_STYLE_INJECT`
  // et `DD_TRACE_PROPAGATION_STYLE`.
  config.injection_styles = {dd::PropagationStyle::DATADOG, dd::PropagationStyle::B3};

  // `extraction_styles` indique les systèmes de tracing compatibles avec la propagation
  // des traces lors de l'extraction (la réception) du contexte des traces.
  // Les styles d'extraction sont appliqués dans l'ordre selon lequel ils apparaissent dans
  // `extraction_styles`. Le premier style qui génère du contexte de trace
  // ou une erreur détermine le résultat de l'extraction.
  // `extraction_styles` est remplacé par les variables d'environnement
  // `DD_TRACE_PROPAGATION_STYLE_EXTRACT` et `DD_TRACE_PROPAGATION_STYLE`.
  config.extraction_styles = {dd::PropagationStyle::W3C};

  ...
}
```

{{% /tab %}}

{{< /tabs >}}

Si plusieurs styles d'extraction sont activés, une tentative d'extraction est effectuée dans l'ordre selon lequel ces styles ont été configurés, et la première valeur extraite avec succès est utilisée.

Les paramètres d'injection et d'extraction par défaut dans les dernières versions de la bibliothèque sont  `datadog,tracecontext`.

### Extraire le contexte propagé
Pour extraire le contexte de propagation, implémentez une interface `DictReader` personnalisée et appelez `Tracer::extract_span` ou `Tracer::extract_or_create_span`.

L'implémentation suivante permet d'extraire le contexte de propagation à partir des en-têtes HTTP :

```cpp
#include <datadog/dict_reader.h>
#include <datadog/optional.h>
#include <datadog/string_view.h>

#include <unordered_map>

namespace dd = datadog::tracing;

class HTTPHeadersReader : public datadog::tracing::DictReader {
  std::unordered_map<dd::StringView, dd::StringView> headers_;

public:
  HTTPHeadersReader(std::unordered_map<dd::StringView, dd::StringView> headers)
    : headers_(std::move(headers)) {}

  ~HTTPHeadersReader() override = default;

  // Renvoyer la valeur associée à la `key` spécifiée, ou renvoyer `nullopt` si aucune
  // valeur n'est associée à `key`.
  dd::Optional<dd::StringView> lookup(dd::StringView key) const override {
    auto found = headers_.find(key);
    if (found == headers_.cend()) return dd::nullopt;

    return found->second;
  }

  // Invoquer le `visitor` spécifié une fois pour chaque paire key/value dans cet objet.
  void visit(
      const std::function<void(dd::StringView key, dd::StringView value)>& visitor)
      const override {
      for (const auto& [key, value] : headers_) {
        visitor(key, value);
      }
  };
};

// Exemple d'utilisation :
void handle_http_request(const Request& request, datadog::tracing::Tracer& tracer) {
  HTTPHeadersReader reader{request.headers};
  auto maybe_span = tracer.extract_span(reader);
  ..
}
```

### Injecter du contexte pour le tracing distribué
Pour injecter le contexte de propagation, implémentez l'interface `DictWriter` et appelez `Span::inject` sur une instance de span.

```cpp
#include <datadog/dict_writer.h>
#include <datadog/string_view.h>

#include <string>
#include <unordered_map>

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

// Exemple d'utilisation :
void handle_http_request(const Request& request, dd::Tracer& tracer) {
  auto span = tracer.create_span();

  HTTPHeaderWriter writer(request.headers);
  span.inject(writer);
  // `request.headers` contient désormais les en-têtes requis pour propager la span.
  ..
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/w3c/trace-context
[9]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[10]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
[11]: https://github.com/openzipkin/b3-propagation
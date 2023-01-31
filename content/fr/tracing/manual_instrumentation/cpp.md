---
title: Instrumentation manuelle C++
kind: documentation
decription: Instrumentez manuellement votre application C++ afin d'envoyer des traces personnalisées à Datadog.
further_reading:
  - link: tracing/guide/instrument_custom_method
    tag: Guide
    text: Instrumenter une méthode personnalisée pour analyser en détail votre logique opérationnelle
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/opentracing
    tag: Documentation
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
Pour instrumenter manuellement votre code, installez le traceur tel qu'indiqué dans les exemples de configuration, puis utilisez l'objet tracer pour créer des [spans][1].

```cpp
{
  // Créer une span racine.
  auto root_span = tracer->StartSpan("nom_opération");
  // Créer une span enfant.
  auto child_span = tracer->StartSpan(
      "nom_opération",
      {opentracing::ChildOf(&root_span->context())});
  // Les spans peuvent prendre fin à une heure donnée…
  child_span->Finish();
} // ... ou lors de leur destruction (root_span prend fin ici).
```

Vous pouvez effectuer un tracing distribué en [utilisant les méthodes `Inject` et `Extract` sur le traceur][2], qui accepte les [types `Reader` et `Writer` de base][3]. Vous devez utiliser l'échantillonnage prioritaire (activé par défaut) pour garantir l'envoi uniforme des spans.

```cpp
// Autorise l'écriture d'en-têtes de propagation sur une carte simple <string, string>.
// Copié depuis https://github.com/opentracing/opentracing-cpp/blob/master/mocktracer/test/propagation_test.cpp
struct HTTPHeadersCarrier : HTTPHeadersReader, HTTPHeadersWriter {
  HTTPHeadersCarrier(std::unordered_map<std::string, std::string>& text_map_)
      : text_map(text_map_) {}

  expected<void> Set(string_view key, string_view value) const override {
    text_map[key] = value;
    return {};
  }

  expected<void> ForeachKey(
      std::function<expected<void>(string_view key, string_view value)> f)
      const override {
    for (const auto& key_value : text_map) {
      auto result = f(key_value.first, key_value.second);
      if (!result) return result;
    }
    return {};
  }

  std::unordered_map<std::string, std::string>& text_map;
};

void example() {
  auto tracer = ...
  std::unordered_map<std::string, std::string> headers;
  HTTPHeadersCarrier carrier(headers);

  auto span = tracer->StartSpan("nom_opération");
  tracer->Inject(span->context(), carrier);
  // `headers` contient désormais les en-têtes requis pour propager la span.
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#spans
[2]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[3]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
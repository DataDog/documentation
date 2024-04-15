---
aliases:
- /fr/tracing/manual_instrumentation/cpp
- /fr/tracing/custom_instrumentation/cpp
- /fr/tracing/setup_overview/custom_instrumentation/cpp
code_lang: cpp
code_lang_weight: 50
description: Instrumentez manuellement votre application C++ afin d'envoyer des traces
  personnalisées à Datadog.
further_reading:
- link: tracing/connect_logs_and_traces
  tag: Documentation
  text: Associer vos logs à vos traces
- link: tracing/visualization/
  tag: Documentation
  text: Explorer vos services, ressources et traces

title: Instrumentation personnalisée C++
type: multi-code-lang
---

<div class="alert alert-info">
Si vous n'avez pas encore lu les instructions de configuration, commencez par les <a href="https://docs.datadoghq.com/tracing/setup/cpp/">Instructions de configuration pour C++</a>.
</div>

## Ajouter des tags

Ajoutez des [tags de span][1] personnalisés à vos [spans][2] pour personnaliser la visibilité sur vos applications dans Datadog. Les tags de span sont appliqués à vos traces entrantes, ce qui vous permet de corréler le comportement observé avec des informations au niveau du code, comme le niveau du commerçant, le montant du paiement ou l'ID de l'utilisateur.

Le tracing C++ fait appel aux « tags communs ». Ces tags peuvent provenir de [tags spécifiques à Datadog][3] ou de [tags OpenTracing][4], et être inclus comme suit :

```cpp
#include <opentracing/ext/tags.h>
#include <datadog/tags.h>
```

Notez que les tags Datadog sont nécessaires pour le [tagging de service unifié][5].

### Ajouter des tags de span personnalisés

Ajoutez directement des [tags][1] à un objet [span][2] en appelant `Span::SetTag`. Par exemple :

```cpp
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
span->SetTag("la clé doit être une chaîne", "Les valeurs correspondent aux types de variables");
span->SetTag("la clé doit être une chaîne", 1234);
```

Les valeurs correspondent au [type de variable][6] et peuvent être des objets complexes. Les valeurs sont sérialisées en tant que JSON, à l'exception d'une valeur de chaîne de caractères qui est sérialisée telle quelle (sans guillemets supplémentaires).

### Ajouter des tags à l'ensemble des spans

Afin de définir des tags pour toutes vos spans, définissez la variable d'environnement `DD_TAGS` en tant que liste de paires `key:value` séparées par des virgules.

### Définir des erreurs sur une span

Pour associer une span à une erreur, définissez un ou plusieurs tags d'erreur pour la span. Exemple :

```cpp
span->SetTag(opentracing::ext::error, true);
```

Autre exemple :

```cpp
span->SetTag("error", true);
```

Pour ajouter plus de détails à propos de l'erreur, définissez plusieurs des tags suivants : `error.msg`, `error.stack` et `error.type`. Consultez la section [Suivi des erreurs][7] pour en savoir plus sur les tags d'erreur.

Exemple d'utilisation de plusieurs tags d'erreur :

```cpp
// Associer cette span à l'erreur « bad file descriptor » générée par la bibliothèque
// standard.
span->SetTag("error.msg", "[EBADF] invalid file");
span->SetTag("error.type", "errno");
```

Lorsque vous ajoutez l'un des tags `error.msg`, `error.stack` ou `error.type`, `error` est défini sur `true`.

Pour qu'une span ne comporte plus d'erreur, définissez le tag `error` sur `false`. Cela supprime les tags `error.msg`, `error.stack` et `error.type` précédemment définis.

```cpp
// Supprimer les informations associées à cette span
span->SetTag("error", false);
```

## Ajout de tags

### Instrumenter manuellement une méthode

Pour instrumenter manuellement votre code, installez le traceur tel qu'indiqué dans les [exemples de configuration][8], puis utilisez l'objet tracer pour créer des [spans][2].

```cpp
{
  // Créer une span racine pour la requête active
  auto root_span = tracer->StartSpan("get_ingredients");
  // Définir un nom de ressource pour la span racine
  root_span->SetTag(datadog::tags::resource_name, "bologna_sandwich");
  // Créer une span enfant avec comme parent la span racine
  auto child_span = tracer->StartSpan(
      "cache_lookup",
      {opentracing::ChildOf(&root_span->context())});
  // Définir un nom de ressource pour la span enfant
  child_span->SetTag(datadog::tags::resource_name, "ingredients.bologna_sandwich");
  // Les spans peuvent être finalisées à une heure précise…
  child_span->Finish();
} // … ou lorsque le destructeur est invoqué.
  // Par exemple, root_span est finalisée ici.
```

### Injecter et extraire du contexte pour le tracing distribué

Vous pouvez effectuer un tracing distribué en [utilisant les méthodes `Inject` et `Extract` sur le traceur][9], qui acceptent les [types `Reader` et `Writer` de base][10]. Vous devez utiliser l'échantillonnage prioritaire (activé par défaut) pour garantir l'envoi uniforme des spans.

```cpp
// Permet l'écriture d'en-têtes de propagation sous forme de mappage simple <string, string>.
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

  auto span = tracer->StartSpan("operation_name");
  tracer->Inject(span->context(), carrier);
  // `headers` contient désormais les en-têtes requis pour propager la span.
}
```

## Configuration de l'Agent et du client de tracing

D'autres paramètres peuvent être configurés au niveau du client de tracing et de l'Agent Datadog pour la propagation en contexte avec les en-têtes B3, ainsi que pour empêcher des ressources spécifiques d'envoyer des traces à Datadog (si vous ne souhaitez pas que ces ces traces soient prises en compte pour le calcul des métriques, comme pour les checks de santé).

### Extraction et injection d'en-têtes B3

Le traceur de l'APM Datadog prend en charge [l'extraction et l'injection d'en-têtes B3][11] pour le tracing distribué.

L'injection et l'extraction distribuées d'en-têtes sont contrôlées en configurant des styles d'injection/extraction. Deux styles sont actuellement pris en charge :

- Datadog : `Datadog`
- B3 : `B3`

Les styles d'injection peuvent être configurés via :

- Variable d'environnement : `DD_PROPAGATION_STYLE_INJECT="Datadog B3"`

La variable d'environnement prend pour valeur une liste de styles d'en-tête séparés par des virgules (ou des espaces) qui sont activés pour l'injection. Par défaut, seul le style d'injection Datadog est activé.

Les styles d'extraction peuvent être configurés via :

- Variable d'environnement : `DD_PROPAGATION_STYLE_EXTRACT="Datadog B3"`

La variable d'environnement prend pour valeur une liste de styles d'en-tête séparés par des virgules (ou des espaces) qui sont activés pour l'extraction. Par défaut, seul le style d'extraction Datadog est activé.

Si plusieurs styles d'extraction sont activés, une tentative d'extraction est effectuée dans l'ordre selon lequel ces styles ont été configurés, et la première valeur extraite avec succès est utilisée.

### Filtrage de ressources

Il est possible d'exclure des traces en fonction de leur nom de ressource afin d'empêcher le trafic Synthetic (tel que les checks de santé) d'envoyer des traces à Datadog. Pour filtrer des ressources et configurer d'autres paramètres de sécurité et de personnalisation, accédez à la page [Sécurité][12].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/#span-tags
[2]: /fr/tracing/glossary/#spans
[3]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/include/datadog/tags.h
[4]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/ext/tags.h
[5]: /fr/getting_started/tagging/unified_service_tagging
[6]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/value.h
[7]: /fr/tracing/error_tracking/
[8]: /fr/tracing/setup/cpp/#installation
[9]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[10]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
[11]: https://github.com/openzipkin/b3-propagation
[12]: /fr/tracing/security

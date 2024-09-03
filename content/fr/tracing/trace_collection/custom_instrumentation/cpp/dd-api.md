---
aliases:
- /fr/tracing/manual_instrumentation/cpp
- /fr/tracing/custom_instrumentation/cpp
- /fr/tracing/setup_overview/custom_instrumentation/cpp
- /fr/tracing/trace_collection/custom_instrumentation/cpp
- /fr/tracing/trace_collection/custom_instrumentation/dd_libraries/cpp
description: Instrumentez manuellement votre application C++ afin d'envoyer des traces
  personnalisées à Datadog.
further_reading:
- link: tracing/connect_logs_and_traces
  tag: Documentation
  text: Associer vos logs à vos traces
- link: tracing/visualization/
  tag: Documentation
  text: Explorer vos services, ressources et traces
title: Instrumentation personnalisée C++ avec l'API Datadog
---

<div class="alert alert-info">
Si vous n'avez pas encore lu les instructions de configuration, commencez par les <a href="https://docs.datadoghq.com/tracing/setup/cpp/">Instructions de configuration pour C++</a>.
</div>

## Création de spans

Pour instrumenter manuellement une méthode :

```cpp
{
  // Créer une span racine pour la requête active.
  auto root_span = tracer.create_span();
  root_span.set_name("get_ingredients");
  // Définir un nom de ressource pour la span racine.
  root_span.set_resource_name("bologna_sandwich");
  // Créer une span enfant avec comme parent la span racine.
  auto child_span = root_span.create_child();
  child_span.set_name("cache_lookup");
  // Définir un nom de ressource pour la span enfant.
  child_span.set_resource_name("ingredients.bologna_sandwich");
  // Les spans peuvent être finalisées à une heure précise...
  child_span.set_end_time(std::chrono::steady_clock::now());
} // ... ou lorsque le destructeur est invoqué.
  // Par exemple, root_span est finalisée ici.
```

## Ajout de tags

Ajoutez des [tags de span][1] personnalisés à vos [spans][2] pour personnaliser la visibilité sur vos applications dans Datadog. Les tags de span sont appliqués à vos traces entrantes, ce qui vous permet de corréler le comportement observé avec des informations au niveau du code, comme le niveau du commerçant, le montant du paiement ou l'ID de l'utilisateur.

Notez que certains tags Datadog sont nécessaires pour le [tagging de service unifié][5].

{{< tabs >}}

{{% tab "Locally" %}}

### Installation manuelle

Ajoutez directement des tags à un objet span en appelant `Span::set_tag`. Par exemple :

```cpp
// Ajoutez directement des tags à une span en appelant `Span::set_tag`
auto span = tracer.create_span();
span.set_tag("la clé doit être une chaîne", "la valeur doit aussi être une chaîne");

// Autrement, ajoutez des tags en configurant un `SpanConfig`
datadog::tracing::SpanConfig opts;
opts.tags.emplace("team", "apm-proxy");
auto span2 = tracer.create_span(opts);
```

{{% /tab %}}

{{% tab "Ajout global" %}}

### Variable d'environnement

Afin de définir des tags pour toutes vos spans, définissez la variable d'environnement `DD_TAGS` en tant que liste de paires `key:value` séparées par des virgules.

```
export DD_TAGS=team:apm-proxy,key:value
```

### Installation manuelle

```cpp
datadog::tracing::TracerConfig tracer_config;
tracer_config.tags = {
  {"team", "apm-proxy"},
  {"apply", "on all spans"}
};

const auto validated_config = datadog::tracing::finalize_config(tracer_config);
auto tracer = datadog::tracing::Tracer(*validated_config);

// Toutes les nouvelles spans possèdent des tags définis dans `tracer_config.tags`
auto span = tracer.create_span();
```

{{% /tab %}}

{{< /tabs >}}

### Définir des erreurs sur une span

Pour associer une span à une erreur, définissez un ou plusieurs tags d'erreur pour la span. Exemple :

```cpp
span.set_error(true);
```

Pour ajouter plus de détails à propos de l'erreur, définissez n'importe quelle combinaison des tags `error.message`, `error.stack` ou `error.type` en utilisant `Span::set_error_message`, `Span::set_error_stack` et `Span::set_error_type` respectivement. Consultez la section [Suivi des erreurs][4] pour en savoir plus sur les tags d'erreur.

Exemple d'utilisation de plusieurs tags d'erreur :

```cpp
// Associer cette span à l'erreur « bad file descriptor » générée par la bibliothèque
// standard.
span.set_error_message("error");
span.set_error_stack("[EBADF] invalid file");
span.set_error_type("errno");
```

<div class="alert alert-info">
L'utilisation d'une des `Span::set_error_*` entraîne un appel sous-jacent à `Span::set_error(true)`.
</div>

Pour annuler la définition d'une erreur sur une span, définissez `Span::set_error` sur `false`, ce qui supprime toute combinaison de `Span::set_error_stack`, `Span::set_error_type` ou `Span::set_error_message`.

```cpp
// Supprimer les informations associées à cette span
span.set_error(false);
```

## Propager le contexte avec l'injection et l'extraction d'en-têtes

Vous pouvez injecter et extraire des en-têtes afin de configurer la propagation du contexte des traces distribuées. Consultez la [section dédiée][5] pour en savoir plus.

## Filtrage de ressources

Il est possible d'exclure des traces en fonction de leur nom de ressource, afin d'empêcher le trafic Synthetic (tel que les checks de santé) d'envoyer des traces et d'influencer les métriques de traces. Pour en savoir plus à ce sujet et sur la configuration d'autres paramètres de sécurité et de personnalisation, consultez la page relative à la [sécurité][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/#span-tags
[2]: /fr/tracing/glossary/#spans
[3]: /fr/getting_started/tagging/unified_service_tagging
[4]: /fr/tracing/error_tracking/
[5]: /fr/tracing/trace_collection/trace_context_propagation/
[6]: /fr/tracing/security
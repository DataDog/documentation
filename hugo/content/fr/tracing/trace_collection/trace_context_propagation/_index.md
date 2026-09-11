---
aliases:
- /fr/tracing/trace_collection/trace_context_propagation/cpp
- /fr/tracing/trace_collection/trace_context_propagation/dotnet
- /fr/tracing/trace_collection/trace_context_propagation/go
- /fr/tracing/trace_collection/trace_context_propagation/java
- /fr/tracing/trace_collection/trace_context_propagation/nodejs
- /fr/tracing/trace_collection/trace_context_propagation/php
- /fr/tracing/trace_collection/trace_context_propagation/python
- /fr/tracing/trace_collection/trace_context_propagation/ruby
description: Extraire et injecter les en-têtes Datadog, B3 et W3C Trace Context pour
  propager le contexte d'une trace distribuée.
further_reading:
- link: tracing/glossary/
  tag: Documentation
  text: Comprendre la terminologie APM
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Surveiller les apps instrumentées avec OpenTelemetry grâce à la prise en charge
    du contexte des traces W3C
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentation
  text: Interopérabilité des traces instrumentées par l'API OpenTelemetry et par Datadog
title: Propagation du contexte de traces
type: multi-code-lang
---
La propagation du contexte de trace est le mécanisme permettant de transmettre des informations de traçage telles que l'ID de trace, l'ID de span et les décisions d'échantillonnage d'une partie d'une application distribuée à une autre. Cela permet de corréler toutes les traces (et la télémétrie supplémentaire) dans une requête. Lorsque l'instrumentation automatique est activée, la propagation du contexte de trace est gérée automatiquement par le SDK Datadog.

Par défaut, le SDK Datadog extrait et injecte les en-têtes de traçage distribué en utilisant les formats suivants :

- [Datadog][1] (a une priorité plus élevée lors de l'extraction des en-têtes)
- [W3C Trace Context][2]
- [Baggage][10]

Cette configuration par défaut maximise la compatibilité avec les anciennes versions du SDK Datadog et les produits tout en permettant l'interopérabilité avec d'autres systèmes de traçage distribué comme OpenTelemetry.

## Personnaliser la propagation du contexte de trace {#customize-trace-context-propagation}

Vous devrez peut-être personnaliser la configuration de la propagation du contexte de trace si vos applications :

- Communiquent des informations de traçage distribué dans un format pris en charge différent
- Doivent empêcher l'extraction ou l'injection des en-têtes de traçage distribué

Utilisez les variables d'environnement suivantes pour configurer les formats de lecture et d'écriture des en-têtes de traçage distribué. Référez-vous à la section [Support des langages][6] pour les valeurs de configuration spécifiques aux langages.

`DD_TRACE_PROPAGATION_STYLE`
: Spécifie les formats de propagation du contexte de trace pour l'extraction et l'injection dans une liste séparée par des virgules. Peut être remplacé par des configurations spécifiques à l'extraction ou à l'injection.<br>
**Par défaut**: `datadog,tracecontext,baggage` <br>
**Remarque**: Avec plusieurs formats de contexte de trace, l'extraction suit l'ordre spécifié (par exemple, `datadog,tracecontext` vérifie d'abord les en-têtes Datadog). Le premier contexte valide continue la trace ; les contextes valides supplémentaires deviennent des liens de span. Lorsque `baggage` est inclus, il est ajouté en tant que [baggage](#baggage) au contexte existant.

`OTEL_PROPAGATORS`
: Spécifie les formats de propagation du contexte de trace pour l'extraction et l'injection (liste séparée par des virgules). La priorité la plus basse ; elle est ignorée si une autre variable d'environnement de propagation du contexte de trace Datadog est définie.<br>
**Remarque**: N'utilisez cette configuration que lors de la migration d'une application du SDK OpenTelemetry vers le SDK Datadog. Pour plus d'informations sur cette configuration et d'autres variables d'environnement OpenTelemetry, voir [Utilisation des variables d'environnement OpenTelemetry avec les SDK Datadog][9].

`DD_TRACE_PROPAGATION_BEHAVIOR_EXTRACT`
: Spécifie comment les en-têtes de traçage distribué entrants doivent être gérés au niveau du service. Les valeurs acceptées sont :<br>
`continue` : Le SDK continuera la trace distribuée si les en-têtes de traçage distribués entrants représentent un contexte de trace valide.<br>
`restart` : Le SDK commencera toujours une nouvelle trace. Si les en-têtes de traçage distribués entrants représentent un contexte de trace valide, ce contexte de trace sera représenté comme un lien de span sur les spans d'entrée de service (par opposition au span parent dans la configuration `continue`).<br>
`ignore` : Le SDK commencera toujours une nouvelle trace et tous les en-têtes de traçage distribués entrants sont ignorés.<br>
**Par défaut** : `continue` <br>
**Remarque** : Ceci n'est implémenté que dans les bibliothèques .NET, Node.js, Python et Java.

### Configuration avancée {#advanced-configuration}

La plupart des services envoient et reçoivent des en-têtes de contexte de trace en utilisant le même format. Cependant, si votre service doit accepter des en-têtes de contexte de trace dans un format et les envoyer dans un autre, utilisez ces configurations :

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: Spécifie les formats de propagation du contexte de trace pour l'extraction uniquement dans une liste séparée par des virgules. La priorité la plus élevée pour configurer les propagateurs d'extraction.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: Spécifie les formats de propagation du contexte de trace pour l'injection uniquement dans une liste séparée par des virgules. La plus haute priorité pour configurer les propagateurs d'injection.

## Formats pris en charge {#supported-formats}

Le SDK Datadog prend en charge les formats de contexte de trace suivants :

| Format                 | Valeur de configuration        |
|------------------------|----------------------------|
| [Datadog][1]           | `datadog`                  |
| [W3C Trace Context][2] | `tracecontext`             |
| [B3 Single][3]         | _Valeur dépendante de la langue_ |
| [B3 Multi][4]          | `b3multi`                  |
| [Baggage][10]          | `baggage`<sup>*</sup>       |
| [Aucun][5]              | `none`                     |

<sup>*</sup> **Remarque** : `baggage` n'est pas pris en charge en Rust.

## Support des langues {#language-support}

{{< tabs >}}

{{% tab "Java" %}}

### Formats pris en charge {#supported-formats-1}

Le SDK Java Datadog prend en charge les formats de contexte de trace suivants, y compris les valeurs de configuration obsolètes :

| Format                 | Valeur de configuration |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [Contexte de trace W3C][2] | `tracecontext`      |
| [B3 Single][3]         | `b3 single header`  |
|                        | `b3single`          |
| [B3 Multi][4]          | `b3multi`           |
|                        | `b3` (obsolète)   |
| [Baggage][7]          | `baggage`           |
| [AWS X-Ray][5]         | `xray`              |
| [Aucun][6]              | `none`              |

### Configuration supplémentaire {#additional-configuration}

En plus de la configuration des variables d'environnement, vous pouvez également mettre à jour les propagateurs en utilisant la configuration des propriétés système :
- `-Ddd.trace.propagation.style=datadog,b3multi`
- `-Dotel.propagators=datadog,b3multi`
- `-Ddd.trace.propagation.style.inject=datadog,b3multi`
- `-Ddd.trace.propagation.style.extract=datadog,b3multi`

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-tracingheader
[6]: #none-format
[7]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Python" %}}

### Formats pris en charge {#supported-formats-2}

Le SDK Python de Datadog prend en charge les formats de contexte de trace suivants, y compris les valeurs de configuration obsolètes :

| Format                 | Valeur de configuration             |
|------------------------|---------------------------------|
| [Datadog][1]           | `datadog`                       |
| [Contexte de trace W3C][2] | `tracecontext`                  |
| [Baggage][6]           | `baggage`                       |
| [B3 Single][3]         | `b3`                            |
|                        | `b3 single header` (supprimé dans v3.0) |
| [B3 Multi][4]          | `b3multi`                       |
| [Aucun][5]              | `none`                          |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Ruby" %}}

### Formats pris en charge {#supported-formats-3}

Le SDK Ruby de Datadog prend en charge les formats de contexte de trace suivants, y compris les valeurs de configuration obsolètes :

| Format                 | Valeur de configuration |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [Contexte de trace W3C][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `b3`                |
| [B3 Multi][4]          | `b3multi`           |
| [Aucun][5]              | `none`              |

### Configuration supplémentaire {#additional-configuration-1}

En plus de la configuration des variables d'environnement, vous pouvez également mettre à jour les propagateurs dans le code en utilisant `Datadog.configure` :

```ruby
Datadog.configure do |c|
  # List of header formats that should be extracted
  c.tracing.propagation_extract_style = [ 'tracecontext', 'datadog', 'b3' ]

  # List of header formats that should be injected
  c.tracing.propagation_inject_style = [ 'tracecontext', 'datadog' ]
end
```

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Go" %}}

### Formats pris en charge {#supported-formats-4}

Le SDK Go de Datadog prend en charge les formats de contexte de trace suivants, y compris les valeurs de configuration obsolètes :

| Format                 | Valeur de configuration |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [Contexte de trace W3C][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `b3` (obsolète)   |
| [Aucun][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Node.js" %}}

### Formats pris en charge {#supported-formats-5}

Le SDK Datadog Node.js prend en charge les formats de contexte de trace suivants, y compris les valeurs de configuration obsolètes :

| Format                 | Valeur de configuration |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [Contexte de trace W3C][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `B3` (obsolète)   |
| [Aucun][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "PHP" %}}

### Formats pris en charge {#supported-formats-6}

Le SDK Datadog PHP prend en charge les formats de contexte de trace suivants, y compris les valeurs de configuration obsolètes :

| Format                 | Valeur de configuration |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [Contexte de trace W3C][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `B3` (obsolète)   |
| [Aucun][5]              | `none`              |

### Cas d'utilisation supplémentaires {#additional-use-cases}

Les cas d'utilisation suivants sont spécifiques au SDK Datadog PHP :

{{% collapse-content title="Traçage distribué lors du lancement d'un script PHP" level="h4" %}}

Lorsqu'un nouveau script PHP est lancé, le SDK Datadog vérifie automatiquement la présence des en-têtes Datadog pour le traçage distribué :
- `x-datadog-trace-id` (variable d'environnement : `HTTP_X_DATADOG_TRACE_ID`)
- `x-datadog-parent-id` (variable d'environnement : `HTTP_X_DATADOG_PARENT_ID`)
- `x-datadog-origin` (variable d'environnement : `HTTP_X_DATADOG_ORIGIN`)
- `x-datadog-tags` (variable d'environnement : `HTTP_X_DATADOG_TAGS`)

{{% /collapse-content %}}

{{% collapse-content title="Définition manuelle du contexte de traçage distribué" level="h4" %}}

Pour définir manuellement les informations de traçage dans un script CLI pour de nouvelles traces ou des traces existantes, utilisez la fonction `DDTrace\set_distributed_tracing_context(string $trace_id, string $parent_id, ?string $origin = null, ?array $tags = null)`.

```php
<?php

function processIncomingQueueMessage($message) {
}

\DDTrace\trace_function(
    'processIncomingQueueMessage',
    function(\DDTrace\SpanData $span, $args) {
        $message = $args[0];
        \DDTrace\set_distributed_tracing_context($message->trace_id, $message->parent_id);
    }
);
```

Pour la version **0.87.0** et ultérieure, si les en-têtes bruts sont disponibles, utilisez la fonction `DDTrace\consume_distributed_tracing_headers(array|callable $headersOrCallback)`. **Remarque** : Les noms des en-têtes doivent être en minuscules.

```php
$headers = [
	"x-datadog-trace-id" => "1234567890",
	"x-datadog-parent-id" => "987654321",
];

\DDTrace\consume_distributed_tracing_headers($headers);
```

Pour extraire le contexte de trace directement sous forme d'en-têtes, utilisez la fonction `DDTrace\generate_distributed_tracing_headers(?array $inject = null): array`.

```php
$headers = DDTrace\generate_distributed_tracing_headers();
// Store headers somewhere, inject them in an outbound request, ...
// These $headers can also be read back by \DDTrace\consume_distributed_tracing_headers from another process.
```

L'argument optionnel de cette fonction accepte un tableau de noms de styles d'injection. La valeur par défaut est le style d'injection configuré.

{{% /collapse-content %}}

{{% collapse-content title="RabbitMQ" level="h4" %}}

Le SDK PHP prend en charge le traçage automatique de la bibliothèque `php-amqplib/php-amqplib` (version 0.87.0+). Cependant, dans certains cas, votre trace distribuée peut être déconnectée. Par exemple, lors de la lecture de messages à partir d'une file d'attente distribuée en utilisant la méthode `basic_get` en dehors d'une trace existante, vous devez ajouter une trace personnalisée autour de l'appel `basic_get` et du traitement des messages correspondant :

```php
// Create a surrounding trace
$newTrace = \DDTrace\start_trace_span();
$newTrace->name = 'basic_get.process';
$newTrace->service = 'amqp';


// basic_get call(s) + message(s) processing
$msg = $channel->basic_get($queue);
if ($msg) {
   $messageProcessing($msg);
}


// Once done, close the span
\DDTrace\close_span();
```

Créer cette trace environnante pour votre logique de consommation et de traitement garantit l'observabilité de votre file d'attente distribuée.

{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "C++" %}}

### Formats pris en charge {#supported-formats-7}

Le SDK C++ de Datadog prend en charge les formats de contexte de trace suivants, y compris les valeurs de configuration obsolètes :

| Format                 | Valeur de configuration |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [Contexte de trace W3C][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Multi][4]          | `b3`                |
|                        | `b3multi`           |
| [None][5]              | `none`              |

### Configuration supplémentaire {#additional-configuration-2}

En plus de la configuration des variables d'environnement, vous pouvez également mettre à jour les propagateurs dans le code :

```cpp
#include <datadog/tracer_config.h>
#include <datadog/propagation_style.h>

namespace dd = datadog::tracing;
int main() {
  dd::TracerConfig config;
  config.service = "my-service";

  // `injection_styles` indicates with which tracing systems trace propagation
  // will be compatible when injecting (sending) trace context.
  // All styles indicated by `injection_styles` are used for injection.
  // `injection_styles` is overridden by the `DD_TRACE_PROPAGATION_STYLE_INJECT`
  // and `DD_TRACE_PROPAGATION_STYLE` environment variables.
  config.injection_styles = {dd::PropagationStyle::DATADOG, dd::PropagationStyle::B3};

  // `extraction_styles` indicates with which tracing systems trace propagation
  // will be compatible when extracting (receiving) trace context.
  // Extraction styles are applied in the order in which they appear in
  // `extraction_styles`. The first style that produces trace context or
  // produces an error determines the result of extraction.
  // `extraction_styles` is overridden by the
  // `DD_TRACE_PROPAGATION_STYLE_EXTRACT` and `DD_TRACE_PROPAGATION_STYLE`
  // environment variables.
  config.extraction_styles = {dd::PropagationStyle::W3C};

  ...
}
```

### Cas d'utilisation supplémentaires {#additional-use-cases-1}

{{% collapse-content title="Extraire manuellement le contexte propagé" level="h4" %}}

Pour extraire le contexte de propagation, implémentez une interface `DictReader` personnalisée et appelez `Tracer::extract_span` ou `Tracer::extract_or_create_span`.

Voici un exemple d'extraction du contexte de propagation à partir des en-têtes HTTP :

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

  // Return the value at the specified `key`, or return `nullopt` if there
  // is no value at `key`.
  dd::Optional<dd::StringView> lookup(dd::StringView key) const override {
    auto found = headers_.find(key);
    if (found == headers_.cend()) return dd::nullopt;

    return found->second;
  }

  // Invoke the specified `visitor` once for each key/value pair in this object.
  void visit(
      const std::function<void(dd::StringView key, dd::StringView value)>& visitor)
      const override {
      for (const auto& [key, value] : headers_) {
        visitor(key, value);
      }
  };
};

// Usage example:
void handle_http_request(const Request& request, datadog::tracing::Tracer& tracer) {
  HTTPHeadersReader reader{request.headers};
  auto maybe_span = tracer.extract_span(reader);
  ..
}
```
{{% /collapse-content %}}

{{% collapse-content title="Injecter manuellement le contexte pour le traçage distribué" level="h4" %}}

Pour injecter le contexte de propagation, implémentez l'interface `DictWriter` et appelez `Span::inject` sur une instance de span :

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

// Usage example:
void handle_http_request(const Request& request, dd::Tracer& tracer) {
  auto span = tracer.create_span();

  HTTPHeaderWriter writer(request.headers);
  span.inject(writer);
  // `request.headers` now populated with the headers needed to propagate the span.
  ..
}
```
{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab ".NET" %}}

### Formats pris en charge {#supported-formats-8}

Le SDK .NET de Datadog prend en charge les formats de contexte de trace suivants, y compris les valeurs de configuration obsolètes :

| Format                 | Valeur de configuration           |
|------------------------|-------------------------------|
| [Datadog][1]           | `datadog`                     |
| [Contexte de trace W3C][2] | `tracecontext`                |
| [Baggage][9]          | `baggage`                     |
|                        | `W3C` (obsolète)            |
| [B3 Single][3]         | `B3 single header`            |
|                        | `B3SingleHeader` (obsolète) |
| [B3 Multi][4]          | `b3multi`                     |
|                        | `B3` (obsolète)             |
| [None][5]              | `none`                        |

### Cas d'utilisation supplémentaires {#additional-use-cases-2}

{{% collapse-content title="Configurations par défaut antérieures" level="h4" %}}

- À partir de la version [2.48.0][6], le style de propagation par défaut est `datadog, tracecontext`. Cela signifie que les en-têtes Datadog sont utilisés en premier, suivis par le contexte de trace W3C.
- Avant la version 2.48.0, l'ordre était `tracecontext, Datadog` pour la propagation d'extraction et d'injection.
- Avant la version [2.22.0][7], seul le style d'injection `Datadog` était activé.
- À partir de la version [2.42.0][8], lorsque plusieurs extracteurs sont spécifiés, la configuration `DD_TRACE_PROPAGATION_EXTRACT_FIRST=true` indique si l'extraction de contexte doit se terminer immédiatement après la détection du premier `tracecontext` valide. La valeur par défaut est `false`.

{{% /collapse-content %}}

{{% collapse-content title="Traçage distribué avec des files d'attente de messages" level="h4" %}}

Dans la plupart des cas, l'extraction et l'injection des en-têtes sont automatiques. Cependant, il existe certains cas connus où votre trace distribuée peut être déconnectée. Par exemple, lors de la lecture de messages à partir d'une file d'attente distribuée, certaines bibliothèques peuvent perdre le contexte de span. Cela se produit également si vous définissez `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` sur `false` lors de la consommation de messages Kafka. Dans ces cas, vous pouvez ajouter une trace personnalisée en utilisant le code suivant :

```csharp
var spanContextExtractor = new SpanContextExtractor();
var parentContext = spanContextExtractor.Extract(headers, (headers, key) => GetHeaderValues(headers, key));
var spanCreationSettings = new SpanCreationSettings() { Parent = parentContext };
using var scope = Tracer.Instance.StartActive("operation", spanCreationSettings);
```

Fournissez la méthode `GetHeaderValues`. La manière dont cette méthode est implémentée dépend de la structure qui transporte `SpanContext`.

Voici quelques exemples :

```csharp
// Confluent.Kafka
IEnumerable<string> GetHeaderValues(Headers headers, string name)
{
    if (headers.TryGetLastBytes(name, out var bytes))
    {
        try
        {
            return new[] { Encoding.UTF8.GetString(bytes) };
        }
        catch (Exception)
        {
            // ignored
        }
    }

    return Enumerable.Empty<string>();
}

// RabbitMQ
IEnumerable<string> GetHeaderValues(IDictionary<string, object> headers, string name)
{
    if (headers.TryGetValue(name, out object value) && value is byte[] bytes)
    {
        return new[] { Encoding.UTF8.GetString(bytes) };
    }

    return Enumerable.Empty<string>();
}

// SQS
public static IEnumerable<string> GetHeaderValues(IDictionary<string, MessageAttributeValue> headers, string name)
{
    // For SQS, there are a maximum of 10 message attribute headers,
    // so the Datadog headers are combined into one header with the following properties:
    // - Key: "_datadog"
    // - Value: MessageAttributeValue object
    //   - DataType: "String"
    //   - StringValue: <JSON map with key-value headers>
    if (headers.TryGetValue("_datadog", out var messageAttributeValue)
        && messageAttributeValue.StringValue is string jsonString)
    {
        var datadogDictionary = JsonConvert.DeserializeObject<Dictionary<string, string>>(jsonString);
        if (datadogDictionary.TryGetValue(name, out string value))
        {
            return new[] { value };
        }
    }
    return Enumerable.Empty<string>();
}
```

Lors de l'utilisation de l'API `SpanContextExtractor` pour tracer les spans de consommateur Kafka, définissez `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` sur `false`. Cela garantit que le span du consommateur est correctement fermé immédiatement après que le message est consommé du sujet, et que les métadonnées (telles que `partition` et `offset`) sont enregistrées correctement. Les spans créés à partir des messages Kafka via l'API `SpanContextExtractor` sont les enfants du span du producteur et des spans au même niveau que le span du consommateur.

Si vous devez propager le contexte de trace manuellement (pour les bibliothèques qui ne sont pas instrumentées automatiquement, comme le client WCF), vous pouvez utiliser l'API `SpanContextInjection`. Voici un exemple pour WCF où `this` est le client WCF :

```csharp

using (OperationContextScope ocs = new OperationContextScope(this.InnerChannel))
{
  var spanContextInjector = new SpanContextInjector();
  spanContextInjector.Inject(OperationContext.Current.OutgoingMessageHeaders, SetHeaderValues, Tracer.Instance.ActiveScope?.Span?.Context);
}


void SetHeaderValues(MessageHeaders headers, string name, string value)
{
    MessageHeader header = MessageHeader.CreateHeader(name, "datadog", value);
    headers.Add(header);
}
```

{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.48.0
[7]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.22.0
[8]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.42.0
[9]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Rust" %}}

<div class="alert alert-info">Le SDK Rust de Datadog est en préversion.</div>

Le SDK Rust de Datadog est construit sur le SDK OpenTelemetry (OTel).

La propagation du contexte de trace est gérée par le SDK OTel, qui est configuré par `datadog-opentelemetry` pour prendre en charge les formats `datadog` et `tracecontext` (W3C).

### Formats pris en charge {#supported-formats-9}

| Format | Valeur de configuration |
|---|---|
| [Datadog][1] | `datadog` |
| [Contexte de trace W3C][2] | `tracecontext` |

### Configuration {#configuration}

Vous pouvez contrôler quels formats de propagation sont utilisés en définissant la variable d'environnement `DD_TRACE_PROPAGATION_STYLE`. Vous pouvez fournir une liste séparée par des virgules.

Exemple :

```bash
# To support both W3C and Datadog
export DD_TRACE_PROPAGATION_STYLE="tracecontext,datadog"
```

### Injection et extraction manuelles {#manual-injection-and-extraction}

Parce qu'il n'y a pas d'instrumentation automatique pour Rust, vous devez propager manuellement le contexte lors de l'exécution ou de la réception d'appels distants (comme les requêtes HTTP).
- `HeaderExtractor` pour **extraire** un contexte parent des en-têtes de requête entrants.
- `HeaderInjector` pour **injecter** le contexte actuel dans les en-têtes de requête sortants.

Tout d'abord, ajoutez `opentelemetry-http` à votre `Cargo.toml`.

```toml
[dependencies]
# Provides HeaderInjector and HeaderExtractor
# Ensure this version matches your other opentelemetry dependencies
opentelemetry-http = "0.31"

# Only required for the Hyper examples below
http-body-util = "0.1"
```

<div class="alert alert-danger">Utilisez la même version de crate pour <code>opentelemetry-http</code> que le reste de vos dépendances OpenTelemetry afin d'éviter les conflits de version.</div>

### Injection de contexte (côté client) {#injecting-context-client-side}

Lors de l'envoi d'une requête HTTP (par exemple, avec `hyper` 1.0), injectez le contexte de la portée actuelle dans les en-têtes de la requête en utilisant `HeaderInjector`.

```rust
use opentelemetry::{global, Context};
use opentelemetry_http::HeaderInjector;
use hyper::Request;
use http_body_util::Empty;
use hyper::body::Bytes;

// HYPER example
fn build_outbound_request(url: &str) -> http::Result<Request<Empty<Bytes>>> {
    let cx = Context::current();

    // Build the request and inject headers in-place
    let mut builder = Request::builder().method("GET").uri(url);
    global::get_text_map_propagator(|prop| {
        prop.inject_context(&cx, &mut HeaderInjector(builder.headers_mut().unwrap()))
    });

    builder.body(Empty::<Bytes>::new())
}
```

### Extraction de contexte (côté serveur) {#extracting-context-server-side}

Lors de la réception d'une requête HTTP, extrayez le contexte de trace des en-têtes en utilisant `HeaderExtractor`.

Lorsque vous utilisez des environnements d'exécution asynchrones (comme Tokio), vous devez attacher le contexte extrait à l'avenir afin qu'il se propage correctement à travers la chaîne de tâches asynchrones.

```rust
use opentelemetry::{
    global,
    trace::{Span, FutureExt, SpanKind, Tracer},
    Context,
};
use opentelemetry_http::HeaderExtractor;
use hyper::{Request, Response};
use hyper::body::Incoming;
use http_body_util::Full;
use hyper::body::Bytes;

// Utility function to extract context from a hyper request
fn extract_context(req: &Request<Incoming>) -> Context {
    global::get_text_map_propagator(|propagator| {
        propagator.extract(&HeaderExtractor(req.headers()))
    })
}

// A placeholder for your actual request handling logic
async fn your_handler_logic() -> Response<Full<Bytes>> {
    // ... your logic ...
    Response::new(Full::new(Bytes::from("Hello, World!")))
}

// HYPER example
async fn hyper_handler(req: Request<Incoming>) -> Response<Full<Bytes>> {
    // Extract the parent context from the incoming headers
    let parent_cx = extract_context(&req);
    
    let tracer = global::tracer("my-server-component");
    
    // Start the server span as a child of the extracted context
    let server_span = tracer
        .span_builder("http.server.request")
        .with_kind(SpanKind::Server)
        .start_with_context(tracer, &parent_cx);

    // Create a new context with the new server span
    // This is critical for async propagation
    let cx = parent_cx.with_span(server_span);

    // Attach the new context to the future using .with_context(cx)
    // This makes the span active for the duration of the handler
    your_handler_logic().with_context(cx).await
}
```

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/

{{% /tab %}}

{{< /tabs >}}

## Formats d'en-tête personnalisés {#custom-header-formats}

### Format Datadog {#datadog-format}

Lorsque le SDK Datadog est configuré avec le format Datadog pour l'extraction ou l'injection (possiblement les deux), le SDK Datadog interagit avec les en-têtes de requête suivants :

`x-datadog-trace-id`
: Spécifie les 64 bits inférieurs de l'identifiant de trace 128 bits, au format décimal.

`x-datadog-parent-id`
: Spécifie l'identifiant de portée de 64 bits de la portée actuelle, au format décimal.

`x-datadog-origin`
: Spécifie le produit Datadog qui a initié la trace, tel que [Real User Monitoring][7] ou [Synthetic Monitoring][8]. Si cet en-tête est présent, la valeur doit être l'un de: `rum`, `synthetics`, `synthetics-browser`.

`x-datadog-sampling-priority`
: Spécifie la décision d'échantillonnage prise pour la portée représentée sous forme d'entier, au format décimal.

`x-datadog-tags`
: Spécifie des informations d'état de trace Datadog supplémentaires, y compris, mais sans s'y limiter, les 64 bits supérieurs de l'identifiant de trace 128 bits (au format hexadécimal).

### Format None {#none-format}

Lorsque le SDK Datadog est configuré avec le format None pour l'extraction ou l'injection (possiblement les deux), le SDK Datadog ne _n'interagit_ pas avec les en-têtes de requête, ce qui signifie que l'opération de propagation de contexte correspondante ne fait rien.

### Baggage {#baggage}

Par défaut, Baggage est automatiquement propagé à travers une requête distribuée en utilisant les [en-têtes compatibles W3C][10] d'OpenTelemetry. Pour désactiver le baggage, définissez [DD_TRACE_PROPAGATION_STYLE][12] sur `datadog,tracecontext`.

#### Ajout du baggage en tant que balises de span {#adding-baggage-as-span-tags}

Par défaut, `user.id,session.id,account.id` les clés de baggage sont ajoutées en tant que balises span. Pour personnaliser cette configuration, voir [Configuration de la propagation du contexte][13]. Les clés de baggage spécifiées sont automatiquement ajoutées en tant que balises span `baggage.<key>` (par exemple, `baggage.user.id`).

La prise en charge du baggage en tant que balises span a été introduite dans les versions suivantes :

| Langue  | Version minimale du SDK                         |
|-----------|---------------------------------------------|
| Java      | 1.52.0                                      |
| Python    | 3.7.0                                       |
| Ruby      | 2.20.0                                      |
| Go        | 2.2.2                                       |
| .NET      | 3.23.0                                      |
| Node      | 5.54.0                                      |
| PHP       | 1.10.0                                      |
| C++/Proxy | 1.9.0 (Nginx). Les autres proxies ne sont pas pris en charge. |
| Rust      | Non pris en charge                               |

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: #language-support
[7]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm
[8]: /fr/synthetics/platform/apm
[9]: /fr/opentelemetry/interoperability/environment_variable_support
[10]: https://www.w3.org/TR/baggage/
[11]: /fr/help
[12]: #customize-trace-context-propagation
[13]: /fr/tracing/trace_collection/library_config#context-propagation
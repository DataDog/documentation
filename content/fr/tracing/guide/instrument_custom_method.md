---
title: Instrumenter une méthode personnalisée pour analyser en détail votre logique opérationnelle
kind: guide
further_reading:
  - link: /tracing/guide/alert_anomalies_p99_database/
    tag: "3\_minutes"
    text: Être alerté en cas de latence au 99e centile anormale pour un service de base de données
  - link: /tracing/guide/week_over_week_p50_comparison/
    tag: "2\_minutes"
    text: Comparer la latence d'un service avec celle de la semaine précédente
  - link: /tracing/guide/slowest_request_daily/
    tag: "3\_minutes"
    text: Débuguer la trace la plus lente sur l'endpoint le plus lent d'un service web
  - link: /tracing/guide/
    tag: ''
    text: Tous les guides
---
_Temps de lecture : 8 minutes_

{{< img src="tracing/guide/custom_span/custom_span_1.png" alt="Vue Analytics"  style="width:90%;">}}

Afin de vous offrir une visibilité optimale sur votre logique opérationnelle, l'APM Datadog vous permet de personnaliser les spans qui composent vos traces en fonction de vos besoins et de votre implémentation. Vous êtes ainsi libre de tracer n'importe quelle méthode utilisée dans votre code, ou même des composants spécifiques au sein d'une méthode. Utilisez cette fonctionnalité pour optimiser et surveiller les zones critiques de votre application avec le niveau de granularité qui vous convient.

En plus d'instrumenter un vaste nombre de frameworks par défaut, tels que des services Web, des bases de données et des caches, Datadog vous permet d'instrumenter votre propre logique opérationnelle afin d'obtenir exactement le niveau de visibilité dont vous avez besoin. En créant des spans pour des méthodes, vous pouvez optimiser les calculs de temps et surveiller les erreurs à l'aide du flamegraph et des monitors de l'APM.

## Instrumenter votre code

**Suivez cet exemple pour instrumenter votre code**.

Ces exemples vous montreront comment tracer l'intégralité de la méthode `BackupLedger.write` afin de mesurer son temps d'exécution et son statut. `BackupLedger.write` est une action qui enregistre le statut actuel d'un registre de transactions en mémoire avant d'effectuer un appel vers une base de données de paiements pour publier une nouvelle facturation client. Cette action se produit lorsque l'endpoint `charge` du service de paiements est atteint :

{{< img src="tracing/guide/custom_span/custom_span_2.png" alt="Vue Analytics"  style="width:90%;">}}

La span `http.request POST /charge/` prend beaucoup de temps et ne présente aucune span enfant directe : une instrumentation plus poussée est donc probablement nécessaire pour mieux comprendre son comportement. Selon le langage de programmation que vous utilisez, vous devez décorer vos fonctions différemment :
{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

Dans le langage Java, l'APM Datadog vous permet d'instrumenter votre code pour générer des spans personnalisées en utilisant des décorateurs de méthode ou en instrumentant des blocs de code spécifiques.

**Instrumenter une méthode avec un décorateur** :

Cet exemple ajoute une span à la méthode `BackupLedger.write`, qui ajoute de nouvelles lignes à un registre de transactions. Une span est ajoutée pour suivre toutes les transactions publiées en tant qu'une seule unité.

```java
import datadog.trace.api.Trace

public class BackupLedger {

  // Utiliser l'annotation @Trace pour tracer des méthodes personnalisées
  @Trace
  public void write(List<Transaction> transactions) {
    for (Transaction transaction : transactions) {
      ledger.put(transaction.getId(), transaction);
    }

    // [...]
  }
}
```

**Instrumenter un bloc de code spécifique** :

Cet exemple ajoute des spans enfant à la span `BackupLedger.write` créée ci-dessus. Cette méthode ajoute une span enfant pour chaque transaction dans le registre et un [tag personnalisé][1] avec l'ID de transaction spécifique.

```java
import datadog.trace.api.Trace;
import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class BackupLedger {

  // Utiliser l'annotation `@Trace` pour tracer des méthodes personnalisées
  @Trace
  public void write(List<Transaction> transactions) {
    for (Transaction transaction : transactions) {
      // Utilisez la fonction `GlobalTracer` pour tracer des blocs de code en ligne
      Tracer tracer = GlobalTracer.get();
      try (Scope scope = tracer.buildSpan("BackupLedger.persist").startActive(true)) {
        // Ajoutez des métadonnées personnalisées à la span
        scope.span().setTag("transaction.id", transaction.getId());
        ledger.put(transaction.getId(), transaction);
      }
    }

    // [...]
  }
}
```

[1]: /fr/tracing/guide/add_span_md_and_graph_it/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Dans le langage Python, l'APM Datadog vous permet d'instrumenter votre code pour générer des spans personnalisées en utilisant des décorateurs de méthode ou en instrumentant des blocs de code spécifiques.

**Instrumenter une méthode avec un décorateur** :

Cet exemple ajoute une span à la méthode `BackupLedger.write`, qui ajoute de nouvelles lignes à un registre de transactions. Une span est ajoutée pour suivre toutes les transactions publiées en tant qu'une seule unité.

```python
from ddtrace import tracer

class BackupLedger:

    # Utiliser le décorateur `tracer.wrap` pour tracer des méthodes personnalisées
    @tracer.wrap()
    def write(self, transactions):
        for transaction in transactions:
            self.ledger[transaction.id] = transaction

        # [...]
```

**Instrumenter un bloc de code spécifique** :

Cet exemple ajoute des spans enfant à la span `BackupLedger.write` créée ci-dessus. Cette méthode ajoute une span enfant pour chaque transaction dans le registre et un [tag personnalisé][1] avec l'ID de transaction spécifique.

```python
from ddtrace import tracer

class BackupLedger:

    # Utiliser le décorateur `tracer.wrap` pour tracer des méthodes personnalisées
    @tracer.wrap()
    def write(self, transactions):
        for transaction in transactions:
            # Utiliser le gestionnaire de contexte `tracer.trace` pour tracer directement des blocs de code
            with tracer.trace('BackupLedger.persist') as span:
                # Ajouter des métadonnées à la span persist_transaction
                span.set_tag('transaction.id', transaction.id)
                self.ledger[transaction.id] = transaction

        # [...]
```

[1]: /fr/tracing/guide/add_span_md_and_graph_it/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

  Dans le langage Ruby, l'APM Datadog vous permet d'instrumenter votre code pour générer des spans personnalisées en instrumentant des codes de bloc spécifiques.

  Cet exemple crée une span pour l'appel de la méthode `BackupLedger.write` et une span enfant pour chaque transaction publiée dans le registre avec un [tag personnalisé][1] spécifiant l'ID de transaction spécifique.

```ruby
require 'ddtrace'

class BackupLedger

  def write(transactions)
    # Utiliser la méthode globale `Datadog.tracer.trace` pour tracer directement des blocs de code
    Datadog.tracer.trace('BackupLedger.write') do |method_span|
      transactions.each do |transaction|
        Datadog.tracer.trace('BackupLedger.persist') do |span|
          # Ajouter des métadonnées personnalisées à la span persist_transaction
          span.set_tag('transaction.id', transaction.id)
          ledger[transaction.id] = transaction
        end
      end
    end

    # [...]
  end
end
```

[1]: /fr/tracing/guide/add_span_md_and_graph_it/
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

  Dans le langage Go, l'APM Datadog vous permet d'instrumenter votre code pour générer des spans personnalisées en instrumentant des codes de bloc spécifiques.

  Cet exemple crée une span pour chaque transaction publiée dans le registre et ajoute un [tag personnalisé][1] avec l'ID de transaction spécifique à la span.

```go
package ledger

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

// [...]

func (bl *BackupLedger) write(ctx context.Context, transactions []*Transaction) (err error) {
  // Tracer la fonction `write` et capturer l'erreur le cas échéant
  span, ctx := tracer.StartSpanFromContext(ctx, "BackupLedger.write")
  defer func() {
    span.Finish(tracer.WithError(err))
  }()

  for _, t := range transactions {
    if err := bl.persistTransaction(ctx, t); err != nil {
      return err
    }
  }
  return nil
}

// persistTransaction est une fonction interne que vous pouvez tracer. Vous pouvez utiliser la
// même méthode que précédemment, car le `ctx` transmis inclut des références de span par défaut
// pour créer une relation parent/enfant.
func (bl *BackupLedger) persistTransaction(ctx context.Context, transaction *Transaction) error {
  id := transaction.ID
  span, _ := tracer.StartSpanFromContext(ctx, "BackupLedger.persist", tracer.Tag("transaction_id", id))
  defer span.Finish()

  if t, ok := bl.transactions[id]; ok {
    return errors.New("duplicate entry")
  }
  bl.transactions[id] = transaction
  return nil
}
```

[1]: /fr/tracing/guide/add_span_md_and_graph_it/
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

  Dans le langage Node.js, l'APM Datadog vous permet d'instrumenter votre code pour générer des spans personnalisées en instrumentant des codes de bloc spécifiques.

Cet exemple crée une span pour l'appel de la méthode `BackupLedger.write` et une span enfant pour chaque transaction publiée dans le registre, avec un [tag personnalisé][1] spécifiant l'ID de transaction spécifique.

```javascript
const tracer = require('dd-trace')

function write (transactions) {
  // Utiliser le gestionnaire de contextes `tracer.trace` pour tracer directement des blocs de code
  tracer.trace('BackupLedger.write', () => {
    for (const transaction of transactions) {
      // Ajouter des métadonnées personnalisées à la span persist_transaction
      span.setTag('transaction.id', transaction.id)
      this.ledger[transaction.id] = transaction
    }
  })

  // [...]
}
```

[1]: /fr/tracing/guide/add_span_md_and_graph_it/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

  Dans le langage .NET, l'APM Datadog vous permet d'instrumenter votre code pour générer des spans personnalisées en instrumentant des codes de bloc spécifiques.

Cet exemple crée une span pour chaque transaction publiée dans le registre et ajoute un [tag personnalisé][1] avec l'ID de transaction spécifique à la span.

```csharp
using Datadog.Trace;

public void Write(List<Transaction> transactions)
{
    // Utiliser le traceur global pour tracer directement des blocs de code
    using (var scope = Tracer.Instance.StartActive("BackupLedger.write"))
    {
        foreach (var transaction in transactions)
        {
            using (var scope = Tracer.Instance.StartActive("BackupLedger.persist"))
            {
                // Ajouter des métadonnées personnalisées à la span
                scope.Span.SetTag("transaction.id", transaction.Id);
                this.ledger[transaction.Id] = transaction;
            }
        }
    }

    // [...]
}
```

[1]: /fr/tracing/guide/add_span_md_and_graph_it/
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Dans le langage PHP, l'APM Datadog vous permet d'instrumenter votre code pour générer des spans personnalisées en utilisant des wrappers de méthode ou en instrumentant des blocs de code spécifiques.

**Instrumenter une méthode avec un wrapper** :

Cet exemple ajoute une span à la méthode `BackupLedger.write`, qui ajoute de nouvelles lignes à un registre de transactions. Une span est ajoutée pour suivre toutes les transactions publiées en tant qu'une seule unité via la fonction `DDTrace\trace_method()`.

```php
<?php
  class BackupLedger {

    public function write(array $transactions) {
      foreach ($transactions as $transaction) {
        $this->transactions[$transaction->getId()] = $transaction;
      }

      # [...]
    }
  }

  // Pour ddtrace < v0.47.0 utiliser \dd_trace_method()
  \DDTrace\trace_method('BackupLedger', 'write', function (\DDTrace\SpanData $span) {
    // SpanData::$name correspond à 'ClassName.methodName' par défaut si non défini (>= v0.47.0)
    $span->name = 'BackupLedger.write';
    // SpanData::$resource correspond à SpanData::$name par défaut si non défini (>= v0.47.0)
    $span->resource = 'BackupLedger.write';
    $span->service = 'php';
  });
?>
```

**Instrumenter un bloc de code spécifique** :

Cet exemple ajoute des spans enfant à la span `BackupLedger.write` créée ci-dessus. Cette méthode ajoute une span enfant pour chaque transaction dans le registre et un [tag personnalisé][1] avec l'ID de transaction spécifique.

```php
<?php
  class BackupLedger {

    public function write(array $transactions) {
      foreach ($transactions as $transaction) {
        // Utiliser le traceur global pour tracer directement des blocs de code
        $scope = \DDTrace\GlobalTracer::get()->startActiveSpan('BackupLedger.persist');

        // Ajouter des métadonnées personnalisées à la span
        $scope->getSpan()->setTag('transaction.id', $transaction->getId());
        $this->transactions[$transaction->getId()] = $transaction;

        // Fermer la span
        $scope->close();
      }

      # [...]
    }
  }

  // Pour ddtrace < v0.47.0 utilisez \dd_trace_method()
  \DDTrace\trace_method('BackupLedger', 'write', function (\DDTrace\SpanData $span) {
    // SpanData::$name correspond à 'ClassName.methodName' par défaut si non défini (>= v0.47.0)
    $span->name = 'BackupLedger.write';
    // SpanData::$resource correspond à SpanData::$name par défaut si non défini (>= v0.47.0)
    $span->resource = 'BackupLedger.write';
    $span->service = 'php';
  });
?>
```

[1]: /fr/tracing/guide/add_span_md_and_graph_it/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Visualiser vos nouvelles spans personnalisées depuis l'interface de Datadog

Maintenant que vous avez instrumenté votre logique opérationnelle, il est temps de découvrir les résultats dans l'interface de l'APM Datadog.

1. Accédez à la **[liste des services][1]**, identifiez le service auquel vous avez ajouté des spans personnalisées, puis accédez à la **page Service**. Sur la page Service, cliquez sur la **ressource spécifique** que vous avez ajoutée, modifiez le filtre d'intervalle sur `The past 15 minutes` et faites défiler la page jusqu'au tableau Span Summary :

    {{< img src="tracing/guide/custom_span/custom_span_3.png" alt="Tableau Span Summary" style="width:90%;">}}

    *Vous devriez maintenant apercevoir les nouvelles spans que vous avez ajoutées*

Le tableau Span Summary affiche des informations agrégées concernant les spans qui composent vos traces. Utilisez-le pour identifier les spans qui se répètent pendant des durées anormales, ce qui peut être le signe de boucles ou de mauvaises performances d'accès à la base de données (comme le [problème `n+1`][2]).

2. Faites défiler la page jusqu'à la **liste des traces** et cliquez sur l'une de vos traces.

   {{< img src="tracing/guide/custom_span/custom_span_4.png" alt="Vue Analytics"  style="width:90%;">}}

Vous avez maintenant réussi à ajouter des spans personnalisées à votre code, et celles-ci sont désormais visibles sur le flamegraph ainsi que sur la page [App Analytics][3]. Pour les rendre encore plus performantes et continuer à tirer pleinement parti des outils Datadog, vous pouvez maintenant [ajouter des tags personnalisés à vos spans][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: https://bojanv91.github.io/posts/2018/06/select-n-1-problem
[3]: https://app.datadoghq.com/apm/search/analytics
[4]: /fr/tracing/guide/add_span_md_and_graph_it/
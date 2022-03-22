---
title: Ajouter des tags de span et filtrer ou regrouper les données de performance de votre application
kind: guide
further_reading:
  - link: /tracing/guide/alert_anomalies_p99_database/
    tag: "3\_minutes"
    text: Être alerté en cas de latence au 99e centile anormale pour un service de base de données
  - link: /tracing/guide/week_over_week_p50_comparison/
    tag: "2\_minutes"
    text: Comparer la latence d'un service avec celle de la semaine précédente
  - link: /tracing/guide/apm_dashboard/
    tag: "4\_minutes"
    text: Créer un dashboard pour suivre et corréler les métriques APM
  - link: /tracing/guide/slowest_request_daily/
    tag: "3\_minutes"
    text: Débuguer la trace la plus lente sur l'endpoint le plus lent d'un service web
  - link: /tracing/guide/
    tag: ''
    text: Tous les guides
---
_Temps de lecture : 7 minutes_

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_6.mp4" alt="Vue Analytics" video="true"  style="width:90%;">}}

L'APM Datadog vous permet de personnaliser vos [traces][1] pour inclure toute information supplémentaire dont vous pourriez avoir besoin pour optimiser votre visibilité sur votre entreprise. Vous pouvez l'utiliser pour détecter un pic de débit chez un certain client, pour identifier l'utilisateur affichant la latence la plus élevée ou pour localiser le fragment de base de données générant le plus d'erreurs.

Dans cet exemple, un ID client est ajouté aux traces afin d'identifier les clients qui connaissent les plus mauvaises performances. La personnalisation des traces se fait à l'aide de tags qui viennent s'ajouter aux [spans][2] sous la forme de paires de métadonnées `key:value`. Ils permettent ainsi à l'APM de rester parfaitement intégrée aux autres outils Datadog.

## Instrumenter votre code avec des tags de span personnalisés

1) **Suivez cet exemple pour instrumenter votre code**.

La méthode à employer pour ajouter des [tags][3] à vos spans dépend du langage de programmation utilisé.

**Remarque** : prenez note du nom du service et du [nom de la ressource][4] sur lesquels vous travaillez : ils vous seront utiles plus tard. Dans cet exemple, le serveur Ruby `web-store` correspond au service et `ShoppingCartController#checkout` correspond à la ressource (l'endpoint).

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

L'interface utilisateur de Datadog utilise les tags pour définir des métadonnées au niveau des spans. Vous pouvez configurer une instrumentation automatique pour les tags personnalisés en récupérant la span active à partir du traceur global et en définissant un tag avec `setTag`.

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

@WebServlet
class ShoppingCartServlet extends AbstractHttpServlet {
  @Override
  void doGet(HttpServletRequest req, HttpServletResponse resp) {
    // Récupérer la span active
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      // customer_id -> 254889
      span.setTag("customer.id", customer_id);
    }

    // [...]
  }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

L'interface utilisateur de Datadog utilise les tags pour définir des métadonnées au niveau des spans. Vous pouvez configurer une instrumentation automatique pour les tags personnalisés en récupérant la span active à partir du traceur global et en définissant un tag avec `setTag`.

```python
from ddtrace import tracer

@app.route('/shopping_cart/<int:customer_id>')
@login_required
def shopping_cart(customer_id):
    # Get the active span
    current_span = tracer.current_span()
    if current_span:
        # customer_id -> 254889
        current_span.set_tag('customer.id', customer_id)

    # [...]
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

L'interface utilisateur de Datadog utilise les tags pour définir des métadonnées au niveau des spans. Vous pouvez configurer une instrumentation automatique pour les tags personnalisés en récupérant la span active à partir du traceur global et en définissant un tag avec `setTag`.

```ruby
require 'ddtrace'

# get '/shopping_cart/:customer_id', to: 'shopping_cart#index'
class ShoppingCartController < ApplicationController
  # GET /shopping_cart
  def index
    # Get the active span
    current_span = Datadog.tracer.active_span
    # customer_id -> 254889
    current_span.set_tag('customer.id', params.permit([:customer_id])) unless current_span.nil?

    # [...]
  end

  # POST /shopping_cart
  def create
    # [...]
  end
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

L'interface utilisateur de Datadog utilise les tags pour définir des métadonnées au niveau des spans. Vous pouvez configurer une instrumentation automatique pour les tags personnalisés en récupérant la span active à partir du traceur global et en définissant un tag avec `setTag`.

```go
package main

import (
    muxtrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    // Get the active span from a Go Context
    if span, ok := tracer.SpanFromContext(r.Context()); ok {
      // customer_id -> 254889
      span.SetTag("customer.id", vars["customerID"])
    }

    // [...]
}

func main() {
    tracer.Start(tracer.WithServiceName("web-store"))
    defer tracer.Stop()
    // Use auto-instrumentation
    mux := muxtrace.NewRouter()
    mux.HandleFunc("/shopping_cart/{customerID}", handler)
    http.ListenAndServe(":8080", mux)
}
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}


L'interface utilisateur de Datadog utilise les tags pour définir des métadonnées au niveau des spans. Vous pouvez configurer une instrumentation automatique pour les tags personnalisés en récupérant la span active à partir du traceur global et en définissant un tag avec `setTag`.

```javascript
app.get('/shopping_cart/:customer_id', (req, res) => {
  // Get the active span
  const span = tracer.scope().active()
  if (span !== null) {
    // customer_id -> 254889
    span.setTag('customer.id', req.params.customer_id)
  }

  // [...]
})
```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}


Ajoutez directement des tags à un objet `Datadog.Trace.Span` en appelant `Span.SetTag()`. Par exemple :

```csharp
public class ShoppingCartController : Controller
{
    private IShoppingCartRepository _shoppingCartRepository;

    [HttpGet]
    public IActionResult Index(int customerId)
    {
        // Access the active scope through the global tracer (can return null)
        var scope = Tracer.Instance.ActiveScope;

        if (scope != null)
        {
            // Add a tag to the span for use in the datadog web UI
            scope.Span.SetTag("customer.id", customerId.ToString());
        }

        var cart = _shoppingCartRepository.Get(customerId);

        return View(cart);
    }
}
```

**Remarque** : `Datadog.Trace.Tracer.Instance.ActiveScope` renvoie`null` si aucune span n'est active.

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

L'interface utilisateur de Datadog utilise les tags pour définir des métadonnées au niveau des spans. Vous pouvez configurer une instrumentation automatique pour les tags personnalisés en récupérant la span active à partir du traceur global et en définissant un tag avec `setTag`.

```php
<?php
  namespace App\Http\Controllers;

  use DDTrace\GlobalTracer;

  class ShoppingCartController extends Controller
  {
      public shoppingCartAction (Request $request) {
          // Récupérer la span active
          $span = GlobalTracer::get()->getActiveSpan();
          if (null !== $span) {
              // customer_id -> 254889
              $span->setTag('customer_id', $request->get('customer_id'));
          }

          // [...]
      }
  }
?>
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

<div class="alert alert-info">Une fois votre nouveau code déployé, quelques minutes peuvent être nécessaires pour que les nouveaux tags s'affichent dans l'interface utilisateur de Datadog.</div>

## Rechercher des tags de span personnalisés depuis l'interface utilisateur de Datadog

2) **Accédez à la page Services** et cliquez sur le [service][5] auquel vous avez ajouté des tags. **Faites défiler la page et cliquez sur la ressource spécifique** à laquelle le tag a été ajouté dans le tableau des [ressources][4]. **Faites défiler la page jusqu'au tableau des traces.**

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_3.png" alt="Page Ressource" style="width:90%;">}}

Le tableau des traces affiche la distribution de la latence globale pour l'ensemble des traces incluses dans le contexte actuel (service, ressource et intervalle) ainsi que les liens vers les traces individuelles. Vous pouvez trier ce tableau par durée ou par code d'erreur pour identifier les opérations ayant généré une erreur ou encore des possibilités d'optimisation.

3) **Cliquez sur l'une de vos traces.**

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_4.png" alt="Flamegraph"  style="width:90%;">}}

L'écran qui apparaît affiche un **flamegraph** en haut et des fenêtres d’informations supplémentaires en dessous. Le flamegraph Datadog vous permet de visualiser instantanément la durée et le statut de chaque unité logique (span) ayant une incidence sur une requête. Le flamegraph est entièrement interactif : vous pouvez vous déplacer sur celui-ci (en le faisant glisser) ou zoomer et dézoomer (avec la molette de défilement). Cliquez sur une span pour afficher davantage d'informations sur cette dernière en bas de l'écran.

La partie inférieure de cette vue comprend des informations supplémentaires sur la trace ou toute span sélectionnée. De là, vous pouvez voir l'ensemble des tags par défaut ainsi que ceux qui ont été inclus manuellement. Vous avez également la possibilité de basculer entre les vues pour afficher les informations sur le host et les logs associés.

<div class="alert alert-info">Pour activer les logs dans cette vue, vous devez activer la collecte de logs puis <a href="https://docs.datadoghq.com/tracing/connect_logs_and_traces/" target=_blank>associer vos logs à vos traces</a>.</div>

## Exploiter vos tags de span personnalisés avec Analytics

4) **Accédez à la [page Trace Explorer][6]**.

La page Trace Search vous permet d'identifier les [traces][1] et les spans indexées spécifiques qui vous intéressent. Depuis cette vue, vous pouvez filtrer un ensemble de tags par défaut (tels que `Env`,` Service`, `Resource` et [bien d'autres][7]) en appliquant un intervalle.

5) **Trouvez une trace qui possède le nouveau tag**. Pour ce faire, utilisez le Facet Explorer sur la gauche. Recherchez le nom de la ressource que vous avez définie au début de ce guide, puis cliquez sur l'une des lignes que vous voyez à cet endroit.

6) **Trouvez le nouveau tag que vous avez ajouté à la trace**. Cliquez dessus et sélectionnez **Create facet** pour `@[nom de votre facette]` (dans notre exemple, il s'agit de customer_id)

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_5.png" alt="Menu Créer une facette" style="width:90%;">}}

Vous pouvez désormais spécifier le nom d'affichage de votre facette ainsi que son emplacement dans le Facet Explorer.

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_8.png" alt="Fenêtre Créer une facette" style="width:60%;">}}

La facette que vous avez créée devrait maintenant apparaître dans le Facet Explorer. Utilisez la case `Search facets` pour la retrouver facilement.

6) **Accédez à la page [Analytics][8].**

La page Analytics propose un outil visuel de création de requêtes qui vous permet d'inspecter vos traces sans aucune limite de cardinalité. Cet outil s'appuie sur les facettes pour filtrer et définir le contexte de la requête. Pour en savoir plus, consultez la [présentation du Trace Explorer][9].

7) **Choisissez le service** sur lequel vous avez travaillé dans la liste des facettes de service, **sélectionnez Error** dans la liste des statuts et **sélectionnez `customer_id** (ou tout autre tag que vous avez ajouté à vos spans) dans le champ group by.

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_6.mp4" alt=" span md 6"  video="true" style="width:90%;">}}

8) **Désélectionnez l'option Error** de la requête, **faites passer la mesure de `count *` à `Duration`**, puis **définissez le type de graphique sur `Top List`**.

La liste des clients associés aux requêtes moyennes les plus lentes s'affiche alors. **Remarque** : si vous souhaitez vous assurer que vos clients ne dépassent jamais un certain seuil de performance, vous pouvez [exporter cette requête vers un monitor][10]. Vous pouvez également enregistrer cette visualisation dans un dashboard afin de la surveiller.

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_7.mp4" alt="span md 7" video="true"  style="width:90%;">}}

Enfin, vous pouvez également afficher l'ensemble des traces associées à votre requête en cliquant sur la visualisation et en sélectionnant `View traces`.

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_9.mp4" alt="span md 9" video="true"  style="width:90%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#trace
[2]: /fr/tracing/visualization/#spans
[3]: /fr/tracing/visualization/#span-tags
[4]: /fr/tracing/visualization/#resources
[5]: /fr/tracing/visualization/#services
[6]: https://app.datadoghq.com/apm/search
[7]: /fr/tracing/trace_explorer/#live-search-for-15-minutes
[8]: https://app.datadoghq.com/apm/analytics
[9]: /fr/tracing/trace_explorer/query_syntax/
[10]: /fr/tracing/guide/alert_anomalies_p99_database/
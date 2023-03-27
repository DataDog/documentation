---
aliases:
- /fr/tracing/opentracing/java
- /fr/tracing/manual_instrumentation/java
- /fr/tracing/custom_instrumentation/java
- /fr/tracing/setup_overview/custom_instrumentation/java
code_lang: java
code_lang_weight: 0
description: Appliquez la norme OpenTracing au traceur de l'APM Java de Datadog.
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentation
  text: Associer vos logs à vos traces
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
kind: documentation
title: instrumentation personnalisée Java
type: multi-code-lang
---
<div class="alert alert-info">
Si vous n'avez pas encore lu les instructions d'instrumentation automatique et de configuration, veuillez commencer par les <a href="https://docs.datadoghq.com/tracing/setup/java/">Instructions de configuration Java</a>.
</div>

Cette page décrit des méthodes courantes pour configurer et personnaliser la visibilité sur votre application avec l'APM Datadog.

## Vous pouvez également choisir d'accroître les fonctionnalités de la bibliothèque `ddtrace` ou de contrôler plus précisément l'instrumentation de votre application. La bibliothèque propose plusieurs méthodes afin d'y parvenir.

Ajoutez des [tags de span][1] personnalisés à vos [spans][2] pour personnaliser la visibilité sur vos applications dans Datadog. Les tags de span sont appliqués à vos traces entrantes, ce qui vous permet de corréler le comportement observé avec des informations au niveau du code, comme le niveau du commerçant, le montant du paiement ou l'ID de l'utilisateur.

### Ajouter des tags de span personnalisés

Ajoutez des tags personnalisés à vos spans correspondant à une valeur dynamique au sein du code de votre application, comme `customer.id`.

```java
import org.apache.cxf.transport.servlet.AbstractHTTPServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

@WebServlet
class ShoppingCartServlet extends AbstractHttpServlet {
    @Override
    void doGet(HttpServletRequest req, HttpServletResponse resp) {
        // Get the active span
        final Span span = GlobalTracer.get().activeSpan();
        if (span != null) {
          // customer_id -> 254889
          // customer_tier -> platinum
          // cart_value -> 867
          span.setTag("customer.id", customer_id);
          span.setTag("customer.tier", customer_tier);
          span.setTag("cart.value", cart_value);
        }
        // [...]
    }
}
```

### Ajouter des tags à l'ensemble des spans

La propriété `dd.tags` permet de définir des tags pour toutes les spans générées d'une application. Elle est très utile pour regrouper les stats de vos applications, centres de données ou de tout autre tag que vous souhaitez consulter dans l'interface utilisateur de Datadog.

```text
java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
     -Ddd.tags=datacenter:njc,<TAG_KEY>:<TAG_VALUE> \
     -jar <YOUR_APPLICATION_PATH>.jar
```

### Définir des erreurs sur une span

Pour personnaliser une erreur associée à l'une de vos spans, définissez le tag d'erreur sur la span et utilisez `Span.log()` pour définir un « événement d'erreur ». L'événement d'erreur est un `Map<String,Object>` contenant une entrée `Fields.ERROR_OBJECT->Throwable`, une entrée `Fields.MESSAGE->String`, ou les deux.

```java
import io.opentracing.Span;
import io.opentracing.tag.Tags;
import io.opentracing.util.GlobalTracer;
import io.opentracing.log.Fields;
...
    // Récupérer la span active si elle n'est pas disponible dans la méthode actuelle
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      span.setTag(Tags.ERROR, true);
      span.log(Collections.singletonMap(Fields.ERROR_OBJECT, ex));
    }
```

**Remarque** : `Span.log()` est un mécanisme générique OpenTracing permettant d'associer des événements au timestamp actuel. Le traceur Java prend en charge uniquement l'enregistrement des événements d'erreur.
Vous avez également la possibilité de définir des tags d'erreur directement sur la span, sans `log()` :

```java
import io.opentracing.Span;
import io.opentracing.tag.Tags;
import io.opentracing.util.GlobalTracer;
import datadog.trace.api.DDTags;
import java.io.PrintWriter;
import java.io.StringWriter;

...
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      span.setTag(Tags.ERROR, true);
      span.setTag(DDTags.ERROR_MSG, ex.getMessage());
      span.setTag(DDTags.ERROR_TYPE, ex.getClass().getName());

      final StringWriter errorString = new StringWriter();
      ex.printStackTrace(new PrintWriter(errorString));
      span.setTag(DDTags.ERROR_STACK, errorString.toString());
    }
```

**Remarque** : vous pouvez ajouter les métadonnées pertinentes de l'erreur, qui figurent dans la [documentation sur la Vue Trace][3]. Si la span actuelle n'est pas une span racine, marquez-la comme erreur en faisant appel à la bibliothèque `dd-trace-api` pour récupérer la span racine avec `MutableSpan`, puis en utilisant `setError(true)`. Consultez la section relative à la [définition de tags et d'erreurs sur une span racine][4] pour en savoir plus.

### Définir des tags et des erreurs sur une span racine à partir d'une span enfant

Lorsqu'un événement ou une condition se produit en aval, vous pouvez définir ce comportement ou cette valeur comme un tag au niveau supérieur ou sur la span racine. Cete opération peut vous servir à comptabiliser une erreur, à mesurer les performances, ou à définir un tag dynamique à des fins de visibilité.

```java
import java.util.Collections;
import io.opentracing.Span;
import io.opentracing.Scope;
import datadog.trace.api.interceptor.MutableSpan;
import io.opentracing.log.Fields;
import io.opentracing.util.GlobalTracer;
import io.opentracing.util.Tracer;

Tracer tracer = GlobalTracer.get();
final Span span = tracer.buildSpan("<OPERATION_NAME>").start();
// Remarque : le scope dans le try avec le bloc de ressource ci-dessous
// sera automatiquement fermé à la fin du bloc de code.
// Si vous n'utilisez pas de try avec une déclaration de ressource, vous devez
// invoquer scope.close().
try (final Scope scope = tracer.activateSpan(span)) {
    // exception renvoyée ici
} catch (final Exception e) {
    // Définir le tag d'erreur sur la span
    span.log(Collections.singletonMap(Fields.ERROR_OBJECT, e));

    // Définir l'erreur sur la span racine
    if (span instanceof MutableSpan) {
        MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
        localRootSpan.setError(true);
        localRootSpan.setTag("some.other.tag", "value");
    }
} finally {
    // Fermer la span dans un bloc finally
    span.finish();
}
```

Si vous ne créez pas une span manuellement, vous pouvez tout de même accéder à la span racine au moyen du `GlobalTracer` :

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;
import datadog.trace.api.interceptor.MutableSpan;

...

final Span span = GlobalTracer.get().activeSpan();
if (span != null && (span instanceof MutableSpan)) {
    MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
    // utiliser la span racine
}
```

**Remarque** : bien que `MutableSpan` et `Span` partagent de nombreuses méthodes similaires, ils ont tous deux leurs propres spécificités. `MutableSpan` est propre à Datadog et n'est pas compris dans l'API OpenTracing.

<br>

## Ajout de tags

Si vous utilisez un [framework dont l'instrumentation automatique n'est pas prise en charge][5] ou que vous souhaitez apporter de la profondeur aux [traces][3] de votre application, vous pouvez ajouter une instrumentation personnalisée à votre code pour obtenir des flamegraphs complets ou pour mesurer les temps d'exécution de blocs de code.

S'il vous est impossible de modifier le code de l'application, utilisez la variable d'environnement `dd.trace.methods` pour exposer en détail ces méthodes.

Si vous possédez déjà une annotation `@Trace`  ou des annotations similaires, ou préférez avoir recours à des annotations pour terminer des traces incomplètes dans Datadog, utilisez la fonction d'annotation de traces.


### Méthodes de tracing Datadog

Vous pouvez vous servir de la propriété système `dd.trace.methods` pour afficher les frameworks non pris en charge, sans avoir à modifier le code de l'application.

```text
java -javaagent:/chemin/vers/dd-java-agent.jar -Ddd.env=prod -Ddd.service.name=db-app -Ddd.trace.methods=store.db.SessionManager[saveSession] -jar chemin/vers/application.jar
```

La seule différence entre cette approche et l'utilisation d'annotations `@Trace` se trouve au niveau des options de personnalisation des noms des opérations et des ressources. Avec DD Trace Methods, `operationName` est `trace.annotation` et `resourceName` est `SessionManager.saveSession`.

### Annotations de traces

Ajoutez `@Trace` aux méthodes pour permettre leur tracing lors d'une exécution avec `dd-java-agent.jar`. Si l'Agent n'est pas associé, cette annotation n'a aucun effet sur votre application.

La fonction d'annotation de traces de Datadog est fournie par la [dépendance dd-trace-api][6].

Les annotations `@Trace` prennent le nom d'opération par défaut `trace.annotation` ainsi que le nom de ressource de la méthode tracée. Ils peuvent être définis comme arguments de l'annotation `@Trace` pour refléter davantage ce qui est instrumenté. Il s'agit des seuls arguments pouvant être définis pour l'annotation `@Trace`.

```java
import datadog.trace.api.Trace;

public class SessionManager {

    @Trace(operationName = "database.persist", resourceName = "SessionManager.saveSession")
    public static void saveSession() {
        // implémenter votre méthode ici
    }
}
```
Notez que d'autres annotations de méthode de tracing peuvent être reconnues par Datadog comme `@Trace` via la propriété système `dd.trace.annotations`. Vous trouverez la liste [ici][7] si vous avez décoré votre code par le passé.

### Créer manuellement une nouvelle span

Outre l'instrumentation automatique, l'annotation `@Trace` et les configurations `dd.trace.methods`, vous pouvez personnaliser votre visibilité en programmant la création de spans autour d'un bloc de code. Les spans créées à l'aide de cette méthode s'intègrent automatiquement aux autres mécanismes de tracing. Autrement dit, si une trace a déjà commencé, la span manuelle aura son appelant comme span parent. De la même manière, une méthode tracée appelée à partir du bloc de code associé aura la span manuelle comme parent.

```java
import datadog.trace.api.DDTags;
import io.opentracing.Scope;
import io.opentracing.Span;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class SomeClass {
    void someMethod() {
        Tracer tracer = GlobalTracer.get();

        // Les tags service_name et resource_name sont requis.
        // Vous pouvez les définir à la création de la span :
        Span span = tracer.buildSpan("<NOM_OPÉRATION>")
            .withTag(DDTags.SERVICE_NAME, "<NOM_SERVICE>")
            .withTag(DDTags.RESOURCE_NAME, "<NOM_RESSOURCE>")
            .start();
        // Remarque : le scope dans le try avec le bloc de ressource ci-dessous
        // sera automatiquement fermé à la fin du bloc de code.
        // Si vous n'utilisez pas de try avec une déclaration de ressource, vous devez
        // invoquer scope.close().
        try (Scope scope = tracer.activateSpan(span)) {
            // Vous pouvez également définir les tags après la création
            span.setTag("my.tag", "value");

            // Le code à tracer

        } catch (Exception e) {
            // Définir l'erreur sur la span
        } finally {
            // Fermer la span dans un bloc finally
            span.finish();
        }
    }
}
```

### Extensions de traceurs

Les bibliothèques de tracing sont conçues pour être extensibles. Vous avez la possibilité d'écrire un post-processeur personnalisé, ou `TraceInterceptor`, pour intercepter des spans et ensuite les ajuster ou les ignorer en conséquence (par exemple, en fonction d'une expression régulière). L'exemple suivant illustre l'implémentation de deux intercepteurs afin d'appliquer une logique de post-processing complexe.

```java
import java.util.List;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import datadog.trace.api.interceptor.TraceInterceptor;
import datadog.trace.api.interceptor.MutableSpan;

class FilteringInterceptor implements TraceInterceptor {
    @Override
    public Collection<? extends MutableSpan> onTraceComplete(
            Collection<? extends MutableSpan> trace) {

        List<MutableSpan> filteredTrace = new ArrayList<>();
        for (final MutableSpan span : trace) {
          String orderId = (String) span.getTags().get("order.id");

          // Ignorer les spans lorsque l'ID d'ordre commence par "TEST-"
          if (orderId == null || !orderId.startsWith("TEST-")) {
            filteredTrace.add(span);
          }
        }

        return filteredTrace;
    }

    @Override
    public int priority() {
        // un nombre unique pour que cet intercepteur arrive en dernier
        return 100;
    }
}

class PricingInterceptor implements TraceInterceptor {
    @Override
    public Collection<? extends MutableSpan> onTraceComplete(
            Collection<? extends MutableSpan> trace) {

        for (final MutableSpan span : trace) {
          Map<String, Object> tags = span.getTags();
          Double originalPrice = (Double) tags.get("order.price");
          Double discount = (Double) tags.get("order.discount");

          // Définir un tag à partir du calcul d'autres tags
          if (originalPrice != null && discount != null) {
            span.setTag("order.value", originalPrice - discount);
          }
        }

        return trace;
    }

    @Override
    public int priority() {
        return 20; // un nombre unique
    }
}
```

Au début de votre application, enregistrez les intercepteurs avec ce qui suit :
```java
datadog.trace.api.GlobalTracer.get().addTraceInterceptor(new FilteringInterceptor());
datadog.trace.api.GlobalTracer.get().addTraceInterceptor(new PricingInterceptor());
```

<br>

## Configuration de l'Agent et du client de tracing

D'autres paramètres peuvent être configurés au niveau du client de tracing et de l'Agent Datadog pour la propagation en contexte avec les en-têtes B3, ainsi que pour empêcher des ressources spécifiques d'envoyer des traces à Datadog (si vous ne souhaitez pas que ces ces traces soient prises en compte pour le calcul des métriques, comme pour les checks de santé).

### Extraction et injection d'en-têtes B3

Le traceur de l'APM Datadog prend en charge [l'extraction et l'injection d'en-têtes B3][8] pour le tracing distribué.

L'injection et l'extraction distribuées d'en-têtes sont contrôlées en configurant des styles d'injection/extraction. Deux styles sont actuellement pris en charge :

- Datadog : `Datadog`
- B3 : `B3`

Les styles d'injection peuvent être configurés via :

- Propriété système : `-Ddd.propagation.style.inject=Datadog,B3`
- Variable d'environnement : `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

La propriété ou la variable d'environnement prend pour valeur une liste de styles d'en-tête séparés par des virgules (ou des espaces) qui sont activés pour l'injection. Par défaut, seul le style d'injection Datadog est activé.

Les styles d'extraction peuvent être configurés via :

- Propriété système : `-Ddd.propagation.style.extract=Datadog,B3`
- Variable d'environnement : `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

La propriété ou la variable d'environnement prend pour valeur une liste de styles d'en-tête séparés par des virgules (ou des espaces) qui sont activés pour l'extraction. Par défaut, seul le style d'extraction Datadog est activé.

Si plusieurs styles d'extraction sont activés, une tentative d'extraction est effectuée dans l'ordre selon lequel ces styles ont été configurés, et la première valeur extraite avec succès est utilisée.

### Filtrage de ressources

Il est possible d'exclure des traces en fonction de leur nom de ressource afin d'empêcher le trafic Synthetic (tel que les checks de santé) d'envoyer des traces à Datadog. Pour filtrer des ressources et configurer d'autres paramètres de sécurité et de personnalisation, accédez à la page [Sécurité][9] ou [Ignorer les ressources non désirées][10].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/#span-tags
[2]: /fr/tracing/glossary/#spans
[3]: /fr/tracing/glossary/#trace
[4]: /fr/tracing/custom_instrumentation/java/#set-tags-errors-on-a-root-span-from-a-child-span
[5]: /fr/tracing/setup/java/#compatibility
[6]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[7]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[8]: https://github.com/openzipkin/b3-propagation
[9]: /fr/tracing/security
[10]: /fr/tracing/guide/ignoring_apm_resources/
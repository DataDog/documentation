---
title: Instrumentation personnalisée .NET
kind: documentation
aliases:
  - /fr/tracing/opentracing/dotnet
  - /fr/tracing/manual_instrumentation/dotnet
description: Instrumentez manuellement votre application .NET afin d'envoyer des traces personnalisées à Datadog.
further_reading:
  - link: tracing/guide/instrument_custom_method
    tag: Guide
    text: Instrumenter une méthode personnalisée pour analyser en détail votre logique opérationnelle
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
<div class="alert alert-info">
Pour découvrir comment configurer le traceur .NET et activer l'instrumentation automatique, consultez les <a href="https://docs.datadoghq.com/tracing/setup/dotnet/">instructions de configuration pour .NET</a>.
</div>

**Remarque :** lorsque vous utilisez à la fois l'instrumentation personnalisée et l'instrumentation automatique, il est essentiel de veiller à ce que les versions du package NuGet et du programme d'installation MSI correspondent.

Cette page décrit des méthodes courantes pour configurer et personnaliser la visibilité sur votre application avec l'APM Datadog.

Ajoutez le [package NuGet][1] `Datadog.Trace` à votre application. Pour créer de nouvelles spans, accédez au traceur global via la propriété `Datadog.Trace.Tracer.Instance`.

L'instrumentation personnalisée est prise en charge pour **.NET Framework 4.5 et ultérieur** sur Windows, ainsi que pour **.NET Core 2.1, 3.0 et 3.1** sur Windows et Linux.


## Ajouter des tags et des spans

Ajoutez des [tags de span][2] personnalisés à vos [spans][3] pour personnaliser la visibilité sur vos applications dans Datadog. Les tags de span sont appliqués à vos traces entrantes, ce qui vous permet de corréler le comportement observé avec des informations au niveau du code, comme le niveau du commerçant, le montant du paiement, l'ID de l'utilisateur, etc.


### Ajouter des tags de span personnalisés

Ajoutez des tags personnalisés à vos spans correspondant à une valeur dynamique au sein du code de votre application, comme `customer.id`.

Ajoutez directement des tags à un objet `Datadog.Trace.Span` en appelant `Span.SetTag()`. Par exemple :

```csharp
public class ShoppingCartController : Controller
{
    private IShoppingCartRepository _shoppingCartRepository;

    [HttpGet]
    public IActionResult Index(int customerId)
    {
        // Accéder au contexte actif par l'intermédiaire
        // du traceur global (peut renvoyer null)
        var scope = Tracer.Instance.ActiveScope;

        if (scope != null)
        {
            // Ajouter un tag à la span à utiliser dans l'interface Web de Datadog
            scope.Span.SetTag("customer.id", customerId.ToString());
        }

        var cart = _shoppingCartRepository.Get(customerId);

        return View(cart);
    }
}
```

**Remarque** : `Datadog.Trace.Tracer.Instance.ActiveScope` renvoie`null` si aucune span n'est active.



### Ajouter des tags à l'ensemble des spans

Utilisez la variable d'environnement `DD_TAGS` afin d'appliquer des tags à l'ensemble des spans générées par une application. Cette fonctionnalité est particulièrement utile pour regrouper les stats de vos applications, centres de données, régions, etc. au sein de l'interface de Datadog. Par exemple :

```ini
DD_TAGS=datacenter:njc,key2:value2
```

### Définir des erreurs sur une span

Pour identifier et signaler les erreurs qui surviennent dans votre code, utilisez la méthode  `Span.SetException(Exception)` pour vos spans. Cette méthode signale que la span est une erreur et ajoute les [métadonnées de span associées][4] afin de fournir des informations pertinentes sur l'exception générée.

```csharp
try
{
    // ajouter une tâche qui génère une exception
}
catch(Exception e)
{
    span.SetException(e);
}
```

Cela permet de définir trois tags sur la span : `"error.msg":exception.Message`, `"error.stack":exception.ToString()` et `"error.type":exception.GetType().ToString()`.

### Créer manuellement une nouvelle span

Personnalisez votre visibilité en programmant la création de spans autour d'un bloc de code. Les spans créées à l'aide de cette méthode s'intègrent automatiquement aux autres mécanismes de tracing. Autrement dit, si une trace a déjà commencé, la span manuelle aura son appelant comme span parent. De la même manière, une méthode tracée appelée à partir du bloc de code associé aura la span manuelle comme parent.

```csharp
using (var parentScope =
       Tracer.Instance.StartActive("manual.sortorders"))
{
    using (var childScope =
           Tracer.Instance.StartActive("manual.sortorders.child"))
    {
        // Imbriquer au moyen de déclarations autour du code à tracer
        SortOrders();
    }
}
```
## Filtrage de ressources

Il est possible d'exclure des traces en fonction de leur nom de ressource afin d'empêcher le trafic Synthetic (tel que les checks de santé) d'envoyer des traces à Datadog. Pour filtrer des ressources et configurer d'autres paramètres de sécurité et de personnalisation, accédez à la page [Securité][5].

## OpenTracing

Datadog prend également en charge la norme OpenTracing. Pour en savoir plus, consultez l'[API OpenTracing][6].

### Configuration
Pour prendre en charge OpenTracing, ajoutez le [package NuGet][7] `Datadog.Trace.OpenTracing` à votre application. Lors du démarrage de l'application, initialisez la bibliothèque OpenTracing :

```csharp
using Datadog.Trace.OpenTracing;

public void ConfigureServices(IServiceCollection services)
{
    // Créer un iTracer OpenTracing avec les réglages par défaut
    OpenTracing.ITracer tracer = OpenTracingTracerFactory.CreateTracer();

    // Utiliser le traceur avec l'injection de dépendance ASP.NET Core
    services.AddSingleton<ITracer>(tracer);

    // Utiliser le traceur avec OpenTracing.GlobalTracer.Instance
    GlobalTracer.Register(tracer);
}
```

### Instrumenter manuellement une méthode

Utilisez OpenTracing pour créer une span.

```csharp
using (var scope =
       Tracer.Instance.StartActive("manual.sortorders"))
{
    SortOrders();
}
```

### Traces asynchrones

Pour tracer du code exécuté dans une tâche asynchrone, créez un nouveau contexte dans la tâche d'arrière-plan, comme vous le feriez pour wrapper du code synchrone.
```csharp
 Task.Run(
     () =>
     {
         using (var scope =
                Tracer.Instance.StartActive("manual.sortorders.async"))
         {
             SortOrders();
         }
     });

```


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.nuget.org/packages/Datadog.Trace
[2]: /fr/tracing/visualization/#span-tags
[3]: /fr/tracing/visualization/#spans
[4]: /fr/tracing/visualization/trace/?tab=spantags#more-information
[5]: /fr/tracing/security
[6]: https://github.com/opentracing/opentracing-csharp
[7]: https://www.nuget.org/packages/Datadog.Trace.OpenTracing
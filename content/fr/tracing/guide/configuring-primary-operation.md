---
title: Opérations primaires dans les services
kind: guide
aliases:
  - /fr/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
further_reading:
  - link: /tracing/setup/
    tag: Documentation
    text: Configurer le tracing d'APM avec votre application
  - link: /tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
  - link: /tracing/visualization/service/
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: /tracing/visualization/resource/
    tag: Documentation
    text: Plonger au cœur des traces et des performances de vos ressources
  - link: /tracing/visualization/trace/
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
---
## Services dans l'APM

Les services APM calculent des métriques de trace portant sur les erreurs, le débit et la latence. Ces données sont calculées en tenant compte des ressources correspondant à un nom de span unique, à savoir l'opération primaire. Ces métriques de service sont utilisées dans l'ensemble du produit, que ce soit dans la page Service par défaut, la liste des services ou encore la Service map.

**Remarque** : vous pouvez interroger les métriques de trace en indiquant `trace.*` [espacedenommage][1].

## Définition d'une opération primaire pour un service

Le nom de l'opération primaire d'un service détermine sa représentation dans l'interface. Le backend Datadog sélectionne automatiquement le nom d'opération avec le plus haut débit de requêtes afin d'en faire le point d'entrée vers le service.

Imaginons qu'un service `web-store` dispose de plusieurs endpoints, instrumentés comme des ressources. Celles-ci partagent alors la même opération primaire, car le point d'entrée vers ces ressources est identique. Par exemple, les ressources `/user/home` et `/user/new` doivent avoir toutes les deux la même opération primaire, `web.request`. Voici à quoi ressemble une opération primaire pour un service dans différents langages :

| Type de service           | Opération primaire                                 |
|------------------------|---------------------------------------------------|
| web                    | `servlet.request`, `flask.request`, `web.request` |
| db                     | `postgres.query`, `db.query`                      |
| custom-instrumentation | `trace.annotation`, `method.call`                 |

### Configuration de l'opération primaire

Lorsque plusieurs opérations primaires sont définies pour un service, c'est l'opération avec le plus haut débit de requêtes qui est automatiquement sélectionnée en tant que point d'entrée vers le service. Un administrateur peut également définir manuellement l'opération primaire :

1. Accédez à la [page des réglages de l'APM][2].
2. Sélectionnez l'onglet **Primary Operation Name**.
3. Cliquez sur l'icône de modification en regard du service que vous souhaitez définir manuellement.
4. Cliquez sur l'onglet **Set Manually**.
5. Sélectionnez l'opération à définir comme point d'entrée vers le service.
6. Cliquez sur **Enregistrer**.

{{< img src="tracing/guide/primary_operation/configuring-primary-option.png" alt="Enregistrement depuis l'APM" >}}

## Affichage de statistiques sur des noms de span supplémentaires

Pour vérifier que toutes les traces sont correctement envoyées à Datadog en dehors des instrumentations, vous pouvez consulter vos ressources en appliquant un filtre supplémentaire. Pour ce faire, sélectionnez dans un menu déroulant des noms de span supplémentaires considérés comme des opérations secondaires. Veuillez toutefois noter que ces noms de span ne sont pas utilisés pour calculer les statistiques au niveau des services.

{{< img src="tracing/guide/primary_operation/configuring-primary-option.png" alt="Enregistrement depuis l'APM" >}}

## Configuration de l'opération primaire dans une instrumentation manuelle

Lorsque vous instrumentez manuellement votre code, définissez de façon statique le nom de la span afin de veiller à ce que vos ressources soient regroupées en fonction de la même opération primaire (par exemple, `web.request`). Si le nom de la span est dynamique, définissez la span en tant que ressource.

Modifiez l'opération primaire (pour Python) :

```text
  @tracer.wrap('tornado.notify',
                service='tornado-notification',
                resource='MainHandler.action')
    @tornado.gen.coroutine
    def action(self):
        # À vous de jouer
```

Cette fonction définit de façon explicite le nom du service ainsi que l'opération primaire, à savoir respectivement `tornado-notification` et `tornado.notify`.

Le nom de la ressource est défini manuellement, avec `MainHandler.action`.

Le nom de la ressource prend par défaut cette valeur, car il s'agit du nom de la fonction et de la classe de la ressource dans Tornado.

## Opérations primaires OpenTracing

Dans Datadog, le nom d'opération Opentracing correspond à une ressource, tandis que le tag « component » correspond au nom de la span de Datadog. Pour définir une span avec la ressource « /user/profile » et le nom « http.request » de manière compréhensible pour OpenTracing, utilisez cet exemple en Go : 

```text
opentracing.StartSpan("http.request", opentracer.ResourceName("/user/profile"))
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/guide/metrics_namespace/
[2]: https://app.datadoghq.com/apm/settings
---
title: Instrumentation manuelle avec Ruby
kind: documentation
decription: Instrumentez manuellement votre application Ruby afin d'envoyer des traces personnalisées à Datadog.
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
Si vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code. Vous pouvez utiliser la méthode `Datadog.tracer.trace` pour tracer facilement votre code. Celle-ci peut être ajoutée autour de n'importe quel code Ruby :

```ruby
# Un exemple d'endpoint Sinatra,
# avec un tracing Datadog autour de la requête,
# une requête de base de données et des étapes de rendu.
get '/posts' do
  Datadog.tracer.trace('web.request', service: '<NOM_SERVICE>', resource: 'GET /posts') do |span|
    # Tracer l'appel activerecord
    Datadog.tracer.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Ajouter des tags d'APM
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # Tracer le rendu du modèle
    Datadog.tracer.trace('template.render') do
      erb :index
    end
  end
end
```

Pour en savoir plus sur l'instrumentation manuelle, consultez la [documentation relative à l'API][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/ruby/#compatibility
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#manual-instrumentation
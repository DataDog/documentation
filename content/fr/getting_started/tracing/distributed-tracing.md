---
title: Démarrage rapide – Tracing distribué
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: Découvrir comment configurer le tracing d'APM avec votre application
  - link: tracing/visualization/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
  - link: tracing/visualization/service
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: tracing/visualization/resource
    tag: Documentation
    text: Plonger au cœur des traces et des performances de vos ressources
  - link: tracing/visualization/trace
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
kind: guide
aliases:
  - /fr/tracing/faq/distributed-tracing
---
Si vous avez consulté le [premier exemple de tracing][1] et souhaitez en savoir plus sur le fonctionnement du tracing, voici un autre exemple impliquant une API simple **thinker-api** et un micro-service en arrière-plan **thinker-microservice**. Lorsque l'API reçoit une requête avec le paramètre *subject* adéquat, elle répond avec un *thought*. Sinon, elle répond avec une erreur :

{{< img src="tracing/product_specs/distributed_tracing/tracing_overview_GS.png" alt="Fonctionnement du tracing"  style="width:70%;">}}

* Requête :
    ```bash
    curl 'localhost:5000/think/?subject=technology&subject=foo_bar'
    ```

* Réponse :
    ```json
    {
        "technology": {
            "error": false,
            "quote": "For a successful technology, reality must take precedence over public relations, for Nature cannot be fooled.",
            "author": "Richard Feynman"
        },
        "foo_bar": {
            "error": true,
            "reason": "Subject unknown"
        }
    }
    ```

### Code utilisé

Nous avons deux modules :

* **API Thinker** : intercepte la requête utilisateur et la renvoie à **thinker-microservice**
    ```python
    import blinker as _
    import requests

    from flask import Flask, Response
    from flask import jsonify
    from flask import request as flask_request

    from ddtrace import tracer
    from ddtrace.contrib.flask import TraceMiddleware

    # Configuring Datadog tracer
    app = Flask('API')
    traced_app = TraceMiddleware(app, tracer, service='thinker-api')

    @app.route('/think/')
    def think_handler():
        thoughts = requests.get('http://thinker:8000/', headers={
            'x-datadog-trace-id': str(tracer.current_span().trace_id),
            'x-datadog-parent-id': str(tracer.current_span().span_id),
        }, params={
            'subject': flask_request.args.getlist('subject', str),
        }).content
        return Response(thoughts, mimetype='application/json')

    ```

* **Micro-service Thinker** : reçoit une requête de **thinker-api** avec un ou plusieurs `subjects` et répond avec un *thought* si le *subject* est « technology » :
    ```python
    import asyncio

    from aiohttp import web
    from ddtrace import tracer
    from ddtrace.contrib.aiohttp import trace_app

    app = web.Application()
    app.router.add_get('/', handle)

    trace_app(app, tracer, service='thinker-microservice')
    app['datadog_trace']['distributed_tracing_enabled'] = True

    @tracer.wrap(name='think')
    async def think(subject):
        tracer.current_span().set_tag('subject', subject)

        await asyncio.sleep(0.5)
        return thoughts[subject]

    thoughts = {
        'technology': Thought(
            quote='For a successful technology, reality must take precedence over public relations, for Nature cannot be fooled.',
            author='Richard Feynman',
        ),
    }

    async def handle(request):
        response = {}
        for subject in request.query.getall('subject', []):
            await asyncio.sleep(0.2)
            try:
                thought = await think(subject)
                response[subject] = {
                    'error': False,
                    'quote': thought.quote,
                    'author': thought.author,
                }
            except KeyError:
                response[subject] = {
                    'error': True,
                    'reason': 'Subject unknown'
                }

        return web.json_response(response)
    ```

Le code ci-dessus est déjà instrumenté. {Consultez la documentation sur la configuration][2] pour en savoir plus sur l'instrumentation de votre application et la configuration de l'Agent Datadog.

### APM Datadog

Une fois le code exécuté, des données commencent à s'afficher dans [l'APM][3]. Dans la [liste des services][4], nos deux services **thinker-api** et **thinker-microservice** s'affichent avec des métriques sur leurs performances :

{{< img src="tracing/product_specs/distributed_tracing/services_GS.png" alt="Liste des services"  >}}

Un clic sur **thinker-api** permet d'accéder à son [dashboard de service][5] généré automatiquement. De là, vous pouvez consulter des données de performances plus détaillées ainsi qu'une liste de toutes les ressources associées à ce service particulier :

* [Graphiques illustrant les performances du service][6]
* [Liste des ressources][7] associées à ce service particulier :

{{< img src="tracing/product_specs/distributed_tracing/resources_thinker_api_GS.png" alt="Ressources API thinker"  style="width:80%;">}}

La première fonction exécutée dans cet exemple est `think_handler()` qui traite la requête et la renvoie au service **thinker-microservice**.

Un clic sur la ressource **thinker_handler** permet d'accéder à son [dashboard][7] généré automatiquement ainsi qu'à une liste des traces associées à cette ressource particulière :

* [Graphiques illustrant les performances de la ressource][8]
* [Liste des traces échantillonnées][9] associées à cette ressource particulière :

{{< img src="tracing/product_specs/distributed_tracing/traces_thinker_api_GS.png" alt="Traces API thinker"  style="width:50%;">}}

Sélectionnez une trace pour ouvrir le _volet de traces_ contenant des informations comme :

* Le timestamp de la requête
* Le statut de la requête (p. ex. `200`)
* Les différents services rencontrés par la requête : (p. ex. **thinker_handler** et **thinker-microservice**)
* Le temps passé par votre application à traiter les fonctions tracées
* Des tags supplémentaires comme *http.method* et *http.url*

{{< img src="tracing/product_specs/distributed_tracing/trace_thinker_api_GS.png" alt="Trace API thinker"  style="width:80%;">}}

Dans l'image ci-dessus, on peut voir que la requête est d'abord reçue par le service **thinker-api** avec la [span][10] `flask.request`, qui transmet la requête traitée au service **thinker-microservice**, qui exécute deux fois la fonction `think()`.

Dans notre code, nous avons ajouté :

```
tracer.current_span().set_tag('subject', subject)
```

Ce qui vous permet d'obtenir davantage de contexte à chaque appel et traçage de `think()` :

* La première fois que `think` est exécuté, le *subject* est **technology** et tout fonctionne correctement :
    {{< img src="tracing/product_specs/distributed_tracing/traces_thinker_mircroservice_GS_1.png" alt="Microservice thinker 1"  style="width:80%;">}}

* La deuxième fois que `think` est exécuté, le *subject* est **foo_bar**, qui n'est pas la valeur attendue et entraîne une erreur :
    {{< img src="tracing/product_specs/distributed_tracing/traces_thinker_mircroservice_GS_2.png" alt="Microservice thinker 2"  style="width:80%;">}}

    Le format de présentation de cette erreur est automatiquement généré par l'instrumentation Datadog, mais vous pouvez le modifier en utilisant des [règles de tag à signification spéciale][11].

L'APM Datadog vous permet de tracer toutes les interactions d'une requête avec les différents services et ressources de n'importe quelle application.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing
[2]: /fr/tracing/send_traces
[3]: https://app.datadoghq.com/apm/home
[4]: /fr/tracing/visualization/services_list
[5]: /fr/tracing/visualization/service
[6]: /fr/tracing/visualization/service/#out-of-the-box-graphs
[7]: /fr/tracing/visualization/resource
[8]: /fr/tracing/visualization/resource/#out-of-the-box-graphs
[9]: /fr/tracing/guide/trace_sampling_and_storage
[10]: /fr/tracing/visualization/trace
[11]: /fr/tracing/visualization/trace/#traces-special-meaning-tags
---
disable_toc: false
further_reading:
- link: /observability_pipelines/monitoring/
  tag: Documentation
  text: Surveiller l'intégrité de vos pipelines
kind: documentation
title: Dépannage
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Les pipelines d'observabilité ne sont pas disponibles sur le site US1-FED de Datadog.</div>
{{< /site-region >}}

## Présentation
Si les pipelines d'observabilité Datadog se comportent de manière inattendue, consultez ce guide pour passer en revue les problèmes courants et suivre les solutions proposées. Si vous ne parvenez pas à résoudre votre problème, contactez l'[assistance Datadog][3] pour obtenir de l'aide.

## Analyser les logs de diagnostic

Le worker de pipelines d'observabilité génère des logs internes concernant sa propre santé. Dans l'interface des pipelines d'observabilité, vous pouvez analyser n'importe quel log d'erreur interne généré par le processus du worker pour chacun de ses composants. Pour afficher ces logs de diagnostic, procédez comme suit :

1. Accédez à la page [Observability Pipelines][1].
1. Cliquez sur le pipeline que vous souhaitez analyser.
1. Cliquez sur un composant pour afficher le volet latéral correspondant.
1. Cliquez sur l'onglet **Diagnostic Logs** pour afficher les logs d'erreur générés par le worker. Cliquez sur une entrée de log pour l'analyser dans le Log Explorer. Si aucun log n'est affiché, le composant n'a généré aucun log d'erreur.

### Obtenir des logs plus détaillés

Si vous avez besoin d'informations plus détaillées que celles figurant dans les logs internes générés par le worker des pipelines d'observabilité, vous pouvez augmenter le niveau des logs à l'aide de la variable d'environnement `VECTOR_LOG`. Par défaut, celle-ci est définie sur `INFO`, ce qui signifie que les messages `INFO`, `WARNING` et `ERROR` sont affichés dans la console.

La valeur `DEBUG` vous permet d'obtenir des informations plus détaillées sur les processus internes du worker (notamment les requêtes HTTP envoyées et les réponses reçues). L'assistance Datadog peut vous demander de fournir des logs `DEBUG` afin de faciliter la résolution de vos problèmes. Ces logs figurent également dans le Log Explorer et les [logs de diagnostic](#analyser-les-logs-de-diagnostic).

## Étudier les événements passant par votre pipeline pour identifier les problèmes de configuration

Si vous utilisez la version 1.4.0+ du worker des pipelines d'observabilité, vous pouvez explorer, via la commande `tap`, les données qui passent par vos sources, transformations et récepteurs, afin de visualiser les données brutes qui transitent via chaque composant de votre pipeline.

### Activer l'API du worker des pipelines d'observabilité

 L'API du worker des pipelines d'observabilité vous permet d'interagir avec les processus du worker à l'aide de la commande `tap`. Si vous utilisez les charts Helm fournis dans les [guides de configuration][2], l'API est déjà activée. Sinon, vérifiez que la variable d'environnement `DD_OP_API_ENABLED` est définie sur `true`. Cela configure l'API de façon à effectuer une écoute sur `localhost` et le port `8686`, soit le comportement attendu par la CLI pour la commande `tap`.

### Utiliser la commande `tap` pour visualiser vos données

Si vous êtes sur le même host que le worker, exécutez la commande `tap` suivante pour obtenir la sortie :

```
observability-pipelines-worker tap <nom de la source ou de la transformation>
```

Pour un environnement conteneurisé, utilisez la commande `docker exec` ou `kubectl exec`. Cela vous permet d'obtenir un shell dans le conteneur, afin d'exécuter la commande `tap` ci-dessus.

### Exemple d'utilisation de la commande `tap`

Ajoutez l'exemple de configuration suivant, qui permet à la transformation `cleanup` de copier le contenu de `message` dans l'attribut `log` :

```
sources:
  demo:
    type: demo_logs
    format: json

transforms:
  cleanup:
    type: remap
    inputs:
      - demo
    source: |-
      .log = .message

sinks:
  blackhole:
    type: blackhole
  inputs:
    - cleanup
  print_interval_secs: 0
```

Utilisez la commande suivante pour exécuter l'exemple de configuration et afficher la sortie de la transformation `cleanup` :

```
observability-pipelines-worker tap cleanup
```

La sortie attendue doit être similaire ce qui suit ; l'attribut `log` copie l'attribut `message` :

```
[tap] Pattern 'cleanup' successfully matched.
{"log":"{\"host\":\"121.142.241.212\",\"user-identifier\":\"meln1ks\",\"datetime\":\"25/Aug/2023:00:07:53\",\"method\":\"OPTION\",\"request\":\"/observability/metrics/production\",\"protocol\":\"HTTP/1.0\",\"status\":\"550\",\"bytes\":3185,\"referer\":\"https://make.us/wp-admin\"}","message":"{\"host\":\"121.142.241.212\",\"user-identifier\":\"meln1ks\",\"datetime\":\"25/Aug/2023:00:07:53\",\"method\":\"OPTION\",\"request\":\"/observability/metrics/production\",\"protocol\":\"HTTP/1.0\",\"status\":\"550\",\"bytes\":3185,\"referer\":\"https://make.us/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:53.429855261Z"}
{"log":"{\"host\":\"117.214.24.224\",\"user-identifier\":\"Karimmove\",\"datetime\":\"25/Aug/2023:00:07:54\",\"method\":\"HEAD\",\"request\":\"/do-not-access/needs-work\",\"protocol\":\"HTTP/2.0\",\"status\":\"503\",\"bytes\":41730,\"referer\":\"https://some.org/wp-admin\"}","message":"{\"host\":\"117.214.24.224\",\"user-identifier\":\"Karimmove\",\"datetime\":\"25/Aug/2023:00:07:54\",\"method\":\"HEAD\",\"request\":\"/do-not-access/needs-work\",\"protocol\":\"HTTP/2.0\",\"status\":\"503\",\"bytes\":41730,\"referer\":\"https://some.org/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:54.430584949Z"}
{"log":"{\"host\":\"108.145.218.149\",\"user-identifier\":\"shaneIxD\",\"datetime\":\"25/Aug/2023:00:07:55\",\"method\":\"DELETE\",\"request\":\"/this/endpoint/prints/money\",\"protocol\":\"HTTP/2.0\",\"status\":\"403\",\"bytes\":18340,\"referer\":\"https://up.de/wp-admin\"}","message":"{\"host\":\"108.145.218.149\",\"user-identifier\":\"shaneIxD\",\"datetime\":\"25/Aug/2023:00:07:55\",\"method\":\"DELETE\",\"request\":\"/this/endpoint/prints/money\",\"protocol\":\"HTTP/2.0\",\"status\":\"403\",\"bytes\":18340,\"referer\":\"https://up.de/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:55.430085107Z"}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines/
[2]: /fr/observability_pipelines/setup/
[3]: /fr/help
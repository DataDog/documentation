---
title: Dépannage de l'APM
kind: documentation
further_reading:
  - link: /agent/docker/apm
    tag: Documentation
    text: Configuration de l'APM Docker
  - link: '/integrations/amazon_ecs/#collecte-de-traces'
    tag: Documentation
    text: Configuration de l'APM ECS EC2
  - link: '/integrations/ecs_fargate/#collecte-de-traces'
    tag: Documentation
    text: Configuration de l'APM ECS Fargate
---
En cas de comportement inattendu de l'APM Datadog, passez en revue les problèmes courants avant de contacter [l'assistance Datadog][1] :

1. **Assurez-vous que l'APM est activé pour l'Agent** :

    Exécutez la commande suivante sur le host de l'Agent : `netstat -anp | grep 8126`.

    Si aucune entrée ne s'affiche, l'Agent n'écoute pas sur le port `8126`, ce qui signifie généralement que l'Agent ne fonctionne pas ou que l'APM n'est pas activé dans votre fichier `datadog.yaml`. Consultez la [documentation relative à la configuration de l'Agent APM][2] pour en savoir plus.

2. **Vérifiez que l'Agent fonctionne correctement** :

    Dans certains cas, l'Agent peut avoir des difficultés à envoyer des traces à Datadog. [Activez le mode debugging de l'Agent][3] et vérifiez les [logs de l'Agent de trace][4] à la recherche d'erreurs.

3. **Vérifiez que votre traceur fonctionne correctement** :

    Après avoir [activé le mode debugging du traceur](#mode-debugging-du-traceur), vérifiez les logs de votre Agent à la recherche d'informations supplémentaires sur le problème.

Si vous constatez des erreurs que vous ne comprenez pas, ou si les [traces][5] sont signalées comme envoyées à Datadog mais que vous ne les voyez pas dans l'interface, [contactez l'assistance Datadog][5] et envoyez les entrées de log pertinentes avec [un flare][6].

## Mode debugging du traceur

Les paramètres de debugging de Datadog servent à diagnostiquer les problèmes ou à auditer les données de trace. Nous vous déconseillons d'activer le mode debugging sur vos systèmes de production, car cela augmente le nombre d'événements envoyés à vos loggers. Utilisez cette fonctionnalité avec parcimonie, et uniquement à des fins de debugging.

Le mode debugging est désactivé par défaut. Pour l'activer, suivez les instructions correspondant au langage utilisé :

{{< tabs >}}
{{% tab "Java" %}}

Pour activer le mode debugging pour le traceur Java Datadog, définissez le flag `-Ddd.trace.debug=true` au démarrage du JVM ou ajoutez la variable d'environnement `DD_TRACE_DEBUG=true`.

**Remarque** : le traceur Java Datadog implémente SL4J SimpleLogger. [Tous ses paramètres peuvent donc être appliqués][1], comme l'enregistrement dans un fichier de log dédié : `-Ddatadog.slf4j.simpleLogger.logFile=<NOUVEAU_CHEMIN_FICHIER_LOG>`

[1]: https://www.slf4j.org/api/org/slf4j/impl/SimpleLogger.html
{{% /tab %}}
{{% tab "Python" %}}

Pour activer le mode debugging pour le traceur Python Datadog, définissez la variable d'environnement `DATADOG_TRACE_DEBUG=true` lorsque vous utilisez `ddtrace-run`.

{{% /tab %}}
{{% tab "Ruby" %}}

Pour activer le mode debugging pour le traceur Ruby Datadog, définissez l'option `debug` sur `true` dans la configuration d'initialisation du traceur :

```ruby
Datadog.configure do |c|
  c.tracer debug: true
end
```

**Logs d'application** :

Par défaut, tous les logs sont traités par le logger Ruby de base. Lorsque vous utilisez Rails, les messages s'affichent dans le fichier de log de votre application.

Les messages de log du client Datadog sont indiqués par `[ddtrace]`. Vous pouvez donc les isoler des autres messages.

De plus, vous pouvez modifier le logger par défaut et le remplacer par un logger personnalisé. Pour ce faire, utilisez l'attribut ``log`` du traceur.

```ruby
f = File.new("<NOMFICHIER>.log", "w+")           # Les messages de log doivent être ici
Datadog.configure do |c|
  c.tracer log: Logger.new(f)                 # Remplacement du traceur par défaut
end

Datadog::Tracer.log.info { "Ceci est généralement appelé par le code de tracing" }
```

Consultez [la documentation relative à l'API][1] pour en savoir plus.


[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#custom-logging
{{% /tab %}}
{{% tab "Go" %}}

Pour activer le mode debugging pour le traceur Go Datadog, activez le mode debugging dans la configuration `Start` :

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(tracer.WithDebugMode(true))
    defer tracer.Stop()
}
```

{{% /tab %}}

{{% tab "Node.js" %}}

Pour activer le mode debugging pour le traceur Node.js Datadog, activez-le durant son `init` :

```javascript
const tracer = require('dd-trace').init({
  debug: true
})
```

**Logs d'application** :

Par défaut, la journalisation à partir de cette bibliothèque est désactivée. Pour obtenir les informations de debugging et les erreurs envoyées aux logs, les options `debug` doivent être définies sur `true` dans la méthode [init()][1].

Le traceur enregistre ensuite les informations de debugging dans `console.log()` et les erreurs dans `console.error()`. Ce comportement peut être modifié en transmettant un logger personnalisé au traceur. Celui-ci doit contenir des méthodes `debug()` et `error()` capables de gérer respectivement les messages et les erreurs.

Par exemple :

```javascript
const bunyan = require('bunyan')
const logger = bunyan.createLogger({
  name: 'dd-trace',
  level: 'trace'
})

const tracer = require('dd-trace').init({
  logger: {
    debug: message => logger.trace(message),
    error: err => logger.error(err)
  },
  debug: true
})
```

Vérifiez ensuite les logs de l'Agent à la recherche d'informations supplémentaires sur le problème :

* Si la trace a été correctement envoyée à l'Agent, vous devriez voir des entrées de log `Response from the Agent: OK`. Cela indique que le traceur fonctionne correctement. Le problème réside donc au niveau de l'Agent. Consultez le [guide de dépannage de l'Agent][2] pour en savoir plus.

* Si une erreur est signalée par l'Agent (ou qu'aucune communication avec l'Agent ne peut être établie), des entrées `Error from the Agent` apparaissent alors dans le log. Dans ce cas, validez votre configuration réseau pour vérifier que la connexion à l'Agent est possible. Si vous êtes sûr que le réseau est opérationnel et que l'erreur provient de l'Agent, consultez le [Guide de dépannage de l'Agent][2].

Si aucune de ces entrées de log n'est présente, aucune requête n'a été envoyée à l'Agent, ce qui signifie que le traceur n'instrumente pas votre application. Dans ce cas, [contactez l'assistance Datadog][3] et envoyez les entrées de log pertinentes avec [un flare][4].

Pour découvrir davantage de paramètres pour le traceur, consultez la [documentation relative à l'API][5].


[1]: https://datadog.github.io/dd-trace-js/Tracer.html#init
[2]: /fr/agent/troubleshooting
[3]: /fr/help
[4]: /fr/agent/troubleshooting/#send-a-flare
[5]: https://datadog.github.io/dd-trace-js/#tracer-settings
{{% /tab %}}
{{% tab ".NET" %}}

Pour activer le mode debugging pour le traceur .NET Datadog, définissez l'argument `isDebugEnabled` sur `true` lors de la création d'une nouvelle instance de traceur :

```csharp
using Datadog.Trace;

var tracer = Tracer.Create(isDebugEnabled: true);

// facultatif : définir le nouveau traceur en tant que nouveau traceur global/par défaut
Tracer.Instance = tracer;
```

La variable d'environnement `DD_TRACE_DEBUG` peut également être définie sur `true`.

Les fichiers de log sont enregistrés dans les répertoires suivants :

| Plateforme | Chemin                                                          |
|----------|---------------------------------------------------------------|
| Linux    | `/var/log/datadog/`                        |
| Windows  | `%ProgramData%\Datadog .NET Tracer\logs\` |


{{% /tab %}}
{{% tab "PHP" %}}

Pour activer le mode debugging pour le traceur PHP Datadog, définissez la variable d'environnement `DD_TRACE_DEBUG=true`. Consultez la [documentation de configuration][1] PHP pour découvrir comment et quand cette valeur de variable d'environnement doit être définie afin d'être gérée de façon adéquate par le traceur.

Pour indiquer à PHP où placer les messages `error_log`, vous pouvez définir l'emplacement au niveau du serveur, ou en tant que paramètre `ini` PHP. Cette dernière option constitue la solution standard pour configurer le comportement PHP.

Si vous exploitez un serveur Apache, utilisez la directive `ErrorLog`.
Si vous exploitez un serveur NGINX, utilisez la directive `error_log`.
Si vous effectuez une configuration au niveau de PHP, utilisez le paramètre ini `error_log` de PHP.

[1]: https://www.php-fig.org/psr/psr-3
{{% /tab %}}
{{% tab "C++" %}}

Les bibliothèques binaires partagées sont toutes compilées en ajoutant des symboles de debugging à la version optimisée. Vous pouvez utiliser gdb ou lldb pour effectuer le debugging de la bibliothèque et lire les core dumps. Si vous créez la bibliothèque depuis les sources, transmettez l'argument `-DCMAKE_BUILD_TYPE=RelWithDebInfo` à cmake afin de compiler un build optimisé avec les symboles de debugging.

```bash
cd .build
cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
make
make install
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/help
[2]: /fr/tracing/setup/#agent-configuration
[3]: /fr/agent/troubleshooting/?tab=agentv6#get-more-logging-from-the-agent
[4]: /fr/agent/guide/agent-log-files
[5]: /fr/tracing/visualization/#trace
[6]: /fr/help
[7]: /fr/agent/troubleshooting/#send-a-flare
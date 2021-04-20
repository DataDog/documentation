---
title: Logs de debugging du traceur
kind: Documentation
---
### Activer le mode debugging du traceur

Utilisez les paramètres de debugging de Datadog pour diagnostiquer les problèmes ou auditer les données de trace. Nous vous déconseillons d'activer le mode debugging sur vos systèmes de production, car cela augmente le nombre d'événements envoyés à vos loggers. Utilisez cette fonctionnalité avec parcimonie, et uniquement à des fins de debugging.

Le mode debugging est désactivé par défaut. Pour l'activer, suivez les instructions correspondant au langage utilisé :

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}

{{< programming-lang lang="java" >}}

Pour activer le mode debugging pour le traceur Java Datadog, définissez le flag `-Ddd.trace.debug=true` au démarrage de la JVM ou ajoutez la variable d'environnement `DD_TRACE_DEBUG=true`.

**Remarque** : le traceur Java Datadog implémente SL4J SimpleLogger. [Tous ses paramètres peuvent donc être appliqués][1]. Par exemple, il est possible d'enregistrer les logs dans un fichier dédié :
```
-Ddatadog.slf4j.simpleLogger.logFile=<NOUVEAU_CHEMIN_FICHIER_LOG>`
````

[1]: https://www.slf4j.org/api/org/slf4j/impl/SimpleLogger.html

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Pour activer le mode debugging pour le traceur Python Datadog, définissez la variable d'environnement `DATADOG_TRACE_DEBUG=true` lorsque vous utilisez `ddtrace-run`.
<p></p>

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

Pour activer le mode debugging pour le traceur Ruby Datadog, définissez l'option `debug` sur `true` dans la configuration d'initialisation du traceur :

```ruby
Datadog.configure do |c|
  c.tracer debug: true
end
```

**Logs d'application** :

Par défaut, tous les logs sont traités par le logger Ruby de base. Lorsque vous utilisez Rails, les messages s'affichent dans le fichier de log de votre application.

Les messages de log du client Datadog sont indiqués par `[ddtrace]`. Vous pouvez donc les isoler des autres messages.

Vous pouvez utiliser un logger personnalisé à la place du logger par défaut à l'aide de l'attribut `log` du traceur :

```ruby
f = File.new("<NOMFICHIER>.log", "w+")           # Les messages de log doivent être ici
Datadog.configure do |c|
  c.tracer log: Logger.new(f)                 # Remplacement du traceur par défaut
end

Datadog::Tracer.log.info { "Ceci est généralement appelé par le code de tracing" }
```

Consultez [la documentation relative à l'API][1] pour en savoir plus.

[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#custom-logging

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

Pour activer le mode debugging pour le traceur Go Datadog, activez le mode debug dans la configuration `Start` :

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(tracer.WithDebugMode(true))
    defer tracer.Stop()
}
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

Pour activer le mode debugging pour le traceur Node.js Datadog, activez-le durant son `init` :

```javascript
const tracer = require('dd-trace').init({
  debug: true
})
```

**Logs d'application** :

Par défaut, la journalisation à partir de cette bibliothèque est désactivée. Pour obtenir les informations de debugging et les erreurs envoyées aux logs, définissez les options `debug` sur `true` dans la méthode [init()][1].

Le traceur enregistre ensuite les informations de debugging dans `console.log()` et les erreurs dans `console.error()`. Vous pouvez modifier ce comportement en transmettant un logger personnalisé au traceur. Celui-ci doit contenir des méthodes `debug()` et `error()` capables de gérer respectivement les messages et les erreurs.

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

Consultez ensuite les logs de votre Agent et recherchez des informations supplémentaires sur le problème.

* Si la trace a été correctement envoyée à l'Agent, vous devriez voir des entrées de log `Response from the Agent: OK`. Cela indique que le traceur fonctionne correctement et que le problème est donc susceptible de résider au niveau de l'Agent. Consultez le [guide de dépannage de l'Agent][2] pour en savoir plus.

* Si une erreur est signalée par l'Agent (ou qu'aucune communication avec l'Agent ne peut être établie), des entrées `Error from the Agent` apparaissent alors dans le log. Dans ce cas, validez votre configuration réseau pour vérifier que la connexion à l'Agent est possible. Si vous êtes sûr que le réseau est opérationnel et que l'erreur provient de l'Agent, consultez le [Guide de dépannage de l'Agent][2].

Si aucune de ces entrées de log n'est présente, aucune requête n'a été envoyée à l'Agent, ce qui signifie que le traceur n'instrumente pas votre application. Dans ce cas, [contactez l'assistance Datadog][3] et envoyez les entrées de log pertinentes avec [un flare][4].

Pour découvrir davantage de paramètres pour le traceur, consultez la [documentation relative à l'API][5].

[1]: https://datadog.github.io/dd-trace-js/Tracer.html#init
[2]: /fr/agent/troubleshooting/
[3]: /fr/help/
[4]: /fr/agent/troubleshooting/#send-a-flare
[5]: https://datadog.github.io/dd-trace-js/#tracer-settings

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Pour activer le mode debugging pour le traceur .NET Datadog, définissez le paramètre de configuration `DD_TRACE_DEBUG` sur `true`. Ce paramètre peut être défini comme variable d'environnement dans le fichier `web.config` ou `app.config` (.NET Framework uniquement), ou dans le fichier `datadog.json`. Vous pouvez également activer le mode debugging en appelant `GlobalSettings.SetDebugEnabled(true)` :

```csharp
using Datadog.Trace;

// activer le mode debugging
GlobalSettings.SetDebugEnabled(true);

```

Les fichiers de logs sont par défaut enregistrés dans les répertoires suivants. Utilisez le paramètre `DD_TRACE_LOG_DIRECTORY` pour modifier ces chemins.

| Plateforme | Chemin                                      |
|----------|-------------------------------------------|
| Windows  | `%ProgramData%\Datadog .NET Tracer\logs\` |
| Linux    | `/var/log/datadog/dotnet/`                |

**Remarque :** sous Linux, vous devez créer le répertoire des logs avant d'activer le mode debugging.

Pour en savoir plus sur la configuration du traceur .NET, consultez la section [Configuration][1].

Deux types de logs sont créés à ces emplacements :
1. **Les logs provenant du code natif :** avec la version 1.21.0 et ultérieur, ces logs sont enregistrés sous le nom `dotnet-tracer-native.log`. Avec les versions antérieures, ils sont stockés sous le nom `dotnet-profiler.log`.
2. **Les logs provenant du code géré :** avec la version 1.21.0 et ultérieur, ces logs sont enregistrés sous le nom `dotnet-tracer-managed-<nom_processus>-<date>.log`. Avec les versions antérieures, ils sont stockés sous le nom `dotnet-tracer-<nom_processus>-<date>.log`.


[1]: /fr/tracing/setup/dotnet/#configuration

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

Pour activer le mode debugging pour le traceur PHP Datadog, définissez la variable d'environnement `DD_TRACE_DEBUG=true`. Consultez la [documentation de configuration][1] PHP (en anglais) pour découvrir comment et quand cette valeur de variable d'environnement doit être définie afin d'être gérée de façon adéquate par le traceur.

Vous pouvez indiquer à PHP où envoyer les messages `error_log` en choisissant un emplacement au niveau du serveur ou via un paramètre `ini` PHP. Cette dernière option constitue la solution standard pour configurer le comportement de PHP.

Si vous exploitez un serveur Apache, utilisez la directive `ErrorLog`.
Si vous exploitez un serveur NGINX, utilisez la directive `error_log`.
Si vous effectuez une configuration au niveau de PHP, utilisez le paramètre ini `error_log` de PHP.

[1]: https://www.php-fig.org/psr/psr-3

{{< /programming-lang >}}

{{< programming-lang lang="cpp" >}}

Les bibliothèques binaires partagées sont toutes compilées en ajoutant des symboles de debugging à la version optimisée. Vous pouvez utiliser GDB ou LLDB pour effectuer le debugging de la bibliothèque et lire les core dumps. Si vous créez la bibliothèque depuis les sources, transmettez l'argument `-DCMAKE_BUILD_TYPE=RelWithDebInfo` à cmake afin de compiler un build optimisé avec les symboles de debugging.

```bash
cd .build
cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
make
make install
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Examiner les logs de debugging du traceur

Lorsque le mode debugging pour votre traceur est activé, des messages de log concernant le traceur indiquent comment le traceur a été initialisé et si des traces ont été envoyées à l'Agent. **Ces logs ne sont pas envoyés à l'Agent Datadog dans le flare et sont stockés dans un chemin distinct selon votre configuration de log**. Les exemples de logs suivants montrent les éléments qui peuvent figurer dans votre fichier de log.

Si vous constatez des erreurs que vous ne comprenez pas, ou si les traces sont signalées comme envoyées à Datadog mais que vous ne les voyez pas dans l'interface, [contactez l'assistance Datadog][1] et envoyez les entrées de log pertinentes avec [un flare][2].

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

**Log d'initialisation pour le traceur :**

```java
[main] DEBUG datadog.trace.agent.ot.DDTracer - Using config: Config(runtimeId=<ID runtime>, serviceName=<nom service>, traceEnabled=true, writerType=DDAgentWriter, agentHost=<ADRESSE_IP>, agentPort=8126, agentUnixDomainSocket=null, prioritySamplingEnabled=true, traceResolverEnabled=true, serviceMapping={}, globalTags={env=none}, spanTags={}, jmxTags={}, excludedClasses=[], headerTags={}, httpServerErrorStatuses=[512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511], httpClientErrorStatuses=[400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499], httpClientSplitByDomain=false, partialFlushMinSpans=1000, runtimeContextFieldInjection=true, propagationStylesToExtract=[DATADOG], propagationStylesToInject=[DATADOG], jmxFetchEnabled=true, jmxFetchMetricsConfigs=[], jmxFetchCheckPeriod=null, jmxFetchRefreshBeansPeriod=null, jmxFetchStatsdHost=null, jmxFetchStatsdPort=8125, logsInjectionEnabled=false, reportHostName=false)
```

**Exemple de traces générées :**

```java
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.DDSpan - Finished: DDSpan [ t_id=<id trace>, s_id=<id span>, p_id=<id parent>] trace=SpringBoot_Service/OperationHandler.handle/OperationHandler.handle metrics={} tags={component=spring-web-controller, env=none, span.kind=server, thread.id=33, thread.name=http-nio-8080-exec-1}, duration_ns=92808848
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - traceId: <id trace> -- Expired reference. count = 1
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.DDSpan - Finished: DDSpan [ t_id=<id trace>, s_id=<id span>, p_id=0] trace=SpringBoot_Service/servlet.request/GET /actuator/prometheus metrics={_sampling_priority_v1=1} tags={component=java-web-servlet, env=none, http.method=GET, http.status_code=200, http.url=http://<IP>:8080/actuator/prometheus, language=jvm, peer.hostname=<IP>, peer.ipv4=<IP>, peer.port=50778, runtime-id=<id runtime>, span.kind=server, span.origin.type=org.apache.catalina.core.ApplicationFilterChain, thread.id=33, thread.name=http-nio-8080-exec-1}, duration_ns=157972901
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - Writing 2 spans to DDAgentWriter { api=DDApi { tracesUrl=http://<IP address>/v0.4/traces } }.
```

**Des traces ont été envoyées à l'Agent Datadog :**

```java
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - traceId: <id trace> -- Expired reference. count = 0
[dd-trace-writer] DEBUG datadog.trace.agent.common.writer.DDApi - Successfully sent 1 of 2 traces to the DD agent.
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Pour plus de visibilité, ajoutez `DD_LOGGING_RATE_LIMIT=0`.

**Des traces ont été générées :**

```shell
<YYYY-MM-DD> 16:01:11,280 DEBUG [ddtrace.tracer] [tracer.py:470] - writing 8 spans (enabled:True)
```

**Span générée par le traceur Python :**

```text
<YYYY-MM-DD> 16:01:11,280 DEBUG [ddtrace.tracer] [tracer.py:472] -
      name flask.request
        id <id span>
  trace_id <id trace>
 parent_id <id parent>
   service flask
  resource GET /
      type http
     start <heure début>
       end <heure fin>
  duration 0.004759s
     error 0
      tags
           flask.endpoint:index
           flask.url_rule:/
           flask.version:1.1.1
           http.method:GET
           http.status_code:200
           http.url:http://0.0.0.0:5050/
           system.pid:25985

```


**Des traces ont été envoyées à l'Agent Datadog :**

```shell
<YYYY-MM-DD> 16:01:11,637 DEBUG [ddtrace.api] [api.py:236] - reported 1 traces in 0.00207s
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

**La span est générée :**

```shell
D, [<YYYY-MM-DD>T16:42:51.147563 #476] DEBUG -- ddtrace: [ddtrace] (/usr/local/bundle/gems/ddtrace-<version>/lib/ddtrace/tracer.rb:371:in `write') Writing 4 spans (enabled: true)

 Name: rack.request
Span ID: <id span>
Parent ID: 0
Trace ID: <id trace>
Type: web
Service: todo
Resource: NotesController#index
Error: 0
Start: <heure début>
End: <heure fin>
Duration: 11985000
Allocations: 1202
Tags: [
   system.pid => 476,
   env => dev,
   language => ruby,
   http.method => GET,
   http.url => /notes,
   http.base_url => http://0.0.0.0:3000,
   http.status_code => 304,
   http.response.headers.x_request_id => <valeur en-tête>]
Metrics: [
   ..],

```


{{< /programming-lang >}}

{{< programming-lang lang="go" >}}


**Tentative d'envoi de traces à l'Agent :**

```shell
YYYY/MM/DD 16:06:35 Datadog Tracer <version> DEBUG: Sending payload: size: <taille des traces> traces: <nombre de  traces>.
```


**Échec de l'envoi des traces à l'Agent :**

```shell
2019/08/07 16:12:27 Datadog Tracer <version> ERROR: lost <nombre de traces> traces: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused, 4 additional messages skipped (first occurrence: DD MM YY 16:11 UTC)
```


{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

**Erreur lors de l'envoi des traces à l'Agent :**

```json
{
    "name": "dd-trace",
    "hostname": "<hostname>",
    "pid": 28817,
    "level": 50,
    "err": {
        "message": "Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126",
        "name": "Error",
        "stack": "Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126\n    at ClientRequest.req.on.e (/chemin/vers/dd-trace/src/platform/node/request.js:44:33)\n    at scope.activate (/chemin/vers/packages/dd-trace/dd-trace/src/scope/base.js:68:19)\n    at Scope._activate (/chemin/vers/packages/dd-trace/dd-trace/src/scope/base.js:44:14)\n    at Scope.activate (/chemin/vers/packages/dd-trace/dd-trace/src/scope/base.js:13:17)\n    at ClientRequest.<anonyme> (/chemin/vers/packages/dd-trace/src/scope/base.js:67:20)\n    at ClientRequest.emit (events.js:193:13)\n    at ClientRequest.req.emit (/chemin/vers/packages/dd-trace/datadog-plugin-http/src/client.js:93:21)\n    at Socket.socketErrorListener (_http_client.js:397:9)\n    at Socket.emit (events.js:198:15)\n    at emitErrorNT (internal/streams/destroy.js:91:8)"
    },
    "msg": "Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126",
    "time": "2019-08-06T20:48:27.769Z",
    "v": 0
}
```


{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Pour des raisons de performance, le traceur écrit chaque message de log unique au moins une fois toutes les 60 secondes. Pour bénéficier d'une meilleure visibilité pendant le debugging, désactivez la limite de débit en définissant la variable d'environnement `DD_TRACE_LOGGING_RATE=0`.

**Logs provenant du code natif :**

```shell
[dotnet] 19861: [debug] JITCompilationStarted: function_id=<id fonction> token=<id token> name=System.Net.Http.Headers.HttpHeaders.RemoveParsedValue()
```


**Logs provenant du code géré indiquant que les spans ont été générées :**

```shell
{ MachineName: ".", ProcessName: "dotnet", PID: <id process>, AppDomainName: "test-webapi" }
YYYY-MM-DD HH:MM:SS.<nombre entier> +00:00 [DBG] Span started: [s_id: <id span>, p_id: <id span parent>, t_id: <id trace>]
{ MachineName: ".", ProcessName: "dotnet", PID: <id process>, AppDomainName: "test-webapi" }
YYYY-MM-DD HH:MM:SS.<nombre entier> +00:00 [DBG] Span closed: [s_id: <id span>, p_id: <id span parent>, t_id: <id trace>] for (Service: test-webapi, Resource: custom, Operation: custom.function, Tags: [<tags span>])
```

**Logs provenant du code géré indiquant que les traces n'ont pas pu être envoyées à l'Agent Datadog :**

```shell
YYYY-MM-DD HH:MM:SS.<nombre entier> +00:00 [ERR] An error occurred while sending traces to the agent at System.Net.Http.HttpRequestException: Connection refused ---> System.Net.Sockets.SocketException: Connection refused
   at System.Net.Http.ConnectHelper.ConnectAsync(String host, Int32 port, CancellationToken cancellationToken)
   --- End of inner exception stack trace ---
```


{{< /programming-lang >}}

{{< programming-lang lang="php" >}}


**Génération d'une span :**

```shell
[Mon MM  DD 19:41:13 YYYY] [YYYY-MM-DDT19:41:13+00:00] [ddtrace] [debug] - Encoding span <id span> op: 'laravel.request' serv: 'Sample_Laravel_App' res: 'Closure unnamed_route' type 'web'
```



**Tentative d'envoi d'une trace à l'Agent :**

```shell
[Mon MM  DD 19:56:23 YYYY] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [debug] - About to send trace(s) to the agent
```


**La trace a bien été envoyée à l'Agent :**

```shell
[Mon MM  DD 19:56:23 2019] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [debug] - Traces successfully sent to the agent
```


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

[1]: /fr/help/
[2]: /fr/agent/troubleshooting/#send-a-flare
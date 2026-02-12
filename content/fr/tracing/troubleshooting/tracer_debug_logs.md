---
description: Activer et collecter les journaux de débogage des traceurs APM pour résoudre
  les problèmes de configuration et de connectivité.
further_reading:
- link: /tracing/troubleshooting/connection_errors/
  tag: Documentation
  text: Dépanner des erreurs de connexion APM
title: Logs de debugging du traceur
---

## Collecte automatisée des journaux de débogage
<div class="alert alert-danger">La collecte automatisée des journaux de débogage est prise en charge uniquement pour Java, Python, Node.js et .NET. Pour d'autres langages, utilisez <a href="/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode">la collecte manuelle des journaux de débogage</a> à la place.</div>

Une flare vous permet d'envoyer les informations de dépannage nécessaires à l'équipe de support Datadog, y compris les journaux de traceurs, avec les données sensibles supprimées. Les flares sont utiles pour résoudre des problèmes tels qu'une utilisation élevée du CPU, une utilisation élevée de la mémoire et des spans manquants.

### Prérequis
- [La configuration à distance][3] doit être activée.
- Votre clé API doit être configurée pour la configuration à distance.
- Vous devez avoir une version de traceur prise en charge :
  - Java : `1.26.0` ou supérieur
  - Python : `3.12.0` ou supérieur
  - Node.js : `5.15.0` ou supérieur, ou `4.39.0` ou supérieur
  - .NET : `2.46.0` ou supérieur

### Envoyer un flare
Pour envoyer une flare depuis le site Datadog, assurez-vous d'avoir activé [l'automatisation de flotte][3] sur l'Agent. {{% remote-flare %}}

<div class="alert alert-danger">Si vous ne voyez pas l'option pour votre service, il y a probablement une erreur de connexion entre l'application et l'Agent Datadog et vous devriez opter par défaut pour l'option manuelle de fournir des journaux de traceur de débogage.</div>

Exemple :

...

## Activer le mode debugging

Utilisez les paramètres de débogage de Datadog pour diagnostiquer les problèmes ou auditer les données de trace. Datadog ne recommande pas d'activer le mode débogage dans les systèmes de production car cela augmente le nombre d'événements envoyés à vos enregistreurs. Utilisez le mode débogage uniquement à des fins de débogage.

Le mode débogage est désactivé par défaut. Pour l'activer, suivez les instructions du traceur de langage correspondant :

...

...

Pour activer le mode débogage pour le traceur Java de Datadog, définissez le drapeau `-Ddd.trace.debug=true` lors du démarrage de la JVM ou ajoutez `DD_TRACE_DEBUG=true` en tant que variable d'environnement.

**Remarques** :
- Le traceur Java de Datadog implémente SLF4J SimpleLogger, donc [tous ses paramètres peuvent être appliqués][1]. Par exemple, vous pouvez le configurer pour enregistrer dans un fichier journal dédié :
```
-Ddatadog.slf4j.simpleLogger.logFile=<NEW_LOG_FILE_PATH>
```
- Pour afficher les journaux du traceur Java de Datadog au format JSON compatible avec l'interface utilisateur des journaux de Datadog, utilisez :
```
-Ddatadog.slf4j.simpleLogger.jsonEnabled=true
```
Depuis la version `1.58.0`, vous pouvez utiliser la variable d'environnement `DD_LOG_FORMAT_JSON` pour contrôler le format des journaux du traceur Java de Datadog.


[1]: https://www.slf4j.org/api/org/slf4j/simple/SimpleLogger.html
...

...

Les étapes pour activer le mode débogage dans le traceur Python de Datadog dépendent de la version du traceur que votre application utilise. Choisissez le scénario qui s'applique :

### Scénario 1 : ddtrace 2.x ou une version ultérieure

1. Pour activer le mode débogage : `DD_TRACE_DEBUG=true`

2. Pour diriger les journaux de débogage vers un fichier journal, définissez `DD_TRACE_LOG_FILE` sur le nom de ce fichier journal, par rapport au répertoire de travail actuel. Exemple : Par défaut, la taille du fichier est de 15728640 octets (environ 15 Mo), et un fichier journal de sauvegarde est créé. Pour augmenter la taille par défaut du fichier journal, spécifiez la taille en octets avec le paramètre `DD_TRACE_LOG_FILE_SIZE_BYTES`.

**Remarques :** Si l'application utilise le logger racine et change le niveau de journalisation à `DEBUG`, les journaux de trace de débogage sont activés. Si vous souhaitez remplacer ce comportement, remplacez le logger `ddtrace` comme suit :

```
import logging

# root logger configuration
root_logger = logging.getLogger()
root_logger.setLevel(logging.DEBUG)

# override the ddtrace configuration to WARNING log level
logging.getLogger("ddtrace").setLevel(logging.WARNING)
```


### Scénario 2 : ddtrace 1.3.2 à <2.x

1. Pour activer le mode débogage : `DD_TRACE_DEBUG=true`

2. Pour diriger les journaux de débogage vers un fichier journal, définissez `DD_TRACE_LOG_FILE` avec un nom de fichier dans lequel les journaux de trace doivent être écrits, par rapport au répertoire de travail actuel. Exemple : Par défaut, la taille du fichier est de 15728640 octets (environ 15 Mo) et un fichier journal de sauvegarde est créé. Pour augmenter la taille par défaut du fichier journal, spécifiez la taille en octets avec le paramètre `DD_TRACE_LOG_FILE_SIZE_BYTES`.

3. Pour diriger les journaux vers la console, pour les applications **Python 2**, configurez `logging.basicConfig()` ou similaire. Les journaux sont automatiquement envoyés à la console pour les applications **Python 3**.


### Scénario 3 : ddtrace 1.0.x à 1.2.x

1. Pour activer le mode débogage : `DD_TRACE_DEBUG=true`

2. Pour diriger les journaux vers la console, pour les applications **Python 2 ou Python 3**, configurez `logging.basicConfig()` ou utilisez `DD_CALL_BASIC_CONFIG=true`.

### Scénario 4 : ddtrace 0.x

1. Pour activer le mode débogage : `DD_TRACE_DEBUG=true`

2. Pour diriger les journaux vers la console, pour les applications **Python 2 ou Python 3**, configurez `logging.basicConfig()` ou utilisez `DD_CALL_BASIC_CONFIG=true`.

### 3e scénario Configurer la journalisation de débogage dans le code de l'application avec la bibliothèque de journalisation standard

Pour toute version de ddtrace, plutôt que de définir la variable d'environnement `DD_TRACE_DEBUG` du traceur, vous pouvez activer la journalisation de débogage dans le code de l'application en utilisant directement la bibliothèque standard `logging` :

```
log = logging.getLogger("ddtrace.tracer")
log.setLevel(logging.DEBUG)
```

...

...

Pour activer le mode débogage pour le traceur Ruby de Datadog, définissez la variable d'environnement `DD_TRACE_DEBUG=true`.

Logs d'application

Par défaut, tous les journaux sont traités par le logger Ruby par défaut. Lorsque vous utilisez Rails, vous devriez voir les messages dans votre fichier journal d'application.

Les messages de journal du client Datadog sont marqués avec `[ddtrace]`, vous pouvez donc les isoler des autres messages.

Vous pouvez remplacer le logger par défaut et le remplacer par un logger personnalisé en utilisant l'attribut `log` du traceur :

```ruby
f = File.new("<FILENAME>.log", "w+")           # Log messages should go there
Datadog.configure do |c|
  c.logger.instance = Logger.new(f)                 # Overriding the default tracer
end

Datadog::Tracing.logger.info { "this is typically called by tracing code" }
```

Voir [la documentation de l'API][1] pour plus de détails.


[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#custom-logging
...

...

...

Pour activer le mode débogage pour le traceur Datadog Go, définissez la variable d'environnement `DD_TRACE_DEBUG=true`, ou activez le mode débogage lors de la configuration `Start` :

```go
package main

import (
  "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func main() {
    tracer.Start(tracer.WithDebugMode(true))
    defer tracer.Stop()
}
```

#### Logs des spans abandonnées

Le traceur Datadog Go prend également en charge la journalisation des spans potentiellement abandonnés. Pour activer ce mode de débogage en Go, définissez la variable d'environnement `DD_TRACE_DEBUG_ABANDONED_SPANS=true`. Pour changer la durée après laquelle les spans sont considérés comme abandonnés (par défaut=`10m`), définissez la variable d'environnement `DD_TRACE_ABANDONED_SPAN_TIMEOUT` à la durée souhaitée. Les journaux de spans abandonnés apparaissent au niveau Info.

Vous pouvez également activer le débogage des spans abandonnés lors de la configuration `Start` :

```go
package main

import (
  "time"

  "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func main() {
    tracer.Start(tracer.WithDebugSpansMode(10 * time.Minute))
    defer tracer.Stop()
}
```

...

...

Pour activer le mode débogage pour le traceur Datadog Node.js, utilisez la variable d'environnement `DD_TRACE_DEBUG=true`.

**Remarques :** **Remarque** : pour les versions antérieures à 2.X, vous pouvez activer le mode debugging par programmation lors de l'initialisation du traceur. Cette fonctionnalité n'est toutefois plus possible avec les nouvelles versions.

Logs d'application

En mode débogage, le traceur enregistrera des informations de débogage dans `console.log()` et des erreurs dans `console.error()`. Vous pouvez changer ce comportement en passant un logger personnalisé au traceur. Le logger doit contenir les méthodes `debug()` et `error()` qui peuvent gérer respectivement les messages et les erreurs.

Exemple :

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
  }
})
```

Vérifiez ensuite les logs de l'Agent à la recherche d'informations supplémentaires sur le problème :

* Si le trace a été envoyé à l'Agent correctement, vous devriez voir `Response from the Agent: OK` entrées de journal. Cela indique que le traceur fonctionne correctement, donc le problème peut être avec l'Agent lui-même. Référez-vous au [guide de dépannage de l'Agent][1] pour plus d'informations.

* Si une erreur a été signalée par l'Agent (ou si l'Agent n'a pas pu être atteint), vous verrez `Error from the Agent` entrées de journal. Dans ce cas, validez votre configuration réseau pour vous assurer que l'Agent peut être atteint. Si vous êtes sûr que le réseau fonctionne et que l'erreur provient de l'Agent, consultez le [guide de dépannage de l'Agent][1].

Si aucune de ces entrées de journal n'est présente, alors aucune demande n'a été envoyée à l'Agent, ce qui signifie que le traceur n'instrumente pas votre application. Dans ce cas, [contactez le support Datadog][2] et fournissez les entrées de journal pertinentes avec [une alerte][3].

Pour découvrir davantage de paramètres pour le traceur, consultez la [documentation relative à l'API][4].


[1]: /fr/agent/troubleshooting/
[2]: /fr/help/
[3]: /fr/agent/troubleshooting/#send-a-flare
[4]: https://datadog.github.io/dd-trace-js/#tracer-settings
...

...

Pour activer le mode débogage pour le traceur .NET de Datadog, définissez le paramètre de configuration `DD_TRACE_DEBUG` sur `true`. Ce paramètre peut être défini comme une variable d'environnement, dans le fichier `web.config` ou `app.config` (.NET Framework uniquement), ou dans un fichier `datadog.json`. Alternativement, vous pouvez activer le mode débogage en appelant `GlobalSettings.SetDebugEnabled(true)` :

```csharp
using Datadog.Trace;

// enable debug mode
GlobalSettings.SetDebugEnabled(true);

```

Les fichiers journaux sont enregistrés par défaut dans les répertoires suivants. Utilisez le paramètre `DD_TRACE_LOG_DIRECTORY` pour changer ces chemins.

| Plateforme                                             | Chemin                                             |
|------------------------------------------------------|--------------------------------------------------|
| Windows                                              | ...        |
| Linux                                                | ...                       |
| Linux (lorsque vous utilisez l'[injection de bibliothèque Kubernetes][1]) | ...                              |
| Azure App Service                                    | ...|

note Sur Linux, vous devez créer le répertoire des journaux avant d'activer le mode débogage.

Depuis la version `2.19.0`, vous pouvez utiliser le paramètre `DD_TRACE_LOGFILE_RETENTION_DAYS` pour configurer le traceur afin de supprimer les fichiers journaux du répertoire de journalisation actuel au démarrage. Le traceur supprime les fichiers journaux de même âge et plus anciens que le nombre de jours donné, avec une valeur par défaut de `32`.

Pour plus de détails sur la façon de configurer le traceur .NET, consultez la section [Configuration][2].

Deux types de logs sont créés à ces emplacements :
1. **Logs provenant du code natif** Dans la version 1.26.0 et supérieure, ces journaux sont enregistrés sous la forme `dotnet-tracer-native-<processname>-<processid>.log`. De la version 1.21.0 à 1.25.x, ces journaux étaient enregistrés sous la forme `dotnet-tracer-native.log`. Dans la version 1.20.x et les versions antérieures, cela était stocké sous la forme `dotnet-profiler.log`.
2. **Journaux du code géré :** Dans la version 1.21.0 et supérieure, ces journaux sont enregistrés `dotnet-tracer-managed-<processname>-<date>.log`. Dans la version 1.20.x et les versions antérieures, cela était stocké sous la forme `dotnet-tracer-<processname>-<date>.log`.


[1]: /fr/tracing/trace_collection/library_injection/?tab=kubernetes
[2]: /fr/tracing/setup/dotnet/#configuration
...

...

Pour activer le mode débogage pour le traceur PHP Datadog, définissez la variable d'environnement `DD_TRACE_DEBUG=true`. Consultez la [documentation de configuration PHP][1] pour des détails sur la façon et le moment où cette valeur de variable d'environnement doit être définie pour être correctement gérée par le traceur.

Il existe deux façons d'enregistrer les logs de debugging du traceur dans un fichier.

**Option 1 :**

À partir de la version 0.98.0 de dd-trace-php, vous pouvez spécifier un chemin vers un fichier de log pour certains logs de debugging du traceur :

- Variable d'environnement

- **INI** : `datadog.trace.log_file`

**Remarques** :
  - Pour des détails sur l'endroit où définir `DD_TRACE_LOG_FILE`, consultez [Configuration de la bibliothèque de traçage PHP][2].
  - Si `DD_TRACE_LOG_FILE` n'est pas spécifié, les journaux vont à l'emplacement d'erreur PHP par défaut (voir **Option 2** pour plus de détails).

**Option 2 :**

Vous pouvez spécifier où PHP doit placer les messages `error_log` soit au niveau du serveur, soit en tant que paramètre PHP `ini`, qui est la manière standard de configurer le comportement de PHP.

Si vous utilisez un serveur Apache, utilisez la directive `ErrorLog`. Si vous utilisez un serveur NGINX, utilisez la directive `error_log`. Si vous configurez plutôt au niveau PHP, utilisez le paramètre ini `error_log` de PHP.


[1]: https://www.php-fig.org/psr/psr-3
[2]: /fr/tracing/trace_collection/library_config/php/
...

...

Les bibliothèques binaires de la version sont toutes compilées avec des symboles de débogage ajoutés à la version optimisée. Vous pouvez utiliser GDB ou LLDB pour déboguer la bibliothèque et lire les dumps de mémoire. Si vous construisez la bibliothèque à partir de la source, passez l'argument `-DCMAKE_BUILD_TYPE=RelWithDebInfo` à cmake pour compiler une version optimisée avec des symboles de débogage.

```bash
cmake -B .build -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
cmake --build .build -j
cmake --install .build
```

...

...

## Examiner les logs de debugging


Lorsque le mode débogage pour votre traceur est activé, les messages de journal spécifiques au traceur rapportent comment le traceur a été initialisé et si des traces ont été envoyées à l'Agent. Les journaux de débogage sont stockés dans un chemin séparé en fonction de votre configuration de journalisation. Si vous activez les informations de traceur au niveau de l'application, les journaux de débogage sont également envoyés dans le flare pour [langues prises en charge](#prerequisites). Les exemples de journaux suivants montrent ce qui pourrait apparaître dans votre fichier journal.

Si vous constatez des erreurs que vous ne comprenez pas, ou si les traces sont signalées comme envoyées à Datadog mais que vous ne les voyez pas dans l'interface, [contactez l'assistance Datadog][1] et envoyez les entrées de log pertinentes avec [un flare][2].

...

**Log d'initialisation pour le traceur.**

```java
[main] DEBUG datadog.trace.agent.ot.DDTracer - Using config: Config(runtimeId=<runtime ID>, serviceName=<service name>, traceEnabled=true, writerType=DDAgentWriter, agentHost=<IP HERE>, agentPort=8126, agentUnixDomainSocket=null, prioritySamplingEnabled=true, traceResolverEnabled=true, serviceMapping={}, globalTags={env=none}, spanTags={}, jmxTags={}, excludedClasses=[], headerTags={}, httpServerErrorStatuses=[512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511], httpClientErrorStatuses=[400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499], httpClientSplitByDomain=false, partialFlushMinSpans=1000, runtimeContextFieldInjection=true, propagationStylesToExtract=[DATADOG], propagationStylesToInject=[DATADOG], jmxFetchEnabled=true, jmxFetchMetricsConfigs=[], jmxFetchCheckPeriod=null, jmxFetchRefreshBeansPeriod=null, jmxFetchStatsdHost=null, jmxFetchStatsdPort=8125, logsInjectionEnabled=false, reportHostName=false)
```

**Exemple de traces générées :**

```java
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.DDSpan - Finished: DDSpan [ t_id=<trace id>, s_id=<span id>, p_id=<parent id>] trace=SpringBoot_Service/OperationHandler.handle/OperationHandler.handle metrics={} tags={component=spring-web-controller, env=none, span.kind=server, thread.id=33, thread.name=http-nio-8080-exec-1}, duration_ns=92808848
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - traceId: <trace id> -- Expired reference. count = 1
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.DDSpan - Finished: DDSpan [ t_id=<trace id>, s_id=<span id>, p_id=0] trace=SpringBoot_Service/servlet.request/GET /actuator/prometheus metrics={_sampling_priority_v1=1} tags={component=java-web-servlet, env=none, http.method=GET, http.status_code=200, http.url=http://<IP>:8080/actuator/prometheus, language=jvm, peer.hostname=<IP>, peer.ipv4=<IP>, peer.port=50778, runtime-id=<runtime id>, span.kind=server, span.origin.type=org.apache.catalina.core.ApplicationFilterChain, thread.id=33, thread.name=http-nio-8080-exec-1}, duration_ns=157972901
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - Writing 2 spans to DDAgentWriter { api=DDApi { tracesUrl=http://<IP address>/v0.4/traces } }.
```

**Des traces ont été envoyées à l'Agent Datadog :**

```java
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - traceId: <trace id> -- Expired reference. count = 0
[dd-trace-writer] DEBUG datadog.trace.agent.common.writer.DDApi - Successfully sent 1 of 2 traces to the DD agent.
```

...

Les journaux générés par le Traceur Python ont le nom de gestionnaire de journal `ddtrace`.

**Des traces ont été générées :**

```text
<YYYY-MM-DD> 19:51:22,262 DEBUG [ddtrace.internal.processor.trace] [trace.py:211] - trace <TRACE ID> has 8 spans, 7 finished
```

**Span générée par le traceur Python :**

```text
<YYYY-MM-DD> 19:51:22,251 DEBUG [ddtrace.tracer] [tracer.py:715] - finishing span name='flask.process_response' id=<SPAN ID> trace_id=<TRACE ID>  parent_id=<PARENT ID> service='flask' resource='flask.process_response' type=None start=1655495482.2478693 end=1655495482.2479873 duration=0.000118125 error=0 tags={} metrics={} (enabled:True)
0.0:5050/
```


**Des traces ont été envoyées à l'Agent Datadog :**

```text
<YYYY-MM-DD> 19:59:19,657 DEBUG [ddtrace.internal.writer] [writer.py:405] - sent 1.57KB in 0.02605s to http://localhost:8126/v0.4/traces
```

**Des traces n'ont pas pu être envoyées à l'Agent Datadog :**

```text
<YYYY-MM-DD> 19:51:23,249 ERROR [ddtrace.internal.writer] [writer.py:567] - failed to send traces to Datadog Agent at http://localhost:8126/v0.4/traces
```

...

**La span est générée :**

```text
D, [<YYYY-MM-DD>T16:42:51.147563 #476] DEBUG -- ddtrace: [ddtrace] (/usr/local/bundle/gems/ddtrace-<version>/lib/ddtrace/tracer.rb:371:in `write') Writing 4 spans (enabled: true)

 Name: rack.request
Span ID: <span id>
Parent ID: 0
Trace ID: <trace id>
Type: web
Service: todo
Resource: NotesController#index
Error: 0
Start: <start time>
End: <end time>
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
   http.response.headers.x_request_id => <header value>]
Metrics: [
   ..],

```


...

...


** Tentative d'envoi de traces à l'Agent :**

```text
YYYY/MM/DD 16:06:35 Datadog Tracer <version> DEBUG: Sending payload: size: <size of traces> traces: <number of traces>.
```


**Échec de l'envoi des traces à l'Agent :**

```text
2019/08/07 16:12:27 Datadog Tracer <version> ERROR: lost <number of traces> traces: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused, 4 additional messages skipped (first occurrence: DD MM YY 16:11 UTC)
```


...

...

**Erreur lors de l'envoi de la trace à l'Agent :**

```json
{
	"name": "dd-trace",
	"hostname": "<hostname>",
	"pid": 28817,
	"level": 50,
	"err": {
		"message": "Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126",
		"name": "Error",
		"stack": "Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126\n    at ClientRequest.req.on.e (/path/to/dd-trace/src/platform/node/request.js:44:33)\n    at scope.activate (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:68:19)\n    at Scope._activate (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:44:14)\n    at Scope.activate (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:13:17)\n    at ClientRequest.<anonymous> (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:67:20)\n    at ClientRequest.emit (events.js:193:13)\n    at ClientRequest.req.emit (/path/to/dd-trace/packages/datadog-plugin-http/src/client.js:93:21)\n    at Socket.socketErrorListener (_http_client.js:397:9)\n    at Socket.emit (events.js:198:15)\n    at emitErrorNT (internal/streams/destroy.js:91:8)"
	},
	"msg": "Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126",
	"time": "2019-08-06T20:48:27.769Z",
	"v": 0
}
```


...

...

**Logs provenant du code natif**

```text
[dotnet] 19861: [debug] JITCompilationStarted: function_id=<function id> token=<token id> name=System.Net.Http.Headers.HttpHeaders.RemoveParsedValue()
```


**Logs provenant du code géré indiquant que les spans ont été générées :**

```text
{ MachineName: ".", ProcessName: "dotnet", PID: <process id>, AppDomainName: "test-webapi" }
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [DBG] Span started: [s_id: <span id>, p_id: <parent span id>, t_id: <trace id>]
{ MachineName: ".", ProcessName: "dotnet", PID: <process id>, AppDomainName: "test-webapi" }
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [DBG] Span closed: [s_id: <span id>, p_id: <parent span id>, t_id: <trace id>] for (Service: test-webapi, Resource: custom, Operation: custom.function, Tags: [<span tags>])
```

**Logs provenant du code géré indiquant que les traces n'ont pas pu être envoyées à l'Agent Datadog :**

```text
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [ERR] An error occurred while sending traces to the agent at System.Net.Http.HttpRequestException: Connection refused ---> System.Net.Sockets.SocketException: Connection refused
   at System.Net.Http.ConnectHelper.ConnectAsync(String host, Int32 port, CancellationToken cancellationToken)
   --- End of inner exception stack trace ---
```


...

...

**Chargement d'une intégration :**

Remarques : Ce journal **ne suit pas** `DD_TRACE_LOG_FILE` (ini : `datadog.trace.log_file`) et est toujours dirigé vers la directive ErrorLog.

```text
[Mon MM  DD 19:56:23 YYYY] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [debug] - Loaded integration web
```

**Détails de la span :**

Disponible à partir de la version 0.98.0 :

```text
[Mon MM  DD 19:56:23 YYYY] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [span] Encoding span <SPAN ID>: trace_id=<TRACE ID>, name='wpdb.query', service='wordpress', resource: '<RESOURCE NAME>', type 'sql' with tags: component='wordpress'; and metrics: -
```

**Tentative d'envoi de traces :**

```text
[Mon MM  DD 19:56:23 YYYY] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [info] Flushing trace of size 56 to send-queue for http://datadog-agent:8126
```


...

...

## Pour aller plus loin

...

[1]: /fr/help/
[2]: /fr/agent/troubleshooting/#send-a-flare
[3]: /fr/tracing/guide/remote_config
[5]: /fr/remote_configuration#enabling-remote-configuration
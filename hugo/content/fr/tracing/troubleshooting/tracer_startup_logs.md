---
description: Configurez et analysez les logs de démarrage du traceur pour résoudre
  les problèmes de configuration et de connectivité de l'Agent.
further_reading:
- link: /tracing/troubleshooting/connection_errors/
  tag: Documentation
  text: Dépannage des erreurs de connexion APM
title: Logs de lancement du traceur
---
## Logs de démarrage {#startup-logs}

Les logs de démarrage du traceur capturent toutes les informations disponibles au démarrage et les enregistrent sous forme de `DATADOG TRACER CONFIGURATION`, `DATADOG TRACER DIAGNOSTICS`, `DATADOG ERROR` ou `DATADOG CONFIGURATION` pour simplifier la recherche dans vos logs.

Certains langages consignent les logs dans un fichier séparé, selon leurs conventions et selon qu'il est sûr d'accéder à `Stdout` ou à son équivalent. Dans ces cas, l'emplacement des logs est indiqué dans l'onglet du langage ci-dessous. Certains langages ne consignent pas non plus les entrées de log de diagnostic, comme indiqué ci-dessous.

`CONFIGURATION` Les logs sont une représentation au format JSON des paramètres appliqués à votre traceur. Dans les langages où une vérification de la connectivité de l'Agent est effectuée, le JSON de configuration inclura également une clé `agent_error`, qui indique si l'Agent est joignable.

`DIAGNOSTICS` ou `ERROR` entrées de log, dans les langages qui les produisent, apparaissent lorsque le traceur rencontre une erreur au démarrage de l'application. Si vous voyez des lignes de log `DIAGNOSTICS` ou `ERROR`, vérifiez dans le log indiqué que les paramètres et les configurations sont correctement appliqués.

Si vous ne voyez aucun log, assurez-vous que les logs de votre application ne sont pas désactivés et que votre niveau de log est au moins `INFO`, le cas échéant.

{{< programming-lang-wrapper langs="java,.NET,php,go,nodejs,python,ruby,cpp" >}}
{{< programming-lang lang="java" >}}

**Configuration :**

```text
{"os_name":"Mac OS X","os_version":"10.15.4","architecture":"x86_64","lang":"jvm","lang_version":"11.0.6","jvm_vendor":"AdoptOpenJDK","jvm_version":"11.0.6+10","java_class_version":"55.0","enabled":true,"service":"unnamed-java-app","agent_url":"http://localhost:8126","agent_error":false,"debug":false,"analytics_enabled":false,"sampling_rules":[{},{}],"priority_sampling_enabled":true,"logs_correlation_enabled":false,"profiling_enabled":false,"dd_version":"null","health_checks_enabled":false,"configuration_file":"no config file present","runtime_id":"b69deb26-8bc3-4c00-8952-d42bf8c2123b"}
```

**Diagnostics :**

Le traceur Java ne génère pas de logs de diagnostic. Pour cette vérification, exécutez le traceur en [mode de débogage][1].


[1]: /fr/tracing/troubleshooting/tracer_debug_logs/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

**Emplacement du fichier :**

Les fichiers de logs sont enregistrés par défaut dans les répertoires suivants. Utilisez le paramètre `DD_TRACE_LOG_DIRECTORY` pour modifier ces chemins.

| Plateforme                                             | Chemin                                             |
|------------------------------------------------------|--------------------------------------------------|
| Windows                                              | `%ProgramData%\Datadog .NET Tracer\logs\`        |
| Linux                                                | `/var/log/datadog/dotnet/`                       |
| Linux (lors de l'utilisation de [l'injection de bibliothèque Kubernetes][1]) | `/datadog-lib/logs`                              |
| Azure App Service                                    | `%AzureAppServiceHomeDirectory%\LogFiles\datadog`|

**Remarque :** Sur Linux, vous devez créer le répertoire des logs avant d'activer le mode de débogage.

Depuis la version `2.19.0`, vous pouvez utiliser le paramètre `DD_TRACE_LOGFILE_RETENTION_DAYS` pour configurer le traceur afin qu'il supprime les fichiers de logs du répertoire de logs actuel au démarrage. Le traceur supprime les fichiers de logs dont l'âge est supérieur ou égal au nombre de jours indiqué, avec une valeur par défaut de `32`.

- `dotnet-tracer-managed-{processName}-{timestamp}.log` contient les logs de configuration.

- `dotnet-tracer-native-{processName}-{processID}.log` contient les logs de diagnostic, s'il y en a.

**Configuration :**

```text
2020-06-29 12:26:39.572 +02:00 [INF] DATADOG TRACER CONFIGURATION -
{"date":"2020-06-29T12:26:39.5615724+02:00","os_name":"Windows",
"os_version":"Microsoft Windows NT 6.2.9200.0","version":"1.17.1.0",
"platform":"x64","lang":".NET Framework","lang_version":"4.8+",
"env":null,"enabled":true,"service":"git-credential-manager",
"agent_url":"http://localhost:8126","debug":false,
"analytics_enabled":false,"sample_rate":null,"sampling_rules":null,
"tags":[],"log_injection_enabled":false,
"runtime_metrics_enabled":false,"disabled_integrations":[]}
```

**Diagnostics :**

Le traceur .NET affiche les lignes de diagnostic suivantes :

```text
DATADOG TRACER DIAGNOSTICS - Profiler disabled in DD_TRACE_ENABLED
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {process_name} not found in DD_PROFILER_PROCESSES
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {process_name} found in DD_PROFILER_EXCLUDE_PROCESSES
DATADOG TRACER DIAGNOSTICS - Failed to attach profiler: interface ICorProfilerInfo3 not found
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {application_pool} is recognized as an Azure App Services infrastructure process
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {application_pool} is recognized as Kudu, an Azure App Services reserved process
DATADOG TRACER DIAGNOSTICS - Profiler disabled: no enabled integrations found
DATADOG TRACER DIAGNOSTICS - Failed to attach profiler: unable to set event mask
DATADOG TRACER DIAGNOSTICS - Error fetching configuration {exception}
```

[1]: /fr/tracing/trace_collection/library_injection/?tab=kubernetes
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

**PHP Info :**
Obtenez la chaîne JSON des logs de démarrage à partir d'une page `phpinfo()` à côté de « DATADOG TRACER CONFIGURATION ». Créez le fichier PHP suivant et accédez-y depuis un navigateur sur le host.

```php
<?php phpinfo(); ?>
```

Les informations de diagnostic sont affichées dans un tableau séparé pour aider à diagnostiquer les problèmes courants.

{{< img src="tracing/troubleshooting/PHPInfo.png" alt="PHP Info" >}}

**CLI SAPI :**

Obtenez les informations depuis le CLI SAPI en exécutant `php --ri=ddtrace`.

```text
ddtrace


Datadog PHP tracer extension
For help, check out the documentation at https://docs.datadoghq.com/tracing/languages/php/
(c) Datadog 2020

Datadog tracing support => enabled
Version => 1.0.0-nightly
DATADOG TRACER CONFIGURATION => {"date":"2020-07-01T17:43:54Z","os_name":"Linux 49b1cb4bdd12 4.19.76-linuxkit #1 SMP Tue May 26 11:42:35 UTC 2020 x86_64","os_version":"4.19.76-linuxkit","version":"1.0.0-nightly","lang":"php","lang_version":"7.4.5","env":null,"enabled":true,"service":null,"enabled_cli":false,"agent_url":"https://localhost:8126","debug":false,"analytics_enabled":false,"sample_rate":1.000000,"sampling_rules":null,"tags":null,"service_mapping":null,"distributed_tracing_enabled":true,"priority_sampling_enabled":true,"dd_version":null,"architecture":"x86_64","sapi":"cli","ddtrace.request_init_hook":null,"open_basedir_configured":false,"uri_fragment_regex":null,"uri_mapping_incoming":null,"uri_mapping_outgoing":null,"auto_flush_enabled":false,"generate_root_span":true,"http_client_split_by_domain":false,"measure_compile_time":true,"report_hostname_on_root_span":false,"traced_internal_functions":null,"auto_prepend_file_configured":false,"integrations_disabled":null,"enabled_from_env":true,"opcache.file_cache":null,"agent_error":"Couldn't connect to server","ddtrace.request_init_hook_reachable":false}

                               Diagnostics
agent_error => Couldn't connect to server
ddtrace.request_init_hook_reachable => false

Directive => Local Value => Master Value
ddtrace.disable => Off => Off
...
```

**Configuration :**

Si le traceur est en [mode DEBUG][1], les logs de démarrage apparaîtront dans `error_log` une fois par processus lors de la première requête.

```text
DATADOG TRACER CONFIGURATION - {"agent_error":"Couldn't connect to server","ddtrace.request_init_hook_reachable":false,"date":"2020-07-01T17:42:50Z","os_name":"Linux 49b1cb4bdd12 4.19.76-linuxkit #1 SMP Tue May 26 11:42:35 UTC 2020 x86_64","os_version":"4.19.76-linuxkit","version":"1.0.0-nightly","lang":"php","lang_version":"7.4.5","env":null,"enabled":true,"service":null,"enabled_cli":false,"agent_url":"https://localhost:8126","debug":false,"analytics_enabled":false,"sample_rate":1.000000,"sampling_rules":null,"tags":null,"service_mapping":null,"distributed_tracing_enabled":true,"priority_sampling_enabled":true,"dd_version":null,"architecture":"x86_64","sapi":"cgi-fcgi","ddtrace.request_init_hook":null,"open_basedir_configured":false,"uri_fragment_regex":null,"uri_mapping_incoming":null,"uri_mapping_outgoing":null,"auto_flush_enabled":false,"generate_root_span":true,"http_client_split_by_domain":false,"measure_compile_time":true,"report_hostname_on_root_span":false,"traced_internal_functions":null,"auto_prepend_file_configured":false,"integrations_disabled":null,"enabled_from_env":true,"opcache.file_cache":null}
```

**Diagnostics :**

Les diagnostics ayant échoué pour le traceur PHP s'affichent dans `error_log` si le traceur est en [mode DEBUG][1].

```text
DATADOG TRACER DIAGNOSTICS - agent_error: Couldn't connect to server
DATADOG TRACER DIAGNOSTICS - ddtrace.request_init_hook_reachable: false
```

**Exécution :**

Accédez aux logs de démarrage sous forme de chaîne JSON pendant l'exécution avec `\DDTrace\startup_logs()`.

```php
echo \DDTrace\startup_logs() . PHP_EOL;
```

[1]: /fr/tracing/troubleshooting/tracer_debug_logs?tab=php#enable-tracer-debug-mode
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

**Configuration :**

```text
2020/07/09 15:57:07 Datadog Tracer v1.26.0 INFO: DATADOG TRACER CONFIGURATION {"date":"2020-07-09T15:57:07-05:00","os_name":"darwin","os_version":"10.15.4","version":"v1.26.0","lang":"Go","lang_version":"go1.14.2","env":"","service":"splittest2","agent_url":"http://127.0.0.1:8126/v0.4/traces","agent_error":"","debug":true,"analytics_enabled":false,"sample_rate":"NaN","sampling_rules":null,"sampling_rules_error":"","tags":{"runtime-id":"d269781c-b1bf-4d7b-9a55-a8174930554f"},"runtime_metrics_enabled":false,"health_metrics_enabled":false,"dd_version":"","architecture":"amd64","global_service":""}
```

**Diagnostics :**

Le traceur Go affiche l'une des deux lignes de diagnostic possibles, l'une lorsque l'Agent est injoignable, et l'autre pour les erreurs d'échantillonnage de trace.

```text
2020/07/09 15:57:07 Datadog Tracer v1.26.0 WARN: DIAGNOSTICS Unable to reach agent: [Reason for error]
2020/07/09 15:57:07 Datadog Tracer v1.26.0 WARN: DIAGNOSTICS Error(s) parsing DD_TRACE_SAMPLING_RULES:
    at index 1 ...
    at index 4 ....
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Les logs de démarrage sont désactivés par défaut à partir de la version 2.x du SDK. Ils peuvent être activés à l'aide de la variable d'environnement `DD_TRACE_STARTUP_LOGS=true`.

**Configuration :**

```text
[2020-07-02 14:51:16.421] [INFO] app - host:port==localhost:9080
[2020-07-02 14:51:16.423] [INFO] app - db type==mongo
[2020-07-02 14:51:16.439] [INFO] routes - Use dataaccess:../dataaccess/mongo/index.js
[2020-07-02 14:51:16.599] [INFO] app - Error connecting to database - exiting process: MongoError: connect ECONNREFUSED 127.0.0.1:27017
[2020-07-02 14:51:16.600] [INFO] app - Initialized database connections
[2020-07-02 14:51:16.601] [INFO] app - Express server listening on port 9080
DATADOG TRACER CONFIGURATION - {"date":"2020-07-02T18:51:18.294Z","os_name":"Darwin","os_version":"19.2.0","architecture":"x64","version":"0.23.0","lang":"nodejs","lang_version":"12.18.1","enabled":true,"service":"acmeair","agent_url":"http://localhost:8126","agent_error":"Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126","debug":false,"analytics_enabled":false,"sample_rate":1,"sampling_rules":[],"tags":{"service":"acmeair","version":"0.0.4"},"dd_version":"0.0.4","log_injection_enabled":false,"runtime_metrics_enabled":false,"integrations_loaded":["http","fs","net","dns","express@4.17.1"]}
```

**Diagnostics :**

Le traceur Node.js affiche une ligne de diagnostic lorsque l'Agent est injoignable.

```text
DATADOG TRACER DIAGNOSTIC - Agent Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

**Emplacement des logs :**

Le traceur Python enregistre les informations de configuration au niveau INFO. Il enregistre les informations de diagnostic, s'il en trouve, au niveau ERROR.

En l'absence de configuration de journalisation, seuls les diagnostics seront envoyés vers `Stderr`.

Pour voir les logs de démarrage du traceur, ajoutez un logger ou définissez `DD_TRACE_DEBUG=true` dans votre configuration et exécutez votre application avec `ddtrace-run`. Cela ajoute un logger et rend accessibles les logs de débogage et de démarrage du traceur.

Pour voir les options de journalisation dans un fichier avec `DD_TRACE_LOG_FILE`, lisez [Tracer Debug Logs][1].

**Configuration :**

```text
2020-07-09 11:04:08,098 INFO [ddtrace.tracer] [tracer.py:338] - - DATADOG TRACER CONFIGURATION - {"date": "2020-07-09T15:04:08.092797", "os_name": "Darwin", "os_version": "19.5.0", "is_64_bit": true, "architecture": "64bit", "vm": "CPython", "version": "0.38.1.dev79+gd22e2972.d20200707", "lang": "python", "lang_version": "3.7.6", "pip_version": "20.0.2", "in_virtual_env": true, "agent_url": "http://localhost:1234", "agent_error": "Agent not reachable. Exception raised: [Errno 61] Connection refused", "env": "", "is_global_tracer": true, "enabled_env_setting": null, "tracer_enabled": true, "sampler_type": "DatadogSampler", "priority_sampler_type": "RateByServiceSampler", "service": "", "debug": true, "enabled_cli": true, "analytics_enabled": false, "log_injection_enabled": false, "health_metrics_enabled": false, "dd_version": "", "priority_sampling_enabled": true, "global_tags": "", "tracer_tags": "", "integrations": {"asyncio": "N/A", "boto": "N/A", "botocore": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.15.32", "module_imported": false, "config": "N/A"}, "bottle": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "0.12.18", "module_imported": false, "config": null}, "cassandra": "N/A", "celery": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "4.2.2", "module_imported": false, "config": "N/A"}, "consul": "N/A", "django": "N/A", "elasticsearch": "N/A", "algoliasearch": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "2.2.0", "module_imported": false, "config": "N/A"}, "futures": "N/A", "grpc": "N/A", "mongoengine": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.19.1", "module_imported": false, "config": "N/A"}, "mysql": "N/A", "mysqldb": "N/A", "pymysql": "N/A", "psycopg": "N/A", "pylibmc": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.6.1", "module_imported": false, "config": "N/A"}, "pymemcache": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.4.4", "module_imported": false, "config": "N/A"}, "pymongo": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.10.1", "module_imported": false, "config": "N/A"}, "redis": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.5.3", "module_imported": false, "config": "N/A"}, "rediscluster": "N/A", "requests": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "2.23.0", "module_imported": false, "config": "N/A"}, "sqlalchemy": "N/A", "sqlite3": "N/A", "aiohttp": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.6.2", "module_imported": false, "config": "N/A"}, "aiopg": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.15.0", "module_imported": false, "config": "N/A"}, "aiobotocore": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.0.1", "module_imported": false, "config": null}, "httplib": "N/A", "vertica": "N/A", "molten": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.7.4", "module_imported": false, "config": "N/A"}, "jinja2": "N/A", "mako": "N/A", "flask": "N/A", "kombu": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "4.3.0", "module_imported": false, "config": null}, "falcon": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.4.1", "module_imported": false, "config": null}, "pylons": "N/A", "pyramid": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.10.4", "module_imported": false, "config": null}, "logging": "N/A"}}
```

**Diagnostics :**

Le traceur Python affiche une ligne de diagnostic lorsque l'Agent ne peut pas être atteint.

```text
DATADOG TRACER DIAGNOSTIC - Agent not reachable. Exception raised: [Errno 61] Connection refused
```
[1]: /fr/tracing/troubleshooting/tracer_debug_logs/?code-lang=python#enable-debug-mode

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

### Activer les logs de démarrage {#enable-startup-logs}

Vous pouvez activer les logs de démarrage en utilisant soit la configuration par code, soit une variable d'environnement :

**Code** :

Pour activer les logs de démarrage dans votre code :

```ruby
Datadog.configure do |c|
     c.diagnostics.startup_logs.enabled = true
end
```
**Variable d'environnement** :

Pour activer les logs de démarrage en utilisant une variable d'environnement :

```shell
export DD_TRACE_STARTUP_LOGS=true
```

### Sortie {#output}

Lorsque les logs de démarrage sont activés, le traceur affiche des informations de configuration et de diagnostic.

**Configuration :**

Le traceur Ruby affiche une ligne de configuration pour chaque produit (par exemple, Profiling, Core et Tracing).

```text
I, [2023-08-16T18:09:01.972265 #35]  INFO -- ddtrace: [ddtrace] DATADOG CONFIGURATION - PROFILING - {"profiling_enabled":false}

I, [2023-08-16T18:09:01.972767 #35]  INFO -- ddtrace: [ddtrace] DATADOG CONFIGURATION - CORE - {"date":"2023-08-16T18:09:01+00:00","os_name":"aarch64-unknown-linux-gnu","version":"1.13.0","lang":"ruby","lang_version":"3.0.6","env":null,"service":"rails","dd_version":null,"debug":false,"tags":null,"runtime_metrics_enabled":false,"vm":"ruby-3.0.6","health_metrics_enabled":false}

I, [2023-08-16T18:09:27.223143 #35]  INFO -- ddtrace: [ddtrace] DATADOG CONFIGURATION - TRACING - {"enabled":true,"agent_url":"http://agent:8126?timeout=30","analytics_enabled":false,"sample_rate":null,"sampling_rules":null,"integrations_loaded":"active_model_serializers@,aws@","partial_flushing_enabled":false,"priority_sampling_enabled":false,"integration_active_model_serializers_analytics_enabled":"false","integration_active_model_serializers_analytics_sample_rate":"1.0","integration_active_model_serializers_enabled":"true","integration_active_model_serializers_service_name":"","integration_aws_analytics_enabled":"false","integration_aws_analytics_sample_rate":"1.0","integration_aws_enabled":"true","integration_aws_service_name":"aws","integration_aws_peer_service":""}
```

**Diagnostics :**

Le traceur Ruby affiche une ligne d'erreur lorsque l'Agent ne peut pas être atteint.

```text
W, [2020-07-08T21:19:05.765994 #143]  WARN -- ddtrace: [ddtrace] DATADOG ERROR - TRACER - Agent Error: Datadog::Transport::InternalErrorResponse ok?: unsupported?:, not_found?:, client_error?:, server_error?:, internal_error?:true, payload:, error_type:Errno::ECONNREFUSED error:Failed to open TCP connection to ddagent:9127 (Connection refused - connect(2) for "ddagent" port 9127)
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

**Configuration :**

```text
{"agent_url":"http://localhost:8126","analytics_enabled":false,"analytics_sample_rate":null,"date":"2020-07-03T00:44:37+0000","dd_version":"","enabled":true,"env":"test-env","lang":"cpp","lang_version":"201402","operation_name_override":"","report_hostname":false,"sampling_rules":"[{\"sample_rate\": 1.0}]","service":"service_name","tags":{},"version":"v1.2.0"}
```

**Diagnostics :**

Pour C++, il n'y a pas de lignes `DATADOG TRACER DIAGNOSTICS` en sortie dans les logs du traceur. Cependant, si l'Agent n'est pas accessible, des erreurs apparaissent dans les logs de votre application. Dans Envoy, il y a une augmentation des métriques `tracing.datadog.reports_failed` et `tracing.datadog.reports_dropped`.

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Erreurs de connexion {#connection-errors}

Si vos logs d'application ou de démarrage contiennent des erreurs `DIAGNOSTICS` ou des messages indiquant que l'Agent est inaccessible ou qu'il est impossible de s'y connecter (selon votre langage), cela signifie que le traceur ne peut pas envoyer de traces au Datadog Agent.

Si vous rencontrez ces erreurs, vérifiez que votre Agent est configuré pour recevoir les traces provenant d'[ECS][1], de [Kubernetes][2], de [Docker][3] ou de [toute autre option][4], ou [contactez le support][5] pour examiner la configuration de votre traceur et de votre Agent.

Consultez [Erreurs de connexion][6] pour obtenir des informations sur les erreurs indiquant que votre application instrumentée ne peut pas communiquer avec le Datadog Agent.

## Paramètres de configuration {#configuration-settings}

Si vos logs ne contiennent que des lignes `CONFIGURATION`, une étape de dépannage utile consiste à vérifier que les paramètres affichés par le traceur correspondent à ceux du déploiement et de la configuration du traceur Datadog. De plus, si vous ne voyez pas de traces spécifiques dans Datadog, consultez la section [Compatibility Requirements][7] de la documentation pour confirmer que ces intégrations sont prises en charge.

Si une intégration que vous utilisez n'est pas prise en charge, ou si vous souhaitez un regard neuf sur la sortie de votre configuration pour comprendre pourquoi les traces n'apparaissent pas comme prévu dans Datadog, [contactez le support][5] qui pourra vous aider à diagnostiquer et à créer une demande de fonctionnalité pour une nouvelle intégration.

## Configuration OpenTelemetry {#opentelemetry-configuration}

Les logs de démarrage du SDK DDOT indiquent les valeurs effectives des paramètres de configuration OpenTelemetry importants. Utilisez ces informations pour vérifier si le SDK a appliqué la configuration souhaitée lorsque vous cherchez à résoudre un problème de télémétrie manquante ou de comportement inattendu. Les paramètres rapportés dépendent du langage et de la version du SDK. Un journal de configuration ne confirme pas la réussite de l'envoi de la télémétrie.

## Désactivation des journaux de démarrage {#disabling-startup-logs}

Pour chaque langage, vous pouvez désactiver les journaux de démarrage en définissant la variable d'environnement `DD_TRACE_STARTUP_LOGS=false`, mais ne le faites que si les journaux émis posent problème. Si vous envoyez ultérieurement des journaux de [debug][8], n'oubliez pas d'activer les journaux de démarrage et d'envoyer tous les journaux pertinents ensemble pour accélérer le triage de votre dossier de support.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon_ecs/?tab=java#trace-collection
[2]: /fr/agent/kubernetes/?tab=helm
[3]: /fr/agent/docker/apm/?tab=java
[4]: /fr/tracing/send_traces/
[5]: /fr/help/
[6]: /fr/tracing/troubleshooting/connection_errors/
[7]: /fr/tracing/compatibility_requirements/
[8]: /fr/tracing/troubleshooting/tracer_debug_logs/
---
further_reading:
- link: /tracing/troubleshooting/connection_errors/
  tag: Documentation
  text: Dépanner des erreurs de connexion APM
title: Logs de lancement du traceur
---
## Logs de lancement

Les logs de lancement du traceur capturent toutes les informations accessibles au lancement et les enregistrent en tant que logs `DATADOG TRACER CONFIGURATION` ou `DATADOG TRACER DIAGNOSTICS` afin de faciliter la recherche au sein de vos logs.

Selon leurs conventions et la sécurité d'accès à `Stdout` (ou équivalent), certains langages peuvent écrire les logs dans un fichier distinct. Dans ces cas de figure, l'emplacement des logs est indiqué dans l'onglet du langage concerné ci-dessous. Certains langages n'enregistrent pas d'entrée de diagnostic (voir ci-dessous).

Les logs `CONFIGURATION` représentent les paramètres appliqués à votre traceur au format JSON. Dans le cas des langages pour lesquels un check de connectivité de l'Agent est effectué, la configuration JSON comprend également une clé `agent_error` indiquant si l'Agent est disponible ou non.

Les entrées de log `DIAGNOSTICS` sont générées, pour les langages qui les prennent en charge, lorsque le traceur rencontre une erreur pendant le lancement de l'application. Si des lignes de log `DIAGNOSTICS` s'affichent, vérifiez bien sur le log en question que les paramètres et les configurations sont correctement appliqués.  

Si vous ne voyez aucun log, assurez-vous que les logs de votre application ne sont pas désactivés et que le niveau de log est défini sur `INFO` ou un niveau supérieur.

{{< programming-lang-wrapper langs="java,.NET,php,go,nodejs,python,ruby,cpp" >}}
{{< programming-lang lang="java" >}}

**Configuration :**

```text
{"os_name":"Mac OS X","os_version":"10.15.4","architecture":"x86_64","lang":"jvm","lang_version":"11.0.6","jvm_vendor":"AdoptOpenJDK","jvm_version":"11.0.6+10","java_class_version":"55.0","enabled":true,"service":"unnamed-java-app","agent_url":"http://localhost:8126","agent_error":false,"debug":false,"analytics_enabled":false,"sampling_rules":[{},{}],"priority_sampling_enabled":true,"logs_correlation_enabled":false,"profiling_enabled":false,"dd_version":"null","health_checks_enabled":false,"configuration_file":"no config file present","runtime_id":"b69deb26-8bc3-4c00-8952-d42bf8c2123b"}
```

**Diagnostic :**

Le traceur Java ne génère aucun log Diagnostic. Pour ce check, exécutez le traceur en [mode debugging][1].


[1]: /fr/tracing/troubleshooting/tracer_debug_logs/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

**Emplacement des fichiers :**

Les fichiers de log sont par défaut enregistrés dans les répertoires suivants. Utilisez le paramètre `DD_TRACE_LOG_DIRECTORY` pour modifier ces chemins.

| Plateforme | Chemin                                      |
|----------|-------------------------------------------|
| Windows  | `%ProgramData%\Datadog .NET Tracer\logs\` |
| Linux    | `/var/log/datadog/dotnet/`                |

**Remarque :** sous Linux, vous devez créer le répertoire des logs avant d'activer le mode debugging.

- `dotnet-tracer-managed-{processName}-{timestamp}.log` contient les logs de configuration.

- `dotnet-tracer-native.log` contient les logs de diagnostic, s'ils sont générés.

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

**Diagnostic :**

Le traceur .NET génère les lignes de diagnostic suivantes :

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

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

**PHP Info :**
Obtenez la chaîne JSON des logs de lancement à partir d'une page `phpinfo()` à côté de « DATADOG TRACER CONFIGURATION ». Créez le fichier PHP suivant et accédez-y à partir d'un navigateur sur la machine du host.

```php
<?php phpinfo(); ?>
```

Les informations de diagnostic sont présentées dans un tableau distinct afin de diagnostiquer les problèmes fréquents.

{{< img src="tracing/troubleshooting/PHPInfo.png" alt="PHP Info"  >}}

**CLI SAPI :**

Récupérez les informations à partir du CLI SAPI en exécutant `php --ri=ddtrace`.

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

Si le traceur est en [mode DEBUG][1], les logs de lancement s'afficheront dans le log `error_log` une fois par processus lors de la première requête.

```text
DATADOG TRACER CONFIGURATION - {"agent_error":"Couldn't connect to server","ddtrace.request_init_hook_reachable":false,"date":"2020-07-01T17:42:50Z","os_name":"Linux 49b1cb4bdd12 4.19.76-linuxkit #1 SMP Tue May 26 11:42:35 UTC 2020 x86_64","os_version":"4.19.76-linuxkit","version":"1.0.0-nightly","lang":"php","lang_version":"7.4.5","env":null,"enabled":true,"service":null,"enabled_cli":false,"agent_url":"https://localhost:8126","debug":false,"analytics_enabled":false,"sample_rate":1.000000,"sampling_rules":null,"tags":null,"service_mapping":null,"distributed_tracing_enabled":true,"priority_sampling_enabled":true,"dd_version":null,"architecture":"x86_64","sapi":"cgi-fcgi","ddtrace.request_init_hook":null,"open_basedir_configured":false,"uri_fragment_regex":null,"uri_mapping_incoming":null,"uri_mapping_outgoing":null,"auto_flush_enabled":false,"generate_root_span":true,"http_client_split_by_domain":false,"measure_compile_time":true,"report_hostname_on_root_span":false,"traced_internal_functions":null,"auto_prepend_file_configured":false,"integrations_disabled":null,"enabled_from_env":true,"opcache.file_cache":null}
```

**Diagnostic :**

Les erreurs de diagnostic pour le traceur PHP s'affichent dans le log `error_log` si le traceur est en [mode DEBUG][1].

```text
DATADOG TRACER DIAGNOSTICS - agent_error: Couldn't connect to server
DATADOG TRACER DIAGNOSTICS - ddtrace.request_init_hook_reachable: false
```

**Runtime :**

Accédez aux logs de lancement en tant que chaîne JSON lors de l'exécution avec `\DDTrace\startup_logs()`.

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

**Diagnostic :**

Le traceur Go peut générer deux lignes de diagnostic différentes : une pour lorsque l'Agent n'est pas accessible, et l'autre pour les erreurs d'échantillonnage des traces.

```text
2020/07/09 15:57:07 Datadog Tracer v1.26.0 WARN: DIAGNOSTICS Unable to reach agent: [Origine de l'erreur]
2020/07/09 15:57:07 Datadog Tracer v1.26.0 WARN: DIAGNOSTICS Error(s) parsing DD_TRACE_SAMPLING_RULES:
    at index 1 ...
    at index 4 ....
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Les logs de lancement sont désactivés par défaut à partir de la version 2.x du traceur. Vous pouvez les activer à l'aide de la variable d'environnement `DD_TRACE_STARTUP_LOGS=true`.

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

**Diagnostic :**

Le traceur NodeJS génère une ligne de diagnostic lorsque l'Agent n'est pas disponible.

```text
DATADOG TRACER DIAGNOSTIC - Agent Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

**Emplacement des logs :**

Le traceur Python logue les informations de configuration au niveau INFO. Si des informations de diagnostic sont détectées, elles sont loguées en tant qu'ERROR.

S'il n'existe aucune configuration de logging, seules les informations de diagnostic seront envoyées vers `Stderr`. Pour consulter les logs de lancement du traceur, ajoutez un logger ou définissez `DD_TRACE_DEBUG=true` dans votre configuration avant d'exécuter votre application avec `dd-trace-run`. Cette opération permet d'ajouter un logger et d'exposer à la fois les logs de debugging et les logs de lancement du traceur.

**Configuration :**

```text
2020-07-09 11:04:08,098 INFO [ddtrace.tracer] [tracer.py:338] - - DATADOG TRACER CONFIGURATION - {"date": "2020-07-09T15:04:08.092797", "os_name": "Darwin", "os_version": "19.5.0", "is_64_bit": true, "architecture": "64bit", "vm": "CPython", "version": "0.38.1.dev79+gd22e2972.d20200707", "lang": "python", "lang_version": "3.7.6", "pip_version": "20.0.2", "in_virtual_env": true, "agent_url": "http://localhost:1234", "agent_error": "Agent not reachable. Exception raised: [Errno 61] Connection refused", "env": "", "is_global_tracer": true, "enabled_env_setting": null, "tracer_enabled": true, "sampler_type": "DatadogSampler", "priority_sampler_type": "RateByServiceSampler", "service": "", "debug": true, "enabled_cli": true, "analytics_enabled": false, "log_injection_enabled": false, "health_metrics_enabled": false, "dd_version": "", "priority_sampling_enabled": true, "global_tags": "", "tracer_tags": "", "integrations": {"asyncio": "N/A", "boto": "N/A", "botocore": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.15.32", "module_imported": false, "config": "N/A"}, "bottle": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "0.12.18", "module_imported": false, "config": null}, "cassandra": "N/A", "celery": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "4.2.2", "module_imported": false, "config": "N/A"}, "consul": "N/A", "django": "N/A", "elasticsearch": "N/A", "algoliasearch": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "2.2.0", "module_imported": false, "config": "N/A"}, "futures": "N/A", "grpc": "N/A", "mongoengine": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.19.1", "module_imported": false, "config": "N/A"}, "mysql": "N/A", "mysqldb": "N/A", "pymysql": "N/A", "psycopg": "N/A", "pylibmc": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.6.1", "module_imported": false, "config": "N/A"}, "pymemcache": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.4.4", "module_imported": false, "config": "N/A"}, "pymongo": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.10.1", "module_imported": false, "config": "N/A"}, "redis": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.5.3", "module_imported": false, "config": "N/A"}, "rediscluster": "N/A", "requests": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "2.23.0", "module_imported": false, "config": "N/A"}, "sqlalchemy": "N/A", "sqlite3": "N/A", "aiohttp": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.6.2", "module_imported": false, "config": "N/A"}, "aiopg": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.15.0", "module_imported": false, "config": "N/A"}, "aiobotocore": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.0.1", "module_imported": false, "config": null}, "httplib": "N/A", "vertica": "N/A", "molten": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.7.4", "module_imported": false, "config": "N/A"}, "jinja2": "N/A", "mako": "N/A", "flask": "N/A", "kombu": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "4.3.0", "module_imported": false, "config": null}, "falcon": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.4.1", "module_imported": false, "config": null}, "pylons": "N/A", "pyramid": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.10.4", "module_imported": false, "config": null}, "logging": "N/A"}}
```

**Diagnostic :**

Le traceur Python génère une ligne de diagnostic lorsque l'Agent n'est pas disponible.

```text
DATADOG TRACER DIAGNOSTIC - Agent not reachable. Exception raised: [Errno 61] Connection refused
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

**Configuration :**

```text
W, [2020-07-08T21:14:25.281615 #137]  WARN -- ddtrace: [ddtrace] DATADOG TRACER CONFIGURATION - {"date":"2020-07-08T21:14:25+00:00","os_name":"x86_64-pc-linux-gnu","version":"0.37.0","lang":"ruby","lang_version":"2.7.0","enabled":true,"agent_url":"http://ddagent:8126?timeout=1","debug":false,"analytics_enabled":false,"runtime_metrics_enabled":false,"vm":"ruby-2.7.0","partial_flushing_enabled":false,"priority_sampling_enabled":false,"health_metrics_enabled":false}
```

**Diagnostic :**

Le traceur Ruby génère une ligne de diagnostic lorsque l'Agent n'est pas disponible.

```text
W, [2020-07-08T21:19:05.765994 #143]  WARN -- ddtrace: [ddtrace] DATADOG TRACER DIAGNOSTIC - Agent Error: Datadog::Transport::InternalErrorResponse ok?: unsupported?:, not_found?:, client_error?:, server_error?:, internal_error?:true, payload:, error_type:Errno::ECONNREFUSED error:Failed to open TCP connection to ddagent:9127 (Connection refused - connect(2) for "ddagent" port 9127)
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

**Configuration :**

```text

{"agent_url":"http://localhost:8126","analytics_enabled":false,"analytics_sample_rate":null,"date":"2020-07-03T00:44:37+0000","dd_version":"","enabled":true,"env":"test-env","lang":"cpp","lang_version":"201402","operation_name_override":"","report_hostname":false,"sampling_rules":"[{\"sample_rate\": 1.0}]","service":"service_name","tags":{},"version":"v1.2.0"}

```

**Diagnostic :**

Pour C++, aucune ligne `DATADOG TRACER DIAGNOSTICS` n'est générée dans les logs du traceur. Toutefois, si l'Agent est indisponible, les erreurs s'affichent dans les logs de votre application. Dans ce cas, vous pouvez également constater une hausse des métriques `tracing.datadog.reports_failed` et `tracing.datadog.reports_dropped` dans Envoy.

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Erreurs de connexion

Si vos logs d'application ou de lancement contiennent des erreurs `DIAGNOSTICS` ou des messages indiquant que l'Agent est indisponible ou que la connexion à l'Agent est impossible (ces messages varient en fonction du langage), cela signifie que le traceur ne parvient pas à envoyer des traces à l'Agent Datadog.

Si vous trouvez ces erreurs, vérifiez que votre Agent a été configuré pour recevoir des traces pour [ECS][1], [Kubernetes][2], [Docker][3] ou [toute autre option][4]. Vous pouvez également [contacter l'équipe d'assistance][5] pour demander à ce que la configuration de votre traceur et de votre Agent soit examinée.

Consultez la section relative aux [erreurs de connexion][6] pour en savoir plus sur les erreurs indiquant que votre application instrumentée ne peut pas communiquer avec l'Agent Datadog.

## Paramètres de configuration

Si vos logs contiennent uniquement des lignes `CONFIGURATION`, une étape de dépannage utile consiste à confirmer que les paramètres renvoyés par le traceur correspondent aux paramètres de votre déploiement et de votre configuration du traceur Datadog. Si des traces spécifiques ne s'affichent pas dans Datadog, vous pouvez également consulter la section [Exigences de comptabilité][7] de la documentation pour vérifier que ces intégrations sont prises en charge.

Si l'une de vos intégrations n'est pas prise en charge, ou si vous souhaitez qu'une personne extérieure examine la configuration renvoyée afin de comprendre pourquoi les traces ne s'affichent pas comme prévu dans Datadog, [contactez l'équipe d'assistance][5]. Elle sera en mesure de vous aider à établir un diagnostic et à créer une demande d'ajout de fonctionnalité pour une nouvelle intégration.

## Désactiver les logs de lancement

Vous pouvez désactiver les logs de lancement pour chaque langage en définissant la variable d'environnement `DD_TRACE_STARTUP_LOGS=false`. Toutefois, faites-le uniquement si les logs envoyés posent problème. Si vous envoyez des logs de [debugging][8] par la suite, n'oubliez pas d'activer les logs de lancement et d'envoyer tous les logs pertinents d'une traite afin d'accélérer le traitement de vos tickets d'assistance.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon_ecs/?tab=java#trace-collection
[2]: /fr/agent/kubernetes/?tab=helm
[3]: /fr/agent/docker/apm/?tab=java
[4]: /fr/tracing/send_traces/
[5]: /fr/help/
[6]: /fr/tracing/troubleshooting/connection_errors/
[7]: /fr/tracing/compatibility_requirements/
[8]: /fr/tracing/troubleshooting/tracer_debug_logs/
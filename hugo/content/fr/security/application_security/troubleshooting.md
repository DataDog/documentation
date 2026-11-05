---
aliases:
- /fr/security_platform/application_security/troubleshooting
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Surveillance des menaces avec Datadog App et API Protection
- link: /security/application_security/how-it-works/
  tag: Documentation
  text: Comment fonctionne App et API Protection dans Datadog
title: Dépannage de la protection des applications et des API
---
## Présentation {#overview}

Si vous rencontrez un comportement inattendu avec Datadog App et API Protection (AAP), il existe des problèmes courants que vous pouvez examiner, comme mentionné ci-dessous. Si vous continuez à rencontrer des difficultés, contactez le [support Datadog][1] pour obtenir de l'aide.

## Limites de débit AAP {#aap-rate-limits}

Les traces AAP sont limitées à 100 traces par seconde. Les traces envoyées après la limite ne sont pas rapportées. Contactez le [support Datadog][1] si vous devez modifier la limite.

## Aucune trace de sécurité détectée par AAP {#no-security-traces-detected-by-aap}

Il existe une série d'étapes qui doivent s'exécuter avec succès pour que les informations sur les menaces apparaissent dans le [Trace and Signals Explorer][2] d'AAP. Il est important de vérifier chaque étape lors de l'examen de ce problème. Des étapes de dépannage supplémentaires pour des langages spécifiques se trouvent dans l'onglet des langages à la fin.

### Confirmez qu'AAP est activé {#confirm-aap-is-enabled}

Vous pouvez utiliser la métrique `datadog.apm.appsec_host` pour vérifier si AAP est en cours d'exécution.

1. Allez dans **Metrics > Summary** dans Datadog.
2. Recherchez la métrique `datadog.apm.appsec_host`. Si la métrique n'existe pas, alors aucun service n'exécute AAP. Si la métrique existe, les services sont signalés avec les tags de métrique `host` et `service`.
3. Sélectionnez la métrique, et dans la section **Tags**, recherchez `service` pour voir quels services exécutent AAP.

Si vous ne voyez pas `datadog.apm.appsec_host`, vérifiez les [instructions dans l'application][3] pour confirmer que toutes les étapes de la configuration initiale sont terminées.

Les données AAP sont envoyées avec les traces APM. Consultez le [dépannage APM][4] pour [confirmer la configuration APM][5] et vérifier les [erreurs de connexion][6].

### Envoyez une attaque de test à votre application {#send-a-test-attack-to-your-application}

 Pour tester votre configuration AAP, déclenchez la règle [Security Scanner Detected][7] en exécutant un fichier contenant le script curl suivant :

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**Remarque :** La valeur `dd-test-scanner-log` est prise en charge dans les versions les plus récentes.

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**Remarque :** La valeur `dd-test-scanner-log` est prise en charge dans les versions les plus récentes.

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

 ```bash
 for ((i=1;i<=250;i++));
do
# Target existing service's routes 
curl https://your-application-url/existing-route -A Arachni/v1.0;
# Target non existing service's routes 
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done

```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

 ```bash
 for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A Arachni/v1.0;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**Remarque :** La valeur `dd-test-scanner-log` est prise en charge dans les versions les plus récentes.

{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```
**Remarque :** La valeur `dd-test-scanner-log` est prise en charge dans les versions les plus récentes.

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

En l'absence d'erreur, quelques minutes après avoir activé et testé votre application, des informations sur les menaces s'affichent dans le [[Trace and Signals Explorer][2].

{{< img src="/security/security_monitoring/explorer/signal_panel_v2.png" alt="Page de détails des signaux de sécurité affichant les tags, les métriques, les prochaines étapes suggérées et les adresses IP des attaquants associées à une menace." style="width:100%;" >}}

### Vérifiez si les intégrations de traceur requises sont désactivées {#check-if-required-tracer-integrations-are-deactivated}

AAP repose sur certaines intégrations de traceur. Si elles sont désactivées, AAP ne fonctionnera pas. Pour voir s'il existe des intégrations désactivées, recherchez `disabled_integrations` dans vos [logs de démarrage][8].

Les intégrations requises varient selon le langage.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}

Pour Java, si vous utilisez l'une des technologies suivantes, l'intégration respective est requise :

- grizzly
- grizzly-filterchain
- jersey
- jetty
- ratpack
- ratpack-request-body (nécessite également ratpack)
- resteasy
- servlet
- servlet-2
- servlet-3
- servlet-request-body (nécessite également servlet)
- spring-web
- tomcat


{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Pour .NET, l'intégration ASP.NET est requise.

**Remarque :** Si ASP.NET Core est désactivé, AAP devrait toujours fonctionner avec ce framework.


{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

Il n'y a aucune intégration requise pour PHP.
<p></p>


{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Les frameworks Go suivants doivent être instrumentés à l'aide des intégrations APM prêtes à l'emploi.

{{% tracing-go-v2 %}}

- [gRPC][8] ([v1][2])
- [net/http][9] ([v1][3])
- [Gorilla Mux][10] ([v1][4])
- [Echo][11] ([v1][5])
- [Chi][12] ([v1][6])

Veuillez vous assurer de consulter la documentation correspondant à votre version (v1.x ou v2.x) du Go Tracer. Si votre framework n'est pas pris en charge, [créez un problème][7] dans le référentiel Go.

[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc#example-package-Server
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http#example-package
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux#example-package
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4#example-package
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5#example-package
[7]: https://github.com/DataDog/dd-trace-go/issues/new?title=Missing%20appsec%20framework%20support
[8]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2
[9]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/net/http/v2
[10]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2
[11]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2
[12]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-chi/chi.v5/v2
[13]: /fr/tracing/trace_collection/custom_instrumentation/go/migration

{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

Pour Node.js, l'intégration HTTP est requise.
<p></p>


{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Pour Ruby, l'intégration [Rack][2] est requise. La version `1.0.0` ou supérieure du traceur Ruby est également requise. Consultez les informations sur la [migration de 0.x vers 1.x][3].

**Remarque :** Rack peut être ajouté manuellement ou automatiquement avec l'intégration [Rails][4] ou [Sinatra][5]. Si ajouté manuellement, le middleware du traceur doit apparaître avant le middleware de sécurité dans la pile Rack.

[2]: /fr/tracing/trace_collection/dd_libraries/ruby/#rack
[3]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
[4]: /fr/tracing/trace_collection/dd_libraries/ruby/#rails
[5]: /fr/tracing/trace_collection/dd_libraries/ruby/#sinatra
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Pour Python, l'intégration WSGI est requise ainsi que l'intégration pour le
framework que vous utilisez, comme l'intégration Django ou Flask.
<p></p>

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Vérifiez la configuration du Datadog Agent {#check-datadog-agent-configuration}

 Pour examiner la configuration du Datadog Agent, procédez comme suit :

- Vérifiez les détails de l'Agent en cours d'exécution à cette adresse `http://<agent-machine-name>:<agent-port>/info`, généralement `http://localhost:8126/info`.
- Assurez-vous qu'il n'y a pas d'erreurs de transmission de l'Agent liées aux spans dans vos [logs du traceur][10].
- Si l'Agent est installé sur une machine distincte, vérifiez que `DD_AGENT_HOST` et, éventuellement, `DD_TRACE_AGENT_PORT` sont définis, ou que `DD_TRACE_AGENT_URL` est défini pour le SDK de l'application.

### Vérifiez si les spans sont correctement transmis à Datadog {#check-if-spans-are-successfully-transmitted-to-datadog}

Les données AAP sont envoyées via des [spans][9]. Pour confirmer que les spans sont correctement transmis à Datadog, vérifiez que vos logs de traceur contiennent des entrées similaires à celle-ci :

```
2021-11-29 21:19:58 CET | TRACE | INFO | (pkg/trace/info/stats.go:111 in LogStats) | [lang:.NET lang_version:5.0.10 interpreter:.NET tracer_version:1.30.1.0 endpoint_version:v0.4] -> traces received: 2, traces filtered: 0, traces amount: 1230 bytes, events extracted: 0, events sampled: 0
```

Si aucun span n'est transmis, les logs du traceur contiennent des entrées similaires à ce qui suit :

```
2021-11-29 21:18:48 CET | TRACE | INFO | (pkg/trace/info/stats.go:104 in LogStats) | No data received
```

## Dépannage par langage {#troubleshooting-by-language}

Vous trouverez ci-dessous des instructions de dépannage spécifiques à certains langages.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}
La bibliothèque Java utilise [SLF4J][1] pour la journalisation. Ajoutez les indicateurs d'exécution suivants afin que le SDK enregistre les logs dans un fichier :

```java
 -Ddatadog.slf4j.simpleLogger.defaultLogLevel=info
 -Ddatadog.slf4j.simpleLogger.logFile=dd.log
```

Une fois le service démarré, le SDK enregistre les logs dans le fichier spécifié. Datadog recommande d'utiliser `INFO` pour le niveau de log, car les logs `DEBUG` sont détaillés.

[1]: https://www.slf4j.org/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

La bibliothèque .NET enregistre les logs dans un fichier et ne peut pas les enregistrer dans `stdout`/`stderr`. Le niveau de log par défaut est `INFO`. Pour activer les logs `DEBUG`, définissez `DD_TRACE_DEBUG=true`.

Les fichiers de log se trouvent dans les répertoires suivants :

| Plateforme 	 | Répertoire de logs 	|
|------------|----------------|
| Docker 	   | Le répertoire du conteneur `/var/log/datadog/dotnet/`. Une option recommandée consiste à monter le dossier de logs sur la machine du host en utilisant des [volumes][1]. |
| Linux	     | /var/log/datadog/dotnet/	                                  |
| Windows 	 | C:\ProgramData\Datadog .NET Tracer\logs                    |

[1]: https://docs.docker.com/storage/volumes/
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

Pour PHP, afin de commencer à résoudre les problèmes avec l'extension AAP de Datadog, activez les logs de débogage dans le fichier `.ini` de l'extension AAP.

Le fichier `ini` de l'extension se trouve généralement dans `/etc/php/<version>/xxx/conf.d/98-ddtrace.ini`, mais l'emplacement peut différer selon votre installation. Consultez le début de la sortie `phpinfo()` pour identifier le répertoire analysé pour les fichiers `.ini`, le cas échéant. Dans le fichier `.ini`, définissez les options de configuration suivantes avec ce qui suit :

```php
datadog.appsec.log_level='debug'
datadog.appsec.helper_extra_args='--log_level=debug'
datadog.appsec.helper_log_file='/tmp/helper.log'
```

L'extension génère des logs dans le fichier log `php_error` par défaut. S'il n'y a pas de logs dans le fichier, ajoutez ce qui suit au fichier `.ini` :

```php
datadog.appsec.log_file='tmp/extension.log'
```

### L'installation ne parvient pas à trouver PHP {#installation-fails-to-find-php}
Si le script d'installation ne parvient pas à trouver la version correcte de PHP, vous pouvez définir `--php-bin` sur l'emplacement du binaire PHP, par exemple :

```
$ php datadog-setup.php --php-bin /usr/bin/php7.4 --enable-appsec
```
### La connexion à l'assistant a échoué {#connection-to-helper-failed}
Si l'extension AAP ne parvient pas à communiquer avec le processus assistant, l'avertissement suivant apparaît :

```
PHP Warning:  Unknown: [ddappsec] Connection to helper failed and we are not going to attempt to launch it: dd_error
```

Cet avertissement peut être suivi de l'un des messages d'erreur suivants :

```
PHP Warning:  Unknown: [ddappsec] Could not open lock file /tmp/ddappsec.lock: Permission denied in Unknown on line 0
```

```
PHP Warning:  Unknown: [ddappsec] Call to bind() failed: Permission denied
```

```
PHP Warning:  Unknown: [ddappsec] Failed to unlink /tmp/ddappsec.sock: Operation not permitted
```

Cela indique que le fichier de verrouillage ou le fichier socket utilisé par l'extension a des autorisations non valides, ou que l'utilisateur exécutant le processus PHP n'a pas d'accès en écriture au répertoire `tmp`.

Si le fichier de verrouillage ou le fichier socket a des autorisations non valides, vous pouvez soit les supprimer et redémarrer Apache/FPM, soit ajuster `user:group` pour qu'il corresponde à celui utilisé par Apache/FPM, par exemple, `www-data`.

Si l'utilisateur n'a pas d'accès en écriture au répertoire tmp, vous pouvez modifier l'emplacement du fichier de verrouillage et du fichier socket en modifiant les paramètres suivants dans le fichier `.ini` de l'extension&nbsp;:

```
datadog.appsec.helper_runtime_path = /<directory with compatible permissions>/
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

#### Confirmez qu'AAP est activé dans l'application en cours d'exécution {#confirm-aap-is-enabled-in-the-running-application}

[Les logs de démarrage du traceur][1] indiquent la configuration du SDK et si AAP est activé ou non. Si `appsec` est `true`, alors AAP est activé et en cours d'exécution.

Par exemple, le log de démarrage suivant indique qu'AAP est désactivé :

```
2022/02/17 14:49:00 Datadog Tracer v1.36.0 INFO: DATADOG TRACER CONFIGURATION {"date":"2022-02-17T14:49:00+01:00","os_name":"Linux (Unknown Distribution)","os_version":"5.13.0","version":"v1.36.0","lang":"Go","lang_version":"go1.17.1","env":"prod","service":"grpcserver","agent_url":"http://localhost:8126/v0.4/traces","debug":false,"analytics_enabled":false,"sample_rate":"NaN","sampling_rules":null,"sampling_rules_error":"","service_mappings":null,"tags":{"runtime-id":"69d99219-b68f-4718-9419-fa173a79351e"},"runtime_metrics_enabled":false,"health_metrics_enabled":false,"profiler_code_hotspots_enabled":false,"profiler_endpoints_enabled":false,"dd_version":"","architecture":"amd64","global_service":"","lambda_mode":"false","appsec":false,"agent_features":{"DropP0s":false,"Stats":false,"StatsdPort":0}}
```

#### Activez les logs de débogage {#enable-debug-logs}

Activez les logs de débogage avec la variable d'environnement `DD_TRACE_DEBUG=1`. La bibliothèque AAP enregistrera les logs dans la sortie d'erreur standard.

**Remarque&nbsp;:** AAP n'enregistre des logs que lorsqu'il est activé. Utilisez la variable d'environnement `DD_APPSEC_ENABLED=1` pour activer AAP.

[1]: /fr/tracing/troubleshooting/tracer_startup_logs/
{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

Utilisez ce [guide de migration][1] pour évaluer les changements incompatibles si vous avez mis à niveau votre bibliothèque Node.js de la version 1.x vers la version 2.x.

Si vous ne voyez pas les informations de menace AAP dans le [Trace and Signals Explorer][2] pour votre application Node.js, suivez ces étapes pour résoudre le problème&nbsp;:

1. Confirmez que la dernière version d'AAP est en cours d'exécution en vérifiant que `appsec_enabled` est `true` dans les [logs de démarrage][3].
   1. Si vous ne voyez pas les logs de démarrage après l'envoi d'une requête, ajoutez la variable d'environnement `DD_TRACE_STARTUP_LOGS=true` pour activer les logs de démarrage. Vérifiez dans les logs de démarrage que `appsec_enabled` est `true`.
   1. Si `appsec_enabled` est `false`, alors AAP n'a pas été activé correctement. Consultez les [instructions d'installation][4].
   1. Si `appsec_enabled` n'est pas dans les logs de démarrage, la dernière version d'AAP doit être installée. Consultez les [instructions d'installation][4].
2. Confirmez que le SDK fonctionne en recherchant les traces pertinentes sur le dashboard APM.<br />
    AAP s'appuie sur le SDK, donc si vous ne voyez pas de traces, alors le SDK pourrait ne pas fonctionner. Consultez le [Dépannage APM][5].
3. Dans le répertoire de votre application, exécutez la commande `npm explore @datadog/native-appsec -- npm run install` et redémarrez votre application.
   1. Si `@datadog/native-appsec` n'est pas trouvé, alors l'installation est incorrecte.
   1. Si `@datadog/native-appsec` est trouvé lors du démarrage de votre application, ajoutez la commande à votre script de démarrage d'exécution.
   1. Si le SDK ne fonctionne toujours pas, il est possible que vous utilisiez un environnement d'exécution non pris en charge.
4. Pour activer les logs, ajoutez les variables d'environnement suivantes :
    ```
    DD_TRACE_DEBUG=1
    DD_TRACE_LOG_LEVEL=info
    ```

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: https://app.datadoghq.com/security/appsec/
[3]: /fr/tracing/troubleshooting/tracer_startup_logs/
[4]: /fr/security/application_security/setup/nodejs/
[5]: /fr/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Si vous ne voyez pas les informations de menace AAP dans le [[Trace and Signals Explorer][1] pour votre application Python, vérifiez qu'AAP est en cours d'exécution et que votre traceur fonctionne.

1. Définissez le niveau de log de votre application sur `DEBUG` pour confirmer qu'AAP est en cours d'exécution :

   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```
  
   Ensuite, effectuez n'importe quel appel HTTP vers l'application. Vous devriez voir le log suivant :
  
   ```
   DEBUG:ddtrace.appsec.processor:[DDAS-001-00] Executing AppSec In-App WAF with parameters:
   ```
  
   Si ce log n'est pas présent, AAP n'est pas en cours d'exécution.

2. Le SDK fonctionne-t-il ? Pouvez-vous voir des traces pertinentes sur le dashboard APM ?

   AAP repose sur le SDK. Si vous ne voyez pas de traces, alors le SDK pourrait ne pas fonctionner. Consultez [Dépannage APM][2].


[1]: https://app.datadoghq.com/security/appsec/
[2]: /fr/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Pour Ruby, si vous ne voyez pas d'informations sur les menaces AAP dans le [[Trace and Signals Explorer][1] après quelques minutes, activez les diagnostics du traceur pour les [logs de débogage][2]. Exemple :

```ruby
Datadog.configure do |c|
  c.diagnostics.debug = true  # increase general log level to debug
  c.appsec.waf_debug = true   # also enable WAF-specific log verbosity to highest level
end
```

Les logs de débogage sont détaillés mais utiles. Si vous ouvrez un ticket auprès du [support Datadog][1], transmettez les logs avec votre demande.

#### AAP est-il correctement activé ? {#is-aap-correctly-enabled}

AAP a été correctement activé si vous voyez des logs tels que :

```
D, [2021-12-14T11:03:32.167125 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_info, :func=> "ddwaf_set_log_cb", :file=>"PowerWAFInterface.cpp", :message=>"Sending log messages to binding, min level trace"}
D, [2021-12-14T11:03:32.200491 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_debug, :func= >"parse", :file=>"parser_v2.cpp", :message=>"Loaded 124 rules out of 124 available in the ruleset"}
```

Si ce n'est pas le cas, procédez aux vérifications suivantes :

- Si les variables d'environnement AAP correctes sont définies pour votre processus d'application.
- La dernière version de la gem est installée.
- Le SDK est configuré correctement et envoie des traces APM vers votre dashboard APM.

#### AAP est-il appelé pour chaque requête HTTP ? {#is-aap-called-for-each-http-request}

Pour confirmer qu'AAP est appelé pour chaque requête HTTP, déclenchez une [attaque de test](#send-a-test-attack-to-your-application) et recherchez ces logs :

```
D, [2022-01-19T21:25:50.579745 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/reactive/operation.rb:14:in `initialize') operation: rack.request initialize
D, [2022-01-19T21:25:50.580300 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:25:in `block (2 levels) in watch') root span: 964736568335365930
D, [2022-01-19T21:25:50.580371 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:26:in `block (2 levels) in watch') active span: 964736568335365930
D, [2022-01-19T21:25:50.581061 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/reactive/request.rb:34:in `block in subscribe') reacted to ["request.headers", "request.uri.raw", "request.query", "request.cookies", "request.body.raw"]: [{"version"=>"HTTP/1.1", "host"=>"127.0.0.1:9292", "accept"=>"*/*", "user-agent"=>"Nessus SOAP"}, "http://127.0.0.1:9292/", [], {}, ""]
```

Si vous ne voyez pas ces logs, essayez ce qui suit :

- Vérifiez qu'un autre système de sécurité en amont ne filtre pas les requêtes en fonction de la valeur de l'en-tête de test, ce qui empêcherait la requête d'atteindre l'application.
- Envoyez une autre [attaque de test](#send-a-test-attack-to-your-application) en utilisant une autre valeur d'agent utilisateur dans la commande curl pour voir si les informations sur la menace sont envoyées avec succès.
- Consultez les logs de l'application pour la requête exacte que vous avez exécutée afin de confirmer que la requête a atteint l'application et n'a pas reçu de réponse d'un autre système en amont.

Si l'intégration Rack a été configurée manuellement, un problème connu empêche parfois AAP de fonctionner. Exemple :

```ruby
Datadog.configure do |c|
  c.tracing.instrument :rails
  ...
  c.tracing.instrument :rack, web_service_name: "something", request_queuing: true
```

Si `c.tracing.instrument :rack` est présent, supprimez-le pour voir si le check réussit.

#### AAP détecte-t-il les menaces de sécurité liées aux requêtes HTTP ? {#is-aap-detecting-http-request-security-threats}

Pour confirmer qu'AAP détecte les menaces de sécurité, déclenchez une [attaque de test](#send-a-test-attack-to-your-application) et recherchez ces logs :

```
D, [2021-12-14T22:39:53.268820 #106051] DEBUG -- ddtrace: [ddtrace] (ddtrace/lib/datadog/appsec/contrib/rack/reactive/request.rb:63:in `block in subscribe') WAF: #<struct Datadog::AppSec::WAF::Result action=:monitor, data=[{"rule"=>{"id"=>"ua0-600-10x", "name"=>"Nessus", "tags"=>{"type"=>"security_scanner", "category"=>"attack_attempt"}}, "rule_matches"=>[{"operator"=>"match_regex", "operator_value"=>"(?i)^Nessus(/|([ :]+SOAP))", "parameters"=>[{"address"=>"server.request.headers.no_cookies", "key_path"=>["user-agent"], "value"=>"Nessus SOAP", "highlight"=>["Nessus SOAP"]}]}]}], perf_data=nil, perf_total_runtime=20519>
```
Si vous ne voyez pas ces logs, vérifiez qu'un autre système de sécurité en amont ne filtre pas les requêtes ou ne les modifie pas en fonction de la valeur de l'en-tête de l'attaque de test.

#### Le SDK envoie-t-il des traces avec des données de sécurité ? {#is-the-sdk-sending-traces-with-security-data}
Les données AAP sont envoyées avec les traces APM. Pour confirmer qu'AAP détecte correctement et insère des données de sécurité dans les traces, déclenchez une [attaque de test](#send-a-test-attack-to-your-application) et recherchez ces logs de traceur :

```
Tags: [
   runtime-id => 0c3dfc67-9cf3-457c-a980-0229b203d048,
   _dd.runtime_family => ruby,
   appsec.event => true,
   _dd.appsec.json => {"triggers":[{"rule":{"id":"ua0-600-10x","name":"Nessus","tags":{"type":"security_scanner","category":"attack_attempt"}},"rule_matches":[{"operator":"match_regex","operator_value":"(?i)^Nessus(/|([ :]+SOAP))","parameters":[{"address":"server.request.headers.no_cookies","key_path":["user-agent"],"value":"Nessus SOAP","highlight":["Nessus SOAP"]}]}]}]},
   http.request.headers.host => 127.0.0.1:9292,
   http.request.headers.accept => */*,
   http.request.headers.user-agent => Nessus SOAP,
   http.response.headers.content-type => text/plain,
   http.host => 127.0.0.1,
   http.useragent => Nessus SOAP,
   network.client.ip => 127.0.0.1,
   _dd.origin => appsec,
   http.method => GET,
   http.url => /,
   http.base_url => http://127.0.0.1:9292,
   http.status_code => 200,
   http.response.headers.content_type => text/plain]
Metrics: [
   _dd.agent_psr => 1.0,
   system.pid => 155644.0,
   _dd.appsec.enabled => 1.0,
   _dd.measured => 1.0,
   _sampling_priority_v1 => 2.0]]
```

Attendez une minute que l'agent transfère les traces, puis vérifiez que les traces apparaissent dans le dashboard APM. Les informations de sécurité dans les traces peuvent nécessiter un temps supplémentaire pour être traitées par Datadog avant d'apparaître en tant que traces de sécurité dans le [Trace and Signals Explorer][1] d'AAP.

[1]: https://app.datadoghq.com/security/appsec/
[2]: /fr/tracing/troubleshooting/#tracer-debug-logs
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Confirmez que les versions du traceur sont mises à jour {#confirm-tracer-versions-are-updated}

Consultez la documentation de configuration du produit App and API Protection pour valider que vous utilisez la bonne version du SDK. Ces versions minimales sont requises pour commencer à envoyer des données de télémétrie incluant des informations sur la bibliothèque.

### Assurez la communication des données de télémétrie {#ensure-the-communication-of-telemetry-data}

Assurez-vous que la variable d'environnement `DD_INSTRUMENTATION_TELEMETRY_ENABLED` (`DD_TRACE_TELEMETRY_ENABLED` pour Node.js) est définie sur `true`, ou que la propriété système correspondante pour votre langage est activée. Par exemple en Java : `-Ddd.instrumentation.telemetry.enabled=true`

## Désactivation d'AAP {#disabling-aap}

Pour désactiver AAP, utilisez l'une des méthodes suivantes.

Si vous avez activé AAP en utilisant la variable d'environnement `DD_APPSEC_ENABLED=true`, utilisez la section DD_APPSEC_ENABLED ci-dessous.
Si vous avez activé AAP en utilisant [Remote Configuration][16], utilisez la méthode Remote Configuration ci-dessous.

### DD_APPSEC_ENABLED {#dd-appsec-enabled}

Si la variable d'environnement `DD_APPSEC_ENABLED=true` est définie pour votre service, supprimez la variable d'environnement `DD_APPSEC_ENABLED=true` de la configuration de votre application et redémarrez votre service.

Si votre service est un service PHP, définissez explicitement la variable d'environnement sur `DD_APPSEC_ENABLED=false` et, le cas échéant, commentez l'indicateur `datadog.appsec.enabled = On` dans votre fichier de configuration `php.ini`. Ensuite, redémarrez votre service. 

### Remote Configuration {#remote-configuration}

Si AAP a été activé à l'aide de [Remote Configuration][16], procédez comme suit : 
  1. Accédez à [{{< ui >}}Services{{< /ui >}}][15].
  2. Sélectionnez {{< ui >}}App & API Protection in Monitoring Mode{{< /ui >}}.
  3. Dans la facette {{< ui >}}App & API Protection{{< /ui >}}, activez {{< ui >}}Monitoring Only{{< /ui >}}, {{< ui >}}No data{{< /ui >}} et {{< ui >}}Ready to block{{< /ui >}}.
  4. Cliquez sur un service.
  5. Dans les détails du service, dans {{< ui >}}App & API Protection{{< /ui >}}, cliquez sur {{< ui >}}Deactivate{{< /ui >}}.

<div class="alert alert-info">Si AAP a été activé à l'aide de <a href="https://app.datadoghq.com/organization-settings/remote-config">Remote Configuration</a>, vous pouvez utiliser un bouton <strong>Deactivate</strong>. Si AAP a été activé à l'aide de la configuration locale, le bouton <strong>Deactivate</strong> n'est pas une option.</div>

### Désactivation en masse {#bulk-disable}

Pour désactiver AAP sur vos services en masse, procédez comme suit : 
  1. Accédez à [{{< ui >}}Services{{< /ui >}}][15].
  3. Dans la facette {{< ui >}}App & API Protection{{< /ui >}}, activez {{< ui >}}Monitoring Only{{< /ui >}}, {{< ui >}}No data{{< /ui >}} et {{< ui >}}Ready to block{{< /ui >}}.
  3. Cochez les cases des services pour lesquels vous souhaitez désactiver la détection des menaces.
  4. Dans {{< ui >}}Bulk Actions{{< /ui >}}, sélectionnez {{< ui >}}Deactivate Threat detection on (number of) services{{< /ui >}}.

  
## Besoin d'aide supplémentaire ? {#need-more-help}

Si vous continuez à rencontrer des problèmes avec AAP, contactez le [support Datadog][1] avec les informations suivantes :

- Confirmation que la [test attack](#send-a-test-attack-to-your-application) a été envoyée avec succès
- Logs [startup][8] ou [debug][10] du traceur

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: https://app.datadoghq.com/security/appsec/
[3]: https://app.datadoghq.com/security/appsec?instructions=all
[4]: /fr/tracing/troubleshooting/
[5]: /fr/tracing/troubleshooting/#confirm-apm-setup-and-agent-status
[6]: /fr/tracing/troubleshooting/connection_errors/
[7]: /fr/security/default_rules/security-scan-detected/
[8]: /fr/tracing/troubleshooting/tracer_startup_logs/
[9]: /fr/tracing/glossary/#spans
[10]: /fr/tracing/troubleshooting/#tracer-debug-logs
[12]: https://app.datadoghq.com/security/appsec/vm
[13]: /fr/security/code_security/iast/
[14]: /fr/security/code_security/software_composition_analysis
[15]: https://app.datadoghq.com/security/configuration/asm/services-config
[16]: https://app.datadoghq.com/organization-settings/remote-config
[17]: https://ddtrace.readthedocs.io/en/stable/integrations.html#flask
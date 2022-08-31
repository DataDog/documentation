---
further_reading:
- link: /security_platform/application_security/
  tag: Documentation
  text: Surveiller les menaces avec la solution Application Security Monitoring de
    Datadog
- link: /security_platform/application_security/getting_started/
  tag: Documentation
  text: Commencer à utiliser la solution Application Security Monitoring pour détecter
    les menaces
- link: /security_platform/application_security/setup_and_configure/#compatibilite
  tag: Documentation
  text: Compatibilité des frameworks et langages de programmation
- link: /security_platform/application_security/how-appsec-works/
  tag: Documentation
  text: Fonctionnement d'Application Security Monitoring dans Datadog
kind: documentation
title: Dépannage d'Application Security Monitoring
---


## Présentation

Si la solution Application Security Monitoring (ASM) de Datadog se comporte de manière inattendue, consultez ce guide pour passer en revue les problèmes courants et suivre les solutions proposées. Si vous ne parvenez pas à résoudre votre problème, contactez l'[assistance Datadog][1] pour obtenir de l'aide.

## Limites de débit d'ASM

Un taux maximal de 100 traces par seconde est appliqué à ASM. Une fois cette limite atteinte, les traces envoyées ne sont pas traitées. Contactez l'[assistance Datadog][1] si vous souhaitez modifier cette limite.

## Aucune requête suspecte détectée par ASM

Pour que les informations sur les menaces s'affichent correctement dans le [Trace Explorer et le Signals Explorer][2] ASM, un certain nombre d'étapes doivent être réalisées sans le moindre échec. Si aucune requête suspecte n'est détectée, il est important de vérifier chaque étape de cette procédure. Des étapes de dépannage supplémentaires propres à certains langages sont fournies dans les onglets appropriés en bas de ce guide.

### Confirmer l'activation d'ASM

La métrique `datadog.apm.appsec_host` vous permet de vérifier si ASM est en cours d'exécution.

1. Accédez à **Metrics > Summary** dans Datadog.
2. Recherchez la métrique `datadog.apm.appsec_host`. Si vous ne la voyez pas, cela signifie qu'aucun service n'exécute ASM. À l'inverse, si elle figure sur la page, les services exécutant la solution sont indiqués par les tags `host` et `service` de la métrique.
3. Sélectionnez la métrique. Dans la section **Tags**, recherchez ensuite le terme `service` pour visualiser les services qui exécutent ASM.

Si la métrique `datadog.apm.appsec_host` n'est pas affichée, référez-vous aux [instructions dans l'application][3] pour confirmer que vous avez suivi toutes les étapes de configuration initiale.

Les données ASM sont envoyées au sein de traces APM. Consultez la section [Dépannage de l'APM][4] pour [vérifier que votre configuration APM est valide][5] et consulter les éventuelles [erreurs de connexion][6].

### Envoyer une attaque fictive à votre application

 Pour tester votre configuration ASM, exécutez un fichier contenant le script curl suivant pour déclencher la règle de [détection de scanner de sécurité][7] :

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,NodeJS,python" >}}
{{< programming-lang lang="java" >}}

```bash
for ((i=1;i<=200;i++));
do
# Cibler les routes existantes du service
curl https://url-votre-application/route-existante -A dd-test-scanner-log;
# Cibler les routes non existantes du service
curl https://url-votre-application/route-non-existante -A dd-test-scanner-log;
done
```

**Remarque :** la plupart des versions récentes prennent en charge la valeur `dd-test-scanner-log`.

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

```bash
for ((i=1;i<=200;i++));
do
# Cibler les routes existantes du service
curl https://url-votre-application/route-existante -A dd-test-scanner-log;
# Cibler les routes non existantes du service
curl https://url-votre-application/route-non-existante -A dd-test-scanner-log;
done
```

**Remarque :** la plupart des versions récentes prennent en charge la valeur `dd-test-scanner-log`.

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

 ```bash
 for ((i=1;i<=200;i++));
do
# Cibler les routes existantes du service
curl https://url-votre-application/route-existante -A Arachni/v1.0;
# Cibler les routes non existantes du service
curl https://url-votre-application/route-non-existante -A Arachni/v1.0;
done
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

 ```bash
 for ((i=1;i<=200;i++));
do
# Cibler les routes existantes du service
curl https://url-votre-application/route-existante -A Arachni/v1.0;
# Cibler les routes non existantes du service
curl https://url-votre-application/route-non-existante -A Arachni/v1.0;
done
```

{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

```bash
for ((i=1;i<=200;i++));
do
# Cibler les routes existantes du service
curl https://url-votre-application/route-existante -A dd-test-scanner-log;
# Cibler les routes non existantes du service
curl https://url-votre-application/route-non-existante -A dd-test-scanner-log;
done
```

**Remarque :** la plupart des versions récentes prennent en charge la valeur `dd-test-scanner-log`.

{{< /programming-lang >}}
{{< programming-lang lang="NodeJS" >}}

```bash
for ((i=1;i<=200;i++));
do
# Cibler les routes existantes du service
curl https://url-votre-application/route-existante -A dd-test-scanner-log;
# Cibler les routes non existantes du service
curl https://url-votre-application/route-non-existante -A dd-test-scanner-log;
done
```
**Remarque :** la plupart des versions récentes prennent en charge la valeur `dd-test-scanner-log`.

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

```bash
for ((i=1;i<=200;i++));
do
# Cibler les routes existantes du service
curl https://url-votre-application/route-existante -A dd-test-scanner-log;
# Cibler les routes non existantes du service
curl https://url-votre-application/route-non-existante -A dd-test-scanner-log;
done
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

En l'absence d'erreur, quelques minutes après avoir activé et testé votre application, des informations sur les menaces s'affichent dans l'[explorateur de traces et de signaux][2].

{{< img src="/security_platform/application_security/application-security-signal.png" alt="Page des détails d'un signal de sécurité avec des tags, des métriques, des recommandations de mesures et les adresses IP de l'attaquant associé à la menace" style="width:100%;" >}}

### Vérifier si les intégrations du traceur requises sont désactivées

ASM repose sur certaines intégrations du traceur : si elles sont désactivées, la solution ne fonctionne pas. Pour vérifier si certaines des intégrations requises sont désactivées, recherchez `disabled_integrations` dans vos [logs de lancement][8].

Les intégrations requises varient selon le langage.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,NodeJS,python" >}}
{{< programming-lang lang="java" >}}

Pour [Java][1], si vous utilisez les technologies suivantes, les intégrations correspondantes sont requises :

- grizzly
- grizzly-filterchain
- jersey
- jetty
- ratpack
- ratpack-request-body (requiert également ratpack)
- resteasy
- servlet
- servlet-2
- servlet-3
- servlet-request-body (requiert également servlet)
- spring-web
- tomcat

[1]: /fr/security_platform/application_security/setup_and_configure/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Pour [.NET][1], l'intégration ASP.NET est requise.

**Remarque** : si ASP.NET Core est désactivé, ASM fonctionne tout de même avec ce framework.


[1]: /fr/security_platform/application_security/setup_and_configure/
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

[PHP][1] ne nécessite aucune intégration.
<p></p>

[1]: /fr/security_platform/application_security/setup_and_configure/
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Les frameworks [Go][1] suivants doivent être instrumentés à l'aide d'intégrations APM prêtes à l'emploi :

- [gRPC][2]
- [net/http][3]
- [Gorilla Mux][4]
- [Echo][5]
- [Chi][6]

Si votre framework n'est pas pris en charge, [créez un ticket][7] dans le référentiel Go.

[1]: /fr/security_platform/application_security/setup_and_configure/
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc#example-package-Server
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http#example-package
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux#example-package
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4#example-package
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5#example-package
[7]: https://github.com/DataDog/dd-trace-go/issues/new?title=Missing%20appsec%20framework%20support
{{< /programming-lang >}}
{{< programming-lang lang="NodeJS" >}}

Pour [Node.js][1], l'intégration HTTP est requise.
<p></p>

[1]: /fr/security_platform/application_security/setup_and_configure/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Pour [Ruby][1], l'intégration [Rack][2] est requise, ainsi que la version `1.0.0` ou une version ultérieure du traceur Ruby. Consultez [cette page][3] (en anglais) pour en savoir plus sur la migration de la version 0.x à la version 1.x.

**Remarque** : vous pouvez ajouter Rack manuellement ou automatiquement, avec l'intégration [Rails][4] ou [Sinatra][5]. En cas d'ajout manuel, le middleware du tracer doit figurer avant le middleware de sécurité dans la pile Rack.


[1]: /fr/security_platform/application_security/setup_and_configure/
[2]: /fr/tracing/trace_collection/dd_libraries/ruby/#rack
[3]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
[4]: /fr/tracing/trace_collection/dd_libraries/ruby/#rails
[5]: /fr/tracing/trace_collection/dd_libraries/ruby/#sinatra
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Pour [Python][1], l'intégration WSGI, ainsi que l'intégration pour le framework que vous utilisez, comme Django ou Flask, sont requises.
<p></p>

[1]: /fr/security_platform/application_security/setup_and_configure/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Examiner la configuration de l'Agent Datadog

 Pour examiner la configuration de l'Agent Datadog, procédez comme suit :

- Consultez les informations détaillées sur l'Agent en cours d'exécution à l'adresse `http://<nom-machine-agent>:<port-agent>/info` (qui correspond généralement à `http://localhost:8126/info`).
- Vérifiez que les [logs de votre traceur][7] ne contiennent aucune erreur de transmission des spans de l'Agent.
- Si l'Agent est installé sur une machine distincte, vérifiez que vous avez bien défini le paramètre `DD_AGENT_HOST` (et potentiellement le paramètre `DD_TRACE_AGENT_PORT`), ou le paramètre `DD_TRACE_AGENT_URL` pour la bibliothèque de tracing de l'application.

### Vérifier si des spans sont transmises à Datadog

Les données ASM sont envoyées via des [spans][9]. Pour vous assurer que les spans sont bien transmises à Datadog, vérifiez si les logs de votre traceur contiennent des entrées similaires à ce qui suit :

```
2021-11-29 21:19:58 CET | TRACE | INFO | (pkg/trace/info/stats.go:111 in LogStats) | [lang:.NET lang_version:5.0.10 interpreter:.NET tracer_version:1.30.1.0 endpoint_version:v0.4] -> traces received: 2, traces filtered: 0, traces amount: 1230 bytes, events extracted: 0, events sampled: 0
```

Si aucune span n'est transmise, les logs du traceur contiennent des entrées similaires à ce qui suit :

```
2021-11-29 21:18:48 CET | TRACE | INFO | (pkg/trace/info/stats.go:104 in LogStats) | No data received
```

## Dépannage par langage

Vous trouverez ci-dessous des instructions de dépannage spécifiques à certains langages.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,NodeJS,python" >}}
{{< programming-lang lang="java" >}}
La bibliothèque Java utilise l'API [SLF4J][1] pour la journalisation. Ajoutez les flags d'exécution suivants afin que le traceur enregistre les logs dans un fichier :

```java
 -Ddatadog.slf4j.simpleLogger.defaultLogLevel=info
 -Ddatadog.slf4j.simpleLogger.logFile=dd.log
```

Une fois le service lancé, le traceur enregistre les logs dans le fichier spécifié. Datadog vous conseille d'utiliser le niveau de log `INFO`, car les logs `DEBUG` sont très détaillés.

[1]: https://www.slf4j.org/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

La bibliothèque .NET enregistre les logs dans un fichier, et non dans `stdout`/`stderr`. Par défaut, le niveau de log est défini sur `INFO`. Pour activer les logs `DEBUG`, définissez `DD_TRACE_DEBUG=true`.

Les fichiers de log se trouvent dans les répertoires suivants :

| Plateforme   | Répertoire des logs    |
|------------|----------------|
| Docker       | Le répertoire `/var/log/datadog/dotnet/` du conteneur. Il est recommandé de monter le dossier des logs sur la machine du host à l'aide de [volumes][1]. |
| Linux      | /var/log/datadog/dotnet/                                   |
| Windows    | C:\ProgramData\Datadog .NET Tracer\logs                    |

[1]: https://docs.docker.com/storage/volumes/
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

Pour commencer à diagnostiquer les problèmes concernant l'extension ASM de Datadog pour PHP, activez les logs de debugging dans le fichier `.ini` de l'extension.

Il se trouve généralement dans `/etc/php/<version>/xxx/conf.d/98-ddtrace.ini`. Toutefois, l'emplacement précis du fichier `ini` peut varier en fonction de votre installation. Consultez le début de la sortie de `phpinfo()` pour identifier le répertoire à partir duquel les éventuels fichiers `.ini` sont analysés. Définissez les options de configuration suivantes dans le fichier `.ini` :

```php
datadog.appsec.log_level=‘debug’
datadog.appsec.helper_extra_args=‘--log_level=debug’
datadog.appsec.helper_log_file=‘/tmp/helper.log’
```

L'extension enregistre les logs dans le fichier de log `php_error` par défaut. Si le fichier ne contient aucun log, ajoutez ce qui suit au fichier `.ini` :

```php
datadog.appsec.log_file=’tmp/extension.log’
```

### Installation ne trouvant pas PHP
Si le script d'installation ne parvient pas à trouver la bonne version de PHP, vous pouvez définir le `--php-bin` sur l'emplacement du binaire PHP. Exemple :

```
$ php datadog-setup.php --php-bin /usr/bin/php7.4 --enable-appsec
```
### Échec de la connexion au processus auxiliaire
Si l'extension ASM ne parvient pas à communiquer avec le processus auxiliaire, l'avertissement suivant est généré :

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

Ces messages indiquent que le fichier de verrouillage ou le fichier du socket utilisé par l'extension ne possèdent pas les autorisations adéquates, ou que l'utilisateur exécutant le processus PHP ne dispose pas d'une autorisation d'écriture dans le répertoire `tmp`.

Si le fichier de verrouillage ou le fichier du socket ne possèdent pas les autorisations adéquates, vous pouvez les supprimer et redémarrer Apache/FPM ou modifier `user:group` de façon à utiliser le même paramètre qu'Apache ou que FPM, par exemple `www-data`.

Si l'utilisateur ne dispose pas d'autorisation d'écriture dans le répertoire tmp, vous pouvez changer l'emplacement du fichier de verrouillage et du fichier du socket en modifiant les paramètres suivants du fichier `.ini` de l'extension :

```
datadog.appsec.helper_runtime_path = /<répertoire avec les autorisations compatibles>/
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

#### Vérifier si ASM est activé dans l'application exécutée

Les [logs de lancement du traceur][1] fournissent la configuration du traceur et indique si ASM est activé. Si `appsec` est défini sur `true`, cela signifie que la solution ASM est activée et en cours d'exécution.

Par exemple, le log de lancement suivant indique qu'ASM est désactivé :

```
2022/02/17 14:49:00 Datadog Tracer v1.36.0 INFO: DATADOG TRACER CONFIGURATION {"date":"2022-02-17T14:49:00+01:00","os_name":"Linux (Unknown Distribution)","os_version":"5.13.0","version":"v1.36.0","lang":"Go","lang_version":"go1.17.1","env":"prod","service":"grpcserver","agent_url":"http://localhost:8126/v0.4/traces","debug":false,"analytics_enabled":false,"sample_rate":"NaN","sampling_rules":null,"sampling_rules_error":"","service_mappings":null,"tags":{"runtime-id":"69d99219-b68f-4718-9419-fa173a79351e"},"runtime_metrics_enabled":false,"health_metrics_enabled":false,"profiler_code_hotspots_enabled":false,"profiler_endpoints_enabled":false,"dd_version":"","architecture":"amd64","global_service":"","lambda_mode":"false","appsec":false,"agent_features":{"DropP0s":false,"Stats":false,"StatsdPort":0}}
```

#### Activer les logs de debugging

Utilisez la variable d'environnement `DD_TRACE_DEBUG=1` pour activer les logs de debugging. La bibliothèque ASM enregistre alors les logs dans la sortie d'erreur standard.

**Remarque :** la solution ASM génère uniquement des logs lorsqu'elle est activée. Utilisez la variable d'environnement `DD_APPSEC_ENABLED=1` pour activer ASM.


[1]: /fr/tracing/troubleshooting/tracer_startup_logs/
{{< /programming-lang >}}
{{< programming-lang lang="NodeJS" >}}

Si vous êtes passé de la version 1.x à la version 2.x de la bibliothèque NodeJS, référez-vous à ce [guide de migration][1] pour évaluer l'impact des principales modifications.

Si ASM n'affiche aucune information sur les menaces dans le [Trace Explorer et le Signals Explorer][2] de votre application NodeJS, suivez les étapes ci-dessous pour y remédier :

1. Vérifiez que la dernière version d'ASM est exécutée, en confirmant que `appsec_enabled` est défini sur `true` dans les [logs de lancement][3].

    a. Si, après avoir envoyé une requête, vous ne voyez aucun log de lancement, ajoutez la variable d'environnement `DD_TRACE_STARTUP_LOGS=true` pour activer les logs de lancement. Vérifiez ensuite dans ces logs que `appsec_enabled` est défini sur `true`.

    b. Si `appsec_enabled` est défini sur `false`, cela signifie qu'ASM n'est pas correctement configuré. Consultez les [instructions d'installation][4].

    c. Si vos logs ne contiennent pas `appsec_enabled`, vous devez installer la dernière version d'ASM. Consultez les instructions d'[installation][4].

2. Vérifiez si le traceur fonctionne, et si le dashboard APM contient des traces pertinentes.

    La solution ASM repose sur le traceur. Ainsi, si aucune trace ne s'affiche, il est possible que le traceur ne fonctionne pas correctement. Consultez la section [Dépannage de l'APM][5].

3. Dans le répertoire de votre application, exécutez la commande `npm explore @datadog/native-appsec -- npm run install`, puis redémarrez votre application.

    a. Si `@datadog/native-appsec` est introuvable, l'installation n'a pas été correctement effectuée. Consultez les [instructions d'installation][4].

    b. Si `@datadog/native-appsec` est trouvable au lancement de votre application, ajoutez la commande au script de lancement de votre runtime.

    c. Si le traceur ne fonctionne toujours pas, il est possible que votre runtime ne soit pas pris en charge.

4. Pour activer les logs, ajoutez les variables d'environnement suivantes :

    ```
    DD_TRACE_DEBUG=1
    DD_TRACE_LOG_LEVEL=info
    ```

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: https://app.datadoghq.com/security/appsec/
[3]: /fr/tracing/troubleshooting/tracer_startup_logs/
[4]: /fr/security_platform/application_security/getting_started/nodejs/?tab=dockercli
[5]: /fr/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Si ASM n'affiche aucune information sur les menaces dans le [Trace Explorer et le Signals Explorer][1] de votre application Python, vérifiez qu'ASM est en cours d'exécution et que votre traceur fonctionne.

1. Définissez le niveau de log de votre application sur `DEBUG` pour confirmer qu'ASM est en cours d'exécution :

   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

   Exécutez ensuite n'importe quel appel HTTP transmis à l'application. Les éléments suivants devraient s'afficher dans le log :

   ```
   DEBUG:ddtrace.appsec.processor:[DDAS-001-00] Executing AppSec In-App WAF with parameters:
   ```

   Si ce log est manquant, cela signifie qu'ASM n'est pas en cours d'exécution.

2. Vérifiez si le traceur fonctionne, et si le dashboard APM contient des traces pertinentes.

   La solution ASM repose sur le traceur. Si aucune trace ne s'affiche, il est possible que le traceur ne fonctionne pas correctement. Consultez la section [Dépannage de l'APM][2].


[1]: https://app.datadoghq.com/security/appsec/
[2]: /fr/tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Pour Ruby, si, après quelques minutes, ASM n'affiche aucune information sur les menaces dans le [Trace Explorer et le Signals Explorer][1], activez les diagnostics du traceur pour les [logs de debugging][2]. Exemple :

```ruby
Datadog.configure do |c|
  c.diagnostics.debug = true  # définir le niveau de log global sur debug
  c.appsec.waf_debug = true   # activer également le plus haut niveau de détail des logs liés à WAF
end
```

Les logs de debugging sont très détaillés, mais demeurent utiles. SI vous ouvrez un ticket auprès de l'[assistance Datadog][1], ajoutez les logs à votre demande.

#### Vérifier si ASM est activé

Si ASM a bien été activé, vous devriez trouver des entrées de log similaires à celles-ci :

```
D, [2021-12-14T11:03:32.167125 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_info, :func=> "ddwaf_set_log_cb", :file=>"PowerWAFInterface.cpp", :message=>"Sending log messages to binding, min level trace"}
D, [2021-12-14T11:03:32.200491 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_debug, :func= >"parse", :file=>"parser_v2.cpp", :message=>"Loaded 124 rules out of 124 available in the ruleset"}
```

Si ce n'est pas le cas, procédez aux vérifications suivantes :

- Assurez-vous que les bonnes variables d'environnement ASM sont définies pour le processus de votre application.
- Vérifiez que la dernière version du gem est installée.
- Assurez-vous que le traceur est configuré correctement et qu'il envoie des traces APM à votre dashboard APM.

#### Vérifier si ASM est appelé lors de chaque requête HTTP

Pour vérifier si ASM est appelé lors de chaque requête HTTP, déclenchez une [attaque fictive](#envoyer-une-attaque-fictive-a-votre-application) et cherchez les logs suivants :

```
D, [2022-01-19T21:25:50.579745 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/reactive/operation.rb:14:in `initialize') operation: rack.request initialize
D, [2022-01-19T21:25:50.580300 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:25:in `block (2 levels) in watch') root span: 964736568335365930
D, [2022-01-19T21:25:50.580371 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:26:in `block (2 levels) in watch') active span: 964736568335365930
D, [2022-01-19T21:25:50.581061 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/reactive/request.rb:34:in `block in subscribe') reacted to ["request.headers", "request.uri.raw", "request.query", "request.cookies", "request.body.raw"]: [{"version"=>"HTTP/1.1", "host"=>"127.0.0.1:9292", "accept"=>"*/*", "user-agent"=>"Nessus SOAP"}, "http://127.0.0.1:9292/", [], {}, ""]
```

Si vous ne trouvez pas ces logs, suivez les étapes ci-dessous :

- Vérifiez qu'un autre système de sécurité en amont ne filtre pas les requêtes en fonction de la valeur de l'en-tête de l'attaque fictive. Cela pourrait empêcher la transmission de la requête à l'application.
- Envoyez une autre [attaque fictive](#envoyer-une-attaque-fictive-a-votre-application) à l'aide d'une autre valeur user-agent dans la commande curl. Vous pourrez ainsi vérifier si les informations sur les menaces sont transmises avec cette configuration.
- Recherchez dans les logs d'application la requête précise que vous avez exécutée afin de confirmer qu'elle a bien été transmise à l'application et qu'aucun autre système en amont n'y a répondu.

Si l'intégration Rack a été configurée manuellement, il est possible qu'un problème connu empêche le bon fonctionnement d'ASM. Exemple :

```ruby
Datadog.configure do |c|
  c.tracing.instrument :rails
  ...
  c.tracing.instrument :rack, web_service_name: "something", request_queuing: true
```

Supprimez `c.tracing.instrument :rack`, le cas échéant, pour garantir la transmission du check.

#### Vérifier si ASM détecte les menaces de sécurité relatives aux requêtes HTTP

Pour vérifier si ASM détecte les menaces de sécurité, déclenchez une [attaque fictive](#envoyer-une-attaque-fictive-a-votre-application) et cherchez les logs suivants :

```
D, [2021-12-14T22:39:53.268820 #106051] DEBUG -- ddtrace: [ddtrace] (ddtrace/lib/datadog/appsec/contrib/rack/reactive/request.rb:63:in `block in subscribe') WAF: #<struct Datadog::AppSec::WAF::Result action=:monitor, data=[{"rule"=>{"id"=>"ua0-600-10x", "name"=>"Nessus", "tags"=>{"type"=>"security_scanner", "category"=>"attack_attempt"}}, "rule_matches"=>[{"operator"=>"match_regex", "operator_value"=>"(?i)^Nessus(/|([ :]+SOAP))", "parameters"=>[{"address"=>"server.request.headers.no_cookies", "key_path"=>["user-agent"], "value"=>"Nessus SOAP", "highlight"=>["Nessus SOAP"]}]}]}], perf_data=nil, perf_total_runtime=20519>
```
Si vous ne voyez pas ces logs, vérifiez qu'un autre système de sécurité en amont ne filtre pas les requêtes ou ne les modifie pas en fonction de la valeur de l'en-tête de l'attaque fictive.

#### Vérifier si le traceur envoie des traces contenant des données de sécurité
Les données ASM sont envoyées au sein de traces APM. Pour vérifier si ASM détecte et insère correctement des données de sécurité dans les traces, déclenchez une [attaque fictive](#envoyer-une-attaque-fictive-a-votre-application) et cherchez les logs du traceur suivants :

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

Patientez une minute le temps que l'Agent transmette les traces, puis vérifiez si elles s'affichent dans le dashboard APM. Le traitement des informations de sécurité dans les traces par Datadog peut nécessiter un peu plus de temps que d'habitude. Vous devrez donc peut-être attendre un peu avant que ces informations ne s'affichent dans le [Trace Explorer et le Signals Explorer][1] ASM sous la forme de requêtes suspicieuses.

[1]: https://app.datadoghq.com/security/appsec/
[2]: /fr/tracing/troubleshooting/#tracer-debug-logs
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

Si vous rencontrez toujours des problèmes avec ASM, contactez l'[assistance Datadog][1] en prenant soin de fournir ce qui suit :

- La confirmation que vous avez bien envoyé une [attaque fictive](#envoyer-une-attaque-fictive-a-votre-application)
- Les logs de [lancement][8] ou de [debugging][10] du traceur

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: https://app.datadoghq.com/security/appsec/
[3]: https://app.datadoghq.com/security/appsec?instructions=all
[4]: /fr/tracing/troubleshooting/
[5]: /fr/tracing/troubleshooting/#confirm-apm-setup-and-agent-status
[6]: /fr/tracing/troubleshooting/connection_errors/
[7]: /fr/security_platform/default_rules/security-scan-detected/
[8]: /fr/tracing/troubleshooting/tracer_startup_logs/
[9]: /fr/tracing/glossary/#spans
[10]: /fr/tracing/troubleshooting/#tracer-debug-logs
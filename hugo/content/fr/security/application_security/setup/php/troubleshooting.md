---
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentation
  text: Fonctionnement de la protection des applications et des API
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: Règles de protection des applications et des API prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage de la protection des applications et des API
title: Dépannage de la protection des applications et des API PHP
---
## Présentation {#overview}

Ce document fournit des informations de diagnostic pour les problèmes courants et les comportements inattendus avec Datadog App and API Protection. Si vous continuez à rencontrer des difficultés, contactez le [support Datadog][1] pour obtenir de l'aide.

## Limites de débit AAP {#aap-rate-limits}

Les traces AAP sont limitées à 100 traces par seconde. Les traces envoyées après la limite ne sont pas rapportées. Contactez le [support Datadog][1] si vous devez modifier la limite.

## Aucune trace de sécurité détectée par AAP {#no-security-traces-detected-by-aap}

Il existe une série d'étapes qui doivent s'exécuter avec succès pour que les informations sur les menaces apparaissent dans le [Trace and Signals Explorer][2] d'AAP. Il est important de vérifier chaque étape lors de l'examen de ce problème.

### Confirmez qu'AAP est activé {#confirm-aap-is-enabled}

Vous pouvez utiliser la métrique `datadog.apm.appsec_host` pour vérifier si AAP est en cours d'exécution.

1. Allez dans **Metrics > Summary** dans Datadog.
2. Recherchez la métrique `datadog.apm.appsec_host`. Si la métrique n'existe pas, alors aucun service n'exécute AAP. Si la métrique existe, les services sont signalés avec les tags de métrique `host` et `service`.
3. Sélectionnez la métrique, et dans la section **Tags**, recherchez `service` pour voir quels services exécutent AAP.

Si vous ne voyez pas `datadog.apm.appsec_host`, vérifiez les [instructions dans l'application][3] pour confirmer que toutes les étapes de la configuration initiale sont terminées.

Les données AAP sont envoyées avec les traces APM. Consultez le [dépannage APM][4] pour [confirmer la configuration APM][5] et vérifier les [erreurs de connexion][6].

### Envoyez une attaque de test à votre application {#send-a-test-attack-to-your-application}

 Pour tester votre configuration AAP, déclenchez la règle [Security Scanner Detected][7] en exécutant un fichier contenant le script curl suivant :

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

Quelques minutes après avoir activé votre application et exécuté un exercice réussi sur celle-ci, les informations sur les menaces apparaissent dans le [Trace and Signals Explorer][2].

{{< img src="/security/security_monitoring/explorer/signal_panel_v2.png" alt="Page de détails des signaux de sécurité affichant les tags, les métriques, les prochaines étapes suggérées et les adresses IP des attaquants associées à une menace." style="width:100%;" >}}

### Vérifiez si les intégrations de traceur requises sont désactivées {#check-if-required-tracer-integrations-are-deactivated}

AAP repose sur certaines intégrations de traceur. Si elles sont désactivées, AAP ne fonctionnera pas. Pour voir s'il existe des intégrations désactivées, recherchez `disabled_integrations` dans vos [logs de démarrage][8].

Les intégrations requises varient selon le langage.

Il n'y a aucune intégration requise pour PHP.

### Vérifiez la configuration du Datadog Agent {#check-datadog-agent-configuration}

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

Vous trouverez ci-dessous des étapes de dépannage supplémentaires pour PHP.

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

### Confirmez que les versions du traceur sont mises à jour {#confirm-tracer-versions-are-updated}

Consultez la documentation de configuration de Datadog App and API Protection pour vérifier que vous utilisez la bonne version du traceur. Ces versions minimales sont requises pour commencer à envoyer des données de télémétrie incluant des informations sur la bibliothèque.

### Assurez la communication des données de télémétrie {#ensure-the-communication-of-telemetry-data}

Assurez-vous que la variable d'environnement `DD_INSTRUMENTATION_TELEMETRY_ENABLED` (`DD_TRACE_TELEMETRY_ENABLED` pour Node.js) est définie sur `true`, ou que la propriété système correspondante pour votre langage est activée. Par exemple en Java : `-Ddd.instrumentation.telemetry.enabled=true`

## Désactivation d'AAP {#disabling-aap}

Pour désactiver AAP, utilisez l'une des méthodes suivantes.

### DD_APPSEC_ENABLED {#dd-appsec-enabled}

Si la variable d'environnement `DD_APPSEC_ENABLED=true` est définie pour votre service, supprimez la variable d'environnement `DD_APPSEC_ENABLED=true` de la configuration de votre application et redémarrez votre service.

Si votre service est un service PHP, définissez explicitement la variable d'environnement sur `DD_APPSEC_ENABLED=false` et, le cas échéant, commentez l'indicateur `datadog.appsec.enabled = On` dans votre fichier de configuration `php.ini`. Ensuite, redémarrez votre service. 

### Remote Configuration {#remote-configuration}

Si AAP a été activé à l'aide de [Remote Configuration][16], procédez comme suit : 
  1. Accédez à [{{< ui >}}Services{{< /ui >}}][15].
  2. Sélectionnez {{< ui >}}App & API Protection in Monitoring Mode{{< /ui >}}.
  3. Dans la facette {{< ui >}}App & API Protection{{< /ui >}}, activez {{< ui >}}Monitoring Only{{< /ui >}}, {{< ui >}}No data{{< /ui >}} et {{< ui >}}Ready to block{{< /ui >}}.
  4. Cliquez sur un service.
  5. Dans {{< ui >}}Capabilities{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Threat Detection{{< /ui >}}, cliquez sur {{< ui >}}Deactivate{{< /ui >}}.

<div class="alert alert-info">Si AAP a été activé à l'aide de <a href="https://app.datadoghq.com/organization-settings/remote-config">Remote Configuration</a>, vous pouvez utiliser un bouton <strong>Deactivate</strong>. Si AAP a été activé à l'aide de la configuration locale, le bouton <strong>Deactivate</strong> n'est pas une option.</div>

### Désactivation en masse {#bulk-disable}

Pour désactiver AAP sur vos services en masse, procédez comme suit : 
  1. Accédez à [{{< ui >}}Services{{< /ui >}}][15].
  2. Dans la facette {{< ui >}}App & API Protection{{< /ui >}}, activez {{< ui >}}Monitoring Only{{< /ui >}}, {{< ui >}}No data{{< /ui >}} et {{< ui >}}Ready to block{{< /ui >}}.
  3. Cochez les cases correspondant aux services pour lesquels vous souhaitez désactiver la détection des menaces.
  4. Dans {{< ui >}}Bulk Actions{{< /ui >}}, sélectionnez {{< ui >}}Deactivate threat detection on (number of) services{{< /ui >}}.



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
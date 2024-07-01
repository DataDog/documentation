---
aliases:
- /fr/tracing/faq/why-am-i-getting-errno-111-connection-refused-errors-in-my-application-logs/
title: Erreurs de connexion APM
---

Si l'application utilisant la bibliothèque de tracing ne parvient pas à communiquer avec l'Agent Datadog, consultez les [logs de lancement du traceur][1] ou les [logs de debugging du traceur][2], qui se trouvent dans les logs de votre application, pour vérifier s'ils comportent des erreurs de connexion. 

## Erreurs indiquant un problème de connexion APM

Si les messages ci-dessous figurent dans vos logs, cela signifie que vos traces ne sont pas transmises à l'Agent Datadog.

### Erreurs de la bibliothèque de tracing

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}

{{< programming-lang lang="java" >}}
#### CLI de diagnostic Java

Depuis la version 0.82.0 du traceur Java, vous pouvez utiliser une commande de diagnostic à l'emplacement où le traceur Java est installé afin de détecter de potentiels problèmes de connexion. Depuis l'emplacement où `dd-java-agent.jar` est installé (dans le conteneur de l'application), exécutez ce qui suit :

```bash
java -jar /chemin/vers/dd-java-agent.jar sampleTrace -c 1
```

Exemple de sortie :

```text
[dd.trace 2021-08-24 18:38:01:501 +0000] [dd-task-scheduler] INFO datadog.trace.agent.core.StatusLogger - DATADOG TRACER CONFIGURATION {"version":"0.83.2~6bb3e09b2a","os_name":"Linux","os_version":"5.10.25-linuxkit","architecture":"amd64","lang":"jvm","lang_version":"1.8.0_232","jvm_vendor":"Oracle Corporation","jvm_version":"25.232-b09","java_class_version":"52.0","http_nonProxyHosts":"null","http_proxyHost":"null","enabled":true,"service":"dd-java-agent","agent_url":"http://localhost:8126","agent_error":true,"debug":false,"analytics_enabled":false,"sampling_rules":[{},{}],"priority_sampling_enabled":true,"logs_correlation_enabled":true,"profiling_enabled":false,"dd_version":"0.83.2~6bb3e09b2a","health_checks_enabled":true,"configuration_file":"no config file present","runtime_id":"<ID>","logging_settings":{"levelInBrackets":false,"dateTimeFormat":"'[dd.trace 'yyyy-MM-dd HH:mm:ss:SSS Z']'","logFile":"System.err","configurationFile":"simplelogger.properties","showShortLogName":false,"showDateTime":true,"showLogName":true,"showThreadName":true,"defaultLogLevel":"INFO","warnLevelString":"WARN","embedException":false}}
[dd.trace 2021-08-24 18:38:02:164 +0000] [dd-trace-processor] WARN datadog.trace.agent.common.writer.ddagent.DDAgentApi - Error while sending 1 (size=316B) traces to the DD agent. Total: 1, Received: 1, Sent: 0, Failed: 1. java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126 (Will not log errors for 5 minutes)
```


#### Logs de lancement du traceur

```text
[dd.trace 2021-08-17 17:59:29:234 +0000] [dd-trace-processor] WARN datadog.trace.agent.common.writer.ddagent.DDAgentApi - Error while sending 9 (size=5KB) traces to the DD agent. Total: 9, Received: 9, Sent: 0, Failed: 9. java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126 (Will not log errors for 5 minutes)
```

#### Logs de debugging du traceur

```text
[dd.trace 2021-08-17 18:04:50:282 +0000] [dd-trace-processor] DEBUG datadog.communication.ddagent.DDAgentFeaturesDiscovery - Error querying info at http://localhost:8126/
java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126
    at okhttp3.internal.connection.RealConnection.connectSocket(RealConnection.java:249)
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

#### Logs de lancement du traceur

```text
2021-08-17 19:10:06,169 WARNING [ddtrace.tracer] [tracer.py:655] [dd.service= dd.env= dd.version= dd.trace_id=0 dd.span_id=0] - - DATADOG TRACER DIAGNOSTIC - Agent not reachable at http://localhost:8126. Exception raised: [Errno 99] Cannot assign requested address
```

#### Logs de debugging du traceur

```text
2021-08-17 14:04:12,982 ERROR [ddtrace.internal.writer] [writer.py:466] [dd.service= dd.env= dd.version= dd.trace_id=0 dd.span_id=0] - failed to send traces to Datadog Agent at http://localhost:8126
Traceback (most recent call last):

```


{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

#### Logs de lancement du traceur

```text
W, [2021-08-17T18:37:51.542245 #24]  WARN -- ddtrace: [ddtrace] DATADOG TRACER DIAGNOSTIC - Agent Error: Datadog::Transport::InternalErrorResponse ok?: unsupported?:, not_found?:, client_error?:, server_error?:, internal_error?:true, payload:, error_type:Errno::ECONNREFUSED error:Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126)
```

#### Logs de debugging du traceur

```text
D, [2021-08-17T18:51:28.962389 #24] DEBUG -- ddtrace: [ddtrace] (/usr/local/bundle/gems/ddtrace-0.48.0/lib/ddtrace/transport/http/client.rb:33:in `rescue in send_request') Internal error during HTTP transport request. Cause: Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126) Location: /usr/local/lib/ruby/2.5.0/net/http.rb:939:in `rescue in block in connect'
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

#### Logs de lancement du traceur

```text
2021/08/17 17:46:22 Datadog Tracer v1.32.0 WARN: DIAGNOSTICS Unable to reach agent intake: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused
```

#### Logs de debugging du traceur

```text
2021/08/17 17:47:42 Datadog Tracer v1.32.0 ERROR: lost 1 traces: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused (occurred: 17 Aug 21 17:46 UTC)
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

#### Logs de lancement du traceur

```text
DATADOG TRACER DIAGNOSTIC - Agent Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
```

#### Logs de debugging du traceur

```text
Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
    at ClientRequest.<anonymous> (/home/node-web-app/node_modules/dd-trace/packages/dd-trace/src/platform/node/request.js:51:33)
```

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

#### Logs gérés

Les logs gérés contiennent des erreurs relatives aux refus de connexion, même si le mode debugging n'est pas activé :

```
{ MachineName: ".", Process: "[114 sample-web-app]", AppDomain: "[1 sample-web-app]", TracerVersion: "1.28.2.0" }
2021-08-17 18:19:46.827 +00:00 [ERR] An error occurred while sending 1 traces to the agent at http://127.0.0.1:8126/v0.4/traces
System.Net.Http.HttpRequestException: Connection refused
 ---> System.Net.Sockets.SocketException (111): Connection refused
   at System.Net.Http.ConnectHelper.ConnectAsync(String host, Int32 port, CancellationToken cancellationToken)
   --- End of inner exception stack trace ---

```

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

#### Logs de lancement du traceur

```
Failed to connect to localhost port 8126: Connection refused
```

{{< /programming-lang >}}

{{< programming-lang lang="cpp" >}}

#### Logs d'application

Lorsque l'application ne parvient pas à communiquer avec l'Agent Datadog, des messages de log sont enregistrés à l'emplacement où votre application envoie ses logs :

```
Error sending traces to agent: Couldn't connect to server
Failed to connect to localhost port 8126: Connection refused
```


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Erreurs de l'Agent Datadog

Si la commande [`agent status`][3] (disponible avec l'Agent 6.20.0/7.20.0) indique que l'APM n'est pas en cours d'exécution ou n'est pas accessible sur `localhost:8126`, cela signifie que l'APM n'est pas configurée pour l'Agent Datadog et que les traces ne peuvent pas être envoyées au backend de Datadog.

```text
APM Agent
=========
  Status: Not running or unreachable on localhost:8126.
```

## Diagnostiquer le problème de connexion
Que votre erreur provienne de la bibliothèque de tracing ou de l'Agent Datadog, il existe plusieurs méthodes pour diagnostiquer le problème.

### Configurations basées sur des hosts

Si votre application et l'Agent Datadog ne sont pas conteneurisés, l'application utilisant la bibliothèque de tracing doit essayer d'envoyer des traces à `localhost:8126` ou `127.0.0.1:8126`, où l'Agent Datadog effectue son écoute.

Si l'Agent Datadog indique que l'APM n'effectue pas d'écoute, vérifiez qu'il n'y a aucun conflit pour le port 8126. Le composant APM de l'Agent Datadog utilise ce port par défaut.

Si vous ne parvenez pas à isoler la cause à l'origine de votre problème, [contactez l'assistance Datadog][4] en prenant soin de partager :
- Les informations à propos de l'environnement au sein duquel vous déployez l'application et l'Agent Datadog
- Si vous utilisez des proxies, les informations à propos de leur configuration
- Si vous essayez de remplacer le port 8126 par défaut par un autre port, les informations à propos de ce port
- Un [flare de l'Agent Datadog][5]

### Configurations conteneurisées

#### Vérifier la configuration du réseau

Dans les configurations conteneurisées, l'envoi de traces à `localhost` ou `127.0.0.1` ne fonctionne généralement pas, car l'Agent Datadog est également conteneurisé et situé à un autre emplacement. **Remarque** : AWS ECS sur Fargate et AWS EKS sur Fargate constituent des exceptions à cette règle.

Assurez-vous que le processus de connexion entre l'application et l'Agent Datadog respecte les exigences de cette configuration.

Vérifiez notamment que l'Agent Datadog a accès au port `8126` et que votre application peut transmettre des traces à l'emplacement de l'Agent Datadog.

Consultez la [documentation relative à la configuration de l'APM dans l'application][6] pour procéder à ces vérifications.

#### Identifier à quel emplacement votre bibliothèque de tracing essaye d'envoyer des traces

À l'aide des logs d'erreur indiqués ci-dessus pour chaque langue, vérifiez à quel emplacement vos traces sont envoyées.

Consultez le tableau ci-dessous pour obtenir des exemples de configuration. Certains déploiements requièrent des configurations réseau supplémentaires. Elles sont décrites dans la documentation des produits.

| Configuration   | `DD_AGENT_HOST`  |
|---------|------------------|
| [AWS ECS sur EC2][7] | Évaluation avec l'endpoint de métadonnées d'Amazon EC2 |
| [AWS ECS sur Fargate][8] | Ne pas définir `DD_AGENT_HOST` |
| [AWS EKS sur Fargate][9] | Ne pas définir `DD_AGENT_HOST` |
| [AWS Elastic Beanstalk avec un seul conteneur][10] | IP de passerelle (généralement `172.17.0.1`) |
| [AWS Elastic Beanstalk avec plusieurs conteneurs][11] | Lien pointant vers le nom du conteneur de l'Agent Datadog |
| [Kubernetes][12] | 1) [Socket de domaine Unix][20], 2) [`status.hostIP`][13] ajouté manuellement ou 3) par l'intermédiaire du [contrôleur d'admission][14] |
| [AWS EKS (pas sur Fargate)][15] | 1) [Socket de domaine Unix][20], 2) [`status.hostIP`][13] ajouté manuellement ou 3) par l'intermédiaire du [contrôleur d'admission][14] |
| [Agent Datadog et conteneurs Docker d'application][16] | Conteneur de l'Agent Datadog |


**Remarque à propos des serveurs Web** : si les données de la section `agent_url` des [logs de lancement du traceur][1] ne correspondent pas à celles de la variable d'environnement `DD_AGENT_HOST` transmise, vérifiez comment les variables d'environnement sont mises en cascade pour ce serveur. Par exemple, en PHP, il existe un paramètre supplémentaire permettant de veiller à ce qu'[Apache][17] ou que [Nginx][18] récupère correctement la variable d'environnement `DD_AGENT_HOST`.

Si votre bibliothèque de tracing envoie les traces correctement en respectant votre configuration, passez à l'étape suivante.

#### Vérifier la configuration et le statut de l'Agent Datadog

Si votre configuration n'implique pas Fargate, vous pouvez `exec` dans le conteneur de l'Agent Datadog et exécuter la commande de statut de l'Agent, à savoir `agent status`.

**Remarque** : si vous utilisez Kubernetes avec des conteneurs dédiés, utilisez plutôt la commande `exec` dans le conteneur dédié à l'Agent de trace.

Accédez à la section de l'Agent APM pour confirmer qu'il est en cours d'exécution :

```text
=========
APM Agent
=========
  Status: Running
  Pid: <numéro_pid>
  Uptime: <nombre_entier> seconds
  Mem alloc: <nombre_entier> bytes
  Hostname: <nom_conteneur_agent_datadog>
  Receiver: 0.0.0.0:8126
  Endpoints:
    https://trace.agent.datadoghq.com

  Receiver (previous minute)
  ==========================
    No traces received in the previous minute.
    Default priority sampling rate: 100.0%
```

Si la configuration ne contient pas d'erreur, mais que vous continuez à recevoir des erreurs de connexion, [contactez l'assistance Datadog][4] en prenant soin de partager :
- Les informations à propos de l'environnement au sein duquel vous déployez l'application et l'Agent Datadog
- Si vous utilisez des proxies, les informations à propos de leur configuration
- Tous les fichiers de configuration utilisés pour configurer l'application et l'Agent Datadog
- Les logs de lancement ou de debugging du traceur qui décrivent l'erreur de connexion
- Un [flare de l'Agent][5] Datadog ; pour les conteneurs dédiés, envoyez le flare depuis le [conteneur dédié à l'Agent de trace][19]


[1]: /fr/tracing/troubleshooting/tracer_startup_logs/
[2]: /fr/tracing/troubleshooting/tracer_debug_logs/
[3]: /fr/agent/guide/agent-commands/#agent-information
[4]: /fr/help/
[5]: /fr/agent/troubleshooting/send_a_flare/
[6]: https://app.datadoghq.com/apm/service-setup
[7]: /fr/agent/amazon_ecs/apm/?tab=ec2metadataendpoint
[8]: /fr/integrations/ecs_fargate/#trace-collection
[9]: /fr/integrations/eks_fargate/#traces-collection
[10]: /fr/integrations/amazon_elasticbeanstalk/?tab=singlecontainer#trace-collection
[11]: /fr/integrations/amazon_elasticbeanstalk/?tab=multiplecontainers#trace-collection
[12]: /fr/agent/kubernetes/apm/
[13]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[14]: /fr/agent/cluster_agent/admission_controller/
[15]: /fr/integrations/amazon_eks/#setup
[16]: /fr/agent/docker/apm/#tracing-from-other-containers
[17]: /fr/tracing/setup_overview/setup/php/?tab=containers#apache
[18]: /fr/tracing/setup_overview/setup/php/?tab=containers#nginx
[19]: /fr/agent/troubleshooting/send_a_flare/?tab=agentv6v7#trace-agent
[20]: /fr/containers/kubernetes/apm/?tabs=daemonsetuds#configure-the-datadog-agent-to-accept-traces

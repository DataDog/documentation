---
aliases:
- /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting/
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
  tag: Documentation
  text: Instrumentation APM en une étape
- link: https://learn.datadoghq.com/courses/troubleshooting-apm-instrumentation-on-a-host
  tag: Centre d'apprentissage
  text: Dépannage de l'instrumentation APM sur un host
title: Dépannage de l'instrumentation APM en une étape
---
## Présentation {#overview}

Single Step Instrumentation (SSI) aide à instrumenter les applications en chargeant automatiquement les SDK Datadog dans les processus d'application. SSI fonctionne pour les applications exécutées sur des hosts Linux, dans des environnements de conteneurs tels que Kubernetes et Docker, et pour les applications .NET servies par Windows IIS, sans nécessiter de modifications des dépendances ou des images de l'application. Si vous rencontrez des problèmes lors de l'activation d'APM avec SSI, utilisez ce guide pour diagnostiquer et résoudre les problèmes courants. Pour obtenir de l'aide, contactez [Datadog Support][1].

## Méthodes de dépannage {#troubleshooting-methods}

Vous pouvez examiner les problèmes d'injection dans l'interface utilisateur Datadog avec Fleet Automation, ou manuellement au niveau du conteneur. Pour une vue plus détaillée de ce que l'injecteur a décidé pour chaque processus, consultez les [logs de débogage de l'injecteur](#injector-debug-logs).

### Dépannez l'injection dans Datadog Fleet Automation {#troubleshoot-injection-in-datadog-fleet-automation}


Fleet Automation fournit deux types d'informations d'instrumentation pour SSI :
Les - **informations au niveau du processus** indiquent le statut de l'instrumentation et les détails de l'installation du SDK pour des hosts ou des conteneurs individuels.
Les - **informations sur les clusters Kubernetes** offrent une vue d'ensemble de l'instrumentation sur vos clusters, vous aidant à comprendre comment la configuration et l'injection SSI sont appliquées à grande échelle.

Ensemble, ces vues vous permettent de diagnostiquer les problèmes d'injection du point de vue du processus et du cluster.

#### Prérequis {#prerequisites}

Cette fonctionnalité est disponible pour :

- **Langages** : Python, Java, Node.js, PHP, .NET
- **Environnements** : hosts Linux, conteneurs, Kubernetes
- Datadog Agent v7.68.2+

#### Affichez les informations au niveau du processus {#view-process-level-insights}

Utilisez les informations au niveau du processus pour vérifier si SSI a été correctement appliqué à vos processus d'application et pour identifier toute défaillance d'injection.

1. Accédez à [Fleet Automation][9].
1. Utilisez les facettes pour n'afficher que les hosts pertinents :
   - `single_step_instrumentation` indique sur quels hosts SSI est activé ou désactivé.
   - `single_step_instrumentation_status` indique quels hosts ont rencontré des problèmes avec l'instrumentation de service.
1. Sélectionnez un host pour ouvrir le panneau des détails de l'Agent.
1. Dans le panneau Agent, accédez à l'onglet {{< ui >}}Services{{< /ui >}}.
1. Si SSI est activé sur le host, l'onglet affiche :
   - Une bannière affichant le message : « Single Step Instrumentation is enabled on this host. »
   - Une section {{< ui >}}SDK Installations{{< /ui >}} s'il y a des problèmes à résoudre.

#### Affichez les informations sur les clusters Kubernetes {#view-kubernetes-cluster-insights}

Utilisez les informations au niveau du cluster pour comprendre comment SSI est configuré et fonctionne dans vos clusters Kubernetes. Ces informations étendent le dépannage au-delà des processus individuels pour montrer comment l'instrumentation est appliquée aux charges de travail au niveau du cluster.

1. Accédez à [{{< ui >}}Fleet Automation{{< /ui >}}][9] > {{< ui >}}View Agents{{< /ui >}}, et sélectionnez {{< ui >}}Kubernetes Clusters{{< /ui >}} dans le coin supérieur droit.
1. Sélectionnez un cluster pour afficher ses détails, notamment :
   - Si le cluster est géré par Helm ou par Datadog Operator
   - Les versions du Cluster Agent et du Node Agent
   - Les intégrations et services s'exécutant sur chaque host
1. Ouvrez l'onglet {{< ui >}}Single Step Instrumentation{{< /ui >}} pour examiner :
   - La configuration SSI du cluster (vue YAML)
   - Les pods identifiés comme cibles d'instrumentation en fonction de la configuration du cluster ou des annotations au niveau du pod
   - Le statut de chaque pod ciblé, y compris si l'instrumentation a réussi
   - Les SDK injectés dans chaque pod, y compris le langage et la version
   - Si chaque charge de travail instrumentée génère des traces 
1. Survolez n'importe quelle icône d'état pour voir des détails contextuels sur l'état de l'instrumentation ou de la collecte de traces. 

{{< img src="tracing/trace_collection/k8s-ssi-tab.png" alt="L'onglet Single Step Instrumentation pour un cluster Kubernetes, affichant la configuration SSI au format YAML et une liste de pods instrumentés" style="width:100%;" >}}

### Vérifiez manuellement l'injection dans le conteneur d'application {#manually-verify-injection-in-the-application-container}

Si l'interface utilisateur Datadog n'affiche aucun problème d'instrumentation, ou si vous dépannez un seul service ou conteneur, vous pouvez vérifier manuellement si l'injection a eu lieu comme prévu. Cette méthode est utile lors du débogage dans des environnements où la visibilité centralisée est limitée ou lorsqu'un service spécifique ne transmet pas de traces.

Pour confirmer l'injection au niveau du conteneur, vérifiez que :

1. `/etc/ld.so.preload` inclut l'entrée suivante : 
   ```
   /opt/datadog-packages/datadog-apm-inject/stable/inject/launcher.preload.so
   ``` 
2. La variable d'environnement `LD_PRELOAD` est définie sur la même valeur.
3. Le répertoire `/opt/datadog-packages/datadog-apm-inject` existe, avec les sous-répertoires `stable` et `$version`.
4. Des répertoires spécifiques au langage existent (par exemple, `/opt/datadog/apm/library/java/` pour Java).

Pour activer les logs de débogage lors de la vérification manuelle :

1. Définissez ce qui suit dans la spécification de votre pod :
 
   {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
   env:
     - name: DD_TRACE_DEBUG    # debug logging for the SDK
       value: "true"
     - name: DD_APM_INSTRUMENTATION_DEBUG    # debug logging for the injector
       value: "true"
   {{< /code-block >}}
   
2. Supprimez le pod pour activer les logs de débogage pendant l'injection.


## Logs de débogage de l'injecteur {#injector-debug-logs}

Les logs de débogage de l'injecteur indiquent ce que l'injecteur a décidé pour chaque processus : si l'injection a réussi, a été refusée ou n'a pas été effectuée, et pourquoi. Activez-les lorsque [Fleet Automation](#troubleshoot-injection-in-datadog-fleet-automation) n'explique pas un échec, lorsque vous effectuez un diagnostic au niveau du host ou du conteneur, ou lorsque vous collectez des informations pour [Datadog Support][1].

Les logs de débogage de l'injecteur sont distincts des logs de débogage du traceur. Utilisez les logs de l'injecteur pour diagnostiquer si et comment un traceur a été injecté ; après l'injection, utilisez les [logs de débogage du traceur][13] pour diagnostiquer le traceur en cours d'exécution dans le processus.

### Activez le mode débogage {#enable-debug-mode}

Définissez la variable d'environnement suivante pour le processus que vous souhaitez instrumenter :

```
DD_APM_INSTRUMENTATION_DEBUG=true
```

Cela augmente le niveau de journalisation de l'injecteur à `DEBUG` et ajoute `stderr` comme récepteur de logs.

La variable doit être définie dans l'environnement dont hérite le processus injecté :

#### Host {#host}

Exportez la variable avant de démarrer le processus :

```sh
export DD_APM_INSTRUMENTATION_DEBUG=true
./my-service
```

#### Docker {#docker}

Ajoutez la variable d'environnement au conteneur de l'application :

```sh
docker run -e DD_APM_INSTRUMENTATION_DEBUG=true my-image
```

La sortie de débogage apparaît dans les logs du conteneur (`docker logs <container>`).

#### Kubernetes {#kubernetes}

Ajoutez la variable à la spécification du conteneur dans votre modèle de pod :

{{< code-block lang="yaml" disable_copy="true" >}}
spec:
  containers:
    - name: my-app
      env:
        - name: DD_APM_INSTRUMENTATION_DEBUG
          value: "true"
{{< /code-block >}}

Vous pouvez aussi ajouter l'annotation de pod suivante pour activer le mode débogage sans modifier la spécification du conteneur :

{{< code-block lang="yaml" disable_copy="true" >}}
metadata:
  annotations:
    admission.datadoghq.com/apm-inject.debug: "true"
{{< /code-block >}}

La sortie de débogage apparaît dans les logs du pod de l'application (`kubectl logs <pod>`).

### Examinez les logs de débogage {#review-debug-logs}

#### Où trouver les logs {#where-to-find-the-logs}

Lorsque le mode débogage est activé, l'injecteur écrit sur `stderr` du processus instrumenté :

| Environnement | Où chercher |
| --- | --- |
| Host ou shell | Le terminal du processus, ou l'emplacement vers lequel `stderr` est redirigé |
| Docker | `docker logs <container>` |
| Kubernetes | `kubectl logs <pod>` (le pod de l'application, pas le Cluster Agent) |

**Remarque** : pour envoyer la sortie de débogage vers un fichier au lieu de `stderr`, définissez `DD_APM_INSTRUMENTATION_OUTPUT_PATHS` sur un chemin absolu.

#### Injection réussie {#successful-injection}

Pour confirmer que l'injection a eu lieu, recherchez le bloc de log dont l'exécutable correspond à votre environnement d'exécution. L'exemple suivant montre une injection Node.js réussie :

```
<DEBUG> ... [linux/process.c:405] process_exe: 'node'
<DEBUG> ... [linux/process.c:443] Main executable path: '/usr/local/bin/node'
<DEBUG> ... [workload_selection.c:147] Workload selection allowed injection: continuing
<DEBUG> ... [workload_selection.c:90] Succesfully loaded policy: 'requirements.bin from SDK policies' from '/opt/datadog-packages/datadog-apm-inject/0.67.0/requirements/nodejs/requirements.bin' [size: 3864]
<DEBUG> ... [languages.c:71] detected language: 'nodejs'
<DEBUG> ... [languages.c:72] detected language version: '20.20.2'
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_TELEMETRY_FORWARDER_PATH=/opt/datadog-packages/datadog-apm-inject/0.67.0/inject/process
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_TAGS=_dd.injection.mode:k8s
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_INJECTION_ENABLED=tracer
<DEBUG> ... [linux/env_injector.c:38] injection config: NODE_OPTIONS=--require /opt/datadog/apm/library/js/node_modules/dd-trace/init.js
<INFO>  ... [./libinject.c:81] injection duration: 1.066500 ms
<DEBUG> ... [injection_metadata.c:101] sending injection-metadata telemetry: result='0', result_reason='injection completed successfully'
<DEBUG> ... [./libinject.c:231] injector finished
```

| Ligne de log | Signification |
| --- | --- |
| `process_exe: '<exe>'` / `Main executable path: '<path>'` | Le processus en cours d'évaluation. |
| `Workload selection allowed injection: continuing` | La politique a autorisé l'injection. |
| `Succesfully loaded policy: 'requirements.bin...'` | La politique relative aux exigences du langage pour l'environnement d'exécution détecté a été chargée. |
| `detected language: '<lang>'` / `detected language version: '<version>'` | L'environnement d'exécution a été identifié (`nodejs`, `java`, `python`, `ruby`, `dotnet`, `php`) et sa version a été lue. |
| `injection config: <VAR>=<value>` | Chaque variable d'environnement définie par l'injecteur. La présence de `DD_INJECTION_ENABLED=tracer` et de la variable propre au langage (par exemple, `NODE_OPTIONS` ou `JAVA_TOOL_OPTIONS`) confirme que le SDK de traçage a été chargé. |
| `injection duration: <N> ms` | Injection terminée et temps écoulé. |
| `injection completed successfully` (`result='0'`) | L'injecteur a signalé à la télémétrie que l'injection avait réussi. Un `result` non nul avec un `result_reason` différent indique un échec. |
| `injector finished` | Le constructeur de l'injecteur a terminé son exécution. |

#### Messages de log courants {#common-log-messages}

**Injection désactivée**

Si `DD_INSTRUMENT_SERVICE_WITH_APM=false` est défini ou si l'injection est désactivée d'une autre manière :

```
<DEBUG> ... [libinject.c:115] disabled flag set, not injecting
```

L'injecteur a été chargé, mais a volontairement ignoré l'injection. Supprimez `DD_INSTRUMENT_SERVICE_WITH_APM=false` ou définissez-le sur `true` pour autoriser l'injection.

**Aucun environnement d'exécution détecté**

Si le processus n'est pas un environnement d'exécution de langage pris en charge :

```
<DEBUG> ... [libinject.c:175] No known runtime was detected - not injecting!
```

L'injecteur a été exécuté, mais ce processus ne fait pas partie de ceux qu'il instrumente (`nodejs`, `java`, `python`, `ruby`, `dotnet`, `php`). Ce comportement est normal pour les processus non liés à des applications.

**Sélection de la charge de travail refusée**

```
<DEBUG> ... [workload_selection.c:149] Workload selection denied injection
```

Une règle a empêché l'injection pour ce processus. Les lignes `Evaluating '<policy-name>'` précédentes indiquent quelle règle s'est appliquée et quelles valeurs elle a comparées.

**Réexécution détectée**

```
<DEBUG> ... [libinject.c:102] Re-exec detected!
```

Le processus s'est réexécuté afin que les variables d'environnement injectées prennent effet. C'est un comportement attendu. L'injection se poursuit dans le processus réexécuté, qui produit son propre ensemble de lignes de débogage.

## Options de configuration affectant l'injection {#configuration-options-that-affect-injection}

Il existe plusieurs mécanismes de configuration susceptibles de bloquer ou de modifier le comportement d'injection.

### Exigences de stockage {#storage-requirements}

SSI télécharge des SDK propres aux langages et un package d'injection sur chaque host. La quantité d'espace disque requise dépend du nombre de langages utilisés et du nombre de pods instrumentés. Une estimation approximative est :

<div style="text-align:center;">
  <pre><code>[sum of the language library sizes]
+
[injector package size] * [number of injected pods per host]</code></pre>
</div>

Comme les packages de bibliothèque sont mis à jour fréquemment et peuvent augmenter lorsque la prise en charge de nouvelles versions de langage est ajoutée, l'utilisation du disque peut varier au fil du temps. Si votre environnement dispose d'un espace disque limité, surveillez la taille des packages et prévoyez une capacité supplémentaire pour éviter les échecs d'injection.

### Version de l'injecteur {#injector-version}

Pour définir la version de l'injecteur :
- Au niveau du cluster :
  
  Définissez la version dans `values.yaml` sous `datadog.apm.instrumentation.injector.imageTag`.

- Au niveau du pod :
 
  Définissez la version avec l'annotation `admission.datadoghq.com/apm-inject.version`.


Pour l'injection sur le host ou Docker, la modification de la version `auto_inject` n'est pas recommandée. 

### Listes d'autorisation et de refus {#allow-and-deny-lists}

#### Liste de refus par défaut {#default-deny-list}

Datadog maintient une liste de refus interne pour empêcher l'injection dans certains processus (par exemple, les IDE ou les bases de données). Si une commande de processus ou un point d'entrée figure sur cette liste, l'injecteur ne procède pas à l'injection.  

#### Règles d'instrumentation Linux {#linux-instrumentation-rules}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSdMu6WAsUCD3djkl_oN0Qh7fQmBCiKYyUvuqlYWRyObebAc6Q/viewform" header="Rejoignez la Preview !">}}
Les règles d'instrumentation sont disponibles pour les applications basées sur Linux via une préversion à disponibilité limitée. Pour configurer des règles d'autorisation ou de refus pour l'injection de processus, inscrivez-vous pour obtenir un accès à la préversion.
{{< /callout >}}

#### Règles d'instrumentation Kubernetes {#kubernetes-instrumentation-rules}

Les règles d'instrumentation permettent l'injection en fonction des labels et des sélecteurs Kubernetes. Règles à prendre en compte :

1. `disabledNamespaces` a toujours la priorité.
2. Lorsqu'un pod s'initialise, la liste des cibles est vérifiée de haut en bas. Seule la première règle correspondante s'applique par pod.

#### Conteneur d'injection signalé par les outils d'analyse de sécurité {#injection-container-flagged-by-security-scanners}

Les outils de sécurité peuvent signaler le conteneur `apm-inject` car il lance un exécutable au démarrage, un comportement pouvant s'apparenter à celui d'un logiciel malveillant. 

Le comportement du conteneur est attendu et sûr ; l'exécutable configure l'environnement pour l'auto-instrumentation.

Datadog respecte les bonnes pratiques de sécurité et collabore avec les fournisseurs de solutions de sécurité pour inscrire ce conteneur sur une liste d'autorisation.

### Environnements avec des paramètres stricts de sécurité des pods {#environments-with-strict-pod-security-settings}

Si les règles de sécurité des pods bloquent le conteneur d'initialisation Datadog, vous pouvez voir des erreurs comme :

```
Privilege escalation container is not allowed or violates PodSecurity "restricted: latest": allowPrivilegeEscalation is false
```

Pour résoudre ce problème, définissez l'une des options suivantes du Cluster Agent :
- `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_SECURITY_CONTEXT`
- `admission_controller.auto_instrumentation.init_security_context`

La valeur doit être une chaîne JSON qui applique le contexte de sécurité nécessaire aux conteneurs d'initialisation Datadog.  

### Instrumentation personnalisée {#custom-instrumentation}

L'instrumentation personnalisée nécessite toujours que vous importiez le SDK. Les variables de configuration comme `DD_TRACE_METHODS` de .NET restent disponibles pour définir des spans personnalisés.

## Dépannage général {#general-troubleshooting}

### SSI continue de s'exécuter après avoir défini DD_TRACE_ENABLED=false {#ssi-continues-running-after-setting-dd-trace-enabledfalse}

Définir `DD_TRACE_ENABLED=false` n'empêche pas SSI de charger le SDK. L'[injecteur][11] s'exécute avant que le SDK n'évalue ses variables d'environnement, donc les variables d'environnement au niveau du SDK n'ont aucun effet sur SSI. Pour désactiver ou supprimer SSI, consultez la [page de configuration SSI][12] de votre plateforme.

## Dépannage spécifique à l'environnement {#environment-specific-troubleshooting}

### Environnements de host et Docker {#host-and-docker-environments}

#### L'injection sur le host ne s'applique pas aux processus existants {#host-injection-does-not-apply-to-existing-processes}

La bibliothèque de préchargement n'effectue l'injection que dans les processus nouvellement lancés. Démarrez une nouvelle session shell ou déconnectez-vous puis reconnectez-vous pour appliquer l'instrumentation.

**Remarque :** L'injection basée sur Docker n'a pas cette limitation.

#### L'injection échoue sur les instances de petite taille {#injection-fails-on-small-instance-types}

La bibliothèque de préchargement accorde à l'analyseur une seconde pour terminer son travail. Sur les petites instances de VM exécutant plusieurs services (par exemple, `t2.micro`), cette limite de temps peut être dépassée. Pour surmonter ce problème, utilisez une taille d'instance plus grande, telle que `t2.small`.

#### Erreurs après la désinstallation manuelle des fichiers de l'agent {#errors-after-manual-uninstallation-of-agent-files}

Si vous supprimez manuellement les fichiers de l'agent, vous pouvez voir des erreurs telles que :

```
ERROR: ld.so: object /opt/datadog/apm/inject/launcher.preload.so from /etc/ld.so.preload cannot be preloaded (cannot open shared object file): ignored
```

Pour désinstaller correctement SSI, suivez les instructions spécifiques à la plateforme :

* [Kubernetes][1]
* [Docker][2]
* [Linux][3]
* [Windows][4]

#### L'injection ne fonctionne pas avec Docker rootless {#injection-not-working-with-rootless-docker}

Lorsque vous utilisez Docker rootless, définissez `docker_socket` dans `/etc/datadog-agent/inject/docker_config.yaml` sur le chemin du socket Docker utilisé par l'utilisateur actuel (généralement `/run/user/$UID/docker.sock`). Aucun redémarrage n'est requis.

#### L'injection échoue avec des lanceurs liés statiquement {#injection-fails-with-statically-linked-launchers}

Si un lanceur personnalisé est lié statiquement (ce qui est courant avec Go), la bibliothèque de préchargement peut ne pas être appelée. L'injection peut toujours réussir si :
- La ligne de commande du lanceur inclut le nom du langage
- Le lanceur exécute un programme intermédiaire lié dynamiquement

Cependant, les processus lancés directement à partir de binaires liés statiquement ne font pas l'objet d'une injection.

### Environnements Kubernetes {#kubernetes-environments}

Le Datadog Admission Controller doit être déployé et configuré avant la création des pods d'application ; il ne peut pas modifier les pods existants.

Pour résoudre les problèmes liés à Admission Controller :

1. Vérifiez l'état de santé du pod Cluster Agent :
   ```
   kubectl get pods
   kubectl get deployments
   ```
1. Recherchez dans les logs du leader du Cluster Agent les messages `INFO` indiquant que Admission Controller a bien démarré. Par exemple :

   ```
   Group version 'admissionregistration.k8s.io/v1' is available, Starting secrets controller, Starting webhook controller
   ```

1. Vérifiez le statut de Admission Controller en effectuant l'une des opérations suivantes :

   - Exécutez `agent status` dans le pod Cluster Agent pour obtenir l'état actuel.
   - En cas de dépannage rétrospectif, vérifiez `status.log` dans un flare. Lorsqu'un flare est généré, le système exécute `agent status` et stocke la sortie dans `status.log`.

   Dans les deux cas, recherchez les sections Admission Controller et Webhooks, et vérifiez les points suivants :
   - Toutes les ressources `MutatingWebhookConfiguration` attendues sont listées (pour l'auto-instrumentation, l'injection de configuration et l'injection de tags).
   - Les configurations de webhook font référence au Secret correct.
   - L'empreinte du CA bundle est identique dans toutes les configurations.

1. Inspectez les tentatives d'injection dans `telemetry.log` ou dans la sortie de la commande suivante :

   ```
   kubectl exec -it <cluster agent pod> agent telemetry
   ```

   Recherchez `admission_webhooks_library_injection_attempts` pour voir les tentatives d'injection par langage.

#### La configuration DatadogInstrumentation n'est pas appliquée {#datadoginstrumentation-configuration-is-not-applied}

Si vous utilisez une ressource `DatadogInstrumentation` pour activer SSI :

1. Confirmez que l'Agent et le Cluster Agent sont en version v7.85+ et que la CRD inclut `spec.config.apm`. Datadog Operator v1.31+ inclut le schéma APM :

   ```shell
   kubectl explain datadoginstrumentation.spec.config.apm
   ```

1. Inspectez les conditions de la ressource :

   ```shell
   kubectl describe datadoginstrumentation <RESOURCE_NAME> -n <WORKLOAD_NAMESPACE>
   ```

   Confirmez `APMReady=True` avec le motif `Configured`. Un motif `UnsupportedLanguage` ou `InvalidTracerConfig` indique que la configuration doit être corrigée. Les identifiants de langage du SDK doivent être pris en charge, et les noms `ddTraceConfigs` doivent commencer par `DD_`.

1. Confirmez que la ressource et la charge de travail se trouvent dans le même espace de noms et que `targetRef` correspond à la version de l'API, au type et au nom d'une charge de travail prise en charge.
1. Confirmez que le contrôleur DDI et l'Admission Controller sont activés. Pour les pods sans étiquette d'activation volontaire de l'admission, définissez `features.admissionController.mutateUnlabelled: true` dans la ressource `DatadogAgent`. Vérifiez les exclusions d'espaces de noms et l'étiquette `admission.datadoghq.com/enabled` du pod.
1. Vérifiez la présence d'annotations de sélection de SDK sur les pods qui prévalent sur DDI. Après avoir appliqué la configuration, remplacez les pods de la charge de travail. `APMReady=True` confirme que la configuration a été acceptée ; cela ne confirme pas que les pods en cours d'exécution ont été instrumentés.

Pour les étapes de configuration et les règles de priorité, consultez [Activer APM avec DatadogInstrumentation][14].

#### Échecs de mutation {#failed-mutations}

Le Cluster Agent consigne les avertissements et les erreurs en cas d'échec de l'injection, généralement à partir de `admission/server.go`. Par exemple, un avertissement peut apparaître si `JAVA_TOOL_OPTIONS` est défini à l'aide de `valueFrom`.

Utilisez la métrique `datadog.cluster_agent.admission_webhooks.library_injection_errors` pour un débogage plus approfondi.

##### L'annotation de langage ne peut pas être appliquée {#language-annotation-cannot-be-applied}

Lors de la configuration, SSI détecte le langage de l'application de votre service et applique une étiquette de service sous la forme `internal.dd.datadoghq.com/service-name.detected_langs`. Si l'étiquette ne peut pas être appliquée, l'injection échoue.

Des erreurs d'étiquetage surviennent parfois lorsqu'un nom de service dépasse la limite de longueur des chaînes de caractères de Kubernetes ([63 caractères][6]). Par exemple :

```
languagedetection/patcher.go:231 in handleDeploymentEvent) | failed to handle deployment event: annotations: Invalid value: "internal.dd.datadoghq.com/dummy-python-container-long-long-long-long-long-x.detected_langs": name part must be no more than 63 characters
```

Les dépassements de la limite de longueur des chaînes de caractères sont courants si les tags de service ne sont pas explicitement définis via [Unified Service Tagging][8] : les noms d'image par défaut sont alors utilisés.

##### L'injection semble réussie mais les traces sont manquantes {#injection-appears-successful-but-traces-are-missing}

Si les logs ne montrent aucun problème mais que les traces sont manquantes, il peut y avoir une mauvaise configuration côté application. Vérifiez que :
- Les annotations et étiquettes requises sont présentes.
- [Unified Service Tagging][8] est correctement configuré.
- Les listes d'autorisation/interdiction pour les règles d'instrumentation sont correctement définies.

## Dépannage spécifique au langage {#language-specific-troubleshooting}

### Java {#java}

#### `JAVA_TOOL_OPTIONS` est trop long {#java-tool-options-is-too-long}

La variable d'environnement `JAVA_TOOL_OPTIONS` a une limite de 1024 caractères imposée par la JVM. Lors de l'injection, Datadog ajoute un indicateur `-javaagent` à cette variable pour activer le traçage. Si la valeur combinée dépasse la limite, la JVM émet un avertissement et ignore la variable, empêchant ainsi l'injection.

Pour éviter ce problème, excluez le processus concerné de l'injection.

####  `JAVA_TOOL_OPTIONS` modifie la sortie du programme {#java-tool-options-changes-program-output}

Lorsque `JAVA_TOOL_OPTIONS` est défini, la JVM affiche un message sur stdout, tel que `Picked up JAVA_TOOL_OPTIONS: -Xmx1024m`. Si un processus lit cette sortie et en dépend, il peut être affecté.

Depuis la version 0.12.2, l'injection n'est pas effectuée pour `java -version` afin d'éviter d'interférer avec les processus qui analysent sa sortie.

#### Plusieurs sites Java sont signalés sous le même nom de service {#multiple-java-sites-report-under-the-same-service-name}

Par défaut, Single Step définit la variable d'environnement `DD_SERVICE`, qui applique un nom de service unique à toutes les applications web s'exécutant sur le même serveur (tel que Tomcat ou WebLogic). Par conséquent, tous les sites sont signalés sous le même nom.

Utilisez l'une des options suivantes pour activer **split-by-tags** afin que chaque site soit signalé sous son propre nom :
- Propriété système JVM : `-Ddd.trace.split-by-tags=servlet.context`
- Variable d'environnement : `DD_TRACE_SPLIT_BY_TAGS=servlet.context`

#### Le traceur existe déjà {#tracer-already-exists}

SSI n'effectue pas d'injection dans les applications qui utilisent déjà une option `-javaagent` ou une autre configuration de traçage.

### Ruby {#ruby}

L'injection Ruby modifie le `Gemfile` pour ajouter le SDK Datadog. Si la prise en charge de l'injection est supprimée ultérieurement, l'application peut échouer au démarrage en raison de la dépendance manquante.

Pour résoudre ce problème, restaurez le `Gemfile` d'origine. Si vous souhaitez toujours utiliser APM après avoir supprimé l'injection, exécutez `bundle install` pour télécharger la gem.

### Python {#python}

Les versions <=2.7.5 contiennent une dépendance protobuf préintégrée qui peut entrer en conflit avec les bibliothèques système.

### .NET {#net}

#### SSI est appliqué, mais aucune trace .NET n'atteint l'Agent {#ssi-is-applied-but-no-net-traces-reach-the-agent}

Si les annotations SSI et les conteneurs d'initialisation sont présents sur le pod, mais qu'aucune trace .NET n'arrive, un autre profileur peut avoir la priorité. Vérifiez `CORECLR_PROFILER` sur le conteneur principal. Si la valeur n'est pas `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` (le CLSID du traceur .NET Datadog), un autre profileur est chargé à la place de Datadog.

Supprimez les variables d'environnement `CORECLR_*` en conflit (et toute entrée `LD_PRELOAD` faisant référence à l'autre profileur) de la source qui les a injectées : l'opérateur d'un autre fournisseur, le conteneur d'initialisation, le modèle de pod ou les valeurs Helm. Ensuite, procédez au redémarrage progressif des pods. [La .NET CLR Profiling API n'autorise qu'un seul abonné par processus][10].

## Collecter des informations de diagnostic pour le support {#collect-diagnostic-information-for-support}

Lorsque vous contactez le support au sujet de problèmes d'injection, rassemblez les informations suivantes pour faciliter le dépannage :

1. Utilisez-vous l'injection sur le host, l'injection Docker ou les deux ?
1. Vérifiez que les répertoires `/opt/datadog-packages/datadog-apm*` existent.
1. Pour l'injection sur le host, vérifiez l'existence et les autorisations de `/etc/ld.so.preload` :

   ```
   sudo ls -l /etc/ld.so.preload
   ```

   Il doit appartenir à `root` avec les autorisations `644` (`-rw-r--r--`).

1. Activez les logs de débogage de l'injecteur et collectez la sortie. Pour obtenir des instructions, consultez [Logs de débogage de l'injecteur](#injector-debug-logs).

1. Fournissez un flare de l'Agent.

### Informations supplémentaires pour l'injection basée sur Kubernetes {#additional-information-for-kubernetes-based-injection}

Collectez les détails suivants si vous cherchez à résoudre des problèmes d'injection dans un environnement Kubernetes :

- La méthode utilisée pour déployer le Cluster Agent (par exemple, Helm, Datadog Operator ou des commandes kubectl).
- Fichiers de déploiement pour le pod de l'application.
- Flares provenant à la fois du Node Agent et du Cluster Agent, idéalement avec le mode `DEBUG` activé.
- Sortie de :
  ```
  kubectl describe pod <app pod>
  ```
- Logs de débogage de l'injecteur provenant du pod de l'application (pas du Cluster Agent). Pour obtenir des instructions, consultez [Logs de débogage de l'injecteur](#injector-debug-logs).

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes?tab=agentv764recommended#remove-apm-for-all-services-on-the-infrastructure
[2]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/docker#remove-apm-for-all-services-on-the-infrastructure
[3]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/linux#remove-single-step-apm-instrumentation-from-your-agent
[4]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/windows#remove-single-step-apm-instrumentation-from-your-agent
[5]: /fr/containers/guide/sync_container_images/#copy-an-image-to-another-registry-using-crane
[6]: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set
[7]: https://datatracker.ietf.org/doc/html/rfc1035
[8]: /fr/getting_started/tagging/unified_service_tagging/
[9]: https://app.datadoghq.com/fleet
[10]: /fr/tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
[11]: /fr/tracing/guide/injectors/
[12]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/#instrument-sdks-across-applications
[13]: /fr/tracing/troubleshooting/tracer_debug_logs/
[14]: /fr/tracing/trace_collection/single-step-apm/kubernetes/?tab=datadoginstrumentationcrdrecommended#enable-apm-with-datadoginstrumentation
---
description: Apprenez à consulter les statistiques et les logs des Workers, et utilisez
  les commandes tap et top pour inspecter les événements et diagnostiquer les problèmes
  de configuration d'Observability Pipelines.
disable_toc: false
title: Dépannage
---
## Présentation {#overview}

Si vous rencontrez un comportement inattendu avec Datadog Observability Pipelines (OP), il existe quelques problèmes courants que vous pouvez examiner, et ce guide peut vous aider à résoudre les problèmes rapidement. Si vous continuez à rencontrer des difficultés, contactez le [support Datadog][1] pour obtenir de l'aide.

## Consultez les statistiques et les logs des Observability Pipelines Workers {#view-observability-pipelines-worker-stats-and-logs}

Pour consulter les informations sur les Observability Pipelines Workers exécutés pour un pipeline actif :

1. Accédez à [Observability Pipelines][2].
1. Sélectionnez votre pipeline.
1. Cliquez sur l'onglet {{< ui >}}Workers{{< /ui >}} pour voir l'utilisation de la mémoire et du processeur, les statistiques de trafic et les éventuelles erreurs des Workers.
1. Pour consulter les statuts et les versions des Workers, cliquez sur l'onglet {{< ui >}}Latest Deployment & Setup{{< /ui >}} .
1. Pour voir les logs des Workers, cliquez sur la roue dentée en haut à droite de la page, puis sélectionnez {{< ui >}}View OPW Logs{{< /ui >}} . Consultez [Syntaxe de recherche de logs][3] pour plus de détails sur la façon de filtrer vos logs. Pour voir les logs d'un Worker spécifique, ajoutez `@op_worker.id:<worker_id>` à la requête de recherche.<br>**Remarque** : Si vous ne voyez pas les logs de l'Observability Pipelines Worker, assurez-vous d'effectuer l'[indexation des logs des Workers][10] vers Log Management.

## Inspectez les événements envoyés via votre pipeline pour identifier les problèmes de configuration {#inspect-events-sent-through-your-pipeline-to-identify-setup-issues}

Si vous pouvez accéder localement à vos Observability Pipelines Workers, utilisez la commande `tap` pour voir les données brutes envoyées via la source et les processeurs de votre pipeline.

### Activez l'API de l'Observability Pipelines Worker {#enable-the-observability-pipelines-worker-api}

 L'API de l'Observability Pipelines Worker vous permet d'interagir avec les processus du Worker avec les commandes `tap` et `top`. Si vous utilisez les charts Helm fournis lors de la [configuration d'un pipeline][4], alors l'API a déjà été activée. Sinon, assurez-vous que la variable d'environnement `DD_OP_API_ENABLED` est définie sur `true` dans `/etc/observability-pipelines-worker/bootstrap.yaml`. Consultez les [options de bootstrap][5] pour plus d'informations. Cela configure l'API pour qu'elle écoute sur `localhost` et le port `8686`, ce qui est attendu par l'interface de ligne de commande pour `tap`.

 **Remarque** : Consultez [Activer la sonde d'activité et de disponibilité][15] pour obtenir des instructions sur la façon d'exposer l'endpoint `/health`. Une fois l'endpoint exposé, configurez les équilibreurs de charge pour utiliser l'endpoint de l'API `/health` afin de vérifier que le Worker est opérationnel.

### Utilisez `top` pour trouver l'ID du composant {#use-top-to-find-the-component-id}

Vous avez besoin de l'ID du composant de la source ou du processeur pour y `tap`. Utilisez la commande `top` pour trouver l'ID du composant dans lequel vous souhaitez `tap` :

```
observability-pipelines-worker top
```

Consultez [Commandes du Worker][13] pour obtenir une liste des commandes et des options.

### Utilisez `tap` pour voir vos données {#use-tap-to-see-your-data}

Si vous êtes sur le même host que le Worker, exécutez la commande suivante pour `tap` la sortie du composant :

```
observability-pipelines-worker tap <component_ID>
```

Si vous utilisez un environnement conteneurisé, utilisez la commande `docker exec` ou `kubectl exec` pour obtenir un shell dans le conteneur afin d'exécuter la commande `tap` ci-dessus .

Consultez [Commandes du Worker][13] pour obtenir une liste des commandes et des options.

## Activer les logs de débogage {#enable-debug-logs}

Pour voir les logs de débogage, redémarrez le Worker avec la variable d'environnement `VECTOR_LOG` définie sur `debug`. Par exemple, si vous exécutez le Worker dans Docker, ajoutez `-e VECTOR_LOG=debug` à la commande `docker run` :

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=debug \
   datadog/observability-pipelines-worker run
```

## Identifier les Workers dans un environnement Kubernetes en utilisant les noms de Pod et de cluster {#identify-workers-in-a-kubernetes-environment-using-pod-and-cluster-names}

{{% observability_pipelines/install_worker/pod_cluster_name_worker %}}

## Problèmes de logs du Worker {#worker-logs-issues}

### Aucun log du Worker dans Log Explorer {#no-worker-logs-in-log-explorer}

Si vous ne voyez pas les logs du Worker dans [Log Explorer][12], assurez-vous qu'ils ne sont pas exclus dans vos pipelines de logs. Les logs du Worker doivent être indexés dans Log Management pour une fonctionnalité optimale. Les logs fournissent des informations de déploiement, telles que le statut du Worker, la version et toute erreur, qui sont affichées dans l'interface utilisateur d'Observability Pipelines. Les logs sont également utiles pour le dépannage des problèmes de Worker ou de pipelines. Si les logs du Worker ne sont pas indexés dans Log Management, l'onglet Latest Deploy and Setup affiche un état de chargement perpétuel au lieu du statut actuel du Worker. Tous les logs du Worker ont le tag `source:op_worker`.

### Logs Observability Pipelines en double {#duplicate-observability-pipelines-logs}

Si vous voyez des logs Observability Pipelines en double dans [Log Explorer][7] et que votre Agent s'exécute dans un conteneur Docker, vous devez exclure les logs Observability Pipelines en utilisant la variable d'environnement `DD_CONTAINER_EXCLUDE_LOGS`. Pour Helm, utilisez `datadog.containerExcludeLogs`. Cela évite les logs en double, car le Worker envoie également ses propres logs directement à Datadog. Consultez [Collecte de logs Docker][8] ou [Définition des variables d'environnement pour Helm][9] pour plus d'informations.

## Problèmes et erreurs du Worker {#worker-issues-and-errors}

### Erreur lors de l'installation d'une nouvelle version du Worker {#getting-an-error-when-installing-a-new-version-of-the-worker}

Si vous essayez d'installer une nouvelle version du Worker dans une instance qui exécute une version plus ancienne du Worker, vous obtenez une erreur. Vous devez [désinstaller][11] l'ancienne version avant de pouvoir installer la nouvelle version du Worker.

### Le Worker ne démarre pas {#worker-is-not-starting}

Si le Worker ne démarre pas, les logs du Worker ne sont pas envoyés à Datadog et ne sont pas visibles dans Log Explorer pour le dépannage. Pour afficher les logs localement, utilisez la commande suivante :

- Pour un environnement basé sur une VM :
    ```
    sudo journalctl -u observability-pipelines-worker.service -b
    ```

- Pour Kubernetes :
    ```
    kubectl logs <pod-name>
    ```
    An example of `<pod-name>` is `opw-observability-pipelines-worker-0`.

### Erreur de multi-attachement lors de l'utilisation de la persistance sur Kubernetes {#multi-attach-error-when-using-persistence-on-kubernetes}

Si vous avez activé la [mise en tampon sur disque][24] pour les destinations et que vous voyez un pod Worker bloqué dans `Pending` avec une erreur de multi-attachement de volume après que Kubernetes l'a replanifié sur un nouveau nœud, c'est normal. L'erreur se produit parce que le volume persistant du nœud précédent n'a pas fini de se détacher. Le pod se rétablit de lui-même.

Datadog recommande de conserver le paramètre `podManagementPolicy: Parallel` par défaut du StatefulSet du Worker, même lorsque vous voyez cette erreur. Passer à `OrderedReady` réduit la fréquence d'apparition de l'erreur, mais empêche le StatefulSet de monter en charge pendant que les réplicas en cours de terminaison terminent leur arrêt en douceur. Cela ralentit la réponse de votre pipeline à une rafale d'événements.

### Échec de la vérification du certificat {#certificate-verify-failed}

Si vous voyez une erreur avec `certificate verify failed` et `self-signed certificate in certificate chain`, consultez [Certificats TLS][16]. Observability Pipelines n'accepte pas les certificats auto-signés car ils ne sont pas sécurisés.

### Assurez-vous que votre organisation est activée pour RC {#ensure-your-organization-is-enabled-for-rc}

Si vous voyez l'erreur `Please ensure you organization is enabled for RC`, assurez-vous que votre clé d'API Worker affiche [Remote Configuration activé][17]. Consultez [Security considerations][19] pour obtenir des informations sur les mesures de protection mises en œuvre pour Remote Configuration.

### Le Worker ne reçoit pas de logs de la source {#the-worker-is-not-receiving-logs-from-the-source}

Si vous avez configuré votre source pour envoyer des logs au Worker, assurez-vous que le port sur lequel le Worker écoute est le même que celui vers lequel la source envoie les logs.

Si vous utilisez RHEL et que vous devez transférer des logs d'un port (par exemple UDP/514) vers le port sur lequel le Worker écoute (par exemple, UDP/1514, qui est un port non privilégié), vous pouvez utiliser [`firewalld`][14] pour transférer les logs du port 514 vers le port 1514.

### Erreur de connexion échouée {#failed-to-connect-error}

Si vous voyez une erreur similaire à l'une de ces erreurs :

```
Failed to connect to 34.44.228.240 port 80 after 56 ms: Couldn't connect to server
```

```
connect to 35.82.252.23 port 80  failed: Operation timed out
```

```
Failed to connect to ab52a1d16fxxxxxxxabd90c7526a1-1xxxx.us-west-2.elb.amazonaws.com port 80 after 225027 ms: Couldn't connect to server
```

Et que vous :

- Avez un pare-feu entre votre source et vos Workers, assurez-vous que le trafic est autorisé sur le port choisi entre la source et le Worker.
- Avez un pare-feu entre les Workers et votre destination, assurez-vous qu'il autorise le trafic de vos Workers vers la destination sur le port défini.

Vous pouvez tester votre connectivité avec votre endpoint Observability Pipelines Worker en utilisant la commande `curl` depuis l'emplacement de votre source, à condition que vous disposiez d'un accès shell à la machine source. Par exemple, si vous avez une source Datadog Agent, la commande curl ressemble à ceci :

```
curl --location 'http://ab52a1d102c6f4a3c823axxx-xxxxx.us-west-2.elb.amazonaws.com:80/api/v2/logs' -d '{"ddsource": "my_datadog","ddtags": "env:test","hostname": "i-02a4fxxxxx","message": "hello","service": "test"}' -v
```

La commande curl que vous utilisez est basée sur le port que vous utilisez, ainsi que sur le chemin et la charge utile attendue de votre source.

**Remarque** : Consultez [Ajouter des domaines à la liste d'autorisation du pare-feu][21] pour obtenir la liste des domaines qui doivent être ajoutés à votre liste d'autorisation si vous utilisez un pare-feu.

### Erreur : trop de fichiers {#too-many-files-error}

Si vous voyez l'erreur `Too many files` et que les processus Worker redémarrent de manière répétée, cela peut être dû à une limite de descripteurs de fichiers trop basse sur le host. Pour résoudre ce problème dans les environnements Linux, définissez `LimitNOFILE` dans la configuration du service systemd sur `65,536` pour augmenter la limite de descripteurs de fichiers.

### Envoi de la source interrompu en cours de route {#source-send-interrupted-mid-flight}

Si vous voyez des logs d'erreurs `Source send interrupted mid-flight; pipeline may be overloaded or shutting down`, un problème a interrompu l'opération d'envoi avant que le Worker n'ait envoyé tous les événements du lot en aval. Le Worker abandonne tous les événements restants dans ce lot et incrémente la métrique `component_discarded_events_total`. Les causes possibles de l'interruption peuvent inclure la contre-pression, l'arrêt du Worker ou les redémarrages du Worker.

Pour déterminer si l'interruption est due à un redémarrage ou à un arrêt du Worker, essayez de corréler l'horodatage de l'erreur avec les logs du cycle de vie du Worker, tels que `Vector has stopped`, `Shutting down...`, ou avec les événements de redémarrage de pod ou de conteneur survenus à la même période.

Pour déterminer si l'erreur est due à une contre-pression, utilisez le dashboard [Observability Pipelines Overview][29] pour effectuer le dépannage. Vous pouvez filtrer par ID de pipeline, host, ID de Worker et composants. Vérifiez les points suivants :

1. Utilisation de la mémoire tampon de destination
    - Une mémoire tampon proche de sa capacité maximale est un signe de contre-pression. Envisagez de [choisir une mémoire tampon sur disque][26] ou d'augmenter la taille de la mémoire tampon pour aider à absorber les pics de trafic et atténuer la contre-pression. Consultez les [métriques de mémoire tampon][25] pour surveiller l'utilisation de la mémoire tampon.
2. Utilisation du processeur du Worker
    - Une utilisation élevée et soutenue du processeur sur les Workers pendant les pics de trafic indique que le pipeline ne dispose pas d'une capacité de calcul suffisante. Consultez les [Meilleures pratiques pour la mise à l'échelle d'Observability Pipelines][27] pour obtenir des conseils sur le dimensionnement et la mise à l'échelle automatique des Workers.
    - Le processeur Sensitive Data Scanner est gourmand en ressources processeur et peut également entraîner une utilisation élevée du processeur. Consultez les [Meilleures pratiques pour optimiser les performances][28] pour plus d'informations.

## Problèmes généraux de pipeline {#general-pipeline-issues}

### Variable d'environnement manquante {#missing-environment-variable}

Si vous voyez l'erreur `Configuration is invalid. Missing environment variable $<env_var>`, assurez-vous d'ajouter les variables d'environnement pour votre source, vos processeurs et vos destinations lors de l'installation du Worker. Consultez les [Variables d'environnement][18] pour obtenir une liste des variables d'environnement de source, de processeur et de destination.

## Problèmes de pipeline de logs {#logs-pipeline-issues}

### Les logs ne sont pas transférés vers la destination {#logs-are-not-getting-forwarded-to-the-destination}

Exécutez la commande `netstat -anp | find "<port_number>"` pour vérifier que le port sur lequel la destination est à l'écoute n'est pas utilisé par un autre service.

### Logs retardés à la destination {#seeing-delayed-logs-at-the-destination}

Les destinations des Observability Pipelines regroupent les événements par lots avant de les envoyer à l'intégration en aval. Par exemple, les destinations Amazon S3, Google Cloud Storage et Azure Storage ont un délai d'expiration de lot de 900 secondes. Si les autres paramètres de lot (nombre maximal d'événements et nombre maximal d'octets) n'ont pas été atteints dans le délai d'expiration de 900 secondes, le lot est vidé à 900 secondes. Cela signifie que le composant de destination peut prendre jusqu'à 15 minutes pour envoyer un lot d'événements à l'intégration en aval.

Voici les paramètres de lot pour chaque destination :

{{% observability_pipelines/destination_batching %}}

Consultez [Lot d'événements des destinations][6] pour plus d'informations.

## Problèmes de composant {#component-issues}

### Erreur lors de la synchronisation de l'état du quota {#failed-to-sync-quota-state-error}

Le processeur de quota est synchronisé entre tous les Workers d'une organisation Datadog. Pour la synchronisation, il existe une limite de débit par défaut de 50 Workers par organisation. Lorsqu'il y a plus de 50 Workers pour une organisation :
- Le processeur continue de s'exécuter, mais ne se synchronise pas correctement avec les autres Workers, ce qui peut entraîner l'envoi de logs après que la limite de quota a été atteinte.
- Le Worker affiche `Failed to sync quota state errors`.
- [Contactez le support][20] si vous souhaitez augmenter le nombre par défaut de Workers par organisation.

### Les métriques générées sont horodatées avec l'heure de traitement au lieu de l'horodatage du log{#generated-metrics-are-timestamped-with-the-processing-time-instead-of-the-log-timestamp}

Si les métriques générées par le processeur Generate Metrics sont horodatées avec l'heure de traitement du log plutôt qu'avec l'horodatage du log, vérifiez si le log `timestamp` est au format chaîne. Le processeur Generate Metrics nécessite que le champ `timestamp` soit de type horodatage analysé. Consultez [Convertir un horodatage chaîne en format horodatage][23] pour obtenir des instructions.

###  Erreur lors de la conversion du champ d'horodatage {#error-converting-timestamp-field}

Si vous utilisez la destination Databricks (Zerobus) et que vous voyez une erreur de Worker similaire à celle ci-dessous, vérifiez si les horodatages de vos logs sont au format chaîne :

```
Protobuf encoding failed: Error converting timestamp field: Can't convert '2012-04-23T10[41]15Z' to i64: invalid digit found in string
```

Si vos horodatages de logs sont au format chaîne et que votre tableau Databricks possède une colonne d'horodatage déclarée comme type `TIMESTAMP`, vous devez convertir l'horodatage chaîne au format horodatage. Consultez [Convertir des horodatages chaîne en format horodatage][22] pour plus d'informations.

[1]: /fr/help/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /fr/logs/explorer/search_syntax/
[4]: /fr/observability_pipelines/configuration/set_up_pipelines/#set-up-a-pipeline
[5]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options
[6]: /fr/observability_pipelines/destinations/#event-batching-intro
[7]: https://app.datadoghq.com/logs/
[8]: /fr/containers/docker/log/?tab=containerinstallation#linux
[9]: /fr/containers/guide/container-discovery-management/?tab=helm#setting-environment-variables
[10]: /fr/observability_pipelines/configuration/install_the_worker/#index-your-worker-logs
[11]: /fr/observability_pipelines/install_the_worker#uninstall-the-worker
[12]: https://app.datadoghq.com/logs
[13]: /fr/observability_pipelines/configuration/install_the_worker/worker_commands/
[14]: https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/security_guide/sec-port_forwarding#sec-Adding_a_Port_to_Redirect
[15]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes
[16]: /fr/observability_pipelines/sources/#tls-certificates
[17]: https://app.datadoghq.com/organization-settings/remote-config/setup
[18]: /fr/observability_pipelines/guide/environment_variables/
[19]: /fr/remote_configuration/#security-considerations
[20]: /fr/help/
[21]: /fr/observability_pipelines/configuration/install_the_worker/#add-domains-to-firewall-allowlist
[22]: /fr/observability_pipelines/destinations/databricks#convert-string-timestamps-to-timestamp-format
[23]: /fr/observability_pipelines/processors/generate_metrics/#convert-string-timestamp-to-timestamp-format
[24]: /fr/observability_pipelines/scaling_and_performance/buffering_and_backpressure/#destination-buffers
[25]: /fr/observability_pipelines/scaling_and_performance/buffering_and_backpressure/#buffer-metrics
[26]: /fr/observability_pipelines/scaling_and_performance/buffering_and_backpressure/#choosing-buffer-types
[27]: /fr/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/
[28]: /fr/observability_pipelines/processors/sensitive_data_scanner/?tab=libraryrules#best-practices-to-optimize-performance
[29]: https://app.datadoghq.com/dash/integration/32326/observability-pipelines-overview
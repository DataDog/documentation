---
disable_toc: false
title: Dépannage
---
## Aperçu {#overview}

Si vous rencontrez un comportement inattendu avec les Datadog Observability Pipelines (OP), il existe quelques problèmes courants que vous pouvez examiner, et ce guide peut aider à résoudre ces problèmes rapidement. Si vous continuez à avoir des difficultés, contactez [le support Datadog][1] pour obtenir une assistance supplémentaire.

## Voir les statistiques et les journaux des Observability Pipelines Workers {#view-observability-pipelines-worker-stats-and-logs}

Pour voir des informations sur les Observability Pipelines Workers en cours d'exécution pour un pipeline actif :

1. Accédez à [Observability Pipelines][2].
1. Sélectionnez votre pipeline.
1. Cliquez sur l'onglet **Workers** pour voir l'utilisation de la mémoire et du CPU des Workers, les statistiques de trafic et les erreurs éventuelles.
1. Pour voir les statuts et les versions des Workers, cliquez sur l'onglet **Latest Deployment & Setup**.
1. Pour voir les journaux des Workers, cliquez sur l'engrenage en haut à droite de la page, puis sélectionnez **View OPW Logs**. Consultez [Logs Search Syntax][3] pour des détails sur la façon de filtrer vos journaux. Pour voir les journaux d'un Worker spécifique, ajoutez `@op_worker.id:<worker_id>` à la requête de recherche.<br>**Remarque** : Si vous ne voyez pas les journaux des Workers, assurez-vous que vous [indexez les journaux des Workers][10] dans Log Management.

## Inspectez les événements envoyés à travers votre pipeline pour identifier les problèmes de configuration {#inspect-events-sent-through-your-pipeline-to-identify-setup-issues}

Si vous pouvez accéder localement aux Observability Pipelines Workers, utilisez la commande `tap` pour voir les données brutes envoyées via la source et les processors de votre pipeline.

### Activez l'API des Observability Pipelines Workers {#enable-the-observability-pipelines-worker-api}

 L'API des Workers des Pipelines d'Observabilité vous permet d'interagir avec les processus du Worker avec la commande `tap` et `top`. Si vous utilisez les charts Helm fournis lors de la [configuration d'un pipeline][4], alors l'API a déjà été activée. Sinon, assurez-vous que la variable d'environnement `DD_OP_API_ENABLED` est définie sur `true` dans `/etc/observability-pipelines-worker/bootstrap.yaml`. Consultez [les options de démarrage][5] pour plus d'informations. Cela configure l'API pour écouter sur `localhost` et le port `8686`, ce que le CLI pour `tap` attend.

 **Remarque** : Voir [Activer la sonde de vivacité et de disponibilité][15] pour des instructions sur la façon d'exposer le `/health` point de terminaison. Après que le point de terminaison est exposé, configurez les équilibreurs de charge pour utiliser le `/health` point de terminaison API afin de vérifier que le Worker est opérationnel.

### Utilisez `top` pour trouver l'ID du composant {#use-top-to-find-the-component-id}

Vous avez besoin de l'ID du composant de la source ou du processeur pour `tap` y accéder. Utilisez la commande `top` pour trouver l'ID du composant dans lequel vous souhaitez `tap` accéder :

```
observability-pipelines-worker top
```

Voir [Worker Commands][13] pour une liste de commandes et d'options.

### Utilisez `tap` pour voir vos données {#use-tap-to-see-your-data}

Si vous êtes sur le même hôte que le Worker, exécutez la commande suivante pour `tap` la sortie du composant :

```
observability-pipelines-worker tap <component_ID>
```

Si vous utilisez un environnement conteneurisé, utilisez la commande `docker exec` ou `kubectl exec` pour obtenir un shell dans le conteneur afin d'exécuter la commande `tap` ci-dessus.

Voir [Worker Commands][13] pour une liste des commandes et options.

## Activez les journaux de débogage {#enable-debug-logs}

Pour voir les journaux de débogage, redémarrez le Worker avec la variable d'environnement `VECTOR_LOG` définie sur `debug`. Par exemple, si vous exécutez le Worker dans Docker, ajoutez `-e VECTOR_LOG=debug` à la commande `docker run` :

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=debug \
   datadog/observability-pipelines-worker run
```

## Identifiez les Workers dans un environnement Kubernetes en utilisant les noms de Pod et de cluster {#identify-workers-in-a-kubernetes-environment-using-pod-and-cluster-names}

{{% observability_pipelines/install_worker/pod_cluster_name_worker %}}

## Problèmes de journaux du Worker {#worker-logs-issues}

### Aucun journal de Worker dans l'Explorateur de journaux {#no-worker-logs-in-log-explorer}

Si vous ne voyez pas de journaux de Worker dans [Log Explorer][12], assurez-vous qu'ils ne sont pas exclus dans vos pipelines de journaux. Les journaux du Worker doivent être indexés dans Log Management pour un fonctionnement optimal. Les journaux fournissent des informations sur le déploiement, telles que le statut du Worker, la version et les erreurs, qui sont affichées dans l'UI des Observability Pipelines. Les journaux sont également utiles pour le dépannage des problèmes de Worker ou d'Observability Pipelines. Tous les journaux du Worker ont le tag `source:op_worker`.

### Duplicate Observability Pipelines logs {#duplicate-observability-pipelines-logs}

Si vous voyez des duplicate Observability Pipelines logs dans [Log Explorer][7] et que votre Agent fonctionne dans un conteneur Docker, vous devez exclure les journaux des Observability Pipelines en utilisant la variable d'environnement `DD_CONTAINER_EXCLUDE_LOGS`. Pour Helm, utilisez `datadog.containerExcludeLogs`. Cela empêche les journaux en double, car le Worker envoie également ses propres journaux directement à Datadog. Consultez [Docker Log Collection][8] ou [Setting environment variables for Helm][9] pour plus d'informations.

## Problèmes et erreurs du Worker {#worker-issues-and-errors}

### Erreur lors de l'installation d'une nouvelle version du Worker {#getting-an-error-when-installing-a-new-version-of-the-worker}

Si vous essayez d'installer une nouvelle version du Worker sur une instance qui exécute une version antérieure du Worker, vous obtenez une erreur. Vous devez [désinstaller][11] la version antérieure avant de pouvoir installer la nouvelle version du Worker.

### Le Worker ne démarre pas {#worker-is-not-starting}

Si le Worker ne démarre pas, les journaux du Worker ne sont pas envoyés à Datadog et ne sont pas visibles dans Log Explorer pour le dépannage. Pour voir les journaux localement, utilisez la commande suivante :

- Pour un environnement basé sur une VM :
    ```
    sudo journalctl -u observability-pipelines-worker.service -b
    ```

- Pour Kubernetes :
    ```
    kubectl logs <pod-name>
    ```
    An example of `<pod-name>` is `opw-observability-pipelines-worker-0`.

### Échec de la vérification du certificat {#certificate-verify-failed}

Si vous voyez une erreur avec `certificate verify failed` et `self-signed certificate in certificate chain`, consultez [TLS certificates][16]. Les Observability Pipelines n'acceptent pas les certificats auto-signés car ils ne sont pas sécurisés.

### Assurez-vous que votre organisation est activée pour RC {#ensure-your-organization-is-enabled-for-rc}

Si vous voyez l'erreur `Please ensure you organization is enabled for RC`, assurez-vous que votre clé API Worker a [Remote Configuration enabled][17]. Consultez [Security considerations][19] pour des informations sur les mesures de sécurité mises en œuvre pour la configuration à distance.

### Le Worker ne reçoit pas de journaux de la source {#the-worker-is-not-receiving-logs-from-the-source}

Si vous avez configuré votre source pour envoyer des journaux au Worker, assurez-vous que le port sur lequel le Worker écoute est le même port auquel la source envoie des journaux.

Si vous utilisez RHEL et devez transférer des journaux d'un port (par exemple UDP/514) au port sur lequel le Worker écoute (par exemple, UDP/1514, qui est un port non privilégié), vous pouvez utiliser [`firewalld`][14] pour transférer des journaux du port 514 au port 1514.

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

Et vous :

- Si vous avez un pare-feu entre votre source et vos Workers, assurez-vous que le trafic est autorisé sur le port choisi entre la source et le Worker.
- Si vous avez un pare-feu entre les Workers et votre destination, assurez-vous qu'il autorise le trafic de vos Workers vers la destination sur le port défini.

Vous pouvez tester votre connectivité à votre Observability Pipelines Worker endpoint en utilisant la commande `curl` depuis votre emplacement source, à condition que vous ayez un accès shell à la machine source. Par exemple, si vous avez une source Datadog Agent, la commande curl ressemble à ceci :

```
curl --location 'http://ab52a1d102c6f4a3c823axxx-xxxxx.us-west-2.elb.amazonaws.com:80/api/v2/logs' -d '{"ddsource": "my_datadog","ddtags": "env:test","hostname": "i-02a4fxxxxx","message": "hello","service": "test"}' -v
```

La commande curl que vous utilisez est basée sur le port que vous utilisez, ainsi que sur le chemin et la charge utile attendue de votre source.

**Remarque** : Voir [Add domains to firewall allowlist][21] pour la liste des domaines qui doivent être ajoutés à votre allowlist si vous utilisez un pare-feu.

### Erreur de trop nombreux fichiers {#too-many-files-error}

Si vous voyez l'erreur `Too many files` et que les processus du travailleur redémarrent de manière répétée, cela pourrait être dû à une limite basse de descripteurs de fichiers sur l'hôte. Pour résoudre ce problème dans les environnements Linux, définissez `LimitNOFILE` dans la configuration du service systemd sur `65,536` pour augmenter la limite de descripteurs de fichiers.

## General pipeline issues {#general-pipeline-issues}

### Missing environment variable {#missing-environment-variable}

Si vous voyez l'erreur `Configuration is invalid. Missing environment variable $<env_var>`, assurez-vous d'ajouter les variables d'environnement pour votre source, vos processors et vos destinations lors de l'installation du Worker. Voir [Environment Variables][18] pour une liste des variables d'environnement de source, de processor et de destination.

## Logs pipeline issues {#logs-pipeline-issues}

### Les journaux ne sont pas transférés vers la destination {#logs-are-not-getting-forwarded-to-the-destination}

Exécutez la commande `netstat -anp | find "<port_number>"` pour vérifier que le port sur lequel la destination écoute n'est pas utilisé par un autre service.

### Observation de journaux retardés à la destination {#seeing-delayed-logs-at-the-destination}

Les Observability Pipelines destinations regroupent les événements avant de les envoyer à l'intégration en aval. Par exemple, les destinations Amazon S3, Google Cloud Storage et Azure Storage ont un délai d'attente de regroupement de 900 secondes. Si les autres paramètres de lot (nombre maximal d'événements et nombre maximal d'octets) n'ont pas été atteints dans le délai de 900 secondes, le lot est vidé à 900 secondes. Cela signifie que le composant de destination peut prendre jusqu'à 15 minutes pour envoyer un lot d'événements à l'intégration en aval.

Voici les paramètres de lot pour chaque destination :

{{% observability_pipelines/destination_batching %}}

Voir [lot d'événements][6] pour plus d'informations.

## Problèmes de composant {#component-issues}

### Erreur de synchronisation de l'état du quota {#failed-to-sync-quota-state-error}

Le processeur de quota est synchronisé entre tous les Workers dans une organisation Datadog. Pour la synchronisation, il y a une limite de taux par défaut de 50 Workers par organisation. Lorsque le nombre de Workers pour une organisation dépasse 50 :
- Le processeur continue de fonctionner, mais ne se synchronise pas correctement avec les autres Workers, ce qui peut entraîner l'envoi de journaux après que la limite de quota a été atteinte.
- Le Worker imprime `Failed to sync quota state errors`.
- [Contactez le support][20] si vous souhaitez augmenter le nombre par défaut de Workers par organisation.

###  Erreur de conversion du champ d'horodatage {#error-converting-timestamp-field}

Si vous utilisez la destination Databricks (Zerobus) et voyez une erreur de Worker similaire à celle ci-dessous, vérifiez si les horodatages de vos journaux sont au format chaîne :

```
Protobuf encoding failed: Error converting timestamp field: Can't convert '2012-04-23T10[41]15Z' to i64: invalid digit found in string
```

Si vos horodatages de journaux sont au format chaîne et que votre table Databricks possède une colonne d'horodatage déclarée en type `TIMESTAMP`, vous devez convertir l'horodatage de chaîne en format d'horodatage. Voir [Convertir les horodatages au format chaîne en format d'horodatage][22] pour plus d'informations.

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
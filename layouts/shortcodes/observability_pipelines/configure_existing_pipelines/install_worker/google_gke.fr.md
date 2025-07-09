1. Télécharger le [fichier des valeurs du Chart Helm][6001] pour Google GKE.
1. Cliquez sur **Select API key** pour choisir la clé d'API Datadogque vous souhaitez utiliser.
1. Ajouter le référentiel du chart Datadog à Helm :
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    Si vous disposez déjà du référentiel du chart Datadog, exécutez la commande suivante pour vous assurer qu'il est à jour :
    ```shell
    helm repo update
    ```
1. Exécutez la commande fournie dans l'interface utilisateur pour installer le worker. La commande est automatiquement remplie avec les variables d'environnement que vous avez saisies précédemment.
    ```shell
    helm upgrade --install opw \
        -f google_gke.yaml \
        --set datadog.apiKey=<DATADOG_API_KEY> \
        --set datadog.pipelineId=<PIPELINE_ID> \
        --set <SOURCE_ENV_VARIABLES> \
        --set <DESTINATION_ENV_VARIABLES> \
        --set service.ports[0].protocol=TCP,service.ports[0].port=<SERVICE_PORT>,service.ports[0].targetPort=<TARGET_PORT> \
        datadog/observability-pipelines-worker
    ```
   **Remarque** : par défaut, le service Kubernetes service associe le port entrant `<SERVICE_PORT>` au port sur lequel le worker est actif (`<TARGET_PORT>`). Si vous souhaitez mapper le port du pod du worker sur un autre port entrant du service Kubernetes, utilisez les valeurs `service.ports[0].port` et `service.ports[0].targetPort` :
    ```
    --set service.ports[0].protocol=TCP,service.ports[0].port=8088,service.ports[0].targetPort=8282
    ```
1. Cliquez sur **Navigate Back** pour revenir à la page d'édition des pipelines d'observabilité.
1. Cliquez sur **Deploy Changes**.

[6001]: /resources/yaml/observability_pipelines/v2/setup/google_gke.yaml

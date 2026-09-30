1. Cliquez sur **Select API key** pour choisir la clé d'API Datadogque vous souhaitez utiliser.
1. Exécutez la commande fournie dans l'interface utilisateur pour installer le worker. La commande est automatiquement remplie avec les variables d'environnement que vous avez saisies précédemment.
    ```shell
    docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
        -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
        -e DD_SITE=<DATADOG_SITE> \
        -e <SOURCE_ENV_VARIABLE> \
        -e <DESINATION_ENV_VARIABLE> \
        -p 8088:8088 \
        datadog/observability-pipelines-worker run
    ```
    **Remarque** : par défaut, la commande `docker run` expose le même port que celui sur lequel le worker est actif. Si vous voulez mapper le port du conteneur du worker sur un autre port dans le host Docker, utilisez l'option `-p | --publish` :
    ```
    -p 8282:8088 datadog/observability-pipelines-worker run
    ```
1. Cliquez sur **Navigate Back** pour revenir à la page d'édition des pipelines d'observabilité.
1. Cliquez sur **Deploy Changes**.
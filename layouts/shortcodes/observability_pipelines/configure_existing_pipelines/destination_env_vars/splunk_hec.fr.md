- Token HEC Splunk :
    - Le token HEC Splunk pour l'indexeur Splunk.
    - Stocké dans la variable d'environnement `DD_OP_DESTINATION_SPLUNK_HEC_TOKEN`.
- URL de base de l'instance Splunk :
    - L'endpoint Event Collector HTTP Splunk auquel votre worker de pipelines d'observabilité envoie les logs traités. Par exemple, `https://hec.splunkcloud.com:8088`. 
    **Remarque** : le chemin d'accès `/services/collector/event` est automatiquement ajouté au endpoint.
    - Stocké dans la variable d'environnement `DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL`.
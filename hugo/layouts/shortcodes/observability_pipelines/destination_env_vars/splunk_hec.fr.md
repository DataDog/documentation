Ajoutez votre jeton HEC Splunk et l'URL de base de l'instance Splunk. Consultez la section [Prérequis](#prérequis) pour en savoir plus.

Le worker transmet le jeton HEC à l'endpoint de collecte Splunk. Une fois les logs traités par le worker des pipelines d'observabilité, ils sont envoyés vers l'URL de l'instance Splunk spécifiée.

**Remarque** : la destination du HEC Splunk transmet tous les logs vers l'endpoint `/services/collector/event`, que la destination de votre HEC Splunk soit configurée pour encoder votre sortie en `JSON` ou `raw`.
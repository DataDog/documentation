## Envoyer des logs au worker des pipelines d'observabilité via une source HTTP Sumo Logic

Une fois que vous avez installé le worker des pipelines d'observabilité et déployé la configuration, le worker expose les endpoints HTTP qui utilisent l'[API Source HTTP Sumo Logic][1001].

Pour envoyer des logs à votre source HTTP Sumo Logic, vous devez indiquer vos logs existant au worker en amont :
```shell
curl -v -X POST -T [nom_de_fichier_local] http://<HOST_OPW>/receiver/v1/http/<CODE_COLLECTOR_HTTP_UNIQUE>
```
`<HOST_OPW>` correspond à l'IP/URL du host (ou du répartiteur de charge) associé au worker de pipelines d'observabilité. Pour les installations CloudFormation, l'URL à utiliser est correcte pour la sortie CloudFormation `LoadBalancerDNS`. Pour les installations Kubernetes, l'enregistrement DNS interne du service du worker de pipelines d'observabilité peut être utilisé, comme `opw-observability-pipelines-worker.default.svc.cluster.local`.

`<CODE_COLLECTOR_HTTP_UNIQUE>` est la chaîne qui suit la dernière barre oblique (`/`) dans l'URL de téléchargement de la source HTTP que vous avez fournie lors de l'étape [Installer le worker de pipelines d'observabilité](#installer-le-worker-de-pipelines-d-observabilité).

À ce stade, vos logs devraient être transmis au worker, traités par le pipeline et envoyés vers la destination configurée.

[1001]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/upload-logs/
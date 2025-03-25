## Connecter le forwarder de Splunk au worker de pipelines d'observabilité

Pour transmettre vos logs au worker, ajoutez la configuration suivante au chemin `etc/system/local/outputs.conf` de votre forwarder Heavy/Universal de Splunk et remplacez `<HOST_OPW>` par l'IP/URL du host (ou du répartiteur de charge) associé au worker de pipelines d'observabilité :

```
[tcpout]
compressed=false
sendCookedData=false
defaultGroup=opw

[tcpout:opw]
server=<HOST_OPW_>:8099
```

`<HOST_OPW>` correspond à l'IP/URL du host (ou du répartiteur de charge) associé au worker de pipelines d'observabilité. Pour les installations CloudFormation, l'URL à utiliser est correcte pour la sortie CloudFormation `LoadBalancerDNS`. Pour les installations Kubernetes, l'enregistrement DNS interne du service du worker de pipelines d'observabilité peut être utilisé, comme `opw-observability-pipelines-worker.default.svc.cluster.local`.

À ce stade, vos logs devraient être transmis au worker, traités par le pipeline et envoyés vers la destination configurée.
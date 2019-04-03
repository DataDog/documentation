---
categories:
- Google Cloud
- API
- Cloud
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ambassador/README.md
display_name: Ambassador
git_integration_title: ambassador
guid: 71936a65-1a8c-4f6e-a18e-f71d4236182b
integration_title: Ambassador API Gateway
is_public: true
kind: integration
maintainer: hello@datawire.io
manifest_version: 1.0.0
metric_prefix: envoy.
metric_to_check: envoy.server.live
name: ambassador
public_title: Intégration Datadog/Ambassador API Gateway
short_description: Ambassador est une solution open source de passerelle API intégrée nativement à Kubernetes et conçue sur le proxy Envoy.
  on Envoy
support: contrib
supported_os:
- linux
- mac_os
- windows
---

## Présentation

Recueillez des métriques d’[Ambassador][1] en temps réel pour :

* Visualiser les performances de vos microservices

* Comprendre l'incidence des nouvelles versions de vos services lorsque vous utilisez Ambassador pour réaliser un déploiement canari

![snapshot][2]

## Implémentation

Par défaut, Ambassador installe un sidecar `statsd` sur son pod. Ce sidecar transmet la métrique `statsd` à n'importe quel service Kubernetes du nom de `statsd-sink`.

1. Créez un fichier `datadog-statsd-sink.yaml` avec la configuration suivante, en remplaçant la clé d'API ci-dessous par votre propre clé API :

```
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
 name: statsd-sink
spec:
 replicas: 1
 template:
   metadata:
     labels:
       service: statsd-sink
   spec:
     containers:
     - name: statsd-sink
       image: datadog/docker-dd-agent:latest
       ports:
         - containerPort: 8125
           name: dogstatsdport
           protocol: UDP
       env:
         - name: API_KEY
           value: <VOTRE_CLÉ_API_DATADOG>
         - name: KUBERNETES
           value: "yes"
         - name: SD_BACKEND
           value: docker
     restartPolicy: Always
status: {}
---
apiVersion: v1
kind: Service
metadata:
 labels:
   service: statsd-sink
 name: statsd-sink
spec:
 ports:
 - protocol: UDP
   port: 8125
   name: dogstatsdport
 selector:
   service: statsd-sink
```

2. Déployez l'Agent sur Kubernetes :

```
kubectl apply -f datadog-statsd-sink.yaml
```

3. Vos métriques apparaîtront dès que du trafic sera transmis via Ambassador.

## Données collectées

### Métriques
{{< get-metrics-from-git "ambassador" >}}


### Événements

Le check Ambassador ne comprend aucun événement.

### Checks de service

Le check Ambassador n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://www.getambassador.io
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ambassador/images/upstream-req-time.png
[3]: https://github.com/DataDog/integrations-extras/blob/master/ambassador/metadata.csv
[4]: http://docs.datadoghq.com/help/


{{< get-dependencies >}}

---
categories:
- Google Cloud
- API
- Cloud
creates_events: false
ddtype: statsd
display_name: Ambassador
doc_link: https://docs.datadoghq.com/integrations/ambassador/
git_integration_title: ambassador
has_logo: true
integration_title: Ambassador API Gateway
is_public: true
kind: integration
maintainer: hello@datawire.io
manifest_version: 1.0.0
metric_prefix: envoy.
metric_to_check: envoy.server.live
name: ambassador
public_title: Ambassador API Gateway
short_description: Ambassador est une Gateway Open Source native de l'API Kubernetes.
  on Envoy
---

## Aperçu

Obtenez les métriques du service [Ambassador](https://www.getambassador.io) en temps réel pour:

* Visualiser les performances de vos microservices

* Comprendre l'impact des nouvelles versions de vos services lorsque vous utilisez Ambassador pour réaliser un déploiement canari

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ambassador/images/upstream-req-time.png)

## Implémentation

Par défaut, Ambassador installe un sidecar `statsd` sur son pod. Ce sidecar transmet la métrique `statsd` à n'importe quel service Kubernetes nommé `statsd-sink`.

1. Créez un fichier `datadog-statsd-sink.yaml` avec la configuration suivante, en remplaçant la clé API ci-dessous par votre propre clé API:

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
           value: <your_api_key>
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

2. Déployer l'agent sur Kubernetes:

```
kubectl apply -f datadog-statsd-sink.yaml
```

3. Dès que du trafic passe par Ambassador, vos métriques doivent apparaître.

## Données collectées

### Métriques
{{< get-metrics-from-git "ambassador" >}}


### Évènements

L'intégration Ambassador n'inclut aucun événement pour le moment.

### Checks de Service

L'intégration Ambassador n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)


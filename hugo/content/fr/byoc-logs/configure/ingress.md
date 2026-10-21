---
aliases:
- /fr/cloudprem/configure/ingress/
description: Apprenez à configurer et à gérer les ingress controllers pour votre déploiement
  de BYOC Logs
further_reading:
- link: /byoc-logs/ingest/
  tag: Documentation
  text: Configurez l'ingestion de logs
- link: /byoc-logs/operate/monitoring/
  tag: Documentation
  text: Surveiller les logs BYOC
title: Configuration de l'entrée de BYOC Logs
---
## Présentation {#overview}

Ingress est un composant essentiel de votre déploiement de logs BYOC (Bring Your Own Cloud). Le chart Helm crée automatiquement deux configurations d'ingress, appelées public ingress et internal ingress. Si l'AWS Load Balancer Controller est installé sur le cluster, il provisionne un ALB par configuration d'ingress. Chaque équilibreur de charge peut être configuré davantage à l'aide d'annotations d'ingress.

## Public ingress {#public-ingress}

<div class="alert alert-danger">Seuls les endpoints de l'API gRPC BYOC Logs (chemins commençant par <code>/cloudprem</code>) effectuent une authentification TLS mutuelle. Exposer d'autres endpoints via le public ingress présente un risque de sécurité, car ces endpoints seraient accessibles sur Internet sans authentification. Restreignez toujours les endpoints non gRPC à l'ingress interne. </div>

L'ingress public est essentiel pour permettre à Datadog de gérer et d'interroger les clusters BYOC Logs via Internet. Il fournit un accès sécurisé à l'API gRPC BYOC Logs via les mécanismes suivants :
- Crée un AWS Application Load Balancer (ALB) accessible sur Internet, qui accepte le trafic provenant des services Datadog
- Implémente le chiffrement TLS avec terminaison au niveau de l'équilibreur de charge
- Utilise HTTP/2 (gRPC) pour la communication entre l'ALB et le cluster BYOC Logs
- Nécessite une authentification TLS mutuelle (mTLS) où les services Datadog doivent présenter des certificats clients valides
- Configure l'ALB en mode TLS passthrough pour transmettre les certificats clients aux pods BYOC Logs avec l'en-tête `X-Amzn-Mtls-Clientcert`
- Rejette les requêtes dépourvues de certificats clients valides ou de l'en-tête de certificat

Cette configuration garantit que seuls les services Datadog authentifiés peuvent accéder au cluster BYOC Logs tout en maintenant une communication chiffrée sécurisée de bout en bout.

{{< img src="/cloudprem/ingress/cloudprem_public_ingress1.png" alt="Schéma illustrant l'architecture de l'ingress public de BYOC Logs, avec les services Datadog se connectant via un AWS ALB exposé sur Internet utilisant l'authentification mTLS pour accéder à l'API gRPC BYOC Logs." style="width:100%;" >}}

### Liste d'autorisation IP {#ip-allowlisting}

Datadog se connecte aux clusters BYOC Logs en utilisant un ensemble de plages IP fixes, qui peuvent être récupérées pour chaque site Datadog à partir de l'[API des plages IP][1] de Datadog, spécifiquement sous la section « webhooks ». Par exemple, pour récupérer les plages IP pour le site datadoghq.eu, vous pouvez exécuter :

```
curl -X GET "https://ip-ranges.datadoghq.eu/" \
      -H "Accept: application/json" |
      jq '.webhooks'
```

## Ingress interne {#internal-ingress}

L'ingress interne permet l'ingestion de logs à partir des agents Datadog et d'autres collecteurs de logs au sein de votre environnement via HTTP.

{{< img src="/cloudprem/ingress/internal_ingress.png" alt=" Ingress interne avec ALB provisionné par le chart Helm" style="width:100%;" >}}

Par défaut, le chart crée un AWS Application Load Balancer (ALB) interne pour acheminer le trafic HTTP vers les services BYOC Logs appropriés en fonction du chemin de l'endpoint d'API demandé. Cependant, si vous préférez utiliser votre propre ingress controller (tel que HAProxy, NGINX ou Traefik), vous pouvez désactiver l'ALB interne par défaut et configurer votre contrôleur avec les règles de routage suivantes :

```
rules:
- http:
    paths:
      # Ingest (Quickwit, ES, Datadog) endpoints to indexers
      - path: /api/v1/*/ingest
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v1/_elastic/bulk
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v1/_elastic/*/_bulk
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      - path: /api/v2/logs
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-indexer
            port:
              name: rest
      # Index management API endpoints to metastores
      - path: /api/v1/indexes
        pathType: Prefix
        backend:
          service:
            name: <RELEASE_NAME>-metastore
            port:
              name: rest
      # Everything else to searchers
      - path: /*
        pathType: ImplementationSpecific
        backend:
          service:
            name: <RELEASE_NAME>-searcher
            port:
              name: rest

```

{{< img src="/cloudprem/ingress/internal_ingress_nginx_controller.png" alt="Configuration de l'ingress interne de BYOC Logs utilisant le contrôleur ingress NGINX, montrant le routage par chemin vers les services indexer, metastore et searcher" style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/ip-ranges/
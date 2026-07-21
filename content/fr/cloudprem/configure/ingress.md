---
description: Découvrir comment configurer et gérer les contrôleurs d'ingress pour
  votre déploiement CloudPrem
further_reading:
- link: /cloudprem/ingest/
  tag: Documentation
  text: Configurer l'ingestion de logs
- link: /cloudprem/operate/monitoring/
  tag: Documentation
  text: Surveiller CloudPrem
title: Configuration de l'ingress CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en préversion" >}}
  Rejoignez la préversion de CloudPrem pour accéder aux nouvelles fonctionnalités de gestion des logs auto-hébergés.
{{< /callout >}}

## Présentation

L'ingress est un composant essentiel de votre déploiement CloudPrem. Le Helm chart crée automatiquement deux configurations d'ingress appelées ingress public et ingress interne. Si l'AWS Load Balancer Controller est installé sur le cluster, il provisionne un ALB par configuration d'ingress. Chaque répartiteur de charge peut être configuré plus précisément à l'aide d'annotations d'ingress.

## Ingress public

<div class="alert alert-danger">Seuls les endpoints de l'API gRPC CloudPrem (chemins commençant par <code>/cloudprem</code>) effectuent une authentification TLS mutuelle. L'exposition de tout autre endpoint via l'ingress public constitue un risque de sécurité, car ces endpoints seraient accessibles sur Internet sans authentification. Limitez toujours les endpoints non gRPC à l'ingress interne. </div>

L'ingress public est indispensable pour permettre au plan de contrôle et au service de requêtes de Datadog de gérer et d'interroger les clusters CloudPrem via l'internet public. Il fournit un accès sécurisé à l'API gRPC CloudPrem grâce aux mécanismes suivants :
- Crée un AWS Application Load Balancer (ALB) accessible depuis Internet qui accepte le trafic en provenance des services Datadog
- Met en œuvre le chiffrement TLS avec terminaison au niveau du répartiteur de charge
- Utilise HTTP/2 (gRPC) pour la communication entre l'ALB et le cluster CloudPrem
- Requiert une authentification TLS mutuelle (mTLS) où les services Datadog doivent présenter des certificats client valides
- Configure l'ALB en mode passthrough TLS pour transmettre les certificats client aux pods CloudPrem via l'en-tête `X-Amzn-Mtls-Clientcert`
- Rejette les requêtes ne présentant pas de certificats client valides ou l'en-tête de certificat

Cette configuration garantit que seuls les services Datadog authentifiés peuvent accéder au cluster CloudPrem, tout en maintenant une communication chiffrée et sécurisée de bout en bout.

{{< img src="/cloudprem/ingress/cloudprem_public_ingress1.png" alt="Schéma illustrant l'architecture de l'ingress public CloudPrem avec les services Datadog se connectant via un ALB AWS accessible depuis Internet utilisant l'authentification mTLS pour accéder à l'API gRPC CloudPrem" style="width:100%;" >}}

### Liste d'autorisation d'adresses IP

Le plan de contrôle et les services de requêtes Datadog se connectent aux clusters CloudPrem en utilisant un ensemble de plages d'adresses IP fixes, récupérables pour chaque site Datadog depuis l'[API IP Ranges][1] de Datadog, plus précisément dans la section "webhooks". Par exemple, pour récupérer les plages d'adresses IP du site datadoghq.eu, vous pouvez exécuter :
```
curl -X GET "https://ip-ranges.datadoghq.eu/" \
      -H "Accept: application/json" |
      jq '.webhooks'
```

## Ingress interne

L'ingress interne permet l'ingestion de logs depuis des Agents Datadog et d'autres collectors de logs au sein de votre environnement via HTTP.

{{< img src="/cloudprem/ingress/internal_ingress.png" alt="Ingress interne avec ALB provisionné par le Helm chart" style="width:100%;" >}}

Par défaut, le chart crée un AWS Application Load Balancer (ALB) interne pour acheminer le trafic HTTP vers les services CloudPrem appropriés en fonction du chemin de l'endpoint d'API demandé. Toutefois, si vous préférez utiliser votre propre contrôleur d'ingress (tel que HAProxy, NGINX ou Traefik), vous pouvez désactiver l'ALB interne par défaut et configurer votre contrôleur avec les règles de routage suivantes :

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

{{< img src="/cloudprem/ingress/internal_ingress_nginx_controller.png" alt="Configuration de l'ingress interne CloudPrem utilisant le contrôleur d'ingress NGINX, illustrant le routage par chemin vers les services d'indexation, de métastore et de recherche" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/ip-ranges/
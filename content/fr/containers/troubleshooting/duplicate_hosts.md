---
title: Hosts dupliqués avec Kubernetes sur AWS (EC2 ou EKS)
---

Si vous exécutez l'Agent Datadog dans un environnement Kubernetes sur AWS (entièrement autogéré sur EC2 ou géré avec EKS), il se peut que vous rencontriez un problème de hosts dupliqués. L'un des hosts utilise un hostname issu de l'Agent Datadog, tandis que l'autre utilise l'`instance-id` AWS recueilli par l'intégration Datadog/AWS.

## Contexte

Pour résoudre le hostname, l'Agent Datadog interroge l'endpoint de métadonnées EC2 local afin de détecter l'`instance-id` EC2. L'Agent transmet alors cet `instance-id` en tant qu'alias de hostname. Datadog fusionne les données de l'Agent ainsi que celles de l'intégration AWS pour obtenir un seul et même host.

Lorsque l'Agent Datadog ne peut pas interroger l'endpoint de métadonnées EC2, des hostnames dupliqués peuvent apparaître.

## Diagnostic

Utilisez la commande flare de l'Agent afin de générer un flare. Consultez ensuite le fichier `diagnose.log`. Vous y trouverez peut-être une erreur comme celle-ci :

```
=== Running EC2 Metadata availability diagnosis ===
[ERROR] error: unable to fetch EC2 API, Get http://169.254.169.254/latest/meta-data/hostname: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers) - 1563565207662176204
===> FAIL
```

## Remédiation

Mettez à jour votre configuration afin d'autoriser l'accès à l'endpoint de métadonnées EC2.

Si vous utilisez IMDSv2, il vous faudra également :
1. Définir la variable d'environnement `DD_EC2_PREFER_IMDSV2` sur `true`.
2. Augmenter la [limite de hop][1] de `1` à `2`.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html
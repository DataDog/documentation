---
title: "Configuration d'AWS\_PrivateLink pour l'extension Lambda Datadog"
kind: guide
further_reading:
  - link: /agent/guide/private-link/
    tag: Documentation
    text: "Connexion à Datadog via AWS\_PrivateLink"
---
<div class="alert alert-info">
Datadog expose les endpoints AWS PrivateLink sur <b>us-east-1</b>.
</div>

{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog via PrivateLink ne prend pas en charge le site gouvernemental de Datadog.</div>
{{< /site-region >}}

Ce guide vous explique comment configurer l'[extension Lambda Datadog][1] au sein d'un VPC à l'aide d'[AWS PrivateLink][2].

## Présentation

L'extension Lambda Datadog est un processus complémentaire qui permet d'enrichir vos fonctions Lambda afin de recueillir des données telles que des logs, des traces et des métriques, et de les envoyer à Datadog. Pour les fonctions exécutées au sein d'un cloud privé virtuel (VPC), l'accès au réseau peut être restreint par les règles d'acheminement des sous-réseaux ou les ACL réseau, et occasionner ainsi une interdiction d'accès à l'API de Datadog. Cet article décrit la procédure à suivre pour ajouter des endpoints AWS PrivateLink Datadog à votre VPC. Il détaille également comment configurer l'extension Lambda Datadog à cette fin.

## Connecter le VPC aux endpoints PrivateLink Datadog

Ajoutez les endpoints PrivateLink Datadog à votre VPC en suivant les instructions fournies dans le [guide PrivateLink][3]. L'extension nécessite les endpoints de métriques, de logs, d'API et de traces. Pour les régions en dehors de `us-east-1`, nous vous conseillons de configurer la fonctionnalité de [peering inter-régions][4].

## Configuration de l'extension

Par défaut, l'extension utilise des endpoints d'API différents de ceux de l'Agent Datadog. Remplacez les endpoints en définissant les variables d'environnement suivantes sur la fonction Lambda.

```
DD_LOGS_CONFIG_LOGS_DD_URL="agent-http-intake.logs.datadoghq.com:443"
```

Il est également possible de configurer l'extension en ajoutant un fichier [`datadog.yaml`][5] dans le dossier où se trouve le code du gestionnaire Lambda.

```
logs_config:
    logs_dd_url: agent-http-intake.logs.datadoghq.com:443
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/enhanced_lambda_metrics
[2]: https://aws.amazon.com/privatelink/
[3]: /fr/agent/guide/private-link/?tab=metrics#aws-vpc-endpoint
[4]: /fr/agent/guide/private-link/?tab=logs#inter-region-peering
[5]: /fr/agent/guide/agent-configuration-files
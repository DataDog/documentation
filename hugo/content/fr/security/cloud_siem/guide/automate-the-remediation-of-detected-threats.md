---
aliases:
- /fr/security_platform/guide/automate-the-remediation-of-detected-threats/
- /fr/security_platform/cloud_siem/guide/automate-the-remediation-of-detected-threats/
further_reading:
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: Documentation
  text: Commencer à étudier les signaux dans le Signals Explorer
- link: https://learn.datadoghq.com/courses/cloud-siem-automated-remediation
  tag: Centre d'apprentissage
  text: Automatisez l'enquête et la remédiation des menaces avec des workflows de
    sécurité
title: Automatiser la correction des menaces détectées grâce aux webhooks
---
## Présentation {#overview}

[Cloud SIEM][1] vous permet de définir des Detection Rules qui déclenchent des workflows d'auto-remédiation. Avec l'[intégration de webhook][2] de Datadog, configurez des webhooks pour transmettre des charges utiles aux services que vous souhaitez automatiser chaque fois qu'une [Detection Rule][3] est déclenchée. Chaque charge utile de webhook contient des informations sur l'événement déclencheur et un message personnalisé qui peut être utilisé pour déclencher des services en aval. Automatisez les commandes pour tout service disposant d'une URL de webhook. Les outils d'orchestration et d'automatisation de la réponse aux incidents de sécurité acceptent les requêtes HTTP entrantes, et ces webhooks déclenchent tout workflow que vous avez défini.

Choisissez un scénario de sécurité ci-dessous pour commencer à automatiser la correction.

{{% sec-hipaa-limits %}}

## Supprimez les groupes de sécurité mal configurés {#delete-misconfigured-security-groups}

Dans un environnement cloud, il est important de supprimer une ressource mal configurée dès qu'elle est créée. Dans ce scénario, vous pouvez configurer une [intégration de webhook][2] pour envoyer un [webhook][2] au service de gestion d'API de votre fournisseur cloud.

{{< img src="security/security_monitoring/guide/automate-the-remediation-of-detected-threats/automation-diagram.png" alt="Un schéma représentant un webhook envoyé à l'API d'un fournisseur cloud" >}}

Une fois cette intégration configurée, si un utilisateur AWS crée une ressource mal configurée (par exemple, un groupe de sécurité ou un rôle utilisateur trop permissif) au sein de votre environnement AWS, Datadog Log Management ingère le log associé, ce qui déclenche une Detection Rule basée sur le groupe de sécurité. Ce processus envoie automatiquement la charge utile JSON du webhook à l'URL Amazon API Gateway désignée, qui active à son tour une fonction AWS Lambda qui supprime automatiquement la ressource incriminée.

## Bloquez une adresse IP suspecte {#ban-a-suspicious-ip-address}

Une connexion depuis une adresse IP non reconnue peut indiquer qu'un attaquant utilise les identifiants d'un utilisateur de confiance pour accéder à vos données et maintenir un accès persistant à votre environnement.

Pour lutter contre ce type d'attaque, vous pouvez utiliser la [méthode de détection New Value][4], qui analyse les données historiques de votre compte sur une période choisie et émet une alerte lorsque des valeurs jusqu'alors inédites apparaissent dans vos logs cloud.

Commencez par créer une [nouvelle règle de détection][5] à l'aide de la méthode de détection basée sur la valeur.

Ensuite, configurez un [webhook][2] qui envoie une charge utile au service de gestion des identités et des accès (IAM) de votre cloud pour bloquer l'adresse IP inconnue lorsque cette règle est déclenchée.

{{< img src="security/security_monitoring/guide/automate-the-remediation-of-detected-threats/webhook-ip.png" alt="Un nouveau webhook qui bloque une adresse IP inconnue" >}}

Voici un exemple de charge utile d'un webhook pertinent transmise lorsqu'un signal de sécurité est généré par Datadog :

{{< code-block lang="json" filename="webhook-payload.json" >}}
{
  "SECURITY_RULE_NAME": "Request from unexpected IP address",
  "SECURITY_SIGNAL_ID": "abcd1234",
  "SECURITY_SIGNAL_ATTRIBUTES": {
    "network": {
      "client": {
        "ip": [
          "1.2.3.4"
        ]
      }
    }
  }
}
{{< /code-block >}}

## Abus et fraude dans les applications {#application-abuse-and-fraud}

Avec Datadog Cloud SIEM, vous pouvez détecter des schémas d'[abus ou de fraude][6] dans votre application. Par exemple, configurez une [Detection Rule][7] qui est déclenchée lorsqu'un utilisateur tente à plusieurs reprises d'acheter quelque chose dans votre application avec des informations de carte de crédit invalides. Ensuite, configurez un webhook qui envoie une charge utile avec des instructions de remédiation à un service qui désactivera les identifiants de l'utilisateur.

Voici un exemple de charge utile d'un webhook pertinent transmise lorsqu'un signal de sécurité est généré par Datadog :

{{< code-block lang="json" filename="webhook-payload.json" >}}
{
  "SECURITY_RULE_NAME": "Fraudulent Credit Card Authorizations",
  "SECURITY_SIGNAL_ID": "efgh5678",
  "SECURITY_SIGNAL_ATTRIBUTES": {
    "usr": {
      "id": "john.doe@your_domain.com"
    },
    "evt": {
      "name": "credit_card_authorization",
      "outcome": "fail"
    },
    "network": {
      "client": {
        "ip": [
          "1.2.3.4"
        ]
      }
    }
  }
}
{{< /code-block >}}

Datadog génère le Security Signal, qui détaille l'activité suspecte ainsi que les informations sur l'utilisateur suspect, telles que son adresse IP et son identifiant utilisateur, et la charge utile du webhook envoie des instructions de remédiation à un service pour désactiver les identifiants de l'utilisateur.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/
[2]: https://app.datadoghq.com/account/settings#integrations/webhooks
[3]: /fr/security/detection_rules/
[4]: https://www.datadoghq.com/blog/new-term-detection-method-datadog/
[5]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/?cloud_siem_detection_rule_detection_method=new_value
[6]: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
[7]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/#define-your-search-query
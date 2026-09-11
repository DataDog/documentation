---
aliases:
- /fr/security_platform/guide/automate-the-remediation-of-detected-threats/
- /fr/security_platform/cloud_siem/guide/automate-the-remediation-of-detected-threats/
further_reading:
- link: /security/explorer/
  tag: Documentation
  text: Commencer à étudier les signaux dans le Signals Explorer
title: Automatiser la correction des menaces détectées grâce aux webhooks
---

## Présentation

La solution [Cloud SIEM][1] vous permet de définir des règles de détection qui déclenchent des workflows de correction automatique. À l'aide de l'[intégration dédiée][2], vous pouvez configurer des webhooks afin de transmettre des charges utiles aux services à automatiser à chaque déclenchement d'une [règle de détection][3]. Chaque charge utile de webhook contient des informations à propos de l'événement à l'origine du déclenchement ainsi qu'un message personnalisé pouvant servir à initier des services en aval. Vous pouvez automatiser des commandes pour tous les services disposant d'une URL de webhook. Les outils d'orchestration de la sécurité et de réponse automatique acceptent les requêtes HTTP entrantes. Vos webhooks initient les workflows que vous avez définis.

Choisissez un scénario de sécurité ci-dessous pour commencer à automatiser la correction.

## Supprimer des groupes de sécurité mal configurés

Il est important de supprimer le plut tôt possible une ressource mal configurée dans un environnement cloud. Dans ce scénario, vous pouvez configurer une [intégration Webhook][2] pour envoyer un [webhook][2] au service de gestion des API de votre fournisseur de cloud.

{{< img src="security/security_monitoring/guide/automate-the-remediation-of-detected-threats/automation-diagram.png" alt="Diagramme illustrant un webhook envoyé à l'API d'un fournisseur de cloud" >}}

Une fois l'intégration configurée, si un utilisateur AWS crée une ressource avec une mauvaise configuration (par exemple, un groupe de sécurité ou un rôle utilisateur trop permissif) dans votre environnement AWS, la solution Log Management Datadog ingère le log associé, ce qui déclenche une règle de détection basée sur les groupes de sécurité. Ce processus envoie automatiquement la charge utile JSON du webhook à l'URL AWS API Gateway désignée, qui active à son tour une fonction AWS Lambda supprimant automatiquement la ressource dangereuse.

## Bannir une adresse IP suspecte

Une connexion depuis une adresse IP non reconnue peut provenir d'une personne malveillante manipulant les identifiants d'un utilisateur de confiance, dans le but d'accéder à vos données et d'obtenir un accès persistant à votre environnement.

Pour vous défendre contre ce type d'attaque, vous pouvez utiliser la [nouvelle méthode de détection basée sur les valeurs][4]. Cette approche vous permet d'analyser les données historiques de votre compte sur une période donnée et d'envoyer des alertes à propos des valeurs observées pour la première fois dans vos logs cloud.

Commencez par créer une [nouvelle règle de détection][5] à l'aide de la méthode de détection basée sur la valeur.

Configurez ensuite un [webhook][2] qui envoie une charge utile au service de gestion des accès et des identités (IAM) de votre cloud afin de bannir l'IP inconnue lors du déclenchement de cette règle.

{{< img src="security/security_monitoring/guide/automate-the-remediation-of-detected-threats/webhook-ip.png" alt="Nouveau webhook qui bannit une adresse IP inconnue" >}}

Voici un exemple de charge utile transmise par un webhook pertinent lorsqu'un signal de sécurité est généré par Datadog :

{{< code-block lang="json" filename="webhook-payload.json" >}}
{
  "SECURITY_RULE_NAME": "Requête provenant d'une adresse IP inattendue",
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

## Utilisation abusive ou inappropriée d'une application

Grâce à la solution Cloud SIEM de Datadog, vous pouvez identifier des tendances d'[abus ou de fraude][6] dans l'ensemble de votre application. Par exemple, vous pouvez définir une [règle de détection][7] qui se déclenche lorsqu'un utilisateur tente à plusieurs reprises d'acheter un article dans votre application avec des coordonnées bancaires non valides. Configurez ensuite un webhook qui envoie une charge utile avec des instructions de correction au service qui désactivera les identifiants de l'utilisateur.

Voici un exemple de charge utile transmise par un webhook pertinent lorsqu'un signal de sécurité est généré par Datadog :

{{< code-block lang="json" filename="webhook-payload.json" >}}
{
  "SECURITY_RULE_NAME": "Autorisations de carte bancaire frauduleuse",
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

Datadog génère un signal de sécurité qui détaille l'attaque ainsi que les informations de l'utilisateur suspect, comme son adresse IP et son ID. La charge utile du webhook envoie des instructions de correction à un service afin qu'il désactive les identifiants de l'utilisateur.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/
[2]: https://app.datadoghq.com/account/settings#integrations/webhooks
[3]: /fr/security/detection_rules/
[4]: https://www.datadoghq.com/blog/new-term-detection-method-datadog/
[5]: /fr/security/cloud_siem/log_detection_rules/?tab=threshold#new-term
[6]: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
[7]: /fr/security/cloud_siem/log_detection_rules/?tab=threshold#define-a-search-query
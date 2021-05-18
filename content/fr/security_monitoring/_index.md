---
title: Security Monitoring
kind: documentation
---

## Présentation

La solution Security Monitoring de Datadog est une plateforme destinée à la fois aux équipes dev, ops et sécurité. Un dashboard unique affiche le contenu devops, les métriques métier et les informations de sécurité.

{{< img src="security_platform/security_monitoring/overview_top.png" alt="Security Monitoring de Datadog" >}}

Datadog détecte les menaces grâce à des règles activées par défaut et peut informer votre équipe des problèmes de sécurité par e-mail, sur Slack, Jira ou PagerDuty, ou via un webhook.

{{< img src="security_platform/security_monitoring/takeover_ex.png" alt="Exemple avec Slack"  style="width:75%;">}}

Datadog détecte toutes sortes de menaces pour votre application ou infrastructure. Il peut par exemple s'agir d'une attaque ciblée, d'une adresse IP communiquant avec vos systèmes alors qu'elle fait partie d'une liste noire, ou d'une configuration non sécurisée. Ces menaces sont affichées dans Datadog sous forme de signaux de sécurité et peuvent être mises en corrélation et triées dans le [Security Signals Explorer][1].

{{< img src="security_platform/security_monitoring/explorer.png" alt="Security Signals Explorer"  >}}

Les signaux de sécurité sont générés par la solution Security Monitoring de Datadog grâce à des [règles de détection][2]. Ces règles détectent les menaces au sein de différentes sources et sont disponibles par défaut pour une utilisation immédiate. Chaque règle de détection peut être clonée afin de modifier la configuration. Vous avez également la possibilité de créer une [nouvelle règle][3].

{{< img src="security_platform/security_monitoring/det_rules.png" alt="Security Signals Explorer" >}}

{{< whatsnext desc="Cette section aborde les sujets suivants :">}}
  {{< nextlink href="/security_monitoring/getting_started">}}<u>Débuter</u> : Découvrez les grands concepts de la solution Security Monitoring de Datadog, activez la détection de menaces et explorez les règles de détection des menaces par défaut.{{< /nextlink >}}
  {{< nextlink href="/security_monitoring/detection_rules">}}<u>Règles de détection</u> : Configurez des règles de détection pour définir les conditions de détection des menaces et des comportements suspects dans tous les logs ingérés.{{< /nextlink >}}
  {{< nextlink href="/security_monitoring/explorer">}}<u>Signals Explorer</u> : Recherchez, visualisez et triez vos signaux de sécurité.{{< /nextlink >}}
  {{< nextlink href="/security_monitoring/default_rules">}}<u>Règles par défaut</u> : Utilisez les règles de détection proposées par défaut pour identifier les attaques et les vulnérabilités dues à une mauvaise configuration potentielle, et ainsi améliorer votre sécurité sans attendre.{{< /nextlink >}}

{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/configuration/rules
[3]: https://app.datadoghq.com/security/configuration/rules/new

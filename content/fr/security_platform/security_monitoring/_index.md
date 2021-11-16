---
title: Security Monitoring
kind: documentation
---

## Présentation

{{< img src="security_platform/security_monitoring/overview_top.png" alt="Security Monitoring Datadog" >}}

La solution Security Monitoring de Datadog est une plateforme destinée à la fois aux équipes dev, ops et sécurité. Un dashboard unique présente le contenu DevOps, les métriques métier et les informations de sécurité. Détectez en temps réel les menaces pesant sur votre application et votre infrastructure, comme les attaques ciblées, les adresses IP communiquant avec vos systèmes alors qu'elles font partie d'une liste noire ou encore les configurations non sécurisées, et informez votre équipe des problèmes de sécurité, que ce soit par e-mail ou via Slack, Jira, PagerDuty ou un webhook.

{{< img src="security_platform/security_monitoring/takeover_ex.png" alt="Exemple avec Slack"  style="width:75%;">}}

Les menaces s'affichent dans Datadog sous la forme de signaux de sécurité, qui peuvent être corrélés et triés depuis le [Security Signals Explorer][1]. Les signaux de sécurité sont générés par la solution Security Monitoring de Datadog, grâce aux [règles de détection][2]. Ces règles sont fournies clés en main et permettent de détecter les menaces provenant de différentes sources. Vous pouvez dupliquer l'une des règles de détection fournies pour modifier sa configuration. Il est également possible de créer de toute pièce une [nouvelle règle][3] qui répond à vos besoins spécifiques.

{{< img src="security_platform/security_monitoring/explorer.png" alt="Security Signals Explorer"  >}}

## Prise en main

{{< whatsnext >}}
  {{< nextlink href="/security_platform/security_monitoring/getting_started">}}Débuter avec le Security Monitoring{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules">}}Commencer à utiliser des règles de sécurité prêtes à l'emploi dans votre environnement{{< /nextlink >}}
  {{< nextlink href="/security_platform/detection_rules">}}Découvrir comment créer des règles de détection personnalisées{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/configuration/rules
[3]: https://app.datadoghq.com/security/configuration/rules/new

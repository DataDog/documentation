---
title: "Cloud\_SIEM"
kind: documentation
aliases:
  - /fr/security_monitoring/
---
## Présentation

La solution Cloud SIEM (Security Information and Event Management, Gestion des événements et des informations de sécurité) de Datadog est une plateforme destinée à la fois aux équipes dev, ops et sécurité. Un dashboard unique présente le contenu DevOps, les métriques métier et les informations de sécurité. Détectez en temps réel les menaces pesant sur votre application et votre infrastructure, comme les attaques ciblées, les adresses IP communiquant avec vos systèmes alors qu'elles font partie d'une liste noire ou encore les configurations non sécurisées, et informez votre équipe des problèmes de sécurité, que ce soit par e-mail ou via Slack, Jira, PagerDuty ou un webhook.

{{< img src="security_platform/security_monitoring/overview_top.png" alt="Signaux Cloud SIEM dans Datadog" >}}

Les menaces s'affichent dans Datadog sous la forme de signaux de sécurité, qui peuvent être corrélés et triés depuis le [Security Signals Explorer][1]. Les signaux de sécurité sont générés par la solution Cloud SIEM de Datadog, grâce aux [règles de détection][2]. Ces règles sont fournies clés en main et permettent de détecter les menaces provenant de différentes sources. Vous pouvez dupliquer l'une des règles de détection fournies pour modifier sa configuration. Il est également possible de créer de toute pièce une [nouvelle règle][3] qui répond à vos besoins spécifiques.

{{< img src="security_platform/security_monitoring/custom_rule.png" alt="Configuration d'une règle personnalisée dans Datadog"  >}}

## Prise en main

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cloud_siem/getting_started">}}Configurer Cloud SIEM{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules#cat-log-detection">}}Commencer à utiliser des règles de détection Cloud SIEM prêtes à l'emploi{{< /nextlink >}}
  {{< nextlink href="/security_platform/detection_rules">}}Créer vos propres règles de détection personnalisées{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/security_platform/cloud_siem/security_home/
[2]: /fr/security_platform/default_rules#cat-log-detection
[3]: /fr/security_platform/detection_rules
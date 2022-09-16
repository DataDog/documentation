---
aliases:
- /fr/security_monitoring/
further_reading:
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Concevoir une stratégie de conformité, gouvernance et transparence pour toutes
    vos équipes avec les journaux d'audit Datadog
kind: documentation
title: Cloud SIEM
---

## Présentation

La solution Cloud SIEM (Security Information and Event Management, Gestion des événements et des informations de sécurité) de Datadog est une plateforme destinée à la fois aux équipes dev, ops et sécurité. Un dashboard unique présente le contenu DevOps, les métriques métier et les informations de sécurité. Détectez en temps réel les menaces pesant sur votre application et votre infrastructure, comme les attaques ciblées, les adresses IP communiquant avec vos systèmes alors qu'elles font partie d'une liste noire ou encore les configurations non sécurisées, et informez votre équipe des problèmes de sécurité, que ce soit par e-mail ou via Slack, Jira, PagerDuty ou un webhook.

{{< img src="security_platform/security_monitoring/signals_page.png" alt="La page Signals de Cloud SIEM, avec un filtre basé sur le type de règle de détection des logs, un graphique à barres représentant le statut des signaux ainsi qu'une liste de signaux" >}}

Les menaces s'affichent dans Datadog sous la forme de signaux de sécurité, qui peuvent être corrélés et triés depuis le [Security Signals Explorer][1]. Les signaux de sécurité sont générés par la solution Cloud SIEM de Datadog, grâce aux [règles de détection][2]. Ces règles sont fournies clés en main et permettent de détecter les menaces provenant de différentes sources. Vous pouvez dupliquer l'une des règles de détection fournies pour modifier sa configuration. Il est également possible de créer de toute pièce une [nouvelle règle][3] qui répond à vos besoins spécifiques.

{{< img src="security_platform/security_monitoring/new_detection_rule.png" alt="La page de création d'une règle de détection, avec une règle de détection de logs basée sur un seuil sélectionnée" style="width:65%;" >}}

## Prise en main

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cloud_siem/getting_started">}}Configurer Cloud SIEM{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules#cat-cloud-siem">}}Commencer à utiliser des règles de détection Cloud SIEM prêtes à l'emploi{{< /nextlink >}}
  {{< nextlink href="/security_platform/detection_rules">}}Créer vos propres règles de détection personnalisées{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security_platform/explorer
[2]: /fr/security_platform/default_rules#cat-cloud-siem
[3]: /fr/security_platform/detection_rules
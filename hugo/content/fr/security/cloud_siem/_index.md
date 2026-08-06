---
aliases:
- /fr/security_monitoring/
- /fr/security_platform/cloud_siem/security_home/
- /fr/security_platform/cloud_siem/
- /fr/security/cloud_siem/security_home/
further_reading:
- link: https://www.datadoghq.com/blog/track-issues-datadog-case-management/
  tag: Blog
  text: Suivez, triez et attribuez les problèmes de manière proactive avec la solution
    Case Management de Datadog
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: Blog
  text: Automatiser les tâches de sécurité courantes et anticiper les menaces avec
    les workflows Datadog et Cloud SIEM
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Concevoir une stratégie de conformité, gouvernance et transparence pour toutes
    vos équipes avec le journal d'audit Datadog
- link: https://www.datadoghq.com/blog/aws-threat-emulation-detection-validation-datadog/
  tag: Blog
  text: Émulation des menaces AWS et validation des détections avec Stratus Red Team
    et Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Surveiller 1Password avec la solution Cloud SIEM de Datadog
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: Blog
  text: Mettre en place une couverture de sécurité suffisante pour votre environnement
    dans le cloud
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Surveiller les logs de DNS pour analyser le réseau et la sécurité
title: Cloud SIEM
---
## Présentation

La solution Cloud SIEM (Security Information and Event Management, Gestion des événements et des informations de sécurité) de Datadog est une plateforme destinée à la fois aux équipes dev, ops et sécurité. Un dashboard unique présente le contenu DevOps, les métriques métier et les informations de sécurité. Détectez en temps réel les menaces pesant sur votre application et votre infrastructure, comme les attaques ciblées, les adresses IP communiquant avec vos systèmes alors qu'elles font partie d'une liste noire ou encore les configurations non sécurisées, et informez votre équipe des problèmes de sécurité, que ce soit par e-mail ou via Slack, Jira, PagerDuty ou un webhook.

{{< img src="security/security_monitoring/cloud_siem_overview_2.png" alt="Page d'accueil de Cloud SIEM affichant la section Security Overview. Des widgets dédiés aux signaux importants, aux acteurs suspects, aux ressources affectées, aux informations sur les menaces et aux tendances des signaux sont visibles." >}}

Les menaces s'affichent dans Datadog sous la forme de signaux de sécurité, qui peuvent être corrélés et triés depuis le [Security Signals Explorer][1]. Les signaux de sécurité sont générés par la solution Cloud SIEM de Datadog, grâce aux [règles de détection][2]. Ces règles sont fournies clés en main et permettent de détecter les menaces provenant de différentes sources. Vous pouvez dupliquer l'une des règles de détection fournies pour modifier sa configuration. Il est également possible de créer de toute pièce une [nouvelle règle][3] qui répond à vos besoins spécifiques.

## Prise en main

{{< whatsnext desc="Consultez les documents suivants pour bien débuter avec Cloud SIEM :" >}}
  {{< nextlink href="/getting_started/cloud_siem/">}}Débuter avec Cloud SIEM{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/">}}Configurer AWS pour Cloud SIEM{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/">}}Configurer Google Cloud pour Cloud SIEM{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/azure-config-guide-for-cloud-siem/">}}Configurer Azure pour Cloud SIEM{{< /nextlink >}}
  {{< nextlink href="/integrations/">}}Rechercher des intégrations spécifiques afin de configurer la collecte de logs sur celles-ci{{< /nextlink >}}
  {{< nextlink href="/security/default_rules#cat-cloud-siem-log-detection">}}Commencer à utiliser les règles de détection Cloud SIEM prêtes à l'emploi{{< /nextlink >}}
  {{< nextlink href="/security/detection_rules">}}Créer vos propres règles de détection personnalisées{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/investigate_security_signals
[2]: /fr/security/default_rules#cat-cloud-siem
[3]: /fr/security/detection_rules
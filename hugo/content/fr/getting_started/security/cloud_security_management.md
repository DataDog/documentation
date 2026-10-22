---
aliases:
- /fr/getting_started/cloud_security_management
description: Déployez Datadog Cloud Security pour une visibilité unifiée sur l'ensemble
  de votre infrastructure. Configurez la détection des menaces, les mauvaises configurations,
  les risques liés aux identités et les vulnérabilités.
further_reading:
- link: /security/cloud_security_management/
  tag: Documentation
  text: Cloud Security
- link: /infrastructure/resource_catalog/schema/
  tag: Documentation
  text: Référence sur le schéma des ressources cloud
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: Blog
  text: Automatiser des processus de bout en bout avec les workflows Datadog
- link: https://www.datadoghq.com/blog/detecting-leaked-credentials/
  tag: Blog
  text: Comment nous détectons et notifions les utilisateurs en cas de fuite des informations
    d'identification de Datadog
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour améliorer votre sécurité et optimiser
    la détection des menaces
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Recherche en matière de sécurité, rapports, conseils et vidéos de Datadog
- link: https://learn.datadoghq.com/courses/csm-misconfigurations
  tag: Centre d'apprentissage
  text: Recherchez et corrigez les ressources cloud vulnérables à l'aide de Cloud
    Security Misconfigurations.
title: Premiers pas avec Cloud Security
---
## Présentation {#overview}

[Datadog Cloud Security][1] offre une visibilité approfondie, des audits de configuration continus, des évaluations des risques liés aux identités, la détection des vulnérabilités et la détection des menaces en temps réel sur l'ensemble de votre infrastructure cloud, le tout au sein d'une plateforme unifiée pour une collaboration fluide et une remédiation plus rapide.

Avec Cloud Security, les équipes de sécurité et DevOps peuvent agir sur le contexte partagé des données d'observabilité et de sécurité pour prioriser et corriger rapidement les problèmes. Ce guide vous présente les meilleures pratiques pour permettre à votre équipe de démarrer avec Cloud Security.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">L'analyse Agentless n'est pas disponible sur le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Phase 1 : Déploiement {#phase-1-deployment}

1. En utilisant [Agentless][34] et/ou le [Datadog Agent (version 7.46 ou supérieure)][4], [activez Cloud Security pour vos ressources cloud et votre infrastructure][5] :
    - **[Menaces][3]** : installations sur Kubernetes, Docker et hosts.
    - **[Mauvaises configurations][2]** : instructions pour AWS, Azure, GCP, OCI, Kubernetes et Docker.
    - **[Risques liés aux identités][28]** : activez la collecte des ressources AWS et le transfert des logs CloudTrail.
    - **[Vulnérabilités][6]** : instructions d'analyse des images de conteneurs et des hosts pour AWS, Azure, Kubernetes, les instances ECS EC2 et les installations sur hosts.
1. Consultez la [page d'accueil de Cloud Security][13] pour obtenir une vue d'ensemble des risques et des menaces de votre organisation.
1. Examinez [plus de 500 règles de détection des menaces et des mauvaises configurations prêtes à l'emploi][14].
1. Examinez les [résultats des mauvaises configurations Cloud Security][16].
1. Examinez et corrigez les risques liés aux identités sur la page [{{< ui >}}Identity Risks{{< /ui >}}][29].
1. Examinez les vulnérabilités des conteneurs sur la page [{{< ui >}}Container Images{{< /ui >}}][25], ainsi qu'une liste consolidée des vulnérabilités sur la page [{{< ui >}}Infrastructure Vulnerability{{< /ui >}}][30].
1. Configurez des [règles de notification][17] et recevez des alertes via Slack, Jira, e-mail, et plus encore.

## Phase 2 : Personnalisation {#phase-2-customization}

1. Configurez des [règles de suppression de Workload Protection][18] pour réduire le bruit.
2. Créez des règles de détection personnalisées pour les [mauvaises configurations Cloud Security][19] et la [Workload Protection][20].

## Phase 3 : Rapports et dashboards {#phase-3-reports-and-dashboards}

1. Évaluez la posture de votre organisation en examinant les [rapports de conformité][21].
2. Utilisez les dashboards prêts à l'emploi ou [créez les vôtres][22] pour accélérer les enquêtes, la production des rapports et la surveillance.
3. Abonnez-vous aux rapports hebdomadaires du [résumé de sécurité][31] pour commencer l'enquête et la remédiation des problèmes de sécurité les plus importants découverts au cours des sept derniers jours. 

## Désactivez Cloud Security {#disable-cloud-security}

Pour plus d'informations sur la désactivation de Cloud Security, consultez les éléments suivants :

- [Désactivez Cloud Security Vulnerabilities][32]
- [Désactivez Workload Protection][33]

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/
[2]: /fr/security/cloud_security_management/misconfigurations/
[3]: /fr/security/threats/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: /fr/security/cloud_security_management/setup
[6]: /fr/security/cloud_security_management/vulnerabilities/
[13]: https://app.datadoghq.com/security/csm
[14]: /fr/security/default_rules/#cat-cloud-security-management
[16]: /fr/security/cloud_security_management/misconfigurations/findings/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: /fr/security/cloud_security_management/guide/tuning-rules/
[19]: /fr/security/cloud_security_management/misconfigurations/custom_rules
[20]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-a-custom-detection-rule
[21]: /fr/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[22]: /fr/dashboards/#overview
[25]: https://app.datadoghq.com/containers/images
[26]: /fr/integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[27]: /fr/integrations/amazon_cloudtrail/#send-logs-to-datadog
[28]: /fr/security/cloud_security_management/identity_risks/
[29]: https://app.datadoghq.com/security/identities
[30]: https://app.datadoghq.com/security/infra-vulnerability
[31]: https://app.datadoghq.com/security/configuration/reports
[32]: /fr/security/cloud_security_management/troubleshooting/vulnerabilities/#disable-cloud-security-vulnerabilities
[33]: /fr/security/workload_protection/troubleshooting/threats/#disable-csm-threats
[34]: /fr/security/cloud_security_management/setup/cloud_integrations
---
aliases:
- /fr/compliance_monitoring
- /fr/cloud_siem
- /fr/security_platform
- /fr/security/security_monitoring
- /fr/security_monitoring/explorer/
- /fr/cloud_siem/explorer/
- /fr/security_platform/explorer
- /fr/security/explorer
- /fr/security_platform/security_signal_management
- /fr/security/security_signal_management
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance
  tag: Notes de version
  text: Découvrez les dernières versions de la plateforme de sécurité Datadog (connexion
    à l'application requise).
- link: https://www.datadoghq.com/guided-tour/security/
  tag: Visite guidée
  text: Regarder la visite guidée d'un produit
- link: /getting_started/cloud_siem
  tag: Documentation
  text: Commencer à détecter les menaces avec Cloud SIEM
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentation
  text: Commencer à surveiller les problèmes de configuration avec CSM Misconfigurations
- link: /security/threats/setup
  tag: Documentation
  text: Identifier les menaces au niveau du kernel avec CSM Threats
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Découvrir des articles sur la sécurité Datadog du blog Security Labs
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour améliorer votre sécurité et optimiser
    la détection des menaces
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: Blog
  text: Renforcer l'efficacité de la détection des menaces AWS avec Stratus Red Team
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: Blog
  text: Meilleures pratiques pour la sécurité de vos applications Kubernetes
- link: https://www.datadoghq.com/blog/securing-cloud-native-infrastructure-network-perimeter/
  tag: Blog
  text: Meilleures pratiques en matière de sécurité du périmètre réseau dans des environnements
    cloud natifs
- link: https://www.datadoghq.com/blog/securing-data-in-cloud-native-infrastructure/
  tag: Blog
  text: Meilleures pratiques en matière de sécurité des données au sein d'une infrastructure
    cloud native
- link: https://www.datadoghq.com/blog/chaos-engineering-for-security/
  tag: Blog
  text: 'Ingénierie du chaos : expériences sur la sécurité dans le cloud'
- link: https://www.datadoghq.com/blog/datadogs-approach-devsecops/
  tag: Blog
  text: 'DevSecOps : la vision de Datadog'
title: Plateforme de sécurité Datadog
---

## Présentation

Améliorez la rapidité et l'évolutivité des opérations liées à la sécurité de votre environnement de production. La plateforme de sécurité Datadog détecte les menaces en temps réel et effectue sans cesse des audits de configuration au niveau des applications, hosts, conteneurs et infrastructures cloud. En conjonction avec la plateforme globale d'observabilité Datadog, la plateforme de sécurité Datadog offre une intégration incomparable entre la sécurité et les opérations qui s'aligne sur les objectifs communs de votre organisation.

La plateforme de sécurité Datadog comprend les solutions [Application Security Management](#application-security-management), [Cloud SIEM](#cloud-siem) et [Cloud Security Management](#cloud-security-management). Pour en savoir plus, regardez la [visite guidée de 30 secondes de la solution][14].

## Application Security Management

[Application Security Management][1] (ASM) vous permet d'observer les attaques contre les applications visant à tirer profit de vulnérabilités au niveau du code, telles que la falsification de requête côté serveur (SSRF), l'injection SQL, l'exploitation de vulnérabilité Log4Shell et les scripts intersites (XSS) réfléchis. ASM repose sur la solution [APM Datadog][2], l'[Agent Datadog][3] et les règles intégrées pour détecter les menaces envers l'environnement de votre application. Regardez la [visite guidée](https://www.datadoghq.com/guided-tour/security/application-security-management/) du produit pour en savoir plus.

{{< img src="/security/application_security/app-sec-landing-page.png" alt="Un volet de signal de sécurité dans Datadog affichant des flux d'attaques et flamegraphs" width="75%">}}

## Cloud SIEM

[Cloud SIEM][4] (Security Information and Event Management) détecte en temps réel les menaces envers votre application et votre infrastructure. Il peut par exemple s'agir d'une attaque ciblée, d'une adresse IP communiquant avec vos systèmes alors qu'elle fait partie d'une liste noire, ou d'une configuration non sécurisée. Cloud SIEM fonctionne conjointement avec la solution [Log Management de Datadog][5]. Cette association vous permet d'[automatiser la remédiation des menaces détectées par Cloud SIEM][6], afin d'accélérer vos processus de gestion des menaces. Regardez la [visite guidée](https://www.datadoghq.com/guided-tour/security/cloud-siem/) du produit pour en savoir plus.

{{< img src="security/security_monitoring/cloud_siem_overview_2.png" alt="Page d'accueil de Cloud SIEM affichant la section Security Overview. Des widgets dédiés aux signaux importants, aux acteurs suspects, aux ressources affectées, aux informations sur les menaces et aux tendances des signaux sont visibles." width="100%">}}

## Cloud Security Management

La solution [Cloud Security Management (CSM)][10] détecte les menaces en temps réel et effectue des audits de configuration en continu sur toute votre infrastructure cloud. Les résultats sont ensuite affichés dans une vue unifiée pour faciliter la collaboration et accélérer les mesures de remédiation. Grâce aux données d'observabilité fournies, les équipes de sécurité peuvent rapidement déterminer l'impact d'une menace en retraçant le processus d'attaque complet et identifier le propriétaire de la ressource concernée par la vulnérabilité.

La solution CSM comprend les produits [Threats][12], [Misconfigurations][11], [Identity Risks][15] et [Vulnerabilities][16]. Pour en savoir plus, regardez la [visite guidée][13].

{{< img src="security/csm/csm_overview_2.png" alt="La section Security de la vue d'ensemble de Cloud Security Management, avec la liste des problèmes de sécurité triés par importance" width="100%">}}

Pour commencer à utiliser la plateforme de sécurité Datadog, accédez à la page [**Security** > **Setup**][9] de Datadog. Celle-ci comporte des informations détaillées sur les configurations uniques ou multiples. Vous pouvez également consulter les guides ci-dessous pour approfondir vos connaissances sur chaque composante de la plateforme.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/application_security/
[2]: /fr/tracing/
[3]: /fr/agent/
[4]: /fr/security/cloud_siem
[5]: /fr/logs/
[6]: https://www.datadoghq.com/blog/automated-vulnerability-remediation-datadog/
[9]: https://app.datadoghq.com/security/configuration
[10]: /fr/security/cloud_security_management/
[11]: /fr/security/cloud_security_management/misconfigurations/
[12]: /fr/security/threats/
[13]: https://www.datadoghq.com/guided-tour/security/cloud-security-management/
[14]: https://www.datadoghq.com/guided-tour/security/
[15]: /fr/security/cloud_security_management/identity_risks/
[16]: /fr/security/cloud_security_management/vulnerabilities/
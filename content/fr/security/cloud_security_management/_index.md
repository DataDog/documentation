---
aliases:
- /fr/security_platform/cloud_security_management/
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance
  tag: Notes de version
  text: Découvrir les nouveautés de Datadog Security Compliance
- link: /security/cspm/setup
  tag: Documentation
  text: Commencer à surveiller les problèmes de configuration avec Cloud Security
    Posture Management
- link: /security/cloud_workload_security/setup
  tag: Documentation
  text: Identifier les menaces au niveau du kernel avec Cloud Workload Security
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: GitHub
  text: Renforcer l'efficacité de la détection des menaces AWS avec Stratus Red Team
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: GitHub
  text: Meilleures pratiques pour la sécurité de vos applications Kubernetes
- link: https://www.datadoghq.com/blog/security-context-with-datadog-cloud-security-management/
  tag: GitHub
  text: Ajouter le contexte de sécurité à vos données d'observabilité avec Datadog
    Cloud Security Management
- link: https://www.datadoghq.com/blog/security-labs-ruleset-launch/
  tag: GitHub
  text: Corriger les problèmes de sécurité courants du cloud avec le jeu de règles
    Datadog Security Labs
- link: https://www.datadoghq.com/blog/securing-cloud-native-applications/
  tag: GitHub
  text: Pratiques de sécurité recommandées pour les applications dans des environnements
    cloud natifs
title: Cloud Security Management
---

## Présentation

La solution Cloud Security Management de Datadog détecte les menaces en temps réel et effectue des audits de configuration en continu sur toute votre infrastructure cloud. Les résultats sont ensuite affichés dans une vue unifiée pour faciliter la collaboration et accélérer les mesures de remédiation. Grâce aux données d'observabilité fournies, les équipes de sécurité peuvent rapidement déterminer l'impact d'une menace en retraçant le processus d'attaque complet et identifier le propriétaire de la ressource concernée par la vulnérabilité. Les ingénieurs peuvent également surveiller en permanence les risques de sécurité en incorporant des métriques de sécurité dans leur workflow existant.

Cloud Security Management comprend les solutions [Cloud Security Posture Management (CSPM)](#cloud-security-posture-management) et [Cloud Workload Security (CWS)](#cloud-workload-security).

{{< img src="security/csm_overview.png" alt="Cloud Security Management dans Datadog" width="100%">}}


## Cloud Security Posture Management

[Cloud Security Posture Management (CSPM)][1] surveille l'état de la sécurité et le niveau de conformité de votre environnement de production. Cette solution vous permet d'automatiser la collecte de preuves d'audit et de détecter les problèmes de configuration qui rendent votre organisation vulnérable aux attaques. Consultez vos scores de posture de sécurité pour l'ensemble de votre infrastructure et comparez-les aux exigences du benchmark ou framework pertinent.

{{< img src="security/cspm_overview.png" alt="Scores Cloud Security Posture Management dans Datadog" width="100%">}}

## Cloud Workload Security

[Cloud Workload Security (CWS)][2] surveille les activités liées aux fichiers et processus dans votre environnement afin de détecter les menaces envers votre infrastructure, comme les instances AWS EC2, et envers les workloads, comme les clusters Kubernetes, en temps réel au niveau du kernel. Puisque cette solution tire profit de l'Agent Datadog unifié, vous n'avez pas besoin de provisionner des ressources supplémentaires si vous surveillez déjà votre environnement avec Datadog.

{{< img src="security/cws_overview.png" alt="Vues de la couverture Cloud Workload Security dans Datadog" width="100%">}}

Pour commencer à utiliser la plateforme de sécurité Datadog, accédez à la section [Setup & Configuration][3] de Datadog. Celle-ci comporte des informations détaillées sur les configurations uniques ou multiples. Vous pouvez également consulter les guides ci-dessous pour approfondir vos connaissances sur chaque composante de la plateforme.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cspm/
[2]: /fr/security/cloud_workload_security/
[3]: https://app.datadoghq.com/security/configuration
---
aliases:
- /fr/compliance_monitoring
- /fr/cloud_siem
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance
  tag: Notes de version
  text: Découvrez les dernières versions de la plateforme de sécurité Datadog (connexion
    à l'application requise).
- link: /security_platform/cloud_siem/getting_started
  tag: Documentation
  text: Commencer à détecter les menaces avec Cloud SIEM
- link: /security_platform/cspm/getting_started
  tag: Documentation
  text: Commencer à surveiller les problèmes de configuration avec Cloud Security
    Posture Management
- link: /security_platform/cloud_workload_security/getting_started
  tag: Documentation
  text: Identifier les menaces au niveau du kernel avec Cloud Workload Security
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: Blog
  text: Renforcer l'efficacité de la détection des menaces AWS avec Stratus Red Team
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: Blog
  text: Meilleures pratiques pour la sécurité de vos applications Kubernetes
kind: documentation
title: Plateforme de sécurité
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
La solution Cloud Security Posture Management n'est pas actuellement disponible dans la région US1-FED.
</div>
{{< /site-region >}}

## Présentation

Améliorez la rapidité et l'évolutivité des opérations liées à la sécurité de votre environnement de production. La plateforme de sécurité de Datadog détecte les menaces en temps réel et effectue des audits de configuration en continu au niveau de vos applications, hosts, conteneurs et infrastructures cloud. En conjonction avec la plateforme globale d'observabilité Datadog, la plateforme de sécurité Datadog offre une intégration incomparable entre la sécurité et les opérations qui s'aligne sur les objectifs communs de votre organisation.

La plateforme de sécurité Datadog comprend les solutions [Application Security Monitoring](#application-security-monitoring), [Cloud SIEM](#cloud-siem), [Cloud Security Posture Management (CSPM)](#cloud-security-posture-management) et [Cloud Workload Security (CWS)](#cloud-workload-security).

{{< vimeo 669874306 >}}
</br>

## Application Security Monitoring

[Application Security Monitoring][1] (ASM) vous permet d'observer les attaques contre les applications visant à tirer profit de vulnérabilités au niveau du code, telles que la falsification de requête côté serveur (SSRF), l'injection SQL, l'exploitation de vulnérabilité Log4Shell et les scripts intersites (XSS) réfléchis. ASM repose sur la solution [APM Datadog][2], l'[Agent Datadog][3] et les règles intégrées pour détecter les menaces envers l'environnement de votre application.

{{< img src="/security_platform/application_security/app-sec-landing-page.png" alt="Un volet de signal de sécurité dans Datadog, qui affiche les flux d'attaques et flamegraphs" width="75%">}}

## Cloud SIEM

[Cloud SIEM][4] (Security Information and Event Management) détecte en temps réel les menaces envers votre application et votre infrastructure. Il peut par exemple s'agir d'une attaque ciblée, d'une adresse IP communiquant avec vos systèmes alors qu'elle fait partie d'une liste noire, ou d'une configuration non sécurisée. Cloud SIEM fonctionne conjointement avec la solution [Log Management de Datadog][5]. Cette association vous permet d'[automatiser la remédiation des menaces détectées par Cloud SIEM][6], afin d'accélérer vos processus de gestion des menaces.

{{< img src="security_platform/security_monitoring_overview.png" alt="Vue des sources Cloud SIEM analysées dans Datadog" width="100%">}}

## Cloud Security Posture Management

[Cloud Security Posture Management (CSPM)][7] surveille l'état de la sécurité et le niveau de conformité de votre environnement de production. Cette solution vous permet d'automatiser la collecte de preuves d'audit et de détecter les problèmes de configuration qui rendent votre organisation vulnérable aux attaques. Consultez vos scores de posture de sécurité pour l'ensemble de votre infrastructure et comparez-les aux exigences du benchmark ou framework pertinent.

{{< img src="security_platform/cspm_overview.png" alt="Notes Cloud Security Posture Management dans Datadog" width="100%">}}

## Cloud Workload Security

[Cloud Workload Security (CWS)][8] surveille les activités liées aux fichiers et processus dans votre environnement afin de détecter les menaces envers votre infrastructure, comme les instances AWS EC2, et envers les workloads, comme les clusters Kubernetes, en temps réel au niveau du kernel. Puisque cette solution tire profit de l'Agent Datadog unifié, vous n'avez pas besoin de provisionner des ressources supplémentaires si vous surveillez déjà votre environnement avec Datadog.

{{< img src="security_platform/cws_overview.png" alt="Vues de la couverture Cloud Workload Security dans Datadog" width="100%">}}

Pour commencer à utiliser la plateforme de sécurité Datadog, accédez à la section [Setup & Configuration][9] de l'application Datadog. Celle-ci comporte des informations détaillées sur les configurations uniques ou multiples. Vous pouvez également consulter les guides ci-dessous pour approfondir vos connaissances sur chaque composante de la plateforme.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security_platform/application_security/
[2]: /fr/tracing/
[3]: /fr/agent/
[4]: /fr/security_platform/cloud_siem
[5]: /fr/logs/
[6]: https://www.datadoghq.com/blog/automated-vulnerability-remediation-datadog/
[7]: /fr/security_platform/cspm/
[8]: /fr/security_platform/cloud_workload_security/
[9]: https://app.datadoghq.com/security/configuration
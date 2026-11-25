---
aliases:
- /fr/security_platform/cloud_workload_security/getting_started
- /fr/security/cloud_workload_security/getting_started
- /fr/security/cloud_workload_security/setup
- /fr/security/threats/setup
- /fr/security_platform/cspm/getting_started
- /fr/security/cspm/getting_started
- /fr/security/cspm/setup
- /fr/security/misconfigurations/setup
- /fr/security/vulnerabilities/setup
- /fr/security/infrastructure_vulnerabilities/setup/
- /fr/security/cloud_security_management/setup/csm_enterprise
- /fr/security/cloud_security_management/setup/csm_cloud_workload_security
- /fr/security/cloud_security_management/setup/csm_pro
further_reading:
- link: /security/cloud_security_management/setup/supported_deployment_types
  tag: Documentation
  text: Types de déploiements pris en charge
- link: /security/guide/aws_fargate_config_guide
  tag: Documentation
  text: Guide de configuration AWS Fargate pour Datadog Security
- link: /security/cloud_security_management/guide/agent_variables/
  tag: Guide
  text: Variables de l'agent Cloud Security
title: Configuration de Cloud Security
---
## Présentation {#overview}

Pour commencer avec Cloud Security, consultez les éléments suivants :

- [Activez l'analyse Agentless](#enable-agentless-scanning)
- [Déployez l'Agent pour une couverture supplémentaire](#deploy-the-agent-for-additional-coverage)
- [Activez des fonctionnalités supplémentaires](#enable-additional-features)
  - [Analyse d'images de conteneurs en CI/CD](#container-image-scanning-in-cicd)
  - [AWS CloudTrail Logs](#aws-cloudtrail-logs)
  - [Déployez via des intégrations cloud](#deploy-using-cloud-integrations)
- [Désactivez Cloud Security](#disable-cloud-security)
- [Pour aller plus loin](#further-reading)

## Activez l'analyse Agentless {#enable-agentless-scanning}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">L'analyse Agentless n'est pas disponible sur le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Le moyen le plus simple de démarrer avec Cloud Security est d'[activer l'analyse Agentless][1]. L'analyse Agentless offre la couverture la plus large sur votre infrastructure AWS, Azure et Google Cloud : elle analyse tous les hosts, les conteneurs en cours d'exécution et les autres charges de travail prises en charge sans que vous ayez besoin d'installer quoi que ce soit sur les ressources individuelles.

Vous pouvez exécuter des scanners Agentless dans votre propre compte cloud (auto-hébergés) ou laisser Datadog les exécuter pour vous (hébergés par Datadog, en version préliminaire pour AWS). Pour comparer les options, consultez [Choisir où exécuter les scanners][10]. Pour en savoir plus sur l'analyse Agentless, consultez [Analyse Agentless de Cloud Security][2].

## Déployez l'Agent pour obtenir un contexte plus détaillé {#deploy-the-agent-for-deeper-context}

L'analyse Agentless couvre l'ensemble de votre infrastructure cloud, mais le déploiement du Datadog Agent sur les hosts critiques ajoute un contexte de sécurité plus approfondi, tel que la priorisation des vulnérabilités au moment de l'exécution, les mises à jour en temps réel et les benchmarks des hosts. Le tableau suivant présente les améliorations offertes par les déploiements basés sur l'Agent. Pour plus d'informations, consultez [Configurer Cloud Security sur le Datadog Agent][3].

<table>
  <thead>
    <tr>
      <th>Fonctionnalité</th>
      <th>Agentless</th>
      <th>Déploiement Agentless &#43; déploiement basé sur l'Agent</th>
      <th>Déploiement basé sur l'Agent</th>
    </tr>
  </thead>
  <tr>
    <td><strong><a href="/security/cloud_security_management/identity_risks">Cloud Security Identity Risks</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
    <td></td>
  </tr>
  <tr>
    <td><strong><a href="/security/cloud_security_management/misconfigurations">Cloud Security Misconfigurations</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;"><a href="/security/default_rules/?search=host+benchmarks">Benchmarks des hosts</a></td>
    <td></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
  </tr>
  <tr>
    <td><strong><a href="/security/cloud_security_management/vulnerabilities">Cloud Security Vulnerabilities</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;">Priorisation des vulnérabilités</td>
    <td>{{< X >}}</td>
    <td>{{< X >}}<br />Avec contexte d'exécution</td>
    <td>{{< X >}}<br />Avec contexte d'exécution</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;">Fréquence de mise à jour des vulnérabilités</td>
    <td>12 heures</td>
    <td>Temps réel</td>
    <td>Temps réel</td>
  </tr>
  <tr>
    <td><strong><a href="/security/security_inbox">Security Inbox</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}<br />Avec des informations plus précises</td>
    <td>{{< X >}}<br />Avec des informations plus précises</td>
  </tr>
</table>

## Activez des fonctionnalités supplémentaires {#enable-additional-features}

### Analyse d'images de conteneurs en CI/CD {#container-image-scanning-in-cicd}

Analysez les images de conteneurs à la recherche de vulnérabilités pendant vos pipelines CI/CD, avant de déployer les images en production. La CLI Datadog Security s'exécute directement dans vos jobs CI, vous donnant le contrôle sur le moment et la manière dont les analyses sont effectuées. Pour plus d'informations, consultez [Container Image Scanning in CI/CD][9].

### AWS CloudTrail Logs {#aws-cloudtrail-logs}

Maximisez les avantages de [Cloud Security Identity Risks][6] avec les logs AWS CloudTrail. Obtenez des informations plus détaillées sur l'utilisation des ressources cloud, en identifiant les utilisateurs et les rôles présentant des écarts importants entre les autorisations provisionnées et utilisées. Pour plus d'informations, consultez [Configurer AWS CloudTrail Logs pour Cloud Security][4].

### Déployez via des intégrations cloud {#deploy-using-cloud-integrations}

Surveillez votre couverture en matière de sécurité et de conformité et sécurisez votre infrastructure cloud contre les attaques basées sur IAM en activant l'analyse des ressources pour AWS, Azure, Google Cloud et OCI. Pour plus d'informations, consultez [Déployer Cloud Security via Cloud Integrations][7].

## Désactivez Cloud Security {#disable-cloud-security}

Pour plus d'informations sur la désactivation de Cloud Security, consultez les éléments suivants :

- [Désactivez Cloud Security Vulnerabilities][8]

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/setup/agentless_scanning/enable
[2]: /fr/security/cloud_security_management/agentless_scanning
[3]: /fr/security/cloud_security_management/setup/agent
[4]: /fr/security/cloud_security_management/setup/cloudtrail_logs
[6]: /fr/security/cloud_security_management/identity_risks
[7]: /fr/security/cloud_security_management/setup/cloud_accounts
[8]: /fr/security/cloud_security_management/troubleshooting/vulnerabilities/#disable-cloud-security-vulnerabilities
[9]: /fr/security/cloud_security_management/setup/ci_cd
[10]: /fr/security/cloud_security_management/setup/agentless_scanning#choose-where-scanners-run
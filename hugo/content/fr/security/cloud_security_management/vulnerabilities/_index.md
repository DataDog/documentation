---
aliases:
- /fr/security/infrastructure_vulnerabilities/
- /fr/security/vulnerabilities/
further_reading:
- link: /infrastructure/containers/container_images/#enable-sbom-collection
  tag: Documentation
  text: Activer la collecte de SBOM dans Cloud Security Vulnerabilities
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: Documentation
  text: Configuration des vulnérabilités des hosts
- link: /infrastructure/containers/container_images
  tag: Documentation
  text: Visualiser Container Images
- link: /security/cloud_security_management/troubleshooting/vulnerabilities
  tag: Documentation
  text: Dépannage de Cloud Security Vulnerabilities
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: Blog
  text: Améliorez votre workflow de dépannage avec Container Images dans Datadog Container
    Monitoring
- link: /security/cloud_security_management/setup/ci_cd/#link-dockerfile-to-vulnerabilities
  tag: Documentation
  text: Lier un Dockerfile aux vulnérabilités détectées en production
title: Cloud Security Vulnerabilities
---
## Présentation {#overview}

Cloud Security Vulnerabilities vous aide à améliorer votre posture de sécurité et à atteindre la conformité, en analysant en continu les images de conteneurs, les hosts, les images de hosts et les fonctions serverless à la recherche de vulnérabilités, des pipelines CI/CD à la production en direct. En tirant parti de l'observabilité au moment de l'exécution, il vous aide à hiérarchiser et à remédier aux vulnérabilités exploitables dans vos flux de travail quotidiens, le tout dans une vue unique, et sans aucune dépendance vis-à-vis d'autres produits Datadog.

Avec Cloud Security Vulnerabilities, vous pouvez gérer votre stratégie de gestion de la sécurité cloud, le tout au même endroit :

- Créer un programme de gestion des vulnérabilités, des pipelines CI/CD aux ressources de production
- Réussir les audits de conformité (tels que SOC2, PCI, HIPAA, CIS et FedRamp)
- Remédier aux vulnérabilités émergentes (0-day CVEs)

**Remarque** : Pour la gestion des vulnérabilités dans les bibliothèques d'applications, consultez [Software Composition Analysis][5]. Pour le code d'application, consultez [Code Security][10].

## Fonctionnalités clés {#key-capabilities}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">L'analyse sans agent n'est pas disponible sur le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Déployez en utilisant Agentless ou le Unified Datadog Agent
: Analysez rapidement l'ensemble de votre infrastructure à la recherche de vulnérabilités, soit en utilisant Agentless, soit en utilisant le Unified Datadog Agent déjà déployé.

Inventorier les ressources cloud en temps réel
: Inventoriez les images de conteneurs, les hosts, les fonctions serverless et tous les packages déployés dans votre infrastructure, en temps réel, et exportez votre SBOM (software bill of materials).

Détecter les vulnérabilités en continu
: Analysez les mises à jour récentes et les CVE nouvellement publiées, sur l'ensemble des images de conteneurs en cours d'exécution provenant de hosts et de registres, de hosts, d'images de hosts et de fonctions serverless, et identifiez les couches d'images de conteneurs vulnérables.

Donnez la priorité aux vulnérabilités exploitables en utilisant l'observabilité au moment de l'exécution
: Tirez parti du score de sécurité de Datadog, basé sur le CVSS, en intégrant les informations du CISA KEV, de l'EPSS et de la disponibilité des exploits publics. Grâce à l'observabilité au moment de l'exécution, vous pouvez surveiller la production, l'exposition aux attaques, le traitement des données sensibles et les accès privilégiés.

Profitez d'une remédiation guidée
: Voyez quelles couches sont impactées, obtenez des suggestions spécifiques à chaque image et agissez sur la gestion du cycle de vie de vos vulnérabilités.

Mettez en œuvre l'automatisation et les intégrations
: Automatisez la création de tickets Jira et mettez en œuvre des SLA. Utilisez l'API publique de Datadog pour exporter les vulnérabilités, la couverture et les SBOMs.

Explorez les rapports
: Affichez et surveillez les données de vulnérabilité dans vos dashboards.

## Méthodes de déploiement {#deployment-methods}

Démarrez avec Cloud Security Vulnerabilities et couvrez votre infrastructure en quelques minutes, en utilisant :
- [Agentless Scanning][11]
- [Unified Datadog Agent][12]
- [CI/CD Container Image Scanning][21]

Vous pouvez également utiliser plusieurs méthodes de déploiement ensemble : utilisez le Unified Datadog Agent là où il est déjà déployé, Agentless ailleurs, et le CI/CD Container Image Scanning pour détecter les vulnérabilités avant la production.

Une fois activé, Datadog commence à analyser vos ressources en continu et commence à signaler les vulnérabilités priorisées dans votre [{{< ui >}}Cloud Security Vulnerabilities Findings{{< /ui >}} page][1] en moins d'une heure.

Utilisez ces tableaux pour décider avec quelle solution commencer :
| Feature | Agentless | Unified Datadog Agent |
|-------------------------------------------|-----------------------------------------------|--------------------------------|
| Temps de déploiement sur votre infrastructure | Minutes                                       | Heures à semaines                 |
| Priorisation des vulnérabilités | Oui | Oui, avec contexte d'exécution |
| Fréquence d'analyse des vulnérabilités | 12 heures | Temps réel |

| Périmètre de détection des vulnérabilités | Agentless | Unified Datadog Agent |
|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------|
| Host et image de host | Packages de l'OS et packages d'applications, mappés avec une image | Packages de l'OS |
| Image de conteneur | Packages de l'OS et packages d'applications, mappés avec une image | Packages de l'OS |
| Fournisseur cloud | AWS, Azure, GCP | AWS, Azure, GCP, sur site, etc. |
| Système d'exploitation | Linux, Windows | Linux, Windows |
| Serverless | AWS Lambda, Amazon ECS Fargate, Azure Container Apps, Azure Container Instances, GCP Cloud Run (déploiement de conteneur uniquement) | Non applicable |
| Registres de conteneurs | Amazon ECR et Google Artifact Registry (en cours d'exécution + au repos) ; Azure Container Registry, Docker Hub, GitHub Container Registry, Microsoft Container Registry et registre Kubernetes (pull authentifié uniquement). Voir [Registres d'images de conteneurs][24] pour plus de détails | Non applicable |

Pour plus d'informations sur la compatibilité, consultez [Cloud Security Vulnerabilities Hosts and Containers Compatibility][13]. Si vous avez besoin d'aide, consultez le [guide de dépannage][14] ou contactez support@datadoghq.com.

## Détectez, hiérarchisez et corrigez en continu les vulnérabilités exploitables {#continuously-detect-prioritize-and-remediate-exploitable-vulnerabilities}
La page [{{< ui >}}Cloud Security Vulnerabilities Findings{{< /ui >}}][1] vous aide à enquêter sur les vulnérabilités détectées dans vos images de conteneurs, images de hosts, hosts en cours d'exécution et fonctions serverless à l'aide de fonctionnalités de filtrage et de regroupement.

Concentrez-vous d'abord sur les vulnérabilités exploitables, en utilisant le Datadog Severity Score, qui combine le score CVSS de base avec de nombreux facteurs de risque, notamment les données sensibles, la sensibilité de l'environnement, l'exposition aux attaques, la disponibilité d'exploits ou les sources de renseignement sur les menaces.

Pour les vulnérabilités disposant de correctifs, {{< ui >}}Findings{{< /ui >}}la page fournit des étapes de remédiation guidées pour aider les équipes Dev et Ops à résoudre les problèmes plus rapidement et plus efficacement. Vous pouvez également trier, mettre en sourdine, commenter et assigner des vulnérabilités pour gérer leur cycle de vie.

<div class="alert alert-info">Pour réutiliser vos paramètres d'explorateur sur la page des résultats de vulnérabilités, ajoutez l'URL complète de la page à vos favoris. Votre requête de recherche et vos sélections de facettes sont conservées dans l'URL.</div>

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability-2.png" alt="La page des résultats de Cloud Security Vulnerabilities affichant une vulnérabilité et les actions qu'un utilisateur peut entreprendre pour y remédier" width="100%">}}

Dans [{{< ui >}}Container Images{{< /ui >}}][7], vous pouvez retracer les vulnérabilités trouvées dans une image jusqu'à des couches spécifiques, afin de pouvoir identifier et corriger vos risques de sécurité plus rapidement.

{{< img src="infrastructure/containerimages/image_layer_vulnerabilities.png" alt="Une liste des vulnérabilités associées à chaque couche d'une image" width="100%">}}

Pour les images de conteneur non aplaties à étape unique construites à partir d'une image de base publique, Datadog identifie automatiquement l'image de base et distingue les vulnérabilités héritées de celle-ci des packages ajoutés par votre image. Lorsque l'attribution est disponible, Datadog affiche le nom et le condensé de l'image de base, indiquant quand la correction nécessite la mise à jour de cette image de base plutôt que la modification du code de l'application. [Voir les images de conteneur dans Datadog][23].

## Retracez les vulnérabilités de production jusqu'au code source {#trace-production-vulnerabilities-to-source-code}

Lorsque Datadog détecte une CVE sur une image de conteneur en cours d'exécution, il peut lier la CVE directement au Dockerfile et au commit qui ont introduit le paquet vulnérable. Cela comble l'écart entre une alerte de production et la modification de code qui l'a causée, donnant aux développeurs le contexte dont ils ont besoin pour corriger à la source plutôt que de rechercher des versions de packages dans les registres.

Pour activer ce mappage du code au cloud, ajoutez des annotations d'image OCI à vos images de conteneur au moment de la construction. Datadog utilise ces annotations pour afficher un aperçu du Dockerfile dans le panneau des vulnérabilités des images de conteneur et pour faire apparaître le dépôt, le commit et le chemin de fichier exacts associés à la vulnérabilité.

Pour configurer la liaison à la source, consultez [Link Dockerfile to vulnerabilities][22] dans le guide d'analyse des images de conteneur CI/CD.

## Automatisation et intégration Jira {#automation-and-jira-integration}
Intégrez Cloud Security Vulnerabilities à votre workflow quotidien en configurant [{{< ui >}}security notification rules{{< /ui >}}][17] et [automation pipelines (in Preview)][20] :
- Soyez alerté lors de la détection d'une vulnérabilité exploitable pour votre périmètre
- Créez automatiquement des tickets Jira
- Configurez des SLA pour remédier aux vulnérabilités

{{< img src="security/vulnerabilities/csm-notifications.png" alt="L'écran de configuration des règles de notification" width="100%">}}

## Suivi et reporting {#tracking-and-reporting}
Utilisez le [dashboard {{< ui >}}Cloud Security Vulnerabilities{{< /ui >}}][18] prêt à l'emploi pour suivre et rendre compte des progrès auprès des parties prenantes. Clonez-le et modifiez-le si nécessaire pour répondre à vos besoins spécifiques.

{{< img src="security/vulnerabilities/csm-vm-reporting.png" alt="Le dashboard de Cloud Security Vulnerabilities" width="100%">}}

## Explorez les packages d'infrastructure {#explore-infrastructure-packages}

Le [{{< ui >}}Infrastructure Packages Catalog{{< /ui >}}][19] fournit un inventaire en temps réel de tous les packages sur les hosts, les images de host et les images de conteneur déployés dans votre infrastructure. Il offre une interface que vous pouvez utiliser pour examiner vos SBOMs, enrichie avec le contexte de vulnérabilité et d'exécution.

Évaluez rapidement l'impact d'une vulnérabilité émergente critique en recherchant les versions de package affectées et en identifiant toutes les ressources qui l'utilisent.

{{< img src="security/vulnerabilities/csm_package_explorer_3.png" alt="L'inventaire des packages déployés dans l'infrastructure avec le contexte de vulnérabilité et le pivot vers les ressources qui les utilisent" width="100%">}}

[1]: https://app.datadoghq.com/security/csm/vm
[2]: https://app.datadoghq.com/containers/images
[3]: https://app.datadoghq.com/security/csm
[4]: https://app.datadoghq.com/security/infra-vulnerability?query=asset_type%3AHost&group=none
[5]: /fr/security/code_security/software_composition_analysis/
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[7]: https://app.datadoghq.com/container-images
[9]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[10]: /fr/security/code_security/iast/
[11]: /fr/security/cloud_security_management/setup/agentless_scanning/
[12]: /fr/security/cloud_security_management/setup/agent
[13]: /fr/security/cloud_security_management/vulnerabilities/hosts_containers_compatibility
[14]: /fr/security/cloud_security_management/troubleshooting/vulnerabilities/
[16]: https://www.datadoghq.com/product-preview/ecr-vulnerability-scanning/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: https://app.datadoghq.com/dash/integration/csm_vulnerabilities?fromUser=true&refresh_mode=sliding&from_ts=1733323465252&to_ts=1733928265252&live=true
[19]: https://app.datadoghq.com/security/catalog/libraries
[20]: https://www.datadoghq.com/product-preview/security-automation-pipelines/
[21]: /fr/security/cloud_security_management/setup/ci_cd
[22]: /fr/security/cloud_security_management/setup/ci_cd/#link-dockerfile-to-vulnerabilities
[23]: https://app.datadoghq.com/security/csm/vm?query=-%40risk.is_image_running%3Afalse%20%40status%3Aopen%20%40risk.has_exploit_available%3Atrue%20%40remediation.is_available%3Atrue%20%40severity%3A%28high%20OR%20critical%29%20%40vulnerability.is_inherited_from_base_image%3Atrue&group=none&order=desc&sort=score
[24]: /fr/security/cloud_security_management/setup/agentless_scanning/compatibility/#container-image-registries

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
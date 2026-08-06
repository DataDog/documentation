---
aliases:
- /fr/security/infrastructure_vulnerabilities/
- /fr/security/vulnerabilities/
further_reading:
- link: /infrastructure/containers/container_images/#enable-sbom-collection
  tag: Documentation
  text: Activez la collecte de SBOM dans Cloud Security Vulnerabilities
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: Documentation
  text: Configuration des vulnérabilités des hôtes
- link: /infrastructure/containers/container_images
  tag: Documentation
  text: Vue des images de conteneur
- link: /security/cloud_security_management/troubleshooting/vulnerabilities
  tag: Documentation
  text: Dépannage des vulnérabilités de sécurité cloud
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: Blog
  text: Améliorez votre flux de travail de dépannage avec les images de conteneurs
    dans la surveillance des conteneurs Datadog
- link: /security/cloud_security_management/setup/ci_cd/#link-dockerfile-to-vulnerabilities
  tag: Documentation
  text: Liez un Dockerfile aux vulnérabilités détectées en production
title: Vulnérabilités de sécurité cloud
---
## Aperçu {#overview}

Les vulnérabilités de sécurité cloud vous aident à améliorer votre posture de sécurité et à atteindre la conformité, en scannant en continu les images de conteneurs, les hôtes, les images d'hôtes et les fonctions sans serveur pour détecter les vulnérabilités, des pipelines CI/CD à la production en direct. En tirant parti de l'observabilité en temps réel, cela vous aide à prioriser et à remédier aux vulnérabilités exploitables dans vos flux de travail quotidiens, le tout dans une vue unique, sans dépendances sur d'autres produits Datadog.

Avec les vulnérabilités de sécurité cloud, vous pouvez gérer votre stratégie de gestion de la sécurité cloud, le tout en un seul endroit :

- Créez un programme de gestion des vulnérabilités, des pipelines CI/CD aux ressources de production
- Réussissez les audits de conformité (tels que SOC2, PCI, HIPAA, CIS et FedRamp)
- Remédiez aux vulnérabilités émergentes (CVE 0-day)

**Remarque** : Pour la gestion des vulnérabilités dans les bibliothèques d'applications, voir [Analyse de la composition logicielle][5]. Pour le code d'application, voir [Sécurité du code][10].

## Fonctionnalités clés {#key-capabilities}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">La numérisation sans agent n'est pas disponible dans le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Déployez en utilisant le mode sans agent ou l'agent Datadog unifié
: Scannez rapidement l'ensemble de votre infrastructure à la recherche de vulnérabilités, soit en utilisant un agent sans agent, soit en utilisant l'agent Datadog unifié que vous avez déjà déployé.

Inventoriez les ressources cloud, en temps réel
: Inventoriez les images de conteneurs, les hôtes, les fonctions sans serveur et tous les packages déployés dans votre infrastructure, en temps réel, et exportez votre SBOM (liste de matériaux logiciels).

Détecter les vulnérabilités en continu
: Analysez les mises à jour récentes et les CVE nouvellement publiés, à travers les images de conteneurs en cours d'exécution provenant des hôtes et des registres, des hôtes, des images hôtes et des fonctions sans serveur, et identifiez les couches d'images de conteneurs vulnérables.

Priorisez les vulnérabilités exploitables, en utilisant l'observabilité en temps réel
: Exploitez le scoring de sécurité de Datadog, qui est basé sur le CVSS, en intégrant des informations de CISA KEV, EPSS et de la disponibilité publique des exploits. Avec l'observabilité en temps réel, vous pouvez surveiller la production, l'exposition aux attaques, le traitement des données sensibles et l'accès privilégié.

Profitez d'une remédiation guidée
: Voyez quelles couches sont impactées, obtenez des suggestions spécifiques à chaque image, et agissez sur la gestion du cycle de vie de vos vulnérabilités.

Mettez en œuvre l'automatisation et les intégrations
: Automatisez la création de tickets Jira et mettez en œuvre des SLA. Utilisez l'API publique de Datadog pour exporter les vulnérabilités, la couverture et les SBOM.

Explorez les rapports
: Visualisez et surveillez les données de vulnérabilité dans vos tableaux de bord.

## Méthodes de déploiement {#deployment-methods}

Commencez avec les vulnérabilités de sécurité cloud et protégez votre infrastructure en quelques minutes, en utilisant :
- [Analyse sans agent][11]
- [Agent Datadog unifié][12]
- [Analyse des images de conteneurs CI/CD][21]

Vous pouvez également utiliser plusieurs méthodes de déploiement ensemble : utilisez l'agent Datadog unifié là où vous l'avez déjà déployé, sans agent ailleurs, et l'analyse CI/CD pour détecter les vulnérabilités avant la production.

Une fois que vous l'avez activé, Datadog commence à scanner vos ressources en continu et commence à signaler les vulnérabilités prioritaires dans votre [page des résultats des vulnérabilités de sécurité cloud][1] dans l'heure qui suit.

Utilisez ces tableaux pour décider par quelle solution commencer :
| Fonctionnalité                                   | Sans agent                                     | Agent unifié Datadog          |
|-------------------------------------------|-----------------------------------------------|--------------------------------|
| Temps de déploiement dans votre infrastructure | Minutes                                       | Heures à semaines                 |
| Priorisation des vulnérabilités              | Oui                                           | Oui, avec contexte d'exécution      |
| Fréquence de scan des vulnérabilités          | 12 heures                                      | Temps réel                      |

| Portée de détection des vulnérabilités | Sans agent                                                                         | Agent unifié Datadog          |
|-------------------------------|-----------------------------------------------------------------------------------|--------------------------------|
| Hôte et image d'hôte           | Paquets OS et paquets d'application, mappés à l'image                                     | Paquets OS                    |
| Image de conteneur               | Paquets OS et paquets d'application, mappés à l'image                                     | Paquets OS                    |
| Fournisseur cloud                | AWS, Azure, GCP                                                                   | AWS, Azure, GCP, sur site, etc. |
| Système d'exploitation              | Linux, Windows                                                                    | Linux, Windows                 |
| Sans serveur                    | AWS Lambda, Amazon ECS Fargate, Azure Container Apps, Azure Container Instances, GCP Cloud Run (déploiement de conteneurs uniquement) | Non applicable                 |
| Registres de conteneurs          | Amazon ECR (en cours d'exécution + au repos), Google Artifact Registry (charges de travail en cours d'exécution uniquement), Azure Container Registry (images de conteneurs en cours d'exécution uniquement) | Non applicable                 |

Pour plus d'informations sur la compatibilité, consultez [Compatibilité des hôtes et des conteneurs de vulnérabilités de sécurité cloud][13]. Si vous avez besoin d'aide, consultez le [guide de dépannage][14], ou contactez support@datadoghq.com.

## Détecter, prioriser et remédier en continu aux vulnérabilités exploitables {#continuously-detect-prioritize-and-remediate-exploitable-vulnerabilities}
La [page des résultats des vulnérabilités de sécurité cloud][1] vous aide à enquêter sur les vulnérabilités détectées dans vos images de conteneurs, images d'hôtes, hôtes en cours d'exécution et fonctions sans serveur en utilisant des capacités de filtrage et de regroupement.

Concentrez-vous d'abord sur les vulnérabilités exploitables, en utilisant le score de gravité Datadog, combinant le score de base CVSS avec de nombreux facteurs de risque, y compris les données sensibles, la sensibilité de l'environnement, l'exposition aux attaques, la disponibilité des exploits ou les sources de renseignement sur les menaces.

Pour les vulnérabilités avec des correctifs disponibles, la page des résultats fournit des étapes de remédiation guidées pour aider les équipes Dev et Ops à résoudre les problèmes plus rapidement et efficacement. Vous pouvez également trier, mettre en sourdine, commenter et attribuer des vulnérabilités pour gérer leur cycle de vie.

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability-2.png" alt="La page des résultats des vulnérabilités de sécurité dans le cloud affichant une vulnérabilité et les actions qu'un utilisateur peut entreprendre pour y remédier." width="100%">}}

Dans [Images de conteneurs][7], vous pouvez retracer les vulnérabilités trouvées dans une image à des couches spécifiques, afin de pouvoir identifier et remédier plus rapidement à vos risques de sécurité.

{{< img src="infrastructure/containerimages/image_layer_vulnerabilities.png" alt="Une liste de vulnérabilités associées à chaque couche d'une image." width="100%">}}

## Tracez les vulnérabilités de production jusqu'au code source {#trace-production-vulnerabilities-to-source-code}

Lorsque Datadog détecte un CVE sur une image de conteneur en cours d'exécution, il peut lier le CVE directement au Dockerfile et à l'engagement qui a introduit le package vulnérable. Cela comble le fossé entre une alerte de production et le changement de code qui l'a causée, donnant aux développeurs le contexte dont ils ont besoin pour remédier à la source plutôt que de poursuivre les versions de packages à travers les registres.

Pour activer cette cartographie du code au cloud, ajoutez des annotations d'image OCI à vos images de conteneurs au moment de la construction. Datadog utilise ces annotations pour afficher un aperçu du Dockerfile dans le panneau des vulnérabilités des images de conteneurs et pour faire ressortir le dépôt exact, l'engagement et le chemin de fichier associés à la vulnérabilité.

Pour configurer le lien source, consultez [Lier le Dockerfile aux vulnérabilités][22] dans le guide de scan des images de conteneurs CI/CD.

## Automatisation et intégration Jira {#automation-and-jira-integration}
Intégrez les vulnérabilités de sécurité dans le cloud dans votre flux de travail quotidien en configurant [règles de notification de sécurité][17] et [pipelines d'automatisation (en aperçu)][20] :
- Recevez une alerte lors de la détection d'une vulnérabilité exploitable pour votre périmètre.
- Créez automatiquement des tickets Jira.
- Configurez des SLA pour remédier aux vulnérabilités.

{{< img src="security/vulnerabilities/csm-notifications.png" alt="L'écran de configuration des règles de notification." width="100%">}}

## Suivi et reporting {#tracking-and-reporting}
Utilisez le tableau de bord [Vulnérabilités de sécurité dans le cloud][18] prêt à l'emploi pour suivre et rapporter les progrès aux parties prenantes. Clonez-le et modifiez-le selon vos besoins uniques.

{{< img src="security/vulnerabilities/csm-vm-reporting.png" alt="Le tableau de bord des vulnérabilités de sécurité dans le cloud." width="100%">}}

## Explorez les packages d'infrastructure {#explore-infrastructure-packages}

Le [Catalogue des packages d'infrastructure][19] fournit un inventaire en temps réel de tous les packages sur les hôtes, les images d'hôtes et les images de conteneurs déployés dans votre infrastructure. Il offre une interface que vous pouvez utiliser pour examiner vos SBOMs, enrichie de contexte de vulnérabilité et d'exécution.

Évaluez rapidement l'impact d'une vulnérabilité critique émergente en recherchant les versions de paquets affectées et en identifiant toutes les ressources qui l'utilisent.

{{< img src="security/vulnerabilities/csm_package_explorer_3.png" alt="L'inventaire des paquets déployés dans l'infrastructure, intégrant le contexte de vulnérabilité et le pivot vers les ressources qui les utilisent." width="100%">}}

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

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
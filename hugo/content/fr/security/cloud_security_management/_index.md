---
algolia:
  tags:
  - csm
  - cloud security management
  - inbox
aliases:
- /fr/security_platform/cloud_security_management/
cascade:
  algolia:
    subcategory: Cloud Security
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentation
  text: Commencez à suivre les problèmes de configuration avec Cloud Security Misconfigurations
- link: /security/research_feed
  tag: Documentation
  text: Security Research Feed
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: Blog
  text: Renforcer l'efficacité de la détection des menaces AWS avec Stratus Red Team
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: Blog
  text: Meilleures pratiques pour la sécurité de vos applications Kubernetes
- link: https://www.datadoghq.com/blog/workload-security-evaluator/
  tag: Blog
  text: Exécutez des tests de détection Atomic Red Team dans des environnements de
    conteneurs avec le Workload Security Evaluator de Datadog
- link: https://www.datadoghq.com/blog/security-labs-ruleset-launch/
  tag: Blog
  text: Corriger les problèmes de sécurité courants du cloud avec le jeu de règles
    Datadog Security Labs
- link: https://www.datadoghq.com/blog/securing-cloud-native-applications/
  tag: Blog
  text: Pratiques de sécurité recommandées pour les applications dans des environnements
    cloud natifs.
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: Blog
  text: Mettre en place une couverture de sécurité suffisante pour votre environnement
    dans le cloud
- link: https://www.datadoghq.com/blog/cloud-security-study-learnings-2024/
  tag: Blog
  text: 'Principaux enseignements de l''étude 2024 State of Cloud Security :'
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: Blog
  text: Comment Datadog Security Inbox priorise les risques de sécurité
- link: https://www.datadoghq.com/blog/datadog-detection-as-code/
  tag: Blog
  text: Comment nous utilisons Datadog pour la détection en tant que code
- link: https://www.datadoghq.com/blog/shared-responsibility-model/
  tag: Blog
  text: 'Simplifier le modèle de responsabilité partagée : comment respecter vos obligations
    en matière de sécurité cloud'
- link: https://www.datadoghq.com/blog/detect-bedrock-misconfigurations-cloud-security
  tag: Blog
  text: Détectez les problèmes de configuration d'Amazon Bedrock avec Datadog Cloud
    Security
- link: https://www.datadoghq.com/blog/security-graph-attack-paths
  tag: Blog
  text: Tracez les routes d'exposition entre les ressources avec Datadog Cloud Security
- link: https://www.datadoghq.com/blog/datadog-cloud-security-compliance
  tag: Blog
  text: Mettez à l'échelle la conformité à travers des cadres mondiaux avec Datadog
    Cloud Security
- link: https://www.datadoghq.com/blog/ec2-ami-risks
  tag: Blog
  text: 'Sécurité des AMI AWS : comment les AMI mal configurées et publiques étendent
    votre surface d''attaque cloud'
- link: https://www.datadoghq.com/blog/cloud-security-oci
  tag: Blog
  text: Protégez vos ressources OCI avec Datadog Cloud Security
title: Cloud Security
---
{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Security">}}
  Découvrez comment Datadog Cloud SIEM et Cloud Security améliorent la détection et l'investigation des menaces de votre organisation pour des environnements dynamiques à l'échelle du cloud. 
{{< /learning-center-callout >}}

Datadog Cloud Security offre une visibilité approfondie, des audits de configuration continus, des évaluations des risques liés aux identités, la détection des vulnérabilités et la détection des menaces en temps réel sur l'ensemble de votre infrastructure cloud, le tout dans une plateforme unifiée pour une collaboration transparente et une remédiation plus rapide.

Les équipes de sécurité et DevOps peuvent agir sur le contexte partagé des données d'observabilité et de sécurité pour prioriser et résoudre rapidement les problèmes.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">L'analyse Agentless n'est pas disponible sur le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Cloud Security s'appuie à la fois sur l'agent Datadog et sur l'analyse Agentless. Il inclut une variété de fonctionnalités que vous pouvez activer pour gérer différents aspects de la sécurité de votre organisation :

- [{{< ui >}}Misconfigurations{{< /ui >}}][2] : suit l'hygiène de sécurité et la posture de conformité de votre environnement de production, automatise la collecte de preuves d'audit et vous permet de remédier aux problèmes de configuration qui exposent votre organisation aux attaques.
- [{{< ui >}}Identity Risks{{< /ui >}}][8] : Offre une visibilité approfondie sur les risques AWS IAM, Azure et GCP de votre organisation et vous permet de détecter et de résoudre les risques liés aux identités en continu.
- [{{< ui >}}Vulnerabilities{{< /ui >}}][9] : Détectez, hiérarchisez et remédiez en continu les vulnérabilités exploitables dans vos images de conteneur, images du host et hosts de votre infrastructure.

Cloud Security inclut également l'accès aux fonctionnalités Datadog Security, notamment :
- [Detection Rules][18]
- [Notifications][6]
- [Automation Pipelines][19]
- [Security Inbox][14]
- [Audit Trail][20]
- [Security Research Feed][16]

{{< img src="security/csm/csm_overview_5.png" alt="Résumé de Cloud Security dans Datadog" width="100%">}}

{{< partial name="security-platform/CSW-billing-note.html" >}}

## Suivez la santé de votre organisation {#track-your-organizations-health}

### Gérez les tableaux de bord de la page d'accueil {#manage-homepage-dashboards}

Vous pouvez personnaliser les tableaux de bord auxquels vous accédez directement depuis la page d'accueil de Cloud Security, notamment en définissant un tableau de bord comme vue par défaut de votre page d'accueil. Utilisez les tableaux de bord pour hiérarchiser les efforts de remédiation, planifier des rapports, placer les données de sécurité à côté des données d'observabilité et de coût, et intégrer des applications et des workflows que vous pouvez lancer directement depuis votre vue de rapport. 

Sur la [page d'accueil de Cloud Security][4], dans la section {{< ui >}}Dashboards{{< /ui >}}, vous pouvez accéder directement aux tableaux de bord pour Identity Risks, Misconfigurations ou Vulnerabilities. Vous pouvez également ajouter des tableaux de bord existants ou en créer un pour le conserver dans la barre latérale de votre page d'accueil Cloud Security pour un accès pratique.

De plus, vous pouvez cliquer sur l'icône {{< ui >}}More Options{{< /ui >}} {{< img src="icons/kebab.png" inline="true" style="height:1em" >}} pour gérer vos tableaux de bord épinglés, notamment en définissant l'un d'eux comme vue par défaut de votre page d'accueil Cloud Security. Cliquez sur {{< ui >}}Cloud Security{{< /ui >}} dans la barre de navigation Datadog ou sur {{< ui >}}Summary{{< /ui >}} dans la barre de navigation Cloud Security pour accéder directement à votre tableau de bord épinglé.

Pour plus d'informations, consultez [Tableaux de bord][23].

### Suivez votre score de posture de sécurité {#track-your-security-posture-score}

Disponible pour [Cloud Security Misconfigurations][2], le [security posture score][5] vous aide à suivre la santé globale de votre organisation. Le score représente le pourcentage de votre environnement qui satisfait à toutes vos règles de conformité cloud et infrastructure prédéfinies.

Améliorez le score de votre organisation en remédiant aux problèmes de configuration, soit en résolvant le problème sous-jacent, soit en les masquant.

{{< img src="security/csm/health_scores.png" alt="Le score de posture sur la page de présentation de Cloud Security suit la santé globale de votre organisation" width="100%">}}

## Explorez et remédiiez aux problèmes {#explore-and-remediate-issues}

Pour une vue d'ensemble de vos résultats de sécurité, triés par importance, dans Cloud Security, Code Security, App and API Protection et Workload Protection, utilisez la [Security Inbox][14].

Pour obtenir plus de détails, utilisez [Findings][7] afin d'examiner et de remédier aux problèmes de configuration, aux vulnérabilités et aux risques liés à l'identité de votre organisation. Affichez des informations détaillées sur un résultat, y compris des directives et des étapes de remédiation. [Envoyez des notifications en temps réel][6] lorsqu'une menace est détectée dans votre environnement et utilisez des tags pour identifier le propriétaire d'une ressource impactée.

{{< img src="security/csm/findings_page_2.png" alt="Page des résultats de Cloud Security :" width="100%">}}

## Examinez les ressources {#investigate-resources}

- Utilisez le [Security Graph][17] pour modéliser votre environnement cloud sous forme de graphe de relations, afin de visualiser et d'interroger les connexions entre vos ressources cloud. Vous pouvez rédiger des requêtes pour rechercher des relations spécifiques entre les ressources, telles que des instances EC2 accessibles publiquement pouvant accéder à des buckets S3 contenant des données sensibles, afin d'atténuer de manière proactive ces risques d'infrastructure.
  {{< img src="security/csm/security_graph.png" alt="Security Graph affichant un exemple d'instance EC2" width="100%">}}
- Utilisez le [Resource Catalog][12] pour afficher les problèmes de configuration et les menaces spécifiques signalées sur les hôtes et les ressources de vos environnements. Pour plus d'informations, consultez la documentation du [Resource Catalog][13].
  {{< site-region region="gov,gov2" >}}
  <div class="alert alert-danger">Le Resource Catalog n'est pas pris en charge pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
  {{< /site-region >}}
  {{< img src="infrastructure/resource_catalog/resource_catalog_infra_3.png" alt="Vue cartographique du Resource Catalog affichant les hosts et les ressources cloud regroupés par catégorie et problèmes de configuration." style="width:100%;" >}}
- Utilisez la [Cloudcraft Security Map][21] pour visualiser vos ressources et toutes les erreurs de configuration, vulnérabilités, risques liés à l'identité ou données sensibles qui leur sont associés. Pour plus d'informations sur ces superpositions, consultez la documentation [Cloudcraft overlay][22].

## Abonnez-vous aux rapports de synthèse hebdomadaires {#subscribe-to-weekly-digest-reports}

Recevez un résumé hebdomadaire de l'activité de Cloud Security sur la semaine écoulée, incluant les nouveaux problèmes de sécurité importants découverts au cours des sept derniers jours. Les abonnements au rapport de synthèse hebdomadaire sont gérés pour chaque utilisateur. Pour [vous abonner au rapport de synthèse hebdomadaire][11], vous devez disposer de l'autorisation `security_monitoring_signals_read`.

## Découvrez les menaces et vulnérabilités émergentes {#learn-about-emerging-threats-and-vulnerabilities}

Utilisez le [Security Research Feed][15] pour rester informé des derniers développements en matière de sécurité, avec un contenu géré par les équipes Security Research et Detection Engineering de Datadog. Pour plus d'informations, consultez la documentation [Security Research Feed][16].

## Étapes suivantes {#next-steps}

Pour commencer avec Cloud Security, accédez à la page [{{< ui >}}Cloud Security Setup{{< /ui >}}][3] dans Datadog, qui contient des étapes détaillées sur la façon de configurer Cloud Security. Pour plus d'informations, consultez [Setting Up Cloud Security][10].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/workload_protection/
[2]: /fr/security/cloud_security_management/misconfigurations/
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/security/csm
[5]: /fr/glossary/#posture-score
[6]: /fr/security/notifications/
[7]: https://app.datadoghq.com/security/compliance
[8]: /fr/security/cloud_security_management/identity_risks/
[9]: /fr/security/cloud_security_management/vulnerabilities/
[10]: /fr/security/cloud_security_management/setup/
[11]: https://app.datadoghq.com/security/configuration/reports
[12]: https://app.datadoghq.com/infrastructure/catalog
[13]: /fr/infrastructure/resource_catalog
[14]: /fr/security/security_inbox
[15]: https://app.datadoghq.com/security/feed
[16]: /fr/security/research_feed
[17]: /fr/security/cloud_security_management/security_graph
[18]: /fr/security/detection_rules/
[19]: /fr/security/automation_pipelines/
[20]: /fr/security/audit_trail/
[21]: https://app.datadoghq.com/security/map
[22]: /fr/datadog_cloudcraft/overlays/#security
[23]: /fr/dashboards/
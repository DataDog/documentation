---
description: Visualisez et analysez l'infrastructure cloud AWS, Azure et GCP avec
  des diagrammes Cloudcraft en direct dans Datadog pour le dépannage, l'analyse de
  sécurité et l'optimisation des coûts.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-architecture-diagrams-cost-compliance-cloudcraft-datadog/
  tag: Blog
  text: Planifiez de nouvelles architectures et suivez votre empreinte cloud avec
    Cloudcraft (autonome)
- link: https://www.datadoghq.com/blog/introducing-cloudcraft/
  tag: Blog
  text: Créer des visualisations riches et actualisées de votre infrastructure AWS
    avec Cloudcraft dans Datadog
- link: https://www.datadoghq.com/blog/cloudcraft-security/
  tag: Blog
  text: Identifier et prioriser visuellement les risques de sécurité avec Cloudcraft
title: Cloudcraft dans Datadog
---

## Présentation

Cloudcraft propose un outil puissant de visualisation en lecture seule et en direct de votre architecture cloud, vous permettant d'explorer, d'analyser et de gérer votre infrastructure en toute simplicité. À ne pas confondre avec la [documentation de Cloudcraft autonome][1], ce guide décrit les fonctionnalités, la configuration et les cas d’usage de Cloudcraft *dans Datadog*, en détaillant ses avantages pour différents profils d’utilisateurs et en mettant en avant ses fonctionnalités clés.

<div class="alert alert-info">Cette documentation concerne le produit Cloudcraft <em>dans Datadog</em>. Pour obtenir des informations sur le produit autonome, consultez la documentation <a href="/cloudcraft">Cloudcraft (autonome)</a>.</div>

La fonctionnalité principale de Cloudcraft est sa capacité à générer des diagrammes d'architecture détaillés. Ces diagrammes représentent visuellement les ressources cloud AWS, Azure et GCP, vous permettant d'explorer et d'analyser vos environnements. Les diagrammes de Cloudcraft sont optimisés pour la clarté et les performances, offrant une interface intuitive pour naviguer dans les déploiements à grande échelle. Cela aide les équipes à :

- de remonter jusqu’à la cause première d’un incident via les dépendances d’infrastructure.
- de déterminer si l’infrastructure est la cause d’un incident, comme un trafic inter-régions entraînant une latence ou des coûts accrus.
- d'analyser et corriger les erreurs de configuration de sécurité les plus critiques.
- d'intégrer rapidement de nouveaux membres dans l’équipe.
- d'accélérer la résolution des incidents (MTTR) et les tâches de gouvernance proactive en simplifiant la navigation dans l’infrastructure.

{{< img src="datadog_cloudcraft/cloudcraft_with_gcp_tab.mp4" alt="Vidéo montrant un diagramme Cloudcraft dans la superposition de sécurité. Une ressource est sélectionnée, ouvrant un panneau latéral avec ses détails. L'option Changes est sélectionnée dans la partie gauche du panneau latéral. Dans la section Security du panneau latéral, plusieurs erreurs de configuration sont répertoriées. Le bouton Investigate en regard de l'une des erreurs de configuration est cliqué, ouvrant un nouveau panneau latéral avec les détails de l'erreur de configuration et une section Next Steps proposant les options Triage, Remediation et More Actions" video=true >}} 

## Prérequis

{{< tabs >}}
{{% tab "AWS" %}}

- Pour accéder à Cloudcraft dans Datadog, vous devez disposer de [l'autorisation](#permissions) `cloudcraft_read`.
- La [collecte des ressources][2] doit être activée pour vos comptes AWS.
- Pour une expérience optimale, Datadog recommande d’utiliser la politique AWS gérée [`SecurityAudit`][5], ou la politique plus permissive [`ReadOnlyAccess`][6].

- L’affichage du contenu de la [superposition Sécurité][10] nécessite l’activation de produits supplémentaires :
  - Pour afficher les erreurs de configuration de sécurité et les risques liés aux identités, activez [Cloud Security][3].
  - Pour afficher les données sensibles, activez [Sensitive Data Scanner][12]. Pour qu’un utilisateur puisse activer la couche, il doit disposer de l'autorisation [`data_scanner_read`][13].

**Remarque** : Cloudcraft s’adapte aux permissions restrictives en excluant les ressources inaccessibles. Par exemple, si vous ne donnez pas la permission de lister les buckets S3, ces derniers ne s’afficheront pas. Si des ressources sont bloquées par les permissions, une alerte apparaît dans l’interface.

<div class="alert alert-warning">
L'activation de la collecte de ressources peut avoir un impact sur vos coûts AWS CloudWatch. Pour éviter ces frais, désactivez les métriques <strong>Usage</strong> dans l'onglet <strong>Metric Collection</strong> du <a href="https://app.datadoghq.com/integrations/amazon-web-services">carré d'intégration AWS de Datadog</a>.
</div>

{{< img src="/infrastructure/resource_catalog/aws_usage_toggle.png" alt="Le service Usage mis en évidence dans l'onglet Metric Collection du carré d'intégration AWS" style="width:100%;" >}}

[2]: /fr/integrations/amazon_web_services/#resource-collection
[3]: /fr/security/cloud_security_management
[5]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/SecurityAudit.html
[6]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ReadOnlyAccess.html
[10]: /fr/datadog_cloudcraft/overlays#security
[12]: /fr/security/sensitive_data_scanner
[13]: /fr/account_management/rbac/permissions/#compliance

{{% /tab %}}
{{% tab "Azure" %}}

- Pour accéder à Cloudcraft dans Datadog, vous devez disposer de [l'autorisation](#permissions) `cloudcraft_read`.
- Vous devez disposer du rôle Admin Datadog, ou de tout rôle doté de l'autorisation `azure_configurations_manage`. Consultez les instructions de [configuration Azure][16] pour en savoir plus.

- Activez la [collecte de ressources][14] pour vos comptes Azure :
  1. Accédez à [**Integrations > Azure**][15].
  2. Ajoutez votre abonnement Azure en sélectionnant **+ Add New App Registration** s'il n'a pas encore été ajouté.
  3. Sélectionnez l'App Registration contenant votre abonnement Azure.
  4. Dans l'onglet Resource Collection, assurez-vous que le bouton **Enable Resource Collection** est activé.

- L’affichage du contenu de la [superposition Sécurité][10] nécessite l’activation de produits supplémentaires :
  - Pour afficher les erreurs de configuration de sécurité et les risques liés aux identités, activez [Cloud Security][3].

[3]: /fr/security/cloud_security_management
[10]: /fr/datadog_cloudcraft/overlays#security
[14]: /fr/getting_started/integrations/azure/
[15]: https://app.datadoghq.com/integrations/azure
[16]: /fr/integrations/guide/azure-manual-setup/?tab=azurecli#setup

{{% /tab %}}
{{% tab "GCP" %}}

- Pour accéder à Cloudcraft dans Datadog, vous devez disposer de [l'autorisation](#permissions) `cloudcraft_read`.
- Activez la [collecte de ressources][17] pour vos comptes GCP :
  1. Dans Datadog, accédez à **Datadog Setup > Integration Catalog > Google Cloud**.
  2. Cliquez sur le nom de votre projet, puis sélectionnez **Resource Collection**.
  3. Activez le bouton **Enable Resource Collection**.

- L’affichage du contenu de la [superposition Sécurité][10] nécessite l’activation de produits supplémentaires :
  - Pour afficher les erreurs de configuration de sécurité et les risques liés aux identités, activez [Cloud Security][3].

**Remarque** : la vue Cost de [Cloud Cost Management][11] et les données sensibles dans la superposition de sécurité ne sont pas disponibles pour les comptes GCP. La vue CCM Recommendations est prise en charge.

[3]: /fr/security/cloud_security_management
[10]: /fr/datadog_cloudcraft/overlays#security
[11]: /fr/datadog_cloudcraft/overlays/ccm/
[17]: /fr/integrations/google_cloud_platform/#resource-changes-collection
[18]: https://app.datadoghq.com/integrations/google-cloud-platform
[19]: /fr/datadog_cloudcraft/overlays#observability

{{% /tab %}}
{{< /tabs >}}

## Prise en main

Pour commencer avec Cloudcraft, procédez comme suit :
1. Accédez à [**Infrastructure > Resources > Cloudcraft**][7].
2. Un diagramme en temps réel des ressources s’affiche dans votre environnement.

**Remarque** : si votre environnement comporte plus de 10 000 ressources, filtrez le diagramme par compte, région ou tags pour l'afficher.

{{< img src="datadog_cloudcraft/getting_started_3.png" alt="Page de démarrage de Cloudcraft, affichant une liste de ressources pour le compte et la région sélectionnés" style="width:100%;" >}}

<div class="alert alert-tip">Le nom du compte dans la liste déroulante <strong>Account</strong> provient de vos tags de compte AWS dans le carré d'intégration AWS. Pour Azure, le nom de l'<strong>Subscription</strong> provient du nom d'abonnement dans la liste des abonnements gérés de votre carré d'intégration Azure. Pour GCP, la liste déroulante <strong>Project</strong> répertorie vos ID de projet GCP issus du carré d'intégration Google Cloud.
</div>

### Group By

La fonctionnalité Group By permet à Cloudcraft de diviser votre diagramme en sections distinctes selon différents types de regroupement. Cela offre une vue claire et structurée de vos ressources, particulièrement utile pour les environnements cloud complexes.

Activez le bouton **Show All Controls** pour afficher les options **Group By** disponibles. Vous pouvez supprimer des regroupements spécifiques en décochant des options telles que VPC et Region. Pour consulter la structure d'imbrication actuelle et ajouter le calque Network ACL (liste de contrôle d'accès réseau), cliquez sur le menu **+ Tags**.

{{< img src="datadog_cloudcraft/cloudcraft_group_by_with_network_acl_2.png" alt="Fonctionnalité Group by dans Cloudcraft, avec le menu Group By mis en évidence." >}}

#### Group by tags

Vous pouvez regrouper les ressources par tags AWS et Azure, tels que app, service, team ou cost center, pour organiser votre vue par équipe ou par charge de travail. Lors du regroupement par tags, des étiquettes codées par couleur s'affichent sur chaque groupe. Lors du regroupement par tag `service`, un bloc surélevé s'affiche pour indiquer visuellement le regroupement par service.

**Remarque** : le regroupement par tags est pris en charge pour les tags AWS, les tags Azure et les étiquettes GCP (par exemple, `Project`). Les tags de l'Agent Datadog (par exemple, les tags `env` ou `team` configurés localement) ne sont pas pris en charge.

{{< img src="datadog_cloudcraft/cloudcraft_group_by_with_team_tags_2.png" alt="Page d'accueil de Cloudcraft avec Group by mis en évidence, et regroupement par Team" >}}

### Vues enregistrées

Les vues enregistrées vous permettent de sauvegarder des filtres spécifiques appliqués à votre diagramme, afin de faciliter le diagnostic sur des comptes, régions, environnements ou ressources ciblés.

Pour appliquer une vue enregistrée à votre diagramme :

- Accédez à [**Infrastructure > Resources > Cloudcraft**][7]. Sélectionnez un ou plusieurs comptes, régions et ressources. Appliquez les filtres souhaités, puis cliquez sur **+Save as new view**.
- Choisissez la vue enregistrée souhaitée dans le menu en haut du diagramme : celui-ci se mettra à jour automatiquement.

{{< img src="datadog_cloudcraft/saved_views.png" alt="Capture d’écran des vues enregistrées" style="width:50%;" >}}

### Explorer les ressources

Utilisez les fonctions de zoom et survol pour repérer les ressources critiques. En zoomant, des noms supplémentaires s’affichent. Le survol d’une ressource fait apparaître un panneau d’information basique. Un clic ouvre un panneau latéral contenant des données d’observabilité, de coûts, de sécurité et des liens vers d’autres produits Datadog.

{{< img src="datadog_cloudcraft/cloudcraft_with_security_3.mp4" alt="Vidéo montrant la fonctionnalité de zoom et de survol dans Cloudcraft, ainsi que le clic sur une ressource pour ouvrir le panneau latéral" video=true >}}

#### Basculer la projection

Utilisez l’option de projection pour passer de la vue 3D (par défaut) à une vue 2D en top-down.

{{< img src="datadog_cloudcraft/cloudcraft_2D_3.png" alt="Page d'accueil de Cloudcraft avec le bouton 2D activé" >}}

### Filtres et recherche

Les diagrammes peuvent être filtrés par tags (équipe, application, service, etc.), ce qui permet de se concentrer sur les ressources pertinentes tout en conservant le contexte des connexions. Cloudcraft propose également une fonction puissante de recherche et de surlignage pour localiser facilement des ressources ou groupes de ressources.

Cliquez sur le menu **+ Filter** pour filtrer vos ressources par tags couramment utilisés tels que service, team, region, etc. Cliquez également sur l'option **More Filters** pour filtrer par tags AWS et Azure, tags personnalisés et tags Terraform. L'option de filtre recharge le diagramme pour n'afficher que l'infrastructure correspondant aux critères de filtre.

### Recherche et surlignage

Utilisez la barre de recherche pour localiser des ressources dans le diagramme par nom, ID ou tag. Cette fonctionnalité est efficace pour trouver des ressources spécifiques au sein de votre architecture cloud. Elle met en évidence les critères de recherche dans le diagramme, sans créer de nouveau diagramme, en grisisant les éléments qui ne correspondent pas aux critères de recherche.

{{< img src="datadog_cloudcraft/search_highlight_5.mp4" alt="Vidéo montrant la fonctionnalité de recherche et de mise en évidence dans Cloudcraft" video=true >}}

## Autorisations

Pour accéder à Cloudcraft dans Datadog, vous devez disposer de la permission `cloudcraft_read`. Cette permission est incluse par défaut dans le rôle Read Only de Datadog. Si votre organisation utilise des rôles personnalisés, ajoutez cette permission au rôle concerné. Pour plus d’informations, consultez la [documentation RBAC][14].

## Étapes suivantes

Apprenez à naviguer entre les [superpositions intégrées][4] pour consulter votre architecture selon plusieurs axes d’analyse. Chaque superposition est conçue pour soutenir des objectifs opérationnels spécifiques :

- [Infrastructure][8] : vue d’ensemble des services et ressources.
- [Observability][9] : indique les hosts où l’Agent est installé et les fonctionnalités d’observabilité activées.
- [Security][10] : visibilité sur IAM, firewall et groupes de sécurité.
- [Cloud Cost Management][11] : suivi et optimisation des dépenses liées aux ressources.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloudcraft
[2]: /fr/integrations/amazon_web_services/#resource-collection
[3]: /fr/security/cloud_security_management
[4]: /fr/datadog_cloudcraft/overlays
[5]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/SecurityAudit.html
[6]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ReadOnlyAccess.html
[7]: https://app.datadoghq.com/cloud-maps
[8]: /fr/datadog_cloudcraft/overlays#infrastructure
[9]: /fr/datadog_cloudcraft/overlays#observability
[10]: /fr/datadog_cloudcraft/overlays#security
[11]: /fr/datadog_cloudcraft/overlays/ccm/
[12]: /fr/security/sensitive_data_scanner
[13]: /fr/account_management/rbac/permissions/#compliance
[14]: /fr/account_management/rbac/permissions/#infrastructure
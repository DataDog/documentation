---
further_reading:
- link: https://www.datadoghq.com/blog/cloud-architecture-diagrams-cost-compliance-cloudcraft-datadog/
  tag: Blog
  text: Planifiez de nouvelles architectures et suivez votre empreinte cloud avec
    Cloudcraft (autonome)
- link: https://www.datadoghq.com/blog/introducing-cloudcraft/
  tag: Blog
  text: Créer des visualisations riches et actualisées de votre infrastructure AWS
    avec Cloudcraft dans Datadog
title: Cloudcraft dans Datadog
---

## Section Overview

Cloudcraft propose un outil puissant de visualisation en lecture seule et en direct de votre architecture cloud, vous permettant d'explorer, d'analyser et de gérer votre infrastructure en toute simplicité. À ne pas confondre avec la [documentation de Cloudcraft autonome][1], ce guide décrit les fonctionnalités, la configuration et les cas d’usage de Cloudcraft *dans Datadog*, en détaillant ses avantages pour différents profils d’utilisateurs et en mettant en avant ses fonctionnalités clés.

<div class="alert alert-info">Cette documentation concerne le produit Cloudcraft <em>dans Datadog</em>. Pour obtenir des informations sur le produit autonome, consultez la documentation <a href="/cloudcraft">Cloudcraft (autonome)</a>.</div>

La fonctionnalité principale de Cloudcraft est sa capacité à générer des diagrammes d’architecture détaillés. Ces diagrammes représentent visuellement les ressources cloud AWS, ce qui vous permet d’explorer et d’analyser vos environnements. Les diagrammes Cloudcraft sont optimisés pour la clarté et les performances, offrant une interface intuitive pour naviguer dans des déploiements à grande échelle. Cela permet aux équipes :

- de remonter jusqu’à la cause première d’un incident via les dépendances d’infrastructure.
- de déterminer si l’infrastructure est la cause d’un incident, comme un trafic inter-régions entraînant une latence ou des coûts accrus.
- d'analyser et corriger les erreurs de configuration de sécurité les plus critiques.
- d'intégrer rapidement de nouveaux membres dans l’équipe.
- d'accélérer la résolution des incidents (MTTR) et les tâches de gouvernance proactive en simplifiant la navigation dans l’infrastructure.

{{< img src="datadog_cloudcraft/cloudcraft_with_ccm_2.mp4" alt="Cloudcraft in Datadog video" video=true >}}

<div class="alert alert-info">Cloudcraft dans Datadog est actuellement disponible uniquement pour les comptes AWS.</a></div>

### Prérequis

- Pour accéder à Cloudcraft dans Datadog, vous devez disposer de [l'autorisation](#permissions) `cloudcraft_read`.
- La [collecte des ressources][2] doit être activée pour vos comptes AWS.
- Pour une expérience optimale, Datadog recommande d’utiliser la politique AWS gérée [`SecurityAudit`][5], ou la politique plus permissive [`ReadOnlyAccess`][6].
- L’affichage du contenu de la [superposition Sécurité][10] nécessite l’activation de produits supplémentaires :
  - Pour afficher les erreurs de configuration de sécurité et les risques liés aux identités, activez [Cloud Security][3].
  - Pour afficher les données sensibles, activez [Sensitive Data Scanner][12]. Pour qu’un utilisateur puisse activer la couche, il doit disposer de l'autorisation [`data_scanner_read`][13].

**Remarque** : Cloudcraft s’adapte aux permissions restrictives en excluant les ressources inaccessibles. Par exemple, si vous ne donnez pas la permission de lister les buckets S3, ces derniers ne s’afficheront pas. Si des ressources sont bloquées par les permissions, une alerte apparaît dans l’interface.

<div class="alert alert-danger"><strong>Remarque</strong> : L’activation de la collecte des ressources peut affecter vos coûts AWS CloudWatch. Pour éviter ces frais, désactivez les métriques <strong>Usage</strong> dans l’onglet <strong>Metric Collection</strong> de l’<a href="https://app.datadoghq.com/integrations/amazon-web-services">intégration AWS Datadog</a>.<br/>

{{< img src="/infrastructure/resource_catalog/aws_usage_toggle.png" alt="Bouton d'utilisation AWS dans les réglages du compte" style="width:100%;" >}}</div>

## Prise en main

Pour commencer avec Cloudcraft, procédez comme suit :
1. Accédez à [**Infrastructure > Resources > Cloudcraft**][7].
2. Un diagramme en temps réel des ressources s’affiche dans votre environnement.

 **Remarque** : pour les environnements comportant plus de 10 000 ressources, vous devez filtrer le diagramme par compte, région ou tags pour qu’il puisse s’afficher.

{{< img src="datadog_cloudcraft/getting_started_3.mp4" alt="Vidéo montrant le démarrage dans Cloudcraft avec la sélection du compte, de la région et des ressources" video=true; >}}

**Remarque** : le nom du compte dans le menu déroulant **Account** provient des tags de votre compte AWS dans le carré d’intégration AWS.

### Group By

La fonctionnalité Group By permet à Cloudcraft de diviser votre diagramme en sections distinctes selon différents types de regroupement. Cela offre une vue claire et structurée de vos ressources, particulièrement utile pour les environnements cloud complexes.

Activez l’option **Show All Controls** pour afficher les options **Group By** disponibles. Vous pouvez également désactiver certains regroupements (comme VPC ou Region) en décochant les cases correspondantes. Pour consulter la structure d’imbrication actuelle et ajouter la couche Network ACL (Network Access Control List), cliquez sur le menu **More**.

{{< img src="datadog_cloudcraft/cloudcraft_group_by_with_ccm.png" alt="Bouton d'utilisation AWS dans les paramètres du compte" >}}

#### Group by tags

Vous pouvez regrouper les ressources selon les tags AWS comme app, service, team ou cost center, pour organiser l’affichage par équipe ou charge de travail.

**Remarque** : le regroupement par tags est uniquement compatible avec les tags AWS. Les tags issus de l’Agent Datadog (par exemple `env` ou `team` définis localement) ne sont pas pris en charge.

{{< img src="datadog_cloudcraft/group_by_tag.mp4" alt="Fonction Regrouper par tag dans Cloudcraft, avec regroupement par Team et Cost Center" video=true >}}

### Vues enregistrées

Les vues enregistrées vous permettent de sauvegarder des filtres spécifiques appliqués à votre diagramme, afin de faciliter le diagnostic sur des comptes, régions, environnements ou ressources ciblés.

Pour appliquer une vue enregistrée à votre diagramme :

- Accédez à [**Infrastructure > Resources > Cloudcraft**][7]. Sélectionnez un ou plusieurs comptes, régions et ressources. Appliquez les filtres souhaités, puis cliquez sur **+Save as new view**.
- Choisissez la vue enregistrée souhaitée dans le menu en haut du diagramme : celui-ci se mettra à jour automatiquement.

{{< img src="datadog_cloudcraft/saved_views.png" alt="Capture d’écran des vues enregistrées" style="width:50%;" >}}

### Explorer les ressources

Utilisez les fonctions de zoom et survol pour repérer les ressources critiques. En zoomant, des noms supplémentaires s’affichent. Le survol d’une ressource fait apparaître un panneau d’information basique. Un clic ouvre un panneau latéral contenant des données d’observabilité, de coûts, de sécurité et des liens vers d’autres produits Datadog.

{{< img src="datadog_cloudcraft/cloudcraft_with_ccm_2.mp4" alt="Vidéo montrant les fonctions de zoom et survol dans Cloudcraft et l’ouverture du panneau latéral" video=true >}}

#### Basculer la projection

Utilisez l’option de projection pour passer de la vue 3D (par défaut) à une vue 2D en top-down.

{{< img src="datadog_cloudcraft/cloudcraft_2D.png" alt="Page d’accueil Cloudcraft avec le basculement en 2D activé" >}}


### Filtres et recherche

Les diagrammes peuvent être filtrés par tags (équipe, application, service, etc.), ce qui permet de se concentrer sur les ressources pertinentes tout en conservant le contexte des connexions. Cloudcraft propose également une fonction puissante de recherche et de surlignage pour localiser facilement des ressources ou groupes de ressources.

Cliquez sur le menu **+Filter** pour filtrer rapidement vos ressources selon des tags courants (service, team, region, etc.). Cliquez ensuite sur **More Filters** pour filtrer par tags AWS, tags personnalisés ou tags Terraform. Le diagramme est rechargé pour n’afficher que l’infrastructure correspondant aux critères.

{{< img src="datadog_cloudcraft/cloudcraft_filter.png" alt="Fonction de filtrage dans Cloudcraft" >}}

### Recherche et surlignage

Utilisez la barre de recherche pour localiser des ressources dans le diagramme par nom, ID ou tag. Cette fonctionnalité est très efficace pour retrouver des ressources spécifiques dans votre architecture cloud. Elle met en surbrillance les critères de recherche dans le diagramme, sans en créer un nouveau, en grisant les éléments qui ne correspondent pas aux critères.

{{< img src="datadog_cloudcraft/search_highlight_2.mp4" alt="Vidéo montrant la recherche et le surlignage dans Cloudcraft" video=true >}}

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
[11]: /fr/datadog_cloudcraft/overlays#cloud-cost-management
[12]: /fr/security/sensitive_data_scanner
[13]: /fr/account_management/rbac/permissions/#compliance
[14]: /fr/account_management/rbac/
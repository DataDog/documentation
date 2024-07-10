---
aliases:
- /fr/security_platform/cspm/resource_catalog
- /fr/security/cspm/resource_catalog
- /fr/security/misconfigurations/resource_catalog
further_reading:
- link: /security/misconfigurations/
  tag: Documentation
  text: Cloud Security Management Misconfigurations
- link: /security/threats/
  tag: Documentation
  text: Cloud Security Management Threats
- link: https://www.datadoghq.com/blog/datadog-resource-catalog/
  tag: Blog
  text: Contrôler les ressources de votre infrastructure avec le Resource Catalog
    Datadog
is_beta: true
title: Resource Catalog Datadog
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Le Resource Catalog n'est pas disponible pour ce site.
</div>
{{< /site-region >}}

<div class="alert alert-info">Le Resource Catalog est disponible en version bêta.</div>

## Présentation

Le catalogue des ressources de Datadog offre un aperçu général des hosts et ressources au sein de vos environnements cloud et hybrides. Consultez toutes sortes d'informations telles que les tags, les détails de la configuration, la relation entre les ressources, les problèmes de configuration ainsi que les menaces. Identifiez l'équipe responsable d'une ressource spécifique ainsi que les problèmes de sécurité signalés. Accédez aux dashboards ainsi qu'aux vues Datadog qui reçoivent et surveillent les données de télémétrie et de sécurité pour chaque ressource.

Le Resource Catalog tire parti des intégrations cloud Datadog ainsi que de l'Agent Datadog pour recueillir des données à partir de différentes ressources cloud, comme des bases de données, des services de stockage et des hosts.

{{< img src="/infrastructure/resource_catalog/resource_catalog_2.png" alt="La page Resource Catalog affichant l'onglet Inventory trié par service" width="100%">}}

## Configuration

Par défaut, lorsque vous accédez au Resource Catalog, vous pouvez consulter les hosts surveillés par l'Agent Datadog ainsi que des ressources cloud récupérées pour d'autres produits Datadog, tels que NPM (Network Performance Monitoring) et DBM (Database Monitoring). Pour consulter d'autres ressources cloud dans le Resource Catalog, activez la collecte des ressources sur la page de configuration du [Resource Catalog][5]. Pour obtenir des informations sur les risques liés à la sécurité, activez [Cloud Security Management][1] pour chaque compte cloud.

**Remarque** : l'activation de Cloud Security Management entraîne automatiquement la collecte des ressources pour l'onglet Inventory du Resource Catalog. En revanche, l'activation de la collecte des ressources pour le Resource Catalog n'active _pas_ le produit CSM.

Le Resource Catalog permet :

- de former les nouveaux SRE et ingénieurs fiabilité en leur fournissant une visibilité totale sur toutes les ressources, leur relation et leur posture de sécurité, ainsi que des informations relatives aux équipes responsables de ces ressources et des services associés ;
- d'accélérer la reprise après incident en renforçant la confiance et en simplifiant la localisation des propriétaires des ressources en amont et en aval ;
- d'optimiser la couverture de sécurité en identifiant les ressources les plus susceptibles de présenter des problèmes de configuration ou celles qui ne signalent pas activement les problèmes de configuration liés à la sécurité ;
- de faciliter la pratique d'un bon tagging pour optimiser la mise en corrélation des données de télémétrie ;
- d'offrir aux responsables ingénierie une vue globale sur les pratiques de sécurité au sein des équipes et des comptes cloud.

## Parcourir le Resource Catalog

Explorez les ressources cloud de votre organisation Datadog sur la [page Resource Catalog][2]. Le catalogue détecte une ressource dans deux cas : si un Agent est installé dessus ou si une intégration cloud est configurée dessus. Les informations relatives aux ressources de votre organisation apparaissent dans les onglets Ownership et Security, avec deux vues : List et Map.

**Onglet Inventory** :
L'onglet Inventory affiche le contexte d'une ressource, notamment l'équipe responsable et les services associés. Il vous permet d'identifier et de fournir de manière proactive toute information manquante sur l'équipe responsable avant que vous n'en ayez besoin dans le cadre d'un incident. Le Resource Catalog présente des informations de configuration propres à chaque type de ressource. Vous pouvez effectuer une recherche de ressources par attributs de configuration spécifiques, comme `instance_type` pour un host ou `version` pour une base de données.

**Onglet Security** :
L'onglet Security vous permet de mieux comprendre les ressources présentant un risque pour la sécurité. En affichant les menaces et les problèmes de configuration associés aux ressources, vous pouvez résoudre le problème sans avoir à consacrer du temps et de l'énergie à la collecte du contexte de sécurité.

### Vue List

Les ressources du Resource Catalog peuvent être triées par plateforme cloud, type de ressource, compte, équipe, région, problèmes de configuration et menaces. Triez-les par **Threats** pour identifier les workloads affectés au cours des quatre dernières heures. Triez-les par **Misconfigurations** pour identifier les ressources cloud les plus susceptibles d'entraîner des problèmes de configuration.

Pour trouver une ressource spécifique, effectuez une recherche par nom. Pour afficher uniquement un sous-ensemble de ressources qui vous intéressent au sein de la liste, sélectionnez des facettes dans le volet de gauche. Par exemple, il peut être intéressant de filtrer les ressources par le nom de votre équipe ou de chercher les problèmes de configuration liés à des environnements et clusters spécifiques.

Si vous utilisez la solution [Datadog Teams][4], sélectionnez le bouton **Teams** dans le volet de gauche, puis celui correspondant aux équipes auxquelles vous êtes affecté pour consulter uniquement les ressources attribuées à ces équipes.

### Vue Map

La carte du Resource Catalog permet de visualiser les ressources au sein de votre organisation. Pour trouver une ressource spécifique, effectuez une recherche par son nom. Il peut être utile de regrouper les ressources par région et d'appliquer des filtres (fournisseur cloud et type de ressource, par exemple) afin de consulter uniquement les ressources correspondantes. Vous pouvez également utiliser le sélecteur `Fill by` pour afficher sur la carte les éléments filtrés par Misconfigurations ou Threats.

Si vous utilisez la solution [Datadog Teams][4], sélectionnez le bouton **Teams** dans le volet de gauche, puis celui correspondant aux équipes auxquelles vous êtes affecté pour consulter uniquement les ressources attribuées à ces équipes.

#### Problèmes de configuration

Chaque couleur correspond au niveau de gravité d'un problème de configuration (jusqu'au plus élevé) détecté sur la ressource. La couleur verte indique qu'une ressource a été configurée correctement. La couleur blanche correspond aux ressources qui ne sont pas surveillées par la solution Cloud Security Management Misconfigurations.

#### Menaces

Les menaces reflètent les données recueillies au cours des quatre dernières heures et sont disponibles uniquement pour les instances de calcul telles que Amazon EC2 et Azure VM. La couleur blanche indique qu'aucune menace active n'a été détectée. Les nuances allant du bleu au rouge reflètent les niveaux de gravité (jusqu'au plus élevé) des menaces détectées sur la ressource.

## Analyser une ressource

Cliquez sur une ressource pour ouvrir un panneau latéral contenant les informations suivantes :

- **Resource information** (informations sur la ressource), comme le type de ressource ainsi que le nom, le compte et les tags associés à la ressource.
- **Security misconfigurations** (problèmes de configuration liés à la sécurité), y compris les règles de sécurité et le statut le plus récent.
- **Real-time threat signals** (signaux de menace en temps réel) détectés sur la ressource par la solution Cloud Security Management Threats.
- **Resource definition** (définition de la ressource) au format JSON décrivant la configuration complète de la ressource.
- Un graphique interactif présentant les ressources connectées à la ressource examinée.

Cliquez sur le bouton **Share**, puis sélectionnez **Share event** pour partager un lien vers la ressource actuelle avec vos collègues par e-mail, via Slack, etc. Découvrez toutes les [intégrations de notification Datadog][3] disponibles pour cette fonctionnalité.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/setup
[2]: https://app.datadoghq.com/infrastructure/catalog
[3]: /fr/integrations/#cat-notification
[4]: /fr/account_management/teams
[5]: https://app.datadoghq.com/infrastructure/catalog/configuration
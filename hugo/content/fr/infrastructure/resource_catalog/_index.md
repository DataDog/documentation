---
aliases:
- /fr/security_platform/cspm/resource_catalog
- /fr/security/cspm/resource_catalog
- /fr/security/misconfigurations/resource_catalog
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentation
  text: Mauvaises configurations de sécurité dans le cloud
- link: /security/threats/
  tag: Documentation
  text: Protection des charges de travail
- link: https://www.datadoghq.com/blog/datadog-resource-catalog/
  tag: Blog
  text: Contrôler les ressources de votre infrastructure avec le Resource Catalog
    Datadog
- link: https://www.datadoghq.com/blog/infrastructure-troubleshooting-recent-changes/
  tag: Blog
  text: Résoudre les problèmes d'infrastructure plus rapidement avec les Changements
    récents
- link: https://www.datadoghq.com/blog/resource-catalog-natural-language-querying
  tag: Blog
  text: Utilisez un anglais simple pour interroger votre infrastructure multi-cloud
    dans le Catalogue de ressources
- link: https://www.datadoghq.com/blog/cambia-health-cost-optimization
  tag: Blog
  text: Comment Cambia Health Solutions a économisé 30 000 $ par mois grâce à la gestion
    des coûts du cloud et au Catalogue de ressources Datadog
is_beta: true
title: Resource Catalog Datadog
---
## Aperçu {#overview}

Le Catalogue de ressources Datadog est le centre névralgique de toutes vos ressources d'infrastructure. Il peut vous aider à gérer la conformité des ressources, à enquêter sur les causes profondes des incidents et à combler les lacunes d'observabilité de votre infrastructure. Avec le Catalogue de ressources, vous pouvez comprendre les informations clés sur les ressources telles que les métadonnées, la propriété, les configurations, les relations entre les actifs et les risques de sécurité actifs pour vos ressources.

Le Catalogue de ressources utilise les intégrations cloud de Datadog et l'Agent Datadog pour collecter des données à partir de ressources cloud telles que des hôtes, des bases de données et des services de stockage.

{{< img src="/infrastructure/resource_catalog/resource_catalog_new_2.png" alt="La page du Catalogue de ressources montrant l'onglet Catalogue, regroupé par type de ressource" width="100%">}}

### Cas d'utilisation {#use-cases}

#### Politiques de ressources et rapports {#resource-policies-and-reporting}
- Obtenez une visibilité sur la conformité de votre infrastructure en ce qui concerne la propriété, la gestion des versions, les migrations, etc.
- Facilitez de bonnes pratiques de balisage pour optimiser les insights de télémetrie croisée.
- Réduisez les risques d'application en identifiant et en corrigeant les vulnérabilités de sécurité dans les dépendances de vos services.
- Fournissez aux responsables techniques une vue d'ensemble des pratiques de sécurité à travers les équipes et les comptes cloud.
- Exportez des ressources pour la tenue de dossiers ou l'audit.

#### Résoudre les incidents et les problèmes de performance {#troubleshoot-incidents-and-performance-issues}
- Accédez à la télémetrie, aux tableaux de bord et à d'autres vues Datadog avec des insights riches pour comprendre la santé et la performance de vos ressources.
- Localisez les propriétaires d'équipe et de service des ressources pertinentes pour accélérer la récupération des incidents.
- Consultez les modifications de configuration des ressources pour identifier les causes profondes probables.

#### Optimisez l'observabilité {#optimize-observability}
- Identifiez les ressources qui peuvent être mieux surveillées par Datadog et comblez les lacunes d'observabilité.
- Assurez une couverture de sécurité adéquate en identifiant les ressources les plus susceptibles de malconfigurations ou qui ne signalent pas activement les malconfigurations de sécurité.

## Configurez {#setup}

Par défaut, lorsque vous naviguez vers le catalogue de ressources Datadog, vous pouvez voir les hôtes surveillés par l'Agent Datadog, ainsi que les ressources cloud explorées pour d'autres produits Datadog tels que CNM (Cloud Network Monitoring) et DBM (Database Monitoring). Pour voir des ressources cloud supplémentaires dans le catalogue de ressources Datadog, activez **l’extension de la collecte de ressources** depuis la page de configuration du [catalogue de ressources][5]. 

{{< img src="/infrastructure/resource_catalog/resource_catalog_settings.png" alt="La page de configuration du catalogue de ressources Datadog pour étendre la collecte de ressources" width="100%">}}

<div class="alert alert-warning">L'activation de la collecte de ressources peut avoir un impact sur vos coûts AWS CloudWatch. Pour éviter ces frais, désactivez les métriques <strong>Utilisation</strong> dans l’onglet <strong>collecte de métriques</strong> de la <a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog AWS Integration</a>.
</div>

{{< img src="/infrastructure/resource_catalog/aws_usage_toggle.png" alt="AWS Usage toggle dans les paramètres du compte" style="width:100%;" >}}

## Parcourez le Catalogue de ressources {#browse-the-resource-catalog}

Sur la [page du catalogue de ressources][2], explorez les ressources cloud dans votre organisation Datadog. Le catalogue détecte une ressource soit parce qu'un Agent est installé dessus, soit parce qu'une intégration cloud est configurée dessus. 

### Onglet Catalogue {#catalog-tab}

L'onglet Catalogue montre le contexte d'une ressource, y compris la propriété de l'équipe et les services associés. Il vous aide à identifier proactivement et à compléter les informations de propriété manquantes avant qu'elles ne soient nécessaires lors d'un incident. Le catalogue de ressources montre également les attributs des ressources personnalisés pour chaque type de ressource. Vous pouvez rechercher des ressources par attributs spécifiques tels que le type d'instance pour un hôte, ou la version pour une base de données.

**Remarque** : Si vous utilisez [Datadog Teams][4], sélectionnez le **Teams toggle** dans le panneau de gauche, puis sélectionnez le toggle des équipes auxquelles vous êtes assigné afin de n'afficher que les ressources qui leur sont attribuées. De plus, vous pouvez exporter votre liste de catalogue de ressources au format CSV depuis le coin supérieur droit de la liste.

Pour accéder à la console cloud pertinente pour toute ressource de votre liste, cliquez sur une ressource pour ouvrir un panneau latéral. Ensuite, cliquez sur le menu déroulant **Ouvrir la ressource** dans le coin supérieur droit pour être redirigé.

{{< img src="/infrastructure/resource_catalog/resource_catalog_sidepanel_2.png" alt="Panneau latéral du catalogue de ressources mettant en évidence le menu déroulant Ouvrir la ressource." >}}

### Enquêter sur un hôte ou une ressource {#investigate-a-host-or-resource}

<div class="alert alert-info">Aucun secret n'est affiché dans ce panneau. Tous les "secrets" affichés sont des chaînes générées aléatoirement qui ne présentent pas de risque pour la sécurité.</div>

Cliquer sur un hôte ouvre un panneau latéral avec des détails incluant :

- **Informations sur l'hôte** telles que le nom, le compte, le système d'exploitation, le type d'instance, les balises et les métadonnées associées à l'hôte.
- **Résumé de l'hôte** qui affiche les alertes de moniteur actives et les produits activés.
- **Télémetrie** incluant des métriques, des journaux, des traces et des processus.
- **Conteneurs** qui affiche des métriques pour les conteneurs attachés à l'hôte.
- **Carte infra** qui affiche un [diagramme Cloudcraft][17].
- **Relations** qui affiche une carte interactive des connexions à d'autres ressources.
- **Profils** corrélés avec l'hôte (nécessite [Profiler][20]).
- **Informations sur le réseau**, qui peuvent être filtrées par balises et affichées dans des graphiques personnalisables.
- **Modifications** montrant un historique personnalisable des changements apportés à l'hôte.
- **Sécurité** qui affiche des erreurs de configuration générales, des [erreurs de configuration IaC][21], des signaux, des vulnérabilités, des risques d'identité et des informations d'accès.
- **Coût** qui inclut des recommandations pour réduire les coûts de l'hôte.
- **Agent** qui affiche la configuration de l'Agent au format JSON
- **OTel Collector** qui affiche la configuration de l'OpenTelemetry Collector (en aperçu)

{{< img src="/infrastructure/resource_catalog/resource_catalog_host_side_panel-2.png" alt="Catalogue de ressources avec le panneau latéral hôte ouvert" width="100%">}}

Cliquer sur n'importe quelle ressource ouvre un panneau latéral avec des détails incluant :

- **Informations sur la ressource** incluant des balises spécifiques à la ressource et la définition de la ressource au format JSON
- **Télémetrie** incluant des métriques et des journaux
- **Relations** qui affiche une carte interactive des connexions à d'autres ressources
- **Modifications** montrant un historique des changements apportés à la ressource
- **Sécurité** qui affiche des malconfigurations, des signaux, des vulnérabilités et des risques liés à l'identité

## Modifications de la ressource (en aperçu) {#resource-changes-in-preview}

{{< callout url="https://www.datadoghq.com/product-preview/recent-changes-tab/" >}}
Les modifications de la ressource sont en aperçu. Cliquez sur <strong>Request Access</strong> et remplissez le formulaire pour demander l'accès.
{{< /callout >}} 

Les modifications de la ressource offrent une visibilité et un contrôle sur les changements de configuration de votre infrastructure cloud. Cela vous aide à surveiller les modifications apportées aux ressources, facilitant le dépannage des incidents et la compréhension de l'évolution de votre environnement.

Pour plus d'informations, voir [Modifications de la ressource][16].

{{< img src="/infrastructure/resource_catalog/resource-changes.png" alt="Interface Datadog Resource Changes montrant une liste des changements de configuration d'infrastructure. L'écran affiche une instance de VM nommée \"vm-new-jmcintyre-kafka\" avec une mise à jour du StorageProfile, incluant une vue de différence côte à côte mettant en évidence les changements au format JSON. Le tableau montre plusieurs ressources avec des horodatages, des types de modification (principalement \"UPDATE\") et des détails des modifications. Des filtres sont disponibles en haut pour le cloud, la région, l'environnement et d'autres attributs." width="100%">}}


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/setup
[2]: https://app.datadoghq.com/infrastructure/catalog
[3]: /fr/integrations/#cat-notification
[4]: /fr/account_management/teams
[5]: https://app.datadoghq.com/infrastructure/catalog/configuration
[6]: /fr/integrations/amazon_config/#resource-changes-collection
[7]: https://app.datadoghq.com/integrations
[8]: /fr/integrations/google_cloud_platform/#resource-changes-collection
[9]: https://www.datadoghq.com/product-preview/recent-changes-tab/
[10]: https://docs.datadoghq.com/fr/security/cloud_security_management/misconfigurations/
[11]: https://docs.datadoghq.com/fr/security/threats/
[12]: https://docs.datadoghq.com/fr/security/cloud_security_management/identity_risks/
[13]: https://docs.datadoghq.com/fr/security/cloud_security_management/vulnerabilities/
[14]: https://app.datadoghq.com/integrations/azure
[15]: https://docs.datadoghq.com/fr/infrastructure/resource_catalog/schema/
[16]: /fr/infrastructure/resource_catalog/resource_changes/
[17]: /fr/datadog_cloudcraft/
[18]: /fr/integrations/ntp/
[19]: /fr/infrastructure/process/?tab=linuxwindows#installation
[20]: /fr/profiler/enabling/
[21]: /fr/security/code_security/iac_security/
---
algolia:
  tags:
  - service catalog
aliases:
- /fr/tracing/faq/service_catalog/
further_reading:
- link: /tracing/service_catalog/service_definition_api/
  tag: Documentation
  text: Enregistrer des services avec l'API de définition de service
- link: /tracing/service_catalog/guides/understanding-service-configuration
  tag: Guide
  text: Analyser la configuration d'un service
- link: /tracing/service_catalog/guides/upstream-downstream-dependencies
  tag: Guide
  text: Visualiser les dépendances en amont et en aval pendant un incident actif
- link: https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/
  tag: Blog
  text: Gérer les entrées du Service Catalog avec le schéma JSON de définition de
    service
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Gagner en visibilité sur les risques, vulnérabilités et attaques avec la vue
    Security d'APM
- link: https://www.datadoghq.com/blog/service-catalog-setup/
  tag: Blog
  text: Ajouter facilement des tags et des métadonnées à vos services à l'aide de
    la configuration simplifiée du Service Catalog
kind: documentation
title: Service Catalog Datadog
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Le Service Catalog n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< img src="tracing/service_catalog/service_catalog.mp4" video=true alt="Explorer le Service Catalog" style="width:100%;" >}}

## Présentation

Le Service Catalog de Datadog vous permet d'accéder aux informations clés sur tous les services de votre organisation depuis une interface centralisée. Gérez les services de bout en bout à grande échelle, visualisez les performances en temps réel, détectez et corrigez les risques de fiabilité et de sécurité, et gérez les dépendances de votre application depuis un seul et même endroit. Accédez à des outils de communication collaboratifs comme Slack, à un système de contrôle du code source comme GitHub, aux dashboards Datadog ainsi qu'aux vues Datadog qui reçoivent et surveillent les données de télémétrie pour chaque service.

Comparé à la liste des services APM, le Service Catalog comprend les services qui ne génèrent pas activement de métriques de trace, ce qui signifie que vous n'avez pas besoin d'instrumenter votre service pour qu'il apparaisse. Les services détectés par USM et RUM sont eux aussi automatiquement pris en compte. Le Service Catalog permet de visualiser les données sur une heure en arrière. Si vous ne voyez pas vos services APM dans le Service Catalog, il est probable qu'ils n'aient pas envoyé de métriques de trace actives au cours de la dernière heure. Ces services restent toutefois visibles dans la liste des services APM.

Le Service Catalog est utile pour :
- Former les nouveaux développeurs et SRE et leur offrant une visibilité totale sur l'ensemble des services et leurs structures, avec des liens permettant d'obtenir plus d'informations.
- Optimiser les interventions en établissant clairement les personnes responsables et les canaux de communication appropriés, tout en facilitant l'accès aux informations de surveillance et de dépannage.
- Intégrer des liens vers des solutions et des outils de dépannage (comme les runbooks ou la documentation) directement dans les outils d'observabilité déjà utilisés par les ingénieurs.
- Accélérer la reprise après incident en renforçant la confiance et en simplifiant l'identification des propriétaires des services ainsi que des dépendances en amont et en aval.
- Détecter les services qui ne transmettent pas de données d'observabilité ou dont les données ne sont pas surveillées.
- Faciliter la mise en œuvre des bonnes pratiques de tagging pour optimiser les données de télémétrie croisée.
- Offrir aux responsables techniques une vue d'ensemble des pratiques en matière de fiabilité au sein des équipes et des services.
- Détecter les problèmes tels que les SLO et les monitors manquants, ou les services sans personne responsable.
- Identifier de manière proactive les services exposés aux attaques ciblant les applications.
- Réduire les risques pour les applications en identifiant et en corrigeant les vulnérabilités de sécurité connues dans les dépendances de vos services.

## Explorer le Service Catalog

La [page Service Catalog][1] vous permet de consulter la liste des services de votre organisation Datadog, qu'ils aient été détectés à partir des données recueillies ou définis manuellement par quelqu'un via le [processus d'enregistrement](#enregistrer-un-nouveau-service). Pour trouver un service précis, recherchez son nom. Pour filtrer la liste, sélectionnez une ou plusieurs facettes. Par exemple, pour afficher les services détectés n'ayant encore aucune définition de service, cliquez sur la facette **Ownership Info > Telemetry Only**. Vous pouvez filtrer par nom d'équipe ou choisir les métriques associées à des environnements ou clusters spécifiques afin de ne conserver que les services correspondants dans la liste.

Vous avez la possibilité de trier la liste du Service Catalog en fonction du type de service, du nom de service ou d'autres colonnes. Pour visualiser les services sans personne responsable, triez la liste par « team » dans la vue Ownership et repérez les champs vides. Vous pouvez également trier par « urgency » dans la vue Reliability pour identifier les services avec le plus de monitors déclenchés.

Les informations sur le service fournies par la définition de service ou par les produits Datadog recueillant des données d'observabilité sont classées dans quatre vues : Ownership, Reliability, Performance et Security.

### Vue Ownership

Depuis l'onglet **Ownership**, cliquez sur les icônes dans les colonnes **Contact** et **Repo** pour accéder aux outils et projets spécifiés dans la définition de service. Par exemple, vous pouvez accéder au canal Slack de l'équipe responsable ou au référentiel GitHub contenant le code du service.

La colonne **Telemetry** affiche les types de données de télémétrie que Datadog recueille pour le service. Cliquez sur une icône pour accéder à la vue du produit Datadog correspondant. Par exemple, lorsque l'Agent envoie des traces à Datadog, vous pouvez cliquer sur l'icône **Traces** pour les visualiser dans APM.

Triez le tableau en fonction de la colonne **Team** ou **On Call** pour afficher les services dont chaque équipe est responsable et identifier ceux dont la propriété et la responsabilité ne sont pas encore spécifiées.

### Vue Reliability

L'onglet **Reliability** contient des informations sur la stabilité de vos services. Triez le tableau en cliquant sur les colonnes de la liste pour afficher :

- Les services récemment déployés ou non déployés depuis longtemps.
- Les services générant le plus d'erreurs et s'il s'agit de nouveaux problèmes.
- Les services ayant des incidents en cours.
- Les services ayant des monitors déclenchés.

Cliquez sur l'icône des paramètres à droite pour masquer des colonnes de la liste des services.

### Vue Performance

L'onglet **Performance** offre plusieurs façons de visualiser les performances de vos services afin d'identifier ceux qui nécessitent le plus votre attention.

Le menu déroulant de l'environnement fonctionne comme un filtre. Par exemple, sélectionnez `env:prod` pour visualiser uniquement les services ayant envoyé des données de performance (télémétrie APM/USM) dans `env:prod` au cours de la dernière heure. Vous pouvez également sélectionner `env:*` pour visualiser tous les environnements au sein desquels un service émet des données de télémétrie, et développer les informations pour visualiser les métriques de performance détaillées pour chaque environnement. 
La deuxième liste déroulante vous permet de filtrer les données APM visibles dans la vue Performance en fonction du [deuxième tag primaire][12] des [métriques de trace][13] APM. Cette liste déroulante n'affecte pas le nombre de services affichés dans la liste.

Vous pouvez modifier l'environnement par défaut dans **APM > Setup & Configuration > Settings**. 

{{< img src="tracing/service_catalog/svc-cat-perf-view.png" alt="Vue Performance avec les filtres env:* et cluster-name:*" style="width:100%;" >}}

Cliquez sur les colonnes pour trier le tableau et visualiser les services qui :
- ont été récemment déployés ou n'ont pas été déployés depuis longtemps
- reçoivent le plus de requêtes par seconde ou ne reçoivent aucun trafic
- enregistrent la latence la plus élevée à différents centiles
- enregistrent le nombre ou le taux d'erreurs le plus élevé
- s'exécutent sur le plus de pods, de hosts ou d'environnements sans serveur
- disposent de dashboards associés afin de visualiser des données de performance plus détaillées ou d'identifier les services pour lesquels des dashboards doivent être ajoutés
- ont les [scores Apdex][5] les plus élevés ou les plus bas
- ont des monitors déclenchés

Cliquez sur l'icône des paramètres à droite pour masquer des colonnes de métrique de la liste.

### Vue Security
L'**onglet Security** vous permet d'évaluer et d'améliorer la sécurité de vos services de différentes façons. Vous pouvez notamment consulter le nombre de vulnérabilités identifiées dans les bibliothèques open source ainsi que leur sévérité, mais aussi déterminer comment les personnes malveillantes ciblent vos services. Cliquez sur les colonnes pour trier le tableau et afficher les services qui :

- exposent des vulnérabilités connues, avec le niveau de sévérité de chaque vulnérabilité
- reçoivent le plus de tentatives d'attaque
- sont les plus ciblés par les personnes malveillantes
- font l'objet des menaces les plus sévères, lorsque les services sont affectés par les attaques
- sont surveillés et protégés par la solution [Application Security Management][11]

Pour accéder à des informations supplémentaires sur les vulnérabilités de sécurité et les signaux, cliquez sur la ligne d'un service pour ouvrir les détails dans un volet latéral. Vous pouvez également cliquer sur le bouton **View Service Details** qui apparaît afin d'ouvrir la page du service, puis cliquer sur l'onglet Security.

Cliquez sur l'icône des paramètres à droite pour masquer des colonnes de métrique de la liste des services.

## Analyser un service

Cliquez sur un service pour ouvrir un volet latéral contenant les informations suivantes :

- **Informations sur les personnes responsables** selon la définition du service, y compris des liens pour contacter l'équipe, le code source et d'autres ressources comme la documentation et les dashboards.
- **Informations sur la fiabilité**, y compris le statut du déploiement, les SLO, les incidents en cours et les erreurs.
- **Graphiques des performances** illustrant les requêtes, les erreurs, la latence et le temps passé par les services en aval.
- **Informations sur la sécurité**, y compris les vulnérabilités connues exposées dans les bibliothèques du service, l'historique des attaques et leur type, l'identité des personnes malveillantes, les menaces de sécurité affectant vos services, et la possibilité de télécharger le Software Bill of Materials (SBOM, ou nomenclature logicielle) depuis l'onglet Libraries.

  {{< img src="tracing/service_catalog/libraries_sbom.png" alt="Image d'un service du Service Catalog mettant en évidence l'onglet Libraries et la possibilité de télécharger le SBOM" style="width:100%;" >}}

- **Statut de l'avancement de la configuration** pour les produits Datadog qui peuvent recueillir des données pour le service.
- **Définition du service** au format YAML, avec un lien vers le code source du service.
- Une service map interactive affichant les services en amont et en aval de ce service.


Cliquez sur **View Related** et sélectionnez une page dans le menu déroulant pour accéder aux pages associées dans Datadog, telles que la page Service APM et la service map pour ce service. Vous pouvez également accéder aux pages des données de télémétrie associées, telles que Distributed Tracing, Infrastructure, Network Performances, Log Management, RUM et Continuous Profiler.

## Accès et autorisations à base de rôles

Pour obtenir des informations générales, consultez les sections [Contrôle d'accès à base de rôles][9] et [Autorisations des rôles][10].
### Autorisation de lecture

L'autorisation de lecture du Service Catalog permet à un utilisateur de lire les données du Service Catalog, et donc d'accéder aux fonctionnalités suivantes :
- Liste du Service Catalog
- Interface de découverte
- Endpoint de définition de service : `/api/v2/services/definition/<nom_service>`

L'autorisation est activée par défaut dans le **rôle Read Only Datadog** et le **rôle standard Datadog**.

### Autorisation d'écriture

L'autorisation d'écriture du Service Catalog permet à un utilisateur de modifier les données du Service Catalog. Cette autorisation est requise pour les fonctionnalités suivantes :
- Ajouter ou mettre à jour une définition de service via l'endpoint `POST /api/v2/services/definitions`
- Supprimer une définition de service via l'endpoint `DELETE /api/v2/services/definition/<nom_service>`
- Effectuer le processus d'intégration dans l'interface de découverte de services
- Mettre à jour les métadonnées d'un service dans l'interface

L'autorisation est activée par défaut dans le **rôle Admin Datadog** et le **rôle standard Datadog**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /fr/integrations/github/
[5]: /fr/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
[6]: https://www.datadoghq.com/blog/unified-service-tagging/
[7]: /fr/tracing/service_catalog/service_definition_api/
[8]: /fr/tracing/service_catalog/setup/
[9]: /fr/account_management/rbac/
[10]: /fr/account_management/rbac/permissions/
[11]: /fr/security/application_security/how-appsec-works/
[12]: /fr/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog
[13]: /fr/tracing/metrics/metrics_namespace/
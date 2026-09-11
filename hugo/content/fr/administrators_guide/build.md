---
description: Créer votre installation Datadog et prioriser les fonctionnalités.
further_reading:
- link: /getting_started/integrations/
  tag: Documentation
  text: Débuter avec les intégrations
title: Créer votre installation Datadog
---

Après avoir planifié la conception et les meilleures pratiques de votre installation Datadog, concentrez-vous sur la construction de Datadog elle-même, en comprenant ce qui doit être installé et la meilleure façon d'y parvenir.

À mesure que votre infrastructure IT s'agrandit, vous devez établir des standards pour l'installation et l'utilisation de logiciels. Pour ce faire, il est important de développer des étapes précises et reproductibles pour configurer des logiciels de manière fiable tout en conservant la flexibilité dont vous avez besoin. Cette section explique comment Datadog peut s'intégrer efficacement à ces standards.

## Itération sur votre environnement

Dans la section [planification][7], vous avez exploré une gamme de sujets au sein d'une spécification de conception Datadog. Idéalement, chacune de ces questions devrait être entièrement étudiée et avoir reçu une réponse avant d'exécuter un déploiement à grande échelle. Cependant, l'ingénierie IT d'entreprise vous oblige souvent à faire une pause et à vous adapter au fur et à mesure que vous construisez votre installation.

### Priorisation des fonctionnalités

Il est possible d'échelonner l'installation de Datadog et d'augmenter progressivement la complexité. Certaines choses doivent être faites tôt, et d'autres peuvent attendre. Ce qui suit décrit une répartition de la façon dont vous pouvez appliquer les priorités primaires (besoins) par rapport aux priorités secondaires (souhaits) au fur et à mesure que vous faites évoluer votre installation Datadog.

**Primaires** :
1. Tags de service unifiés - `service:test` `env:prod` `version:1.x`
2. Profils de produits (Infrastructure, APM, Synthetic Monitoring, RUM, Log Management, etc.)
3. Spécificités des intégrations primaires (ports, identifiants, URL)

**Secondaires** :
1. Intégrations secondaires
2. Options avancées/spécifiques à des cas d'usage

## Assistance interne

En tant que propriétaire de votre plateforme Datadog, vous devrez probablement créer un moyen pour vos utilisateurs de consommer votre installation. Il peut s'agir d'un wiki, d'une intégration ServiceNow ou d'un tableau Jira qui publiera Datadog et offrira un moyen de le demander. Il s'agit du guide que vos clients internes utiliseront pour déployer Datadog sur les applications et l'infrastructure qu'ils gèrent. 

La forme de ce système sera différente selon votre environnement, mais il existe quelques éléments fondamentaux qui peuvent accélérer cette création :

1. Créer une liste des tâches d'installation Datadog, telles que :

    - Intégrer une nouvelle application, incluant tous ses logiciels et son infrastructure. 
    - Ajouter un compte cloud
    - Créer un nouveau nœud de cluster vSphere
    - Créer une nouvelle instance de base de données
    - Surveiller un nouveau produit logiciel tiers
    - Ajouter des tests Synthetic Monitoring
    - Créer une alerte/un monitor
    - Créer/mettre à jour un dashboard

2. La collecte des ensembles d'informations minimales peut inclure des éléments tels que :

    - Code de centre de coûts interne
    - Nom de l'application, propriétaire, équipe des opérations 
    - Éléments spécifiques aux conditions locales 

Ces définitions s'appuient sur les fondations du plan architectural terminé lors de la phase de planification. Cependant, si vous rencontrez des difficultés avec l'une de ces définitions, Datadog a développé des mécanismes pour faciliter cette gestion, décrits ci-dessous.

## Créer du contenu

Datadog est une plateforme d'API RESTful qui est [entièrement documentée][1] et ouverte. La plupart des éléments que vous voyez dans l'interface utilisateur peuvent être créés de manière programmatique. Datadog encourage et prend entièrement en charge l'utilisation de l'API, même comme source de données pour vos propres applications personnalisées.  

Tous les objets que vous créez dans Datadog, tels que les dashboards, les alertes, les notebooks, les logs parsés et les configurations pour les intégrations cloud, sont stockés dans la plateforme au format JSON. Ils sont exportables et importables. Cela ouvre une multitude de capacités d'administration, notamment la conformité totale à l'Infrastructure as Code (IaC), la sauvegarde de configuration, la migration de compte et la réutilisabilité. Datadog prend également en charge un [fournisseur Terraform][2] et un [outil CLI][3] à ces fins. 

## Provisionnement

Le provisionnement est essentiel à tout environnement IT d'entreprise. Pour gérer Datadog à grande échelle, intégrez-le dans votre processus de provisionnement. Le modèle d'installation simple de l'Agent Datadog offre diverses façons d'y parvenir.

### Architecture modulaire

Comme la plupart des produits logiciels d'entreprise, les installations Datadog peuvent être divisées en trois opérations distinctes, chacune faisant partie de l'[architecture modulaire][6] appelée modèle fichier/package/service.

**Fichier(s) ** : contient les configurations  
**Package** : contient les binaires et contrôle leur déploiement 
**Service** : gère l'instance d'exécution via le système de services de l'OS 

Les opérations de base que vous devez effectuer pour installer Datadog sont les suivantes :

**Fichier** : le contrôle de code source peut être utilisé pour stocker et contrôler les modifications des fichiers de configuration. Les solutions de templating et d'IaC comme Jinja2 et Ansible sont également très efficaces. 

**Package** : utiliser des référentiels de packages internes tels qu'Artifactory ou Nexus pour héberger les packages .rpm, .msi et les packages d'Agent conteneurisés.   

**Service** : utiliser l'IaC ou des scripts shell.

**IaC :** l'Infrastructure-As-Code a progressé tant en sophistication qu'en robustesse. Bien qu'elle soit presque universellement utilisée dans les infrastructures cloud, elle est souvent adaptée rétroactivement aux infrastructures sur site établies de longue date. Sa structure simple fichier/package/service a été exploitée pour déployer des empreintes Datadog importantes avec des « outils » IaC aussi rudimentaires qu'un script bash. Bien que cela ne soit pas recommandé, cela constitue un encouragement à commencer l'adoption IaC de Datadog dès que possible, et lorsque vous le ferez, vous trouverez Datadog prêt avec des exemples de code et des intégrations pour Ansible, Puppet, Chef, Powershell, Bash, CloudFormations, Terraform, et plus encore.  

**Recommandations :**   
En ce qui concerne le déploiement du logiciel de l'Agent Datadog, il est conseillé de réutiliser autant que possible vos systèmes de provisionnement existants. La conception du logiciel Datadog est plate et conforme aux méthodes standard de l'industrie. 

## Résumé

La conception de l'Agent Datadog est plate afin qu'il puisse facilement s'intégrer à n'importe quel système de provisionnement existant. Utilisez vos capacités existantes pour fichier/package/service et intégrez Datadog dans celles-ci. Bien que la plateforme offre des mécanismes utiles, vos conditions locales déterminent la meilleure méthode pour toute situation donnée.

## Étapes suivantes

Consultez la documentation d'[exécution][4] de l'administrateur Datadog pour définir un calendrier de maintenance, effectuer des mises à niveau de l'Agent Datadog, créer des dashboards et vous assurer que votre installation Datadog reste saine.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: https://github.com/DataDog/datadog-sync-cli
[4]: /fr/administrators_guide/run
[5]: /fr/agent/basic_agent_usage/
[6]: /fr/agent/architecture/
[7]: /fr/administrators_guide/plan
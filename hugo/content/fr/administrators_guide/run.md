---
description: Découvrez la phase d'exécution de l'utilisation de Datadog, y compris
  l'intégration d'une nouvelle instance d'infrastructure, la gestion des problèmes
  techniques et l'exécution des tâches administratives.
further_reading:
- link: getting_started/dashboards/
  tag: Documentation
  text: Débuter avec les dashboards
title: Maintenir et exécuter votre installation Datadog
---

Dans les sections relatives à la [planification][24] et à la [conception][25], vous avez acquis des connaissances sur la définition d'objectifs, l'élaboration de stratégies d'intégration et la construction et l'itération de l'environnement Datadog pour une utilisation en production fluide. Ensuite, vous découvrirez la phase d'exécution, où vous gérerez une série de tâches internes et externes pour maintenir le fonctionnement efficace de l'installation Datadog. 

## Tâches de service

Réduisez les risques et augmentez l'adoption en publiant les nouvelles installations Datadog de manière séquentielle. Cette section répertorie une séquence de publications d'éléments pour optimiser l'expérience utilisateur avec Datadog. En raison de la diversité de l'architecture IT, ce guide est de haut niveau. Voici quelques points clés :

### Intégration d'une nouvelle instance d'infrastructure

L'infrastructure est l'élément central de l'IT et de l'observabilité. Il s'agit de la tâche principale et la plus fréquente pour une équipe d'administrateurs Datadog. La plateforme est adaptable et offre des outils pour rationaliser la plupart des tâches. Commencez par l'adapter à votre environnement spécifique. Votre architecture IT peut inclure des composants tels que des hyperviseurs, des hyperscalers et une infrastructure serverless.

**Recommandations** :   

Utilisez [Fleet Automation][1] pour gérer à distance vos Agents à grande échelle. Surveillez en permanence vos équipes pour détecter de nouvelles demandes d'infrastructure, signalez-les tôt et appliquez des ressources d'ingénierie pour vous concentrer sur des expansions sensées de vos offres d'infrastructure.

### Intégration d'une nouvelle empreinte applicative

L'ajout d'une application à Datadog est une tâche courante dans les premiers jours de l'administration Datadog. Développez un mécanisme efficace qui adapte vos conditions locales aux exigences de Datadog. Au minimum, incluez les éléments de la base de connaissances de la phase de planification, ainsi que des considérations supplémentaires :

- Le tag de service universel `version` est important pour de nombreuses visualisations. Développez une méthode automatisée, fiable et conforme pour alimenter ces visualisations à plus forte valeur ajoutée. 

- L'établissement d'un [Software Catalog][2] complet offre de nombreux avantages à l'avenir. Software Catalog est central dans le modèle de conception Datadog et héberge les objets de gouvernance, de dépendance et de définition de service.  

**Recommandations :**   
Développez un tagging de version automatique intégré dans votre processus de build d'application. Concentrez-vous sur Software Catalog et suivez la préparation avec les conseils de configuration.

## Gestion des problèmes techniques

En raison de sa structure de plateforme en tant que service, Datadog nécessite peu de dépannage de votre part, en tant qu'administrateur. Pour aider à identifier les problèmes dans l'Agent host, utilisez la [commande][3] `datadog-agent status`. Cette commande fournit des informations granulaires, spécifiques et exploitables qui identifient les domaines à traiter. De plus, utilisez la commande `datadog-agent flare` pour faire remonter rapidement les problèmes qui doivent être traités par l'assistance Datadog.

**Recommandations** : 
Utilisez les commandes `status` et `flare` dès le premier jour.

## Tâches d'administration

Comme tous les autres logiciels d'entreprise, les tâches de maintenance continues doivent être bien organisées et respecter vos politiques locales. Les tâches continues courantes incluent :

### Surveillance de l'utilisation

La surveillance de la consommation est essentielle, tout comme l'adoption des outils fournis à cet effet. Datadog fournit un dashboard de [métriques d'utilisation estimée][5] qui peut servir de base à cette capacité. Il existe également des dashboards prêts à l'emploi pour visualiser l'[utilisation estimée][6] sur l'ensemble de vos logs, métriques et traces.

### Déployer des dashboards et des monitors

Une fois que vos utilisateurs se familiarisent avec Datadog, ils peuvent demander des améliorations et des ajustements aux éléments fréquemment utilisés tels que les [dashboards][7] et les [monitors][8]. Les composants, y compris les SLO et autres objets de contenu, sont conçus pour un développement itératif et sont écrits en JSON. Ils peuvent être clonés, exportés, modifiés, importés et stockés sous forme de fichiers plats. De plus, un [fournisseur terraform][9] est disponible, ainsi qu'une [API de dashboards][10] pour interagir avec et créer des dashboards.  

Lors de la création de dashboards, priorisez le contenu que vous souhaitez afficher plutôt que le processus de construction. Ce processus créatif est pris en charge par les outils de création de dashboards et dans les dashboards préconstruits fournis avec le produit. Chaque dashboard au sein des {{< translate key="integration_count" >}} intégrations est un modèle à valeur ajoutée pour surveiller sa technologie correspondante. Les dashboards prêts à l'emploi offrent l'avantage de l'expérience de Datadog et du modèle prescriptif pour l'observabilité.  

**Recommandations :**  

- Déterminez l'objectif du dashboard que vous créez.   
- Configurez des monitors pour l'utilisation de Datadog en fonction des [métriques d'utilisation estimée][6].  
- Créez des [monitors d'anomalie ou de changement][11] sur ces mêmes métriques d'utilisation estimée pour envoyer des alertes lorsque votre utilisation de Datadog augmente brusquement.    
- [Réutilisez et clonez][12] d'autres dashboards pour gagner du temps.  
- Utilisez les [dashboards prêts à l'emploi][13] pour gérer la consommation.

Un dashboard prêt à l'emploi courant est le dashboard de présentation AWS EC2 :

{{< img src="/administrators_guide/ec2_overview.png" alt="Dashboard de présentation AWS EC2" style="width:90%;">}}

### Rotation des clés API

La plateforme Datadog utilise l'authentification par clé API RESTful standard et recommande de suivre les pratiques standard de [sécurité des clés API][14], y compris la rotation des clés. Il est également bénéfique d'organiser l'attribution de ces clés à des groupes de travail logiques pour optimiser le profil de sécurité et l'opération de rotation.

**Recommandations :**   

Incorporez les clés API et App Datadog dans vos propres systèmes de gestion des clés. Organisez les clés en groupes qui peuvent être facilement maintenus.

### Objets RBAC : rôles, équipes et ensembles d'autorisations 

Le [RBAC][15] Datadog s'appuie sur votre fournisseur SAML et le stockage AD/LDAP en amont de ce fournisseur SAML. Il peut refléter les groupes d'utilisateurs AD et attribuer des autorisations spécifiques à Datadog dans un mappage de groupes standard. Une collaboration entre les administrateurs Datadog et les administrateurs SAML/AD/LDAP est nécessaire pour échanger les noms de groupes et les attributs spécifiques pour la structure clé-valeur.    

## Mises à jour de l'Agent Datadog

Les composants de l'Agent sont régulièrement mis à jour avec des améliorations de sécurité et de fonctionnalités. Il est donc préférable de rester à jour. Suivez vos procédures locales pour les tests et la publication de nouveaux logiciels.   

**Recommandations :**  

Incluez les mises à niveau Datadog dans les standards de gestion des correctifs et les politiques de mise à niveau existants. Abonnez-vous au [flux de versions Datadog][17] et surveillez de près votre [page Fleet Automation][18] pour les Agents qui nécessitent des mises à niveau.

## Résumé

L'administration Datadog comporte plusieurs activités qui devraient bien s'intégrer dans vos standards de processus existants. Incorporez Datadog dans vos systèmes standard pour la rotation des clés, les mises à jour de correctifs, l'onboarding et l'Infrastructure as Code (IaC). Publiez ces standards tôt pour guider les utilisateurs dans le démarrage avec votre nouvelle installation Datadog.

## Étapes suivantes

Après avoir planifié, configuré et maintenu avec succès votre installation Datadog, utilisez les ressources suivantes pour soutenir votre parcours Datadog continu :

- [Obtenir une certification Datadog][20]
- [Débuter avec l'assistance Datadog][21]
- [S'inscrire aux newsletters sur les nouvelles versions et la sécurité de Datadog][22]
- [Consulter le blog The Monitor][23]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/fleet_automation/
[2]: /fr/software_catalog/
[3]: /fr/agent/configuration/agent-commands#agent-information
[4]: /fr/agent/troubleshooting/send_a_flare/?tab=agent\#send-a-flare-using-the-flare-command
[5]: https://app.datadoghq.com/dash/integration/31281/estimated-usage-overview?fromUser=false\&refresh_mode=sliding\&view=spans\&from_ts=1721313591456\&to\_ts=1721317191456\&live=true
[6]: /fr/account_management/billing/usage_metrics/
[7]: /fr/dashboards/#overview
[8]: /fr/monitors/
[9]: /fr/getting_started/integrations/terraform/#dashboards
[10]: /fr/api/latest/dashboards/
[11]: /fr/monitors/types/anomaly/
[12]: /fr/getting_started/dashboards/#start-by-reusing-other-dashboards
[13]: https://app.datadoghq.com/dashboard/lists
[14]: /fr/account_management/api-app-keys/#using-multiple-api-keys
[15]: /fr/account_management/rbac/?tab=datadogapplication
[16]: /fr/integrations/
[17]: https://github.com/DataDog/datadog-agent/releases
[18]: https://app.datadoghq.com/fleet
[19]: /fr/api/latest/key-management/
[20]: https://www.datadoghq.com/certification/overview/
[21]: /fr/getting_started/support/
[22]: https://www.datadoghq.com/subscriptions/
[23]: https://www.datadoghq.com/blog/
[24]: /fr/administrators_guide/plan/
[25]: /fr/administrators_guide/build/
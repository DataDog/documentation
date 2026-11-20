---
aliases:
- /fr/developers/marketplace/offering
description: Découvrez comment développer et publier un carré d'intégration.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: Blog
  text: Élargissez votre audience pour votre solution de surveillance avec le Marketplace
    Datadog
- link: /developers/integrations/marketplace_offering
  tag: Documentation
  text: Créer une offre sur le Datadog Marketplace
title: Créer une intégration avec Datadog
type: documentation
---
## Présentation

Cette page guide les partenaires technologiques à travers les étapes spécifiques pour créer et soumettre une intégration ou une offre du Marketplace à Datadog.

## Prise en main

### Créer une liste
1. Accédez à **Integrations > Plateforme de développement > Publishing** et cliquez sur **New Listing**.
1. Sélectionnez le type d'offre.
1. Ajoutez un nom pour votre offre.
1. Cliquez sur **Create**.

### Remplir la présentation
1. Renseignez les informations pertinentes dans la section de présentation, telles que le nom de votre fournisseur, l'URL de votre fournisseur, une brève description, et appliquez les tags appropriés.
1. Téléchargez une version wordmark de votre logo au format SVG.
1. Définissez l'identifiant unique de votre intégration, qui servira d'identifiant pour celle-ci.

### Définir et écrire le code de votre intégration

Suivez les instructions pour créer une [intégration basée sur l'Agent][5], ou une [intégration basée sur l'API][6].

Si vous créez une **intégration basée sur l'Agent**, suivez les étapes décrites.

Les intégrations basées sur l'Agent utilisent l'Agent Datadog pour envoyer des données via des checks écrits par le développeur.

Les checks peuvent transmettre des métriques, des événements et des checks de service au compte Datadog du client. L'Agent peut aussi envoyer des logs, mais cette configuration s'effectue en dehors du check. Le code est hébergé sur GitHub.

Le code d'implémentation de ces intégrations est hébergé par Datadog. Les intégrations de l'Agent sont particulièrement adaptées à la collecte de données provenant de systèmes ou d'applications situés dans un réseau local (LAN) ou un cloud privé virtuel (VPC). Créer une intégration de l'Agent nécessite de publier et de déployer votre solution sous la forme d'un paquet Python au format wheel (.whl).

Consultez la [documentation relative aux checks de l'Agent][5] pour apprendre à configurer un check de l'Agent. Revenez sur cette page pour continuer.

Si vous créez une **intégration basée sur l'API**, vous devez utiliser OAuth. Suivez les étapes décrites. 

OAuth est une norme que les intégrations peuvent utiliser pour offrir aux applications clientes un accès délégué sécurisé. OAuth fonctionne via HTTPS et autorise les appareils, les API, les serveurs et les applications à l'aide de jetons d'accès plutôt que d'identifiants. 

Consultez la [documentation relative au client OAuth][7] pour configurer votre intégration OAuth. Revenez sur cette page pour continuer.

Si votre plateforme est incompatible avec OAuth, contactez l'équipe Datadog Ecosystems pour demander une exception.

### Fournir des instructions d'installation et de désinstallation

1. Les **instructions d'installation** guident les utilisateurs dans le processus d'installation ; incluez toute configuration nécessaire, les étapes d'authentification ou les actions initiales à effectuer sous forme de liste numérotée.
1. Les **instructions de désinstallation** guident les utilisateurs sur la manière de désinstaller correctement l'intégration.

### Définir les données avec lesquelles votre intégration interagit

Les informations sur les types de données de Datadog permettent aux utilisateurs de comprendre ce que fait votre intégration. Si vous extrayez des données de Datadog, spécifiez le type de données correspondant dans la section des données interrogées. Si vous envoyez des données à Datadog, spécifiez le type de données correspondant dans la section des données envoyées. Certains champs peuvent nécessiter plus d'informations. 

Si votre intégration envoie des métriques :
1. Définissez le check de métrique : une métrique émise à chaque exécution pour indiquer que l'intégration fonctionne.
1. Téléversez la liste de vos métriques en remplissant le fichier `metadata.csv`. 

Si votre intégration envoie des logs, un pipeline de logs est requis. 
1. Suivez les instructions pour [créer un pipeline de logs][8].
1. Téléversez les deux fichiers exportés lors de l'étape précédente.

### Créer un contenu spécifique à l'intégration

Les intégrations Datadog prennent en charge du contenu prêt à l'emploi disponible dès l'installation. Incluez du contenu tel que des dashboards, des modèles de monitor et des règles de détection SIEM pour aider les utilisateurs à tirer parti de votre intégration.

1. Créez et associez au moins un dashboard à proposer avec votre intégration.  
    - Les dashboards sont requis pour toutes les intégrations. Suivez les [bonnes pratiques de Datadog][9] lors de la création d'un nouveau dashboard.
1. Créer et associer les autres contenus.
    - Pour créer un nouveau modèle de monitor, suivez les [bonnes pratiques de Datadog][10].
    - Pour créer des règles de détection SIEM, suivez les [bonnes pratiques de Datadog][11].

### Ajouter les informations d'assistance

Fournissez les coordonnées de votre équipe d'assistance.

### Ajouter les notes de version

Pour le lancement initial, laissez tel quel. Pour les mises à jour ultérieures, indiquez les ajouts de fonctionnalités, les modifications, les corrections et les suppressions comme nouvelles versions.

### Examiner et soumettre

1. Prévisualisez votre intégration pour vous assurer que tout s'affiche correctement.
1. Une fois terminé, soumettez-la pour examen.
1. L'équipe Datadog examinera votre soumission et vous répondra avec ses retours.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://partners.datadoghq.com
[2]: /fr/integrations
[3]: /fr/marketplace
[4]: /fr/developers/integrations/marketplace_offering/
[5]: /fr/developers/integrations/agent_integration/
[6]: /fr/developers/integrations/api_integration/
[7]: /fr/developers/integrations/api_integration/#oauth
[8]: /fr/developers/integrations/log_pipeline/
[9]: /fr/developers/integrations/create-an-integration-dashboard/
[10]: /fr/developers/integrations/create-an-integration-monitor-template/
[11]: /fr/developers/integrations/create-a-cloud-siem-detection-rule/
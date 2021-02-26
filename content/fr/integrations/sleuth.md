---
"assets":
  "configuration":
    "spec": assets/configuration/spec.yaml
  "dashboards": {}
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- orchestration
- issue-tracking
- collaboration
- source-control
"creates_events": false
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/sleuth/README.md"
"display_name": "Sleuth"
"draft": false
"git_integration_title": "sleuth"
"guid": "294cd3d0-1412-475a-9c85-d8369719b805"
"integration_id": "sleuth"
"integration_title": "Sleuth"
"is_public": true
"kind": "integration"
"maintainer": "support@sleuth.io"
"manifest_version": "1.0.0"
"metric_prefix": "sleuth."
"metric_to_check": ""
"name": "sleuth"
"public_title": "Intégration Datadog/Sleuth"
"short_description": "Tracker de déploiement Sleuth"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---

## Présentation

Sleuth est un outil de suivi de déploiement qui vous permet de surveiller les déploiements logiciels sur l'ensemble de votre cycle DevOps. Grâce à l'intégration Datadog, Sleuth vous fournit des données pertinentes, utiles et actionnables en temps réel qui vous permettent, à vous et à votre équipe, de voir clairement l'impact des modifications que vous apportez à votre code.

## Configuration

Pour ajouter l'intégration Datadag :

1. Connectez-vous à votre [compte Sleuth][1].
1. Cliquez sur **Integrations** dans la barre latérale.
2. Cliquez sur l'onglet _Metric Trackers_, puis sur **enable** dans la carte Datadog.
3. Entrez votre clé d'API et votre clé d'application Datadog dans les champs correspondants.
4. Si vos serveurs Datadog se trouvent dans l'Union européenne, cochez la case _My Datadog servers are in the EU_. Ne la cochez pas si vous ne savez pas.
5. Sélectionnez **Save**. 

> Votre clé d'API et votre clé d'application Datadog se trouvent dans **Integrations** &gt; **API**. Sinon, vous pouvez cliquer sur le lien **generate** dans la boîte de dialogue de Sleuth (visible ci-dessous) pour accéder à l'espace des clés d'API/d'application dans votre console Datadog. 

![][2]

> Une fois l'intégration Datadog ajoutée, vous verrez le message **Datadog is connected** s'afficher. 

![][3]

### Installation

L'installation de l'intégration Datadog/Sleuth se fait entièrement à partir de votre compte Sleuth. Aucune autre étape de configuration n'est nécessaire à partir de votre compte Datadog, en dehors de la saisie de vos clés d'API et d'application Datadog dans Sleuth.

### Configuration

* Cliquez sur le menu déroulant **Add metric** et sélectionnez un projet Sleuth qui traitera les métriques d'application Datadog entrantes. Tous les projets de votre organisation Sleuth sont affichés dans le menu déroulant.

![][4]

> Les intégrations sont effectuées au niveau de l'organisation Sleuth, et sont disponibles pour tous les projets au sein de cette organisation. Les paramètres spécifiques à une intégration sont appliqués au niveau du projet.

Sleuth va maintenant commencer à afficher les métriques Datadog dans vos déploiements. Consultez la page [**Dashboard**][5] pour en savoir plus sur la façon dont les métriques sont communiquées dans les cartes de déploiement de Sleuth.


## Données collectées

### Métriques

L'intégration Sleuth n'inclut aucune métrique.

### Checks de service

L'intégration Sleuth n'inclut aucun check de service.

### Événements

L'intégration Sleuth n'inclut aucun événement.

## Suppression

1. Dans votre Dashboard Sleuth, cliquez sur **Integrations** dans la barre latérale de gauche, puis sur **Metric Trackers**. 
2. Dans la carte d'intégration Datadog, cliquez sur **disable**.

L'intégration Datadog est déconnectée et n'est plus disponible pour les projets de cette organisation. Les modifications apportées à l'intégration Datadog au niveau d'un projet seront perdues.
[1]: https://app.sleuth.io/accounts/login/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-integration-api-key.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-integration.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-enabled-metric-pick.png
[5]: https://help.sleuth.io/dashboard


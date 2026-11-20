---
categories:
- network
- web
ddtype: crawler
dependencies: []
description: Surveillez les changements de zone et mesurez le nombre de requêtes par
  seconde, selon une zone ou un enregistrement.
doc_link: https://docs.datadoghq.com/integrations/dyn/
draft: false
git_integration_title: dyn
has_logo: true
integration_id: ''
integration_title: Dyn
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: dyn
public_title: Intégration Datadog/Dyn
short_description: Surveillez les changements de zone et mesurez le nombre de requêtes
  par seconde, selon une zone ou un enregistrement.
team: web-integrations
version: '1.0'
---

{{< img src="integrations/dyn/dyn_overview.png" alt="Présentation Dyn" popup="true">}}

## Présentation

Surveillez vos zones grâce aux événements et graphiques avancés.

- Surveillez les changements apportés lors de la mise à jour d'une zone.
- Analysez le nombre de requêtes par seconde par zone ou type d'enregistrement grâce aux outils graphiques avancés.

## Configuration

### Procédure à suivre

Si vous n'avez pas encore créé un utilisateur `datadog` en lecture seule sur Dyn, [connectez-vous à Dyn][1] et suivez les instructions suivantes :

1. Choisissez un nom d'utilisateur et un mot de passe :
   {{< img src="integrations/dyn/create_dyn_user.png" alt="Créer un utilisateur dyn" style="width:75%;" popup="true">}}

2. Sélectionnez le groupe d'utilisateurs **READONLY** :
   {{< img src="integrations/dyn/choose_dyn_group.png" alt="Choisir un groupe dyn" style="width:75%;" popup="true">}}

3. Cliquez sur **Add New User**.

Une fois votre utilisateur Datadog en lecture seule créé :

1. Configurez l'intégration [Datadog/Dyn][2] à l'aide du carré d'intégration :
   {{< img src="integrations/dyn/dyn_integration.png" alt="Intégration Dyn" style="width:75%;" popup="true">}}

2. Sélectionnez les zones (_Zone notes_) à partir desquelles vous souhaitez recueillir des événements et des métriques `dyn.changes` :<br>

{{< img src="integrations/dyn/dyn_zone.png" alt="Zone Dyn" style="width:75%;" popup="true">}}

Les métriques de requêtes par seconde de DYN sont recueillies par défaut pour toutes les zones.

<div class="alert alert-info">
Les listes de contrôle d'accès (ACL) en fonction des adresses IP doivent être désactivées pour l'intégration Dyn.
</div>

## Données collectées

### Métriques
{{< get-metrics-from-git "dyn" >}}


**Remarque** : la métrique `dyn.qps` est disponible sur Datadog avec un délai de ~90 minutes.

### Événements

L'intégration Dyn n'inclut aucun événement.

### Checks de service

L'intégration Dyn n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://manage.dynect.net/login
[2]: https://app.datadoghq.com/account/settings#integrations/dyn
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/dyn/dyn_metadata.csv
[4]: https://docs.datadoghq.com/fr/help/
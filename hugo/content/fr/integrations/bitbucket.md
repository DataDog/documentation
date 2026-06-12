---
categories:
- Source Control
- Collaboration
- issue tracking
ddtype: crawler
dependencies: []
description: Visualisez les commits et les pull requests qui affectent les performances
  de l'ensemble de vos services.
doc_link: https://docs.datadoghq.com/integrations/bitbucket/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/understand-code-changes-impact-system-performance-bitbucket-datadog/
  tag: Blog
  text: 'Bitbucket et Datadog : découvrez l''impact des changements de code sur votre
    infrastructure'
git_integration_title: bitbucket
has_logo: true
integration_id: bitbucket
integration_title: Bitbucket
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: bitbucket
public_title: Intégration Datadog/Bitbucket
short_description: Visualisez l'impact des commits et des pull requests sur les performances
  de vos services.
team: web-integrations
version: '1.0'
---

{{< img src="integrations/bitbucket/integrations-bitbucket.gif" alt="intégrations bitbucket" popup="true">}}

## Présentation

Enregistrez les événements de commit et de pull request directement depuis Bitbucket Cloud ou Server pour :

- Surveiller les changements de code en temps réel
- Ajouter des indicateurs de changement de code sur l'ensemble de vos dashboards
- Discuter des changements de code avec votre équipe

Une fois l'intégration configurée, les éléments que vous sélectionnez (à savoir, les commits et/ou les pull requests) se propagent dans votre flux d'événements Datadog.

**Exemples** :

- Lors de la réalisation de commits
- Lors de la création d'une pull request
- Lorsqu'un commentaire sur une pull request est publié ou supprimé

## Configuration

### Installation

Consultez la documentation de Bitbucket relative à la [gestion des webhooks][1] afin de configurer des webhooks pour les comportements Bitbucket que vous souhaitez surveiller dans Datadog. Définissez l'URL de vos webhooks sur :

```text
https://app.datadoghq.com/intake/webhook/bitbucket?api_key=<VOTRE_CLÉ_API_DATADOG>
```

### Procédure à suivre

L'[intégration Bitbucket][2] se configure par l'intermédiaire du carré d'intégration.

1. Saisissez le nom complet de chaque référentiel que vous souhaitez surveiller. Si l'URL de votre référentiel est `https://bitbucket.org/nomgroupe/nomreferentiel`, saisissez `nomgroupe/nomreferentiel` dans la zone de texte **Repository**.
2. Sélectionnez le type d'événements à envoyer à Datadog :

    - Bitbucket Cloud : choisissez des éléments parmi la liste de déclencheurs (Commits, Pull Requests ou Issues).
    - Bitbucket Server : sélectionnez Commits ou Pull Requests.

3. Cliquez sur **Update Configuration**.

### Validation

Chaque entrée dans le carré d'intégration est validée lors de sa saisie.

## Cas d'utilisation

Saisissez `sources:bitbucket` dans la barre de recherche en haut à gauche pour superposer des événements Bitbucket sur les graphiques de vos dashboards. Le GIF d'exemple en haut de cette page illustre cette fonctionnalité.

## Données collectées

### Métriques

L'intégration Bitbucket n'inclut aucune métrique.

### Événements

Les événements Bitbucket, y compris les commits et les pull requests provenant de Bitbucket Cloud et Server, sont transmis à Datadog.

### Checks de service

L'intégration Bitbucket n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://confluence.atlassian.com/bitbucket/manage-webhooks-735643732.html
[2]: https://app.datadoghq.com/account/settings#integrations/bitbucket
[3]: https://docs.datadoghq.com/fr/help/
---
categories:
- metrics
dependencies: []
description: Surveillez les métriques relatives aux insights de qualité Conviva pour
  les plates-formes de streaming vidéo.
doc_link: https://docs.datadoghq.com/integrations/conviva/
draft: false
git_integration_title: conviva
has_logo: true
integration_id: ''
integration_title: Conviva
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: conviva
public_title: Intégration Datadog/Conviva
short_description: Recueillez des métriques de qualité MetricLens Conviva.
team: web-integrations
version: '1.0'
---

## Présentation

Associez Datadog à votre compte Conviva pour consulter vos métriques MetricLens sur la qualité d'expérience (QoE).

## Configuration

### Installation

Installez l'intégration avec le [carré d'intégration Conviva][1] de Datadog.

### Configuration
1. Accédez à l'onglet Configuration dans le [carré d'intégration Conviva][1] de Datadog.
2. Cliquez sur **Add New Credentials** et saisissez votre clé d'API et votre secret d'API Conviva. Datadog recherche alors les comptes associés à ces identifiants.
3. Une fois les comptes identifiés, ajoutez un _MetricLens_ pour déterminer les métriques à ingérer dans Datadog. Attribuez un nom au MetricLens ainsi qu'un _filter_ et une _dimension_. Le nom est automatiquement ajouté au MetricLens en question sous la forme de tag.
4. Vous pouvez choisir d'ajouter des tags à vos MetricLens ou à vos comptes. Lorsque vous ajoutez un tag à un compte, il est appliqué à l'ensemble des MetricLens associés à ce compte.
5. Pour ajouter d'autres _MetricLens_, cliquez sur **Add New** et suivez les instructions à l'écran.
6. Répétez les étapes ci-dessus pour tous vos autres identifiants Conviva à l'aide du bouton **Add New Credentials**.

### Dashboard
Une fois l'intégration configurée, utilisez le dashboard Conviva prêt à l'emploi pour consulter une vue d'ensemble de vos métriques MetricLens.

Par défaut, toutes les métriques recueillies sur l'ensemble des MetricLens sont affichées. Appliquez un filtre `metriclens` pour afficher la répartition des métriques pour chaque MetricLens configuré dans le carré. Pour examiner plus en détail vos données, appliquez un filtre `dimension` afin d'afficher vos métriques pour une seule dimension.

## Données collectées

### Métriques
{{< get-metrics-from-git "conviva" >}}


### Événements

L'intégration Conviva n'inclut aucun événement.

### Checks de service

L'intégration Conviva n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#integrations/conviva
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/conviva/conviva_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/
---
categories:
- source control
dependencies: []
description: Associez GitHub à Datadog pour enrichir vos problèmes et pull requests.
doc_link: https://docs.datadoghq.com/integrations/github_apps/
draft: false
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/source-code-integration/
  tag: Guide
  text: Intégration du code source de Datadog
git_integration_title: github_apps
has_logo: true
integration_id: ''
integration_title: GitHub Apps
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: github_apps
public_title: Intégration Datadog/GitHub Apps
short_description: Associer GitHub à Datadog
type: ''
version: '1.0'
---

## Présentation

Associez Datadog à GitHub Apps pour activer les autorisations pour vos référentiels et consulter des extraits de code dans vos erreurs. Vous pouvez également afficher des liens vers les pull requests et problèmes GitHub dans des notebooks et chronologies d'incident de Datadog. 

## Configuration

### Installation

Installez l'intégration avec le [carré d'intégration GitHub Apps de Datadog][1].

### Configuration

Si vous êtes administrateur de votre organisation GitHub, vous pouvez configurer GitHub Apps.

1. Dans le carré d'intégration GitHub Apps, accédez à l'onglet **Configuration**.
2. Cliquez sur **Link GitHub Account** pour créer une application GitHub.
3. Dans **Configure**, sélectionnez **Organization** et puis saisissez un nom pour votre organisation, ou sélectionnez **Personal Account**.
Vous avez la possibilité de spécifier l'URL de l'instance de votre serveur GitHub Enterprise (version 2.22 ou supérieur).
4. Dans **Edit Permissions**, activez les autorisations de lecture Datadog pour les problèmes, pull requests et contenus. Vous devez sélectionner au moins une autorisation.
5. Cliquez sur **Create App in GitHub**. Vous êtes alors invité à saisir un nom d'application GitHub dans GitHub.
6. Saisissez un nom d'application GitHub dans le champ correspondant, puis cliquez sur **Create GitHub App**.
7. Dans l'onglet **Configuration**, cliquez sur **Install GitHub App** et **Install & Authorize**.

Votre application GitHub s'affiche dans le carré d'intégration. Pour activer les extraits de code directement dans les stack traces, consultez la section relative à la [configuration de l'intégration du code source][2].

### Notebooks

Dans les [notebooks][3], les problèmes et pull requests GitHub génèrent automatiquement une fenêtre d'aperçu comportant notamment l'historique des commits, l'auteur et la date.

1. Accédez à **Notebooks** > **New Notebook**.
2. Ajoutez une cellule **Text** et renseignez un problème ou une pull request sur GitHub dans le champ **Edit**. Exemple : `https://github.com/project/repository/pull/#`.
3. Cliquez sur **Done**. L'icône GitHub s'affiche alors à côté du problème ou de la pull request associé(e).
4. Cliquez sur **Connect to Preview** et **Authorize**.
5. Passez le curseur sur le problème ou la pull request associé(e) pour afficher un aperçu descriptif.

{{< img src="integrations/guide/github_apps/notebooks-links-to-git.png" alt="Liens vers Git" style="width:100%;">}}

## Données collectées

### Métriques

L'intégration GitHub Apps n'inclut aucune métrique.

### Événements

L'intégration GitHub Apps n'inclut aucun événement.

### Checks de service

L'intégration GitHub Apps n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#integrations/github-apps
[2]: https://docs.datadoghq.com/fr/integrations/guide/source-code-integration
[3]: https://app.datadoghq.com/notebook
[4]: https://docs.datadoghq.com/fr/help/
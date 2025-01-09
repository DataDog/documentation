---
categories:
- Source Control
ddtype: library
dependencies: []
description: Envoyez des commits et pull requests depuis votre serveur Git auto-hébergé
  vers Datadog.
doc_link: https://docs.datadoghq.com/integrations/git/
draft: false
git_integration_title: git
has_logo: true
integration_id: git
integration_title: Git
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: git
public_title: Intégration Datadog/Git
short_description: Envoyez des commits et pull requests depuis votre serveur Git auto-hébergé
  vers Datadog.
version: '1.0'
---

{{< img src="integrations/git/git_event.png" alt="Événement Git" popup="true">}}

## Présentation

Enregistrez des commits Git directement depuis votre serveur Git pour ;

- Surveiller les changements de code en temps réel
- Ajouter des indicateurs de changement de code sur l'ensemble de vos dashboards
- Discuter des changements de code avec votre équipe

## Configuration

### Installation

1. Créez une nouvelle clé d'application pour Git : [générer une clé d'application][1].

2. Téléchargez le webhook Datadog/Git :

    ```shell
    sudo easy_install dogapi
    curl -L https://raw.github.com/DataDog/dogapi/master/examples/git-post-receive-hook > post-receive
    ```

3. Configurez Git avec vos [clés Datadog][1] :

    ```shell
    git config datadog.api <YOUR_DATADOG_API_KEY>
    git config datadog.application <YOUR_DATADOG_APP_KEY>
    ```

4. Activez le hook dans votre référentiel Git avec `<NOM_RÉFÉRENTIEL_GIT>` :

    ```shell
    install post-receive <GIT_REPOSITORY_NAME>/.git/hooks/post-receive
    ```

5. Installez l'[intégration Datadog/Git][2].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/account/settings#integrations/git
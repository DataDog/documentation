---
aliases:
- /fr/logs/log_collection/adobe_experience_manager
categories:
- log collection
custom_kind: integration
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/adobe_experience_manager.md
description: Recueillez des logs Adobe Experience Manager pour suivre les erreurs,
  obtenir des délais de réponse et surveiller les pages Web dont les performances
  sont faibles.
doc_link: /integrations/adobe_experience_manager/
further_reading:
- link: logs/
  tag: Documentation
  text: Log Management
has_logo: true
integration_id: adobe
integration_title: Adobe Experience Manager
is_public: true
name: adobe_experience_manager
public_title: Datadog/Adobe Experience Manager
short_description: Recueillez des logs pour suivre les erreurs, obtenir des délais
  de réponse, etc.
supported_os:
- linux
- mac_os
- windows
title: Adobe Experience Manager
---

{{< site-region region="us3,ap1" >}}
<div class="alert alert-warning">L'intégration Adobe Experience Manager n'est pas disponible pour le <a href="/getting_started/site">site Datadog</a> ({{< region-param key="dd_site_name" >}}) que vous avez sélectionné.</div>
{{< /site-region >}}

## Présentation

Recueillez des logs Adobe Experience Manager pour suivre les erreurs, obtenir des délais de réponse et surveiller les pages Web dont les performances sont faibles.

## Configuration

### Installation

[Installez l'Agent][1] sur l'instance qui exécute Adobe Experience Manager.

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` avec :

    ```yaml
    logs_enabled: true
    ```

2. Créez le fichier `adobe.experience.manager.d/conf.yaml` dans votre [répertoire conf.d][2] et ajoutez la configuration ci-dessous pour commencer à recueillir vos logs :

    ```yaml
    logs:
        - type: file
          path: cq-installation-dir/crx-quickstart/logs/*.log
          service: '<MY_APPLICATION>'
          source: adobe.experience.manager
    ```

      Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

3. [Redémarrez l'Agent][3].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /fr/agent/guide/agent-commands/#restart-the-agent
[4]: /fr/help/
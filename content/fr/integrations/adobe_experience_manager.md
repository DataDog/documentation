---
title: Adobe Experience Manager
name: adobe_experience_manager
kind: integration
description: 'Recueillez des logs Adobe Experience Manager pour suivre les erreurs, obtenir des délais de réponse et surveiller les pages Web dont les performances sont faibles.'
short_description: 'Recueillez des logs pour suivre les erreurs, obtenir des délais de réponse, etc.'
categories:
  - log collection
doc_link: /integrations/adobe_experience_manager/
aliases:
  - /fr/logs/log_collection/adobe_experience_manager
has_logo: true
integration_title: Adobe Experience Manager
is_public: true
public_title: Datadog/Adobe Experience Manager
supported_os:
  - linux
  - mac_os
  - windows
further_reading:
  - link: logs/
    tag: Documentation
    text: Log Management
---
## Présentation

Recueillez des logs Adobe Experience Manager pour suivre les erreurs, obtenir des délais de réponse et surveiller les pages Web dont les performances sont faibles.

## Implémentation
### Installation

[Installez l'Agent][1] sur l'instance qui exécute Adobe Experience Manager.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

* La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans votre fichier `datadog.yaml` avec :

```
logs_enabled: true
```

* Créez le fichier `adobe.experience.manager.d/conf.yaml` dans votre [répertoire conf.d][2] et ajoutez la configuration ci-dessous pour commencer à recueillir vos logs :

```
logs :
  - type : file
    chemin : cq-installation-dir/crx-quickstart/logs/*.log
    service : <MON_APPLICATION>
    source : adobe.experience.manager
```

* Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

* Pour terminer, [redémarrez l'Agent][3].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: /fr/agent/guide/agent-commands/#restart-the-agent
[4]: /fr/help
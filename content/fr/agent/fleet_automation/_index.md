---
description: Gérez centralement et administrez à distance les Agents Datadog à grande
  échelle grâce aux vues de configuration, aux mises à niveau, à la collecte de flare
  et à la rotation des clés d'API.
disable_toc: false
further_reading:
- link: /remote_configuration
  tag: Documentation
  text: En savoir plus sur la configuration à distance
- link: /infrastructure/list/#agent-configuration
  tag: Documentation
  text: En savoir plus sur la vue de configuration de l'Agent
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: Blog
  text: Contrôler de manière centralisée et gérer à distance les Agents Datadog à
    grande échelle grâce à la solution Fleet Automation.
title: Fleet Automation
---

## Présentation

Datadog Fleet Automation vous permet de gérer centralement et d'administrer à distance les Agents Datadog à grande échelle afin de répondre à l'évolution de vos besoins en observabilité.

{{< img src="/agent/fleet_automation/fleet_automation2.png" alt="La page Fleet Automation" style="width:100%;" >}}

## Cas d'utilisation

Avec la plateforme Fleet Automation, vous pouvez :
- Affichez les dernières configurations de l'Agent et les modifications historiques pour vérifier les mises à jour de déploiement et garantir la cohérence des configurations.
- Assurez-vous que l'ensemble de vos Agents utilise les dernières améliorations fonctionnelles en identifiant et en mettant à niveau les versions obsolètes de l'Agent.
- Envoyez un flare depuis votre organisation, ce qui réduit le temps nécessaire pour déboguer les problèmes sur un Agent.
- Aidez à faire tourner les clés d'API et assurez-vous que les anciennes clés puissent être désactivées sans impact en identifiant quels Agents, et combien d'Agents, utilisent une clé particulière.

## Configurer Fleet Automation

- **Mettre à niveau et configurer à distance des Agents** : pour plus d'informations sur les versions de Agent prises en charge et les étapes de configuration, consultez la section relative à [l'activation de la gestion à distance des Agents][3].
- **Afficher la configuration de l'Agent** : la vue de configuration de l'Agent est activée par défaut dans les versions 7.47.0 ou ultérieures de l'Agent. Pour activer la configuration de l'Agent manuellement, définissez `inventories_configuration_enabled` sur `true` dans votre [fichier de configuration de l'Agent][2]. Vous pouvez également utiliser la variable d'environnement `DD_INVENTORIES_CONFIGURATION_ENABLED`.
- **Afficher la configuration des intégrations de l'Agent** : la configuration des intégrations de l'Agent est activée par défaut dans les versions 7.49 ou ultérieures de l'Agent. Pour activer la configuration des intégrations de l'Agent manuellement, définissez `inventories_checks_configuration_enabled` sur `true` dans votre [fichier de configuration de l'Agent][2]. Vous pouvez également utiliser la variable d'environnement `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED`.

## Observer votre parc

Utilisez la page [**Fleet Automation**][1] pour obtenir des informations sur les hosts non surveillés, les Agents nécessitant une mise à jour ou ceux ayant des problèmes d'intégration. Pour chaque Agent, vous pouvez voir :
- La version de l'Agent
- Si l'Agent comporte des intégrations non configurées ou mal configurées
- Les services surveillés par l'Agent
- Le statut de configuration à distance de l'Agent
- Les produits activés sur l'Agent
- Les événements Audit Trail de l'Agent, y compris les modifications de configuration, les mises à niveau et les flares

### Examiner un Agent

La sélection d'un Agent affiche des informations supplémentaires, notamment sa configuration, les intégrations connectées, les événements d'audit et un onglet d'assistance permettant d'envoyer un flare à distance.

{{< img src="agent/fleet_automation/fleet-automation-view-config.png" alt="Informations sur l'intégration d'un Agent" style="width:100%;" >}}

### Afficher les événements Audit Trail de l'Agent

L'onglet Audit Events affiche les événements Audit Trail associés à l'Agent sélectionné. Utilisez cet onglet pour :
- Identifier les modifications de configuration, les mises à jour de clés d'API, les installations, les mises à niveau et les flares d'assistance.
- Déterminer quand les modifications ont été effectuées et depuis quel emplacement

La visibilité des événements Audit Trail dépend de votre offre. Lorsque Audit Trail est activé dans votre organisation, vous pouvez consulter les événements de l'Agent pendant une durée maximale de 90 jours, en fonction de vos paramètres de rétention Audit Trail. Si Audit Trail n'est pas activé dans votre organisation, vous pouvez consulter les événements des dernières 24 heures.

### Envoyer un flare à distance

Après avoir activé la configuration à distance sur un Agent, vous pouvez envoyer un flare depuis Datadog. Pour obtenir des instructions sur l'envoi d'un flare, consultez la section [Envoyer un flare depuis le site Datadog][7].

Lorsque vous contactez l'assistance Datadog avec la configuration à distance activée pour un Agent, l'équipe d'assistance peut initier un flare depuis votre environnement afin de mieux vous aider dans les plus brefs délais. Les flares fournissent à l'assistance Datadog des informations de diagnostic pour vous aider à résoudre votre problème.

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="Envoyer un flare à distance" style="width:100%;" >}}

## Gestion à distance de l'Agent

La gestion à distance des Agents simplifie le processus de mise à niveau de votre parc d'Agents en réduisant la nécessité de coordonner plusieurs outils de déploiement ou de gestion de configuration. Pour plus d'informations, consultez la section relative à la [gestion de l'Agent à distance][6].

{{< img src="agent/fleet_automation/fleet-automation-upgrades-2.png" alt="Mettre à niveau les Agents à distance dans Fleet Automation" style="width:100%;" >}}

## Contrôler l'accès à Fleet Automation

Fleet Automation est accessible à tous les utilisateurs d'une organisation Datadog. Vous pouvez contrôler l'accès à des fonctionnalités spécifiques :

| Autorisation | Rôle |
|--------------|---------------|
| `API Keys Read`| Restreint les utilisateurs pouvant afficher et rechercher des Agents par clé d'API. |
| `Agent Flare Collection` | Limite les utilisateurs qui peuvent envoyer des flares à distance à partir de Fleet Automation. |
| `Agent Upgrade` | Restreint les utilisateurs ayant accès à la mise à niveau des Agents depuis Fleet Automation. |
| `Agent Configuration Management` | Restreint les utilisateurs ayant accès à la configuration des Agents depuis Fleet Automation. |

Pour plus d'informations sur la configuration des rôles et des autorisations, consultez la section relative au [contrôle des accès][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /fr/agent/configuration/agent-configuration-files/
[3]: /fr/agent/fleet_automation/remote_management/#setup
[4]: /fr/infrastructure/list/#agent-configuration
[5]: /fr/account_management/rbac/
[6]: /fr/agent/fleet_automation/remote_management/
[7]: /fr/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
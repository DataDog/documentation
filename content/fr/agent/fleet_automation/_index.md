---
description: Gouvernez de manière centralisée et gérez à distance les Agents Datadog
  et les Collectors OpenTelemetry à grande échelle avec des vues de configuration,
  des mises à niveau, la collecte de flares et la rotation de clés d'API.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/fleet-automation-central-configuration
  tag: Blog
  text: Configurer de manière centralisée et mettre à l'échelle la surveillance de
    votre infrastructure et de vos applications avec Datadog Fleet Automation
- link: https://www.datadoghq.com/blog/manage-opentelemetry-collectors-with-datadog-fleet-automation
  tag: Blog
  text: Gérer tous vos collecteurs OpenTelemetry avec Datadog Fleet Automation
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centraliser et gouverner votre pipeline OpenTelemetry avec la passerelle DDOT
- link: /remote_configuration
  tag: Documentation
  text: En savoir plus sur la configuration à distance
- link: /infrastructure/list/#agent-configuration
  tag: Documentation
  text: En savoir plus sur l'affichage de la configuration de l'Agent
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: Blog
  text: Gouverner de manière centralisée et gérer à distance les Agents Datadog à
    grande échelle avec Fleet Automation
title: Fleet Automation
---

## Présentation

Datadog Fleet Automation vous permet de gouverner de manière centralisée et de gérer à distance les Agents Datadog et les Collectors OpenTelemetry (OTel) à grande échelle pour prendre en charge vos besoins d'observabilité en constante évolution.

{{< img src="/agent/fleet_automation/fleet_automation2.png" alt="La page Fleet Automation" style="width:100%;" >}}

## Cas d'utilisation

Pour les cas d'usage suivants, assurez-vous que votre parc d'Agents Datadog et de collecteurs OpenTelemetry utilise les dernières améliorations de fonctionnalités. Avec Fleet Automation, les fonctionnalités suivantes sont disponibles :
- **Affichez les dernières configurations des Agents et des Collectors OTel** ainsi que l'historique des modifications pour confirmer les mises à jour de déploiement et garantir la cohérence de la configuration.
- **Vérifiez que votre parc d'Agents et de Collectors OTel utilise les dernières améliorations de fonctionnalités** en identifiant et en mettant à niveau les versions obsolètes.
- **Configurez vos Agents Datadog directement depuis Fleet Automation**, permettant à vos équipes de centraliser la configuration et d'obtenir une visibilité sur vos environnements plus rapidement.
- **Envoyez un flare d'assistance à distance depuis l'interface Datadog**, réduisant le temps nécessaire pour déboguer les problèmes sur un Agent ou un Collector DDOT.

## Configuration

### Gérer votre parc à distance

Fleet Automation vous permet de gérer de manière centralisée les Agents Datadog sur tous vos hosts directement depuis l'interface Datadog. Avec la gestion à distance, vous pouvez afficher l'état actuel de chaque Agent, appliquer des modifications de configuration et déployer des mises à niveau de version sans avoir besoin d'un accès direct aux systèmes individuels. Cela fournit un workflow cohérent et contrôlé pour maintenir votre parc sécurisé, à jour et aligné sur les normes de votre organisation.

- **Mettre à niveau et configurer les Agents à distance** : pour les étapes de configuration et d'activation, consultez la section relative à [l'activation de la gestion à distance des Agents][3].
- **Afficher les configurations des Agents et des Collectors OpenTelemetry** :
  - L'affichage de la configuration de l'Agent et de Datadog Distribution of OTel Collector (DDOT) est activé par défaut dans les versions 7.47.0 ou ultérieures de l'Agent. Pour activer manuellement la configuration de l'Agent, définissez `inventories_configuration_enabled` dans votre [fichier de configuration de l'Agent][2] sur `true`. Vous pouvez également utiliser la variable d'environnement `DD_INVENTORIES_CONFIGURATION_ENABLED`.
  - L'affichage de la configuration du Collector OpenTelemetry upstream est activé en définissant l'[extension Datadog][8] dans votre fichier de configuration du Collector.
- **Afficher la configuration des intégrations de l'Agent** : la configuration des intégrations de l'Agent est activée par défaut dans les versions 7.49 ou ultérieures de l'Agent. Pour activer la configuration des intégrations de l'Agent manuellement, définissez `inventories_checks_configuration_enabled` sur `true` dans votre [fichier de configuration de l'Agent][2]. Vous pouvez également utiliser la variable d'environnement `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED`.

### API Fleet Automation
Fleet Automation fournit une API publique qui vous permet d'afficher et de gérer par programmation les Agents Datadog à grande échelle. Pour obtenir les détails complets des endpoints et des exemples d'utilisation, consultez la section [Documentation de l'API Fleet Automation][9].

**Remarque** : l'API Fleet Automation ne prend pas en charge toutes les capacités de configuration de l'Agent Datadog.

<div class="alert alert-info">
La gestion à distance des Agents dans les charges de travail conteneurisées n'est pas prise en charge.
</div>


## Observer votre parc

Consultez la page [**Fleet Automation**][1] pour obtenir des informations sur les lacunes d'observabilité sur vos hosts, les Agents ou Collectors OpenTelemetry obsolètes et les Agents présentant des problèmes d'intégration.

Pour chaque Agent Datadog, vous pouvez voir :
- La version de l'Agent
- Si l'Agent comporte des intégrations non configurées ou mal configurées
- Les services surveillés par l'Agent
- Le statut de configuration à distance de l'Agent
- Les produits activés sur l'Agent
- Les événements Audit Trail de l'Agent, y compris les modifications de configuration, les mises à niveau et les flares

Pour chaque Collector OpenTelemetry, vous pouvez voir :
- La version du Collector
- La distribution du Collector
- Le fichier YAML de configuration du Collector

### Examiner un Agent Datadog ou un Collector OpenTelemetry

La sélection d'un Agent Datadog ou d'un Collector OpenTelemetry vous donne plus d'informations à son sujet, notamment sa configuration, les intégrations connectées, les événements d'audit et un onglet d'assistance que vous pouvez utiliser pour envoyer un flare à distance.

{{< img src="agent/fleet_automation/fleet-automation-view-config.png" alt="Informations sur l'intégration d'un Agent" style="width:100%;" >}}

### Afficher les événements Audit Trail de l'Agent

L'onglet Audit Events affiche les événements Audit Trail associés à l'Agent sélectionné. Utilisez cet onglet pour :
- Identifier les modifications de configuration, les mises à jour de clés d'API, les installations, les mises à niveau et les flares d'assistance.
- Déterminer quand les modifications ont été effectuées et depuis quel emplacement

La visibilité des événements Audit Trail dépend de votre offre. Lorsque Audit Trail est activé dans votre organisation, vous pouvez consulter les événements de l'Agent pendant une durée maximale de 90 jours, en fonction de vos paramètres de rétention Audit Trail. Si Audit Trail n'est pas activé dans votre organisation, vous pouvez consulter les événements des dernières 24 heures.

### Envoyer un flare à distance

Vous pouvez envoyer un flare depuis l'Agent Datadog ou le Collector DDOT après avoir activé la configuration à distance sur l'Agent. Pour obtenir des instructions sur l'envoi d'un flare, consultez la section [Envoyer un flare depuis le site Datadog][7].

Lorsque vous contactez l'assistance Datadog avec la configuration à distance activée pour un Agent, l'équipe d'assistance peut initier un flare depuis votre environnement afin de mieux vous aider dans les plus brefs délais. Les flares fournissent à l'assistance Datadog des informations de diagnostic pour vous aider à résoudre votre problème.

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="Envoyer un flare à distance" style="width:100%;" >}}

## Contrôler l'accès à Fleet Automation

Fleet Automation est accessible à tous les utilisateurs d'une organisation Datadog. Vous pouvez contrôler l'accès à des fonctionnalités spécifiques :

| Autorisation | Description |
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
[8]: https://docs.datadoghq.com/fr/opentelemetry/integrations/datadog_extension/#setup
[9]: https://docs.datadoghq.com/fr/api/latest/fleet-automation/
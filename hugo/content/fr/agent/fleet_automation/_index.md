---
aliases:
- /fr/agent/fleet_automation/remote_management
description: Gouvernez de manière centralisée et gérez à distance les agents Datadog
  et les collecteurs OpenTelemetry à grande échelle grâce aux vues de configuration,
  aux mises à niveau, à la collecte de flares et à la rotation des clés d'API.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/fleet-automation-central-configuration
  tag: Blog
  text: Configurez et mettez à l'échelle de manière centralisée la surveillance de
    votre infrastructure et de vos applications avec Datadog Fleet Automation
- link: https://www.datadoghq.com/blog/manage-opentelemetry-collectors-with-datadog-fleet-automation
  tag: Blog
  text: Gérez tous vos collecteurs OpenTelemetry avec Datadog Fleet Automation.
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralisez et gérez votre pipeline OpenTelemetry avec la passerelle DDOT
- link: /remote_configuration
  tag: Documentation
  text: En savoir plus sur Remote Configuration
- link: /infrastructure/list/#agent-configuration
  tag: Documentation
  text: En savoir plus sur la vue de configuration de l'Agent
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: Blog
  text: Gouvernez de manière centralisée et gérez à distance les agents Datadog à
    grande échelle avec Fleet Automation
site_support_id: fleet-automation-standard-features
title: Fleet Automation
---
## Présentation {#overview}

Datadog Fleet Automation vous permet de gouverner de manière centralisée et de gérer à distance les agents Datadog et les collecteurs OpenTelemetry (OTel) à grande échelle pour répondre à l'évolution de vos besoins en matière d'observabilité.

{{< img src="/agent/fleet_automation/fleet-automation-main.png" alt="La page Fleet Automation affichant une liste d'agents avec leurs versions, leurs statuts et les produits activés." style="width:100%;" >}}

## Fonctionnalités clés {#key-capabilities}

Avec Fleet Automation, vous pouvez :
- **[Consulter les configurations des Agents et des collecteurs OTel][3]** ainsi que l'historique des modifications pour confirmer les mises à jour de déploiement et vérifier la cohérence de la configuration.
- **[Configurer les Agents Datadog][4]** pour centraliser la configuration et obtenir plus rapidement une visibilité sur vos environnements.
- **[Gérer les tags Datadog Agent][4]** _(Aperçu)_ pour corriger et standardiser le tagging sur l'ensemble de votre parc.
- **[Maintenir votre parc à jour][5]** en identifiant et en mettant à niveau les versions obsolètes des Agents et des collecteurs OTel.
- **[Envoyer un flare de support à distance][6]**, ce qui réduit le temps nécessaire pour déboguer les problèmes sur un Agent ou un DDOT Collector.
- **[Afficher votre parc par cluster Kubernetes][7]** pour inspecter et configurer les agents regroupés par cluster plutôt que comme des hosts individuels.

## API Fleet Automation {#fleet-automation-api}

Fleet Automation fournit une API publique qui vous permet d'afficher et de gérer de manière programmatique les agents Datadog à grande échelle. Pour obtenir des détails complets sur les endpoints et des exemples d'utilisation, consultez la [documentation de l'API Fleet Automation][1]. 

<div class="alert alert-info">
L'API Fleet Automation ne prend pas en charge toutes les fonctionnalités de configuration des Datadog Agents.
</div>

## Contrôlez l'accès à Fleet Automation {#control-access-to-fleet-automation}

Fleet Automation est disponible pour tous les utilisateurs d'une organisation Datadog. Vous pouvez contrôler l'accès à des fonctionnalités spécifiques :

| Autorisation | Description |
|--------------|---------------|
| `API Keys Read`| Restreint les utilisateurs pouvant afficher et rechercher des agents par clé d'API. |
| `Agent Flare Collection` | Restreint les utilisateurs pouvant envoyer des flares à distance depuis Fleet Automation. |
| `Agent Upgrade` | Restreint les utilisateurs ayant accès à la mise à niveau des agents depuis Fleet Automation. |
| `Agent Configuration Management` | Restreint les utilisateurs pouvant configurer les agents depuis Fleet Automation. |

Pour plus d'informations sur la configuration des rôles et des autorisations, consultez [Contrôle de l'accès][2].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/fleet-automation/
[2]: /fr/account_management/rbac/
[3]: /fr/agent/fleet_automation/fleet_view/
[4]: /fr/agent/fleet_automation/configure_agents/
[5]: /fr/agent/fleet_automation/upgrade_agents/
[6]: /fr/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[7]: /fr/agent/fleet_automation/fleet_view/#kubernetes-view
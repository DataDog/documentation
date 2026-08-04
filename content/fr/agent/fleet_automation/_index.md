---
aliases:
- /fr/agent/fleet_automation/remote_management
description: Gérez de manière centralisée et à distance les agents Datadog et les
  collecteurs OpenTelemetry à grande échelle avec des vues de configuration, des mises
  à niveau, la collecte de flares et la rotation des clés API.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/fleet-automation-central-configuration
  tag: Blog
  text: Configurez et développez de manière centralisée la surveillance de votre infrastructure
    et de vos applications avec Datadog Fleet Automation.
- link: https://www.datadoghq.com/blog/manage-opentelemetry-collectors-with-datadog-fleet-automation
  tag: Blog
  text: Gérez tous vos collecteurs OpenTelemetry avec Datadog Fleet Automation.
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralisez et gérez votre pipeline OpenTelemetry avec la passerelle DDOT.
- link: /remote_configuration
  tag: Documentation
  text: Découvrez-en plus sur la configuration à distance.
- link: /infrastructure/list/#agent-configuration
  tag: Documentation
  text: Découvrez la vue de configuration de l'Agent.
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: Blog
  text: Gérez de manière centralisée et à distance les Datadog Agents à grande échelle
    avec Fleet Automation.
title: Fleet Automation
---
## Aperçu {#overview}

Datadog Fleet Automation vous permet de gérer de manière centralisée et à distance les Datadog Agents et les collecteurs OpenTelemetry (OTel) à grande échelle pour répondre à vos besoins d'observabilité en évolution.

{{< img src="/agent/fleet_automation/fleet-automation-main.png" alt="La page Fleet Automation affichant une liste de Datadog Agents avec leurs versions, leurs statuts et leurs produits activés." style="width:100%;" >}}

## Fonctionnalités clés {#key-capabilities}

Avec Fleet Automation, vous pouvez :
- **[Afficher les configurations des Datadog Agents et des OTel Collectors][3]** ainsi que les modifications historiques pour confirmer les mises à jour de déploiement et vérifier la cohérence des configurations.
- **[Configurer les Datadog Agents][4]** pour centraliser la configuration et obtenir plus rapidement une visibilité sur vos environnements.
- **[Maintenez votre flotte à jour][5]** en identifiant et en mettant à niveau les versions obsolètes des Datadog Agents et des OTel Collectors.
- **[Envoyez un support flare à distance][6]**, réduisant le temps nécessaire pour déboguer les problèmes sur un Datadog Agent ou un DDOT Collector.

## Fleet Automation API {#fleet-automation-api}

Fleet Automation fournit une API publique qui vous permet de visualiser et de gérer les Datadog Agents à grande échelle de manière programmatique. Pour des détails complets sur les points de terminaison et des exemples d'utilisation, consultez la [Fleet Automation API documentation][1]. 

<div class="alert alert-info">
Fleet Automation API ne prend pas en charge toutes les capacités de configuration des Datadog Agents.
</div>

## Contrôlez l'accès à Fleet Automation {#control-access-to-fleet-automation}

Fleet Automation est disponible pour tous les utilisateurs d'une organisation Datadog. Vous pouvez contrôler l'accès à des fonctionnalités spécifiques :

| Permission | Description |
|--------------|---------------|
| `API Keys Read`| Restreint quels utilisateurs peuvent voir et rechercher les Datadog Agents par clé API. |
| `Agent Flare Collection` | Restreint quels utilisateurs peuvent envoyer des flares à distance depuis Fleet Automation. |
| `Agent Upgrade` | Restreint quels utilisateurs ont accès à la mise à niveau des Datadog Agents depuis Fleet Automation. |
| `Agent Configuration Management` | Restreint quels utilisateurs ont accès à la configuration des Datadog Agents depuis Fleet Automation. |

Pour des informations sur la configuration des rôles et des permissions, voir [Access Control][2].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/fleet-automation/
[2]: /fr/account_management/rbac/
[3]: /fr/agent/fleet_automation/fleet_view/
[4]: /fr/agent/fleet_automation/configure_agents/
[5]: /fr/agent/fleet_automation/upgrade_agents/
[6]: /fr/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
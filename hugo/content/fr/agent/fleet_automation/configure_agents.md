---
description: Déployez et gérez la configuration de l'Agent Datadog à grande échelle
  avec Fleet Automation.
further_reading:
- link: /agent/fleet_automation/
  tag: Documentation
  text: Fleet Automation
- link: /api/latest/fleet-automation/
  tag: Documentation
  text: API Fleet Automation
site_support_id: fleet-automation-standard-features
title: Configurer les Agents
---
Utilisez [Fleet Automation][3] pour déployer et gérer la configuration de l'Agent Datadog à grande échelle. Appliquez des modifications de configuration via des workflows guidés dans l'interface utilisateur ou avec des fichiers YAML personnalisés.

## Prérequis {#prerequisites}

- [Remote Configuration][9] activée pour votre organisation
- Agent version 7.73+ pour la configuration de l'Agent et du collecteur OTel (version 7.76+ pour la configuration des intégrations et des secrets). Pour mettre à niveau vos Agents, consultez [Mettre à niveau les Agents][10].
- Machines virtuelles Linux installées avec le script d'installation ou le rôle Ansible Datadog, ou machines virtuelles Windows

{{< callout url="https://www.datadoghq.com/product-preview/configure-agent-kubernetes-operator/" header="Rejoignez la Preview !" >}}
La Remote Configuration des Agents dans les charges de travail conteneurisées est en version préliminaire. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

{{< callout url="https://www.datadoghq.com/product-preview/modify-tags-fleet-automation/" header="Rejoignez la Preview !" >}}
La gestion des balises de l'Agent Datadog avec Fleet Automation est en version préliminaire. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Configurer plusieurs Agents {#configure-multiple-agents}

1. Dans Fleet Automation, ouvrez l'onglet [Configuration][1] et cliquez sur {{< ui >}}Configure Agents{{< /ui >}}.
1. Définissez la portée de la configuration pour les Agents cibles. Filtrez par informations du host ou par tags pour cibler un groupe spécifique.

   {{< img src="/agent/fleet_automation/fa_scope_config.png" alt="L'étape Définir la portée de cette configuration dans le workflow Configurer les Agents de Fleet Automation, montrant les filtres pour l'environnement, le système d'exploitation et le nom d'hôte, une liste de 33 Agents inclus dans la portée, et un panneau Résumé de la configuration sur la droite." style="width:100%;" >}}

1. Sélectionnez les produits (par exemple, Logs, APM ou NDM) que les Agents cibles doivent exécuter.

   {{< img src="/agent/fleet_automation/fa_create_agent_configuration3.png" alt="L'étape « Select products to configure » dans le workflow « Configure Agents » de Fleet Automation, montrant les tuiles de produits regroupées sous Core Observability (Infrastructure Monitoring, Log Management, APM) et Additional Observability (Live Process Monitoring, Cloud Network Monitoring, Network Device Monitoring)." style="width:100%;" >}}

1. Examinez le plan de déploiement pour confirmer les Agents inclus dans la portée et les paramètres de déploiement, tels que la simultanéité du déploiement.
1. Cliquez sur {{< ui >}}Deploy Configuration{{< /ui >}} pour démarrer le déploiement et suivre sa progression depuis la [Deployments page][2].

## Modifier la configuration d'un seul Agent {#edit-the-configuration-of-a-single-agent}

1. Accédez à [Fleet View][3]. 

1. (Facultatif) Filtrez par informations du host ou par tags pour restreindre la liste.

1. Sélectionnez un host pour ouvrir son panneau latéral, puis cliquez sur l'onglet {{< ui >}}Configuration{{< /ui >}}. 

1. Cliquez sur {{< ui >}}Edit{{< /ui >}} pour modifier la configuration. 

1. Cliquez sur {{< ui >}}Deploy Changes{{< /ui >}} pour appliquer vos mises à jour.

**Remarque** : Certains champs de configuration (par exemple, `api_key`, `site` et `notable_events`) ne peuvent pas être modifiés.

L'exemple ci-dessous montre le champ `logs_enabled` modifié de `false` à `true`, ce qui active la collecte des logs sur l'Agent après le déploiement.

{{< img src="/agent/fleet_automation/agent_remote_management_single_agent_config2.png" alt="Modifiez et déployez la configuration de l'Agent." style="width:90%;" >}}

## Configurer les Agents avec l'API {#configure-agents-with-the-api}

Fleet Automation fournit une API pour appliquer les mises à jour de configuration de manière programmatique. Déployez des modifications sur n'importe quel groupe d'hôtes avec des requêtes de filtrage, en fournissant soit des fichiers de configuration complets, soit des correctifs ciblés. Envoyez la configuration à la demande ou intégrez-la à vos flux de travail d'automatisation existants. Pour plus de détails, consultez l'[Fleet Automation API][4].

**Remarque** : L'API ne prend pas en charge tous les champs de configuration de l'Agent. Les paramètres liés à la connexion de l'Agent ou aux secrets (`site`, `api_key` et autres paramètres d'authentification) ne peuvent pas être gérés via l'API.

## Priorité de configuration {#configuration-precedence}

Les modifications de configuration déployées par Fleet Automation suivent des règles différentes selon la cible :

- **Configuration de l'Agent (`datadog.yaml`) :** Fleet Automation applique les modifications à l'aide de merge patch : seuls les champs spécifiés sont mis à jour et les champs non mentionnés restent inchangés. En cas de conflit au niveau du champ, la valeur de Fleet Automation prévaut sur toute valeur locale.
- **Intégration et configurations de logs personnalisées :** Fleet Automation prend en charge deux modes :
    - Déployez un nouveau fichier de configuration.
    - Mettez à jour un fichier existant en utilisant merge patch pour modifier uniquement des champs spécifiques. Si vous déployez une modification ciblant un nom de fichier existant sans utiliser merge patch, le fichier est entièrement écrasé.

  Dans les deux cas, la modification la plus récente devient la configuration active de l'Agent, quelle que soit la source (Fleet Automation, outils de gestion de configuration ou modifications directes sur le host).

Utilisez [Fleet Automation Audit Trail][5] pour suivre les modifications de configuration récentes apportées à vos Agents et configurer des alertes sur ces changements.

## Miroirs et proxys {#mirrors-and-proxies}

Vous pouvez utiliser la gestion à distance de l'Agent avec un proxy ou des dépôts miroirs.

Pour obtenir des instructions sur la configuration de votre Agent pour utiliser un proxy, consultez [Agent Proxy Configuration][6]. Une fois le proxy configuré, redémarrez l'Agent pour appliquer les paramètres.

Pour obtenir des instructions sur l'utilisation de dépôts miroirs ou isolés (air-gapped), consultez :
- [Synchroniser les images de Datadog avec un registre de conteneurs privé][7]
- [Installation de l'Agent sur un serveur avec une connectivité Internet limitée][8]

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/agent-management
[2]: https://app.datadoghq.com/fleet/deployments
[3]: https://app.datadoghq.com/fleet
[4]: /fr/api/latest/fleet-automation/
[5]: /fr/agent/fleet_automation/fleet_view/#view-agent-audit-trail-events
[6]: /fr/agent/configuration/proxy/
[7]: /fr/containers/guide/sync_container_images/
[8]: /fr/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
[9]: /fr/agent/guide/setup_remote_config
[10]: /fr/agent/fleet_automation/upgrade_agents/
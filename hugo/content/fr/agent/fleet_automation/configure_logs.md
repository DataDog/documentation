---
description: Configurez à distance la collecte de logs personnalisés à grande échelle
  avec Fleet Automation.
further_reading:
- link: /agent/fleet_automation/
  tag: Documentation
  text: Fleet Automation
- link: /agent/fleet_automation/configure_integrations/
  tag: Documentation
  text: Configurer Agent Integrations
- link: /agent/fleet_automation/configure_agents/
  tag: Documentation
  text: Configurer les Agents
- link: /api/latest/fleet-automation/
  tag: Documentation
  text: API Fleet Automation
- link: /agent/logs/
  tag: Documentation
  text: Collecte de logs par l'Agent de host
- link: /logs/guide/log-collection-troubleshooting-guide/
  tag: Documentation
  text: Guide de dépannage pour la collecte de logs
site_support_id: fleet-automation-standard-features
title: Configurer des logs personnalisés
---
Utilisez [Fleet Automation][2] pour gérer les paramètres de [collecte de logs personnalisés][4] sur vos Agents à distance et à grande échelle. Au lieu de modifier les fichiers de configuration `conf.d` host par host, ciblez une modification en fonction des informations sur les hosts ou des tags, puis déployez-la sur tous les Agents correspondants en une seule fois. Avant le déploiement, examinez le diff de configuration pour chaque Agent concerné.

## Prérequis {#prerequisites}

- [Remote Configuration][1] activé pour votre organisation et la clé d'API de l'Agent
- [Remote updates][10] activées sur chaque Agent de VM cible (`remote_updates: true`)
- Agent version 7.76 ou ultérieure. Pour mettre à niveau vos Agents, consultez [Mettre à niveau les Agents][5].
- VM Linux (installées avec le script d'installation ou Ansible Datadog Role) ou VM Windows
- Collecte de logs activée sur les Agents cibles (`logs_enabled: true` dans `datadog.yaml`). Fleet Automation déploie le fichier de configuration dans les deux cas, mais l'Agent ne commence pas à collecter les logs tant que la collecte de logs n'est pas activée. Consultez [Collecte de logs par l'Agent de host][8].

<div class="alert alert-info">
La configuration de logs personnalisés sur des Agents dans des charges de travail conteneurisées n'est pas prise en charge. Pour les environnements conteneurisés, consultez <a href="/containers/kubernetes/log/">Collecte de logs Kubernetes</a>.
</div>

## Configurer des logs personnalisés sur plusieurs Agents {#configure-custom-logs-across-multiple-agents}

<div class="alert alert-tip">Au fil des étapes de l'assistant de configuration, le panneau <strong>Configuration Summary</strong> affiche l'ensemble des Agents actuellement sélectionnés. Utilisez ce panneau pour vérifier l'effet qu'aurait une modification sur un Agent en prévisualisant le diff de configuration d'un Agent donné parmi ceux sélectionnés.</div>

1. Dans Fleet Automation, ouvrez l'onglet [{{< ui >}}Configuration{{< /ui >}}][2] et cliquez sur {{< ui >}}Configure Agents{{< /ui >}}.
1. Définissez le périmètre de la configuration pour les Agents cibles. Filtrez par informations du host ou par tags pour cibler un groupe spécifique.
1. Choisissez {{< ui >}}Custom Logs{{< /ui >}}.
1. Sélectionnez une opération (pour plus d'informations, consultez [Comment les modifications de configuration sont appliquées](#how-configuration-changes-are-applied)) :

    - {{< ui >}}Add New{{< /ui >}}. Spécifiez le nom du nouveau fichier de configuration et renseignez les paramètres de configuration comme indiqué. Pour une explication des champs de collecte de logs, consultez [Collecte de logs personnalisés][4]. Utilisez le champ {{< ui >}}Tags{{< /ui >}} pour associer des [tags][6] aux logs collectés. Cliquez sur {{< ui >}}\+ Add Log Collection{{< /ui >}} pour ajouter d'autres paramètres de collecte de logs.
    - {{< ui >}}Edit & Replace{{< /ui >}}. Cliquez sur {{< ui >}}Select a File{{< /ui >}} et choisissez le fichier de configuration que vous souhaitez remplacer, puis mettez à jour les paramètres de collecte de logs.
    - {{< ui >}}Delete{{< /ui >}}. Cliquez sur {{< ui >}}Select a File to Delete{{< /ui >}}.

    <div class="alert alert-tip">Basculez entre le mode <strong>Visual</strong> et le mode <strong>YAML</strong> lorsque vous renseignez la configuration de collecte de logs. Utilisez le mode <strong>YAML</strong> pour coller directement du YAML.</div>

1. Examinez le plan de déploiement. Fleet Automation génère un diff de configuration pour chaque Agent concerné afin que vous puissiez vérifier les modifications exactes.
1. Cliquez sur {{< ui >}}Deploy Configuration{{< /ui >}} pour démarrer le déploiement. Suivez la progression depuis la [page Deployments][3].

## Comment les modifications de configuration sont appliquées {#how-configuration-changes-are-applied}

Chaque opération applique différemment les modifications à la collecte de logs personnalisés sur un Agent :

- {{< ui >}}Add New{{< /ui >}} : Déploie un nouveau fichier de configuration.

- {{< ui >}}Edit & Replace{{< /ui >}} : Remplace l'intégralité du fichier de configuration. Incluez toutes les valeurs souhaitées dans votre mise à jour. Toute valeur omise est supprimée.

- {{< ui >}}Delete{{< /ui >}} : Supprime le fichier de configuration des Agents cibles.

## Vérifiez la collecte de logs {#verify-log-collection}

Après avoir déployé une configuration :

1. Dans [Fleet Automation][9], ouvrez la page de détails de l'un des Agents ciblés.
1. Dans l'onglet {{< ui >}}Configuration{{< /ui >}}, vérifiez que le fichier de configuration des logs personnalisés, nouveau ou mis à jour, figure dans la liste sans afficher d'état d'erreur. Cela signifie que la configuration a été transmise et appliquée avec succès.

Si le déploiement a réussi, mais qu'aucun log n'est reçu, consultez le [guide de dépannage de la collecte de logs][7].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/setup_remote_config
[2]: https://app.datadoghq.com/fleet/agent-management
[3]: https://app.datadoghq.com/fleet/deployments
[4]: /fr/agent/logs/?tab=tailfiles#custom-log-collection
[5]: /fr/agent/fleet_automation/upgrade_agents/
[6]: /fr/getting_started/tagging/assigning_tags/
[7]: /fr/logs/guide/log-collection-troubleshooting-guide/
[8]: /fr/agent/logs/
[9]: https://app.datadoghq.com/fleet
[10]: /fr/agent/guide/setup_remote_config/#enable-remote-agent-management
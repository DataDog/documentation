---
description: Configurez à distance les intégrations du Datadog Agent à grande échelle
  avec Fleet Automation.
further_reading:
- link: /agent/fleet_automation/
  tag: Documentation
  text: Fleet Automation
- link: /agent/fleet_automation/configure_agents/
  tag: Documentation
  text: Configurer les Agents
- link: /api/latest/fleet-automation/
  tag: Documentation
  text: API Fleet Automation
site_support_id: fleet-automation-standard-features
title: Configurer Agent Integrations
---
Fleet Automation peut déployer, mettre à jour et supprimer à distance des fichiers de configuration [d'intégration][1] (`conf.d`) sur vos Agents. Sélectionnez les Agents cibles par host ou par tag, choisissez une intégration et Fleet Automation déploie la modification de configuration sur l'ensemble de votre parc.

## Prérequis {#prerequisites}

- [Remote Configuration][2] activée pour votre organisation et la clé d'API de l'Agent
- [Remote updates][7] activées sur chaque Agent de VM cible (`remote_updates: true`)
- Agent version 7.76 ou ultérieure. Pour mettre à niveau vos Agents, consultez [Mettre à niveau les Agents][6].
- VM Linux (installées avec le script d'installation ou Ansible Datadog Role) ou VM Windows

<div class="alert alert-info">
La configuration des intégrations sur les Agents dans des charges de travail conteneurisées n'est pas prise en charge.
</div>

## Compatibilité {#compatibility}

Fleet Automation prend en charge la configuration des intégrations prêtes à l'emploi qui possèdent un fichier de configuration `conf.d`, telles que Redis, MySQL et Windows Certificate Store.

Les checks personnalisés ne sont **pas** pris en charge.

## Configurer les intégrations sur plusieurs Agents {#configure-integrations-across-multiple-agents}

<div class="alert alert-tip">Au fil des étapes de l'assistant de configuration, le panneau <strong>Configuration Summary</strong> affiche l'ensemble des Agents actuellement sélectionnés. Utilisez ce panneau pour vérifier l'effet qu'aurait une modification sur un Agent en prévisualisant le diff de configuration d'un Agent donné parmi ceux sélectionnés.</div>

1. Dans Fleet Automation, ouvrez l'onglet [{{< ui >}}Configuration{{< /ui >}}][3] et cliquez sur {{< ui >}}Configure Agents{{< /ui >}}.
1. Définissez le périmètre de la configuration pour les Agents cibles. Filtrez par informations du host ou par tags pour cibler un groupe spécifique.
1. Choisissez {{< ui >}}Agent integrations{{< /ui >}}.
1. Sélectionnez l'intégration à configurer.

    <div class="alert alert-info">Fleet Automation peut détecter les intégrations non configurées sur vos hosts. Si un processus est en cours d'exécution sur un host disposant d'une intégration Datadog disponible mais sans configuration active, il apparaît dans la liste <strong>Unconfigured integrations detected on your hosts</strong>. Utilisez cette option pour repérer les lacunes dans la surveillance de l'ensemble de votre parc.</div>

1. Sélectionnez une opération (voir [Comment les modifications de configuration sont appliquées](#how-configuration-changes-are-applied) pour plus d'informations sur chaque opération) :

    - {{< ui >}}Add New{{< /ui >}}. Spécifiez le nom du nouveau fichier de configuration et renseignez les paramètres de configuration comme indiqué.
    - {{< ui >}}Edit & Replace{{< /ui >}}. Cliquez sur {{< ui >}}Select a file{{< /ui >}} et choisissez le fichier de configuration que vous souhaitez remplacer, puis renseignez la nouvelle configuration comme indiqué.
    - {{< ui >}}Delete{{< /ui >}}. Cliquez sur {{< ui >}}Select a File to Delete{{< /ui >}}.

    <div class="alert alert-tip">Basculez entre les modes <strong>Visual</strong> et <strong>YAML</strong> lorsque vous remplissez la configuration de l'intégration. Utilisez le mode <strong>YAML</strong> pour coller directement du YAML.</div>

1. Examinez le plan de déploiement. Fleet Automation génère un diff de configuration pour chaque Agent concerné afin que vous puissiez vérifier les modifications exactes.
1. Cliquez sur {{< ui >}}Deploy Configuration{{< /ui >}} pour démarrer le déploiement. Suivez la progression depuis la [page Deployments][4].

## Comment les modifications de configuration sont appliquées {#how-configuration-changes-are-applied}

Chaque opération applique les modifications au fichier de configuration de l'intégration `conf.d` différemment :

- {{< ui >}}Add New{{< /ui >}} : Déploie un nouveau fichier de configuration d'intégration. Si un fichier de configuration existe déjà, il est entièrement remplacé et le YAML que vous fournissez devient la nouvelle configuration complète de cette intégration sur les Agents cibles.

- {{< ui >}}Edit & Replace{{< /ui >}} : Seuls les champs que vous spécifiez sont modifiés ; les champs non mentionnés restent inchangés.

  <div class="alert alert-warning">
  Les champs de tableau (tels que <code>tags</code>) sont entièrement remplacés lors d'une opération « Edit & Replace », et non fusionnés. Incluez toutes les valeurs souhaitées dans votre mise à jour. Toute valeur omise est supprimée.
  </div>

- {{< ui >}}Delete{{< /ui >}} : Supprime le fichier de configuration de l'intégration des Agents cibles.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/
[2]: /fr/agent/guide/setup_remote_config
[3]: https://app.datadoghq.com/fleet/agent-management
[4]: https://app.datadoghq.com/fleet/deployments
[5]: https://www.rfc-editor.org/rfc/rfc7386
[6]: /fr/agent/fleet_automation/upgrade_agents/
[7]: /fr/agent/guide/setup_remote_config/#enable-remote-agent-management
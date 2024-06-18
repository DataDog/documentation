---
further_reading:
- link: agent/versions/upgrade_to_agent_v7
  tag: Documentation
  text: Upgrade vers l'Agent v7
- link: agent/versions/upgrade_to_agent_v6
  tag: Documentation
  text: Upgrade vers l'Agent v6
- link: agent/versions/upgrade_between_agent_minor_versions
  tag: Documentation
  text: Passer d'une version mineure de l'Agent à une autre
- link: agent/faq/agent_v6_changes
  tag: FAQ
  text: Nouveautés de l'Agent v6
title: Différences entre les versions de l'Agent
---

<div class="alert alert-info"><p>
Il est recommandé d'installer chaque nouvelle version mineure et chaque patch de l'Agent Datadog, ou de le mettre à jour au moins tous les mois.</p>
<p>
Pour bénéficier des nouvelles fonctionnalités et des derniers correctifs, il est nécessaire d'installer la dernière version majeure de l'Agent Datadog, ainsi que les mises à niveau ultérieures. Datadog publie régulièrement de nouvelles versions, ce qui fait qu'il peut être difficile de gérer les mises à jour à l'échelle de votre entreprise. Toutefois, cela ne signifie pas que vous devez attendre la sortie d'une nouvelle version majeure pour mettre à jour l'Agent. La fréquence de mises à jour adéquate pour votre organisation dépend de votre infrastructure et de vos pratiques en matière de gestion de configuration. Il est néanmoins conseillé de mettre à jour l'Agent tous les mois.</p>
<p>
Pour mettre à jour les composants principaux de l'Agent Datadog depuis et vers une version mineure sur un host donné, exécutez la <a href="/agent/versions/upgrade_between_agent_minor_versions">commande d'installation correspondant à votre plateforme</a>.</p>
<p>
Les numéros des nouvelles versions de l'Agent Datadog respectent les règles <a href="https://semver.org/">SemVer</a>.</p>
</div>

## Changements entre les différentes versions majeures de l'Agent

{{< tabs >}}
{{% tab "Agent v7 vs Agent v6" %}}

L'Agent v7 est la dernière version majeure de l'Agent Datadog. Par rapport à l'Agent v6, la seule nouveauté est que **cette version prend uniquement en charge Python 3 pour les intégrations et les checks custom**.

Consultez la [section Upgrade vers l'Agent v7][1] pour découvrir comment mettre à jour votre Agent vers la version 7. Toutes les intégrations officielles prennent en charge Python 3 par défaut. Suivez le [guide Migration de checks custom vers Python 3][2] pour découvrir comment convertir vos checks custom.

**Remarque** : vous avez la possibilité de tester cette migration avec l'Agent v6 en suivant les instructions de la section [Utiliser Python 3 avec l'Agent v6][3].


[1]: /fr/agent/versions/upgrade_to_agent_v7/
[2]: /fr/agent/guide/python-3/
[3]: /fr/agent/guide/agent-v6-python-3/
{{% /tab %}}
{{% tab "Agent v6 vs Agent v5" %}}

**Principales nouveautés de l'Agent v6** :

La principale différence entre l'Agent 5 et l'Agent 6 est que les composants principaux de l'Agent 6 ont été entièrement réécrits en Golang. Cela permet à Datadog de tirer parti de la programmation concurrente : au lieu des trois processus que l'Agent v5 exécutait, à savoir _le Forwarder_, _le Collector_ et _DogStatsD_, il n'existe désormais plus qu'un seul processus : _l'Agent_. Cette version offre également de nombreuses autres améliorations importantes :

- L'Agent v6 a considérablement réduit l'utilisation des ressources par rapport à l'Agent v5 :

  - Charge CPU réduite
  - Charge mémoire réduite
  - Nombre de descripteurs de fichier réduit
  - Empreinte globale réduite

- L'Agent 6 utilise [deux ports supplémentaires][1] :

  - `5000` pour exposer ses métriques runtime.
  - `5001` pour les [commandes de l'interface de ligne de commande/l'interface graphique de l'Agent][2].

    **Remarque** : vous pouvez modifier les ports pour `expvar_port` et `cmd_port` dans le fichier `datadog.yaml`.

- Personnalisez l'Agent v6 et le service [DogStatsD][3] encore plus facilement et de façon plus poussée grâce aux nouvelles options de configuration, qui vous permettent d'inclure ou d'exclure pratiquement tout ce que vous souhaitez.

**Nouvelles fonctionnalités de l'Agent v6 :**

Pour découvrir l'ensemble des nouveautés de l'Agent v6 par rapport à la v5, consultez la documentation relative aux [modifications apportées à l'Agent Datadog][4]. Les principales différences sont les suivantes :

- Les [métriques de distribution][5] peuvent être calculées directement sur le serveur afin de déterminer les centiles globaux réels.
- [DogStatsD][3] peut être utilisé sur un socket Unix plutôt que via UDP.
- [La surveillance de live processes est disponible pour Windows][6].
- [Le format OpenMetrics de Prometheus est pris en charge de façon native][7].
- [Tous vos logs peuvent être envoyés à Datadog à des fins d'alerte, d'analyse et de corrélation avec les métriques][8].


[1]: /fr/agent/#agent-architecture
[2]: /fr/agent/guide/agent-commands/
[3]: /fr/developers/dogstatsd/unix_socket/
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md
[5]: /fr/metrics/types/?tab=distribution#metric-types
[6]: /fr/infrastructure/process/
[7]: https://www.datadoghq.com/blog/monitor-prometheus-metrics
[8]: /fr/logs/
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
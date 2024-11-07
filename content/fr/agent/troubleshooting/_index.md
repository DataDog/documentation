---
aliases:
- /fr/agent/faq/agent-s-are-no-longer-reporting-data
- /fr/agent/faq/common-windows-agent-installation-error-1721
further_reading:
- link: /agent/troubleshooting/hostname_containers/
  tag: Documentation
  text: Résolution du hostname de l'Agent dans les conteneurs
- link: /agent/troubleshooting/debug_mode/
  tag: Documentation
  text: Mode debugging de l'Agent
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentation
  text: Envoyer un flare avec l'Agent
- link: /agent/troubleshooting/permissions/
  tag: Documentation
  text: Problèmes d'autorisations de l'Agent
- link: /agent/troubleshooting/site/
  tag: Documentation
  text: Vérifier le site de l'Agent
- link: /agent/troubleshooting/ntp/
  tag: Documentation
  text: Problèmes NTP de l'Agent
- link: /agent/troubleshooting/agent_check_status/
  tag: Documentation
  text: Obtenir le statut d'un check de l'Agent
- link: /agent/troubleshooting/high_memory_usage/
  tag: Documentation
  text: Utilisation intensive du processeur ou de la mémoire
title: Dépannage de l'Agent
---

Si vous n'avez pas encore installé l'Agent Datadog, accédez à [la page d'intégration de l'Agent][1] pour obtenir des instructions d'installation. Si vous venez d'installer l'Agent, vous devrez peut-être patienter quelques minutes avant de consulter vos premières métriques. Pour vérifier rapidement que vos métriques sont transmises, consultez la vue [Metrics Explorer][2].

Si vous pensez que vous rencontrez un problème, commencez par consulter cette liste de questions :

* Le conteneur de votre Agent s'arrête juste après avoir été lancé ? Il s'agit peut-être d'un problème de détection du [hostname][3].
* Votre host est-il connecté à Internet, ou peut-il y accéder par l'intermédiaire d'un proxy ?
* Si vous utilisez un proxy : votre [Agent est-il configuré pour ce proxy][4] ?
* La clé d'API Datadog indiquée dans votre fichier de configuration `datadog.yaml` correspond-elle à [la clé d'API sur la plateforme Datadog][5] ?
* Le site configuré dans votre fichier de configuration  `datadog.yaml` [correspond-il à celui de votre organisation][6] ?
* Exécutez-vous un seul Agent Datadog sur votre host ?
* Avez-vous redémarré l'Agent Datadog après avoir modifié un fichier de configuration yaml ?

Si vous avez répondu `oui` à l'ensemble de ces questions, [exécutez la commande status][7] pour en savoir plus sur votre Agent et sur le statut de ses intégrations. Vous pouvez également consulter directement les [logs de l'Agent][8] et activer le mode debugging pour [accroître la journalisation de l'Agent][9].

Si vous n'avez toujours pas résolu votre problème, vous pouvez contacter l'[équipe d'assistance Datadog][10] en envoyant [un flare][11] de votre Agent.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://app.datadoghq.com/metric/explorer
[3]: /fr/agent/troubleshooting/hostname_containers/
[4]: /fr/agent/configuration/proxy/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /fr/agent/troubleshooting/site/
[7]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[8]: /fr/agent/configuration/agent-log-files/
[9]: /fr/agent/troubleshooting/debug_mode/
[10]: /fr/help/
[11]: /fr/agent/troubleshooting/send_a_flare/
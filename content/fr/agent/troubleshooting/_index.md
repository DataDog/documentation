---
title: Dépannage de l'Agent
kind: documentation
aliases:
  - /fr/agent/faq/agent-s-are-no-longer-reporting-data
  - /fr/agent/faq/common-windows-agent-installation-error-1721
further_reading:
  - link: /agent/troubleshooting/debug_mode/
    tag: Documentation
    text: Mode debugging de l'Agent
  - link: /agent/troubleshooting/send_a_flare/
    tag: Documentation
    text: Envoyer un flare de l'Agent
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
---
Si vous n'avez pas encore installé l'Agent Datadog, accédez à [la page d'intégration de l'Agent][1] pour obtenir des instructions d'installation. Si vous venez d'installer l'Agent, vous devrez peut-être patienter quelques minutes avant de consulter vos premières métriques. Pour vérifier rapidement que vos métriques sont transmises, consultez la vue [Metrics Explorer][2].

Si vous pensez que vous rencontrez un problème, commencez par consulter cette liste de questions :

* Votre host est-il connecté à Internet, ou peut-il y accéder par l'intermédiaire d'un proxy ?
* Si vous utilisez un proxy : votre [Agent est-il configuré pour ce proxy][3] ?
* La clé d'API Datadog indiquée dans votre fichier de configuration `datadog.yaml` correspond-elle à [la clé d'API de votre plate-forme Datadog][4] ?
* Le site configuré dans votre fichier de configuration  `datadog.yaml` [correspond-il à celui de votre organisation][5] ?
* Exécutez-vous un seul Agent Datadog sur votre host ?
* Avez-vous redémarré l'Agent Datadog après avoir modifié un fichier de configuration yaml ?

Si vous avez répondu `oui` à l'ensemble de ces questions, [exécutez la commande status][6] pour en savoir plus sur votre Agent et sur le statut de ses intégrations. Vous pouvez également consulter directement les [logs de l'Agent][7] et activer le mode debugging pour [accroître la journalisation de l'Agent][8].

Si vous n'avez toujours pas résolu votre problème, vous pouvez contacter l'[équipe d'assistance Datadog][9] en envoyant [un flare][10] de votre Agent.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://app.datadoghq.com/metric/explorer
[3]: /fr/agent/proxy/
[4]: https://app.datadoghq.com/account/settings#api
[5]: /fr/agent/troubleshooting/site/
[6]: /fr/agent/guide/agent-commands/#agent-status-and-information
[7]: /fr/agent/guide/agent-log-files/
[8]: /fr/agent/troubleshooting/debug_mode/
[9]: /fr/help/
[10]: /fr/agent/troubleshooting/send_a_flare/
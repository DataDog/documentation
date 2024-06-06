---
aliases:
- /fr/logs/faq/i-have-a-custom-log-file-with-heightened-read-permissions
further_reading:
- link: /logs/log_collection/
  tag: Documentation
  text: Apprendre à recueillir vos logs
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /glossary/#tail
  tag: Glossaire
  text: Entrée du glossaire pour le terme « tail »
kind: guide
title: Envoyer des logs à partir d'un fichier de log personnalisé avec des accès en
  lecture renforcés
---

Généralement, les fichiers de logs, en particulier les logs système tels que les *syslog* ou *journald*, disposent dʼaccès en lecture renforcés qui empêchent lʼAgent Datadog de recueillir des logs car il n'a pas d'accès *sudo* ou *admin*.

Trois solutions existent pour contourner ce problème :

* (Non recommandé) Accordez l'accès racine à lʼAgent pour qu'il puisse suivre ces fichiers. Datadog recommande fortement de ne pas procéder ainsi.
* Modifiez les droits d'accès au fichier pour permettre à lʼAgent d'y accéder. LʼAgent a besoin des autorisations d'exécution et de lecture sur les répertoires, ainsi que de l'accès en lecture sur le fichier. Exécutez les commandes suivantes pour fournir ces autorisations (pour n'importe quel utilisateur, et non seulement pour lʼAgent) :
  * chmod 755 `<folder name>`
  * chmod 644 `<file name>`
* Configurez un shipper de logs en open source (comme Rsyslog, NxLog, etc.) qui dispose d'un accès racine pour envoyer ces logs soit directement à votre plateforme Datadog, soit localement à un Agent Datadog en cours d'exécution. Pour connaître la marche à suivre, consultez la documentation dédiée à [Rsyslog][1], [Syslog-ng][2], [NxLog][3], [FluentD][4] ou [Logstash][5].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/rsyslog/
[2]: /fr/integrations/syslog_ng/
[3]: /fr/integrations/nxlog/
[4]: /fr/integrations/fluentd/#log-collection
[5]: /fr/integrations/logstash/#log-collection
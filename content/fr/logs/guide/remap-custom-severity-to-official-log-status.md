---
aliases:
- /fr/logs/faq/comment-remapper-des-valeurs-de-gravite-personnalisees-pour-le-statut-officiel-des-logs
further_reading:
- link: logs/log_collection/#custom-log-collection
  tag: Documentation
  text: En savoir plus sur la collecte de logs avec lʼAgent
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing

title: Remapper les valeurs de gravité personnalisées pour le statut officiel des
  logs
---

Par défaut, le [remappeur de statuts de log][1] s'appuie sur les [normes de gravité Syslog][2].
Il est cependant possible que vous vouliez remapper d'autres systèmes ayant des valeurs de gravité différentes pour le statut officiel des logs.
Ceci est possible grâce au [processeur de catégories][3] qui définit un mappage entre vos valeurs personnalisées et les valeurs attendues.

Cette page décrit la marche à suivre en sʼappuyant sur deux exemples : Les niveaux de Bunyan et les logs d'accès Web.

## Logs d'accès Web

Le code d'état de la demande peut être utilisé pour déterminer l'état des logs. Les intégrations Datadog font appel au mapping suivant :

* 2xx: OK
* 3xx: Notice
* 4xx: Warning
* 5xx: Error

Supposons que le code d'état de votre log soit stocké dans l'attribut `http.status_code`.
Ajoutez un processeur de catégorie dans votre pipeline qui crée un nouvel attribut pour refléter le mappage ci-dessus :

{{< img src="logs/guide/category_processor.png" alt="Processeur de catégorie " >}}

Ajoutez ensuite un remappeur d'état qui utilise l'attribut nouvellement créé :

{{< img src="logs/guide/log_status_remapper.png" alt="remappeur de statuts de log" >}}

## Niveaux Bunyan

Les niveaux Bunyan sont similaires à ceux de Syslog, mais leurs valeurs sont multipliées par 10.

* 10 = TRACE
* 20 = DEBUG
* 30 = INFO
* 40 = WARN
* 50 = ERROR
* 60 = FATAL

Supposons que le niveau bunyan soit stocké dans l'attribut `bunyan_level`.
Ajoutez un processeur de catégorie dans votre pipeline qui crée un nouvel attribut pour refléter le mappage ci-dessus :

{{< img src="logs/guide/category_processor_bunyan.png" alt="Processeur de catégorie bunyan" >}}

Ajoutez ensuite un remappeur d'état qui utilise l'attribut nouvellement créé :

{{< img src="logs/guide/status_remapper_bunyan.png" alt="remappeur de statuts de log bunyan" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/processors/#log-status-remapper
[2]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[3]: /fr/logs/log_configuration/processors/#category-processor
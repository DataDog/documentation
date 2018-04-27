---
title: Erreur Localhost MySQL - Localhost VS 127.0.0.1
kind: faq
---

Définir "localhost" dans le fichier mysql.yaml peut produire cette erreur:
```
mysql
-----
- instance #0 [ERROR]: OperationalError(2003, 'Can\'t connect to
MySQL server on \'localhost\' ((1045, u"Access denied for user
\'datadog\'@\'127.0.0.1\' (using password: YES)"))')
```
La solution consiste à accorder des autorisations à datadog@127.0.0.1 plutôt qu'à datadog@localhost

Ce problème est documenté dans [cette issue fermée du Datadog Agent][1] et référencé dans la [documentation MySQL][2].

[1]: https://github.com/DataDog/dd-agent/issues/1120
[2]: http://dev.mysql.com/doc/refman/5.5/en/can-not-connect-to-server.html

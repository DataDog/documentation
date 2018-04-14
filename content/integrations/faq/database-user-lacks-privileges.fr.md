---
title: L'utilisateur de la base de données manque de privilèges
kind: faq
---

```
    mysql
    -----
      - instance #0 [WARNING]
          Warning: Privilege error or engine unavailable accessing the INNODB status                          tables (must grant PROCESS): (1227, u'Access denied; you need (at least one of) the PROCESS privilege(s) for this operation')
      - Collected 21 metrics, 0 events & 1 service check
```

L'Agent peut s'authentifier mais il lui manque des privilèges pour une ou plusieurs métriques qu'il souhaite récupérer. Dans ce cas, il manque le privilège PROCESS :

```
mysql> select user,host,process_priv from mysql.user where user='datadog';
+---------+-----------+--------------+
| user    | host      | process_priv |
+---------+-----------+--------------+
| Datadog | localhost | N            |
+---------+-----------+--------------+
1 row in set (0.00 sec)
```

Consultez la section Configiuration et accordez à l'utilisateur Datadog tous les privilèges nécessaires. N'accordez PAS tous les privilèges sur toutes les bases de données à cet utilisateur.


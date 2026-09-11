---
title: Database user lacks privileges

---

```text
    mysql
    -----
      - instance #0 [WARNING]
          Warning: Privilege error or engine unavailable accessing the INNODB status                          tables (must grant PROCESS): (1227, u'Access denied; you need (at least one of) the PROCESS privilege(s) for this operation')
      - Collected 21 metrics, 0 events & 1 service check
```

The Agent can authenticate, but it lacks privileges for one or more metrics it wants to collect. In this case, it lacks the PROCESS privilege:

```text
mysql> select user,host,process_priv from mysql.user where user='datadog';
+---------+-----------+--------------+
| user    | host      | process_priv |
+---------+-----------+--------------+
| Datadog | localhost | N            |
+---------+-----------+--------------+
1 row in set (0.00 sec)
```

Review the Configuration section and grant the Datadog user all necessary privileges. Do NOT grant all privileges on all databases to this user.

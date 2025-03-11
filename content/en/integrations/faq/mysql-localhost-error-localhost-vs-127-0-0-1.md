---
title: MySQL Localhost Error - Localhost VS 127.0.0.1

---

Setting "localhost" in the mysql.yaml file may produce this error:

```text
mysql
-----
- instance #0 [ERROR]: OperationalError(2003, 'Can\'t connect to
MySQL server on \'localhost\' ((1045, u"Access denied for user
\'datadog\'@\'127.0.0.1\' (using password: YES)"))')
```

The workaround is to grant permissions to datadog@127.0.0.1 , rather than datadog@localhost

This problem is documented in [this closed Datadog Agent issue][1] and referenced in the [MySQL documentation][2]

[1]: https://github.com/DataDog/dd-agent/issues/1120
[2]: http://dev.mysql.com/doc/refman/5.5/en/can-not-connect-to-server.html

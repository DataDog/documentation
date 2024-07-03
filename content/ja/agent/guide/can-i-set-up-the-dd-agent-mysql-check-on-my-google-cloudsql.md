---
aliases:
- /ja/agent/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/
- /ja/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/
title: Can I set up the dd-agent mysql check on my Google CloudSQL?
---

Much like the "Native" [Amazon RDS Integration][1] with MySQL, you can set up a Datadog Agent's MySQL integration to monitor on a MySQL instance running in Google CloudSQL. With this setup, you can complement the metrics you would otherwise get from Datadog's [Google CloudSQL Integration][2] with the metrics available from the Datadog Agent's [MySQL integration][3].

To set up this "extra" integration on your Google CloudSQL instance, you can set up the MySQL integration on a Datadog Agent and [configure it to remotely connect][4] to your Google CloudSQL instance instead of using the localhost default. The setup steps are otherwise the same as any other locally hosted MySQL instance.

With one caveat: Google CloudSQL [does not support performance_schemas][5], so you can't `GRANT SELECT ON performance_schema.*` to the Datadog Agent user. As a result, two of the MySQL check's extra/optional metrics are not available for Google CloudSQL instances. Otherwise, the integration should work just as it would with any locally hosted MySQL instance.

[1]: /ja/integrations/amazon_rds/
[2]: /ja/integrations/google_cloudsql/
[3]: /ja/integrations/mysql/
[4]: https://github.com/DataDog/integrations-core/blob/5.12.x/mysql/conf.yaml.example#L4-L7
[5]: https://cloud.google.com/sql/docs/features#differences
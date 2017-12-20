---
title: Can I set up the dd-agent mysql check on my Google CloudSQL?
kind: faq
customnav: integrationsnav
---

Much like the "Native" [AWS RDS Integration](/integrations/amazon_rds) with MySQL, you can set up a Datadog Agent's MySQL integration to monitor on a MySQL instance running in Google CloudSQL. With this setup, you can complement the metrics you would otherwise get from Datadog's [Google CloudSQL Integration](/integrations/google_cloudsql/) with the metrics available from the Datadog Agent's [MySQL integration](/integrations/mysql/). 

To set up this "extra" integration on your Google CloudSQL instance, you can set up the MySQL integration on a Datadog Agent and [configure it to remotely connect](https://github.com/DataDog/integrations-core/blob/5.12.x/mysql/conf.yaml.example#L4-L7) to your Google CloudSQL instance instead of using the localhost default. The setup steps are otherwise the same as any other locally hosted MySQL instance.

With one caveat: Google CloudSQL [does not support performance_schemas](https://cloud.google.com/sql/docs/features#differences), so you can't GRANT SELECT ON performance_schema.* to the datadog agent user. As a result, two of the MySQL check's extra/optional metrics are not available for Google CloudSQL instances. Otherwise, the integration should work just as it would with any locally hosted MySQL instance. 
---
title: How can I monitor the health/status of my RDS instances?
kind: faq
---

There are several options for monitoring the health of your RDS databases.

At a high level, there is an AWS status check for RDS per region, though it doesn't show status at the DB level.

Another option is to set up a monitor on an RDS metric such as `aws.rds.cpuutilization` and configure it to send a notification if no data is received.
By default, Cloudwatch metrics, including RDS metrics, are submitted with a delay, which you'll need to take into account when setting up the no data notifications, but [you can use a lambda function][1] to submit RDS metrics more frequently for the Postgres, MySQL, Aurora, and MariaDB engines. Note that this enhanced monitoring may result in additional AWS charges. For standard RDS metrics, we recommend notifying if data is missing for 30 minutes ([example monitor][2]).

If you're using enhanced RDS monitoring, metrics will be reported much more frequently and with lower latency, so a missing data timeframe of 5 minutes would be fine ([example monitor][3]). Make sure to set up your monitor on an enhanced metric (e.g. `aws.rds.cpuutilization.total`) if enhanced monitoring is enabled.

Finally, install the Agent on an EC2 instance in the same security group as the RDS and use our Agent's DB integrations to connect to your RDS DB, provided that we have an Agent integration for the database you're monitoring. The Agent submits metrics approximately every 15 seconds, and also submits status checks letting you know whether it is possible to connect to your DB.

You can can set up an integration monitor to alert if the some number of health checks fail ([example monitor][4]). Note that "to get the metrics from RDS and the ones from the native integration to match up, you will need to use the dbinstanceidentifier tag on the native integration based on the identifier you assign to the RDS instance".

[1]: /integrations/amazon_rds/#how-this-works
[2]: https://cl.ly/2W1r3V2Z3y0p
[3]: https://cl.ly/1u3f0J1d1I3c
[4]: https://cl.ly/3Z473p16232a

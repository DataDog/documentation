---
title: Tagging SQL Statements
kind: guide
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

This guide assumes that you have configured [Database Monitoring][1].

[Datadog Database Monitoring (DBM)][1] allows you to view explain plans and query samples running on your database hosts. This guide shows you how you can use cloud managed authentication features, such as IAM, to connect the agent to your database. This provides a more secure way to authenticate, and saves you from having to manage database credentials across your agent hosts.

## Before you begin

Supported databases
: postgres

Supported Agent versions
: 7.46+

Supported Authentication Types
: [IAM][2]


## Configure IAM authentication

AWS supports IAM Authentication to RDS and Aurora databases. In order to configure the Agent to connect using IAM, do the following:

1. Turn on IAM authentication on your [RDS][3] or [Aurora][4] instance
2. Create a IAM role, and then attach the following policy:
```shell
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "rds-db:connect"
            ],
            "Resource": [
                "arn:aws:rds-db:REGION:ACCOUNT:dbuser:RESOURCE_ID/db-user"
            ]
        }
    ]
}
```
**Note:** Replace `db-user` with the IAM role information.

3. Login to your database instance as the root user, and grant the `rds_iam` role to the new user:

```tsql
GRANT rds_iam TO db-user;
```

**Note:** Replace `db-user` with the IAM role information.

4. Complete the setup steps for your [RDS][6] or [Aurora][7] instance.

5. [Attach the role][5] with each EC2 instance that is running the agent. Note, this can be done at ec2 launch time.

6. Update your postgres instance config with an `aws` block which specifies the `region` of the RDS instance:

```yaml
instances:
- dbm: true
  host: foo-endpoint.us-east-2.rds.amazonaws.com
  port: 5432
  username: datadog
  aws:
    region: us-east-2
```

That's it!

[1]: /database_monitoring/#getting-started
[2]: https://repost.aws/knowledge-center/rds-postgresql-connect-using-iam
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.Enabling.html
[4]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.Enabling.html
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[6]: /database_monitoring/setup_postgres/rds/#grant-the-agent-access
[7]: /database_monitoring/setup_postgres/aurora/#grant-the-agent-access


---
title: DDSQL (Preview) Common Queries and Use Cases
private: true
aliases:
- /dashboards/guide/ddsql_use_cases
- /ddsql_editor/guide/ddsql_use_cases
further_reading:
- link: "ddsql_editor/"
  tag: "Documentation"
  text: "Learn more about the DDSLQ Editor"
---

<div class="alert alert-danger">
  There are two different <strong>variants</strong> of DDSQL. The examples in this guide use DDSQL (Preview) Syntax. See the syntax documented in <a href="/ddsql_reference/">DDSQL Reference</a>.
</div>

## General queries
### List all libraries across services in production

{{< code-block lang="sql" disable_copy="false">}}
SELECT
    c.service_name,
    c.team,
    lib.library_name,
    lib.eol,
    lib.last_commit,
    lib.newer_versions_number,
    lib.library_version,
    lib.latest_version,
    lib.ecosystem,
    lib.language,
    lib.license,
    lib.license_type
FROM service_definition c
JOIN library lib ON lib.asset_name = c.service_name
WHERE
    lib.env = 'production'
    AND lib.relation = 'DIRECT'
    AND LOWER(c.domain) = 'domain_name'
    AND LOWER(c.vertical) = 'account'
    AND LOWER(c.type) = 'service'
ORDER BY lib.newer_versions_number DESC
{{< /code-block >}}

### List services running an old version of the tracer

{{< code-block lang="sql" disable_copy="false">}}
SELECT *
FROM service_config
WHERE client_library_version < '1.31.0';
{{< /code-block >}}

## AWS

### List of RDS instances that require SSL/TLS certificate rotation

{{< code-block lang="sql" disable_copy="false">}}
SELECT account_id,
  aws_organisation,
  aws_environment db_instance_identifier,
  display_name,
  ca_certificate_identifier,
  engine,
  engine_version,
  tags
FROM aws_rds_instance
WHERE ca_certificate_identifier like 'rds-ca-2019'
{{< /code-block >}}

### List EBS snapshots in progress

{{< code-block lang="sql" disable_copy="false">}}
SELECT description,
  account_id,
  progress
FROM aws_ebs_snapshot
WHERE LOWER(state) != 'completed'
  and LOWER(state) != 'available'
{{< /code-block >}}

### List lambda functions with a specific outdated runtime (in this case python 2.7)

{{< code-block lang="sql" disable_copy="false">}}
SELECT *
FROM aws_lambda_function
WHERE runtime = 'python2.7'
LIMIT 100;
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

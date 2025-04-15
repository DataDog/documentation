---
aliases:
- /es/dashboards/guide/ddsql_use_cases
further_reading:
- link: ddsql_editor/
  tag: Documentation
  text: Más información sobre el editor DDSQL
title: Consultas y casos de uso habituales de DDSQL
---

## Consultas generales
### Enumerar todas las bibliotecas en los servicios en producción

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

### Enumerar los servicios que ejecutan una versión antigua del rastreador

{{< code-block lang="sql" disable_copy="false">}}
SELECT *
FROM service_config
WHERE client_library_version < '1.31.0';
{{< /code-block >}}

## AWS

### Enumerar las instancias de RDS que requieren rotación de certificados SSL/TLS

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

### Enumerar las snapshots de EBS en progreso

{{< code-block lang="sql" disable_copy="false">}}
SELECT description,
  account_id,
  progress
FROM aws_ebs_snapshot
WHERE LOWER(state) != 'completed'
  and LOWER(state) != 'available'
{{< /code-block >}}

### Enumerar funciones lambda con un tiempo de ejecución desactualizado específico (en este caso, Python 2.7)

{{< code-block lang="sql" disable_copy="false">}}
SELECT *
FROM aws_lambda_function
WHERE runtime = 'python2.7'
LIMIT 100;
{{< /code-block >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}
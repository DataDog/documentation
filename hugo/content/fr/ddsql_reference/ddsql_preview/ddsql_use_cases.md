---
aliases:
- /fr/dashboards/guide/ddsql_use_cases
- /fr/ddsql_editor/guide/ddsql_use_cases
further_reading:
- link: ddsql_editor/
  tag: Documentation
  text: En savoir plus sur le DDSQL Editor
private: true
title: DDSQL (Preview) - Requêtes courantes et cas d'utilisation
---

<div class="alert alert-danger">
  Il existe deux <strong>variantes</strong> différentes de DDSQL. Les exemples de ce guide utilisent la syntaxe DDSQL (Preview). Consultez la syntaxe documentée dans <a href="/ddsql_reference/">DDSQL Reference</a>.
</div>

## Requêtes générales
### Répertorier toutes les bibliothèques des services en production

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

### Répertorier les services exécutant une ancienne version du traceur

{{< code-block lang="sql" disable_copy="false">}}
SELECT *
FROM service_config
WHERE client_library_version < '1.31.0';
{{< /code-block >}}

## AWS

### Liste des instances RDS nécessitant une rotation du certificat SSL/TLS

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

### Répertorier les snapshots EBS en cours

{{< code-block lang="sql" disable_copy="false">}}
SELECT description,
  account_id,
  progress
FROM aws_ebs_snapshot
WHERE LOWER(state) != 'completed'
  and LOWER(state) != 'available'
{{< /code-block >}}

### Répertorier les fonctions lambda avec un runtime obsolète spécifique (dans ce cas, python 2.7)

{{< code-block lang="sql" disable_copy="false">}}
SELECT *
FROM aws_lambda_function
WHERE runtime = 'python2.7'
LIMIT 100;
{{< /code-block >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
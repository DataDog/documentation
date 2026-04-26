---
title: Grant the Agent Access to Postgres with Terraform
description: Create the Datadog user and required privileges for Database Monitoring with Terraform.
aliases:
  - /database_monitoring/setup_postgres/grant_agent_access_terraform
further_reading:
- link: "/database_monitoring/setup_postgres/selfhosted/"
  tag: "Documentation"
  text: "Set up Database Monitoring for self-hosted Postgres"
- link: "/database_monitoring/setup_postgres/rds/"
  tag: "Documentation"
  text: "Set up Database Monitoring for RDS"
- link: "/database_monitoring/setup_postgres/aurora/"
  tag: "Documentation"
  text: "Set up Database Monitoring for Aurora"
- link: "https://registry.terraform.io/providers/cyrilgdn/postgresql/latest/docs"
  tag: "External"
  text: "cyrilgdn/postgresql Terraform provider"
---

This page covers a Terraform-based alternative to running the SQL by hand. It creates the `datadog` user, grants the privileges Database Monitoring requires, and creates the `datadog` schema. The `datadog.explain_statement` function is installed with a single SQL statement after `terraform apply` because the provider does not express `SECURITY DEFINER` functions.

Use this approach if your team manages infrastructure with Terraform and you want the same configuration applied to one database or many.

## Before you begin

Supported PostgreSQL versions
: 10, 11, 12, 13, 14, 15, 16, 17, 18

Required tools
: Terraform 1.3 or later. `psql` (or any SQL client that can reach your database) for the explain plan function.

Required credentials
: A superuser, or a role with `CREATEROLE` and `CREATE` on the target database. Common choices:

| Hosting | User to use as `pg_superuser` |
|---|---|
| Self-hosted | `postgres` |
| AWS RDS or Aurora | the RDS master user |
| GCP Cloud SQL | `postgres` |
| Azure Database for PostgreSQL | the server admin |

What this page does not cover
: Provisioning the database. Installing the Datadog Agent. Configuring `postgresql.conf` settings such as `shared_preload_libraries` or `track_activity_query_size`. See the [self-hosted setup page][1] or the matching managed-cloud setup page for those steps.

## Step 1 - Create a Terraform workspace

Create a directory and add three files.

`main.tf`:

```hcl
terraform {
  required_version = ">= 1.3.0"

  required_providers {
    postgresql = {
      source  = "cyrilgdn/postgresql"
      version = ">= 1.22.0"
    }
  }
}

provider "postgresql" {
  host      = var.pg_host
  port      = var.pg_port
  database  = var.pg_database
  username  = var.pg_superuser
  password  = var.pg_superuser_password
  sslmode   = var.pg_sslmode
  superuser = false
}

resource "postgresql_role" "datadog" {
  name     = "datadog"
  login    = true
  password = var.datadog_password
}

resource "postgresql_grant_role" "pg_monitor" {
  role       = postgresql_role.datadog.name
  grant_role = "pg_monitor"
}

resource "postgresql_grant" "connect_database" {
  database    = var.pg_database
  role        = postgresql_role.datadog.name
  object_type = "database"
  privileges  = ["CONNECT"]
}

resource "postgresql_schema" "datadog" {
  name     = "datadog"
  database = var.pg_database
  owner    = postgresql_role.datadog.name

  depends_on = [postgresql_grant.connect_database]
}

resource "postgresql_grant" "usage_datadog_schema" {
  database    = var.pg_database
  role        = postgresql_role.datadog.name
  schema      = postgresql_schema.datadog.name
  object_type = "schema"
  privileges  = ["USAGE"]
}

resource "postgresql_grant" "usage_public_schema" {
  database    = var.pg_database
  role        = postgresql_role.datadog.name
  schema      = "public"
  object_type = "schema"
  privileges  = ["USAGE"]
}

variable "pg_host"               { type = string }
variable "pg_port"               { type = number; default = 5432 }
variable "pg_database"           { type = string }
variable "pg_superuser"          { type = string }
variable "pg_superuser_password" { type = string; sensitive = true }
variable "pg_sslmode"            { type = string; default = "require" }
variable "datadog_password"      { type = string; sensitive = true }

output "datadog_user"   { value = postgresql_role.datadog.name }
output "datadog_schema" { value = postgresql_schema.datadog.name }
```

`terraform.tfvars.example`:

```hcl
pg_host               = "my-db.example.com"
pg_port               = 5432
pg_database           = "appdb"
pg_superuser          = "postgres"
pg_superuser_password = "REPLACE_ME"
pg_sslmode            = "require"
datadog_password      = "REPLACE_ME"
```

Add a `.gitignore` that excludes secrets:

```text
terraform.tfvars
*.tfstate
*.tfstate.backup
.terraform/
```

## Step 2 - Set your variable values

Copy the example file and fill in the values for your database.

```bash
cp terraform.tfvars.example terraform.tfvars
```

Set `pg_sslmode` to `disable` only for local development. For RDS, Aurora, Cloud SQL, and Azure, keep it at `require` or higher.

To keep credentials out of source control, use environment variables instead of writing them to `terraform.tfvars`:

```bash
export TF_VAR_pg_superuser_password="..."
export TF_VAR_datadog_password="..."
```

Or read from a secret manager such as AWS Secrets Manager, HashiCorp Vault, or GCP Secret Manager. See the secret-manager data sources in your Terraform provider's documentation.

## Step 3 - Apply

```bash
terraform init
terraform apply
```

Review the plan. Six resources are created:

```text
postgresql_role.datadog
postgresql_grant_role.pg_monitor
postgresql_grant.connect_database
postgresql_schema.datadog
postgresql_grant.usage_datadog_schema
postgresql_grant.usage_public_schema
```

Type `yes` to confirm.

## Step 4 - Install the explain plan function

The Terraform provider does not express `SECURITY DEFINER` functions. Run the following SQL once, as the same superuser configured in `terraform.tfvars`:

```sql
CREATE OR REPLACE FUNCTION datadog.explain_statement(
  l_query TEXT,
  OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
  curs REFCURSOR;
  plan JSON;
BEGIN
  OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
  FETCH curs INTO plan;
  CLOSE curs;
  RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION datadog.explain_statement(TEXT) TO datadog;
```

Run it with `psql`:

```bash
PGPASSWORD='your-superuser-password' psql \
  -h <pg_host> -p <pg_port> -U <pg_superuser> -d <pg_database> \
  -f explain_statement.sql
```

Or paste it into a cloud-console SQL editor — RDS Query Editor, Cloud SQL Studio, or Azure Cloud Shell.

If you have multiple databases on the same server, run this SQL **in every database** that the Agent monitors. The same applies to the `datadog` schema and grants — the `postgresql_grant` resources need their own module call (or `for_each`) per database.

## Step 5 - Verify

Confirm that the `datadog` user can log in and read monitoring views:

```bash
PGPASSWORD='your-datadog-password' psql \
  -h <pg_host> -p <pg_port> -U datadog -d <pg_database> \
  -c "SELECT count(*) FROM pg_stat_database;"
```

Confirm that the `datadog` user can call `explain_statement`:

```bash
PGPASSWORD='your-datadog-password' psql \
  -h <pg_host> -p <pg_port> -U datadog -d <pg_database> \
  -c "SELECT datadog.explain_statement('SELECT 1');"
```

Both commands should return without errors. The second returns a JSON execution plan.

## Tear down

```bash
terraform destroy
```

This removes the role, schema, and grants. The database itself is not affected.

## Troubleshooting

`role "datadog" already exists`
: A previous manual setup left the role in place. Either drop it (`DROP OWNED BY datadog; DROP ROLE datadog;` as a superuser, with care) or import it into Terraform state with `terraform import postgresql_role.datadog datadog`.

`permission denied for schema datadog`
: The Terraform run used a role without `CREATE` on the target database. Switch to the superuser, or grant the role `CREATE` on the database.

SSL handshake errors against managed clouds
: Set `pg_sslmode` to `require`. For strict certificate validation, use `verify-full` and set the `PGSSLROOTCERT` environment variable to the cloud provider's CA bundle before running Terraform.

`pg_monitor` role not found
: Your Postgres server is older than version 10. Upgrade, or replace the `postgresql_grant_role.pg_monitor` block with explicit `SELECT` grants on `pg_stat_database`, `pg_stat_database_conflicts`, and related catalogs.

## Securely store your password
{{% dbm-secret %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/setup_postgres/selfhosted/#configure-postgres-settings

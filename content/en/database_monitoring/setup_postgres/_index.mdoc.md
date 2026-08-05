---
title: Setting up Postgres
description: Setting up Database Monitoring on a Postgres database
disable_sidebar: true
---

### Postgres versions supported

| Version      | Self-hosted | Amazon RDS | Amazon Aurora | Google Cloud SQL | Google AlloyDB | Azure     | Supabase  |
| ------------ | ----------- | ---------- | ------------- | ---------------- | -------------- | --------- | --------- |
| Postgres 9.6 | {% x/ %}   | {% x/ %}  | {% x/ %}     |                  |                | {% x/ %} |           |
| Postgres 10  | {% x/ %}   | {% x/ %}  | {% x/ %}     | {% x/ %}        |                | {% x/ %} |           |
| Postgres 11  | {% x/ %}   | {% x/ %}  | {% x/ %}     | {% x/ %}        |                | {% x/ %} |           |
| Postgres 12  | {% x/ %}   | {% x/ %}  | {% x/ %}     | {% x/ %}        |                | {% x/ %} |           |
| Postgres 13  | {% x/ %}   | {% x/ %}  | {% x/ %}     | {% x/ %}        |                | {% x/ %} |           |
| Postgres 14  | {% x/ %}   | {% x/ %}  | {% x/ %}     | {% x/ %}        | {% x/ %}      | {% x/ %} | {% x/ %} |
| Postgres 15  | {% x/ %}   | {% x/ %}  | {% x/ %}     | {% x/ %}        | {% x/ %}      | {% x/ %} | {% x/ %} |
| Postgres 16  | {% x/ %}   | {% x/ %}  | {% x/ %}     | {% x/ %}        | {% x/ %}      | {% x/ %} | {% x/ %} |
| Postgres 17  | {% x/ %}   | {% x/ %}  | {% x/ %}     | {% x/ %}        | {% x/ %}      |           | {% x/ %} |
| Postgres 18  | {% x/ %}   | {% x/ %}  | {% x/ %}     | {% x/ %}        | {% x/ %}      | {% x/ %} |           |

### Setup instructions by hosting type

To learn how to set up Database Monitoring on a Postgres database, select your hosting type:

{% card-grid card_width="200px" %}
  {% image-card href="/database_monitoring/setup_postgres/selfhosted" src="integrations_logos/postgres.png" alt="Selfhosted" title="Self-hosted" /%}
  {% image-card href="/database_monitoring/setup_postgres/rds" src="integrations_logos/amazon_rds.png" alt="RDS" /%}
  {% image-card href="/database_monitoring/setup_postgres/aurora" src="integrations_logos/aurora.png" alt="Aurora" /%}
  {% image-card href="/database_monitoring/setup_postgres/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" /%}
  {% image-card href="/database_monitoring/setup_postgres/alloydb" src="integrations_logos/google_cloud_alloydb.png" alt="Google Cloud SQL" image_width="100" /%}
  {% image-card href="/database_monitoring/setup_postgres/azure" src="integrations_logos/azure_db_for_postgresql.png" alt="PostgreSQL" /%}
  {% image-card href="/database_monitoring/setup_postgres/heroku" src="integrations_logos/heroku.png" alt="PostgreSQL" /%}
  {% image-card href="/database_monitoring/setup_postgres/supabase" src="integrations_logos/supabase.png" alt="Supabase" /%}
{% /card-grid %}

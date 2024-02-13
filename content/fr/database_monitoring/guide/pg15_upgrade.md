---
kind: guide
title: Mise à niveau vers PostgreSQL 15 et les versions ultérieures
---

Exécutez la commande suivante sur chaque host de base de données afin d'activer l'autorisation supplémentaire nécessaire pour l'utilisateur `datadog` :

```SQL
ALTER ROLE datadog INHERIT;
```

{{< tabs >}}
{{% tab "RDS" %}}
Il se peut que les versions de l'Agent antérieures à `7.49` ne puissent pas se connecter aux instances RDS PostgreSQL sans que leur configuration ne soit modifiée. Les nouvelles instances RDS Par défaut, le paramètre `rds.force_ssl` est défini sur `1` pour les nouvelles instances RDS. Pour les versions de l'Agent antérieures à `7.49`, cette valeur entraîne l'erreur suivante lors du traitement des requêtes par l'Agent :

```
FATAL:  no pg_hba.conf entry for host "HOSTNAME", user "datadog", database "postgres", no encryption
```

Pour autoriser l'Agent à se connecter via SSL, ajoutez le paramètre suivant à chaque configuration d'instance spécifiant le `host` et le `port` :

```yaml
ssl: allow
```

Redémarrez l'Agent après avoir appliqué cette modification.
{{% /tab %}}
{{% tab "Google Cloud SQL" %}}
Les versions de l'Agent antérieures à `7.50` peuvent tenter de se connecter à la base de données `cloudsqladmin`. Cela peut engendrer des logs d'erreur dans la base de données ainsi que des logs d'avertissement dans l'Agent. Pour ignorer ces logs, ajoutez `cloudsqladmin` à la liste [ignore_databases][1] :

```yaml
ignore_databases:
  - template%
  - rdsadmin
  - azure_maintenance
  - cloudsqladmin
```

Si vous utilisez la fonctionnalité [database_autodiscovery][2], ajoutez également `cloudsqladmin` aux [bases de données exclues][3] :

```yaml
  exclude:
   - cloudsqladmin
```
[1]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L56-L64
[2]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L250
[3]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L277-L279
{{% /tab %}}
{{< /tabs >}}
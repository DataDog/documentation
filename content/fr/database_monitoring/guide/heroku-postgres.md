---
further_reading:
- link: /agent/basic_agent_usage/heroku/
  tag: Documentation
  text: Buildpack Heroku Datadog

private: true
title: Configurer Heroku Postgres pour la solution Database Monitoring
---

Ce guide part du principe que vous avez configuré le [buildback Heroku Datadog][1] dans les dynos de votre application.

[La solution Database Monitoring de Datadog][2] vous permet de visualiser les métriques de requête et les plans d'explication de toutes vos bases de données depuis un seul et même endroit. Ce guide vous expliquera comment configurer Database Monitoring pour une [base de données gérée avec Heroku Postgres][3].

*Remarque* : seules les bases de données associées à un [abonnement Standard ou Premium][4] publient des métriques utilisées par l'intégration. Si vous utilisez une instance de Postgres avec un abonnement Hobby, toutes les fonctionnalités de Database Monitoring ne seront pas disponibles.

Commencez par créer un utilisateur `datadog` dans votre base de données :

```shell
# Vérifiez que vous êtes dans le répertoire racine de l'application
heroku pg:credentials:create --name datadog

# Associez le nouvel identifiant à l'application
heroku addons:attach <nom-basededonnées> --credential datadog
```

Le fait d'associer le nouvel identifiant à l'application permet de créer une nouvelle variable d'environnement dans votre application avec l'URL de connexion. Notez bien cette variable d'environnement, car vous en aurez besoin plus tard.

Connectez-vous à votre base de données Postgres à l'aide des identifiants par défaut, et accordez les autorisations adéquates à l'utilisateur `datadog` :

```shell
heroku pg:psql
```

Une fois dans le terminal psql, créez le schéma suivant :

```
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Créez la fonction suivante dans la base de données :

```
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
```

Enfin, il ne reste plus qu'à configurer l'Agent Datadog pour activer le check Postgres à l'aide des nouveaux identifiants :

```shell
# Vérifiez que vous êtes dans le répertoire racine de votre application

# Créez le dossier pour la configuration des intégrations dans le code de votre application
mkdir -p datadog/conf.d/
```

Créez un fichier de configuration intitulé `postgres.yaml` avec le contenu suivant (ne remplacez par les identifiants par les vôtres, car le script de pré-exécution s'en chargera) :

```yaml
init_config:

instances:
  - dbm: true
    host: <VOTRE HOSTNAME>
    port: <VOTRE PORT>
    username: <VOTRE NOM D'UTILISATEUR>
    password: <VOTRE MOT DE PASSE>
    dbname: <NOM DE VOTRE BDD>
    ssl: True
```

À l'aide de la variable d'environnement créée lorsque vous avez associé l'identifiant `datadog` à l'application (dans l'exemple ci-dessous, il s'agit de `HEROKU_POSTGRESQL_PINK_URL`), ajoutez le contenu suivant au [script de pré-exécution][5] pour remplacer ces valeurs avant de lancer l'Agent Datadog :

```bash
#!/usr/bin/env bash

# Mettre à jour la configuration Postgres ci-dessus à l'aide des variables d'environnement de l'application Heroku
if [ -n "$HEROKU_POSTGRESQL_PINK_URL" ]; then
  POSTGREGEX='^postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)$'
  if [[ $HEROKU_POSTGRESQL_PINK_URL =~ $POSTGREGEX ]]; then
    sed -i "s/<VOTRE HOSTNAME>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<VOTRE NOM D'UTILISATEUR>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<VOTRE MOT DE PASSE>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<VOTRE PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<NOM DE VOTRE BDD>/${BASH_REMATCH[5]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
  fi
fi
```

Effectuez le déploiement sur Heroku :

```shell
# Déployer sur Heroku
git add .
git commit -m "Activation de l'intégration postgres"
git push heroku main
```

[1]: /fr/agent/basic_agent_usage/heroku/
[2]: https://www.datadoghq.com/product/database-monitoring/
[3]: https://devcenter.heroku.com/articles/heroku-postgresql
[4]: https://devcenter.heroku.com/articles/heroku-postgres-plans
[5]: /fr/agent/basic_agent_usage/heroku/#prerun-script
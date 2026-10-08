---
description: Développez et testez des modifications sur une base de données Postgres
  éphémère, similaire à la production, construite à partir du schéma et des statistiques
  collectés par Database Monitoring.
further_reading:
- link: /database_monitoring/
  tag: Documentation
  text: Database Monitoring
- link: /database_monitoring/schema_explorer/
  tag: Documentation
  text: Schema Explorer
- link: /database_monitoring/recommendations/
  tag: Documentation
  text: Recommandations
- link: /mcp_server/
  tag: Documentation
  text: Datadog MCP Server
title: Database Monitoring Workbench
---
{{< callout url="https://app.datadoghq.com/forms/share/45a8d961134a872c7118d345cff413cfd3d88bc1f1558f76bb5067a85ae43118" btn_hidden="false" header="Rejoignez la Preview !" >}}
Database Monitoring Workbench est en préversion. Utilisez ce formulaire pour demander l'accès.
{{< /callout >}}

## Présentation {#overview}

Database Monitoring Workbench est une base de données Postgres éphémère, similaire à la production, que vous pouvez utiliser pour développer et tester des modifications. Elle est construite à partir du schéma et des statistiques collectés par Database Monitoring, elle correspond donc à la structure de vos tables de production, de vos index, du nombre de lignes et de la version majeure. Datadog ne copie ni ne transmet jamais les données de vos tables. Workbench est automatiquement rempli avec des données synthétiques générées à partir des statistiques de colonnes et de tables collectées par Database Monitoring. Si vous préférez, vous pouvez le remplir manuellement avec vos propres données.

Cette page explique comment :

- Se connecter à une instance Workbench avec MCP, l'API ou un client SQL
- Comparer les plans de requête et tester les modifications d'index et de migration
- Détecter les régressions de plan dans l'intégration continue (CI)
- Expérimenter des modifications de modèle de données

## Prérequis {#requirements}

- Une base de données Postgres surveillée par [Database Monitoring][5].
- [Collecte de schéma][1] activée pour la base de données logique spécifique, et pas seulement pour l'instance.
- L'autorisation **Database Monitoring Read**. Consultez [Contrôle d'accès basé sur les rôles][6] pour savoir comment gérer les autorisations.
- Workbench activé pour votre organisation. Pour demander l'accès, utilisez le formulaire de prévisualisation en haut de cette page.

## Connectez-vous à Workbench {#connect-to-workbench}

### Connexion au serveur MCP {#connecting-with-the-mcp-server}

Utilisez le [Datadog MCP Server][2] pour créer et gérer des instances Workbench à partir d'un agent. Pour l'ajouter à votre agent, consultez [Configurer Datadog MCP Server][7]. Le serveur MCP expose Workbench sous la forme de trois outils :

<table style="width: 100%;">
  <thead>
    <tr>
      <th style="width: 50%;">Outil</th>
      <th style="width: 50%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>create_datadog_database_workbench</code></td>
      <td>Crée un bac à sable à partir d'une base de données surveillée et attend qu'il soit prêt.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>get_datadog_database_workbench</code></td>
      <td>Vérifie si un bac à sable est prêt.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>delete_datadog_database_workbench</code></td>
      <td>Supprime un bac à sable, révoque sa chaîne de connexion et libère ses ressources de calcul.</td>
    </tr>
  </tbody>
</table>

Une fois que l'agent a créé une instance, il peut lire votre schéma, exécuter des instructions, lire des plans de requête, ajouter un index et relire le plan. Il fonctionne avec votre schéma, vos index et vos nombres de lignes réels.

{{< img src="database_monitoring/database_monitoring_workbench/workbench_mcp_index_demo.mp4" alt="Un agent de codage crée un bac à sable Workbench via le Datadog MCP Server, charge les nombres de lignes de production, ajoute un index qui transforme un scan séquentiel en scan d'index, et supprime le bac à sable." video="true" >}}

### Connexion avec l'API {#connecting-with-the-api}

Utilisez l'API Workbench pour créer une instance Workbench à partir d'un script ou d'un job CI.

Pour créer une instance, envoyez une requête `POST` qui nomme la base de données surveillée :

```shell
curl -X POST "{{< region-param key="dd_api" >}}/api/unstable/databases/workbench/session" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "database_instance": "orders-db-primary",
    "database_name": "shop"
  }'
```

La clé d'application doit appartenir à un utilisateur ou à un compte de service disposant de l'autorisation **Database Monitoring Read**. Si Workbench n'est pas activé pour votre organisation, l'API renvoie `403`.

| Paramètre | Description |
| --------- | ----------- |
| <code style="white-space: nowrap;">database_instance</code> | Le nom de l'instance dans Database Monitoring. |
| <code style="white-space: nowrap;">database_name</code> | Le nom de la base de données logique à l'intérieur de `database_instance`. |
| <code style="white-space: nowrap;">populate</code> | Définissez sur `false` pour créer l'instance sans données générées. Pour charger vos propres données, consultez [Connexion avec un client SQL](#connecting-with-a-sql-client). |

La requête renvoie `202 Accepted` avec l'ID de l'instance, son statut et une chaîne de connexion Postgres :

{{< code-block lang="json" >}}
{
  "id": "workbench-123",
  "status": "pending",
  "connection": {
    "dsn": "postgres://workbench:<TOKEN>@<WORKBENCH_HOST>:5432/bench?sslmode=require"
  }
}
{{< /code-block >}}

La création d'une instance est asynchrone. Pour vérifier la disponibilité, envoyez `GET /api/unstable/databases/workbench/session/{id}` jusqu'à ce que `status` soit `ready`. La réponse inclut également `expires_at`.

Les instances expirent après le nombre de secondes défini dans `ttl_seconds`, qui est de 1 800 secondes (30 minutes) par défaut. Vous ne pouvez pas définir le TTL dans la requête.

Pour supprimer une instance, envoyez `DELETE /api/unstable/databases/workbench/session/{id}`. Une requête réussie renvoie `204`.

<div class="alert alert-danger">La chaîne de connexion est une information d'identification de base de données active. Traitez-la comme un secret : ne la validez pas, ne la consignez pas et ne la collez pas dans un canal partagé. Supprimez l'instance une fois terminé. L'expiration ou la suppression ferme les connexions et supprime toutes les données.</div>

### Connexion avec un client SQL {#connecting-with-a-sql-client}

Utilisez la chaîne de connexion du serveur MCP ou de l'API avec n'importe quel client Postgres, tel que `psql`, une interface graphique ou le banc d'essai de votre ORM.
{{< code-block lang="shell" >}}
psql "postgres://workbench:<TOKEN>@<WORKBENCH_HOST>:5432/bench?sslmode=require"
{{< /code-block >}}

L'instance est accessible en écriture, vous pouvez donc créer un index, relancer `EXPLAIN` et comparer les plans. Pour des exemples, consultez [Comment utiliser Workbench](#how-to-use-workbench). Lorsque l'instance expire ou que vous la supprimez, les connexions ouvertes se ferment et les requêtes en cours peuvent échouer.

Par défaut, Workbench remplit l'instance avec des données synthétiques. Pour utiliser vos propres données à la place, créez l'instance avec `"populate": false` dans la requête API. Chargez ensuite vos données avec `INSERT`, `COPY FROM STDIN` ou la commande `psql` `\copy`, puis exécutez `ANALYZE`. Les ressources de l'instance et le TTL limitent la quantité de données que vous pouvez charger.

## Comment utiliser Workbench {#how-to-use-workbench}

Créez une instance avec le [serveur MCP](#connecting-with-the-mcp-server) ou l'[API](#connecting-with-the-api), et connectez-vous à celle-ci avec un [client SQL](#connecting-with-a-sql-client). Utilisez-la ensuite pour les tâches de cette section.

### Comparer les plans de requête avant et après une modification {#compare-query-plans-before-and-after-a-change}

Vérifiez le plan d'une requête lorsque vous l'écrivez, avant d'ouvrir une demande de tirage. Vous pouvez également utiliser ces étapes pour tester une réécriture après avoir trouvé une requête lente dans Database Monitoring. Créez l'instance pour la base de données sur laquelle la requête a été exécutée.

Exécutez `EXPLAIN` sur l'instance et lisez le plan par rapport à des nombres de lignes et des cardinalités similaires à ceux de la production :

{{< code-block lang="sql" >}}
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders
WHERE customer_id = 42 AND created_at > '2026-01-01'
ORDER BY created_at DESC;
{{< /code-block >}}

Si le plan affiche `Sort -> Seq Scan on orders`, la requête scanne la table entière. Ajoutez l'index composite dans l'instance, replanifiez et confirmez que le plan passe à un scan d'index :

{{< code-block lang="sql" >}}
CREATE INDEX idx_orders_customer_created ON orders (customer_id, created_at DESC);
{{< /code-block >}}

Ensuite, déployez l'index avec la requête. Pour une requête lente, comparez les plans avant et après votre réécriture, et apportez le résultat à la demande de tirage. Vous pouvez tester des réécritures sans toucher à la production ni demander l'accès à ses données.

### Vérifiez quelles requêtes dépendent d'un index {#check-which-queries-depend-on-an-index}

Supprimer un index inutilisé permet d'économiser du débit d'écriture et du stockage, mais en supprimer un dont dépend une requête peut provoquer un incident. Testez d'abord la suppression dans une instance. La suppression d'un index à cet endroit n'affecte pas la production.

1. Obtenez vos principales requêtes à partir de [métriques de requête][3].
2. Exécutez `EXPLAIN` sur chaque requête et enregistrez le plan.
3. Supprimez l'index dans l'instance.
4. Exécutez `EXPLAIN` à nouveau sur chaque requête et comparez les plans.

{{< code-block lang="sql" >}}
EXPLAIN SELECT id, total FROM orders WHERE status = 'pending' ORDER BY created_at;
--  Index Scan using idx_orders_status on orders  (cost=0.42..88.20 rows=312 width=20)

DROP INDEX idx_orders_status;

EXPLAIN SELECT id, total FROM orders WHERE status = 'pending' ORDER BY created_at;
--  Seq Scan on orders  (cost=0.00..14200.00 rows=312 width=20)
{{< /code-block >}}

Une requête dont le plan revient à un scan séquentiel dépend de l'index. Apportez ces plans à votre examen au lieu de vous fier à des hypothèses subjectives et non testées. Pour tester un nouvel index à la place, créez-le dans l'instance et replanifiez vos requêtes.

### Testez une migration avant de la déployer {#test-a-migration-before-you-deploy-it}

Les problèmes de migration dépendent souvent de la taille de la table et du trafic simultané ; une base de données de test locale peut donc les manquer. Exemple :

- Un `CREATE INDEX` qui aurait dû être `CREATE INDEX CONCURRENTLY`, et maintient un verrou en écriture pendant toute la durée de la construction.
- Un `ALTER` qui prend un verrou plus fort que prévu sur une table qui n'est jamais inactive.

Pour tester une migration, exécutez-la sur l'instance avec votre outil de migration, en utilisant la chaîne de connexion de l'instance. Pendant l'exécution du DDL, interrogez `pg_locks` pour voir quels verrous il prend. Ensuite, replanifiez vos requêtes importantes pour voir comment le nouveau schéma les affecte.

Une migration de test prend moins de temps qu'en production, mais produit le même résultat structurel.

### Détectez les régressions de plan en CI {#catch-plan-regressions-in-ci}

Utilisez l'[API](#connecting-with-the-api) pour ajouter un check de plan à votre pipeline. Pour chaque demande de tirage (pull request) qui touche au SQL ou au schéma :

1. Créez une instance.
2. Interrogez jusqu'à ce que le statut soit `ready`.
3. Préparez les données.
4. Si vous comparez les plans avant et après le changement, capturez les plans de référence avec `EXPLAIN`.
5. Appliquez le changement.
6. Exécutez `EXPLAIN` sur vos principales requêtes.
7. Faites échouer la build si un plan enfreint l'un de vos invariants.
8. Supprimez l'instance, même si une étape précédente échoue.

Exemples d'invariants :

- Aucun nouveau scan séquentiel sur une grande table.
- Aucun changement de forme de plan sur une requête dans votre chemin critique.
- Aucun index supprimé qui est encore utilisé.

Le script suivant exécute ce flux dans un job CI. Il nécessite `curl`, `jq` et `psql`, ainsi que ces variables d'environnement :

- `DD_API_KEY` et `DD_APP_KEY` : votre clé d'API Datadog et votre clé d'application.
- `DD_SITE` : votre site Datadog, tel que `datadoghq.com` ou `us3.datadoghq.com`. La valeur par défaut est `datadoghq.com`.
- `DB_INSTANCE` et `DB_NAME` : le `database_instance` et le `database_name` à partir desquels créer l'instance.

```shell
#!/usr/bin/env bash
set -euo pipefail
API="https://api.${DD_SITE:-datadoghq.com}/api/unstable/databases/workbench/session"
AUTH=(-H "DD-API-KEY: ${DD_API_KEY}" -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" -H "Content-Type: application/json")

# Create (returns 202 with id + connection.dsn)
resp=$(curl -sf -X POST "$API" "${AUTH[@]}" \
  -d "{\"database_instance\":\"${DB_INSTANCE}\",\"database_name\":\"${DB_NAME}\"}")
id=$(jq -r .id <<<"$resp")
dsn=$(jq -r .connection.dsn <<<"$resp")
trap 'curl -sf -X DELETE "$API/$id" "${AUTH[@]}" >/dev/null || true' EXIT  # always delete

# Wait for ready
for _ in $(seq 60); do
  status=$(curl -sf "$API/$id" "${AUTH[@]}" | jq -r .status)
  [ "$status" = ready ] && break; sleep 5
done
[ "$status" = ready ] || { echo "Workbench not ready: $status"; exit 1; }

# Apply the change, then EXPLAIN top queries
psql "$dsn" -v ON_ERROR_STOP=1 -f migrations/change.sql
psql "$dsn" -v ON_ERROR_STOP=1 -f ci/explain_top_queries.sql > plans.txt

# Fail on a broken invariant (example)
if grep -q "Seq Scan on orders" plans.txt; then echo "Plan regression"; exit 1; fi
```

Dans cet exemple, `migrations/change.sql` contient votre modification, et `ci/explain_top_queries.sql` contient une instruction `EXPLAIN` pour chacune de vos requêtes principales. Le dernier check fait échouer le job si un plan inclut un scan séquentiel sur `orders`. Remplacez-les par vos propres invariants.

### Expérimentez avec des changements de modèle de données {#experiment-with-data-model-changes}

Modifier un modèle de données est l'une des opérations les plus risquées que vous puissiez effectuer sur une base de données. Diviser une table, changer le type d'une colonne ou ajouter une clé étrangère peut provoquer des erreurs dans les requêtes, bloquer les opérations de lecture et d'écriture, ou échouer avec des données de production. La plupart de ces changements sont difficiles à annuler.

Une instance Workbench vous donne votre schéma réel sur lequel expérimenter. Testez la modification, exécutez-y vos jointures et requêtes, suivez les clés étrangères, et identifiez les tables volumineuses et celles qui servent de table de correspondance. Si quelque chose ne fonctionne pas, supprimez l'instance et créez-en une nouvelle.

Avec les données synthétiques par défaut, aucun examen de confidentialité n'est requis, car Workbench ne contient aucune de vos données clients.

## Limitations {#limitations}

Workbench répond aux questions sur le schéma, les plans de requête et le coût relatif. Il ne reproduit pas le matériel de production, les données ou chaque objet de schéma.

- **Seul Postgres est pris en charge.** Workbench prend en charge Postgres 12 à 18. Les autres moteurs de base de données ne sont pas pris en charge.
- **Les temps peuvent varier.** Les instances sont petites et ne sont pas dimensionnées comme votre matériel de production. Comparez la forme du plan, les estimations de lignes, l'utilisation des index et les résultats avant/après, et non les temps absolus tels que « cette requête prend 40ms ». Pour effectuer un benchmark d'une réécriture ou d'un index, utilisez [Bits Database Optimization][4].
- **Les données générées sont approximatives.** Par défaut, Workbench génère des lignes à partir des statistiques collectées, de sorte que la taille des tables est proche de celle de la production. L'asymétrie, la corrélation des colonnes et la distribution des valeurs peuvent différer, ce qui peut modifier les plans qui en dépendent. Remplir Workbench avec vos propres données permet d'éviter cela.
- **Certains index et clés étrangères peuvent être manquants.** Workbench peut ignorer un index ou une clé étrangère, ou supprimer une expression qui appelle une fonction indisponible.
- **Les vues, fonctions, déclencheurs, rôles et privilèges ne sont pas reconstruits.** Les modifications qui en dépendent ne sont pas reproduites avec précision.
- **Les instances sont temporaires.** Les instances expirent après 30 minutes par défaut, donc recréez celles que vous devez conserver. Les schémas dépassant un certain nombre de tables ne sont pas entièrement matérialisés.

Utilisez Workbench pour vérifier la structure, les plans de requête et les effets d'ordre de grandeur. Cela ne couvre pas les autres effets.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/database_monitoring/schema_explorer/
[2]: /fr/mcp_server/
[3]: /fr/database_monitoring/query_metrics/
[4]: /fr/database_monitoring/bits_database_optimization/
[5]: /fr/database_monitoring/
[6]: /fr/account_management/rbac/permissions/
[7]: /fr/mcp_server/setup/
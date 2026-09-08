---
description: Créez des barrières et des règles dans Datadog à l'avance, puis faites-y
  référence par service et par environnement au moment du déploiement.
further_reading:
- link: /deployment_gates/setup/jit
  tag: Documentation
  text: Configurez des barrières de déploiement Just-In-Time (JIT)
- link: /deployment_gates/explore
  tag: Documentation
  text: En savoir plus sur l'explorer de portes de déploiement
- link: /api/latest/deployment-gates
  tag: Référence API
  text: Référence de l'API des portes de déploiement
title: Configurez des barrières de déploiement préconfigurées
---
{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Les portes de déploiement sont en préversion. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

Avec les barrières de déploiement **préconfigurées**, les barrières et les règles sont conservées dans Datadog et référencées par service et par environnement au moment de l'évaluation. Les barrières préconfigurées sont adaptées lorsque vous souhaitez partager des règles entre plusieurs déploiements, gérer la configuration dans Terraform ou permettre à des utilisateurs n'utilisant pas la CI de modifier les règles dans l'interface utilisateur Datadog.

Vous cherchez à définir des règles en ligne dans votre configuration de déploiement ? Consultez [Barrières de déploiement Just-In-Time (JIT)][5].

## Créer une barrière {#create-a-gate}

<div class="alert alert-info">En plus d'utiliser l'interface utilisateur des barrières de déploiement, vous pouvez gérer les barrières et les règles par programmation avec l'<a href="https://docs.datadoghq.com/api/latest/deployment-gates">API des barrières de déploiement</a> ou le <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/deployment_gate">fournisseur Terraform Datadog</a>.</div>

1. Accédez à [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Deployment Gates{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}}][6].
2. Cliquez sur {{< ui >}}Create Gate{{< /ui >}}.
3. Configurez les paramètres suivants :
   - {{< ui >}}Service{{< /ui >}} : Le nom du service (exemple : `transaction-backend`).
   - {{< ui >}}Environment{{< /ui >}} : L'environnement cible (exemple : `dev`).
   - {{< ui >}}Identifier{{< /ui >}} (facultatif, la valeur par défaut est `default`) : Nom unique pour plusieurs barrières sur le même service/environnement. Utilisez ceci pour :
     - Autoriser différentes stratégies de déploiement (exemple : `fast-deploy` vs `default`)
     - Distinguer les phases de déploiement (exemple : `pre-deploy` vs `post-deploy`)
     - Définir des phases de Canary (exemple : `pre-deploy` vs `canary-20pct`)
   - {{< ui >}}Evaluation Mode{{< /ui >}} : Activez {{< ui >}}Dry Run{{< /ui >}} pour tester le comportement de la barrière sans impacter les déploiements. L'évaluation d'une barrière en mode Dry Run répond toujours par un statut de réussite, mais le résultat dans l'application reflète l'évaluation réelle. Ceci est utile lors de l'exécution d'une évaluation initiale du comportement de la barrière sans impacter le pipeline de déploiement.

## Ajouter des règles à une barrière {#add-rules-to-a-gate}

Chaque barrière nécessite une ou plusieurs règles pour être évaluée. Toutes les règles doivent réussir pour que la barrière réussisse. Pour chaque règle, spécifiez :

1. {{< ui >}}Name{{< /ui >}} : Une étiquette descriptive qui apparaît sur la page [Évaluations des barrières de déploiement][7] (par exemple, `Check all P0 monitors`).
2. {{< ui >}}Type{{< /ui >}} : Sélectionnez {{< ui >}}Monitor{{< /ui >}} ou {{< ui >}}Faulty Deployment Detection{{< /ui >}}.
3. Paramètres supplémentaires basés sur le type de règle sélectionné. Consultez [Types de règles](#rule-types) pour connaître les options disponibles.
4. {{< ui >}}Evaluation Mode{{< /ui >}}: Lorsqu'une règle est définie comme {{< ui >}}Dry Run{{< /ui >}}, son résultat n'est pas pris en compte lors du calcul du résultat global de la porte.

## Types de règles {#rule-types}

Pour le schéma complet et toutes les options disponibles, consultez la [référence de l'API des portes de déploiement][4].

{{< tabs >}}
{{% tab "Monitor" %}}
La règle Monitor évalue l'état d'un ensemble de monitors sur une période configurable. Elle échoue si, à tout moment pendant la période d'évaluation :

- Aucun monitor ne correspond à la requête.
- Plus de 50 monitors correspondent à la requête.
- Tout monitor correspondant est dans l'état `ALERT` ou `NO_DATA`.

##### Paramètres de configuration {#configuration-settings}

- {{< ui >}}Search Query{{< /ui >}}: La requête utilisée pour trouver les monitors à évaluer, basée sur la [syntaxe de recherche de monitor][1]. Filtrer sur les tags de monitor :
  - Tags statiques de monitor : `service:transaction-backend`
  - Tags dans la requête du monitor : `scope:"service:transaction-backend"`
  - Tags dans un [regroupement de monitors][2] : `group:"service:transaction-backend"`
- {{< ui >}}Duration{{< /ui >}}: La période de temps (en secondes) pendant laquelle les monitors correspondants sont évalués. La valeur par défaut est 0 (les monitors sont évalués instantanément). Le maximum est de 7200 secondes (2 heures).

##### Exemples de requêtes {#example-queries}

- `env:prod service:transaction-backend`
- `env:prod (service:transaction-backend OR group:"service:transaction-backend" OR scope:"service:transaction-backend")`
- `tag:"use_deployment_gates" team:payment`
- `tag:"use_deployment_gates" AND (NOT group:("team:frontend"))`

**Remarques** :
- `group`Les filtres évaluent uniquement les groupes correspondants.
- Les monitors mis en sourdine sont automatiquement exclus de l'évaluation (la requête inclut toujours `muted:false`).

[1]: /fr/monitors/manage/search/
[2]: /fr/monitors/manage/#triggered-monitors
{{% /tab %}}
{{% tab "Détection de déploiement défectueux APM" %}}
Ce type de règle utilise l'analyse [Détection de déploiement défectueux APM][1] de Watchdog pour comparer la version déployée aux versions précédentes du même service. L'analyse détecte :

- De nouveaux types d'erreurs.
- Des augmentations significatives des taux d'erreur par rapport aux versions précédentes.

L'analyse est effectuée automatiquement pour tous les services instrumentés par APM, et aucune configuration préalable n'est requise.

##### Paramètres de configuration {#configuration-settings-1}

- {{< ui >}}Operation Name{{< /ui >}}: Rempli automatiquement à partir des paramètres de [l'opération principale APM][3] du service.
- {{< ui >}}Duration{{< /ui >}}: La période de temps (en secondes) pendant laquelle l'analyse s'exécute. Pour une confiance optimale dans l'analyse, cette valeur doit être d'au moins 900 secondes (15 minutes) après le début d'un déploiement. Le maximum est de 7200 secondes (2 heures).
- {{< ui >}}Allowed Resources{{< /ui >}} (facultatif) : Une liste séparée par des virgules de [ressources APM][2] à inclure dans l'analyse. Lorsqu'elles sont spécifiées, seules les ressources listées sont analysées. Mutuellement exclusif avec {{< ui >}}Excluded Resources{{< /ui >}}.
- {{< ui >}}Excluded Resources{{< /ui >}} (facultatif) : Une liste séparée par des virgules de [ressources APM][2] à ignorer (telles que les points de terminaison à faible volume ou à faible priorité). Mutuellement exclusif avec {{< ui >}}Allowed Resources{{< /ui >}}.

**Remarques** :
- La règle est évaluée pour chaque valeur de [tag principal supplémentaire][4] ainsi que pour une analyse globale. Pour ne prendre en compte qu'un seul tag principal, spécifiez-le lors de la [demande d'évaluation de la porte](#evaluate-a-gate-from-your-pipeline).
- De nouvelles erreurs et des augmentations du taux d'erreur sont détectées au niveau de la ressource.
- Ce type de règle ne prend pas en charge les services marqués comme `database` ou `inferred service`.

[1]: /fr/watchdog/faulty_deployment_detection/
[2]: /fr/tracing/services/resource_page/
[3]: /fr/tracing/guide/configuring-primary-operation/#primary-operations
[4]: /fr/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
{{% /tab %}}
{{< /tabs >}}

## Évaluez une porte depuis votre pipeline {#evaluate-a-gate-from-your-pipeline}

Une fois la porte configurée, demandez une évaluation lors du déploiement du service associé et décidez de bloquer ou de poursuivre le déploiement en fonction du résultat.

{{< tabs >}}
{{% tab "Interface de ligne de commande datadog-ci" %}}
La commande [datadog-ci][1] `deployment gate` exécute l'évaluation en une seule commande :

```bash
datadog-ci deployment gate --service transaction-backend --env staging --identifier default
```

Si la porte de déploiement contient des règles de détection de déploiement défectueux APM, spécifiez également la version (par exemple, `--version 1.0.1`).

La commande :

- Envoie une requête pour démarrer l'évaluation de la porte et bloque jusqu'à ce que l'évaluation soit terminée.
- Fournit un délai d'expiration configurable pour la durée d'attente d'une évaluation.
- Dispose de tentatives automatiques intégrées en cas d'erreurs.
- Accepte `--fail-on-error` pour personnaliser le comportement en cas d'erreurs Datadog inattendues.

La commande `deployment gate` est disponible dans les versions v3.17.0 et ultérieures de datadog-ci.

**Variables d'environnement requises** :

- `DD_API_KEY` : Votre [clé d'API][2].
- `DD_APP_KEY` : Votre [clé d'application][3].
- `DD_BETA_COMMANDS_ENABLED=1`: La commande `deployment gate` est une commande bêta.

Pour obtenir des options de configuration complètes et des exemples d'utilisation, consultez la [`deployment gate` documentation de la commande][4].

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate

{{% /tab %}}
{{% tab "Argo Rollouts" %}}
Appelez les Deployment Gates depuis une ressource Kubernetes Argo Rollouts en créant un [AnalysisTemplate][1] ou un [ClusterAnalysisTemplate][1]. Le modèle exécute la [commande de porte de déploiement datadog-ci][7] pour interagir avec l'API Deployment Gates.

Utilisez le modèle ci-dessous comme point de départ :

- Remplacez `<YOUR_DD_SITE>` par votre [nom de site Datadog][2] (par exemple, {{< region-param key="dd_site" code="true" >}}).
- Définissez la [clé d'API][5] et la [clé d'application][6] en tant que variables d'environnement. L'exemple utilise un [Secret Kubernetes][3] nommé `datadog` avec deux valeurs de données : `api-key` et `app-key`. Vous pouvez également transmettre les valeurs en texte brut avec `value` au lieu de `valueFrom`.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ClusterAnalysisTemplate
metadata:
  name: datadog-job-analysis
spec:
  args:
    - name: service
    - name: env
  metrics:
    - name: datadog-job
      provider:
        job:
          spec:
            ttlSecondsAfterFinished: 300
            backoffLimit: 0
            template:
              spec:
                restartPolicy: Never
                containers:
                  - name: datadog-check
                    image: datadog/ci:v3.17.0
                    env:
                      - name: DD_BETA_COMMANDS_ENABLED
                        value: "1"
                      - name: DD_SITE
                        value: "<YOUR_DD_SITE>"
                      - name: DD_API_KEY
                        valueFrom:
                          secretKeyRef:
                            name: datadog
                            key: api-key
                      - name: DD_APP_KEY
                        valueFrom:
                          secretKeyRef:
                            name: datadog
                            key: app-key
                    command: ["/bin/sh", "-c"]
                    args:
                      - datadog-ci deployment gate --service {{ args.service }} --env {{ args.env }} --identifier default
```

- Le modèle d'analyse peut recevoir des arguments de la ressource Rollout (tels que `service`, `env` et `version`). Pour plus d'informations, consultez la [documentation officielle d'Argo Rollouts][4].
- `ttlSecondsAfterFinished` supprime les jobs terminés après 5 minutes.
- `backoffLimit` est défini sur 0 car le job ne doit pas être relancé si l'évaluation de la porte échoue.

Après avoir créé le modèle d'analyse, référencez-le depuis la stratégie Argo Rollouts :

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: rollouts-demo
  labels:
    tags.datadoghq.com/service: transaction-backend
    tags.datadoghq.com/env: dev
spec:
  replicas: 5
  strategy:
    canary:
      steps:
        ...
        - analysis:
            templates:
              - templateName: datadog-job-analysis
                clusterScope: true # Only needed for cluster analysis
            args:
              - name: env
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.labels['tags.datadoghq.com/env']
              - name: service
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.labels['tags.datadoghq.com/service']
              - name: version #Required for APM Faulty Deployment Detection rules
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.labels['tags.datadoghq.com/version']
        - ...
```

[1]: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#analysis-progressive-delivery
[2]: /fr/getting_started/site/
[3]: https://kubernetes.io/docs/concepts/configuration/secret/
[4]: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#analysis-template-arguments
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/organization-settings/application-keys
[7]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate

{{% /tab %}}
{{% tab "GitHub Actions" %}}
L'[action GitHub Datadog Deployment Gate][4] exécute l'évaluation dans le cadre d'un workflow.

Ajoutez une étape `DataDog/deployment-gate-github-action` à votre workflow de déploiement existant :

```yaml
name: Deploy with Datadog Deployment Gate
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy Canary
        run: |
          echo "Deploying canary release for service:'my-service' in 'production'. Version 1.0.1"
          # Your deployment commands here

      - name: Evaluate Deployment Gate
        uses: DataDog/deployment-gate-github-action@v2.1.0
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
        with:
          service: my-service
          env: production
          identifier: default

      - name: Deploy
        run: |
          echo "Deployment Gate passed, proceeding with deployment"
          # Your deployment commands here
```

Si la porte de déploiement contient des règles de détection de déploiement défectueux APM, spécifiez également la version (par exemple, `version: 1.0.1`).

L'action :

- Envoie une requête pour démarrer l'évaluation de la porte et bloque jusqu'à ce que l'évaluation soit terminée.
- Fournit un délai d'expiration configurable pour la durée d'attente d'une évaluation.
- Dispose de tentatives automatiques intégrées en cas d'erreurs.
- Accepte `fail-on-error` pour personnaliser le comportement en cas d'erreurs Datadog inattendues.

**Variables d'environnement requises** :

- `DD_API_KEY` : Votre [clé d'API][2].
- `DD_APP_KEY` : Votre [clé d'application][3].

Pour des options de configuration complètes et des exemples d'utilisation, consultez le [`DataDog/deployment-gate-github-action` dépôt][4].

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/deployment-gate-github-action

{{% /tab %}}
{{% tab "Script générique" %}}

Utilisez ce script comme point de départ. Il évalue une porte préconfigurée sans règles en ligne.

Remplacez ce qui suit :

- `<YOUR_DD_SITE>` : Votre [nom du site Datadog][1] (par exemple, {{< region-param key="dd_site" code="true" >}})
- `<YOUR_API_KEY>` : Votre [clé d'API][2]
- `<YOUR_APP_KEY>` : Votre [clé d'application][3]

```bash
#!/bin/sh

# Configuration
MAX_RETRIES=3
DELAY_SECONDS=5
POLL_INTERVAL_SECONDS=15
MAX_POLL_TIME_SECONDS=10800 # 3 hours
API_URL="https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation"
API_KEY="<YOUR_API_KEY>"
APP_KEY="<YOUR_APP_KEY>"

PAYLOAD=$(cat <<EOF
{
  "data": {
    "type": "deployment_gates_evaluation_request",
    "attributes": {
      "service": "$1",
      "env": "$2",
      "version": "$3"
    }
  }
}
EOF
)

# Step 1: Request evaluation
echo "Requesting evaluation..."
current_attempt=0
while [ $current_attempt -lt $MAX_RETRIES ]; do
   current_attempt=$((current_attempt + 1))
   RESPONSE=$(curl -s -w "%{http_code}" -o response.txt -X POST "$API_URL" \
       -H "Content-Type: application/json" \
       -H "DD-API-KEY: $API_KEY" \
       -H "DD-APPLICATION-KEY: $APP_KEY" \
       -d "$PAYLOAD")

   HTTP_CODE=$(echo "$RESPONSE" | tail -c 4)
   RESPONSE_BODY=$(cat response.txt)

   if [ ${HTTP_CODE} -ge 500 ]  &&  [ ${HTTP_CODE} -le 599 ]; then
       echo "Attempt $current_attempt: 5xx Error ($HTTP_CODE). Retrying in $DELAY_SECONDS seconds..."
       sleep $DELAY_SECONDS
       continue
   elif [ ${HTTP_CODE} -ge 400 ] && [ ${HTTP_CODE} -le 499 ]; then
       echo "Client error ($HTTP_CODE): $RESPONSE_BODY"
       exit 1
   fi

   EVALUATION_ID=$(echo "$RESPONSE_BODY" | jq -r '.data.attributes.evaluation_id')
   if [ "$EVALUATION_ID" = "null" ] || [ -z "$EVALUATION_ID" ]; then
       echo "Failed to extract evaluation_id from response: $RESPONSE_BODY"
       exit 1
   fi

   echo "Evaluation started with ID: $EVALUATION_ID"
   break
done

if [ $current_attempt -eq $MAX_RETRIES ]; then
   echo "All retries exhausted for evaluation request, but treating 5xx errors as success."
   exit 0
fi

# Step 2: Poll for results
echo "Polling for results..."
start_time=$(date +%s)
poll_count=0

while true; do
  poll_count=$((poll_count + 1))
  current_time=$(date +%s)
  elapsed_time=$((current_time - start_time))

  if [ $elapsed_time -ge $MAX_POLL_TIME_SECONDS ]; then
      echo "Evaluation polling timeout after ${MAX_POLL_TIME_SECONDS} seconds"
      exit 1
  fi

  RESPONSE=$(curl -s -w "%{http_code}" -o response.txt -X GET "$API_URL/$EVALUATION_ID" \
      -H "DD-API-KEY: $API_KEY" \
      -H "DD-APPLICATION-KEY: $APP_KEY")

  HTTP_CODE=$(echo "$RESPONSE" | tail -c 4)
  RESPONSE_BODY=$(cat response.txt)

  if [ ${HTTP_CODE} -eq 404 ]; then
      echo "Evaluation not ready yet (404), retrying in $POLL_INTERVAL_SECONDS seconds... (attempt $poll_count, elapsed: ${elapsed_time}s)"
      sleep $POLL_INTERVAL_SECONDS
      continue
  elif [ ${HTTP_CODE} -ge 500 ]  &&  [ ${HTTP_CODE} -le 599 ]; then
      echo "Server error ($HTTP_CODE) while polling, retrying in $POLL_INTERVAL_SECONDS seconds... (attempt $poll_count, elapsed: ${elapsed_time}s)"
      sleep $POLL_INTERVAL_SECONDS
      continue
  elif [ ${HTTP_CODE} -ge 400 ] && [ ${HTTP_CODE} -le 499 ]; then
      echo "Client error ($HTTP_CODE) while polling: $RESPONSE_BODY"
      exit 1
  fi

  GATE_STATUS=$(echo "$RESPONSE_BODY" | jq -r '.data.attributes.gate_status')

  if [ "$GATE_STATUS" = "pass" ]; then
      echo "Gate evaluation PASSED"
      exit 0
  elif [ "$GATE_STATUS" = "fail" ]; then
      echo "Gate evaluation FAILED"
      exit 1
  else
      echo "Evaluation still in progress (status: $GATE_STATUS), retrying in $POLL_INTERVAL_SECONDS seconds... (attempt $poll_count, elapsed: ${elapsed_time}s)"
      sleep $POLL_INTERVAL_SECONDS
      continue
  fi
done
```

Le script :

- Reçoit trois entrées : `service`, `environment` et `version`. `version` est requis si la porte comporte des règles de détection de déploiement défectueux APM. Vous pouvez également ajouter `identifier` et `primary_tag` si nécessaire.
- Envoie une requête pour démarrer l'évaluation et enregistre le `evaluation_id`. Gère les codes de réponse HTTP :
  - 5xx : erreur serveur, réessaie avec un délai.
  - 4xx : erreur client, l'évaluation échoue.
  - 2xx : évaluation lancée.
- Interroge l'endpoint du statut de l'évaluation avec le `evaluation_id` jusqu'à ce que l'évaluation soit terminée :
  - 5xx : erreur serveur, réessaie avec un délai.
  - 404 : évaluation pas encore lancée, réessaie avec un délai.
  - 4xx (sauf 404) : erreur client, l'évaluation échoue.
  - 2xx : vérifiez `gate_status` et réessayez avec un délai si ce n'est pas terminé.
- Interroge toutes les 15 secondes jusqu'à ce que l'évaluation soit terminée ou que le temps d'interrogation maximal (10800 secondes = 3 heures par défaut) soit atteint.
- Si toutes les tentatives sont épuisées pour la requête initiale (réponses 5xx), le script traite cela comme un succès pour être résilient aux défaillances de l'API.

Adaptez le script à votre cas d'utilisation. Il utilise `curl` (pour effectuer la requête) et `jq` (pour traiter le JSON renvoyé). Si ces commandes ne sont pas disponibles, installez-les au début du script (par exemple, avec `apk add --no-cache curl jq`).

[1]: /fr/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{% tab "Appels API directs" %}}

Les évaluations Deployment Gate sont asynchrones. Lorsque vous déclenchez une évaluation, elle est lancée en arrière-plan et l'API renvoie un ID d'évaluation que vous pouvez utiliser pour suivre sa progression :

- Tout d'abord, demandez une évaluation Deployment Gate, ce qui lance le processus et renvoie un ID d'évaluation.
- Ensuite, interrogez périodiquement l'endpoint du statut de l'évaluation avec l'ID d'évaluation pour récupérer le résultat une fois l'évaluation terminée. Il est recommandé d'interroger toutes les 10 à 20 secondes.

Remplacez ce qui suit :

- `<YOUR_DD_SITE>` : Votre [nom du site Datadog][1] (par exemple, {{< region-param key="dd_site" code="true" >}})
- `<YOUR_API_KEY>` : Votre [clé d'API][2]
- `<YOUR_APP_KEY>` : Votre [clé d'application][3]

Demandez une évaluation pour une porte qui existe déjà dans Datadog :

```bash
curl -X POST "https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_APP_KEY>" \
-d @- << EOF
{
  "data": {
    "type": "deployment_gates_evaluation_request",
    "attributes": {
      "service": "transaction-backend",
      "env": "staging",
      "identifier": "my-custom-identifier",
      "version": "v123-456",
      "primary_tag": "region:us-central-1"
    }
  }
}
EOF
```

Attributs facultatifs :

- `identifier`: Facultatif, par défaut `default`.
- `version`: Requis pour les règles de détection de déploiement défectueux APM.
- `primary_tag`: Optionnel, restreint l'analyse de détection de déploiement défectueux APM au tag principal sélectionné.

**Note** : Une réponse HTTP 404 peut signifier que la porte n'a pas été trouvée, ou que la porte a été trouvée mais ne contient aucune règle.

Si l'évaluation Deployment Gate a été lancée avec succès, un code d'état HTTP 202 est renvoyé :

```json
{
   "data": {
       "id": "<random_response_uuid>",
        "type": "deployment_gates_evaluation_response",
        "attributes": {
            "evaluation_id": "e9d2f04f-4f4b-494b-86e5-52f03e10c8e9"
        }
    }
}
```

Le champ `data.attributes.evaluation_id` contient l'identifiant unique de cette évaluation Deployment Gate.

Récupérez le statut d'une évaluation Deployment Gate en interrogeant l'endpoint de statut avec l'identifiant d'évaluation :

```bash
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation/<evaluation_id>" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_APP_KEY>"
```

**Remarque** : Si vous appelez cet endpoint trop tôt après avoir demandé l'évaluation, une réponse HTTP 404 peut être renvoyée car l'évaluation n'a pas encore commencé. Réessayez quelques secondes plus tard.

Lorsqu'une réponse HTTP 200 est renvoyée, elle présente le format suivant :

```json
{
   "data": {
       "id": "<random_response_uuid>",
       "type": "deployment_gates_evaluation_result_response",
       "attributes": {
           "dry_run": false,
           "evaluation_id": "e9d2f04f-4f4b-494b-86e5-52f03e10c8e9",
           "evaluation_url": "https://app.datadoghq.com/ci/deployment-gates/evaluations?index=cdgates&query=level%3Agate+%40evaluation_id%3Ae9d2f14f-4f4b-494b-86e5-52f03e10c8e9",
           "gate_id": "e140302e-0cba-40d2-978c-6780647f8f1c",
           "gate_status": "pass",
           "rules": [
               {
                   "name": "Check service monitors",
                   "status": "fail",
                   "reason": "One or more monitors in ALERT state: https://app.datadoghq.com/monitors/34330981",
                   "dry_run": true
               }
           ]
       }
   }
}
```

Le champ `data.attributes.gate_status` contient le résultat de l'évaluation, avec l'une de ces valeurs :

- `in_progress` : L'évaluation Deployment Gate est toujours en cours ; continuez à interroger.
- `pass` : L'évaluation Deployment Gate a réussi.
- `fail` : L'évaluation Deployment Gate a échoué.

**Remarque** : Si le champ `data.attributes.dry_run` est `true`, le champ `data.attributes.gate_status` est toujours `pass`.

[1]: /fr/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{< /tabs >}}

## Recommandation pour la première intégration {#recommendation-for-first-time-onboarding}

Lors de l'intégration des portes de déploiement dans votre workflow Continuous Delivery, une phase d'évaluation aide à confirmer que le produit fonctionne comme prévu avant qu'il n'impacte les déploiements. Utilisez le mode d'évaluation Dry Run et la page [{{< ui >}}Deployment Gates Evaluations{{< /ui >}}][7] :

1. Créez une porte pour un service et réglez {{< ui >}}Evaluation Mode{{< /ui >}} sur {{< ui >}}Dry Run{{< /ui >}}.
2. Ajoutez l'évaluation Deployment Gate à votre processus de déploiement. Tant que la porte est en mode Dry Run, l'API renvoie toujours `pass` et les déploiements ne sont pas affectés par le résultat de la porte.
3. Après une certaine période (par exemple, 1 à 2 semaines), vérifiez les exécutions de Deployment Gate et des règles sur la page {{< ui >}}Deployment Gates Evaluations{{< /ui >}}. L'interface utilisateur affiche le statut réel, vous permettant ainsi de voir quand la Deployment Gate aurait échoué et pour quelle raison.
4. Lorsque vous êtes certain que le comportement de la porte est conforme à vos attentes, modifiez la porte et passez le mode d'évaluation de {{< ui >}}Dry Run{{< /ui >}} à {{< ui >}}Active{{< /ui >}}. Ensuite, l'API commence à renvoyer le statut réel et les déploiements commencent à être promus ou annulés en fonction du résultat de la Deployment Gate.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /fr/api/latest/deployment-gates
[5]: /fr/deployment_gates/setup/jit
[6]: https://app.datadoghq.com/ci/deployment-gates/gates
[7]: https://app.datadoghq.com/ci/deployment-gates/evaluations
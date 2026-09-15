---
description: Évaluez les portes de déploiement en envoyant des règles inline dans
  la demande d’évaluation — aucune porte n’a besoin d’exister dans Datadog au préalable.
further_reading:
- link: /deployment_gates/setup/preconfigured
  tag: Documentation
  text: Configurez des portes de déploiement préconfigurées
- link: /deployment_gates/explore
  tag: Documentation
  text: En savoir plus sur l'explorer de portes de déploiement
- link: /api/latest/deployment-gates
  tag: Référence API
  text: Référence de l'API des portes de déploiement
title: Configurer des portes de déploiement Just-In-Time (JIT)
---
{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Les portes de déploiement sont en préversion. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

Avec les portes de déploiement **Just-In-Time (JIT)**, les règles sont définies en ligne dans la demande d'évaluation. Aucune porte n'a besoin d'exister au préalable dans Datadog, ce qui rend le JIT idéal pour les règles en tant que code et la flexibilité par déploiement.

Vous recherchez des portes persistantes gérées dans l'interface utilisateur, l'API ou Terraform de Datadog ? Consultez [Portes de déploiement préconfigurées][5].

## Configuration {#configuration}

Exemple `configuration` :

```json
{
  "configuration": {
    "dry_run": false,
    "rules": [
      {
        "type": "monitor",
        "name": "Service monitors",
        "options": {
          "query": "service:transaction-backend env:production",
          "duration": 300
        }
      }
    ]
  }
}
```

Champs de haut niveau :

- `rules` (obligatoire) : Une ou plusieurs entrées de règle. Toutes les règles doivent être validées pour que la porte soit validée.
- `dry_run` (facultatif) : Lorsque `true`, la porte renvoie toujours `pass` via l'API tandis que le résultat réel est enregistré dans l'interface utilisateur. Utile pour l'intégration. Consultez [Recommandation pour une première intégration](#recommendation-for-first-time-onboarding).

Chaque règle possède ces champs :

- `type` (obligatoire) : Le type de règle, `monitor` ou `faulty_deployment_detection`. Consultez [Types de règles](#rule-types) pour savoir ce que chacun évalue.
- `name` (requis) : Une étiquette lisible par l'homme qui apparaît sur la page [Évaluations des portes de déploiement][6].
- `options` (requis) : Paramètres spécifiques à la règle ; consultez [Types de règles](#rule-types).
- `dry_run` (optionnel) : Remplacement de simulation par règle. Remplace le `dry_run` au niveau de la porte.

## Types de règles {#rule-types}

Pour le schéma complet et toutes les options disponibles, consultez la [référence de l'API des portes de déploiement][4].

{{< tabs >}}
{{% tab "Monitor" %}}
La règle Monitor évalue l'état d'un ensemble de monitors sur une période configurable. Elle échoue si, à tout moment pendant la période d'évaluation :

- Aucun moniteur ne correspond à la requête.
- Plus de 50 moniteurs correspondent à la requête.
- Tout monitor correspondant est dans l'état `ALERT` ou `NO_DATA`.

**Options** :

- `query` : La requête de recherche de monitor, basée sur la [syntaxe de recherche de monitor][1]. Filtrer sur les tags de monitor :
  - Tags statiques de monitor : `service:transaction-backend`
  - Tags dans la requête du monitor : `scope:"service:transaction-backend"`
  - Tags dans un [regroupement de monitors][2] : `group:"service:transaction-backend"`
- `duration` : La période de temps (en secondes) pendant laquelle les moniteurs correspondants sont évalués. La valeur par défaut est 0 (les moniteurs sont évalués instantanément). Le maximum est de 7200 secondes (2 heures).

Exemple de règle en ligne :

```json
{
  "type": "monitor",
  "name": "Service monitors",
  "options": {
    "query": "service:transaction-backend env:production",
    "duration": 300
  }
}
```

**Remarques** :
- `group`Les filtres évaluent uniquement les groupes correspondants.
- Les moniteurs mis en sourdine sont automatiquement exclus de l'évaluation (la requête inclut toujours `muted:false`).

[1]: /fr/monitors/manage/search/
[2]: /fr/monitors/manage/#triggered-monitors
{{% /tab %}}
{{% tab "Détection de déploiement défectueux APM" %}}
Ce type de règle utilise l'analyse [Détection de déploiement défectueux APM][1] de Watchdog pour comparer la version déployée aux versions précédentes du même service. L'analyse détecte :

- De nouveaux types d'erreurs.
- Des augmentations significatives des taux d'erreur par rapport aux versions précédentes.

L'analyse est effectuée automatiquement pour tous les services instrumentés par APM, et aucune configuration préalable n'est requise.

**Options** :

- `duration` : La période de temps (en secondes) pendant laquelle l'analyse s'exécute. Pour une confiance optimale dans l'analyse, cette valeur doit être d'au moins 900 secondes (15 minutes) après le début d'un déploiement. Le maximum est de 7200 secondes (2 heures).
- `allowed_resources` (facultatif) : [Ressources APM][2] à inclure dans l'analyse. Lorsqu'elles sont spécifiées, seules les ressources listées sont analysées. Mutuellement exclusif avec `excluded_resources`.
- `excluded_resources` (facultatif) : [Ressources APM][2] à ignorer (telles que les points de terminaison à faible volume ou à faible priorité). Mutuellement exclusif avec `allowed_resources`.

Exemple de règle en ligne :

```json
{
  "type": "faulty_deployment_detection",
  "name": "APM Faulty Deployment Detection",
  "options": {
    "duration": 900,
    "excluded_resources": ["GET /healthcheck"]
  }
}
```

**Remarques** :
- La règle est évaluée pour chaque valeur de [tag principal supplémentaire][3] ainsi que pour une analyse globale. Pour ne prendre en compte qu'un seul tag principal, spécifiez-le comme `primary_tag` dans les attributs de la requête.
- De nouvelles erreurs et des augmentations du taux d'erreur sont détectées au niveau de la ressource.
- Ce type de règle ne prend pas en charge les services marqués comme `database` ou `inferred service`.

[1]: /fr/watchdog/faulty_deployment_detection/
[2]: /fr/tracing/services/resource_page/
[3]: /fr/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
{{% /tab %}}
{{< /tabs >}}

## Évaluez une porte depuis votre pipeline {#evaluate-a-gate-from-your-pipeline}

Vous pouvez demander une évaluation de porte depuis votre pipeline de déploiement de plusieurs manières. L'interface de ligne de commande `datadog-ci`, l'intégration Argo Rollouts et l'action GitHub acceptent des règles en ligne via un fichier de configuration JSON utilisant des clés en camel case (`dryRun`). Les appels API directs et le script générique envoient la même configuration dans la charge utile de la requête en utilisant des clés en snake case (`dry_run`), correspondant au schéma de l'API.

{{< tabs >}}
{{% tab "Interface de ligne de commande datadog-ci" %}}
La commande [datadog-ci][1] `deployment gate` exécute l'évaluation en une seule commande. Transmettez un fichier de configuration JSON avec l'indicateur `--config` :

```bash
datadog-ci deployment gate --service transaction-backend --env production --version 1.2.3 --config ./gate-config.json
```

Exemple `gate-config.json` :

```json
{
  "dryRun": false,
  "rules": [
    {
      "type": "monitor",
      "name": "Service monitors",
      "options": {
        "query": "service:transaction-backend env:production",
        "duration": 300
      }
    },
    {
      "type": "faulty_deployment_detection",
      "name": "APM Faulty Deployment Detection",
      "options": {
        "duration": 900,
        "excluded_resources": ["GET /healthcheck"]
      }
    }
  ]
}
```

La commande :

- Envoie une requête pour démarrer l'évaluation de la porte et bloque jusqu'à ce que l'évaluation soit terminée.
- Fournit un délai d'expiration configurable pour la durée d'attente d'une évaluation.
- Dispose de tentatives automatiques intégrées en cas d'erreurs.
- Accepte `--fail-on-error` pour personnaliser le comportement en cas d'erreurs Datadog inattendues.

La commande `deployment gate` est disponible dans les versions v3.17.0 et ultérieures de datadog-ci. L'indicateur `--config` nécessite la version v5.19.0 ou ultérieure.

**Variables d'environnement requises** :

- `DD_API_KEY` : Votre [clé d'API][2].
- `DD_APP_KEY` : Votre [clé d'application][3].
- `DD_BETA_COMMANDS_ENABLED=1` : La commande `deployment gate` est une commande de prévisualisation.

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
- Utilisez une version de l'image datadog-ci qui prend en charge l'indicateur `--config` (version v5.19.0 ou supérieure).

Stockez la configuration de la porte dans une ConfigMap, puis montez-la dans le job et transmettez `--config` à l'interface de ligne de commande :

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: gate-config
data:
  gate-config.json: |
    {
      "dryRun": false,
      "rules": [
        {
          "type": "monitor",
          "name": "Service monitors",
          "options": {
            "query": "service:transaction-backend env:production",
            "duration": 300
          }
        },
        {
          "type": "faulty_deployment_detection",
          "name": "APM Faulty Deployment Detection",
          "options": {
            "duration": 900,
            "excluded_resources": ["GET /healthcheck"]
          }
        }
      ]
    }
---
apiVersion: argoproj.io/v1alpha1
kind: ClusterAnalysisTemplate
metadata:
  name: datadog-job-analysis
spec:
  args:
    - name: service
    - name: env
    - name: version
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
                    image: datadog/ci:latest
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
                      - datadog-ci deployment gate --service {{ args.service }} --env {{ args.env }} --version {{ args.version }} --config /etc/datadog/gate-config.json
                    volumeMounts:
                      - name: gate-config
                        mountPath: /etc/datadog
                volumes:
                  - name: gate-config
                    configMap:
                      name: gate-config
```

- Le modèle d'analyse peut recevoir des arguments de la ressource Rollout (`service`, `env`, `version`). Pour plus d'informations, consultez la [documentation officielle d'Argo Rollouts][4].
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
L'[action GitHub Datadog Deployment Gate][4] exécute l'évaluation dans le cadre d'un workflow. Validez un fichier de configuration de porte dans le dépôt et transmettez son chemin avec l'entrée `config`. L'entrée `config` nécessite la version v2.1.0 ou supérieure :

```yaml
name: Deploy with Datadog Deployment Gate
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5

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
          version: 1.0.1
          config: .github/gate-config.json

      - name: Deploy
        run: |
          echo "Deployment Gate passed, proceeding with deployment"
          # Your deployment commands here
```

Exemple `.github/gate-config.json` :

```json
{
  "dryRun": false,
  "rules": [
    {
      "type": "monitor",
      "name": "Service monitors",
      "options": {
        "query": "service:my-service env:production",
        "duration": 300
      }
    },
    {
      "type": "faulty_deployment_detection",
      "name": "APM Faulty Deployment Detection",
      "options": {
        "duration": 900,
        "excluded_resources": ["GET /healthcheck"]
      }
    }
  ]
}
```

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

Utilisez ce script comme point de départ. Il évalue un gate en utilisant des règles JIT inline.

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
      "version": "$3",
      "configuration": {
        "dry_run": false,
        "rules": [
          {
            "type": "monitor",
            "name": "Service monitors",
            "options": {
              "query": "service:$1 env:$2",
              "duration": 300
            }
          },
          {
            "type": "faulty_deployment_detection",
            "name": "APM Faulty Deployment Detection",
            "options": {
              "duration": 900,
              "excluded_resources": ["GET /healthcheck"]
            }
          }
        ]
      }
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

- Reçoit trois entrées : `service`, `environment` et `version`. `version` est requis si une ou plusieurs règles APM Faulty Deployment Detection sont évaluées.
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

Transmettez `configuration` avec des règles en ligne (snake_case à la limite de l'API) :

```bash
curl -X POST "https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_APP_KEY>" \
-d @- << 'EOF'
{
  "data": {
    "type": "deployment_gates_evaluation_request",
    "attributes": {
      "service": "transaction-backend",
      "env": "production",
      "version": "1.2.3",
      "configuration": {
        "dry_run": false,
        "rules": [
          {
            "type": "monitor",
            "name": "Service monitors",
            "options": {
              "query": "service:transaction-backend env:production",
              "duration": 300
            }
          },
          {
            "type": "faulty_deployment_detection",
            "name": "APM Faulty Deployment Detection",
            "options": {
              "duration": 900,
              "excluded_resources": ["GET /healthcheck"]
            }
          }
        ]
      }
    }
  }
}
EOF
```

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
           "evaluation_url": "https://app.datadoghq.com/ci/deployment-gates/evaluations?index=cdgates&query=level%3Agate+%40evaluation_id%3Ae9d2f04f-4f4b-494b-86e5-52f03e10c8e9",
           "gate_id": "e140302e-0cba-40d2-978c-6780647f8f1c",
           "gate_status": "pass",
           "rules": [
               {
                   "name": "Service monitors",
                   "status": "fail",
                   "reason": "One or more monitors in ALERT state: https://app.datadoghq.com/monitors/34330981",
                   "dry_run": false
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

Lors de l'intégration des portes de déploiement dans votre workflow Continuous Delivery, une phase d'évaluation aide à confirmer que le produit fonctionne comme prévu avant qu'il n'impacte les déploiements. Utilisez le mode dry-run et la page [{{< ui >}}Deployment Gates Evaluations{{< /ui >}}][6] :

1. Définissez `dry_run: true` sur le `configuration` (ou `dryRun: true` dans le fichier de configuration CLI). Pour marquer uniquement certaines règles en mode dry-run, définissez `dry_run` par règle. Une évaluation en mode dry-run renvoie toujours `pass` via l'API, mais le résultat réel est enregistré dans l'interface utilisateur.
2. Ajoutez l'évaluation Deployment Gate à votre processus de déploiement. Les déploiements ne sont pas impactés par le résultat de la Deployment Gate tant que le mode dry-run est activé.
3. Après une certaine période (par exemple, 1 à 2 semaines), vérifiez les exécutions de Deployment Gate et des règles sur la page {{< ui >}}Deployment Gates Evaluations{{< /ui >}}. L'interface utilisateur affiche le statut réel, vous permettant ainsi de voir quand la Deployment Gate aurait échoué et pour quelle raison.
4. Lorsque vous êtes certain que le comportement de la Deployment Gate est conforme à vos attentes, passez `dry_run` à `false`. Ensuite, l'API commence à renvoyer le statut réel et les déploiements commencent à être promus ou annulés en fonction du résultat de la Deployment Gate.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[4]: /fr/api/latest/deployment-gates
[5]: /fr/deployment_gates/setup/preconfigured
[6]: https://app.datadoghq.com/ci/deployment-gates/evaluations
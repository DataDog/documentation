---
description: Cree gates y reglas en Datadog con antelación y, a continuación, haga
  referencia a ellos por servicio y entorno en el momento de la implementación.
further_reading:
- link: /deployment_gates/setup/jit
  tag: Documentación
  text: Configure Just-In-Time (JIT) Deployment Gates
- link: /deployment_gates/explore
  tag: Documentación
  text: Obtenga información sobre el Deployment Gates explorer.
- link: /api/latest/deployment-gates
  tag: Referencia de la API
  text: Referencia de la API de Deployment Gates.
title: Configure Deployment Gates preconfigurados
---
{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Deployment Gates están en vista previa. Si le interesa esta función, complete el formulario para solicitar acceso.
{{< /callout >}}

Con **Deployment Gates** preconfigurados, los gates y reglas se conservan en Datadog y se hace referencia a ellos por servicio y entorno en el momento de la evaluación. Los gates preconfigurados son una buena opción cuando desea compartir reglas entre muchas implementaciones, administrar la configuración en Terraform o permitir que usuarios que no son de CI editen reglas en la interfaz de usuario de Datadog.

¿Busca definir reglas en línea en su configuración de implementación? Consulte [Just-In-Time (JIT) Deployment Gates][5].

## Cree una puerta {#create-a-gate}

<div class="alert alert-info">Además de usar la interfaz de usuario de Deployment Gates, puede administrar gates y reglas mediante programación con la <a href="https://docs.datadoghq.com/api/latest/deployment-gates">API de Deployment Gates</a> o el <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/deployment_gate">proveedor de Terraform de Datadog</a>.</div>

1. Vaya a [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Deployment Gates{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}}][6].
2. Haga clic en {{< ui >}}Create Gate{{< /ui >}}.
3. Configure los siguientes ajustes:
   - {{< ui >}}Service{{< /ui >}}: El nombre del servicio (ejemplo: `transaction-backend`).
   - {{< ui >}}Environment{{< /ui >}}: El entorno de destino (ejemplo: `dev`).
   - {{< ui >}}Identifier{{< /ui >}} (opcional, el valor predeterminado es `default`): Nombre único para varias puertas en el mismo servicio/entorno. Utilice esto para:
     - Permitir diferentes estrategias de implementación (ejemplo: `fast-deploy` frente a `default`)
     - Distinguir fases de implementación (ejemplo: `pre-deploy` frente a `post-deploy`)
     - Definir etapas canary (ejemplo: `pre-deploy` frente a `canary-20pct`)
   - {{< ui >}}Evaluation Mode{{< /ui >}}: Habilite {{< ui >}}Dry Run{{< /ui >}} para probar el comportamiento de la puerta sin afectar las implementaciones. La evaluación de una puerta de prueba (dry-run) siempre responde con un estado de aprobación, pero el resultado en la aplicación refleja la evaluación real. Esto es útil al realizar una evaluación inicial del comportamiento de la puerta sin afectar la canalización de implementación.

## Agregar reglas a una puerta {#add-rules-to-a-gate}

Cada puerta requiere una o más reglas para evaluar. Todas las reglas deben aprobarse para que la puerta tenga éxito. Para cada regla, especifique:

1. {{< ui >}}Name{{< /ui >}}: Una etiqueta descriptiva que aparece en la página [Evaluaciones de Deployment Gates][7] (por ejemplo, `Check all P0 monitors`).
2. {{< ui >}}Type{{< /ui >}}: Seleccione {{< ui >}}Monitor{{< /ui >}} o {{< ui >}}Faulty Deployment Detection{{< /ui >}}.
3. Configuración adicional basada en el tipo de regla seleccionado. Consulte [Tipos de reglas](#rule-types) para ver las opciones disponibles.
4. {{< ui >}}Evaluation Mode{{< /ui >}}: Cuando una regla se establece como {{< ui >}}Dry Run{{< /ui >}}, su resultado no se tiene en cuenta al calcular el resultado general de la puerta.

## Tipos de regla {#rule-types}

Para ver el esquema completo y todas las opciones disponibles, consulte la [Deployment Gates API reference][4].

{{< tabs >}}
{{% tab "Seguimiento" %}}
La regla de seguimiento evalúa el estado de un conjunto de seguimientos durante un período de tiempo configurable. Falla si en cualquier momento durante el período de evaluación:

- Ningún seguimiento coincide con la consulta.
- Más de 50 seguimientos coinciden con la consulta.
- Cualquier seguimiento coincidente está en estado `ALERT` o `NO_DATA`.

##### Configuración de ajustes {#configuration-settings}

- {{< ui >}}Search Query{{< /ui >}}: La consulta utilizada para encontrar los monitors a evaluar, según la [Sintaxis de búsqueda de Monitor][1]. Filtrar por etiquetas de seguimiento:
  - Etiquetas estáticas de seguimiento: `service:transaction-backend`
  - Etiquetas dentro de la consulta de seguimiento: `scope:"service:transaction-backend"`
  - Etiquetas dentro de una [agrupación de seguimientos][2]: `group:"service:transaction-backend"`
- {{< ui >}}Duration{{< /ui >}}: El período de tiempo (en segundos) durante el cual se evalúan los monitors coincidentes. El valor predeterminado es 0 (los seguimientos se evalúan al instante). El máximo es 7200 segundos (2 horas).

##### Ejemplos de consultas {#example-queries}

- `env:prod service:transaction-backend`
- `env:prod (service:transaction-backend OR group:"service:transaction-backend" OR scope:"service:transaction-backend")`
- `tag:"use_deployment_gates" team:payment`
- `tag:"use_deployment_gates" AND (NOT group:("team:frontend"))`

**Notas**:
- `group` los filtros evalúan solo los grupos coincidentes.
- Los seguimientos silenciados se excluyen automáticamente de la evaluación (la consulta siempre incluye `muted:false`).

[1]: /es/monitors/manage/search/
[2]: /es/monitors/manage/#triggered-monitors
{{% /tab %}}
{{% tab "APM Faulty Deployment Detection" %}}
Este tipo de regla utiliza el análisis de [APM Faulty Deployment Detection][1] de Watchdog para comparar la versión desplegada con versiones anteriores del mismo servicio. El análisis detecta:

- Nuevos tipos de errores.
- Aumentos significativos en las tasas de error en comparación con versiones anteriores.

El análisis se realiza automáticamente para todos los servicios instrumentados con APM y no se requiere configuración previa.

##### Configuración de ajustes {#configuration-settings-1}

- {{< ui >}}Operation Name{{< /ui >}}: Se completa automáticamente a partir de la configuración de [operación principal de APM][3] del servicio.
- {{< ui >}}Duration{{< /ui >}}: El período de tiempo (en segundos) durante el cual se ejecuta el análisis. Para una confianza de análisis óptima, este valor debe ser de al menos 900 segundos (15 minutos) después de que comience una implementación. El máximo es 7200 segundos (2 horas).
- {{< ui >}}Allowed Resources{{< /ui >}} (opcional): Una lista de [recursos de APM][2] separados por comas para incluir en el análisis. Cuando se especifica, solo se analizan los recursos enumerados. Mutualmente excluyente con {{< ui >}}Excluded Resources{{< /ui >}}.
- {{< ui >}}Excluded Resources{{< /ui >}} (opcional): Una lista de [recursos de APM][2] separados por comas a ignorar (como endpoints de bajo volumen o baja prioridad). Mutualmente excluyente con {{< ui >}}Allowed Resources{{< /ui >}}.

**Notas**:
- La regla se evalúa para cada valor de [etiqueta principal adicional][4], así como para un análisis agregado. Para considerar solo una etiqueta principal, especifíquela al [solicitar una evaluación de puerta](#evaluate-a-gate-from-your-pipeline).
- Se detectan nuevos errores y aumentos en la tasa de errores a nivel de recurso.
- Este tipo de regla no admite servicios marcados como `database` o `inferred service`.

[1]: /es/watchdog/faulty_deployment_detection/
[2]: /es/tracing/services/resource_page/
[3]: /es/tracing/guide/configuring-primary-operation/#primary-operations
[4]: /es/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
{{% /tab %}}
{{< /tabs >}}

## Evalúe un Deployment Gate desde su canalización {#evaluate-a-gate-from-your-pipeline}

Una vez configurada la puerta, solicite una evaluación al implementar el servicio relacionado y decida si bloquear o continuar la implementación según el resultado.

{{< tabs >}}
{{% tab "CLI de datadog-ci" %}}
El comando `deployment gate` de [datadog-ci][1] ejecuta la evaluación en un solo comando:

```bash
datadog-ci deployment gate --service transaction-backend --env staging --identifier default
```

Si la puerta de implementación contiene reglas de detección de implementaciones defectuosas de APM, especifique también la versión (por ejemplo, `--version 1.0.1`).

El comando:

- Envía una solicitud para iniciar la evaluación de Deployment Gate y se bloquea hasta que se complete la evaluación.
- Proporciona un tiempo de espera configurable para cuánto tiempo esperar una evaluación.
- Tiene reintentos automáticos integrados para errores.
- Acepta `--fail-on-error` para personalizar el comportamiento ante errores inesperados de Datadog.

El comando `deployment gate` está disponible en las versiones v3.17.0 y superiores de datadog-ci.

**Variables de entorno requeridas**:

- `DD_API_KEY`: Su [clave de API][2].
- `DD_APP_KEY`: Su [clave de aplicación][3].
- `DD_BETA_COMMANDS_ENABLED=1`: El comando `deployment gate` es un comando en versión beta.

Para obtener opciones de configuración completas y ejemplos de uso, consulte la [documentación del comando `deployment gate`][4].

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate

{{% /tab %}}
{{% tab "Argo Rollouts" %}}
Llame a Deployment Gates desde un recurso de Kubernetes de Argo Rollouts creando un [AnalysisTemplate][1] o un [ClusterAnalysisTemplate][1]. La plantilla ejecuta el [comando deployment gate de datadog-ci][7] para interactuar con la API de Deployment Gates.

Utilice la siguiente plantilla como punto de partida:

- Reemplace `<YOUR_DD_SITE>` con su [nombre del sitio de Datadog][2] (por ejemplo, {{< region-param key="dd_site" code="true" >}}).
- Defina la [clave de API][5] y la [clave de aplicación][6] como variables de entorno. El ejemplo utiliza un [Kubernetes Secret][3] llamado `datadog` con dos valores de datos: `api-key` y `app-key`. También puede pasar los valores en texto plano con `value` en lugar de `valueFrom`.

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

- La plantilla de análisis puede recibir argumentos del recurso Rollout (como `service`, `env` y `version`). Para obtener más información, consulte la [documentación oficial de Argo Rollouts][4].
- `ttlSecondsAfterFinished` elimina los trabajos finalizados después de 5 minutos.
- `backoffLimit` se establece en 0 porque el trabajo no debe reintentarse si la evaluación de Deployment Gate falla.

Después de crear la plantilla de análisis, haga referencia a ella desde la estrategia de Argo Rollouts:

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
[2]: /es/getting_started/site/
[3]: https://kubernetes.io/docs/concepts/configuration/secret/
[4]: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#analysis-template-arguments
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/organization-settings/application-keys
[7]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate

{{% /tab %}}
{{% tab "GitHub Actions" %}}
La [Datadog Deployment Gate GitHub Action][4] ejecuta la evaluación como parte de un flujo de trabajo.

Agregue un `DataDog/deployment-gate-github-action` paso a su flujo de trabajo de implementación existente:

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

Si la puerta de implementación contiene reglas de detección de implementaciones defectuosas de APM, especifique también la versión (por ejemplo, `version: 1.0.1`).

La acción:

- Envía una solicitud para iniciar la evaluación de Deployment Gate y se bloquea hasta que se complete la evaluación.
- Proporciona un tiempo de espera configurable para cuánto tiempo esperar una evaluación.
- Tiene reintentos automáticos integrados para errores.
- Acepta `fail-on-error` para personalizar el comportamiento ante errores inesperados de Datadog.

**Variables de entorno requeridas**:

- `DD_API_KEY`: Su [clave de API][2].
- `DD_APP_KEY`: Su [clave de aplicación][3].

Para obtener opciones de configuración completas y ejemplos de uso, consulte el [`DataDog/deployment-gate-github-action` repositorio][4].

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/deployment-gate-github-action

{{% /tab %}}
{{% tab "Script genérico" %}}

Utilice este script como punto de partida. Evalúa una puerta preconfigurada sin reglas en línea.

Reemplace lo siguiente:

- `<YOUR_DD_SITE>`: Su [nombre de sitio de Datadog][1] (por ejemplo, {{< region-param key="dd_site" code="true" >}})
- `<YOUR_API_KEY>`: Su [clave de API][2]
- `<YOUR_APP_KEY>`: Su [clave de aplicación][3]

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

El script:

- Recibe tres entradas: `service`, `environment` y `version`. `version` es obligatorio si la puerta tiene reglas de Detección de implementaciones defectuosas de APM. También puede agregar `identifier` y `primary_tag` si es necesario.
- Envía una solicitud para iniciar la evaluación y registra el `evaluation_id`. Maneja códigos de respuesta HTTP:
  - 5xx: error del servidor, reintenta con retraso.
  - 4xx: error del cliente, la evaluación falla.
  - 2xx: evaluación iniciada.
- Consulta el punto de conexión de estado de evaluación con el `evaluation_id` hasta que la evaluación se complete:
  - 5xx: error del servidor, reintenta con retraso.
  - 404: evaluación aún no iniciada, reintenta con retraso.
  - 4xx (excepto 404): error del cliente, la evaluación falla.
  - 2xx: verificación `gate_status` y reintente con retraso si no se ha completado.
- Consulta cada 15 segundos hasta que la evaluación se complete o se alcance el tiempo máximo de consulta (10800 segundos = 3 horas por defecto).
- Si se agotan todos los reintentos para la solicitud inicial (respuestas 5xx), el script trata esto como un éxito para ser resiliente ante fallas de la API.

Adapte el script a su caso de uso. Utiliza `curl` (para realizar la solicitud) y `jq` (para procesar el JSON devuelto). Si esos comandos no están disponibles, instálelos al principio del script (por ejemplo, con `apk add --no-cache curl jq`).

[1]: /es/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{% tab "Llamadas directas a la API" %}}

Las evaluaciones de Deployment Gate son asíncronas. Cuando activa una evaluación, esta se inicia en segundo plano y la API devuelve un ID de evaluación que puede usar para seguir su progreso:

- Primero, solicite una evaluación de Deployment Gate, lo cual inicia el proceso y devuelve un ID de evaluación.
- Luego, consulte periódicamente el punto de conexión de estado de evaluación con el ID de evaluación para recuperar el resultado cuando la evaluación se complete. Se recomienda consultar cada 10-20 segundos.

Reemplace lo siguiente:

- `<YOUR_DD_SITE>`: Su [nombre de sitio de Datadog][1] (por ejemplo, {{< region-param key="dd_site" code="true" >}})
- `<YOUR_API_KEY>`: Su [clave de API][2]
- `<YOUR_APP_KEY>`: Su [clave de aplicación][3]

Solicite una evaluación para una puerta que ya existe en Datadog:

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

Atributos opcionales:

- `identifier`: Opcional, el valor predeterminado es `default`.
- `version`: Requerido para las reglas de Detección de Implementación Defectuosa de APM.
- `primary_tag`: Opcional, limita el análisis de Detección de Implementación Defectuosa de APM a la etiqueta principal seleccionada.

**Nota**: Una respuesta HTTP 404 puede significar que la puerta no se encontró, o que la puerta se encontró pero no tiene reglas.

Si la evaluación de la puerta se inició correctamente, se devuelve un código de estado HTTP 202:

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

El campo `data.attributes.evaluation_id` contiene el identificador único para esta evaluación de puerta.

Obtenga el estado de una evaluación de puerta consultando el punto de conexión de estado con el ID de evaluación:

```bash
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation/<evaluation_id>" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_APP_KEY>"
```

**Nota**: Si llama a este punto de conexión demasiado pronto después de solicitar la evaluación, es posible que se devuelva una respuesta HTTP 404 porque la evaluación aún no ha comenzado. Vuelva a intentarlo unos segundos después.

Cuando se devuelve una respuesta HTTP 200, tiene el siguiente formato:

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

El campo `data.attributes.gate_status` contiene el resultado de la evaluación, con uno de estos valores:

- `in_progress`: La evaluación de Deployment Gate aún está en curso; continúe consultando.
- `pass`: La evaluación de Deployment Gate fue aprobada.
- `fail`: La evaluación de Deployment Gate falló.

**Nota**: Si el campo `data.attributes.dry_run` es `true`, el campo `data.attributes.gate_status` siempre es `pass`.

[1]: /es/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{< /tabs >}}

## Recomendación para la incorporación por primera vez {#recommendation-for-first-time-onboarding}

Al integrar Deployment Gates en su flujo de trabajo de Continuous Delivery, una fase de evaluación ayuda a confirmar que el producto funciona como se espera antes de que afecte las implementaciones. Utilice el modo de evaluación de prueba (Dry Run) y la página [{{< ui >}}Deployment Gates Evaluations{{< /ui >}}][7]:

1. Cree una puerta para un servicio y establezca {{< ui >}}Evaluation Mode{{< /ui >}} en {{< ui >}}Dry Run{{< /ui >}}.
2. Agregue la evaluación de la puerta a su proceso de implementación. Mientras la puerta esté en modo de prueba, la API siempre devuelve `pass` y las implementaciones no se ven afectadas por el resultado de la puerta.
3. Después de un período de tiempo (por ejemplo, 1-2 semanas), realice la verificación de las ejecuciones de la puerta y las reglas en la página {{< ui >}}Deployment Gates Evaluations{{< /ui >}}. La interfaz de usuario muestra el estado real, por lo que puede ver cuándo habría fallado la puerta y la razón detrás de esto.
4. Cuando esté seguro de que el comportamiento de la puerta es el esperado, edite la puerta y cambie el modo de evaluación de {{< ui >}}Dry Run{{< /ui >}} a {{< ui >}}Active{{< /ui >}}. Después, la API comienza a devolver el estado real y las implementaciones comienzan a promoverse o revertirse según el resultado de la puerta.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /es/api/latest/deployment-gates
[5]: /es/deployment_gates/setup/jit
[6]: https://app.datadoghq.com/ci/deployment-gates/gates
[7]: https://app.datadoghq.com/ci/deployment-gates/evaluations
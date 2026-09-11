---
further_reading:
- link: /deployment_gates/explore
  tag: Documentación
  text: Más información sobre el explorador de puertas de despliegue
title: Configurar puertas de despliegue
---

La configuración de las puertas de despliegue tiene dos pasos:

1. Configurar una puerta y reglas en la interfaz de usuario Datadog.
2. Actualizar tu pipeline de despliegue para interactuar con la API de puertas de despliegue.

## Crear una puerta de despliegue

1. Ve a [**Entrega de software > Puertas de despliegue > Configuración**][1].
2. Haz clic en **Create Gate** (Crear Puerta).
3. Configura los siguientes ajustes:
   - **Servicio**: Nombre del servicio (ejemplo: `transaction-backend`).
   - **Entorno**: Entorno de destino (ejemplo: `dev`).
   - **Identificador** (opcional, el valor por defecto es `default`): Nombre único de varias puertas en el mismo servicio/entorno. Puede utilizarse para:
     - Permitir diferentes estrategias de despliegue (ejemplo: `fast-deploy` contra `default`)
     - Distinguir fases de despliegue (ejemplo: `pre-deploy` contra `post-deploy`)
     - Definir las etapas canary (ejemplo: `pre-deploy` contra `canary-20pct`)
   - **Modo de evaluación**: Habilita `Dry Run` para comprobar el comportamiento de las puertas sin afectar a los despliegues. La evaluación de 
una puerta de simulacro siempre responde con un estado de aprobado, pero el resultado en la aplicación es el estado real basado en 
en la evaluación de reglas. Esto resulta especialmente útil cuando se realiza una evaluación inicial del 
comportamiento de la puerta sin afectar al pipeline de despliegue.

## Añadir reglas a una puerta

Cada puerta requiere una o más reglas. Todas las reglas deben aprobarse para que la puerta tenga éxito. Para cada regla, especifica:

1. **Nombre**: Introduce una etiqueta (label) descriptiva (por ejemplo, `Check all P0 monitors`).
2. **Tipo**: Selecciona `monitor (noun)` o `Faulty Deployment Detection`.
3. Configuración adicional en función del tipo de regla seleccionado. Para obtener más información, consulta [Tipos de reglas](#rule-types).
4. **Modo de evaluación**: Habilita `Dry Run` para probar la evaluación de reglas sin afectar al resultado de la puerta.


### Tipos de reglas

{{< tabs >}}
{{% tab "Monitors" %}}
Este tipo de regla evalúa el estado de tus monitores. La evaluación falla si:
- Ningún monitor coincide con la consulta.
- Más de 50 monitores coinciden con la consulta.
- Cualquier monitor coincidente tiene un estado `ALERT` o `NO_DATA`.

#### Ajustes de configuración

En el campo **Consulta**, introduce una consulta de monitor utilizando la [sintaxis de monitores de búsqueda][1]. Utiliza la siguiente sintaxis para filtrar por etiquetas (tags) específicas:
* Etiquetas (tags) estáticas de monitor - `service:transaction-backend`
* Etiquetas (tags) en la consulta del monitor - `scope:"service:transaction-backend"`
* [Etiquetas (tags) dentro de "agrupar por" del monitor][2] - `group:"service:transaction-backend"`

#### Consultas de ejemplo

* `env:prod service:transaction-backend`
* `env:prod (service:transaction-backend OR group:"service:transaction-backend" OR scope:"service:transaction-backend")`
* `tag:"use_deployment_gates" team:payment`
* `tag:"use_deployment_gates" AND (NOT group:("team:frontend"))`

#### Notas
* Los filtros `group` sólo evalúan los grupos coincidentes.
* Los monitores silenciados se excluyen automáticamente (la consulta siempre incluye `muted:false`).

[1]: /es/monitors/manage/search/
[2]: /es/monitors/manage/#triggered-monitors
{{% /tab %}}
{{% tab "APM Faulty Deployment Detection" %}}
Este tipo de regla utiliza [APM Faulty Deployment Detection][1] de Watchdog para comparar la versión desplegada con versiones anteriores del mismo servicio. Puede detectar:
* Nuevos tipos de errores
* Aumento significativo de las tasas de error

#### Ajustes de configuración

* **Nombre de la operación**: Se rellena automáticamente a partir de la configuración de la [operación primaria de APM][3] del servicio.
* **Recursos excluidos**: Introduce una lista separada por comas de [recursos APM][2] para ignorar (como endpoints de bajo volumen o baja prioridad).

#### Notas
- Para garantizar una confianza óptima en el análisis, antes de evaluar la puerta espera al menos 15 minutos luego del inicio de un despliegue.
- La regla se evalúa por cada valor de [etiqueta (tag) primaria adicional][4], así como para un análisis agregado. Si sólo quieres tener en cuenta una única etiqueta (tag) primaria, puedes especificarla en la [consulta de evaluación](#evaluate-a-deployment-gate) (consulta más abajo).
- Los nuevos errores y los aumentos de la tasa de errores se detectan a nivel de recursos.
- Este tipo de regla no admite servicios marcados como `database` o `inferred service`.

[1]: /es/watchdog/faulty_deployment_detection/
[2]: /es/tracing/services/resource_page/
[3]: /es/tracing/guide/configuring-primary-operation/#primary-operations
[4]: /es/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
{{% /tab %}}
{{< /tabs >}}

## Evaluar una puerta de despliegue

Después de configurar una puerta con al menos una regla, puedes evaluar la puerta mientras despliegas el servicio relacionado con una llamada a la API: 

```bash
curl -X POST "https://api.{{< region-param key="dd_site" >}}/api/unstable/deployments/gates/evaluate" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-d @- << EOF
{
  "data": {
    "type": "deployment_gates_evaluation_request",
    "attributes": {
      "service": "transaction-backend",
      "env": "staging",
      "identifier": "my-custom-identifier", # Optional, defaults to "default"
      "version": "v123-456",                # Required for APM Faulty Deployment Detection rules
      "primary_tag": "region:us-central-1"  # Optional, scopes down APM Faulty Deployment Detection rules analysis to the selected primary tag
    }
  }
}'
```

**Nota**: Una respuesta HTTP 404 puede deberse a que no se encontró la puerta o a que se encontró la puerta pero no tiene reglas.

Si se devuelve un código de estado HTTP 200, la respuesta tendrá el siguiente formato:

```json
{
   "data": {
       "id": "<random_response_uuid>",
       "type": "deployment_gates_evaluation_response",
       "attributes": {
           "dry_run": false,
           "evaluation_id": "e9d2f04f-4f4b-494b-86e5-52f03e10c8e9",
           "evaluation_url": "https://app.{{< region-param key="dd_site" >}}/ci/deployment-gates/evaluations?index=cdgates&query=level%3Agate+%40evaluation_id%3Ae9d2f14f-4f4b-494b-86e5-52f03e10c8e9",
           "gate_id": "e140302e-0cba-40d2-978c-6780647f8f1c",
           "gate_status": "pass",
           "rules": [
               {
                   "name": "Check service monitors",
                   "status": "fail",
                   "reason": "One or more monitors in ALERT state: https://app.{{< region-param key="dd_site" >}}/monitors/34330981",
                   "dry_run": true
               }
           ]
       }
   }
}
```

Si el campo `data.attributes.dry_run` es `true`, el campo `data.attributes.gate_status` es siempre `pass`. 

### Ejemplos de integración

{{< tabs >}}
{{% tab "Generic script" %}}
Utiliza este script como punto de partida. Para la variable API_URL, asegúrate de sustituir `<YOUR_DD_SITE>` por el [nombre de tu sitio Datadog ][1] (por ejemplo, {{< region-param key="dd_site" code="true" >}}).

```bash
#!/bin/sh

# Configuration
MAX_RETRIES=3
DELAY_SECONDS=5
API_URL="https://api.<YOUR_DD_SITE>/api/unstable/deployments/gates/evaluate"
API_KEY="<YOUR_API_KEY>"

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

current_attempt=0
while [ $current_attempt -lt $MAX_RETRIES ]; do
   current_attempt=$((current_attempt + 1))
   RESPONSE=$(curl -s -w "%{http_code}" -o response.txt -X POST "$API_URL" \
       -H "Content-Type: application/json" \
       -H "DD-API-KEY: $API_KEY" \
       -d "$PAYLOAD")

   # Extracts the last 3 digits of the status code
   HTTP_CODE=$(echo "$RESPONSE" | tail -c 4)
   RESPONSE_BODY=$(cat response.txt)

   if [ ${HTTP_CODE} -ge 500 ]  &&  [ ${HTTP_CODE} -le 599 ]; then
       # Status code 5xx indicates a server error, so the call is retried
       echo "Attempt $current_attempt: 5xx Error ($HTTP_CODE). Retrying in $DELAY_SECONDS seconds..."
       sleep $DELAY_SECONDS
       continue

   elif [ ${HTTP_CODE} -ne 200 ]; then
       # Only 200 is an expected status code
       echo "Unexpected HTTP Code ($HTTP_CODE): $RESPONSE_BODY"
       exit 1
   fi

   # At this point, we have received a 200 status code. So, we check the gate status returned
   GATE_STATUS=$(echo "$RESPONSE_BODY" | jq -r '.data.attributes.gate_status')

   if [[ "$GATE_STATUS" == "pass" ]]; then
       echo "Gate evaluation PASSED"
       exit 0
   else
       echo "Gate evaluation FAILED"
       exit 1
   fi
done

# If we arrive here, it means that we received several 5xx errors from the API. To not block deployments, we can treat this case as a success
echo "All retries exhausted, but treating 5xx errors as success."
exit 0
```

El script tiene las siguientes características:

* Recibe tres entradas: `service`, `environment` y `version` (opcionalmente puedes añadir `identifier` y `primary_tag`, si es necesario). `version` sólo es necesario si se evalúan una o más reglas de APM Faulty Deployment Detection.
* Envía una solicitud a la API de la puerta de despliegue y escribe el resultado en el archivo `response.txt`.
* Comprueba el código de estado HTTP de la respuesta y hace lo siguiente, dependiendo del código de respuesta:
  * 5xx: Reintenta la llamada (hasta 3 veces) con un retraso de 5 segundos.
  * No 200 (por ejemplo, 404): Imprime el error resultante y falla.
  * 200: Comprueba el estado de evaluación de la puerta devuelto (en `data.attributes.gate_status`) y aprueba o falla el script en función de su valor.
* Si se agotan todos los reintentos (es decir, se devuelven varias respuestas 5xx), el script no devuelve un fallo para ser resistente a los fallos de la API.

Este es un comportamiento general que deberías cambiar en función de tu caso de uso y tus preferencias personales. El script utiliza `curl` (para realizar la solicitud) y `jq` (para procesar el JSON devuelto). Si esos comandos no están disponibles, instálalos al principio del script (por ejemplo, añadiendo `apk add --no-cache curl jq`).

[1]: /es/getting_started/site/
{{% /tab %}}
{{% tab "Argo Rollouts" %}}
Para llamar a las puertas de despliegue desde un recurso Argo Rollouts Kubernetes, puedes crear una [AnalysisTemplate][1] o una [ClusterAnalysisTemplate][1]. La plantilla debe contener un trabajo Kubernetes que se utiliza para realizar el análisis.

Utiliza este script como punto de partida. Para la variable API_URL, asegúrate de sustituir `<YOUR_DD_SITE>` por el [nombre de tu sitio Datadog][3] (por ejemplo, {{< region-param key="dd_site" code="true" >}}).

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
                    image: alpine:latest
                    command: ["/bin/sh", "-c"]
                    args:
                      - |
                        apk add --no-cache curl jq

                        # Configuration
                        MAX_RETRIES=3
                        DELAY_SECONDS=5
                        API_URL="https://api.<YOUR_DD_SITE>/api/unstable/deployments/gates/evaluate"
                        API_KEY="<YOUR_API_KEY>"

                        PAYLOAD='{
                          "data": {
                            "type": "deployment_gates_evaluation_request",
                            "attributes": {
                              "service": "{{ args.service }}",
                              "env": "{{ args.env }}",
                              "version": "{{ args.version }}",
                            }
                          }
                        }'

                        current_attempt=0
                        while [ $current_attempt -lt $MAX_RETRIES ]; do
                          current_attempt=$((current_attempt + 1))
                          RESPONSE=$(curl -s -w "%{http_code}" -o response.txt -X POST "$API_URL" \
                              -H "Content-Type: application/json" \
                              -H "DD-API-KEY: $API_KEY" \
                              -d "$PAYLOAD")

                          # Extracts the last 3 digits of the status code
                          HTTP_CODE=$(echo "$RESPONSE" | tail -c 4)
                          RESPONSE_BODY=$(cat response.txt)

                          if [ ${HTTP_CODE} -ge 500 ]  &&  [ ${HTTP_CODE} -le 599 ]; then
                              # Status code 5xx indicates a server error, so the call is retried
                              echo "Attempt $current_attempt: 5xx Error ($HTTP_CODE). Retrying in $DELAY_SECONDS seconds..."
                              sleep $DELAY_SECONDS
                              continue

                          elif [ ${HTTP_CODE} -ne 200 ]; then
                              # Only 200 is an expected status code
                              echo "Unexpected HTTP Code ($HTTP_CODE): $RESPONSE_BODY"
                              exit 1
                          fi

                          # At this point, we have received a 200 status code. So, we check the gate status returned
                          GATE_STATUS=$(echo "$RESPONSE_BODY" | jq -r '.data.attributes.gate_status')

                          if [[ "$GATE_STATUS" == "pass" ]]; then
                              echo "Gate evaluation PASSED"
                              exit 0
                          else
                              echo "Gate evaluation FAILED"
                              exit 1
                          fi
                        done

                        # If we arrive here, it means that we received several 5xx errors from the API. To not block deployments, we can treat this case as a success
                        echo "All retries exhausted, but treating 5xx errors as success."
                        exit 0
```

* La plantilla de análisis puede recibir argumentos del recurso Rollout. En este caso, los argumentos son `service`, `env` y cualquier otro campo opcional necesario (como `version`). Para obtener más información, consulta los [documentos oficiales de Argo Rollouts][2].
* El campo `ttlSecondsAfterFinished` elimina los trabajos terminados después de 5 minutos.
* El campo `backoffLimit` se define en 0, ya que el trabajo podría fallar si falla la evaluación de la puerta, y no debería volver a intentarse en ese caso.

Una vez creada la plantilla de análisis, haz referencia a ella desde la estrategia Argo Rollouts:

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
              - name: version #Only required if one or more APM Faulty Deployment Detection rules are evaluated  
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.labels['tags.datadoghq.com/version']
        - ...
```

[1]: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#analysis-progressive-delivery
[2]: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#analysis-template-arguments
[3]: /es/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

## Recomendación para la primera incorporación

Al integrar las puertas de despliegue en tu flujo de trabajo de entrega continua, se recomienda una fase de evaluación para confirmar que el producto funciona como se espera, antes de que tenga un impacto en los despliegues. Puedes hacerlo utilizando el modo de evaluación de simulacro y la página **Evaluaciones de puertas de despliegue**:
1. Crea una puerta para un servicio y configura el modo de evaluación como `Dry Run`.
2. Añade la evaluación de puertas en tu proceso de despliegue. Como el modo de evaluación es de simulacro, la respuesta de la API de puertas de despliegue siempre contiene un estado `pass` y los despliegues no se ven afectados por el resultado de la puerta.
3. Después de un cierto período de tiempo (por ejemplo, 1-2 semanas), compruebe las ejecuciones de puertas y reglas en la interfaz de usuario para ver cuáles eran los estados de las puertas y reglas evaluadas. A diferencia de las respuestas de la API, el estado de la puerta en la interfaz de usuario no tiene en cuenta el modo de evaluación (`Dry Run` o `Active`). Esto significa que puedes entender cuándo la puerta ha fallado y cuál ha sido la razón.
4. Cuando esté seguro de que el comportamiento de la puerta es el esperado, edite la puerta y cambie el modo de evaluación de `Dry Run` a `Active`. Después, la API empezará a devolver el estado "real" y las implantaciones empezarán a promocionarse o revertirse en función del resultado de la puerta.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployment-gates/gates
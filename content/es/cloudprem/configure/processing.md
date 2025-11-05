---
description: Más información sobre cómo configurar tus pipelines de procesamiento
  en CloudPrem
further_reading:
- link: /cloudprem/architecture/
  tag: Documentación
  text: Más información sobre la arquitectura de CloudPrem
- link: /cloudprem/troubleshooting/
  tag: Documentación
  text: Solucionar problemas
title: Configuración de procesamiento
---

{{< callout btn_hidden="true" >}}
  Datadog CloudPrem está en Vista previa.
{{< /callout >}}

## Información general

CloudPrem incluye una función de procesamiento que te permite analizar y enriquecer logs. Analiza automáticamente logs con formato JSON. Puedes definir pipelines y procesadores para extraer información significativa o atributos del texto semiestructurado, que luego pueden utilizarse en las agregaciones.

<div class="alert alert-info">Los pipelines y procesadores de logs de CloudPrem fueron diseñados para equipararse a los <a href="/logs/log_configuration/pipelines/?tab=source">pipelines y procesadores de logs basados en la nube</a> de Datadog.</div>

Para ver la lista de procesadores compatibles y no compatibles, consulta [Compatibilidad con pipelines basados en la nube](#compatibility-with-cloud-based-pipelines).

Puedes configurar pipelines de procesamiento de logs utilizando un archivo JSON que siga el mismo formato de las configuraciones de pipelines de Datadog.

## Configurar el procesamiento

1. (Opcional) Si ya tienes pipelines basados en la nube en Datadog, puedes recuperar la configuración utilizando la [API de pipelines de logs][2]:

   ```bash
   curl -X GET "https://api.datadoghq.com/api/v1/logs/config/pipelines" \
    -H "Accept: application/json" \
    -H "DD-API-KEY: ${DD_API_KEY}" \
    -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" > pipelines-config.json
   ```

Este archivo JSON se puede utilizar directamente con CloudPrem.

2. Para definir la configuración en el Helm chart, proporciona la ruta a tu archivo de configuración JSON utilizando el parámetro `pipelinesConfig` en el Helm chart de CloudPrem:

   ```bash
   helm repo update
   helm upgrade <RELEASE_NAME> -n <NAMESPACE_NAME> --set-file pipelinesConfig=./pipelines-config.json -f datadog-values.yaml
   ```

   CloudPrem genera un mensaje informativo (`Successfully read pipeline config file`) cuando lee con éxito el archivo de configuración. Cualquier procesador definido en el archivo que no sea compatible con CloudPrem se ignorará durante el inicio.
   **Nota**: Helm impone un límite de tamaño de 1 MB en el archivo de configuración debido a su almacenamiento etcd subyacente.

## Formato del archivo de configuración

La configuración es una matriz JSON, en la que cada elemento representa un procesador o un pipeline anidado.

El orden de los elementos en la matriz define el orden de ejecución secuencial de los procesadores. La estructura refleja el resultado del endpoint de la API Datadog `api/v1/log/config/pipelines`.


```json
[
  {
    // processor1 details
  },
  {
    // processor2 details
  }
]
```

```json
[
  {
    "type": "pipeline",
    "id": "U73LOMZ9QG2iM-04OcXypA",
    "name": "cluster agent logs parsing",
    "enabled": true,
    "filter": {
      "query": "service:cluster-agent"
    },
    "processors": [
      {
        "type": "grok-parser",
        "id": "xn2WAzysQ1asaasdfakjf",
        "enabled": true,
        "grok": {
          "supportRules": "",
          "matchRules": "agent_rule %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{notSpace:agent} \\| %{word:level} \\| \\(%{notSpace:filename}:%{number:lineno} in %{word:process}\\) \\|( %{data::keyvalue(\":\")} \\|)?( - \\|)?( \\(%{notSpace:pyFilename}:%{number:pyLineno}\\) \\|)?%{data}\nagent_rule_pre_611 %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{word:level} \\| \\(%{notSpace:filename}:%{number:lineno} in %{word:process}\\)%{data}\njmxfetch_rule     %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{notSpace:agent} \\| %{word:level}\\s+\\| %{word:class} \\| %{data}"
        }
      },
      {
        "id": "xnsd5oanXq2893utcsQ",
        "type": "status-remapper",
        "enabled": true,
        "sources": ["level"]
      },
      {
        "type": "date-remapper",
        "id": "xn2WAzysQ1asdjJsb9dfb",
        "enabled": true,
        "sources": ["timestamp"]
      }
    ]
  }
]
```

## Compatibilidad con pipelines basados en la nube

El procesamiento de CloudPrem está diseñado para alinearse estrechamente con [Datadog Log Management][3] basado en la nube, permitiendo el uso directo de las configuraciones existentes de pipelines de logs. Esto se consigue ignorando los procesadores desconocidos o no compatibles. Sin embargo, existen algunas diferencias:
- Algunas consultas de filtro no se pueden analizar, como los filtros con comodines combinados (por ejemplo, `@data.message:+*`).
- El filtro de `message` tiene un comportamiento de coincidencia diferente (también afecta al procesador de categorías).
- CloudPrem utiliza una expresión regular (regex) para buscar la palabra, pero debe tokenizar el texto y tratar de hacer coincidir con los tokens. Las frases también se ignoran.
- Los groks utilizan internamente expresiones regulares. Los motores de regex pueden tener un comportamiento de coincidencia ligeramente diferente.
- Algunos patrones grok no se pueden analizar (por ejemplo, `%{?>notSpace:db.severity}`).

Los procesadores ignorados aparecen como una advertencia en los log del indexador.

### Procesadores compatibles:
- reasignador de atributos
- procesador de categorías
- reasignador de fechas
- analizador grok (compatibilidad limitada)
- reasignador de mensajes
- pipeline
- reasignador de servicios
- reasignador de estados
- procesador del compilador de cadenas
- reasignador de ID de traza

### Procesadores no compatibles:
- procesador aritmético
- analizador ip geo
- procesador de búsqueda
- analizador de url
- analizador Agent usuario

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/pipelines/?tab=source
[2]: /es/api/latest/logs-pipelines/#get-all-pipelines
[3]: /es/logs/log_configuration/processors/
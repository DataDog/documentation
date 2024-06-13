---
kind: documentación
title: Duplicar hosts con Kubernetes en AWS (EC2 o EKS)
---

Si estás ejecutando el Datadog Agent en un entorno de Kubernetes en AWS (totalmente autogestionado en EC2, o mediante EKS), puedes ver un problema con hosts duplicados. Un host está utilizando un nombre de host procedente del Datadog Agent, mientras que el otro es el `instance-id` de AWS recogido por la integración de AWS y Datadog.

## Fondo

Para realizar la resolución de nombres de host, el Datadog Agent consulta el endpoint de metadatos de EC2 local para detectar el `instance-id` de EC2. A continuación, Agent envía este `instance-id` como un alias de nombre de host. Datadog fusiona los datos del Agent y los datos de la integración de AWS en un único host.

Cuando Datadog Agent no puede consultar el endpoint de metadatos de EC2, pueden aparecer nombres duplicados de host.

## Diagnóstico

Utiliza el comando flare del Agent para generar un flare. A continuación, consulta `diagnose.log`. Puedes encontrar un fallo como el siguiente:

```
=== Running EC2 Metadata availability diagnosis ===
[ERROR] error: unable to fetch EC2 API, Get http://169.254.169.254/latest/meta-data/hostname: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers) - 1563565207662176204
===> FAIL
```

## Solución

Actualiza tu configuración para permitir el acceso al endpoint de metadatos de EC2.

Si utilizas IMDSv2, también deberás hacer lo siguiente:
1. Establezca la variable entorno `DD_EC2_PREFER_IMDSV2` en `true`.
2. Aumenta el [límite de saltos][1] de `1` a `2`.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html
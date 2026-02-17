---
further_reading:
- link: /cloudprem/install/
  tag: Documentación
  text: Requisitos previos para la instalación de CloudPrem
title: Arquitectura
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a nuevas funciones de gestión de logs alojadas.
{{< /callout >}}

## Información general

{{< img src="/cloudprem/overview_architecture.png" alt="Arquitectura CloudPrem que muestra componentes indexadores, buscadores, metastores y planos de control que interactúan con el almacenamiento de objetos" style="width:100%;" >}}

CloudPrem utiliza una arquitectura desacoplada que separa la computación (indexación y búsqueda) y los datos en un almacenamiento de objetos. Esto permite escalar y optimizar de forma independiente los distintos componentes del clúster en función de las demandas de las cargas de trabajo.

## Componentes

El clúster CloudPrem, normalmente desplegado en Kubernetes (EKS), consta de varios componentes:

**Indexadores**
: Se encargan de recibir los logs de los Datadog Agents. Los indexadores procesan, indexan y almacenan los logs en archivos de índice llamados _splits_ en el almacenamiento de objetos (por ejemplo, Amazon S3).

**Buscadores**
: Gestionan las consultas de búsqueda desde la interfaz de usuario Datadog, leyendo metadatos de Metastore y obteniendo datos del almacenamiento de objetos.

**Metastore**
: Almacena metadatos sobre los índices, incluidas las ubicaciones split en el almacenamiento de objetos. CloudPrem utiliza PostgreSQL para este propósito.

**Plano de control**
: Programa trabajos de indexación llamados _indexing pipelines_ en indexadores.

**Conserje**
: Realiza tareas de mantenimiento, aplicando políticas de retención, splits expirados de recolección de basura, y ejecutando tareas de consulta de borrado.


## Conexión a la interfaz de usuario de Datadog

Hay dos formas de conectar la interfaz de usuario de Datadog a CloudPrem:
- [**Conexión reversa**][1]: Deja que CloudPrem inicie solicitudes gRPC bidireccionales a Datadog.
- [**Acepta solicitudes externas de Datadog**][2]: Proporciona a Datadog un endpoint DNS para solicitudes gRPC y configura un Ingress público para aceptar esas solicitudes.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloudprem/configure/reverse_connection/
[2]: /es/cloudprem/configure/ingress/
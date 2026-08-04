---
aliases:
- /es/logs/log_collection/kubernetes_audit_logs
categories:
- recopilación de logs
- rastreo
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/kubernetes_audit_logs.md
description: Para realizar un seguimiento de todo lo que ocurre dentro de tus clústeres
  Kubernetes
doc_link: /integrations/kubernetes_audit_logs/
further_reading:
- link: logs/
  tag: Documentación
  text: Gestión de Logs
- link: https://www.datadoghq.com/blog/key-kubernetes-audit-logs-for-monitoring-cluster-security/
  tag: Blog
  text: Logs de auditoría de Kubernetes claves para la monitorización de la seguridad
    de los clústeres
has_logo: true
integration_id: kubernetes-audit-logs
integration_title: Logs de auditoría de Kubernetes
is_public: true
name: kubernetes_audit_logs
public_title: Logs de auditoría de Kubernetes en Datadog
short_description: Seguimiento interno de clústeres Kubernetes
supported_os:
- linux
- mac_os
- windows
title: Logs de auditoría de Kubernetes
---

## Información general

Recopila [logs de auditoría de Kubernetes][1] para realizar un seguimiento de todo lo que ocurre dentro de tus clústeres Kubernetes, incluyendo cada llamada realizada a la API Kubernetes por cualquier servicio. Esto incluye el plano de control (los controladores incorporados, el planificador), los daemons de nodo (kubelet, kube-proxy y otros), los servicios de clúster (como el autoescalador de clúster), los usuarios que realizan solicitudes `kubectl` e incluso la propia API Kubernetes.

Con la integración de los logs de auditoría de Kubernetes pueded diagnosticar problemas de permisos, identificar políticas RBAC que necesitan actualizarse y rastrear las solicitudes de API lentas que afectan a todo tu clúster. Profundiza en estos temas con la [charla de Datadog en KubeCon 2019][2].

## Instalación

Esta integración está **disponible para el Agent v6.0 o posterior**

### Configuración

Para obtener más información sobre la configuración de los logs de auditoría de Kubernetes, consulta las [auditorías de Kubernetes][3].

Para habilitar los logs de auditoría logs en Kubernetes:

1. Los logs de auditoría están deshabilitados por defecto en Kubernetes. Para habilitarlos en la configuración de tu servidor de API, especifica una ruta para el archivo de la política de auditoría:

    ```conf
    kube-apiserver
      [...]
      --audit-log-path=/var/log/kubernetes/apiserver/audit.log
      --audit-policy-file=/etc/kubernetes/audit-policies/policy.yaml
    ```

2. Cree el archivo de la política en `/etc/kubernetes/audit-policies/policy.yaml` para especificar los tipos de solicitudes de API que quieres capturar en tus logs de auditoría. Las reglas de la política de auditoría se evalúan en orden. El servidor de API sigue la primera regla coincidente que encuentra para cada tipo de operación o recurso. Ejemplo de política de auditoría:

```yaml
# /etc/kubernetes/audit-policies/policy.yaml

apiVersion: audit.k8s.io/v1
kind: Policy
rules:
    # do not log requests to the following
    - level: None
      nonResourceURLs:
          - '/healthz*'
          - '/logs'
          - '/metrics'
          - '/swagger*'
          - '/version'

    # limit level to Metadata so token is not included in the spec/status
    - level: Metadata
      omitStages:
          - RequestReceived
      resources:
          - group: authentication.k8s.io
            resources:
                - tokenreviews

    # extended audit of auth delegation
    - level: RequestResponse
      omitStages:
          - RequestReceived
      resources:
          - group: authorization.k8s.io
            resources:
                - subjectaccessreviews

    # log changes to pods at RequestResponse level
    - level: RequestResponse
      omitStages:
          - RequestReceived
      resources:
          # core API group; add third-party API services and your API services if needed
          - group: ''
            resources: ['pods']
            verbs: ['create', 'patch', 'update', 'delete']

    # log everything else at Metadata level
    - level: Metadata
      omitStages:
          - RequestReceived
```

En este ejemplo de archivo de política se configura el servidor de API para registrar con un máximo nivel de detalle determinados tipos de operaciones que generan cambios en un clúster (actualización, parche, creación, eliminación). También realiza un seguimiento de las solicitudes al recurso `subjectaccessreviews` al más alto nivel, para ayudar a solucionar los problemas de delegación de autenticación.

Es posible que quieras reducir el nivel de verbosidad a `Metadata` para los endpoints que contienen datos confidenciales, como el recurso `tokenreviews`. Datadog también omite la etapa `RequestReceived` de los logs.

En la última sección, para todo lo que no fue explícitamente configurado por las reglas anteriores, la política está configurada para registrar a nivel de `Metadata`. Como los logs de auditoría pueden ser verbosos, puedes elegir excluir acciones/verbos menos críticos, como por ejemplo las operaciones list, watch y get que no cambian el estado del clúster.

### Recopilación de logs

1. [Instala el Agent][1] en tu entorno Kubernetes.
2. La recopilación de logs está deshabilitada por defecto. Habilítala en la sección `env` de tu [DaemonSet][4]:

    ```yaml
    env:
        # (...)
        - name: DD_LOGS_ENABLED
          value: 'true'
    ```

3. Monta el directorio del log de auditoría y también un directorio que el Agent utilice para almacenar un indicador para saber qué log se envió por última vez desde ese archivo. Para ello, añade lo siguiente en la sección `volumeMounts` del daemonset:

    ```yaml
     # (...)
        volumeMounts:
          # (...)
          - name: pointdir
            mountPath: /opt/datadog-agent/run
          - name: auditdir
            mountPath: /var/log/kubernetes/apiserver
          - name: dd-agent-config
            mountPath: /conf.d/kubernetes_audit.d
      # (...)
      volumes:
        # (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointdir
        - hostPath:
            path: /var/log/kubernetes/apiserver
          name: auditdir
        - name: dd-agent-config
            configMap:
              name: dd-agent-config
              items:
                - key: kubernetes-audit-log
                  path: conf.yaml
      # (...)
    ```

   Esta acción también monta la carpeta `conf.d` que se utiliza para configurar el Agent para que recopile logs del archivo del log de auditoría.

4. Configura el Agent para recopilar logs de ese archivo con un ConfigMap:

    ```yaml
    kind: ConfigMap
    apiVersion: v1
    metadata:
        name: dd-agent-config
        namespace: default
    data:
        kubernetes-audit-log: |-
            logs:
              - type: file
                path: /var/log/kubernetes/apiserver/audit.log
                source: kubernetes.audit
                service: audit
    ```

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `Logs` en la sección Checks.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con la [asistencia técnica de Datadog][6].

[1]: /es/agent/kubernetes/#installation
[2]: https://www.youtube.com/watch?v=raJRLmGb9Is&t=1s
[3]: https://kubernetes.io/docs/tasks/debug-application-cluster/audit/
[4]: /es/agent/kubernetes/log/
[5]: /es/agent/guide/agent-commands/#agent-status-and-information
[6]: /es/help/
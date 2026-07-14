---
aliases:
- /es/agent/guide/docker-deprecation
title: Obsolescencia de Docker en Kubernetes
---

A partir de la versión 1.20, Kubernetes dejará de utilizar Docker como motor de tiempo de ejecución, mientras que algunos proveedores de servicios en la nube ya lo han retirado de sus imágenes.

- AKS 1.19 [Docker obsoleto; utiliza containerd de forma predeterminada][1].

- GKE 1.19 [Docker obsoleto; utiliza containerd de forma predeterminada en los nodos nuevos][2].

- EKS 1.22 [Docker obsoleto; utiliza containerd de forma predeterminada][3].

- OKE 1.20 [Docker obsoleto; utiliza CRI-O de forma predeterminada][4].

Si Docker se ha quedado obsoleto para tu versión de Kubernetes, el socket de Docker dejará de aparecer o, si lo hace, no contendrá ningún dato sobre los contenedores que ejecuta Kubernetes, y el check de Docker no funcionará. Encontrarás más información sobre el motor de tiempo de ejecución de Docker en [kubernetes.io][5]. Por esta razón, deberás activar el check de [containerd][6] o de [CRI-O][7] en función del motor de tiempo de ejecución del contenedor que uses. Las métricas de contenedor que obtenga el nuevo motor de tiempo de ejecución sustituirán a las de Docker.

En versiones posteriores a la 7.27 del Datadog Agent, el Agent detecta automáticamente tu entorno y no es necesario que hagas ningún cambio en la configuración.

**Si utilizas una versión anterior a la 7.27 del Agent, tendrás que especificar la ruta del socket de tiempo de ejecución del contenedor:**

**Nota**: Es posible que tengas que actualizar los monitores, dashboards y SLO debido a cambios en los nombres de las métricas. Ejemplo: de `docker.*` a `containerd.*`.

{{< tabs >}}
{{% tab "Helm" %}}
Establece la ruta al socket de tiempo de ejecución de tu contenedor con el parámetro `datadog.criSocketPath` en el [Helm chart][1].

Por ejemplo:

```
criSocketPath:  /var/run/containerd/containerd.sock
```

[1]: https://github.com/DataDog/helm-charts/blob/d8817b4401b75b1a064481da989c451633249ea9/charts/datadog/values.yaml#L262-L263
{{% /tab %}}
{{% tab "DaemonSet" %}}

Elimina todas las referencias al socket de Docker, así como los montajes del volumen de sockets de Docker (si existen).

Utiliza la variable de entorno `DD_CRI_SOCKET_PATH` para dirigirte a la ruta del socket de tiempo de ejecución de tu contenedor. Defínela en todos los contenedores del Agent si usas contenedores específicos:

```
env:
  - name: DD_CRI_SOCKET_PATH
    value: /var/run/containerd/containerd.sock
```

Monta el socket de tu host en el contenedor del Agent:

```
volumeMounts:
  - name: containerdsocket
    mountPath: /var/run/containerd/containerd.sock
  - mountPath: /host/var/run
    name: var-run
    readOnly: true
volumes:
  - hostPath:
      path: /var/run/containerd/containerd.sock
    name: containerdsocket
  - hostPath:
      path: /var/run
    name: var-run
```

{{% /tab %}}
{{< /tabs >}}

[1]: https://github.com/Azure/AKS/releases/tag/2020-11-16
[2]: https://cloud.google.com/kubernetes-engine/docs/release-notes#December_08_2020
[3]: https://aws.amazon.com/blogs/containers/amazon-eks-1-21-released/
[4]: https://docs.oracle.com/en-us/iaas/releasenotes/changes/52d34150-0cb8-4a0f-95f3-924dec5a3c83/
[5]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/check-if-dockershim-deprecation-affects-you/#role-of-dockershim
[6]: /es/integrations/containerd/
[7]: /es/integrations/crio/
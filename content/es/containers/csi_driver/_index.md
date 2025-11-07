---
description: Observabilidad de alto rendimiento para entornos Kubernetes seguros mediante
  el controlador CSI de Datadog
further_reading:
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: Blog
  text: Llevar la observabilidad de alto rendimiento a entornos Kubernetes seguros
    con el controlador CSI de Datadog
title: Controlador CSI de Datadog
---

## Información general

Esta página proporciona información general sobre el controlador CSI de Datadog e instrucciones de instalación en un clúster Kubernetes

Para obtener más información sobre Kubernetes Container Storage Interface (CSI), consulta la [documentación sobre Kubernetes CSI][4].

El controlador CSI de Datadog es [open source][1].

<div class="alert alert-info">
   El controlador CSI de Datadog no es compatible con Windows.
</div>

## Cómo funciona

El controlador CSI de Datadog es un DaemonSet que ejecuta un servidor gRPC implementando las especificaciones CSI en cada nodo de tu clúster Kubernetes.

La instalación del controlador CSI de Datadog en un clúster Kubernetes permite utilizar volúmenes CSI especificando el nombre del controlador CSI de Datadog.

El servidor del nodo CSI de Datadog es responsable de gestionar el ciclo de vida de los volúmenes CSI de Datadog.

## ¿Por qué utilizar el controlador CSI de Datadog?

El controlador CSI de Datadog permite al Datadog Agent compartir sockets de dominio Unix de Trace Agent y DogStatsD con pods de usuario independientemente de las [normas de seguridad para pods][4] de los espacios de nombres.

Si no se utilizan volúmenes CSI, los sockets UDS deben compartirse con el pod de usuario a través de volúmenes hostpath. Si el pod de usuario se está ejecutando en un espacio de nombres que tiene normas de seguridad para pods sin privilegios, el pod falla al iniciarse porque los volúmenes hostpath no están permitidos en ese contexto.

El controlador CSI de Datadog desplaza el volumen hostpath de la aplicación de usuario al servidor del nodo CSI: el DaemonSet CSI se ejecuta en un espacio de nombres privilegiado independiente y permite inyectar sockets UDS en pods de usuario con un volumen CSI de Datadog, lo que permite que los pods de usuario se ejecuten en espacios de nombres con normas de seguridad para pods `baseline` o `restricted`.

## Instalación y activación

<div class="alert alert-info">
<strong>Notas</strong>:
<ul>
<li/>Requiere <a href="https://helm.sh">Helm</a>.
<li/>El controlador CSI de Datadog debe ejecutarse con un contexto de seguridad privilegiado. Esto es necesario para que el controlador CSI de Datadog pueda montar volúmenes desde el sistema de archivos host a los pods de usuario.
</ul>
</div>

{{< tabs >}}

{{% tab "Helm" %}}

Para instalar y activar el controlador CSI de Datadog, configura `datadog.csi.enabled` como `true` en el Helm chart del Datadog Agent.

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update

   helm install datadog-agent datadog/datadog --set datadog.csi.enabled=true
   ```

{{% /tab %}}

{{% tab "Datadog Operator" %}}

Si el Datadog Agent se despliega utilizando el Datadog Operator, debes instalar el Helm chart del controlador CSI de Datadog antes de activar Datadog CSI en el Datadog Agent.

1. **Añade el repositorio Helm de Datadog CSI.**

   Ejecuta:
   ```shell
   helm repo add datadog-csi-driver https://helm.datadoghq.com
   helm repo update

   ```

2. **Instala el Helm chart del controlador CSI de Datadog.**

   Ejecuta:

   ```shell
   helm install datadog-csi-driver datadog/datadog-csi-driver
   ```

3. **Activa Datadog CSI en tu recurso `DatadogAgent`.**

   ```
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
       csi:
         enabled: true
   ```

{{% /tab %}}

{{% tab "DaemonSet" %}}

Si el Datadog Agent se despliega utilizando el DaemonSet, debes instalar el Helm chart del controlador CSI de Datadog antes de activar el controlador CSI de Datadog en el Datadog Agent.

1. **Añade el repositorio Helm del controlador CSI de Datadog.**

   Ejecuta:
   ```shell
   helm repo add datadog-csi-driver https://helm.datadoghq.com
   helm repo update

   ```

2. **Instala el Helm chart del controlador CSI de Datadog.**

   Ejecuta:

   ```shell
   helm install datadog-csi-driver datadog/datadog-csi-driver
   ```

3. **Activa Datadog CSI**.

   Para activar el controlador CSI de Datadog, configura la siguiente variable de entorno en el contenedor del Datadog Cluster Agent:

   ```
   DD_CSI_DRIVER_ENABLED=true
   ```
{{% /tab %}}

{{< /tabs >}}

### Compatibilidad con GKE Autopilot 

A partir del Helm chart versión 3.138.0 del Datadog Agent y del Helm chart versión 0.4.2 del controlador CSI de Datadog, el controlador CSI de Datadog puede instalarse en los clústeres de Google Kubernetes Engine (GKE) Autopilot.

> **Nota:**  
> Si el controlador CSI no se instala utilizando el Helm chart, crea el siguiente recurso `AllowlistSynchronizer` para activar la compatibilidad con GKE Autopilot:

```yaml
apiVersion: auto.gke.io/v1
kind: AllowlistSynchronizer
metadata:
  name: datadog-csi-synchronizer
spec:
  allowlistPaths:
    - Datadog/datadog-csi-driver/datadog-datadog-csi-driver-daemonset-exemption-v1.0.1.yaml
```

## Volúmenes Datadog CSI

Los volúmenes CSI procesados por el controlador CSI de Datadog deben tener el siguiente formato:

```yaml
csi:
    driver: k8s.csi.datadoghq.com
    volumeAttributes:
        type: <volume-type>
name: <volume-name>
```

Por ejemplo:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-name
spec:
  containers:
    - name: ubuntu
      image: ubuntu
      command: ["/bin/bash", "-c", "--"]
      args: ["while true; do sleep 30; echo hello-ubuntu; done;"]
      volumeMounts:
        - mountPath: /var/sockets/apm/
          name: dd-csi-volume-apm-dir
        - mountPath: /var/sockets/dsd/dsd.sock
          name: dd-csi-volume-dsd
  volumes:
    - name: dd-csi-volume-dsd
      csi:
        driver: k8s.csi.datadoghq.com
        volumeAttributes:
          type: DSDSocket
    - name: dd-csi-volume-apm-dir
      csi:
        driver: k8s.csi.datadoghq.com
        volumeAttributes:
          type: APMSocketDirectory
```

Se admiten cuatro tipos de volumen CSI:
* [APMSocket](#apmsocket)
* [APMSocketDirectory](#apmsocketdirectory)
* [DSDSocket](#dsdsocket)
* [DSDSocketDirectory](#dsdsocketdirectory)

### APMSocket

Este tipo es útil para montar un archivo de socket UDS en el Trace Agent.

Por ejemplo:

```yaml
csi:
    driver: k8s.csi.datadoghq.com
    volumeAttributes:
        type: APMSocket
name: datadog-apm
```

Si el socket indicado no existe, la operación de montaje falla y el pod se bloquea en la fase `ContainerCreating`.

### APMSocketDirectory

Este tipo es útil para montar el directorio que contiene el socket APM.

Por ejemplo:

```yaml
csi:
    driver: k8s.csi.datadoghq.com
    readOnly: false
    volumeAttributes:
        type: APMSocketDirectory
name: datadog
```

### DSDSocket

Este tipo es útil para montar un archivo de socket UDS DogStatsD.

Por ejemplo:

```yaml
csi:
    driver: k8s.csi.datadoghq.com
    volumeAttributes:
        type: DSDSocket
name: datadog-dsd
```

Si el socket indicado no existe, la operación de montaje falla y el pod se bloquea en la fase `ContainerCreating`.

### DSDSocketDirectory

Este tipo es útil para montar el directorio que contiene el socket DogStatsD.

Por ejemplo:

```yaml
csi:
    driver: k8s.csi.datadoghq.com
    readOnly: false
    volumeAttributes:
        type: DSDSocketDirectory
name: datadog
```

<div class="alert alert-info">
Con el Datadog Agent v7.67 o posterior, el Admission Controller puede montar automáticamente sockets UDS Datadog en pods mutados configurando el modo de configuración de inyección en <code>csi</code>. Para obtener más información, consulta <a href="/containers/cluster_agent/admission_controller#configure-apm-and-dogstatsd-communication-mode">Admission Controller: Configurar el modo de comunicación de APM y DogStatsD </a>.

Con la configuración predeterminada del Datadog Agent, el Admission Controller inyecta <code>APMSocketDirectory</code> o <code>DSDSocketDirectory</code>. Si los sockets del Trace Agent y DogStatsD están ambos en el mismo directorio en el host, solo se inyecta un volumen, ya que esto proporciona posteriormente acceso a ambos sockets que comparten el mismo directorio en el host.
</div>

## Cuestiones de seguridad

El controlador CSI de Datadog requiere privilegios elevados y acceso específico al host.

### Contexto de seguridad privilegiado
El controlador CSI de Datadog debe ejecutarse como contenedor privilegiado para realizar operaciones de montaje y acceder al sistema de archivos del host.

### Acceso a /var/lib/kubelet/pods
El controlador CSI de Datadog necesita acceso de lectura-escritura al directorio `/var/lib/kubelet/pods`, ya que Kubernetes administra volúmenes de pods utilizando este directorio. El controlador CSI de Datadog debe acceder a `/var/lib/kubelet/pods` para inyectar sockets de dominio Unix Datadog en pods de usuario.

### Propagación bidireccional de montajes
La propagación bidireccional de montajes es necesaria para garantizar que los montajes de volúmenes del servidor del nodo CSI de Datadog sean visibles tanto para el host como para los pods de usuario. Sin la propagación bidireccional de montajes, los sockets compartidos no pueden propagarse correctamente a los pods.

Al aislar el controlador CSI de Datadog en un espacio de nombres privilegiado, los clústeres Kubernetes pueden compartir de forma segura sockets Datadog con pods de usuario que se ejecutan bajo estrictas normas de seguridad para pods como baseline o restricted, a la vez que se minimizan los riesgos de seguridad.

<div class="alert alert-info">
   Limita el acceso al espacio de nombres y la configuración del controlador CSI de Datadog a operadores de confianza. Si los privilegios elevados del controlador CSI de Datadog están mal configurados, estos privilegios pueden ser mal utilizados.
</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-csi-driver
[2]: https://hub.docker.com/r/datadog/csi-driver
[3]: https://kubernetes-csi.github.io/docs/introduction.html
[4]: https://kubernetes.io/docs/concepts/security/pod-security-standards/
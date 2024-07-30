---
aliases:
- /es/agent/faq/agent-5-kubernetes-basic-agent-usage
private: true
title: Uso básico del Agent con Kubernetes en el Agent v5
---

{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Dashboard de Kubernetes" >}}

<div class="alert alert-warning">
El Datadog Agent v5 es compatible con Kubernetes hasta la versión 1.8. Si quieres usar una versión más reciente de Kubernetes, deberás pasarte al Datadog Agent v6.
</div>

## Información general

Obtén métricas de Kubernetes en tiempo real para:

* Visualizar y monitorizar los estados de Kubernetes
* Recibir notificaciones de conmutaciones por error de Kubernetes y otros eventos relacionados

Para trabajar con Kubernetes, se recomienda utilizar el [Agent en un DaemonSet][1]. Se incluye una [imagen de Docker][2] en las integraciones de Docker y Kubernetes que estén habilitadas.

También puedes [ejecutar el Datadog Agent en tu host][3] y configurarlo para recopilar las métricas de Kubernetes.

## Configurar Kubernetes

### Instalación

#### Instalación del contenedor

Gracias a Kubernetes, puedes aprovechar los DaemonSets para desplegar automáticamente el Datadog Agent en todos los nodos (o en nodos específicos mediante nodeSelectors).

*Si no puedes usar DaemonSets en tu clúster Kubernetes, [instala el Datadog Agent][4] como un despliegue en cada uno de los nodos Kubernetes.*

Si tu Kubernetes tiene habilitada la configuración del control de acceso basado en roles (RBAC), descubre cómo configurar los permisos correspondientes con la [integración de Kubernetes con Datadog][5].

* Crea el siguiente manifiesto `dd-agent.yaml`:

```yaml

apiVersion: extensions/v1beta1
metadata:
  name: dd-agent
spec:
  template:
    metadata:
      labels:
        app: dd-agent
      name: dd-agent
    spec:
      containers:
      - image: gcr.io/datadoghq/docker-dd-agent:latest
        imagePullPolicy: Always
        name: dd-agent
        ports:
          - containerPort: 8125
            name: dogstatsdport
            protocol: UDP
        env:
          - name: API_KEY
            value: "DATADOG_API_KEY"
          - name: KUBERNETES
            value: "yes"
        volumeMounts:
          - name: dockersocket
            mountPath: /var/run/docker.sock
          - name: procdir
            mountPath: /host/proc
            readOnly: true
          - name: cgroups
            mountPath: /host/sys/fs/cgroup
            readOnly: true
      volumes:
        - hostPath:
            path: /var/run/docker.sock
          name: dockersocket
        - hostPath:
            path: /proc
          name: procdir
        - hostPath:
            path: /sys/fs/cgroup
          name: cgroups
```

Sustituye `DATADOG_API_KEY` por [tu clave de API][6] o usa los [secretos de Kubernetes][7] para configurar tu clave de API [como una variable de entorno][8].

* Despliega el DaemonSet con el siguiente comando:
  ```shell
  kubectl create -f dd-agent.yaml
  ```

**Nota**: Este manifiesto activa Autodiscovery, la función de configuración automática. Para desactivarla, elimina la definición de la variable de entorno `SD_BACKEND`. Para aprender a configurar Autodiscovery, consulta la [documentación acerca de Autodiscovery][9].

#### Instalación del host

Instala el paquete `dd-check-kubernetes` manualmente o mediante tu gestor de configuración favorito.

### Configuración

Edita el archivo `kubernetes.yaml` para dirigirlo hacia tu servidor y tu puerto, y configura los nodos maestros de la monitorización:

```yaml

instances:
    host: localhost
    port: 4194
    method: http
```

Consulta el [kubernetes.yaml de ejemplo][10] para descubrir todas las opciones de configuración disponibles.

### Validación

#### Contenedor en ejecución

Para verificar que el Datadog Agent funciona en tu entorno como un DaemonSet, ejecuta lo siguiente:

```shell
kubectl get daemonset
```

Si el Agent está desplegado, se mostrará un resultado similar al siguiente, donde **desired** (previstos) y **current** (actuales) corresponden al número de nodos que se están ejecutando en tu clúster.

```text
NAME       DESIRED   CURRENT   NODE-SELECTOR   AGE
dd-agent   3         3         <none>          11h
```

#### Check del Agent en ejecución

[Ejecuta el subcomando `info` del Agent][11] y busca `kubernetes` en la sección Checks:

```text
Checks
======
    kubernetes
    -----------
      - instance #0 [OK]
      - Collected 39 metrics, 0 events & 7 service checks
```

## Configurar el estado de Kubernetes

### Instalación

#### Instalación del contenedor

Si operas con versiones de Kubernetes posteriores a la 1.2.0, puedes usar el proyecto [kube-state-metrics][12] para proporcionar métricas adicionales (las cuales se identifican mediante el prefijo `kubernetes_state` de la lista de métricas de abajo) para Datadog.

Para ejecutar métricas kube-state-metrics, crea un archivo `kube-state-metrics.yaml` utilizando el siguiente manifiesto para desplegar el servicio kube-state-metrics:

```yaml
apiVersion: extensions/v1beta1
metadata:
  name: kube-state-metrics
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: kube-state-metrics
    spec:
      containers:
      - name: kube-state-metrics
        image: gcr.io/google_containers/kube-state-metrics:v1.2.0
        ports:
        - name: metrics
          containerPort: 8080
        resources:
          requests:
            memory: 30Mi
            cpu: 100m
          limits:
            memory: 50Mi
            cpu: 200m
---
apiVersion: v1
metadata:
  annotations:
    prometheus.io/scrape: 'true'
  labels:
    app: kube-state-metrics
  name: kube-state-metrics
spec:
  ports:
  - name: metrics
    port: 8080
    targetPort: metrics
    protocol: TCP
  selector:
    app: kube-state-metrics
```

Luego, ejecuta esto para llevar a cabo el despliegue:

```shell
kubectl create -f kube-state-metrics.yaml
```

El manifiesto anterior utiliza el contenedor `kube-state-metrics` público de Google, que también está disponible en [Quay][13]. Si quieres crearlo manualmente, consulta la [documentación oficial del proyecto][12].

Si configuras tu servicio Kubernetes State Metrics para que se ejecute en una URL o puerto diferentes, puedes configurar el Datadog Agent estableciendo el parámetro `kube_state_url` en `conf.d/kubernetes_state.yaml` y, luego, reiniciar el Agent.
Para obtener más información, consulta el [archivo kubernetes_state.yaml.example][14]. Si has habilitado [Autodiscovery][9], la URL de estado de Kubernetes se configura y se gestiona automáticamente.

#### Instalación del host

Instala el paquete `dd-check-kubernetes_state` manualmente o mediante tu gestor de configuración favorito. (En CentOS/AWS, descarga el [paquete rpm][15] y consulta las [instrucciones de instalación][16].
Luego, edita el archivo `kubernetes_state.yaml` para que se dirija a tu servidor y a tu puerto, y configura los nodos maestros de la monitorización. Para descubrir todas las opciones de configuración, consulta el [kubernetes_state.yaml de ejemplo][14].

### Validación

#### Validación del contenedor

Para verificar que el Datadog Agent funciona en tu entorno como un DaemonSet, ejecuta lo siguiente:

```shell
kubectl get daemonset
```

Si el Agent está desplegado, recibirás un resultado similar al siguiente, donde **desired** (previstos) y **current** (actuales) son iguales al número de nodos que se están ejecutando en tu clúster.

```bash
NAME       DESIRED   CURRENT   NODE-SELECTOR   AGE
dd-agent   3         3         <none>          11h
```

#### Validación del check del Agent

[Ejecuta el subcomando info del Agent][11] y busca `kubernetes_state` en la sección Checks:

```bash
Checks
======
    kubernetes_state
    -----------
      - instance #0 [OK]
      - Collected 39 metrics, 0 events & 7 service checks
```

## Configurar el DNS de Kubernetes

### Instalación

Instala el paquete `dd-check-kube_dns` manualmente o mediante tu gestor de configuración favorito.

### Configuración

Edita el archivo `kube_dns.yaml` para que se dirija a tu servidor y a tu puerto, y configura los nodos maestros de la monitorización. Consulta el [kube_dns.yaml de ejemplo][17] para descubrir todas las opciones de configuración disponibles.

#### Usar la detección de servicios

Si estás usando un pod `dd-agent` por cada nodo worker de Kubernetes, puedes usar las siguientes anotaciones en tu pod kube-dns para recuperar los datos automáticamente.

```yaml

apiVersion: v1
metadata:
  annotations:
    service-discovery.datadoghq.com/kubedns.check_names: '["kube_dns"]'
    service-discovery.datadoghq.com/kubedns.init_configs: '[{}]'
    service-discovery.datadoghq.com/kubedns.instances: '[[{"prometheus_endpoint":"http://%%host%%:10055/metrics", "tags":["dns-pod:%%host%%"]}]]'
```

**Notas:**

* Observa cómo la etiqueta "dns-pod" hace un seguimiento de la IP del pod de DNS de destino. Las otras etiquetas están relacionadas con el `dd-agent` que sondea la información utilizando el servicio de detección.
* Las anotaciones del servicio de detección deben aplicarse al pod. Si vas a hacer un despliegue, añade las anotaciones a los metadatos de las especificaciones de la plantilla.

### Validación

[Ejecuta el subcomando info del Agent][11] y busca `kube_dns` en la sección Checks:

```bash
Checks
======
    kube_dns
    -----------
      - instance #0 [OK]
      - Collected 39 metrics, 0 events & 7 service checks
```

[1]: https://github.com/DataDog/docker-dd-agent
[2]: https://gcr.io/datadoghq/docker-dd-agent
[3]: /es/#host-setup
[4]: /es/integrations/docker_daemon/
[5]: /es/agent/kubernetes/
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://kubernetes.io/docs/concepts/configuration/secret
[8]: https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables
[9]: /es/getting_started/agent/autodiscovery/
[10]: https://github.com/DataDog/integrations-core/blob/master/kubernetes/datadog_checks/kubernetes/data/conf.yaml.example
[11]: /es/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/kubernetes/kube-state-metrics
[13]: https://quay.io/coreos/kube-state-metrics
[14]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example
[15]: https://yum.datadoghq.com/stable/6/x86_64
[16]: /es/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
[17]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/conf.yaml.example
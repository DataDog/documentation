---
aliases:
- /es/agent/kubernetes/appsec
- /es/security/application_security/setup/kubernetes/appsec-injector
description: Habilite automáticamente App and API Protection para sus ingress proxies
  y gateways de Kubernetes
further_reading:
- link: /containers/kubernetes/apm/
  tag: Documentación
  text: Recopile las trazas de su aplicación
- link: /containers/kubernetes/log/
  tag: Documentación
  text: Recopile los registros de su aplicación
- link: /security/application_security/setup/kubernetes/envoy-gateway
  tag: Documentación
  text: App and API Protection para Envoy Gateway
- link: /security/application_security/setup/kubernetes/istio
  tag: Documentación
  text: App and API Protection para Istio
- link: /security/application_security/setup/nginx/ingress-controller
  tag: Documentación
  text: App and API Protection para ingress-nginx
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API listas para usar
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
site_support_id: containers_kubernetes_appsec
title: App and API Protection para Kubernetes
---
Esta página describe cómo configurar [App and API Protection][11] para Kubernetes a fin de configurar automáticamente los ingress proxies y gateways de Kubernetes compatibles para ejecutar el descubrimiento de API, la detección de amenazas y el bloqueo en línea en el borde de la infraestructura.

## Descripción general {#overview}

App and API Protection para Kubernetes configura automáticamente los ingress proxies y gateways compatibles en su clúster de Kubernetes para habilitar el monitoreo de seguridad de aplicaciones. Esto elimina la necesidad de una configuración manual del proxy y proporciona una cobertura de seguridad para toda la API sin modificar servicios individuales ni implementar rastreadores en toda su flota de aplicaciones.

### ¿Qué realiza la configuración automática? {#what-performs-the-automatic-configuration}

App and API Protection para Kubernetes utiliza un controlador de Kubernetes (que se ejecuta en el Datadog Cluster Agent) que:
- **Detecta automáticamente** los proxies compatibles en su clúster
- **Configura los proxies** para enrutar el tráfico a través de un procesador de seguridad de aplicaciones externo
- **Habilita la detección de amenazas** para todo el tráfico que pasa a través de su capa de entrada
- **Simplifica las operaciones** mediante la configuración centralizada con Helm

### Proxies compatibles {#supported-proxies}

Para obtener la lista de proxies compatibles y los pasos de configuración específicos para cada proxy, consulte la [página de configuración][10].

## Limitaciones {#limitations}

### Modo sidecar {#sidecar-mode}
- Requiere Datadog Cluster Agent 7.80.2 o posterior
- Cada pod de gateway ejecuta su propia instancia de procesador, lo que aumenta el uso de recursos por pod

### Modo externo {#external-mode}
- Requiere Datadog Cluster Agent 7.80.2 o posterior
- El procesador de seguridad debe implementarse y escalarse manualmente
- El servicio implementado puede requerir una política de red adecuada:
  - Desde los pods de proxy en el puerto de servicio
  - Hacia el Datadog Agent para trazas

### Compatibilidad de proxy {#proxy-compatibility}
- Para conocer la compatibilidad de la versión del proxy, consulte la [documentación de compatibilidad][8].

## Requisitos previos {#prerequisites}

Antes de habilitar App and API Protection para Kubernetes, verifique que tenga:

- Un clúster de Kubernetes en ejecución (versión 1.20 o posterior)
- [Datadog Cluster Agent 7.80.2 o posterior][1] instalado y configurado en su clúster
- Uno o más [proxies compatibles][10] instalados
- [Remote Configuration][4] habilitado para permitir el bloqueo de atacantes a través de la interfaz de usuario de Datadog

## Cómo funciona {#how-it-works}

App and API Protection para Kubernetes admite dos modos de implementación:

- **Modo sidecar** (predeterminado): El procesador de Application Security se ejecuta como un contenedor sidecar inyectado directamente en cada pod de gateway. No se necesita una implementación de procesador por separado, y el procesador se escala automáticamente con sus pods de gateway.
- **Modo externo**: Una única implementación centralizada del procesador de Application Security sirve a todo el tráfico de gateway en su clúster. Utilice este modo cuando desee administrar un procesador compartido para todo el clúster.

Para configurar el modo sidecar predeterminado, consulte [Configurar el modo sidecar](#set-up-sidecar-mode). Para implementar un procesador centralizado en su lugar, consulte [Configurar el modo externo](#set-up-external-mode).

## Configure el modo sidecar {#set-up-sidecar-mode}

En el modo sidecar, el procesador de seguridad se ejecuta como un contenedor inyectado directamente en cada pod de gateway. El Datadog Cluster Agent maneja la inyección automáticamente, por lo que no necesita una implementación o servicio de procesador independiente.

### Cuándo usar el modo sidecar {#when-to-use-sidecar-mode}

- Prefiere no administrar un despliegue y servicio de procesador independiente
- Desea que el procesador esté ubicado junto con cada pod de gateway

### Configuración {#setup}

{{< tabs >}}
{{% tab "Helm" %}}

Agregue lo siguiente a su `values.yaml`. No se necesitan valores `processor.service.*` porque el inyector maneja el despliegue del procesador automáticamente.

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      # mode defaults to "sidecar" when omitted
```

Instale o actualice el gráfico de Helm de Datadog (versión 3.153 o posterior):

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Esta opción requiere la versión 1.27.1 o posterior de Datadog Operator.

Agregue anotaciones a su recurso `DatadogAgent`. El modo sidecar es el predeterminado, por lo que habilitar el inyector es suficiente:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/appsec.injector.enabled: "true"
```

Aplique la configuración:

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{< /tabs >}}

### Referencia de configuración de sidecar {#sidecar-configuration-reference}

Todos los parámetros de sidecar están disponibles como valores de Helm anidados bajo `datadog.appsec.injector.sidecar`, o como anotaciones `DatadogAgent` (versión 1.27.1 o posterior de Datadog Operator):

`sidecar.image`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.image`
: **Tipo**: Cadena
: **Predeterminado**: `ghcr.io/datadog/dd-trace-go/service-extensions-callout`
: **Descripción**: Imagen del contenedor sidecar

`sidecar.imageTag`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.image_tag`
: **Tipo**: Cadena
: **Predeterminado**: `v2.6.0`
: **Descripción**: Etiqueta de imagen del contenedor sidecar

`sidecar.port`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.port`
: **Tipo**: Entero
: **Predeterminado**: `8080`
: **Descripción**: Puerto de escucha gRPC para el procesador sidecar

`sidecar.healthPort`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.health_port`
: **Tipo**: Entero
: **Predeterminado**: `8081`
: **Descripción**: Puerto de verificación de estado para el procesador sidecar

`sidecar.bodyParsingSizeLimit`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.body_parsing_size_limit`
: **Tipo**: Entero
: **Predeterminado**: `0`
: **Descripción**: Tamaño máximo del cuerpo de la solicitud en bytes a procesar. `0` deshabilita el procesamiento del cuerpo. Use `-1` para deshabilitar el parseo del cuerpo por completo.

`sidecar.resources.requests.cpu`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.resources.requests.cpu`
: **Tipo**: Cadena
: **Predeterminado**: `10m`
: **Descripción**: Solicitud de CPU para el contenedor sidecar

`sidecar.resources.requests.memory`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.resources.requests.memory`
: **Tipo**: Cadena
: **Predeterminado**: `128Mi`
: **Descripción**: Solicitud de memoria para el contenedor sidecar

`sidecar.resources.limits.cpu`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.resources.limits.cpu`
: **Tipo**: Cadena
: **Predeterminado**: `""`
: **Descripción**: Límite de CPU para el contenedor sidecar (opcional)

`sidecar.resources.limits.memory`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.sidecar.resources.limits.memory`
: **Tipo**: Cadena
: **Predeterminado**: `""`
: **Descripción**: Límite de memoria para el contenedor sidecar (opcional)

## Configure el modo externo {#set-up-external-mode}

En el modo externo, usted implementa un procesador de Application Security único y centralizado que atiende todo el tráfico de gateway en su clúster. El Datadog Cluster Agent configura automáticamente sus proxies compatibles para dirigir el tráfico a este procesador.

### Arquitectura {#architecture}

-  **Despliegue del procesador de Application Security**: Usted implementa un procesador de Application Security centralizado como un despliegue de Kubernetes con un servicio asociado.
-  **Detección automática de proxies**: El controlador hace un seguimiento de los recursos de proxies compatibles en su clúster utilizando informers de Kubernetes.
-  **Configuración automática**: Cuando se detectan proxies, el controlador crea la configuración de proxy necesaria para dirigir el tráfico al servicio del procesador de seguridad.
-  **Procesamiento de tráfico**: Los gateways dirigen el tráfico al procesador de seguridad a través del servicio de Kubernetes para su análisis de seguridad.

### Beneficios {#benefits}

- **Eficiente en recursos**: Un único procesador compartido maneja el tráfico de todos los gateways
- **Gestión centralizada**: Una implementación para hacer un seguimiento, escalar y configurar
- **Infraestructura como código**: Gestione la configuración a través de valores de Helm
- **No invasivo**: No se requieren cambios en el código de la aplicación
- **Escalable**: Agregue nuevos gateways sin configuración adicional

### Paso 1: Implemente el procesador de seguridad {#step-1-deploy-the-security-processor}

Implemente el servicio del procesador de seguridad, el cual analiza el tráfico reenviado desde sus gateways. Para obtener detalles de implementación específicos del proxy, consulte la [documentación de configuración][10] de su proxy.

Ejemplo de implementación:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: datadog
spec:
  replicas: 2
  selector:
    matchLabels:
      app: datadog-aap-extproc
  template:
    metadata:
      labels:
        app: datadog-aap-extproc
    spec:
      containers:
      - name: datadog-aap-extproc-container
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.4.0
        ports:
        - name: grpc
          containerPort: 443
        - name: health
          containerPort: 80
        env:
        # Use the address of the datadog agent service in your cluster
        - name: DD_AGENT_HOST
          value: "datadog-agent.datadog.svc.cluster.local"

        - name: DD_SERVICE_EXTENSION_TLS
          value: "false"
        readinessProbe:
          httpGet:
            path: /
            port: health
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /
            port: health
          initialDelaySeconds: 15
          periodSeconds: 20
---
apiVersion: v1
kind: Service
metadata:
  name: datadog-aap-extproc-service
  namespace: datadog
spec:
  ports:
  - name: grpc
    port: 443
    targetPort: grpc
  selector:
    app: datadog-aap-extproc
  type: ClusterIP
```

Aplique el manifiesto:

```bash
kubectl apply -f datadog-aap-extproc-service.yaml
```

### Paso 2: Habilite la configuración automática {#step-2-enable-automatic-configuration}

Apunte el Datadog Cluster Agent a su servicio de procesador de seguridad usando Helm o el Datadog Operator.

**Nota:** El nombre del servicio del procesador (`datadog-aap-extproc-service`) debe coincidir con el servicio que implementó en el Paso 1.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Esta opción requiere la versión 1.27.1 o posterior de Datadog Operator.

Agregue anotaciones a su recurso `DatadogAgent`. La anotación del nombre del servicio es obligatoria y debe coincidir con su servicio de procesador de seguridad:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/appsec.injector.enabled: "true"
    agent.datadoghq.com/appsec.injector.mode: "external"
    agent.datadoghq.com/appsec.injector.processor.service.name: "datadog-aap-extproc-service"  # Required: must match your security processor service name
    agent.datadoghq.com/appsec.injector.processor.service.namespace: "datadog"
```

Aplique la configuración:

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Configure App and API Protection para Kubernetes usando valores de Helm. Agregue lo siguiente a su `values.yaml`:

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      mode: "external"
      processor:
        service:
          name: datadog-aap-extproc-service  # Required: must match your security processor service name
          namespace: datadog                 # Must match the namespace where the service is deployed
```

Instale o actualice el gráfico de Helm de Datadog (versión 3.153 o posterior):

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

### Paso 3: Verifique la instalación {#step-3-verify-the-installation}

Verifique que el Cluster Agent haya detectado sus proxies:

```bash
kubectl logs -n datadog deployment/datadog-cluster-agent | grep appsec
```

#### Verifique la configuración de proxy {#verify-proxy-configuration}

Verifique que el controlador haya creado los recursos de configuración de proxy para su proxy. Para comandos de verificación específicos del proxy, consulte la [documentación de configuración][10] de su proxy.

El Datadog Cluster Agent genera eventos para cada operación que resulta en fallo o éxito realizada en el clúster.

#### Pruebe el procesamiento de tráfico {#test-traffic-processing}

Envíe solicitudes a través de su puerta de enlace y verifique que aparezcan en la interfaz de usuario de [App and API Protection][5] de Datadog:

1. Navegue a [Security > Application Security][5] en Datadog.
2. Busque señales de seguridad del tráfico de su puerta de enlace.
3. Verifique que la detección de amenazas esté activa.

## Referencia de configuración {#configuration-reference}

### Opciones de configuración automática {#automatic-configuration-options}

`enabled`
: **Anotación del Datadog Operator**: `agent.datadoghq.com/appsec.injector.enabled`
: **Tipo**: Booleano
: **Predeterminado**: `false`
: **Descripción**: Habilitar o deshabilitar la integración

`mode`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.injector.mode`
: **Tipo**: Cadena
: **Predeterminado**: `""`; cuando está vacío, el valor predeterminado es sidecar
: **Descripción**: Modo de inyección: `"sidecar"` o `"external"`

`autoDetect`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.injector.autoDetect`
: **Tipo**: Booleano
: **Predeterminado**: `true`
: **Descripción**: Detectar y configurar automáticamente los proxies admitidos

`proxies`
: **Anotación del Datadog Operator**: `agent.datadoghq.com/appsec.injector.proxies`
: **Tipo**: Matriz JSON
: **Predeterminado**: `[]`
: **Descripción**: Lista manual de tipos de proxy a configurar. Para obtener valores válidos, consulte la [página de configuración][10].

`processor.service.name`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.injector.processor.service.name`
: **Tipo**: Cadena
: **Predeterminado**: Ninguno
: **Descripción**: **Requerido.** Nombre del servicio de seguridad de Kubernetes

`processor.service.namespace`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.injector.processor.service.namespace`
: **Tipo**: Cadena
: **Predeterminado**: De forma predeterminada, el espacio de nombres es aquel donde se ejecuta el Cluster Agent
: **Descripción**: Espacio de nombres donde se despliega el servicio del procesador de seguridad

`processor.address`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.injector.processor.address`
: **Tipo**: Cadena
: **Predeterminado**: `{service.name}.{service.namespace}.svc`
: **Descripción**: Anulación de la dirección completa del servicio

`processor.port`
: **Anotación de Datadog Operator**: `agent.datadoghq.com/appsec.injector.processor.port`
: **Tipo**: Entero
: **Predeterminado**: `443`
: **Descripción**: Puerto del servicio del procesador de seguridad

### Actualización desde el modo externo {#upgrading-from-external-mode}

Si está actualizando desde una versión anterior que utilizaba el modo externo, el modo predeterminado ha cambiado a sidecar. Para seguir usando el modo externo, configure explícitamente `mode: "external"` en sus valores de Helm:

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      mode: "external"
      processor:
        service:
          name: datadog-aap-extproc-service
          namespace: datadog
```

### Exclusión de recursos específicos {#opting-out-specific-resources}

Puede excluir recursos específicos de Gateway o GatewayClass de la configuración automática agregando una etiqueta:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: my-gateway
  namespace: my-namespace
  labels:
    appsec.datadoghq.com/enabled: "false"  # Exclude this gateway from automatic configuration
spec:
  # ... gateway configuration
```

Los recursos con la etiqueta `appsec.datadoghq.com/enabled: "false"` son ignorados. Esto es útil cuando desea:
- Configurar manualmente gateways específicos
- Deshabilitar temporalmente la protección de aplicaciones y API para realizar pruebas
- Excluir ciertos gateways del monitoreo de seguridad

**Nota**: De forma predeterminada, todos los recursos están incluidos. Solo se excluyen los recursos con la etiqueta establecida explícitamente en `"false"`.

## Solución de problemas {#troubleshooting}

Todos los errores se registran como eventos de Kubernetes. Busque eventos en el Gateway o GatewayClass que desea instrumentar.

### La configuración automática no detecta proxies {#automatic-configuration-not-detecting-proxies}

**Síntoma**: No se crean recursos de configuración de proxy.

**Soluciones**:
- Verifique que `autoDetect` esté configurado en `true` o que los proxies estén especificados manualmente
- Verifique los registros del Cluster Agent para ver mensajes de detección de proxy
- Verifique que sus proxies estén instalados y tengan los recursos de Kubernetes esperados (Gateway, GatewayClass)
- Intente especificar manualmente los tipos de proxy usando el parámetro `proxies`

### Configuración de proxy no creada {#proxy-configuration-not-created}

**Síntoma**: El controlador está en ejecución pero faltan recursos de configuración.

**Soluciones**:
- Verifique los registros del Agente de clúster en busca de errores de permisos RBAC
- Verifique que la cuenta de servicio del Agente de clúster tenga permisos para crear los recursos de configuración de proxy
- Verifique que el servicio del procesador exista y sea accesible
- Verifique si existen políticas o filtros conflictivos

### Tráfico no procesado {#traffic-not-being-processed}

**Síntoma**: No aparecen eventos de seguridad en la interfaz de usuario de Datadog.

**Soluciones**:
- Verifique que la implementación del procesador de seguridad esté en ejecución: `kubectl get pods -n datadog -l app=datadog-aap-extproc`
- Busque registros de advertencia en sus proxies inversos relacionados con esta parte de la configuración.
- Verifique los registros del procesador en busca de errores de conexión: `kubectl logs -n datadog -l app=datadog-aap-extproc`
- Verifique que el servicio del procesador esté configurado correctamente y sea resoluble
- Pruebe la conectividad desde los pods de puerta de enlace al servicio del procesador
- Verifique que [Remote Configuration][4] esté habilitado en su Datadog Agent

### Problemas de conexión del procesador de seguridad {#security-processor-connection-issues}

**Síntoma**: Las puertas de enlace no pueden comunicarse con el procesador de seguridad.

**Soluciones**:
- Verifique que el nombre del servicio del procesador y el espacio de nombres coincidan con su configuración
- Verifique si hay reglas de NetworkPolicy que bloqueen el tráfico entre espacios de nombres
- Pruebe la resolución de DNS desde los pods de gateway: `nslookup datadog-aap-extproc-service.datadog.svc.cluster.local`
- Verifique que la configuración del puerto del procesador coincida con la definición del servicio

### Errores de permisos de RBAC {#rbac-permission-errors}

**Síntoma**: Los registros del Agente de clúster muestran errores de permiso denegado.

**Soluciones**:
- Verifique que el clúster Agent ClusterRole incluya permisos para:
  - `gateway.networking.k8s.io/gateways`
  - `gateway.networking.k8s.io/gatewayclasses`
- Verifique que el ClusterRoleBinding haga referencia a la cuenta de servicio correcta
- Asegúrese de estar utilizando la versión más reciente del Helm Chart o del Operador de Datadog.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/kubernetes/installation/
[4]: /es/agent/remote_config/?tab=helm#enabling-remote-configuration
[5]: https://app.datadoghq.com/security/appsec
[8]: /es/security/application_security/setup/compatibility/
[10]: /es/security/application_security/setup/kubernetes/
[11]: /es/security/application_security/
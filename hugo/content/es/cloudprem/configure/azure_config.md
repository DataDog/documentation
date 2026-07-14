---
description: Aprende a configurar Azure para CloudPrem
further_reading:
- link: /cloudprem/install/azure_aks/
  tag: Documentación
  text: Instalar CloudPrem en Azure AKS
- link: /cloudprem/ingest_logs/
  tag: Documentación
  text: Configurar la ingesta de logs
title: Configuración de Azure
---

## Información general

Antes de instalar CloudPrem en Azure, debes configurar un conjunto de recursos de infraestructura de soporte. Estos componentes proporcionan los servicios básicos de computación, almacenamiento, bases de datos y redes de los que depende CloudPrem. Esta documentación describe todos los recursos que debes configurar en tu cuenta de Azure antes de continuar con los pasos de instalación descritos en la [Guía de instalación de Azure AKS][1].

### Requisitos de infraestructura
Estos son los componentes que debes aprovisionar:

- [**Azure Kubernetes Service (AKS)**](#azure-kubernetes-service-aks): un clúster de AKS en ejecución dimensionado para tu carga de trabajo prevista en CloudPrem.
- [**PostgreSQL Flexible Server**](#azure-postgresql-flexible-server): una instancia de Azure Database para PostgreSQL que CloudPrem utilizará para almacenar sus metadatos.
- [**Contenedor de Blob Storage**](#blob-storage-container): un contenedor de Azure Storage para alojar logs de CloudPrem.
- [Identidad y permisos del cliente**](#client-identity-and-permissions): una aplicación de Azure AD con acceso de lectura/escritura al contenedor de almacenamiento.
- [**NGINX Ingress Controller**](#NGINX-ingress-controller): instalado en el clúster de AKS para enrutar el tráfico externo a los servicios de CloudPrem.
- **Datadog Agent**: desplegado en el clúster de AKS para recopilar y enviar logs a CloudPrem.

## Azure Kubernetes Service (AKS)

CloudPrem se ejecuta íntegramente en Kubernetes. Necesitas un clúster de AKS con suficiente CPU, memoria y espacio en disco configurado para tu carga de trabajo. Consulta las recomendaciones de dimensionamiento de clústeres de Kubernetes para obtener orientación.

### Despliegue del clúster de AKS

- [Despliegue de un clúster de AKS con la CLI de Azure][2]
- [Despliegue de un clúster de AKS con Terraform][3]

### Verificar la conectividad y el estado del clúster
Para confirmar que se puede acceder al clúster y que los nodos están en el estado `Ready`, ejecuta el siguiente comando:
```shell
kubectl get nodes -o wide
```

## Azure PostgreSQL Flexible Server

CloudPrem almacena sus metadatos y configuración en una base de datos PostgreSQL. Datadog recomienda Azure Database for PostgreSQL Flexible Server. Debe ser accesible desde el clúster de AKS, idealmente con la red privada habilitada. Consulta las recomendaciones de tamaño de Postgres para obtener más detalles.

### Crear la base de datos PostgreSQL

- [Crear una base de datos de Azure para PostgreSQL Flexible Server utilizando la CLI de Azure][4]
- [Crear una base de datos de Azure para PostgreSQL Flexible Server utilizando Terraform][5]

### Verificar la conectividad de la base de datos

<div class="alert alert-info">Por motivos de seguridad, crea una base de datos y un usuario dedicados para CloudPrem, y concede al usuario derechos solo en esa base de datos, no en todo el clúster.</div>

Conéctate a tu base de datos de PostgreSQL desde la red de AKS utilizando el cliente de PostgreSQL, `psql`. En primer lugar, inicia un pod interactivo en tu clúster de Kubernetes utilizando una imagen que incluya `psql`:
```shell
kubectl run psql-client \
  -n <NAMESPACE_NAME> \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- bash
```

A continuación, ejecuta el siguiente comando directamente desde el intérprete de comandos, sustituyendo los valores de los parámetros por los valores reales:

```shell
psql "host=<HOST> \
      port=<PORT> \
      dbname=<DATABASE> \
      user=<USERNAME> \
      password=<PASSWORD>"
```

Si tienes éxito, debes ver un mensaje similar a:
```shell
psql (15.2)
SSL connection (protocol: TLS...)
Type "help" for help.

<DATABASE>=>
```

## Contenedor de Blob Storage

CloudPrem utiliza Azure Blob Storage para persistir logs. Crea un contenedor dedicado para este fin.

### Crear un contenedor de Blob Storage
Utiliza un contenedor dedicado por entorno (por ejemplo, `cloudprem-prod`, `cloudprem-staging`) y asigna los roles RBAC con menos privilegios a nivel de contenedor, en lugar de a nivel de cuenta de almacenamiento.

- [Crear un contenedor de Blob Storage utilizando la CLI de Azure][6]
- [Crear un contenedor de Blob Storage con Terraform][7]

## Identidad y permisos del cliente

Se debe conceder a una aplicación Azure AD acceso de lectura/escritura al contenedor de Blob Storage. Registra una aplicación dedicada para CloudPrem y asigna a la entidad principal de servicio correspondiente el rol `Contributor` en el contenedor de Blob Storage creado anteriormente.

### Registrar la aplicación
[Registrar una aplicación en Microsoft Entra ID][8]

### Asignar rol de colaborador
[Asignar un rol de Azure para acceder a los datos de blob][9]

## Controlador de entrada NGINX

### Controlador de entrada NGINX público

La entrada pública es esencial para permitir que el plano de control y el servicio de consulta de Datadog gestionen y consulten los clústeres de CloudPrem a través de la Internet pública. Proporciona acceso seguro a la API gRPC de CloudPrem a través de los siguientes mecanismos:
- Crea un Azure Load Balancer orientado a Internet que acepte tráfico de los servicios de Datadog.
- Implementa el cifrado TLS con terminación a nivel de controlador de entrada.
- Utiliza HTTP/2 (gRPC) para la comunicación entre los clústeres de Datadog y CloudPrem.
- Requiere autenticación TLS mutua (mTLS), en la que los servicios de Datadog deben presentar certificados de cliente válidos.
- Configura el controlador en modo TLS passthrough para reenviar certificados de cliente a los pods de CloudPrem con el encabezado `ssl-client-cert` 
- Rechaza las solicitudes en las que falten certificados de cliente válidos o el encabezado del certificado.

Utiliza el siguiente archivo de valores Helm `NGINX-public.yaml` para crear el controlador de entrada público NGINX:

{{< code-block lang="yaml" filename="nginx-public.yaml" >}}
controller:
  electionID: public-ingress-controller-leader
  ingressClass: nginx-public
  ingressClassResource:
    name: nginx-public
    enabled: true
    default: false
    controllerValue: k8s.io/public-ingress-nginx
  service:
    type: LoadBalancer
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: /healthz
{{< /code-block >}}

A continuación, instala el controlador con Helm utilizando el siguiente comando:

```shell
helm upgrade --install nginx-public ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-public \
  --create-namespace \
  -f nginx-public.yaml
```

Comprueba que el pod del controlador está en funcionamiento:
```shell
kubectl get pods -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

Comprueba que el servicio expone una IP externa:
```shell
kubectl get svc -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

### Controlador de entrada interno NGINX

La entrada interna permite la ingesta de logs desde Datadog Agents y otros recopiladores de logs dentro de tu entorno a través de HTTP. Utiliza el siguiente archivo de valores Helm `NGINX-internal.yaml` para crear el controlador de entrada público NGINX:

{{< code-block lang="yaml" filename="nginx-internal.yaml" >}}
controller:
  electionID: internal-ingress-controller-leader
  ingressClass: nginx-internal
  ingressClassResource:
    name: nginx-internal
    enabled: true
    default: false
    controllerValue: k8s.io/internal-ingress-nginx
  service:
    type: LoadBalancer
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-internal: true
      service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: /healthz
{{< /code-block >}}

A continuación, instala el controlador con Helm utilizando el siguiente comando:

```shell
helm upgrade --install nginx-internal ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-internal \
  --create-namespace \
  -f nginx-internal.yaml
```

Comprueba que el pod del controlador está en funcionamiento:
```shell
kubectl get pods -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

Comprueba que el servicio expone una IP externa:
```shell
kubectl get svc -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

## DNS

Opcionalmente, puedes añadir una entrada DNS que apunte a la IP del equilibrador de carga público, de forma que futuros cambios de IP no requieran actualizar la configuración en el lado de Datadog.

## Siguientes pasos

Después de completar la configuración de Azure

1. **Instalar CloudPrem en Azure AKS**: sigue la [Guía de instalación de Azure AKS][1] para desplegar CloudPrem.
2. **Configurar la ingesta de logs**: configura la [ingesta de logs][10] para empezar a enviar logs a CloudPrem

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloudprem/install/azure_aks
[2]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli
[3]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-terraform?pivots=development-environment-azure-cli
[4]: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server?tabs=portal-create-flexible%2Cportal-get-connection%2Cportal-delete-resources
[5]: https://learn.microsoft.com/en-us/azure/developer/terraform/deploy-postgresql-flexible-server-database?tabs=azure-cli
[6]: https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-cli#create-a-container
[7]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container
[8]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
[9]: https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access?tabs=portal
[10]: /es/cloudprem/ingest_logs/
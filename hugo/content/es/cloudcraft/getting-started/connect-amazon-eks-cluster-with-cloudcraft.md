---
title: Conectar un clúster de Amazon EKS con Cloudcraft
---

Al analizar tus clústeres de Amazon EKS, Cloudcraft te permite generar diagramas de arquitectura del sistema para visualizar tus cargas de trabajo y pods desplegados.

Cloudcraft utiliza [entradas de acceso][1] para conceder al [rol de entidad IAM de solo lectura existente de Cloudcraft][2] acceso a la API Kubernetes. Cloudcraft no requiere ningún software especial o Agent para ser instalado en tu clúster.

<div class="alert alert-info">La capacidad de analizar cuentas de clústeres de Amazon EKS y AWS solo está disponible para los suscriptores de Cloudcraft Pro. Consulta <a href="https://www.cloudcraft.co/pricing">nuestra página de precios</a> para obtener más información.</div>

## Requisitos previos

Antes de conectar tus clústeres de Amazon EKS con Cloudcraft, debes conectar tu cuenta de AWS y generar diagramas que incluyan tus clústeres.

Para conectar tu cuenta de AWS y familiarizarte con Cloudcraft, consulta los siguientes artículos:
- [Conectar tu cuenta de AWS con Cloudcraft][3]
- [Generar mejores diagramas: Diagrama y filtrado en directo de Cloudcraft][4].

[Instala y configura `kubectl` ][6], una herramienta que te permite controlar clústeres de Kubernetes a través de la línea de comandos. Cloudcraft recomienda utilizar la última versión para evitar problemas.

Además, te recomendamos [instalar y configurar la CLI de AWS][8] para gestionar tus servicios AWS desde la línea de comandos. Al igual que en el caso de `kubectl`, Cloudcraft recomienda utilizar la última versión.

Finalmente, para poder analizar tu clúster correctamente, Cloudcraft requiere que los clústeres tengan habilitado el acceso público y que no se aplique ningún filtro de IP. La opción **Public Access Source Allow List** (Lista de autorizaciones de fuentes de acceso público) en la configuración de la red debe conservar su valor por defecto de 0.0.0.0/0.

## Crear entradas de acceso

Comienza abriendo un plano con un clúster de Amazon EKS existente o creando un nuevo plano para analizar una cuenta con clústeres de Amazon EKS.

Con tu entorno de AWS asignado a un plano, selecciona el clúster de Amazon EKS que quieres analizar, y haz clic en el botón **Enable cluster scanning** (Habilitar análisis de clústeres) que aparece en la barra de herramientas del componente.

{{< img src="cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/enable-cluster-scanning.png" alt="Diagrama interactivo de Cloudcraft que muestra un clúster de AWS EKS con el botón de Habilitar análisis de clústeres resaltado." responsive="true" style="width:100%;">}}

La siguiente pantalla proporciona comandos paso a paso para ejecutar en tu aplicación de terminal favorita.

Como creador de clústeres de Amazon EKS o usuario con acceso de administrador, ejecuta el siguiente comando para asignar el rol IAM de Cloudcraft al grupo Kubernetes `cloudcraft-view-only`:

```
aws eks create-access-entry \
  --cluster-name ${EKS_CLUSTER_NAME} \
  --principal-arn ${CLOUDCRAFT_IAM_ROLE_ARN} \
  --kubernetes-groups 'cloudcraft-view-only'
```

## Conceder acceso de sólo visualización al rol de IAM de Cloudcraft

A continuación, utiliza [ClusterRoleBinding][5] para vincular el rol IAM a un rol Kubernetes.

Un ClusterRoleBinding concede permisos definidos en un rol a un usuario o conjunto de usuarios en todos los espacios de nombres de un clúster. Kubernetes define algunos roles predeterminados al usuario. Para Cloudcraft, utiliza el rol predefinido "view" que permite el acceso de sólo visualización a la mayoría de los objetos en un espacio de nombres.

Introduce el siguiente comando multilínea para crear el ClusterRoleBinding y conceder permiso de sólo visualización a los usuarios del grupo **cloudcraft-view-only**.

```
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cloudcraft-view-only
subjects:
  - kind: Group
    name: cloudcraft-view-only
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: view
  apiGroup: rbac.authorization.k8s.io
EOF
```

## Test de acceso al clúster

Para testear que Cloudcraft puede acceder al clúster, haz clic en **Test cluster access** (Test de acceso al clúster) en la parte inferior de la pantalla **Enable Kubernetes Cluster Scanning** (Habilitar el análisis de clústeres de Kubernetes).

{{< img src="cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/test-cluster-access.png" alt="Interfaz de Cloudcraft que muestra la configuración del rol de clúster de Kubernetes con el botón 'Test Cluster Access' (Test de acceso al clúster) señalado con una flecha." responsive="true" style="width:100%;">}}

Para analizar otros clústeres, repite el proceso tantas veces como sea necesario.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/access-entries.html
[2]: /es/cloudcraft/faq/how-cloudcraft-connects-to-aws/
[3]: /es/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[4]: /es/cloudcraft/getting-started/crafting-better-diagrams/
[5]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding
[6]: https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html
[7]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#default-roles-and-role-bindings
[8]: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
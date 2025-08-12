---
title: Conectar un clúster de Amazon EKS con Cloudcraft
---

Al escanear tus clústeres de Amazon EKS, Cloudcraft te permite generar diagramas de arquitectura del sistema para visualizar tus cargas de trabajo y pods desplegados.

Cloudcraft utiliza el método de autorización [control de acceso basado en roles (RBAC) proporcionado por Kubernetes][1] para autorizar [el rol de entidad de IAM de sólo lectura existente de Cloudcraft][2]. Esto significa que Cloudcraft no requiere ningún software especial o Agent.

Para obtener más información sobre la configuración de RBAC y las entidades de IAM, consulta [Gestión de usuarios o roles de IAM para tu clúster][3].

<div class="alert alert-info">La capacidad de escanear cuentas de clústeres de Amazon EKS y AWS sólo está disponible para los suscriptores de Cloudcraft Pro. Consulta <a href="https://www.cloudcraft.co/pricing">nuestra página de precios</a> para obtener más información.</div>

## Requisitos previos

Antes de conectar tus clústeres de Amazon EKS con Cloudcraft, debes conectar tu cuenta de AWS y generar diagramas que incluyan tus clústeres.

Para conectar tu cuenta de AWS y familiarizarte con Cloudcraft, consulta los siguientes artículos:
- [Conecta tu cuenta de AWS con Cloudcraft][4]
- [Crea tu primer diagrama de AWS en directo][5]

[Instala y configura `kubectl`][7], una herramienta que te permite controlar clústeres de Kubernetes a través de la línea de comandos. Cloudcraft recomienda utilizar la última versión para evitar problemas.

Además, para poder escanear tu clúster con éxito, Cloudcraft requiere que los clústeres tengan habilitado el acceso público y que no se aplique ningún filtro de IP. La opción **Public Access Source Allow List** (Lista de fuentes de acceso público permitidas) en la configuración de red debe permanecer en su valor por defecto de 0.0.0.0/0.

## Autorizar el rol IAM de Cloudcraft para sólo visualización

Comienza abriendo un plano con un clúster de Amazon EKS existente o utilizando la función **Auto Layout** (Diseño automático) para generar un nuevo plano.

Con tu entorno de AWS asignado a un plano, selecciona el clúster de Amazon EKS que deseas escanear, y haz clic en el botón **Enable cluster scanning** (Habilitar escaneo de clúster) que aparece en la barra de herramientas del componente.

{{< img src="cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/enable-cluster-scanning.png" alt="Diagrama interactivo de Cloudcraft que muestra un clúster de AWS EKS con el botón de Habilitar escaneo de clúster resaltado." responsive="true" style="width:100%;">}}

La siguiente pantalla proporciona comandos paso a paso para ejecutar en el Terminal.

Como creador del clúster de Amazon EKS o usuario con acceso de administrador, abre el archivo AWS-auth ConfigMap con `kubectl`.

```
kubectl edit -n kube-system configmap/aws-auth
```

Con el archivo `aws-auth.yaml` abierto en un editor de texto, añade los detalles del rol a la sección *mapRoles* del archivo, justo después de la sección *data*.

```
data:
  mapRoles: |
    - rolearn: <arn-for-the-readonly-cloudcraft-iam-role>
      groups:
        - cloudcraft-view-only
```

Si la sección no existe, añádela. Una vez hecho esto, guarda el archivo y sal de la sección.

<div class="alert alert-info">`groups` se refieren a los grupos de clústeres a los que se asigna el rol. Para obtener más información, consulta [Default Roles and Role Bindings][8] en la documentación de Kubernetes.</div>

<div class="alert alert-danger">Los errores tipográficos y de sintaxis pueden afectar a los permisos de todos los usuarios y roles de IAM actualizados en el archivo ConfigMap. Para evitar que esto ocurra, Cloudcraft recomienda añadir un linter de YAML a tu editor de texto.</div>

## Conceder acceso de sólo visualización al rol de IAM de Cloudcraft

A continuación, utiliza [ClusterRoleBinding][6] para vincular el rol de IAM a un rol de Kubernetes.

Un ClusterRoleBinding concede permisos definidos en un rol a un usuario o conjunto de usuarios en todos los espacios de nombres de un clúster. Kubernetes define algunos roles predeterminados al usuario. Para Cloudcraft, utiliza el rol predefinido "view" que permite el acceso de sólo visualización a la mayoría de los objetos en un espacio de nombres.

Introduce el siguiente comando multilínea para crear el ClusterRoleBinding y conceder permiso de sólo visualización a los usuarios del grupo **cloudcraft-view-only**.

```
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
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

Para testear que Cloudcraft puede acceder al clúster, haz clic en **Test cluster access** (Test de acceso al clúster) en la parte inferior de la pantalla **Enable Kubernetes Cluster Scanning** (Activar escaneo del clúster de Kubernetes).

{{< img src="cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/test-cluster-access.png" alt="Interfaz de Cloudcraft que muestra la configuración del rol de clúster de Kubernetes con el botón 'Test Cluster Access' (Test de acceso al clúster) señalado con una flecha." responsive="true" style="width:100%;">}}

Para escanear otros clústeres, repite el proceso tantas veces como sea necesario.

[1]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/
[2]: /es/cloudcraft/faq/how-cloudcraft-connects-to-aws/
[3]: https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html
[4]: /es/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[5]: /es/cloudcraft/getting-started/create-your-first-cloudcraft-diagram/
[6]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding
[7]: https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html
[8]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#default-roles-and-role-bindings
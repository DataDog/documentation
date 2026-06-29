---
title: Conectar un clúster Azure AKS con Cloudcraft
---

Al analizar tus clústeres Azure AKS, Cloudcraft te permite generar diagramas de arquitectura del sistema para ayudarte a visualizar tus cargas de trabajo y tus pods desplegados.

Cloudcraft utiliza el rol de usuario de clústeres Azure Kubernetes Service y no requiere ningún software especial o agente para observar dentro de tus clústeres.

<div class="alert alert-info">La función de análisis de clústeres Azure AKS y cuentas de Azure solo está disponible para los suscriptores de Cloudcraft Pro. Consulta la <a href="https://www.cloudcraft.co/pricing">página de precios de Cloudcraft</a> para obtener más información.</div>

## Requisitos previos

Antes de conectar tus clústeres Azure AKS con Cloudcraft, debes conectar tu cuenta de Azure y generar diagramas que incluyan tus clústeres. Para obtener más información, consulta [Conectar tu cuenta de Azure con Cloudcraft][1].

## Autorización del usuario IAM Cloudcraft para un acceso de sólo visualización

Para empezar, abre un plano con un clúster Azure AKS existente o utiliza la función **Auto Layout** (Diseño automático) para generar un nuevo plano.

Con tu entorno Azure orientado a un plano, selecciona el clúster Azure AKS que quieres analizar y haz clic en el botón **Enable cluster scanning** (Habilitar el análisis de clústeres) que aparece en la barra de herramientas del componente.

{{< img src="cloudcraft/getting-started/connect-an-azure-aks-cluster-with-cloudcraft/enable-cluster-scanning.png" alt="Diagrama interactivo de Cloudcraft que muestra un clúster Azure AKS con el botón para habilitar el análisis de clústeres resaltado." responsive="true" style="width:100%;">}}

La siguiente pantalla proporciona instrucciones paso a paso para completar en Azure.

1. Haz clic en el primer enlace para abrir tu página de suscripciones Azure y luego haz clic en **Access control (IAM)** (Control de acceso (IAM)) en la barra lateral izquierda.
2. Haz clic en **Add** (Añadir) y selecciona **Añadir asignación de roles**.
3.  Busca y selecciona **Rol de usuario de clústeres Azure Kubernetes Service**. A continuación, haz clic en **Next** (Siguiente).
4. Haz clic en **Select members** (Seleccionar miembros).
5. Busca el usuario IAM al que quieres conceder acceso a tu clúster Azure AKS (generalmente llamado cloudcraft) y haz clic en **Select** (Seleccionar).
6. Haz clic dos veces en **Review + assign** (Revisar + asignar) para completar el proceso.

## Probar el acceso al clúster

Para probar que Cloudcraft puede acceder al clúster, haz clic en **Test cluster access** (Test de acceso al clúster) en la parte inferior de la pantalla **Activar el análisis de clústeres Kubernetes**.

{{< img src="cloudcraft/getting-started/connect-an-azure-aks-cluster-with-cloudcraft/test-cluster-access.png" alt="Captura de pantalla de la interfaz de Cloudcraft para la activación del análisis de clústeres Kubernetes, con instrucciones y el botón para probar el acceso al clúster." responsive="true" style="width:100%;">}}

[1]: /es/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
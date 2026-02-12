---
description: Aprende a desplegar CloudPrem en distintas plataformas y entornos
title: Instalar CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión autoalojadas de logs.
{{< /callout >}}

## Información general

CloudPrem puede desplegarse en distintos entornos, desde servicios de Kubernetes gestionados en la nube hasta servidores sin sistema operativo. Las instrucciones de instalación proporcionadas son específicas de **Kubernetes distributions** (Distribuciones de Kubernetes).

## Requisitos previos

### Requisitos del clúster de Kubernetes

| Requisito            | Información                                                                                  |
|------------------------|------------------------------------------------------------------------------------------|
| **Kubernetes Version** (Versión de Kubernetes) | 1.25 o superior                                                                           |
| **Recommended Platforms** (Plataformas recomendadas) | - AWS EKS<br>- Google GKE<br>- Azure AKS<br>- Kubernetes autogestionado (Controlador NGINX) |
| **Metadata Storage** (Almacenamiento de metadatos)   | Base de datos PostgreSQL                                                                      |
| **Recommended PostgreSQL Options** (Opciones recomendadas de PostgreSQL) | - AWS: RDS PostgreSQL<br>- GCP: Cloud SQL para PostgreSQL<br>- Azure: Azure Database para PostgreSQL<br>- Autoalojado: PostgreSQL con almacenamiento persistente |

### Almacenamiento de objetos
CloudPrem admite los siguientes tipos de almacenamiento de objetos:
- Amazon S3
- Google Cloud Storage (GCS)
- Azure Blob Storage
- MinIO
- Ceph Object Storage
- Cualquier almacenamiento compatible con S3

## Kubernetes gestionado en la nube

{{< whatsnext desc="Select the installation guide that matches your environment:">}}
  {{< nextlink href="/cloudprem/install/aws_eks/" >}}Instalar en AWS EKS{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/azure_aks/" >}}Instalar en Azure AKS{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/docker/" >}}Instalar localmente con Docker para pruebas{{< /nextlink >}}
{{< /whatsnext >}}
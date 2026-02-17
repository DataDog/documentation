---
description: Más información sobre cómo configurar AWS para CloudPrem
further_reading:
- link: /cloudprem/install/aws_eks/
  tag: Documentación
  text: Instalar CloudPrem en AWS EKS
- link: /cloudprem/ingest_logs/
  tag: Documentación
  text: Configurar la ingesta de logs
title: Configuración de AWS
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general

Esta guía explica cómo configurar los requisitos previos de tu cuenta de AWS para el despliegue de CloudPrem. Esta configuración es necesaria antes de instalar CloudPrem en AWS EKS.

Para conocer el proceso completo de instalación de EKS, consulta la [guía de instalación de AWS EKS][1].

## Requisitos previos de AWS

Para desplegar CloudPrem en AWS, es necesario configurar:
- Credenciales y autenticación de AWS
- Selección de regiones de AWS
- Permisos IAM para el almacenamiento de objetos S3
- Base de datos PostgreSQL RDS (recomendado)
- Clúster EKS con el controlador del balanceador de carga AWS

## Credenciales de AWS

Al iniciar un nodo, CloudPrem intenta encontrar las credenciales de AWS utilizando la cadena de proveedores de credenciales implementada por [rusoto\_core::ChainProvider][2] y busca las credenciales en este orden:

1. Variables de entorno `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` o `AWS_SESSION_TOKEN` (opcional).
2. Archivo de perfiles de credenciales, normalmente ubicado en `~/.aws/credentials` o especificado por las variables de entorno `AWS_SHARED_CREDENTIALS_FILE` y `AWS_PROFILE` si están definidas y no están vacías.
3. Credenciales del contenedor de Amazon ECS, cargadas desde el contenedor de Amazon ECS si se define la variable de entorno `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI`.
4. Credenciales de perfiles de instancias, utilizadas en instancias Amazon EC2 y entregadas a través del servicio de metadatos de Amazon EC2.

Se devuelve un error si no se encuentran credenciales en la cadena.

## Región AWS

CloudPrem intenta encontrar la región AWS desde diversas fuentes, utilizando el siguiente orden de precedencia:

1. **Variables de entorno**: Comprueba `AWS_REGION`, luego `AWS_DEFAULT_REGION`.
2. **Archivo de configuración de AWS**: Normalmente se encuentra en `~/.aws/config` o en la ruta especificada por la variable de entorno `AWS_CONFIG_FILE` (si está configurada y no está vacía).
3. **Metadatos de instancia EC2**: Utiliza la región de la instancia de Amazon EC2 que se está ejecutando actualmente.
4. **Por defecto**: Vuelve a `us-east-1` si ningún otra fuente proporciona una región.

## Permisos IAM para S3

Acciones autorizadas requeridas:

* `ListBucket` (en el bucket directamente)
* `GetObject`
* `PutObject`
* `DeleteObject`
* `ListMultipartUploadParts`
* `AbortMultipartUpload`

He aquí un ejemplo de política de bucket:

```json
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Effect": "Allow",
     "Action": [
       "s3:ListBucket"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket"
     ]
   },
   {
     "Effect": "Allow",
     "Action": [
       "s3:GetObject",
       "s3:PutObject",
       "s3:DeleteObject",
       "s3:ListMultipartUploadParts",
       "s3:AbortMultipartUpload"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket/*"
     ]
   }
 ]
}
```

## Siguientes pasos

Una vez completada la configuración de AWS:

1. **Instalar CloudPrem en EKS** - Sigue la [guía de instalación de AWS EKS][1] para desplegar CloudPrem
2. **Configurar la entrada** - Configurar la [configuración de entrada][3] para el acceso externo
3. **Configurar la ingestión de logs** - Configurar la [ingestión de logs][4] para empezar a enviar logs a CloudPrem

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloudprem/install/aws_eks
[2]: https://docs.rs/rusoto_credential/latest/rusoto_credential/struct.ChainProvider.html
[3]: /es/cloudprem/configure/ingress/
[4]: /es/cloudprem/ingest_logs/
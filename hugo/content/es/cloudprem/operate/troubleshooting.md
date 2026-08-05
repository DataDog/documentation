---
aliases:
- /es/cloudprem/troubleshooting/
further_reading:
- link: /cloudprem/architecture/
  tag: Documentación
  text: Arquitectura de CloudPrem
title: Solucionar problemas
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general

Esta página proporciona orientación para la resolución de problemas comunes que puedes encontrar al desplegar o utilizar Datadog CloudPrem. Incluye mensajes de error típicos, pasos de diagnóstico y consejos para resolver problemas relacionados con los permisos de acceso, la configuración del almacenamiento y el estado de los componentes. Utiliza esta guía para diagnosticar rápidamente los problemas o para obtener contexto antes de ponerte en contacto con el [soporte de Datadog][1].


## Estado de los componentes

### Los pods no arrancan

**Comprueba los eventos del pod:**
```bash
kubectl describe pod -n datadog-cloudprem <pod-name>
```

**Problemas comunes**:
- Recursos insuficientes: comprueba la capacidad del nodo con `kubectl describe nodes`
- Errores de extracción de imágenes: verifica la conectividad de la red y la disponibilidad de la imagen
- Secreto no encontrado: verifica que existen secretos con `kubectl get secrets -n datadog-cloudprem`

## Permisos de acceso

Los errores más comunes provienen de los permisos de acceso al almacenamiento de objetos o al metastore. Para solucionar problemas, utiliza `kubectl` y verifica los logs de los componentes de CloudPrem: pods de indexadores, pods del metastore y pods de buscadores.

## Errores del metastore

### Metastore no puede conectarse a PostgreSQL

**Error**: `failed to connect to metastore: connection error: pool timed out`

**Solución**: comprueba que se puede acceder a PostgreSQL desde el clúster:
```shell
kubectl run psql-client \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- psql "host=<HOST> port=<PORT> dbname=<DATABASE> user=<USERNAME> password=<PASSWORD>"
```

Causas comunes:
- PostgreSQL no es accesible desde la red del clúster
- Las reglas del firewall están bloqueando la conexión
- Host, puerto o credenciales incorrectas en el secreto de `cloudprem-metastore-uri` 

**Error**: `failed to connect to metastore: invalid port number`

**Solución**: confirma que la contraseña en el URI del metastore está codificada en URL. Los caracteres especiales deben tener escape:
```
# Correct format
postgresql://user:abc%2Fdef%2Bghi%3D@host:5432/cloudprem

# Incorrect format (fails)
postgresql://user:abc/def+ghi=@host:5432/cloudprem
```

### Problemas con la conexión de Cloud SQL (GKE)

**Error**: `failed to connect to metastore: connection error: pool timed out`

**Solución**: verifica que las redes autorizadas de Cloud SQL incluyen IPs de nodos de GKE:
```bash
gcloud sql instances describe cloudprem-postgres \
  --format="value(settings.ipConfiguration.authorizedNetworks)"
```

Actualiza las redes autorizadas si es necesario:
```bash
export NODE_IPS=$(kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}' | tr ' ' ',')
gcloud sql instances patch cloudprem-postgres \
  --authorized-networks=${NODE_IPS} \
  --quiet
```

**Error**: `failed to connect to metastore: invalid port number`

**Solución**: confirma que la contraseña en el URI del metastore está codificada en URL. Los caracteres especiales deben tener escape:
```
# Correct format
postgresql://postgres:abc%2Fdef%2Bghi%3D@IP:5432/cloudprem

# Incorrect format (fails)
postgresql://postgres:abc/def+ghi=@IP:5432/cloudprem
```

## Errores de almacenamiento

Si estableces unas credenciales de AWS incorrectas, verás este mensaje de error con `Unauthorized` en los logs de tus indexadores:

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Unauthorized, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

Si configuras una región incorrecta, verás este error:

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Internal, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

### Problemas de acceso al almacenamiento GCS (GKE)

**Error**: `failed to write to GCS bucket`

**Solución**: verifica que la cuenta de servicio tiene los permisos correctos:
```bash
gsutil iam get gs://${BUCKET_NAME}
```

Concede permisos si faltan:
```bash
gsutil iam ch \
  serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com:objectAdmin \
  gs://${BUCKET_NAME}
```

### Problemas de acceso al almacenamiento de MinIO

**Error**: `failed to put object` o `NoSuchBucket`

**Solución**: verifica la conectividad y las credenciales de MinIO:
```shell
kubectl run minio-client \
  --rm -it \
  --image=minio/mc:latest \
  --command -- bash -c "mc alias set myminio <MINIO_ENDPOINT> <ACCESS_KEY> <SECRET_KEY> && mc ls myminio/<BUCKET_NAME>"
```

Causas comunes:
- No se puede acceder al endpoint de MinIO desde el clúster
- Clave de acceso o clave secreta incorrecta
- El bucket no existe
- `force_path_style_access` no está configurado en `true` en la configuración de almacenamiento

## Problemas de identidad de la carga de trabajo (GKE)

**Error**: `could not generate access token`

**Solución**: verifica la vinculación de la identidad de la carga de trabajo:
```bash
# Check service account annotation
kubectl get serviceaccount cloudprem-ksa -n datadog-cloudprem -o yaml | grep iam.gke.io

# Verify IAM binding
gcloud iam service-accounts get-iam-policy \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
```

Vuelve a crear la vinculación si es necesario:
```bash
gcloud iam service-accounts add-iam-policy-binding \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
  --role=roles/iam.workloadIdentityUser \
  --member="serviceAccount:${PROJECT_ID}.svc.id.goog[datadog-cloudprem/cloudprem-ksa]"
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
---
aliases:
- /fr/cloudprem/troubleshooting/
further_reading:
- link: /cloudprem/architecture/
  tag: Documentation
  text: Architecture CloudPrem
title: Dépannage
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

Cette page rassemble des conseils de dépannage pour les problèmes courants susceptibles de se produire lors du déploiement ou de l'utilisation de la solution CloudPrem Datadog. Vous pouvez consulter des messages d'erreur types, des étapes de diagnostic, ainsi que des recommandations de mesures de résolution pour les problèmes liés aux autorisations d'accès, à la configuration du stockage et à l'intégrité des composants. Référez-vous à ce guide pour diagnostiquer rapidement des problèmes ou pour obtenir des informations contextuelles avant de contacter l'[assistance Datadog][1].


## Santé des composants

### Pods qui ne démarrent pas

**Vérifiez les événements des pods :**
```bash
kubectl describe pod -n datadog-cloudprem <pod-name>
```

**Problèmes courants :**
- Ressources insuffisantes : vérifiez la capacité des nœuds avec `kubectl describe nodes`
- Erreurs de récupération d'image : vérifiez la connectivité réseau et la disponibilité de l'image
- Secret introuvable : vérifiez que les secrets existent avec `kubectl get secrets -n datadog-cloudprem`

## Autorisations d'accès

Les erreurs les plus courantes proviennent des autorisations d'accès au stockage objet ou au metastore. Pour effectuer le dépannage, utilisez `kubectl` et vérifiez les logs des composants CloudPrem : pods d'indexation, pods metastore et pods de moteur de recherche.

## Erreurs metastore

### Le metastore ne peut pas se connecter à PostgreSQL

**Erreur** : `failed to connect to metastore: connection error: pool timed out`

**Solution** : vérifiez que PostgreSQL est accessible depuis le cluster :
```shell
kubectl run psql-client \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- psql "host=<HOST> port=<PORT> dbname=<DATABASE> user=<USERNAME> password=<PASSWORD>"
```

Causes courantes :
- PostgreSQL n'est pas accessible depuis le réseau du cluster
- Des règles de pare-feu bloquent la connexion
- Hôte, port ou identifiants incorrects dans le secret `cloudprem-metastore-uri`

**Erreur** : `failed to connect to metastore: invalid port number`

**Solution** : confirmez que le mot de passe dans l'URI du metastore est encodé en URL. Les caractères spéciaux doivent être échappés :
```
# Correct format
postgresql://user:abc%2Fdef%2Bghi%3D@host:5432/cloudprem

# Incorrect format (fails)
postgresql://user:abc/def+ghi=@host:5432/cloudprem
```

### Problèmes de connexion Cloud SQL (GKE)

**Erreur** : `failed to connect to metastore: connection error: pool timed out`

**Solution** : vérifiez que les réseaux autorisés Cloud SQL incluent les adresses IP des nœuds GKE :
```bash
gcloud sql instances describe cloudprem-postgres \
  --format="value(settings.ipConfiguration.authorizedNetworks)"
```

Mettez à jour les réseaux autorisés si nécessaire :
```bash
export NODE_IPS=$(kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}' | tr ' ' ',')
gcloud sql instances patch cloudprem-postgres \
  --authorized-networks=${NODE_IPS} \
  --quiet
```

**Erreur** : `failed to connect to metastore: invalid port number`

**Solution** : confirmez que le mot de passe dans l'URI du metastore est encodé en URL. Les caractères spéciaux doivent être échappés :
```
# Correct format
postgresql://postgres:abc%2Fdef%2Bghi%3D@IP:5432/cloudprem

# Incorrect format (fails)
postgresql://postgres:abc/def+ghi=@IP:5432/cloudprem
```

## Erreurs de stockage

Si vous avez défini des identifiants AWS incorrects, le message d'erreur suivant contenant `Unauthorized` apparaît dans les logs de vos indexeurs :

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Unauthorized, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

Si vous avez défini une région incorrecte, l'erreur suivante apparaît :

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Internal, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

### Problèmes d'accès au stockage GCS (GKE) 

**Erreur** : `failed to write to GCS bucket`

**Solution** : vérifiez que le compte de service dispose des autorisations correctes :
```bash
gsutil iam get gs://${BUCKET_NAME}
```

Accordez les autorisations manquantes si nécessaire :
```bash
gsutil iam ch \
  serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com:objectAdmin \
  gs://${BUCKET_NAME}
```

### Problèmes d'accès au stockage MinIO

**Erreur** : `failed to put object` ou `NoSuchBucket`

**Solution** : vérifiez la connectivité et les identifiants MinIO :
```shell
kubectl run minio-client \
  --rm -it \
  --image=minio/mc:latest \
  --command -- bash -c "mc alias set myminio <MINIO_ENDPOINT> <ACCESS_KEY> <SECRET_KEY> && mc ls myminio/<BUCKET_NAME>"
```

Causes courantes :
- L'endpoint MinIO n'est pas accessible depuis le cluster
- Clé d'accès ou clé secrète incorrecte
- Le bucket n'existe pas
- `force_path_style_access` n'est pas défini sur `true` dans la configuration du stockage

## Problèmes de Workload Identity (GKE)

**Erreur** : `could not generate access token`

**Solution** : vérifiez la liaison Workload Identity :
```bash
# Check service account annotation
kubectl get serviceaccount cloudprem-ksa -n datadog-cloudprem -o yaml | grep iam.gke.io

# Verify IAM binding
gcloud iam service-accounts get-iam-policy \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
```

Recréez la liaison si nécessaire :
```bash
gcloud iam service-accounts add-iam-policy-binding \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
  --role=roles/iam.workloadIdentityUser \
  --member="serviceAccount:${PROJECT_ID}.svc.id.goog[datadog-cloudprem/cloudprem-ksa]"
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
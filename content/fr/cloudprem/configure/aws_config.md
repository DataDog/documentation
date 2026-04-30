---
description: Découvrir comment configurer AWS pour CloudPrem
further_reading:
- link: /cloudprem/install/aws_eks/
  tag: Documentation
  text: Installer CloudPrem sur AWS EKS
- link: /cloudprem/ingest_logs/
  tag: Documentation
  text: Configurer l'ingestion de logs
title: Configuration AWS
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en préversion" >}}
  Rejoignez la préversion de CloudPrem pour accéder aux nouvelles fonctionnalités de gestion des logs auto-hébergés.
{{< /callout >}}

## Présentation

Ce guide explique comment configurer les prérequis de votre compte AWS pour le déploiement de CloudPrem. Cette configuration est requise avant d'installer CloudPrem sur AWS EKS.

Pour le processus d'installation EKS complet, consultez le [guide d'installation AWS EKS][1].

## Prérequis AWS

Pour déployer CloudPrem sur AWS, vous devez configurer :
- Les identifiants et l'authentification AWS
- La sélection de la région AWS
- Les autorisations IAM pour le stockage objet S3
- La base de données PostgreSQL RDS (recommandé)
- Le cluster EKS avec AWS Load Balancer Controller

## Identifiants AWS

Au démarrage d'un nœud, CloudPrem tente de trouver des identifiants AWS à l'aide de la chaîne de fournisseurs d'identifiants implémentée par [rusoto\_core::ChainProvider][2] et recherche les identifiants dans l'ordre suivant :

1. Les variables d'environnement `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` ou `AWS_SESSION_TOKEN` (facultatif).
2. Fichier de profils d'identifiants, généralement situé à `~/.aws/credentials` ou spécifié par les variables d'environnement `AWS_SHARED_CREDENTIALS_FILE` et `AWS_PROFILE` si elles sont définies et non vides.
3. Les identifiants du conteneur Amazon ECS, chargés depuis le conteneur Amazon ECS si la variable d'environnement `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI` est définie.
4. Identifiants de profil d'instance, utilisés sur les instances Amazon EC2 et fournis via le service de métadonnées Amazon EC2.

Une erreur est renvoyée si aucun identifiant n'est trouvé dans la chaîne.

## Région AWS

CloudPrem tente de déterminer la région AWS à partir de plusieurs sources, selon l'ordre de priorité suivant :

1. **Variables d'environnement** : vérifie `AWS_REGION`, puis `AWS_DEFAULT_REGION`.
2. **Fichier de configuration AWS** : généralement situé à `~/.aws/config`, ou au chemin spécifié par la variable d'environnement `AWS_CONFIG_FILE` (si elle est définie et non vide).
3. **Métadonnées d'instance EC2** : utilise la région de l'instance Amazon EC2 en cours d'exécution.
4. **Valeur par défaut** : repli sur `us-east-1` si aucune autre source ne fournit de région.

## Autorisations IAM pour S3

Actions autorisées requises :

* `ListBucket` (directement sur le bucket)
* `GetObject`
* `PutObject`
* `DeleteObject`
* `ListMultipartUploadParts`
* `AbortMultipartUpload`

Voici un exemple de politique de bucket :

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

## Étapes suivantes

Après avoir finalisé la configuration AWS :

1. **Installez CloudPrem sur EKS** - Suivez le [guide d'installation AWS EKS][1] pour déployer CloudPrem
2. **Configurez l'ingress** - Mettez en place la [configuration de l'ingress][3] pour l'accès externe
3. **Configurez l'ingestion de logs** - Configurez l'[ingestion de logs][4] pour commencer à envoyer des logs à CloudPrem

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloudprem/install/aws_eks
[2]: https://docs.rs/rusoto_credential/latest/rusoto_credential/struct.ChainProvider.html
[3]: /fr/cloudprem/configure/ingress/
[4]: /fr/cloudprem/ingest_logs/
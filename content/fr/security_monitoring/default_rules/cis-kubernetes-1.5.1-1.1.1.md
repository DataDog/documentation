---
aliases:
  - /fr/mdi-ze8-gbk
control: 1.1.1
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
  - Agent de runtime
scope: kubernetes
security: compliance
source: kubernetes
title: Les autorisations du fichier de spécification de pod de serveur d'API sont définies sur 644 ou sur une valeur plus restrictive
type: security_rules
---
## Présentation

## Description

Vérifiez que les autorisations du fichier de spécification de pod de serveur d'API sont définies sur 644 ou sur une valeur plus restrictive.

## Meilleure pratique

Le fichier de spécification de pod de serveur d'API contrôle divers paramètres qui définissent le comportement du serveur d'API. Il est conseillé de restreindre les autorisations du fichier pour garantir son intégrité. Seuls les administrateurs système doivent bénéficier de droits d'écriture sur ce fichier.

## Audit

Exécutez la commande ci-dessous (selon l'emplacement du fichier dans votre système) sur le nœud master :

```bash
stat -c %a /etc/kubernetes/manifests/kube-apiserver.yaml
```

Vérifiez que les autorisations sont définies sur `644` ou sur une valeur plus restrictive.

## Remédiation

Exécutez la commande ci-dessous (selon l'emplacement du fichier dans votre système) sur le nœud master. Par exemple, `chmod 644 /etc/kubernetes/manifests/kube-apiserver.yaml`

## Impact

Aucun

## Valeur par défaut

Par défaut, les autorisations du fichier `kube-apiserver.yaml` sont définies sur 640.

## Références

1. https://kubernetes.io/docs/admin/kube-apiserver/

## Contrôles CIS

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges : Limiter les droits d'administration et utiliser des comptes administrateur uniquement lorsque nécessaire. Mettre en place un audit ciblé sur l'utilisation des fonctions nécessitant des privilèges administrateur et surveiller les comportements anormaux.

Version 7

5.2 Maintain Secure Images : Maintenir des images ou des modèles sécurisés pour tous les systèmes de l'entreprise, conformément aux normes de configuration approuvées par l'organisation. Lorsqu'un nouveau déploiement de système ou un système existant est compromis, créer une image du système à l'aide d'un de ces modèles ou images.
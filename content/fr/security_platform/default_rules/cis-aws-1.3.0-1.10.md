---
aliases:
  - /fr/hsh-y5w-hxe
  - /fr/security_monitoring/default_rules/hsh-y5w-hxe
  - /fr/security_monitoring/default_rules/cis-aws-1.3.0-1.10
cloud: aws
disable_edit: true
integration_id: amazon-iam
kind: documentation
rule_category:
  - Cloud Configuration
scope: iam
security: conformité
source: iam
title: Authentification multifacteur activée pour tous les utilisateurs IAM disposant d'un mot de passe pour la console
type: security_rules
---
## Description

L'authentification multifacteur renforce la sécurité apportée par un nom d'utilisateur et un mot de passe. Avec cette fonctionnalité, lorsqu'un utilisateur se connecte au site Web AWS, il est invité à saisir son nom d'utilisateur et son mot de passe, ainsi qu'un code d'authentification envoyé à l'appareil configuré pour l'authentification multifacteur AWS. Il est recommandé d'activer cette fonctionnalité pour tous les comptes qui disposent d'un mot de passe pour la console.

## Raison

L'authentification multifacteur améliore la sécurité de l'accès à la console. En effet, pour s'authentifier, le mandataire doit non seulement connaître les identifiants, mais également avoir en sa possession un appareil qui émet une clé éphémère.

## Remédiation

Consultez la section [CIS AWS Foundations Benchmark][1] (en anglais) pour obtenir les étapes de remédiation dans la console.

## Impact

Aucun

## Valeur par défaut

Aucune

## Références

1. [http://tools.ietf.org/html/rfc6238][2]
2. [http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html][3]
3. [https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#enable-mfa-for-privileged-users][4]
4. [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html][5]
5. CCE-78901-6

## Contrôles CIS

Contrôle CIS 4.5 portant sur l'utilisation de l'authentification multifacteur et de canaux chiffrés pour accéder à l'ensemble des comptes administratifs.

[1]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
[2]: http://tools.ietf.org/html/rfc6238
[3]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#enable-mfa-for-privileged-users
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html
---
aliases:
  - /fr/aty-suc-tsx
control: 1.2.10
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
  - Agent de runtime
scope: docker
security: compliance
source: docker
title: Audit de /etc/docker/daemon.json configuré
type: security_rules
---
## Présentation

## Description

Auditer `/etc/docker/daemon.json`, le cas échéant.

## Meilleure pratique

En plus d'auditer le système de fichier et les appels système Linux, il est essentiel d'auditer tous les fichiers et répertoires associés à Docker. Le daemon Docker s'exécute avec des privilèges root et son comportement dépend de certains fichiers et répertoires clés, notamment `/etc/docker/daemon.json`. Ce fichier inclut divers paramètres pour le daemon Docker et doit donc être audité.

## Audit

Vérifiez s'il existe une règle d'audit associée au fichier `/etc/docker/daemon.json`. Pour afficher la règle pour le fichier `/etc/docker/daemon.json`, exécutez :

```
auditctl -l | grep /etc/docker/daemon.json
```

## Remédiation

Ajoutez une règle pour le fichier `/etc/docker/daemon.json`. Ajoutez par exemple la ligne suivante au fichier `/etc/audit/audit.rules` :

```
-w /etc/docker/daemon.json -k docker 
```

Relancez ensuite le daemon d'audit :

```
service auditd restart
```

## Impact

Les audits peuvent générer des fichiers de log volumineux. Vous devez vous assurer qu'ils sont remplacés et archivés régulièrement. Une partition distincte doit être également être créée pour les logs d'audit afin d'éviter de remplir toute autre partition essentielle.

## Valeur par défaut

Par défaut, les fichiers et les répertoires associés à Docker ne sont pas audités. Le fichier `/etc/docker/daemon.json` peut ne pas exister dans le système. Dans ce cas, cette recommandation ne s'applique pas.

## Références

1. [https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html][1]
2. [https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file][2]

## Contrôles CIS

Version 6.14.6 Enforce Detailed Audit Logging For Sensitive Information : Appliquer une journalisation d'audit détaillée pour les accès aux données non publiques et une authentification spéciale pour les données sensibles. 

Version 7.14.9 Enforce Detail Logging for Access or Changes to Sensitive Data : Appliquer une journalisation d'audit détaillée pour les accès aux données sensibles ou les modifications  de données sensibles (en utilisant des outils tels que la surveillance de l'intégrité des fichiers ou la surveillance des événements et des informations de sécurité).                

[1]: https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-system_auditing.html 
[2]: https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file
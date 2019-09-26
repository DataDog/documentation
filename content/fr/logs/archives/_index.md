---
title: Archives de Logs
kind: documentation
description: Transférez tous vos logs ingérés pour les conserver.
further_reading:
- link: logs/explorer
  tag: Documentation
  text: Log Explorer
- link: logs/logging_without_limits
  tag: Documentation
  text: Logging without Limits*
---

## Archives

Configurez votre compte Datadog de manière à transférer tous les logs ingérés vers un système de stockage cloud. Vous pourrez ainsi conserver à long terme tous les logs que vous avez agrégés avec Datadog. Vous pouvez ensuite décider de réintégrer ces événements de log archivés afin de les analyser avec le Log Explorer.


Remarque : seuls les utilisateurs de Datadog bénéficiant des droits administrateur peuvent créer, modifier ou supprimer des configurations d'archivage de logs.

{{< img src="logs/archives/log_archives_s3_overview.png" alt="Archive page view" responsive="true" style="width:75%;">}}

## Présentation

{{< whatsnext desc="Cette section aborde les sujets suivants :" >}}
    {{< nextlink href="/logs/archives/s3" >}}<u>Archivage sur S3</u> : configurez le transfert des logs vers votre compartiment Amazon S3.{{< /nextlink >}}
    {{< nextlink href="/logs/archives/rehydrating" >}}<u>Réintégration à partir des archives</u> : Capturez des événements de log depuis vos archives dans Log Explorer de Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

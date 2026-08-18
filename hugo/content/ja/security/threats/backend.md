---
description: CSM Threats バックエンドイベントの JSON スキーマドキュメント
disable_edit: true
title: CSM Threats イベント形式
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-agent -->




アクティビティが [Cloud Security Management Threats][1] (CSM Threats) の[エージェント式][2]と一致すると、そのアクティビティに関連するすべてのコンテキストを含む CSM Threats イベントがシステムから収集されます。

このイベントは Datadog に送信され、Datadog による分析が行われます。分析結果に応じて、CSM Threats イベントがセキュリティシグナルをトリガーしたり、監査や脅威調査の目的でイベントとして保存されたりします。

CSM Threats イベントは、プラットフォームに応じて以下の JSON スキーマを持ちます。

* [Linux][1]
* [Windows][2]

[1]: /ja/security/threats/backend_linux
[2]: /ja/security/threats/backend_windows
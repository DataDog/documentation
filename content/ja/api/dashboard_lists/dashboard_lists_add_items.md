---
title: ダッシュボードリストへの項目の追加
type: apicontent
order: 9.7
external_redirect: /api/#add-items-to-a-dashboard-list
---

## ダッシュボードリストへの項目の追加

既存のダッシュボードリストにダッシュボードを追加します。

<div class="alert alert-info">
このエンドポイントは、新しいダッシュボード API の変更を反映して更新されました。古いエンドポイントに関するドキュメントは、以下を参照してください。
    <ul>
        <li><a href="https://docs.datadoghq.com/graphing/guide/dashboard-lists-api-v1-doc#add-items-of-a-dashboard-list">ダッシュボードリストへの項目の追加 (v1)</a></li>
    </ul>
</div>

##### 引数

*   **`dashboards`** [必須]:
    リストに追加するダッシュボードのリスト。
    ダッシュボードの定義は、次の形式に従います。
    *   **`type`** [必須]:
        ダッシュボードのタイプ。
        以下のいずれかでなければなりません。

        * `"custom_timeboard"`
        * `"custom_screenboard"`
        * `"integration_screenboard"`
        * `"integration_timeboard"`
        * `"host_timeboard"`
    *   **`id`** [必須]:
        ダッシュボードの ID。

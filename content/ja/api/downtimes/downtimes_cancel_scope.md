---
title: スコープに基づくモニターのダウンタイムの取り消し
type: apicontent
order: 10.4
external_redirect: '/api/#cancel-monitor-downtime-by-scope'
---
## スコープに基づくモニターのダウンタイムの取り消し

<mark>このエンドポイントは、Datadog のクライアントライブラリでサポートされていません。この機能の使用を希望される場合は、[Datadog のサポートチーム][1]にお問い合わせください。</mark>

##### 引数
* **`scope`** [必須]:  
    指定されたスコープを持つすべてのダウンタイムを取り消します。次に例を示します。

    *  **env:prod** 
    *  **role:db,role:db-slave**

[1]: /ja/help
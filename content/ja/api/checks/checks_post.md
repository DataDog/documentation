---
title: チェック実行のポスト
type: apicontent
order: 6.1
external_redirect: /api/#post-a-check-run
---

## チェック実行のポスト

##### 引数

* **`check`** [必須]:
    メッセージのテキスト

* **`host_name`** [必須]:
    チェックを送信するホストの名前

* **`status`** [必須]:
    チェックのステータスを示す整数値
    * 0 : OK
    * 1 : WARNING
    * 2 : CRITICAL
    * 3 : UNKNOWN


* **`timestamp`** [オプション]:
    イベントの POSIX タイムスタンプ

* **`message`** [オプション]:
    このステータスが発生した理由の説明

* **`tags`** [オプション]:
    このチェックのキー:値タグのリスト

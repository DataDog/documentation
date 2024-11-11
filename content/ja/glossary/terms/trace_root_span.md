---
core_product:
- apm
short_definition: スパンがトレースの最初のスパンになる場合、トレースルートスパンとなります。ルートスパンは、トレースされたリクエストのエントリポイントメソッドです。そのスタートは、トレースの開始を示します。
title: トレースルートスパン
---
[スパン][1]がトレースの最初のスパンになる場合、トレースルートスパンとなります。ルートスパンは、トレースされたリクエストのエントリポイントメソッドです。そのスタートは、トレースの開始を示します。

{{< img src="tracing/visualization/toplevelspans.png" alt="トレースルートスパン" style="width:80%" >}}

このの例における**サービスエントリスパン**は次の通りです。

- `rack.request` (_ルートスパン_でもある)
- `aspnet_coremvc.request`
- 以下で最上位にある緑色のスパン `aspnet_coremvc.request`
- オレンジ色の各 `mongodb` スパン

[1]: /ja/glossary/#span
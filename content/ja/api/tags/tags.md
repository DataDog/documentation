---
title: タグ
type: apicontent
order: 32
external_redirect: '/api/#tags'
---
## タグ

タグエンドポイントを使用して、`role:database` のような意味のあるキーワードをホストにタグ付けすることができます。
ホストから送信されるすべてのメトリクスに、そのホストのタグが適用されます。特定のホストのタグを取得したり、ホストにタグを適用する際は、ホストを名前 (yourhost.example.com) で参照します。

タグに関係するインフラストラクチャーのコンポーネントは、ソースによって特定されます。有効なソースには、nagios、hudson、jenkins、users、feed、chef、puppet、git、bitbucket、fabric、capistrano などがあります。[ソース属性値のリストはこちら][1]を参照してください。

[タグの詳細については、こちらのドキュメント][2]を参照してください。

[1]: /ja/integrations/faq/list-of-api-source-attribute-value
[2]: /ja/tagging
---
title: Error Tracking のトラブルシューティング
---

Error Trackingで予期せぬ動作が発生した場合、以下のトラブルシューティングの手順で問題を迅速に解決できます。問題が解決しない場合は、[Datadog サポート][1]までお問い合わせください。

各リリースには改良と修正が含まれているため、Datadog では、Datadog トレーシングライブラリ、モバイル SDK、および Web SDK を定期的に最新バージョンにアップデートすることを推奨しています。

## Error Tracking でエラーが見つからない

### ログ

エラーメッセージに[必須属性][2]があり、Error Tracking for Logs が[有効][7]になっていることを確認してください。

この[クエリの例][3]は、Error Tracking に含める基準を満たすログを検索します。

### APM

Error Tracking で処理されるには、スパンに以下の属性が必要です。

- `error.type`
- `error.message`
- `error.stack`

<div class="alert alert-info">
<strong>注:</strong> スタックには、少なくとも 2 行と 1 つの<em>意味のある</em>フレーム (多くの言語で関数名とファイル名を持つフレーム) が必要です。
</div>

この[クエリ例][5]は、Error Tracking に含める基準を満たすスパンを検索します。

### RUM

Error Tracking は、ソースを `custom`、`source`、`report`、`console` に設定して送信され、スタックトレースを含むエラーのみを処理します。その他のソース (`network` など) で送信されたエラーや、ブラウザの拡張機能から送信されたエラーは Error Tracking では処理されません。

この[クエリ例][6]は、Error Tracking に含める基準を満たす RUM エラーを示しています。

### 包含/除外フィルター

探しているエラーが少なくとも 1 つの包含フィルターに一致し、どの除外フィルターにも一致しないことを確認してください。フィルターの設定を確認してください (詳細は [データ収集の管理][8] を参照してください)。

## issue にエラーサンプルが見つからない

すべてのエラーが処理されますが、エラーサンプルとして issue パネルで利用できるのは保持されたエラーのみです。

### APM

エラーのサンプルを issue パネルに表示するには、そのエラーに関連するスパンをカスタム保持フィルターで保持する必要があります。

[1]: /ja/help/
[2]: /ja/logs/error_tracking/backend/?tab=serilog#attributes-for-error-tracking
[3]: https://app.datadoghq.com/logs?query=status%3A%28emergency%20OR%20alert%20OR%20critical%20OR%20error%29%20AND%20%28%40error.stack%3A%2A%20OR%20%40error.kind%3A%2A%29%20
[5]: https://app.datadoghq.com/apm/traces?query=%40_top_level%3A1%20%40error.stack%3A%2A%20AND%20%40error.message%3A%2A%20AND%20error.type%3A%2A%20
[6]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aerror%20%40error.stack%3A%2A
[7]: https://app.datadoghq.com/error-tracking/settings
[8]: /ja/error_tracking/manage_data_collection/
---
description: End User Device Monitoring を設定し、従業員のデスクトップやラップトップからパフォーマンスおよび接続データを収集します。
further_reading:
- link: /infrastructure/end_user_device_monitoring/
  tag: ドキュメント
  text: End User Device Monitoring
title: End User Device Monitoring を設定する
---
{{< callout url="https://www.datadoghq.com/product-preview/end-user-device-monitoring/" btn_hidden="false" >}}
End User Device Monitoring はプレビュー版です。登録するには、<b>Request Access</b> をクリックしてください。
{{< /callout >}}

従業員のデスクトップやラップトップに Datadog Agent を設定して、[End User Device Monitoring データ][11]を収集します。

<div class="alert alert-danger">Datadog にデータが表示される前に、プレビュー版へのアクセスの確認メッセージを受け取る必要があります。リクエストを送信した後、以下のセットアップ手順を完了する前に、アクセスの確認メッセージをお待ちください。</div>

## サポート対象のプラットフォーム {#supported-platforms}

- Windows 10 以降
- macOS 11 以降

## Datadog Agent を設定する {#set-up-the-datadog-agent}

1. 続行する前に、プレビュー版へのアクセスの確認メッセージを受け取ったことを確認します。確認メッセージを受け取っていない場合は、[アクセスをリクエスト][12]して承認をお待ちください。

2. お使いのプラットフォームのセットアップ手順に従います。
    - [macOS][14]
    - [Windows][15]

## 次のステップ {#next-steps}

監視対象デバイスから追加データを収集するには、以下の機能またはインテグレーションの 1 つ以上を有効にしてください。

- [Live Processes][5]
- [Logs][6]
- [Network Path][7]
- [WiFi/WLAN インテグレーション][8]
- [Windows Crash Detection インテグレーション][9]
- [Windows Event Log][13]

## はじめに {#getting-started}
デバイスのデータが表示され始めたら、以下の方法でエンドユーザーデバイスの調査を開始してください。
1. **Reference Table を使用してデバイスをエンドユーザーにマッピングします。**設定ページで Edit をクリックし、ホスト名などのデバイス識別子と、名前、メールアドレス、チームなどのユーザー属性との間のマッピングをアップロードしてください。
2. **Bits にデバイスの健全性と傾向について尋ねます。**[Bits Chat][16] を開き、自然言語でフリートに関する質問をしてください。たとえば、どのデバイスが最も CPU を使用しているか、どのラップトップのバッテリー容量が低下しているか、どのユーザーの接続が切断されたかなどを質問できます。
3. **Datadog MCP Server を使用してデバイスデータをクエリします。**Cursor や Claude などの AI クライアントを [Datadog MCP Server][17] に接続し、そのクライアントを通じてデバイスのメトリクス、ログ、および関連するテレメトリを取得します。開始するには、[Datadog MCP Server のセットアップ][18]を参照してください。
4. **バッテリーの健全性を確認します。**最大容量、サイクルカウント、充電状態などの[バッテリーメトリクス][20]を使用してダッシュボードを作成し、交換が必要なラップトップを特定します。
5. **送信先までのレイテンシーを追跡します。**監視対象デバイスで [Network Path][7] をセットアップして、デバイスから SaaS アプリケーションなどの送信先までのレイテンシーを測定し、遅延が発生しているホップを特定してください。例については、[ユーザーデバイスから SaaS アプリケーションへのネットワークパスのトレース][19]を参照してください。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[5]: /ja/infrastructure/process/
[6]: /ja/logs/
[7]: /ja/network_monitoring/network_path/setup/
[8]: /ja/integrations/wlan/
[9]: /ja/integrations/wincrashdetect/
[11]: /ja/infrastructure/end_user_device_monitoring/
[12]: https://www.datadoghq.com/product-preview/end-user-device-monitoring/
[13]: /ja/integrations/event-viewer/?tab=logs
[14]: /ja/infrastructure/end_user_device_monitoring/setup/macos/
[15]: /ja/infrastructure/end_user_device_monitoring/setup/windows/
[16]: /ja/bits_ai/bits_chat/
[17]: /ja/mcp_server/
[18]: /ja/mcp_server/setup/
[19]: /ja/infrastructure/end_user_device_monitoring/#trace-network-paths-from-user-devices-to-saas-applications
[20]: /ja/integrations/battery/#data-collected
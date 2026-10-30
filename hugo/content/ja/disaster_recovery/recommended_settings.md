---
further_reading:
- link: /disaster_recovery/
  tag: ドキュメント
  text: DDR (Datadog Disaster Recovery)
site_support_id: datadog_disaster_recovery
title: DNS フェイルオーバーの推奨設定
---
DNS キャッシュと接続を再利用するように構成して、DDR (Datadog Disaster Recovery) の DNS フェイルオーバー時間を最小限にします。

データがセカンダリリージョンに到達する前に、DNS キャッシュをリフレッシュし、テレメトリソースが再接続する必要があるため、フェイルオーバーには時間がかかります。これらの設定をまとめて構成することで、RTO (目標復旧時間) を達成することができます。これらのレイヤー全体での遅延は蓄積されることがあるため、TTL (Time to Live) と接続のリセット設定を選択する際には、これらの累積的な影響を考慮してください。

## DNS レコードの構成 {#dns-record-configuration}

| 設定 | 推奨構成 | 説明 |
| --- | --- | --- |
| A レコードまたは CNAME レコードの TTL | 60 ～ 300 秒に設定します。| **高い影響。**フェイルオーバー後に更新された値をチェックするまで、リゾルバーがレコードをキャッシュに保持する時間を制御します。[RFC 1035][1] (TTL フィールド) および [RFC 2181][2] (TTL=0 の処理を含む TTL の明確化) を参照してください。|
| ネガティブキャッシュの TTL | A レコードまたは CNAME レコードの TTL に合わせて、60 ～ 300 秒に設定します。SOA レコードの TTL とその `MINIMUM` フィールドの両方をチェックしてください。| **中程度の影響。**フェイルオーバー中にルックアップが NXDOMAIN (ドメインが存在しない) または NODATA (要求されたレコードタイプが存在しない) を返した場合、リゾルバーはその応答をキャッシュします。ネガティブキャッシュの TTL は、SOA レコードの TTL とその `MINIMUM` フィールドのうち、小さい方の値になります。[RFC 2308][3] を参照してください。|
| CNAME チェーンの深さ | 中間の `CNAME` レコードを使用せずに、Datadog データセンターのエンドポイントで DNS レコードを直接指定します。| **中程度の影響。**チェーン内の各レコードには独自の TTL があり、ホップごとに同期を維持する必要があるレコードが増えます。|

## OS およびアプリケーションの DNS キャッシュ{#os-and-application-dns-caching}

| 設定 | 推奨構成 | 説明 |
| --- | --- | --- |
| アプリケーションの DNS キャッシュ | DNS キャッシュを使用するアプリケーションの場合は、DNS レコードの TTL に合わせてキャッシュの TTL を60 〜 300 秒に設定してください。JVM ベースのアプリケーションの場合は、`networkaddress.cache.ttl` を構成してください。| **高い影響。**アプリケーションの DNS キャッシュには、DNS レコードが変更された後も古いアドレスが保持されていることがあります。一部の JVM 構成では、アドレスが無期限にキャッシュに保持されます。Go や Node.js クライアントを含む、各ランタイムおよび HTTP クライアントのキャッシュ動作を確認してください。|
| OS DNS キャッシュ| テレメトリ送信側を実行しているホストで、OS DNS キャッシュの TTL が 300 秒以下であることを確認してください。| **低から中程度の影響。**`nscd`、`systemd-resolved`、Windows DNS クライアントなどの OS DNS キャッシュも、フェイルオーバー時間を増加させる可能性があります。|

## 送信側と Agent の動作 {#sender-and-agent-behavior}

DDR の DNS ベースのフェイルオーバーを使用するすべての Datadog Agent は、[DDR の前提条件][4]を満たしている必要があります。

| 設定 | 推奨構成 | 説明 |
| --- | --- | --- |
| Agent 接続の再利用| 各テレメトリタイプに対して、1 〜 300 秒の接続リセット間隔を設定します。対応する設定については、「[Agent の構成例](#agent-configuration-examples)」を参照してください。| **高い影響。**長時間存続している接続は、DNS の変更後にプライマリリージョンにテレメトリを送信し続けることがあります。Agent が DNS 解決を再度実行できるように、定期的に再接続するよう構成してください。|
| 非 Agent テレメトリソース| 各ソースを個別に検証します。サポートされている場合は、300 秒以下の間隔で定期的に再接続するように構成してください。接続に失敗した場合、キャッシュされた IP に対して繰り返し試行するのではなく、即座に DNS 解決がトリガーされることを確認してください。| **高い影響。**Lambda Extension、OpenTelemetry Collector、Fluent Bit、カスタム API クライアントなどの非 Agent テレメトリソースは、DNS キャッシュと接続の再利用をそれぞれ異なる方法で処理します。接続失敗後の動作もフェイルオーバー時間に影響します。|

DNS を再度解決しても、キャッシュされたアドレスが返される場合があります。[DNS レコードの TTL](#dns-record-configuration) と [OS およびアプリケーションの DNS キャッシュ](#os-and-application-dns-caching)を、接続のリセット間隔とともに設定してください。

### Agent の構成例{#agent-configuration-examples}

`<CUSTOM_INTAKE_URL>` を DDR オンボーディング時に Datadog が構成する取り込みエンドポイントに置き換えます。このエンドポイントは、Datadog が委任したドメイン (`<CUSTOMER>.mrf.datadoghq.com`) を使用します。「[顧客が開始する DNS フェイルオーバーの設定][5]」を参照してください。

`datadog.yaml` で、送信する各テレメトリタイプの接続のリセット間隔設定を更新します。300 秒以下の間隔を設定してください。間隔を `0` に設定しないでください。その場合、定期的な再接続が無効になります。

**メトリクス** (`datadog.yaml`):

```yaml
dd_url: <CUSTOM_INTAKE_URL>
# Reset connections every 300 seconds to resolve DNS again.
forwarder_connection_reset_interval: 300
```

**ログ** (`datadog.yaml`):

```yaml
logs_config:
  logs_dd_url: <CUSTOM_INTAKE_URL>
  # Reset connections every 300 seconds to resolve DNS again.
  connection_reset_interval: 300
```

**APM** (`datadog.yaml`):

```yaml
apm_config:
  apm_dd_url: <CUSTOM_INTAKE_URL>
  # Reset connections every 300 seconds to resolve DNS again.
  connection_reset_interval: 300
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.rfc-editor.org/rfc/rfc1035
[2]: https://www.rfc-editor.org/rfc/rfc2181
[3]: https://www.rfc-editor.org/rfc/rfc2308
[4]: /ja/disaster_recovery/#prerequisites
[5]: /ja/disaster_recovery/#set-up-customer-initiated-dns-failover
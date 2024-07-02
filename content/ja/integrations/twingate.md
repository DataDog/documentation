---
"app_id": "twingate"
"app_uuid": "c88bd253-18da-4224-af14-7854ce8ae6ed"
"assets":
  "dashboards":
    "Twingate Dashboard": assets/dashboards/twingate_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10338"
    "source_type_name": Twingate
"author":
  "homepage": "https://www.twingate.com/?utm_source=datadog&utm_medium=partner&utm_campaign=integrations"
  "name": Twingate
  "sales_email": sales@twingate.com
  "support_email": support@twingate.com
"categories":
- network
- security
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/twingate/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "twingate"
"integration_id": "twingate"
"integration_title": "Twingate"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "twingate"
"public_title": "Twingate"
"short_description": "Twingate provides a modern, Zero Trust alternative to corporate VPNs"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Network"
  - "Category::Security"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Twingate provides a modern, Zero Trust alternative to corporate VPNs
  "media":
  - "caption": Twingate Activity Log
    "image_url": images/twingate_activity_log.png
    "media_type": image
  - "caption": Twingate Real-Time Activity Dashboard
    "image_url": images/dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/monitor-network-access-with-twingate/"
  "support": "README.md#Support"
  "title": Twingate
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Twingate][1] は、急成長する企業が迅速かつ容易に AWS 環境への安全なアクセスを提供できる、ゼロトラストのネットワークアクセスプラットフォームです。NAT トラバーサル、QUIC、プライベートプロキシ、スプリットトンネリングなどの最新技術を組み込むことで、Twingate はユーザーパフォーマンスと全体的なセキュリティを向上しながら、従来の VPN やクラウド VPN を置き換えることができます。

このインテグレーションにより、企業はユーザーのリソースアクセスアクティビティをリアルタイムで監視することができます。

## セットアップ
### 前提条件
1. Twingate Connector サーバーに Datadog Agent がインストールされていること。そのホストに接続し、Agent と YAML インテグレーション構成を構成するためのファイルを編集できる必要があります。Datadog Agent をインストールするには、[Agent の概要][2]を参照してください。
2. Twingate Connector をデプロイする必要があります。リアルタイムの接続ログを有効にするには、[Twingate ドキュメント][3]を参照してください。

### Datadog Agent の構成
#### Systemd Connector
1. [Datadog journald インテグレーション][4]を設定します。
2. `journald.d/conf.yaml` を以下の構成に置き換えます。
   ```yaml
    logs:
      - type: journald
        container_mode: true
        include_units:
          - twingate-connector.service
        service: Twingate Connection
        source: Twingate
        log_processing_rules:
        - type: include_at_match
          name: analytics
          pattern: ANALYTICS
        - type: mask_sequences
          name: remove_analytics
          replace_placeholder: ""
          pattern: "ANALYTICS "
   ```
3. `usermod -a -G systemd-journal dd-agent` を使って `dd-agent` ユーザーを `systemd-journal` グループに追加します。
4. `service datadog-agent restart` を実行して、Datadog Agent を再起動します。
5. [ログエクスプローラー][5]に Twingate Analytic のログが表示されることを確認します。


#### Docker Connector
##### Host Agent の Datadog Docker インテグレーションを設定する
コンフィレーションファイル `datadog.yaml` に以下の行を追加します。
```yaml
logs_enabled: true
listeners:
- name: docker
config_providers:
- name: docker
polling: true
logs_config:
container_collect_all: true
container_exclude: ["image:.*"]
container_include: ["image:twingate/connector"]
```
- `usermod -a -G docker dd-agent` で `dd-agent` ユーザーを `docker` グループに追加します。
- `service datadog-agent restart` を実行して、Datadog Agent を再起動します。

##### Container Agent の Datadog Docker インテグレーションを設定する
docker run コマンドに追加パラメーター `-e DD_CONTAINER_EXCLUDE="image:.*"` と `-e DD_CONTAINER_INCLUDE="image:twingate/connector"` を追加します。
```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=xxx \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="image:.*" \
           -e DD_CONTAINER_INCLUDE="image:twingate/connector" \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

##### Docker パラメーターを追加して Twingate Connector を設定する
Twingate Connector の docker run コマンドに、`com.datadoghq.ad.logs` ラベルを追加します。
```shell
docker run -d --sysctl net.ipv4.ping_group_range="0 2147483647" \
  -l "com.datadoghq.ad.logs"='[{"service":"Twingate Connection","source":"Twingate","log_processing_rules":[{"type":"include_at_match","name":"analytics","pattern":"ANALYTICS"},{"type":"mask_sequences","name":"remove_analytics","replace_placeholder":"","pattern":"ANALYTICS "}]}]' \
  --env TENANT_URL="https://xxx.twingate.com" \
  --env ACCESS_TOKEN="xxx" \
  --env REFRESH_TOKEN="xxx" \
  --env TWINGATE_LABEL_HOSTNAME="`hostname`" \
  --name "twingate-golden-seal" \
  --restart=unless-stopped \
  $(docker run --help | grep -- --pull >/dev/null && echo "--pull=always") twingate/connector:1
```
**注**: 新しいラベルを追加するには、Twingate Connector コンテナを再作成する必要があります。

### Twingate Analytics ダッシュボード
1. Datadog の[ダッシュボードリスト][6]に移動します。
2. Twingate Analytics ダッシュボードを検索します。

## トラブルシューティング
ご不明な点は、[Twingate のサポートチーム][7]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Marketplace の Twingate の製品を使ってネットワークアクセスを監視する][8]

[1]: https://www.twingate.com/
[2]: https://docs.datadoghq.com/getting_started/agent/
[3]: https://docs.twingate.com/docs/connector-real-time-logs
[4]: https://docs.datadoghq.com/agent/logs/?tab=journald
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/dashboard/lists
[7]: https://help.twingate.com/hc/en-us
[8]: https://www.datadoghq.com/blog/monitor-network-access-with-twingate/


---
app_id: wlan
app_uuid: dbf0f387-cef7-4694-9001-b7bb5c1c1274
assets:
  dashboards:
    Wi-Fi Overview: assets/dashboards/wlan_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: system.wlan.rssi
      metadata_path: metadata.csv
      prefix: system.wlan.
    source_type_id: 45933791
    source_type_name: wlan
  monitors:
    Many channel swap events detected: assets/monitors/wlan_excessive_channel_swap.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- windows
- metrics
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/wlan/README.md
display_on_public_website: true
draft: false
git_integration_title: wlan
integration_id: wlan
integration_title: wlan (Wi-Fi)
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: wlan
public_title: wlan (Wi-Fi)
short_description: 信号強度や接続状態などの Wi-Fi メトリクスを監視します。
supported_os:
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Windows
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: 信号強度や接続状態などの Wi-Fi メトリクスを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: wlan (Wi-Fi)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、一般に Wi-Fi と呼ばれる [IEEE 802.11][1] 規格に準拠した無線 LAN (WLAN) ネットワークを監視します。

主要な Wi-Fi メトリクスとして、タグとして付与される [SSID][2]#SSID) や [BSSID][2]) などのアクセス ポイント (AP) 情報、[RSSI][3] や [Noise][4]_and_Wireless_Signal_Strength) などの信号品質のテレメトリ、伝送レート、遷移回数 (例えば AP 間での [Roaming][5] や [Swapping][6]) などを収集します。これらのメトリクスは、過負荷状態のアクセス ポイントなどの無線ネットワーク全体の問題を早期に把握するのに役立つだけでなく、個々のホストでのネットワーク性能低下を事後に切り分ける際のトラブル シューティングにも有効です。

## セットアップ

### 前提条件

#### Windows

Windows 11 24H2 (2024 年秋) 以降は、[Wi-Fi アクセスと位置情報に関する API 動作の変更][7] に記載のとおり、Windows Wlan API を使用する WLAN チェックではユーザーまたは管理者の同意が必要です。ホストの `Settings > Privacy & security > Location` が有効になっていない場合、この WLAN チェックは WLAN/Wi-Fi テレメトリを報告できません。

以下の設定を有効にしてください。
- **Settings > Privacy & security > Location > Location services**
- **Settings > Privacy & security > Location > Let desktop apps access your location**

Location API が無効化されていないかは、`netsh wlan show interface` コマンドで確認できます。Location API が無効の場合、接続していても Wi-Fi インターフェイスの接続情報が表示されません。

管理者は、次の方法を使ってこれらの設定を有効化することもできます。
- [レジストリ][8]
- [グループ ポリシー][8]
- [InTune][8]


#### macOS

Windows と同様に macOS でも、Wi-Fi テレメトリを収集するには Location Services を通じたユーザーの同意が必要です。しかし Windows と異なり、macOS では Datadog Agent のような特定プロセスに対して位置情報へのアクセスを管理者が大規模に許可するための明確な仕組みが用意されていません。

回避策として、利用者は **Appendix** にある `add_datadog_agent_to_plist.sh` スクリプトを環境に合わせて調整し、Agent プロセスに位置情報アクセスを付与できます。このスクリプトは **root** 権限が必要で、Jamf などの MDM ソリューションを使えば、企業の Mac フリート全体に展開できます。

### インストール

WLAN チェックは [Datadog Agent][9] に含まれていますが、初期状態では設定されていません。チェックを設定するには、次のセクションを参照してください。

### 設定

設定ファイルは [Agent の構成ディレクトリ][10] のルートにある `conf.d/` フォルダ内の `wlan.d/conf.yaml` にあります。利用可能な設定オプションについては [サンプル wlan.d/conf.yaml][11] を参照してください。設定ファイルの編集が終わったら [Agent の再起動][12] を行い、新しい設定を読み込みます。

#### タグ

このチェックは、送信するメトリクスに SSID、BSSID、MAC アドレス、Wi-Fi タイプ (A, B, G, N, AC)、Wi-Fi 認証方式 (Open, WEP, WPA, WPA2, WPA3) を自動でタグとして付与します。詳しくは [タグの利用開始][13] を参照してください。タグ値に含まれる大文字は小文字に置換され、特殊文字はアンダースコアに置換されます。

### 検証

[Agent の status サブコマンドを実行][14] し、**Checks** セクションに `wlan` が表示されていることを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "wlan" >}}


### イベント

WLAN にはイベントは含まれません。

## 用語

### ローミング

`Roaming` は、端末が移動しても接続を切らさずに、ある Wi-Fi アクセス ポイントから別のアクセス ポイントへスムーズに切り替える機能を指します。端末が別のアクセス ポイントでより強い、またはより信頼性の高い信号を検出し、インターネット アクセスを継続する際に発生します。接続中のルーターまたは AP の *BSSID* が変わっても *SSID* が同じままの場合に `Roaming` イベントとして検出されます。ルーターまたは AP の *SSID* がブロードキャストされていない場合はローミングの検出はできません。`Roaming` イベントを検出すると、`system.wlan.roaming_events` メトリクスがインクリメントされます。*SSID* が異なるルーターへ切り替わった場合は `Roaming` には該当しません。

### チャネル スワップ

`Channel Swap` は、ルーターまたはアクセス ポイントが電波を送信する際に使用している Wi-Fi チャネルを変更する処理を指します。信号強度の改善、干渉の低減、パフォーマンスの最適化を目的として、特に競合する Wi-Fi ネットワークが多い環境で行われます。接続中のルーターまたはアクセス ポイントの *BSSID* が同じまま、チャネルだけが変更された場合に `Channel Swap` イベントとして検出されます。接続先の *BSSID* が変わった場合 (アクセス ポイントの *SSID* が同じなら `Roaming` イベントになります) は、チャネルも変わっていても `Channel Swap` イベントには該当しません。

## トラブル シューティング

ご不明な点は、[Datadog のサポートチーム][16]までお問合せください。

## 付録

**add_datadog_agent_to_plist.sh**

```shell script
#!/usr/bin/env bash
# Datadog Agent 用に `locationd/clients.plist` の Authorized キーを追加 / 更新するスクリプト (root 権限が必要)
# 使用方法: bash add_datadaog_agent_to_plist.sh [AGENT_BIN_PATH]
# AGENT_BIN_PATH: 任意 - Agent バイナリ パス (デフォルト: /opt/datadog-agent/bin/agent/agent)

# 設定
PLIST_PATH="/var/db/locationd/clients.plist"
DEFAULT_PATTERN="/opt/datadog-agent/bin/agent/agent"
BACKUP_PATH="${PLIST_PATH}.bak"

# 何か問題が起きた場合にバックアップを復元する関数
restore_backup() {
  echo "[ERROR] バックアップを復元しています..."
  sudo cp "$BACKUP_PATH" "$PLIST_PATH"
  sudo plutil -convert binary1 "$PLIST_PATH"
  echo "[INFO] バックアップを復元しました。終了します。"
  exit 1
}

# エラー ハンドリングを設定
trap restore_backup ERR

# 引数が指定されているか確認
if [ -n "$1" ]; then
  PATTERN="$1"
  echo "[INFO] CLI 引数で指定されたパターンを使用します: $PATTERN"
else
  # 検索するパターンを入力
  read -p "検索するパターンを入力してください [${DEFAULT_PATTERN}]: " PATTERN
  PATTERN=${PATTERN:-$DEFAULT_PATTERN}
fi

# 元のファイルをバックアップ
echo "[INFO] $PLIST_PATH を $BACKUP_PATH にバックアップします"
sudo cp "$PLIST_PATH" "$BACKUP_PATH"

# 解析しやすいように plist を XML に変換
sudo plutil -convert xml1 "$PLIST_PATH"

echo "[INFO] 次を含むエントリを検索します: $PATTERN"

# パターンを含むブロックの最初のキーを見つける (xargs で前後の空白を削除)
KEY_LINE=$(grep "$PATTERN" "$PLIST_PATH" | grep "<key>" | head -n1 | xargs)
if [ -z "$KEY_LINE" ]; then
  echo "[ERROR] 次のパターンを含むエントリが見つかりません: $PATTERN"
  restore_backup
fi

# 行からキーを抽出
KEY=${KEY_LINE#<key>}
KEY=${KEY%</key>}

if [ -z "$KEY" ]; then
  echo "[ERROR] 一致するエントリのキーを特定できませんでした。"
  restore_backup
fi

echo "[INFO] キーを処理します: $KEY"

# <key>$KEY</key> を含む行番号を取得
key_line=$(grep -n "<key>$KEY</key>" "$PLIST_PATH" | cut -d: -f1 | head -n1)
if [ -z "$key_line" ]; then
  echo "[ERROR] キーが見つかりません。"
  restore_backup
fi

# キーの次にある <dict> の行番号を取得
dict_start=$(tail -n +$((key_line + 1)) "$PLIST_PATH" | grep -n "<dict>" | head -n1 | cut -d: -f1)
dict_start=$((key_line + dict_start))

# 対応する </dict> の行番号を取得
dict_end=$(tail -n +$((dict_start + 1)) "$PLIST_PATH" | grep -n "</dict>" | head -n1 | cut -d: -f1)
dict_end=$((dict_start + dict_end))

echo "[INFO] ブロックを検出しました (行 $dict_start 〜 $dict_end)"

# ブロック内に <key>Authorized</key> があるか確認
auth_line=$(sed -n "${dict_start},${dict_end}p" "$PLIST_PATH" | grep -n "<key>Authorized</key>" | cut -d: -f1)

if [ -z "$auth_line" ]; then
  # <key>Authorized</key> が見つからない場合は </dict> の直前に追加
  echo "[INFO] ブロックに <key>Authorized</key><true/> を追加します"
  sed -i "" "${dict_end}i\\
        <key>Authorized</key>\\
        <true/>\\
" "$PLIST_PATH"
else
  # <key>Authorized</key> が見つかった場合は、次の行で値を確認
  auth_line=$((dict_start + auth_line - 1))
  value_line=$((auth_line + 1))

  # 次の行に <false/> が含まれているか確認
  if grep -q "<false/>" <(sed -n "${value_line}p" "$PLIST_PATH"); then
    echo "[INFO] <false/> を <true/> に変更します"
    sed -i "" "${value_line}s/<false\/>/<true\/>/" "$PLIST_PATH"
  else
    echo "[INFO] <key>Authorized</key> は既に正しい値で存在します"
  fi
fi

# システム用に plist をバイナリに戻す
sudo plutil -convert binary1 "$PLIST_PATH"
echo "[INFO] 変更を適用しました。"
echo "[INFO] 変更を反映するには、再起動するか、次を実行してください: sudo killall locationd"
trap - ERR
```

[1]: https://en.wikipedia.org/wiki/IEEE_802.11
[2]: https://en.wikipedia.org/wiki/Service_set_(802.11_network
[3]: https://en.wikipedia.org/wiki/Received_signal_strength_indicator
[4]: https://documentation.meraki.com/MR/Wi-Fi_Basics_and_Best_Practices/Signal-to-Noise_Ratio_(SNR
[5]: https://www.netally.com/tech-tips/what-is-wifi-roaming/
[6]: https://superuser.com/questions/122441/how-can-i-get-the-same-ssid-for-multiple-access-points
[7]: https://learn.microsoft.com/en-us/windows/win32/nativewifi/wi-fi-access-location-changes
[8]: https://learn.microsoft.com/en-us/troubleshoot/windows-client/shell-experience/cannot-set-timezone-automatically?WT.mc_id=WDIT-MVP-5000497#use-registry-editor
[9]: https://app.datadoghq.com/account/settings/agent/latest
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[11]: https://github.com/DataDog/datadog-agent/blob/main/poc/cmd/agent/dist/conf.d/wlan.d/conf.yaml.example
[12]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[13]: https://docs.datadoghq.com/ja/getting_started/tagging/
[14]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[15]: https://github.com/DataDog/integrations-core/blob/master/wlan/metadata.csv
[16]: https://docs.datadoghq.com/ja/help/
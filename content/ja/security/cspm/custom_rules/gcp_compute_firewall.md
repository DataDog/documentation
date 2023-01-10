---
aliases:
- /ja/security_platform/cspm/custom_rules/gcp_compute_firewall
kind: documentation
title: gcp_compute_firewall
---

## `allowed`
  **タイプ**: `UNORDERED_LIST_STRUCT`<br>
  **説明**: このファイアウォールにより指定された ALLOW ルールのリスト。各ルールで、どの接続が許可されるかを示すプロトコルとポート範囲のタプルを指定します。<br>
  **GCP 名**: `allowed`
   - `ip_protocol`<br>
    **タイプ**: `STRING`<br>
        **説明**: このルールが適用される IP プロトコル。ファイアウォールルールを作成する際は、プロトコルの種類が必要になります。この値は、代表的なプロトコルを表す文字列 (`tcp`、`udp`、`icmp`、`esp`、`ah`、`ipip`、`sctp`) のいずれか、または IP プロトコル番号を使って指定します。<br>
        **GCP 名**: `IPProtocol`<br>
   - `ports`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
        **説明**: このルールが適用されるポートのリスト (オプション)。このフィールドは、UDP または TCP プロトコルにのみ適用されます。各エントリは、整数または範囲のいずれかでなければなりません。このフィールドを指定しなかった場合、全ポート経由の接続にこのルールが適用されます。入力例: `["22"]`、`["80","443"]`、`["12345-12349"]`<br>
        **GCP 名**: `ports`<br>
## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `creation_timestamp`
**タイプ**: `TIMESTAMP`<br>
    **説明**: [出力のみ] RFC3339 の書式で表記された作成日時のタイムスタンプ。<br>
    **GCP 名**: `creationTimestamp`<br>
## `denied`
  **タイプ**: `UNORDERED_LIST_STRUCT`<br>
  **説明**: このファイアウォールにより指定された DENY ルールのリスト。各ルールで、どの接続が拒否されるかを示すプロトコルとポート範囲のタプルを指定します。<br>
  **GCP 名**: `denied`
   - `ip_protocol`<br>
    **タイプ**: `STRING`<br>
        **説明**: このルールが適用される IP プロトコル。ファイアウォールルールを作成する際は、プロトコルの種類が必要になります。この値は、代表的なプロトコルを表す文字列 (`tcp`、`udp`、`icmp`、`esp`、`ah`、`ipip`、`sctp`) のいずれか、または IP プロトコル番号を使って指定します。<br>
        **GCP 名**: `IPProtocol`<br>
   - `ports`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
        **説明**: このルールが適用されるポートのリスト (オプション)。このフィールドは、UDP または TCP プロトコルにのみ適用されます。各エントリは、整数または範囲のいずれかでなければなりません。このフィールドを指定しなかった場合、全ポート経由の接続にこのルールが適用されます。入力例: `["22"]`、`["80","443"]`、`["12345-12349"]`<br>
        **GCP 名**: `ports`<br>
## `description`
**タイプ**: `STRING`<br>
    **説明**: このリソースの説明 (オプション)。ご自身でリソースを作成した場合に、このフィールドを使用してください。<br>
    **GCP 名**: `description`<br>
## `destination_ranges`
**タイプ**: `UNORDERED_LIST_STRING`<br>
    **説明**: 宛先の範囲が指定されている場合、送信先 IP アドレスがこの範囲内にあるトラフィックにのみファイアウォールルールが適用されます。これらの範囲は CIDR 形式で表記する必要があります。IPv4 と IPv6 の両方に対応しています。<br>
    **GCP 名**: `destinationRanges`<br>
## `direction`
**タイプ**: `STRING`<br>
    **説明**: このファイアウォールが適用されるトラフィックの方向。`INGRESS` または `EGRESS` のいずれかで、デフォルトは `INGRESS`。`INGRESS` のトラフィックでは destinationRanges フィールドを指定することができず、`EGRESS` のトラフィックでは sourceRanges や sourceTags フィールドを指定することができません。<br>
    **GCP 名**: `direction`<br>
        **使用可能な値**:<br>
  - `EGRESS` - ファイアウォールが外向きのトラフィックに適用されることを示します。<br>
  - `INGRESS` - ファイアウォールが内向きのトラフィックに適用されることを示します。<br>
## `disabled`
**タイプ**: `BOOLEAN`<br>
    **説明**: ファイアウォールルールが無効かどうかを示します。true に設定した場合、ファイアウォールルールは適用されず、ネットワークはファイアウォールが存在しないかのように機能します。このフィールドを指定しなかった場合は、ファイアウォールルールが有効になります。<br>
    **GCP 名**: `disabled`<br>
## `id`
**タイプ**: `STRING`<br>
    **説明**: [出力のみ] リソースの一意の識別子。この識別子はサーバーにより定義されます。<br>
    **GCP 名**: `id`<br>
## `kind`
**タイプ**: `STRING`<br>
    **説明**: [出力のみ] リソースの種類。ファイアウォールルールの場合は、常に `compute#firewall` になります。<br>
    **GCP 名**: `kind`<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `log_config`
  **タイプ**: `STRUCT`<br>
  **説明**: このフィールドは、特定のファイアウォールルールに関するログ生成オプションを示します。ログの生成が有効になっている場合は、Cloud Logging にログがエクスポートされます。<br>
  **GCP 名**: `logConfig`
   - `enable`<br>
    **タイプ**: `BOOLEAN`<br>
        **説明**: このフィールドは、特定のファイアウォールルールについて、ログ生成を有効にするかどうかを示します。<br>
        **GCP 名**: `enable`<br>
   - `metadata`<br>
    **タイプ**: `STRING`<br>
        **説明**: 特定のファイアウォールルールについて、そのルールでログの生成が有効になっている場合のみ、このフィールドを指定できます。ファイアウォールのログにメタデータを含めるかどうかを示します。<br>
        **GCP 名**: `metadata`<br>
            **可能な値**:<br>
      - `EXCLUDE_ALL_METADATA` <br>
      - `INCLUDE_ALL_METADATA` <br>
## `name`
**タイプ**: `STRING`<br>
    **説明**: リソースの作成時にユーザーが指定するリソース名。名前は 1 ～ 63 文字で、RFC1035 に準拠する必要があります。具体的には、名前は 1 ～ 63 文字で、正規表現 <code>[a-z]&#40;[-a-z0-9]*[a-z0-9]&#41;?</code> と一致しなければなりません。1 文字目は小文字の英字で、これに続く文字はすべて (最後の文字を除き) ダッシュ、小文字の英字、または数字にします。最後の文字は、小文字の英字か数字にする必要があります。<br>
    **GCP 名**: `name`<br>
## `network`
**タイプ**: `STRING`<br>
**説明**: このファイアウォールルールで使用するネットワークリソースの URL。ファイアウォールルールの作成時にこれを指定しなかった場合は、デフォルトのネットワーク (`global`/`networks`/`default`) が使用されます。このフィールドを指定する場合は、絶対 URL または相対 URL を使ってネットワークを指定できます。たとえば、次の URL はすべて有効です。
  - `https://www.googleapis.com/compute/v1/projects/myproject/global/networks/my-network `
  - `projects/myproject/global/networks/my-network `
  - `global/networks/default` <br>
**GCP 名**: `network`<br>
## `organization_id`
**タイプ**: `STRING`<br>
## `parent`
**タイプ**: `STRING`<br>
## `priority`
**タイプ**: `INT32`<br>
    **説明**: このルールの優先度。`0` ～ `65535` の整数で指定します。デフォルト値は `1000` です。複数のルールが適用される場合、相対的な優先度でどのルールが有効になるかが決まります。値が低いほど優先度が高くなります。たとえば、優先度が `0` のルールは、優先度が `1` のルールよりも優先順位が高くなります。優先度が同じ場合は、DENY ルールの方が ALLOW ルールよりも優先されます。VPC ネットワークには優先度が `65535` の黙示ルールがあるのでご注意ください。黙示ルールとの競合を避けるため、`65535` よりも小さい数字を使って優先度を設定してください。<br>
    **GCP 名**: `priority`<br>
## `project_id`
**タイプ**: `STRING`<br>
## `project_number`
**タイプ**: `STRING`<br>
## `resource_name`
**タイプ**: `STRING`<br>
## `self_link`
**タイプ**: `STRING`<br>
    **説明**: [出力のみ] このリソースのサーバー定義の URL。<br>
    **GCP 名**: `selfLink`<br>
## `source_ranges`
**タイプ**: `UNORDERED_LIST_STRING`<br>
    **説明**: 送信元の範囲を指定した場合、送信元 IP アドレスがこの範囲内にあるトラフィックにのみファイアウォールルールが適用されます。範囲は CIDR 形式で表記する必要があります。`sourceRanges` と `sourceTags` のいずれか、またはその両方を設定できます。両方のフィールドを設定した場合、送信元 IP アドレスが `sourceRanges` の範囲内にあるトラフィックか、`sourceTags` フィールドで指定されたタグに一致するリソース由来のトラフィックにルールが適用されます。ルールの適用条件として、接続が両方のフィールドに合致する必要はありません。IPv4 と IPv6 の両方に対応しています。<br>
    **GCP 名**: `sourceRanges`<br>
## `source_service_accounts`
**タイプ**: `UNORDERED_LIST_STRING`<br>
    **説明**: 送信元のサービスアカウントを指定した場合、このリストに含まれるサービスアカウントに紐づいたインスタンス由来のトラフィックにのみファイアウォールルールが適用されます。サービスアカウントは IP アドレスではなくインスタンスに紐づいているため、送信元のサービスアカウントを使ってトラフィックをインスタンスの外部 IP アドレスへと誘導することはできません。`sourceRanges` は `sourceServiceAccounts` と同時に設定できます。両方を設定した場合、送信元 IP アドレスが `sourceRanges` の範囲内にあるトラフィックか、送信元 IP アドレスが `sourceServiceAccount` に含まれるサービスアカウントのインスタンスに属するトラフィックにファイアウォールが適用されます。ファイアウォールの適用条件として、接続が両方のフィールドに合致する必要はありません。 `sourceServiceAccounts` を `sourceTags` または `targetTags` と同時に使用することはできません。<br>
    **GCP 名**: `sourceServiceAccounts`<br>
## `source_tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
    **説明**: ソースタグを指定した場合、同じ VPC ネットワーク内にある当該タグが設定された VM インスタンスのプライマリネットワークインターフェイスと送信元 IP アドレスが 一致するトラフィックにのみファイアウォールルールが適用されます。タグは IP アドレスではなくインスタンスに紐づいているため、ソースタグを使ってトラフィックをインスタンスの外部 IP アドレスへと誘導することはできず、ソースタグは、同じ仮想ネットワーク上にあるインスタンス間のトラフィックにのみ適用されます。`sourceRanges` と `sourceTags` のいずれか、または両方を設定できます。両方のフィールドを設定した場合、送信元 IP アドレスが `sourceRanges` の範囲内にあるトラフィックか、送信元 IP アドレスが `sourceTags` フィールドで指定されたタグに一致するリソース由来のトラフィックにファイアウォールが適用されます。ファイアウォールの適用条件として、接続が両方のフィールドに合致する必要はありません。<br>
    **GCP 名**: `sourceTags`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `target_service_accounts`
**タイプ**: `UNORDERED_LIST_STRING`<br>
    **説明**: `allowed[]` の指定に従い、ネットワーク接続を許可されたネットワーク上にある一連のインスタンスを示すサービスアカウントのリスト。`targetServiceAccounts` を `targetTags` または `sourceTags` と同時に使用することはできません。`targetServiceAccounts` と `targetTags` のいずれも指定しなかった場合、指定されたネットワーク上にあるすべてのインスタンスにファイアウォールルールが適用されます。<br>
    **GCP 名**: `targetServiceAccounts`<br>
## `target_tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
    **説明**: ファイアウォールがどのインスタンスに適用されるかを制御するタグのリスト。`targetTags` を指定した場合、これらのタグのいずれかが設定された VPC ネットワーク内のインスタンスにのみファイアウォールルールが適用されます。`targetTags` を指定しなかった場合、指定されたネットワーク上のすべてのインスタンスにファイアウォールルールが適用されます。
    **GCP 名**: `targetTags`<br>
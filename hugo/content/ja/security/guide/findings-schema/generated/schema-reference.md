---
build:
  list: never
  render: never
---
{{% collapse-content title="コア属性" level="h3" id="core-attributes" %}}

これらの属性はすべてのセキュリティ検出結果に存在し、検出結果の基本的な性質とステータスを記述します。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>additional_resources</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@additional_resources</code><br>追加リソース。たとえば、AWS EC2 インスタンスには、追加リソースとしセキュリティグループやオートスケーリンググループを含めることができます。</td>
    </tr>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@base_severity</code><br>調整前の検出結果の基本重大度レベル。有効な値:<code>critical</code>、<code>high</code>、<code>medium</code>、<code>low</code>、<code>info</code>、<code>none</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@description</code><br>人間が読める形式の検出結果の説明。Markdown 書式設定を含めることができます。</td>
    </tr>
    <tr>
      <td><code>detection_changed_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@detection_changed_at</code><br>検出結果の評価または検出状態が最後に変更された時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>exposure_time_seconds</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@exposure_time_seconds</code><br>検出結果が最後にクローズされてから最初に検出されるまでに経過した時間 (秒)。</td>
    </tr>
    <tr>
      <td><code>finding_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@finding_id</code><br>検出結果の一意の識別子。</td>
    </tr>
    <tr>
      <td><code>finding_type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@finding_type</code><br>検出結果のカテゴリー。有効な値:<code>api_security</code>、<code>attack_path</code>、<code>runtime_code_vulnerability</code>、<code>static_code_vulnerability</code>、<code>host_and_container_vulnerability</code>、<code>iac_misconfiguration</code>、<code>identity_risk</code>、<code>library_vulnerability</code>、<code>misconfiguration</code>、<code>secret</code>、<code>workload_activity</code>、<code>sensitive_data</code>、<code>code_quality</code>。</td>
    </tr>
    <tr>
      <td><code>first_seen_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@first_seen_at</code><br>検出結果が最初に検出された時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>is_in_security_inbox</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@is_in_security_inbox</code><br><code>true</code> 検出結果がセキュリティ受信トレイに表示される場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>last_detected_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@last_detected_at</code><br>検出結果プラットフォームが最後の検出を受信した時間を示す検出タイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>last_seen_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@last_seen_at</code><br>検出結果が検出された直近の時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>origin</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@origin</code><br>エージェントレススキャン、APM、Software Composition Analysis、または CI (Continuous Integration) など、検出結果を生成した検出元。</td>
    </tr>
    <tr>
      <td><code>related_services</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@related_services</code><br>ソースコードインテグレーションから推論されるサービス (例: SAST の検出結果)。</td>
    </tr>
    <tr>
      <td><code>resource_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@resource_id</code><br>検出結果の影響を受けるリソースの一意の識別子。</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@resource_name</code><br>人間が読める形式の、検出結果の影響を受けるリソース名。</td>
    </tr>
    <tr>
      <td><code>resource_type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@resource_type</code><br>リソースのタイプ。</td>
    </tr>
    <tr>
      <td><code>severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@severity</code><br>Datadog による調整およびユーザー定義の重大度の変更が適用された後の最終的な重大度レベル。有効な値:<code>critical</code>、<code>high</code>、<code>medium</code>、<code>low</code>、<code>info</code>、<code>none</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>source_finding_raw_data</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@source_finding_raw_data</code><br>検出結果を生成したサードパーティインテグレーションからの生データ。</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@status</code><br>検出結果のワークフローステータス。有効な値:<code>open</code>、<code>muted</code>、<code>auto_closed</code>、<code>resolved</code>、<code>in-progress</code>。</td>
    </tr>
    <tr>
      <td><code>time_to_acknowledge</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@time_to_acknowledge</code><br>検出結果が最初に検出されてから割り当てやチケット作成を通じて確認されるまでの時間 (秒)。</td>
    </tr>
    <tr>
      <td><code>time_to_resolution</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@time_to_resolution</code><br>検出結果が最初に検出されてから解決されるまでの時間 (秒)。</td>
    </tr>
    <tr>
      <td><code>title</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@title</code><br>人間が読める形式の検出結果のタイトル。</td>
    </tr>
  </tbody>
</table>

### 追加リソース {#additional-resources}

追加リソース。たとえば、AWS EC2 インスタンスには、追加リソースとしセキュリティグループやオートスケーリンググループを含めることができます。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>category</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@additional_resources.category</code><br>追加リソースのカテゴリー。有効な値:<code>cloud_resource</code>、<code>k8s</code>、<code>host</code>、<code>service</code>、<code>git</code>、<code>iac_resource</code>、<code>serverless_function</code>。</td>
    </tr>
    <tr>
      <td><code>configuration</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@additional_resources.configuration</code><br>追加リソースの構成。</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@additional_resources.key</code><br>リソースがクラウドベースである場合 (例: <code>category</code> が <code>cloud_resource</code>の場合) の追加リソースの Canonical Cloud Resource Identifier (CCRID)。このフィールドは、次のような非クラウドカテゴリーでは省略される場合があります。 <code>k8s</code>、<code>host</code>、<code>service</code>、または <code>git</code>。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="アドバイザリー" level="h3" id="advisory" %}}

脆弱性を特定のソフトウェアバージョンセットに関連付けます。アドバイザリーを伴う脆弱性の検出結果は、(通常は SBOM を通じて) ソフトウェアの脆弱なバージョンが検出されたことを示します。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>aliases</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@advisory.aliases</code><br>他のエンティティによって作成された、同じ脆弱性を指す追加の識別子。</td>
    </tr>
    <tr>
      <td><code>cve</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@advisory.cve</code><br>セキュリティの脆弱性に対する、世界的に認識されている主要な識別子。以下のような <code>CVE-YYYY-NNNN</code> 形式です。</td>
    </tr>
    <tr>
      <td><code>first_remediation_available_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@advisory.first_remediation_available_at</code><br>アドバイザリーの最初の修正が利用可能になった時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@advisory.id</code><br>アドバイザリーの内部識別子。</td>
    </tr>
    <tr>
      <td><code>modified_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@advisory.modified_at</code><br>アドバイザリーが最後に更新された時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>published_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@advisory.published_at</code><br>アドバイザリーが公開された時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>summary</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@advisory.summary</code><br>アドバイザリーの短い概要。</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@advisory.type</code><br>アドバイザリーのタイプ。有効な値:<code>component_with_known_vulnerability</code>、<code>unmaintained</code>、<code>end_of_life</code>、<code>dangerous_workflows</code>、<code>risky_license</code>、<code>malicious_package</code>。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="API エンドポイント" level="h3" id="api-endpoint" %}}

HTTP エンドポイントの表現。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>method</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@api_endpoint.method</code><br>エンドポイントのメソッド (HTTP 動詞または gRPC メソッド)。</td>
    </tr>
    <tr>
      <td><code>operation_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@api_endpoint.operation_name</code><br>サービスへのエントリーポイントの名前 (例:<code>http.request</code>、<code>grpc.server</code>)。</td>
    </tr>
    <tr>
      <td><code>path</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@api_endpoint.path</code><br>エンドポイントの相対テンプレートパス。</td>
    </tr>
    <tr>
      <td><code>request_path</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@api_endpoint.request_path</code><br>エンドポイントの相対パス。</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@api_endpoint.resource_name</code><br>次の形式のエンドポイントの内部識別子: <code>&lt;method&gt; &lt;path&gt;</code>。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="クラウドリソース" level="h3" id="cloud-resource" %}}

検出結果の影響を受けるクラウドリソースを識別する属性。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@cloud_resource.account</code><br>クラウドリソースを所有するクラウドアカウント (例: AWS アカウント、Azure サブスクリプション、GCP プロジェクト、OCI テナンシー)。</td>
    </tr>
    <tr>
      <td><code>account_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@cloud_resource.account_name</code><br>人間が読める形式の、リソースを所有しているクラウドアカウント名。</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@cloud_resource.category</code><br>リソースタイプが属するカテゴリー。</td>
    </tr>
    <tr>
      <td><code>cloud_provider</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@cloud_resource.cloud_provider</code><br>リソースをホストしているクラウドプロバイダー。有効な値:<code>aws</code>、<code>azure</code>、<code>gcp</code>、<code>oci</code>。</td>
    </tr>
    <tr>
      <td><code>cloud_provider_url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@cloud_resource.cloud_provider_url</code><br>クラウドプロバイダーコンソールのリソースへのリンク。</td>
    </tr>
    <tr>
      <td><code>configuration</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@cloud_resource.configuration</code><br>クラウドプロバイダーによって返されるクラウドリソースの構成。</td>
    </tr>
    <tr>
      <td><code>context</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@cloud_resource.context</code><br>クラウドリソースのコンテキスト。</td>
    </tr>
    <tr>
      <td><code>display_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@cloud_resource.display_name</code><br>リソースの表示名。</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@cloud_resource.key</code><br>Canonical Cloud Resource Identifier (CCRID)。</td>
    </tr>
    <tr>
      <td><code>public_accessibility_paths</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@cloud_resource.public_accessibility_paths</code><br>パブリックインターネットからリソースにアクセス可能なネットワークパス。</td>
    </tr>
    <tr>
      <td><code>public_port_ranges</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@cloud_resource.public_port_ranges</code><br>パブリックインターネットに公開されているリソース上のポート範囲。</td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@cloud_resource.region</code><br>リソースが配置されているクラウドリージョン。</td>
    </tr>
  </tbody>
</table>

### パブリックポート範囲 {#public-port-ranges}

パブリックインターネットに公開されているリソース上のポート範囲。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>from_port</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@cloud_resource.public_port_ranges.from_port</code><br>公開範囲の開始ポート番号。</td>
    </tr>
    <tr>
      <td><code>to_port</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@cloud_resource.public_port_ranges.to_port</code><br>公開範囲の終了ポート番号。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="コードの場所" level="h3" id="code-location" %}}

検出結果が配置されている特定のファイルおよび行番号を特定する属性。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@code_location.column_end</code><br>終了列の位置。</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@code_location.column_start</code><br>開始列の位置。</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@code_location.filename</code><br>ファイルへの相対パス。</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@code_location.is_test_file</code><br><code>true</code> コードファイルがテストファイルである場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@code_location.line_end</code><br>終了行番号。</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@code_location.line_start</code><br>開始行番号。</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@code_location.symbol</code><br>コードの場所におけるシンボル名。</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@code_location.url</code><br>コードの場所を強調表示して、オンライン (例: GitHub など) でファイルを表示するための URL。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Compliance" level="h3" id="compliance" %}}

コンプライアンスルールや評価 (`pass`/`fail`) など、コンプライアンスの検出結果に特有の情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>agent</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@compliance.agent</code><br>検出結果を生成したコンプライアンスエージェントに関するメタデータ。</td>
    </tr>
    <tr>
      <td><code>evaluation</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@compliance.evaluation</code><br>コンプライアンス評価結果。有効な値:<code>pass</code> (リソースが適切に構成されている)、<code>fail</code> (リソースが誤って構成されている)。</td>
    </tr>
    <tr>
      <td><code>frameworks</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@compliance.frameworks</code><br>検出結果にマッピングされたコンプライアンスフレームワーク。</td>
    </tr>
  </tbody>
</table>

### Agent {#agent}

検出結果を生成したコンプライアンスエージェントに関するメタデータ。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>agent_framework_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@compliance.agent.agent_framework_id</code><br>エージェントによって使用されるコンプライアンスフレームワークの識別子。</td>
    </tr>
    <tr>
      <td><code>agent_rule_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@compliance.agent.agent_rule_id</code><br>検出結果をトリガーしたエージェントルールの識別子。</td>
    </tr>
    <tr>
      <td><code>agent_version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@compliance.agent.agent_version</code><br>検出結果を生成したコンプライアンスエージェントのバージョン。</td>
    </tr>
    <tr>
      <td><code>data</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@compliance.agent.data</code><br>コンプライアンスエージェントの評価によって生成される追加データ。</td>
    </tr>
    <tr>
      <td><code>evaluator</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@compliance.agent.evaluator</code><br>コンプライアンスの検出結果を評価した評価者の名前。</td>
    </tr>
  </tbody>
</table>

### フレームワーク {#frameworks}

検出結果にマッピングされたコンプライアンスフレームワーク。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>control</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@compliance.frameworks.control</code><br>コンプライアンスフレームワーク内のコントロールの識別子。</td>
    </tr>
    <tr>
      <td><code>framework</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@compliance.frameworks.framework</code><br>コンプライアンスフレームワークの識別子 (例:<code>cis</code>、<code>pci-dss</code>)。</td>
    </tr>
    <tr>
      <td><code>is_default</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@compliance.frameworks.is_default</code><br><code>true</code> これが検出結果のデフォルトのフレームワークマッピングである場合。<code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>requirement</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@compliance.frameworks.requirement</code><br>コントロール内の要件の識別子。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@compliance.frameworks.version</code><br>コンプライアンスフレームワークのバージョン。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="コンテナイメージ" level="h3" id="container-image" %}}

検出結果が検出されたコンテナイメージ (レジストリ、リポジトリ、ダイジェスト情報を含む)。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>architectures</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@container_image.architectures</code><br>コンテナイメージに関連付けられたアーキテクチャ。</td>
    </tr>
    <tr>
      <td><code>base_image</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@container_image.base_image</code><br>このコンテナイメージの構築元となるベースイメージ。ベースイメージ自体もコンテナイメージであり、独自の <code>base_image</code>を持つことができます。ベースイメージが特定されない場合は存在しません。</td>
    </tr>
    <tr>
      <td><code>git_repository_url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@container_image.git_repository_url</code><br>コンテナイメージの構築に使用されるコードの Git リポジトリの URL。ソースコードインテグレーションが構成されている場合にのみ使用可能です。</td>
    </tr>
    <tr>
      <td><code>image_layer_diff_ids</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@container_image.image_layer_diff_ids</code><br>適用された順序での、イメージレイヤーの Diff ID。各 Diff ID は、圧縮されていないレイヤーコンテンツの SHA256 です。</td>
    </tr>
    <tr>
      <td><code>image_layer_digests</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@container_image.image_layer_digests</code><br>適用された順序での、イメージレイヤーのダイジェスト。各ダイジェストは、圧縮されたレイヤー Blob の SHA256 です。</td>
    </tr>
    <tr>
      <td><code>is_running_as_serverless_function</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@container_image.is_running_as_serverless_function</code><br><code>true</code> コンテナイメージがサーバーレス関数として実行されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@container_image.name</code><br>コンテナイメージのフルネーム。</td>
    </tr>
    <tr>
      <td><code>oses</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@container_image.oses</code><br>コンテナイメージに関連付けられたオペレーティングシステム。</td>
    </tr>
    <tr>
      <td><code>registries</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@container_image.registries</code><br>イメージが保存されている、またはプルされたコンテナレジストリ。</td>
    </tr>
    <tr>
      <td><code>repo_digests</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@container_image.repo_digests</code><br>検出結果が特定されたコンテナイメージのリポジトリダイジェスト。</td>
    </tr>
    <tr>
      <td><code>repository</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@container_image.repository</code><br>コンテナイメージのリポジトリ。</td>
    </tr>
    <tr>
      <td><code>tags</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@container_image.tags</code><br>コンテナイメージ名のタグ部分 (例:<code>latest</code> または <code>1.2.3</code>)。</td>
    </tr>
    <tr>
      <td><code>versions</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@container_image.versions</code><br>検出結果が特定されたコンテナイメージのバージョン。</td>
    </tr>
  </tbody>
</table>

### オペレーティングシステム {#operating-systems}

コンテナイメージに関連付けられたオペレーティングシステム。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@container_image.oses.name</code><br>オペレーティングシステム名。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@container_image.oses.version</code><br>オペレーティングシステムバージョン。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="検出ツール" level="h3" id="detection-tool" %}}

検出結果の検出に使用されるツールまたはエンジンに関する情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@detection_tool.name</code><br>検出結果を生成した検出ツールまたはエンジンの名前。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@detection_tool.version</code><br>検出結果を生成した検出ツールまたはエンジンのバージョン。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Git" level="h3" id="git" %}}

検出結果をソースコードのコンテキストにリンクする Git メタデータ。リポジトリ、ブランチ、コミット、作成者、およびコミッターに関する情報が含まれます。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>author</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@git.author</code><br>コミットの元の作成者に関する詳細 (名前、メールアドレス、作成タイムスタンプなど) が含まれます。コミットがリベース、選別、または再適用されても変更されません。</td>
    </tr>
    <tr>
      <td><code>branch</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@git.branch</code><br>検出結果に関連する Git ブランチの名前。</td>
    </tr>
    <tr>
      <td><code>codeowners</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@git.codeowners</code><br>GitHub などのプラットフォーム上の SCM (ソースコントロール管理) プロバイダーの CODEOWNERS ファイルから抽出されたコードオーナーチーム。</td>
    </tr>
    <tr>
      <td><code>committer</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@git.committer</code><br>リポジトリに最後にコミットを適用した人物に関する詳細 (名前、メールアドレス、コミットタイムスタンプなど) が含まれます。コミットが次を使用してリベース、修正、または適用された場合には、作成者と異なる可能性があります。 <code>git am</code>。</td>
    </tr>
    <tr>
      <td><code>default_branch</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@git.default_branch</code><br>Git リポジトリに対して定義されたデフォルトブランチ。</td>
    </tr>
    <tr>
      <td><code>is_default_branch</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@git.is_default_branch</code><br><code>true</code> 現在のブランチがリポジトリのデフォルトブランチである場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>repository_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@git.repository_id</code><br>Git リポジトリの正規化された識別子。</td>
    </tr>
    <tr>
      <td><code>repository_url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@git.repository_url</code><br>検出結果に関連する Git リポジトリ URL。</td>
    </tr>
    <tr>
      <td><code>repository_visibility</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@git.repository_visibility</code><br>リポジトリの可視性。有効な値:<code>public</code>、<code>private</code>、<code>not_detected</code>。</td>
    </tr>
    <tr>
      <td><code>sha</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@git.sha</code><br>Git コミット識別子 (SHA)。</td>
    </tr>
  </tbody>
</table>

### 作成者 {#author}

コミットの元の作成者に関する詳細 (名前、メールアドレス、作成タイムスタンプなど) が含まれます。コミットがリベース、選別、または再適用されても変更されません。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>authored_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@git.author.authored_at</code><br>元の変更が行われた時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@git.author.email</code><br>コミット作成者のメールアドレス。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@git.author.name</code><br>コミット作成者の名前。</td>
    </tr>
  </tbody>
</table>

### コミッター {#committer}

リポジトリに最後にコミットを適用した人物に関する詳細 (名前、メールアドレス、コミットタイムスタンプなど) が含まれます。コミットが `git am` を使用してリベース、修正、または適用された場合には、作成者と異なる可能性があります。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>committed_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@git.committer.committed_at</code><br>変更が最後に大幅に修正された時間を示すタイムスタンプ (ミリ秒、UTC。例: リベースまたは修正操作中)。</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@git.committer.email</code><br>コミッターのメールアドレス。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@git.committer.name</code><br>コミッターの名前。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="ホスト" level="h3" id="host" %}}

検出結果が検出されたホストマシンに関する情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>architectures</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@host.architectures</code><br>ホストに関連付けられたアーキテクチャ。</td>
    </tr>
    <tr>
      <td><code>cloud_provider</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@host.cloud_provider</code><br>ホストが属するクラウドプロバイダー。</td>
    </tr>
    <tr>
      <td><code>image</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@host.image</code><br>ホストの構築に使用されたホストイメージの名前 (例:<code>ami-1234</code>)。</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@host.key</code><br>Canonical Cloud Resource Identifier (CCRID)。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@host.name</code><br>ホスト名。</td>
    </tr>
    <tr>
      <td><code>os</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@host.os</code><br>ホストで実行されるオペレーティングシステムの属性。</td>
    </tr>
  </tbody>
</table>

### オペレーティングシステム {#operating-system}

ホストで実行されるオペレーティングシステムの属性。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@host.os.name</code><br>オペレーティングシステム名。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@host.os.version</code><br>オペレーティングシステムバージョン。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="IaC リソース" level="h3" id="iac-resource" %}}

検出結果に関連する Infrastructure as Code (IaC) リソースを識別する属性。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>module</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@iac_resource.module</code><br>影響を受けるリソースを宣言する Terraform モジュール。</td>
    </tr>
    <tr>
      <td><code>platform</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.platform</code><br>脆弱性が検出された IaC (Infrastructure as Code) プラットフォーム (例:<code>terraform</code>、<code>kubernetes</code>)。</td>
    </tr>
    <tr>
      <td><code>provider</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.provider</code><br>リソースが定義されている IaC (Infrastructure as Code) プロバイダー (例:<code>aws</code>、<code>gcp</code>、<code>azure</code>)。</td>
    </tr>
  </tbody>
</table>

### モジュール {#module}

影響を受けるリソースを宣言する Terraform モジュール。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>code_location</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@iac_resource.module.code_location</code><br>リーフモジュールのルートに対する、影響を受けるリソースの場所。</td>
    </tr>
    <tr>
      <td><code>dependency_type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.dependency_type</code><br>ルートモジュールがリーフモジュールにリーチする方法を示します。有効な値:<code>direct</code>、<code>transitive</code>。</td>
    </tr>
    <tr>
      <td><code>module_path</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@iac_resource.module.module_path</code><br>リポジトリの宣言からリーフモジュールまでの順序付けられたモジュール呼び出しチェーン。直接呼び出されるモジュールでは省略されます。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.name</code><br>リーフモジュールの Terraform ラベル。</td>
    </tr>
    <tr>
      <td><code>source</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.source</code><br>資格情報が削除された、リーフモジュールの正規化ソースアドレス。</td>
    </tr>
    <tr>
      <td><code>source_type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.source_type</code><br>リーフモジュールによって使用されるソースのタイプ。有効な値:<code>registry</code>、<code>git</code>、<code>local</code>。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.version</code><br>解決済みのレジストリバージョンまたはリーフモジュールの Git リファレンス。</td>
    </tr>
  </tbody>
</table>

### コードの場所 {#code-location}

リーフモジュールのルートに対する、影響を受けるリソースの場所。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@iac_resource.module.code_location.column_end</code><br>終了列の位置。</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@iac_resource.module.code_location.column_start</code><br>開始列の位置。</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.code_location.filename</code><br>ファイルへの相対パス。</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@iac_resource.module.code_location.is_test_file</code><br><code>true</code> コードファイルがテストファイルである場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@iac_resource.module.code_location.line_end</code><br>終了行番号。</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@iac_resource.module.code_location.line_start</code><br>開始行番号。</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.code_location.symbol</code><br>コードの場所におけるシンボル名。</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.code_location.url</code><br>コードの場所を強調表示して、オンライン (例: GitHub など) でファイルを表示するための URL。</td>
    </tr>
  </tbody>
</table>

### モジュールパス {#module-path}

リポジトリの宣言からリーフモジュールまでの順序付けられたモジュール呼び出しチェーン。直接呼び出されるモジュールでは省略されます。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>code_location</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@iac_resource.module.module_path.code_location</code><br>呼び出し元に対するモジュール宣言の場所。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.module_path.name</code><br>モジュール呼び出しの Terraform ラベル。</td>
    </tr>
    <tr>
      <td><code>source</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.module_path.source</code><br>呼び出されたモジュールの、資格情報を含まない正規化されたソース。</td>
    </tr>
    <tr>
      <td><code>source_type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.module_path.source_type</code><br>呼び出されたモジュールによって使用されるソースのタイプ。有効な値:<code>registry</code>、<code>git</code>、<code>local</code>。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.module_path.version</code><br>解決済みのレジストリバージョンまたは呼び出されたモジュールの Git リファレンス。</td>
    </tr>
  </tbody>
</table>

### コードの場所 {#code-location-1}

呼び出し元に対するモジュール宣言の場所。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@iac_resource.module.module_path.code_location.column_end</code><br>終了列の位置。</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@iac_resource.module.module_path.code_location.column_start</code><br>開始列の位置。</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.module_path.code_location.filename</code><br>ファイルへの相対パス。</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@iac_resource.module.module_path.code_location.is_test_file</code><br><code>true</code> コードファイルがテストファイルである場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@iac_resource.module.module_path.code_location.line_end</code><br>終了行番号。</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@iac_resource.module.module_path.code_location.line_start</code><br>開始行番号。</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.module_path.code_location.symbol</code><br>コードの場所におけるシンボル名。</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@iac_resource.module.module_path.code_location.url</code><br>コードの場所を強調表示して、オンライン (例: GitHub など) でファイルを表示するための URL。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Kubernetes" level="h3" id="k8s" %}}

Kubernetes リソースに対して生成される検出結果のための Kubernetes 情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cluster_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@k8s.cluster_id</code><br>Kubernetes クラスター識別子。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="メタデータ" level="h3" id="metadata" %}}

スキーマバージョンやソースコンテキストなど、検出結果に関する追加のメタデータ。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>schema_version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@metadata.schema_version</code><br>検出結果に使用される検出結果スキーマバージョンを示します。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="パッケージ" level="h3" id="package" %}}

パッケージマネージャー情報。パッケージマネージャーは、ソフトウェアパッケージのインストール、アップグレード、構成、および削除を自動化します。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>additional_names</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@package.additional_names</code><br>クラウドの脆弱性が同じソースパッケージから派生した複数のパッケージに影響を与えた場合に、影響を受ける追加のパッケージ名。</td>
    </tr>
    <tr>
      <td><code>declaration</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@package.declaration</code><br>パッケージ定義のコードの場所。</td>
    </tr>
    <tr>
      <td><code>dependency_location_text</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.dependency_location_text</code><br>(非推奨) 脆弱なパッケージが宣言されているファイルパスなど、依存関係の場所のテキスト表現。次を使用します。 <code>custom.package.disk_locations</code> (ディスク上のファイルバス、または <code>custom.package.declaration</code> パッケージが宣言されているコードの場所)。</td>
    </tr>
    <tr>
      <td><code>dependency_type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.dependency_type</code><br>パッケージが直接依存関係、推移的依存関係、または情報が取得できないためにサポートされていないかどうか。</td>
    </tr>
    <tr>
      <td><code>disk_locations</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@package.disk_locations</code><br>パッケージが見つかったディスク上の場所。</td>
    </tr>
    <tr>
      <td><code>has_suid</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@package.has_suid</code><br><code>true</code> パッケージに SUID ビットが設定されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_running</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@package.is_running</code><br><code>true</code> パッケージが現在実行中の場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_running_as_root</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@package.is_running_as_root</code><br><code>true</code> ルートとしてパッケージが現在実行中の場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>loading_type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.loading_type</code><br>コンポーネントが常に読み込まれて実行されているかどうか (<code>hot</code>)、頻繁に実行されているかどうか (<code>cold</code>)、またはオンデマンドで読み込まれているかどうか (<code>lazy</code>)。</td>
    </tr>
    <tr>
      <td><code>manager</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.manager</code><br>脆弱なコンポーネントの発生元となるパッケージ管理エコシステムまたはソースレジストリ。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.name</code><br>脆弱性が特定されたパッケージまたはライブラリの名前。</td>
    </tr>
    <tr>
      <td><code>normalized_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.normalized_name</code><br>脆弱性が特定されたパッケージまたはライブラリのエコシステムに従って正規化された名前。</td>
    </tr>
    <tr>
      <td><code>purl</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.purl</code><br>パッケージ URL (PURL)。パッケージのタイプ、ネームスペース、名前、およびバージョンを識別する標準化された形式。</td>
    </tr>
    <tr>
      <td><code>root_parents</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@package.root_parents</code><br>パッケージが推移的依存関係である依存関係のリスト。</td>
    </tr>
    <tr>
      <td><code>scope</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.scope</code><br>パッケージの意図された使用スコープ (<code>production</code> または <code>development</code>)。</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.type</code><br>パッケージのカテゴリーを示します。有効な値:<code>application</code> (npm、PyPI、Maven などのアプリケーションレベルのパッケージマネージャーによって管理されるパッケージ) および <code>os</code> (apt、apk、yum などの OS レベルのパッケージマネージャーによって管理されるパッケージ)。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.version</code><br>脆弱性が特定されたパッケージまたはライブラリのバージョン。</td>
    </tr>
  </tbody>
</table>

### 宣言 {#declaration}

パッケージ定義のコードの場所。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>block</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@package.declaration.block</code><br>依存関係宣言全体を宣言するコードの場所。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@package.declaration.name</code><br>依存関係の名前を宣言するコードの場所。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@package.declaration.version</code><br>ルート親に対して宣言されたバージョン。</td>
    </tr>
  </tbody>
</table>

### ブロック {#block}

依存関係宣言全体を宣言するコードの場所。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.declaration.block.column_end</code><br>終了列の位置。</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.declaration.block.column_start</code><br>開始列の位置。</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.declaration.block.filename</code><br>ファイルへの相対パス。</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@package.declaration.block.is_test_file</code><br><code>true</code> コードファイルがテストファイルである場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.declaration.block.line_end</code><br>終了行番号。</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.declaration.block.line_start</code><br>開始行番号。</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.declaration.block.symbol</code><br>コードの場所におけるシンボル名。</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.declaration.block.url</code><br>コードの場所を強調表示して、オンライン (例: GitHub など) でファイルを表示するための URL。</td>
    </tr>
  </tbody>
</table>

### 名前 {#name}

依存関係の名前を宣言するコードの場所。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.declaration.name.column_end</code><br>終了列の位置。</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.declaration.name.column_start</code><br>開始列の位置。</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.declaration.name.filename</code><br>ファイルへの相対パス。</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@package.declaration.name.is_test_file</code><br><code>true</code> コードファイルがテストファイルである場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.declaration.name.line_end</code><br>終了行番号。</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.declaration.name.line_start</code><br>開始行番号。</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.declaration.name.symbol</code><br>コードの場所におけるシンボル名。</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.declaration.name.url</code><br>コードの場所を強調表示して、オンライン (例: GitHub など) でファイルを表示するための URL。</td>
    </tr>
  </tbody>
</table>

### バージョン {#version}

ルート親に対して宣言されたバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.declaration.version.column_end</code><br>終了列の位置。</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.declaration.version.column_start</code><br>開始列の位置。</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.declaration.version.filename</code><br>ファイルへの相対パス。</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@package.declaration.version.is_test_file</code><br><code>true</code> コードファイルがテストファイルである場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.declaration.version.line_end</code><br>終了行番号。</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.declaration.version.line_start</code><br>開始行番号。</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.declaration.version.symbol</code><br>コードの場所におけるシンボル名。</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.declaration.version.url</code><br>コードの場所を強調表示して、オンライン (例: GitHub など) でファイルを表示するための URL。</td>
    </tr>
  </tbody>
</table>

### ディスクの場所 {#disk-locations}

このパッケージが見つかったディスク上の場所が含まれます。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.disk_locations.filename</code><br>パッケージが見つかったディスク上のファイルへのパス。</td>
    </tr>
  </tbody>
</table>

### ルート親 {#root-parents}

パッケージが推移的依存関係である依存関係のリスト。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>declaration</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration</code><br>ルート親のバージョンを宣言するコードの場所。</td>
    </tr>
    <tr>
      <td><code>language</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.root_parents.language</code><br>パッケージが推移的依存関係である依存関係の言語。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.root_parents.name</code><br>パッケージが推移的依存関係である依存関係の名前。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.root_parents.version</code><br>パッケージが推移的依存関係である依存関係のバージョン。</td>
    </tr>
  </tbody>
</table>

### 宣言 {#declaration-1}

ルート親のバージョンを宣言するコードの場所。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>block</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.block</code><br>依存関係宣言全体を宣言するコードの場所。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.name</code><br>依存関係の名前を宣言するコードの場所。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.version</code><br>ルート親に対して宣言されたバージョン。</td>
    </tr>
  </tbody>
</table>

### ブロック {#block-1}

依存関係宣言全体を宣言するコードの場所。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.block.column_end</code><br>終了列の位置。</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.block.column_start</code><br>開始列の位置。</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.block.filename</code><br>ファイルへの相対パス。</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.block.is_test_file</code><br><code>true</code> コードファイルがテストファイルである場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.block.line_end</code><br>終了行番号。</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.block.line_start</code><br>開始行番号。</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.block.symbol</code><br>コードの場所におけるシンボル名。</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.block.url</code><br>コードの場所を強調表示して、オンライン (例: GitHub など) でファイルを表示するための URL。</td>
    </tr>
  </tbody>
</table>

### 名前 {#name-1}

依存関係の名前を宣言するコードの場所。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.name.column_end</code><br>終了列の位置。</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.name.column_start</code><br>開始列の位置。</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.name.filename</code><br>ファイルへの相対パス。</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.name.is_test_file</code><br><code>true</code> コードファイルがテストファイルである場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.name.line_end</code><br>終了行番号。</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.name.line_start</code><br>開始行番号。</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.name.symbol</code><br>コードの場所におけるシンボル名。</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.name.url</code><br>コードの場所を強調表示して、オンライン (例: GitHub など) でファイルを表示するための URL。</td>
    </tr>
  </tbody>
</table>

### バージョン {#version-1}

ルート親に対して宣言されたバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.version.column_end</code><br>終了列の位置。</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.version.column_start</code><br>開始列の位置。</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.version.filename</code><br>ファイルへの相対パス。</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.version.is_test_file</code><br><code>true</code> コードファイルがテストファイルである場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.version.line_end</code><br>終了行番号。</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.version.line_start</code><br>開始行番号。</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.version.symbol</code><br>コードの場所におけるシンボル名。</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@package.root_parents.declaration.version.url</code><br>コードの場所を強調表示して、オンライン (例: GitHub など) でファイルを表示するための URL。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="修復" level="h3" id="remediation" %}}

検出結果の修復に関する情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_image</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@remediation.base_image</code><br>継承された脆弱性を修復できる可能性があるパブリックベースイメージのアップグレード。</td>
    </tr>
    <tr>
      <td><code>code_update</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@remediation.code_update</code><br>検出結果を修復するために適用するコード変更。</td>
    </tr>
    <tr>
      <td><code>codegen</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@remediation.codegen</code><br>コード生成プラットフォームの検出結果ステータス。</td>
    </tr>
    <tr>
      <td><code>container_image</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@remediation.container_image</code><br>脆弱性を修復できる可能性がある新しいコンテナイメージバージョン。</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.description</code><br>修復の説明。</td>
    </tr>
    <tr>
      <td><code>host_image</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@remediation.host_image</code><br>脆弱性を修復できる可能性がある最新のホストイメージバージョン。</td>
    </tr>
    <tr>
      <td><code>is_available</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.is_available</code><br><code>true</code> 検出結果に対する修復が現在利用可能な場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>microsoft_kb</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@remediation.microsoft_kb</code><br>Microsoft Knowledge Base (KB) の記事を使用した修復戦略。</td>
    </tr>
    <tr>
      <td><code>package</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@remediation.package</code><br>修復パッケージ情報。</td>
    </tr>
    <tr>
      <td><code>recommended</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@remediation.recommended</code><br>推奨される修復の詳細。</td>
    </tr>
    <tr>
      <td><code>recommended_type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.recommended_type</code><br>検出結果に対する推奨修復タイプ。</td>
    </tr>
    <tr>
      <td><code>root_package</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@remediation.root_package</code><br>修復ルートパッケージ情報。</td>
    </tr>
  </tbody>
</table>

### ベースイメージ {#base-image}

継承された脆弱性を修復できる可能性があるパブリックベースイメージのアップグレード。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_major</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@remediation.base_image.latest_major</code><br>継承された脆弱性を修復できる可能性があるパブリックベースイメージの最新メジャーバージョン。</td>
    </tr>
  </tbody>
</table>

### 最新メジャー {#latest-major}

継承された脆弱性を修復できる可能性があるパブリックベースイメージの最新メジャーバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>image_url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.base_image.latest_major.image_url</code><br>脆弱性を修復できる可能性があるコンテナイメージの URL。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.base_image.latest_major.name</code><br>脆弱性を修復できる可能性があるコンテナイメージの名前。</td>
    </tr>
    <tr>
      <td><code>repo_digest</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.base_image.latest_major.repo_digest</code><br>脆弱性を修復できる可能性があるコンテナイメージのマニフェストダイジェスト (<code>sha256:...</code>)。</td>
    </tr>
    <tr>
      <td><code>tag</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.base_image.latest_major.tag</code><br>脆弱性を修復できる可能性があるコンテナイメージのタグ。</td>
    </tr>
  </tbody>
</table>

### コードの更新 {#code-update}

検出結果を修復するために適用するコード変更。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>edits</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.code_update.edits</code><br>検出結果を修復するために必要なコード変更。</td>
    </tr>
  </tbody>
</table>

### 編集 {#edits}

検出結果を修復するために必要なコード変更。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@remediation.code_update.edits.column_end</code><br>コード変更の終了列の位置。</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@remediation.code_update.edits.column_start</code><br>コード変更の開始列の位置。</td>
    </tr>
    <tr>
      <td><code>content</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.code_update.edits.content</code><br>コード変更の内容。</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@remediation.code_update.edits.line_end</code><br>コード変更の終了行の番号。</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@remediation.code_update.edits.line_start</code><br>コード変更の開始行の番号。</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.code_update.edits.type</code><br>コード変更の性質。</td>
    </tr>
  </tbody>
</table>

### コード生成 {#codegen}

コード生成プラットフォームの検出結果ステータス。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.codegen.id</code><br>コード生成バックエンドでの修復を追跡するために使用される識別子。</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.codegen.status</code><br>自動修正生成のステータス。有効な値:<code>generated</code>、<code>not_available_non_default_branch</code>、<code>not_available_unsupported_tool</code>、<code>not_available_unsupported_rule</code>、<code>not_available_disabled</code>、<code>not_available_git_provider_not_supported</code>、<code>not_available_confidence_too_low</code>、<code>error</code>、<code>not_available_has_deterministic_fixes</code>、<code>not_available_unknown_reason</code>、<code>not_available_org_not_onboarded</code>、<code>not_available_repository_disabled</code>、<code>not_available_unsupported_resource_type</code>、<code>not_available_unsupported_ecosystem</code>、<code>not_available_severity_too_low</code>、<code>not_available_transitive_library</code>、<code>not_available_no_remediation</code>、<code>not_available_unsupported_vulnerability_type</code>。</td>
    </tr>
  </tbody>
</table>

### コンテナイメージ {#container-image}

脆弱性を修復できる可能性がある新しいコンテナイメージバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_major</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@remediation.container_image.latest_major</code><br>脆弱性を修復できる可能性があるコンテナイメージの最新メジャーバージョン。</td>
    </tr>
  </tbody>
</table>

### 最新メジャー {#latest-major-1}

脆弱性を修復できる可能性があるコンテナイメージの最新メジャーバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>image_url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.container_image.latest_major.image_url</code><br>脆弱性を修復できる可能性があるコンテナイメージの URL。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.container_image.latest_major.name</code><br>脆弱性を修復できる可能性があるコンテナイメージの名前。</td>
    </tr>
    <tr>
      <td><code>repo_digest</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.container_image.latest_major.repo_digest</code><br>脆弱性を修復できる可能性があるコンテナイメージのマニフェストダイジェスト (<code>sha256:...</code>)。</td>
    </tr>
    <tr>
      <td><code>tag</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.container_image.latest_major.tag</code><br>脆弱性を修復できる可能性があるコンテナイメージのタグ。</td>
    </tr>
  </tbody>
</table>

### ホストイメージ {#host-image}

脆弱性を修復できる可能性がある最新のホストイメージバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_major</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@remediation.host_image.latest_major</code><br>脆弱性を修復できる可能性がある最新の Amazon Machine Image (AMI) に関する情報。</td>
    </tr>
  </tbody>
</table>

### 最新メジャー {#latest-major-2}

脆弱性を修復できる可能性がある最新の Amazon Machine Image (AMI) に関する情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.host_image.latest_major.name</code><br>脆弱性を修復できる可能性がある最新の Amazon Machine Image の名前 (例:<code>ami-12345678</code>)。</td>
    </tr>
  </tbody>
</table>

### Microsoft KB {#microsoft-kb}

Microsoft Knowledge Base (KB) の記事を使用した修復戦略。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>closest_fix_advisory</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@remediation.microsoft_kb.closest_fix_advisory</code><br>現在のアドバイザリーに対処するために利用可能な最も近いパッチ。</td>
    </tr>
  </tbody>
</table>

### 最も近い修正アドバイザリー {#closest-fix-advisory}

現在のアドバイザリーに対処するために利用可能な最も近いパッチ。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>article</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.microsoft_kb.closest_fix_advisory.article</code><br>最も近いパッチの記事名。</td>
    </tr>
  </tbody>
</table>

### パッケージ {#package}

修復パッケージ情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.base</code><br>修復が適用される前に検出結果が見つかった現在のパッケージバージョン。</td>
    </tr>
    <tr>
      <td><code>closest_minimum_risk_only_no_fix_vulnerabilities</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities</code><br>リスク露出を最小限に抑えるために修復が利用できない脆弱性のみを含む最も近いパッケージバージョン。</td>
    </tr>
    <tr>
      <td><code>closest_no_critical</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical</code><br>重大な脆弱性 (基本スコアに基づく) がない最も近いパッケージバージョン。</td>
    </tr>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities</code><br>脆弱性がない最も近いパッケージバージョン。</td>
    </tr>
    <tr>
      <td><code>latest_no_critical</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical</code><br>重大な脆弱性 (基本スコアに基づく) がない最新の修復パッケージバージョン。</td>
    </tr>
    <tr>
      <td><code>latest_no_vulnerabilities</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities</code><br>脆弱性がない最新のパッケージバージョン。</td>
    </tr>
  </tbody>
</table>

### ベース {#base}

修復が適用される前に検出結果が見つかった現在のパッケージバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.base.fixed_advisories</code><br>修復によって解決されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.package.base.has_incomplete_data</code><br>修復に不完全な依存関係データが含まれている可能性があり、100% 正確ではない可能性があることを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.package.base.is_auto_solvable</code><br>修復が自動解決可能 (再コンパイルのみが必要) かどうかを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.base.name</code><br>検出結果を修正する推奨パッケージ名。</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.base.new_advisories</code><br>修復が適用された場合に表示されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.base.original_name</code><br>検出結果を修正する推奨パッケージの元の名前。</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.base.remaining_advisories</code><br>修復が適用された場合に未修正のままとなるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.base.version</code><br>検出結果を修正する推奨パッケージバージョン。</td>
    </tr>
  </tbody>
</table>

### 修正アドバイザリー {#fixed-advisories}

修復によって修正されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.base.fixed_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.base.fixed_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 新規アドバイザリー {#new-advisories}

修復が適用された場合に表示されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.base.new_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.base.new_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 残りのアドバイザリー {#remaining-advisories}

修復が適用された場合に未修正のままとなるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.base.remaining_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.base.remaining_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 最も近い最小リスクのみの修正なしの脆弱性 {#closest-minimum-risk-only-no-fix-vulnerabilities}

リスク露出を最小限に抑えるために修復が利用できない脆弱性のみを含む最も近いパッケージバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories</code><br>修復によって解決されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.has_incomplete_data</code><br>修復に不完全な依存関係データが含まれている可能性があり、100% 正確ではない可能性があることを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.is_auto_solvable</code><br>修復が自動解決可能 (再コンパイルのみが必要) かどうかを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.name</code><br>検出結果を修正する推奨パッケージ名。</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories</code><br>修復が適用された場合に表示されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.original_name</code><br>検出結果を修正する推奨パッケージの元の名前。</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories</code><br>修復が適用された場合に未修正のままとなるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.version</code><br>検出結果を修正する推奨パッケージバージョン。</td>
    </tr>
  </tbody>
</table>

### 修正アドバイザリー {#fixed-advisories-1}

修復によって修正されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 新規アドバイザリー {#new-advisories-1}

修復が適用された場合に表示されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 残りのアドバイザリー {#remaining-advisories-1}

修復が適用された場合に未修正のままとなるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 重大な脆弱性がなく最も近い {#closest-no-critical}

重大な脆弱性 (基本スコアに基づく) がない最も近いパッケージバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical.fixed_advisories</code><br>修復によって解決されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical.has_incomplete_data</code><br>修復に不完全な依存関係データが含まれている可能性があり、100% 正確ではない可能性があることを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical.is_auto_solvable</code><br>修復が自動解決可能 (再コンパイルのみが必要) かどうかを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical.name</code><br>検出結果を修正する推奨パッケージ名。</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical.new_advisories</code><br>修復が適用された場合に表示されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical.original_name</code><br>検出結果を修正する推奨パッケージの元の名前。</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical.remaining_advisories</code><br>修復が適用された場合に未修正のままとなるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical.version</code><br>検出結果を修正する推奨パッケージバージョン。</td>
    </tr>
  </tbody>
</table>

### 修正アドバイザリー {#fixed-advisories-2}

修復によって修正されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical.fixed_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical.fixed_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 新規アドバイザリー {#new-advisories-2}

修復が適用された場合に表示されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical.new_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical.new_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 残りのアドバイザリー {#remaining-advisories-2}

修復が適用された場合に未修正のままとなるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical.remaining_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_critical.remaining_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 脆弱性がなく最も近い {#closest-no-vulnerabilities}

脆弱性がない最も近いパッケージバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities.fixed_advisories</code><br>修復によって解決されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities.has_incomplete_data</code><br>修復に不完全な依存関係データが含まれている可能性があり、100% 正確ではない可能性があることを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities.is_auto_solvable</code><br>修復が自動解決可能 (再コンパイルのみが必要) かどうかを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities.name</code><br>検出結果を修正する推奨パッケージ名。</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities.new_advisories</code><br>修復が適用された場合に表示されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities.original_name</code><br>検出結果を修正する推奨パッケージの元の名前。</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities.remaining_advisories</code><br>修復が適用された場合に未修正のままとなるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities.version</code><br>検出結果を修正する推奨パッケージバージョン。</td>
    </tr>
  </tbody>
</table>

### 修正アドバイザリー {#fixed-advisories-3}

修復によって修正されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities.fixed_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities.fixed_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 新規アドバイザリー {#new-advisories-3}

修復が適用された場合に表示されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities.new_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities.new_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 残りのアドバイザリー {#remaining-advisories-3}

修復が適用された場合に未修正のままとなるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities.remaining_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.closest_no_vulnerabilities.remaining_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 重大な脆弱性がなく最新 {#latest-no-critical}

重大な脆弱性 (基本スコアに基づく) がない最新の修復パッケージバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical.fixed_advisories</code><br>修復によって解決されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical.has_incomplete_data</code><br>修復に不完全な依存関係データが含まれている可能性があり、100% 正確ではない可能性があることを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical.is_auto_solvable</code><br>修復が自動解決可能 (再コンパイルのみが必要) かどうかを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical.name</code><br>検出結果を修正する推奨パッケージ名。</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical.new_advisories</code><br>修復が適用された場合に表示されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical.original_name</code><br>検出結果を修正する推奨パッケージの元の名前。</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical.remaining_advisories</code><br>修復が適用された場合に未修正のままとなるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical.version</code><br>検出結果を修正する推奨パッケージバージョン。</td>
    </tr>
  </tbody>
</table>

### 修正アドバイザリー {#fixed-advisories-4}

修復によって修正されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical.fixed_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical.fixed_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 新規アドバイザリー {#new-advisories-4}

修復が適用された場合に表示されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical.new_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical.new_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 残りのアドバイザリー {#remaining-advisories-4}

修復が適用された場合に未修正のままとなるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical.remaining_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_critical.remaining_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 脆弱性がなく最新 {#latest-no-vulnerabilities}

脆弱性がない最新のパッケージバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities.fixed_advisories</code><br>修復によって解決されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities.has_incomplete_data</code><br>修復に不完全な依存関係データが含まれている可能性があり、100% 正確ではない可能性があることを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities.is_auto_solvable</code><br>修復が自動解決可能 (再コンパイルのみが必要) かどうかを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities.name</code><br>検出結果を修正する推奨パッケージ名。</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities.new_advisories</code><br>修復が適用された場合に表示されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities.original_name</code><br>検出結果を修正する推奨パッケージの元の名前。</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities.remaining_advisories</code><br>修復が適用された場合に未修正のままとなるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities.version</code><br>検出結果を修正する推奨パッケージバージョン。</td>
    </tr>
  </tbody>
</table>

### 修正アドバイザリー {#fixed-advisories-5}

修復によって修正されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities.fixed_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities.fixed_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 新規アドバイザリー {#new-advisories-5}

修復が適用された場合に表示されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities.new_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities.new_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 残りのアドバイザリー {#remaining-advisories-5}

修復が適用された場合に未修正のままとなるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities.remaining_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.package.latest_no_vulnerabilities.remaining_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### ルートパッケージ {#root-package}

修復ルートパッケージ情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base</code><br>修復が適用される前に検出結果が見つかった現在のパッケージバージョン。</td>
    </tr>
    <tr>
      <td><code>closest_minimum_risk_only_no_fix_vulnerabilities</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities</code><br>リスク露出を最小限に抑えるために修復が利用できない脆弱性のみを含む最も近いパッケージバージョン。</td>
    </tr>
    <tr>
      <td><code>closest_no_critical</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical</code><br>重大な脆弱性 (基本スコアに基づく) がない最も近いパッケージバージョン。</td>
    </tr>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities</code><br>脆弱性がない最も近いパッケージバージョン。</td>
    </tr>
    <tr>
      <td><code>latest_no_critical</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical</code><br>重大な脆弱性 (基本スコアに基づく) がない最新の修復パッケージバージョン。</td>
    </tr>
    <tr>
      <td><code>latest_no_vulnerabilities</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities</code><br>脆弱性がない最新のパッケージバージョン。</td>
    </tr>
  </tbody>
</table>

### ベース {#base-1}

修復が適用される前に検出結果が見つかった現在のパッケージバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base.fixed_advisories</code><br>修復によって解決されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base.has_incomplete_data</code><br>修復に不完全な依存関係データが含まれている可能性があり、100% 正確ではない可能性があることを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base.is_auto_solvable</code><br>修復が自動解決可能 (再コンパイルのみが必要) かどうかを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base.name</code><br>検出結果を修正する推奨パッケージ名。</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base.new_advisories</code><br>修復が適用された場合に表示されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base.original_name</code><br>検出結果を修正する推奨パッケージの元の名前。</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base.remaining_advisories</code><br>修復が適用された場合に未修正のままとなるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base.version</code><br>検出結果を修正する推奨パッケージバージョン。</td>
    </tr>
  </tbody>
</table>

### 修正アドバイザリー {#fixed-advisories-6}

修復によって修正されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base.fixed_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base.fixed_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 新規アドバイザリー {#new-advisories-6}

修復が適用された場合に表示されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base.new_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base.new_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 残りのアドバイザリー {#remaining-advisories-6}

修復が適用された場合に未修正のままとなるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base.remaining_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.base.remaining_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 最も近い最小リスクのみの修正なしの脆弱性 {#closest-minimum-risk-only-no-fix-vulnerabilities-1}

リスク露出を最小限に抑えるために修復が利用できない脆弱性のみを含む最も近いパッケージバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories</code><br>修復によって解決されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.has_incomplete_data</code><br>修復に不完全な依存関係データが含まれている可能性があり、100% 正確ではない可能性があることを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.is_auto_solvable</code><br>修復が自動解決可能 (再コンパイルのみが必要) かどうかを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.name</code><br>検出結果を修正する推奨パッケージ名。</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories</code><br>修復が適用された場合に表示されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.original_name</code><br>検出結果を修正する推奨パッケージの元の名前。</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories</code><br>修復が適用された場合に未修正のままとなるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.version</code><br>検出結果を修正する推奨パッケージバージョン。</td>
    </tr>
  </tbody>
</table>

### 修正アドバイザリー {#fixed-advisories-7}

修復によって修正されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 新規アドバイザリー {#new-advisories-7}

修復が適用された場合に表示されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 残りのアドバイザリー {#remaining-advisories-7}

修復が適用された場合に未修正のままとなるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 重大な脆弱性がなく最も近い {#closest-no-critical-1}

重大な脆弱性 (基本スコアに基づく) がない最も近いパッケージバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical.fixed_advisories</code><br>修復によって解決されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical.has_incomplete_data</code><br>修復に不完全な依存関係データが含まれている可能性があり、100% 正確ではない可能性があることを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical.is_auto_solvable</code><br>修復が自動解決可能 (再コンパイルのみが必要) かどうかを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical.name</code><br>検出結果を修正する推奨パッケージ名。</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical.new_advisories</code><br>修復が適用された場合に表示されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical.original_name</code><br>検出結果を修正する推奨パッケージの元の名前。</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical.remaining_advisories</code><br>修復が適用された場合に未修正のままとなるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical.version</code><br>検出結果を修正する推奨パッケージバージョン。</td>
    </tr>
  </tbody>
</table>

### 修正アドバイザリー {#fixed-advisories-8}

修復によって修正されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical.fixed_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical.fixed_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 新規アドバイザリー {#new-advisories-8}

修復が適用された場合に表示されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical.new_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical.new_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 残りのアドバイザリー {#remaining-advisories-8}

修復が適用された場合に未修正のままとなるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical.remaining_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_critical.remaining_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 脆弱性がなく最も近い {#closest-no-vulnerabilities-1}

脆弱性がない最も近いパッケージバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities.fixed_advisories</code><br>修復によって解決されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities.has_incomplete_data</code><br>修復に不完全な依存関係データが含まれている可能性があり、100% 正確ではない可能性があることを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities.is_auto_solvable</code><br>修復が自動解決可能 (再コンパイルのみが必要) かどうかを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities.name</code><br>検出結果を修正する推奨パッケージ名。</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities.new_advisories</code><br>修復が適用された場合に表示されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities.original_name</code><br>検出結果を修正する推奨パッケージの元の名前。</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities.remaining_advisories</code><br>修復が適用された場合に未修正のままとなるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities.version</code><br>検出結果を修正する推奨パッケージバージョン。</td>
    </tr>
  </tbody>
</table>

### 修正アドバイザリー {#fixed-advisories-9}

修復によって修正されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities.fixed_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities.fixed_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 新規アドバイザリー {#new-advisories-9}

修復が適用された場合に表示されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities.new_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities.new_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 残りのアドバイザリー {#remaining-advisories-9}

修復が適用された場合に未修正のままとなるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities.remaining_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.closest_no_vulnerabilities.remaining_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 重大な脆弱性がなく最新 {#latest-no-critical-1}

重大な脆弱性 (基本スコアに基づく) がない最新の修復パッケージバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical.fixed_advisories</code><br>修復によって解決されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical.has_incomplete_data</code><br>修復に不完全な依存関係データが含まれている可能性があり、100% 正確ではない可能性があることを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical.is_auto_solvable</code><br>修復が自動解決可能 (再コンパイルのみが必要) かどうかを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical.name</code><br>検出結果を修正する推奨パッケージ名。</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical.new_advisories</code><br>修復が適用された場合に表示されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical.original_name</code><br>検出結果を修正する推奨パッケージの元の名前。</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical.remaining_advisories</code><br>修復が適用された場合に未修正のままとなるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical.version</code><br>検出結果を修正する推奨パッケージバージョン。</td>
    </tr>
  </tbody>
</table>

### 修正アドバイザリー {#fixed-advisories-10}

修復によって修正されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical.fixed_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical.fixed_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 新規アドバイザリー {#new-advisories-10}

修復が適用された場合に表示されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical.new_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical.new_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 残りのアドバイザリー {#remaining-advisories-10}

修復が適用された場合に未修正のままとなるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical.remaining_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_critical.remaining_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 脆弱性がなく最新 {#latest-no-vulnerabilities-1}

脆弱性がない最新のパッケージバージョン。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities.fixed_advisories</code><br>修復によって解決されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities.has_incomplete_data</code><br>修復に不完全な依存関係データが含まれている可能性があり、100% 正確ではない可能性があることを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities.is_auto_solvable</code><br>修復が自動解決可能 (再コンパイルのみが必要) かどうかを示すフラグ。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities.name</code><br>検出結果を修正する推奨パッケージ名。</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities.new_advisories</code><br>修復が適用された場合に表示されるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities.original_name</code><br>検出結果を修正する推奨パッケージの元の名前。</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities.remaining_advisories</code><br>修復が適用された場合に未修正のままとなるアドバイザリー。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities.version</code><br>検出結果を修正する推奨パッケージバージョン。</td>
    </tr>
  </tbody>
</table>

### 修正アドバイザリー {#fixed-advisories-11}

修復によって修正されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities.fixed_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities.fixed_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 新規アドバイザリー {#new-advisories-11}

修復が適用された場合に表示されるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities.new_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities.new_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 残りのアドバイザリー {#remaining-advisories-11}

修復が適用された場合に未修正のままとなるアドバイザリー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities.remaining_advisories.base_severity</code><br>アドバイザリーの基本重大度。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@remediation.root_package.latest_no_vulnerabilities.remaining_advisories.id</code><br>アドバイザリーの識別子。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="リスク" level="h3" id="risk" %}}

検出結果のリスク関連属性。各キーには、`risk_details` ネームスペース内で一致するキーが必要です。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>has_exploit_available</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.has_exploit_available</code><br><code>true</code> 検出結果の既知のエクスプロイトが存在する場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>has_high_exploitability_chance</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.has_high_exploitability_chance</code><br><code>true</code> EPSS (Exploit Prediction Scoring System) スコアが 1% を超えている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>has_privileged_access</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.has_privileged_access</code><br><code>true</code> 検出結果のリソースが昇格権限で実行されているか、権限ロールを引き受ける機能を持っている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>has_sensitive_data</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.has_sensitive_data</code><br><code>true</code> 検出結果が機密データを含むリソースにアクセスできる場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_authenticated</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.is_authenticated</code><br><code>true</code> API エンドポイントへのアクセスに認証が必要な場合。 <code>false</code> エンドポイントに認証が不要な場合。認証ステータスが不明な場合は省略されます。</td>
    </tr>
    <tr>
      <td><code>is_crown_jewel</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.is_crown_jewel</code><br><code>true</code> 影響を受けるリソースがビジネスにとって重要である場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.is_emerging</code><br><code>true</code> 脆弱性が新たに発生する脆弱性として分類されたアドバイザリーに関連付けられている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_exposed_to_attacks</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.is_exposed_to_attacks</code><br><code>true</code> 攻撃がリソースですでに検出されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_function_reachable</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.is_function_reachable</code><br><code>true</code> 脆弱な関数を実行できる場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_image_running</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.is_image_running</code><br><code>true</code> 検出結果のリソースのイメージでコンテナやホストが実行されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_kernel_running</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.is_kernel_running</code><br><code>true</code> 脆弱性が現在ホストで実行されているカーネルに影響を与える場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_package_running</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.is_package_running</code><br><code>true</code> 検出結果のリソースのパッケージが実行されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_production</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.is_production</code><br><code>true</code> 検出結果のリソースが本番環境で実行されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_publicly_accessible</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.is_publicly_accessible</code><br><code>true</code> 検出結果のリソースが一般公開されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_database</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.is_tainted_from_database</code><br><code>true</code> 文字列が信頼できないデータベースソースに由来するために汚染されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_query_string</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.is_tainted_from_query_string</code><br><code>true</code> 文字列が HTTP クエリ文字列に由来する要素で汚染されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_request_url</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.is_tainted_from_request_url</code><br><code>true</code> 最終的な URL がリクエスト URL に由来する汚染された部分を含んでいる場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_using_sha1</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk.is_using_sha1</code><br><code>true</code> SHA1 が弱いハッシュで使用されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="リスクの詳細" level="h3" id="risk-details" %}}

検出結果の潜在的な影響を評価する上で役立つコンテキストリスク要因。これらのフィールドは、露出、機密性、アクティブな悪用の兆候などの特性を説明します。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>has_exploit_available</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.has_exploit_available</code><br>検出結果のアドバイザリーに関する既知のエクスプロイトが存在するかどうかに関する情報。</td>
    </tr>
    <tr>
      <td><code>has_high_exploitability_chance</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.has_high_exploitability_chance</code><br>EPSS (Exploit Prediction Scoring System) に基づいた、脆弱性が悪用される可能性が高いかどうかに関する根拠と指標。</td>
    </tr>
    <tr>
      <td><code>has_privileged_access</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.has_privileged_access</code><br>リソースが特権アクセスを持っているかどうかに関する根拠と指標。</td>
    </tr>
    <tr>
      <td><code>has_sensitive_data</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.has_sensitive_data</code><br>影響を受けるリソースに機密データが含まれているかどうかに関する根拠と指標。</td>
    </tr>
    <tr>
      <td><code>is_authenticated</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_authenticated</code><br>API エンドポイントに認証が必要かどうかに関する根拠と指標。</td>
    </tr>
    <tr>
      <td><code>is_crown_jewel</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_crown_jewel</code><br>影響を受けるリソースが重要であるかどうかに関する根拠と指標。</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_emerging</code><br>脆弱性が新たに発生する脆弱性として分類されているかどうかに関する根拠と指標。</td>
    </tr>
    <tr>
      <td><code>is_exposed_to_attacks</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_exposed_to_attacks</code><br>検出結果のサービスが攻撃にさらされているかどうかに関する根拠と指標。</td>
    </tr>
    <tr>
      <td><code>is_function_reachable</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_function_reachable</code><br>脆弱な関数またはモジュールがコード内で使用されているかどうかに関する根拠と指標。</td>
    </tr>
    <tr>
      <td><code>is_image_running</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_image_running</code><br>影響を受けるイメージでコンテナまたはホストが実行されているかどうかに関する根拠と指標。</td>
    </tr>
    <tr>
      <td><code>is_kernel_running</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_kernel_running</code><br>脆弱性がホストで現在実行されているカーネルに影響を与えるどうかに関する根拠と指標。</td>
    </tr>
    <tr>
      <td><code>is_package_running</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_package_running</code><br>影響を受けるパッケージが実行されているかどうかに関する根拠と指標。</td>
    </tr>
    <tr>
      <td><code>is_production</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_production</code><br>検出結果に関連付けられたリソースが本番環境で実行されているかどうかに関する根拠と指標。</td>
    </tr>
    <tr>
      <td><code>is_publicly_accessible</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_publicly_accessible</code><br>影響を受けるリソースがパブリックインターネットからアクセス可能かどうかに関する情報。</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_database</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_tainted_from_database</code><br>汚染された部分がデータベースに由来するかどうかに関する情報。</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_query_string</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_tainted_from_query_string</code><br>汚染された部分がクエリ文字列に由来するかどうかに関する情報。</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_request_url</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_tainted_from_request_url</code><br>汚染された部分がリクエスト URL に由来するかどうかに関する情報。</td>
    </tr>
    <tr>
      <td><code>is_using_sha1</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_using_sha1</code><br>SHA1 が弱いハッシュで使用されているかどうかに関する情報。</td>
    </tr>
  </tbody>
</table>

### エクスプロイトが利用可能 {#has-exploit-available}

検出結果のアドバイザリーに関する既知のエクスプロイトが存在するかどうかに関する情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.has_exploit_available.evidence</code><br>エクスプロイトの可用性の根拠。</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.has_exploit_available.impact_cvss</code><br>既知のエクスプロイトの可用性が CVSS スコアに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.has_exploit_available.value</code><br><code>true</code> 検出結果の既知のエクスプロイトが存在する場合。 <code>false</code> それ以外の場合。</td>
    </tr>
  </tbody>
</table>

### 根拠 {#evidence}

エクスプロイトの可用性の根拠。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>exploit_sources</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@risk_details.has_exploit_available.evidence.exploit_sources</code><br>検出結果に関連付けられたエクスプロイトソース (例:<code>NIST</code>、<code>CISA</code>、<code>Exploit-DB</code>)。</td>
    </tr>
    <tr>
      <td><code>exploit_urls</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@risk_details.has_exploit_available.evidence.exploit_urls</code><br>検出結果に関連付けられたエクスプロイト URL。</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.has_exploit_available.evidence.type</code><br>エクスプロイトの可用性の根拠のタイプ。有効な値:<code>production_ready</code>、<code>poc</code>、<code>unavailable</code>。</td>
    </tr>
  </tbody>
</table>

### 悪用される可能性が高い {#has-high-exploitability-chance}

EPSS (Exploit Prediction Scoring System) に基づいた、脆弱性が悪用される可能性が高いかどうかに関する根拠と指標。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.has_high_exploitability_chance.evidence</code><br>EPSS スコアの根拠。</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.has_high_exploitability_chance.impact_cvss</code><br>悪用される可能性の高さが CVSS スコアに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.has_high_exploitability_chance.value</code><br><code>true</code> EPSS スコアが 1% を超える場合。 <code>false</code> それ以外の場合。</td>
    </tr>
  </tbody>
</table>

### 根拠 {#evidence-1}

EPSS スコアの根拠。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>epss_score</code></td>
      <td>数値</td>
      <td><strong>パス:</strong><code>@risk_details.has_high_exploitability_chance.evidence.epss_score</code><br>悪用される可能性を示すパーセンテージとしての EPSS スコア。</td>
    </tr>
    <tr>
      <td><code>epss_severity</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.has_high_exploitability_chance.evidence.epss_severity</code><br>EPSS スコアの重大度レベル。有効な値:<code>Critical</code>、<code>High</code>、<code>Medium</code>、<code>Low</code>。</td>
    </tr>
    <tr>
      <td><code>threshold</code></td>
      <td>数値</td>
      <td><strong>パス:</strong><code>@risk_details.has_high_exploitability_chance.evidence.threshold</code><br>脆弱性が高く悪用される可能性があると見なされるために必要な最小 EPSS スコア。</td>
    </tr>
  </tbody>
</table>

### 特権アクセスを持っている {#has-privileged-access}

リソースが特権アクセスを持っているかどうかに関する根拠と指標。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.has_privileged_access.evidence</code><br>特権アクセスの証明を示す根拠。</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.has_privileged_access.impact_cvss</code><br>特権アクセスが CVSS スコアに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.has_privileged_access.value</code><br><code>true</code> 検出結果に関連付けられたリソースが特権アクセスを持っている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
  </tbody>
</table>

### 根拠 {#evidence-2}

特権アクセスの証明を示す根拠。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>resource_key</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.has_privileged_access.evidence.resource_key</code><br>特権アクセスの証明を伴う Canonical Cloud Resource Identifier。</td>
    </tr>
  </tbody>
</table>

### 機密データを持っている {#has-sensitive-data}

影響を受けるリソースに機密データが含まれているかどうかに関する根拠と指標。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.has_sensitive_data.evidence</code><br>機密データの存在を裏付ける根拠。</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.has_sensitive_data.impact_cvss</code><br>機密データの存在が CVSS スコアに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.has_sensitive_data.value</code><br>次と同じ: <code>risk.has_sensitive_data</code>。</td>
    </tr>
  </tbody>
</table>

### 根拠 {#evidence-3}

機密データの存在を裏付ける根拠。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>sds_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.has_sensitive_data.evidence.sds_id</code><br>Datadog Sensitive Data Scanner が検出した機密データエントリーの識別子。</td>
    </tr>
  </tbody>
</table>

### 認証済みかどうか {#is-authenticated}

API エンドポイントに認証が必要かどうかに関する根拠と指標。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_authenticated.value</code><br>次と同じ: <code>risk.is_authenticated</code>。</td>
    </tr>
  </tbody>
</table>

### クラウンジュエルかどうか {#is-crown-jewel}

影響を受けるリソースが重要であるかどうかに関する根拠と指標。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_crown_jewel.evidence</code><br>リソースが重要であると識別するために使用される根拠。</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_crown_jewel.impact_cvss</code><br>リソースの重要性が CVSS スコアに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_crown_jewel.value</code><br><code>true</code> リソースがビジネスにとって重要である場合。 <code>false</code> それ以外の場合。</td>
    </tr>
  </tbody>
</table>

### 根拠 {#evidence-4}

リソースが重要であると識別するために使用される根拠。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>explanation</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_crown_jewel.evidence.explanation</code><br>リソースまたは関連リソースが重要であると識別された理由を詳述する説明。</td>
    </tr>
    <tr>
      <td><code>related_resource_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_crown_jewel.evidence.related_resource_name</code><br>重要なサービスなど、影響を受けるリソースが重要と見なされる理由を正当化する長期的な重要アセットの名前。</td>
    </tr>
    <tr>
      <td><code>related_resource_type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_crown_jewel.evidence.related_resource_type</code><br>影響を受けるリソースが重要と見なされる理由を正当化する長期的な重要アセットのタイプ。</td>
    </tr>
    <tr>
      <td><code>sensitive_data</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@risk_details.is_crown_jewel.evidence.sensitive_data</code><br>重要アセットとしての分類に寄与する、リソース上で検出される機密データのタイプ (例:<code>visa_credit_card</code>)。</td>
    </tr>
  </tbody>
</table>

### 新たに発生しているかどうか {#is-emerging}

脆弱性が新たに発生する脆弱性として分類されているかどうかに関する根拠と指標。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_emerging.impact_cvss</code><br>新たに発生する脆弱性のステータスが CVSS スコアに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_emerging.value</code><br>次と同じ: <code>risk.is_emerging</code>。</td>
    </tr>
  </tbody>
</table>

### 攻撃にさらされているかどうか {#is-exposed-to-attacks}

検出結果のサービスが攻撃にさらされているかどうかに関する根拠と指標。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_exposed_to_attacks.evidence</code><br>攻撃が存在する根拠。</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_exposed_to_attacks.impact_cvss</code><br>リソースの露出が CVSS スコアに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_exposed_to_attacks.value</code><br>次と同じ: <code>risk.is_exposed_to_attacks</code>。</td>
    </tr>
  </tbody>
</table>

### 根拠 {#evidence-5}

攻撃が存在する根拠。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>attacks_details</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_exposed_to_attacks.evidence.attacks_details</code><br>検出された攻撃の 1 つに関する詳細。</td>
    </tr>
    <tr>
      <td><code>trace_example</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_exposed_to_attacks.evidence.trace_example</code><br>検出結果のリソースで攻撃が検出されたトレースの例。</td>
    </tr>
    <tr>
      <td><code>trace_query</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_exposed_to_attacks.evidence.trace_query</code><br>検出結果のリソースに関連する攻撃が含まれるトレースを検索するために使用されるクエリ。</td>
    </tr>
  </tbody>
</table>

### 関数は到達可能かどうか {#is-function-reachable}

脆弱な関数またはモジュールがコード内で使用されているかどうかに関する根拠と指標。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_function_reachable.evidence</code><br>関数が到達可能かどうかを判断するために使用される根拠。</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_function_reachable.impact_cvss</code><br>関数の到達可能性が CVSS リスク評価に与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_function_reachable.value</code><br><code>true</code> 関数が到達可能な場合。 <code>false</code> それ以外の場合。</td>
    </tr>
  </tbody>
</table>

### 根拠 {#evidence-6}

関数が到達可能かどうかを判断するために使用される根拠。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>is_supported</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_function_reachable.evidence.is_supported</code><br><code>true</code> この検出結果に対して到達可能性分析がサポートされている場合。<code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>locations</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@risk_details.is_function_reachable.evidence.locations</code><br>関数が呼び出されているコードの場所の配列。</td>
    </tr>
    <tr>
      <td><code>not_supported_reason</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_function_reachable.evidence.not_supported_reason</code><br>この検出結果に対して到達可能性分析がサポートされていない理由。有効な値:<code>language_not_supported</code>、<code>vulnerable_symbol_not_available</code>。</td>
    </tr>
    <tr>
      <td><code>unreachable_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@risk_details.is_function_reachable.evidence.unreachable_at</code><br>脆弱な関数が呼び出されない場合に検出結果が到達不能状態に移行する時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
  </tbody>
</table>

### 場所 {#locations}

関数が呼び出されているコードの場所の配列。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_function_reachable.evidence.locations.filename</code><br>ファイルへの相対パス。</td>
    </tr>
    <tr>
      <td><code>last_detected_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@risk_details.is_function_reachable.evidence.locations.last_detected_at</code><br>コードの場所でこの関数が検出された直近の時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@risk_details.is_function_reachable.evidence.locations.line_start</code><br>開始行番号。</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_function_reachable.evidence.locations.symbol</code><br>コードの場所におけるシンボル名。</td>
    </tr>
  </tbody>
</table>

### イメージが実行されているかどうか {#is-image-running}

影響を受けるイメージでコンテナまたはホストが実行されているかどうかに関する根拠と指標。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_image_running.evidence</code><br>実行中のコンテナやホストがあることを示す根拠。</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_image_running.impact_cvss</code><br>実行中のコンテナやホストが CVSS スコアに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_image_running.value</code><br><code>true</code> 検出結果のリソースのイメージでコンテナやホストが実行されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
  </tbody>
</table>

### 根拠 {#evidence-7}

実行中のコンテナやホストがあることを示す根拠。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>detected_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@risk_details.is_image_running.evidence.detected_at</code><br>実行中のコンテナまたはホストが検出されたタイムスタンプ。</td>
    </tr>
  </tbody>
</table>

### カーネルが実行されているかどうか {#is-kernel-running}

脆弱性がホストで現在実行されているカーネルに影響を与えるどうかに関する根拠と指標。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_kernel_running.evidence</code><br>脆弱性が実行中のカーネルに影響を与えることを示す根拠。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_kernel_running.value</code><br><code>true</code> 脆弱性が現在ホストで実行されているカーネルに影響を与える場合。 <code>false</code> それ以外の場合。</td>
    </tr>
  </tbody>
</table>

### 根拠 {#evidence-8}

脆弱性が実行中のカーネルに影響を与えることを示す根拠。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>kernel_version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_kernel_running.evidence.kernel_version</code><br>ホストで現在実行中のカーネルのバージョン。</td>
    </tr>
  </tbody>
</table>

### パッケージが実行されているかどうか {#is-package-running}

影響を受けるパッケージが実行されているかどうかに関する根拠と指標。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_package_running.impact_cvss</code><br>実行中のパッケージが CVSS スコアに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_package_running.value</code><br><code>true</code> 検出結果のリソースのパッケージが実行されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
  </tbody>
</table>

### 本番環境かどうか {#is-production}

検出結果に関連付けられたリソースが本番環境で実行されているかどうかに関する根拠と指標。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_production.evidence</code><br>リソースが本番環境にあるかどうかを判断する <code>env</code> タグの値。</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_production.impact_cvss</code><br>本番環境のステータスが CVSS スコアに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_production.value</code><br>次と同じ: <code>risk.is_production</code>。</td>
    </tr>
  </tbody>
</table>

### 一般公開されているかどうか {#is-publicly-accessible}

影響を受けるリソースがパブリックインターネットからアクセス可能かどうかに関する情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@risk_details.is_publicly_accessible.evidence</code><br>インターネットからのアクセスを証明する根拠。</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_publicly_accessible.impact_cvss</code><br>一般公開が CVSS スコアに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_publicly_accessible.value</code><br>次と同じ: <code>risk.is_publicly_accessible</code>。</td>
    </tr>
  </tbody>
</table>

### 根拠 {#evidence-9}

インターネットからのアクセスを証明する根拠。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>resource_key</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_publicly_accessible.evidence.resource_key</code><br>インターネットからアクセス可能なリソースの Canonical Cloud Resource Identifier。</td>
    </tr>
  </tbody>
</table>

### データベースから汚染されているかどうか {#is-tainted-from-database}

汚染された部分がデータベースに由来するかどうかに関する情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_tainted_from_database.impact_cvss</code><br>データベースの汚染が CVSS スコアリングに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_tainted_from_database.value</code><br><code>true</code> 文字列が信頼できないデータベースソースに由来するために汚染されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
  </tbody>
</table>

### クエリ文字列から汚染されているかどうか {#is-tainted-from-query-string}

汚染された部分がクエリ文字列に由来するかどうかに関する情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_tainted_from_query_string.impact_cvss</code><br>クエリ文字列の汚染が CVSS スコアに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_tainted_from_query_string.value</code><br><code>true</code> 文字列が HTTP クエリ文字列に由来する要素を含んでいる場合。 <code>false</code> それ以外の場合。</td>
    </tr>
  </tbody>
</table>

### リクエスト URL から汚染されているかどうか {#is-tainted-from-request-url}

汚染された部分がリクエスト URL に由来するかどうかに関する情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_tainted_from_request_url.impact_cvss</code><br>リクエスト URL の汚染が CVSS スコアに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_tainted_from_request_url.value</code><br><code>true</code> 最終的な URL がリクエスト URL に由来する汚染された部分を含んでいる場合。 <code>false</code> それ以外の場合。</td>
    </tr>
  </tbody>
</table>

### SHA1 が使用されているかどうか {#is-using-sha1}

SHA1 が弱いハッシュで使用されているかどうかに関する情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@risk_details.is_using_sha1.impact_cvss</code><br>SHA1 の使用が CVSS スコアリングに与える影響。有効な値:<code>riskier</code>、<code>neutral</code>、<code>safer</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@risk_details.is_using_sha1.value</code><br><code>true</code> SHA1 が弱いハッシュで使用されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="ルール" level="h3" id="rule" %}}

脆弱性を発見する方法。ルールによる脆弱性の検出結果は、ソースコードまたは実行中のコードで脆弱性が検出されたことを示します。ルールは、誤構成や API セキュリティなど、脆弱性以外の検出結果にも使用されます。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>default_rule_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@rule.default_rule_id</code><br>ルールのデフォルトルール識別子。カスタムルールの場合は空白です。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@rule.id</code><br>検出結果を生成したルールの識別子。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@rule.name</code><br>検出結果を生成したルールの名前。</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@rule.type</code><br>検出結果を生成したルールのタイプ。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@rule.version</code><br>検出結果を生成したルールのバージョン。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="ランタイムコンテキスト" level="h3" id="runtime-context" %}}

ランタイムコンテキストに関連する属性をグループ化します。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>database_monitoring</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@runtime_context.database_monitoring</code><br>検出結果に関連付けられたデータベースモニタリングコンテキストが含まれます。</td>
    </tr>
    <tr>
      <td><code>span_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@runtime_context.span_id</code><br>検出結果が検出されたスパン識別子。IAST (インタラクティブアプリケーションセキュリティテスト) でのみ利用可能です。</td>
    </tr>
    <tr>
      <td><code>stacktrace_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@runtime_context.stacktrace_id</code><br>検出結果が検出されたスタックトレース識別子。IAST (インタラクティブアプリケーションセキュリティテスト) でのみ利用可能です。</td>
    </tr>
    <tr>
      <td><code>trace_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@runtime_context.trace_id</code><br>検出結果が検出されたトレース識別子。IAST (インタラクティブアプリケーションセキュリティテスト) でのみ利用可能です。</td>
    </tr>
    <tr>
      <td><code>vulnerable_services</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@runtime_context.vulnerable_services</code><br>検出結果の影響を受ける実行中のサービスバージョンを表示します (デプロイ環境、バージョン、Git コミット SHA で特定)。</td>
    </tr>
  </tbody>
</table>

### Database Monitoring {#database-monitoring}

検出結果に関連付けられたデータベースモニタリングコンテキストが含まれます。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>database_instances</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@runtime_context.database_monitoring.database_instances</code><br>検出結果の影響を受けるデータベースインスタンスの識別子。</td>
    </tr>
    <tr>
      <td><code>query_signature</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@runtime_context.database_monitoring.query_signature</code><br>検出結果に関連付けられた正規化 SQL クエリのハッシュ。</td>
    </tr>
  </tbody>
</table>

### 脆弱なサービス {#vulnerable-services}

検出結果の影響を受ける実行中のサービスバージョンを表示します (デプロイ環境、バージョン、Git コミット SHA で特定)。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>commit_sha</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@runtime_context.vulnerable_services.commit_sha</code><br>脆弱なサービスの Git コミット SHA が含まれます。</td>
    </tr>
    <tr>
      <td><code>env</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@runtime_context.vulnerable_services.env</code><br>脆弱なサービスのデプロイ環境を示します (例:<code>prod</code>、<code>staging</code>)。</td>
    </tr>
    <tr>
      <td><code>service_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@runtime_context.vulnerable_services.service_name</code><br>脆弱なサービスの名前が含まれます。</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@runtime_context.vulnerable_services.version</code><br>脆弱なサービスのバージョン識別子が含まれます。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="シークレット" level="h3" id="secret" %}}

シークレットの検証ステータスなど、シークレットの検出結果に固有の情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>is_git_history_only</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@secret.is_git_history_only</code><br><code>true</code> シークレットがブランチではなく過去のコミットにのみ表示される場合 <code>HEAD</code>。 <code>false</code> シークレットが以下に存在する場合。 <code>HEAD</code>。</td>
    </tr>
    <tr>
      <td><code>validation_status</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@secret.validation_status</code><br>シークレットがアクティブかどうかの検証を試みた結果。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="機密データ" level="h3" id="sensitive-data" %}}

Sensitive Data Scanner (SDS) の検出結果に固有の属性。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>match_action_type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@sensitive_data.match_action_type</code><br>Sensitive Data Scanner ルールで構成された一致アクションを示します。例: <code>redact</code> または <code>hash</code>。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="サービス" level="h3" id="service" %}}

検出結果が検出されたサービスに関する情報 (名前やソースコードメタデータを含む)。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>git_commit_sha</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@service.git_commit_sha</code><br>サービスで検出結果が検出された最新のコミットの Git コミット SHA。ソースコードインテグレーションが構成されている場合にのみ使用可能です。</td>
    </tr>
    <tr>
      <td><code>git_repository_url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@service.git_repository_url</code><br>検出結果に関連付けられたサービスの Git リポジトリの URL。ソースコードインテグレーションが構成されている場合にのみ使用可能です。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@service.name</code><br>検出結果が検出されたサービスの名前。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="重大度の詳細" level="h3" id="severity-details" %}}

基本重大度や調整済み重大度を含む、検出結果の重大度に関する詳細情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>adjusted</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@severity_details.adjusted</code><br>コンテキスト要因や環境要因を考慮した後の調整済み重大度。</td>
    </tr>
    <tr>
      <td><code>base</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@severity_details.base</code><br>コンテキスト調整を行う前の、元のルール、アドバイザリー、またはスキャナーによって定義された検出結果の基本重大度。</td>
    </tr>
    <tr>
      <td><code>user_adjusted</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@severity_details.user_adjusted</code><br>ユーザー定義の重大度変更を適用した後の検出結果の重大度。</td>
    </tr>
  </tbody>
</table>

### 調整済み {#adjusted}

コンテキスト要因や環境要因を考慮した後の調整済み重大度。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>score</code></td>
      <td>数値</td>
      <td><strong>パス:</strong><code>@severity_details.adjusted.score</code><br>重大度の数値スコア (CVSS スケール)。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@severity_details.adjusted.value</code><br>重大度レベル。有効な値:<code>critical</code>、<code>high</code>、<code>medium</code>、<code>low</code>、<code>info</code>、<code>none</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value_id</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@severity_details.adjusted.value_id</code><br>重大度の数値表現。値:<code>critical</code> = <code>10</code>、<code>high</code> = <code>9</code>、<code>medium</code> = <code>7</code>、<code>low</code> = <code>4</code>、<code>none</code> = <code>0</code>。</td>
    </tr>
    <tr>
      <td><code>vector</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@severity_details.adjusted.vector</code><br>CVSS ベクター文字列。</td>
    </tr>
  </tbody>
</table>

### ベース {#base-2}

コンテキスト調整を行う前の、元のルール、アドバイザリー、またはスキャナーによって定義された検出結果の基本重大度。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>score</code></td>
      <td>数値</td>
      <td><strong>パス:</strong><code>@severity_details.base.score</code><br>重大度の数値スコア (CVSS スケール)。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@severity_details.base.value</code><br>重大度レベル。有効な値:<code>critical</code>、<code>high</code>、<code>medium</code>、<code>low</code>、<code>info</code>、<code>none</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value_id</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@severity_details.base.value_id</code><br>重大度の数値表現。値:<code>critical</code> = <code>10</code>、<code>high</code> = <code>9</code>、<code>medium</code> = <code>7</code>、<code>low</code> = <code>4</code>、<code>none</code> = <code>0</code>。</td>
    </tr>
    <tr>
      <td><code>vector</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@severity_details.base.vector</code><br>CVSS ベクター文字列。</td>
    </tr>
  </tbody>
</table>

### ユーザー調整済み {#user-adjusted}

ユーザー定義の重大度変更を適用した後の検出結果の重大度。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>score</code></td>
      <td>数値</td>
      <td><strong>パス:</strong><code>@severity_details.user_adjusted.score</code><br>重大度の数値スコア (CVSS スケール)。</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@severity_details.user_adjusted.value</code><br>重大度レベル。有効な値:<code>critical</code>、<code>high</code>、<code>medium</code>、<code>low</code>、<code>info</code>、<code>none</code>、<code>unknown</code>。</td>
    </tr>
    <tr>
      <td><code>value_id</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@severity_details.user_adjusted.value_id</code><br>重大度の数値表現。値:<code>critical</code> = <code>10</code>、<code>high</code> = <code>9</code>、<code>medium</code> = <code>7</code>、<code>low</code> = <code>4</code>、<code>none</code> = <code>0</code>。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="脆弱性" level="h3" id="vulnerability" %}}

脆弱性固有の情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cisa</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@vulnerability.cisa</code><br>脆弱性に関連する Cybersecurity and Infrastructure Security Agency (CISA) のメタデータ。</td>
    </tr>
    <tr>
      <td><code>cisa_bod2604_remediation_timeline</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.cisa_bod2604_remediation_timeline</code><br>(非推奨) CISA Binding Operational Directive (BOD) 26-04 に基づく脆弱性の修正に必要な最大時間数 (暦日)。有効な値:<code>three_days_and_forensic_triage</code>、<code>three_days</code>、<code>fourteen_days</code>、<code>sixty_days</code>、<code>fix_on_system_upgrade</code>。Datadog は、CISA またはエクスポージャーの入力が変更された場合にこの値を再計算します。次を使用します。 <code>@vulnerability.cisa.bod2604_remediation_timeline</code> (代替)。</td>
    </tr>
    <tr>
      <td><code>confidence</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.confidence</code><br>脆弱性が真陽性であると評価された可能性。</td>
    </tr>
    <tr>
      <td><code>confidence_reason</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.confidence_reason</code><br>割り当てられた信頼度レベルの根拠。</td>
    </tr>
    <tr>
      <td><code>cwes</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@vulnerability.cwes</code><br>脆弱性に関連付けられた CWE (Common Weakness Enumeration) 識別子。各エントリーは <code>CWE-&lt;id&gt;</code> 形式を使用する必要があります (例:<code>CWE-416</code>)。</td>
    </tr>
    <tr>
      <td><code>first_commit</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.first_commit</code><br>脆弱性が最初に導入されたコミット。</td>
    </tr>
    <tr>
      <td><code>hash</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.hash</code><br>SCA (Software Composition Analysis) のランタイム解析と静的解析の間で同じ脆弱性を関連付けるために使用される脆弱性ハッシュ。</td>
    </tr>
    <tr>
      <td><code>introduced_at_commit</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@vulnerability.introduced_at_commit</code><br>脆弱性が導入された Git コミットの詳細が含まれます。</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@vulnerability.is_emerging</code><br><code>true</code> 脆弱性が新たな脅威として分類されている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>is_inherited_from_base_image</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@vulnerability.is_inherited_from_base_image</code><br><code>true</code> 脆弱性がベースイメージレイヤーに起因する場合。<code>false</code> コンテナイメージ作成者によって追加されたレイヤーに起因する場合。</td>
    </tr>
    <tr>
      <td><code>last_commit</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.last_commit</code><br>脆弱性が修正されたコミット。</td>
    </tr>
    <tr>
      <td><code>owasp_top10_years</code></td>
      <td>配列 (整数)</td>
      <td><strong>パス:</strong><code>@vulnerability.owasp_top10_years</code><br>脆弱性が OWASP Top 10 の重大な脆弱性リストに表示された年。</td>
    </tr>
    <tr>
      <td><code>removed_at_commit</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@vulnerability.removed_at_commit</code><br>脆弱性が削除された Git コミットの詳細が含まれます。</td>
    </tr>
    <tr>
      <td><code>stack</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@vulnerability.stack</code><br>脆弱性が見つかった技術スタック。</td>
    </tr>
  </tbody>
</table>

### CISA {#cisa}

この脆弱性に関連する Cybersecurity and Infrastructure Security Agency (CISA) のメタデータ。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>bod2604_remediation_timeline</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.cisa.bod2604_remediation_timeline</code><br>CISA Binding Operational Directive (BOD) 26-04 に基づく脆弱性の修正に必要な最大時間数 (暦日)。有効な値:<code>three_days_and_forensic_triage</code>、<code>three_days</code>、<code>fourteen_days</code>、<code>sixty_days</code>、<code>fix_on_system_upgrade</code>。Datadog は、CISA またはエクスポージャーの入力が変更された場合にこの値を再計算します。</td>
    </tr>
    <tr>
      <td><code>kev_added_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@vulnerability.cisa.kev_added_at</code><br>脆弱性が CISA Known Exploited Vulnerabilities (KEV) カタログに追加された時間 (ミリ秒、UTC)。</td>
    </tr>
  </tbody>
</table>

### コミットで導入済み {#introduced-at-commit}

脆弱性が導入された Git コミットの詳細が含まれます。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>author</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@vulnerability.introduced_at_commit.author</code><br>コミットの元の作成者に関する詳細が含まれます。</td>
    </tr>
    <tr>
      <td><code>committer</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@vulnerability.introduced_at_commit.committer</code><br>リポジトリにコミットを適用した人物に関する詳細が含まれます。</td>
    </tr>
    <tr>
      <td><code>message</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.introduced_at_commit.message</code><br>Git コミットメッセージが含まれます。</td>
    </tr>
    <tr>
      <td><code>sha</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.introduced_at_commit.sha</code><br>Git コミット識別子 (SHA)。</td>
    </tr>
  </tbody>
</table>

### 作成者 {#author-1}

コミットの元の作成者に関する詳細が含まれます。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>authored_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@vulnerability.introduced_at_commit.author.authored_at</code><br>元の変更が行われた時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.introduced_at_commit.author.email</code><br>コミット作成者のメールアドレス。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.introduced_at_commit.author.name</code><br>コミット作成者の名前。</td>
    </tr>
  </tbody>
</table>

### コミッター {#committer-1}

リポジトリにコミットを適用した人物に関する詳細が含まれます。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>committed_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@vulnerability.introduced_at_commit.committer.committed_at</code><br>変更が最後に大幅に修正された時間を示すタイムスタンプ (ミリ秒、UTC。例: リベースまたは修正操作中)。</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.introduced_at_commit.committer.email</code><br>コミッターのメールアドレス。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.introduced_at_commit.committer.name</code><br>コミッターの名前。</td>
    </tr>
  </tbody>
</table>

### コミットで削除済み {#removed-at-commit}

脆弱性が削除された Git コミットの詳細が含まれます。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>author</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@vulnerability.removed_at_commit.author</code><br>コミットの元の作成者に関する詳細が含まれます。</td>
    </tr>
    <tr>
      <td><code>committer</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@vulnerability.removed_at_commit.committer</code><br>リポジトリにコミットを適用した人物に関する詳細が含まれます。</td>
    </tr>
    <tr>
      <td><code>message</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.removed_at_commit.message</code><br>Git コミットメッセージが含まれます。</td>
    </tr>
    <tr>
      <td><code>sha</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.removed_at_commit.sha</code><br>Git コミット識別子 (SHA)。</td>
    </tr>
  </tbody>
</table>

### 作成者 {#author-2}

コミットの元の作成者に関する詳細が含まれます。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>authored_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@vulnerability.removed_at_commit.author.authored_at</code><br>元の変更が行われた時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.removed_at_commit.author.email</code><br>コミット作成者のメールアドレス。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.removed_at_commit.author.name</code><br>コミット作成者の名前。</td>
    </tr>
  </tbody>
</table>

### コミッター {#committer-2}

リポジトリにコミットを適用した人物に関する詳細が含まれます。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>committed_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@vulnerability.removed_at_commit.committer.committed_at</code><br>変更が最後に大幅に修正された時間を示すタイムスタンプ (ミリ秒、UTC。例: リベースまたは修正操作中)。</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.removed_at_commit.committer.email</code><br>コミッターのメールアドレス。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.removed_at_commit.committer.name</code><br>コミッターの名前。</td>
    </tr>
  </tbody>
</table>

### スタック {#stack}

脆弱性が見つかった技術スタック。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ecosystem</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.stack.ecosystem</code><br>脆弱なコンポーネントの発生元となったパッケージ管理エコシステムまたはソースレジストリ。</td>
    </tr>
    <tr>
      <td><code>language</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@vulnerability.stack.language</code><br>脆弱性が見つかった言語。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="ワークフロー" level="h3" id="workflow" %}}

検出後の検出結果の管理に関連するすべての変更可能な情報。UI を通じて手動で、またはパイプラインを通じて自動で更新できるフィールドが含まれます。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>auto_closed_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@workflow.auto_closed_at</code><br>システムによって検出結果が自動的にクローズされた時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>automations</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@workflow.automations</code><br>検出結果に適用される自動化ルールに関する情報。</td>
    </tr>
    <tr>
      <td><code>due_date</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.due_date</code><br>検出結果に適用される期限ルール。</td>
    </tr>
    <tr>
      <td><code>integrations</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.integrations</code><br>検出結果のトリアージや修正に使用される、Jira、Case Management、ServiceNow などの Integrations。</td>
    </tr>
    <tr>
      <td><code>mute</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.mute</code><br>ミュート設定情報およびメタデータ。</td>
    </tr>
    <tr>
      <td><code>severity_override</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.severity_override</code><br>検出結果に適用される、ユーザー定義の重大度の変更に関するメタデータ。</td>
    </tr>
    <tr>
      <td><code>triage</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.triage</code><br>割り当ておよびステータス情報。割り当ては、ケース情報や Jira 情報と同期される場合があります。</td>
    </tr>
  </tbody>
</table>

### 自動化 {#automations}

検出結果に適用される自動化ルールに関する情報。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>rule_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.automations.rule_id</code><br>自動化ルールの一意の識別子。</td>
    </tr>
    <tr>
      <td><code>rule_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.automations.rule_name</code><br>人間が読める形式の、検出結果に適用されている自動化ルールの名前。</td>
    </tr>
    <tr>
      <td><code>rule_type</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.automations.rule_type</code><br>検出結果に適用されている自動化ルールのタイプ。有効な値:<code>due_date</code>、<code>mute</code>、<code>security_inbox</code>、<code>severity_modifier</code>、<code>ticket_creation</code>。</td>
    </tr>
  </tbody>
</table>

### 期限 {#due-date}

検出結果に適用される期限ルール。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>due_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@workflow.due_date.due_at</code><br>検出結果の期限を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>is_overdue</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@workflow.due_date.is_overdue</code><br><code>true</code> 期限が過ぎている場合。 <code>false</code> それ以外の場合。</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.due_date.rule_id</code><br>検出結果に適用される期限ルールの一意の識別子。</td>
    </tr>
  </tbody>
</table>

### Integrations {#integrations}

検出結果のトリアージや修正に使用される、Jira、Case Management、ServiceNow などの Integrations。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cases</code></td>
      <td>配列 (オブジェクト)</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases</code><br>検出結果に添付されるケースの配列。</td>
    </tr>
    <tr>
      <td><code>jira</code></td>
      <td>配列 (文字列)</td>
      <td><strong>パス:</strong><code>@workflow.integrations.jira</code><br>次の形式で検出結果に添付される Jira の問題キー: <code>&lt;PROJECT&gt;-&lt;NUMBER&gt;</code> (例:<code>PROJ-123</code>)。</td>
    </tr>
  </tbody>
</table>

### ケース {#cases}

検出結果に添付されるケースの配列。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>assignee</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.assignee</code><br>ケースに割り当てられるユーザー。</td>
    </tr>
    <tr>
      <td><code>created_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.created_at</code><br>ケースが作成された時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>created_by</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.created_by</code><br>ケースを作成したユーザー。</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.id</code><br>UUID 形式でのケースの一意の識別子。</td>
    </tr>
    <tr>
      <td><code>jira_issue</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.jira_issue</code><br>ケースに添付される Jira の問題。</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.key</code><br>人間が読める次の形式のケースの識別子。 <code>PROJECT-NUMBER</code> (例:<code>CSMINV-66</code>)。</td>
    </tr>
    <tr>
      <td><code>linear_issue</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.linear_issue</code><br>ケースに添付される Linear の問題。</td>
    </tr>
    <tr>
      <td><code>servicenow_ticket</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.servicenow_ticket</code><br>ケースに添付される ServiceNow チケット。</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.status</code><br>ケースのステータス。</td>
    </tr>
    <tr>
      <td><code>title</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.title</code><br>ケースのタイトル。</td>
    </tr>
    <tr>
      <td><code>updated_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.updated_at</code><br>ケースが最後に更新された時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>updated_by</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.updated_by</code><br>ケースを最後に更新したユーザー。</td>
    </tr>
  </tbody>
</table>

### 担当者 {#assignee}

ケースに割り当てられるユーザー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.assignee.id</code><br>UUID 形式でのユーザーの一意の識別子。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.assignee.name</code><br>ユーザーの表示名。</td>
    </tr>
  </tbody>
</table>

### 作成者 {#created-by}

ケースを作成したユーザー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.created_by.id</code><br>UUID 形式でのユーザーの一意の識別子。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.created_by.name</code><br>ユーザーの表示名。</td>
    </tr>
  </tbody>
</table>

### Jira の問題 {#jira-issue}

ケースに添付される Jira の問題。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>key</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.jira_issue.key</code><br>次の形式の Jira の問題の識別子。 <code>PROJECT-NUMBER</code> (例:<code>CSMSEC-103991</code>)。</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.jira_issue.status</code><br>Jira の問題の現在のステータス。</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.jira_issue.url</code><br>Jira の問題への完全な URL。</td>
    </tr>
  </tbody>
</table>

### Linear の問題 {#linear-issue}

ケースに添付される Linear の問題。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>key</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.linear_issue.key</code><br>次の形式の Linear 課題の問題の識別子。 <code>TEAM-NUMBER</code> (例:<code>SEC-42</code>)。</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.linear_issue.status</code><br>Linear の問題の現在のステータス。</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.linear_issue.url</code><br>Linear の問題への完全な URL。</td>
    </tr>
  </tbody>
</table>

### ServiceNow チケット {#servicenow-ticket}

ケースに添付される ServiceNow チケット。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>state</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.servicenow_ticket.state</code><br>ServiceNow チケットの現在の状態。</td>
    </tr>
    <tr>
      <td><code>sys_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.servicenow_ticket.sys_id</code><br>ServiceNow の 32 文字の 16 進数チケット識別子 (例: 9f8c7e2d3b4a5c6d7e8f9a0b1c2d3e4f)。</td>
    </tr>
    <tr>
      <td><code>table_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.servicenow_ticket.table_name</code><br>チケットが保存されているテーブルの名前。有効な値:<code>incident</code>、<code>em_event</code>。</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.servicenow_ticket.url</code><br>ServiceNow チケットへのダイレクト URL。</td>
    </tr>
  </tbody>
</table>

### 更新者 {#updated-by}

ケースを最後に更新したユーザー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.updated_by.id</code><br>UUID 形式でのユーザーの一意の識別子。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.integrations.cases.updated_by.name</code><br>ユーザーの表示名。</td>
    </tr>
  </tbody>
</table>

### ミュート {#mute}

ミュート設定情報およびメタデータ。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>description</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.mute.description</code><br>検出結果がミュートされた理由を説明するフリーテキスト。</td>
    </tr>
    <tr>
      <td><code>expire_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@workflow.mute.expire_at</code><br>ミュートが期限切れになる時間を示すタイムスタンプ (ミリ秒、UTC)。設定されていない場合、ミュートは永続的なものになります。</td>
    </tr>
    <tr>
      <td><code>is_muted</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@workflow.mute.is_muted</code><br><code>true</code> 検出結果がミュートされている場合。 <code>false</code> アクティブな場合。</td>
    </tr>
    <tr>
      <td><code>is_muted_by_rule</code></td>
      <td>ブール値</td>
      <td><strong>パス:</strong><code>@workflow.mute.is_muted_by_rule</code><br><code>true</code> 検出結果が自動化ルールによってミュートされている場合。 <code>false</code> それ以外の場合。もし <code>true</code>場合、関連する自動化ルールは workflow.automations セクションで参照されます。</td>
    </tr>
    <tr>
      <td><code>muted_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@workflow.mute.muted_at</code><br>検出結果がミュートされた時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>muted_by</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.mute.muted_by</code><br>検出結果をミュートしたユーザー。</td>
    </tr>
    <tr>
      <td><code>reason</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.mute.reason</code><br>検出結果をミュートするために提供された理由。有効な値:<code>none</code>、<code>no_pending_fix</code>、<code>human_error</code>、<code>no_longer_accepted_risk</code>、<code>other</code>、<code>pending_fix</code>、<code>false_positive</code>、<code>accepted_risk</code>、<code>no_fix</code>、<code>duplicate</code>、<code>risk_accepted</code>、<code>muted_in_code</code>。</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.mute.rule_id</code><br>検出結果をミュートした自動化ルールの一意の識別子。次の場合にのみ設定されます。 <code>is_muted_by_rule</code> が <code>true</code>。</td>
    </tr>
    <tr>
      <td><code>rule_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.mute.rule_name</code><br>人間が読める形式の、検出結果をミュートした自動化ルールの名前。次の場合にのみ設定されます。 <code>is_muted_by_rule</code> が <code>true</code>。</td>
    </tr>
  </tbody>
</table>

### ミュートしたユーザー {#muted-by}

検出結果をミュートしたユーザー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.mute.muted_by.id</code><br>UUID 形式でのユーザーの一意の識別子。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.mute.muted_by.name</code><br>ユーザーの表示名。</td>
    </tr>
  </tbody>
</table>

### 重大度の上書き {#severity-override}

検出結果に適用される、ユーザー定義の重大度の変更に関するメタデータ。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>description</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.severity_override.description</code><br>検出結果に適用される、ユーザー定義の重大度の変更の説明。</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.severity_override.rule_id</code><br>この重大度の上書きを適用した重大度修飾子自動化ルールの識別子。自動化ルールによって上書きが適用された場合にのみ設定されます。</td>
    </tr>
    <tr>
      <td><code>rule_name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.severity_override.rule_name</code><br>この重大度の上書きを適用した重大度修飾子自動化ルールの名前。自動化ルールによって上書きが適用された場合にのみ設定されます。</td>
    </tr>
    <tr>
      <td><code>updated_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@workflow.severity_override.updated_at</code><br>手動による重大度の上書きが適用された時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>updated_by</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.severity_override.updated_by</code><br>手動による重大度の上書きを適用したユーザー。</td>
    </tr>
  </tbody>
</table>

### 更新者 {#updated-by-1}

手動による重大度の上書きを適用したユーザー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.severity_override.updated_by.id</code><br>UUID 形式でのユーザーの一意の識別子。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.severity_override.updated_by.name</code><br>ユーザーの表示名。</td>
    </tr>
  </tbody>
</table>

### トリアージ {#triage}

割り当ておよびステータス情報。割り当ては、ケース情報や Jira 情報と同期される場合があります。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>assignee</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.triage.assignee</code><br>検出結果に割り当てられるユーザー。</td>
    </tr>
  </tbody>
</table>

### 担当者 {#assignee-1}

検出結果に割り当てられるユーザー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.triage.assignee.id</code><br>UUID 形式での担当者の一意の識別子。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.triage.assignee.name</code><br>担当者の表示名。</td>
    </tr>
    <tr>
      <td><code>updated_at</code></td>
      <td>整数</td>
      <td><strong>パス:</strong><code>@workflow.triage.assignee.updated_at</code><br>担当者が最後に変更された時間を示すタイムスタンプ (ミリ秒、UTC)。</td>
    </tr>
    <tr>
      <td><code>updated_by</code></td>
      <td>オブジェクト</td>
      <td><strong>パス:</strong><code>@workflow.triage.assignee.updated_by</code><br>担当者を最後に変更したユーザー。</td>
    </tr>
  </tbody>
</table>

### 更新者 {#updated-by-2}

担当者を最後に変更したユーザー。

<table>
  <thead>
    <tr>
      <th style="width: 25%;">属性名</th>
      <th style="width: 15%;">タイプ</th>
      <th style="width: 60%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.triage.assignee.updated_by.id</code><br>UUID 形式でのユーザーの一意の識別子。</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>文字列</td>
      <td><strong>パス:</strong><code>@workflow.triage.assignee.updated_by.name</code><br>ユーザーの表示名。</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}
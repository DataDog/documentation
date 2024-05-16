---
kind: ドキュメント
title: Agent で CSM Pro を有効にする
type: multi-code-lang
---

Agent で CSM Pro をセットアップして、[CSM Vulnerabilities][2] 用にコンテナイメージのメタデータ収集と [Software Bill of Materials (SBOM)][1] 収集を有効にします。これにより、コンテナイメージ内のライブラリをスキャンして脆弱性を検出することができます。脆弱性は 1 時間ごとに評価され、コンテナに対してスキャンされます。

Agent で CSM Pro を有効にする方法の詳細については、インフラストラクチャータイプを選択してください。

{{< partial name="csm/csm-pro-agent-tiles.html" >}}

[1]: https://www.cisa.gov/sbom
[2]: /ja/security/cloud_security_management/vulnerabilities
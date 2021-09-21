---
title: コンプライアンスのモニタリング
kind: ドキュメント
---

{{< alert >}}
Compliance Monitoring は、現在非公開ベータ版でご利用いただけます。この<a href="https://docs.google.com/forms/d/e/1FAIpQLScTA913tNGptcAeNNdWlvgECjekYoDVJwR-OkMtZYnJnq-FWw/viewform">フォーム</a>を使用してアクセスをリクエストしてください。
{{< /alert >}}

## 概要

Datadog Compliance Monitoring により、コンテナとホストのランタイムセキュリティと継続的なコンプライアンス監視が可能になります。

{{< img src="compliance_monitoring/compliance-overview.png" alt="Datadog Compliance Monitoring" >}}

**File Integrity Monitoring (FIM)** を使用すると、ホストまたはコンテナの主要なファイルとディレクトリへの変更をリアルタイムで監視することができます。また、コンテナと Kubernetes クラスターに対して **Continuous Compliance** チェックを使用すると、Docker と Kubernetes の一般的な CIS コンプライアンスベンチマークで定義されているコンフィギュレーションの問題を見つけることができます。必要に応じて、これらの機能のいずれか (または両方) を有効にすることができます。

## その他の参考資料

{{< whatsnext desc="Compliance Monitoring を開始する:">}}
  {{< nextlink href="/security_monitoring/default_rules">}}<u>デフォルトのルールについて学ぶ</u>: AWS、Docker、Kubernetes のすぐに使える Compliance Monitoring ルール。{{< /nextlink >}}

{{< /whatsnext >}}


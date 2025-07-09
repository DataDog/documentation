---
disable_toc: false
title: 脅威管理 (Threat Management) のセットアップ
---

## 前提条件

脅威管理をセットアップする前に、以下の前提条件が満たされていることを確認してください。
- **Datadog Agent Installation:** The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment.
- **Datadog APM Configuration:** Datadog APM is configured for your application or service, and web traces (`type:web`) are being received by Datadog.
- **サポートされるトレースライブラリ:** アプリケーションまたはサービスで使用されている Datadog トレースライブラリが、該当アプリケーションまたはサービスの言語に対する脅威管理機能に対応している必要があります。詳細については、[Library Compatibility][1] のページを参照してください。

## Datadog Tracing Libraries

[Datadog トレースライブラリの構成][3]に、環境変数または新しい引数を追加します。

これらの手順に従うことで、脅威管理をアプリケーションまたはサービスに対して正常にセットアップでき、攻撃を受けているサービスを監視し、攻撃から保護できるようになります。

[1]: /ja/security/application_security/threats/setup/compatibility
[3]: /ja/security/application_security/threats/setup/threat_detection
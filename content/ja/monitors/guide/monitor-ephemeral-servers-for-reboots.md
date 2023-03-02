---
aliases:
- /ja/monitors/faq/how-do-i-monitor-ephemeral-servers-for-reboots
further_reading:
- link: /monitors/
  tag: ドキュメント
  text: モニターの作成方法
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
kind: ガイド
title: エフェメラルサーバーの再起動を監視する
---

エフェメラル環境では、ホストのスピンアップとターミネーションを常に繰り返すため、新しいホストと再起動したホストを区別するのが難しい場合があります。

この問題に対処するために、`system.uptime` メトリクスのメトリクスモニターを使用することができます。uptime メトリクスは増え続けるタイマーで、ホストが起動すると 0 にリセットされます。このメトリクスで `diff()` 関数を使用すると、アップタイムが 0 の新しいサーバーと、実行中のアップタイム値から 0 への変化 (diff) を示す再起動したサーバーを区別することができます。

以下に示す例は、この設定方法をキャプチャしたものです。

{{< img src="monitors/guide/ephemeral_set_up.png" alt="ephemeral_set_up"  >}}


{{< partial name="whats-next/whats-next.html" >}}
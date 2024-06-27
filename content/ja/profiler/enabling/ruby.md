---
aliases:
- /ja/tracing/profiler/enabling/ruby/
code_lang: ruby
code_lang_weight: 40
further_reading:
- link: getting_started/profiler
  tag: ドキュメント
  text: プロファイラーの概要
- link: profiler/search_profiles
  tag: ドキュメント
  text: 使用可能なプロファイルタイプの詳細
- link: profiler/profiler_troubleshooting/ruby
  tag: ドキュメント
  text: プロファイラの使用中に発生する問題を修正
- link: https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/
  tag: ブログ
  text: Datadog Continuous Profiler で Ruby のコードパフォーマンスを分析
title: Ruby プロファイラーの有効化
type: multi-code-lang
---

プロファイラーは、Datadog トレースライブラリ内で送信されます。アプリケーションですでに [APM を使用してトレースを収集][1]している場合は、ライブラリのインストールをスキップして、プロファイラーの有効化に直接進むことができます。

## 要件

Datadog プロファイラーには Ruby 2.3+ が必要です (JRuby と TruffleRuby はサポートされていません)。

以下の OS、アーキテクチャに対応しています。
- Linux (GNU libc) x86-64、aarch64
- Alpine Linux (musl libc) x86-64、aarch64

また、[`pkg-config`](https://www.freedesktop.org/wiki/Software/pkg-config/) または [`pkgconf`](https://github.com/pkgconf/pkgconf) Linux システムユーティリティのいずれかがインストールされている必要があります。
このユーティリティは、ほとんどの Linux ディストリビューションのソフトウェアリポジトリで入手できます。例:

- `pkg-config` パッケージは [Homebrew](https://formulae.brew.sh/formula/pkg-config)、[Debian](https://packages.debian.org/search?keywords=pkg-config) および [Ubuntu](https://packages.ubuntu.com/search?keywords=pkg-config) ベースの Linux で利用可能です
- `pkgconf` パッケージは [Arch](https://archlinux.org/packages/?q=pkgconf) および [Alpine](https://pkgs.alpinelinux.org/packages?name=pkgconf) ベースの Linux で利用可能です
- `pkgconf-pkg-config` パッケージは [Fedora](https://packages.fedoraproject.org/pkgs/pkgconf/pkgconf-pkg-config/) および [Red-Hat](https://rpmfind.net/linux/rpm2html/search.php?query=pkgconf-pkg-config) ベースの Linux で利用可能です

Continuous Profiler は、AWS Lambda などのサーバーレスプラットフォームには対応していません。

## インストール

アプリケーションのプロファイリングを開始するには

1. すでに Datadog を使用している場合は、Agent をバージョン [7.20.2][2] 以降または [6.20.2][3] 以降にアップグレードしてください。

2. `ddtrace` および `google-protobuf` gem を `Gemfile` または `gems.rb` ファイルに追加します。

    ```ruby
    gem 'ddtrace', '~> 1.0'
    gem 'google-protobuf', '~> 3.0'
    ```

2. `bundle install` で gem をインストールします。

3. プロファイラーを有効にします。

   {{< tabs >}}
{{% tab "環境変数" %}}

```shell
export DD_PROFILING_ENABLED=true
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
```

{{% /tab %}}
{{% tab "In code" %}}

```ruby
Datadog.configure do |c|
  c.profiling.enabled = true
  c.env = 'prod'
  c.service = 'my-web-app'
  c.version = '1.0.3'
end
```

 **注**: Rails アプリケーションの場合は、上記のコードコンフィギュレーションで `config/initializers/datadog.rb` ファイルを作成します。

{{% /tab %}}
{{< /tabs >}}

4. Ruby アプリケーションの起動コマンドに `ddtracerb exec` コマンドを追加します。

    ```shell
    bundle exec ddtracerb exec ruby myapp.rb
    ```

    Rails の例:

    ```shell
    bundle exec ddtracerb exec bin/rails s
    ```

    **注**

    アプリケーションを `ddtracerb exec` で起動する選択肢がない (Phusion Passenger ウェブサーバーを使用している) 場合、Web アプリケーションの `config.ru` などのアプリケーションエントリポイントに以下を追加してプロファイラーを起動することも可能です。

    ```ruby
    require 'datadog/profiling/preload'
    ```


4. Ruby アプリケーションの起動 1〜2 分後、[Datadog APM > Profiler ページ][4]にプロファイルが表示されます。

## 次のステップ

[プロファイラーの概要][5]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[4]: https://app.datadoghq.com/profiling
[5]: /ja/getting_started/profiler/
[12]: /ja/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /ja/profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
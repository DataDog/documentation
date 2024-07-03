---
aliases:
- /ja/tracing/profiler/enabling/ruby/
code_lang: ruby
code_lang_weight: 40
further_reading:
- link: getting_started/profiler
  tag: Documentation
  text: Getting Started with Profiler
- link: profiler/profile_visualizations
  tag: Documentation
  text: Learn more about available profile visualizations
- link: profiler/profiler_troubleshooting/ruby
  tag: Documentation
  text: Fix problems you encounter while using the profiler
- link: https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/
  tag: Blog
  text: Analyze Ruby code performance with Datadog Continuous Profiler
title: Enabling the Ruby Profiler
type: multi-code-lang
---

プロファイラーは、Datadog トレースライブラリ内で送信されます。アプリケーションですでに [APM を使用してトレースを収集][1]している場合は、ライブラリのインストールをスキップして、プロファイラーの有効化に直接進むことができます。

## 要件

すべての言語におけるランタイムとトレーサーの最小バージョンと推奨バージョンの要約については、[サポートされている言語とトレーサーのバージョン][14]をお読みください。

The Datadog Profiler requires Ruby 2.5+. JRuby and TruffleRuby are not supported.

以下の OS、アーキテクチャに対応しています。
- Linux (GNU libc) x86-64、aarch64
- Alpine Linux (musl libc) x86-64、aarch64

You also need either the [`pkg-config`](https://www.freedesktop.org/wiki/Software/pkg-config/) or the [`pkgconf`](https://github.com/pkgconf/pkgconf) system utility installed.
This utility is available on the software repositories of most Linux distributions. For example:

- `pkg-config` パッケージは [Homebrew](https://formulae.brew.sh/formula/pkg-config)、[Debian](https://packages.debian.org/search?keywords=pkg-config) および [Ubuntu](https://packages.ubuntu.com/search?keywords=pkg-config) ベースの Linux で利用可能です
- `pkgconf` パッケージは [Arch](https://archlinux.org/packages/?q=pkgconf) および [Alpine](https://pkgs.alpinelinux.org/packages?name=pkgconf) ベースの Linux で利用可能です
- `pkgconf-pkg-config` パッケージは [Fedora](https://packages.fedoraproject.org/pkgs/pkgconf/pkgconf-pkg-config/) および [Red-Hat](https://rpmfind.net/linux/rpm2html/search.php?query=pkgconf-pkg-config) ベースの Linux で利用可能です

Continuous Profiler は、AWS Lambda などのサーバーレスプラットフォームには対応していません。

[Single Step Instrumentation](https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/) is not supported for Linux hosts, VMs, or Docker.
Single Step Instrumentation is supported for Kubernetes (using the Datadog Helm chart), but you need to manually set the `DD_PROFILING_ENABLED=true` environment variable to enable profiling.

## インストール

アプリケーションのプロファイリングを開始するには

1. Ensure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][2].

2. Add the `datadog` gem to your `Gemfile` or `gems.rb` file:

    ```ruby
    gem 'datadog', '~> 2.0'
    ```
3. `bundle install` で gem をインストールします。

4. プロファイラーを有効にします。

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

5. Add the `ddprofrb exec` command to your Ruby application start command:

    ```shell
    bundle exec ddprofrb exec ruby myapp.rb
    ```

    Rails の例:

    ```shell
    bundle exec ddprofrb exec bin/rails s
    ```

    If you're running a version of `ddtrace` older than 1.21.0, replace `ddprofrb exec` with `ddtracerb exec`.

    **注**

    If starting the application with `ddprofrb exec` is not an option (for example, when using the Phusion Passenger web server), you can alternatively start the profiler by adding the following to your application entry point (such as `config.ru`, for a web application):

    ```ruby
    require 'datadog/profiling/preload'
    ```

6. Optional: Set up [Source Code Integration][4] to connect your profiling data with your Git repositories.

7. A minute or two after starting your Ruby application, your profiles will show up on the [Datadog APM > Profiler page][5].

## 次のステップ

[プロファイラーの概要][6]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[4]: /ja/integrations/guide/source-code-integration/?tab=ruby
[5]: https://app.datadoghq.com/profiling
[6]: /ja/getting_started/profiler/
[12]: /ja/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /ja/profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[14]: /ja/profiler/enabling/supported_versions/
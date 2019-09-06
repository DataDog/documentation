---
title: Agent インテグレーション開発のための Python 環境
kind: documentation
---

このドキュメントでは、インタープリターのインストール、必要な依存関係がすべて存在することの確認など、Agent ベースのインテグレーションを開発するための Python 環境の設定方法について説明します。

## Python 2 か Python 3 か

インテグレーションは、Agent の埋め込み Python 環境またはテスト環境のいずれかで動作します。埋め込み環境の現在のバージョンは、[Omnibus コード][1]に記録されています。Agent およびテスト環境は Python 2 ですが、いずれ Python 3 へのアップグレードは避けられないため、新しいインテグレーションは両方のバージョンと互換性がなければなりません。

## Python のインストール

Python は多くのオペレーティングシステムにプレインストールされています。ご使用のシステムの Python が古すぎたり、プレインストールされていない場合は、適切なバージョンをインストールする必要があります。オペレーティングシステムへの Python のインストールとそのメンテナンスはこのドキュメントの範囲外ですが、いくつかの参考情報を提供いたします。

### macOS

macOS の最新バージョンには Python がプレインストールされています。ただし、Agent で使用されているバージョンより古い可能性があり、必要なツールや依存関係が不足している可能性もあります。App Store なしで管理できる新しい専用 Python インタープリターをインストールする必要があります。

以下の選択肢があります。

* [Homebrew][2]: Follow the "[Doing it Right][3]" instructions.
* [Miniconda][4]: Follow the "[Conda installation][5]" instructions.

クリーンなシステム Python を維持するには、[環境マネージャー][6]のインストールをお勧めします。

### Linux

主要な Linux ディストリビューションには、おそらく許容できるバージョンレベルの Python がプレインストールされています。クリーンなシステム Python を維持するには、[環境マネージャー][6]のインストールをお勧めします。詳細については、ディストリビューションのパッケージ管理ドキュメントを参照してください。

### Windows

Windows には 、通常 Python 環境がありません。[Python 公式ドキュメント][7]に掲載されている、インストールの詳細な手順と、他のドキュメントやツールへのリンクを参照してください。

## 仮想環境マネージャー

インテグレーションはそれぞれ独自の依存関係を持ちます。テストを実行したり、収集コードを実行したりしてみるには、それらの依存関係を Python に追加する必要があります。特定のインテグレーションしか使用しないライブラリやパッケージによって Python インストールが汚染されないようにするには、「仮想環境」を使用します。仮想環境は、Python インストールを隔離するための自己完結型のディレクトリツリーです。仮想環境がアクティブな場合は、インストールしたパッケージがすべてこのディレクトリに格納され、システム全体の Python インストールには影響しません。

### Virtualenv と Virtualenvwrapper

Python 仮想環境の管理には、[Virtualenv][8] の使用をお勧めします。さらに、円滑な処理のために [virtualenvwrapper][9] の使用をお勧めします。Hitchhiker's Guide to Python には、この 2 つのツールのセットアップ方法が[包括的に説明][10]されています。

### Miniconda

Miniconda を使用している場合は、仮想環境を管理するツールが含まれています。詳細については、[公式ガイド][11]を参照してください。

[1]: https://github.com/DataDog/omnibus-software/blob/master/config/software/python.rb#L21
[2]: https://brew.sh/#install
[3]: https://docs.python-guide.org/en/latest/starting/install/osx/#doing-it-right
[4]: https://repo.continuum.io/miniconda/Miniconda2-latest-MacOSX-x86_64.sh
[5]: https://conda.io/docs/user-guide/install/macos.html
[6]: #virtual-environment-manager
[7]: https://docs.python.org/2.7/using/windows.html
[8]: https://pypi.python.org/pypi/virtualenv
[9]: https://virtualenvwrapper.readthedocs.io/en/latest/index.html
[10]: https://docs.python-guide.org/en/latest/dev/virtualenvs/#lower-level-virtualenv
[11]: https://conda.io/docs/user-guide/tasks/manage-environments.html

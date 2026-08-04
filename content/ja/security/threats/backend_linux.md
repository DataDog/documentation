---
description: Workload Protection Linux バックエンドイベントの JSON スキーマドキュメント
disable_edit: true
title: Workload Protection Linux イベント形式
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-agent -->


<!-- このファイルは自動生成されています。scripts/templates フォルダーにあるファイルを編集してください -->

Linux システム向けの Workload Protection イベントには、以下の JSON スキーマがあります:


{{< code-block lang="json" collapsible="true" filename="BACKEND_EVENT_JSON_SCHEMA" >}}
{
    "$id": "https://github.com/DataDog/datadog-agent/tree/main/pkg/security/serializers",
    "$defs": {
        "AWSIMDSEvent": {
            "properties": {
                "is_imds_v2": {
                    "type": "boolean",
                    "description": "is_imds_v2 は、IMDS イベントが IMDSv1 か IMDSv2 のどちらの仕様に従っているかを示します"
                },
                "security_credentials": {
                    "$ref": "#/$defs/AWSSecurityCredentials",
                    "description": "SecurityCredentials には、セキュリティ認証情報から収集したマスク済みデータが格納されます"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "is_imds_v2"
            ],
            "description": "AWSIMDSEventSerializer は、AWS IMDS イベントを JSON にシリアライズします"
        },
        "AWSSecurityCredentials": {
            "properties": {
                "code": {
                    "type": "string",
                    "description": "code は、IMDS サーバーの応答コードです"
                },
                "type": {
                    "type": "string",
                    "description": "type は、セキュリティ認証情報の種類です"
                },
                "access_key_id": {
                    "type": "string",
                    "description": "access_key_id は、認証情報の一意なアクセス キー ID です"
                },
                "last_updated": {
                    "type": "string",
                    "description": "last_updated は、認証情報が最後に更新された日時です"
                },
                "expiration": {
                    "type": "string",
                    "description": "expiration は、認証情報の有効期限です"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "code",
                "type",
                "access_key_id",
                "last_updated",
                "expiration"
            ],
            "description": "AWSSecurityCredentialsSerializer は、AWS IMDS リクエストから取得したセキュリティ認証情報をシリアライズします"
        },
        "AcceptEvent": {
            "properties": {
                "addr": {
                    "$ref": "#/$defs/IPPortFamily",
                    "description": "バインドされたアドレス (存在する場合)"
                },
                "hostnames": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "addr",
                "hostnames"
            ],
            "description": "AcceptEventSerializer は、バインド イベントを JSON にシリアライズします"
        },
        "AgentContext": {
            "properties": {
                "rule_id": {
                    "type": "string"
                },
                "rule_version": {
                    "type": "string"
                },
                "rule_actions": {
                    "items": true,
                    "type": "array"
                },
                "policy_name": {
                    "type": "string"
                },
                "policy_version": {
                    "type": "string"
                },
                "version": {
                    "type": "string"
                },
                "os": {
                    "type": "string"
                },
                "arch": {
                    "type": "string"
                },
                "origin": {
                    "type": "string"
                },
                "kernel_version": {
                    "type": "string"
                },
                "distribution": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "rule_id"
            ]
        },
        "BPFEvent": {
            "properties": {
                "cmd": {
                    "type": "string",
                    "description": "BPF コマンド"
                },
                "map": {
                    "$ref": "#/$defs/BPFMap",
                    "description": "BPF マップ"
                },
                "program": {
                    "$ref": "#/$defs/BPFProgram",
                    "description": "BPF プログラム"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "cmd"
            ],
            "description": "BPFEventSerializer は、BPF イベントを JSON にシリアライズします"
        },
        "BPFMap": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "BPF マップの名前"
                },
                "map_type": {
                    "type": "string",
                    "description": "BPF マップのタイプ"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "BPFMapSerializer は、BPF マップを JSON にシリアライズします"
        },
        "BPFProgram": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "BPF プログラムの名前"
                },
                "tag": {
                    "type": "string",
                    "description": "BPF プログラムのハッシュ (sha1)"
                },
                "program_type": {
                    "type": "string",
                    "description": "BPF プログラムのタイプ"
                },
                "attach_type": {
                    "type": "string",
                    "description": "BPF プログラムのアタッチ タイプ"
                },
                "helpers": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "BPF プログラムで使用されるヘルパーの一覧"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "BPFProgramSerializer は、BPF マップを JSON にシリアライズします"
        },
        "BindEvent": {
            "properties": {
                "addr": {
                    "$ref": "#/$defs/IPPortFamily",
                    "description": "バインドされたアドレス (存在する場合)"
                },
                "protocol": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "addr",
                "protocol"
            ],
            "description": "BindEventSerializer は、バインド イベントを JSON にシリアライズします"
        },
        "CGroupContext": {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "CGroup の ID"
                },
                "manager": {
                    "type": "string",
                    "description": "CGroup マネージャー"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "CGroupContextSerializer は、cgroup コンテキストを JSON にシリアライズします"
        },
        "ConnectEvent": {
            "properties": {
                "addr": {
                    "$ref": "#/$defs/IPPortFamily"
                },
                "hostnames": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "protocol": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "addr",
                "hostnames",
                "protocol"
            ],
            "description": "ConnectEventSerializer は、接続イベントを JSON にシリアライズします"
        },
        "ContainerContext": {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "コンテナ ID"
                },
                "created_at": {
                    "type": "string",
                    "format": "date-time",
                    "description": "コンテナの作成時刻"
                },
                "variables": {
                    "$ref": "#/$defs/Variables",
                    "description": "Variables の値"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "ContainerContextSerializer は、コンテナ コンテキストを JSON にシリアライズします"
        },
        "DDContext": {
            "properties": {
                "span_id": {
                    "type": "string",
                    "description": "APM 相関に使用する Span ID"
                },
                "trace_id": {
                    "type": "string",
                    "description": "APM 相関に使用する Trace ID"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "DDContextSerializer は、スパン コンテキストを JSON にシリアライズします"
        },
        "DNSEvent": {
            "properties": {
                "id": {
                    "type": "integer",
                    "description": "id は DNS リクエストの一意な識別子です"
                },
                "question": {
                    "$ref": "#/$defs/DNSQuestion",
                    "description": "question は DNS リクエストの DNS 質問です"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "id",
                "question"
            ],
            "description": "DNSEventSerializer は、DNS イベントを JSON にシリアライズします"
        },
        "DNSQuestion": {
            "properties": {
                "class": {
                    "type": "string",
                    "description": "class は DNS 質問で参照されるクラスです"
                },
                "type": {
                    "type": "string",
                    "description": "type は DNS 質問タイプを指定する 2 オクテットのコードです"
                },
                "name": {
                    "type": "string",
                    "description": "name は問い合わせ対象のドメイン名です"
                },
                "size": {
                    "type": "integer",
                    "description": "size は DNS リクエストの合計サイズ (バイト) です"
                },
                "count": {
                    "type": "integer",
                    "description": "count は DNS リクエストに含まれる質問数の合計です"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "class",
                "type",
                "name",
                "size",
                "count"
            ],
            "description": "DNSQuestionSerializer は、DNS 質問を JSON にシリアライズします"
        },
        "EventContext": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "イベント名"
                },
                "category": {
                    "type": "string",
                    "description": "イベント カテゴリ"
                },
                "outcome": {
                    "type": "string",
                    "description": "イベントの結果"
                },
                "async": {
                    "type": "boolean",
                    "description": "イベントが非同期の場合は true"
                },
                "matched_rules": {
                    "items": {
                        "$ref": "#/$defs/MatchedRule"
                    },
                    "type": "array",
                    "description": "イベントが一致したルールの一覧 (異常検知のコンテキストでのみ有効)"
                },
                "variables": {
                    "$ref": "#/$defs/Variables",
                    "description": "Variables の値"
                },
                "rule_context": {
                    "$ref": "#/$defs/RuleContext",
                    "description": "RuleContext のルール コンテキスト"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "EventContextSerializer は、イベント コンテキストを JSON にシリアライズします"
        },
        "ExitEvent": {
            "properties": {
                "cause": {
                    "type": "string",
                    "description": "プロセス終了の原因 (EXITED, SIGNALED, COREDUMPED のいずれか)"
                },
                "code": {
                    "type": "integer",
                    "description": "プロセスの終了コード、またはプロセスを終了させたシグナル番号"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "cause",
                "code"
            ],
            "description": "ExitEventSerializer は、終了イベントを JSON にシリアライズします"
        },
        "File": {
            "properties": {
                "path": {
                    "type": "string",
                    "description": "ファイル パス"
                },
                "name": {
                    "type": "string",
                    "description": "ファイルのベース名"
                },
                "path_resolution_error": {
                    "type": "string",
                    "description": "パス解決のエラー メッセージ"
                },
                "inode": {
                    "type": "integer",
                    "description": "ファイルの inode 番号"
                },
                "mode": {
                    "type": "integer",
                    "description": "ファイル モード"
                },
                "in_upper_layer": {
                    "type": "boolean",
                    "description": "ファイルが OverlayFS レイヤー上にあることを示すフラグ"
                },
                "mount_id": {
                    "type": "integer",
                    "description": "ファイルのマウント ID"
                },
                "filesystem": {
                    "type": "string",
                    "description": "ファイル システム名"
                },
                "uid": {
                    "type": "integer",
                    "description": "ファイルのユーザー ID"
                },
                "gid": {
                    "type": "integer",
                    "description": "ファイルのグループ ID"
                },
                "user": {
                    "type": "string",
                    "description": "ファイルのユーザー"
                },
                "group": {
                    "type": "string",
                    "description": "ファイルのグループ"
                },
                "attribute_name": {
                    "type": "string",
                    "description": "ファイルの拡張属性名"
                },
                "attribute_namespace": {
                    "type": "string",
                    "description": "ファイルの拡張属性の名前空間"
                },
                "flags": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "ファイル フラグ"
                },
                "access_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "ファイルのアクセス時刻"
                },
                "modification_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "ファイル内容の更新時刻"
                },
                "change_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "ファイルメタデータの変更時刻"
                },
                "package_name": {
                    "type": "string",
                    "description": "システム パッケージ名"
                },
                "package_version": {
                    "type": "string",
                    "description": "システム パッケージのバージョン"
                },
                "hashes": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "ファイルの暗号学的ハッシュの一覧"
                },
                "hash_state": {
                    "type": "string",
                    "description": "ハッシュの状態、または計算できなかった理由"
                },
                "mount_path": {
                    "type": "string",
                    "description": "マウントの MountPath (パス)"
                },
                "mount_source": {
                    "type": "string",
                    "description": "マウントの MountSource (ソース)"
                },
                "mount_origin": {
                    "type": "string",
                    "description": "マウントの MountOrigin (起点)"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "uid",
                "gid"
            ],
            "description": "FileSerializer は、ファイルを JSON にシリアライズします"
        },
        "FileEvent": {
            "properties": {
                "path": {
                    "type": "string",
                    "description": "ファイル パス"
                },
                "name": {
                    "type": "string",
                    "description": "ファイルのベース名"
                },
                "path_resolution_error": {
                    "type": "string",
                    "description": "パス解決のエラー メッセージ"
                },
                "inode": {
                    "type": "integer",
                    "description": "ファイルの inode 番号"
                },
                "mode": {
                    "type": "integer",
                    "description": "ファイル モード"
                },
                "in_upper_layer": {
                    "type": "boolean",
                    "description": "ファイルが OverlayFS レイヤー上にあることを示すフラグ"
                },
                "mount_id": {
                    "type": "integer",
                    "description": "ファイルのマウント ID"
                },
                "filesystem": {
                    "type": "string",
                    "description": "ファイル システム名"
                },
                "uid": {
                    "type": "integer",
                    "description": "ファイルのユーザー ID"
                },
                "gid": {
                    "type": "integer",
                    "description": "ファイルのグループ ID"
                },
                "user": {
                    "type": "string",
                    "description": "ファイルのユーザー"
                },
                "group": {
                    "type": "string",
                    "description": "ファイルのグループ"
                },
                "attribute_name": {
                    "type": "string",
                    "description": "ファイルの拡張属性名"
                },
                "attribute_namespace": {
                    "type": "string",
                    "description": "ファイルの拡張属性の名前空間"
                },
                "flags": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "ファイル フラグ"
                },
                "access_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "ファイルのアクセス時刻"
                },
                "modification_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "ファイル内容の更新時刻"
                },
                "change_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "ファイルメタデータの変更時刻"
                },
                "package_name": {
                    "type": "string",
                    "description": "システム パッケージ名"
                },
                "package_version": {
                    "type": "string",
                    "description": "システム パッケージのバージョン"
                },
                "hashes": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "ファイルの暗号学的ハッシュの一覧"
                },
                "hash_state": {
                    "type": "string",
                    "description": "ハッシュの状態、または計算できなかった理由"
                },
                "mount_path": {
                    "type": "string",
                    "description": "マウントの MountPath (パス)"
                },
                "mount_source": {
                    "type": "string",
                    "description": "マウントの MountSource (ソース)"
                },
                "mount_origin": {
                    "type": "string",
                    "description": "マウントの MountOrigin (起点)"
                },
                "destination": {
                    "$ref": "#/$defs/File",
                    "description": "対象ファイルの情報"
                },
                "new_mount_id": {
                    "type": "integer",
                    "description": "新しいマウント ID"
                },
                "device": {
                    "type": "integer",
                    "description": "ファイルに関連付けられたデバイス"
                },
                "fstype": {
                    "type": "string",
                    "description": "ファイル システムの種類"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "uid",
                "gid"
            ],
            "description": "FileEventSerializer は、ファイル イベントを JSON にシリアライズします"
        },
        "Flow": {
            "properties": {
                "l3_protocol": {
                    "type": "string",
                    "description": "l3_protocol はレイヤー 3 のプロトコル名です"
                },
                "l4_protocol": {
                    "type": "string",
                    "description": "l4_protocol はレイヤー 4 のプロトコル名です"
                },
                "source": {
                    "$ref": "#/$defs/IPPort",
                    "description": "source はネットワーク イベントの送信元です"
                },
                "destination": {
                    "$ref": "#/$defs/IPPort",
                    "description": "destination はネットワーク イベントの宛先です"
                },
                "ingress": {
                    "$ref": "#/$defs/NetworkStats",
                    "description": "ingress は、ingress トラフィックのネットワーク統計を保持します"
                },
                "egress": {
                    "$ref": "#/$defs/NetworkStats",
                    "description": "egress は、egress トラフィックのネットワーク統計を保持します"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "l3_protocol",
                "l4_protocol",
                "source",
                "destination"
            ],
            "description": "FlowSerializer は、新しいフロー シリアライザを定義します"
        },
        "IMDSEvent": {
            "properties": {
                "type": {
                    "type": "string",
                    "description": "type は IMDS イベントの種類です"
                },
                "cloud_provider": {
                    "type": "string",
                    "description": "cloud_provider は、この IMDS イベントが想定するクラウド プロバイダです"
                },
                "url": {
                    "type": "string",
                    "description": "url は IMDS リクエストの URL です"
                },
                "host": {
                    "type": "string",
                    "description": "host は HTTP プロトコルのホスト名です"
                },
                "user_agent": {
                    "type": "string",
                    "description": "user_agent は HTTP クライアントのユーザー エージェントです"
                },
                "server": {
                    "type": "string",
                    "description": "server はレスポンスの Server ヘッダーです"
                },
                "aws": {
                    "$ref": "#/$defs/AWSIMDSEvent",
                    "description": "AWS には、IMDS イベントから解析した AWS 固有のデータが格納されます"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "type",
                "cloud_provider"
            ],
            "description": "IMDSEventSerializer は、IMDS イベントを JSON にシリアライズします"
        },
        "IPPort": {
            "properties": {
                "ip": {
                    "type": "string",
                    "description": "IP アドレス"
                },
                "port": {
                    "type": "integer",
                    "description": "ポート番号"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "ip",
                "port"
            ],
            "description": "IPPortSerializer は、IP とポートのコンテキストを JSON にシリアライズするために使用します"
        },
        "IPPortFamily": {
            "properties": {
                "family": {
                    "type": "string",
                    "description": "アドレス ファミリ"
                },
                "ip": {
                    "type": "string",
                    "description": "IP アドレス"
                },
                "port": {
                    "type": "integer",
                    "description": "ポート番号"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "family",
                "ip",
                "port"
            ],
            "description": "IPPortFamilySerializer は、IP、ポート、アドレス ファミリのコンテキストを JSON にシリアライズするために使用します"
        },
        "MMapEvent": {
            "properties": {
                "address": {
                    "type": "string",
                    "description": "メモリ セグメントのアドレス"
                },
                "offset": {
                    "type": "integer",
                    "description": "ファイル オフセット"
                },
                "length": {
                    "type": "integer",
                    "description": "メモリ セグメントの長さ"
                },
                "protection": {
                    "type": "string",
                    "description": "メモリ セグメントの保護設定"
                },
                "flags": {
                    "type": "string",
                    "description": "メモリ セグメントのフラグ"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "address",
                "offset",
                "length",
                "protection",
                "flags"
            ],
            "description": "MMapEventSerializer は、mmap イベントを JSON にシリアライズします"
        },
        "MProtectEvent": {
            "properties": {
                "vm_start": {
                    "type": "string",
                    "description": "メモリ セグメントの開始アドレス"
                },
                "vm_end": {
                    "type": "string",
                    "description": "メモリ セグメントの終了アドレス"
                },
                "vm_protection": {
                    "type": "string",
                    "description": "初期のメモリ セグメントの保護設定"
                },
                "req_protection": {
                    "type": "string",
                    "description": "変更後のメモリ セグメントの保護設定"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "vm_start",
                "vm_end",
                "vm_protection",
                "req_protection"
            ],
            "description": "MProtectEventSerializer は、mmap イベントを JSON にシリアライズします"
        },
        "MatchedRule": {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "ルールの ID"
                },
                "version": {
                    "type": "string",
                    "description": "ルールのバージョン"
                },
                "tags": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "ルールに付与されたタグ"
                },
                "policy_name": {
                    "type": "string",
                    "description": "そのルールを導入したポリシー名"
                },
                "policy_version": {
                    "type": "string",
                    "description": "そのルールを導入したポリシーのバージョン"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "MatchedRuleSerializer は、ルールをシリアライズします"
        },
        "MatchingSubExpr": {
            "properties": {
                "offset": {
                    "type": "integer"
                },
                "length": {
                    "type": "integer"
                },
                "value": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "offset",
                "length",
                "value"
            ],
            "description": "MatchingSubExpr は、一致した部分式を JSON にシリアライズします"
        },
        "ModuleEvent": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "モジュール名"
                },
                "loaded_from_memory": {
                    "type": "boolean",
                    "description": "モジュールがファイルではなくメモリから読み込まれたかどうかを示します"
                },
                "argv": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "args_truncated": {
                    "type": "boolean"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "name"
            ],
            "description": "ModuleEventSerializer は、モジュール イベントを JSON にシリアライズします"
        },
        "MountEvent": {
            "properties": {
                "mp": {
                    "$ref": "#/$defs/File",
                    "description": "マウント ポイントのファイル情報"
                },
                "root": {
                    "$ref": "#/$defs/File",
                    "description": "ルートのファイル情報"
                },
                "mount_id": {
                    "type": "integer",
                    "description": "新しいマウントのマウント ID"
                },
                "parent_mount_id": {
                    "type": "integer",
                    "description": "親マウントのマウント ID"
                },
                "bind_src_mount_id": {
                    "type": "integer",
                    "description": "バインド マウント元のマウント ID"
                },
                "device": {
                    "type": "integer",
                    "description": "ファイルに関連付けられたデバイス"
                },
                "fs_type": {
                    "type": "string",
                    "description": "ファイル システムの種類"
                },
                "mountpoint.path": {
                    "type": "string",
                    "description": "マウント ポイントのパス"
                },
                "source.path": {
                    "type": "string",
                    "description": "マウント元のパス"
                },
                "mountpoint.path_error": {
                    "type": "string",
                    "description": "マウント ポイントのパス エラー"
                },
                "source.path_error": {
                    "type": "string",
                    "description": "マウント元のパス エラー"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "mount_id",
                "parent_mount_id",
                "bind_src_mount_id",
                "device"
            ],
            "description": "MountEventSerializer は、マウント イベントを JSON にシリアライズします"
        },
        "NetworkContext": {
            "properties": {
                "device": {
                    "$ref": "#/$defs/NetworkDevice",
                    "description": "device は、イベントをキャプチャしたネットワーク デバイスです"
                },
                "l3_protocol": {
                    "type": "string",
                    "description": "l3_protocol はレイヤー 3 のプロトコル名です"
                },
                "l4_protocol": {
                    "type": "string",
                    "description": "l4_protocol はレイヤー 4 のプロトコル名です"
                },
                "source": {
                    "$ref": "#/$defs/IPPort",
                    "description": "source はネットワーク イベントの送信元です"
                },
                "destination": {
                    "$ref": "#/$defs/IPPort",
                    "description": "destination はネットワーク イベントの受信先です"
                },
                "size": {
                    "type": "integer",
                    "description": "size はネットワーク イベントのサイズをバイト単位で表します"
                },
                "network_direction": {
                    "type": "string",
                    "description": "network_direction は、パケットが ingress と egress のどちらでキャプチャされたかを示します"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "l3_protocol",
                "l4_protocol",
                "source",
                "destination",
                "size",
                "network_direction"
            ],
            "description": "NetworkContextSerializer は、ネットワーク コンテキストを JSON にシリアライズします"
        },
        "NetworkDevice": {
            "properties": {
                "netns": {
                    "type": "integer",
                    "description": "netns はインターフェイスの ifindex です"
                },
                "ifindex": {
                    "type": "integer",
                    "description": "ifindex はネットワーク インターフェイスの ifindex です"
                },
                "ifname": {
                    "type": "string",
                    "description": "ifname はネットワーク インターフェイス名です"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "netns",
                "ifindex",
                "ifname"
            ],
            "description": "NetworkDeviceSerializer は、ネットワーク デバイス コンテキストを JSON にシリアライズします"
        },
        "NetworkFlowMonitor": {
            "properties": {
                "device": {
                    "$ref": "#/$defs/NetworkDevice",
                    "description": "device は、イベントをキャプチャしたネットワーク デバイスです"
                },
                "flows": {
                    "items": {
                        "$ref": "#/$defs/Flow"
                    },
                    "type": "array",
                    "description": "flows は、キャプチャされたネットワーク統計を含むフローの一覧です"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "NetworkFlowMonitorSerializer は、ネットワーク モニタ イベント シリアライザを定義します"
        },
        "NetworkStats": {
            "properties": {
                "data_size": {
                    "type": "integer",
                    "description": "data_size は送受信したバイト数の合計です"
                },
                "packet_count": {
                    "type": "integer",
                    "description": "packet_count は送受信したパケット数の合計です"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "NetworkStatsSerializer は、新しいネットワーク統計用シリアライザを定義します"
        },
        "PTraceEvent": {
            "properties": {
                "request": {
                    "type": "string",
                    "description": "ptrace リクエスト"
                },
                "address": {
                    "type": "string",
                    "description": "ptrace リクエストが実行されたアドレス"
                },
                "tracee": {
                    "$ref": "#/$defs/ProcessContext",
                    "description": "トレース対象プロセスのコンテキスト"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "request",
                "address"
            ],
            "description": "PTraceEventSerializer は、mmap イベントを JSON にシリアライズします"
        },
        "Process": {
            "properties": {
                "pid": {
                    "type": "integer",
                    "description": "プロセス ID"
                },
                "ppid": {
                    "type": "integer",
                    "description": "親プロセス ID"
                },
                "tid": {
                    "type": "integer",
                    "description": "スレッド ID"
                },
                "uid": {
                    "type": "integer",
                    "description": "ユーザー ID"
                },
                "gid": {
                    "type": "integer",
                    "description": "グループ ID"
                },
                "user": {
                    "type": "string",
                    "description": "ユーザー名"
                },
                "group": {
                    "type": "string",
                    "description": "グループ名"
                },
                "path_resolution_error": {
                    "type": "string",
                    "description": "パス解決で発生したエラーの説明"
                },
                "comm": {
                    "type": "string",
                    "description": "コマンド名"
                },
                "tty": {
                    "type": "string",
                    "description": "プロセスに関連付けられた TTY"
                },
                "fork_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "プロセスの fork 時刻"
                },
                "exec_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "プロセスの exec 時刻"
                },
                "exit_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "プロセスの終了時刻"
                },
                "credentials": {
                    "$ref": "#/$defs/ProcessCredentials",
                    "description": "プロセスに紐付く認証情報"
                },
                "user_session": {
                    "$ref": "#/$defs/UserSessionContext",
                    "description": "このイベントにおけるユーザー セッションのコンテキスト"
                },
                "executable": {
                    "$ref": "#/$defs/File",
                    "description": "実行ファイルの情報"
                },
                "interpreter": {
                    "$ref": "#/$defs/File",
                    "description": "インタープリタの情報"
                },
                "container": {
                    "$ref": "#/$defs/ContainerContext",
                    "description": "コンテナ コンテキスト"
                },
                "argv0": {
                    "type": "string",
                    "description": "最初のコマンド ライン引数"
                },
                "args": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "コマンド ライン引数"
                },
                "args_truncated": {
                    "type": "boolean",
                    "description": "引数が切り詰められたかどうかを示すフラグ"
                },
                "envs": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "プロセスの環境変数"
                },
                "envs_truncated": {
                    "type": "boolean",
                    "description": "環境変数が切り詰められたかどうかを示すフラグ"
                },
                "is_thread": {
                    "type": "boolean",
                    "description": "プロセスがスレッドと見なされるかどうかを示します (つまり、別のプログラムを exec していない子プロセス)"
                },
                "is_kworker": {
                    "type": "boolean",
                    "description": "プロセスが kworker かどうかを示します"
                },
                "is_exec_child": {
                    "type": "boolean",
                    "description": "プロセスが別の exec の直後に行われた exec かどうかを示します"
                },
                "source": {
                    "type": "string",
                    "description": "プロセスの発生元"
                },
                "syscalls": {
                    "$ref": "#/$defs/SyscallsEvent",
                    "description": "イベント生成のためにキャプチャしたシステム コールの一覧"
                },
                "aws_security_credentials": {
                    "items": {
                        "$ref": "#/$defs/AWSSecurityCredentials"
                    },
                    "type": "array",
                    "description": "プロセスがアクセスできた AWS Security Credentials の一覧"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "uid",
                "gid"
            ],
            "description": "ProcessSerializer は、プロセスを JSON にシリアライズします"
        },
        "ProcessContext": {
            "properties": {
                "pid": {
                    "type": "integer",
                    "description": "プロセス ID"
                },
                "ppid": {
                    "type": "integer",
                    "description": "親プロセス ID"
                },
                "tid": {
                    "type": "integer",
                    "description": "スレッド ID"
                },
                "uid": {
                    "type": "integer",
                    "description": "ユーザー ID"
                },
                "gid": {
                    "type": "integer",
                    "description": "グループ ID"
                },
                "user": {
                    "type": "string",
                    "description": "ユーザー名"
                },
                "group": {
                    "type": "string",
                    "description": "グループ名"
                },
                "path_resolution_error": {
                    "type": "string",
                    "description": "パス解決で発生したエラーの説明"
                },
                "comm": {
                    "type": "string",
                    "description": "コマンド名"
                },
                "tty": {
                    "type": "string",
                    "description": "プロセスに関連付けられた TTY"
                },
                "fork_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "プロセスの fork 時刻"
                },
                "exec_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "プロセスの exec 時刻"
                },
                "exit_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "プロセスの終了時刻"
                },
                "credentials": {
                    "$ref": "#/$defs/ProcessCredentials",
                    "description": "プロセスに紐付く認証情報"
                },
                "user_session": {
                    "$ref": "#/$defs/UserSessionContext",
                    "description": "このイベントにおけるユーザー セッションのコンテキスト"
                },
                "executable": {
                    "$ref": "#/$defs/File",
                    "description": "実行ファイルの情報"
                },
                "interpreter": {
                    "$ref": "#/$defs/File",
                    "description": "インタープリタの情報"
                },
                "container": {
                    "$ref": "#/$defs/ContainerContext",
                    "description": "コンテナ コンテキスト"
                },
                "argv0": {
                    "type": "string",
                    "description": "最初のコマンド ライン引数"
                },
                "args": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "コマンド ライン引数"
                },
                "args_truncated": {
                    "type": "boolean",
                    "description": "引数が切り詰められたかどうかを示すフラグ"
                },
                "envs": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "プロセスの環境変数"
                },
                "envs_truncated": {
                    "type": "boolean",
                    "description": "環境変数が切り詰められたかどうかを示すフラグ"
                },
                "is_thread": {
                    "type": "boolean",
                    "description": "プロセスがスレッドと見なされるかどうかを示します (つまり、別のプログラムを exec していない子プロセス)"
                },
                "is_kworker": {
                    "type": "boolean",
                    "description": "プロセスが kworker かどうかを示します"
                },
                "is_exec_child": {
                    "type": "boolean",
                    "description": "プロセスが別の exec の直後に行われた exec かどうかを示します"
                },
                "source": {
                    "type": "string",
                    "description": "プロセスの発生元"
                },
                "syscalls": {
                    "$ref": "#/$defs/SyscallsEvent",
                    "description": "イベント生成のためにキャプチャしたシステム コールの一覧"
                },
                "aws_security_credentials": {
                    "items": {
                        "$ref": "#/$defs/AWSSecurityCredentials"
                    },
                    "type": "array",
                    "description": "プロセスがアクセスできた AWS Security Credentials の一覧"
                },
                "parent": {
                    "$ref": "#/$defs/Process",
                    "description": "親プロセス"
                },
                "ancestors": {
                    "items": {
                        "$ref": "#/$defs/Process"
                    },
                    "type": "array",
                    "description": "祖先プロセスの一覧"
                },
                "variables": {
                    "$ref": "#/$defs/Variables",
                    "description": "Variables の値"
                },
                "truncated_ancestors": {
                    "type": "boolean",
                    "description": "祖先リストが大きすぎて切り詰められた場合は true"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "uid",
                "gid"
            ],
            "description": "ProcessContextSerializer は、プロセス コンテキストを JSON にシリアライズします"
        },
        "ProcessCredentials": {
            "properties": {
                "uid": {
                    "type": "integer",
                    "description": "ユーザー ID"
                },
                "user": {
                    "type": "string",
                    "description": "ユーザー名"
                },
                "gid": {
                    "type": "integer",
                    "description": "グループ ID"
                },
                "group": {
                    "type": "string",
                    "description": "グループ名"
                },
                "euid": {
                    "type": "integer",
                    "description": "実効ユーザー ID"
                },
                "euser": {
                    "type": "string",
                    "description": "実効ユーザー名"
                },
                "egid": {
                    "type": "integer",
                    "description": "実効グループ ID"
                },
                "egroup": {
                    "type": "string",
                    "description": "実効グループ名"
                },
                "fsuid": {
                    "type": "integer",
                    "description": "ファイル システム ユーザー ID"
                },
                "fsuser": {
                    "type": "string",
                    "description": "ファイル システム ユーザー名"
                },
                "fsgid": {
                    "type": "integer",
                    "description": "ファイル システム グループ ID"
                },
                "fsgroup": {
                    "type": "string",
                    "description": "ファイル システム グループ名"
                },
                "auid": {
                    "type": "integer",
                    "description": "ログイン UID"
                },
                "cap_effective": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "実効 Capability セット"
                },
                "cap_permitted": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "許可された Capability セット"
                },
                "destination": {
                    "description": "操作後の認証情報"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "uid",
                "gid",
                "euid",
                "egid",
                "fsuid",
                "fsgid",
                "auid",
                "cap_effective",
                "cap_permitted"
            ],
            "description": "ProcessCredentialsSerializer は、プロセスの認証情報を JSON にシリアライズします"
        },
        "RawPacket": {
            "properties": {
                "device": {
                    "$ref": "#/$defs/NetworkDevice",
                    "description": "device は、イベントをキャプチャしたネットワーク デバイスです"
                },
                "l3_protocol": {
                    "type": "string",
                    "description": "l3_protocol はレイヤー 3 のプロトコル名です"
                },
                "l4_protocol": {
                    "type": "string",
                    "description": "l4_protocol はレイヤー 4 のプロトコル名です"
                },
                "source": {
                    "$ref": "#/$defs/IPPort",
                    "description": "source はネットワーク イベントの送信元です"
                },
                "destination": {
                    "$ref": "#/$defs/IPPort",
                    "description": "destination はネットワーク イベントの受信先です"
                },
                "size": {
                    "type": "integer",
                    "description": "size はネットワーク イベントのサイズをバイト単位で表します"
                },
                "network_direction": {
                    "type": "string",
                    "description": "network_direction は、パケットが ingress と egress のどちらでキャプチャされたかを示します"
                },
                "tls": {
                    "$ref": "#/$defs/TLSContext"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "l3_protocol",
                "l4_protocol",
                "source",
                "destination",
                "size",
                "network_direction"
            ],
            "description": "RawPacketSerializer は、raw パケット シリアライザを定義します"
        },
        "RuleContext": {
            "properties": {
                "matching_subexprs": {
                    "items": {
                        "$ref": "#/$defs/MatchingSubExpr"
                    },
                    "type": "array"
                },
                "expression": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "RuleContext は、ルール コンテキストを JSON にシリアライズします"
        },
        "SELinuxBoolChange": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "SELinux ブール値の名前"
                },
                "state": {
                    "type": "string",
                    "description": "SELinux ブール値の状態 ('on' または 'off')"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "SELinuxBoolChangeSerializer は、SELinux ブール値の変更を JSON にシリアライズします"
        },
        "SELinuxBoolCommit": {
            "properties": {
                "state": {
                    "type": "boolean",
                    "description": "SELinux ブール値のコミット操作"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "SELinuxBoolCommitSerializer は、SELinux ブール値のコミットを JSON にシリアライズします"
        },
        "SELinuxEnforceStatus": {
            "properties": {
                "status": {
                    "type": "string",
                    "description": "SELinux の強制モード ステータス ('enforcing', 'permissive', 'disabled' のいずれか)"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "SELinuxEnforceStatusSerializer は、SELinux の強制モード ステータスの変更を JSON にシリアライズします"
        },
        "SELinuxEvent": {
            "properties": {
                "bool": {
                    "$ref": "#/$defs/SELinuxBoolChange",
                    "description": "SELinux ブール値の操作"
                },
                "enforce": {
                    "$ref": "#/$defs/SELinuxEnforceStatus",
                    "description": "SELinux の強制モード変更"
                },
                "bool_commit": {
                    "$ref": "#/$defs/SELinuxBoolCommit",
                    "description": "SELinux ブール値のコミット"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "SELinuxEventSerializer は、SELinux コンテキストを JSON にシリアライズします"
        },
        "SecurityProfileContext": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "セキュリティ プロファイル名"
                },
                "version": {
                    "type": "string",
                    "description": "使用中のプロファイルのバージョン"
                },
                "tags": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "このプロファイルに関連付けられたタグの一覧"
                },
                "event_in_profile": {
                    "type": "boolean",
                    "description": "該当イベントがこのプロファイルに含まれる場合は true"
                },
                "event_type_state": {
                    "type": "string",
                    "description": "このプロファイルにおけるイベント タイプの状態"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "name",
                "version",
                "tags",
                "event_in_profile",
                "event_type_state"
            ],
            "description": "SecurityProfileContextSerializer は、イベント内のセキュリティ プロファイル コンテキストを JSON にシリアライズします"
        },
        "SignalEvent": {
            "properties": {
                "type": {
                    "type": "string",
                    "description": "シグナル タイプ"
                },
                "pid": {
                    "type": "integer",
                    "description": "シグナルの対象 pid"
                },
                "target": {
                    "$ref": "#/$defs/ProcessContext",
                    "description": "シグナル対象のプロセス コンテキスト"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "type",
                "pid"
            ],
            "description": "SignalEventSerializer は、シグナル イベントを JSON にシリアライズします"
        },
        "SpliceEvent": {
            "properties": {
                "pipe_entry_flag": {
                    "type": "string",
                    "description": "splice システム コールに渡された fd_out パイプのエントリ フラグ"
                },
                "pipe_exit_flag": {
                    "type": "string",
                    "description": "splice システム コールに渡された fd_out パイプのエグジット フラグ"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "pipe_entry_flag",
                "pipe_exit_flag"
            ],
            "description": "SpliceEventSerializer は、splice イベントを JSON にシリアライズします"
        },
        "SysCtlEvent": {
            "properties": {
                "proc": {
                    "type": "object",
                    "description": "Proc には /proc のシステム制御パラメータとその値が含まれます"
                },
                "action": {
                    "type": "string",
                    "description": "システム制御パラメータに対する操作"
                },
                "file_position": {
                    "type": "integer",
                    "description": "file_position は、sysctl 制御パラメータ ファイル内で操作が行われた位置です"
                },
                "name": {
                    "type": "string",
                    "description": "name は、システム制御パラメータ名です"
                },
                "name_truncated": {
                    "type": "boolean",
                    "description": "name_truncated は、name フィールドが切り詰められているかどうかを示します"
                },
                "value": {
                    "type": "string",
                    "description": "value は、アクション タイプによって、新しい値または現在値 (あるいはその両方) を示します"
                },
                "value_truncated": {
                    "type": "boolean",
                    "description": "value_truncated は、value フィールドが切り詰められているかどうかを示します"
                },
                "old_value": {
                    "type": "string",
                    "description": "old_value は、システム制御パラメータの旧値です"
                },
                "old_value_truncated": {
                    "type": "boolean",
                    "description": "old_value_truncated は、old_value フィールドが切り詰められているかどうかを示します"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "SysCtlEventSerializer は、sysctl イベント シリアライザを定義します"
        },
        "Syscall": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "システム コール名"
                },
                "id": {
                    "type": "integer",
                    "description": "ホスト アーキテクチャにおけるシステム コール ID"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "name",
                "id"
            ],
            "description": "SyscallSerializer は、システム コールをシリアライズします"
        },
        "SyscallArgs": {
            "properties": {
                "path": {
                    "type": "string",
                    "description": "パス引数"
                },
                "flags": {
                    "type": "integer",
                    "description": "フラグ引数"
                },
                "mode": {
                    "type": "integer",
                    "description": "モード引数"
                },
                "uid": {
                    "type": "integer",
                    "description": "UID 引数"
                },
                "gid": {
                    "type": "integer",
                    "description": "GID 引数"
                },
                "dirfd": {
                    "type": "integer",
                    "description": "ディレクトリのファイル ディスクリプタ引数"
                },
                "destination_path": {
                    "type": "string",
                    "description": "宛先パス引数"
                },
                "fs_type": {
                    "type": "string",
                    "description": "ファイル システム タイプ引数"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "SyscallArgsSerializer は、引数 (args) のシリアライザです"
        },
        "SyscallContext": {
            "properties": {
                "chmod": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "chown": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "chdir": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "exec": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "open": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "unlink": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "link": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "rename": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "utimes": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "mount": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "mkdir": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "rmdir": {
                    "$ref": "#/$defs/SyscallArgs"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "SyscallContextSerializer は、syscall コンテキストをシリアライズします"
        },
        "SyscallsEvent": {
            "items": {
                "$ref": "#/$defs/Syscall"
            },
            "type": "array",
            "description": "SyscallsEventSerializer は、syscalls イベントのシステム コールをシリアライズします"
        },
        "TLSContext": {
            "properties": {
                "version": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "TLSContextSerializer は、TLS コンテキスト シリアライザを定義します"
        },
        "UserContext": {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "ユーザー名"
                },
                "group": {
                    "type": "string",
                    "description": "グループ名"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "UserContextSerializer は、ユーザー コンテキストを JSON にシリアライズします"
        },
        "UserSessionContext": {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "ホスト上のユーザー セッションを一意に識別する ID"
                },
                "session_type": {
                    "type": "string",
                    "description": "ユーザー セッションのタイプ"
                },
                "k8s_username": {
                    "type": "string",
                    "description": "Kubernetes \"kubectl exec\" セッションのユーザー名"
                },
                "k8s_uid": {
                    "type": "string",
                    "description": "Kubernetes \"kubectl exec\" セッションの UID"
                },
                "k8s_groups": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "Kubernetes \"kubectl exec\" セッションのグループの一覧"
                },
                "k8s_extra": {
                    "additionalProperties": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    },
                    "type": "object",
                    "description": "Kubernetes \"kubectl exec\" セッションの追加情報"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "UserSessionContextSerializer は、ユーザー セッション コンテキストを JSON にシリアライズします"
        },
        "Variables": {
            "type": "object",
            "description": "Variables は、変数の値をシリアライズします"
        }
    },
    "properties": {
        "agent": {
            "$ref": "#/$defs/AgentContext"
        },
        "title": {
            "type": "string"
        },
        "evt": {
            "$ref": "#/$defs/EventContext"
        },
        "date": {
            "type": "string",
            "format": "date-time"
        },
        "file": {
            "$ref": "#/$defs/FileEvent"
        },
        "exit": {
            "$ref": "#/$defs/ExitEvent"
        },
        "process": {
            "$ref": "#/$defs/ProcessContext"
        },
        "container": {
            "$ref": "#/$defs/ContainerContext"
        },
        "network": {
            "$ref": "#/$defs/NetworkContext"
        },
        "dd": {
            "$ref": "#/$defs/DDContext"
        },
        "security_profile": {
            "$ref": "#/$defs/SecurityProfileContext"
        },
        "cgroup": {
            "$ref": "#/$defs/CGroupContext"
        },
        "selinux": {
            "$ref": "#/$defs/SELinuxEvent"
        },
        "bpf": {
            "$ref": "#/$defs/BPFEvent"
        },
        "mmap": {
            "$ref": "#/$defs/MMapEvent"
        },
        "mprotect": {
            "$ref": "#/$defs/MProtectEvent"
        },
        "ptrace": {
            "$ref": "#/$defs/PTraceEvent"
        },
        "module": {
            "$ref": "#/$defs/ModuleEvent"
        },
        "signal": {
            "$ref": "#/$defs/SignalEvent"
        },
        "splice": {
            "$ref": "#/$defs/SpliceEvent"
        },
        "dns": {
            "$ref": "#/$defs/DNSEvent"
        },
        "imds": {
            "$ref": "#/$defs/IMDSEvent"
        },
        "accept": {
            "$ref": "#/$defs/AcceptEvent"
        },
        "bind": {
            "$ref": "#/$defs/BindEvent"
        },
        "connect": {
            "$ref": "#/$defs/ConnectEvent"
        },
        "mount": {
            "$ref": "#/$defs/MountEvent"
        },
        "syscalls": {
            "$ref": "#/$defs/SyscallsEvent"
        },
        "usr": {
            "$ref": "#/$defs/UserContext"
        },
        "syscall": {
            "$ref": "#/$defs/SyscallContext"
        },
        "packet": {
            "$ref": "#/$defs/RawPacket"
        },
        "network_flow_monitor": {
            "$ref": "#/$defs/NetworkFlowMonitor"
        },
        "sysctl": {
            "$ref": "#/$defs/SysCtlEvent"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "agent",
        "title"
    ]
}

{{< /code-block >}}

| パラメーター | タイプ | 説明 |
| --------- | ---- | ----------- |
| `agent` | $ref | Please see [AgentContext](#agentcontext) |
| `title` | 文字列 |  |
| `evt` | $ref | [EventContext](#eventcontext) をご覧ください。 |
| `date` | 文字列 |  |
| `file` | $ref | [FileEvent](#fileevent) をご覧ください。 |
| `exit` | $ref | [ExitEvent](#exitevent) をご覧ください。 |
| `process` | $ref | [ProcessContext](#processcontext) をご覧ください。 |
| `container` | $ref | [ContainerContext](#containercontext) をご覧ください。 |
| `network` | $ref | [NetworkContext](#networkcontext) をご覧ください。 |
| `dd` | $ref | [DDContext](#ddcontext) をご覧ください。 |
| `security_profile` | $ref | [SecurityProfileContext](#securityprofilecontext) をご覧ください |
| `cgroup` | $ref | 詳細は [CGroupContext](#cgroupcontext) をご覧ください。 |
| `selinux` | $ref | [SELinuxEvent](#selinuxevent) をご覧ください。 |
| `bpf` | $ref | [BPFEvent](#bpfevent) をご覧ください。 |
| `mmap` | $ref | [MMapEvent](#mmapevent) をご覧ください。 |
| `mprotect` | $ref | [MProtectEvent](#mprotectevent) をご覧ください。 |
| `ptrace` | $ref | [PTraceEvent](#ptraceevent) をご覧ください。 |
| `module` | $ref | [ModuleEvent](#moduleevent) をご覧ください。 |
| `signal` | $ref | [SignalEvent](#signalevent) をご覧ください。 |
| `splice` | $ref | [SpliceEvent](#spliceevent) をご覧ください。 |
| `dns` | $ref | [DNSEvent](#dnsevent) をご覧ください。 |
| `imds` | $ref | 詳細は [IMDSEvent](#imdsevent) をご覧ください。 |
| `accept` | $ref | [AcceptEvent](#acceptevent) をご覧ください。 |
| `bind` | $ref | [BindEvent](#bindevent) をご覧ください。 |
| `connect` | $ref | [ConnectEvent](#connectevent) をご覧ください。 |
| `mount` | $ref | [MountEvent](#mountevent) をご覧ください。 |
| `syscalls` | $ref | 詳細は [SyscallsEvent](#syscallsevent) をご覧ください。 |
| `usr` | $ref | [UserContext](#usercontext) をご覧ください。 |
| `syscall` | $ref | 詳細は [SyscallContext](#syscallcontext) をご覧ください。 |
| `packet` | $ref | [RawPacket](#rawpacket) をご覧ください。 |
| `network_flow_monitor` | $ref | [NetworkFlowMonitor](#networkflowmonitor) をご覧ください。 |
| `sysctl` | $ref | [SysCtlEvent](#sysctlevent) をご覧ください。 |

## `AWSIMDSEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "is_imds_v2": {
            "type": "boolean",
            "description": "is_imds_v2 は IMDS イベントが IMDSv1 もしくは IMDSv2 の規約に従っているかを報告します"
        },
        "security_credentials": {
            "$ref": "#/$defs/AWSSecurityCredentials",
            "description": "SecurityCredentials はセキュリティ資格情報に関して収集されたサニタイズ済みデータを保持します"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "is_imds_v2"
    ],
    "description": "AWSIMDSEventSerializer は AWS IMDS イベントを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `is_imds_v2` | is_imds_v2 は IMDS イベントが IMDSv1 もしくは IMDSv2 の規約に従っているかを報告します |
| `security_credentials` | SecurityCredentials はセキュリティ資格情報に関して収集されたサニタイズ済みデータを保持します |

| リファレンス |
| ---------- |
| [AWSSecurityCredentials](#awssecuritycredentials) |

## `AWSSecurityCredentials`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "code": {
            "type": "string",
            "description": "code は IMDS サーバーコードの応答です"
        },
        "type": {
            "type": "string",
            "description": "type はセキュリティ資格情報の種類です"
        },
        "access_key_id": {
            "type": "string",
            "description": "access_key_id は資格情報の固有のアクセスキーIDです"
        },
        "last_updated": {
            "type": "string",
            "description": "last_updated は資格情報が最後に更新された時刻です"
        },
        "expiration": {
            "type": "string",
            "description": "expiration は資格情報の有効期限です"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "code",
        "type",
        "access_key_id",
        "last_updated",
        "expiration"
    ],
    "description": "AWSSecurityCredentialsSerializer は AWS IMDS リクエストからのセキュリティ資格情報を JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `code` | code は IMDS サーバーコードの応答です |
| `type` | type はセキュリティ資格情報の種類です |
| `access_key_id` | access_key_id は資格情報の固有のアクセスキー ID です |
| `last_updated` | last_updated は資格情報が最後に更新された時刻です |
| `expiration` | expiration は資格情報の有効期限です |


## `AcceptEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "addr": {
            "$ref": "#/$defs/IPPortFamily",
            "description": "バインドされたアドレス (存在する場合)"
        },
        "hostnames": {
            "items": {
                "type": "string"
            },
            "type": "array"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "addr",
        "hostnames"
    ],
    "description": "AcceptEventSerializer は、バインド イベントを JSON にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `addr` | バウンドアドレス (ある場合) |

| リファレンス |
| ---------- |
| [IPPortFamily](#ipportfamily) |

## `AgentContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "rule_id": {
            "type": "string"
        },
        "rule_version": {
            "type": "string"
        },
        "rule_actions": {
            "items": true,
            "type": "array"
        },
        "policy_name": {
            "type": "string"
        },
        "policy_version": {
            "type": "string"
        },
        "version": {
            "type": "string"
        },
        "os": {
            "type": "string"
        },
        "arch": {
            "type": "string"
        },
        "origin": {
            "type": "string"
        },
        "kernel_version": {
            "type": "string"
        },
        "distribution": {
            "type": "string"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "rule_id"
    ]
}

{{< /code-block >}}



## `BPFEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "cmd": {
            "type": "string",
            "description": "BPF command"
        },
        "map": {
            "$ref": "#/$defs/BPFMap",
            "description": "BPF map"
        },
        "program": {
            "$ref": "#/$defs/BPFProgram",
            "description": "BPF program"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "cmd"
    ],
    "description": "BPFEventSerializer serializes a BPF event to JSON"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `cmd` | BPF コマンド |
| `map` | BPF マップ |
| `program` | BPF プログラム |

| リファレンス |
| ---------- |
| [BPFMap](#bpfmap) |
| [BPFProgram](#bpfprogram) |

## `BPFMap`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "Name of the BPF map"
        },
        "map_type": {
            "type": "string",
            "description": "Type of the BPF map"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "BPFMapSerializer serializes a BPF map to JSON"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `name` | BPF マップの名前 |
| `map_type` | BPF マップのタイプ |


## `BPFProgram`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "Name of the BPF program"
        },
        "tag": {
            "type": "string",
            "description": "Hash (sha1) of the BPF program"
        },
        "program_type": {
            "type": "string",
            "description": "Type of the BPF program"
        },
        "attach_type": {
            "type": "string",
            "description": "Attach type of the BPF program"
        },
        "helpers": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "List of helpers used by the BPF program"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "BPFProgramSerializer serializes a BPF map to JSON"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `name` | BPF プログラムの名前 |
| `tag` | BPF プログラムのハッシュ (sha1) |
| `program_type` | BPF プログラムのタイプ |
| `attach_type` | BPF プログラムのアタッチタイプ |
| `helpers` | BPF プログラムで使用するヘルパーのリスト |


## `BindEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "addr": {
            "$ref": "#/$defs/IPPortFamily",
            "description": "バインドされたアドレス (存在する場合)"
        },
        "protocol": {
            "type": "string"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "addr",
        "protocol"
    ],
    "description": "BindEventSerializer は、バインド イベントを JSON にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `addr` | バウンドアドレス (ある場合) |

| リファレンス |
| ---------- |
| [IPPortFamily](#ipportfamily) |

## `CGroupContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "id": {
            "type": "string",
            "description": "CGroup ID"
        },
        "manager": {
            "type": "string",
            "description": "CGroup マネージャ"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "CGroupContextSerializer は cgroup コンテキストを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `id` | CGroup ID |
| `manager` | CGroup マネージャ |


## `ConnectEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "addr": {
            "$ref": "#/$defs/IPPortFamily"
        },
        "hostnames": {
            "items": {
                "type": "string"
            },
            "type": "array"
        },
        "protocol": {
            "type": "string"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "addr",
        "hostnames",
        "protocol"
    ],
    "description": "ConnectEventSerializer は、接続イベントを JSON にシリアライズします"
}

{{< /code-block >}}


| リファレンス |
| ---------- |
| [IPPortFamily](#ipportfamily) |

## `ContainerContext`


{{< code-block lang="json" collapsible="true" >}}
{
"properties": {
"id": {
"type": "string",
"description": "コンテナ ID"
},
"created_at": {
"type": "string",
"format": "date-time",
"description": "コンテナの作成時刻"
},
"variables": {
"$ref": "#/$defs/Variables",
"description": "変数値"
}
},
"additionalProperties": false,
"type": "object",
"description": "ContainerContextSerializer はコンテナコンテキストを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `id` | コンテナ ID |
| `created_at` | コンテナの作成時間 |
| `variables` | 変数値 |

| リファレンス |
| ---------- |
| [変数](#variables) |

## `DDContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "span_id": {
            "type": "string",
            "description": "APM 相関に使用されるスパン ID"
        },
        "trace_id": {
            "type": "string",
            "description": "APM 相関に使用されるトレース ID"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "DDContextSerializer はスパンコンテキストを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `span_id` | APM 相関に使用するスパン ID |
| `trace_id` | APM 相関に使用するトレース ID |


## `DNSEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "id": {
            "type": "integer",
            "description": "id は DNS リクエストの一意な識別子である"
        },
        "question": {
            "$ref": "#/$defs/DNSQuestion",
            "description": "question は DNS リクエストに対する DNS 質問である"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "id",
        "question"
    ],
    "description": "DNSEventSerializer は DNS イベントを JSON にシリアライズする"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `id` | id は DNS リクエストの一意な識別子です |
| `question` | question は、DNS リクエストに対する DNS 質問です |

| リファレンス |
| ---------- |
| [DNSQuestion](#dnsquestion) |

## `DNSQuestion`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "class": {
            "type": "string",
            "description": "class is the class looked up by the DNS question"
        },
        "type": {
            "type": "string",
            "description": "type is a two octet code which specifies the DNS question type"
        },
        "name": {
            "type": "string",
            "description": "name is the queried domain name"
        },
        "size": {
            "type": "integer",
            "description": "size is the total DNS request size in bytes"
        },
        "count": {
            "type": "integer",
            "description": "count is the total count of questions in the DNS request"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "class",
        "type",
        "name",
        "size",
        "count"
    ],
    "description": "DNSQuestionSerializer serializes a DNS question to JSON"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `class` | class は DNS の質問で調べたクラスです |
| `type` | type は DNS の質問タイプを指定する 2 オクテットのコードです |
| `name` | name はクエリしたドメイン名です |
| `size` | size は、DNS リクエストの合計サイズ (バイト) です |
| `count` | count は DNS リクエストの質問数の合計です |


## `EventContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "イベント名"
        },
        "category": {
            "type": "string",
            "description": "イベント カテゴリ"
        },
        "outcome": {
            "type": "string",
            "description": "イベントの結果"
        },
        "async": {
            "type": "boolean",
            "description": "イベントが非同期の場合は true"
        },
        "matched_rules": {
            "items": {
                "$ref": "#/$defs/MatchedRule"
            },
            "type": "array",
            "description": "イベントが一致したルールの一覧 (異常検知のコンテキストでのみ有効)"
        },
        "variables": {
            "$ref": "#/$defs/Variables",
            "description": "Variables の値"
        },
        "rule_context": {
            "$ref": "#/$defs/RuleContext",
            "description": "RuleContext のルール コンテキスト"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "EventContextSerializer は、イベント コンテキストを JSON にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `name` | イベント名 |
| `category` | イベントカテゴリー |
| `outcome` | イベント結果 |
| `async` | イベントが非同期の場合、true |
| `matched_rules` | イベントが一致したルールのリスト (異常のコンテキストでのみ有効) |
| `variables` | 変数値 |
| `rule_context` | RuleContext のルール コンテキスト |

| リファレンス |
| ---------- |
| [変数](#variables) |
| [RuleContext](#rulecontext) |

## `ExitEvent`


{{< code-block lang="json" collapsible="true" >}}
{
"properties": {
"cause": {
"type": "string",
"description": "プロセス終了の原因 (EXITED、SIGNALED、COREDUMPED のいずれか)"
},
"code": {
"type": "integer",
"description": "プロセスを終了させた終了コードまたはシグナルの番号"
}
},
"additionalProperties": false,
"type": "object",
"required": [
"cause",
"code"
],
"description": "ExitEventSerializer は終了イベントを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `cause` | プロセス終了の原因 (EXITED、SIGNALED、COREDUMPED のいずれか 1 つ) |
| `code` | プロセスの終了コード、またはプロセスを終了させたシグナルの番号 |


## `File`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "path": {
            "type": "string",
            "description": "ファイルパス"
        },
        "name": {
            "type": "string",
            "description": "ファイルのベース名"
        },
        "path_resolution_error": {
            "type": "string",
            "description": "パス解決時のエラーメッセージ"
        },
        "inode": {
            "type": "integer",
            "description": "ファイルの inode 番号"
        },
        "mode": {
            "type": "integer",
            "description": "ファイルモード"
        },
        "in_upper_layer": {
            "type": "boolean",
            "description": "ファイルの OverlayFS レイヤーを示す指標"
        },
        "mount_id": {
            "type": "integer",
            "description": "ファイルのマウント ID"
        },
        "filesystem": {
            "type": "string",
            "description": "ファイルのファイルシステム名"
        },
        "uid": {
            "type": "integer",
            "description": "ファイルのユーザー ID"
        },
        "gid": {
            "type": "integer",
            "description": "ファイルのグループ ID"
        },
        "user": {
            "type": "string",
            "description": "ファイルのユーザー"
        },
        "group": {
            "type": "string",
            "description": "ファイルのグループ"
        },
        "attribute_name": {
            "type": "string",
            "description": "ファイルの拡張属性名"
        },
        "attribute_namespace": {
            "type": "string",
            "description": "ファイルの拡張属性ネームスペース"
        },
        "flags": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "ファイルフラグ"
        },
        "access_time": {
            "type": "string",
            "format": "date-time",
            "description": "ファイルのアクセス時刻"
        },
        "modification_time": {
            "type": "string",
            "format": "date-time",
            "description": "ファイルの更新時刻"
        },
        "change_time": {
            "type": "string",
            "format": "date-time",
            "description": "ファイルの変更時刻"
        },
        "package_name": {
            "type": "string",
            "description": "システムパッケージ名"
        },
        "package_version": {
            "type": "string",
            "description": "システムパッケージバージョン"
        },
        "hashes": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "ファイルの暗号学的ハッシュのリスト"
        },
        "hash_state": {
            "type": "string",
            "description": "ハッシュの状態、または計算されなかった理由"
        },
        "mount_path": {
            "type": "string",
            "description": "マウントの MountPath パス"
        },
        "mount_source": {
            "type": "string",
            "description": "マウントの MountPath ソース"
        },
        "mount_origin": {
            "type": "string",
            "description": "マウントの MountPath 起源"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "uid",
        "gid"
    ],
    "description": "FileSerializer はファイルを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `path` | ファイルパス |
| `name` | ファイルベース名 |
| `path_resolution_error` | パス解決時のエラーメッセージ |
| `inode` | ファイルの inode 番号 |
| `mode` | ファイルモード |
| `in_upper_layer` | ファイル OverlayFS レイヤーのインジケーター |
| `mount_id` | ファイルマウント ID |
| `filesystem` | ファイルの filesystem 名 |
| `uid` | ファイルユーザー ID |
| `gid` | ファイルグループ ID |
| `user` | ファイルユーザー |
| `group` | ファイルグループ |
| `attribute_name` | ファイル拡張属性名 |
| `attribute_namespace` | ファイル拡張属性ネームスペース |
| `flags` | ファイルフラグ |
| `access_time` | ファイルアクセス時間 |
| `modification_time` | ファイル更新時間 |
| `change_time` | ファイル変更時間 |
| `package_name` | システムパッケージ名 |
| `package_version` | システムパッケージバージョン |
| `hashes` | ファイルの暗号学的ハッシュのリスト |
| `hash_state` | ハッシュの状態、または計算されなかった理由 |
| `mount_path` | マウントの MountPath パス |
| `mount_source` | マウントの MountPath ソース |
| `mount_origin` | マウントの MountPath 起源 |


## `FileEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "path": {
            "type": "string",
            "description": "ファイルパス"
        },
        "name": {
            "type": "string",
            "description": "ファイルのベース名"
        },
        "path_resolution_error": {
            "type": "string",
            "description": "パス解決時のエラーメッセージ"
        },
        "inode": {
            "type": "integer",
            "description": "ファイルの inode 番号"
        },
        "mode": {
            "type": "integer",
            "description": "ファイルモード"
        },
        "in_upper_layer": {
            "type": "boolean",
            "description": "ファイルの OverlayFS レイヤーを示す指標"
        },
        "mount_id": {
            "type": "integer",
            "description": "ファイルのマウント ID"
        },
        "filesystem": {
            "type": "string",
            "description": "ファイルのファイルシステム名"
        },
        "uid": {
            "type": "integer",
            "description": "ファイルのユーザー ID"
        },
        "gid": {
            "type": "integer",
            "description": "ファイルのグループ ID"
        },
        "user": {
            "type": "string",
            "description": "ファイルのユーザー"
        },
        "group": {
            "type": "string",
            "description": "ファイルのグループ"
        },
        "attribute_name": {
            "type": "string",
            "description": "ファイルの拡張属性名"
        },
        "attribute_namespace": {
            "type": "string",
            "description": "ファイルの拡張属性ネームスペース"
        },
        "flags": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "ファイルフラグ"
        },
        "access_time": {
            "type": "string",
            "format": "date-time",
            "description": "ファイルのアクセス時刻"
        },
        "modification_time": {
            "type": "string",
            "format": "date-time",
            "description": "ファイルの更新時刻"
        },
        "change_time": {
            "type": "string",
            "format": "date-time",
            "description": "ファイルの変更時刻"
        },
        "package_name": {
            "type": "string",
            "description": "システムパッケージ名"
        },
        "package_version": {
            "type": "string",
            "description": "システムパッケージバージョン"
        },
        "hashes": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "ファイルの暗号学的ハッシュのリスト"
        },
        "hash_state": {
            "type": "string",
            "description": "ハッシュの状態、または計算されなかった理由"
        },
        "mount_path": {
            "type": "string",
            "description": "マウントの MountPath パス"
        },
        "mount_source": {
            "type": "string",
            "description": "マウントの MountPath ソース"
        },
        "mount_origin": {
            "type": "string",
            "description": "マウントの MountPath 起源"
        },
        "destination": {
            "$ref": "#/$defs/File",
            "description": "ターゲットファイル情報"
        },
        "new_mount_id": {
            "type": "integer",
            "description": "新しいマウント ID"
        },
        "device": {
            "type": "integer",
            "description": "ファイルに関連付けられたデバイス"
        },
        "fstype": {
            "type": "string",
            "description": "ファイルシステムの種類"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "uid",
        "gid"
    ],
    "description": "FileEventSerializer はファイルイベントを JSON にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `path` | ファイルパス |
| `name` | ファイルベース名 |
| `path_resolution_error` | パス解決時のエラーメッセージ |
| `inode` | ファイルの inode 番号 |
| `mode` | ファイルモード |
| `in_upper_layer` | ファイル OverlayFS レイヤーのインジケーター |
| `mount_id` | ファイルマウント ID |
| `filesystem` | ファイルの filesystem 名 |
| `uid` | ファイルユーザー ID |
| `gid` | ファイルグループ ID |
| `user` | ファイルユーザー |
| `group` | ファイルグループ |
| `attribute_name` | ファイル拡張属性名 |
| `attribute_namespace` | ファイル拡張属性ネームスペース |
| `flags` | ファイルフラグ |
| `access_time` | ファイルアクセス時間 |
| `modification_time` | ファイル更新時間 |
| `change_time` | ファイル変更時間 |
| `package_name` | システムパッケージ名 |
| `package_version` | システムパッケージバージョン |
| `hashes` | ファイルの暗号学的ハッシュのリスト |
| `hash_state` | ハッシュの状態、または計算されなかった理由 |
| `mount_path` | マウントの MountPath パス |
| `mount_source` | マウントの MountPath ソース |
| `mount_origin` | マウントの MountPath 起源 |
| `destination` | ターゲットファイル情報 |
| `new_mount_id` | 新規マウント ID |
| `device` | ファイルに関連するデバイス |
| `fstype` | Filesystem タイプ |

| リファレンス |
| ---------- |
| [ファイル](#file) |

## `Flow`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "l3_protocol": {
            "type": "string",
            "description": "l3_protocol はレイヤー 3 のプロトコル名です"
        },
        "l4_protocol": {
            "type": "string",
            "description": "l4_protocol はレイヤー 4 のプロトコル名です"
        },
        "source": {
            "$ref": "#/$defs/IPPort",
            "description": "source はネットワーク イベントの送信元です"
        },
        "destination": {
            "$ref": "#/$defs/IPPort",
            "description": "destination はネットワーク イベントの受信先です"
        },
        "ingress": {
            "$ref": "#/$defs/NetworkStats",
            "description": "ingress は、ingress トラフィックのネットワーク統計を保持します"
        },
        "egress": {
            "$ref": "#/$defs/NetworkStats",
            "description": "egress は、egress トラフィックのネットワーク統計を保持します"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "l3_protocol",
        "l4_protocol",
        "source",
        "destination"
    ],
    "description": "FlowSerializer は、新しいフロー シリアライザを定義します"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `l3_protocol` | l3_protocol はレイヤー 3 プロトコル名です |
| `l4_protocol` | l4_protocol はレイヤー 4 プロトコル名です |
| `source` | source は、ネットワークイベントの発信元です |
| `destination` | destination は、ネットワークイベントの受信者です |
| `ingress` | ingress は、ingress トラフィックのネットワーク統計を保持します |
| `egress` | egress は、egress トラフィックのネットワーク統計を保持します |

| リファレンス |
| ---------- |
| [IPPort](#ipport) |
| [NetworkStats](#networkstats) |

## `IMDSEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "type": {
            "type": "string",
            "description": "type は IMDS イベントの種類です"
        },
        "cloud_provider": {
            "type": "string",
            "description": "cloud_provider は IMDS イベントを想定したクラウドプロバイダです"
        },
        "url": {
            "type": "string",
            "description": "url は IMDS リクエストの URL です"
        },
        "host": {
            "type": "string",
            "description": "host は HTTP プロトコルのホストです"
        },
        "user_agent": {
            "type": "string",
            "description": "user_agent は HTTP クライアントのユーザーエージェントです"
        },
        "server": {
            "type": "string",
            "description": "server はレスポンスのサーバーヘッダです"
        },
        "aws": {
            "$ref": "#/$defs/AWSIMDSEvent",
            "description": "AWS は IMDS イベントから解析された AWS 固有のデータを保持します"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "type",
        "cloud_provider"
    ],
    "description": "IMDSEventSerializer は IMDS イベントを JSON にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `type` | type は IMDS イベントの種類です |
| `cloud_provider` | cloud_provider は IMDS イベントを想定したクラウドプロバイダです |
| `url` | url は IMDS リクエストの URL です |
| `host` | host は HTTP プロトコルのホストです |
| `user_agent` | user_agent は HTTP クライアントのユーザーエージェントです |
| `server` | server はレスポンスのサーバーヘッダです |
| `aws` | AWS は IMDS イベントから解析された AWS 固有のデータを保持します |

| リファレンス |
| ---------- |
| [AWSIMDSEvent](#awsimdsevent) |

## `IPPort`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "ip": {
            "type": "string",
            "description": "IP address"
        },
        "port": {
            "type": "integer",
            "description": "Port number"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "ip",
        "port"
    ],
    "description": "IPPortSerializer is used to serialize an IP and Port context to JSON"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `ip` | IP アドレス |
| `port` | ポート番号 |


## `IPPortFamily`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "family": {
            "type": "string",
            "description": "Address family"
        },
        "ip": {
            "type": "string",
            "description": "IP address"
        },
        "port": {
            "type": "integer",
            "description": "Port number"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "family",
        "ip",
        "port"
    ],
    "description": "IPPortFamilySerializer is used to serialize an IP, port, and address family context to JSON"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `family` | アドレスファミリー |
| `ip` | IP アドレス |
| `port` | ポート番号 |


## `MMapEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "address": {
            "type": "string",
            "description": "memory segment address"
        },
        "offset": {
            "type": "integer",
            "description": "file offset"
        },
        "length": {
            "type": "integer",
            "description": "memory segment length"
        },
        "protection": {
            "type": "string",
            "description": "memory segment protection"
        },
        "flags": {
            "type": "string",
            "description": "memory segment flags"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "address",
        "offset",
        "length",
        "protection",
        "flags"
    ],
    "description": "MMapEventSerializer serializes a mmap event to JSON"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `address` | メモリセグメントアドレス |
| `offset` | ファイルオフセット |
| `length` | メモリセグメント長 |
| `protection` | メモリセグメント保護 |
| `flags` | メモリセグメントフラグ |


## `MProtectEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "vm_start": {
            "type": "string",
            "description": "memory segment start address"
        },
        "vm_end": {
            "type": "string",
            "description": "memory segment end address"
        },
        "vm_protection": {
            "type": "string",
            "description": "initial memory segment protection"
        },
        "req_protection": {
            "type": "string",
            "description": "new memory segment protection"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "vm_start",
        "vm_end",
        "vm_protection",
        "req_protection"
    ],
    "description": "MProtectEventSerializer serializes a mmap event to JSON"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `vm_start` | メモリセグメント開始アドレス |
| `vm_end` | メモリセグメント終了アドレス |
| `vm_protection` | 初期メモリセグメント保護 |
| `req_protection` | 新規メモリセグメント保護 |


## `MatchedRule`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "id": {
            "type": "string",
            "description": "ルールの ID"
        },
        "version": {
            "type": "string",
            "description": "ルールのバージョン"
        },
        "tags": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "ルールのタグ"
        },
        "policy_name": {
            "type": "string",
            "description": "ルールを導入したポリシーの名前"
        },
        "policy_version": {
            "type": "string",
            "description": "ルールを導入したポリシーのバージョン"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "MatchedRuleSerializer はルールをシリアライズする"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `id` | ルールの ID |
| `version` | ルールのバージョン |
| `tags` | ルールのタグ |
| `policy_name` | ルールを導入したポリシーの名前 |
| `policy_version` | ルールを導入したポリシーのバージョン |


## `MatchingSubExpr`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "offset": {
            "type": "integer"
        },
        "length": {
            "type": "integer"
        },
        "value": {
            "type": "string"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "offset",
        "length",
        "value"
    ],
    "description": "MatchingSubExpr は、一致した部分式を JSON にシリアライズします"
}

{{< /code-block >}}



## `ModuleEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "モジュール名"
        },
        "loaded_from_memory": {
            "type": "boolean",
            "description": "モジュールがファイルからではなくメモリからロードされたかどうかを示す"
        },
        "argv": {
            "items": {
                "type": "string"
            },
            "type": "array"
        },
        "args_truncated": {
            "type": "boolean"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "name"
    ],
    "description": "ModuleEventSerializer はモジュールイベントを JSON にシリアライズする"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `name` | モジュール名 |
| `loaded_from_memory` | モジュールがファイルではなく、メモリからロードされたかどうかを示します |


## `MountEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "mp": {
            "$ref": "#/$defs/File",
            "description": "マウントポイントのファイル情報"
        },
        "root": {
            "$ref": "#/$defs/File",
            "description": "ルートファイル情報"
        },
        "mount_id": {
            "type": "integer",
            "description": "新しいマウントのマウント ID"
        },
        "parent_mount_id": {
            "type": "integer",
            "description": "親マウントのマウント ID"
        },
        "bind_src_mount_id": {
            "type": "integer",
            "description": "バインドマウントのソースとなるマウントのマウント ID"
        },
        "device": {
            "type": "integer",
            "description": "ファイルに関連付けられたデバイス"
        },
        "fs_type": {
            "type": "string",
            "description": "ファイルシステムの種類"
        },
        "mountpoint.path": {
            "type": "string",
            "description": "マウントポイントのパス"
        },
        "source.path": {
            "type": "string",
            "description": "マウントソースのパス"
        },
        "mountpoint.path_error": {
            "type": "string",
            "description": "マウントポイントのパスエラー"
        },
        "source.path_error": {
            "type": "string",
            "description": "マウントソースのパスエラー"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "mount_id",
        "parent_mount_id",
        "bind_src_mount_id",
        "device"
    ],
    "description": "MountEventSerializer はマウントイベントを JSON にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `mp` | マウントポイントのファイル情報 |
| `root` | ルートファイル情報 |
| `mount_id` | 新しいマウントのマウント ID |
| `parent_mount_id` | 親マウントのマウント ID |
| `bind_src_mount_id` | バインドマウントのソースとなるマウントのマウント ID |
| `device` | ファイルに関連するデバイス |
| `fs_type` | Filesystem タイプ |
| `mountpoint.path` | マウントポイントのパス |
| `source.path` | マウントソースのパス |
| `mountpoint.path_error` | マウントポイントのパスエラー |
| `source.path_error` | マウントソースのパスエラー |

| リファレンス |
| ---------- |
| [ファイル](#file) |

## `NetworkContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "device": {
            "$ref": "#/$defs/NetworkDevice",
            "description": "device は、イベントをキャプチャしたネットワーク デバイスです"
        },
        "l3_protocol": {
            "type": "string",
            "description": "l3_protocol はレイヤー 3 のプロトコル名です"
        },
        "l4_protocol": {
            "type": "string",
            "description": "l4_protocol はレイヤー 4 のプロトコル名です"
        },
        "source": {
            "$ref": "#/$defs/IPPort",
            "description": "source はネットワーク イベントの送信元です"
        },
        "destination": {
            "$ref": "#/$defs/IPPort",
            "description": "destination はネットワーク イベントの宛先です"
        },
        "size": {
            "type": "integer",
            "description": "size はネットワーク イベントのサイズをバイト単位で表します"
        },
        "network_direction": {
            "type": "string",
            "description": "network_direction は、パケットが ingress と egress のどちらでキャプチャされたかを示します"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "l3_protocol",
        "l4_protocol",
        "source",
        "destination",
        "size",
        "network_direction"
    ],
    "description": "NetworkContextSerializer は、ネットワーク コンテキストを JSON にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `device` | device はイベントがキャプチャされたネットワークデバイスです |
| `l3_protocol` | l3_protocol はレイヤー 3 プロトコル名です |
| `l4_protocol` | l4_protocol はレイヤー 4 プロトコル名です |
| `source` | source は、ネットワークイベントの発信元です |
| `destination` | destination は、ネットワークイベントの受信者です |
| `size` | size は、ネットワークイベントのバイト数です |
| `network_direction` | network_direction は、パケットが ingress と egress のどちらでキャプチャされたかを示します |

| リファレンス |
| ---------- |
| [NetworkDevice](#networkdevice) |
| [IPPort](#ipport) |

## `NetworkDevice`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "netns": {
            "type": "integer",
            "description": "netns is the interface ifindex"
        },
        "ifindex": {
            "type": "integer",
            "description": "ifindex is the network interface ifindex"
        },
        "ifname": {
            "type": "string",
            "description": "ifname is the network interface name"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "netns",
        "ifindex",
        "ifname"
    ],
    "description": "NetworkDeviceSerializer serializes the network device context to JSON"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `netns` | netns はインターフェイス ifindex です |
| `ifindex` | ifindex はネットワークインターフェース ifindex です |
| `ifname` | ifname はネットワークインターフェース名です |


## `NetworkFlowMonitor`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "device": {
            "$ref": "#/$defs/NetworkDevice",
            "description": "device は、イベントをキャプチャしたネットワーク デバイスです"
        },
        "flows": {
            "items": {
                "$ref": "#/$defs/Flow"
            },
            "type": "array",
            "description": "flows は、キャプチャされたネットワーク統計を含むフローの一覧です"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "NetworkFlowMonitorSerializer は、ネットワーク モニタ イベント シリアライザを定義します"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `device` | device はイベントがキャプチャされたネットワークデバイスです |
| `flows` | flows は、キャプチャされたネットワーク統計を含むフローの一覧です |

| リファレンス |
| ---------- |
| [NetworkDevice](#networkdevice) |

## `NetworkStats`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "data_size": {
            "type": "integer",
            "description": "data_size は送受信したバイト数の合計です"
        },
        "packet_count": {
            "type": "integer",
            "description": "packet_count は送受信したパケット数の合計です"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "NetworkStatsSerializer は、新しいネットワーク統計用シリアライザを定義します"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `data_size` | data_size は送受信したバイト数の合計です |
| `packet_count` | packet_count は送受信したパケット数の合計です |


## `PTraceEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "request": {
            "type": "string",
            "description": "ptrace request"
        },
        "address": {
            "type": "string",
            "description": "address at which the ptrace request was executed"
        },
        "tracee": {
            "$ref": "#/$defs/ProcessContext",
            "description": "process context of the tracee"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "request",
        "address"
    ],
    "description": "PTraceEventSerializer serializes a mmap event to JSON"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `request` | ptrace リクエスト |
| `address` | ptrace リクエストが実行されたアドレス |
| `tracee` | tracee のプロセスコンテキスト |

| リファレンス |
| ---------- |
| [ProcessContext](#processcontext) |

## `Process`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "pid": {
            "type": "integer",
            "description": "プロセス ID"
        },
        "ppid": {
            "type": "integer",
            "description": "親プロセス ID"
        },
        "tid": {
            "type": "integer",
            "description": "スレッド ID"
        },
        "uid": {
            "type": "integer",
            "description": "ユーザー ID"
        },
        "gid": {
            "type": "integer",
            "description": "グループ ID"
        },
        "user": {
            "type": "string",
            "description": "ユーザー名"
        },
        "group": {
            "type": "string",
            "description": "グループ名"
        },
        "path_resolution_error": {
            "type": "string",
            "description": "パス解決のエラー内容"
        },
        "comm": {
            "type": "string",
            "description": "コマンド名"
        },
        "tty": {
            "type": "string",
            "description": "プロセスに関連付けられた TTY"
        },
        "fork_time": {
            "type": "string",
            "format": "date-time",
            "description": "プロセスのフォーク時刻"
        },
        "exec_time": {
            "type": "string",
            "format": "date-time",
            "description": "プロセスの exec 時刻"
        },
        "exit_time": {
            "type": "string",
            "format": "date-time",
            "description": "プロセスの終了時刻"
        },
        "credentials": {
            "$ref": "#/$defs/ProcessCredentials",
            "description": "プロセスに関連付けられた認証情報"
        },
        "user_session": {
            "$ref": "#/$defs/UserSessionContext",
            "description": "このイベントにおけるユーザーセッションのコンテキスト"
        },
        "executable": {
            "$ref": "#/$defs/File",
            "description": "実行可能ファイルの情報"
        },
        "interpreter": {
            "$ref": "#/$defs/File",
            "description": "インタープリタのファイル情報"
        },
        "container": {
            "$ref": "#/$defs/ContainerContext",
            "description": "コンテナコンテキスト"
        },
        "argv0": {
            "type": "string",
            "description": "最初のコマンドライン引数"
        },
        "args": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "コマンドライン引数"
        },
        "args_truncated": {
            "type": "boolean",
            "description": "引数が切り捨てられたかどうかを示す指標"
        },
        "envs": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "プロセスの環境変数"
        },
        "envs_truncated": {
            "type": "boolean",
            "description": "環境変数が切り捨てられたかどうかを示す指標"
        },
        "is_thread": {
            "type": "boolean",
            "description": "プロセスがスレッドとして扱われるかを示します (別のプログラムが実行されていない子プロセス)"
        },
        "is_kworker": {
            "type": "boolean",
            "description": "プロセスが kworker であるかどうかを示します"
        },
        "is_exec_child": {
            "type": "boolean",
            "description": "プロセスが別の exec の後に行われた exec であるかどうかを示します"
        },
        "source": {
            "type": "string",
            "description": "プロセスソース"
        },
        "syscalls": {
            "$ref": "#/$defs/SyscallsEvent",
            "description": "イベント生成のためにキャプチャされたシステムコールのリスト"
        },
        "aws_security_credentials": {
            "items": {
                "$ref": "#/$defs/AWSSecurityCredentials"
            },
            "type": "array",
            "description": "プロセスがアクセス権を持っていた AWS セキュリティ資格情報のリスト"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "uid",
        "gid"
    ],
    "description": "ProcessSerializer はプロセスを JSON にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `pid` | プロセス ID |
| `ppid` | 親プロセス ID |
| `tid` | スレッド ID |
| `uid` | ユーザー ID |
| `gid` | グループ ID |
| `user` | ユーザー名 |
| `group` | グループ名 |
| `path_resolution_error` | パス解決に伴うエラーの説明 |
| `comm` | コマンド名 |
| `tty` | プロセスに関連する TTY |
| `fork_time` | プロセスのフォーク時間 |
| `exec_time` | プロセスの実行時間 |
| `exit_time` | プロセスの終了時間 |
| `credentials` | プロセスに関連する認証情報 |
| `user_session` | このイベントにおけるユーザーセッションのコンテキスト |
| `executable` | 実行ファイルのファイル情報 |
| `interpreter` | インタープリターのファイル情報 |
| `container` | コンテナコンテキスト |
| `argv0` | コマンドライン第一引数 |
| `args` | コマンドライン引数 |
| `args_truncated` | 引数の切り捨てのインジケーター |
| `envs` | プロセスの環境変数 |
| `envs_truncated` | 環境変数の切り捨てのインジケーター |
| `is_thread` | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| `is_kworker` | プロセスが kworker であるかどうかを示します |
| `is_exec_child` | プロセスが別の exec の後に行われた exec であるかどうかを示します |
| `source` | プロセスソース |
| `syscalls` | イベント生成のためにキャプチャされたシステムコールのリスト |
| `aws_security_credentials` | プロセスがアクセス権を持っていた AWS セキュリティ資格情報のリスト |

| リファレンス |
| ---------- |
| [ProcessCredentials](#processcredentials) |
| [UserSessionContext](#usersessioncontext) |
| [ファイル](#file) |
| [ContainerContext](#containercontext) |
| [SyscallsEvent](#syscallsevent) |

## `ProcessContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "pid": {
            "type": "integer",
            "description": "プロセス ID"
        },
        "ppid": {
            "type": "integer",
            "description": "親プロセス ID"
        },
        "tid": {
            "type": "integer",
            "description": "スレッド ID"
        },
        "uid": {
            "type": "integer",
            "description": "ユーザー ID"
        },
        "gid": {
            "type": "integer",
            "description": "グループ ID"
        },
        "user": {
            "type": "string",
            "description": "ユーザー名"
        },
        "group": {
            "type": "string",
            "description": "グループ名"
        },
        "path_resolution_error": {
            "type": "string",
            "description": "パス解決のエラー内容"
        },
        "comm": {
            "type": "string",
            "description": "コマンド名"
        },
        "tty": {
            "type": "string",
            "description": "プロセスに関連付けられた TTY"
        },
        "fork_time": {
            "type": "string",
            "format": "date-time",
            "description": "プロセスのフォーク時刻"
        },
        "exec_time": {
            "type": "string",
            "format": "date-time",
            "description": "プロセスの exec 時刻"
        },
        "exit_time": {
            "type": "string",
            "format": "date-time",
            "description": "プロセスの終了時刻"
        },
        "credentials": {
            "$ref": "#/$defs/ProcessCredentials",
            "description": "プロセスに関連付けられた認証情報"
        },
        "user_session": {
            "$ref": "#/$defs/UserSessionContext",
            "description": "このイベントにおけるユーザーセッションのコンテキスト"
        },
        "executable": {
            "$ref": "#/$defs/File",
            "description": "実行可能ファイルの情報"
        },
        "interpreter": {
            "$ref": "#/$defs/File",
            "description": "インタープリタのファイル情報"
        },
        "container": {
            "$ref": "#/$defs/ContainerContext",
            "description": "コンテナコンテキスト"
        },
        "argv0": {
            "type": "string",
            "description": "最初のコマンドライン引数"
        },
        "args": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "コマンドライン引数"
        },
        "args_truncated": {
            "type": "boolean",
            "description": "引数が切り捨てられたかどうかを示す指標"
        },
        "envs": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "プロセスの環境変数"
        },
        "envs_truncated": {
            "type": "boolean",
            "description": "環境変数が切り捨てられたかどうかを示す指標"
        },
        "is_thread": {
            "type": "boolean",
            "description": "プロセスがスレッドとして扱われるかを示します (別のプログラムが実行されていない子プロセス)"
        },
        "is_kworker": {
            "type": "boolean",
            "description": "プロセスが kworker であるかどうかを示します"
        },
        "is_exec_child": {
            "type": "boolean",
            "description": "プロセスが別の exec の後に行われた exec であるかどうかを示します"
        },
        "source": {
            "type": "string",
            "description": "プロセスソース"
        },
        "syscalls": {
            "$ref": "#/$defs/SyscallsEvent",
            "description": "イベント生成のためにキャプチャされたシステムコールのリスト"
        },
        "aws_security_credentials": {
            "items": {
                "$ref": "#/$defs/AWSSecurityCredentials"
            },
            "type": "array",
            "description": "プロセスがアクセス権を持っていた AWS セキュリティ資格情報のリスト"
        },
        "parent": {
            "$ref": "#/$defs/Process",
            "description": "親プロセス"
        },
        "ancestors": {
            "items": {
                "$ref": "#/$defs/Process"
            },
            "type": "array",
            "description": "祖先のプロセス"
        },
        "variables": {
            "$ref": "#/$defs/Variables",
            "description": "変数の値"
        },
        "truncated_ancestors": {
            "type": "boolean",
            "description": "祖先リストが大きすぎて切り捨てられた場合は True"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "uid",
        "gid"
    ],
    "description": "ProcessContextSerializer はプロセスコンテキストを JSON にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `pid` | プロセス ID |
| `ppid` | 親プロセス ID |
| `tid` | スレッド ID |
| `uid` | ユーザー ID |
| `gid` | グループ ID |
| `user` | ユーザー名 |
| `group` | グループ名 |
| `path_resolution_error` | パス解決に伴うエラーの説明 |
| `comm` | コマンド名 |
| `tty` | プロセスに関連する TTY |
| `fork_time` | プロセスのフォーク時間 |
| `exec_time` | プロセスの実行時間 |
| `exit_time` | プロセスの終了時間 |
| `credentials` | プロセスに関連する認証情報 |
| `user_session` | このイベントにおけるユーザーセッションのコンテキスト |
| `executable` | 実行ファイルのファイル情報 |
| `interpreter` | インタープリターのファイル情報 |
| `container` | コンテナコンテキスト |
| `argv0` | コマンドライン第一引数 |
| `args` | コマンドライン引数 |
| `args_truncated` | 引数の切り捨てのインジケーター |
| `envs` | プロセスの環境変数 |
| `envs_truncated` | 環境変数の切り捨てのインジケーター |
| `is_thread` | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| `is_kworker` | プロセスが kworker であるかどうかを示します |
| `is_exec_child` | プロセスが別の exec の後に行われた exec であるかどうかを示します |
| `source` | プロセスソース |
| `syscalls` | イベント生成のためにキャプチャされたシステムコールのリスト |
| `aws_security_credentials` | プロセスがアクセス権を持っていた AWS セキュリティ資格情報のリスト |
| `parent` | 親プロセス |
| `ancestors` | 祖先プロセス |
| `variables` | 変数値 |
| `truncated_ancestors` | 祖先リストが大きすぎたため切り捨てられた場合は true |

| リファレンス |
| ---------- |
| [ProcessCredentials](#processcredentials) |
| [UserSessionContext](#usersessioncontext) |
| [ファイル](#file) |
| [ContainerContext](#containercontext) |
| [SyscallsEvent](#syscallsevent) |
| [プロセス](#process) |
| [変数](#variables) |

## `ProcessCredentials`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "uid": {
            "type": "integer",
            "description": "ユーザー ID"
        },
        "user": {
            "type": "string",
            "description": "ユーザー名"
        },
        "gid": {
            "type": "integer",
            "description": "グループ ID"
        },
        "group": {
            "type": "string",
            "description": "グループ名"
        },
        "euid": {
            "type": "integer",
            "description": "実効ユーザー ID"
        },
        "euser": {
            "type": "string",
            "description": "実効ユーザー名"
        },
        "egid": {
            "type": "integer",
            "description": "実効グループ ID"
        },
        "egroup": {
            "type": "string",
            "description": "実効グループ名"
        },
        "fsuid": {
            "type": "integer",
            "description": "ファイルシステム上のユーザー ID"
        },
        "fsuser": {
            "type": "string",
            "description": "ファイルシステム上のユーザー名"
        },
        "fsgid": {
            "type": "integer",
            "description": "ファイルシステム上のグループ ID"
        },
        "fsgroup": {
            "type": "string",
            "description": "ファイルシステム上のグループ名"
        },
        "auid": {
            "type": "integer",
            "description": "ログイン UID"
        },
        "cap_effective": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "実効ケイパビリティセット"
        },
        "cap_permitted": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "許可ケイパビリティセット"
        },
        "destination": {
            "description": "操作後の認証情報"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "uid",
        "gid",
        "euid",
        "egid",
        "fsuid",
        "fsgid",
        "auid",
        "cap_effective",
        "cap_permitted"
    ],
    "description": "ProcessCredentialsSerializer はプロセス認証情報を JSON にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `uid` | ユーザー ID |
| `user` | ユーザー名 |
| `gid` | グループ ID |
| `group` | グループ名 |
| `euid` | 有効なユーザー ID |
| `euser` | 有効なユーザー名 |
| `egid` | 有効なグループ ID |
| `egroup` | 有効なグループ名 |
| `fsuid` | Filesystem ユーザー ID |
| `fsuser` | Filesystem ユーザー名 |
| `fsgid` | Filesystem グループ ID |
| `fsgroup` | Filesystem グループ名 |
| `auid` | ログイン UID |
| `cap_effective` | 有効な Capability セット |
| `cap_permitted` | 許可された Capability セット |
| `destination` | 操作後の認証情報 |


## `RawPacket`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "device": {
            "$ref": "#/$defs/NetworkDevice",
            "description": "device は、イベントをキャプチャしたネットワーク デバイスです"
        },
        "l3_protocol": {
            "type": "string",
            "description": "l3_protocol はレイヤー 3 のプロトコル名です"
        },
        "l4_protocol": {
            "type": "string",
            "description": "l4_protocol はレイヤー 4 のプロトコル名です"
        },
        "source": {
            "$ref": "#/$defs/IPPort",
            "description": "source はネットワーク イベントの送信元です"
        },
        "destination": {
            "$ref": "#/$defs/IPPort",
            "description": "destination はネットワーク イベントの受信先です"
        },
        "size": {
            "type": "integer",
            "description": "size はネットワーク イベントのサイズをバイト単位で表します"
        },
        "network_direction": {
            "type": "string",
            "description": "network_direction は、パケットが ingress と egress のどちらでキャプチャされたかを示します"
        },
        "tls": {
            "$ref": "#/$defs/TLSContext"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "l3_protocol",
        "l4_protocol",
        "source",
        "destination",
        "size",
        "network_direction"
    ],
    "description": "RawPacketSerializer は、raw パケット シリアライザを定義します"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `device` | device はイベントがキャプチャされたネットワークデバイスです |
| `l3_protocol` | l3_protocol はレイヤー 3 プロトコル名です |
| `l4_protocol` | l4_protocol はレイヤー 4 プロトコル名です |
| `source` | source は、ネットワークイベントの発信元です |
| `destination` | destination は、ネットワークイベントの受信者です |
| `size` | size は、ネットワークイベントのバイト数です |
| `network_direction` | network_direction は、パケットが ingress と egress のどちらでキャプチャされたかを示します |

| リファレンス |
| ---------- |
| [NetworkDevice](#networkdevice) |
| [IPPort](#ipport) |
| [TLSContext](#tlscontext) |

## `RuleContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "matching_subexprs": {
            "items": {
                "$ref": "#/$defs/MatchingSubExpr"
            },
            "type": "array"
        },
        "expression": {
            "type": "string"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "RuleContext は、ルール コンテキストを JSON にシリアライズします"
}

{{< /code-block >}}



## `SELinuxBoolChange`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "SELinux boolean name"
        },
        "state": {
            "type": "string",
            "description": "SELinux boolean state ('on' or 'off')"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "SELinuxBoolChangeSerializer serializes a SELinux boolean change to JSON"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `name` | SELinux ブール値名 |
| `state` | SELinux のブール値状態（'on' または 'off') |


## `SELinuxBoolCommit`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "state": {
            "type": "boolean",
            "description": "SELinux boolean commit operation"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "SELinuxBoolCommitSerializer serializes a SELinux boolean commit to JSON"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `state` | SELinux のブールコミット演算 |


## `SELinuxEnforceStatus`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "status": {
            "type": "string",
            "description": "SELinux enforcement status (one of 'enforcing', 'permissive' or 'disabled')"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "SELinuxEnforceStatusSerializer serializes a SELinux enforcement status change to JSON"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `status` | SELinux の実行ステータス (’enforcing'、’permissive'、’disabled' のいずれか 1 つ) |


## `SELinuxEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "bool": {
            "$ref": "#/$defs/SELinuxBoolChange",
            "description": "SELinux boolean operation"
        },
        "enforce": {
            "$ref": "#/$defs/SELinuxEnforceStatus",
            "description": "SELinux enforcement change"
        },
        "bool_commit": {
            "$ref": "#/$defs/SELinuxBoolCommit",
            "description": "SELinux boolean commit"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "SELinuxEventSerializer serializes a SELinux context to JSON"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `bool` | SELinux のブール演算 |
| `enforce` | SELinux の強制力の変更 |
| `bool_commit` | SELinux のブールコミット |

| リファレンス |
| ---------- |
| [SELinuxBoolChange](#selinuxboolchange) |
| [SELinuxEnforceStatus](#selinuxenforcestatus) |
| [SELinuxBoolCommit](#selinuxboolcommit) |

## `SecurityProfileContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "セキュリティプロファイルの名前"
        },
        "version": {
            "type": "string",
            "description": "使用中のプロファイルのバージョン"
        },
        "tags": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "このプロファイルに関連付けられたタグのリスト"
        },
        "event_in_profile": {
            "type": "boolean",
            "description": "対応するイベントがこのプロファイルの一部である場合は True"
        },
        "event_type_state": {
            "type": "string",
            "description": "このプロファイルにおけるイベントタイプの状態"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "name",
        "version",
        "tags",
        "event_in_profile",
        "event_type_state"
    ],
    "description": "SecurityProfileContextSerializer はイベント内のセキュリティプロファイルコンテキストをシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `name` | セキュリティプロファイルの名前 |
| `version` | 使用中のプロファイルのバージョン |
| `tags` | このプロファイルに関連するタグのリスト |
| `event_in_profile` | 対応するイベントがこのプロファイルの一部である場合は True |
| `event_type_state` | このプロファイルにおけるイベントタイプの状態 |


## `SignalEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "type": {
            "type": "string",
            "description": "signal type"
        },
        "pid": {
            "type": "integer",
            "description": "signal target pid"
        },
        "target": {
            "$ref": "#/$defs/ProcessContext",
            "description": "process context of the signal target"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "type",
        "pid"
    ],
    "description": "SignalEventSerializer serializes a signal event to JSON"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `type` | シグナルタイプ |
| `pid` | シグナルターゲット pid |
| `target` | シグナルターゲットのプロセスコンテキスト |

| リファレンス |
| ---------- |
| [ProcessContext](#processcontext) |

## `SpliceEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "pipe_entry_flag": {
            "type": "string",
            "description": "Entry flag of the fd_out pipe passed to the splice syscall"
        },
        "pipe_exit_flag": {
            "type": "string",
            "description": "Exit flag of the fd_out pipe passed to the splice syscall"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "pipe_entry_flag",
        "pipe_exit_flag"
    ],
    "description": "SpliceEventSerializer serializes a splice event to JSON"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `pipe_entry_flag` | splice syscall に渡された fd_out パイプのエントリフラグ |
| `pipe_exit_flag` | splice syscall に渡された fd_out パイプの終了フラグ |


## `SysCtlEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "proc": {
            "type": "object",
            "description": "Proc には /proc のシステム制御パラメータとその値が含まれます"
        },
        "action": {
            "type": "string",
            "description": "システム制御パラメータに対する操作"
        },
        "file_position": {
            "type": "integer",
            "description": "file_position は、sysctl 制御パラメータ ファイル内で操作が行われた位置です"
        },
        "name": {
            "type": "string",
            "description": "name は、システム制御パラメータ名です"
        },
        "name_truncated": {
            "type": "boolean",
            "description": "name_truncated は、name フィールドが切り詰められているかどうかを示します"
        },
        "value": {
            "type": "string",
            "description": "value は、アクション タイプによって、新しい値または現在値 (あるいはその両方) を示します"
        },
        "value_truncated": {
            "type": "boolean",
            "description": "value_truncated は、value フィールドが切り詰められているかどうかを示します"
        },
        "old_value": {
            "type": "string",
            "description": "old_value は、システム制御パラメータの旧値です"
        },
        "old_value_truncated": {
            "type": "boolean",
            "description": "old_value_truncated は、old_value フィールドが切り詰められているかどうかを示します"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "SysCtlEventSerializer は、sysctl イベント シリアライザを定義します"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `proc` | Proc には /proc のシステム制御パラメータとその値が含まれます |
| `action` | システム制御パラメータに対する操作 |
| `file_position` | file_position は、sysctl 制御パラメータ ファイル内で操作が行われた位置です |
| `name` | name は、システム制御パラメータ名です |
| `name_truncated` | name_truncated は、name フィールドが切り詰められているかどうかを示します |
| `value` | value は、アクション タイプによって、新しい値または現在値 (あるいはその両方) を示します |
| `value_truncated` | value_truncated は、value フィールドが切り詰められているかどうかを示します |
| `old_value` | old_value は、システム制御パラメータの旧値です |
| `old_value_truncated` | old_value_truncated は、old_value フィールドが切り詰められているかどうかを示します |


## `Syscall`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "システムコールの名前"
        },
        "id": {
            "type": "integer",
            "description": "ホストアーキテクチャにおけるシステムコールの ID"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "name",
        "id"
    ],
    "description": "SyscallSerializer はシステムコールをシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `name` | システムコールの名前 |
| `id` | ホストアーキテクチャにおけるシステムコールの ID |


## `SyscallArgs`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "path": {
            "type": "string",
            "description": "パス引数"
        },
        "flags": {
            "type": "integer",
            "description": "フラグ引数"
        },
        "mode": {
            "type": "integer",
            "description": "モード引数"
        },
        "uid": {
            "type": "integer",
            "description": "UID 引数"
        },
        "gid": {
            "type": "integer",
            "description": "GID 引数"
        },
        "dirfd": {
            "type": "integer",
            "description": "ディレクトリファイルディスクリプタ引数"
        },
        "destination_path": {
            "type": "string",
            "description": "宛先パス引数"
        },
        "fs_type": {
            "type": "string",
            "description": "ファイルシステムタイプ引数"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "SyscallArgsSerializer の引数シリアライザ"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `path` | パス引数 |
| `flags` | フラグ引数 |
| `mode` | モード引数 |
| `uid` | UID 引数 |
| `gid` | GID 引数 |
| `dirfd` | ディレクトリファイルディスクリプタ引数 |
| `destination_path` | 宛先パス引数 |
| `fs_type` | ファイルシステムタイプ引数 |


## `SyscallContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "chmod": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "chown": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "chdir": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "exec": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "open": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "unlink": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "link": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "rename": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "utimes": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "mount": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "mkdir": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "rmdir": {
            "$ref": "#/$defs/SyscallArgs"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "SyscallContextSerializer は、syscall コンテキストをシリアライズします"
}

{{< /code-block >}}


| リファレンス |
| ---------- |
| [SyscallArgs](#syscallargs) |

## `SyscallsEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "items": {
        "$ref": "#/$defs/Syscall"
    },
    "type": "array",
    "description": "SyscallsEventSerializer はシステムコールイベントからシステムコールをシリアライズします"
}

{{< /code-block >}}



## `TLSContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "version": {
            "type": "string"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "TLSContextSerializer は、TLS コンテキスト シリアライザを定義します"
}

{{< /code-block >}}



## `UserContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "id": {
            "type": "string",
            "description": "User name"
        },
        "group": {
            "type": "string",
            "description": "Group name"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "UserContextSerializer serializes a user context to JSON"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `id` | ユーザー名 |
| `group` | グループ名 |


## `UserSessionContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "id": {
            "type": "string",
            "description": "ホスト上のユーザーセッションの一意の識別子"
        },
        "session_type": {
            "type": "string",
            "description": "ユーザーセッションのタイプ"
        },
        "k8s_username": {
            "type": "string",
            "description": "Kubernetes の \"kubectl exec\" セッションのユーザー名"
        },
        "k8s_uid": {
            "type": "string",
            "description": "Kubernetes の \"kubectl exec\" セッションの UID"
        },
        "k8s_groups": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "Kubernetes の \"kubectl exec\" セッションのグループ"
        },
        "k8s_extra": {
            "additionalProperties": {
                "items": {
                    "type": "string"
                },
                "type": "array"
            },
            "type": "object",
            "description": "Kubernetes の \"kubectl exec\" セッションのエクストラ"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "UserSessionContextSerializer はユーザーセッションコンテキストを JSON にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明  |
| ----- | ----------- |
| `id` | ホスト上のユーザーセッションの一意の識別子 |
| `session_type` | ユーザーセッションのタイプ |
| `k8s_username` | Kubernetes の "kubectl exec" セッションのユーザー名 |
| `k8s_uid` | Kubernetes の "kubectl exec" セッションの UID |
| `k8s_groups` | Kubernetes の "kubectl exec" セッションのグループ |
| `k8s_extra` | Kubernetes の "kubectl exec" セッションのエクストラ |


## `Variables`


{{< code-block lang="json" collapsible="true" >}}
{
"type": "object",
"description": "Variables は変数値をシリアライズします"
}

{{< /code-block >}}




[1]: /ja/security/threats/
[2]: /ja/security/threats/agent
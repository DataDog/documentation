---
aliases:
- /ko/integrations/amazon_medialive
app_id: amazon-medialive
categories:
- aws
- 메트릭
- 클라우드
custom_kind: 통합
description: AWS Elemental MediaLive는 브로드캐스트 등급 라이브 비디오 프로세싱 서비스입니다.
media: []
title: Amazon MediaLive
---
## 개요

AWS Elemental MediaLive는 브로드캐스트 등급 라이브 비디오 처리 서비스입니다.

이 통합을 활성화해 Datadog에서 MediaLive 메트릭 전체를 확인하세요.

## 설정

### 설치

아직 하지 않았다면 먼저 [Amazon Web Services 통합](https://docs.datadoghq.com/integrations/amazon_web_services/)을 설정하세요.

### 메트릭 수집

1. [AWS 통합 타일](https://app.datadoghq.com/integrations/amazon-web-services)에서 `MediaLive`가 확인 표시되어 있어야 합니다.
   체크되어 있는지 확인하세요.
1. [Datadog - MediaLive 통합](https://app.datadoghq.com/integrations/amazon-medialive)을 설치하세요.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **aws.medialive.active_alerts** <br>(gauge) | 활성 알림의 평균 개수입니다.|
| **aws.medialive.active_outputs** <br>(gauge) | 생상되어 목적지에 작성 완료된 출력의 평균 개수입니다.|
| **aws.medialive.channel_input_error_seconds** <br>(count) | 하나 이상의 복구 불가능한 패킷을 포함하는 채널 입력의 시간(초)입니다.<br>_second로 표시_ |
| **aws.medialive.configured_bitrate** <br>(rate) | 구성된 비트레이트 최댓값의 평균.<br>_bit로 표시_ |
| **aws.medialive.configured_bitrate.p90** <br>(rate) | 구성된 비트레이트 최댓값의 90번째 백분위수.<br>_bit로 표시_ |
| **aws.medialive.configured_bitrate_available** <br>(gauge) | 네트워크 조건에 따라 장치가 충족할 수 있는 구성된 비트레이트의 평균.<br>_percent로 표시_ |
| **aws.medialive.configured_bitrate_available.p90** <br>(gauge) | 네트워크 조건에 따라 장치가 충족할 수 있는 구성된 비트레이트의 90번째 백분위수.<br>_percent로 표시_ |
| **aws.medialive.encoder_bitrate** <br>(rate) | 활성 인코딩된 비트레이트의 평균.<br>_bit로 표시_ |
| **aws.medialive.encoder_bitrate.p90** <br>(rate) | 활성 인코딩된 90번째 백분위수 비트레이트.<br>_bit로 표시_ |
| **aws.medialive.encoder_running** <br>(gauge) | 인코더가 입력 신호(시간에 따른 평균값)를 성공적으로 처리했는지 보여주는 표시자.|
| **aws.medialive.error_seconds** <br>(count) | 하나 이상의 패킷이 실패하여 복구되지 않은 시간(초).<br>_second로 표시_ |
| **aws.medialive.fec_column_packets_received** <br>(count) | 포트 5002와 5004의 두 FEC 스트림에서 수신된 FEC 컬럼 패킷 수. 이 값이 0이 아니면 FEC가 정상적으로 동작하고 있음을 의미합니다. 이 메트릭은 FEC가 포함된 RTP 입력 채널이 있는 경우에만 유용합니다.<br>_packet으로 표시_ |
| **aws.medialive.fec_row_packets_received** <br>(count) | 포트 5002 및 5004의 두 FEC 스트림에서 수신된 순방향 오류 정정(FEC) 행 패킷 수. 해당 값이 0이 아닌 경우 FEC가 정상적으로 작동 중임을 의미합니다. 이 메트릭은 FEC가 포함된 RTP 입력을 사용하는 채널에서만 유용합니다.<br>_packet으로 표시_ |
| **aws.medialive.fill_msec** <br>(gauge) | MediaLive가 비디오 출력에 필 프레임을 채운 기간(필 기간)의 현재 평균 지속 시간. 필 기간은 파이프라인이 예상 시간 내에 입력 콘텐츠를 수신하지 못할 경우 시작됩니다.<br>_millisecond로 표시_ |
| **aws.medialive.input_locked** <br>(gauge) | 장치가 입력 신호에 동기화되었음을 나타냅니다. 시간에 따라 나타나는 표시자의 평균값입니다.|
| **aws.medialive.input_timecodes_present** <br>(gauge) | 파이프라인이 임베디드 타임코드가 포함된 입력을 수신하고 있는지 여부를 나타내는 표시자의 평균값. 임베디드 타임코드는 소스에 포함되어 있을 수도 있고, SMPTE-2038 부가 데이터에 포함되어 있을 수도 있습니다. 값이 **0(false)**이면 존재하지 않음을, **1(true)**이면 존재함을 의미합니다.|
| **aws.medialive.input_video_frame_rate** <br>(rate) | 소스 비디오의 평균 프레임 속도. 이 메트릭은 입력 상태를 나타내는 표시자입니다. 값이 안정적이지 않은 경우, 소스 또는 MediaLive와 업스트림 시스템 간 네트워크에 문제가 있는지 확인해야 합니다.|
| **aws.medialive.linked_to_stream_endpoint** <br>(gauge) | 장차기 AWS 스트리밍 엔드포인트에 연결됨(시간에 따른 평균값).|
| **aws.medialive.network_in** <br>(gauge) | MediaLive로 유입되는 트래픽의 평균 전송률. 이 값에는 MediaLive 푸시 입력 및 풀 입력으로 수신되는 모든 트래픽, 풀 입력의 업스트림 시스템으로부터의 응답, 모든 출력의 다운스트림 시스템 응답, DNS 확인 및 NTP와 같은 인스턴스 트래픽이 포함됩니다. 채널이 수집되지 않는 경우에도 트래픽이 일부 발생합니다.|
| **aws.medialive.network_out** <br>(gauge) | MediaLive에서 유출되는 트래픽의 평균 전송률. 이 값에는 MediaLive에서 전송되는 모든 트래픽이 포함되며, 미디어 출력, 풀 입력을 위한 HTTP GET 요청, NTP 트래픽 및 DNS 트래픽이 해당됩니다. 채널이 출력을 전송하지 않을 때에도 트래픽이 일부 발생합니다.|
| **aws.medialive.not_recovered_packets** <br>(count) | 전송 중 손실되어 오류 수정으로 복구되지 않은 패킷 수.<br>_packet으로 표시_ |
| **aws.medialive.output_4xx_errors** <br>(count) | 출력 전송 중 목적지에서 수신된 4xx HTTP 오류 개수.<br>_error로 표시_ |
| **aws.medialive.output_5xx_errors** <br>(count) | 출력 전송 중 목적지에서 수신된 5xx HTTP 오류 개수.<br>_error로 표시_ |
| **aws.medialive.output_audio_level_dbfs** <br>(gauge) | 풀 스케일 대비 데시벨(dBFS)로 표현된 출력 오디오 레벨의 평균값.|
| **aws.medialive.output_audio_level_lkfs** <br>(gauge) | 풀 스케일(LKFS) 대비 K-가중 라우드니스(loudness)로 표현된 출력 오디오 레벨의 평균값.|
| **aws.medialive.output_video_frame_rate** <br>(rate) | 출력 비디오의 평균 프레임 속도.|
| **aws.medialive.pipelines_locked** <br>(gauge) | 두 파이프라인 간 동기화 여부를 나타내는 표시자의 평균값. 이 메트릭은 표준 채널에만 적용되며, 해당 채널의 HLS, MediaPackage, Microsoft Smooth 및 UDP 출력에만 유효합니다. MediaLive는 파이프라인 락킹을 통해 두 파이프라인 간 동기화를 유지합니다.|
| **aws.medialive.primary_input_active** <br>(gauge) | 자동 입력 페일오버 쌍에서 기본(primary) 입력이 활성 상태인지 여부를 나타내는 표시자의 평균값. 값이 1이면 기본 입력이 활성 상태이며 정상임을 의미하고, 0이면 비활성 상태임을 의미합니다.|
| **aws.medialive.recovered_packets** <br>(count) | 전송 중 손실되었으나 오류 수정에 의해 복구된 패킷 수.<br>_packet으로 표시_ |
| **aws.medialive.rtp_packets_lost** <br>(count) | 수신 전송 과정에서 손실된 RTP 패킷 수. 손실이란 FEC로 복구될 수 없는 패킷을 의미합니다.<br>_packet으로 표시_ |
| **aws.medialive.rtp_packets_received** <br>(count) | RTP 입력에서 수신된 RTP 패킷 수. 이 값에는 주 RTP 소스(포트 5000)와 FEC 데이터(포트 5002 및 5004)가 포함됩니다.<br>_packet으로 표시_ |
| **aws.medialive.rtp_packets_recovered_via_fec** <br>(count) | FEC를 통해 복구된 RTP 패킷 수.<br>_packet으로 표시_ |
| **aws.medialive.streaming** <br>(gauge) | 장치가 성공적으로 MediaLive로 입력 신호를 스트리밍하는 중(시간에 따른 평균값).|
| **aws.medialive.svq_time** <br>(gauge) | 지난 10초 동안 평균 기준으로, MediaLive가 실시간 처리를 유지하기 위해 인코딩 속도를 높이도록 인코더가 품질 최적화를 낮춘 시간의 백분율.<br>_percent로 표시_ |
| **aws.medialive.temperature** <br>(gauge) | 장치의 평균 온도(°C). 권장 운용 조건은 장치 설명서를 참조해야 합니다.<br>_degree celsius로 표시_ |
| **aws.medialive.total_packets** <br>(count) | AWS 스트리밍 엔드포인트로 전송된 패킷의 총 수.<br>_packet으로 표시_ |
| **aws.medialive.udp_input_loss_seconds** <br>(count) | 채널이 RTP 또는 MediaConnect 입력의 소스로부터 패킷을 수신하지 못한 기간(입력 손실 기간)의 초 단위 값. 각 데이터 포인트는 0~10초 사이의 값을 가집니다.<br>_second로 표시_ |
| **aws.medialive.using_hdmi** <br>(gauge) | HDMI가 장치에서 현재 선택된 입력인지 확인합니다. 시간에 따른 평균값입니다.|
| **aws.medialive.using_sdi** <br>(gauge) | SDI가 현재 장치의 선택된 입력인지를 나타냅니다. 시간에 따른 평균값입니다.|
| **aws.medialive.active_alerts.maximum** <br>(gauge) | 활성 상태인 알림의 최대 개수.|
| **aws.medialive.active_alerts.minimum** <br>(gauge) | 활성 상태인 알림의 최소 개수.|
| **aws.medialive.active_outputs.maximum** <br>(gauge) | 생산되어 성공적으로 목적지에 작성된 출력의 최대 개수.|
| **aws.medialive.active_outputs.minimum** <br>(gauge) | 생산되어 성공적으로 목적지에 작성된 출력의 최소 개수.|
| **aws.medialive.encoder_running.maximum** <br>(gauge) | 인코더가 입력 신호를 정상적으로 처리하고 있는지 여부를 나타내는 표시자(시간에 따른 최댓값).|
| **aws.medialive.encoder_running.minimum** <br>(gauge) | 인코더가 입력 신호를 성공적으로 처리했는지 나타내는 표시자(시간에 따른 최솟값).|
| **aws.medialive.fill_msec.maximum** <br>(gauge) | MediaLive가 비디오 출력에 필 프레임을 채운 기간(필 기간)의 현재 최대 길이. 필 기간은 파이프라인이 예상된 시간 내에 입력으로부터 콘텐츠를 수신하지 못할 때 시작됩니다. <br>_millisecond로 표시_ |
| **aws.medialive.fill_msec.minimum** <br>(gauge) | MediaLive가 비디오 출력에 필 프레임을 채운 기간(필 기간)의 현재 최소 길이. 필 기간은 파이프라인이 예상된 시간 내에 입력으로부터 콘텐츠를 수신하지 못할 때 시작됩니다.<br>_millisecond로 표시_ |
| **aws.medialive.input_locked.maximum** <br>(gauge) | 장치가 성공적으로 입력 신호에 동기화되었는지 나타냅니다(시간에 따른 최댓값).|
| **aws.medialive.input_locked.minimum** <br>(gauge) | 장치가 입력 신호에 성공적으로 동기화되었는지 여부를 나타냅니다(시간에 따른 최솟값).|
| **aws.medialive.input_timecodes_present.maximum** <br>(gauge) | 파이프라인이 임베디드 타임코드가 포함된 입력을 수신하고 있는지 여부를 나타내는 표시자의 최댓값. 임베디드 타임코드는 소스에 포함되어 있을 수도 있고, SMPTE-2038 부가 데이터에 포함되어 있을 수도 있습니다. 값이 **0(false)**이면 존재하지 않음을, **1(true)**이면 존재함을 의미합니다.|
| **aws.medialive.input_timecodes_present.minimum** <br>(gauge) | 파이프라인이 임베디드 타임코드가 포함된 입력을 수신하고 있는지 여부를 나타내는 표시자의 최솟값입니다. 임베디드 타임코드는 소스에 포함되어 있을 수도 있고, SMPTE-2038 부가 데이터에 포함되어 있을 수도 있습니다. 값이 **0(false)**이면 존재하지 않음을, **1(true)**이면 존재함을 의미합니다.|
| **aws.medialive.input_video_frame_rate.maximum** <br>(rate) | 소스 비디오의 최대 프레임 속도입니다. 이 메트릭은  입력 상태를 나타내는 표시자입니다. 값이 안정적이지 않은 경우, 소스 또는 MediaLive와 업스트림 시스템 간 네트워크에 문제가 있는지 확인해야 합니다.|
| **aws.medialive.input_video_frame_rate.minimum** <br>(rate) | 소스 비디오의 최소 프레임 속도입니다. 이 메트릭은 입력 상태를 나타내는 표시자입니다. 값이 안정적이지 않은 경우, 소스 또는 MediaLive와 업스트림 시스템 간 네트워크에 문제가 있는지 확인해야 합니다.|
| **aws.medialive.linked_to_stream_endpoint.maximum** <br>(gauge) | 장치가 AWS 스트리밍 엔드포인트에 연결됨(시간에 따른 최댓값).|
| **aws.medialive.linked_to_stream_endpoint.minimum** <br>(gauge) | 장치가 AWS 스트리밍 엔드포인트에 연결됨(시간에 따른 최솟값).|
| **aws.medialive.network_in.maximum** <br>(gauge) | MediaLive로 유입되는 트래픽의 최대 전송률. 이 값에는 MediaLive 푸시 입력 및 풀 입력으로 수신되는 모든 트래픽, 풀 입력의 업스트림 시스템으로부터의 응답, 모든 출력의 다운스트림 시스템 응답, DNS 확인 및 NTP와 같은 인스턴스 트래픽이 포함됩니다.  채널이 수집 중이 아닌 경우에도 트래픽이 일부 발생합니다.|
| **aws.medialive.network_in.minimum** <br>(gauge) | MediaLive로 유입되는 트래픽의 최소 전송률. 이 값에는 MediaLive 푸시 입력 및 풀 입력으로 수신되는 모든 트래픽, 풀 입력의 업스트림 시스템으로부터의 응답, 모든 출력의 다운스트림 시스템 응답, DNS 확인 및 NTP와 같은 인스턴스 트래픽이 포함됩니다. 채널이 수집 중이 아닌 경우에도 트래픽이 일부 발생합니다.|
| **aws.medialive.network_out.maximum** <br>(gauge) | MediaLive에서 송출되는 트래픽의 최대 전송률. 이 값에는 MediaLive에서 전송되는 모든 트래픽이 포함되며, 미디어 출력, 풀 입력을 위한 HTTP GET 요청, NTP 트래픽 및 DNS 트래픽이 해당합니다. 채널이 출력 중이 아닌 경우에도 트래픽이 일부 발생합니다.|
| **aws.medialive.network_out.minimum** <br>(gauge) | MediaLive에서 송출되는 트래픽의 최소 전송률. 이 값에는 MediaLive에서 전송되는 모든 트래픽이 포함되며, 미디어 출력, 풀 입력을 위한 HTTP GET 요청, NTP 트래픽 및 DNS 트래픽이 해당합니다. 채널이 출력 중이 아닌 경우에도 트래픽이 일부 발생합니다.|
| **aws.medialive.output_audio_level_dbfs.maximum** <br>(gauge) | 풀 스케일 대비 데시벨(dBFS)로 표현된 출력 오디오 레벨의 최댓값.|
| **aws.medialive.output_audio_level_dbfs.minimum** <br>(gauge) | 풀 스케일 대비 데시벨(dBFS)로 표현된 출력 오디오 레벨의 최솟값.|
| **aws.medialive.output_audio_level_lkfs.maximum** <br>(gauge) | 풀 스케일(LKFS) 대비 K-가중 라우드니스(loudness)로 표현된 출력 오디오 레벨의 최댓값.|
| **aws.medialive.output_audio_level_lkfs.minimum** <br>(gauge) | 풀 스케일(LKFS) 대비 K-가중 라우드니스(loudness)로 표현된 출력 오디오 레벨의 최솟값.|
| **aws.medialive.output_video_frame_rate.maximum** <br>(rate) | 출력 비디오의 최대 프레임 속도입니다.|
| **aws.medialive.output_video_frame_rate.minimum** <br>(rate) | 출력 비디오의 최소 프레임 속도.|
| **aws.medialive.pipelines_locked.maximum** <br>(gauge) | 두 파이프라인 간 동기화 여부를 나타내는 표시자의 최댓값. 이 메트릭은 표준 채널에만 적용되며, 해당 채널의 HLS, MediaPackage, Microsoft Smooth 및 UDP 출력에 대해서만 유효합니다. MediaLive는 파이프라인 락킹을 통해 두 파이프라인 간 동기화를 유지합니다.|
| **aws.medialive.pipelines_locked.minimum** <br>(gauge) | 두 파이프라인 간 동기화 여부를 나타내는 표시자의 최솟값. 이 메트릭은 표준 채널에만 적용되며, 해당 채널의 HLS, MediaPackage, Microsoft Smooth 및 UDP 출력에 대해서만 유효합니다. MediaLive는 파이프라인 락킹을 통해 두 파이프라인 간 동기화를 유지합니다.|
| **aws.medialive.primary_input_active.maximum** <br>(gauge) | 자동 입력 페일오버 쌍에서 기본(primary) 입력이 활성 상태인지 여부를 나타내는 표시자의 최댓값. 값이 1이면 기본 입력이 활성 상태이며 정상임을 의미하고, 0이면 비활성 상태임을 의미합니다.|
| **aws.medialive.primary_input_active.minimum** <br>(gauge) | 자동 입력 페일오버 쌍에서 기본(primary) 입력이 활성 상태인지 여부를 나타내는 표시자의 최솟값. 값이 1이면 기본 입력이 활성 상태이며 정상임을 의미하고, 0이면 비활성 상태임을 의미합니다.|
| **aws.medialive.streaming.maximum** <br>(gauge) | 장치가 성공적으로 MediaLive로 입력 신호를 스트리밍 중(시간에 따른 최댓값).|
| **aws.medialive.streaming.minimum** <br>(gauge) | 장치가 성공적으로 MediaLive로 입력 신호를 스트리밍 중(시간에 따른 최솟값).|
| **aws.medialive.temperature.maximum** <br>(gauge) | 장치의 최대 온도(°C)를 나타냅니다. 권장 운용 조건은 장치 설명서를 참조해야 합니다.<br>_degree celsius로 표시_ |
| **aws.medialive.temperature.minimum** <br>(gauge) | 장치의 최소 온도(°C)를 나타냅니다. 권장 운용 조건은 장치 설명서를 참조해야 합니다.<br>_degree celsius로 표시_ |
| **aws.medialive.using_hdmi.maximum** <br>(gauge) | HDMI가 장치에서 현재 선택된 입력인지 확인합니다. 시간에 따른 최댓값입니다.|
| **aws.medialive.using_hdmi.minimum** <br>(gauge) | HDMI가 장치에서 현재 선택된 입력인지 확인합니다. 시간에 따른 최솟값입니다.|
| **aws.medialive.using_sdi.maximum** <br>(gauge) | SDI가 장치에서 현재 선택된 입력인지 확인합니다. 시간에 따른 최댓값입니다.|
| **aws.medialive.using_sdi.minimum** <br>(gauge) | SDI가 장치에서 현재 선택된 입력인지 확인합니다. 시간에 따른 최솟값입니다.|

### 이벤트

MediaLive 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

MediaLive 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.
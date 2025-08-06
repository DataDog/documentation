---
app_id: amazon_gamelift
categories:
- aws
- 클라우드
- 설정 및 배포
- 로그 수집
custom_kind: 통합
description: 핵심 Amazon Gamelift 메트릭을 추적하세요.
title: Amazon Gamelift
---
## 개요

Amazon Gamelift는 완전 관리형 서비스로, 클라우드의 세션 기반 멀티플레이어 게임 서비스 배포, 운영 및 확대를 지원합니다.

Datadog에서 모든 Gamelift 메트릭을 참조하려면 이 통합을 활성화하세요.

## 설정

### 설치

If you haven't already, set up the [Amazon Web Services integration](https://docs.datadoghq.com/integrations/amazon_web_services/) first.

### 메트릭 수집

1. In the [AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services), ensure that `Game Lift` is enabled under the `Metric Collection` tab.
1. Install the [Datadog - Amazon GameLift integration](https://app.datadoghq.com/integrations/amazon-gamelift).

### 로그 수집

#### 로깅 활성화

Amazon GameLift를 설정하여 S3 버킷 또는 클라우드와치(CloudWatch) 중 하나로 로그를 전송하세요.

**참고**: S3 버킷에 로깅하면 `amazon_gamelift`가 _대상 접두어_로 설정되어 있는지 확인하세요.

#### Datadog로 로그 전송

1. If you haven’t already, set up the [Datadog Forwarder Lambda function](https://docs.datadoghq.com/logs/guide/forwarder/).

1. 람다 함수가 설치되면 AWS 콘솔에서 Amazon GameLift 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 대한 트리거를 수동으로 추가할 수 있습니다.

   - [Add a manual trigger on the S3 bucket](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Add a manual trigger on the CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **aws.gamelift.activating_game_sessions** <br>(count) | The average number of game sessions with status activating .|
| **aws.gamelift.activating_game_sessions.maximum** <br>(count) | The maximum number of game sessions with status activating .|
| **aws.gamelift.activating_game_sessions.minimum** <br>(count) | The minimum number of game sessions with status activating .|
| **aws.gamelift.active_game_sessions** <br>(count) | The average number of game sessions with status active .|
| **aws.gamelift.active_game_sessions.maximum** <br>(count) | The maximum number of game sessions with status active .|
| **aws.gamelift.active_game_sessions.minimum** <br>(count) | The minimum number of game sessions with status active .|
| **aws.gamelift.active_instances** <br>(count) | The average number of instances with active status.|
| **aws.gamelift.active_instances.maximum** <br>(count) | The maximum number of instances with active status.|
| **aws.gamelift.active_instances.minimum** <br>(count) | The minimum number of instances with active status.|
| **aws.gamelift.active_server_processes** <br>(count) | The average number server processes with status active.|
| **aws.gamelift.active_server_processes.maximum** <br>(count) | The maximum number of server processes with status active.|
| **aws.gamelift.active_server_processes.minimum** <br>(count) | The minimum number of server processes with status active.|
| **aws.gamelift.available_game_servers** <br>(count) | Game servers that are available to run a game execution and are not currently occupied with gameplay.|
| **aws.gamelift.available_game_sessions** <br>(count) | The average number of game session slots on active & healthy processes not being used.|
| **aws.gamelift.available_game_sessions.maximum** <br>(count) | The maximum number of game session slots on active & healthy processes not being used.|
| **aws.gamelift.available_game_sessions.minimum** <br>(count) | The minimum number of game session slots on active & healthy processes not being used.|
| **aws.gamelift.average_wait_time** <br>(count) | The average amount of time a game session requests in the que with status pending have been waiting.|
| **aws.gamelift.average_wait_time.maximum** <br>(count) | The maximum amount of time a game session requests in the que with status pending have been waiting.|
| **aws.gamelift.average_wait_time.minimum** <br>(count) | The minimum amount of time a game session requests in the que with status pending have been waiting.|
| **aws.gamelift.average_wait_time.sum** <br>(count) | The sum of the amount of time a game session requests in the que with status pending have been waiting.|
| **aws.gamelift.current_player_sessions** <br>(count) | The average number of player sessions with active or reserved status.|
| **aws.gamelift.current_player_sessions.maximum** <br>(count) | The maximum number of player sessions with active or reserved status.|
| **aws.gamelift.current_player_sessions.minimum** <br>(count) | The minimum number of player sessions with active or reserved status.|
| **aws.gamelift.current_player_sessions.sum** <br>(count) | The total number of player sessions with active or reserved status.|
| **aws.gamelift.current_tickets** <br>(count) | Matchmaking requests currently being processed or waiting to be processed.|
| **aws.gamelift.desired_instances** <br>(count) | The average number of active instances working to maintain the fleet.|
| **aws.gamelift.desired_instances.maximum** <br>(count) | The maximum number of active instances working to maintain the fleet.|
| **aws.gamelift.desired_instances.minimum** <br>(count) | The minimum number of active instances working to maintain the fleet.|
| **aws.gamelift.draining_available_game_servers** <br>(count) | Game servers on instances scheduled for termination that are currently not supporting gameplay.|
| **aws.gamelift.draining_utilized_game_servers** <br>(count) | Game servers on instances scheduled for termination that are currently supporting gameplay.|
| **aws.gamelift.first_choice_not_viable** <br>(count) | The average number of game sessions successfully placed but not in the first choice fleet because the fleet is not viable.|
| **aws.gamelift.first_choice_not_viable.maximum** <br>(count) | The maximum number of game sessions successfully placed but not in the first choice fleet because the fleet is not viable.|
| **aws.gamelift.first_choice_not_viable.minimum** <br>(count) | The minimum number of game sessions successfully placed but not in the first choice fleet because the fleet is not viable.|
| **aws.gamelift.first_choice_not_viable.sum** <br>(count) | The sum of the number of game sessions successfully placed but not in the first choice fleet because the fleet is not viable.|
| **aws.gamelift.first_choice_out_of_capacity** <br>(count) | The average number of game sessions successfully placed but not in the first choice fleet because the fleet has no available resources.|
| **aws.gamelift.first_choice_out_of_capacity.maximum** <br>(count) | The maximum number of game sessions successfully placed but not in the first choice fleet because the fleet has no available resources.|
| **aws.gamelift.first_choice_out_of_capacity.minimum** <br>(count) | The minimum number of game sessions successfully placed but not in the first choice fleet because the fleet has no available resources.|
| **aws.gamelift.first_choice_out_of_capacity.sum** <br>(count) | The sum of the number of game sessions successfully placed but not in the first choice fleet because the fleet has no available resources.|
| **aws.gamelift.game_server_interruptions** <br>(count) | Game servers on Spot Instances that were interrupted due to limited Spot availability.|
| **aws.gamelift.game_session_interruptions** <br>(count) | The average number of game session that have been interrupted.|
| **aws.gamelift.game_session_interruptions.maximum** <br>(count) | The maximum number of game session that have been interrupted.|
| **aws.gamelift.game_session_interruptions.minimum** <br>(count) | The minimum number of game session that have been interrupted.|
| **aws.gamelift.game_session_interruptions.sum** <br>(count) | The sum of the number of game session that have been interrupted.|
| **aws.gamelift.healthy_server_processes** <br>(count) | The average number of server processes that are reporting healthy.|
| **aws.gamelift.healthy_server_processes.maximum** <br>(count) | The maximum number of server processes that are reporting healthy.|
| **aws.gamelift.healthy_server_processes.minimum** <br>(count) | The minimum number of server processes that are reporting healthy.|
| **aws.gamelift.idle_instances** <br>(count) | The average number of active instances hosting 0 game sessions.|
| **aws.gamelift.idle_instances.maximum** <br>(count) | The maximum number of active instances hosting 0 game sessions.|
| **aws.gamelift.idle_instances.minimum** <br>(count) | The minimum number of active instances hosting 0 game sessions.|
| **aws.gamelift.instance_interruptions** <br>(count) | The average number of spot instances that have been interrupted.|
| **aws.gamelift.instance_interruptions.maximum** <br>(count) | The maximum number of spot instances that have been interrupted.|
| **aws.gamelift.instance_interruptions.minimum** <br>(count) | The minimum number of spot instances that have been interrupted.|
| **aws.gamelift.instance_interruptions.sum** <br>(count) | The sum of the number of spot instances that have been interrupted.|
| **aws.gamelift.lowest_latency_placement** <br>(count) | The average number of game sessions placed in a region that offers the queue's lowest possible latency.|
| **aws.gamelift.lowest_latency_placement.maximum** <br>(count) | The maximum number of game sessions placed in a region that offers the queue's lowest possible latency.|
| **aws.gamelift.lowest_latency_placement.minimum** <br>(count) | The minimum number of game sessions placed in a region that offers the queue's lowest possible latency.|
| **aws.gamelift.lowest_latency_placement.sum** <br>(count) | The sum of the number of game sessions placed in a region that offers the queue's lowest possible latency.|
| **aws.gamelift.lowest_price_placement** <br>(count) | The average number of game sessions placed in a region that offers the queue's lowest price for the region.|
| **aws.gamelift.lowest_price_placement.maximum** <br>(count) | The maximum number of game sessions placed in a region that offers the queue's lowest price for the region.|
| **aws.gamelift.lowest_price_placement.minimum** <br>(count) | The minimum number of game sessions placed in a region that offers the queue's lowest price for the region.|
| **aws.gamelift.lowest_price_placement.sum** <br>(count) | The sum of the number of game sessions placed in a region that offers the queue's lowest price for the region.|
| **aws.gamelift.matches_accepted** <br>(count) | Matches that were successfully accepted by all players since the last report.|
| **aws.gamelift.matches_created** <br>(count) | Potential matches that were created since the last report.|
| **aws.gamelift.matches_placed** <br>(count) | Matches that were successfully placed into a game session since the last report.|
| **aws.gamelift.matches_rejected** <br>(count) | For matchmaking configurations that require acceptance, the potential matches that were rejected by at least one player since the last report.|
| **aws.gamelift.max_instances** <br>(count) | The average of the maximum number of instances allowed for the fleet.|
| **aws.gamelift.max_instances.maximum** <br>(count) | The total maximum number of instances allowed for the fleet.|
| **aws.gamelift.max_instances.minimum** <br>(count) | The minimum of maximum number of instances allowed for the fleet.|
| **aws.gamelift.min_instances** <br>(count) | The average of the minimum number of instances allowed for the fleet.|
| **aws.gamelift.min_instances.maximum** <br>(count) | The maximum of minimum number of instances allowed for the fleet.|
| **aws.gamelift.min_instances.minimum** <br>(count) | The absolute minimum number of instances allowed for the fleet.|
| **aws.gamelift.minimum_instances** <br>(count) | The average of the minimum number of instances allowed for the fleet.|
| **aws.gamelift.minimum_instances.maximum** <br>(count) | The maximum of minimum number of instances allowed for the fleet.|
| **aws.gamelift.minimum_instances.minimum** <br>(count) | The absolute minimum number of instances allowed for the fleet.|
| **aws.gamelift.percent_available_game_sessions** <br>(count) | The average number of game session slots on all active server processes that are not being used.<br>_Shown as percent_ |
| **aws.gamelift.percent_healthy_server_processes** <br>(count) | The average percent of server processes that are reporting healthy.<br>_Shown as percent_ |
| **aws.gamelift.percent_healthy_server_processes.maximum** <br>(count) | The maximum percent of server processes that are reporting healthy.<br>_Shown as percent_ |
| **aws.gamelift.percent_healthy_server_processes.minimum** <br>(count) | The minimum percent of server processes that are reporting healthy.<br>_Shown as percent_ |
| **aws.gamelift.percent_idle_instances** <br>(count) | The average percentage of active instances that are idle.|
| **aws.gamelift.percent_idle_instances.maximum** <br>(count) | The maximum percentage of active instances that are idle.|
| **aws.gamelift.percent_idle_instances.minimum** <br>(count) | The minimum percentage of active instances that are idle.|
| **aws.gamelift.percent_utilized_game_servers** <br>(count) | Portion of game servers that are currently supporting game executions.<br>_Shown as percent_ |
| **aws.gamelift.placements_cancelled** <br>(count) | The average number of game session placement requests that were cancelled.|
| **aws.gamelift.placements_cancelled.maximum** <br>(count) | The maximum number of game session placement requests that were cancelled.|
| **aws.gamelift.placements_cancelled.minimum** <br>(count) | The minimum number of game session placement requests that were cancelled.|
| **aws.gamelift.placements_cancelled.sum** <br>(count) | The sum of the number of game session placement requests that were cancelled.|
| **aws.gamelift.placements_failed** <br>(count) | The average number of game session placement requests tha failed.|
| **aws.gamelift.placements_started** <br>(count) | The average number of game session placement requests that were added to the queue.|
| **aws.gamelift.placements_started.maximum** <br>(count) | The maximum number of game session placement requests that were added to the queue.|
| **aws.gamelift.placements_started.minimum** <br>(count) | The minimum number of game session placement requests that were added to the queue.|
| **aws.gamelift.placements_started.sum** <br>(count) | The sum of the number of game session placement requests that were added to the queue.|
| **aws.gamelift.placements_succeeded** <br>(count) | The average number of game session placement requests that resulted in a new session.|
| **aws.gamelift.placements_succeeded.maximum** <br>(count) | The maximum number of game session placement requests that resulted in a new session.|
| **aws.gamelift.placements_succeeded.minimum** <br>(count) | The minimum number of game session placement requests that resulted in a new session.|
| **aws.gamelift.placements_succeeded.sum** <br>(count) | The sum of the number of game session placement requests that resulted in a new session.|
| **aws.gamelift.placements_timed_out** <br>(count) | The average number of game session placement requests that reached the queue's timeout limit.|
| **aws.gamelift.placements_timed_out.maximum** <br>(count) | The maximum number of game session placement requests that reached the queue's timeout limit.|
| **aws.gamelift.placements_timed_out.minimum** <br>(count) | The minimum number of game session placement requests that reached the queue's timeout limit.|
| **aws.gamelift.placements_timed_out.sum** <br>(count) | The sum of the number of game session placement requests that reached the queue's timeout limit.|
| **aws.gamelift.player_session_activations** <br>(count) | The average number of player sessions that transitioned from reserved to active.|
| **aws.gamelift.player_session_activations.maximum** <br>(count) | The maximum number of player sessions that transitioned from reserved to active.|
| **aws.gamelift.player_session_activations.minimum** <br>(count) | The minimum number of player sessions that transitioned from reserved to active.|
| **aws.gamelift.player_session_activations.sum** <br>(count) | The sum of the number of player sessions that transitioned from reserved to active.|
| **aws.gamelift.players_started** <br>(count) | Players in matchmaking tickets that were added since the last report.|
| **aws.gamelift.queue_depth** <br>(count) | The average number of game session placement requests in the queue with status pending.|
| **aws.gamelift.queue_depth.maximum** <br>(count) | The maximum number of game session placement requests in the queue with status pending.|
| **aws.gamelift.queue_depth.minimum** <br>(count) | The minimum number of game session placement requests in the queue with status pending.|
| **aws.gamelift.queue_depth.sum** <br>(count) | The sum of the number of game session placement requests in the queue with status pending.|
| **aws.gamelift.rule_evaluations_failed** <br>(count) | Rule evaluations during matchmaking that failed since the last report. This metric is limited to the top 50 rules.|
| **aws.gamelift.rule_evaluations_passed** <br>(count) | Rule evaluations during the matchmaking process that passed since the last report. This metric is limited to the top 50 rules.|
| **aws.gamelift.server_process_abnormal_terminations** <br>(count) | The average number of server processes that were shut due to abormal circumstances .|
| **aws.gamelift.server_process_abnormal_terminations.maximum** <br>(count) | The maximum number of server processes that were shut due to abormal circumstances .|
| **aws.gamelift.server_process_abnormal_terminations.minimum** <br>(count) | The minimum number of server processes that were shut due to abormal circumstances .|
| **aws.gamelift.server_process_abnormal_terminations.sum** <br>(count) | The sum of the number of server processes that were shut due to abormal circumstances .|
| **aws.gamelift.server_process_activations** <br>(count) | The average number of server processes that have been activated.|
| **aws.gamelift.server_process_activations.maximum** <br>(count) | The maximum number of server processes that have been activated.|
| **aws.gamelift.server_process_activations.minimum** <br>(count) | The minimum number of server processes that have been activated.|
| **aws.gamelift.server_process_activations.sum** <br>(count) | The sum of the number of server processes that have been activated.|
| **aws.gamelift.server_process_terminations** <br>(count) | The average number of server processes that have been terminated.|
| **aws.gamelift.server_process_terminations.maximum** <br>(count) | The maximum number of server processes that have been terminated.|
| **aws.gamelift.server_process_terminations.minimum** <br>(count) | The minimum number of server processes that have been terminated.|
| **aws.gamelift.server_process_terminations.sum** <br>(count) | The sum of the number of server processes that have been terminated.|
| **aws.gamelift.tickets_failed** <br>(count) | Matchmaking requests that resulted in failure since the last report.|
| **aws.gamelift.tickets_started** <br>(count) | New matchmaking requests that were created since the last report.|
| **aws.gamelift.tickets_timed_out** <br>(count) | Matchmaking requests that reached the timeout limit since the last report.|
| **aws.gamelift.time_to_match** <br>(gauge) | For matchmaking requests that were put into a potential match before the last report, the amount of time between ticket creation and potential match creation.<br>_Shown as second_ |
| **aws.gamelift.time_to_ticket_cancel** <br>(gauge) | For matchmaking requests that were canceled before the last report, the amount of time between ticket creation and cancellation.<br>_Shown as second_ |
| **aws.gamelift.time_to_ticket_success** <br>(gauge) | For matchmaking requests that succeeded before the last report, the amount of time between ticket creation and successful match placement.<br>_Shown as second_ |
| **aws.gamelift.utilized_game_servers** <br>(count) | Game servers that are currently occupied with gameplay.|

### 이벤트

Amazon GameLift 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Amazon GameLift 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.
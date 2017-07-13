#!/usr/bin/env python3

from optparse import OptionParser
import os

from datadog import initialize, api

DD_API_KEY = os.environ.get('DD_API_KEY', None)

common_tags = [
    "job_name:%s" % os.environ.get('CI_JOB_NAME', ''),
    "job_stage:%s" % os.environ.get('CI_JOB_STAGE', ''),
    "environment:%s" % os.environ.get('CI_ENVIRONMENT_NAME', ''),
    "project_name:%s" % os.environ.get('CI_PROJECT_NAME', ''),
    "docker_image:%s" % os.environ.get('CI_REGISTRY_IMAGE', ''),
    "pipeline_id: %s" % os.environ.get('CI_PIPELINE_ID', '')
]


def dd_send_event(api_key, title, description, result='info', **kwargs):
    """
    :param api_key: dd api key
    :param title: event title
    :param description: event text
    :param result: success / failure
    :param kwargs:
    :return:
    """

    assert isinstance(api_key, str), "no api_key found"
    assert isinstance(title, str), "no title found"
    assert isinstance(description, str), "no description found"
    assert isinstance(result, str), "no result found"

    # api init options:
    options = {'api_key': api_key}

    initialize(**options)

    tags = common_tags

    # Submit a point with a host and tags.
    try:
        response = api.Event.create(
            title=title,
            text=description,
            tags=tags,
            alert_type=result
        )
        print(response)
        print("New event sent to Datadog: {0} {1} {2}".format(
            title,
            description,
            result
        ))
    except Exception as e:
        print(e)
        exit(1)


def dd_send_metric(api_key, metric, points, step_name, step_status,  **kwargs):
    """
    :param api_key: dd api key
    :param metric: name of metric to post
    :param points: int of metric value
    :param step_name: name of deploy step
    :param step_status: status of deploy step
    :param kwargs:
    :return:
    """

    assert isinstance(api_key, str), "no api_key found"
    assert isinstance(metric, str), "no metric name found"
    assert isinstance(int(points), int), "points must be an int"
    assert isinstance(step_name, str), "no step_name found"
    assert isinstance(step_status, str), "no step_status found"

    # api init options:
    options = {'api_key': api_key}

    initialize(**options)

    # tags for gitlab
    tags = common_tags
    if step_name:
        tags.append("step_name:%s" % step_name)

    if step_status:
        tags.append("step_status:%s" % step_status)

    # Submit a point with a host and tags.
    try:
        response = api.Metric.send(
            metric=metric,
            points=int(points),
            tags=tags
        )
        print(response)
        print("New metric sent to Datadog: {0} {1} {2} {3}".format(
            metric,
            points,
            step_name,
            step_status
        ))
    except Exception as e:
        print(e)
        exit(1)


def main():
    """
    wrapper for taking cli params
    """
    parser = OptionParser(usage="usage: %prog [options]")
    parser.add_option("-m", "--metric", help="metric name")
    parser.add_option("-p", "--points", help="numeric value")
    parser.add_option("-n", "--step_name", help="name of function")
    parser.add_option("-s", "--step_status", help="status of function")
    parser.add_option("-t", "--title", help="event title")
    parser.add_option("-d", "--description", help="event text", default="")
    parser.add_option("-r", "--result", help="event status", default="")
    parser.add_option("-k", "--api_key", help="dd api key", default=DD_API_KEY)

    (options, args) = parser.parse_args()

    if args[0] == 'metric':
        dd_send_metric(**vars(options))
    elif args[0] == 'event':
        dd_send_event(**vars(options))


if __name__ == '__main__':
    main()

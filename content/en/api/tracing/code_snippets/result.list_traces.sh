{
    "status": "done",
    "nextTraceId": "AQAAAWqw6AbGqnPVfQAAAABBV3F3NkE0WmdJVkxGeTQxVFI5VA",
    "requestId": "cy03ZkFZT3NSQnljZktmeGw5NDNlUXxQOFFISzFiOHk3VDExQ01EVVlHNTlR",
    "traces": [
        {
            "content": {
                "attributes": {
                    "http": {
                        "url": "http://0.0.0.0:3834/internal/phantomjs/pull",
                        "headers": {
                            "x_request_start": "None"
                        },
                        "method": "GET",
                        "status_code": "500"
                    },
                    "pylons": {
                        "route": {
                            "action": "pull",
                            "controller": "internal/phantomjs"
                        },
                        "user": ""
                    },
                    "language": "python",
                    "runtime-id": "5fc77fbe3e864cfe920f00b072405494",
                    "dd": {
                        "v1": {
                            "weight": 1
                        }
                    },
                    "process_id": 1910,
                    "error": {
                        "stack": "Traceback (most recent call last):\n  File \"/opt/dogweb/lib/python2.7/site-packages/dd/utils/trace/middleware.py\", line 44, in __call__\n    return self.app(environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/ddtrace/contrib/pylons/middleware.py\", line 85, in __call__\n    reraise(typ, val, tb=tb)\n  File \"/opt/dogweb/lib/python2.7/site-packages/ddtrace/contrib/pylons/middleware.py\", line 68, in __call__\n    return self.app(environ, _start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/dd/utils/trace/middleware.py\", line 77, in __call__\n    return self.app(environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/dogweb/lib/jigger.py\", line 50, in __call__\n    return self.app(environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/beaker/middleware.py\", line 170, in __call__\n    return self.wrap_app(environ, session_start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/routes/middleware.py\", line 141, in __call__\n    response = self.app(environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/dogweb/lib/auth.py\", line 171, in __call__\n    return self.app(environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/pylons/wsgiapp.py\", line 103, in __call__\n    response = self.dispatch(controller, environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/pylons/wsgiapp.py\", line 313, in dispatch\n    return controller(environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/dogweb/lib/base.py\", line 89, in __call__\n    ret = WSGIController.__call__(self, environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/pylons/controllers/core.py\", line 214, in __call__\n    response = self._dispatch_call()\n  File \"/opt/dogweb/lib/python2.7/site-packages/pylons/controllers/core.py\", line 164, in _dispatch_call\n    response = self._inspect_call(func)\n  File \"/opt/dogweb/lib/python2.7/site-packages/pylons/controllers/core.py\", line 107, in _inspect_call\n    result = self._perform_call(func, args)\n  File \"/opt/dogweb/lib/python2.7/site-packages/pylons/controllers/core.py\", line 57, in _perform_call\n    return func(**args)\n  File \"<string>\", line 2, in pull\n  File \"/opt/dogweb/lib/python2.7/site-packages/dogweb/lib/decorators.py\", line 214, in jsonify\n    data = func(*args, **kwargs)\n  File \"<string>\", line 2, in pull\n  File \"/opt/dogweb/lib/python2.7/site-packages/pylons/decorators/rest.py\", line 34, in check_methods\n    return func(*args, **kwargs)\n  File \"<string>\", line 2, in pull\nMasterNotFoundError: No master found for 'snapshot-backend'\n"
                    },
                    "duration": 26441097
                },
                "host": "i-000eb71d2391c1b7d",
                "tags": [
                    "role:kube-node",
                    "name:datadog_snapshotting",
                    "source:apm",
                    "availability-zone:us-east-1b",
                    "source:apm",
                    "datacenter:us1.staging.dog",
                    "env:staging",
                    "site:datad0g.com",
                    "account:staging",
                    "app.kubernetes.io/managed-by:spinnaker",
                    "app.kubernetes.io/name:mcnulty",
                    "app:snapshotting",
                    "availability-zone:us-east-1b",
                    "aws_account:727006795293",
                    "aws_autoscaling_groupname:us1-staging-dog-chinook-k8s-ng-asg-7d414469620a",
                    "ec2_churn:churntest_10pc",
                    "iam_profile:chinook/chinook-kube-kubernetes-node-low-trust",
                    "image:ami-05a0ad73394be70df",
                    "instance-type:m5.xlarge",
                    "k8s.io/cluster-autoscaler/enabled:yes",
                    "k8s.io/cluster-autoscaler/node-template/label/node-role.kubernetes.io/compute",
                    "k8s.io/cluster-autoscaler/node-template/label/node-role.kubernetes.io/snapshotting",
                    "k8s.io/cluster-autoscaler/node-template/taint/node:snapshotting:noschedule",
                    "kernel:none",
                    "kubernetes.io/cluster/chinook:owned",
                    "kubernetes_cluster:chinook",
                    "name:datadog_snapshotting",
                    "node-role.kubernetes.io/compute",
                    "node-role.kubernetes.io/snapshotting",
                    "nodegroup:datadog_snapshotting",
                    "region:us-east-1",
                    "role:kube-node",
                    "security-group-name:chinook-kube-node",
                    "security-group-name:common",
                    "security_group_name:chinook-kube-node",
                    "security_group_name:common",
                    "team:compute",
                    "team:team-aaa"
                ],
                "service": "mcnulty",
                "timestamp": "2019-05-13T11:15:57.799Z"
            },
            "id": "AQAAAWqw6AjnqnPXJAAAAABBV3F3NkJSZ2dJVkxGeTQxVFNENg"
        },
        {
            "content": {
                "attributes": {
                    "http": {
                        "url": "http://0.0.0.0:3834/internal/phantomjs/pull",
                        "headers": {
                            "x_request_start": "None"
                        },
                        "method": "GET",
                        "status_code": "500"
                    },
                    "pylons": {
                        "route": {
                            "action": "pull",
                            "controller": "internal/phantomjs"
                        },
                        "user": ""
                    },
                    "language": "python",
                    "runtime-id": "b22be90d4e9e4dbe8c9258d06371ca50",
                    "dd": {
                        "v1": {
                            "weight": 1
                        }
                    },
                    "process_id": 1861,
                    "error": {
                        "stack": "Traceback (most recent call last):\n  File \"/opt/dogweb/lib/python2.7/site-packages/dd/utils/trace/middleware.py\", line 44, in __call__\n    return self.app(environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/ddtrace/contrib/pylons/middleware.py\", line 85, in __call__\n    reraise(typ, val, tb=tb)\n  File \"/opt/dogweb/lib/python2.7/site-packages/ddtrace/contrib/pylons/middleware.py\", line 68, in __call__\n    return self.app(environ, _start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/dd/utils/trace/middleware.py\", line 77, in __call__\n    return self.app(environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/dogweb/lib/jigger.py\", line 50, in __call__\n    return self.app(environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/beaker/middleware.py\", line 170, in __call__\n    return self.wrap_app(environ, session_start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/routes/middleware.py\", line 141, in __call__\n    response = self.app(environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/dogweb/lib/auth.py\", line 171, in __call__\n    return self.app(environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/pylons/wsgiapp.py\", line 103, in __call__\n    response = self.dispatch(controller, environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/pylons/wsgiapp.py\", line 313, in dispatch\n    return controller(environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/dogweb/lib/base.py\", line 89, in __call__\n    ret = WSGIController.__call__(self, environ, start_response)\n  File \"/opt/dogweb/lib/python2.7/site-packages/pylons/controllers/core.py\", line 214, in __call__\n    response = self._dispatch_call()\n  File \"/opt/dogweb/lib/python2.7/site-packages/pylons/controllers/core.py\", line 164, in _dispatch_call\n    response = self._inspect_call(func)\n  File \"/opt/dogweb/lib/python2.7/site-packages/pylons/controllers/core.py\", line 107, in _inspect_call\n    result = self._perform_call(func, args)\n  File \"/opt/dogweb/lib/python2.7/site-packages/pylons/controllers/core.py\", line 57, in _perform_call\n    return func(**args)\n  File \"<string>\", line 2, in pull\n  File \"/opt/dogweb/lib/python2.7/site-packages/dogweb/lib/decorators.py\", line 214, in jsonify\n    data = func(*args, **kwargs)\n  File \"<string>\", line 2, in pull\n  File \"/opt/dogweb/lib/python2.7/site-packages/pylons/decorators/rest.py\", line 34, in check_methods\n    return func(*args, **kwargs)\n  File \"<string>\", line 2, in pull\nMasterNotFoundError: No master found for 'snapshot-backend'\n"
                    },
                    "duration": 25909900
                },
                "host": "i-01fba04a5dc5bfba9",
                "tags": [
                    "role:kube-node",
                    "name:datadog_snapshotting",
                    "source:apm",
                    "availability-zone:us-east-1a",
                    "source:apm",
                    "datacenter:us1.staging.dog",
                    "env:staging",
                    "site:datad0g.com",
                    "account:staging",
                    "app.kubernetes.io/managed-by:spinnaker",
                    "app.kubernetes.io/name:mcnulty",
                    "app:snapshotting",
                    "availability-zone:us-east-1a",
                    "aws_account:727006795293",
                    "aws_autoscaling_groupname:us1-staging-dog-chinook-k8s-ng-asg-5189ba96968d",
                    "ec2_churn:churntest_10pc",
                    "iam_profile:chinook/chinook-kube-kubernetes-node-low-trust",
                    "image:ami-05a0ad73394be70df",
                    "instance-type:m5.xlarge",
                    "k8s.io/cluster-autoscaler/enabled:yes",
                    "k8s.io/cluster-autoscaler/node-template/label/node-role.kubernetes.io/compute",
                    "k8s.io/cluster-autoscaler/node-template/label/node-role.kubernetes.io/snapshotting",
                    "k8s.io/cluster-autoscaler/node-template/taint/node:snapshotting:noschedule",
                    "kernel:none",
                    "kubernetes.io/cluster/chinook:owned",
                    "kubernetes_cluster:chinook",
                    "name:datadog_snapshotting",
                    "node-role.kubernetes.io/compute",
                    "node-role.kubernetes.io/snapshotting",
                    "nodegroup:datadog_snapshotting",
                    "region:us-east-1",
                    "role:kube-node",
                    "security-group-name:chinook-kube-node",
                    "security-group-name:common",
                    "security_group_name:chinook-kube-node",
                    "security_group_name:common",
                    "team:compute",
                    "team:team-aaa"
                ],
                "service": "mcnulty",
                "timestamp": "2019-05-13T11:15:57.390Z"
            },
            "id": "AQAAAWqw6AdOqnPZpwAAAABBV3F3NkJ0ZWdJVkxGeTQxVFNOOQ"
        }
    ]
}
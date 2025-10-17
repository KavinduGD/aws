## CloudWatch

### alarm triggered according to the metric in ec2

<!-- image -->
<img src="cloudwatch1.png" alt="CloudWatch" width="600"/>

---

### alarm triggered according to the metric in ec2 that was created by us using logs

<img src="cloudwatch2.png" alt="CloudWatch" width="600"/>

#### In cloudwatch by default metric check every 5 minutes, but we can change it to 1 minute

### Create custom cloud watch logs in ec2

```bash
sudo yum install -y amazon-cloudwatch-agent
```

```json
{
  "agent": { "run_as_user": "root" },
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/httpd/access_log",
            "log_group_name": "MyEC2AccessLog",
            "log_stream_name": "{instance_id}-access"
          },
          {
            "file_path": "/var/log/httpd/error_log",
            "log_group_name": "MyEC2ErrorLog",
            "log_stream_name": "{instance_id}-error"
          }
        ]
      }
    }
  }
}
```

````bash

```bash
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
 -a fetch-config -m ec2 \
 -c file:/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json -s
````

```bash
sudo systemctl status amazon-cloudwatch-agent
```

## Elastic Container Service (ECS)

<img src="./images/arc.png" width=600>

- can run container on either EC2 or Fargate
- ec2 - you manage the cluster of EC2 instances that run the containers
- fargate - you don't have to manage the underlying infrastructure, and you can focus on building and running your applications. serverless

### Task

- **Describe a container**

<img src="./images/task.png" width=600>

### Service

- In this context, a service is a configuration that you can use to run and maintain a specified number of tasks simultaneously in a cluster.
- support auto-scaling, load balancing, and rolling updates.
